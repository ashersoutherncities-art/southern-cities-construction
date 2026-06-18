import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { tryGetServiceClient } from '@/lib/supabase';
import { tierForPriceId, DEAL_DESK_TIERS } from '@/lib/deal-desk/tiers';
import {
  upsertMemberFromSubscription,
  markSubscriptionCanceled,
  getMemberByEmail,
  DealDeskMemberStatus,
} from '@/lib/deal-desk/members';
import { signAccessToken } from '@/lib/deal-desk/token';
import { sendMagicLinkEmail } from '@/lib/deal-desk/email';

type SupabaseService = NonNullable<ReturnType<typeof tryGetServiceClient>>;

// Email an active member a fresh magic link (signup or renewal). Best-effort.
async function emailFreshLink(
  supabase: SupabaseService,
  baseUrl: string,
  email: string | null | undefined,
  context: 'new' | 'renewal'
): Promise<void> {
  if (!email) return;
  const member = await getMemberByEmail(supabase, email);
  if (!member || (member.status !== 'active' && member.status !== 'trialing')) return;
  const token = signAccessToken(member.email);
  const link = `${baseUrl}/deal-desk/app?token=${encodeURIComponent(token)}`;
  try {
    await sendMagicLinkEmail({
      email: member.email,
      link,
      tierName: DEAL_DESK_TIERS[member.tier].name,
      context,
    });
  } catch {
    // best-effort — a failed link email shouldn't fail the webhook
  }
}

export const runtime = 'nodejs';

/**
 * DEDICATED Deal Desk subscription webhook — separate from the order webhook so
 * the existing one-time-purchase flow is never touched. Configure a second
 * Stripe webhook endpoint pointing here, subscribed to:
 *   checkout.session.completed, invoice.paid,
 *   customer.subscription.updated, customer.subscription.deleted
 * and set DEAL_DESK_WEBHOOK_SECRET to that endpoint's signing secret.
 *
 * Upserts are keyed by subscription id, so reprocessing the same event is safe
 * (no separate idempotency table needed).
 */

// Stripe moved billing-period fields onto subscription items in recent API
// versions; read defensively from either location.
function getPeriodEnd(sub: Stripe.Subscription): Date | null {
  const s = sub as unknown as {
    current_period_end?: number;
    items?: { data?: Array<{ current_period_end?: number }> };
  };
  const ts = s.current_period_end ?? s.items?.data?.[0]?.current_period_end;
  return typeof ts === 'number' ? new Date(ts * 1000) : null;
}

function mapStatus(status: Stripe.Subscription.Status): DealDeskMemberStatus {
  switch (status) {
    case 'active':
      return 'active';
    case 'trialing':
      return 'trialing';
    case 'past_due':
    case 'unpaid':
    case 'paused':
      return 'past_due';
    case 'incomplete':
      return 'incomplete';
    default:
      return 'canceled'; // canceled, incomplete_expired
  }
}

async function syncSubscription(
  stripe: Stripe,
  supabase: NonNullable<ReturnType<typeof tryGetServiceClient>>,
  sub: Stripe.Subscription,
  emailHint?: string | null
): Promise<void> {
  const priceId = sub.items.data[0]?.price?.id;
  const tier = priceId ? tierForPriceId(priceId) : null;
  if (!tier) return; // not a Deal Desk subscription — ignore

  let email = emailHint || null;
  if (!email && typeof sub.customer === 'string') {
    const customer = await stripe.customers.retrieve(sub.customer);
    if (customer && !customer.deleted) email = customer.email;
  }
  if (!email) return; // can't key a member without an email

  await upsertMemberFromSubscription(supabase, {
    email,
    tier,
    status: mapStatus(sub.status),
    stripeCustomerId: typeof sub.customer === 'string' ? sub.customer : sub.customer.id,
    stripeSubscriptionId: sub.id,
    currentPeriodEnd: getPeriodEnd(sub),
  });
}

export async function POST(req: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.DEAL_DESK_WEBHOOK_SECRET;
  if (!stripeSecretKey || !webhookSecret) {
    return NextResponse.json({ error: 'Deal Desk webhook not configured' }, { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey, { apiVersion: '2026-03-25.dahlia' });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const rawBody = await req.text();
  const signature = headers().get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error('Deal Desk webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = tryGetServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode !== 'subscription' || !session.subscription) break;
        const subId =
          typeof session.subscription === 'string'
            ? session.subscription
            : session.subscription.id;
        const sub = await stripe.subscriptions.retrieve(subId);
        await syncSubscription(stripe, supabase, sub, session.customer_details?.email);
        // First sign-up: email the welcome access link immediately.
        await emailFreshLink(supabase, baseUrl, session.customer_details?.email, 'new');
        break;
      }
      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        // Only auto-send on renewals; the first invoice's link is sent at checkout.
        if (invoice.billing_reason !== 'subscription_cycle') break;
        await emailFreshLink(supabase, baseUrl, invoice.customer_email, 'renewal');
        break;
      }
      case 'customer.subscription.updated': {
        await syncSubscription(stripe, supabase, event.data.object as Stripe.Subscription);
        break;
      }
      case 'customer.subscription.deleted': {
        await markSubscriptionCanceled(supabase, (event.data.object as Stripe.Subscription).id);
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.error('Deal Desk webhook handler error:', err);
    return NextResponse.json({ error: 'handler_error' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

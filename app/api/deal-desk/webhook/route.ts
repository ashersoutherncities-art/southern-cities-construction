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
import { notifyTeam } from '@/lib/deal-desk/notify';
import { tagMembershipInGhl } from '@/lib/ghl';

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

  const status = mapStatus(sub.status);
  await upsertMemberFromSubscription(supabase, {
    email,
    tier,
    status,
    stripeCustomerId: typeof sub.customer === 'string' ? sub.customer : sub.customer.id,
    stripeSubscriptionId: sub.id,
    currentPeriodEnd: getPeriodEnd(sub),
  });

  // Tag the Deal Desk membership in GHL (best-effort) so it enters the funnel's
  // owned-product segmentation. The 08b mapper turns purchased-deal-desk into
  // own-deal-desk. Only when active/trialing.
  if (status === 'active' || status === 'trialing') {
    try {
      await tagMembershipInGhl({
        email,
        productKey: 'deal-desk',
        productName: `Deal Desk (${String(tier)})`,
      });
    } catch (err) {
      console.error('GHL deal-desk tag failed (non-fatal):', err);
    }
  }
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
        // Broker CMA one-time purchase.
        if (session.mode === 'payment' && session.metadata?.deal_desk_cma === '1') {
          const cmaEmail = session.metadata?.cma_email || session.customer_details?.email || '';
          const cmaAddress = session.metadata?.cma_address || '';
          let memberId: string | null = null;
          if (cmaEmail) {
            const m = await getMemberByEmail(supabase, cmaEmail);
            memberId = m?.id ?? null;
          }
          await supabase.from('deal_desk_cma_orders').insert({
            member_id: memberId,
            email: cmaEmail,
            property_address: cmaAddress,
            amount_cents: session.amount_total ?? 0,
            was_credit: false,
            status: 'paid',
            stripe_session_id: session.id,
          });
          await notifyTeam(`CMA order PAID ($${((session.amount_total ?? 0) / 100).toFixed(0)}) — ${cmaEmail} — ${cmaAddress}`);
          break;
        }
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

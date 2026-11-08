import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { proPriceId, PRO_ADDITIONAL_BID_READY_CENTS } from '@/lib/deal-pack/pro';
import { verifyAccessToken } from '@/lib/construction-department/token';

export const runtime = 'nodejs';

/**
 * Gated reorder of an additional Bid-Ready Deal Pack at the Pro member rate.
 *
 * SECURITY (two gates, both required):
 *   1. The request must carry a valid magic-link access token whose signed
 *      email matches the submitted email. This prevents an attacker from
 *      naming someone else's email to trigger a discounted checkout against
 *      them, probe Stripe for which emails are Pro members, or spam a real
 *      member with Stripe-hosted receipts.
 *   2. The resulting token-verified email must have an ACTIVE Deal Pack Pro
 *      subscription on Stripe — same check as before. The discount never
 *      ships on identity alone.
 */
async function hasActiveProSubscription(stripe: Stripe, email: string, priceId: string): Promise<boolean> {
  const customers = await stripe.customers.list({ email, limit: 100 });
  for (const customer of customers.data) {
    const subs = await stripe.subscriptions.list({ customer: customer.id, status: 'all', limit: 100 });
    for (const sub of subs.data) {
      if (sub.status !== 'active' && sub.status !== 'trialing') continue;
      if (sub.items.data.some((item) => item.price?.id === priceId)) return true;
    }
  }
  return false;
}

export async function POST(req: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  if (!stripeSecretKey) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 500 });
  }

  let body: { email?: string; quantity?: number; token?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }

  // GATE 1: signed magic-link token. The token is issued via the member's
  // email at Pro-signup / portal-login and proves the caller owns the inbox.
  const token = typeof body.token === 'string' ? body.token.trim() : '';
  const claim = token ? verifyAccessToken(token) : null;
  if (!claim) {
    return NextResponse.json(
      { error: 'unverified_identity', detail: 'Sign in from the member portal link we emailed you before reordering.' },
      { status: 401 }
    );
  }

  const submittedEmail = (body.email || '').trim().toLowerCase();
  const claimedEmail = claim.email.trim().toLowerCase();
  if (!submittedEmail || submittedEmail !== claimedEmail) {
    // Return the SAME shape/timing as not_a_member so the endpoint doesn't
    // leak which emails are Pro members under a different auth status.
    return NextResponse.json(
      { error: 'unverified_identity', detail: 'Submitted email does not match the verified member.' },
      { status: 401 }
    );
  }

  const email = claimedEmail;
  const priceId = proPriceId();
  if (!priceId) {
    return NextResponse.json({ error: 'pro_not_available' }, { status: 503 });
  }

  const quantity = Math.min(Math.max(1, Math.floor(Number(body.quantity) || 1)), 10);
  const stripe = new Stripe(stripeSecretKey, { apiVersion: '2026-03-25.dahlia' });

  try {
    // GATE 2: live Stripe check. Required even after identity verification —
    // membership can lapse between the token issuance and reorder.
    const isMember = await hasActiveProSubscription(stripe, email, priceId);
    if (!isMember) {
      return NextResponse.json(
        { error: 'not_a_member', detail: 'We could not find an active Deal Pack Pro membership for that email. Subscribe first, or use the email on your membership.' },
        { status: 403 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Additional Bid-Ready Deal Pack — Pro member rate',
              metadata: { product_key: 'deal-pack-bid-ready-pro-member' },
            },
            unit_amount: PRO_ADDITIONAL_BID_READY_CENTS,
            tax_behavior: 'exclusive',
          },
          quantity,
        },
      ],
      automatic_tax: { enabled: false },
      billing_address_collection: 'required',
      metadata: {
        flow: 'deal-pack-pro-reorder',
        member_email: email,
        quantity: String(quantity),
        // Stamp authoritative cart metadata so the Stripe webhook routes this
        // through the standard cart fulfillment path (order row, Hub mirror,
        // portal provisioning, GHL contact upsert — N times for quantity N).
        cart_keys: 'deal-pack-bid-ready',
        cart_summary: `deal-pack-bid-ready:${PRO_ADDITIONAL_BID_READY_CENTS}:${quantity}`,
      },
      success_url: `${baseUrl}/portal?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/deal-pack?pro=reorder#pro`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Stripe error';
    return NextResponse.json({ error: 'reorder_failed', detail: message }, { status: 502 });
  }
}

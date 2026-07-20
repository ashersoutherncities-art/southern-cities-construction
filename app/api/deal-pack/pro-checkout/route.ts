import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { proPriceId } from '@/lib/deal-pack/pro';

export const runtime = 'nodejs';

/**
 * Starts a Stripe SUBSCRIPTION Checkout for Deal Pack Pro ($897/mo recurring).
 * This is a true subscription (not a one-time cart charge) so that membership
 * can later be verified in Stripe for the gated additional-Bid-Ready rate.
 */
export async function POST(req: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  if (!stripeSecretKey) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 500 });
  }

  let body: { email?: string } = {};
  try {
    body = await req.json();
  } catch {
    // empty body is fine — Stripe collects the email on its page
  }

  const priceId = proPriceId();
  if (!priceId) {
    return NextResponse.json(
      { error: 'pro_not_available', detail: 'Set DEAL_PACK_PRO_PRICE_ID to the Stripe Price ID.' },
      { status: 503 }
    );
  }

  const email = body.email?.trim().toLowerCase() || undefined;
  const stripe = new Stripe(stripeSecretKey, { apiVersion: '2026-03-25.dahlia' });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      billing_address_collection: 'required',
      automatic_tax: { enabled: false },
      subscription_data: { metadata: { deal_pack_pro: 'true' } },
      metadata: { product: 'deal-pack-pro' },
      success_url: `${baseUrl}/deal-pack?pro=welcome&session_id={CHECKOUT_SESSION_ID}#pro`,
      cancel_url: `${baseUrl}/deal-pack?pro=canceled#pro`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Stripe error';
    return NextResponse.json({ error: 'checkout_failed', detail: message }, { status: 502 });
  }
}

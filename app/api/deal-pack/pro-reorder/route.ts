import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { proPriceId, PRO_ADDITIONAL_BID_READY_CENTS } from '@/lib/deal-pack/pro';

export const runtime = 'nodejs';

/**
 * Gated reorder of an additional Bid-Ready Deal Pack at the Pro member rate.
 *
 * SECURITY: the discounted price is NEVER exposed as a public link or code.
 * We verify — against Stripe, live — that the supplied email has an ACTIVE
 * Deal Pack Pro subscription before issuing the discounted checkout. A
 * non-member gets a 403; there is nothing to share or guess.
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

  let body: { email?: string; quantity?: number } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }

  const email = (body.email || '').trim().toLowerCase();
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'invalid_email', detail: 'Enter the email on your Pro membership.' }, { status: 400 });
  }

  const priceId = proPriceId();
  if (!priceId) {
    return NextResponse.json({ error: 'pro_not_available' }, { status: 503 });
  }

  const quantity = Math.min(Math.max(1, Math.floor(Number(body.quantity) || 1)), 10);
  const stripe = new Stripe(stripeSecretKey, { apiVersion: '2026-03-25.dahlia' });

  try {
    const isMember = await hasActiveProSubscription(stripe, email, priceId);
    if (!isMember) {
      return NextResponse.json(
        { error: 'not_a_member', detail: 'We couldn’t find an active Deal Pack Pro membership for that email. Subscribe first, or use the email on your membership.' },
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
      automatic_tax: { enabled: true },
      billing_address_collection: 'required',
      metadata: { flow: 'deal-pack-pro-reorder', member_email: email, quantity: String(quantity) },
      success_url: `${baseUrl}/portal?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/deal-pack?pro=reorder#pro`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Stripe error';
    return NextResponse.json({ error: 'reorder_failed', detail: message }, { status: 502 });
  }
}

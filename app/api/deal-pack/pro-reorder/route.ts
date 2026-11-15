import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { proPriceId, PRO_ADDITIONAL_BID_READY_CENTS } from '@/lib/deal-pack/pro';
import { prepareDealPackPurchase } from '@/lib/deal-pack/purchase-agreement';
import { CART_PRODUCTS } from '@/lib/cart';

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
  if (!stripeSecretKey) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 500 });
  }

  let body: { email?: string; quantity?: number; projectAddress?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }

  const email = (body.email || '').trim().toLowerCase();
  const projectAddress=typeof body.projectAddress==='string'?body.projectAddress.trim():'';
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

    const product=CART_PRODUCTS['deal-pack-bid-ready'];
    return NextResponse.json(await prepareDealPackPurchase({items:[{key:product.key,name:'Additional Bid-Ready Deal Pack — Pro member rate',description:product.description,unitAmount:PRO_ADDITIONAL_BID_READY_CENTS,quantity}],projectAddress,boundEmail:email,cancelPath:'/cart?cart=deal-pack-bid-ready'}));

  } catch (err) {
    const message = err instanceof Error ? err.message : 'Stripe error';
    return NextResponse.json({ error: 'reorder_failed', detail: message }, { status: 502 });
  }
}

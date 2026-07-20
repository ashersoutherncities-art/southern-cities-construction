import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  isRealtorPlanKey,
  getRealtorPlan,
  realtorPlanPriceId,
  REALTOR_PLAN_SETUP_FEE_CENTS,
} from '@/lib/realtor-plans/tiers';

export const runtime = 'nodejs';

/**
 * Starts a Stripe subscription Checkout for a Realtor Support Plan, with a
 * one-time $75 setup fee added to the first invoice. Returns the Stripe-hosted
 * checkout URL. Requires REALTOR_PLAN_PRICE_{SOLO,TEAM,BROKERAGE} to be set to
 * recurring Stripe Price IDs — until then the plan returns 503 (not live).
 */
export async function POST(req: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  if (!stripeSecretKey) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 500 });
  }

  let body: { plan?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const planKey = String(body.plan || '');
  if (!isRealtorPlanKey(planKey)) {
    return NextResponse.json({ error: 'Unknown plan' }, { status: 400 });
  }
  const plan = getRealtorPlan(planKey);
  const priceId = realtorPlanPriceId(planKey);
  if (!priceId) {
    return NextResponse.json(
      { error: 'plan_not_available', detail: `Set ${plan.priceEnvVar} to the Stripe Price ID.` },
      { status: 503 }
    );
  }

  const stripe = new Stripe(stripeSecretKey, { apiVersion: '2026-03-25.dahlia' });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        { price: priceId, quantity: 1 },
        // One-time $75 Realtor Support Plan setup fee — first invoice only.
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Realtor Support Plan — one-time setup fee' },
            unit_amount: REALTOR_PLAN_SETUP_FEE_CENTS,
            tax_behavior: 'exclusive',
          },
          quantity: 1,
        },
      ],
      customer_email: body.email?.trim() || undefined,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      automatic_tax: { enabled: false },
      subscription_data: { metadata: { realtor_plan: planKey } },
      metadata: { realtor_plan: planKey },
      success_url: `${baseUrl}/services/realtors?subscribed=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/services/realtors?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Stripe error';
    return NextResponse.json({ error: 'checkout_failed', detail: message }, { status: 502 });
  }
}

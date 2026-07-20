import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PROJECT_SETUP_PRICE_ENV, projectSetupPriceId } from '@/lib/project-setup/config';

export const runtime = 'nodejs';

/**
 * Starts a Stripe subscription Checkout for Project Setup & Pre-Construction
 * Management ($3,500/mo retainer). Returns the Stripe-hosted checkout URL.
 * Requires PROJECT_SETUP_PRICE_MONTHLY to be set to a recurring Stripe Price ID
 * — until then this returns 503 (not live) and the CTA falls back to the
 * contact/intake flow. Mirrors app/api/realtor-plans/checkout/route.ts.
 *
 * Minimum-commitment terms (1/2/3 months by project budget) are enforced
 * operationally/contractually, not by Stripe, at this stage.
 */
export async function POST(req: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  if (!stripeSecretKey) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 500 });
  }

  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const priceId = projectSetupPriceId();
  if (!priceId) {
    return NextResponse.json(
      {
        error: 'plan_not_available',
        detail: `Set ${PROJECT_SETUP_PRICE_ENV} to the recurring Stripe Price ID ($3,500/mo) to enable self-serve checkout.`,
      },
      { status: 503 }
    );
  }

  const stripe = new Stripe(stripeSecretKey, { apiVersion: '2026-03-25.dahlia' });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: body.email?.trim() || undefined,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      automatic_tax: { enabled: true },
      subscription_data: { metadata: { platform_stage: 'co2-project-setup' } },
      metadata: { platform_stage: 'co2-project-setup' },
      success_url: `${baseUrl}/platform/co2?subscribed=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/platform/co2?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Stripe error';
    return NextResponse.json({ error: 'checkout_failed', detail: message }, { status: 502 });
  }
}

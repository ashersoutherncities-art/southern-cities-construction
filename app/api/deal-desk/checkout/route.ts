import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { isDealDeskTierKey, getTier, priceIdForTier } from '@/lib/deal-desk/tiers';

export const runtime = 'nodejs';

/**
 * Starts a Stripe subscription Checkout for a Deal Desk tier. Returns the
 * Stripe-hosted checkout URL. The dedicated Deal Desk webhook records the
 * membership once payment completes.
 */
export async function POST(req: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  if (!stripeSecretKey) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 500 });
  }

  let body: { tier?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const tierKey = String(body.tier || '');
  if (!isDealDeskTierKey(tierKey)) {
    return NextResponse.json({ error: 'Unknown tier' }, { status: 400 });
  }
  const tier = getTier(tierKey);
  const priceId = priceIdForTier(tierKey);
  if (!priceId) {
    return NextResponse.json(
      { error: 'tier_not_available', detail: `Set ${tier.priceEnvVar} to the Stripe Price ID.` },
      { status: 503 }
    );
  }

  const stripe = new Stripe(stripeSecretKey, { apiVersion: '2026-03-25.dahlia' });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        { price: priceId, quantity: 1 },
        // One-time $99 Deal Desk setup fee — added to the first invoice only.
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Deal Desk — one-time setup fee' },
            unit_amount: 9900,
            tax_behavior: 'exclusive',
          },
          quantity: 1,
        },
      ],
      customer_email: body.email?.trim() || undefined,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      automatic_tax: { enabled: false },
      subscription_data: { metadata: { deal_desk_tier: tierKey } },
      metadata: { deal_desk_tier: tierKey },
      success_url: `${baseUrl}/deal-desk/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/deal-desk?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Stripe error';
    return NextResponse.json({ error: 'checkout_failed', detail: message }, { status: 502 });
  }
}

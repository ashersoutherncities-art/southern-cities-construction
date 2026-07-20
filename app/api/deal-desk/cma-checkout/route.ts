import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { tryGetServiceClient } from '@/lib/supabase';
import { verifyAccessToken } from '@/lib/deal-desk/token';
import { getMemberByEmail, consumeCmaCredit } from '@/lib/deal-desk/members';
import { DEAL_DESK_TIERS } from '@/lib/deal-desk/tiers';
import { notifyTeam } from '@/lib/deal-desk/notify';

export const runtime = 'nodejs';

// Broker CMA pricing: $99 for active members, $149 otherwise. Pro tier's first
// CMA each cycle is a free credit.
const MEMBER_PRICE_CENTS = 9900;
const NONMEMBER_PRICE_CENTS = 14900;

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  if (!stripeKey) return NextResponse.json({ error: 'stripe_not_configured' }, { status: 500 });

  let body: { token?: string; address?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }
  const address = (body.address || '').trim();
  if (!address) return NextResponse.json({ error: 'missing_address' }, { status: 400 });

  const supabase = tryGetServiceClient();
  const verified = body.token ? verifyAccessToken(body.token) : null;
  const member = verified && supabase ? await getMemberByEmail(supabase, verified.email) : null;
  const isActiveMember = !!member && (member.status === 'active' || member.status === 'trialing');

  // Pro tier: apply the included CMA credit first (no charge).
  if (supabase && isActiveMember && member && member.tier === 'pro') {
    const pro = DEAL_DESK_TIERS.pro;
    if (member.cma_credits_used < pro.cmaCreditsPerMonth) {
      await consumeCmaCredit(supabase, member);
      await supabase.from('deal_desk_cma_orders').insert({
        member_id: member.id,
        email: member.email,
        property_address: address,
        amount_cents: 0,
        was_credit: true,
        status: 'requested',
      });
      await notifyTeam(`CMA request (Pro credit) — ${member.email} — ${address}`);
      return NextResponse.json({
        free: true,
        message: 'Your Pro CMA credit was applied. A licensed Southern Cities Realty broker will start this CMA — no charge.',
      });
    }
  }

  const amount = isActiveMember ? MEMBER_PRICE_CENTS : NONMEMBER_PRICE_CENTS;
  const email = member?.email || body.email?.trim() || undefined;

  const stripe = new Stripe(stripeKey, { apiVersion: '2026-03-25.dahlia' });
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Broker CMA — Comparative Market Analysis',
              description: `Licensed NC broker CMA for ${address}`.slice(0, 250),
            },
            unit_amount: amount,
            tax_behavior: 'exclusive',
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      automatic_tax: { enabled: false },
      metadata: { deal_desk_cma: '1', cma_address: address.slice(0, 480), cma_email: email || '' },
      success_url: `${baseUrl}/deal-desk/app?cma=ordered${body.token ? `&token=${encodeURIComponent(body.token)}` : ''}`,
      cancel_url: `${baseUrl}/deal-desk/app${body.token ? `?token=${encodeURIComponent(body.token)}` : ''}`,
    });
    return NextResponse.json({ url: session.url, amount });
  } catch (err) {
    return NextResponse.json(
      { error: 'checkout_failed', detail: err instanceof Error ? err.message : 'error' },
      { status: 502 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { tryGetServiceClient } from '@/lib/supabase';
import { verifyAccessToken } from '@/lib/construction-department/token';
import { getMemberByEmail, checkDeskReviewEligibility, consumeDeskReview } from '@/lib/construction-department/members';
import { createDeskReviewRequest, getMemberDeskReviews } from '@/lib/construction-department/desk-reviews';
import { CD_TIERS } from '@/lib/construction-department/tiers';
import { deskReviewOveragePriceUsd, chargeDeskReviewOverage } from '@/lib/construction-department/overage';
import { createOrder } from '@/lib/orders';
import { sendDeskReviewRequestToGhl } from '@/lib/ghl';

export const runtime = 'nodejs';

function bool(v: unknown): boolean {
  return v === true || v === 'true';
}

/**
 * ANALYZE-stage request: a member asks a licensed GC to personally review a
 * property. Human expertise is allocated, not unlimited — checkDeskReviewEligibility
 * tells us whether this consumes the member's included monthly credit or
 * needs an overage charge. Mirrors the accept_overage handshake used
 * elsewhere in this app (see the old snapshot route's dead branch for why
 * that pattern needs an explicit client confirmation before charging a card).
 */
export async function POST(req: NextRequest) {
  let body: { token?: string; property_address?: string; screening_id?: string; accept_overage?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const verified = body.token ? verifyAccessToken(body.token) : null;
  if (!verified) {
    return NextResponse.json({ error: 'invalid_or_expired_link' }, { status: 401 });
  }
  const propertyAddress = (body.property_address || '').trim();
  if (!propertyAddress) {
    return NextResponse.json({ error: 'missing_property_address' }, { status: 400 });
  }

  const supabase = tryGetServiceClient();
  if (!supabase) return NextResponse.json({ error: 'unavailable' }, { status: 500 });

  const member = await getMemberByEmail(supabase, verified.email);
  if (!member) return NextResponse.json({ error: 'not_eligible', reason: 'not_found' }, { status: 403 });

  const tier = CD_TIERS[member.tier];
  const eligibility = checkDeskReviewEligibility(member, tier);
  if (!eligibility.ok) {
    return NextResponse.json({ error: 'not_eligible', reason: eligibility.reason }, { status: 403 });
  }

  let orderId: number | null = null;

  if (!eligibility.usesCredit) {
    const overagePriceUsd = deskReviewOveragePriceUsd(member.tier);
    if (overagePriceUsd == null) {
      return NextResponse.json(
        { error: 'allowance_used', detail: 'Your included Desk Reviews for this cycle are used and overage is not available on your plan.' },
        { status: 403 }
      );
    }
    if (!bool(body.accept_overage)) {
      return NextResponse.json({ error: 'overage_required', overage_price_usd: overagePriceUsd }, { status: 402 });
    }
    const charge = await chargeDeskReviewOverage(member);
    if (!charge.ok) {
      return NextResponse.json({ error: 'payment_failed', reason: charge.reason, detail: charge.message }, { status: 402 });
    }
    const order = await createOrder(
      {
        workflow: 'construction-department',
        product_key: 'cd-desk-review-overage',
        product_name: 'Construction Department — additional Construction Desk Review',
        buyer_name: member.email,
        buyer_email: member.email,
        project_address: propertyAddress,
        amount_total_cents: Math.round(overagePriceUsd * 100),
        stripe_customer_id: member.stripe_customer_id,
        status: 'paid',
        metadata: { cd_tier: member.tier, stripe_payment_intent_id: charge.paymentIntentId },
      },
      supabase
    );
    orderId = order?.id ?? null;
  }

  await consumeDeskReview(supabase, member, eligibility.usesCredit);

  const review = await createDeskReviewRequest(supabase, {
    memberId: member.id,
    email: member.email,
    propertyAddress,
    screeningId: body.screening_id ?? null,
    wasCredit: eligibility.usesCredit,
    orderId,
  });

  await sendDeskReviewRequestToGhl({
    email: member.email,
    property_address: propertyAddress,
    tier: member.tier,
    used_credit: eligibility.usesCredit,
  });

  return NextResponse.json({ ok: true, review });
}

// Token-gated: list the member's own Desk Review requests + status.
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  const verified = token ? verifyAccessToken(token) : null;
  if (!verified) return NextResponse.json({ error: 'invalid_or_expired_link' }, { status: 401 });

  const supabase = tryGetServiceClient();
  if (!supabase) return NextResponse.json({ error: 'unavailable' }, { status: 500 });

  const member = await getMemberByEmail(supabase, verified.email);
  if (!member) return NextResponse.json({ reviews: [] });

  const reviews = await getMemberDeskReviews(supabase, member.id);
  return NextResponse.json({ reviews });
}

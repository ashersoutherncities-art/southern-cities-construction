import { NextRequest, NextResponse } from 'next/server';
import { tryGetServiceClient } from '@/lib/supabase';
import { computeEstimate, loadEstimateRules, loadMarketTiers } from '@/lib/rehab-snapshot/engine';
import { renderSnapshotPdf } from '@/lib/rehab-snapshot/pdf';
import { sendSnapshotEmail } from '@/lib/rehab-snapshot/email';
import { resolveMao, maoFromArv } from '@/lib/avm';
import { verifyAccessToken } from '@/lib/deal-desk/token';
import { getMemberByEmail, checkEligibility, consumeSnapshot, type DealDeskMember } from '@/lib/deal-desk/members';
import { DEAL_DESK_TIERS } from '@/lib/deal-desk/tiers';
import { overagePriceCents, overagePriceUsd, chargeSnapshotOverage } from '@/lib/deal-desk/overage';
import type {
  RehabSnapshotProjectInput,
  RehabSnapshotScopeInput,
  RehabSnapshotLeadInput,
  PropertyType,
  OccupancyStatus,
  InvestmentStrategy,
  TargetFinishLevel,
} from '@/lib/rehab-snapshot/types';

export const runtime = 'nodejs';

function str(v: unknown, d = ''): string {
  return typeof v === 'string' ? v : d;
}
function num(v: unknown, d = 0): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : d;
}
function numOrNull(v: unknown): number | null {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}
function bool(v: unknown): boolean {
  return v === true || v === 'true';
}

/**
 * Metered Deal Desk snapshot. Token-gated (magic link). Enforces the member's
 * monthly limit, runs the rehab engine + MAO, records usage, and emails the
 * MAO-bearing PDF. HouseCanary is only called when the member's tier includes
 * the premium cross-check — and the raw AVM numbers are never returned.
 */
export async function POST(req: NextRequest) {
  let body: {
    token?: string;
    first_name?: string;
    last_name?: string;
    project?: Record<string, unknown>;
    scope?: Record<string, unknown>;
    arv?: number;
    arvSource?: 'member' | 'cma';
    accept_overage?: boolean;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const verified = body.token ? verifyAccessToken(body.token) : null;
  if (!verified) {
    return NextResponse.json({ error: 'invalid_or_expired_link' }, { status: 401 });
  }

  const supabase = tryGetServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: 'unavailable' }, { status: 500 });
  }

  const member = await getMemberByEmail(supabase, verified.email);
  const eligibility = checkEligibility(member);

  let overageCharged = false;
  let activeMember: DealDeskMember;
  if (eligibility.ok) {
    activeMember = eligibility.member;
  } else if (eligibility.reason === 'limit_reached' && member && overagePriceCents() != null) {
    // Out of included snapshots, but per-snapshot overage billing is on. Charge the
    // card the member subscribed with (off-session) and let them keep going.
    if (!bool(body.accept_overage)) {
      return NextResponse.json({ error: 'overage_required', overage_price_usd: overagePriceUsd() }, { status: 402 });
    }
    const charge = await chargeSnapshotOverage(member);
    if (!charge.ok) {
      return NextResponse.json(
        { error: charge.reason === 'no_payment_method' ? 'no_payment_method' : 'card_declined' },
        { status: 402 }
      );
    }
    overageCharged = true;
    activeMember = member;
  } else {
    return NextResponse.json({ error: 'not_eligible', reason: eligibility.reason }, { status: 403 });
  }
  const tier = DEAL_DESK_TIERS[activeMember.tier];

  // Build the typed project + scope from the request.
  const p = body.project ?? {};
  const project: RehabSnapshotProjectInput = {
    property_address: str(p.property_address),
    city: str(p.city),
    state: str(p.state, 'NC'),
    zip: str(p.zip),
    property_type: str(p.property_type, 'single_family') as PropertyType,
    square_feet: num(p.square_feet),
    year_built: numOrNull(p.year_built),
    stories: numOrNull(p.stories),
    bedrooms: numOrNull(p.bedrooms),
    bathrooms: numOrNull(p.bathrooms),
    occupancy_status: str(p.occupancy_status, 'vacant') as OccupancyStatus,
    investment_strategy: str(p.investment_strategy, 'wholesale_eval') as InvestmentStrategy,
    target_finish_level: str(p.target_finish_level, 'basic_flip') as TargetFinishLevel,
  };

  if (!project.property_address || !project.zip || !project.square_feet) {
    return NextResponse.json(
      { error: 'missing_fields', detail: 'property_address, zip and square_feet are required.' },
      { status: 400 }
    );
  }

  const s = body.scope ?? {};
  const scope: RehabSnapshotScopeInput = {
    cosmetic_paint: bool(s.cosmetic_paint),
    flooring: bool(s.flooring),
    kitchen_refresh: bool(s.kitchen_refresh),
    kitchen_full: bool(s.kitchen_full),
    bathroom_refresh_count: num(s.bathroom_refresh_count),
    bathroom_full_count: num(s.bathroom_full_count),
    roof: bool(s.roof),
    hvac: bool(s.hvac),
    plumbing_partial: bool(s.plumbing_partial),
    plumbing_full: bool(s.plumbing_full),
    electrical_partial: bool(s.electrical_partial),
    electrical_full: bool(s.electrical_full),
    windows: bool(s.windows),
    siding: bool(s.siding),
    drywall: bool(s.drywall),
    framing: bool(s.framing),
    structural: bool(s.structural),
    foundation: bool(s.foundation),
    addition: bool(s.addition),
    layout_changes: bool(s.layout_changes),
    full_gut: bool(s.full_gut),
    fire_damage: bool(s.fire_damage),
    water_damage: bool(s.water_damage),
    mold_concern: bool(s.mold_concern),
    termite_concern: bool(s.termite_concern),
    exterior_work: bool(s.exterior_work),
    landscaping: bool(s.landscaping),
    driveway: bool(s.driveway),
    permit_required_unknown: bool(s.permit_required_unknown),
    notes: str(s.notes),
  };

  // Rehab from the SCC engine (conservative high end).
  const [rules, marketTiers] = await Promise.all([loadEstimateRules(), loadMarketTiers()]);
  const estimate = computeEstimate({ project, scope }, rules, marketTiers);
  const rehab = estimate.estimatedHigh;

  // MAO: explicit ARV (member-supplied / CMA) skips the AVM calls; otherwise run
  // the AVM ladder, gating HouseCanary on the tier.
  const mao =
    typeof body.arv === 'number'
      ? maoFromArv(body.arv, rehab, { source: body.arvSource ?? 'member' })
      : await resolveMao(
          {
            address: project.property_address,
            city: project.city,
            state: project.state,
            zipcode: project.zip,
            propertyType: project.property_type,
            bedrooms: project.bedrooms ?? undefined,
            bathrooms: project.bathrooms ?? undefined,
            squareFeet: project.square_feet,
          },
          rehab,
          { usePremium: tier.usePremiumAvm }
        );

  if (!mao) {
    return NextResponse.json(
      { error: 'valuation_unavailable', detail: 'No market value available. Order an SC Realty CMA.' },
      { status: 422 }
    );
  }

  // Meter it (counts against the monthly limit) + store the full payload for
  // the history sidebar / PDF re-download.
  await consumeSnapshot(supabase, activeMember, {
    propertyAddress: project.property_address,
    mao: mao.mao,
    verdict: mao.verdict,
    recommendCma: mao.recommendCma,
    leadFirst: str(body.first_name, 'Member'),
    leadLast: str(body.last_name),
    project,
    scope,
    estimate,
    maoPayload: mao,
  });

  // Deliver the MAO-bearing PDF by email (best-effort).
  const lead: RehabSnapshotLeadInput = {
    first_name: str(body.first_name, 'Member'),
    last_name: str(body.last_name),
    email: activeMember.email,
    phone: '',
    company_name: null,
    investor_type: 'wholesaler',
    source: 'deal-desk',
  };
  let delivered = false;
  try {
    const pdfBuffer = await renderSnapshotPdf({ lead, project, estimate, mao });
    const result = await sendSnapshotEmail({ lead, project, estimate, pdfBuffer });
    delivered = result.provider !== 'none';
  } catch {
    delivered = false;
  }

  const remaining =
    tier.snapshotLimit == null
      ? null
      : Math.max(0, tier.snapshotLimit - (activeMember.snapshots_used + 1));

  return NextResponse.json({ mao, remaining, delivered, overage_charged: overageCharged });
}

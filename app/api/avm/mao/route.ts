import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { computeEstimate, loadEstimateRules, loadMarketTiers } from '@/lib/rehab-snapshot/engine';
import { resolveMao, maoFromArv, isAvmEnabled } from '@/lib/avm';
import type { PropertyValueQuery } from '@/lib/avm';
import type {
  RehabSnapshotProjectInput,
  RehabSnapshotScopeInput,
} from '@/lib/rehab-snapshot/types';

/**
 * Gated Deal Desk MAO endpoint. Server-to-server only for now (the membership
 * UI / a workflow calls it with the x-internal-secret header) until there's
 * member auth. Fail-closed if the secret env var is missing.
 *
 * IMPORTANT: returns DERIVED outputs only (MaoResult: reconciled ARV, MAO,
 * verdict, confidence, CMA recommendation). It NEVER returns the individual
 * RentCast/HouseCanary AVM numbers — HouseCanary's value stays internal, per
 * the licensing/positioning rule. The only customer-facing "valuation" we hand
 * over is the realtor-backed SC Realty CMA.
 */
function isAuthorized(req: NextRequest): boolean {
  const expected = process.env.INTERNAL_API_SECRET;
  if (!expected) return false;
  const provided = req.headers.get('x-internal-secret') || '';
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

type MaoRequestBody = {
  // Address (required for an AVM-sourced ARV).
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  // Property hints that sharpen the AVM (optional).
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  // Rehab: pass a number directly, OR pass project+scope to have the SCC engine
  // compute it. Engine path uses the conservative (high) end of the range.
  rehab?: number;
  project?: RehabSnapshotProjectInput;
  scope?: RehabSnapshotScopeInput;
  // ARV override: member-supplied number, or a finalized SC Realty CMA value.
  // When present we skip the AVM calls entirely.
  arv?: number;
  arvSource?: 'member' | 'cma';
  // Skip the premium HouseCanary call (e.g. Starter tier = screen only).
  usePremium?: boolean;
};

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  if (!isAvmEnabled()) {
    return NextResponse.json({ error: 'avm_disabled' }, { status: 503 });
  }

  let body: MaoRequestBody;
  try {
    body = (await req.json()) as MaoRequestBody;
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  // 1) Resolve the rehab figure — explicit number wins, else compute from scope.
  let rehab = typeof body.rehab === 'number' ? body.rehab : null;
  if (rehab == null) {
    if (!body.project || !body.scope) {
      return NextResponse.json(
        { error: 'missing_rehab', detail: 'Provide `rehab`, or `project` + `scope` to compute it.' },
        { status: 400 }
      );
    }
    try {
      const [rules, marketTiers] = await Promise.all([loadEstimateRules(), loadMarketTiers()]);
      const estimate = computeEstimate({ project: body.project, scope: body.scope }, rules, marketTiers);
      rehab = estimate.estimatedHigh; // conservative end → lower, safer MAO
    } catch {
      return NextResponse.json({ error: 'rehab_compute_failed' }, { status: 500 });
    }
  }

  // 2) Resolve the MAO. ARV override (member/CMA) skips the AVM calls entirely.
  if (typeof body.arv === 'number') {
    const mao = maoFromArv(body.arv, rehab, { source: body.arvSource ?? 'member' });
    return NextResponse.json({ mao });
  }

  if (!body.address || !body.zip) {
    return NextResponse.json(
      { error: 'missing_address', detail: 'Provide `address` + `zip` (or an `arv` override).' },
      { status: 400 }
    );
  }

  const query: PropertyValueQuery = {
    address: body.address,
    city: body.city,
    state: body.state,
    zipcode: body.zip,
    propertyType: body.propertyType,
    bedrooms: body.bedrooms,
    bathrooms: body.bathrooms,
    squareFeet: body.squareFeet,
  };

  const mao = await resolveMao(query, rehab, { usePremium: body.usePremium !== false });
  if (!mao) {
    return NextResponse.json(
      { error: 'valuation_unavailable', detail: 'No AVM returned a value; order an SC Realty CMA.' },
      { status: 422 }
    );
  }

  return NextResponse.json({ mao });
}

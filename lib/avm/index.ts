import { getRentCastValue } from '@/lib/avm/rentcast';
import { getHouseCanaryValue } from '@/lib/avm/housecanary';
import { reconcileValuation, computeMao, DEFAULT_MAO_CONFIG } from '@/lib/avm/mao';
import { AvmEstimate, MaoConfig, MaoResult, PropertyValueQuery } from '@/lib/avm/types';

export * from '@/lib/avm/types';
export { DEFAULT_MAO_CONFIG } from '@/lib/avm/mao';

// Master feature flag. AVM/MAO stays dark until this is set, so nothing leaks
// into the snapshot output before keys are live and the numbers are signed off.
export function isAvmEnabled(): boolean {
  const v = (process.env.AVM_ENABLED ?? '').trim().toLowerCase();
  return v === 'true' || v === '1';
}

export type ResolveMaoOptions = {
  // When false, skip the premium HouseCanary call (screening-only / Starter tier).
  usePremium?: boolean;
  config?: MaoConfig;
};

// Full pipeline: RentCast (always) -> HouseCanary (premium tiers / serious deals)
// -> reconcile -> MAO. Returns null when AVM is disabled or no source returned a
// value (caller then falls back to member-supplied ARV or just omits the MAO).
export async function resolveMao(
  query: PropertyValueQuery,
  rehab: number,
  opts: ResolveMaoOptions = {}
): Promise<MaoResult | null> {
  if (!isAvmEnabled()) return null;

  const { usePremium = true, config = DEFAULT_MAO_CONFIG } = opts;

  // RentCast first (cheap screen). HouseCanary only on premium tiers.
  const tasks: Promise<AvmEstimate | null>[] = [getRentCastValue(query)];
  if (usePremium) tasks.push(getHouseCanaryValue(query));
  const estimates = (await Promise.all(tasks)).filter(
    (e): e is AvmEstimate => e !== null
  );

  const valuation = reconcileValuation(estimates);
  if (!valuation) return null;

  return computeMao(valuation, rehab, config);
}

// Escape hatch: member/agent supplies the ARV directly (no AVM call). Useful for
// the free/Starter path and for a finalized SC Realty CMA value.
export function maoFromArv(
  arv: number,
  rehab: number,
  opts: { config?: MaoConfig; source?: 'member' | 'cma' } = {}
): MaoResult {
  const { config = DEFAULT_MAO_CONFIG, source = 'member' } = opts;
  return computeMao(
    {
      arv: Math.round(arv),
      sources: [],
      confidence: source === 'cma' ? 'high' : 'moderate',
      divergence: null,
      recommendCma: source !== 'cma',
      notes: [
        source === 'cma'
          ? 'ARV from a realtor-backed SC Realty CMA — locked value.'
          : 'ARV supplied by the member; not independently verified.',
      ],
    },
    rehab,
    config
  );
}

/**
 * SCC project pricing policy, November 2026.
 * Every approved cost is counted once: field/direct (including PM), allocated
 * corporate overhead excluding the warranty reserve, and warranty reserve.
 * The 45% markup applies to the complete cost base, not to revenue.
 *
 * Money uses integer cents so invoice amounts never drift through float math.
 * Estimates are illustrative until technical/financial release gates pass.
 */
export const SCC_MARKUP_BASIS_POINTS = 4500 as const;
export const SCC_WARRANTY_RESERVE_BASIS_POINTS = 150 as const; // 1.5% of direct costs

export type SccProjectCostInput = {
  directCostsCents: number; // includes fractional PM compensation ONCE
  allocatedOverheadCents: number; // corporate overhead, EXCLUDES warranty
  warrantyReserveCents?: number; // if omitted, use 1.5% of direct costs
  /** Other specifically approved costs not already included in direct or overhead. */
  extraApprovedCostsCents?: number;
};
export type SccProjectPrice = {
  directCostsCents: number;
  allocatedOverheadCents: number;
  warrantyReserveCents: number;
  extraApprovedCostsCents: number;
  costBaseCents: number;
  markupCents: number;
  contractPriceCents: number;
  markupPercent: 45;
  marginPercent: number;
};

function nonNegativeCents(value: number, label: string): number {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new RangeError(label + ' must be a nonnegative integer number of cents');
  }
  return value;
}
function safeSum(...amounts: number[]): number {
  const total = amounts.reduce((sum, n) => sum + n, 0);
  if (!Number.isSafeInteger(total)) throw new RangeError('Cost exceeds safe money range');
  return total;
}
export function priceSccConstructionProject(input: SccProjectCostInput): SccProjectPrice {
  const direct = nonNegativeCents(input.directCostsCents, 'directCostsCents');
  const overhead = nonNegativeCents(input.allocatedOverheadCents, 'allocatedOverheadCents');
  const warranty = nonNegativeCents(
    input.warrantyReserveCents ?? Math.round((direct * SCC_WARRANTY_RESERVE_BASIS_POINTS) / 10000),
    'warrantyReserveCents'
  );
  const extra = nonNegativeCents(input.extraApprovedCostsCents ?? 0, 'extraApprovedCostsCents');
  const costBase = safeSum(direct, overhead, warranty, extra);
  if (costBase === 0) throw new RangeError('Cannot price a zero-cost construction project');
  const markup = Math.round((costBase * SCC_MARKUP_BASIS_POINTS) / 10000);
  const price = safeSum(costBase, markup);
  return {
    directCostsCents: direct,
    allocatedOverheadCents: overhead,
    warrantyReserveCents: warranty,
    extraApprovedCostsCents: extra,
    costBaseCents: costBase,
    markupCents: markup,
    contractPriceCents: price,
    markupPercent: 45,
    marginPercent: Number(((markup / price) * 100).toFixed(2)),
  };
}

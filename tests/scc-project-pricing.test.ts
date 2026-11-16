import { describe, expect, it } from 'vitest';
import { priceSccConstructionProject } from '@/lib/scc-project-pricing';

describe('SCC 45% full-cost-base construction pricing', () => {
  it('applies markup after PM, overhead and the warranty reserve are included', () => {
    const result = priceSccConstructionProject({
      directCostsCents: 6500000, // includes PM
      allocatedOverheadCents: 1270000,
    });
    expect(result.warrantyReserveCents).toBe(97500);
    expect(result.costBaseCents).toBe(7867500);
    expect(result.markupCents).toBe(3540375);
    expect(result.contractPriceCents).toBe(11407875);
    expect(result.marginPercent).toBe(31.03);
  });

  it('does not add the warranty reserve a second time when explicitly supplied', () => {
    const result = priceSccConstructionProject({
      directCostsCents: 6500000,
      allocatedOverheadCents: 1270000,
      warrantyReserveCents: 97500,
    });
    expect(result.costBaseCents).toBe(7867500);
  });

  it('adds separate approved additional costs exactly once', () => {
    const result = priceSccConstructionProject({
      directCostsCents: 100000, allocatedOverheadCents: 10000,
      warrantyReserveCents: 2000, extraApprovedCostsCents: 3000,
    });
    expect(result.costBaseCents).toBe(115000);
    expect(result.contractPriceCents).toBe(166750);
  });

  it('rejects invalid input and zero project cost', () => {
    expect(() => priceSccConstructionProject({ directCostsCents: -1, allocatedOverheadCents: 1 })).toThrow();
    expect(() => priceSccConstructionProject({ directCostsCents: 0, allocatedOverheadCents: 0 })).toThrow();
    expect(() => priceSccConstructionProject({ directCostsCents: 1.1, allocatedOverheadCents: 1 })).toThrow();
  });
});

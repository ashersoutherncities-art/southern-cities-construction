// Southern Cities Construction Department membership tiers. Renamed/generalized
// from the former lib/deal-desk/tiers.ts (Deal Desk is being absorbed into the
// broader Construction Department positioning — see /Users/ashborn/.claude/plans/scalable-doodling-simon.md).
//
// Prices and allocations are display-only; the source of truth for billing is
// the Stripe Price whose ID lives in the named env var. Every human-metered
// field below (deskReviewsPerMonth, strategyCallsPerMonth, siteVisitCreditsPerYear,
// gcProcurementIncludedPerYear) is a required non-nullable number — this is a
// deliberate guardrail: software (screeningLimit) is the only field allowed to
// be unlimited (null). Human time and procurement effort are always finite and
// allocated per tier, never implied-unlimited by a subscription.

export type CdTierKey = 'starter' | 'investor' | 'operator';

export type CdTier = {
  key: CdTierKey;
  name: string;
  priceUsd: number; // monthly, display only
  priceEnvVar: string; // env var holding the Stripe recurring Price ID

  // SCREEN — software, scalable. null = unlimited.
  screeningLimit: number | null;
  usePremiumAvm: boolean; // premium second-source valuation cross-check included on this tier?

  // ANALYZE — Construction Desk Review, allocated human expertise.
  deskReviewsPerMonth: number;
  extraDeskReviewPriceEnvVar?: string; // one-time Stripe Price for overage reviews
  extraDeskReviewPriceUsd?: number;

  // PLAN — preferred pricing/credits toward the Build-Ready Deal Pack, not free/unlimited.
  dealPackDiscountPct?: number;
  dealPackCreditsPerYear?: number;

  // SC Realty CMA credits (carried over from the original Deal Desk benefit) — allocated, never unlimited.
  cmaCreditsPerMonth: number;

  // PROCURE — Vetted GC Quote Procurement, allocated per year, paid overage beyond that.
  gcProcurementIncludedPerYear: number;
  extraGcProcurementPriceEnvVar?: string;
  extraGcProcurementPriceUsd?: number;

  priorityQueue: boolean;
  strategyCallsPerMonth: number; // allocated, never unlimited
  siteVisitCreditsPerYear: number; // allocated, never unlimited

  blurb: string;
};

export const CD_TIERS: Record<CdTierKey, CdTier> = {
  starter: {
    key: 'starter',
    name: 'Starter',
    priceUsd: 299,
    priceEnvVar: 'CD_PRICE_STARTER',
    screeningLimit: null,
    usePremiumAvm: false,
    deskReviewsPerMonth: 0,
    dealPackDiscountPct: 0,
    cmaCreditsPerMonth: 0,
    gcProcurementIncludedPerYear: 0,
    priorityQueue: false,
    strategyCallsPerMonth: 0,
    siteVisitCreditsPerYear: 0,
    blurb: 'Unlimited Southern Cities Construction Intelligence screening on every property you’re evaluating.',
  },
  investor: {
    key: 'investor',
    name: 'Investor',
    priceUsd: 749,
    priceEnvVar: 'CD_PRICE_INVESTOR',
    screeningLimit: null,
    usePremiumAvm: true,
    deskReviewsPerMonth: 2,
    extraDeskReviewPriceEnvVar: 'CD_OVERAGE_PRICE_DESK_REVIEW_INVESTOR',
    extraDeskReviewPriceUsd: 149,
    dealPackDiscountPct: 10,
    cmaCreditsPerMonth: 0,
    gcProcurementIncludedPerYear: 1,
    extraGcProcurementPriceEnvVar: 'CD_OVERAGE_PRICE_PROCUREMENT_INVESTOR',
    extraGcProcurementPriceUsd: 499,
    priorityQueue: false,
    strategyCallsPerMonth: 0,
    siteVisitCreditsPerYear: 0,
    blurb: 'Screening + 2 Construction Desk Reviews/mo + preferred Deal Pack pricing + 1 GC procurement/yr.',
  },
  operator: {
    key: 'operator',
    name: 'Operator',
    priceUsd: 1499,
    priceEnvVar: 'CD_PRICE_OPERATOR',
    screeningLimit: null,
    usePremiumAvm: true,
    deskReviewsPerMonth: 5,
    extraDeskReviewPriceEnvVar: 'CD_OVERAGE_PRICE_DESK_REVIEW_OPERATOR',
    extraDeskReviewPriceUsd: 99,
    dealPackDiscountPct: 20,
    dealPackCreditsPerYear: 1,
    cmaCreditsPerMonth: 1,
    gcProcurementIncludedPerYear: 3,
    extraGcProcurementPriceEnvVar: 'CD_OVERAGE_PRICE_PROCUREMENT_OPERATOR',
    extraGcProcurementPriceUsd: 349,
    priorityQueue: true,
    strategyCallsPerMonth: 1,
    siteVisitCreditsPerYear: 1,
    blurb: 'Everything in Investor, priority queue, 5 Desk Reviews/mo, 3 GC procurements/yr, monthly strategy call, 1 site-visit credit/yr.',
  },
};

export function getTier(key: CdTierKey): CdTier {
  return CD_TIERS[key];
}

export function isCdTierKey(value: string): value is CdTierKey {
  return value === 'starter' || value === 'investor' || value === 'operator';
}

// Resolve the Stripe Price ID configured for a tier (null if env var unset).
export function priceIdForTier(key: CdTierKey): string | null {
  return process.env[CD_TIERS[key].priceEnvVar] || null;
}

// Reverse lookup: which tier does this Stripe Price ID belong to?
export function tierForPriceId(priceId: string): CdTier | null {
  for (const tier of Object.values(CD_TIERS)) {
    if (process.env[tier.priceEnvVar] === priceId) return tier;
  }
  return null;
}

// Deal Desk membership tiers. Prices are display-only; the source of truth for
// billing is the Stripe Price whose ID lives in the named env var. To go live,
// create three recurring Stripe Prices and set DEAL_DESK_PRICE_{STARTER,ACTIVE,PRO}.

export type DealDeskTierKey = 'starter' | 'active' | 'pro';

export type DealDeskTier = {
  key: DealDeskTierKey;
  name: string;
  priceUsd: number; // monthly, display only
  priceEnvVar: string; // env var holding the Stripe Price ID
  snapshotLimit: number | null; // null = unlimited
  usePremiumAvm: boolean; // premium second-source valuation cross-check included on this tier?
  cmaCreditsPerMonth: number; // included SC Realty CMA credits
  blurb: string;
};

export const DEAL_DESK_TIERS: Record<DealDeskTierKey, DealDeskTier> = {
  starter: {
    key: 'starter',
    name: 'Starter',
    priceUsd: 79,
    priceEnvVar: 'DEAL_DESK_PRICE_STARTER',
    snapshotLimit: 5,
    usePremiumAvm: false,
    cmaCreditsPerMonth: 0,
    blurb: '5 GC-verified rehab + Max Allowable Offer snapshots/mo, screened against live market comps.',
  },
  active: {
    key: 'active',
    name: 'Active',
    priceUsd: 199,
    priceEnvVar: 'DEAL_DESK_PRICE_ACTIVE',
    snapshotLimit: 15,
    usePremiumAvm: true,
    cmaCreditsPerMonth: 0,
    blurb: '15 snapshots/mo + a second independent valuation cross-check + monthly deal review.',
  },
  pro: {
    key: 'pro',
    name: 'Pro',
    priceUsd: 399,
    priceEnvVar: 'DEAL_DESK_PRICE_PRO',
    snapshotLimit: null,
    usePremiumAvm: true,
    cmaCreditsPerMonth: 1,
    blurb: 'Unlimited snapshots + priority + 1 SC Realty CMA credit/mo.',
  },
};

export function getTier(key: DealDeskTierKey): DealDeskTier {
  return DEAL_DESK_TIERS[key];
}

export function isDealDeskTierKey(value: string): value is DealDeskTierKey {
  return value === 'starter' || value === 'active' || value === 'pro';
}

// Resolve the Stripe Price ID configured for a tier (null if env var unset).
export function priceIdForTier(key: DealDeskTierKey): string | null {
  return process.env[DEAL_DESK_TIERS[key].priceEnvVar] || null;
}

// Reverse lookup: which tier does this Stripe Price ID belong to?
export function tierForPriceId(priceId: string): DealDeskTier | null {
  for (const tier of Object.values(DEAL_DESK_TIERS)) {
    if (process.env[tier.priceEnvVar] === priceId) return tier;
  }
  return null;
}

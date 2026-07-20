// Realtor Support Plan tiers. Prices are display-only; the source of truth for
// billing is the Stripe Price whose ID lives in the named env var. To go live,
// create three recurring Stripe Prices and set
// REALTOR_PLAN_PRICE_{SOLO,TEAM,BROKERAGE}.

export type RealtorPlanKey = 'solo' | 'team' | 'brokerage';

export type RealtorPlan = {
  key: RealtorPlanKey;
  name: string;
  priceUsd: number; // monthly, display only
  priceEnvVar: string; // env var holding the Stripe Price ID
};

// One-time setup fee added to the FIRST invoice of any support plan.
export const REALTOR_PLAN_SETUP_FEE_CENTS = 7500;

export const REALTOR_PLANS: Record<RealtorPlanKey, RealtorPlan> = {
  solo: { key: 'solo', name: 'Realtor Solo', priceUsd: 299, priceEnvVar: 'REALTOR_PLAN_PRICE_SOLO' },
  team: { key: 'team', name: 'Realtor Team', priceUsd: 649, priceEnvVar: 'REALTOR_PLAN_PRICE_TEAM' },
  brokerage: { key: 'brokerage', name: 'Brokerage Pro', priceUsd: 2499, priceEnvVar: 'REALTOR_PLAN_PRICE_BROKERAGE' },
};

export function isRealtorPlanKey(value: string): value is RealtorPlanKey {
  return value === 'solo' || value === 'team' || value === 'brokerage';
}

export function getRealtorPlan(key: RealtorPlanKey): RealtorPlan {
  return REALTOR_PLANS[key];
}

// Resolve the Stripe Price ID configured for a plan (null if env var unset).
export function realtorPlanPriceId(key: RealtorPlanKey): string | null {
  return process.env[REALTOR_PLANS[key].priceEnvVar] || null;
}

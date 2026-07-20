// Project Setup & Pre-Construction Management — a $3,500/mo pre-construction
// management retainer (platform stage CO2). Display price lives here; the
// source of truth for billing is the Stripe recurring Price whose ID lives in
// the named env var. To go live, create ONE recurring monthly Stripe Price at
// $3,500/mo and set PROJECT_SETUP_PRICE_MONTHLY. Until then the checkout route
// returns 503 and the CTA falls back to the contact/intake flow.
//
// NOTE ON MINIMUMS: the minimum commitment scales with project budget
// (<$40k = 1 mo, $40–65k = 2 mo, >$65k = 3 mo). Stripe subscriptions do not
// enforce a minimum term out of the box — enforce it operationally/contractually,
// or (later) with a Stripe subscription schedule. The recurring Price is just
// the $3,500/mo rate.

export const PROJECT_SETUP_PRICE_USD = 3500; // monthly, display only
export const PROJECT_SETUP_PRICE_ENV = 'PROJECT_SETUP_PRICE_MONTHLY';

// Resolve the Stripe Price ID configured for the retainer (null if env unset).
export function projectSetupPriceId(): string | null {
  return process.env[PROJECT_SETUP_PRICE_ENV] || null;
}

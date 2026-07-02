// Deal Pack Pro subscription config.
//
// Deal Pack Pro is a real recurring Stripe subscription ($897/mo). Its Stripe
// recurring Price ID lives in DEAL_PACK_PRO_PRICE_ID (set in Vercel prod).
//
// Members get 2 Bid-Ready Deal Packs included each month. Additional Bid-Readys
// are sold at a member rate, but ONLY to a verified active Pro subscriber —
// the /api/deal-pack/pro-reorder endpoint checks Stripe for an active
// subscription on this price before issuing the discounted checkout. There is
// no public discount code, so the rate can't leak.

export const DEAL_PACK_PRO_PRICE_ENV = 'DEAL_PACK_PRO_PRICE_ID';

// Member rate for an additional Bid-Ready Deal Pack (after the 2 included), in
// cents. Single source of truth — change this one value to reprice. ($399)
export const PRO_ADDITIONAL_BID_READY_CENTS = 39900;

export function proPriceId(): string | null {
  return process.env[DEAL_PACK_PRO_PRICE_ENV] || null;
}

export function proAdditionalBidReadyUsd(): number {
  return Math.round(PRO_ADDITIONAL_BID_READY_CENTS / 100);
}

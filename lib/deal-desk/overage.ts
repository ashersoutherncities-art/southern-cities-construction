import Stripe from 'stripe';
import type { DealDeskMember } from './members';
import { DEAL_DESK_TIERS, type DealDeskTierKey } from './tiers';

// Per-snapshot overage billing for Deal Desk. Lets a Starter/Active member keep
// pulling snapshots past their monthly cap without upgrading — each extra one is
// charged to the SAME card they pay their subscription with, off-session.
//
// Per-tier price, env-gated: DEAL_DESK_OVERAGE_PRICE_STARTER / DEAL_DESK_OVERAGE_PRICE_ACTIVE
// (USD, e.g. "20" / "12"). Unset for a tier = the old hard cap for that tier. Pro is
// unlimited so overage never applies. The env var name lives on each tier in tiers.ts.

export function overagePriceCents(tier: DealDeskTierKey): number | null {
  const envVar = DEAL_DESK_TIERS[tier]?.overagePriceEnvVar;
  if (!envVar) return null;
  const raw = process.env[envVar];
  if (!raw) return null;
  const usd = Number(raw);
  if (!Number.isFinite(usd) || usd <= 0) return null;
  return Math.round(usd * 100);
}

export function overagePriceUsd(tier: DealDeskTierKey): number | null {
  const cents = overagePriceCents(tier);
  return cents == null ? null : cents / 100;
}

export type OverageChargeResult =
  | { ok: true; paymentIntentId: string }
  | { ok: false; reason: 'disabled' | 'no_payment_method' | 'card_declined' | 'error'; message?: string };

// Charge the member's saved subscription card, off-session, for one extra snapshot.
export async function chargeSnapshotOverage(member: DealDeskMember): Promise<OverageChargeResult> {
  const amount = overagePriceCents(member.tier);
  if (amount == null) return { ok: false, reason: 'disabled' };
  if (!member.stripe_customer_id) return { ok: false, reason: 'no_payment_method' };

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return { ok: false, reason: 'error', message: 'stripe_not_configured' };
  const stripe = new Stripe(secret, { apiVersion: '2026-03-25.dahlia' });

  // Resolve the card they pay the subscription with: subscription default →
  // customer invoice default → first card on file.
  let paymentMethod: string | null = null;
  try {
    if (member.stripe_subscription_id) {
      const sub = await stripe.subscriptions.retrieve(member.stripe_subscription_id);
      const dpm = sub.default_payment_method;
      if (dpm) paymentMethod = typeof dpm === 'string' ? dpm : dpm.id;
    }
    if (!paymentMethod) {
      const cust = await stripe.customers.retrieve(member.stripe_customer_id);
      if (cust && !cust.deleted) {
        const dpm = cust.invoice_settings?.default_payment_method;
        if (dpm) paymentMethod = typeof dpm === 'string' ? dpm : dpm.id;
      }
    }
    if (!paymentMethod) {
      const list = await stripe.paymentMethods.list({ customer: member.stripe_customer_id, type: 'card', limit: 1 });
      paymentMethod = list.data[0]?.id ?? null;
    }
  } catch (e) {
    return { ok: false, reason: 'error', message: e instanceof Error ? e.message : 'pm_lookup_failed' };
  }
  if (!paymentMethod) return { ok: false, reason: 'no_payment_method' };

  try {
    const pi = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer: member.stripe_customer_id,
      payment_method: paymentMethod,
      off_session: true,
      confirm: true,
      description: 'Deal Desk — additional rehab + MAO snapshot',
      metadata: { kind: 'deal_desk_snapshot_overage', member_email: member.email },
    });
    if (pi.status === 'succeeded') return { ok: true, paymentIntentId: pi.id };
    return { ok: false, reason: 'card_declined', message: pi.status };
  } catch (e) {
    // Off-session declines / authentication_required surface as a thrown StripeError.
    return { ok: false, reason: 'card_declined', message: e instanceof Error ? e.message : 'charge_failed' };
  }
}

import Stripe from 'stripe';
import type { CdMember } from './members';
import { CD_TIERS, type CdTierKey } from './tiers';

// Overage billing for Construction Department allocations (Desk Reviews, GC
// Procurement). Lets a member keep using a metered benefit past their
// included allowance without upgrading — each extra one is charged to the
// SAME card they pay their subscription with, off-session.
//
// Per-tier price, env-gated (see tiers.ts for the exact env var name per
// tier/benefit). Unset for a tier = no overage available for that benefit —
// the member is told to upgrade or wait for the next cycle instead.

export function overagePriceCents(envVar: string | undefined): number | null {
  if (!envVar) return null;
  const raw = process.env[envVar];
  if (!raw) return null;
  const usd = Number(raw);
  if (!Number.isFinite(usd) || usd <= 0) return null;
  return Math.round(usd * 100);
}

export function overagePriceUsd(envVar: string | undefined): number | null {
  const cents = overagePriceCents(envVar);
  return cents == null ? null : cents / 100;
}

export type OverageChargeResult =
  | { ok: true; paymentIntentId: string }
  | { ok: false; reason: 'disabled' | 'no_payment_method' | 'card_declined' | 'error'; message?: string };

// Charge the member's saved subscription card, off-session, for one overage unit.
export async function chargeMemberOverage(
  member: CdMember,
  amountCents: number,
  description: string,
  metadataKind: string
): Promise<OverageChargeResult> {
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
      amount: amountCents,
      currency: 'usd',
      customer: member.stripe_customer_id,
      payment_method: paymentMethod,
      off_session: true,
      confirm: true,
      description,
      metadata: { kind: metadataKind, member_email: member.email },
    });
    if (pi.status === 'succeeded') return { ok: true, paymentIntentId: pi.id };
    return { ok: false, reason: 'card_declined', message: pi.status };
  } catch (e) {
    // Off-session declines / authentication_required surface as a thrown StripeError.
    return { ok: false, reason: 'card_declined', message: e instanceof Error ? e.message : 'charge_failed' };
  }
}

// ---- Desk Review overage ----

export function deskReviewOveragePriceUsd(tier: CdTierKey): number | null {
  return overagePriceUsd(CD_TIERS[tier]?.extraDeskReviewPriceEnvVar);
}

export async function chargeDeskReviewOverage(member: CdMember): Promise<OverageChargeResult> {
  const cents = overagePriceCents(CD_TIERS[member.tier]?.extraDeskReviewPriceEnvVar);
  if (cents == null) return { ok: false, reason: 'disabled' };
  return chargeMemberOverage(member, cents, 'Construction Department — additional Construction Desk Review', 'cd_desk_review_overage');
}

// ---- GC Procurement overage ----

export function gcProcurementOveragePriceUsd(tier: CdTierKey): number | null {
  return overagePriceUsd(CD_TIERS[tier]?.extraGcProcurementPriceEnvVar);
}

export async function chargeGcProcurementOverage(member: CdMember): Promise<OverageChargeResult> {
  const cents = overagePriceCents(CD_TIERS[member.tier]?.extraGcProcurementPriceEnvVar);
  if (cents == null) return { ok: false, reason: 'disabled' };
  return chargeMemberOverage(member, cents, 'Construction Department — additional GC procurement (Bid Package)', 'cd_gc_procurement_overage');
}

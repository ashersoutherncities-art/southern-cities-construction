import { SupabaseClient } from '@supabase/supabase-js';
import { CdTier, CdTierKey } from '@/lib/construction-department/tiers';

export type CdMemberStatus =
  | 'active'
  | 'trialing'
  | 'past_due'
  | 'canceled'
  | 'incomplete';

export type CdMember = {
  id: string;
  email: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  tier: CdTierKey;
  status: CdMemberStatus;
  current_period_end: string | null;
  screening_limit: number | null;
  screening_used: number;
  usage_period_start: string;
  cma_credits_used: number;
  desk_reviews_used: number;
  strategy_calls_used: number;
  site_visit_credits_used: number;
  gc_procurement_used: number;
};

export async function getMemberByEmail(
  supabase: SupabaseClient,
  email: string
): Promise<CdMember | null> {
  const { data } = await supabase
    .from('cd_members')
    .select('*')
    .ilike('email', email.trim())
    .maybeSingle();
  return (data as CdMember | null) ?? null;
}

export async function getMemberBySubscriptionId(
  supabase: SupabaseClient,
  subscriptionId: string
): Promise<CdMember | null> {
  const { data } = await supabase
    .from('cd_members')
    .select('*')
    .eq('stripe_subscription_id', subscriptionId)
    .maybeSingle();
  return (data as CdMember | null) ?? null;
}

export type UpsertMemberInput = {
  email: string;
  tier: CdTier;
  status: CdMemberStatus;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string;
  currentPeriodEnd: Date | null;
};

/**
 * Create or update a member from a Stripe subscription event. Every allocated
 * counter (screening_used, cma_credits_used, desk_reviews_used,
 * strategy_calls_used, site_visit_credits_used, gc_procurement_used) resets to
 * 0 whenever the billing period advances, so each paid period starts fresh.
 */
export async function upsertMemberFromSubscription(
  supabase: SupabaseClient,
  input: UpsertMemberInput
): Promise<void> {
  const existing = await getMemberBySubscriptionId(supabase, input.stripeSubscriptionId);
  const periodEndIso = input.currentPeriodEnd ? input.currentPeriodEnd.toISOString() : null;

  const periodAdvanced =
    !existing ||
    (periodEndIso != null && existing.current_period_end !== periodEndIso);

  const row = {
    email: input.email.trim(),
    stripe_customer_id: input.stripeCustomerId,
    stripe_subscription_id: input.stripeSubscriptionId,
    tier: input.tier.key,
    status: input.status,
    current_period_end: periodEndIso,
    screening_limit: input.tier.screeningLimit,
    updated_at: new Date().toISOString(),
    ...(periodAdvanced
      ? {
          screening_used: 0,
          cma_credits_used: 0,
          desk_reviews_used: 0,
          strategy_calls_used: 0,
          site_visit_credits_used: 0,
          gc_procurement_used: 0,
          usage_period_start: new Date().toISOString(),
        }
      : {}),
  };

  await supabase
    .from('cd_members')
    .upsert(row, { onConflict: 'stripe_subscription_id' });
}

export async function markSubscriptionCanceled(
  supabase: SupabaseClient,
  subscriptionId: string
): Promise<void> {
  await supabase
    .from('cd_members')
    .update({ status: 'canceled', updated_at: new Date().toISOString() })
    .eq('stripe_subscription_id', subscriptionId);
}

export type EligibilityResult =
  | { ok: true; member: CdMember }
  | { ok: false; reason: 'not_found' | 'inactive' | 'expired' | 'limit_reached' };

// Can this member run another SCREEN pass right now? Software is scalable —
// this is only false for account-state reasons, or a Starter-era cap if one
// is ever configured (screening_limit is currently null/unlimited on every tier).
export function checkEligibility(member: CdMember | null): EligibilityResult {
  if (!member) return { ok: false, reason: 'not_found' };
  if (member.status !== 'active' && member.status !== 'trialing') {
    return { ok: false, reason: 'inactive' };
  }
  if (member.current_period_end && new Date(member.current_period_end) < new Date()) {
    return { ok: false, reason: 'expired' };
  }
  if (member.screening_limit != null && member.screening_used >= member.screening_limit) {
    return { ok: false, reason: 'limit_reached' };
  }
  return { ok: true, member };
}

// Record one consumed SCREEN run: increment the meter + store the full payload
// so the run can be listed in history and its PDF regenerated on demand.
export async function consumeScreening(
  supabase: SupabaseClient,
  member: CdMember,
  meta: {
    propertyAddress?: string;
    mao?: number;
    verdict?: string;
    recommendCma?: boolean;
    leadFirst?: string;
    leadLast?: string;
    project?: unknown;
    scope?: unknown;
    estimate?: unknown;
    maoPayload?: unknown;
  }
): Promise<string | null> {
  await supabase
    .from('cd_members')
    .update({ screening_used: member.screening_used + 1, updated_at: new Date().toISOString() })
    .eq('id', member.id);

  const { data } = await supabase
    .from('cd_screening_usage')
    .insert({
      member_id: member.id,
      property_address: meta.propertyAddress ?? null,
      mao: meta.mao ?? null,
      verdict: meta.verdict ?? null,
      recommend_cma: meta.recommendCma ?? null,
      lead_first: meta.leadFirst ?? null,
      lead_last: meta.leadLast ?? null,
      project: meta.project ?? null,
      scope: meta.scope ?? null,
      estimate: meta.estimate ?? null,
      mao_payload: meta.maoPayload ?? null,
    })
    .select('id')
    .maybeSingle();

  return (data as { id: string } | null)?.id ?? null;
}

export type ScreeningHistoryItem = {
  id: string;
  property_address: string | null;
  mao: number | null;
  verdict: string | null;
  recommend_cma: boolean | null;
  created_at: string;
};

// The member's past SCREEN runs, newest first (for the history sidebar).
export async function getMemberScreenings(
  supabase: SupabaseClient,
  memberId: string
): Promise<ScreeningHistoryItem[]> {
  const { data } = await supabase
    .from('cd_screening_usage')
    .select('id, property_address, mao, verdict, recommend_cma, created_at')
    .eq('member_id', memberId)
    .order('created_at', { ascending: false })
    .limit(100);
  return (data as ScreeningHistoryItem[] | null) ?? [];
}

export type StoredScreening = {
  property_address: string | null;
  lead_first: string | null;
  lead_last: string | null;
  project: unknown;
  scope: unknown;
  estimate: unknown;
  mao_payload: unknown;
};

// One stored run (scoped to the member) — used to regenerate its PDF.
export async function getScreeningForMember(
  supabase: SupabaseClient,
  memberId: string,
  screeningId: string
): Promise<StoredScreening | null> {
  const { data } = await supabase
    .from('cd_screening_usage')
    .select('property_address, lead_first, lead_last, project, scope, estimate, mao_payload')
    .eq('member_id', memberId)
    .eq('id', screeningId)
    .maybeSingle();
  return (data as StoredScreening | null) ?? null;
}

// Consume one Pro-tier CMA credit for the cycle.
export async function consumeCmaCredit(supabase: SupabaseClient, member: CdMember): Promise<void> {
  await supabase
    .from('cd_members')
    .update({ cma_credits_used: member.cma_credits_used + 1, updated_at: new Date().toISOString() })
    .eq('id', member.id);
}

// ---- ANALYZE: Construction Desk Review metering ----

export type DeskReviewEligibility =
  | { ok: true; usesCredit: boolean }
  | { ok: false; reason: 'inactive' | 'expired' };

// Human expertise is allocated, not unlimited. If the member is within their
// tier's included allowance, the request consumes a credit; otherwise it still
// proceeds but as a paid overage (handled by the caller via lib/construction-department/overage.ts),
// never silently unlimited.
export function checkDeskReviewEligibility(member: CdMember, tier: CdTier): DeskReviewEligibility {
  if (member.status !== 'active' && member.status !== 'trialing') {
    return { ok: false, reason: 'inactive' };
  }
  if (member.current_period_end && new Date(member.current_period_end) < new Date()) {
    return { ok: false, reason: 'expired' };
  }
  const usesCredit = member.desk_reviews_used < tier.deskReviewsPerMonth;
  return { ok: true, usesCredit };
}

export async function consumeDeskReview(supabase: SupabaseClient, member: CdMember, usedCredit: boolean): Promise<void> {
  if (!usedCredit) return; // overage reviews are tracked via the orders table instead, not this counter
  await supabase
    .from('cd_members')
    .update({ desk_reviews_used: member.desk_reviews_used + 1, updated_at: new Date().toISOString() })
    .eq('id', member.id);
}

// ---- PROCURE: Vetted GC Quote Procurement metering ----

export type GcProcurementEligibility =
  | { ok: true; usesCredit: boolean }
  | { ok: false; reason: 'inactive' | 'expired' };

export function checkGcProcurementEligibility(member: CdMember, tier: CdTier): GcProcurementEligibility {
  if (member.status !== 'active' && member.status !== 'trialing') {
    return { ok: false, reason: 'inactive' };
  }
  if (member.current_period_end && new Date(member.current_period_end) < new Date()) {
    return { ok: false, reason: 'expired' };
  }
  const usesCredit = member.gc_procurement_used < tier.gcProcurementIncludedPerYear;
  return { ok: true, usesCredit };
}

export async function consumeGcProcurement(supabase: SupabaseClient, member: CdMember, usedCredit: boolean): Promise<void> {
  if (!usedCredit) return; // overage bid packages are tracked via the orders table instead
  await supabase
    .from('cd_members')
    .update({ gc_procurement_used: member.gc_procurement_used + 1, updated_at: new Date().toISOString() })
    .eq('id', member.id);
}

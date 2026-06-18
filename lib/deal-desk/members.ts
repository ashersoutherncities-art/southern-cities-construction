import { SupabaseClient } from '@supabase/supabase-js';
import { DealDeskTier, DealDeskTierKey } from '@/lib/deal-desk/tiers';

export type DealDeskMemberStatus =
  | 'active'
  | 'trialing'
  | 'past_due'
  | 'canceled'
  | 'incomplete';

export type DealDeskMember = {
  id: string;
  email: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  tier: DealDeskTierKey;
  status: DealDeskMemberStatus;
  current_period_end: string | null;
  snapshot_limit: number | null;
  snapshots_used: number;
  usage_period_start: string;
  cma_credits_used: number;
};

export async function getMemberByEmail(
  supabase: SupabaseClient,
  email: string
): Promise<DealDeskMember | null> {
  const { data } = await supabase
    .from('deal_desk_members')
    .select('*')
    .ilike('email', email.trim())
    .maybeSingle();
  return (data as DealDeskMember | null) ?? null;
}

export async function getMemberBySubscriptionId(
  supabase: SupabaseClient,
  subscriptionId: string
): Promise<DealDeskMember | null> {
  const { data } = await supabase
    .from('deal_desk_members')
    .select('*')
    .eq('stripe_subscription_id', subscriptionId)
    .maybeSingle();
  return (data as DealDeskMember | null) ?? null;
}

export type UpsertMemberInput = {
  email: string;
  tier: DealDeskTier;
  status: DealDeskMemberStatus;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string;
  currentPeriodEnd: Date | null;
};

/**
 * Create or update a member from a Stripe subscription event. The meter
 * (snapshots_used) resets to 0 whenever the billing period advances, so each
 * paid period starts fresh.
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
    snapshot_limit: input.tier.snapshotLimit,
    updated_at: new Date().toISOString(),
    ...(periodAdvanced
      ? { snapshots_used: 0, cma_credits_used: 0, usage_period_start: new Date().toISOString() }
      : {}),
  };

  await supabase
    .from('deal_desk_members')
    .upsert(row, { onConflict: 'stripe_subscription_id' });
}

export async function markSubscriptionCanceled(
  supabase: SupabaseClient,
  subscriptionId: string
): Promise<void> {
  await supabase
    .from('deal_desk_members')
    .update({ status: 'canceled', updated_at: new Date().toISOString() })
    .eq('stripe_subscription_id', subscriptionId);
}

export type EligibilityResult =
  | { ok: true; member: DealDeskMember }
  | { ok: false; reason: 'not_found' | 'inactive' | 'expired' | 'limit_reached' };

// Can this member run another snapshot right now?
export function checkEligibility(member: DealDeskMember | null): EligibilityResult {
  if (!member) return { ok: false, reason: 'not_found' };
  if (member.status !== 'active' && member.status !== 'trialing') {
    return { ok: false, reason: 'inactive' };
  }
  if (member.current_period_end && new Date(member.current_period_end) < new Date()) {
    return { ok: false, reason: 'expired' };
  }
  if (member.snapshot_limit != null && member.snapshots_used >= member.snapshot_limit) {
    return { ok: false, reason: 'limit_reached' };
  }
  return { ok: true, member };
}

// Record one consumed snapshot: increment the meter + store the full payload so
// the run can be listed in history and its PDF regenerated on demand.
export async function consumeSnapshot(
  supabase: SupabaseClient,
  member: DealDeskMember,
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
): Promise<void> {
  await supabase
    .from('deal_desk_members')
    .update({ snapshots_used: member.snapshots_used + 1, updated_at: new Date().toISOString() })
    .eq('id', member.id);

  await supabase.from('deal_desk_snapshot_usage').insert({
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
  });
}

export type SnapshotHistoryItem = {
  id: string;
  property_address: string | null;
  mao: number | null;
  verdict: string | null;
  recommend_cma: boolean | null;
  created_at: string;
};

// The member's past runs, newest first (for the history sidebar).
export async function getMemberSnapshots(
  supabase: SupabaseClient,
  memberId: string
): Promise<SnapshotHistoryItem[]> {
  const { data } = await supabase
    .from('deal_desk_snapshot_usage')
    .select('id, property_address, mao, verdict, recommend_cma, created_at')
    .eq('member_id', memberId)
    .order('created_at', { ascending: false })
    .limit(100);
  return (data as SnapshotHistoryItem[] | null) ?? [];
}

export type StoredSnapshot = {
  property_address: string | null;
  lead_first: string | null;
  lead_last: string | null;
  project: unknown;
  scope: unknown;
  estimate: unknown;
  mao_payload: unknown;
};

// One stored run (scoped to the member) — used to regenerate its PDF.
export async function getSnapshotForMember(
  supabase: SupabaseClient,
  memberId: string,
  snapshotId: string
): Promise<StoredSnapshot | null> {
  const { data } = await supabase
    .from('deal_desk_snapshot_usage')
    .select('property_address, lead_first, lead_last, project, scope, estimate, mao_payload')
    .eq('member_id', memberId)
    .eq('id', snapshotId)
    .maybeSingle();
  return (data as StoredSnapshot | null) ?? null;
}

// Consume one Pro CMA credit for the cycle.
export async function consumeCmaCredit(supabase: SupabaseClient, member: DealDeskMember): Promise<void> {
  await supabase
    .from('deal_desk_members')
    .update({ cma_credits_used: member.cma_credits_used + 1, updated_at: new Date().toISOString() })
    .eq('id', member.id);
}

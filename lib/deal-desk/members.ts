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
      ? { snapshots_used: 0, usage_period_start: new Date().toISOString() }
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

// Record one consumed snapshot: increment the meter + write an audit row.
export async function consumeSnapshot(
  supabase: SupabaseClient,
  member: DealDeskMember,
  meta: { propertyAddress?: string; mao?: number; verdict?: string; recommendCma?: boolean }
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
  });
}

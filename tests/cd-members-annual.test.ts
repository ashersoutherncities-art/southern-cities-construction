import { describe, it, expect } from 'vitest';
import type { CdTier } from '@/lib/construction-department/tiers';
import { upsertMemberFromSubscription } from '@/lib/construction-department/members';

interface Row {
  email: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string;
  tier: string;
  status: string;
  current_period_end: string | null;
  screening_limit: number | null;
  updated_at: string;
  screening_used?: number;
  cma_credits_used?: number;
  desk_reviews_used?: number;
  strategy_calls_used?: number;
  site_visit_credits_used?: number;
  gc_procurement_used?: number;
  usage_period_start?: string;
  gc_procurement_year_start?: string;
  site_visit_year_start?: string;
}

function makeFakeSupabase(seed?: Partial<Row>) {
  let row: Row | null = seed
    ? ({
        email: '',
        stripe_customer_id: null,
        stripe_subscription_id: 'sub_fake',
        tier: 'starter',
        status: 'active',
        current_period_end: null,
        screening_limit: null,
        updated_at: new Date().toISOString(),
        ...seed,
      } as Row)
    : null;

  return {
    get row() { return row; },
    from(table: string) {
      if (table !== 'cd_members') throw new Error(`unexpected table ${table}`);
      const api = {
        _subId: null as string | null,
        select() { return this; },
        eq(_: string, val: string) { this._subId = val; return this; },
        maybeSingle() { return Promise.resolve({ data: row && row.stripe_subscription_id === this._subId ? row : null, error: null }); },
        upsert(input: Row) {
          row = { ...(row ?? ({} as Row)), ...input };
          return { select: () => ({ maybeSingle: () => Promise.resolve({ data: row, error: null }) }) };
        },
      };
      return api;
    },
  } as unknown as Parameters<typeof upsertMemberFromSubscription>[0] & { row: Row | null };
}

const starter: CdTier = {
  key: 'starter',
  label: 'Starter',
  priceUsd: 299,
  screeningLimit: null,
  cmaCreditsPerMonth: 1,
  deskReviewsPerMonth: 0,
  strategyCallsPerMonth: 0,
  siteVisitCreditsPerYear: 0,
  gcProcurementIncludedPerYear: 0,
  dealPackCreditsPerYear: 0,
} as unknown as CdTier;

describe('CD member annual counters (finding #9)', () => {
  it('seeds annual year-start timestamps for brand-new members', async () => {
    const sb = makeFakeSupabase(undefined);
    await upsertMemberFromSubscription(sb, {
      email: 'new@example.com',
      tier: starter,
      status: 'active',
      stripeCustomerId: 'cus_a',
      stripeSubscriptionId: 'sub_new',
      currentPeriodEnd: new Date(Date.now() + 30 * 86400 * 1000),
    });
    expect(sb.row?.gc_procurement_year_start).toBeDefined();
    expect(sb.row?.site_visit_year_start).toBeDefined();
    expect(sb.row?.gc_procurement_used).toBe(0);
    expect(sb.row?.site_visit_credits_used).toBe(0);
  });

  it('does NOT reset gc_procurement_used when the monthly period advances within the same year', async () => {
    const yearStart = new Date(Date.now() - 60 * 86400 * 1000).toISOString();
    const sb = makeFakeSupabase({
      stripe_subscription_id: 'sub_in_year',
      current_period_end: new Date(Date.now() - 1 * 86400 * 1000).toISOString(),
      gc_procurement_used: 2,
      site_visit_credits_used: 1,
      gc_procurement_year_start: yearStart,
      site_visit_year_start: yearStart,
      screening_used: 5,
      cma_credits_used: 2,
    });
    await upsertMemberFromSubscription(sb, {
      email: 'in-year@example.com',
      tier: starter,
      status: 'active',
      stripeCustomerId: 'cus_b',
      stripeSubscriptionId: 'sub_in_year',
      currentPeriodEnd: new Date(Date.now() + 30 * 86400 * 1000),
    });
    expect(sb.row?.gc_procurement_used).toBe(2); // preserved
    expect(sb.row?.site_visit_credits_used).toBe(1); // preserved
    expect(sb.row?.screening_used).toBe(0); // monthly, reset
    expect(sb.row?.cma_credits_used).toBe(0); // monthly, reset
  });

  it('DOES reset annual counters once a year has elapsed', async () => {
    const yearStartYearAgo = new Date(Date.now() - 400 * 86400 * 1000).toISOString();
    const sb = makeFakeSupabase({
      stripe_subscription_id: 'sub_year_old',
      current_period_end: new Date(Date.now() - 1 * 86400 * 1000).toISOString(),
      gc_procurement_used: 3,
      site_visit_credits_used: 2,
      gc_procurement_year_start: yearStartYearAgo,
      site_visit_year_start: yearStartYearAgo,
    });
    await upsertMemberFromSubscription(sb, {
      email: 'renew@example.com',
      tier: starter,
      status: 'active',
      stripeCustomerId: 'cus_c',
      stripeSubscriptionId: 'sub_year_old',
      currentPeriodEnd: new Date(Date.now() + 30 * 86400 * 1000),
    });
    expect(sb.row?.gc_procurement_used).toBe(0);
    expect(sb.row?.site_visit_credits_used).toBe(0);
    // year_start should have been pushed forward
    expect(new Date(sb.row!.gc_procurement_year_start!).getTime())
      .toBeGreaterThan(new Date(yearStartYearAgo).getTime());
  });
});

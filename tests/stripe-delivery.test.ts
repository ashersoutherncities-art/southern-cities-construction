import type { SupabaseClient } from '@supabase/supabase-js';
import { beforeEach, expect, it, vi } from 'vitest';
import {
  claimStripeDelivery,
  finishStripeDelivery,
} from '@/lib/stripe-delivery';
const state = {
  insert: { error: null as { code: string } | null },
  row: {
    status: 'processing',
    attempt_token: 'original-owner',
    lease_until: '',
  },
  updated: { data: null as { event_id: string } | null, error: null },
};
const conditions = vi.fn();
function client() {
  const chain = {
    eq: (...args: unknown[]) => {
      conditions(...args);
      return chain;
    },
    lte: (...args: unknown[]) => {
      conditions(...args);
      return chain;
    },
    select: () => chain,
    maybeSingle: async () => state.updated,
  };
  return {
    from: () => ({
      insert: async () => state.insert,
      select: () => ({
        eq: () => ({ single: async () => ({ data: state.row, error: null }) }),
      }),
      update: () => chain,
    }),
  } as unknown as SupabaseClient;
}
beforeEach(() => {
  conditions.mockReset();
  state.insert = { error: null };
  state.row = {
    status: 'processing',
    attempt_token: 'original-owner',
    lease_until: new Date(Date.now() + 60000).toISOString(),
  };
  state.updated = { data: null, error: null };
});
it('claims the first delivery', async () => {
  const r = await claimStripeDelivery(
    client(),
    'fixture',
    'checkout.session.completed'
  );
  expect(r.state).toBe('claimed');
});
it('does not steal an active lease', async () => {
  state.insert = { error: { code: '23505' } };
  expect(
    (
      await claimStripeDelivery(
        client(),
        'fixture',
        'checkout.session.completed'
      )
    ).state
  ).toBe('busy');
  expect(conditions).not.toHaveBeenCalled();
});
it('deduplicates completed deliveries', async () => {
  state.insert = { error: { code: '23505' } };
  state.row.status = 'completed';
  expect(
    (
      await claimStripeDelivery(
        client(),
        'fixture',
        'checkout.session.completed'
      )
    ).state
  ).toBe('completed');
});
it('does not claim an expired lease if another worker wins the compare-and-swap', async () => {
  state.insert = { error: { code: '23505' } };
  state.row.lease_until = new Date(0).toISOString();
  expect(
    (
      await claimStripeDelivery(
        client(),
        'fixture',
        'checkout.session.completed'
      )
    ).state
  ).toBe('busy');
  expect(conditions).toHaveBeenCalledWith('attempt_token', 'original-owner');
  expect(conditions).toHaveBeenCalledWith('status', 'processing');
});
it('rejects completion from a stale lease owner', async () => {
  await expect(
    finishStripeDelivery(client(), 'fixture', 'stale-owner', null)
  ).rejects.toThrow('Could not complete');
  expect(conditions).toHaveBeenCalledWith('attempt_token', 'stale-owner');
});

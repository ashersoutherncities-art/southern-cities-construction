import { describe, it, expect } from 'vitest';
import {
  beginStripeWebhookEvent,
  markStripeWebhookEventProcessed,
} from '@/lib/stripe-webhook-events';

// Minimal in-memory fake of the subset of PostgrestQueryBuilder / Supabase
// client surface the helpers touch. Enough to drive the state machine.
function makeFakeSupabase(initialRows: Record<string, FakeRow> = {}) {
  const rows: Record<string, FakeRow> = { ...initialRows };

  return {
    rows,
    from(table: string) {
      if (table !== 'stripe_webhook_events') throw new Error(`unexpected table ${table}`);
      const state = {
        eventId: null as string | null,
        mode: 'none' as 'insert' | 'update' | 'select' | 'none',
        updates: {} as Record<string, unknown>,
        mustBeUnprocessed: false,
      };
      const commitUpdate = () => {
        if (state.mode !== 'update' || !state.eventId) return;
        const target = rows[state.eventId];
        if (target && (!state.mustBeUnprocessed || target.processed_at == null)) {
          rows[state.eventId] = { ...target, ...state.updates };
        }
      };
      const api: any = {
        insert(row: FakeRow) {
          if (rows[row.event_id]) {
            return makeMaybeSingle({ data: null, error: { code: '23505' } as Error });
          }
          rows[row.event_id] = { ...row, received_at: new Date().toISOString(), attempt_count: 1, processed_at: null };
          state.mode = 'insert';
          return makeMaybeSingle({ data: { event_id: row.event_id }, error: null });
        },
        select() {
          state.mode = 'select';
          return api;
        },
        update(patch: Record<string, unknown>) {
          state.mode = 'update';
          state.updates = patch;
          return api;
        },
        eq(col: string, val: string) {
          if (col === 'event_id') state.eventId = val;
          return api;
        },
        is(col: string, val: null) {
          if (col === 'processed_at' && val === null) state.mustBeUnprocessed = true;
          return api;
        },
        maybeSingle() {
          const row = state.eventId ? rows[state.eventId] : null;
          if (state.mode === 'update') {
            commitUpdate();
            return Promise.resolve({ data: null, error: null });
          }
          return Promise.resolve({ data: row ? { ...row } : null, error: null });
        },
        // Make the builder awaitable so `await update(...).eq(...).is(...)` commits.
        then(resolve: (v: unknown) => void, reject?: (e: unknown) => void) {
          try {
            commitUpdate();
            resolve({ data: null, error: null });
          } catch (e) {
            if (reject) reject(e);
          }
        },
      };
      return api;
    },
  } as unknown as Awaited<ReturnType<typeof import('@supabase/supabase-js').createClient>> & { rows: Record<string, FakeRow> };
}

interface FakeRow {
  event_id: string;
  event_type?: string;
  received_at?: string;
  processed_at?: string | null;
  attempt_count?: number;
  last_error?: string | null;
}

function makeMaybeSingle(result: { data: unknown; error: unknown }) {
  const o: Record<string, unknown> = { ...result };
  o.select = () => o;
  o.eq = () => o;
  o.maybeSingle = () => Promise.resolve(result);
  return o;
}

describe('stripe webhook idempotency (finding #4)', () => {
  it('claims a fresh event on first delivery', async () => {
    const sb = makeFakeSupabase();
    const res = await beginStripeWebhookEvent(sb, { id: 'evt_test_1', type: 'checkout.session.completed' });
    expect(res.status).toBe('claimed');
    expect(sb.rows['evt_test_1']).toBeDefined();
    expect(sb.rows['evt_test_1'].processed_at ?? null).toBeNull();
  });

  it('reports already_processed on retry after fulfillment succeeded', async () => {
    const sb = makeFakeSupabase();
    await beginStripeWebhookEvent(sb, { id: 'evt_test_2', type: 'checkout.session.completed' });
    await markStripeWebhookEventProcessed(sb, 'evt_test_2');
    const second = await beginStripeWebhookEvent(sb, { id: 'evt_test_2', type: 'checkout.session.completed' });
    expect(second.status).toBe('already_processed');
  });

  it('allows retry when the first attempt crashed before marking processed', async () => {
    const sb = makeFakeSupabase();
    // First attempt claims but throws -> processed_at stays null and the
    // received_at should age past the in-progress window for retry re-entry.
    await beginStripeWebhookEvent(sb, { id: 'evt_test_3', type: 'checkout.session.completed' });
    // Simulate "2 min + 1s ago" received_at on the row.
    sb.rows['evt_test_3'].received_at = new Date(Date.now() - (2 * 60 * 1000 + 1000)).toISOString();

    const retry = await beginStripeWebhookEvent(sb, { id: 'evt_test_3', type: 'checkout.session.completed' });
    expect(retry.status).toBe('claimed');
    expect(retry.status === 'claimed' && retry.attempt).toBe(2);
  });

  it('reports in_progress if a concurrent attempt is still live', async () => {
    const sb = makeFakeSupabase();
    await beginStripeWebhookEvent(sb, { id: 'evt_test_4', type: 'checkout.session.completed' });
    // Fresh received_at -> a second concurrent delivery should not claim.
    const concurrent = await beginStripeWebhookEvent(sb, { id: 'evt_test_4', type: 'checkout.session.completed' });
    expect(concurrent.status).toBe('in_progress');
  });

  it('does not mark processed if the event_id is missing', async () => {
    const sb = makeFakeSupabase();
    // Should not throw and should not touch any row.
    await markStripeWebhookEventProcessed(sb, '');
    expect(Object.keys(sb.rows)).toHaveLength(0);
  });
});

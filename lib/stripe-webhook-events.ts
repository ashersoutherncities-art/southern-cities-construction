import type { SupabaseClient } from '@supabase/supabase-js';

export type BeginResult =
  | { status: 'claimed'; attempt: number }
  | { status: 'already_processed' }
  | { status: 'in_progress'; attempt: number };

// Concurrency-safe webhook event lifecycle. The previous dedup check hit
// `order_events.stripe_event_id`, which was written BEFORE the handler
// finished — a failed fulfillment poisoned the retry path. This table starts
// a row with processed_at = NULL on entry and only flips it to now() after
// every fulfillment step returns ok. If the handler throws, processed_at
// stays NULL and Stripe's retry gets to try again.

const IN_PROGRESS_TIMEOUT_MS = 2 * 60 * 1000; // 2 min — longer than any handler should run

export async function beginStripeWebhookEvent(
  client: SupabaseClient,
  event: { id: string; type: string }
): Promise<BeginResult> {
  if (!event.id) return { status: 'claimed', attempt: 1 };

  // Try to INSERT a fresh row. If it already exists we fall through to the
  // status check below. Postgres surfaces the unique-violation as code 23505.
  const insert = await client
    .from('stripe_webhook_events')
    .insert({ event_id: event.id, event_type: event.type })
    .select('event_id')
    .maybeSingle();

  if (!insert.error) {
    return { status: 'claimed', attempt: 1 };
  }

  // Pre-existing row: fetch its state to decide dedup vs. re-attempt.
  const { data: existing, error: fetchErr } = await client
    .from('stripe_webhook_events')
    .select('event_id, processed_at, attempt_count, received_at')
    .eq('event_id', event.id)
    .maybeSingle();

  if (fetchErr || !existing) {
    // Race or lookup failure — fail open: let the handler run. Downstream
    // writes (orders/order_events) are idempotent by stripe_session_id.
    return { status: 'claimed', attempt: 1 };
  }

  if (existing.processed_at) {
    return { status: 'already_processed' };
  }

  // Someone else may be mid-flight. If the attempt is fresh, defer. If it
  // has been sitting around longer than IN_PROGRESS_TIMEOUT_MS, assume the
  // previous attempt died and bump the attempt counter so Stripe can retry.
  const ageMs = Date.now() - new Date(existing.received_at as string).getTime();
  if (ageMs < IN_PROGRESS_TIMEOUT_MS) {
    return { status: 'in_progress', attempt: existing.attempt_count as number };
  }

  const nextAttempt = (existing.attempt_count as number) + 1;
  await client
    .from('stripe_webhook_events')
    .update({ attempt_count: nextAttempt, received_at: new Date().toISOString() })
    .eq('event_id', event.id)
    .is('processed_at', null);
  return { status: 'claimed', attempt: nextAttempt };
}

export async function markStripeWebhookEventProcessed(
  client: SupabaseClient,
  eventId: string
): Promise<void> {
  if (!eventId) return;
  await client
    .from('stripe_webhook_events')
    .update({ processed_at: new Date().toISOString() })
    .eq('event_id', eventId)
    .is('processed_at', null);
}

export async function recordStripeWebhookEventError(
  client: SupabaseClient,
  eventId: string,
  err: unknown
): Promise<void> {
  if (!eventId) return;
  const msg =
    err instanceof Error ? err.message.slice(0, 2000) : String(err).slice(0, 2000);
  await client
    .from('stripe_webhook_events')
    .update({ last_error: msg })
    .eq('event_id', eventId)
    .is('processed_at', null);
}

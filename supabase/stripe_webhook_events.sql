-- Stripe webhook event tracking: durable, concurrency-safe idempotency store.
--
-- Rationale: the previous dedup lived in `order_events.stripe_event_id` and
-- was written BEFORE downstream fulfillment work ran. A failure during
-- fulfillment would 500 back to Stripe, Stripe would retry, and the next
-- attempt saw the earlier row and short-circuited — permanently losing that
-- event's fulfillment work.
--
-- This table records the full lifecycle:
--   - INSERT on handler entry (processed_at = NULL)
--   - UPDATE processed_at = now() ONLY after every fulfillment step succeeds
--   - If a handler throws, processed_at stays NULL and Stripe's retry will
--     re-enter the handler.
--
-- Deployment: safe standalone migration. No existing data touched. Run at any
-- time before deploying the matching webhook code; the webhook keeps working
-- against the legacy `order_events.stripe_event_id` path until the code flips
-- to this table.

CREATE TABLE IF NOT EXISTS public.stripe_webhook_events (
  event_id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  received_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  processed_at TIMESTAMPTZ,
  attempt_count INTEGER NOT NULL DEFAULT 1,
  last_error TEXT
);

CREATE INDEX IF NOT EXISTS stripe_webhook_events_received_idx
  ON public.stripe_webhook_events (received_at DESC);

CREATE INDEX IF NOT EXISTS stripe_webhook_events_unprocessed_idx
  ON public.stripe_webhook_events (processed_at)
  WHERE processed_at IS NULL;

-- Deny-all RLS. Only the service role (used by the webhook) reads/writes.
ALTER TABLE public.stripe_webhook_events ENABLE ROW LEVEL SECURITY;

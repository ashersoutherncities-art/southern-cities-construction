-- SCC investor consultation funnel — GHL booking webhook dedup ledger.
-- Append-only; a unique constraint on appointment_id is what makes the
-- webhook idempotent against GHL retrying a delivery for the same
-- appointment. See app/api/ghl/booking-webhook/route.ts.

create table if not exists scc_webhook_events (
  id uuid primary key default gen_random_uuid(),
  appointment_id text not null unique,
  calendar_id text,
  contact_id text,
  status text,
  received_at timestamptz not null default now(),
  payload jsonb
);

create index if not exists scc_webhook_events_received_at_idx
  on scc_webhook_events (received_at desc);

alter table scc_webhook_events enable row level security;

-- Service-role only — this table is never read or written from the browser.
drop policy if exists "service role full access" on scc_webhook_events;
create policy "service role full access" on scc_webhook_events
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

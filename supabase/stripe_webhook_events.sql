-- Delivery leases prevent concurrent fulfillment; failures release the lease for Stripe retries.
create table if not exists public.stripe_webhook_events (
 event_id text primary key, event_type text not null, status text not null check(status in ('processing','completed')),
 attempt_token uuid not null, lease_until timestamptz not null, completed_at timestamptz, order_id bigint references public.orders(id) on delete set null
);
alter table public.stripe_webhook_events enable row level security;
revoke all on public.stripe_webhook_events from anon, authenticated;
grant all on public.stripe_webhook_events to service_role;

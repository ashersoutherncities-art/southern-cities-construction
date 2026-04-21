create table if not exists public.order_events (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  order_id bigint not null references public.orders(id) on delete cascade,
  event_type text not null,
  source text not null default 'system',
  message text,
  stripe_event_id text,
  payload jsonb not null default '{}'::jsonb
);

create unique index if not exists order_events_stripe_event_id_uidx
  on public.order_events (stripe_event_id)
  where stripe_event_id is not null;

create index if not exists order_events_order_id_idx
  on public.order_events (order_id);

create index if not exists order_events_created_at_idx
  on public.order_events (created_at desc);

create index if not exists order_events_event_type_idx
  on public.order_events (event_type);

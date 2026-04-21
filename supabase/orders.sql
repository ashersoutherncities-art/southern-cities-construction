create table if not exists public.orders (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  workflow text not null default 'general',
  product_key text not null,
  product_name text not null,
  product_description text,

  buyer_name text not null,
  buyer_email text not null,
  buyer_phone text,
  billing_address text,

  project_address text,
  project_manager_role text,
  project_manager_name text,
  project_manager_email text,
  project_manager_phone text,
  entity_type text,
  project_timeline text,
  scope_notes text,

  amount_total_cents bigint,
  currency text not null default 'usd',

  stripe_session_id text,
  stripe_customer_id text,
  stripe_payment_intent_id text,
  stripe_charge_id text,

  status text not null default 'initiated',
  payment_status text,

  related_table text,
  related_id bigint,

  metadata jsonb not null default '{}'::jsonb,

  paid_at timestamptz,
  cancelled_at timestamptz,
  refunded_at timestamptz
);

create unique index if not exists orders_stripe_session_id_uidx
  on public.orders (stripe_session_id)
  where stripe_session_id is not null;

create index if not exists orders_created_at_idx
  on public.orders (created_at desc);

create index if not exists orders_buyer_email_idx
  on public.orders (buyer_email);

create index if not exists orders_workflow_idx
  on public.orders (workflow);

create index if not exists orders_status_idx
  on public.orders (status);

create index if not exists orders_product_key_idx
  on public.orders (product_key);

create index if not exists orders_stripe_payment_intent_id_idx
  on public.orders (stripe_payment_intent_id);

create or replace function public.set_orders_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
before update on public.orders
for each row
execute function public.set_orders_updated_at();

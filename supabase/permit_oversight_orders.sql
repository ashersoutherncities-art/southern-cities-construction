create table if not exists public.permit_oversight_orders (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  buyer_name text not null,
  buyer_email text not null,
  buyer_phone text,
  billing_address text,
  project_address text not null,
  project_manager_role text not null,
  project_manager_name text,
  project_manager_email text,
  project_manager_phone text,
  entity_type text,
  project_timeline text,
  scope_notes text,
  service_name text not null default 'Permit Administration + Construction Oversight',
  payment_status text not null default 'paid',
  payment_reference text,
  amount_paid numeric,
  onboarding_status text not null default 'awaiting_contract_signature',
  contract_status text not null default 'pending_signature',
  portal_path text,
  portal_email text,
  temporary_password text,
  receipt_email_from text,
  receipt_status text,
  invoice_status text,
  esign_provider text,
  esign_status text,
  internal_summary text
);

alter table public.permit_oversight_orders
  add column if not exists stripe_session_id text,
  add column if not exists stripe_customer_id text,
  add column if not exists stripe_payment_intent_id text,
  add column if not exists stripe_charge_id text,
  add column if not exists order_id bigint references public.orders(id) on delete set null;

create index if not exists permit_oversight_orders_created_at_idx
  on public.permit_oversight_orders (created_at desc);

create index if not exists permit_oversight_orders_buyer_email_idx
  on public.permit_oversight_orders (buyer_email);

create unique index if not exists permit_oversight_orders_stripe_session_uidx
  on public.permit_oversight_orders (stripe_session_id)
  where stripe_session_id is not null;

create index if not exists permit_oversight_orders_order_id_idx
  on public.permit_oversight_orders (order_id);

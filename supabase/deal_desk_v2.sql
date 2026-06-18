-- Deal Desk v2: snapshot-history payloads (for re-download), CMA orders, Pro CMA credits.
-- Apply in the Supabase SQL editor (safe to re-run).

-- 1) Store enough on each run to regenerate the PDF + power the history sidebar.
alter table public.deal_desk_snapshot_usage
  add column if not exists lead_first text,
  add column if not exists lead_last text,
  add column if not exists project jsonb,
  add column if not exists scope jsonb,
  add column if not exists estimate jsonb,
  add column if not exists mao_payload jsonb;

-- 2) Track the Pro tier's included CMA credit (reset each billing cycle).
alter table public.deal_desk_members
  add column if not exists cma_credits_used integer not null default 0;

-- 3) Broker CMA orders (à la carte purchase or Pro credit).
do $$
begin
  if not exists (select 1 from pg_type where typname = 'deal_desk_cma_status') then
    create type public.deal_desk_cma_status as enum ('requested', 'paid', 'in_progress', 'delivered', 'canceled');
  end if;
end $$;

create table if not exists public.deal_desk_cma_orders (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references public.deal_desk_members (id) on delete set null,
  email text not null,
  property_address text not null,
  amount_cents integer not null default 0,
  was_credit boolean not null default false,
  status public.deal_desk_cma_status not null default 'requested',
  stripe_session_id text,
  created_at timestamptz not null default now()
);

create index if not exists deal_desk_cma_orders_email_idx
  on public.deal_desk_cma_orders (email, created_at desc);

alter table public.deal_desk_cma_orders enable row level security;

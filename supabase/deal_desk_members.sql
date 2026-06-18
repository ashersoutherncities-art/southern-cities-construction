-- Deal Desk membership: who is subscribed, their tier, and monthly snapshot usage.
-- Apply in the Supabase SQL editor (same as the other supabase/*.sql files).

do $$
begin
  if not exists (select 1 from pg_type where typname = 'deal_desk_tier') then
    create type public.deal_desk_tier as enum ('starter', 'active', 'pro');
  end if;
  if not exists (select 1 from pg_type where typname = 'deal_desk_member_status') then
    -- mirrors Stripe subscription statuses we care about
    create type public.deal_desk_member_status as enum ('active', 'trialing', 'past_due', 'canceled', 'incomplete');
  end if;
end $$;

create table if not exists public.deal_desk_members (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  stripe_customer_id text,
  stripe_subscription_id text unique,
  tier public.deal_desk_tier not null,
  status public.deal_desk_member_status not null default 'active',
  current_period_end timestamptz,
  snapshot_limit integer, -- null = unlimited
  snapshots_used integer not null default 0,
  usage_period_start timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- One active membership per email (case-insensitive). Lapsed rows are upserted
-- in place, so email is the natural key the member area looks up by.
create unique index if not exists deal_desk_members_email_key
  on public.deal_desk_members (lower(email));

-- Audit log: every snapshot a member consumes, for metering + support.
create table if not exists public.deal_desk_snapshot_usage (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.deal_desk_members (id) on delete cascade,
  property_address text,
  mao integer,
  verdict text,
  recommend_cma boolean,
  created_at timestamptz not null default now()
);

create index if not exists deal_desk_snapshot_usage_member_idx
  on public.deal_desk_snapshot_usage (member_id, created_at desc);

-- Service-role only (server reads/writes via the service key); no public RLS policies.
alter table public.deal_desk_members enable row level security;
alter table public.deal_desk_snapshot_usage enable row level security;

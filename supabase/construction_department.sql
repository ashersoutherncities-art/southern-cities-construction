-- Southern Cities Construction Department — rename + extend the former Deal
-- Desk membership tables. Confirmed via a live read-only check on 2026-09-19:
-- deal_desk_members has exactly 1 row, already status='canceled' — there are
-- zero live paying subscribers, so this is a clean rename, not a live-customer
-- migration requiring a maintenance window.
--
-- APPLY MANUALLY in the Supabase SQL editor (no direct DB connection available
-- in this environment — same as every other migration in this repo).
--
-- Run this BEFORE deploying the app code in lib/construction-department/*,
-- since that code reads from the renamed table/column names immediately.

-- 1. Rename the tier enum and remap its values.
--    Old: deal_desk_tier ('starter','active','pro')
--    New: cd_tier ('starter','investor','operator')
--    The 1 existing member row has tier='active' (per the live check) — decide
--    its new value before running the update below. Defaulting it to
--    'investor' here since that's the closest equivalent tier; adjust the
--    WHEN clause below if a different mapping is preferred before applying.
do $$
begin
  if not exists (select 1 from pg_type where typname = 'cd_tier') then
    create type public.cd_tier as enum ('starter', 'investor', 'operator');
  end if;
end $$;

alter table public.deal_desk_members rename to cd_members;

alter table public.cd_members rename column tier to tier_old;
alter table public.cd_members add column tier public.cd_tier;

update public.cd_members set tier = (
  case tier_old::text
    when 'starter' then 'starter'
    when 'active' then 'investor'
    when 'pro' then 'operator'
    else 'starter'
  end
)::public.cd_tier;

alter table public.cd_members alter column tier set not null;
alter table public.cd_members drop column tier_old;

-- 2. Rename usage columns to the SCREEN-stage naming.
alter table public.cd_members rename column snapshot_limit to screening_limit;
alter table public.cd_members rename column snapshots_used to screening_used;

-- 3. Add the new allocated-benefit counters (ANALYZE, and PROCURE below).
alter table public.cd_members
  add column if not exists desk_reviews_used integer not null default 0,
  add column if not exists strategy_calls_used integer not null default 0,
  add column if not exists site_visit_credits_used integer not null default 0,
  add column if not exists gc_procurement_used integer not null default 0;

-- 4. Rename the snapshot-usage/history table to match.
alter table public.deal_desk_snapshot_usage rename to cd_screening_usage;

-- 4b. Rename the CMA-order table for consistency (referenced from the
--     Construction Department webhook's broker-CMA one-time-purchase path).
alter table public.deal_desk_cma_orders rename to cd_cma_orders;
alter index if exists deal_desk_cma_orders_email_idx rename to cd_cma_orders_email_idx;

-- 5. ANALYZE product — Construction Desk Review request/delivery/audit trail.
--    New table, no rename source.
do $$
begin
  if not exists (select 1 from pg_type where typname = 'cd_desk_review_status') then
    create type public.cd_desk_review_status as enum
      ('requested', 'in_review', 'delivered', 'canceled');
  end if;
end $$;

create table if not exists public.cd_desk_reviews (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references public.cd_members (id) on delete set null,
  email text not null,
  property_address text not null,
  screening_id uuid references public.cd_screening_usage (id) on delete set null,
  was_credit boolean not null default true,
  order_id bigint references public.orders (id) on delete set null,
  status public.cd_desk_review_status not null default 'requested',
  reviewer_email text,
  scope_notes text,
  finish_level_recommendation text,
  risk_notes text,
  delivered_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists cd_desk_reviews_member_idx on public.cd_desk_reviews (member_id, created_at desc);
create index if not exists cd_desk_reviews_email_idx on public.cd_desk_reviews (email);
alter table public.cd_desk_reviews enable row level security;

-- 6. Lead-qualification fields on the SCREEN tool's own tables (not
--    service_inquiries — see the plan's §1c reasoning: this table is shared
--    across every avatar's cold-lead forms and most of that traffic has no
--    use for investor-specific qualification fields).
alter table public.leads
  add column if not exists investor_state text,               -- investor's OWN location, distinct from projects.state (the property's location)
  add column if not exists years_experience_band text,
  add column if not exists deals_per_year_band text,
  add column if not exists needs_construction_execution boolean;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'ownership_status_enum') then
    create type public.ownership_status_enum as enum ('considering', 'under_contract', 'owned');
  end if;
  if not exists (select 1 from pg_type where typname = 'financing_method_enum') then
    create type public.financing_method_enum as enum ('cash', 'hard_money', 'conventional', 'private', 'heloc', 'other');
  end if;
end $$;

alter table public.projects
  add column if not exists ownership_status public.ownership_status_enum,
  add column if not exists expected_purchase_price numeric,
  add column if not exists expected_arv numeric,
  add column if not exists financing_method public.financing_method_enum,
  add column if not exists target_timeline_weeks integer;

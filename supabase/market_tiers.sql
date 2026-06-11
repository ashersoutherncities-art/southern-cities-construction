-- ===========================================================================
-- market_tiers — regional cost-tier multipliers for the Rehab Budget Range
-- & Execution Risk Snapshot. Maps NC 3-digit ZIP prefixes to a cost tier and
-- a base-cost multiplier. The estimate engine applies the matched multiplier
-- to the per-SF base cost so the same scope prices correctly across markets.
--
-- Also refines the per-SF base_cost values in estimate_rules to a statewide
-- NC baseline (the tier multiplier then scales up for metros / down for rural).
--
-- Idempotent: safe to re-run. Depends on rehab_budget_snapshots.sql.
-- ===========================================================================

create table if not exists public.market_tiers (
  id uuid primary key default gen_random_uuid(),
  zip_prefix text not null unique,
  tier text not null,
  label text not null,
  cost_multiplier_low numeric not null default 1.0,
  cost_multiplier_high numeric not null default 1.0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists market_tiers_zip_prefix_idx on public.market_tiers (zip_prefix) where active = true;
create index if not exists market_tiers_tier_idx on public.market_tiers (tier) where active = true;

create or replace function public.touch_market_tiers_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists market_tiers_touch_updated_at on public.market_tiers;
create trigger market_tiers_touch_updated_at
before update on public.market_tiers
for each row execute function public.touch_market_tiers_updated_at();

-- RLS: service role only (matches estimate_rules — server-side reads).
alter table public.market_tiers enable row level security;

-- Seed / upsert NC tiers. Re-running updates values in place.
insert into public.market_tiers (zip_prefix, tier, label, cost_multiplier_low, cost_multiplier_high, active) values
  -- Tier A — high-cost metros
  ('275', 'A', 'Raleigh',                    1.10, 1.18, true),
  ('276', 'A', 'Raleigh–Durham',             1.10, 1.18, true),
  ('277', 'A', 'Durham',                     1.10, 1.18, true),
  ('280', 'A', 'Charlotte Metro (Gastonia)', 1.10, 1.18, true),
  ('281', 'A', 'Charlotte Metro',            1.10, 1.18, true),
  ('282', 'A', 'Charlotte',                  1.12, 1.20, true),
  ('287', 'A', 'Asheville Area',             1.10, 1.18, true),
  ('288', 'A', 'Asheville',                  1.10, 1.18, true),
  ('289', 'A', 'Western NC Mountains',       1.08, 1.16, true),
  -- Tier B — mid-cost
  ('270', 'B', 'Greensboro',                 1.00, 1.05, true),
  ('271', 'B', 'Winston-Salem',              1.00, 1.05, true),
  ('272', 'B', 'Greensboro',                 1.00, 1.05, true),
  ('273', 'B', 'Triad',                      1.00, 1.05, true),
  ('274', 'B', 'High Point',                 1.00, 1.05, true),
  ('284', 'B', 'Wilmington',                 1.02, 1.08, true),
  ('286', 'B', 'Hickory',                    0.98, 1.04, true),
  -- Tier C — lower-cost rural / eastern NC
  ('278', 'C', 'Rocky Mount',                0.90, 0.96, true),
  ('279', 'C', 'Elizabeth City',             0.90, 0.96, true),
  ('283', 'C', 'Fayetteville',               0.92, 0.98, true),
  ('285', 'C', 'Kinston / Goldsboro',        0.90, 0.96, true)
on conflict (zip_prefix) do update set
  tier = excluded.tier,
  label = excluded.label,
  cost_multiplier_low = excluded.cost_multiplier_low,
  cost_multiplier_high = excluded.cost_multiplier_high,
  active = excluded.active;

-- ---------------------------------------------------------------------------
-- Refine per-SF base_cost values to a statewide NC baseline. The tier
-- multiplier above now scales these up for metros and down for rural NC, so
-- the base should NOT carry metro pricing. Idempotent UPDATE by rule_name.
-- ---------------------------------------------------------------------------
update public.estimate_rules set low_value = 20,  high_value = 40  where rule_name = 'base-cosmetic';
update public.estimate_rules set low_value = 18,  high_value = 45  where rule_name = 'base-rental-turn';
update public.estimate_rules set low_value = 42,  high_value = 85  where rule_name = 'base-moderate-rehab';
update public.estimate_rules set low_value = 85,  high_value = 160 where rule_name = 'base-heavy-rehab';
update public.estimate_rules set low_value = 130, high_value = 230 where rule_name = 'base-full-gut';
update public.estimate_rules set low_value = 160, high_value = 280 where rule_name = 'base-structural-heavy';
update public.estimate_rules set low_value = 165, high_value = 325 where rule_name = 'base-addition';
update public.estimate_rules set low_value = 48,  high_value = 110 where rule_name = 'base-unknown';

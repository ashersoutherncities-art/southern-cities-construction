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
  ('275', 'A', 'Raleigh', 1.04, 1.04, true),
  ('276', 'A', 'Raleigh–Durham', 1.04, 1.04, true),
  ('277', 'A', 'Durham', 1.04, 1.04, true),
  ('280', 'A', 'Charlotte Metro (Gastonia)', 1.03, 1.03, true),
  ('281', 'A', 'Charlotte Metro', 1.03, 1.03, true),
  ('282', 'A', 'Charlotte', 1.03, 1.03, true),
  ('287', 'A', 'Asheville Area', 1.02, 1.02, true),
  ('288', 'A', 'Asheville', 1.02, 1.02, true),
  ('289', 'A', 'Western NC Mountains', 1.02, 1.02, true),
  ('284', 'A', 'Wilmington', 1.01, 1.01, true),
  ('270', 'B', 'Greensboro', 0.98, 0.98, true),
  ('271', 'B', 'Winston-Salem', 0.98, 0.98, true),
  ('272', 'B', 'Greensboro', 0.98, 0.98, true),
  ('273', 'B', 'Triad', 0.98, 0.98, true),
  ('274', 'B', 'High Point', 0.98, 0.98, true),
  ('283', 'C', 'Fayetteville', 0.97, 0.97, true),
  ('286', 'C', 'Hickory', 0.97, 0.97, true),
  ('278', 'C', 'Rocky Mount', 0.95, 0.95, true),
  ('279', 'C', 'Elizabeth City', 0.95, 0.95, true),
  ('285', 'C', 'Kinston / Goldsboro', 0.95, 0.95, true)
on conflict (zip_prefix) do update set
  tier = excluded.tier,
  label = excluded.label,
  cost_multiplier_low = excluded.cost_multiplier_low,
  cost_multiplier_high = excluded.cost_multiplier_high,
  active = excluded.active;

-- ---------------------------------------------------------------------------
-- Recalibrate per-SF base_cost to a statewide NC baseline anchored to the
-- reality that contractor-grade NEW construction in NC is ~$125/SF. A rehab
-- keeps the shell/foundation/framing, so it costs a FRACTION of new-build for
-- most categories; only full gut / structural / addition approach or exceed
-- it. Bases are basic-finish / newer-build / average-market (multipliers=1.0);
-- finish/age/tier multipliers + contingency scale up from here.
-- Idempotent UPDATE by rule_name.
-- ---------------------------------------------------------------------------
update public.estimate_rules set low_value = 10,  high_value = 22  where rule_name = 'base-cosmetic';
update public.estimate_rules set low_value = 9,   high_value = 20  where rule_name = 'base-rental-turn';
update public.estimate_rules set low_value = 24,  high_value = 44  where rule_name = 'base-moderate-rehab';
update public.estimate_rules set low_value = 48,  high_value = 72  where rule_name = 'base-heavy-rehab';
update public.estimate_rules set low_value = 72,  high_value = 105 where rule_name = 'base-full-gut';
update public.estimate_rules set low_value = 90,  high_value = 130 where rule_name = 'base-structural-heavy';
update public.estimate_rules set low_value = 120, high_value = 175 where rule_name = 'base-addition';
update public.estimate_rules set low_value = 28,  high_value = 55  where rule_name = 'base-unknown';

-- Recalibrate flat scope allowances to NC basic-flip / investor-grade pricing.
update public.estimate_rules set low_value = 6000,  high_value = 14000 where rule_name = 'allowance-roof';
update public.estimate_rules set low_value = 6000,  high_value = 12000 where rule_name = 'allowance-hvac';
update public.estimate_rules set low_value = 12000, high_value = 28000 where rule_name = 'allowance-kitchen-full';
update public.estimate_rules set low_value = 6000,  high_value = 14000 where rule_name = 'allowance-bathroom-full';
update public.estimate_rules set low_value = 500,   high_value = 1000  where rule_name = 'allowance-windows';
update public.estimate_rules set low_value = 8000,  high_value = 18000 where rule_name = 'allowance-electrical-full';
update public.estimate_rules set low_value = 8000,  high_value = 18000 where rule_name = 'allowance-plumbing-full';
update public.estimate_rules set low_value = 6000,  high_value = 20000 where rule_name = 'allowance-framing';
update public.estimate_rules set low_value = 10000, high_value = 35000 where rule_name = 'allowance-foundation';
update public.estimate_rules set low_value = 8000,  high_value = 22000 where rule_name = 'allowance-siding';

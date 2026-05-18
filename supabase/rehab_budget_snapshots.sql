do $$
begin
  if not exists (select 1 from pg_type where typname = 'investor_type') then
    create type public.investor_type as enum ('flipper', 'brrrr', 'landlord', 'wholesaler', 'developer', 'homeowner', 'realtor', 'other');
  end if;
  if not exists (select 1 from pg_type where typname = 'lead_status') then
    create type public.lead_status as enum ('new', 'report_sent', 'follow_up_needed', 'booked_call', 'converted', 'closed_lost');
  end if;
  if not exists (select 1 from pg_type where typname = 'property_type') then
    create type public.property_type as enum ('single_family', 'duplex', 'triplex', 'fourplex', 'multifamily', 'manufactured', 'mixed_use', 'other');
  end if;
  if not exists (select 1 from pg_type where typname = 'occupancy_status') then
    create type public.occupancy_status as enum ('occupied', 'vacant', 'unknown');
  end if;
  if not exists (select 1 from pg_type where typname = 'investment_strategy') then
    create type public.investment_strategy as enum ('flip', 'rental', 'brrrr', 'wholesale_eval', 'owner_occupied', 'development', 'other');
  end if;
  if not exists (select 1 from pg_type where typname = 'target_finish_level') then
    create type public.target_finish_level as enum ('rental_grade', 'basic_flip', 'mid_grade', 'high_end', 'luxury');
  end if;
  if not exists (select 1 from pg_type where typname = 'project_category_enum') then
    create type public.project_category_enum as enum ('cosmetic', 'rental_turn', 'moderate_rehab', 'heavy_rehab', 'full_gut', 'structural_heavy', 'addition', 'unknown');
  end if;
  if not exists (select 1 from pg_type where typname = 'confidence_level_enum') then
    create type public.confidence_level_enum as enum ('high', 'moderate', 'low');
  end if;
  if not exists (select 1 from pg_type where typname = 'execution_difficulty_enum') then
    create type public.execution_difficulty_enum as enum ('low', 'moderate', 'high', 'severe');
  end if;
  if not exists (select 1 from pg_type where typname = 'permit_complexity_enum') then
    create type public.permit_complexity_enum as enum ('low', 'moderate', 'high', 'unknown');
  end if;
  if not exists (select 1 from pg_type where typname = 'estimate_rule_unit') then
    create type public.estimate_rule_unit as enum ('per_sf', 'flat', 'per_item', 'multiplier', 'weeks');
  end if;
  if not exists (select 1 from pg_type where typname = 'report_delivery_status') then
    create type public.report_delivery_status as enum ('pending', 'sent', 'failed', 'skipped');
  end if;
end $$;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  company_name text,
  investor_type public.investor_type not null,
  created_at timestamptz not null default now(),
  ghl_contact_id text,
  source text not null default 'rehab-budget-range-execution-risk-snapshot',
  status public.lead_status not null default 'new'
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  property_address text not null,
  city text not null,
  state text not null,
  zip text not null,
  property_type public.property_type not null,
  square_feet integer not null check (square_feet > 0),
  year_built integer,
  stories integer,
  bedrooms integer,
  bathrooms numeric(4,1),
  occupancy_status public.occupancy_status not null default 'unknown',
  investment_strategy public.investment_strategy not null,
  target_finish_level public.target_finish_level not null,
  created_at timestamptz not null default now()
);

create table if not exists public.project_scope_inputs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  cosmetic_paint boolean not null default false,
  flooring boolean not null default false,
  kitchen_refresh boolean not null default false,
  kitchen_full boolean not null default false,
  bathroom_refresh_count integer not null default 0,
  bathroom_full_count integer not null default 0,
  roof boolean not null default false,
  hvac boolean not null default false,
  plumbing_partial boolean not null default false,
  plumbing_full boolean not null default false,
  electrical_partial boolean not null default false,
  electrical_full boolean not null default false,
  windows boolean not null default false,
  siding boolean not null default false,
  drywall boolean not null default false,
  framing boolean not null default false,
  structural boolean not null default false,
  foundation boolean not null default false,
  addition boolean not null default false,
  layout_changes boolean not null default false,
  full_gut boolean not null default false,
  fire_damage boolean not null default false,
  water_damage boolean not null default false,
  mold_concern boolean not null default false,
  termite_concern boolean not null default false,
  exterior_work boolean not null default false,
  landscaping boolean not null default false,
  driveway boolean not null default false,
  permit_required_unknown boolean not null default false,
  notes text not null default ''
);

create table if not exists public.estimate_rules (
  id uuid primary key default gen_random_uuid(),
  rule_name text not null unique,
  category text not null,
  condition_json jsonb not null default '{}'::jsonb,
  low_value numeric not null,
  high_value numeric not null,
  unit public.estimate_rule_unit not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.estimates (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  project_category public.project_category_enum not null,
  low_estimate numeric not null,
  high_estimate numeric not null,
  high_risk_estimate numeric,
  timeline_low_weeks integer not null,
  timeline_high_weeks integer not null,
  confidence_level public.confidence_level_enum not null,
  confidence_score integer not null,
  execution_difficulty public.execution_difficulty_enum not null,
  permit_complexity public.permit_complexity_enum not null,
  assumptions_json jsonb not null default '[]'::jsonb,
  risk_flags_json jsonb not null default '[]'::jsonb,
  recommendation text not null,
  breakdown_json jsonb not null default '[]'::jsonb,
  what_could_change_json jsonb not null default '[]'::jsonb,
  execution_summary text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.uploads (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  file_url text not null,
  file_type text,
  uploaded_at timestamptz not null default now()
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  estimate_id uuid not null references public.estimates(id) on delete cascade,
  pdf_url text,
  email_sent boolean not null default false,
  sent_at timestamptz,
  email_delivery_status public.report_delivery_status not null default 'pending',
  delivery_error text,
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (email);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists projects_lead_id_idx on public.projects (lead_id);
create index if not exists projects_created_at_idx on public.projects (created_at desc);
create index if not exists estimate_rules_category_idx on public.estimate_rules (category) where active = true;
create index if not exists estimates_project_id_idx on public.estimates (project_id);
create index if not exists estimates_created_at_idx on public.estimates (created_at desc);
create index if not exists uploads_project_id_idx on public.uploads (project_id);
create index if not exists reports_estimate_id_idx on public.reports (estimate_id);

create or replace function public.touch_estimate_rules_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists estimate_rules_touch_updated_at on public.estimate_rules;
create trigger estimate_rules_touch_updated_at
before update on public.estimate_rules
for each row execute function public.touch_estimate_rules_updated_at();

insert into storage.buckets (id, name, public)
values ('rehab-snapshot-uploads', 'rehab-snapshot-uploads', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('rehab-snapshot-reports', 'rehab-snapshot-reports', false)
on conflict (id) do nothing;

insert into public.estimate_rules (rule_name, category, condition_json, low_value, high_value, unit, active)
values
  ('base-cosmetic', 'base_cost', '{"project_category":"cosmetic"}', 25, 45, 'per_sf', true),
  ('base-rental-turn', 'base_cost', '{"project_category":"rental_turn"}', 20, 55, 'per_sf', true),
  ('base-moderate-rehab', 'base_cost', '{"project_category":"moderate_rehab"}', 45, 90, 'per_sf', true),
  ('base-heavy-rehab', 'base_cost', '{"project_category":"heavy_rehab"}', 90, 175, 'per_sf', true),
  ('base-full-gut', 'base_cost', '{"project_category":"full_gut"}', 140, 250, 'per_sf', true),
  ('base-structural-heavy', 'base_cost', '{"project_category":"structural_heavy"}', 175, 300, 'per_sf', true),
  ('base-addition', 'base_cost', '{"project_category":"addition"}', 175, 350, 'per_sf', true),
  ('base-unknown', 'base_cost', '{"project_category":"unknown"}', 55, 120, 'per_sf', true),
  ('finish-rental-grade', 'finish_multiplier', '{"target_finish_level":"rental_grade"}', 0.90, 0.90, 'multiplier', true),
  ('finish-basic-flip', 'finish_multiplier', '{"target_finish_level":"basic_flip"}', 1.00, 1.00, 'multiplier', true),
  ('finish-mid-grade', 'finish_multiplier', '{"target_finish_level":"mid_grade"}', 1.15, 1.15, 'multiplier', true),
  ('finish-high-end', 'finish_multiplier', '{"target_finish_level":"high_end"}', 1.35, 1.35, 'multiplier', true),
  ('finish-luxury', 'finish_multiplier', '{"target_finish_level":"luxury"}', 1.75, 1.75, 'multiplier', true),
  ('age-before-1940', 'age_multiplier', '{"max_year_built":1939}', 1.20, 1.20, 'multiplier', true),
  ('age-1940-1979', 'age_multiplier', '{"min_year_built":1940,"max_year_built":1979}', 1.12, 1.12, 'multiplier', true),
  ('age-1980-1999', 'age_multiplier', '{"min_year_built":1980,"max_year_built":1999}', 1.06, 1.06, 'multiplier', true),
  ('age-2000-plus', 'age_multiplier', '{"min_year_built":2000}', 1.00, 1.00, 'multiplier', true),
  ('risk-water-damage', 'risk_multiplier', '{"field":"water_damage","label":"Water damage","risk_flag":"Water damage often expands after demolition and can pull hidden framing, subfloor, and mold exposure into the job."}', 1.08, 1.18, 'multiplier', true),
  ('risk-fire-damage', 'risk_multiplier', '{"field":"fire_damage","label":"Fire damage","risk_flag":"Fire damage can move the project into hidden framing, insulation, smoke remediation, and full-system replacement territory."}', 1.20, 1.50, 'multiplier', true),
  ('risk-structural', 'risk_multiplier', '{"field":"structural","label":"Structural concern","risk_flag":"Structural issues can change the scope materially once engineering, demolition, and rebuild sequencing are validated."}', 1.20, 1.60, 'multiplier', true),
  ('risk-foundation', 'risk_multiplier', '{"field":"foundation","label":"Foundation concern","risk_flag":"Foundation concerns can materially change sequencing, engineer involvement, and repair cost once exposed."}', 1.20, 1.60, 'multiplier', true),
  ('risk-electrical-full', 'risk_multiplier', '{"field":"electrical_full","label":"Full electrical","risk_flag":"Full electrical replacement adds wall-open work, panel coordination, and inspection exposure."}', 1.08, 1.20, 'multiplier', true),
  ('risk-plumbing-full', 'risk_multiplier', '{"field":"plumbing_full","label":"Full plumbing","risk_flag":"Full plumbing replacement adds access, trade coordination, and wall-close sequencing exposure."}', 1.08, 1.20, 'multiplier', true),
  ('risk-layout-changes', 'risk_multiplier', '{"field":"layout_changes","label":"Layout changes","risk_flag":"Layout changes usually move the job out of straight finish work and into coordination, framing, and permit risk."}', 1.10, 1.25, 'multiplier', true),
  ('risk-addition', 'risk_multiplier', '{"field":"addition","label":"Addition","risk_flag":"Additions increase permitting, structural integration, and schedule risk well beyond a standard rehab."}', 1.25, 1.80, 'multiplier', true),
  ('risk-permit-unknown', 'risk_multiplier', '{"field":"permit_required_unknown","label":"Unknown permit complexity","risk_flag":"Unknown permit complexity can change both cost and timeline once trade, zoning, and jurisdiction requirements are known."}', 1.05, 1.15, 'multiplier', true),
  ('allowance-roof', 'scope_line', '{"field":"roof","label":"Roof replacement"}', 7500, 18000, 'flat', true),
  ('allowance-hvac', 'scope_line', '{"field":"hvac","label":"HVAC replacement"}', 8000, 16000, 'flat', true),
  ('allowance-kitchen-full', 'scope_line', '{"field":"kitchen_full","label":"Full kitchen renovation"}', 18000, 45000, 'flat', true),
  ('allowance-bathroom-full', 'scope_line', '{"field":"bathroom_full_count","label":"Full bathroom renovation"}', 8000, 22000, 'per_item', true),
  ('allowance-windows', 'scope_line', '{"field":"windows","label":"Windows","fallback_count":10}', 600, 1500, 'per_item', true),
  ('allowance-electrical-full', 'scope_line', '{"field":"electrical_full","label":"Electrical full rewire"}', 10000, 28000, 'flat', true),
  ('allowance-plumbing-full', 'scope_line', '{"field":"plumbing_full","label":"Plumbing full replacement"}', 10000, 28000, 'flat', true),
  ('allowance-siding', 'scope_line', '{"field":"siding","label":"Siding"}', 10000, 30000, 'flat', true),
  ('timeline-permit-high', 'timeline_risk', '{"permit_complexity":"high","label":"Permit complexity high"}', 4, 12, 'weeks', true),
  ('timeline-structural', 'timeline_risk', '{"any_fields":["structural","foundation"],"label":"Structural or foundation work"}', 4, 16, 'weeks', true),
  ('timeline-damage', 'timeline_risk', '{"any_fields":["fire_damage","water_damage"],"label":"Fire or water damage"}', 3, 10, 'weeks', true),
  ('timeline-systems', 'timeline_risk', '{"any_fields":["electrical_full","plumbing_full","hvac"],"label":"Full systems replacement"}', 2, 8, 'weeks', true)
on conflict (rule_name) do update set
  category = excluded.category,
  condition_json = excluded.condition_json,
  low_value = excluded.low_value,
  high_value = excluded.high_value,
  unit = excluded.unit,
  active = excluded.active,
  updated_at = now();

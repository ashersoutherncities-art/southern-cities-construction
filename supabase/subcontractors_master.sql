-- ===========================================================================
-- subcontractors — the curated MASTER directory (system of record) that powers
-- the Value Engine: "a reliable number anywhere in NC, and we commit to build it."
--
-- This is the queryable directory the matching engine reads. It is distinct from
-- public.subcontractor_applications (raw INBOUND intake from the /partners form):
--   subcontractor_applications = raw applicants  →  (approve)  →  subcontractors master
-- Sourced subs (scraped/licensing-board/permit records) land here directly with
-- source = 'sourced-import' and status = 'new'.
--
-- Canonical enums are kept in sync with sc-platform/lib/vendors.ts:
--   NC_REGIONS (7)  and  COMMON_TRADES (18)  and  V_STATUSES (new|vetting|approved|bench|declined)
-- Regions live in a text[] (multi-coverage) with a GIN index, matching vendors.ts `regions text[]`.
-- Granular market pricing joins via public.market_tiers (ZIP-prefix → tier + multiplier).
--
-- Idempotent: safe to re-run. Apply in the Supabase SQL editor, THEN run
-- subcontractors_import.sql to load the 119-sub seed.
-- ===========================================================================

create table if not exists public.subcontractors (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- identity
  company_name text not null,
  contact_name text,
  email text,
  phone text,
  website text,

  -- classification
  trade text not null,                 -- canonical COMMON_TRADES value
  source_trade text,                   -- raw trade label from the source (provenance)
  specialties text,
  regions text[],                      -- canonical NC_REGIONS values (multi-coverage)
  source_service_area text,            -- raw free-text coverage from the source
  home_base_city text,

  -- vetting
  license_type text,
  license_number text,
  license_state text default 'NC',
  license_verified boolean not null default false,   -- verified against the state board roster
  license_expiry date,
  insurance_carrier text,
  insurance_limits text,
  insurance_expiry date,
  coi_on_file boolean not null default false,
  workers_comp text,
  crew_size text,
  years_in_business text,

  -- performance
  rating numeric,                      -- 0–5
  jobs_completed integer not null default 0,
  jobs_successful integer not null default 0,
  reliability_score numeric,           -- computed or manual

  -- availability  (structured — did not exist anywhere before)
  availability_status text not null default 'unknown'
    check (availability_status in ('available','limited','booked','unknown')),
  available_from date,
  availability_confirmed_at timestamptz,

  -- pricing  (rate-card summary here; line-item history in sub_quotes)
  pricing_tier text,                   -- e.g. budget / mid / premium, or A/B/C
  rate_notes text,

  -- lifecycle / provenance
  status text not null default 'new'
    check (status in ('new','vetting','approved','bench','declined')),
  source text not null default 'manual',   -- sourced-import | inbound-application | referral | manual
  source_application_id bigint references public.subcontractor_applications (id),
  review_notes text,
  reviewer_email text,
  approved_at timestamptz,
  notes text
);

-- Dedupe key: one master row per company per canonical trade.
create unique index if not exists subcontractors_company_trade_uniq
  on public.subcontractors (lower(company_name), trade);

create index if not exists subcontractors_trade_idx on public.subcontractors (trade);
create index if not exists subcontractors_status_idx on public.subcontractors (status);
create index if not exists subcontractors_availability_idx on public.subcontractors (availability_status);
create index if not exists subcontractors_regions_gin on public.subcontractors using gin (regions);

-- ---------------------------------------------------------------------------
-- sub_quotes — historical line-item quotes. Every quote collected becomes
-- future pricing intelligence the matching engine can price a deal from.
-- ---------------------------------------------------------------------------
create table if not exists public.sub_quotes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  subcontractor_id uuid not null references public.subcontractors (id) on delete cascade,
  deal_ref text,                       -- optional link to a property/deal
  trade text,
  line_item text,
  scope_description text,
  unit text,                           -- ea | sf | lf | ls
  quantity numeric,
  unit_price numeric,
  total_amount numeric,
  region text,                         -- canonical NC_REGIONS value
  market_zip_prefix text,              -- joins public.market_tiers.zip_prefix
  quoted_at date,
  won boolean,                         -- did we use this quote / did the work happen
  notes text
);

create index if not exists sub_quotes_subcontractor_idx on public.sub_quotes (subcontractor_id);
create index if not exists sub_quotes_trade_idx on public.sub_quotes (trade);
create index if not exists sub_quotes_region_idx on public.sub_quotes (region);

-- ---------------------------------------------------------------------------
-- updated_at touch trigger (mirrors market_tiers convention)
-- ---------------------------------------------------------------------------
create or replace function public.touch_subcontractors_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists subcontractors_touch_updated_at on public.subcontractors;
create trigger subcontractors_touch_updated_at
before update on public.subcontractors
for each row execute function public.touch_subcontractors_updated_at();

-- RLS: service role only (matches market_tiers / estimate_rules — server-side reads).
alter table public.subcontractors enable row level security;
alter table public.sub_quotes enable row level security;

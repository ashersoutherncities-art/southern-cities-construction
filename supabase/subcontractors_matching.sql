-- ===========================================================================
-- Value Engine — Phase 2: the matching engine (SELF-CONTAINED).
-- Given a property ZIP + scope trades, return ranked vetted subs per trade in
-- that market, with a statewide fallback so a number is possible ANYWHERE.
--
-- Depends ONLY on subcontractors_master.sql (subcontractors, sub_quotes).
-- Carries its own ZIP→region table (sub_market_regions) so it does not require
-- the rehab-engine's market_tiers table to exist. Idempotent.
-- ===========================================================================

-- 1) ZIP prefix → canonical NC_REGION + cost multiplier (seeded from the NC market tiers).
create table if not exists public.sub_market_regions (
  zip_prefix text primary key,
  nc_region text not null,
  cost_multiplier numeric not null default 1.0
);

insert into public.sub_market_regions (zip_prefix, nc_region, cost_multiplier) values
  ('275','Triangle (Raleigh–Durham)',1.04),
  ('276','Triangle (Raleigh–Durham)',1.04),
  ('277','Triangle (Raleigh–Durham)',1.04),
  ('280','Charlotte Metro',1.03),
  ('281','Charlotte Metro',1.03),
  ('282','Charlotte Metro',1.03),
  ('286','Charlotte Metro',0.97),
  ('287','Western NC (Asheville)',1.02),
  ('288','Western NC (Asheville)',1.02),
  ('289','Western NC (Asheville)',1.02),
  ('284','Wilmington / Coastal',1.01),
  ('270','Triad (Greensboro–Winston-Salem)',0.98),
  ('271','Triad (Greensboro–Winston-Salem)',0.98),
  ('272','Triad (Greensboro–Winston-Salem)',0.98),
  ('273','Triad (Greensboro–Winston-Salem)',0.98),
  ('274','Triad (Greensboro–Winston-Salem)',0.98),
  ('283','Fayetteville / Sandhills',0.97),
  ('278','Eastern NC',0.95),
  ('279','Eastern NC',0.95),
  ('285','Eastern NC',0.95)
on conflict (zip_prefix) do update
  set nc_region = excluded.nc_region, cost_multiplier = excluded.cost_multiplier;

-- 2) The matching engine.
--    match_subcontractors('28202', ARRAY['Electrical','Roofing'])
--    → per trade: subs whose regions[] cover the property region ('exact-region');
--      if a trade has NO in-region sub, its statewide subs return as 'statewide-fallback'.
create or replace function public.match_subcontractors(p_zip text, p_trades text[])
returns table (
  trade text,
  company_name text,
  phone text,
  email text,
  regions text[],
  status text,
  availability_status text,
  rating numeric,
  match_type text,
  target_region text,
  cost_multiplier numeric
)
language sql
stable
as $$
  with tier as (
    select nc_region, cost_multiplier as mult
    from public.sub_market_regions
    where zip_prefix = left(p_zip, 3)
    limit 1
  ),
  cand as (
    select * from public.subcontractors where trade = any(p_trades)
  ),
  in_region as (
    select c.*, 'exact-region'::text as mtype
    from cand c
    where (select nc_region from tier) = any(c.regions)
  ),
  fb as (
    select c.*, 'statewide-fallback'::text as mtype
    from cand c
    where c.trade not in (select trade from in_region)
  )
  select
    u.trade, u.company_name, u.phone, u.email, u.regions,
    u.status, u.availability_status, u.rating,
    u.mtype,
    (select nc_region from tier),
    (select mult from tier)
  from (select * from in_region union all select * from fb) u
  order by
    u.trade,
    case u.mtype when 'exact-region' then 0 else 1 end,
    case u.status when 'approved' then 0 when 'bench' then 1 when 'vetting' then 2 when 'new' then 3 else 4 end,
    case u.availability_status when 'available' then 0 when 'limited' then 1 when 'unknown' then 2 else 3 end,
    u.rating desc nulls last,
    u.jobs_completed desc;
$$;

-- 3) Coverage view — depth per trade × region, for gap-finding (e.g. the 3-framer hole).
create or replace view public.sub_coverage as
select unnest(regions) as region, trade, count(*) as subs
from public.subcontractors
where regions is not null
group by 1, 2
order by 1, 3 desc;

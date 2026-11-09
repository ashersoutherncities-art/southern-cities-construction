-- Split annual benefits from monthly benefits on cd_members.
--
-- Rationale: `gc_procurement_used` and `site_visit_credits_used` represent
-- annual allowances (gcProcurementIncludedPerYear / site visits per year),
-- but they were being reset together with the monthly counters whenever the
-- Stripe billing period advanced. Since every CD tier bills monthly, an
-- "annual" allowance was effectively being replenished every month.
--
-- Fix: track a separate year-start timestamp for each annual counter and
-- reset the counter only when the year has elapsed. Existing non-zero usage
-- is preserved — the new year_start defaults to the member's current
-- usage_period_start (or now()) so nothing silently resets on deploy.
--
-- Deployment: safe ALTER TABLE ADD COLUMN. No data loss. Run before the
-- updated members.ts ships; the old code ignores the new columns, the new
-- code reads them.

ALTER TABLE public.cd_members
  ADD COLUMN IF NOT EXISTS gc_procurement_year_start TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS site_visit_year_start TIMESTAMPTZ;

-- Backfill: for existing rows, seed the year-start from usage_period_start
-- (or now() if unset) so the first "annual" window begins today, not 1970.
UPDATE public.cd_members
SET gc_procurement_year_start = COALESCE(gc_procurement_year_start, usage_period_start, now()),
    site_visit_year_start = COALESCE(site_visit_year_start, usage_period_start, now())
WHERE gc_procurement_year_start IS NULL OR site_visit_year_start IS NULL;

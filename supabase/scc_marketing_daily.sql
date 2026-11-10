-- Apply to a preview database first. Existing booking data is read-only.
begin;
create table if not exists public.scc_marketing_daily (
  day date primary key,
  snapshot jsonb not null,
  started_at timestamptz not null,
  synced_at timestamptz not null default now()
);
alter table public.scc_marketing_daily enable row level security;
revoke all on public.scc_marketing_daily from public, anon, authenticated;
grant select, insert, update on public.scc_marketing_daily to service_role;

create or replace function public.scc_save_marketing_day(
  report_day date, report_snapshot jsonb, sync_started timestamptz
) returns void
language sql security invoker set search_path = ''
as $$
  insert into public.scc_marketing_daily (day, snapshot, started_at)
  values (report_day, report_snapshot, sync_started)
  on conflict (day) do update
    set snapshot = excluded.snapshot, started_at = excluded.started_at, synced_at = now()
    where scc_marketing_daily.started_at <= excluded.started_at;
$$;
revoke all on function public.scc_save_marketing_day(date, jsonb, timestamptz)
  from public, anon, authenticated;
grant execute on function public.scc_save_marketing_day(date, jsonb, timestamptz) to service_role;
commit;

create table if not exists public.marketing_assets (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  asset_key text not null,
  title text not null,
  asset_type text not null,
  channel text not null default 'website',
  status text not null default 'active',
  source_type text not null default 'manual',

  page_path text,
  public_url text,
  storage_path text,
  preview_image_url text,
  notes text,
  metadata jsonb not null default '{}'::jsonb
);

create unique index if not exists marketing_assets_asset_key_uidx
  on public.marketing_assets (asset_key);

create index if not exists marketing_assets_source_type_idx
  on public.marketing_assets (source_type);

create index if not exists marketing_assets_asset_type_idx
  on public.marketing_assets (asset_type);

create or replace function public.set_marketing_assets_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists marketing_assets_set_updated_at on public.marketing_assets;
create trigger marketing_assets_set_updated_at
before update on public.marketing_assets
for each row
execute function public.set_marketing_assets_updated_at();

create table if not exists public.marketing_links (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  slug text not null,
  label text not null,
  destination_url text not null,
  channel text not null default 'website',
  campaign text,
  medium text,
  source_type text not null default 'manual',
  asset_key text,
  status text not null default 'active',
  click_count bigint not null default 0,
  last_clicked_at timestamptz,
  notes text,
  metadata jsonb not null default '{}'::jsonb
);

create unique index if not exists marketing_links_slug_uidx
  on public.marketing_links (slug);

create index if not exists marketing_links_click_count_idx
  on public.marketing_links (click_count desc);

create index if not exists marketing_links_asset_key_idx
  on public.marketing_links (asset_key);

create or replace function public.set_marketing_links_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists marketing_links_set_updated_at on public.marketing_links;
create trigger marketing_links_set_updated_at
before update on public.marketing_links
for each row
execute function public.set_marketing_links_updated_at();

create table if not exists public.marketing_link_events (
  id bigserial primary key,
  occurred_at timestamptz not null default now(),
  marketing_link_id bigint not null references public.marketing_links(id) on delete cascade,
  slug text not null,
  referer text,
  user_agent text,
  ip_hash text
);

create index if not exists marketing_link_events_link_id_idx
  on public.marketing_link_events (marketing_link_id, occurred_at desc);

create index if not exists marketing_link_events_slug_idx
  on public.marketing_link_events (slug, occurred_at desc);

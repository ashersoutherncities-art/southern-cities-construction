create table if not exists public.resource_requests (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  resource_slug text not null,
  resource_title text not null,
  resource_kind text not null,
  resource_format text,
  resource_price text,
  name text not null,
  email text not null,
  phone text,
  company text,
  role text,
  message text,
  fulfillment_status text not null default 'pending_send',
  delivery_email text,
  delivered_at timestamptz,
  reviewer_email text,
  review_notes text
);

create index if not exists resource_requests_created_at_idx
  on public.resource_requests (created_at desc);

create index if not exists resource_requests_email_idx
  on public.resource_requests (email);

create index if not exists resource_requests_resource_slug_idx
  on public.resource_requests (resource_slug);

create index if not exists resource_requests_fulfillment_status_idx
  on public.resource_requests (fulfillment_status);

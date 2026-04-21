create table if not exists public.realtor_inquiries (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  service_type text not null,
  realtor_name text not null,
  email text not null,
  phone text,
  brokerage text,
  property_address text,
  listing_date date,
  closing_date date,
  client_name text,
  scope_items text[],
  budget_range text,
  inspection_items text,
  priority text not null default 'standard',
  notes text,
  status text not null default 'new',
  reviewer_email text,
  review_notes text,
  responded_at timestamptz
);

create index if not exists realtor_inquiries_created_at_idx
  on public.realtor_inquiries (created_at desc);

create index if not exists realtor_inquiries_email_idx
  on public.realtor_inquiries (email);

create index if not exists realtor_inquiries_service_type_idx
  on public.realtor_inquiries (service_type);

create index if not exists realtor_inquiries_priority_idx
  on public.realtor_inquiries (priority);

create index if not exists realtor_inquiries_status_idx
  on public.realtor_inquiries (status);

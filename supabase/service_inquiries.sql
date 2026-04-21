create table if not exists public.service_inquiries (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  audience_type text,
  service text,
  message text,
  company text,
  website text,
  source text,
  status text not null default 'new',
  reviewer_email text,
  review_notes text,
  responded_at timestamptz
);

create index if not exists service_inquiries_created_at_idx
  on public.service_inquiries (created_at desc);

create index if not exists service_inquiries_email_idx
  on public.service_inquiries (email);

create index if not exists service_inquiries_status_idx
  on public.service_inquiries (status);

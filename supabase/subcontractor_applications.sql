create table if not exists public.subcontractor_applications (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  website text,
  trade text not null,
  years_in_business text,
  service_area text,
  crew_size text,
  license_type text,
  license_number text,
  license_state text,
  insurance_carrier text,
  insurance_limits text,
  workers_comp text,
  referral_source text,
  project_samples text,
  project_types text[],
  rate_notes text,
  references_text text,
  availability text,
  notes text,
  status text not null default 'new',
  review_notes text,
  reviewer_email text,
  approved_at timestamptz
);

create index if not exists subcontractor_applications_created_at_idx
  on public.subcontractor_applications (created_at desc);

create index if not exists subcontractor_applications_status_idx
  on public.subcontractor_applications (status);

create index if not exists subcontractor_applications_trade_idx
  on public.subcontractor_applications (trade);

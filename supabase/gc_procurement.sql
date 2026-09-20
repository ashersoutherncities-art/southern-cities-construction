-- Vetted GC Quote Procurement & Comparison — new schema, deliberately parallel
-- to (not built on top of) the existing subcontractors/sub_quotes tables.
--
-- That schema's grain is one row = one company x one trade, and sub_quotes is
-- a per-line-item trade quote — it has no concept of multiple companies
-- competing with a whole-project lump-sum bid on the same job, and it's
-- dormant in this repo (the live consumer is a separate sc-platform app).
-- Building whole-project GC procurement on top of it would mean overloading a
-- trade-scoped schema with a fundamentally different grain, so this is a
-- clean parallel build instead. See the plan (§1d) for the full reasoning.
--
-- APPLY MANUALLY in the Supabase SQL editor, after supabase/construction_department.sql
-- (this file references public.orders and, indirectly via app code, public.cd_members).

create type public.contractor_status as enum ('new', 'vetting', 'approved', 'suspended', 'inactive');

create table public.contractors (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text,
  email text,
  phone text,
  website text,
  service_area text[],
  gc_classification text,          -- e.g. 'Residential General Contractor', 'Renovation Specialist'
  license_number text,
  license_state text,
  license_verified boolean not null default false,
  license_expiry date,
  insurance_carrier text,
  coi_on_file boolean not null default false,
  coi_expiry date,
  workers_comp_status text,
  years_in_business integer,
  project_size_min numeric,
  project_size_max numeric,
  references_notes text,
  scc_project_history text,
  bid_count integer not null default 0,
  win_count integer not null default 0,
  completed_project_count integer not null default 0,
  schedule_performance_notes text,
  change_order_notes text,
  quality_notes text,
  warranty_responsiveness_notes text,
  internal_notes text,             -- STAFF-ONLY. Never query this from client-facing code — use contractors_public below.
  status public.contractor_status not null default 'new',
  documents jsonb not null default '[]'::jsonb,  -- [{ label, path, name, type }], same shape as subcontractor_applications.documents
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Client-safe view: excludes internal_notes and any other staff-only column.
-- The client-facing /bid-comparison/[token] page must query THIS view, never
-- the base table, so internal vetting notes can never leak client-side even
-- if a future component forgets to filter fields manually.
create or replace view public.contractors_public as
  select
    id, company_name, service_area, gc_classification,
    license_verified, years_in_business, project_size_min, project_size_max,
    completed_project_count, status
  from public.contractors;

create table public.bid_packages (
  id uuid primary key default gen_random_uuid(),
  order_id bigint references public.orders (id) on delete set null,  -- the Deal Pack order this scope came from, if any
  property_address text not null,
  property_state text not null,
  scope_summary text not null,
  target_schedule_weeks integer,
  requested_start_date date,
  bid_due_date date,
  required_proposal_format text,
  known_site_conditions text,
  required_permits text,
  status text not null default 'draft',  -- draft/sent/collecting/comparing/closed
  created_at timestamptz not null default now()
);

create table public.bid_package_line_items (
  id uuid primary key default gen_random_uuid(),
  bid_package_id uuid not null references public.bid_packages (id) on delete cascade,
  section text,                -- CSI-style / trade category, e.g. 'Electrical', 'Kitchen'
  description text not null,
  quantity numeric,
  unit text,
  is_allowance boolean not null default false,
  allowance_amount numeric,
  is_alternate boolean not null default false,
  notes text,
  sort_order integer not null default 0
);

create table public.bid_package_documents (
  id uuid primary key default gen_random_uuid(),
  bid_package_id uuid not null references public.bid_packages (id) on delete cascade,
  label text not null,         -- 'Floor Plan', 'Elevation', 'Spec Sheet', etc.
  storage_path text not null,  -- bucket: gc-procurement-documents (uploaded via signed URL, see lib/construction-department/bid-package-storage.ts)
  file_type text,
  uploaded_at timestamptz not null default now()
);

create type public.invite_status as enum ('invited', 'accepted', 'declined', 'no_response');
create table public.bid_invitations (
  id uuid primary key default gen_random_uuid(),
  bid_package_id uuid not null references public.bid_packages (id) on delete cascade,
  contractor_id uuid not null references public.contractors (id) on delete cascade,
  status public.invite_status not null default 'invited',
  invited_at timestamptz not null default now(),
  responded_at timestamptz
);

create type public.proposal_status as enum ('submitted', 'under_review', 'shortlisted', 'selected', 'declined', 'withdrawn');
create table public.gc_proposals (
  id uuid primary key default gen_random_uuid(),
  bid_package_id uuid not null references public.bid_packages (id) on delete cascade,
  contractor_id uuid references public.contractors (id) on delete set null,  -- null = Southern Cities' own offer
  is_scc_offer boolean not null default false,
  total_amount numeric not null,
  normalized_amount numeric,
  proposed_timeline_days integer,
  proposed_start_date date,
  scope_completeness text,     -- 'complete' | 'partial' | 'minimal' — decision-support only, never a rank
  exclusions text,
  included_allowances text,
  payment_terms text,
  warranty_terms text,
  original_document_path text not null,  -- untouched original proposal (storage path). Never edited — this is the transparency guarantee.
  normalization_notes text,               -- SCC's adjustment explanation, shown to the client alongside the original
  status public.proposal_status not null default 'submitted',
  submitted_at timestamptz not null default now()
);

-- Decision-support tags shown per proposal — explicitly NOT a ranking/"winner"
-- system. There is deliberately no `rank integer` column anywhere in this
-- schema; a "1st place" UI is architecturally impossible to build off of it.
create table public.gc_proposal_tags (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid not null references public.gc_proposals (id) on delete cascade,
  tag text not null  -- 'lowest_price' | 'most_complete_scope' | 'fastest_schedule' | 'fewest_exclusions' | 'scc_offer'
);

create index if not exists bid_package_line_items_package_idx on public.bid_package_line_items (bid_package_id, sort_order);
create index if not exists bid_package_documents_package_idx on public.bid_package_documents (bid_package_id);
create index if not exists bid_invitations_package_idx on public.bid_invitations (bid_package_id);
create unique index if not exists bid_invitations_package_contractor_uidx
  on public.bid_invitations (bid_package_id, contractor_id);
create index if not exists gc_proposals_package_idx on public.gc_proposals (bid_package_id);
create index if not exists gc_proposal_tags_proposal_idx on public.gc_proposal_tags (proposal_id);

alter table public.contractors enable row level security;
alter table public.bid_packages enable row level security;
alter table public.bid_package_line_items enable row level security;
alter table public.bid_package_documents enable row level security;
alter table public.bid_invitations enable row level security;
alter table public.gc_proposals enable row level security;
alter table public.gc_proposal_tags enable row level security;

-- Contractor vetting document uploads (license/COI/W9) — private bucket,
-- mirroring the existing subcontractor-docs bucket pattern but captured in a
-- checked-in migration this time (the original was created out-of-band).
insert into storage.buckets (id, name, public)
values ('contractor-docs', 'contractor-docs', false)
on conflict (id) do nothing;

-- Bid Package documents (drawings/specs) — private bucket. Uploaded via a
-- signed-URL flow that bypasses the Next.js API route entirely (see the
-- plan's §5.2 — floor plans/spec PDFs routinely exceed Vercel's 4.5MB
-- serverless body limit that every existing multipart upload route hits).
insert into storage.buckets (id, name, public)
values ('gc-procurement-documents', 'gc-procurement-documents', false)
on conflict (id) do nothing;

import { SupabaseClient } from '@supabase/supabase-js';

// Vetted GC Quote Procurement & Comparison — data access layer. Schema:
// supabase/gc_procurement.sql. Deliberately parallel to the dormant
// subcontractors/sub_quotes tables (wrong grain — see that file's header).

export type ContractorStatus = 'new' | 'vetting' | 'approved' | 'suspended' | 'inactive';

export type Contractor = {
  id: string;
  company_name: string;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  service_area: string[] | null;
  gc_classification: string | null;
  license_number: string | null;
  license_state: string | null;
  license_verified: boolean;
  license_expiry: string | null;
  insurance_carrier: string | null;
  coi_on_file: boolean;
  coi_expiry: string | null;
  workers_comp_status: string | null;
  years_in_business: number | null;
  project_size_min: number | null;
  project_size_max: number | null;
  references_notes: string | null;
  scc_project_history: string | null;
  bid_count: number;
  win_count: number;
  completed_project_count: number;
  schedule_performance_notes: string | null;
  change_order_notes: string | null;
  quality_notes: string | null;
  warranty_responsiveness_notes: string | null;
  internal_notes: string | null;
  status: ContractorStatus;
  documents: Array<{ label: string; path: string; name: string; type: string }>;
  created_at: string;
  updated_at: string;
};

// Client-safe projection — excludes internal_notes and every other
// staff-only column. Always query contractors_public for anything that
// might reach /bid-comparison/[token].
export type ContractorPublic = {
  id: string;
  company_name: string;
  service_area: string[] | null;
  gc_classification: string | null;
  license_verified: boolean;
  years_in_business: number | null;
  project_size_min: number | null;
  project_size_max: number | null;
  completed_project_count: number;
  status: ContractorStatus;
};

export async function listContractors(supabase: SupabaseClient): Promise<Contractor[]> {
  const { data } = await supabase.from('contractors').select('*').order('company_name', { ascending: true });
  return (data as Contractor[] | null) ?? [];
}

export async function getContractor(supabase: SupabaseClient, id: string): Promise<Contractor | null> {
  const { data } = await supabase.from('contractors').select('*').eq('id', id).maybeSingle();
  return (data as Contractor | null) ?? null;
}

export async function createContractor(
  supabase: SupabaseClient,
  input: Partial<Contractor> & { company_name: string }
): Promise<Contractor | null> {
  const { data } = await supabase.from('contractors').insert(input).select('*').single();
  return (data as Contractor | null) ?? null;
}

export async function updateContractor(supabase: SupabaseClient, id: string, patch: Partial<Contractor>): Promise<void> {
  await supabase.from('contractors').update({ ...patch, updated_at: new Date().toISOString() }).eq('id', id);
}

export async function appendContractorDocument(
  supabase: SupabaseClient,
  id: string,
  doc: { label: string; path: string; name: string; type: string }
): Promise<void> {
  const contractor = await getContractor(supabase, id);
  const documents = [...(contractor?.documents ?? []), doc];
  await supabase.from('contractors').update({ documents, updated_at: new Date().toISOString() }).eq('id', id);
}

// ---- Bid Packages ----

export type BidPackage = {
  id: string;
  order_id: number | null;
  property_address: string;
  property_state: string;
  scope_summary: string;
  target_schedule_weeks: number | null;
  requested_start_date: string | null;
  bid_due_date: string | null;
  required_proposal_format: string | null;
  known_site_conditions: string | null;
  required_permits: string | null;
  status: 'draft' | 'sent' | 'collecting' | 'comparing' | 'closed';
  created_at: string;
};

export async function listBidPackages(supabase: SupabaseClient): Promise<BidPackage[]> {
  const { data } = await supabase.from('bid_packages').select('*').order('created_at', { ascending: false });
  return (data as BidPackage[] | null) ?? [];
}

export async function getBidPackage(supabase: SupabaseClient, id: string): Promise<BidPackage | null> {
  const { data } = await supabase.from('bid_packages').select('*').eq('id', id).maybeSingle();
  return (data as BidPackage | null) ?? null;
}

export async function createBidPackage(
  supabase: SupabaseClient,
  input: Omit<BidPackage, 'id' | 'created_at' | 'status'> & { status?: BidPackage['status'] }
): Promise<BidPackage | null> {
  const { data } = await supabase.from('bid_packages').insert(input).select('*').single();
  return (data as BidPackage | null) ?? null;
}

export async function updateBidPackageStatus(supabase: SupabaseClient, id: string, status: BidPackage['status']): Promise<void> {
  await supabase.from('bid_packages').update({ status }).eq('id', id);
}

// ---- Line items ----

export type BidPackageLineItem = {
  id: string;
  bid_package_id: string;
  section: string | null;
  description: string;
  quantity: number | null;
  unit: string | null;
  is_allowance: boolean;
  allowance_amount: number | null;
  is_alternate: boolean;
  notes: string | null;
  sort_order: number;
};

export async function listLineItems(supabase: SupabaseClient, bidPackageId: string): Promise<BidPackageLineItem[]> {
  const { data } = await supabase
    .from('bid_package_line_items')
    .select('*')
    .eq('bid_package_id', bidPackageId)
    .order('sort_order', { ascending: true });
  return (data as BidPackageLineItem[] | null) ?? [];
}

export async function addLineItem(
  supabase: SupabaseClient,
  input: Omit<BidPackageLineItem, 'id'>
): Promise<void> {
  await supabase.from('bid_package_line_items').insert(input);
}

export async function deleteLineItem(supabase: SupabaseClient, id: string): Promise<void> {
  await supabase.from('bid_package_line_items').delete().eq('id', id);
}

// ---- Documents ----

export type BidPackageDocument = {
  id: string;
  bid_package_id: string;
  label: string;
  storage_path: string;
  file_type: string | null;
  uploaded_at: string;
};

export async function listBidPackageDocuments(supabase: SupabaseClient, bidPackageId: string): Promise<BidPackageDocument[]> {
  const { data } = await supabase
    .from('bid_package_documents')
    .select('*')
    .eq('bid_package_id', bidPackageId)
    .order('uploaded_at', { ascending: false });
  return (data as BidPackageDocument[] | null) ?? [];
}

export async function recordBidPackageDocument(
  supabase: SupabaseClient,
  input: Omit<BidPackageDocument, 'id' | 'uploaded_at'>
): Promise<void> {
  await supabase.from('bid_package_documents').insert(input);
}

// ---- Invitations ----

export type InviteStatus = 'invited' | 'accepted' | 'declined' | 'no_response';

export type BidInvitation = {
  id: string;
  bid_package_id: string;
  contractor_id: string;
  status: InviteStatus;
  invited_at: string;
  responded_at: string | null;
};

export async function listInvitations(supabase: SupabaseClient, bidPackageId: string): Promise<BidInvitation[]> {
  const { data } = await supabase.from('bid_invitations').select('*').eq('bid_package_id', bidPackageId);
  return (data as BidInvitation[] | null) ?? [];
}

export async function inviteContractor(supabase: SupabaseClient, bidPackageId: string, contractorId: string): Promise<void> {
  await supabase
    .from('bid_invitations')
    .upsert({ bid_package_id: bidPackageId, contractor_id: contractorId }, { onConflict: 'bid_package_id,contractor_id' });
}

export async function setInvitationStatus(supabase: SupabaseClient, id: string, status: InviteStatus): Promise<void> {
  await supabase
    .from('bid_invitations')
    .update({ status, responded_at: new Date().toISOString() })
    .eq('id', id);
}

// ---- Proposals ----

export type ProposalStatus = 'submitted' | 'under_review' | 'shortlisted' | 'selected' | 'declined' | 'withdrawn';
export type ScopeCompleteness = 'complete' | 'partial' | 'minimal';
export type ProposalTag = 'lowest_price' | 'most_complete_scope' | 'fastest_schedule' | 'fewest_exclusions' | 'scc_offer';

export type GcProposal = {
  id: string;
  bid_package_id: string;
  contractor_id: string | null;
  is_scc_offer: boolean;
  total_amount: number;
  normalized_amount: number | null;
  proposed_timeline_days: number | null;
  proposed_start_date: string | null;
  scope_completeness: ScopeCompleteness | null;
  exclusions: string | null;
  included_allowances: string | null;
  payment_terms: string | null;
  warranty_terms: string | null;
  original_document_path: string;
  normalization_notes: string | null;
  status: ProposalStatus;
  submitted_at: string;
};

export async function listProposals(supabase: SupabaseClient, bidPackageId: string): Promise<GcProposal[]> {
  const { data } = await supabase
    .from('gc_proposals')
    .select('*')
    .eq('bid_package_id', bidPackageId)
    .order('submitted_at', { ascending: true });
  return (data as GcProposal[] | null) ?? [];
}

export async function addProposal(supabase: SupabaseClient, input: Omit<GcProposal, 'id' | 'submitted_at'>): Promise<GcProposal | null> {
  const { data } = await supabase.from('gc_proposals').insert(input).select('*').single();
  return (data as GcProposal | null) ?? null;
}

export async function setProposalStatus(supabase: SupabaseClient, id: string, status: ProposalStatus): Promise<void> {
  await supabase.from('gc_proposals').update({ status }).eq('id', id);
}

export async function listProposalTags(supabase: SupabaseClient, proposalId: string): Promise<ProposalTag[]> {
  const { data } = await supabase.from('gc_proposal_tags').select('tag').eq('proposal_id', proposalId);
  return ((data as { tag: ProposalTag }[] | null) ?? []).map((row) => row.tag);
}

export async function listTagsForPackage(
  supabase: SupabaseClient,
  proposalIds: string[]
): Promise<Record<string, ProposalTag[]>> {
  if (proposalIds.length === 0) return {};
  const { data } = await supabase.from('gc_proposal_tags').select('proposal_id, tag').in('proposal_id', proposalIds);
  const map: Record<string, ProposalTag[]> = {};
  for (const row of (data as { proposal_id: string; tag: ProposalTag }[] | null) ?? []) {
    (map[row.proposal_id] ??= []).push(row.tag);
  }
  return map;
}

export async function setProposalTag(supabase: SupabaseClient, proposalId: string, tag: ProposalTag): Promise<void> {
  await supabase.from('gc_proposal_tags').insert({ proposal_id: proposalId, tag });
}

export async function removeProposalTag(supabase: SupabaseClient, proposalId: string, tag: ProposalTag): Promise<void> {
  await supabase.from('gc_proposal_tags').delete().eq('proposal_id', proposalId).eq('tag', tag);
}

// ---- Client-safe contractor lookups (for /bid-comparison/[token]) ----

export async function getContractorsPublic(supabase: SupabaseClient, ids: string[]): Promise<Record<string, ContractorPublic>> {
  if (ids.length === 0) return {};
  const { data } = await supabase.from('contractors_public').select('*').in('id', ids);
  const map: Record<string, ContractorPublic> = {};
  for (const row of (data as ContractorPublic[] | null) ?? []) map[row.id] = row;
  return map;
}

'use server';

import { revalidatePath } from 'next/cache';
import { getServiceClient } from '@/lib/supabase';
import { hasPortalAccess } from '@/lib/portal-auth';
import {
  addLineItem,
  deleteLineItem,
  inviteContractor,
  setInvitationStatus,
  addProposal,
  setProposalStatus,
  setProposalTag,
  removeProposalTag,
  recordBidPackageDocument,
  updateBidPackageStatus,
  getBidPackage,
  listProposals,
  type InviteStatus,
  type ProposalStatus,
  type ProposalTag,
  type ScopeCompleteness,
} from '@/lib/gc-procurement';
import { signBidComparisonToken } from '@/lib/gc-procurement-token';
import { sendBidComparisonReadyToGhl } from '@/lib/ghl';

async function authorized(): Promise<boolean> {
  return (await hasPortalAccess(process.env.CD_PROCUREMENT_ADMIN_KEY, process.env.MARKETING_PORTAL_ACCESS_KEY));
}

function str(formData: FormData, key: string): string | null {
  const v = String(formData.get(key) || '').trim();
  return v || null;
}

function revalidate(bidPackageId: string) {
  revalidatePath(`/portal/bid-packages/${bidPackageId}`);
}

export async function addLineItemAction(formData: FormData) {
  if (!(await authorized())) return;
  const bidPackageId = String(formData.get('bid_package_id') || '');
  const description = str(formData, 'description');
  if (!bidPackageId || !description) return;

  const supabase = getServiceClient();
  await addLineItem(supabase, {
    bid_package_id: bidPackageId,
    section: str(formData, 'section'),
    description,
    quantity: formData.get('quantity') ? Number(formData.get('quantity')) : null,
    unit: str(formData, 'unit'),
    is_allowance: formData.get('is_allowance') === 'true',
    allowance_amount: formData.get('allowance_amount') ? Number(formData.get('allowance_amount')) : null,
    is_alternate: formData.get('is_alternate') === 'true',
    notes: str(formData, 'notes'),
    sort_order: formData.get('sort_order') ? Number(formData.get('sort_order')) : 0,
  });
  revalidate(bidPackageId);
}

export async function deleteLineItemAction(formData: FormData) {
  if (!(await authorized())) return;
  const id = String(formData.get('id') || '');
  const bidPackageId = String(formData.get('bid_package_id') || '');
  if (!id) return;
  const supabase = getServiceClient();
  await deleteLineItem(supabase, id);
  revalidate(bidPackageId);
}

export async function inviteContractorAction(formData: FormData) {
  if (!(await authorized())) return;
  const bidPackageId = String(formData.get('bid_package_id') || '');
  const contractorId = String(formData.get('contractor_id') || '');
  if (!bidPackageId || !contractorId) return;
  const supabase = getServiceClient();
  await inviteContractor(supabase, bidPackageId, contractorId);
  await updateBidPackageStatus(supabase, bidPackageId, 'sent');
  revalidate(bidPackageId);
}

export async function setInvitationStatusAction(formData: FormData) {
  if (!(await authorized())) return;
  const id = String(formData.get('id') || '');
  const bidPackageId = String(formData.get('bid_package_id') || '');
  const status = String(formData.get('status') || '') as InviteStatus;
  if (!id || !status) return;
  const supabase = getServiceClient();
  await setInvitationStatus(supabase, id, status);
  revalidate(bidPackageId);
}

// Key in a proposal exactly as received — the original document is uploaded
// here too (small file, goes through the Next.js route same as everywhere
// else in this repo; only Bid Package DRAWINGS/SPECS need the signed-URL
// bypass since proposal PDFs are typically a few pages).
export async function addProposalAction(formData: FormData) {
  if (!(await authorized())) return;
  const bidPackageId = String(formData.get('bid_package_id') || '');
  const totalAmount = Number(formData.get('total_amount') || 0);
  const file = formData.get('original_document');
  if (!bidPackageId || !totalAmount || !(file instanceof File) || file.size === 0) return;

  const supabase = getServiceClient();
  const isSccOffer = formData.get('is_scc_offer') === 'true';
  const contractorId = isSccOffer ? null : String(formData.get('contractor_id') || '') || null;

  const safeName = file.name.replace(/[^a-z0-9.\-_]+/gi, '_').slice(0, 80);
  const path = `${bidPackageId}/${Date.now()}-${safeName}`;
  const { error } = await supabase.storage.from('gc-procurement-documents').upload(path, file, {
    contentType: file.type || 'application/octet-stream',
  });
  if (error) return;

  await addProposal(supabase, {
    bid_package_id: bidPackageId,
    contractor_id: contractorId,
    is_scc_offer: isSccOffer,
    total_amount: totalAmount,
    normalized_amount: formData.get('normalized_amount') ? Number(formData.get('normalized_amount')) : null,
    proposed_timeline_days: formData.get('proposed_timeline_days') ? Number(formData.get('proposed_timeline_days')) : null,
    proposed_start_date: str(formData, 'proposed_start_date'),
    scope_completeness: (str(formData, 'scope_completeness') as ScopeCompleteness | null) ?? null,
    exclusions: str(formData, 'exclusions'),
    included_allowances: str(formData, 'included_allowances'),
    payment_terms: str(formData, 'payment_terms'),
    warranty_terms: str(formData, 'warranty_terms'),
    original_document_path: path,
    normalization_notes: str(formData, 'normalization_notes'),
    status: 'submitted',
  });

  await updateBidPackageStatus(supabase, bidPackageId, 'collecting');
  revalidate(bidPackageId);
}

export async function setProposalStatusAction(formData: FormData) {
  if (!(await authorized())) return;
  const id = String(formData.get('id') || '');
  const bidPackageId = String(formData.get('bid_package_id') || '');
  const status = String(formData.get('status') || '') as ProposalStatus;
  if (!id || !status) return;
  const supabase = getServiceClient();
  await setProposalStatus(supabase, id, status);
  revalidate(bidPackageId);
}

export async function toggleProposalTagAction(formData: FormData) {
  if (!(await authorized())) return;
  const proposalId = String(formData.get('proposal_id') || '');
  const bidPackageId = String(formData.get('bid_package_id') || '');
  const tag = String(formData.get('tag') || '') as ProposalTag;
  const active = formData.get('active') === 'true';
  if (!proposalId || !tag) return;
  const supabase = getServiceClient();
  if (active) await removeProposalTag(supabase, proposalId, tag);
  else await setProposalTag(supabase, proposalId, tag);
  revalidate(bidPackageId);
}

export async function moveToComparingAction(formData: FormData) {
  if (!(await authorized())) return;
  const bidPackageId = String(formData.get('bid_package_id') || '');
  if (!bidPackageId) return;
  const supabase = getServiceClient();
  await updateBidPackageStatus(supabase, bidPackageId, 'comparing');

  // Notify the investor their comparison is ready, if we have an order (and
  // therefore a buyer email) to notify. No order = no known contact to tag.
  const pkg = await getBidPackage(supabase, bidPackageId);
  if (pkg?.order_id) {
    const { data: order } = await supabase.from('orders').select('buyer_email').eq('id', pkg.order_id).maybeSingle();
    if (order?.buyer_email) {
      const proposals = await listProposals(supabase, bidPackageId);
      await sendBidComparisonReadyToGhl({
        email: order.buyer_email,
        property_address: pkg.property_address,
        comparison_url: await generateComparisonLinkAction(bidPackageId),
        proposal_count: proposals.length,
      });
    }
  }

  revalidate(bidPackageId);
}

// Returns a signed upload URL for a Bid Package drawing/spec — the client
// PUTs the file straight to Supabase Storage from there, bypassing the
// Next.js request body entirely (see lib/supabase-browser.ts).
export async function createBidPackageUploadUrlAction(
  bidPackageId: string,
  fileName: string
): Promise<{ signedUrl: string; token: string; path: string } | { error: string }> {
  if (!(await authorized())) return { error: 'unauthorized' };
  const supabase = getServiceClient();
  const safeName = fileName.replace(/[^a-z0-9.\-_]+/gi, '_').slice(0, 80);
  const path = `${bidPackageId}/${Date.now()}-${safeName}`;
  const { data, error } = await supabase.storage.from('gc-procurement-documents').createSignedUploadUrl(path);
  if (error || !data) return { error: error?.message || 'Could not create upload URL' };
  return { signedUrl: data.signedUrl, token: data.token, path: data.path };
}

export async function recordBidPackageDocumentAction(input: {
  bidPackageId: string;
  label: string;
  path: string;
  fileType: string;
}) {
  if (!(await authorized())) return;
  const supabase = getServiceClient();
  await recordBidPackageDocument(supabase, {
    bid_package_id: input.bidPackageId,
    label: input.label,
    storage_path: input.path,
    file_type: input.fileType,
  });
  revalidate(input.bidPackageId);
}

export async function generateComparisonLinkAction(bidPackageId: string): Promise<string> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const token = signBidComparisonToken(bidPackageId);
  return `${baseUrl}/bid-comparison/${encodeURIComponent(token)}`;
}

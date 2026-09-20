'use server';

import { revalidatePath } from 'next/cache';
import { getServiceClient } from '@/lib/supabase';
import { hasPortalAccess } from '@/lib/portal-auth';
import { createContractor, updateContractor, appendContractorDocument, type ContractorStatus } from '@/lib/gc-procurement';

function authorized(): boolean {
  return hasPortalAccess(process.env.CD_PROCUREMENT_ADMIN_KEY, process.env.MARKETING_PORTAL_ACCESS_KEY);
}

const MAX_DOC_BYTES = 15 * 1024 * 1024; // 15MB — matches the standardized cap from the plan's §5.1 fix

function str(formData: FormData, key: string): string | null {
  const v = String(formData.get(key) || '').trim();
  return v || null;
}

export async function createContractorAction(formData: FormData) {
  if (!authorized()) return;
  const companyName = str(formData, 'company_name');
  if (!companyName) return;

  const supabase = getServiceClient();
  await createContractor(supabase, {
    company_name: companyName,
    contact_name: str(formData, 'contact_name'),
    email: str(formData, 'email'),
    phone: str(formData, 'phone'),
    website: str(formData, 'website'),
    gc_classification: str(formData, 'gc_classification'),
    license_number: str(formData, 'license_number'),
    license_state: str(formData, 'license_state'),
    years_in_business: formData.get('years_in_business') ? Number(formData.get('years_in_business')) : null,
    service_area: str(formData, 'service_area')?.split(',').map((s) => s.trim()).filter(Boolean) ?? null,
  });
  revalidatePath('/portal/contractors');
}

export async function updateContractorStatusAction(formData: FormData) {
  if (!authorized()) return;
  const id = String(formData.get('id') || '');
  const status = String(formData.get('status') || '') as ContractorStatus;
  if (!id || !status) return;

  const supabase = getServiceClient();
  await updateContractor(supabase, id, { status });
  revalidatePath('/portal/contractors');
}

export async function saveContractorVettingAction(formData: FormData) {
  if (!authorized()) return;
  const id = String(formData.get('id') || '');
  if (!id) return;

  const supabase = getServiceClient();
  await updateContractor(supabase, id, {
    license_verified: formData.get('license_verified') === 'true',
    coi_on_file: formData.get('coi_on_file') === 'true',
    references_notes: str(formData, 'references_notes'),
    scc_project_history: str(formData, 'scc_project_history'),
    schedule_performance_notes: str(formData, 'schedule_performance_notes'),
    change_order_notes: str(formData, 'change_order_notes'),
    quality_notes: str(formData, 'quality_notes'),
    warranty_responsiveness_notes: str(formData, 'warranty_responsiveness_notes'),
    internal_notes: str(formData, 'internal_notes'),
  });
  revalidatePath('/portal/contractors');
}

export async function uploadContractorDocumentAction(formData: FormData) {
  if (!authorized()) return;
  const id = String(formData.get('id') || '');
  const label = String(formData.get('label') || 'Document');
  const file = formData.get('file');
  if (!id || !(file instanceof File) || file.size === 0) return;
  if (file.size > MAX_DOC_BYTES) return;

  const supabase = getServiceClient();
  const safeName = file.name.replace(/[^a-z0-9.\-_]+/gi, '_').slice(0, 80);
  const path = `${id}/${Date.now()}-${safeName}`;

  const { error } = await supabase.storage.from('contractor-docs').upload(path, file, {
    contentType: file.type || 'application/octet-stream',
  });
  if (error) return;

  await appendContractorDocument(supabase, id, { label, path, name: file.name, type: file.type || '' });
  revalidatePath('/portal/contractors');
}

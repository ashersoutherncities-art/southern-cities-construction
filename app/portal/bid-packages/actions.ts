'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getServiceClient } from '@/lib/supabase';
import { hasPortalAccess } from '@/lib/portal-auth';
import { createBidPackage } from '@/lib/gc-procurement';

function authorized(): boolean {
  return hasPortalAccess(process.env.CD_PROCUREMENT_ADMIN_KEY, process.env.MARKETING_PORTAL_ACCESS_KEY);
}

function str(formData: FormData, key: string): string | null {
  const v = String(formData.get(key) || '').trim();
  return v || null;
}

export async function createBidPackageAction(formData: FormData) {
  if (!authorized()) return;
  const propertyAddress = str(formData, 'property_address');
  const propertyState = str(formData, 'property_state') || 'NC';
  const scopeSummary = str(formData, 'scope_summary');
  if (!propertyAddress || !scopeSummary) return;

  const supabase = getServiceClient();
  const pkg = await createBidPackage(supabase, {
    order_id: formData.get('order_id') ? Number(formData.get('order_id')) : null,
    property_address: propertyAddress,
    property_state: propertyState,
    scope_summary: scopeSummary,
    target_schedule_weeks: formData.get('target_schedule_weeks') ? Number(formData.get('target_schedule_weeks')) : null,
    requested_start_date: str(formData, 'requested_start_date'),
    bid_due_date: str(formData, 'bid_due_date'),
    required_proposal_format: str(formData, 'required_proposal_format'),
    known_site_conditions: str(formData, 'known_site_conditions'),
    required_permits: str(formData, 'required_permits'),
  });

  revalidatePath('/portal/bid-packages');
  if (pkg) redirect(`/portal/bid-packages/${pkg.id}`);
}

'use server';

import { revalidatePath } from 'next/cache';
import { getServiceClient } from '@/lib/supabase';
import { updateLeadStatus } from '@/lib/rehab-snapshot/repository';
import { LEAD_STATUSES, LeadStatus } from '@/lib/rehab-snapshot/types';
import { hasPortalAccess } from '@/lib/portal-auth';

export async function updateRehabSnapshotLeadStatusAction(formData: FormData) {
  const leadId = String(formData.get('lead_id') || '');
  const status = String(formData.get('status') || '');

  // Authenticate from the httpOnly portal session cookie.
  if (
    !hasPortalAccess(process.env.REHAB_SNAPSHOT_ADMIN_KEY, process.env.MARKETING_PORTAL_ACCESS_KEY) ||
    !leadId ||
    !isLeadStatus(status)
  ) {
    return;
  }

  const supabase = getServiceClient();
  await updateLeadStatus(supabase, leadId, status);
  revalidatePath('/portal/rehab-budget-snapshots');
}

function isLeadStatus(value: string): value is LeadStatus {
  return (LEAD_STATUSES as readonly string[]).includes(value);
}

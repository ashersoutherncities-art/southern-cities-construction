'use server';

import { revalidatePath } from 'next/cache';
import { getServiceClient } from '@/lib/supabase';
import { hasPortalAccess } from '@/lib/portal-auth';
import { claimDeskReview, saveDeskReviewNotes, markDeskReviewDelivered } from '@/lib/construction-department/desk-reviews';
import { getMemberByEmail } from '@/lib/construction-department/members';
import { signAccessToken } from '@/lib/construction-department/token';
import { sendDeskReviewDeliveredEmail } from '@/lib/construction-department/email';

async function authorized(): Promise<boolean> {
  return (await hasPortalAccess(process.env.CD_DESK_REVIEW_ADMIN_KEY, process.env.MARKETING_PORTAL_ACCESS_KEY));
}

export async function claimDeskReviewAction(formData: FormData) {
  const id = String(formData.get('id') || '');
  const reviewerEmail = String(formData.get('reviewer_email') || '').trim();
  if (!(await authorized()) || !id || !reviewerEmail) return;

  const supabase = getServiceClient();
  await claimDeskReview(supabase, id, reviewerEmail);
  revalidatePath('/portal/desk-reviews');
}

export async function saveDeskReviewNotesAction(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!(await authorized()) || !id) return;

  const supabase = getServiceClient();
  await saveDeskReviewNotes(supabase, id, {
    scopeNotes: String(formData.get('scope_notes') || ''),
    finishLevelRecommendation: String(formData.get('finish_level_recommendation') || ''),
    riskNotes: String(formData.get('risk_notes') || ''),
  });
  revalidatePath('/portal/desk-reviews');
}

export async function deliverDeskReviewAction(formData: FormData) {
  const id = String(formData.get('id') || '');
  const email = String(formData.get('email') || '');
  const propertyAddress = String(formData.get('property_address') || '');
  if (!(await authorized()) || !id || !email) return;

  const supabase = getServiceClient();
  await markDeskReviewDelivered(supabase, id);

  const member = await getMemberByEmail(supabase, email);
  if (member) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const token = signAccessToken(member.email);
    const link = `${baseUrl}/construction-department/app?token=${encodeURIComponent(token)}`;
    await sendDeskReviewDeliveredEmail({ email: member.email, propertyAddress, link });
  }

  revalidatePath('/portal/desk-reviews');
}

import { SupabaseClient } from '@supabase/supabase-js';

export type CdDeskReviewStatus = 'requested' | 'in_review' | 'delivered' | 'canceled';

export type CdDeskReview = {
  id: string;
  member_id: string | null;
  email: string;
  property_address: string;
  screening_id: string | null;
  was_credit: boolean;
  order_id: number | null;
  status: CdDeskReviewStatus;
  reviewer_email: string | null;
  scope_notes: string | null;
  finish_level_recommendation: string | null;
  risk_notes: string | null;
  delivered_at: string | null;
  created_at: string;
};

export async function createDeskReviewRequest(
  supabase: SupabaseClient,
  input: {
    memberId: string;
    email: string;
    propertyAddress: string;
    screeningId?: string | null;
    wasCredit: boolean;
    orderId?: number | null;
  }
): Promise<CdDeskReview | null> {
  const { data } = await supabase
    .from('cd_desk_reviews')
    .insert({
      member_id: input.memberId,
      email: input.email.trim().toLowerCase(),
      property_address: input.propertyAddress,
      screening_id: input.screeningId ?? null,
      was_credit: input.wasCredit,
      order_id: input.orderId ?? null,
    })
    .select('*')
    .single();
  return (data as CdDeskReview | null) ?? null;
}

export async function listDeskReviews(
  supabase: SupabaseClient,
  filter?: { status?: CdDeskReviewStatus }
): Promise<CdDeskReview[]> {
  let query = supabase.from('cd_desk_reviews').select('*').order('created_at', { ascending: false }).limit(200);
  if (filter?.status) query = query.eq('status', filter.status);
  const { data } = await query;
  return (data as CdDeskReview[] | null) ?? [];
}

export async function getMemberDeskReviews(supabase: SupabaseClient, memberId: string): Promise<CdDeskReview[]> {
  const { data } = await supabase
    .from('cd_desk_reviews')
    .select('*')
    .eq('member_id', memberId)
    .order('created_at', { ascending: false });
  return (data as CdDeskReview[] | null) ?? [];
}

export async function claimDeskReview(supabase: SupabaseClient, id: string, reviewerEmail: string): Promise<void> {
  await supabase
    .from('cd_desk_reviews')
    .update({ reviewer_email: reviewerEmail, status: 'in_review' })
    .eq('id', id);
}

export async function saveDeskReviewNotes(
  supabase: SupabaseClient,
  id: string,
  notes: { scopeNotes: string; finishLevelRecommendation: string; riskNotes: string }
): Promise<void> {
  await supabase
    .from('cd_desk_reviews')
    .update({
      scope_notes: notes.scopeNotes,
      finish_level_recommendation: notes.finishLevelRecommendation,
      risk_notes: notes.riskNotes,
    })
    .eq('id', id);
}

export async function markDeskReviewDelivered(supabase: SupabaseClient, id: string): Promise<void> {
  await supabase
    .from('cd_desk_reviews')
    .update({ status: 'delivered', delivered_at: new Date().toISOString() })
    .eq('id', id);
}

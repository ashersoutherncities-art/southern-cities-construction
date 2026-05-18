import { SupabaseClient } from '@supabase/supabase-js';
import {
  EstimateComputation,
  LeadStatus,
  PersistedSnapshot,
  RehabSnapshotLeadInput,
  RehabSnapshotProjectInput,
  RehabSnapshotScopeInput,
  StoredUpload,
} from '@/lib/rehab-snapshot/types';

export async function saveSnapshot(
  supabase: SupabaseClient,
  lead: RehabSnapshotLeadInput,
  project: RehabSnapshotProjectInput,
  scope: RehabSnapshotScopeInput,
  estimate: EstimateComputation,
  uploads: StoredUpload[],
  source: string
): Promise<PersistedSnapshot> {
  const { data: leadRow, error: leadError } = await supabase
    .from('leads')
    .insert({
      first_name: lead.first_name,
      last_name: lead.last_name,
      email: lead.email,
      phone: lead.phone,
      company_name: lead.company_name,
      investor_type: lead.investor_type,
      source,
      status: 'new',
    })
    .select('id, ghl_contact_id')
    .single();

  if (leadError || !leadRow) throw leadError || new Error('Lead insert failed');

  const { data: projectRow, error: projectError } = await supabase
    .from('projects')
    .insert({
      lead_id: leadRow.id,
      property_address: project.property_address,
      city: project.city,
      state: project.state,
      zip: project.zip,
      property_type: project.property_type,
      square_feet: project.square_feet,
      year_built: project.year_built,
      stories: project.stories,
      bedrooms: project.bedrooms,
      bathrooms: project.bathrooms,
      occupancy_status: project.occupancy_status,
      investment_strategy: project.investment_strategy,
      target_finish_level: project.target_finish_level,
    })
    .select('id')
    .single();

  if (projectError || !projectRow) throw projectError || new Error('Project insert failed');

  const { error: scopeError } = await supabase.from('project_scope_inputs').insert({
    project_id: projectRow.id,
    ...scope,
  });
  if (scopeError) throw scopeError;

  const { data: estimateRow, error: estimateError } = await supabase
    .from('estimates')
    .insert({
      project_id: projectRow.id,
      project_category: estimate.projectCategory,
      low_estimate: estimate.estimatedLow,
      high_estimate: estimate.estimatedHigh,
      high_risk_estimate: estimate.highRiskEstimate,
      timeline_low_weeks: estimate.timelineLowWeeks,
      timeline_high_weeks: estimate.timelineHighWeeks,
      confidence_level: estimate.confidenceLevel,
      confidence_score: estimate.confidenceScore,
      execution_difficulty: estimate.executionDifficulty,
      permit_complexity: estimate.permitComplexity,
      assumptions_json: estimate.assumptions,
      risk_flags_json: estimate.riskFlags,
      recommendation: estimate.recommendedNextStep,
      breakdown_json: estimate.breakdown,
      what_could_change_json: estimate.whatCouldChangeThisNumber,
      execution_summary: estimate.executionSummary,
    })
    .select('id')
    .single();

  if (estimateError || !estimateRow) throw estimateError || new Error('Estimate insert failed');

  if (uploads.length) {
    const { error: uploadsError } = await supabase.from('uploads').insert(
      uploads.map((upload) => ({
        project_id: projectRow.id,
        file_url: upload.path,
        file_type: upload.mimeType,
      }))
    );
    if (uploadsError) throw uploadsError;
  }

  const { data: reportRow, error: reportError } = await supabase
    .from('reports')
    .insert({
      estimate_id: estimateRow.id,
      email_sent: false,
    })
    .select('id')
    .single();

  if (reportError || !reportRow) throw reportError || new Error('Report insert failed');

  return {
    leadId: leadRow.id,
    projectId: projectRow.id,
    estimateId: estimateRow.id,
    reportId: reportRow.id,
    ghlContactId: leadRow.ghl_contact_id,
  };
}

export async function attachDeliveryArtifacts(
  supabase: SupabaseClient,
  reportId: string,
  values: {
    pdfPath?: string | null;
    emailDeliveryStatus?: 'pending' | 'sent' | 'failed' | 'skipped';
    reportSentAt?: string | null;
    deliveryError?: string | null;
  }
) {
  const { error } = await supabase
    .from('reports')
    .update({
      pdf_url: values.pdfPath ?? null,
      email_sent: values.emailDeliveryStatus === 'sent',
      sent_at: values.reportSentAt ?? null,
      email_delivery_status: values.emailDeliveryStatus,
      delivery_error: values.deliveryError ?? null,
    })
    .eq('id', reportId);

  if (error) throw error;
}

export async function updateLeadStatus(
  supabase: SupabaseClient,
  leadId: string,
  status: LeadStatus
) {
  const { error } = await supabase.from('leads').update({ status }).eq('id', leadId);
  if (error) throw error;
}

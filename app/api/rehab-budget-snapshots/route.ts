import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient, SupabaseConfigError } from '@/lib/supabase';
import { computeEstimate, formatProjectCategoryLabel, loadEstimateRules } from '@/lib/rehab-snapshot/engine';
import { renderSnapshotPdf } from '@/lib/rehab-snapshot/pdf';
import { saveSnapshot, attachDeliveryArtifacts, updateLeadStatus } from '@/lib/rehab-snapshot/repository';
import { sendSnapshotEmail } from '@/lib/rehab-snapshot/email';
import { uploadIncomingFiles, uploadPdfReport } from '@/lib/rehab-snapshot/storage';
import { sendRehabSnapshotToGhl } from '@/lib/ghl';
import {
  InvestorType,
  InvestmentStrategy,
  OccupancyStatus,
  PropertyType,
  TargetFinishLevel,
} from '@/lib/rehab-snapshot/types';

const requestLog = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 4;
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const ALLOWED_UPLOAD_EXTENSIONS = new Set([
  'jpg',
  'jpeg',
  'png',
  'webp',
  'pdf',
  'xlsx',
  'xls',
  'csv',
  'doc',
  'docx',
]);

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (requestLog.get(ip) || []).filter((timestamp) => now - timestamp < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    requestLog.set(ip, recent);
    return true;
  }
  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

function requiredString(formData: FormData, key: string) {
  return String(formData.get(key) || '').trim();
}

function optionalString(formData: FormData, key: string) {
  const value = String(formData.get(key) || '').trim();
  return value || null;
}

function boolField(formData: FormData, key: string) {
  return formData.get(key) === 'true';
}

function intField(formData: FormData, key: string, fallback = 0) {
  const raw = String(formData.get(key) || '').trim();
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function numberField(formData: FormData, key: string) {
  const raw = String(formData.get(key) || '').trim();
  if (!raw) return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

function getFileExtension(fileName: string) {
  const parts = fileName.toLowerCase().split('.');
  return parts.length > 1 ? parts.pop() || '' : '';
}

function isAllowedUpload(file: File) {
  return ALLOWED_UPLOAD_EXTENSIONS.has(getFileExtension(file.name));
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 });
    }

    let supabase;
    try {
      supabase = getServiceClient();
    } catch (error) {
      if (error instanceof SupabaseConfigError) {
        return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
      }
      throw error;
    }

    const formData = await req.formData();
    if (requiredString(formData, 'honey')) {
      return NextResponse.json({ success: true });
    }

    const lead = {
      first_name: requiredString(formData, 'first_name'),
      last_name: requiredString(formData, 'last_name'),
      email: requiredString(formData, 'email'),
      phone: requiredString(formData, 'phone'),
      company_name: optionalString(formData, 'company_name'),
      investor_type: requiredString(formData, 'investor_type') as InvestorType,
      source: 'rehab-budget-range-execution-risk-snapshot',
    };

    const project = {
      property_address: requiredString(formData, 'property_address'),
      city: requiredString(formData, 'city'),
      state: requiredString(formData, 'state'),
      zip: requiredString(formData, 'zip'),
      property_type: requiredString(formData, 'property_type') as PropertyType,
      square_feet: intField(formData, 'square_feet'),
      year_built: numberField(formData, 'year_built'),
      stories: numberField(formData, 'stories'),
      bedrooms: numberField(formData, 'bedrooms'),
      bathrooms: numberField(formData, 'bathrooms'),
      occupancy_status: requiredString(formData, 'occupancy_status') as OccupancyStatus,
      investment_strategy: requiredString(formData, 'investment_strategy') as InvestmentStrategy,
      target_finish_level: requiredString(formData, 'target_finish_level') as TargetFinishLevel,
    };

    const scope = {
      cosmetic_paint: boolField(formData, 'cosmetic_paint'),
      flooring: boolField(formData, 'flooring'),
      kitchen_refresh: boolField(formData, 'kitchen_refresh'),
      kitchen_full: boolField(formData, 'kitchen_full'),
      bathroom_refresh_count: intField(formData, 'bathroom_refresh_count'),
      bathroom_full_count: intField(formData, 'bathroom_full_count'),
      roof: boolField(formData, 'roof'),
      hvac: boolField(formData, 'hvac'),
      plumbing_partial: boolField(formData, 'plumbing_partial'),
      plumbing_full: boolField(formData, 'plumbing_full'),
      electrical_partial: boolField(formData, 'electrical_partial'),
      electrical_full: boolField(formData, 'electrical_full'),
      windows: boolField(formData, 'windows'),
      siding: boolField(formData, 'siding'),
      drywall: boolField(formData, 'drywall'),
      framing: boolField(formData, 'framing'),
      structural: boolField(formData, 'structural'),
      foundation: boolField(formData, 'foundation'),
      addition: boolField(formData, 'addition'),
      layout_changes: boolField(formData, 'layout_changes'),
      full_gut: boolField(formData, 'full_gut'),
      fire_damage: boolField(formData, 'fire_damage'),
      water_damage: boolField(formData, 'water_damage'),
      mold_concern: boolField(formData, 'mold_concern'),
      termite_concern: boolField(formData, 'termite_concern'),
      exterior_work: boolField(formData, 'exterior_work'),
      landscaping: boolField(formData, 'landscaping'),
      driveway: boolField(formData, 'driveway'),
      permit_required_unknown: boolField(formData, 'permit_required_unknown'),
      notes: requiredString(formData, 'notes'),
    };

    if (
      !lead.first_name ||
      !lead.last_name ||
      !lead.email ||
      !lead.phone ||
      !project.property_address ||
      !project.city ||
      !project.state ||
      !project.zip ||
      !project.square_feet
    ) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    if (project.square_feet <= 0) {
      return NextResponse.json({ error: 'Square feet must be greater than zero.' }, { status: 400 });
    }

    if (scope.bathroom_refresh_count < 0 || scope.bathroom_full_count < 0) {
      return NextResponse.json({ error: 'Bathroom counts cannot be negative.' }, { status: 400 });
    }

    if (
      (project.year_built !== null && project.year_built < 1800) ||
      (project.stories !== null && project.stories <= 0) ||
      (project.bedrooms !== null && project.bedrooms < 0) ||
      (project.bathrooms !== null && project.bathrooms < 0)
    ) {
      return NextResponse.json({ error: 'One or more numeric fields are invalid.' }, { status: 400 });
    }

    const photoFiles = formData
      .getAll('project_photos')
      .filter((value): value is File => value instanceof File && value.size > 0);
    const budgetFileValue = formData.get('existing_budget_file');
    const budgetFile =
      budgetFileValue instanceof File && budgetFileValue.size > 0 ? budgetFileValue : null;

    const allFiles = [...photoFiles, ...(budgetFile ? [budgetFile] : [])];
    if (allFiles.some((file) => file.size > MAX_UPLOAD_BYTES)) {
      return NextResponse.json({ error: 'Each upload must be 10 MB or smaller.' }, { status: 400 });
    }

    if (allFiles.some((file) => !isAllowedUpload(file))) {
      return NextResponse.json({ error: 'One or more uploads use an unsupported file type.' }, { status: 400 });
    }

    const uploads = await uploadIncomingFiles(supabase, {
      email: lead.email,
      propertyAddress: project.property_address,
      files: [
        ...photoFiles.map((file, index) => ({ file, label: `Project photo ${index + 1}` })),
        ...(budgetFile ? [{ file: budgetFile, label: 'Existing budget file' }] : []),
      ],
    });

    const rules = await loadEstimateRules();
    const estimate = computeEstimate(
      {
        project,
        scope,
        hasPhotos: photoFiles.length > 0,
        hasWalkthroughVideo: false,
      },
      rules
    );
    const persisted = await saveSnapshot(
      supabase,
      lead,
      project,
      scope,
      estimate,
      uploads,
      lead.source
    );

    const pdfBuffer = await renderSnapshotPdf({ lead, project, estimate });
    const pdfPath = await uploadPdfReport(supabase, {
      email: lead.email,
      propertyAddress: project.property_address,
      pdf: pdfBuffer,
    });

    let emailStatus: 'pending' | 'sent' | 'failed' | 'skipped' = 'pending';
    let deliveryError: string | null = null;
    let reportSentAt: string | null = null;

    try {
      const emailResult = await sendSnapshotEmail({ lead, project, estimate, pdfBuffer });
      if (emailResult.provider === 'none') {
        emailStatus = 'skipped';
        deliveryError = 'No email provider configured';
      } else {
        emailStatus = 'sent';
        reportSentAt = new Date().toISOString();
      }
    } catch (error) {
      emailStatus = 'failed';
      deliveryError = error instanceof Error ? error.message : 'Email delivery failed';
    }

    await attachDeliveryArtifacts(supabase, persisted.reportId, {
      pdfPath,
      emailDeliveryStatus: emailStatus,
      reportSentAt,
      deliveryError,
    });

    if (emailStatus === 'sent') {
      await updateLeadStatus(supabase, persisted.leadId, 'report_sent');
    }

    try {
      const ghlResult = await sendRehabSnapshotToGhl({
        first_name: lead.first_name,
        last_name: lead.last_name,
        email: lead.email,
        phone: lead.phone,
        company_name: lead.company_name,
        investor_type: lead.investor_type,
        property_address: project.property_address,
        city: project.city,
        state: project.state,
        zip: project.zip,
        property_type: project.property_type,
        investment_strategy: project.investment_strategy,
        target_finish_level: project.target_finish_level,
        project_category: estimate.projectCategory,
        estimated_low: estimate.estimatedLow,
        estimated_high: estimate.estimatedHigh,
        confidence_level: estimate.confidenceLevel,
        confidence_score: estimate.confidenceScore,
        timeline_low_weeks: estimate.timelineLowWeeks,
        timeline_high_weeks: estimate.timelineHighWeeks,
        risk_flags: estimate.riskFlags,
        recommended_next_step: estimate.recommendedNextStep,
        report_id: persisted.reportId,
        report_url: pdfPath,
      });

      if (ghlResult.contactId) {
        await supabase
          .from('leads')
          .update({ ghl_contact_id: ghlResult.contactId, status: 'follow_up_needed' })
          .eq('id', persisted.leadId);
      }
    } catch (error) {
      console.error('GHL snapshot forward failed (non-fatal):', error);
    }

    return NextResponse.json({
      success: true,
      reportId: persisted.reportId,
      result: {
        budgetRange: {
          low: estimate.estimatedLow,
          high: estimate.estimatedHigh,
        },
        highRiskBudget: estimate.highRiskEstimate,
        confidenceLevel: estimate.confidenceLevel,
        confidenceScore: estimate.confidenceScore,
        executionDifficulty: estimate.executionDifficulty,
        permitComplexity: estimate.permitComplexity,
        riskFlags: estimate.riskFlags,
        projectCategory: formatProjectCategoryLabel(estimate.projectCategory),
        timelineRange: {
          lowWeeks: estimate.timelineLowWeeks,
          highWeeks: estimate.timelineHighWeeks,
        },
        recommendedNextStep: estimate.recommendedNextStep,
        executionSummary: estimate.executionSummary,
        assumptions: estimate.assumptions,
        whatCouldChangeThisNumber: estimate.whatCouldChangeThisNumber,
        emailStatus,
      },
    });
  } catch (error) {
    console.error('rehab-budget-snapshots API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

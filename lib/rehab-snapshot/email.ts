import {
  EstimateComputation,
  RehabSnapshotLeadInput,
  RehabSnapshotProjectInput,
} from '@/lib/rehab-snapshot/types';
import { formatProjectCategoryLabel } from '@/lib/rehab-snapshot/engine';

function currency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function buildHtml(args: {
  lead: RehabSnapshotLeadInput;
  project: RehabSnapshotProjectInput;
  estimate: EstimateComputation;
}) {
  const { lead, project, estimate } = args;
  const riskItems = estimate.riskFlags
    .map((item) => `<li style="margin-bottom:8px;">${item}</li>`)
    .join('');
  const assumptionItems = estimate.assumptions
    .map((item) => `<li style="margin-bottom:8px;">${item}</li>`)
    .join('');

  return `
    <div style="font-family:Inter,Arial,sans-serif;background:#f6f2ec;padding:24px;color:#132452;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e8dfd4;border-radius:20px;overflow:hidden;">
        <div style="background:#132452;padding:28px 28px 24px;color:#ffffff;">
          <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#fa8c41;font-weight:700;">Southern Cities Construction</div>
          <h1 style="font-size:30px;line-height:1.08;margin:12px 0 10px;">Rehab Budget Range & Execution Risk Snapshot</h1>
          <p style="margin:0;color:#d9e2ff;font-size:15px;line-height:1.6;">
            ${lead.first_name}, your preliminary feasibility estimate for ${project.property_address}, ${project.city}, ${project.state} is ready.
          </p>
        </div>
        <div style="padding:24px 28px;">
          <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:20px;">
            <div style="flex:1 1 180px;border:1px solid #eadfce;border-radius:16px;padding:16px;background:#fbfaf7;">
              <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#7a8498;margin-bottom:8px;">Budget range</div>
              <div style="font-size:24px;font-weight:800;color:#08111d;">${currency(estimate.estimatedLow)} - ${currency(estimate.estimatedHigh)}</div>
            </div>
            <div style="flex:1 1 180px;border:1px solid #eadfce;border-radius:16px;padding:16px;background:#fbfaf7;">
              <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#7a8498;margin-bottom:8px;">Confidence</div>
              <div style="font-size:24px;font-weight:800;color:#08111d;">${estimate.confidenceLevel.toUpperCase()} (${estimate.confidenceScore}/100)</div>
            </div>
            <div style="flex:1 1 180px;border:1px solid #eadfce;border-radius:16px;padding:16px;background:#fbfaf7;">
              <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#7a8498;margin-bottom:8px;">Timeline range</div>
              <div style="font-size:24px;font-weight:800;color:#08111d;">${estimate.timelineLowWeeks}-${estimate.timelineHighWeeks} weeks</div>
            </div>
          </div>
          <p style="font-size:15px;line-height:1.7;color:#324155;margin:0 0 16px;">${estimate.executionSummary}</p>
          <p style="font-size:15px;line-height:1.7;color:#324155;margin:0 0 16px;"><strong>Likely category:</strong> ${formatProjectCategoryLabel(estimate.projectCategory)}<br /><strong>Recommended next step:</strong> ${estimate.recommendedNextStep}</p>
          <h2 style="font-size:18px;color:#08111d;margin:22px 0 12px;">Risk flags moving the number</h2>
          <ul style="padding-left:18px;margin:0 0 20px;color:#324155;font-size:15px;line-height:1.6;">${riskItems || '<li>Ordinary rehab variance only based on the current intake.</li>'}</ul>
          <h2 style="font-size:18px;color:#08111d;margin:22px 0 12px;">Important limitations</h2>
          <ul style="padding-left:18px;margin:0 0 20px;color:#324155;font-size:15px;line-height:1.6;">${assumptionItems}</ul>
          <div style="border-top:1px solid #eee2d8;padding-top:16px;color:#6b7280;font-size:12.5px;line-height:1.6;">
            <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#8a93a6;font-weight:700;margin-bottom:6px;">About this estimate</div>
            This Rehab Budget &amp; Execution-Risk Snapshot is a preliminary, GC-calibrated feasibility estimate based only on the property details you provided. It is not a site inspection, a contractor bid, a proposal, or a guaranteed price. Actual cost depends on a physical scope review, site and hidden conditions, finish selections, permitting and jurisdiction requirements, and current trade-labor and material pricing — any of which can materially change the figures shown. Use it to screen and underwrite a deal, not to set a final budget. A firm, GC-committed number comes from a Southern Cities Deal Pack or a full scope review. Southern Cities Construction · NC GC License #107724.
          </div>
        </div>
      </div>
    </div>
  `;
}

export async function sendSnapshotEmail(args: {
  lead: RehabSnapshotLeadInput;
  project: RehabSnapshotProjectInput;
  estimate: EstimateComputation;
  pdfBuffer: Buffer;
}) {
  const fromEmail = process.env.REHAB_SNAPSHOT_FROM_EMAIL || 'reports@southerncitiesconstruction.com';
  const subject = `Your Rehab Budget Range & Execution Risk Snapshot - ${args.project.property_address}`;
  const html = buildHtml(args);
  const attachmentBase64 = args.pdfBuffer.toString('base64');

  if (process.env.RESEND_API_KEY) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [args.lead.email],
        subject,
        html,
        attachments: [
          {
            filename: 'rehab-budget-range-execution-risk-snapshot.pdf',
            content: attachmentBase64,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Resend failed with status ${response.status}`);
    }

    return { provider: 'resend' as const };
  }

  if (process.env.SENDGRID_API_KEY) {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: args.lead.email }] }],
        from: { email: fromEmail },
        subject,
        content: [{ type: 'text/html', value: html }],
        attachments: [
          {
            content: attachmentBase64,
            filename: 'rehab-budget-range-execution-risk-snapshot.pdf',
            type: 'application/pdf',
            disposition: 'attachment',
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`SendGrid failed with status ${response.status}`);
    }

    return { provider: 'sendgrid' as const };
  }

  return { provider: 'none' as const };
}

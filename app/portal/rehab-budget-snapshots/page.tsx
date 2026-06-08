import SiteFooter from '@/components/SiteFooter';
import SiteNav from '@/components/SiteNav';
import { getServiceClient } from '@/lib/supabase';
import { hasPortalAccess } from '@/lib/portal-auth';
import { updateRehabSnapshotLeadStatusAction } from './actions';

export const dynamic = 'force-dynamic';

type PageProps = {
  searchParams?: {
    key?: string;
  };
};

function currency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value || 0);
}

async function getSignedUrl(path: string | null) {
  if (!path) return null;
  const supabase = getServiceClient();
  const { data } = await supabase.storage.from('rehab-snapshot-reports').createSignedUrl(path, 60 * 60);
  return data?.signedUrl || null;
}

export default async function RehabBudgetSnapshotsAdminPage(_props: PageProps) {
  const expectedKey = process.env.REHAB_SNAPSHOT_ADMIN_KEY || process.env.MARKETING_PORTAL_ACCESS_KEY;
  // Legacy hidden form field placeholder — server actions now authenticate via
  // the httpOnly portal cookie, so this stays empty.
  const accessKey = '';

  if (!expectedKey) {
    return (
      <main className="min-h-screen bg-stone-50">
        <SiteNav variant="solid" />
        <section className="container-pro py-20">
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 text-amber-900 shadow-elev-1">
            <p className="text-sm font-bold uppercase tracking-[0.2em]">Admin unavailable</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight">Set REHAB_SNAPSHOT_ADMIN_KEY first</h1>
          </div>
        </section>
        <SiteFooter />
      </main>
    );
  }

  if (!hasPortalAccess(process.env.REHAB_SNAPSHOT_ADMIN_KEY, process.env.MARKETING_PORTAL_ACCESS_KEY)) {
    return (
      <main className="min-h-screen bg-stone-50">
        <SiteNav variant="solid" />
        <section className="container-pro py-20">
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-900 shadow-elev-1">
            <p className="text-sm font-bold uppercase tracking-[0.2em]">Private internal tool</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight">Access key required</h1>
            <p className="mt-4 text-sm leading-relaxed">Open this page with your internal key. Example: /portal/rehab-budget-snapshots?key=YOUR_KEY.</p>
          </div>
        </section>
        <SiteFooter />
      </main>
    );
  }

  const supabase = getServiceClient();

  const { data: reports, error: reportsError } = await supabase
    .from('reports')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(40);

  if (reportsError) {
    return (
      <main className="min-h-screen bg-stone-50">
        <SiteNav variant="solid" />
        <section className="container-pro py-20">
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 text-amber-900 shadow-elev-1">
            <p className="text-sm font-bold uppercase tracking-[0.2em]">Database setup needed</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight">Apply supabase/rehab_budget_snapshots.sql</h1>
            <p className="mt-4 text-sm leading-relaxed">Current error: {reportsError.message}</p>
          </div>
        </section>
        <SiteFooter />
      </main>
    );
  }

  const estimateIds = Array.from(new Set((reports || []).map((row) => row.estimate_id).filter(Boolean)));
  const { data: estimates } = estimateIds.length
    ? await supabase.from('estimates').select('*').in('id', estimateIds)
    : { data: [] };

  const projectIds = Array.from(new Set((estimates || []).map((row) => row.project_id).filter(Boolean)));
  const { data: projects } = projectIds.length
    ? await supabase.from('projects').select('*').in('id', projectIds)
    : { data: [] };

  const leadIds = Array.from(new Set((projects || []).map((row) => row.lead_id).filter(Boolean)));
  const { data: leads } = leadIds.length
    ? await supabase.from('leads').select('*').in('id', leadIds)
    : { data: [] };

  const estimatesById = new Map((estimates || []).map((row) => [row.id, row]));
  const projectsById = new Map((projects || []).map((row) => [row.id, row]));
  const leadsById = new Map((leads || []).map((row) => [row.id, row]));

  const signedUrls = new Map<string, string | null>();
  for (const report of reports || []) {
    if (report.pdf_url) {
      signedUrls.set(report.id, await getSignedUrl(report.pdf_url));
    }
  }

  const totals = (reports || []).reduce(
    (acc, report) => {
      acc.count += 1;
      const estimate = estimatesById.get(report.estimate_id);
      acc.low += Number(estimate?.low_estimate || 0);
      acc.high += Number(estimate?.high_estimate || 0);
      if (report.email_sent) acc.sent += 1;
      return acc;
    },
    { count: 0, low: 0, high: 0, sent: 0 }
  );

  return (
    <main className="min-h-screen bg-stone-50">
      <SiteNav variant="solid" />
      <section className="container-pro py-12 sm:py-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">Southern Cities Construction</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy-900">Rehab snapshot pipeline</h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone-600 sm:text-base">
              Review every Rehab Budget Range & Execution Risk Snapshot submission, delivery status, confidence signal, and follow-up stage from one internal dashboard.
            </p>
          </div>
          <a
            href="/lp/rehab-budget-range-execution-risk-snapshot"
            className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy"
          >
            Open public landing page
          </a>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-sm text-stone-500">Snapshots</p>
            <p className="mt-3 text-3xl font-extrabold text-navy-900">{totals.count}</p>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-sm text-stone-500">Average low</p>
            <p className="mt-3 text-3xl font-extrabold text-navy-900">{totals.count ? currency(totals.low / totals.count) : '$0'}</p>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-sm text-stone-500">Average high</p>
            <p className="mt-3 text-3xl font-extrabold text-navy-900">{totals.count ? currency(totals.high / totals.count) : '$0'}</p>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-sm text-stone-500">Reports emailed</p>
            <p className="mt-3 text-3xl font-extrabold text-navy-900">{totals.sent}</p>
          </div>
        </div>

        <div className="mt-8 space-y-5">
          {(reports || []).map((report) => {
            const estimate = estimatesById.get(report.estimate_id);
            const project = estimate ? projectsById.get(estimate.project_id) : null;
            const lead = project ? leadsById.get(project.lead_id) : null;
            const reportUrl = signedUrls.get(report.id);

            return (
              <article key={report.id} className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-orange/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-orange">{String(estimate?.project_category || 'unknown').replace(/_/g, ' ')}</span>
                      <span className="rounded-full bg-stone-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">{estimate?.confidence_level || 'unknown'} confidence</span>
                      <span className="rounded-full bg-stone-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">{report.email_delivery_status}</span>
                    </div>
                    <h2 className="mt-4 text-2xl font-extrabold text-navy-900">
                      {project?.property_address || 'Unknown property'}
                    </h2>
                    <p className="mt-2 text-sm text-stone-600">
                      {lead ? `${lead.first_name} ${lead.last_name} · ${lead.email} · ${lead.phone}` : 'Lead unavailable'}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-stone-700">{estimate?.execution_summary || 'No summary saved.'}</p>
                  </div>

                  <div className="grid min-w-[280px] gap-3 rounded-3xl border border-stone-200 bg-stone-50 p-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">Budget range</p>
                      <p className="mt-1 text-xl font-extrabold text-navy-900">{currency(Number(estimate?.low_estimate || 0))} - {currency(Number(estimate?.high_estimate || 0))}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">Timeline</p>
                      <p className="mt-1 text-lg font-bold text-navy-900">{estimate?.timeline_low_weeks || 0}-{estimate?.timeline_high_weeks || 0} weeks</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">Next step</p>
                      <p className="mt-1 text-sm leading-6 text-stone-700">{estimate?.recommendation || 'No recommendation saved.'}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">High-risk scenario</p>
                      <p className="mt-1 text-lg font-bold text-navy-900">{currency(Number(estimate?.high_risk_estimate || 0))}</p>
                    </div>
                    {reportUrl ? (
                      <a href={reportUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy">
                        Open PDF
                      </a>
                    ) : null}
                  </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">Risk flags</p>
                    <div className="mt-3 grid gap-2">
                      {Array.isArray(estimate?.risk_flags_json) && estimate.risk_flags_json.length ? (
                        estimate.risk_flags_json.map((item: string) => (
                          <div key={item} className="rounded-2xl border border-orange/15 bg-orange-50 px-4 py-3 text-sm leading-6 text-stone-700">{item}</div>
                        ))
                      ) : (
                        <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-600">No major risk flags recorded.</div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-stone-200 bg-stone-50 p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">Follow-up status</p>
                    <form action={updateRehabSnapshotLeadStatusAction} className="mt-3 space-y-3">
                      <input type="hidden" name="access_key" value={accessKey} />
                      <input type="hidden" name="lead_id" value={lead?.id || ''} />
                      <select
                        name="status"
                        defaultValue={lead?.status || 'new'}
                        className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-navy-900"
                      >
                        <option value="new">New</option>
                        <option value="report_sent">Report sent</option>
                        <option value="follow_up_needed">Follow up needed</option>
                        <option value="booked_call">Booked call</option>
                        <option value="converted">Converted</option>
                        <option value="closed_lost">Closed lost</option>
                      </select>
                      <button className="inline-flex w-full items-center justify-center rounded-full bg-orange px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-500">
                        Save status
                      </button>
                    </form>
                    <p className="mt-4 text-xs leading-6 text-stone-500">
                      Created {new Date(report.created_at).toLocaleString()}<br />
                      Delivery error: {report.delivery_error || 'None'}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

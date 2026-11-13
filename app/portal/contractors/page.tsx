import SiteFooter from '@/components/SiteFooter';
import SiteNav from '@/components/SiteNav';
import { getServiceClient } from '@/lib/supabase';
import { hasPortalAccess } from '@/lib/portal-auth';
import { listContractors, type ContractorStatus } from '@/lib/gc-procurement';
import {
  createContractorAction,
  updateContractorStatusAction,
  saveContractorVettingAction,
  uploadContractorDocumentAction,
} from './actions';

export const dynamic = 'force-dynamic';

const STATUS_COLOR: Record<ContractorStatus, string> = {
  new: 'bg-stone-200 text-stone-700',
  vetting: 'bg-amber-100 text-amber-800',
  approved: 'bg-emerald-100 text-emerald-800',
  suspended: 'bg-rose-100 text-rose-800',
  inactive: 'bg-stone-100 text-stone-500',
};

const STATUSES: ContractorStatus[] = ['new', 'vetting', 'approved', 'suspended', 'inactive'];

export default async function ContractorsAdminPage() {
  const expectedKey = process.env.CD_PROCUREMENT_ADMIN_KEY || process.env.MARKETING_PORTAL_ACCESS_KEY;

  if (!expectedKey || !(await hasPortalAccess(process.env.CD_PROCUREMENT_ADMIN_KEY, process.env.MARKETING_PORTAL_ACCESS_KEY))) {
    return (
      <main className="min-h-screen bg-stone-50">
        <SiteNav variant="solid" />
        <section className="container-pro py-20">
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-900 shadow-elev-1">
            <p className="text-sm font-bold uppercase tracking-[0.2em]">Private internal tool</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight">Access key required</h1>
            <p className="mt-4 text-sm leading-relaxed">Open this page with your internal key. Example: /portal/contractors?key=YOUR_KEY.</p>
          </div>
        </section>
        <SiteFooter />
      </main>
    );
  }

  const supabase = getServiceClient();
  const contractors = await listContractors(supabase);

  return (
    <main className="min-h-screen bg-stone-50">
      <SiteNav variant="solid" />
      <section className="container-pro py-12 sm:py-16">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">Southern Cities Construction · Procurement</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy-900">Vetted contractors</h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone-600 sm:text-base">
          The pool a Bid Package can invite to bid. Check license/COI, note real project history and
          schedule/quality performance before marking a contractor Approved — only Approved contractors
          should be invited to a live Bid Package.
        </p>

        <details className="mt-8 rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
          <summary className="cursor-pointer text-sm font-bold uppercase tracking-[0.16em] text-navy-900">+ Add a contractor</summary>
          <form action={createContractorAction} className="mt-5 grid gap-3 sm:grid-cols-2">
            <input name="company_name" required placeholder="Company name *" className="rounded-xl border border-stone-300 px-3 py-2 text-sm sm:col-span-2" />
            <input name="contact_name" placeholder="Contact name" className="rounded-xl border border-stone-300 px-3 py-2 text-sm" />
            <input name="email" type="email" placeholder="Email" className="rounded-xl border border-stone-300 px-3 py-2 text-sm" />
            <input name="phone" placeholder="Phone" className="rounded-xl border border-stone-300 px-3 py-2 text-sm" />
            <input name="website" placeholder="Website" className="rounded-xl border border-stone-300 px-3 py-2 text-sm" />
            <input name="gc_classification" placeholder="Classification (e.g. Residential GC)" className="rounded-xl border border-stone-300 px-3 py-2 text-sm" />
            <input name="license_number" placeholder="License number" className="rounded-xl border border-stone-300 px-3 py-2 text-sm" />
            <input name="license_state" placeholder="License state" className="rounded-xl border border-stone-300 px-3 py-2 text-sm" />
            <input name="years_in_business" type="number" placeholder="Years in business" className="rounded-xl border border-stone-300 px-3 py-2 text-sm" />
            <input name="service_area" placeholder="Service area (comma-separated)" className="rounded-xl border border-stone-300 px-3 py-2 text-sm sm:col-span-2" />
            <button className="rounded-full bg-orange px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-500 sm:col-span-2 sm:w-fit">
              Add contractor
            </button>
          </form>
        </details>

        <div className="mt-8 space-y-5">
          {contractors.length === 0 && (
            <div className="rounded-3xl border border-stone-200 bg-white p-8 text-center text-stone-500">
              No contractors yet. Add the first one above.
            </div>
          )}
          {contractors.map((c) => (
            <article key={c.id} className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] ${STATUS_COLOR[c.status]}`}>{c.status}</span>
                    {c.license_verified && <span className="rounded-full bg-blue-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-800">License verified</span>}
                    {c.coi_on_file && <span className="rounded-full bg-blue-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-800">COI on file</span>}
                  </div>
                  <h2 className="mt-3 text-xl font-extrabold text-navy-900">{c.company_name}</h2>
                  <p className="mt-1 text-sm text-stone-600">
                    {c.contact_name || '—'} · {c.email || '—'} · {c.phone || '—'}
                  </p>
                  <p className="mt-1 text-xs text-stone-400">
                    {c.gc_classification || 'Unclassified'} · {c.service_area?.join(', ') || 'Service area unset'} · Lic. {c.license_number || '—'} ({c.license_state || '—'})
                  </p>
                </div>
                <form action={updateContractorStatusAction} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={c.id} />
                  <select name="status" defaultValue={c.status} className="rounded-xl border border-stone-300 px-3 py-2 text-sm">
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <button className="rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy">Save</button>
                </form>
              </div>

              <details className="mt-5">
                <summary className="cursor-pointer text-[11px] font-bold uppercase tracking-[0.16em] text-orange">Vetting notes &amp; documents</summary>
                <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_280px]">
                  <form action={saveContractorVettingAction} className="space-y-3">
                    <input type="hidden" name="id" value={c.id} />
                    <div className="flex flex-wrap gap-4 text-sm text-stone-700">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="license_verified" value="true" defaultChecked={c.license_verified} /> License verified
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="coi_on_file" value="true" defaultChecked={c.coi_on_file} /> COI on file
                      </label>
                    </div>
                    <textarea name="references_notes" defaultValue={c.references_notes || ''} placeholder="References notes" rows={2} className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm" />
                    <textarea name="scc_project_history" defaultValue={c.scc_project_history || ''} placeholder="History with Southern Cities" rows={2} className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm" />
                    <textarea name="schedule_performance_notes" defaultValue={c.schedule_performance_notes || ''} placeholder="Schedule performance notes" rows={2} className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm" />
                    <textarea name="change_order_notes" defaultValue={c.change_order_notes || ''} placeholder="Change-order notes" rows={2} className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm" />
                    <textarea name="quality_notes" defaultValue={c.quality_notes || ''} placeholder="Quality notes" rows={2} className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm" />
                    <textarea name="warranty_responsiveness_notes" defaultValue={c.warranty_responsiveness_notes || ''} placeholder="Warranty responsiveness notes" rows={2} className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm" />
                    <textarea name="internal_notes" defaultValue={c.internal_notes || ''} placeholder="Internal notes (staff-only, never client-visible)" rows={2} className="w-full rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-sm" />
                    <button className="rounded-full bg-orange px-5 py-2 text-sm font-bold text-white hover:bg-orange-500">Save notes</button>
                  </form>

                  <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">Documents</p>
                    <ul className="mt-2 space-y-1 text-xs text-stone-600">
                      {(c.documents || []).map((doc, i) => (
                        <li key={i}>{doc.label}: {doc.name}</li>
                      ))}
                      {(c.documents || []).length === 0 && <li className="text-stone-400">None uploaded.</li>}
                    </ul>
                    <form action={uploadContractorDocumentAction} className="mt-3 space-y-2">
                      <input type="hidden" name="id" value={c.id} />
                      <input name="label" placeholder="License / COI / W-9" className="w-full rounded-xl border border-stone-300 px-3 py-2 text-xs" />
                      <input type="file" name="file" className="w-full text-xs" />
                      <button className="w-full rounded-full bg-navy-900 px-4 py-2 text-xs font-semibold text-white hover:bg-navy">Upload (max 15MB)</button>
                    </form>
                  </div>
                </div>
              </details>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

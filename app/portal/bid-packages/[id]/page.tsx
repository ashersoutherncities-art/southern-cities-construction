import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteFooter from '@/components/SiteFooter';
import SiteNav from '@/components/SiteNav';
import { getServiceClient } from '@/lib/supabase';
import { hasPortalAccess } from '@/lib/portal-auth';
import {
  getBidPackage,
  listLineItems,
  listBidPackageDocuments,
  listInvitations,
  listProposals,
  listTagsForPackage,
  listContractors,
} from '@/lib/gc-procurement';
import {
  addLineItemAction,
  deleteLineItemAction,
  inviteContractorAction,
  setInvitationStatusAction,
  addProposalAction,
  setProposalStatusAction,
  toggleProposalTagAction,
  moveToComparingAction,
} from './actions';
import BidPackageDocumentUploader from './BidPackageDocumentUploader';
import GenerateLinkButton from './GenerateLinkButton';

export const dynamic = 'force-dynamic';

const ALL_TAGS = ['lowest_price', 'most_complete_scope', 'fastest_schedule', 'fewest_exclusions'] as const;
const TAG_LABEL: Record<string, string> = {
  lowest_price: 'Lowest price',
  most_complete_scope: 'Most complete scope',
  fastest_schedule: 'Fastest schedule',
  fewest_exclusions: 'Fewest exclusions',
  scc_offer: 'Southern Cities offer',
};

function money(n: number | null) {
  if (n == null) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export default async function BidPackageDetailPage({ params }: { params: { id: string } }) {
  if (!hasPortalAccess(process.env.CD_PROCUREMENT_ADMIN_KEY, process.env.MARKETING_PORTAL_ACCESS_KEY)) {
    return (
      <main className="min-h-screen bg-stone-50">
        <SiteNav variant="solid" />
        <section className="container-pro py-20">
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-900 shadow-elev-1">
            <p className="text-sm font-bold uppercase tracking-[0.2em]">Private internal tool</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight">Access key required</h1>
          </div>
        </section>
        <SiteFooter />
      </main>
    );
  }

  const supabase = getServiceClient();
  const pkg = await getBidPackage(supabase, params.id);
  if (!pkg) notFound();

  const [lineItems, documents, invitations, proposals, contractors] = await Promise.all([
    listLineItems(supabase, pkg.id),
    listBidPackageDocuments(supabase, pkg.id),
    listInvitations(supabase, pkg.id),
    listProposals(supabase, pkg.id),
    listContractors(supabase),
  ]);
  const contractorsById = new Map(contractors.map((c) => [c.id, c]));
  const tagsByProposal = await listTagsForPackage(supabase, proposals.map((p) => p.id));
  const invitedContractorIds = new Set(invitations.map((i) => i.contractor_id));
  const approvedContractors = contractors.filter((c) => c.status === 'approved' && !invitedContractorIds.has(c.id));

  return (
    <main className="min-h-screen bg-stone-50">
      <SiteNav variant="solid" />
      <section className="container-pro py-12 sm:py-16">
        <Link href="/portal/bid-packages" className="text-xs font-bold uppercase tracking-[0.16em] text-orange hover:underline">
          ← All bid packages
        </Link>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="rounded-full bg-navy-900 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white">{pkg.status}</span>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy-900">{pkg.property_address}</h1>
            <p className="mt-2 max-w-2xl text-sm text-stone-600">{pkg.scope_summary}</p>
            <p className="mt-1 text-xs text-stone-400">
              {pkg.property_state} · Target {pkg.target_schedule_weeks ?? '—'} weeks · Bid due {pkg.bid_due_date || '—'}
            </p>
          </div>
          <div className="flex flex-col items-end gap-3">
            {pkg.status !== 'comparing' && pkg.status !== 'closed' && proposals.length > 0 && (
              <form action={moveToComparingAction}>
                <input type="hidden" name="bid_package_id" value={pkg.id} />
                <button className="rounded-full border border-navy-900 px-4 py-2 text-sm font-semibold text-navy-900 hover:bg-navy-900 hover:text-white">
                  Move to Comparing
                </button>
              </form>
            )}
            <GenerateLinkButton bidPackageId={pkg.id} />
          </div>
        </div>

        {/* Line items */}
        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
          <h2 className="text-lg font-extrabold text-navy-900">Scope line items</h2>
          <div className="mt-4 space-y-2">
            {lineItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm">
                <div>
                  <span className="font-semibold text-navy-900">{item.section || 'General'}</span>
                  <span className="text-stone-600"> — {item.description}</span>
                  {item.is_allowance && <span className="ml-2 text-xs text-amber-700">(allowance {money(item.allowance_amount)})</span>}
                  {item.is_alternate && <span className="ml-2 text-xs text-purple-700">(alternate)</span>}
                </div>
                <form action={deleteLineItemAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="bid_package_id" value={pkg.id} />
                  <button className="text-xs font-semibold text-rose-600 hover:underline">Remove</button>
                </form>
              </div>
            ))}
            {lineItems.length === 0 && <p className="text-sm text-stone-400">No line items yet.</p>}
          </div>
          <form action={addLineItemAction} className="mt-4 grid gap-2 sm:grid-cols-6">
            <input type="hidden" name="bid_package_id" value={pkg.id} />
            <input name="section" placeholder="Section" className="rounded-xl border border-stone-300 px-3 py-2 text-sm sm:col-span-1" />
            <input name="description" required placeholder="Description *" className="rounded-xl border border-stone-300 px-3 py-2 text-sm sm:col-span-2" />
            <input name="quantity" type="number" placeholder="Qty" className="rounded-xl border border-stone-300 px-3 py-2 text-sm" />
            <input name="unit" placeholder="Unit" className="rounded-xl border border-stone-300 px-3 py-2 text-sm" />
            <button className="rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy">Add</button>
          </form>
        </div>

        {/* Documents */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
            <h2 className="text-lg font-extrabold text-navy-900">Drawings &amp; specs</h2>
            <ul className="mt-4 space-y-2 text-sm text-stone-600">
              {documents.map((doc) => (
                <li key={doc.id} className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5">
                  {doc.label} <span className="text-xs text-stone-400">· {new Date(doc.uploaded_at).toLocaleDateString()}</span>
                </li>
              ))}
              {documents.length === 0 && <li className="text-stone-400">No documents uploaded yet.</li>}
            </ul>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-stone-500">Upload a document</h3>
            <div className="mt-3">
              <BidPackageDocumentUploader bidPackageId={pkg.id} />
            </div>
          </div>
        </div>

        {/* Invitations */}
        <div className="mt-8 rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
          <h2 className="text-lg font-extrabold text-navy-900">Invited contractors</h2>
          <div className="mt-4 space-y-2">
            {invitations.map((inv) => {
              const c = contractorsById.get(inv.contractor_id);
              return (
                <div key={inv.id} className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm">
                  <span className="font-semibold text-navy-900">{c?.company_name || 'Unknown contractor'}</span>
                  <form action={setInvitationStatusAction} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={inv.id} />
                    <input type="hidden" name="bid_package_id" value={pkg.id} />
                    <select name="status" defaultValue={inv.status} className="rounded-lg border border-stone-300 px-2 py-1 text-xs">
                      <option value="invited">Invited</option>
                      <option value="accepted">Accepted</option>
                      <option value="declined">Declined</option>
                      <option value="no_response">No response</option>
                    </select>
                    <button className="rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold text-white hover:bg-navy">Save</button>
                  </form>
                </div>
              );
            })}
            {invitations.length === 0 && <p className="text-sm text-stone-400">No contractors invited yet.</p>}
          </div>
          {approvedContractors.length > 0 && (
            <form action={inviteContractorAction} className="mt-4 flex flex-wrap gap-2">
              <input type="hidden" name="bid_package_id" value={pkg.id} />
              <select name="contractor_id" required className="rounded-xl border border-stone-300 px-3 py-2 text-sm">
                <option value="">Select an approved contractor…</option>
                {approvedContractors.map((c) => (
                  <option key={c.id} value={c.id}>{c.company_name}</option>
                ))}
              </select>
              <button className="rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy">Invite</button>
            </form>
          )}
          {approvedContractors.length === 0 && contractors.length > 0 && (
            <p className="mt-3 text-xs text-stone-400">
              Every Approved contractor is already invited. <Link href="/portal/contractors" className="underline">Approve more →</Link>
            </p>
          )}
        </div>

        {/* Proposals */}
        <div className="mt-8 rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-navy-900">Proposals</h2>
            <p className="text-xs text-stone-400">Key in exactly what each contractor sent — the original document is preserved, never edited.</p>
          </div>

          <div className="mt-4 space-y-4">
            {proposals.map((p) => {
              const c = p.contractor_id ? contractorsById.get(p.contractor_id) : null;
              const tags = tagsByProposal[p.id] || [];
              return (
                <div key={p.id} className={`rounded-2xl border p-4 ${p.is_scc_offer ? 'border-orange bg-orange/[0.04]' : 'border-stone-200 bg-stone-50'}`}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="font-extrabold text-navy-900">{p.is_scc_offer ? 'Southern Cities Construction (our offer)' : c?.company_name || 'Unknown'}</span>
                      <span className="ml-3 text-lg font-extrabold text-navy-900">{money(p.total_amount)}</span>
                      {p.normalized_amount != null && p.normalized_amount !== p.total_amount && (
                        <span className="ml-2 text-xs text-stone-500">(normalized {money(p.normalized_amount)})</span>
                      )}
                    </div>
                    <form action={setProposalStatusAction} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={p.id} />
                      <input type="hidden" name="bid_package_id" value={pkg.id} />
                      <select name="status" defaultValue={p.status} className="rounded-lg border border-stone-300 px-2 py-1 text-xs">
                        <option value="submitted">Submitted</option>
                        <option value="under_review">Under review</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="selected">Selected</option>
                        <option value="declined">Declined</option>
                        <option value="withdrawn">Withdrawn</option>
                      </select>
                      <button className="rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold text-white hover:bg-navy">Save</button>
                    </form>
                  </div>
                  <p className="mt-2 text-xs text-stone-500">
                    {p.proposed_timeline_days ?? '—'} days · scope {p.scope_completeness || '—'} · exclusions: {p.exclusions || 'none noted'}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(p.is_scc_offer ? [] : ALL_TAGS).map((tag) => {
                      const active = tags.includes(tag);
                      return (
                        <form key={tag} action={toggleProposalTagAction}>
                          <input type="hidden" name="proposal_id" value={p.id} />
                          <input type="hidden" name="bid_package_id" value={pkg.id} />
                          <input type="hidden" name="tag" value={tag} />
                          <input type="hidden" name="active" value={String(active)} />
                          <button
                            className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] ${
                              active ? 'bg-navy-900 text-white' : 'border border-stone-300 text-stone-500 hover:border-navy-900'
                            }`}
                          >
                            {TAG_LABEL[tag]}
                          </button>
                        </form>
                      );
                    })}
                    {p.is_scc_offer && (
                      <span className="rounded-full bg-orange px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white">
                        {TAG_LABEL.scc_offer}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
            {proposals.length === 0 && <p className="text-sm text-stone-400">No proposals keyed in yet.</p>}
          </div>

          <details className="mt-6">
            <summary className="cursor-pointer text-[11px] font-bold uppercase tracking-[0.16em] text-orange">+ Key in a proposal</summary>
            <form action={addProposalAction} className="mt-4 grid gap-3 sm:grid-cols-2">
              <input type="hidden" name="bid_package_id" value={pkg.id} />
              <label className="flex items-center gap-2 text-sm sm:col-span-2">
                <input type="checkbox" name="is_scc_offer" value="true" /> This is Southern Cities&apos; own offer
              </label>
              <select name="contractor_id" className="rounded-xl border border-stone-300 px-3 py-2 text-sm">
                <option value="">Select contractor (skip if SCC offer)…</option>
                {contractors.map((c) => (
                  <option key={c.id} value={c.id}>{c.company_name}</option>
                ))}
              </select>
              <input name="total_amount" type="number" required placeholder="Total amount *" className="rounded-xl border border-stone-300 px-3 py-2 text-sm" />
              <input name="normalized_amount" type="number" placeholder="Normalized amount (if adjusted)" className="rounded-xl border border-stone-300 px-3 py-2 text-sm" />
              <input name="proposed_timeline_days" type="number" placeholder="Timeline (days)" className="rounded-xl border border-stone-300 px-3 py-2 text-sm" />
              <select name="scope_completeness" className="rounded-xl border border-stone-300 px-3 py-2 text-sm">
                <option value="">Scope completeness…</option>
                <option value="complete">Complete</option>
                <option value="partial">Partial</option>
                <option value="minimal">Minimal</option>
              </select>
              <textarea name="exclusions" placeholder="Exclusions" rows={2} className="rounded-xl border border-stone-300 px-3 py-2 text-sm sm:col-span-2" />
              <textarea name="included_allowances" placeholder="Included allowances" rows={2} className="rounded-xl border border-stone-300 px-3 py-2 text-sm sm:col-span-2" />
              <input name="payment_terms" placeholder="Payment terms" className="rounded-xl border border-stone-300 px-3 py-2 text-sm" />
              <input name="warranty_terms" placeholder="Warranty terms" className="rounded-xl border border-stone-300 px-3 py-2 text-sm" />
              <textarea name="normalization_notes" placeholder="Normalization notes (shown to client alongside original)" rows={2} className="rounded-xl border border-stone-300 px-3 py-2 text-sm sm:col-span-2" />
              <div className="sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-[0.14em] text-stone-500">Original proposal document *</label>
                <input type="file" name="original_document" required className="mt-1 w-full text-sm" />
              </div>
              <button className="rounded-full bg-orange px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-500 sm:col-span-2 sm:w-fit">
                Save proposal
              </button>
            </form>
          </details>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

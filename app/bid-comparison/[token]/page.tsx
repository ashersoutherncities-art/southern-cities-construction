import { notFound } from 'next/navigation';
import SiteFooter from '@/components/SiteFooter';
import SiteNav from '@/components/SiteNav';
import { getServiceClient } from '@/lib/supabase';
import { verifyBidComparisonToken } from '@/lib/gc-procurement-token';
import {
  getBidPackage,
  listBidPackageDocuments,
  listProposals,
  listTagsForPackage,
  getContractorsPublic,
} from '@/lib/gc-procurement';

export const dynamic = 'force-dynamic';

const TAG_LABEL: Record<string, string> = {
  lowest_price: 'Lowest price',
  most_complete_scope: 'Most complete scope',
  fastest_schedule: 'Fastest schedule',
  fewest_exclusions: 'Fewest exclusions',
};

function money(n: number | null) {
  if (n == null) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export default async function BidComparisonPage({ params }: { params: { token: string } }) {
  const verified = verifyBidComparisonToken(decodeURIComponent(params.token));
  if (!verified) {
    return (
      <main className="min-h-screen bg-stone-50">
        <SiteNav variant="solid" />
        <section className="container-pro py-24 text-center">
          <h1 className="text-3xl font-extrabold text-navy-900">This link has expired</h1>
          <p className="mt-4 text-stone-600">Ask Southern Cities Construction for a fresh comparison link.</p>
        </section>
        <SiteFooter />
      </main>
    );
  }

  const supabase = getServiceClient();
  const pkg = await getBidPackage(supabase, verified.bidPackageId);
  if (!pkg) notFound();

  const [documents, allProposals] = await Promise.all([
    listBidPackageDocuments(supabase, pkg.id),
    listProposals(supabase, pkg.id),
  ]);

  const proposals = allProposals.filter((p) => p.status !== 'withdrawn');
  const contractorIds = proposals.map((p) => p.contractor_id).filter((id): id is string => !!id);
  const [contractorsPublic, tagsByProposal] = await Promise.all([
    getContractorsPublic(supabase, contractorIds),
    listTagsForPackage(supabase, proposals.map((p) => p.id)),
  ]);

  // Signed, time-limited links to the original documents — the transparency
  // guarantee: the client can always see exactly what a contractor sent,
  // never just Southern Cities' summary of it.
  const docSignedUrls = new Map<string, string | null>();
  for (const doc of documents) {
    const { data } = await supabase.storage.from('gc-procurement-documents').createSignedUrl(doc.storage_path, 60 * 60 * 24);
    docSignedUrls.set(doc.id, data?.signedUrl ?? null);
  }
  const proposalSignedUrls = new Map<string, string | null>();
  for (const p of proposals) {
    const { data } = await supabase.storage.from('gc-procurement-documents').createSignedUrl(p.original_document_path, 60 * 60 * 24);
    proposalSignedUrls.set(p.id, data?.signedUrl ?? null);
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <SiteNav variant="solid" />
      <section className="container-pro py-16 sm:py-20">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">Southern Cities Construction · Bid Comparison</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy-900">{pkg.property_address}</h1>
        <p className="mt-4 max-w-2xl text-stone-600">{pkg.scope_summary}</p>

        <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-sm text-blue-900">
          Every proposal below — including Southern Cities&apos; own — is shown with its untouched original
          document and identical fields. Nothing is ranked or declared a &ldquo;winner.&rdquo; The tags are
          decision support, not a recommendation. The choice is yours.
        </div>

        {documents.length > 0 && (
          <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-stone-500">Drawings &amp; specs sent to bidders</p>
            <ul className="mt-3 space-y-1 text-sm">
              {documents.map((doc) => {
                const url = docSignedUrls.get(doc.id);
                return (
                  <li key={doc.id}>
                    {url ? (
                      <a href={url} target="_blank" rel="noreferrer" className="text-navy-900 underline hover:text-orange">
                        {doc.label}
                      </a>
                    ) : (
                      <span className="text-stone-500">{doc.label} (link unavailable)</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div className="mt-10 space-y-6">
          {proposals.map((p) => {
            const contractor = p.contractor_id ? contractorsPublic[p.contractor_id] : null;
            const tags = tagsByProposal[p.id] || [];
            const docUrl = proposalSignedUrls.get(p.id);
            return (
              <article
                key={p.id}
                className={`rounded-3xl border-2 p-6 shadow-elev-1 ${p.is_scc_offer ? 'border-orange bg-orange/[0.04]' : 'border-stone-200 bg-white'}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-navy-900">
                      {p.is_scc_offer ? 'Southern Cities Construction' : contractor?.company_name || 'Contractor'}
                    </h2>
                    {p.is_scc_offer && (
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-orange">
                        Our own offer — disclosed, not favored
                      </p>
                    )}
                    {!p.is_scc_offer && contractor && (
                      <p className="mt-1 text-xs text-stone-500">
                        {contractor.license_verified ? 'License verified' : 'License not yet verified'} · {contractor.years_in_business ?? '—'} yrs in business
                        · {contractor.completed_project_count} completed projects
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-extrabold text-navy-900">{money(p.total_amount)}</p>
                    {p.normalized_amount != null && p.normalized_amount !== p.total_amount && (
                      <p className="text-xs text-stone-500">Normalized to {money(p.normalized_amount)} — see notes below</p>
                    )}
                  </div>
                </div>

                <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone-500">Timeline</p>
                    <p className="mt-1 text-stone-700">{p.proposed_timeline_days ? `${p.proposed_timeline_days} days` : 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone-500">Scope completeness</p>
                    <p className="mt-1 text-stone-700 capitalize">{p.scope_completeness || 'Not assessed'}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone-500">Exclusions</p>
                    <p className="mt-1 text-stone-700">{p.exclusions || 'None noted'}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone-500">Included allowances</p>
                    <p className="mt-1 text-stone-700">{p.included_allowances || 'None noted'}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone-500">Payment terms</p>
                    <p className="mt-1 text-stone-700">{p.payment_terms || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone-500">Warranty</p>
                    <p className="mt-1 text-stone-700">{p.warranty_terms || 'Not specified'}</p>
                  </div>
                </div>

                {p.normalization_notes && (
                  <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                    <strong>Why the normalized amount differs:</strong> {p.normalization_notes}
                  </div>
                )}

                {tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-stone-300 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-stone-600">
                        {TAG_LABEL[tag] || tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-5">
                  {docUrl ? (
                    <a href={docUrl} target="_blank" rel="noreferrer" className="text-sm font-bold text-navy-900 underline hover:text-orange">
                      View original proposal document →
                    </a>
                  ) : (
                    <span className="text-sm text-stone-400">Original document link unavailable</span>
                  )}
                </div>
              </article>
            );
          })}
          {proposals.length === 0 && (
            <div className="rounded-3xl border border-stone-200 bg-white p-8 text-center text-stone-500">
              No proposals to compare yet. Check back once contractors respond.
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import SiteNav from '@/components/SiteNav';
import { getServiceClient } from '@/lib/supabase';
import { hasPortalAccess } from '@/lib/portal-auth';
import { listBidPackages } from '@/lib/gc-procurement';
import { createBidPackageAction } from './actions';

export const dynamic = 'force-dynamic';

const STATUS_COLOR: Record<string, string> = {
  draft: 'bg-stone-200 text-stone-700',
  sent: 'bg-blue-100 text-blue-800',
  collecting: 'bg-amber-100 text-amber-800',
  comparing: 'bg-purple-100 text-purple-800',
  closed: 'bg-emerald-100 text-emerald-800',
};

export default async function BidPackagesAdminPage() {
  if (!(await hasPortalAccess(process.env.CD_PROCUREMENT_ADMIN_KEY, process.env.MARKETING_PORTAL_ACCESS_KEY))) {
    return (
      <main className="min-h-screen bg-stone-50">
        <SiteNav variant="solid" />
        <section className="container-pro py-20">
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-900 shadow-elev-1">
            <p className="text-sm font-bold uppercase tracking-[0.2em]">Private internal tool</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight">Access key required</h1>
            <p className="mt-4 text-sm leading-relaxed">Open this page with your internal key. Example: /portal/bid-packages?key=YOUR_KEY.</p>
          </div>
        </section>
        <SiteFooter />
      </main>
    );
  }

  const supabase = getServiceClient();
  const packages = await listBidPackages(supabase);

  return (
    <main className="min-h-screen bg-stone-50">
      <SiteNav variant="solid" />
      <section className="container-pro py-12 sm:py-16">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">Southern Cities Construction · Procurement</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy-900">Bid packages</h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone-600 sm:text-base">
          A real scope of work sent to vetted contractors for pricing. Create one from a Deal Pack&apos;s
          scope, invite contractors, key in what comes back, and generate a client comparison link.
        </p>

        <details className="mt-8 rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
          <summary className="cursor-pointer text-sm font-bold uppercase tracking-[0.16em] text-navy-900">+ Create a bid package</summary>
          <form action={createBidPackageAction} className="mt-5 grid gap-3 sm:grid-cols-2">
            <input name="property_address" required placeholder="Property address *" className="rounded-xl border border-stone-300 px-3 py-2 text-sm sm:col-span-2" />
            <input name="property_state" defaultValue="NC" placeholder="State" className="rounded-xl border border-stone-300 px-3 py-2 text-sm" />
            <input name="order_id" type="number" placeholder="Linked order ID (optional)" className="rounded-xl border border-stone-300 px-3 py-2 text-sm" />
            <textarea name="scope_summary" required placeholder="Scope summary *" rows={3} className="rounded-xl border border-stone-300 px-3 py-2 text-sm sm:col-span-2" />
            <input name="target_schedule_weeks" type="number" placeholder="Target schedule (weeks)" className="rounded-xl border border-stone-300 px-3 py-2 text-sm" />
            <input name="bid_due_date" type="date" placeholder="Bid due date" className="rounded-xl border border-stone-300 px-3 py-2 text-sm" />
            <input name="requested_start_date" type="date" placeholder="Requested start date" className="rounded-xl border border-stone-300 px-3 py-2 text-sm" />
            <input name="required_proposal_format" placeholder="Required proposal format" className="rounded-xl border border-stone-300 px-3 py-2 text-sm" />
            <textarea name="known_site_conditions" placeholder="Known site conditions" rows={2} className="rounded-xl border border-stone-300 px-3 py-2 text-sm sm:col-span-2" />
            <textarea name="required_permits" placeholder="Required permits" rows={2} className="rounded-xl border border-stone-300 px-3 py-2 text-sm sm:col-span-2" />
            <button className="rounded-full bg-orange px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-500 sm:col-span-2 sm:w-fit">
              Create bid package
            </button>
          </form>
        </details>

        <div className="mt-8 space-y-4">
          {packages.length === 0 && (
            <div className="rounded-3xl border border-stone-200 bg-white p-8 text-center text-stone-500">
              No bid packages yet. Create the first one above.
            </div>
          )}
          {packages.map((pkg) => (
            <Link
              key={pkg.id}
              href={`/portal/bid-packages/${pkg.id}`}
              className="block rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1 transition hover:border-navy-900"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] ${STATUS_COLOR[pkg.status]}`}>{pkg.status}</span>
                  <h2 className="mt-3 text-xl font-extrabold text-navy-900">{pkg.property_address}</h2>
                  <p className="mt-1 text-sm text-stone-600">{pkg.scope_summary}</p>
                </div>
                <p className="text-xs text-stone-400">Created {new Date(pkg.created_at).toLocaleDateString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

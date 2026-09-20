import SiteFooter from '@/components/SiteFooter';
import SiteNav from '@/components/SiteNav';
import { getServiceClient } from '@/lib/supabase';
import { hasPortalAccess } from '@/lib/portal-auth';
import { listDeskReviews, type CdDeskReviewStatus } from '@/lib/construction-department/desk-reviews';
import { claimDeskReviewAction, saveDeskReviewNotesAction, deliverDeskReviewAction } from './actions';

export const dynamic = 'force-dynamic';

const STATUS_LABEL: Record<CdDeskReviewStatus, string> = {
  requested: 'Requested',
  in_review: 'In review',
  delivered: 'Delivered',
  canceled: 'Canceled',
};

const STATUS_COLOR: Record<CdDeskReviewStatus, string> = {
  requested: 'bg-amber-100 text-amber-800',
  in_review: 'bg-blue-100 text-blue-800',
  delivered: 'bg-emerald-100 text-emerald-800',
  canceled: 'bg-stone-200 text-stone-600',
};

export default async function DeskReviewsAdminPage({
  searchParams,
}: {
  searchParams?: { status?: string };
}) {
  const expectedKey = process.env.CD_DESK_REVIEW_ADMIN_KEY || process.env.MARKETING_PORTAL_ACCESS_KEY;

  if (!expectedKey) {
    return (
      <main className="min-h-screen bg-stone-50">
        <SiteNav variant="solid" />
        <section className="container-pro py-20">
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 text-amber-900 shadow-elev-1">
            <p className="text-sm font-bold uppercase tracking-[0.2em]">Admin unavailable</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight">Set MARKETING_PORTAL_ACCESS_KEY first</h1>
          </div>
        </section>
        <SiteFooter />
      </main>
    );
  }

  if (!hasPortalAccess(process.env.CD_DESK_REVIEW_ADMIN_KEY, process.env.MARKETING_PORTAL_ACCESS_KEY)) {
    return (
      <main className="min-h-screen bg-stone-50">
        <SiteNav variant="solid" />
        <section className="container-pro py-20">
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-900 shadow-elev-1">
            <p className="text-sm font-bold uppercase tracking-[0.2em]">Private internal tool</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight">Access key required</h1>
            <p className="mt-4 text-sm leading-relaxed">Open this page with your internal key. Example: /portal/desk-reviews?key=YOUR_KEY.</p>
          </div>
        </section>
        <SiteFooter />
      </main>
    );
  }

  const supabase = getServiceClient();
  const statusFilter = searchParams?.status as CdDeskReviewStatus | undefined;
  const reviews = await listDeskReviews(supabase, statusFilter ? { status: statusFilter } : undefined);

  const counts = { requested: 0, in_review: 0, delivered: 0, canceled: 0 } as Record<CdDeskReviewStatus, number>;
  const allReviews = statusFilter ? await listDeskReviews(supabase) : reviews;
  for (const r of allReviews) counts[r.status] += 1;

  const filters: Array<{ label: string; value?: CdDeskReviewStatus }> = [
    { label: 'All' },
    { label: 'Requested', value: 'requested' },
    { label: 'In review', value: 'in_review' },
    { label: 'Delivered', value: 'delivered' },
  ];

  return (
    <main className="min-h-screen bg-stone-50">
      <SiteNav variant="solid" />
      <section className="container-pro py-12 sm:py-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">Southern Cities Construction Department</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy-900">Construction Desk Reviews</h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone-600 sm:text-base">
              Every ANALYZE-stage request from a member: claim it, write up scope notes,
              finish-level recommendation, and risk notes, then deliver — the member gets
              an email pointing them back to their member area.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-sm text-stone-500">Requested</p>
            <p className="mt-3 text-3xl font-extrabold text-navy-900">{counts.requested}</p>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-sm text-stone-500">In review</p>
            <p className="mt-3 text-3xl font-extrabold text-navy-900">{counts.in_review}</p>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-sm text-stone-500">Delivered</p>
            <p className="mt-3 text-3xl font-extrabold text-navy-900">{counts.delivered}</p>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
            <p className="text-sm text-stone-500">Total</p>
            <p className="mt-3 text-3xl font-extrabold text-navy-900">{allReviews.length}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <a
              key={f.label}
              href={f.value ? `/portal/desk-reviews?status=${f.value}` : '/portal/desk-reviews'}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                statusFilter === f.value
                  ? 'bg-navy-900 text-white'
                  : 'border border-stone-300 bg-white text-stone-600 hover:border-navy-900'
              }`}
            >
              {f.label}
            </a>
          ))}
        </div>

        <div className="mt-8 space-y-5">
          {reviews.length === 0 && (
            <div className="rounded-3xl border border-stone-200 bg-white p-8 text-center text-stone-500">
              No Desk Review requests {statusFilter ? `with status "${STATUS_LABEL[statusFilter]}"` : 'yet'}.
            </div>
          )}
          {reviews.map((review) => (
            <article key={review.id} className="rounded-3xl border border-stone-200 bg-white p-6 shadow-elev-1">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] ${STATUS_COLOR[review.status]}`}>
                      {STATUS_LABEL[review.status]}
                    </span>
                    <span className="rounded-full bg-stone-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">
                      {review.was_credit ? 'Used credit' : 'Overage — paid'}
                    </span>
                  </div>
                  <h2 className="mt-4 text-2xl font-extrabold text-navy-900">{review.property_address}</h2>
                  <p className="mt-2 text-sm text-stone-600">{review.email}</p>
                  <p className="mt-1 text-xs text-stone-400">
                    Requested {new Date(review.created_at).toLocaleString()}
                    {review.reviewer_email ? ` · Claimed by ${review.reviewer_email}` : ''}
                    {review.delivered_at ? ` · Delivered ${new Date(review.delivered_at).toLocaleString()}` : ''}
                  </p>
                </div>

                {review.status === 'requested' && (
                  <form action={claimDeskReviewAction} className="flex min-w-[260px] flex-col gap-2 rounded-2xl border border-stone-200 bg-stone-50 p-4">
                    <input type="hidden" name="id" value={review.id} />
                    <label className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">Claim as</label>
                    <input
                      type="email"
                      name="reviewer_email"
                      placeholder="you@southerncitiesconstruction.com"
                      required
                      className="rounded-xl border border-stone-300 px-3 py-2 text-sm"
                    />
                    <button className="mt-1 rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy">
                      Claim this review
                    </button>
                  </form>
                )}
              </div>

              {review.status !== 'requested' && (
                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
                  <form action={saveDeskReviewNotesAction} className="space-y-3">
                    <input type="hidden" name="id" value={review.id} />
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">Scope notes</label>
                      <textarea
                        name="scope_notes"
                        defaultValue={review.scope_notes || ''}
                        rows={3}
                        className="mt-1 w-full rounded-2xl border border-stone-300 px-4 py-3 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">Finish-level recommendation</label>
                      <textarea
                        name="finish_level_recommendation"
                        defaultValue={review.finish_level_recommendation || ''}
                        rows={2}
                        className="mt-1 w-full rounded-2xl border border-stone-300 px-4 py-3 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">Risk notes</label>
                      <textarea
                        name="risk_notes"
                        defaultValue={review.risk_notes || ''}
                        rows={3}
                        className="mt-1 w-full rounded-2xl border border-stone-300 px-4 py-3 text-sm"
                      />
                    </div>
                    <button className="rounded-full bg-orange px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-500">
                      Save notes
                    </button>
                  </form>

                  <div className="rounded-3xl border border-stone-200 bg-stone-50 p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">Deliver</p>
                    <p className="mt-2 text-sm text-stone-600">
                      Sends the member an email pointing them back to their Construction Department member area.
                    </p>
                    {review.status === 'delivered' ? (
                      <p className="mt-4 text-sm font-semibold text-emerald-700">Delivered.</p>
                    ) : (
                      <form action={deliverDeskReviewAction} className="mt-4">
                        <input type="hidden" name="id" value={review.id} />
                        <input type="hidden" name="email" value={review.email} />
                        <input type="hidden" name="property_address" value={review.property_address} />
                        <button className="w-full rounded-full bg-navy-900 px-4 py-3 text-sm font-semibold text-white hover:bg-navy">
                          Mark delivered &amp; email member
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

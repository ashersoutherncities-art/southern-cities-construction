import Link from 'next/link';
import type { Metadata } from 'next';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { avatarPages, getAllServices, type ServicePurchaseType } from '@/lib/services-data';

export const metadata: Metadata = {
  title: 'Services & Pricing — Everything in One Place | Southern Cities Construction',
  description:
    'The full Southern Cities Construction catalog on one page — fixed-price services, custom-quoted construction work, and monthly support plans for homeowners, investors, realtors, contractors, and developers. NC GC License #107724.',
  alternates: { canonical: '/services/all' },
};

type Row = ReturnType<typeof getAllServices>[number];

const shortLabel: Record<string, string> = Object.fromEntries(
  avatarPages.map((p) => [p.slug, p.shortLabel.replace(/^For\s+/i, '')]),
);

const GROUPS: { type: ServicePurchaseType; label: string; blurb: string }[] = [
  { type: 'fixed', label: 'Buy now — fixed price', blurb: 'A clear deliverable at a clear price. Purchase it and we get started.' },
  { type: 'priced', label: 'Priced after a quick review', blurb: 'A few project details shape the price, so we confirm a number before you pay.' },
  { type: 'review', label: 'Custom-quoted services', blurb: 'Active or complex work we scope to your actual file before pricing it.' },
  { type: 'recurring', label: 'Monthly support plans', blurb: 'When the same problem keeps coming back, a monthly plan keeps help on tap.' },
];

function priceFor(s: Row): string {
  if (s.purchaseType === 'review') return 'Custom quote';
  if (s.purchaseType === 'priced') return s.monthlyPrice || 'Priced after review';
  return s.monthlyPrice || (s.purchaseType === 'recurring' ? 'Monthly' : 'Fixed price');
}

function hrefFor(s: Row): string {
  return s.purchaseType === 'fixed' ? s.detailHref : s.ctaHref || s.detailHref;
}

export default function AllServicesPage() {
  const all = getAllServices();

  return (
    <>
      <SiteNav variant="solid" />
      <main className="bg-white text-navy">
        <section className="border-b border-stone-200 bg-stone-50 py-20 sm:py-24">
          <div className="container-pro max-w-4xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Services &amp; Pricing</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Everything we do, on one page.</h1>
            <p className="mt-5 text-base leading-relaxed text-stone-700 sm:text-lg">
              Every Southern Cities service in one place — grouped by how you buy it, from clear fixed-price help to
              custom-quoted construction work and monthly support plans. Not sure where to start? Jump to your role.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {avatarPages.map((p) => (
                <Link
                  key={p.slug}
                  href={`/services/${p.slug}`}
                  className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange"
                >
                  {p.shortLabel}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16">
          <div className="container-pro">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Start here</p>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Link
                href="/lp/rehab-budget-range-execution-risk-snapshot"
                className="group rounded-[24px] border border-stone-200 bg-white p-7 transition hover:border-orange"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">Free tool</p>
                <h3 className="mt-3 text-xl font-extrabold tracking-tight">Rehab Budget &amp; Execution-Risk Snapshot</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-stone-700">
                  Get a GC-calibrated all-in rehab range and execution-risk read on any NC property — free, in minutes.
                </p>
                <span className="mt-5 inline-block text-sm font-semibold text-navy group-hover:text-orange">Start free →</span>
              </Link>
              <Link href="/deal-desk" className="group rounded-[24px] border border-stone-200 bg-white p-7 transition hover:border-orange">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">Membership</p>
                <h3 className="mt-3 text-xl font-extrabold tracking-tight">Deal Desk Membership</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-stone-700">
                  GC-verified rehab numbers plus your Max Allowable Offer on every NC deal — all month long.
                </p>
                <span className="mt-5 inline-block text-sm font-semibold text-navy group-hover:text-orange">See plans →</span>
              </Link>
            </div>
          </div>
        </section>

        {GROUPS.map((g) => {
          const rows = all.filter((s) => s.purchaseType === g.type);
          if (!rows.length) return null;
          return (
            <section key={g.type} id={g.type} className="border-t border-stone-200 py-14 sm:py-16">
              <div className="container-pro">
                <div className="max-w-3xl">
                  <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{g.label}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-stone-600">{g.blurb}</p>
                </div>
                <div className="mt-7 overflow-hidden rounded-[20px] border border-stone-200">
                  <div className="divide-y divide-stone-200">
                    {rows.map((s, i) => (
                      <Link
                        key={`${s.avatar}-${s.slug}-${i}`}
                        href={hrefFor(s)}
                        className="group flex flex-col gap-2 px-5 py-4 transition hover:bg-stone-50 sm:flex-row sm:items-center sm:gap-4"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-navy group-hover:text-orange">{s.title}</span>
                            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[11px] font-semibold text-stone-500">
                              {shortLabel[s.avatar] || s.avatarLabel}
                            </span>
                          </div>
                          <p className="mt-1 line-clamp-1 text-[13.5px] leading-relaxed text-stone-600">{s.summary}</p>
                        </div>
                        <div className="flex items-center justify-between gap-3 sm:justify-end">
                          <span className="whitespace-nowrap text-[15px] font-extrabold text-orange">{priceFor(s)}</span>
                          <span aria-hidden className="text-stone-400 group-hover:text-orange">→</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        <section className="border-t border-stone-200 bg-stone-50 py-16">
          <div className="container-pro max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Not sure which one fits?</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-stone-700">
              Tell us about the project and we&apos;ll point you to the right starting point — no pressure, no guessing.
            </p>
            <Link
              href="/start"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-orange px-7 py-3.5 text-sm font-bold text-white transition hover:opacity-90"
            >
              Get started
            </Link>
            <p className="mt-6 text-[12px] text-stone-500">Southern Cities Construction · NC GC License #107724</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

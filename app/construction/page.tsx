import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import RealDeals from '@/components/RealDeals';
import { PLATFORM_STAGES } from '@/lib/investor-platform';

export const metadata = {
  title: 'Construction — Build & Procure | Southern Cities Construction',
  description:
    'A licensed NC GC (#107724) puts a committed rehab price on your deal, gets it bid out to vetted local contractors, and can run the build itself. Fixed-price execution, or transparent bid comparison — your call.',
  alternates: { canonical: '/construction' },
  openGraph: {
    type: 'website',
    url: '/construction',
    title: 'Construction — Build & Procure | Southern Cities Construction',
    description:
      'A licensed NC GC prices your rehab, gets it bid by vetted local contractors, and can run the build. Fixed-price execution, or transparent bid comparison.',
    siteName: 'Southern Cities Construction',
  },
};

// The 2026-09-17 strategic plan's narrow-launch hold on co1-co4 was
// explicitly overridden by the founder's Construction Department
// repositioning — every paid execution stage is now public.
const EXECUTION_SLUGS = ['co2', 'co3', 'co4', 'co5'] as const;

export default function ConstructionHubPage() {
  const executionOptions = EXECUTION_SLUGS.map((slug) => PLATFORM_STAGES.find((s) => s.slug === slug)!);

  return (
    <>
      <SiteNav variant="solid" />
      <div className="min-h-screen overflow-x-hidden bg-[#08111d] text-white">

      {/* HERO — plain language */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pb-28">
        <div className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full bg-orange/[0.18] blur-[160px]" aria-hidden="true" />
        <div className="absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full bg-orange/[0.08] blur-[140px]" aria-hidden="true" />
        <div className="relative z-10 container-pro">
          <div className="max-w-4xl">
            <span className="inline-flex items-center rounded-full border border-orange/50 bg-orange/15 px-4 py-1.5 text-[12px] font-black uppercase tracking-[0.18em] text-orange">
              PROCURE &amp; BUILD
            </span>
            <h1 className="mt-6 text-3xl font-black leading-[1.04] tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.5rem]">
              Once the price is set, someone has to build it.<br />
              <span className="text-orange">Get it bid, or hand it off.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-[1.55] text-white/80 sm:text-xl">
              A Deal Pack gives you a committed rehab price. From there: put the scope out to
              vetted local contractors and compare every bid side by side &mdash; including
              Southern Cities&apos; own &mdash; or hand the whole build to a licensed NC GC,
              fixed-price.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#procure"
                className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.5)] transition hover:bg-orange-500 hover:-translate-y-0.5"
              >
                See how procurement works
              </Link>
              <Link
                href="#execution"
                className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-white transition hover:bg-white/10"
              >
                Or hand off the build
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* THREE DOORS */}
      <section id="start" className="bg-[#08111d] py-16 sm:py-20 border-t border-white/8">
        <div className="container-pro">
          <div className="max-w-3xl">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">Three ways in</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl">
              Pick the door that fits your deal.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {/* Door 1 — Build-Ready Deal Pack (flagship) */}
            <Link
              href="/deal-pack"
              className="group relative flex flex-col rounded-[24px] border-2 border-orange/60 bg-gradient-to-br from-orange/[0.12] via-[#0d1a30] to-[#0d1a30] p-7 shadow-[0_20px_50px_-20px_rgba(245,130,32,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_30px_60px_-20px_rgba(245,130,32,0.5)]"
            >
              <span className="absolute -top-3 left-7 inline-flex items-center rounded-full bg-orange px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-[0_8px_18px_-6px_rgba(245,130,32,0.6)]">
                Flagship
              </span>
              <div className="flex items-center justify-between gap-4">
                <span className="text-[12px] font-black uppercase tracking-[0.14em] text-white">Build-Ready Deal Pack</span>
                <span className="text-[14px] font-bold text-orange">$1,997</span>
              </div>
              <p className="mt-4 text-[15.5px] leading-[1.6] text-white/85">
                A licensed NC GC puts your rehab price in writing, sealed with the license and transferable
                once to your end buyer. Ships with plans, renderings, market study, materials list, vendor
                list, permit memo, and risk report.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-orange group-hover:gap-3 transition-all">
                See what&apos;s in it &rarr;
              </span>
            </Link>

            {/* Door 2 — Vetted GC procurement */}
            <Link
              href="#procure"
              className="group flex flex-col rounded-[24px] border border-white/12 bg-white/[0.03] p-7 transition-all hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.05]"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-[12px] font-black uppercase tracking-[0.14em] text-white">Vetted GC Procurement</span>
                <span className="text-[14px] font-bold text-white/75">Included in membership</span>
              </div>
              <p className="mt-4 text-[15.5px] leading-[1.6] text-white/85">
                Already have a scope? Southern Cities takes it to vetted local contractors,
                normalizes the proposals, and shows you every bid side by side &mdash; ours included.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-white/85 group-hover:gap-3 group-hover:text-orange transition-all">
                See how it works &darr;
              </span>
            </Link>

            {/* Door 3 — Full GC execution */}
            <Link
              href="#execution"
              className="group flex flex-col rounded-[24px] border border-white/12 bg-white/[0.03] p-7 transition-all hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.05]"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-[12px] font-black uppercase tracking-[0.14em] text-white">Full GC Execution</span>
                <span className="text-[14px] font-bold text-white/75">Scoped per project</span>
              </div>
              <p className="mt-4 text-[15.5px] leading-[1.6] text-white/85">
                Already own the deal? Fixed-price, on-schedule execution &mdash; Southern Cities carries the
                budget and schedule risk. You bring capital, we deliver keys.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-white/85 group-hover:gap-3 group-hover:text-orange transition-all">
                See how it works &darr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* PROCURE — Vetted GC Quote Procurement & Comparison */}
      <section id="procure" className="bg-gradient-to-br from-orange/[0.06] via-[#0a1428] to-[#0a1428] py-16 sm:py-20 border-t border-white/8 scroll-mt-24">
        <div className="container-pro">
          <div className="max-w-3xl">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">Don&apos;t guess what construction should cost</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl">
              Vetted GC Quote Procurement &amp; Comparison.
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/70 sm:text-lg">
              Once your scope of work is set, Southern Cities packages it into a real Bid
              Package and sends it to vetted local contractors in your market &mdash; not a
              random lead-gen list. Every proposal comes back normalized onto the same scope,
              so you are comparing apples to apples.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-[20px] border border-white/12 bg-white/[0.03] p-6">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange">Vetted, not random</p>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-white/80">
                Contractors are checked for license, insurance, and real project history before
                they ever see a Bid Package.
              </p>
            </div>
            <div className="rounded-[20px] border border-white/12 bg-white/[0.03] p-6">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange">Southern Cities bids too — transparently</p>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-white/80">
                Our own offer sits in the same comparison as everyone else&apos;s. It is never
                favored, hidden, or auto-recommended &mdash; you see every original proposal in
                full, side by side.
              </p>
            </div>
            <div className="rounded-[20px] border border-white/12 bg-white/[0.03] p-6">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange">Decision support, not a ranking</p>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-white/80">
                Proposals are tagged &mdash; lowest price, most complete scope, fastest schedule
                &mdash; so you can see the tradeoffs. Nobody is declared the &ldquo;winner.&rdquo; The
                choice is yours.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/construction-department"
              className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.5)] transition hover:bg-orange-500 hover:-translate-y-0.5"
            >
              Included with Construction Department &rarr;
            </Link>
            <Link
              href="/start"
              className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-white transition hover:bg-white/10"
            >
              Ask about a one-off bid package
            </Link>
          </div>
        </div>
      </section>

      {/* WHOLESALER TERMS — attached to Deal Pack */}
      <section className="bg-gradient-to-br from-orange/[0.08] via-[#0a1428] to-[#0a1428] py-14 border-t border-white/8">
        <div className="container-pro">
          <div className="rounded-[24px] border-2 border-orange/40 bg-gradient-to-br from-orange/[0.10] via-orange/[0.04] to-transparent p-7 sm:p-9 lg:p-10 shadow-[0_24px_48px_-16px_rgba(245,130,32,0.18)]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="lg:max-w-2xl">
                <span className="inline-flex items-center rounded-full border border-orange/60 bg-orange/15 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-orange">
                  FOR NC WHOLESALERS
                </span>
                <h2 className="mt-4 text-2xl font-black tracking-[-0.025em] text-white sm:text-3xl">
                  <span className="text-orange">$0 upfront.</span> Pay from your assignment at closing. No close, no pay.
                </h2>
                <p className="mt-3 text-[15px] leading-[1.6] text-white/80 sm:text-base">
                  Wholesalers put nothing down. We put a licensed NC GC&apos;s committed rehab price on
                  the deal, and the fee comes out of your assignment proceeds when the deal closes. Nothing
                  closes, nothing owed. Fee confirmed on a short scoping call.
                </p>
              </div>
              <Link
                href="/lp/wholesaler-deal-pack"
                className="shrink-0 inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.5)] transition hover:bg-orange-500 hover:-translate-y-0.5"
              >
                Wholesaler terms &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* EXECUTION — every paid execution stage is public per the founder's
          repositioning override (see the CLEARED_UPSELL_TARGETS comment in
          app/construction/[stage]/page.tsx for the prior HOLD this replaced). */}
      <section id="execution" className="bg-[#0a1428] py-16 sm:py-20 border-t border-white/8 scroll-mt-24">
        <div className="container-pro">
          <div className="max-w-3xl">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">If you own the deal · execution</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl">
              Hand the build off, fixed-price.
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/70 sm:text-lg">
              For owners who already control the property and want a licensed NC GC to carry the
              budget and schedule risk &mdash; at whatever level of hand-off fits.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {executionOptions.map((stage) => (
              <Link
                key={stage.slug}
                href={`/construction/${stage.slug}`}
                className="group flex flex-col rounded-[20px] border border-orange/60 bg-gradient-to-br from-orange/[0.10] via-[#0d1a30] to-[#0d1a30] p-6 transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11.5px] font-black uppercase tracking-[0.14em] text-white">
                    {stage.marketingShortName}
                  </span>
                  <span className="text-[13px] font-bold text-orange">{stage.pricing}</span>
                </div>
                <p className="mt-3 text-[14.5px] leading-[1.6] text-white/80">{stage.oneLiner}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.08em] text-orange group-hover:gap-3 transition-all">
                  See {stage.marketingShortName} &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <RealDeals theme="dark" />

      {/* BOTTOM CTA */}
      <section className="bg-[#08111d] py-20 sm:py-24 border-t border-white/8">
        <div className="container-pro max-w-3xl text-center">
          <h2 className="text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl">
            Not sure where you fit?
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-white/75 sm:text-lg">
            Book a short call and a licensed NC GC will tell you which door to walk through.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/start"
              className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.5)] transition hover:bg-orange-500 hover:-translate-y-0.5"
            >
              Book a Free Project Call &rarr;
            </Link>
            <a
              href="tel:+19804737249"
              className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-white transition hover:bg-white/10"
            >
              Or call (980) 473-7249
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
      </div>
    </>
  );
}

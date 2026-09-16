import Image from 'next/image';
import Link from 'next/link';
import RealDeals from '@/components/RealDeals';
import { PLATFORM_STAGES } from '@/lib/investor-platform';

export const metadata = {
  title: 'The Platform — Committed Rehab Prices & Execution | Southern Cities Construction',
  description:
    'A licensed NC GC (#107724) puts a committed rehab price on your deal — before you buy it — and can run the build after. Start with the $1,997 Build-Ready Deal Pack.',
  alternates: { canonical: '/platform' },
  openGraph: {
    type: 'website',
    url: '/platform',
    title: 'The Platform — Committed Rehab Prices for NC Investors',
    description:
      'A licensed NC GC puts a committed rehab price on your deal — before you buy it — and can run the build after.',
    siteName: 'Southern Cities Construction',
  },
};

const EXECUTION_SLUGS = ['co2', 'co3', 'co4', 'co5'] as const;

export default function PlatformHubPage() {
  const executionOptions = EXECUTION_SLUGS.map((slug) => PLATFORM_STAGES.find((s) => s.slug === slug)!);

  return (
    <div className="min-h-screen bg-[#08111d] text-white">
      {/* Minimal nav */}
      <header className="border-b border-white/8">
        <div className="container-pro flex items-center justify-between py-5">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/sc-construction-logo-reversed.png"
              alt="Southern Cities Construction"
              width={180}
              height={48}
              className="h-8 w-auto sm:h-10"
              priority
            />
          </Link>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
            NC GC License #107724
          </span>
        </div>
      </header>

      {/* HERO — plain language */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
        <div className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full bg-orange/[0.18] blur-[160px]" aria-hidden="true" />
        <div className="absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full bg-orange/[0.08] blur-[140px]" aria-hidden="true" />
        <div className="relative z-10 container-pro">
          <div className="max-w-4xl">
            <span className="inline-flex items-center rounded-full border border-orange/50 bg-orange/15 px-4 py-1.5 text-[12px] font-black uppercase tracking-[0.18em] text-orange">
              FOR NC INVESTORS &amp; WHOLESALERS
            </span>
            <h1 className="mt-6 text-3xl font-black leading-[1.04] tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.5rem]">
              A licensed NC GC&apos;s help before and during your project.<br />
              <span className="text-orange">Start with a committed rehab price.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-[1.55] text-white/80 sm:text-xl">
              Most GCs won&apos;t review a deal you don&apos;t own yet. We will. Put a licensed
              NC GC&apos;s committed rehab price on the deal &mdash; then hire us to run the build if it
              makes sense. Starts at <span className="text-white font-semibold">$1,997</span>.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/deal-pack"
                className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.5)] transition hover:bg-orange-500 hover:-translate-y-0.5"
              >
                See the Build-Ready Deal Pack &rarr;
              </Link>
              <Link
                href="/lp/rehab-budget-range-execution-risk-snapshot"
                className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-white transition hover:bg-white/10"
              >
                Or start free
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

            {/* Door 2 — Execution help */}
            <Link
              href="#execution"
              className="group flex flex-col rounded-[24px] border border-white/12 bg-white/[0.03] p-7 transition-all hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.05]"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-[12px] font-black uppercase tracking-[0.14em] text-white">Execution help</span>
                <span className="text-[14px] font-bold text-white/75">Custom</span>
              </div>
              <p className="mt-4 text-[15.5px] leading-[1.6] text-white/85">
                Already own the deal? Pick how much of the build you keep and how much a licensed NC GC
                carries &mdash; oversight, permits and license backing, day-to-day management, or full GC.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-white/85 group-hover:gap-3 group-hover:text-orange transition-all">
                See the four options &darr;
              </span>
            </Link>

            {/* Door 3 — Free snapshot */}
            <Link
              href="/lp/rehab-budget-range-execution-risk-snapshot"
              className="group flex flex-col rounded-[24px] border border-white/12 bg-white/[0.03] p-7 transition-all hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.05]"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-[12px] font-black uppercase tracking-[0.14em] text-white">Free Rehab Snapshot</span>
                <span className="text-[14px] font-bold text-emerald-400">Free</span>
              </div>
              <p className="mt-4 text-[15.5px] leading-[1.6] text-white/85">
                A GC-calibrated per-SF rehab range and risk read on any NC property &mdash; in minutes,
                no commitment. Use it to decide whether to pull the trigger on a Deal Pack.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-white/85 group-hover:gap-3 group-hover:text-orange transition-all">
                Get the snapshot &rarr;
              </span>
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

      {/* EXECUTION OPTIONS — the four, subordinate to the three doors above */}
      <section id="execution" className="bg-[#0a1428] py-16 sm:py-20 border-t border-white/8">
        <div className="container-pro">
          <div className="max-w-3xl">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">If you own the deal · execution</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl">
              Four ways to hand the build off.
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/70 sm:text-lg">
              These are execution options for owners who already control the property. Pick how much you
              keep and how much a licensed NC GC carries.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {executionOptions.map((stage) => {
              const isFlagship = stage.slug === 'co4';
              return (
                <Link
                  key={stage.slug}
                  href={`/platform/${stage.slug}`}
                  className={`group flex flex-col rounded-[20px] border p-6 transition-all hover:-translate-y-0.5 ${
                    isFlagship
                      ? 'border-orange/60 bg-gradient-to-br from-orange/[0.10] via-[#0d1a30] to-[#0d1a30]'
                      : 'border-white/12 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]'
                  }`}
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
              );
            })}
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

      {/* FOOTER */}
      <footer className="border-t border-white/8 bg-[#040810] py-10">
        <div className="container-pro">
          <p className="text-[12px] text-white/45">
            © 2026 Southern Cities Construction · NC GC License #107724 · 525 N Tryon St, Charlotte, NC 28202
          </p>
          <p className="mt-2 text-[12px] text-white/45">
            <Link href="/privacy" className="hover:text-orange">Privacy</Link>
            <span className="mx-2 text-white/25">·</span>
            <Link href="/terms" className="hover:text-orange">Terms</Link>
            <span className="mx-2 text-white/25">·</span>
            <Link href="/" className="hover:text-orange">Southern Cities Construction main site</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { PLATFORM_STAGES } from '@/lib/investor-platform';

export const metadata = {
  title: 'Investor Execution Platform | Southern Cities Construction',
  description:
    'Most real estate projects do not fail at acquisition. They fail during execution. Southern Cities Construction is a layered construction execution intelligence and operational support platform for real estate investors.',
  alternates: { canonical: '/platform' },
  openGraph: {
    type: 'website',
    url: '/platform',
    title: 'Investor Execution Platform — Construction Intelligence for NC Investors',
    description:
      'Start free, then choose how much of the build you keep and how much you hand to a licensed NC GC — from a $499 validation to full execution.',
    siteName: 'Southern Cities Construction',
  },
};

// Page-level presentation map: the keep / hand-off split for each level of
// involvement. This is what makes the menu legible — it shows that the levels
// are different SPLITS of responsibility, not rungs on a ladder. Derived from
// each stage's positioning in lib/investor-platform.ts.
const HANDOFF: Record<string, { youKeep: string; weCarry: string }> = {
  co2: {
    youKeep: 'You run the build, hold the permit, manage the crew',
    weCarry: 'The plan, scope, budget structure & contractor coordination — set up before a shovel moves',
  },
  co4: {
    youKeep: 'Daily control of the build — your crew, your pace, your calls',
    weCarry: 'Permits, code compliance & licensed GC backing',
  },
  co3: {
    youKeep: 'The permits, the funding, and all the upside',
    weCarry: 'Day-to-day execution — a licensed NC GC runs the job so it moves without you managing it',
  },
  co5: {
    youKeep: 'The capital and the deal',
    weCarry: 'Everything — execution, budget risk, schedule risk, permits, delivery',
  },
};

export default function PlatformHubPage() {
  // The on-ramp is genuinely sequential: free snapshot → $499 validation that
  // credits forward. Everything after it is a menu, not a climb.
  const onRamp = PLATFORM_STAGES.filter((s) => s.slug === 'lm1' || s.slug === 'co1');
  // The "dial" — ordered by how hands-on the OWNER stays, left (you keep most)
  // to right (we carry all). Deliberately NOT in SKU order: co4 sits beside co3
  // so the inversion is visible — in one you keep daily control and hand us the
  // license; in the other we run the day-to-day and you keep the permits.
  const levelOrder = ['co2', 'co4', 'co3', 'co5'] as const;
  const levels = levelOrder.map((slug) => PLATFORM_STAGES.find((s) => s.slug === slug)!);

  return (
    <div className="min-h-screen bg-[#08111d] text-white">
      {/* Minimal nav — distinct from Southern Cities main site nav */}
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
            Investor Execution Platform · NC GC #107724
          </span>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
        <div className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full bg-orange/[0.18] blur-[160px]" aria-hidden="true" />
        <div className="absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full bg-orange/[0.08] blur-[140px]" aria-hidden="true" />
        <div className="relative z-10 container-pro">
          <div className="max-w-4xl">
            <span className="inline-flex items-center rounded-full border border-orange/50 bg-orange/15 px-4 py-1.5 text-[12px] font-black uppercase tracking-[0.18em] text-orange">
              FOR REAL ESTATE INVESTORS · NC
            </span>
            <h1 className="mt-6 text-3xl font-black leading-[1.04] tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.75rem]">
              Most real estate projects don&apos;t fail at acquisition.<br />
              <span className="text-orange">They fail during execution.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-[1.55] text-white/80 sm:text-xl">
              Southern Cities Construction is a layered construction execution intelligence and operational
              support platform for real estate investors. Start free with a licensed NC GC budget snapshot — then
              choose how much of the build you keep and how much you hand off. From a $499 validation to full
              execution. You pick the level; the standard never changes.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/platform/lm1"
                className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.5)] transition hover:bg-orange-500 hover:-translate-y-0.5"
              >
                Start with the Free Budget Snapshot →
              </Link>
              <a
                href="#start"
                className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-white transition hover:bg-white/10"
              >
                See how it works ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHOLESALER PATH — DEAL PACK CALLOUT */}
      <section className="bg-gradient-to-br from-orange/[0.08] via-[#0a1428] to-[#0a1428] py-12 sm:py-14 border-t border-white/8">
        <div className="container-pro">
          <div className="rounded-[24px] border-2 border-orange/40 bg-gradient-to-br from-orange/[0.10] via-orange/[0.04] to-transparent p-7 sm:p-9 lg:p-10 shadow-[0_24px_48px_-16px_rgba(245,130,32,0.18)]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="lg:max-w-2xl">
                <span className="inline-flex items-center rounded-full border border-orange/60 bg-orange/15 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-orange">
                  FOR NC WHOLESALERS · NEW
                </span>
                <h2 className="mt-4 text-2xl font-black tracking-[-0.025em] text-white sm:text-3xl">
                  Are you a wholesaler? Start with <span className="text-orange">Deal Pack</span>.
                </h2>
                <p className="mt-3 text-[15px] leading-[1.6] text-white/80 sm:text-base">
                  Stop selling option contracts. Sell GC-Verified Deal Packs and consistently close $25–40K+ assignments to real end-investors — without becoming a flipper. Branded packages with a licensed NC GC&apos;s verification stamp, ready for your buyer&apos;s lender.
                </p>
              </div>
              <Link
                href="/deal-pack"
                className="shrink-0 inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.5)] transition hover:bg-orange-500 hover:-translate-y-0.5"
              >
                See the Deal Pack tiers →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY THIS EXISTS */}
      <section className="bg-[#0a1428] py-16 sm:py-20 border-t border-white/8">
        <div className="container-pro max-w-4xl">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">Why this exists</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl">
            Investors don&apos;t need contractors. They need execution probability.
          </h2>
          <div className="mt-8 space-y-5 text-[16px] leading-[1.65] text-white/80 sm:text-lg">
            <p>
              A construction budget is only valuable if contractors are realistically willing to execute the work at that pricing level in the current market. Theoretical spreadsheet budgets are dangerous. Execution feasibility matters more than generic estimates.
            </p>
            <p>
              Most real estate projects fail not at acquisition — but somewhere in execution. Budget drift. Operational chaos. Contractor coordination failures. Timeline slippage. Hidden execution risk that wasn&apos;t priced into the deal.
            </p>
            <p>
              The platform is built to reduce: <span className="text-white">execution uncertainty · budget drift · operational chaos · informational asymmetry · contractor coordination failures · timeline slippage · hidden execution risk.</span>
            </p>
            <p>
              You move from assumptions and rough numbers into validated, organized execution — keeping as much or as little control as you want at every step.
            </p>
          </div>
        </div>
      </section>

      {/* THE ON-RAMP — genuinely sequential */}
      <section id="start" className="bg-[#08111d] py-16 sm:py-20 border-t border-white/8">
        <div className="container-pro">
          <div className="max-w-3xl">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">Start here</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl">
              Everyone starts the same way.
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/70 sm:text-lg">
              Two steps, in order. A free budget snapshot you can underwrite from — then a licensed NC GC
              validates the deal for $499 that credits forward against anything you do next. After that, you
              choose your level.
            </p>
          </div>

          <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr]">
            {onRamp.map((stage, i) => (
              <div key={stage.slug} className="contents">
                <Link
                  href={`/platform/${stage.slug}`}
                  className="group flex flex-col rounded-[24px] border border-white/10 bg-gradient-to-br from-[#0d1a30] via-[#0a1428] to-[#0d1a30] p-7 transition-all hover:border-orange/50 hover:shadow-[0_24px_48px_-16px_rgba(245,130,32,0.25)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center rounded-full border border-orange/40 bg-orange/10 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-[0.18em] text-orange">
                      Step {i + 1} · {stage.marketingShortName}
                    </span>
                    <span className="text-[14px] font-bold text-orange">{stage.pricing}</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-white">{stage.name}</h3>
                  <p className="mt-3 text-[14.5px] leading-[1.6] text-white/75">{stage.oneLiner}</p>
                  <div className="mt-5 rounded-xl border border-white/8 bg-white/[0.025] p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange/85">Answers</p>
                    <p className="mt-1.5 text-[13.5px] leading-[1.5] text-white/85">{stage.questionAnswered}</p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-orange group-hover:gap-3 transition-all">
                    See the {stage.marketingShortName} →
                  </span>
                </Link>
                {i === 0 && (
                  <div className="hidden items-center justify-center lg:flex" aria-hidden="true">
                    <span className="text-2xl font-black text-orange/60">→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHOOSE YOUR LEVEL — the menu / dial, NOT a climb */}
      <section id="options" className="bg-[#0a1428] py-16 sm:py-20 border-t border-white/8">
        <div className="container-pro">
          <div className="max-w-3xl">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">Choose your level</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl">
              Then decide how much you hand off.
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/70 sm:text-lg">
              These aren&apos;t steps you climb — they&apos;re a menu. Every one is backed by the same licensed NC
              GC and held to the same standard. The only question is how much of the build you keep and how much
              we carry.
            </p>
          </div>

          {/* The control dial */}
          <div className="mt-12 hidden sm:block">
            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.18em]">
              <span className="text-white/80">◂ You keep control</span>
              <span className="text-white/80">We carry everything ▸</span>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-gradient-to-r from-orange/70 via-orange/40 to-white/25" />
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {levels.map((stage) => {
              const split = HANDOFF[stage.slug];
              const isFlagship = stage.slug === 'co4';
              return (
                <Link
                  key={stage.slug}
                  href={`/platform/${stage.slug}`}
                  className={`group/card relative flex flex-col rounded-[24px] border p-7 transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-16px_rgba(245,130,32,0.25)] ${
                    isFlagship
                      ? 'border-orange/60 bg-gradient-to-br from-orange/[0.12] via-[#0d1a30] to-[#0d1a30] shadow-[0_18px_40px_-18px_rgba(245,130,32,0.35)]'
                      : 'border-white/10 bg-gradient-to-br from-[#0d1a30] via-[#0a1428] to-[#0d1a30] hover:border-orange/50'
                  }`}
                >
                  {isFlagship && (
                    <span className="absolute -top-3 left-7 inline-flex items-center rounded-full bg-orange px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-[0_8px_18px_-6px_rgba(245,130,32,0.6)]">
                      ★ Flagship · Owner-Controlled Build
                    </span>
                  )}
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[12px] font-black uppercase tracking-[0.14em] text-white">
                      {stage.marketingShortName}
                    </span>
                    <span className="text-[14px] font-bold text-orange">{stage.pricing}</span>
                  </div>
                  <p className="mt-3 text-[14.5px] leading-[1.6] text-white/75">{stage.oneLiner}</p>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-orange/25 bg-orange/[0.06] p-3.5">
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-orange/90">You keep</p>
                      <p className="mt-1.5 text-[13px] leading-[1.5] text-white/85">{split.youKeep}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.025] p-3.5">
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/55">We carry</p>
                      <p className="mt-1.5 text-[13px] leading-[1.5] text-white/85">{split.weCarry}</p>
                    </div>
                  </div>

                  <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-orange group-hover/card:gap-3 transition-all">
                    See {stage.marketingShortName} →
                  </span>
                </Link>
              );
            })}
          </div>

          <p className="mt-8 max-w-2xl text-[14px] leading-[1.6] text-white/60">
            Not sure which fits? Start with the <span className="text-white">$499 Execution Review</span> — a
            licensed NC GC tells you which level your project actually needs, and the fee credits forward against
            whatever you choose.
          </p>
        </div>
      </section>

      {/* THE GUARANTEE LINE */}
      <section className="bg-[#08111d] py-16 sm:py-20 border-t border-white/8">
        <div className="container-pro max-w-4xl">
          <div className="rounded-[24px] border-2 border-orange/50 bg-gradient-to-br from-orange/[0.10] via-orange/[0.05] to-transparent p-7 sm:p-9 shadow-[0_24px_48px_-16px_rgba(245,130,32,0.20)]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center justify-center rounded-md bg-orange/25 border border-orange/50 px-3 py-1 text-[11px] font-black tracking-[0.18em] text-orange">
                PERFORMANCE GUARANTEE
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">
                Every paid level · NC GC #107724
              </span>
            </div>
            <h2 className="mt-5 text-2xl font-black tracking-[-0.02em] text-white sm:text-3xl lg:text-[2.25rem] leading-tight">
              If we cannot perform what we promised, full refund. NC GC #107724.
            </h2>
            <p className="mt-5 text-[15.5px] leading-[1.65] text-white/80 sm:text-[16.5px]">
              Every paid level on this platform carries the same guarantee: we evaluate your project before we accept it. If we determine we cannot deliver at our standard, full refund — no questions, no negotiation. Once we accept the engagement, we deliver. You are paying for our <span className="text-white font-semibold">commitment to deliver</span>, not gambling on outcomes.
            </p>
            <p className="mt-4 text-[14px] text-white/60">
              And the Execution Review&apos;s $499 fee credits forward against any deeper engagement — making the first paid step effectively free for anyone who continues.
            </p>
          </div>
        </div>
      </section>

      {/* GUIDING PRINCIPLE */}
      <section className="bg-[#08111d] py-16 sm:py-20 border-t border-white/8">
        <div className="container-pro max-w-3xl text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">Guiding principle</p>
          <h2 className="mt-4 text-2xl font-black tracking-[-0.02em] text-white sm:text-3xl lg:text-[2.25rem] leading-tight">
            Every level does the same job — it reduces uncertainty and chaos while increasing your confidence,
            control, and visibility.
          </h2>
          <p className="mt-6 text-[15px] leading-[1.6] text-white/65">
            You choose how much you hand off. The standard doesn&apos;t change. Southern Cities Construction
            isn&apos;t just a contractor &mdash; it&apos;s the execution intelligence layer behind your deals.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#08111d] py-20 sm:py-24 border-t border-white/8">
        <div className="container-pro max-w-3xl text-center">
          <h2 className="text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl">
            Start where you actually are.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-white/75 sm:text-lg">
            If you&apos;re underwriting a deal — start with the free Budget Snapshot. If you already own the property — start with the Execution Review or Project Setup. If construction has started — start with Active Oversight.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/platform/lm1"
              className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.5)] transition hover:bg-orange-500 hover:-translate-y-0.5"
            >
              Free Budget Snapshot →
            </Link>
            <Link
              href="/platform/co1"
              className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-white transition hover:bg-white/10"
            >
              Execution Review — $499
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/8 bg-[#040810] py-10">
        <div className="container-pro">
          <p className="text-[12px] text-white/45">
            © 2026 Southern Cities Construction · NC GC License #107724 · Investor Execution Platform
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

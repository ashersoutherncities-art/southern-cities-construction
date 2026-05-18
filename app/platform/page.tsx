import Link from 'next/link';
import { PLATFORM_STAGES } from '@/lib/investor-platform';

export const metadata = {
  title: 'Investor Execution Platform | Southern Cities Construction',
  description:
    'Most real estate projects do not fail at acquisition. They fail during execution. Southern Cities Construction is a layered construction execution intelligence and operational support platform for real estate investors.',
};

export default function PlatformHubPage() {
  return (
    <div className="min-h-screen bg-[#08111d] text-white">
      {/* Minimal nav — distinct from SCC main site nav */}
      <header className="border-b border-white/8">
        <div className="container-pro flex items-center justify-between py-5">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-[15px] font-black tracking-tight text-white">
              SOUTHERN CITIES <span className="text-orange">CONSTRUCTION</span>
            </span>
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
              Southern Cities Construction is a layered construction execution intelligence and operational support platform for real estate investors. Six modular stages — buy clarity only, validation, setup, oversight, GC support, or full execution. Sized to where you actually are in the project.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/platform/lm1"
                className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.5)] transition hover:bg-orange-500 hover:-translate-y-0.5"
              >
                Start with the Free Budget Snapshot →
              </Link>
              <a
                href="#stages"
                className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-white transition hover:bg-white/10"
              >
                See the 6-stage system ↓
              </a>
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
              Investors progressively move from assumptions and rough numbers into validated, organized, monitored, controlled execution.
            </p>
          </div>
        </div>
      </section>

      {/* THE 6-STAGE SYSTEM */}
      <section id="stages" className="bg-[#08111d] py-16 sm:py-20 border-t border-white/8">
        <div className="container-pro">
          <div className="max-w-3xl">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">The 6-stage system</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl">
              Buy clarity, validation, setup, oversight, GC support, or full execution.<br />
              Pick the stage that fits where you actually are.
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/70 sm:text-lg">
              Each stage answers a specific investor question and reveals the next one. Start at LM1 (free). Stop when execution risk is acceptable. Most investors find their right level somewhere in the middle.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {PLATFORM_STAGES.map((stage) => (
              <Link
                key={stage.slug}
                href={`/platform/${stage.slug}`}
                className="group flex flex-col rounded-[24px] border border-white/10 bg-gradient-to-br from-[#0d1a30] via-[#0a1428] to-[#0d1a30] p-7 transition-all hover:border-orange/50 hover:shadow-[0_24px_48px_-16px_rgba(245,130,32,0.25)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center rounded-lg bg-orange/15 border border-orange/40 px-2.5 py-1 text-[11px] font-black tracking-wider text-orange">
                      {stage.shortCode}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">
                      Stage {stage.stageNumber}
                    </span>
                  </div>
                  <span className="text-[14px] font-bold text-orange">
                    {stage.pricing}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-white">
                  {stage.name}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.6] text-white/75">
                  {stage.oneLiner}
                </p>
                <div className="mt-5 rounded-xl border border-white/8 bg-white/[0.025] p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange/85">Answers</p>
                  <p className="mt-1.5 text-[13.5px] leading-[1.5] text-white/85">
                    {stage.questionAnswered}
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-orange group-hover:gap-3 transition-all">
                  See {stage.shortCode} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDING PRINCIPLE */}
      <section className="bg-[#0a1428] py-16 sm:py-20 border-t border-white/8">
        <div className="container-pro max-w-3xl text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">Guiding principle</p>
          <h2 className="mt-4 text-2xl font-black tracking-[-0.02em] text-white sm:text-3xl lg:text-[2.25rem] leading-tight">
            Every stage reduces uncertainty, ambiguity, and execution chaos — while increasing confidence, control, and visibility.
          </h2>
          <p className="mt-6 text-[15px] leading-[1.6] text-white/65">
            The entire funnel progressively moves the investor from assumptions into organized execution reality. SCC isn&apos;t a contractor company. It&apos;s an execution intelligence layer.
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
            If you&apos;re underwriting a deal — start at LM1 (free). If you already own the property — start at CO1 or CO2. If construction has started — start at CO3.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/platform/lm1"
              className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.5)] transition hover:bg-orange-500 hover:-translate-y-0.5"
            >
              Free Budget Snapshot (LM1) →
            </Link>
            <Link
              href="/platform/co1"
              className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-white transition hover:bg-white/10"
            >
              Execution Review (CO1) — $499
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/8 bg-[#040810] py-10">
        <div className="container-pro">
          <p className="text-[12px] text-white/45">
            © 2026 Southern Cities Construction LLC · NC GC License #107724 · Investor Execution Platform
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

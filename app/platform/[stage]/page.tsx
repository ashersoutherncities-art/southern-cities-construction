import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PLATFORM_STAGES, getPlatformStage } from '@/lib/investor-platform';

type Params = { stage: string };

export function generateStaticParams() {
  return PLATFORM_STAGES.map((s) => ({ stage: s.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: Params }) {
  const stage = getPlatformStage(params.stage);
  if (!stage) return {};
  return {
    title: `${stage.shortCode} — ${stage.name} | Southern Cities Investor Execution Platform`,
    description: stage.heroSubheadline,
  };
}

export default function PlatformStagePage({ params }: { params: Params }) {
  const stage = getPlatformStage(params.stage);
  if (!stage) notFound();

  const nextStage = stage.nextStage ? getPlatformStage(stage.nextStage) : undefined;

  return (
    <div className="min-h-screen bg-[#08111d] text-white">
      {/* Minimal nav */}
      <header className="border-b border-white/8">
        <div className="container-pro flex items-center justify-between py-5">
          <Link href="/platform" className="flex items-center gap-2.5">
            <span className="text-[15px] font-black tracking-tight text-white">
              SOUTHERN CITIES <span className="text-orange">CONSTRUCTION</span>
            </span>
            <span className="ml-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
              · Investor Execution Platform
            </span>
          </Link>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
            NC GC #107724
          </span>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-orange/[0.16] blur-[140px]" aria-hidden="true" />
        <div className="relative z-10 container-pro">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/platform"
                className="text-[12px] font-bold uppercase tracking-[0.14em] text-white/55 hover:text-orange transition-colors"
              >
                ← Platform
              </Link>
              <span className="inline-flex items-center justify-center rounded-lg bg-orange/15 border border-orange/40 px-2.5 py-1 text-[11px] font-black tracking-wider text-orange">
                {stage.shortCode}
              </span>
              <span className="inline-flex items-center rounded-full border border-orange/50 bg-orange/15 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-orange">
                For {stage.audienceTag}
              </span>
            </div>

            <h1 className="mt-6 text-3xl font-black leading-[1.04] tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.5rem]">
              {stage.heroHeadlinePre}{' '}
              <span className="text-orange">{stage.heroHeadlineHighlight}</span>
              {stage.heroHeadlinePost}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-[1.55] text-white/80 sm:text-xl">
              {stage.heroSubheadline}
            </p>

            <div className="mt-8 grid gap-4 sm:flex sm:flex-wrap sm:items-center">
              <div className="rounded-2xl border border-orange/40 bg-orange/10 px-5 py-3">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange">Pricing</p>
                <p className="mt-0.5 text-2xl font-black text-white">{stage.pricing}</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/[0.03] px-5 py-3">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange">Turnaround</p>
                <p className="mt-0.5 text-[15px] font-bold text-white">{stage.turnaround}</p>
              </div>
            </div>

            {stage.pricingDetail ? (
              <p className="mt-4 max-w-2xl text-[13px] text-white/55">{stage.pricingDetail}</p>
            ) : null}

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#cta"
                className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.5)] transition hover:bg-orange-500 hover:-translate-y-0.5"
              >
                {stage.ctaLabel} →
              </a>
              <a
                href="#deliverables"
                className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-white transition hover:bg-white/10"
              >
                See what&apos;s included ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* QUESTION ANSWERED */}
      <section className="bg-[#0a1428] py-14 sm:py-16 border-t border-white/8">
        <div className="container-pro max-w-3xl">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">{stage.shortCode} answers</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl leading-tight">
            &quot;{stage.questionAnswered}&quot;
          </h2>
          <p className="mt-5 text-[16px] leading-[1.65] text-white/75 sm:text-lg">{stage.purpose}</p>
        </div>
      </section>

      {/* THIS IS / IS NOT */}
      <section className="bg-[#08111d] py-14 sm:py-16 border-t border-white/8">
        <div className="container-pro grid gap-6 lg:grid-cols-2">
          <div className="rounded-[20px] border border-emerald-400/30 bg-emerald-400/[0.05] p-7">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-300">{stage.shortCode} IS</p>
            <ul className="mt-5 space-y-3">
              {stage.thisIs.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-white/90">
                  <span className="mt-2 flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[20px] border border-rose-400/30 bg-rose-400/[0.05] p-7">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-rose-300">{stage.shortCode} IS NOT</p>
            <ul className="mt-5 space-y-3">
              {stage.notThisIs.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-white/85">
                  <span className="mt-2 flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-400/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section id="deliverables" className="bg-[#0a1428] py-14 sm:py-16 border-t border-white/8">
        <div className="container-pro max-w-4xl">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">What you actually get</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl">Deliverables</h2>
          <ul className="mt-8 grid gap-3.5 sm:grid-cols-2">
            {stage.deliverables.map((item, idx) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-5 py-4"
              >
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-orange/15 text-[11px] font-black text-orange">
                  {idx + 1}
                </span>
                <span className="text-[14.5px] leading-[1.55] text-white/85">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* REVEALED PROBLEM → NEXT STAGE */}
      {stage.revealedProblem && nextStage ? (
        <section className="bg-[#08111d] py-16 sm:py-20 border-t border-white/8">
          <div className="container-pro max-w-3xl">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">After {stage.shortCode}</p>
            <h2 className="mt-4 text-2xl font-black tracking-[-0.02em] text-white sm:text-3xl leading-tight">
              {stage.revealedProblem}
            </h2>
            <div className="mt-8 rounded-[20px] border border-orange/40 bg-gradient-to-br from-[#0d1a30] via-[#0e1f3e] to-[#0d1a30] p-7">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center rounded-lg bg-orange/15 border border-orange/40 px-2.5 py-1 text-[11px] font-black tracking-wider text-orange">
                  {nextStage.shortCode}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">
                  Next stage
                </span>
              </div>
              <h3 className="mt-3 text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                {nextStage.name}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-white/75">{nextStage.oneLiner}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="text-[15px] font-bold text-orange">{nextStage.pricing}</span>
                <span className="text-white/25">·</span>
                <span className="text-[13px] text-white/55">{nextStage.turnaround}</span>
              </div>
              <Link
                href={`/platform/${nextStage.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-orange hover:gap-3 transition-all"
              >
                See {nextStage.shortCode} →
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section id="cta" className="bg-[#0a1428] py-20 sm:py-24 border-t border-white/8">
        <div className="container-pro max-w-3xl text-center">
          <h2 className="text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl">
            Start {stage.shortCode}.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-white/75 sm:text-lg">
            {stage.heroSubheadline}
          </p>
          <div className="mt-9">
            {stage.isPaid ? (
              <a
                href="#contact"
                className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-9 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.5)] transition hover:bg-orange-500 hover:-translate-y-0.5"
              >
                {stage.ctaLabelFinal ?? stage.ctaLabel} →
              </a>
            ) : (
              <p className="text-[14px] text-white/65">
                {stage.shortCode} tool is being built. <Link href="/platform" className="text-orange hover:underline">Back to platform overview</Link>.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/8 bg-[#040810] py-10">
        <div className="container-pro">
          <p className="text-[12px] text-white/45">
            © 2026 Southern Cities Construction LLC · NC GC License #107724 · Investor Execution Platform · {stage.shortCode}
          </p>
          <p className="mt-2 text-[12px] text-white/45">
            <Link href="/platform" className="hover:text-orange">Platform overview</Link>
            <span className="mx-2 text-white/25">·</span>
            <Link href="/privacy" className="hover:text-orange">Privacy</Link>
            <span className="mx-2 text-white/25">·</span>
            <Link href="/terms" className="hover:text-orange">Terms</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

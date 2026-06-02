import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';
import RehabRiskSnapshotForm from '@/components/RehabRiskSnapshotForm';
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
    title: `${stage.name} | Southern Cities Investor Execution Platform`,
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
          <Link href="/platform" className="flex items-center gap-3">
            <Image
              src="/sc-construction-logo-reversed.png"
              alt="Southern Cities Construction"
              width={180}
              height={48}
              className="h-8 w-auto sm:h-10"
              priority
            />
            <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
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

            {stage.refundMechanic ? (
              <div className="mt-6 max-w-2xl rounded-2xl border border-orange/50 bg-gradient-to-r from-orange/[0.12] to-orange/[0.04] px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center justify-center rounded-md bg-orange/25 border border-orange/50 px-2 py-0.5 text-[10px] font-black tracking-[0.18em] text-orange">
                    PERFORMANCE GUARANTEE
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">
                    NC GC #107724
                  </span>
                </div>
                <p className="mt-2.5 text-[14.5px] font-semibold leading-[1.5] text-white">
                  If we cannot perform the {stage.marketingShortName} at our standard, full refund.
                </p>
                <p className="mt-1 text-[12.5px] text-white/65">
                  See the full guarantee terms below ↓
                </p>
              </div>
            ) : null}

            <div className="mt-9 flex flex-wrap gap-4">
              {stage.toolUrl ? (
                <Link
                  href={stage.toolUrl}
                  className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.5)] transition hover:bg-orange-500 hover:-translate-y-0.5"
                >
                  {stage.ctaLabel} →
                </Link>
              ) : stage.cartProductKey ? (
                <AddToCartButton
                  itemKey={stage.cartProductKey}
                  label={`${stage.ctaLabel} →`}
                  className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.5)] transition hover:bg-orange-500 hover:-translate-y-0.5"
                  mode="direct-lp"
                  lpSlug={`platform-${stage.slug}`}
                />
              ) : (
                <a
                  href="#cta"
                  className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.5)] transition hover:bg-orange-500 hover:-translate-y-0.5"
                >
                  {stage.ctaLabel} →
                </a>
              )}
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

      {/* RISK-FREE BAND — paid stages only */}
      {stage.isPaid && stage.refundMechanic ? (
        <section className="bg-[#0d1830] py-8 sm:py-10 border-t border-white/8">
          <div className="container-pro">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-orange/30 bg-orange/[0.06] px-5 py-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange">Performance Guarantee</p>
                <p className="mt-2 text-[14.5px] font-bold leading-[1.4] text-white">
                  Refund if we cannot perform
                </p>
                <p className="mt-1 text-[12px] leading-[1.45] text-white/65">
                  SCC&apos;s call after intake. Once we accept, we deliver.
                </p>
              </div>
              <div className="rounded-2xl border border-orange/30 bg-orange/[0.06] px-5 py-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange">Credits Forward</p>
                <p className="mt-2 text-[14.5px] font-bold leading-[1.4] text-white">
                  Effectively $0 if you continue
                </p>
                <p className="mt-1 text-[12px] leading-[1.45] text-white/65">
                  Fee credits against any deeper engagement.
                </p>
              </div>
              <div className="rounded-2xl border border-orange/30 bg-orange/[0.06] px-5 py-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange">Licensed NC GC</p>
                <p className="mt-2 text-[14.5px] font-bold leading-[1.4] text-white">
                  NC GC License #107724
                </p>
                <p className="mt-1 text-[12px] leading-[1.45] text-white/65">
                  Real contractor, real liability — not a coach or course.
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* LM1 INLINE FORM — only on LM1 page */}
      {stage.slug === 'lm1' ? (
        <section id="rehab-snapshot-form" className="bg-[#0a1428] py-12 sm:py-16 border-t border-white/8 scroll-mt-24">
          <div className="container-pro max-w-4xl">
            <div className="mb-8">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">Get my rehab budget</p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl">
                Submit your deal. Get a decision-grade range.
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-white/70 sm:text-[16.5px]">
                Property details, scope, finish target, photos. A licensed NC GC&apos;s rules-based engine delivers your decision-grade budget range, timeline, project category, and risk flags. Free.
              </p>
            </div>
            <RehabRiskSnapshotForm />
          </div>
        </section>
      ) : null}

      {/* PROMISE + GUARANTEE */}
      <section className="bg-[#0a1428] py-14 sm:py-16 border-t border-white/8">
        <div className="container-pro max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-orange/50 bg-orange/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-orange">
              Our Promise
            </span>
          </div>
          <h2 className="mt-5 text-2xl font-black tracking-[-0.02em] text-white sm:text-3xl lg:text-[2.25rem] leading-tight">
            {stage.promise}
          </h2>
          {stage.refundMechanic ? (
            <div className="mt-7 rounded-[20px] border-2 border-orange/50 bg-gradient-to-br from-orange/[0.10] via-orange/[0.05] to-transparent p-6 sm:p-8 shadow-[0_24px_48px_-16px_rgba(245,130,32,0.18)]">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center rounded-md bg-orange/25 border border-orange/50 px-2.5 py-1 text-[10px] font-black tracking-[0.18em] text-orange">
                  PERFORMANCE GUARANTEE
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/55">
                  NC GC #107724
                </span>
              </div>
              <p className="mt-5 text-[16px] leading-[1.6] text-white sm:text-[17px] font-medium">
                {stage.refundMechanic}
              </p>
              <p className="mt-4 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-orange/90">
                The refund trigger is SCC&apos;s call, not the buyer&apos;s — you are paying for our commitment to deliver, not gambling on outcomes.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      {/* QUESTION ANSWERED */}
      <section className="bg-[#08111d] py-14 sm:py-16 border-t border-white/8">
        <div className="container-pro max-w-3xl">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">The {stage.marketingShortName} answers</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl leading-tight">
            &quot;{stage.questionAnswered}&quot;
          </h2>
          <p className="mt-5 text-[16px] leading-[1.65] text-white/75 sm:text-lg">{stage.purpose}</p>
        </div>
      </section>

      {/* NO-BRAINER MATH */}
      <section className="bg-[#0a1428] py-14 sm:py-16 border-t border-white/8">
        <div className="container-pro max-w-4xl">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">Why it&apos;s a no-brainer</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl">The math.</h2>
          <ul className="mt-8 grid gap-3.5">
            {stage.noBrainerMath.map((item, idx) => (
              <li
                key={item}
                className="flex items-start gap-4 rounded-[16px] border border-white/10 bg-white/[0.03] px-5 py-4"
              >
                <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-orange/15 text-[12px] font-black text-orange">
                  {idx + 1}
                </span>
                <span className="text-[15px] leading-[1.6] text-white/90 sm:text-[15.5px]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* BONUS STACK */}
      <section className="bg-[#08111d] py-14 sm:py-16 border-t border-white/8">
        <div className="container-pro max-w-4xl">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">Bonuses stacked on top</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl">What you also get.</h2>
          <ul className="mt-8 grid gap-3.5 sm:grid-cols-2">
            {stage.bonusStack.map((bonus) => (
              <li
                key={bonus.label}
                className="flex items-start gap-3 rounded-xl border border-orange/25 bg-gradient-to-br from-[#0d1a30] via-[#0a1428] to-[#0d1a30] p-5"
              >
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-orange/20 text-[11px] font-black text-orange">
                  +
                </span>
                <div className="flex-1">
                  <p className="text-[14.5px] leading-[1.5] font-bold text-white">{bonus.label}</p>
                  {bonus.value ? (
                    <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.14em] text-orange/85">
                      {bonus.value}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TESTIMONIALS — render only if data exists */}
      {stage.testimonials && stage.testimonials.length > 0 ? (
        <section className="bg-[#0a1428] py-14 sm:py-16 border-t border-white/8">
          <div className="container-pro max-w-5xl">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">Investors who used this</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl">What they said.</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {stage.testimonials.map((t) => (
                <li
                  key={t.attribution + t.quote.slice(0, 20)}
                  className="flex flex-col gap-3 rounded-[20px] border border-white/10 bg-white/[0.03] p-5"
                >
                  <p className="text-[14.5px] leading-[1.6] text-white/90">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-3">
                    <span className="text-[12px] font-semibold text-white/65">{t.attribution}</span>
                    {t.dollar ? (
                      <span className="rounded-md bg-orange/15 border border-orange/40 px-2 py-0.5 text-[11px] font-black tracking-[0.08em] text-orange">
                        {t.dollar}
                      </span>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* THIS IS / IS NOT */}
      <section className="bg-[#08111d] py-14 sm:py-16 border-t border-white/8">
        <div className="container-pro grid gap-6 lg:grid-cols-2">
          <div className="rounded-[20px] border border-emerald-400/30 bg-emerald-400/[0.05] p-7">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-300">What it IS</p>
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
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-rose-300">What it IS NOT</p>
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
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">After the {stage.marketingShortName}</p>
            <h2 className="mt-4 text-2xl font-black tracking-[-0.02em] text-white sm:text-3xl leading-tight">
              {stage.revealedProblem}
            </h2>
            <div className="mt-8 rounded-[20px] border border-orange/40 bg-gradient-to-br from-[#0d1a30] via-[#0e1f3e] to-[#0d1a30] p-7">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange">
                  Next step
                </span>
              </div>
              <h3 className="mt-2 text-xl font-extrabold tracking-tight text-white sm:text-2xl">
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
                See the {nextStage.marketingShortName} →
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section id="cta" className="bg-[#0a1428] py-20 sm:py-24 border-t border-white/8">
        <div className="container-pro max-w-3xl text-center">
          <h2 className="text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl">
            Start the {stage.marketingShortName}.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-white/75 sm:text-lg">
            {stage.heroSubheadline}
          </p>
          <div className="mt-9">
            {stage.toolUrl ? (
              <Link
                href={stage.toolUrl}
                className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-9 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.5)] transition hover:bg-orange-500 hover:-translate-y-0.5"
              >
                {stage.ctaLabelFinal ?? stage.ctaLabel} →
              </Link>
            ) : stage.cartProductKey ? (
              <AddToCartButton
                itemKey={stage.cartProductKey}
                label={`${stage.ctaLabelFinal ?? stage.ctaLabel} →`}
                className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-9 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.5)] transition hover:bg-orange-500 hover:-translate-y-0.5"
                mode="direct-lp"
                lpSlug={`platform-${stage.slug}`}
              />
            ) : stage.isPaid ? (
              <a
                href="#contact"
                className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-9 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.5)] transition hover:bg-orange-500 hover:-translate-y-0.5"
              >
                {stage.ctaLabelFinal ?? stage.ctaLabel} → (request quote)
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
            © 2026 Southern Cities Construction · NC GC License #107724 · Investor Execution Platform
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

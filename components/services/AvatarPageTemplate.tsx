'use client';

import { useState } from 'react';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { ServiceBucket } from '@/components/services/ServiceBucket';
import { AvatarPageData, ServiceCardData } from '@/lib/services-data';

export default function AvatarPageTemplate({ data }: { data: AvatarPageData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    audience_type: data.eyebrow,
    service: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: 'checked' in e.target ? (e.target as HTMLInputElement).checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // Always forward a hub-inquiry slug so the GHL catch-all workflow fires
      // even when the user leaves the freeform "service" field blank. The
      // freeform service text (if typed) is folded into the message body so
      // it still reaches the inbox.
      const hubSlug = `${data.slug}-hub-inquiry`;
      const composedMessage = formData.service
        ? `Reaching out about: ${formData.service}\n\n${formData.message}`
        : formData.message;

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          service: hubSlug,
          message: composedMessage,
          source: `hub-${data.slug}`,
        }),
      });

      if (!res.ok) {
        const result = (await res.json()) as { error?: string };
        throw new Error(result.error || 'Failed to submit');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', audience_type: data.eyebrow, service: '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const firstFixed = data.fixed?.[0];
  const firstPriced = data.priced?.[0];
  const firstReview = data.review?.[0];
  const allServices: ServiceCardData[] = [
    ...(data.fixed || []),
    ...(data.priced || []),
    ...(data.review || []),
    ...(data.recurring || []),
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <SiteNav variant="solid" />

      <section className="relative overflow-hidden bg-[#08111d] pt-32 pb-24 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 motion-safe:animate-[heroFloat_22s_ease-in-out_infinite] bg-[linear-gradient(125deg,#163061_0%,#10254c_50%,#143367_100%)]" style={{ backgroundSize: '180% 180%' }} aria-hidden="true" />
        <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(circle_at_30%_35%,rgba(245,130,32,0.22),transparent_55%)]" />
        <div className="absolute left-[-10%] top-[10%] h-72 w-72 rounded-full bg-[rgba(245,130,32,0.12)] blur-3xl" />
        <div className="absolute bottom-[-6rem] right-[5%] h-80 w-80 rounded-full bg-[rgba(255,255,255,0.06)] blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 container-pro">
          <div className="max-w-4xl">
            <p className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41] motion-safe:animate-[heroRise_900ms_ease-out]">
              <span className="block h-px w-10 bg-[#fa8c41]/80" aria-hidden="true" />
              {data.eyebrow}
            </p>
            <h1 className="mt-6 text-[2.75rem] font-black leading-[0.98] tracking-[-0.045em] text-white sm:text-[3.75rem] lg:text-[4.75rem] motion-safe:animate-[heroRise_1000ms_ease-out_0.1s_both]">
              {data.heroTitle}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-[1.55] text-white/85 sm:text-xl motion-safe:animate-[heroRise_1100ms_ease-out_0.2s_both]">{data.heroSubtitle}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4 motion-safe:animate-[heroRise_1300ms_ease-out_0.4s_both]">
              {firstFixed ? (
                <a href={firstFixed.detailHref} className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-[#fa8c41] px-7 py-3.5 text-sm font-black uppercase tracking-[0.06em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.45)] transition-all hover:-translate-y-0.5 hover:bg-[#ffa463]">
                  {firstFixed.cta} <span aria-hidden="true">→</span>
                </a>
              ) : null}
              {firstPriced ? (
                <a href={firstPriced.ctaHref || firstPriced.detailHref} className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/5">
                  {firstPriced.cta}
                </a>
              ) : firstReview ? (
                <a href={firstReview.ctaHref || firstReview.detailHref} className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/5">
                  {firstReview.cta}
                </a>
              ) : null}
            </div>
          </div>
        </div>
        <style>{__avatarHeroMotion}</style>
      </section>

      <section className="border-b border-stone-200 bg-white py-16 sm:py-20">
        <div className="container-pro grid gap-10 lg:grid-cols-[0.9fr_0.9fr_0.8fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What clients are trying to avoid</p>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-stone-700">
              {data.painPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What clients want instead</p>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-stone-700">
              {data.outcomes.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[24px] border border-stone-200 bg-stone-50 px-5 py-5 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">What this page is for</p>
            <div className="mt-4 space-y-4 text-sm leading-[1.6] text-stone-700">
              <p>For people with a real project, deal, permit question, or active job &mdash; not just browsing prices.</p>
              <p>Start with the smallest step that fits the decision in front of you, and move into fuller support only when the work calls for it. If the job is already active or time-sensitive, just tell us and we&rsquo;ll point you to the right help.</p>
            </div>
          </div>
        </div>
      </section>

      {data.stageGroups?.length ? (
        <section id="services" className="bg-white py-20 sm:py-24">
          <div className="container-pro">
            <div className="max-w-4xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Start with the stage you are in</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Get the right help for where the project is right now.</h2>
              <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg">
                You do not have to buy one giant undefined construction relationship. Use the stage below that matches the project and start with the specific help that will move it forward more cleanly.
              </p>
            </div>

            <div className="mt-10 space-y-10">
              {data.stageGroups.map((group) => {
                const cards = group.serviceSlugs
                  .map((slug) => allServices.find((service) => service.slug === slug))
                  .filter((service): service is ServiceCardData => Boolean(service));

                if (!cards.length) return null;

                const isInvestorPreBuyLayout = data.slug === 'investors' && group.title === 'Before you buy' && cards.length === 3;
                const investorPreBuyCards = isInvestorPreBuyLayout
                  ? {
                      investorReview: cards.find((card) => card.slug === 'investor-review'),
                      contractorFit: cards.find((card) => card.slug === 'contractor-fit-consultation'),
                      rehabBudget: cards.find((card) => card.slug === 'budget-review'),
                    }
                  : null;

                return (
                  <section key={group.title} className="border-t border-stone-200 pt-10 first:border-t-0 first:pt-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">{group.title}</p>
                    <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-stone-700">{group.intro}</p>
                    <div className={isInvestorPreBuyLayout ? 'mt-6 grid gap-5 lg:grid-cols-2 lg:grid-rows-2 lg:items-stretch' : 'mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3'}>
                      {(isInvestorPreBuyLayout && investorPreBuyCards
                        ? [investorPreBuyCards.investorReview, investorPreBuyCards.contractorFit, investorPreBuyCards.rehabBudget].filter((card): card is ServiceCardData => Boolean(card))
                        : cards
                      ).map((card) => {
                        const specialLayoutClass = isInvestorPreBuyLayout
                          ? card.slug === 'investor-review'
                            ? 'lg:col-start-1 lg:row-start-1 h-full'
                            : card.slug === 'contractor-fit-consultation'
                              ? 'lg:col-start-1 lg:row-start-2 h-full'
                              : card.slug === 'budget-review'
                                ? 'lg:col-start-2 lg:row-start-1 lg:row-span-2 h-full'
                                : 'h-full'
                          : '';
                        const priceLabel =
                          card.purchaseType === 'fixed'
                            ? 'Price'
                            : card.purchaseType === 'recurring'
                              ? 'Monthly price'
                              : card.purchaseType === 'priced'
                                ? 'Price'
                                : null;
                        const visiblePrice = card.monthlyPrice || (card.purchaseType === 'priced' ? card.pricingNote : null);
                        const priceFormatClass =
                          data.slug === 'investors' && group.title === 'Before you buy'
                            ? card.slug === 'investor-review'
                              ? 'divider'
                              : card.slug === 'contractor-fit-consultation'
                                ? 'minimal'
                                : card.slug === 'budget-review'
                                  ? 'title-row'
                                  : 'default'
                            : 'default';
                        return (
                          <div key={card.slug} className={`rounded-[24px] border border-stone-200 bg-white px-5 py-6 sm:px-6 sm:py-7 shadow-elev-1 ${specialLayoutClass}`}>
                            <div className="flex h-full flex-col text-[15px] leading-[1.6] text-stone-700">
                              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">
                                {card.purchaseType === 'fixed' ? 'Fixed-Price Service' : card.purchaseType === 'priced' ? 'Priced After Review' : card.purchaseType === 'review' ? 'Custom-Quoted Service' : 'Ongoing Support'}
                              </p>
                              {priceFormatClass === 'title-row' && visiblePrice ? (
                                <div className="mt-4 flex items-start justify-between gap-4">
                                  <h3 className="text-xl font-extrabold tracking-tight text-navy">{card.title}</h3>
                                  <div className="text-right">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-500">{priceLabel}</p>
                                    <p className="mt-1 text-[1.1rem] font-extrabold tracking-tight text-orange">{visiblePrice}</p>
                                  </div>
                                </div>
                              ) : (
                                <h3 className="mt-4 text-xl font-extrabold tracking-tight text-navy">{card.title}</h3>
                              )}
                              <p className="mt-4 flex-1 text-[15px] leading-[1.6] text-stone-600">{card.summary}</p>
                              {(visiblePrice || card.monthlyLimit || card.turnaround) ? (
                                priceFormatClass === 'divider' ? (
                                  <div className="mt-6 border-t border-stone-200 pt-5 space-y-2">
                                    {priceLabel && visiblePrice ? <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-500">{priceLabel}</p> : null}
                                    {visiblePrice ? <p className="text-[1.2rem] font-extrabold tracking-tight text-orange">{visiblePrice}</p> : null}
                                    {card.monthlyLimit ? <p className="text-sm text-stone-600">{card.monthlyLimit}</p> : null}
                                    {card.turnaround ? <p className="text-sm text-stone-600">{card.turnaround}</p> : null}
                                  </div>
                                ) : priceFormatClass === 'title-row' ? (
                                  (card.monthlyLimit || card.turnaround) ? (
                                    <div className="mt-6 space-y-2">
                                      {card.monthlyLimit ? <p className="text-sm text-stone-600">{card.monthlyLimit}</p> : null}
                                      {card.turnaround ? <p className="text-sm text-stone-600">{card.turnaround}</p> : null}
                                    </div>
                                  ) : null
                                ) : (
                                  <div className="mt-6 space-y-2">
                                    {priceLabel && visiblePrice ? <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-500">{priceLabel}</p> : null}
                                    {visiblePrice ? <p className="text-[1.2rem] font-extrabold tracking-tight text-orange">{visiblePrice}</p> : null}
                                    {card.monthlyLimit ? <p className="text-sm text-stone-600">{card.monthlyLimit}</p> : null}
                                    {card.turnaround ? <p className="text-sm text-stone-600">{card.turnaround}</p> : null}
                                  </div>
                                )
                              ) : null}
                              <div className="mt-7 pt-1">
                                <a href={card.purchaseType === 'fixed' ? card.detailHref : (card.ctaHref || card.detailHref)} className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                                  {card.cta}
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        <section id="services" className="bg-white py-20 sm:py-24">
          <div className="container-pro">
            <ServiceBucket title="Buy Now" text="Use this when the deliverable is clear, the scope is contained, and you want a straightforward service you can purchase immediately." cards={data.fixed} />
            <ServiceBucket title="Get Pricing" text="Use this when a few project details affect price, but the work can still be priced without a full custom quote." cards={data.priced} />
            <ServiceBucket title="Request Review" text="Use this when the work is custom, active, or important enough that it needs real review before anyone prices it casually." cards={data.review} />
          </div>
        </section>
      )}

      {data.recurring?.length ? (
        <section className="border-y border-stone-200 bg-stone-50 py-20 sm:py-24">
          <div className="container-pro">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Monthly support</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">When the same problem keeps eating time, use a monthly plan.</h2>
              <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg">
                {data.recurringIntro || 'Use a monthly plan when the same kind of permit, pricing, follow-up, or coordination problem keeps coming back and you do not want to restart from scratch every time.'}
              </p>
            </div>
            <ServiceBucket title="Monthly Support Plans" text="Use this when the same questions, reviews, or follow-up keep repeating and you want ongoing help on a recurring basis." cards={data.recurring} />
            <div className="mt-8">
              <a href="/recurring-support" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                See All Recurring Support Plans
              </a>
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-white py-16 sm:py-20">
        <div className="container-pro rounded-[28px] border border-stone-200 bg-stone-50 p-8 sm:p-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Need help choosing?</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">If you are not sure whether to buy now, get pricing, or request a review, start here.</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone-700 sm:text-lg">
            Southern Cities can help you choose the right next step before you lose time, spend in the wrong place, or push a project forward too casually.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/services" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
              Back to All Services
            </a>
            {data.recurring?.length ? (
              <a href="/recurring-support" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                Review Monthly Support Plans
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-navy-950 py-20 sm:py-24 text-white">
        <div className="container-pro grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Contact</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Need us to review the project first?</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-white/90">
              <p><strong className="text-white">Buy Now</strong> when the deliverable is already clear and contained.</p>
              <p><strong className="text-white">Get Pricing</strong> when a few project details affect price, but the work does not need full custom scoping.</p>
              <p><strong className="text-white">Use this form</strong> when the project is larger, more active, or important enough that it needs real review before anyone should quote it responsibly.</p>
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-7 sm:p-8">
            {submitted ? (
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-100">
                Your request was sent. Southern Cities will review it and follow up with the next step.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input name="name" value={formData.name} onChange={handleChange} required placeholder="Name" className="w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-orange focus:outline-none" />
                  <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Email" className="w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-orange focus:outline-none" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input name="service" value={formData.service} onChange={handleChange} placeholder="What service or issue are you reaching out about?" className="w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-orange focus:outline-none" />
                </div>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} placeholder="What are you deciding, what stage is the project in, and what kind of help do you need next?" className="w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-orange focus:outline-none" />
                {error && <p className="text-sm text-red-300">{error}</p>}
                <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center rounded-full bg-orange px-7 py-3.5 text-sm font-semibold text-white shadow-glow-orange transition-all hover:bg-orange-500 disabled:opacity-60">
                  {submitting ? 'Sending...' : 'Request Review'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

const __avatarHeroMotion = `
@keyframes heroFloat {
  0%, 100% { transform: scale(1.04) translate3d(0, 0, 0); }
  50% { transform: scale(1.08) translate3d(-12px, -8px, 0); }
}
@keyframes heroRise {
  0% { opacity: 0; transform: translate3d(0, 24px, 0); filter: blur(4px); }
  60% { filter: blur(0); }
  100% { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); }
}
`;

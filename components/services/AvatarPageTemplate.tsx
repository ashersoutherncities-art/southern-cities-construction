'use client';

import { useState } from 'react';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { ServiceBucket } from '@/components/services/ServiceBucket';
import { AvatarPageData, ServiceCardData } from '@/lib/services-data';

type RoadmapStep = {
  label: string;
  bucket: 'fixed' | 'priced' | 'review' | 'recurring';
  tone: 'start' | 'info' | 'build' | 'finish';
};

const roadmapBySlug: Record<string, RoadmapStep[]> = {
  homeowners: [
    { label: 'Buy a clear first step', bucket: 'fixed', tone: 'start' },
    { label: 'Get pricing direction before spending', bucket: 'priced', tone: 'info' },
    { label: 'Request permit or job review when scope is bigger', bucket: 'review', tone: 'build' },
  ],
  investors: [
    { label: 'Buy a cleaner decision first', bucket: 'fixed', tone: 'start' },
    { label: 'Price the deal or turn from real inputs', bucket: 'priced', tone: 'info' },
    { label: 'Request review for lender, bid, or oversight work', bucket: 'review', tone: 'build' },
    { label: 'Use recurring support across repeat files', bucket: 'recurring', tone: 'finish' },
  ],
  realtors: [
    { label: 'Buy a fast inspection read', bucket: 'fixed', tone: 'start' },
    { label: 'Get prep pricing direction before listing', bucket: 'priced', tone: 'info' },
    { label: 'Request review for broader listing coordination', bucket: 'review', tone: 'build' },
    { label: 'Use recurring support across deals and listings', bucket: 'recurring', tone: 'finish' },
  ],
  contractors: [
    { label: 'Price permit and inspection support', bucket: 'priced', tone: 'start' },
    { label: 'Request review for admin or oversight support', bucket: 'review', tone: 'build' },
    { label: 'Use recurring office support when the same burden keeps repeating', bucket: 'recurring', tone: 'finish' },
  ],
  'developers-landowners': [
    { label: 'Request early project review before bigger money moves', bucket: 'review', tone: 'start' },
    { label: 'Request permit and oversight review for active work', bucket: 'review', tone: 'build' },
    { label: 'Use recurring project-control support across repeat files', bucket: 'recurring', tone: 'finish' },
  ],
};

const bucketTone: Record<RoadmapStep['bucket'], string> = {
  fixed: 'Buy now',
  priced: 'Get pricing',
  review: 'Request review',
  recurring: 'Monthly support',
};

const roadmapToneStyles = {
  start: {
    dot: 'bg-[#ff6b6b]',
    pin: 'border-t-[#ff6b6b]',
  },
  info: {
    dot: 'bg-[#4aa3ff]',
    pin: 'border-t-[#4aa3ff]',
  },
  build: {
    dot: 'bg-[#41c96b]',
    pin: 'border-t-[#41c96b]',
  },
  finish: {
    dot: 'bg-[#8b6df2]',
    pin: 'border-t-[#8b6df2]',
  },
};

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
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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

  const roadmap = roadmapBySlug[data.slug] || [];
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

      <section className="relative overflow-hidden bg-navy-900 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#163061_0%,#10254c_100%)]" />
        <div className="relative z-10 container-pro">
          <div className="max-w-4xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" />
              {data.eyebrow}
            </div>
            <h1 className="mb-6 text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {data.heroTitle}
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-white sm:text-xl">{data.heroSubtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {firstFixed ? (
                <a href={firstFixed.detailHref} className="inline-flex items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white">
                  {firstFixed.cta}
                </a>
              ) : null}
              {firstPriced ? (
                <a href={firstPriced.ctaHref || firstPriced.detailHref} className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white">
                  {firstPriced.cta}
                </a>
              ) : firstReview ? (
                <a href={firstReview.ctaHref || firstReview.detailHref} className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white">
                  {firstReview.cta}
                </a>
              ) : null}
            </div>
          </div>
        </div>
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
              <p>This page is for people with a real project, deal, file, permit issue, listing problem, or active job question.</p>
              <p>Use the smallest next step that fits the decision in front of you, then move into bigger support only when the work calls for it.</p>
              <p>If the file is active or timing matters, use the review path and say that clearly.</p>
            </div>
          </div>
        </div>
      </section>

      {roadmap.length ? (
        <section className="border-b border-stone-200 bg-stone-50 py-16 sm:py-20">
          <div className="container-pro">
            <div className="max-w-4xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">How to buy from this page</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
                Most {data.eyebrow.toLowerCase()} buyers move through the offers in this order.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg">
                Start with the smallest step that fits the decision you need to make. Move into pricing, review, or monthly support only when the work really calls for it.
              </p>
            </div>
            <div className="mt-8 overflow-hidden rounded-[28px] border border-stone-200 bg-[radial-gradient(circle_at_15%_20%,rgba(255,179,71,0.08),transparent_18%),radial-gradient(circle_at_70%_30%,rgba(74,163,255,0.08),transparent_16%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 sm:p-8">
              <div className="relative overflow-x-auto pb-4">
                <div className="relative w-full min-w-[1100px] px-6 py-6 lg:min-w-0">
                  <svg className="pointer-events-none absolute left-0 top-10 h-[220px] w-full" viewBox="0 0 1200 220" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 110C75 110 75 34 150 34C225 34 225 186 300 186C375 186 375 34 450 34C525 34 525 186 600 186C675 186 675 34 750 34C825 34 825 186 900 186C975 186 975 34 1050 34C1125 34 1125 110 1200 110" stroke="#111111" strokeWidth="34" strokeLinecap="round" />
                    <path d="M0 110C75 110 75 34 150 34C225 34 225 186 300 186C375 186 375 34 450 34C525 34 525 186 600 186C675 186 675 34 750 34C825 34 825 186 900 186C975 186 975 34 1050 34C1125 34 1125 110 1200 110" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="10 12" opacity="0.95" />
                  </svg>

                  <div className={`relative grid items-start gap-6 2xl:gap-8 ${roadmap.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                    {roadmap.map((step, index) => {
                      const tone = roadmapToneStyles[step.tone];
                      const topClass = index % 2 === 0 ? 'pt-[108px]' : 'pt-0';
                      const pinOffset = index % 2 === 0 ? 'top-[76px]' : 'top-0';
                      return (
                        <div key={step.label} className={`relative ${topClass}`}>
                          <div className={`absolute left-1/2 ${pinOffset} z-10 -translate-x-1/2 transition-transform duration-500 hover:scale-110`}>
                            <div className="relative h-[98px] w-[74px]">
                              <div className={`absolute left-1/2 top-0 flex h-[60px] w-[60px] -translate-x-1/2 items-center justify-center rounded-full border-[5px] border-white ${tone.dot} text-xl font-extrabold text-white shadow-[0_16px_30px_rgba(15,23,42,0.18)]`}>
                                {index + 1}
                              </div>
                              <div className={`absolute left-1/2 top-[44px] h-0 w-0 -translate-x-1/2 border-l-[18px] border-r-[18px] border-t-[36px] border-l-transparent border-r-transparent ${tone.pin}`} />
                            </div>
                          </div>

                          <div className="mt-[118px] rounded-[24px] border border-white/80 bg-white/94 px-4 py-5 text-center shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
                            <span className="inline-flex rounded-full border border-stone-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-navy shadow-[0_6px_20px_rgba(15,23,42,0.06)]">
                              {bucketTone[step.bucket]}
                            </span>
                            <h3 className="mt-3 text-[22px] font-extrabold leading-tight tracking-tight text-navy">{step.label}</h3>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

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
                      rehabBudget: cards.find((card) => card.slug === 'rehab-budget-review'),
                    }
                  : null;

                return (
                  <section key={group.title} className="rounded-[28px] border border-stone-200 bg-stone-50 p-6 sm:p-8">
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
                              : card.slug === 'rehab-budget-review'
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
                                : card.slug === 'rehab-budget-review'
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
                              <p className="mt-5 text-[15px] leading-[1.6] text-stone-700">{card.summary}</p>
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
                              {card.purchaseType === 'review' && card.details?.length ? (
                                <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-5">
                                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">What this includes</p>
                                  <ul className="mt-3 space-y-2.5 text-sm leading-[1.6] text-navy">
                                    {card.details.map((item) => (
                                      <li key={item}>• {item}</li>
                                    ))}
                                  </ul>
                                </div>
                              ) : null}
                              {card.inputsNeeded?.length ? (
                                <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-5">
                                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">What we need from you</p>
                                  <ul className="mt-3 space-y-2.5 text-sm leading-[1.6] text-navy">
                                    {card.inputsNeeded.map((item) => (
                                      <li key={item}>• {item}</li>
                                    ))}
                                  </ul>
                                </div>
                              ) : null}
                              {card.pricingLogic?.length ? (
                                <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-5">
                                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">How this service is priced</p>
                                  <ul className="mt-3 space-y-2.5 text-sm leading-[1.6] text-navy">
                                    {card.pricingLogic.map((item) => (
                                      <li key={item}>• {item}</li>
                                    ))}
                                  </ul>
                                </div>
                              ) : null}
                              {card.nextStep ? (
                                <div className="mt-6 rounded-2xl border border-orange/20 bg-orange/5 px-4 py-5">
                                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">What happens next</p>
                                  <p className="mt-3 text-sm font-semibold leading-[1.6] text-navy">{card.nextStep}</p>
                                </div>
                              ) : null}
                              <div className="mt-10 pt-1">
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
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-white/88">
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

import type { Metadata } from 'next';
import Image from 'next/image';
import Script from 'next/script';
import LandingPageTracker from '@/components/analytics/LandingPageTracker';
import ScrollDepthTracker from '@/components/analytics/ScrollDepthTracker';
import BookingCalendarEmbed from '@/components/BookingCalendarEmbed';
import ConsultationCTA from '@/components/ConsultationCTA';
import HideChatWidget from '@/components/HideChatWidget';
import RealDeals from '@/components/RealDeals';
import GoogleReviews from '@/components/GoogleReviews';
import VideoWithSoundToggle from '@/components/VideoWithSoundToggle';
import { SITE_CONFIG, logoFor } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Schedule a Construction Consultation | Southern Cities Construction',
  description:
    'Get a rehab budget, prepare your project for construction, or have Southern Cities Construction manage your North Carolina investment property renovation from start to finish. Licensed NC GC #107724.',
  alternates: { canonical: '/consultation' },
  openGraph: {
    type: 'website',
    url: '/consultation',
    title: 'Schedule a Construction Consultation',
    description:
      'From evaluating potential investments to planning and executing construction projects — one licensed NC GC, the whole way through.',
    siteName: 'Southern Cities Construction',
  },
};

// Real completed projects — same source data as /gallery, not fabricated.
const REAL_PROJECTS = [
  {
    slug: 'white-house',
    title: 'Standard Builder-Grade Home Exterior Refresh',
    summary: 'A clean transformation with a strong before-and-after jump that reads clearly for homeowners and investors.',
    before: '/gallery/white-house-before.jpg',
    beforeAlt: 'Standard builder-grade two-story home exterior before renovation — dated white siding, original landscaping, plain entry',
    after: '/gallery/white-house-after.jpg',
    afterAlt: 'Same two-story home after Southern Cities Construction exterior refresh — updated paint scheme, refreshed trim and entry, improved curb appeal',
  },
  {
    slug: 'farmhouse',
    title: 'Farmhouse-Style Siding and Deck Transformation',
    summary: 'New siding and deck work that gives the property a stronger finished presence.',
    before: '/gallery/farmhouse-before.jpg',
    beforeAlt: 'NC farmhouse-style residence before exterior renovation — original siding, weathered deck, dated facade',
    after: '/gallery/farmhouse-after.jpg',
    afterAlt: 'NC farmhouse after Southern Cities Construction renovation — new vertical siding, rebuilt covered deck, modern farmhouse facade',
  },
  {
    slug: 'red-house',
    title: 'Historic Waterfront District Exterior Transformation',
    summary: 'A distinctive exterior transformation in a prominent North Carolina waterfront city, within a historic district.',
    before: '/gallery/red-house-before.jpg',
    beforeAlt: 'Historic NC waterfront district home before exterior transformation — faded original paint, aging trim, dated curb presentation',
    after: '/gallery/red-house-after.jpg',
    afterAlt: 'Historic NC waterfront district home after Southern Cities Construction exterior transformation — vibrant red paint, restored trim, distinctive finished character',
  },
];

const DEAL_PACKS = [
  {
    name: 'Bid Ready',
    price: '$599',
    turnaround: '2–3 business days',
    description: 'Get a written rehab scope and budget range so you can decide whether the deal makes sense.',
    credit: 'Your $599 Bid Ready payment credits toward Build Ready when you upgrade for the same property.',
    inclusions: [
      { title: 'Draft scope of work', detail: 'A written breakdown of the repairs and improvements we accounted for.' },
      { title: 'Line-item rehab budget range', detail: 'Estimated costs by work item, with quantities where available.' },
      { title: 'Allowances and assumptions', detail: 'See what the estimate is based on, where we used placeholder amounts, and what still needs verification.' },
      { title: 'Execution risk report and lender flags', detail: 'See what could change the scope or cost and which findings may matter to your lender.' },
      { title: 'Shareable PDF reviewed by a licensed general contractor', detail: 'Keep the report, share it with your team, or carry it into Build Ready.' },
    ],
    note: 'Site work is optional. We’ll confirm whether the project needs a scan, photos or video, or an inspection during intake.',
  },
  {
    name: 'Build Ready',
    price: '$1,997',
    turnaround: '3–4 business days',
    description: 'Get a verified scope, a design you can see, and a written price Southern Cities will commit to for the defined work.',
    inclusions: [
      { title: 'Site verification', detail: 'We check existing conditions and measurements, document the site with a scan and photos or video, and arrange a licensed inspection unless the general contractor waives it.' },
      { title: 'Comparable property research', detail: 'We review local comparable properties to guide the layout and finish choices.' },
      { title: 'Existing and proposed floor plans plus three renderings', detail: 'See the current layout, the proposed layout with furniture shown, and three views of the finished property.' },
      { title: 'Materials and finish list', detail: 'Get an initial materials spreadsheet with quantities and proposed finishes, including items such as flooring, cabinets, and fixtures.' },
      { title: 'Verified, trade-by-trade scope and pricing', detail: 'See what each trade is pricing based on the site conditions, design, and materials.' },
      { title: 'Permit requirements memo', detail: 'See which permits the scope calls for, who issues them, and the expected timeline.' },
      { title: 'Vetted vendor list and coordinated quotes', detail: 'We check insurance, past work, and availability, then have the trades price the same final scope.' },
      { title: 'Final risk review', detail: 'See the site, permit, cost, and trade issues that could affect construction.' },
      { title: 'Written construction price', detail: 'Southern Cities commits to a price for the defined scope. You keep the package and choose whether to hire us to build it.' },
    ],
    note: 'The turnaround above is for clients who start directly with Build Ready. Changes to the agreed scope or concealed conditions are handled through written approval during construction.',
  },
];

const ctaBase =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-orange px-7 py-4 text-[15px] font-black text-white shadow-elev-1 transition hover:bg-orange-bright';

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <section className={`container-pro py-16 lg:py-20 ${className}`}>{children}</section>;
}

export default function ConsultationPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <HideChatWidget />
      <LandingPageTracker />
      <ScrollDepthTracker />
      {/* Minimal, distraction-free header — no site nav links, this page has one job. */}
      <header className="border-b border-stone-200 bg-white">
        <div className="container-pro flex items-center justify-between gap-3 py-4">
          <Image src={logoFor('light')} alt={SITE_CONFIG.name} width={220} height={85} className="h-8 w-auto shrink min-w-0 sm:h-10" priority />
          <a
            href={`tel:${SITE_CONFIG.phoneTel}`}
            className="shrink-0 whitespace-nowrap text-[13px] font-bold text-navy underline decoration-orange decoration-2 underline-offset-4"
            aria-label={`Call ${SITE_CONFIG.phone}`}
          >
            <span className="sm:hidden">Call</span>
            <span className="hidden sm:inline">{SITE_CONFIG.phone}</span>
          </a>
        </div>
      </header>

      {/* Section 1 — Hero: header block above, VSL below in a landscape rectangle.
         Source video (consultation-intro.mp4) is a 720x1280 portrait phone
         recording, so the rectangle frame uses object-contain + a navy
         background (pillarboxed) rather than object-cover — a true edge-to-edge
         16:9 crop would cut off the top/bottom of the subject. Re-cut the
         source in landscape if a full-bleed rectangle is wanted later. */}
      <section className="bg-navy pt-10 pb-14 lg:pt-16 lg:pb-20">
        <div className="container-pro flex flex-col items-center gap-10 text-center">
          <div className="max-w-2xl">
            <h1 className="text-[2.1rem] leading-[1.08] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Hands-Off Renovations for North Carolina Real Estate Investors
            </h1>
            <p className="mt-5 text-[17px] leading-relaxed text-white/75 sm:text-lg">
              Get the rehab numbers before you buy. When you&apos;re ready to build, we can verify the scope,
              price the work, and run the renovation through the final walkthrough.
            </p>
            <div className="mt-7 flex justify-center">
              <ConsultationCTA eventLabel="hero" className={ctaBase}>
                Schedule a Construction Consultation
              </ConsultationCTA>
            </div>
            <p className="mt-5 text-[13px] font-semibold text-white/60">
              {SITE_CONFIG.license.issuer} · {SITE_CONFIG.license.formatted}
            </p>
            <p className="mt-1 text-[13px] text-white/50">
              Residential Renovations · Rehabilitation · New Construction · Preconstruction Planning
            </p>
          </div>

          <div className="w-full max-w-2xl">
            <div className="flex items-center justify-center gap-2 rounded-t-xl bg-orange px-4 py-2.5 text-[12.5px] font-black uppercase tracking-wide text-white">
              <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 10v4h4l5 5V5L7 10H3z" />
                <path d="M16 8.5a4.5 4.5 0 010 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M18.5 6a8 8 0 010 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
              See How It Works
            </div>
            <div className="relative aspect-video overflow-hidden rounded-b-2xl bg-black shadow-elev-2">
              <VideoWithSoundToggle
                src="/video/consultation-intro.mp4"
                poster="/video/consultation-intro-poster.jpg"
                videoId="consultation-intro"
                fit="contain"
              />
            </div>
          </div>
        </div>
      </section>

      <Section className="border-t border-stone-200 bg-white">
        <p className="eyebrow">Compare the Deal Packs</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          Know What You&apos;re Getting Before You Buy or Build
        </h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-stone-700">
          Start with Bid Ready if you need a budget to evaluate the deal. Go straight to Build Ready if you
          want a verified plan and a price we can commit to for the work.
        </p>

        <div className="mt-8 grid items-start gap-5 lg:grid-cols-2">
          {DEAL_PACKS.map((pack) => (
            <article key={pack.name} className="rounded-2xl border border-stone-200 bg-stone-50 p-5 sm:p-7">
              <h3 className="text-xl font-extrabold text-navy">{pack.name}</h3>
              <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="text-3xl font-black text-navy">{pack.price}</p>
                <p className="text-sm font-semibold text-stone-600">{pack.turnaround} after completed intake</p>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-stone-700">{pack.description}</p>
              {pack.credit && (
                <p className="mt-4 rounded-lg border border-orange/30 bg-white px-4 py-3 text-sm font-bold leading-relaxed text-navy">
                  {pack.credit}
                </p>
              )}
              <h4 className="mt-6 text-sm font-extrabold text-navy">What&apos;s included</h4>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-stone-700 marker:text-orange">
                {pack.inclusions.map(({ title, detail }) => (
                  <li key={title}><strong className="text-navy">{title}.</strong> {detail}</li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-stone-600">{pack.note}</p>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <ConsultationCTA eventLabel="preconstruction" className={ctaBase}>
            Schedule a Consultation
          </ConsultationCTA>
        </div>
      </Section>

      {/* Section 4 — How Our Process Works */}
      <Section className="border-t border-stone-200">
        <p className="eyebrow">Full-Service Construction</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          What Happens When You Hire Us to Build
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: '1', title: 'Approve the Plan', body: 'We agree on the scope, price, and schedule. Your project manager confirms site access, trade availability, and permits before releasing the work.' },
            { n: '2', title: 'We Run the Job', body: 'Your project manager coordinates crews and materials, tracks the budget and schedule, and checks the work as it progresses.' },
            { n: '3', title: 'Stay Informed From Anywhere', body: 'See weekly photos and progress in your portal. If something changes the price or schedule, we explain what happened and get your written approval before proceeding with the affected work.' },
            { n: '4', title: 'Walk the Finished Job', body: 'We verify the work and required inspections, handle the punch list, and provide your closeout documents.' },
          ].map((step) => (
            <div key={step.n}>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange text-[14px] font-black text-white">
                {step.n}
              </div>
              <h3 className="mt-4 text-[15px] font-extrabold tracking-tight text-navy">{step.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-stone-700">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <ConsultationCTA eventLabel="process" className={ctaBase}>
            Schedule a Consultation
          </ConsultationCTA>
        </div>
      </Section>

      {/* Real Projects — actual completed work, pulled from the live gallery */}
      <Section className="border-t border-stone-200 bg-navy">
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">Real Projects</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Completed Work, Not Renderings
        </h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/70">
          A few of the properties we&apos;ve actually taken from before to after — see the full set in the project
          gallery.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {REAL_PROJECTS.map((p) => (
            <div key={p.slug} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="grid grid-cols-2">
                <div className="relative aspect-square">
                  <Image src={p.before} alt={p.beforeAlt} fill className="object-cover" />
                  <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    Before
                  </span>
                </div>
                <div className="relative aspect-square">
                  <Image src={p.after} alt={p.afterAlt} fill className="object-cover" />
                  <span className="absolute left-2 top-2 rounded-full bg-orange px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    After
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-[14.5px] font-extrabold tracking-tight text-white">{p.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/60">{p.summary}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-5">
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 text-[13px] font-bold text-orange hover:underline"
          >
            See the full project gallery →
          </a>
        </div>
      </Section>

      {/* Section 5 — Why SCC */}
      <Section className="border-t border-stone-200 bg-white">
        <p className="eyebrow">Why Southern Cities Construction?</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          Construction Planning and Execution Under One Roof
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'Licensed General Contractor', body: 'SCC is licensed in North Carolina to provide general contracting services.' },
            { title: 'Investor-Focused Approach', body: 'Rehab budgets, ARV, and assignment numbers — we price and scope in the terms investors actually underwrite a deal with.' },
            { title: 'Preconstruction Expertise', body: 'A documented scope and real cost number before you close or break ground, not a rough guess after.' },
            { title: 'Construction Execution', body: 'SCC can provide construction services following appropriate project verification, pricing, and contracting.' },
            { title: 'Structured Quality Control', body: 'Every job runs against a documented scope and inspection checklist — not a verbal understanding of what "done" means.' },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-stone-200 p-6">
              <h3 className="text-[15px] font-extrabold tracking-tight text-navy">{item.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-stone-700">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <RealDeals theme="light" audience="buyer" />

      <GoogleReviews />

      {/* Booking section */}
      <section id="book" className="border-t border-stone-200 bg-stone-100">
        <div className="container-pro pt-8 pb-16 lg:pt-10 lg:pb-20">
          <div className="max-w-2xl text-center mx-auto">
            <p className="eyebrow">Schedule a Construction Consultation</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Pick a time that works for you.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-600">
              Bring the North Carolina property address and tell us what you plan to do with it. We&apos;ll help you decide where to start.
            </p>
          </div>
          <BookingCalendarEmbed />
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-stone-500">
            {SITE_CONFIG.license.formatted} · Call{' '}
            <a
              href={`tel:${SITE_CONFIG.phoneTel}`}
              className="font-bold text-navy underline decoration-orange decoration-2 underline-offset-4"
            >
              {SITE_CONFIG.phone}
            </a>
          </p>
        </div>
      </section>

      {/* FAQ — answers lingering objections for anyone who scrolls past the calendar without booking */}
      <Section className="border-t border-stone-200 bg-white">
        <p className="eyebrow">Questions</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          A Few Things People Ask First
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {[
            {
              q: 'How long is the call?',
              a: 'About 30 minutes. Enough time to actually talk through the property or plans — not a rushed pitch.',
            },
            {
              q: 'Do I need to already own the property?',
              a: "No. We work with investors evaluating a purchase before closing, and owners who already have the property and are ready to build.",
            },
            {
              q: 'Is there any cost or obligation?',
              a: 'The consultation itself is free. No pressure, no sales pitch — we tell you what we see, and you decide what to do with it.',
            },
            {
              q: "What if I'm not ready to build yet?",
              a: "That's fine. The call is about understanding where your project actually stands, whatever stage you're at — not a hard sell toward construction.",
            },
          ].map((item) => (
            <div key={item.q}>
              <h3 className="text-[15px] font-extrabold tracking-tight text-navy">{item.q}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-stone-700">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <ConsultationCTA eventLabel="faq" className={ctaBase}>
            Schedule a Construction Consultation
          </ConsultationCTA>
        </div>
      </Section>

      {/* Minimal footer — legal line only, no sitewide links out of this page. */}
      <footer className="border-t border-stone-200 bg-white py-8">
        <div className="container-pro text-center text-[12px] text-stone-500">
          <p>{SITE_CONFIG.legalLine}</p>
          <p className="mt-1">
            {SITE_CONFIG.license.formatted} ·{' '}
            <a href={`mailto:${SITE_CONFIG.emailInfo}`} className="underline decoration-stone-300 underline-offset-4 hover:text-navy">
              {SITE_CONFIG.emailInfo}
            </a>
          </p>
        </div>
      </footer>

      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </div>
  );
}

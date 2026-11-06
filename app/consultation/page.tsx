import type { Metadata } from 'next';
import Image from 'next/image';
import Script from 'next/script';
import LandingPageTracker from '@/components/analytics/LandingPageTracker';
import ScrollDepthTracker from '@/components/analytics/ScrollDepthTracker';
import BookingCalendarEmbed from '@/components/BookingCalendarEmbed';
import ConsultationCTA from '@/components/ConsultationCTA';
import HideChatWidget from '@/components/HideChatWidget';
import RealDeals from '@/components/RealDeals';
import VideoWithSoundToggle from '@/components/VideoWithSoundToggle';
import { SITE_CONFIG, logoFor } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Schedule a Construction Consultation | Southern Cities Construction',
  description:
    'Construction expertise for real estate investors and property owners — from evaluating potential investments to executing construction projects. Licensed NC GC #107724.',
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

      {/* Section 1 — Hero */}
      <section className="bg-navy pt-10 pb-14 lg:pt-16 lg:pb-20">
        <div className="container-pro grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="min-w-0 text-center lg:text-left">
            <h1 className="text-[2.1rem] leading-[1.08] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Construction Expertise for Real Estate Investors &amp; Property Owners
            </h1>
            <p className="mt-5 text-[17px] leading-relaxed text-white/75 sm:text-lg">
              From evaluating potential investments to planning and executing construction projects, Southern Cities
              Construction helps you understand what needs to be done, what it may cost, and how to move forward
              with confidence.
            </p>
            <div className="mt-7">
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

          <div className="mx-auto w-full max-w-[320px] lg:mx-0">
            <div className="flex items-center justify-center gap-2 rounded-t-xl bg-orange px-4 py-2.5 text-[12.5px] font-black uppercase tracking-wide text-white">
              <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 10v4h4l5 5V5L7 10H3z" />
                <path d="M16 8.5a4.5 4.5 0 010 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M18.5 6a8 8 0 010 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
              Tap Below To Watch First!
            </div>
            <div className="relative aspect-[9/16] overflow-hidden rounded-b-2xl bg-black shadow-elev-2">
              <VideoWithSoundToggle
                src="/video/consultation-intro.mp4"
                poster="/video/consultation-intro-poster.jpg"
                videoId="consultation-intro"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — What We Help You Accomplish */}
      <Section className="border-t border-stone-200">
        <p className="eyebrow">What We Help You Accomplish</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          From Property Evaluation to Construction Completion
        </h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-stone-700">
          Whether you&apos;re evaluating an investment opportunity or preparing to begin construction, SCC provides
          the technical planning and construction services needed to move forward.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {[
            {
              title: 'Evaluate Potential Investments',
              body: 'Understand preliminary construction requirements, renovation costs, and potential risks before making significant financial commitments.',
            },
            {
              title: 'Prepare for Construction',
              body: 'Develop comprehensive scopes of work, construction budgets, project plans, and supporting documentation.',
            },
            {
              title: 'Execute Construction Projects',
              body: 'Work with a licensed general contractor to coordinate and execute residential renovation, rehabilitation, and new-construction projects.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-stone-200 bg-white p-7 shadow-elev-1">
              <h3 className="text-lg font-extrabold tracking-tight text-navy">{item.title}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-stone-700">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <ConsultationCTA eventLabel="accomplish" className={ctaBase}>
            Schedule a Consultation
          </ConsultationCTA>
        </div>
      </Section>

      {/* Section 3 — Preconstruction Services */}
      <Section className="border-t border-stone-200 bg-white">
        <p className="eyebrow">Our Preconstruction Services</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          Know What You&apos;re Getting Into Before You Buy or Build
        </h2>

        <div className="mt-10 max-w-xl">
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-7">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">Build-Ready Deal Pack</p>
            <p className="mt-2 text-3xl font-black text-navy">$1,997</p>
            <p className="mt-4 text-[14.5px] leading-relaxed text-stone-700">
              Comprehensive construction due diligence and preparation — for investors evaluating a property
              before purchase, or owners preparing to build.
            </p>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-[13.5px] leading-relaxed text-stone-500">
          We don&apos;t promise guaranteed construction pricing or complete identification of concealed property
          conditions — the service description covers exactly what&apos;s included.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <ConsultationCTA eventLabel="preconstruction" className={ctaBase}>
            Schedule a Consultation
          </ConsultationCTA>
          <a
            href="/deal-pack"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 px-7 py-4 text-[15px] font-black text-navy transition hover:border-navy/30"
          >
            Explore Preconstruction Services
          </a>
        </div>
      </Section>

      {/* Section 4 — How Our Process Works */}
      <Section className="border-t border-stone-200">
        <p className="eyebrow">How Our Process Works</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          A Clear Path From Evaluation to Execution
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: '1', title: 'Tell Us About Your Project', body: 'Share your property location, objectives, budget, and anticipated timeline.' },
            { n: '2', title: 'Speak With Our Team', body: 'Schedule a consultation to discuss your project and determine the appropriate next steps.' },
            { n: '3', title: 'Develop Your Construction Plan', body: "Our team evaluates available property information and provides the agreed level of scope development, estimating, and planning." },
            { n: '4', title: 'Move Forward With Confidence', body: 'Use the information to evaluate your investment, prepare for construction, or engage SCC to execute an approved project.' },
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

      {/* Booking section */}
      <section id="book" className="border-t border-stone-200 bg-stone-100">
        <div className="container-pro pt-8 pb-16 lg:pt-10 lg:pb-20">
          <div className="max-w-2xl text-center mx-auto">
            <p className="eyebrow">Schedule a Construction Consultation</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Pick a time that works for you.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-600">
              Tell us a bit about your project and grab a time directly on the calendar — no pressure, no spam.
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

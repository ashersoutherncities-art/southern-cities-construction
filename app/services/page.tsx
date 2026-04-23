'use client';

import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import SiteNav from '@/components/SiteNav';
import { avatarOverviewCards } from '@/lib/services-data';

type RoadmapLane = {
  avatar: string;
  href: string;
  start: string;
  stops: { label: string; services: string[]; tone: 'start' | 'info' | 'build' | 'control' | 'finish' }[];
  destination: string;
};

const roadmapLanes: RoadmapLane[] = [
  {
    avatar: 'Homeowners',
    href: '/services/homeowners',
    start: 'Not sure what to do first',
    stops: [
      { label: 'Need a clearer next step', services: ['Home Assessment', 'Owner Consultation'], tone: 'start' },
      { label: 'Need a budget range before spending more money', services: ['Home Project Budget Review'], tone: 'info' },
      { label: 'Need help with permit paperwork and approvals', services: ['Permit Path Review', 'Permit Administration'], tone: 'build' },
      { label: 'Need tighter follow-through on an active job', services: ['Construction Oversight'], tone: 'finish' },
    ],
    destination: 'Fewer wrong moves, less confusion, and less project drift',
  },
  {
    avatar: 'Investors',
    href: '/services/investors',
    start: 'Need a better read on the deal before spending more money',
    stops: [
      { label: 'Need a read on the deal, rehab, or turn', services: ['Investor Project Review', 'Rehab Budget Review'], tone: 'start' },
      { label: 'Need help hiring the right contractor and setting the job up right', services: ['Contractor Fit Review', 'Bid Coordination & Contractor Match', 'Materials Setup Review'], tone: 'info' },
      { label: 'Need help with lender scope, bids, or draws', services: ['Lender Scope & Bid Package', 'Draw Review Support'], tone: 'build' },
      { label: 'Need tighter follow-through on an active job', services: ['Turn Budget Review', 'Construction Oversight'], tone: 'control' },
      { label: 'Need repeat help across multiple properties', services: ['Turn Support Plan', 'Operator Support Plan', 'Project Support Retainer'], tone: 'finish' },
    ],
    destination: 'Fewer surprises, faster starts, less delay, and tighter coordination',
  },
  {
    avatar: 'Realtors',
    href: '/services/realtors',
    start: 'Inspection items or listing prep are slowing things down',
    stops: [
      { label: 'Need a fast read on inspection items', services: ['Inspection Response'], tone: 'start' },
      { label: 'Need a better handle on listing prep costs', services: ['Pre-Listing Budget & Prep Review'], tone: 'info' },
      { label: 'Need help coordinating prep work before the listing', services: ['Listing Prep Coordination Review'], tone: 'build' },
      { label: 'Need ongoing help across multiple deals or listings', services: ['Deal Desk', 'Listing Prep Desk', 'Agent Support Line', 'Team Deal & Listing Desk'], tone: 'finish' },
    ],
    destination: 'Faster answers, better client confidence, and fewer listing delays',
  },
  {
    avatar: 'Contractors',
    href: '/services/contractors',
    start: 'Permit work and office follow-up are eating too much time',
    stops: [
      { label: 'Need help with permit and inspection handling', services: ['Permit Administration', 'Inspection Scheduling Support'], tone: 'start' },
      { label: 'Need help cleaning up paperwork and follow-up on active jobs', services: ['Active Job Admin Triage'], tone: 'info' },
      { label: 'Need tighter support while the work is moving', services: ['Construction Oversight Support'], tone: 'build' },
      { label: 'Need recurring office help', services: ['Permit & Inspection Support Plan', 'Back-Office Support Plan', 'Contractor Office Extension Retainer'], tone: 'finish' },
    ],
    destination: 'Less paperwork drag, fewer delays, and better follow-through on active jobs',
  },
  {
    avatar: 'Developers / Landowners',
    href: '/services/developers-landowners',
    start: 'Too much is still uncertain to move forward casually',
    stops: [
      { label: 'Need an early read before bigger money moves', services: ['Early Project Review', 'Early Budget & Scope Review'], tone: 'start' },
      { label: 'Need tighter permit handling and follow-through', services: ['Permit Administration + Construction Oversight'], tone: 'build' },
      { label: 'Need ongoing help keeping the work moving', services: ['Project Control Plan', 'Execution Oversight Retainer'], tone: 'finish' },
    ],
    destination: 'Less drift, fewer surprises, and better execution as the project moves forward',
  },
];

const roadmapToneStyles = {
  start: {
    dot: 'bg-[#ff6b6b]',
    ring: 'shadow-[0_0_0_10px_rgba(255,107,107,0.12)]',
  },
  info: {
    dot: 'bg-[#4aa3ff]',
    ring: 'shadow-[0_0_0_10px_rgba(74,163,255,0.12)]',
  },
  build: {
    dot: 'bg-[#41c96b]',
    ring: 'shadow-[0_0_0_10px_rgba(65,201,107,0.12)]',
  },
  control: {
    dot: 'bg-[#8b6df2]',
    ring: 'shadow-[0_0_0_10px_rgba(139,109,242,0.12)]',
  },
  finish: {
    dot: 'bg-[#d9a441]',
    ring: 'shadow-[0_0_0_10px_rgba(217,164,65,0.14)]',
  },
};

export default function ServicesOverviewPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <SiteNav variant="solid" />

      <section className="relative overflow-hidden bg-navy-900 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#163061_0%,#10254c_100%)]" />
        <div className="relative z-10 container-pro">
          <div className="max-w-4xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" />
              Services
            </div>
            <h1 className="mb-6 text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Find the right construction support for your project.
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-white sm:text-xl">
              Start with the page that fits your role. Some work can be bought now. Some can be priced after a short review. Some needs a custom quote.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#roles" className="inline-flex items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white">
                See Service Pages
              </a>
              <a href="/recurring-support" className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white">
                See Monthly Support
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-16 sm:py-20">
        <div className="container-pro max-w-5xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">How to get started</p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-6">
              <h2 className="text-2xl font-extrabold tracking-tight text-navy">Fixed-Price Services</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-stone-700">
                Use this when the work is straightforward and you are ready to buy now.
              </p>
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-6">
              <h2 className="text-2xl font-extrabold tracking-tight text-navy">Get Pricing</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-stone-700">
                Use this when a few project details affect price, but it still does not need a full custom quote.
              </p>
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-6">
              <h2 className="text-2xl font-extrabold tracking-tight text-navy">Custom Quotes</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-stone-700">
                Use this when the work is active, custom, or important enough that it needs real scoping before pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="roles" className="bg-white py-20 sm:py-24">
        <div className="container-pro">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Choose the page that fits your role</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Choose the page that fits how you are involved.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg">
              Start with the role you are in now. Each page is built around the kind of delay, paperwork, decision pressure, and follow-through problems that show up in that kind of work.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6">
            {avatarOverviewCards.map((card, index) => {
              const rowClass = index < 3 ? 'xl:w-[calc((100%-3rem)/3)]' : 'xl:w-[calc((100%-3rem)/3)]';

              return (
              <div key={card.href} className={`${rowClass} w-full md:w-[calc((100%-1.5rem)/2)] flex justify-center`}>
                <div className="flex h-full w-full max-w-[420px] flex-col rounded-[28px] border border-stone-200 bg-white p-7 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">{card.eyebrow}</p>
                  <h3 className="mt-3 min-h-[6.5rem] text-2xl font-extrabold tracking-tight text-navy">{card.title}</h3>
                  <div className="mt-5 flex min-h-[8.75rem] flex-col justify-start space-y-3 text-[15px] leading-relaxed text-stone-700">
                    <p>
                      <strong className="text-navy">What is going wrong:</strong> {card.pain}
                    </p>
                    <p>
                      <strong className="text-navy">What gets easier:</strong> {card.outcome}
                    </p>
                  </div>
                  <div className="mt-auto pt-6">
                    <Link href={card.href} className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                      {card.cta}
                    </Link>
                  </div>
                </div>
              </div>
            );})}
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-stone-50 py-20 sm:py-24">
        <div className="container-pro">
          <div className="max-w-4xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Start with what is happening now</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Different projects get stuck in different places.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg">
              Start with the situation you are in now, then move to the next step that fits.
            </p>
          </div>

          <div className="mt-10 space-y-6">
            {roadmapLanes.map((lane) => (
              <div key={lane.avatar} className="rounded-[28px] border border-stone-200 bg-white p-6 sm:p-8 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-xs">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">{lane.avatar}</p>
                    <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-navy">{lane.start}</h3>
                  </div>
                  <Link href={lane.href} className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                    See {lane.avatar} Services
                  </Link>
                </div>

                <div className="mt-8 overflow-hidden rounded-[28px] border border-stone-200 bg-[radial-gradient(circle_at_15%_20%,rgba(255,179,71,0.08),transparent_18%),radial-gradient(circle_at_70%_30%,rgba(74,163,255,0.08),transparent_16%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-center gap-x-0 gap-y-8 lg:justify-start">
                    {lane.stops.map((stop, index) => {
                      const tone = roadmapToneStyles[stop.tone];
                      const isLast = index === lane.stops.length - 1;
                      return (
                        <div key={stop.label} className="flex items-center">
                          <div className="w-[220px] sm:w-[240px]">
                            <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${tone.dot} ${tone.ring} text-xl font-extrabold text-white`}>
                              {index + 1}
                            </div>
                            <div className="mt-4 text-center">
                              <h4 className="text-xl font-extrabold leading-tight tracking-tight text-navy">{stop.label}</h4>
                              <div className="mt-4 flex flex-wrap justify-center gap-2">
                                {stop.services.map((service) => (
                                  <span key={service} className="inline-flex rounded-full border border-orange/20 bg-white px-3 py-1 text-[12px] font-semibold text-navy shadow-[0_6px_20px_rgba(15,23,42,0.06)]">
                                    {service}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          {!isLast ? (
                            <div className="mx-2 hidden h-3 w-20 rounded-full bg-[linear-gradient(90deg,#163061_0%,#214f97_50%,#d9a441_100%)] lg:block" />
                          ) : null}
                        </div>
                      );
                    })}
                    <div className="flex items-center lg:ml-2">
                      <div className="hidden h-3 w-20 rounded-full bg-[linear-gradient(90deg,#163061_0%,#214f97_50%,#d9a441_100%)] lg:block" />
                      <div className="w-[220px] sm:w-[240px] lg:ml-4">
                        <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${roadmapToneStyles.finish.dot} ${roadmapToneStyles.finish.ring} text-2xl text-white`}>
                          ✓
                        </div>
                        <div className="mt-4 text-center">
                          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What gets easier</p>
                          <p className="mt-2 text-xl font-extrabold leading-tight text-navy">{lane.destination}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white py-20 sm:py-24">
        <div className="container-pro max-w-4xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Monthly support</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Monthly plans are for repeat work, not one-off jobs.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg">
            Use a monthly plan when the same kind of delay, follow-up, permit issue, or paperwork burden keeps showing up across deals, listings, turns, or active jobs.
          </p>
          <div className="mt-6">
            <Link href="/recurring-support" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
              Review Monthly Support Plans
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-pro rounded-[28px] border border-stone-200 bg-stone-50 p-8 sm:p-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Not sure where to start?</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            You do not need to guess the perfect page before reaching out.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone-700 sm:text-lg">
            If you are not sure which page fits, start with the contact form and Southern Cities can point you to the right next step.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white">
              Request Help Choosing
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-navy-950 py-20 sm:py-24 text-white">
        <div className="container-pro max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Contact</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Need help choosing?</h2>
          <p className="mt-4 text-base leading-relaxed text-white/88 sm:text-lg">
            If you are not sure which page or pricing path fits, start here and Southern Cities can point you to the right next step.
          </p>
          <div className="mt-6">
            <Link href="/services/homeowners#contact" className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-orange hover:text-orange">
              Start with Contact Form
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

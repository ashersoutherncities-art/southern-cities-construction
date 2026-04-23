'use client';

import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import SiteNav from '@/components/SiteNav';
import { avatarOverviewCards } from '@/lib/services-data';

type RoadmapLane = {
  avatar: string;
  href: string;
  start: string;
  stops: { label: string; services: string[] }[];
  destination: string;
};

const roadmapLanes: RoadmapLane[] = [
  {
    avatar: 'Homeowners',
    href: '/services/homeowners',
    start: 'Not sure what to do first',
    stops: [
      { label: 'Need a clearer next step', services: ['Home Assessment', 'Owner Consultation'] },
      { label: 'Need a budget range before spending', services: ['Home Project Budget Review'] },
      { label: 'Need help with the permit path', services: ['Permit Path Review', 'Permit Administration'] },
      { label: 'Need active-job control', services: ['Construction Oversight'] },
    ],
    destination: 'Clearer decisions, fewer wrong moves, less project drift',
  },
  {
    avatar: 'Investors',
    href: '/services/investors',
    start: 'Need cleaner numbers before committing',
    stops: [
      { label: 'Need a read on the deal or project', services: ['Investor Project Review', 'Rehab Budget Review'] },
      { label: 'Need hiring or startup decisions cleaned up', services: ['Contractor Fit Review', 'Bid Coordination & Contractor Match', 'Materials Setup Review'] },
      { label: 'Need lender or draw support', services: ['Lender Scope & Bid Package', 'Draw Review Support'] },
      { label: 'Need active-job control', services: ['Turn Budget Review', 'Construction Oversight'] },
      { label: 'Need repeat support across properties', services: ['Turn Support Plan', 'Operator Support Plan', 'Project Support Retainer'] },
    ],
    destination: 'Cleaner numbers, faster starts, less delay, tighter control',
  },
  {
    avatar: 'Realtors',
    href: '/services/realtors',
    start: 'Inspection or prep questions are slowing the deal',
    stops: [
      { label: 'Need a quick answer on inspection items', services: ['Inspection Response'] },
      { label: 'Need clearer listing-prep direction', services: ['Pre-Listing Budget & Prep Review'] },
      { label: 'Need broader listing coordination', services: ['Listing Prep Coordination Review'] },
      { label: 'Need ongoing help across deals or listings', services: ['Deal Desk', 'Listing Prep Desk', 'Agent Support Line', 'Team Deal & Listing Desk'] },
    ],
    destination: 'Faster answers, stronger client confidence, better deal momentum',
  },
  {
    avatar: 'Contractors',
    href: '/services/contractors',
    start: 'Permit and office work are pulling time off the field',
    stops: [
      { label: 'Need help with permit and inspection handling', services: ['Permit Administration', 'Inspection Scheduling Support'] },
      { label: 'Need help cleaning up active-job paperwork and follow-up', services: ['Active Job Admin Triage'] },
      { label: 'Need tighter support on active work', services: ['Construction Oversight Support'] },
      { label: 'Need recurring office relief', services: ['Permit & Inspection Support Plan', 'Back-Office Support Plan', 'Contractor Office Extension Retainer'] },
    ],
    destination: 'More field time, less paperwork drag, steadier job follow-through',
  },
  {
    avatar: 'Developers / Landowners',
    href: '/services/developers-landowners',
    start: 'Project risk is still too high to move loosely',
    stops: [
      { label: 'Need an early read before bigger money moves', services: ['Early Project Review', 'Early Budget & Scope Review'] },
      { label: 'Need tighter control on permit and execution', services: ['Permit Administration + Construction Oversight'] },
      { label: 'Need repeat project-control support', services: ['Project Control Plan', 'Execution Oversight Retainer'] },
    ],
    destination: 'Less drift, better visibility, tighter execution control',
  },
];

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
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">How to buy from Southern Cities</p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-6">
              <h2 className="text-2xl font-extrabold tracking-tight text-navy">Fixed-Price Services</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-stone-700">
                Use this when the deliverable is clear and you are ready to buy now.
              </p>
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-6">
              <h2 className="text-2xl font-extrabold tracking-tight text-navy">Get Pricing</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-stone-700">
                Use this when a few project details affect price, but the work can still be priced without a full custom quote.
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
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Choose your page</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Go straight to the service page that matches how you are involved.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg">
              Start with the role you are in now. The detail lives on the page built for that kind of project, deal, or workload.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6">
            {avatarOverviewCards.map((card, index) => {
              const rowClass = index < 3 ? 'xl:w-[calc((100%-3rem)/3)]' : 'xl:w-[calc((100%-3rem)/3)]';

              return (
              <div key={card.href} className={`${rowClass} w-full md:w-[calc((100%-1.5rem)/2)] flex justify-center`}>
                <div className="flex h-full w-full max-w-[420px] flex-col rounded-[28px] border border-stone-200 bg-white p-7 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">{card.eyebrow}</p>
                <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-navy">{card.title}</h3>
                <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-stone-700">
                  <p>
                    <strong className="text-navy">Main issue:</strong> {card.pain}
                  </p>
                  <p>
                    <strong className="text-navy">What gets better:</strong> {card.outcome}
                  </p>
                </div>
                <div className="mt-6 pt-2">
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
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Choose your path</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Choose the path that matches your situation.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg">
              Different jobs stall in different places. Start with the lane that fits what is happening now, then follow the next step that makes the most sense.
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

                <div className="mt-8 grid gap-5 xl:grid-cols-[repeat(5,minmax(0,1fr))]">
                  {lane.stops.map((stop, index) => (
                    <div key={stop.label} className="relative rounded-[22px] border border-stone-200 bg-stone-50 p-5">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange text-sm font-bold text-white">
                          {index + 1}
                        </div>
                        <div className="h-px flex-1 bg-stone-300" />
                      </div>
                      <h4 className="text-lg font-extrabold leading-tight tracking-tight text-navy">{stop.label}</h4>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {stop.services.map((service) => (
                          <span key={service} className="inline-flex rounded-full border border-orange/20 bg-white px-3 py-1 text-[12px] font-semibold text-navy">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[22px] border border-navy/10 bg-navy px-5 py-4 text-white">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Destination</p>
                  <p className="mt-2 text-base font-semibold leading-relaxed">{lane.destination}</p>
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
            Use a monthly plan when the same type of delay, follow-up, or decision problem keeps coming back across deals, listings, active jobs, turns, or repeat files.
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
            If you are not sure which page or purchase path fits, start here and Southern Cities can point you to the right next step.
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

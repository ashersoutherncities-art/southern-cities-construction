'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import SiteFooter from '@/components/SiteFooter';
import SiteNav from '@/components/SiteNav';
import { avatarOverviewCards } from '@/lib/services-data';

type RoleKey = 'homeowners' | 'investors' | 'realtors' | 'contractors' | 'developers';
type BuyingKey = 'buy' | 'pricing' | 'quote';
type ProblemKey = 'permits' | 'inspections' | 'budget' | 'paperwork' | 'listing' | 'followup';

type RoadmapLane = {
  avatar: string;
  roleKey: RoleKey;
  href: string;
  start: string;
  stops: { label: string; services: string[]; tone: 'start' | 'info' | 'build' | 'control' | 'finish' }[];
  destination: string;
};

const roleMeta: Record<
  RoleKey,
  {
    title: string;
    href: string;
    pain: string;
    outcome: string;
    topServices: string[];
    bestBuying: BuyingKey[];
  }
> = {
  homeowners: {
    title: 'Homeowners',
    href: '/services/homeowners',
    pain: 'The project is getting harder to price, harder to trust, or harder to move forward without making expensive mistakes.',
    outcome: 'You get a clearer next step, less confusion, and help before permit problems or inspection setbacks get more expensive.',
    topServices: ['Home Assessment', 'Owner Consultation', 'Permit Path Review'],
    bestBuying: ['buy', 'pricing', 'quote'],
  },
  investors: {
    title: 'Investors',
    href: '/services/investors',
    pain: 'The deal, rehab, or turn has too much uncertainty around budget, hiring, timeline, or execution.',
    outcome: 'You get better numbers, fewer surprises, and less delay before the deal loses momentum.',
    topServices: ['Investor Project Review', 'Rehab Budget Review', 'Turn Budget Review'],
    bestBuying: ['pricing', 'quote', 'buy'],
  },
  realtors: {
    title: 'Realtors',
    href: '/services/realtors',
    pain: 'Inspection items, repair questions, or listing prep are slowing the deal or listing down.',
    outcome: 'You get faster answers, better follow-through, and less back-and-forth with clients.',
    topServices: ['Inspection Response', 'Pre-Listing Budget & Prep Review', 'Listing Prep Coordination Review'],
    bestBuying: ['buy', 'pricing', 'quote'],
  },
  contractors: {
    title: 'Contractors',
    href: '/services/contractors',
    pain: 'Permit follow-up, inspections, and office work are pulling too much time away from the job.',
    outcome: 'You get less paperwork drag, fewer delays, and better follow-through on active work.',
    topServices: ['Permit Administration', 'Inspection Scheduling Support', 'Active Job Admin Triage'],
    bestBuying: ['pricing', 'quote', 'buy'],
  },
  developers: {
    title: 'Developers / Landowners',
    href: '/services/developers-landowners',
    pain: 'There is still too much uncertainty around scope, budget, permit handling, or execution to move forward casually.',
    outcome: 'You get a better early read, fewer wrong moves, and less risk before bigger money gets committed.',
    topServices: ['Early Project Review', 'Early Budget & Scope Review', 'Permit Administration + Construction Oversight'],
    bestBuying: ['quote', 'pricing', 'buy'],
  },
};

const roadmapLanes: RoadmapLane[] = [
  {
    avatar: 'Homeowners',
    roleKey: 'homeowners',
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
    roleKey: 'investors',
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
    roleKey: 'realtors',
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
    roleKey: 'contractors',
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
    roleKey: 'developers',
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
  control: {
    dot: 'bg-[#8b6df2]',
    pin: 'border-t-[#8b6df2]',
  },
  finish: {
    dot: 'bg-[#d9a441]',
    pin: 'border-t-[#d9a441]',
  },
};

const guidedProblems: Record<ProblemKey, { label: string; roles: RoleKey[]; buying: BuyingKey[]; note: string }> = {
  permits: {
    label: 'Permit problems',
    roles: ['homeowners', 'contractors', 'developers', 'investors'],
    buying: ['pricing', 'quote'],
    note: 'Best when permit paperwork, corrections, or approvals are slowing things down.',
  },
  inspections: {
    label: 'Inspection setbacks',
    roles: ['homeowners', 'realtors', 'contractors'],
    buying: ['buy', 'pricing'],
    note: 'Best when failed inspections or correction lists are creating back-and-forth.',
  },
  budget: {
    label: 'Budget uncertainty',
    roles: ['homeowners', 'investors', 'developers', 'realtors'],
    buying: ['pricing'],
    note: 'Best when the next decision is being slowed down by unclear cost.',
  },
  paperwork: {
    label: 'Paperwork overload',
    roles: ['contractors', 'investors', 'developers'],
    buying: ['pricing', 'quote'],
    note: 'Best when admin, documentation, and follow-up are choking the work.',
  },
  listing: {
    label: 'Listing prep delays',
    roles: ['realtors', 'homeowners'],
    buying: ['buy', 'pricing', 'quote'],
    note: 'Best when listing prep keeps getting delayed by repair and scope questions.',
  },
  followup: {
    label: 'Too much owner follow-up',
    roles: ['homeowners', 'investors', 'contractors', 'developers'],
    buying: ['quote', 'pricing'],
    note: 'Best when too much still depends on the owner chasing the work.',
  },
};

export default function ServicesOverviewPage() {
  const [activeRole, setActiveRole] = useState<RoleKey>('homeowners');
  const [activeBuying, setActiveBuying] = useState<BuyingKey>('pricing');
  const [activeProblem, setActiveProblem] = useState<ProblemKey>('permits');
  const activeRoleCard = roleMeta[activeRole];
  const filteredCards = useMemo(() => {
    return avatarOverviewCards.filter((card) => {
      const roleMatch = card.href.includes(activeRole === 'developers' ? 'developers-landowners' : activeRole);
      return roleMatch;
    });
  }, [activeRole]);

  const guidedRecommendation = useMemo(() => {
    const problem = guidedProblems[activeProblem];
    const roleAllowed = problem.roles.includes(activeRole) ? activeRole : problem.roles[0];
    const roleData = roleMeta[roleAllowed];
    const buyingAllowed = problem.buying.includes(activeBuying) ? activeBuying : problem.buying[0];
    const buyingLabel = buyingAllowed === 'buy' ? 'Get started' : buyingAllowed === 'pricing' ? 'Get a price' : 'Talk about a custom job';
    return {
      roleAllowed,
      roleData,
      buyingLabel,
      note: problem.note,
    };
  }, [activeProblem, activeRole, activeBuying]);

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
              Find the right help for the kind of project problem you have.
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-white sm:text-xl">
              Start with the page that fits your role. Some work can be bought now. Some can be priced after a short review. Some needs a custom quote.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#start-here" className="inline-flex items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white">
                Start Here
              </a>
              <a href="/recurring-support" className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white">
                See Monthly Support
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="start-here" className="border-b border-stone-200 bg-white py-16 sm:py-20">
        <div className="container-pro">
          <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Start here</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
                You should not have to sort the whole site out on your own.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg">
                Start with your role, the main problem, and the kind of help you need right now. The site should point you to the best next step fast.
              </p>
            </div>

            <div className="rounded-[28px] border border-stone-200 bg-stone-50 p-6 shadow-elev-1 sm:p-7">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">1. Who are you?</p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {Object.entries(roleMeta).map(([key, value]) => {
                    const active = key === activeRole;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActiveRole(key as RoleKey)}
                        className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                          active ? 'bg-navy text-white' : 'border border-stone-300 bg-white text-navy hover:border-orange hover:text-orange'
                        }`}
                      >
                        {value.title}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">2. What is slowing things down?</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {Object.entries(guidedProblems).map(([key, value]) => {
                    const active = key === activeProblem;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActiveProblem(key as ProblemKey)}
                        className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all ${
                          active ? 'border-orange bg-orange/[0.08] text-navy' : 'border-stone-200 bg-white text-stone-700 hover:border-orange/35'
                        }`}
                      >
                        {value.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">3. What do you need right now?</p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {[
                    { key: 'buy', label: 'Get started' },
                    { key: 'pricing', label: 'Get a price' },
                    { key: 'quote', label: 'Talk about a custom job' },
                  ].map((item) => {
                    const active = item.key === activeBuying;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setActiveBuying(item.key as BuyingKey)}
                        className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                          active ? 'bg-orange text-white shadow-glow-orange' : 'border border-stone-300 bg-white text-navy hover:border-orange hover:text-orange'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 rounded-[24px] border border-navy/10 bg-navy-950 px-5 py-5 text-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange-200">Recommended next step</p>
                <h3 className="mt-3 text-2xl font-extrabold tracking-tight">{guidedRecommendation.roleData.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/80">{guidedRecommendation.note}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-white/80">Best next move: {guidedRecommendation.buyingLabel}</p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Link href={guidedRecommendation.roleData.href} className="inline-flex items-center justify-center rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-500">
                    Go to {guidedRecommendation.roleData.title}
                  </Link>
                  <a href="#buying-paths" className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-orange hover:text-orange-200">
                    See Buying Paths
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="buying-paths" className="border-b border-stone-200 bg-white py-16 sm:py-20">
        <div className="container-pro max-w-5xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">How to get started</p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className={`rounded-[24px] border p-6 transition-all ${activeBuying === 'buy' ? 'border-orange bg-orange/[0.06]' : 'border-stone-200 bg-stone-50'}`}>
              <h2 className="text-2xl font-extrabold tracking-tight text-navy">Fixed-Price Services</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-stone-700">
                Use this when the work is straightforward and you are ready to buy now.
              </p>
              <button type="button" onClick={() => setActiveBuying('buy')} className="mt-5 inline-flex rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                Show Buy-Now Routes
              </button>
            </div>
            <div className={`rounded-[24px] border p-6 transition-all ${activeBuying === 'pricing' ? 'border-orange bg-orange/[0.06]' : 'border-stone-200 bg-stone-50'}`}>
              <h2 className="text-2xl font-extrabold tracking-tight text-navy">Get Pricing</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-stone-700">
                Use this when a few project details affect price, but it still does not need a full custom quote.
              </p>
              <button type="button" onClick={() => setActiveBuying('pricing')} className="mt-5 inline-flex rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                Show Pricing Routes
              </button>
            </div>
            <div className={`rounded-[24px] border p-6 transition-all ${activeBuying === 'quote' ? 'border-orange bg-orange/[0.06]' : 'border-stone-200 bg-stone-50'}`}>
              <h2 className="text-2xl font-extrabold tracking-tight text-navy">Custom Quotes</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-stone-700">
                Use this when the work is active, custom, or important enough that it needs real scoping before pricing.
              </p>
              <button type="button" onClick={() => setActiveBuying('quote')} className="mt-5 inline-flex rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                Show Quote Routes
              </button>
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

          <div className="mt-8 flex flex-wrap gap-2.5">
            {Object.entries(roleMeta).map(([key, value]) => {
              const active = key === activeRole;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveRole(key as RoleKey)}
                  className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                    active ? 'bg-orange text-white shadow-glow-orange' : 'border border-stone-300 bg-white text-navy hover:border-orange hover:text-orange'
                  }`}
                >
                  {value.title}
                </button>
              );
            })}
          </div>

          <div className="mt-8 rounded-[28px] border border-stone-200 bg-stone-50 p-7 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">{activeRoleCard.title}</p>
            <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-navy">What is going wrong</h3>
            <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-stone-700">{activeRoleCard.pain}</p>
            <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-navy">What gets easier</h3>
            <p className="mt-3 max-w-3xl text-[16px] leading-relaxed text-stone-700">{activeRoleCard.outcome}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {activeRoleCard.topServices.map((service) => (
                <span key={service} className="inline-flex rounded-full border border-orange/20 bg-white px-3 py-1 text-[12px] font-semibold text-navy shadow-[0_6px_20px_rgba(15,23,42,0.06)]">
                  {service}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href={activeRoleCard.href} className="inline-flex items-center justify-center rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500">
                Go to {activeRoleCard.title}
              </Link>
              <a href="#start-here" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                Use Guided Start
              </a>
            </div>
          </div>

          <div className="mt-10 hidden">
            {filteredCards.map((card) => (
              <div key={card.href}>{card.title}</div>
            ))}
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
              Open the role that fits your situation, then move to the next step that fits.
            </p>
          </div>

          <div className="mt-10 space-y-6">
            {roadmapLanes.map((lane) => {
              return (
                <div key={lane.avatar} className="group rounded-[28px] border border-stone-200 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-orange/30 hover:shadow-[0_28px_80px_rgba(15,23,42,0.10)] sm:p-8">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-xl text-left">
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">{lane.avatar}</p>
                      <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-navy">{lane.start}</h3>
                    </div>
                    <Link href={lane.href} className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                      See {lane.avatar} Services
                    </Link>
                  </div>

                  <div className="mt-8 overflow-hidden rounded-[28px] border border-stone-200 bg-[radial-gradient(circle_at_15%_20%,rgba(255,179,71,0.08),transparent_18%),radial-gradient(circle_at_70%_30%,rgba(74,163,255,0.08),transparent_16%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 transition-all duration-500 group-hover:border-orange/20 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_24px_80px_rgba(15,23,42,0.06)] sm:p-8">
                    <div className="relative overflow-x-auto pb-4">
                      <div className="relative w-full min-w-[1400px] px-6 py-6 lg:min-w-0">
                        <svg className="pointer-events-none absolute left-0 top-10 h-[220px] w-full" viewBox="0 0 1200 220" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 110C75 110 75 34 150 34C225 34 225 186 300 186C375 186 375 34 450 34C525 34 525 186 600 186C675 186 675 34 750 34C825 34 825 186 900 186C975 186 975 34 1050 34C1125 34 1125 110 1200 110" stroke="#111111" strokeWidth="34" strokeLinecap="round" />
                          <path d="M0 110C75 110 75 34 150 34C225 34 225 186 300 186C375 186 375 34 450 34C525 34 525 186 600 186C675 186 675 34 750 34C825 186 825 186 900 186C975 186 975 34 1050 34C1125 34 1125 110 1200 110" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="10 12" opacity="0.95" />
                        </svg>

                        <div className="relative grid grid-cols-6 items-start gap-6 2xl:gap-8">
                          {lane.stops.map((stop, index) => {
                            const tone = roadmapToneStyles[stop.tone];
                            const topClass = index % 2 === 0 ? 'pt-[108px]' : 'pt-0';
                            const pinOffset = index % 2 === 0 ? 'top-[76px]' : 'top-0';
                            return (
                              <div key={stop.label} className={`relative ${topClass}`}>
                                <div className={`absolute left-1/2 ${pinOffset} z-10 -translate-x-1/2 transition-transform duration-500 hover:scale-110`}>
                                  <div className="relative h-[98px] w-[74px]">
                                    <div className={`absolute left-1/2 top-0 flex h-[60px] w-[60px] -translate-x-1/2 items-center justify-center rounded-full border-[5px] border-white ${tone.dot} text-xl font-extrabold text-white shadow-[0_16px_30px_rgba(15,23,42,0.18)]`}>
                                      {index + 1}
                                    </div>
                                    <div className={`absolute left-1/2 top-[44px] h-0 w-0 -translate-x-1/2 border-l-[18px] border-r-[18px] border-t-[36px] border-l-transparent border-r-transparent ${tone.pin}`} />
                                  </div>
                                </div>

                                <div className="mt-[118px] rounded-[24px] border border-white/80 bg-white/94 px-4 py-5 text-center shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
                                  <h4 className="text-[22px] font-extrabold leading-tight tracking-tight text-navy">{stop.label}</h4>
                                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                                    {stop.services.map((service) => (
                                      <span key={service} className="inline-flex rounded-full border border-orange/20 bg-white px-3 py-1 text-[12px] font-semibold text-navy shadow-[0_6px_20px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-orange/35 hover:shadow-[0_12px_30px_rgba(15,23,42,0.10)]">
                                        {service}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            );
                          })}

                          <div className="relative pt-[108px]">
                            <div className="absolute left-1/2 top-[76px] z-10 -translate-x-1/2 transition-transform duration-500 hover:scale-110">
                              <div className="relative h-[98px] w-[74px]">
                                <div className="absolute left-1/2 top-0 flex h-[60px] w-[60px] -translate-x-1/2 items-center justify-center rounded-full border-[5px] border-white bg-[#d9a441] text-2xl text-white shadow-[0_16px_30px_rgba(15,23,42,0.18)]">
                                  ✓
                                </div>
                                <div className="absolute left-1/2 top-[44px] h-0 w-0 -translate-x-1/2 border-l-[18px] border-r-[18px] border-t-[36px] border-l-transparent border-r-transparent border-t-[#d9a441]" />
                              </div>
                            </div>
                            <div className="mt-[118px] rounded-[24px] border border-[#d9a441]/20 bg-[linear-gradient(180deg,#fff8eb_0%,#ffffff_100%)] px-4 py-5 text-center shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
                              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What gets easier</p>
                              <p className="mt-2 text-[22px] font-extrabold leading-tight text-navy">{lane.destination}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
          <div className="mt-6 rounded-[24px] border border-stone-200 bg-stone-50 p-5">
            <p className="text-sm font-semibold text-navy">Good fit for monthly support:</p>
            <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-stone-700">
              <li>• the same kind of problem keeps coming back every month</li>
              <li>• multiple files, jobs, or properties are involved</li>
              <li>• delay and follow-up keep repeating</li>
            </ul>
            <div className="mt-5">
              <Link href="/recurring-support" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                Review Monthly Support Plans
              </Link>
            </div>
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

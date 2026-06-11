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

type ProcessStep = {
  label: string;
  services: string[];
  tone: 'start' | 'info' | 'build' | 'control' | 'finish';
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
    title: 'Homeowner',
    href: '/services/homeowners',
    pain: 'The project is getting harder to price, harder to trust, or harder to move forward without making expensive mistakes.',
    outcome: 'You get a clearer next step, less confusion, and help before permit problems or inspection setbacks get more expensive.',
    topServices: ['Home Assessment', 'Owner Consultation', 'Permit Path Review'],
    bestBuying: ['buy', 'pricing', 'quote'],
  },
  investors: {
    title: 'Investor',
    href: '/services/investors',
    pain: 'The deal, rehab, or turn has too much uncertainty around budget, hiring, timeline, or execution.',
    outcome: 'You get better numbers, fewer surprises, and less delay before the deal loses momentum.',
    topServices: ['Investor Execution Review', 'Rehab Budget Review', 'Rent-Ready Turn'],
    bestBuying: ['pricing', 'quote', 'buy'],
  },
  realtors: {
    title: 'Realtor',
    href: '/services/realtors',
    pain: 'Inspection items, repair questions, or listing prep are slowing the deal or listing down.',
    outcome: 'You get faster answers, better follow-through, and less back-and-forth with clients.',
    topServices: ['Inspection Response', 'Pre-Listing Budget & Prep Review', 'Listing Prep Coordination Review'],
    bestBuying: ['buy', 'pricing', 'quote'],
  },
  contractors: {
    title: 'Contractor',
    href: '/services/contractors',
    pain: 'Permit follow-up, inspections, and office work are pulling too much time away from the job.',
    outcome: 'You get less paperwork drag, fewer delays, and better follow-through on active work.',
    topServices: ['Permit Administration', 'Inspection Scheduling Support', 'Admin Support for Active Jobs'],
    bestBuying: ['pricing', 'quote', 'buy'],
  },
  developers: {
    title: 'Developer / Landowner',
    href: '/services/developers-landowners',
    pain: 'There is still too much uncertainty around scope, budget, permit handling, or execution to move forward casually.',
    outcome: 'You get a better early read, fewer wrong moves, and less risk before bigger money gets committed.',
    topServices: ['Project Review', 'Budget & Scope Review', 'Permit Administration + Construction Oversight'],
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
    destination: 'Cleaner next steps, fewer surprises, and a smoother project',
  },
  {
    avatar: 'Investors',
    roleKey: 'investors',
    href: '/services/investors',
    start: 'Need a better read on the deal before spending more money',
    stops: [
      { label: 'Need a read on the deal, rehab, or turn', services: ['Investor Execution Review', 'Rehab Budget Review'], tone: 'start' },
      { label: 'Need help hiring the right contractor and setting the job up right', services: ['Contractor Fit Consultation', 'Bid Coordination & Contractor Match', 'Materials Logistics Setup'], tone: 'info' },
      { label: 'Need help with lender scope, bids, or draws', services: ['Lender Scope & Bid Package', 'Draw Review Support'], tone: 'build' },
      { label: 'Need tighter follow-through on an active job', services: ['Rent-Ready Turn', 'Construction Oversight'], tone: 'control' },
      { label: 'Need repeat help across multiple properties', services: ['Turn Support Plan', 'Operator Support Plan', 'Project Support Retainer'], tone: 'finish' },
    ],
    destination: 'Fewer surprises, faster starts, and tighter coordination on the work',
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
    destination: 'Faster answers, more confident clients, and listings that move on time',
  },
  {
    avatar: 'Contractors',
    roleKey: 'contractors',
    href: '/services/contractors',
    start: 'Permit work and office follow-up are eating too much time',
    stops: [
      { label: 'Need help with permit and inspection handling', services: ['Permit Administration', 'Inspection Scheduling Support'], tone: 'start' },
      { label: 'Need help cleaning up paperwork and follow-up on active jobs', services: ['Admin Support for Active Jobs'], tone: 'info' },
      { label: 'Need tighter support while the work is moving', services: ['Construction Oversight Support'], tone: 'build' },
      { label: 'Need recurring office help', services: ['Permit & Inspection Support Plan', 'Back-Office Support Plan', 'Contractor Office Extension Retainer'], tone: 'finish' },
    ],
    destination: 'Less paperwork drag, cleaner follow-through, and more time in the field',
  },
  {
    avatar: 'Developers / Landowners',
    roleKey: 'developers',
    href: '/services/developers-landowners',
    start: 'Too much is still uncertain to move forward casually',
    stops: [
      { label: 'Need an early read before bigger money moves', services: ['Project Review', 'Budget & Scope Review'], tone: 'start' },
      { label: 'Need tighter permit handling and follow-through', services: ['Permit Administration + Construction Oversight'], tone: 'build' },
      { label: 'Need ongoing help keeping the work moving', services: ['Project Control Plan', 'Execution Oversight Retainer'], tone: 'finish' },
    ],
    destination: 'Cleaner execution, fewer surprises, and steadier progress as the project moves forward',
  },
];

const roadmapToneStyles = {
  start: {
    dot: 'bg-[#ff6b6b]',
    ring: 'ring-[#ff6b6b]/20',
    panel: 'border-[#ff6b6b]/18 bg-[#fff6f6]',
    chip: 'border-[#ff6b6b]/18',
  },
  info: {
    dot: 'bg-[#4aa3ff]',
    ring: 'ring-[#4aa3ff]/20',
    panel: 'border-[#4aa3ff]/18 bg-[#f5faff]',
    chip: 'border-[#4aa3ff]/18',
  },
  build: {
    dot: 'bg-[#41c96b]',
    ring: 'ring-[#41c96b]/20',
    panel: 'border-[#41c96b]/18 bg-[#f4fff7]',
    chip: 'border-[#41c96b]/18',
  },
  control: {
    dot: 'bg-[#8b6df2]',
    ring: 'ring-[#8b6df2]/20',
    panel: 'border-[#8b6df2]/18 bg-[#f8f6ff]',
    chip: 'border-[#8b6df2]/18',
  },
  finish: {
    dot: 'bg-[#d9a441]',
    ring: 'ring-[#d9a441]/20',
    panel: 'border-[#d9a441]/18 bg-[#fffaf0]',
    chip: 'border-[#d9a441]/18',
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
  const [activeProcessStep, setActiveProcessStep] = useState<Record<RoleKey, number>>({
    homeowners: 0,
    investors: 0,
    realtors: 0,
    contractors: 0,
    developers: 0,
  });
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

      <section className="relative overflow-hidden bg-[#08111d] pt-32 pb-24 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 motion-safe:animate-[heroFloat_22s_ease-in-out_infinite] bg-[linear-gradient(125deg,#163061_0%,#10254c_50%,#143367_100%)]" style={{ backgroundSize: '180% 180%' }} aria-hidden="true" />
        <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(circle_at_30%_35%,rgba(245,130,32,0.22),transparent_55%)]" />
        <div className="absolute left-[-10%] top-[10%] h-72 w-72 rounded-full bg-[rgba(245,130,32,0.12)] blur-3xl" />
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
              Pricing
            </p>
            <h1 className="mt-6 text-[2.75rem] font-black leading-[0.98] tracking-[-0.045em] text-white sm:text-[3.75rem] lg:text-[4.75rem] motion-safe:animate-[heroRise_1000ms_ease-out_0.1s_both]">
              Pricing for <span className="text-[#fa8c41]">project support.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-[1.55] text-white/85 sm:text-xl motion-safe:animate-[heroRise_1100ms_ease-out_0.2s_both]">
              Pick how you want to start. Buy a fixed-price service now, get pricing or request a review when scope or condition affects the number, or subscribe to a monthly support plan. Full contracting is the other door when the project needs a licensed GC running it end to end.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4 motion-safe:animate-[heroRise_1300ms_ease-out_0.4s_both]">
              <a href="#start-here" className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-[#fa8c41] px-7 py-3.5 text-sm font-black uppercase tracking-[0.06em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.45)] transition-all hover:-translate-y-0.5 hover:bg-[#ffa463]">
                Start Here <span aria-hidden="true">→</span>
              </a>
              <a href="/recurring-support" className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/5">
                See Support Plans
              </a>
            </div>
          </div>
        </div>
        <style>{`
@keyframes heroFloat { 0%, 100% { transform: scale(1.04) translate3d(0, 0, 0); } 50% { transform: scale(1.08) translate3d(-12px, -8px, 0); } }
@keyframes heroRise { 0% { opacity: 0; transform: translate3d(0, 24px, 0); filter: blur(4px); } 60% { filter: blur(0); } 100% { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); } }
`}</style>
      </section>

      <section id="start-here" className="border-b border-stone-200 bg-white py-16 sm:py-20">
        <div className="container-pro">
          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr] xl:items-start xl:gap-8">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Start here</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
                You should not have to sort the whole site out on your own.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg">
                Start with your role, the main problem, and the kind of help you need right now. The site should point you to the best next step fast.
              </p>
            </div>

            <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-4 shadow-elev-1 sm:rounded-[28px] sm:p-7">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">1. Who are you?</p>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:gap-2.5">
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
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">2. What do you need help with?</p>
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
                <div className="mt-3 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:gap-2.5">
                  {[
                    { key: 'buy', label: 'Buy now' },
                    { key: 'pricing', label: 'Get pricing' },
                    { key: 'quote', label: 'Request quote' },
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
                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
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
          <div className="mt-6 grid gap-4 sm:gap-6 md:grid-cols-3">
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
              <h2 className="text-2xl font-extrabold tracking-tight text-navy">Priced After Review</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-stone-700">
                Use this when a few project details affect price, but it still does not need a full custom quote.
              </p>
              <button type="button" onClick={() => setActiveBuying('pricing')} className="mt-5 inline-flex rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                Show Pricing Routes
              </button>
            </div>
            <div className={`rounded-[24px] border p-6 transition-all ${activeBuying === 'quote' ? 'border-orange bg-orange/[0.06]' : 'border-stone-200 bg-stone-50'}`}>
              <h2 className="text-2xl font-extrabold tracking-tight text-navy">Custom-Quoted Services</h2>
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
              Start with the role you are in now. Each page is built to help you buy the right support piece for the stage your project is in.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:gap-2.5">
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

          <div className="mt-8 rounded-[24px] border border-stone-200 bg-stone-50 p-5 shadow-elev-1 sm:rounded-[28px] sm:p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">{activeRoleCard.title}</p>
            <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-navy">What you may need help with</h3>
            <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-stone-700">{activeRoleCard.pain}</p>
            <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-navy">What the right support helps with</h3>
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

          {/* Wholesalers + Realtors → Deal Pack cross-link (keeps the audience reachable from the hub) */}
          <div className="mt-6 overflow-hidden rounded-[24px] border-2 border-orange/40 bg-gradient-to-br from-orange/[0.07] via-orange/[0.02] to-transparent p-6 shadow-elev-1 sm:rounded-[28px] sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Wholesaling or selling a deal?</p>
                <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
                  Attach a GC-verified Deal Pack to your assignment or listing.
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-stone-700">
                  Real investors won&rsquo;t pay top dollar for an unverified deal. A licensed NC GC verifies the budget, scope, and risk &mdash; so you attract the buyer pool that actually pays for it.
                </p>
              </div>
              <Link
                href="/deal-pack"
                className="shrink-0 inline-flex min-h-[52px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-white shadow-glow-orange transition hover:-translate-y-0.5 hover:bg-orange-500"
              >
                See the Deal Pack →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-stone-50 py-20 sm:py-24">
        <div className="container-pro">
          <div className="max-w-4xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Start with what is happening now</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Different projects need different support at different stages.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg">
              Open the role that fits your situation, then move to the support piece that fits what is happening now.
            </p>
          </div>

          <div className="mt-10 space-y-6">
            {roadmapLanes.map((lane) => {
              const steps: ProcessStep[] = [
                ...lane.stops,
                { label: 'What you get', services: [lane.destination], tone: 'finish' },
              ];
              const currentIndex = activeProcessStep[lane.roleKey] ?? 0;
              const currentStep = steps[currentIndex];
              const currentTone = roadmapToneStyles[currentStep.tone];

              return (
                <div key={lane.avatar} className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition-all duration-300 hover:border-orange/30 hover:shadow-[0_28px_80px_rgba(15,23,42,0.10)] sm:p-8">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-xl text-left">
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">{lane.avatar}</p>
                      <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-navy">{lane.start}</h3>
                    </div>
                    <Link href={lane.href} className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                      See {lane.avatar} Services
                    </Link>
                  </div>

                  <div className="mt-8 rounded-[28px] border border-stone-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-5 sm:p-7">
                    <div className="pb-2 sm:pb-4">
                      <div className="hidden min-w-[760px] lg:min-w-0 sm:block">
                        <div className="flex items-center justify-between gap-0 px-2">
                          {steps.map((step, index) => {
                            const tone = roadmapToneStyles[step.tone];
                            const active = currentIndex === index;
                            const complete = index < currentIndex;
                            return (
                              <div key={step.label} className="flex flex-1 items-center last:flex-none">
                                <button
                                  type="button"
                                  onMouseEnter={() => setActiveProcessStep((prev) => ({ ...prev, [lane.roleKey]: index }))}
                                  onFocus={() => setActiveProcessStep((prev) => ({ ...prev, [lane.roleKey]: index }))}
                                  onClick={() => setActiveProcessStep((prev) => ({ ...prev, [lane.roleKey]: index }))}
                                  className="group relative flex flex-col items-center text-center"
                                >
                                  <span className={`flex h-14 w-14 items-center justify-center rounded-full border-4 border-white text-base font-extrabold text-white shadow-[0_14px_30px_rgba(15,23,42,0.14)] ring-8 transition-all duration-300 ${tone.dot} ${active ? `${tone.ring} scale-110` : 'ring-transparent'} ${complete ? 'opacity-100' : ''}`}>
                                    {index === steps.length - 1 ? '✓' : index + 1}
                                  </span>
                                  <span className={`mt-3 max-w-[132px] text-[13px] font-semibold leading-tight transition-colors ${active ? 'text-navy' : 'text-stone-600 group-hover:text-navy'}`}>
                                    {step.label}
                                  </span>
                                </button>
                                {index < steps.length - 1 && (
                                  <div className="mx-3 h-[2px] flex-1 min-w-[42px] bg-[linear-gradient(90deg,rgba(15,23,42,0.22),rgba(15,23,42,0.08))]" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:hidden">
                      {steps.map((step, index) => {
                        const tone = roadmapToneStyles[step.tone];
                        const active = currentIndex === index;
                        return (
                          <button
                            key={step.label}
                            type="button"
                            onClick={() => setActiveProcessStep((prev) => ({ ...prev, [lane.roleKey]: index }))}
                            className={`rounded-[20px] border px-4 py-4 text-left transition-all ${tone.panel} ${active ? 'shadow-[0_18px_45px_rgba(15,23,42,0.08)] ring-2 ring-orange/20' : 'bg-white'}`}
                          >
                            <div className="flex items-start gap-3">
                              <span className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold text-white ${tone.dot}`}>
                                {index === steps.length - 1 ? '✓' : index + 1}
                              </span>
                              <div>
                                <p className="text-sm font-extrabold text-navy">{step.label}</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {step.services.map((service) => (
                                    <span key={service} className={`inline-flex rounded-full border bg-white px-2.5 py-1 text-[11px] font-semibold text-navy ${tone.chip}`}>
                                      {service}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className={`mt-6 rounded-[26px] border p-5 sm:p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-all duration-300 ${currentTone.panel}`}>
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-2xl">
                          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">
                            {currentIndex === steps.length - 1 ? 'Result' : `Step ${currentIndex + 1}`}
                          </p>
                          <h4 className="mt-2 text-2xl font-extrabold tracking-tight text-navy">{currentStep.label}</h4>
                          <p className="mt-3 text-[15px] leading-relaxed text-stone-700">
                            {currentIndex === steps.length - 1
                              ? lane.destination
                              : 'Tap each step to see where this kind of project usually needs help next.'}
                          </p>
                        </div>
                        <div className="lg:min-w-[220px] lg:max-w-[260px]">
                          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-stone-500">Services that fit here</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {currentStep.services.map((service) => (
                              <span key={service} className={`inline-flex rounded-full border bg-white px-3 py-1 text-[12px] font-semibold text-navy shadow-[0_6px_20px_rgba(15,23,42,0.06)] ${currentTone.chip}`}>
                                {service}
                              </span>
                            ))}
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

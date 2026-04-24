'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

type RoleKey = 'homeowners' | 'investors' | 'realtors' | 'contractors' | 'developers';
type ProblemKey = 'permits' | 'inspections' | 'budget' | 'paperwork' | 'listing' | 'followup';
type NeedKey = 'buy' | 'pricing' | 'quote';

const roleContent: Record<
  RoleKey,
  {
    title: string;
    shortTitle: string;
    pain: string;
    value: string;
    fit: string;
    href: string;
    primaryCta: string;
    secondaryCta: string;
    proof: { title: string; body: string; pain: string; result: string };
  }
> = {
  homeowners: {
    title: 'Homeowners',
    shortTitle: 'Homeowner',
    pain: 'You may be planning work, comparing next steps, or trying to keep a residential project from turning into an expensive guess.',
    value: 'Southern Cities helps with permit path review, budget realism, inspection follow-through, and better project setup before small issues turn into bigger costs.',
    fit: 'Best fit when you want clearer next steps before spending more money, or stronger help once the job already feels loose.',
    href: '/services/homeowners',
    primaryCta: 'See Homeowner Services',
    secondaryCta: 'Request a Project Review',
    proof: {
      title: 'Homeowners use Southern Cities before the work gets expensive and after the job starts feeling loose',
      body: 'Sometimes that means getting clearer on permits, scope, budget, and contractor fit before spending more money. Sometimes it means helping clean up confusion once inspection issues, paperwork, or weak follow-through are already affecting the job.',
      pain: 'Bad assumptions early, or permit and inspection problems later',
      result: 'A clearer path before spending and better follow-through once the work is underway',
    },
  },
  investors: {
    title: 'Investors',
    shortTitle: 'Investor',
    pain: 'You may be sizing up a project before spending, choosing contractors, or trying to keep an active rehab from drifting off course.',
    value: 'Southern Cities helps with budget review, permit path clarity, contractor-fit questions, and execution follow-through so the job is better set up from the start.',
    fit: 'Best fit when you want better numbers and fewer surprises before moving faster, or stronger support once the job is already slipping.',
    href: '/services/investors',
    primaryCta: 'See Investor Services',
    secondaryCta: 'Get Pricing',
    proof: {
      title: 'Investors use Southern Cities to tighten the front end and clean up loose execution',
      body: 'That can mean reviewing budget assumptions, permit needs, draw expectations, or contractor fit before the work starts. It can also mean bringing discipline back to an active job that is already losing time through bad handoffs or weak follow-through.',
      pain: 'Loose numbers early, or vacancy drag and project drift later',
      result: 'A better read before money went out and better control once the job was active',
    },
  },
  realtors: {
    title: 'Realtors',
    shortTitle: 'Realtor',
    pain: 'You may need clearer listing-prep decisions early or faster help once repair items and inspection questions start affecting the file.',
    value: 'Southern Cities helps turn construction questions into clearer next steps, better prep decisions, faster answers, and stronger follow-through.',
    fit: 'Best fit when you want fewer surprises before a listing goes live or better help once the deal starts getting messy.',
    href: '/services/realtors',
    primaryCta: 'See Realtor Services',
    secondaryCta: 'Request Help',
    proof: {
      title: 'Realtors use Southern Cities before listing work gets messy and after the file starts dragging',
      body: 'That can mean getting clearer on what should be fixed, what should wait, and what the prep budget may look like before the listing goes live. It can also mean helping once inspection items, seller hesitation, or client questions start creating too much back-and-forth.',
      pain: 'Weak prep decisions early, or client pressure and file drag later',
      result: 'Clearer prep decisions, faster next steps, and better client confidence',
    },
  },
  contractors: {
    title: 'Contractors',
    shortTitle: 'Contractor',
    pain: 'You may want tighter permit and admin handling before the job ramps up, or help once paperwork and follow-up start pulling time away from production.',
    value: 'Southern Cities helps with permit handling, inspection coordination, paperwork flow, and execution discipline so office drag does not keep hurting the field.',
    fit: 'Best fit when you want a cleaner setup before work stacks up, or stronger support when admin work is already eating the day.',
    href: '/services/contractors',
    primaryCta: 'See Contractor Services',
    secondaryCta: 'Get Support Pricing',
    proof: {
      title: 'Contractors use Southern Cities to tighten admin before it piles up and to steady jobs that already need more follow-through',
      body: 'That can mean getting permit handling, inspection scheduling, and office follow-up set up better from the start. It can also mean taking pressure off the team once paperwork, callbacks, and job admin are already slowing execution.',
      pain: 'Weak admin setup early, or office drag and repeated follow-up later',
      result: 'Better setup before production gets pinched and less paperwork drag once jobs are active',
    },
  },
  developers: {
    title: 'Developers / Landowners',
    shortTitle: 'Developer / Landowner',
    pain: 'You may need a cleaner read on permits, scope, budget, and execution before bigger money moves, or help steadying a project that already feels too loose.',
    value: 'Southern Cities helps tighten planning, permit path review, budgeting realism, and execution discipline before uncertainty becomes expensive.',
    fit: 'Best fit when you want a better early read before moving forward casually, or stronger support once the work starts drifting.',
    href: '/services/developers-landowners',
    primaryCta: 'See Project Support',
    secondaryCta: 'Request Project Review',
    proof: {
      title: 'Developers and landowners use Southern Cities for early review and steadier execution later',
      body: 'That can mean pressure-testing permits, scope, budget expectations, and contractor fit before the project advances. It can also mean bringing tighter follow-through to a job that is already showing drift, confusion, or weak coordination.',
      pain: 'Bad assumptions early, or scope drift and weak coordination later',
      result: 'A better early read before bigger money moved and steadier execution once the job was active',
    },
  },
};

const roleOrder: RoleKey[] = ['homeowners', 'investors', 'realtors', 'contractors', 'developers'];

const trustPoints = [
  'North Carolina residential project help',
  'Permit review, budget review, planning, and active-job help',
  'Help for homeowners, investors, realtors, contractors, and developers',
  'Help before small issues get expensive and after the job needs tighter follow-through',
];

const proofStrip = [
  {
    label: 'Early',
    text: 'Bring Southern Cities in before spending runs ahead of the plan, the permit path is unclear, or the wrong contractor fit creates problems later.',
  },
  {
    label: 'During',
    text: 'Southern Cities helps turn permits, inspections, pricing questions, and follow-through into cleaner next steps and better job discipline.',
  },
  {
    label: 'Later',
    text: 'If the work is already feeling loose, Southern Cities helps reduce confusion, tighten execution, and make the next move easier to trust.',
  },
];

const featuredOffers = [
  {
    title: 'Start before the job gets expensive',
    body: 'Use this when you want permit path review, budget realism, contractor-fit help, or better setup before work starts creating avoidable surprises.',
    cta: 'See Early-Stage Services',
    href: '/services',
  },
  {
    title: 'Send details for pricing',
    body: 'Use this when the project needs a few real inputs reviewed so the next number is grounded in something more solid than a quick guess.',
    cta: 'Get Service Pricing',
    href: '/services#buying-paths',
  },
  {
    title: 'Get help once the work is underway',
    body: 'Use this when the project is already active and you need tighter permit handling, follow-through, coordination, or a better read on what to do next.',
    cta: 'Request a Review',
    href: '/services#contact',
  },
];

const problemPanels: Record<ProblemKey, { label: string; summary: string; cost: string; next: string; href: string }> = {
  permits: {
    label: 'Permit path clarity',
    summary: 'Use this when you want to understand permits, approvals, corrections, or jurisdiction expectations before they create wasted motion later.',
    cost: 'A cleaner permit path helps reduce bad assumptions early and lowers the chance of repeated follow-up once the work starts.',
    next: 'Start with permit review or permit help.',
    href: '/services/homeowners',
  },
  inspections: {
    label: 'Inspection and correction planning',
    summary: 'Use this when you need a better read on inspection items, correction lists, or what needs to happen next before more money goes out.',
    cost: 'Clearer inspection planning helps reduce repeated trips, loose answers, and costly back-and-forth later.',
    next: 'Start with a review or inspection-response service.',
    href: '/services/realtors',
  },
  budget: {
    label: 'Budget review',
    summary: 'Use this when the numbers still need pressure-testing so you can move with more confidence instead of spending from a loose assumption.',
    cost: 'Better budget review helps reduce bad approvals, weak contractor decisions, and surprise spending later.',
    next: 'Start with pricing or a budget review.',
    href: '/services/investors',
  },
  paperwork: {
    label: 'Planning and admin setup',
    summary: 'Use this when paperwork, office flow, or process setup needs to be handled better before it starts pulling too much time away from the real work.',
    cost: 'Better setup reduces repeated follow-up, missed steps, and the admin drag that shows up later when jobs stack up.',
    next: 'Start with contractor support or admin help.',
    href: '/services/contractors',
  },
  listing: {
    label: 'Listing and prep decisions',
    summary: 'Use this when you need better guidance on what to fix, what to leave alone, and what the prep path may look like before the property goes live.',
    cost: 'Clearer prep decisions help reduce seller hesitation, guesswork, and rushed decisions later.',
    next: 'Start with realtor services.',
    href: '/services/realtors',
  },
  followup: {
    label: 'Execution follow-through',
    summary: 'Use this when the project needs tighter updates, coordination, and next-step discipline so the owner is not carrying more follow-up than they should.',
    cost: 'Stronger follow-through helps reduce confusion, project drift, and the need to keep chasing the job later.',
    next: 'Start with a project review or oversight route.',
    href: '/services',
  },
};

const routerRecommendations: Record<RoleKey, Record<ProblemKey, Record<NeedKey, { label: string; href: string; cta: string }>>> = {
  homeowners: {
    permits: {
      buy: { label: 'Start with Permit Path Review', href: '/services/homeowners', cta: 'See Homeowner Services' },
      pricing: { label: 'Start with Permit Administration review', href: '/services/homeowners', cta: 'Get Homeowner Pricing' },
      quote: { label: 'Start with a project review', href: '/services/homeowners#contact', cta: 'Request Project Review' },
    },
    inspections: {
      buy: { label: 'Start with a homeowner consultation', href: '/services/homeowners', cta: 'Book Consultation' },
      pricing: { label: 'Start with a budget review', href: '/services/homeowners', cta: 'Get Budget Pricing' },
      quote: { label: 'Start with project oversight review', href: '/services/homeowners#contact', cta: 'Request Oversight Review' },
    },
    budget: {
      buy: { label: 'Start with Home Assessment', href: '/services/homeowners', cta: 'Buy Home Assessment' },
      pricing: { label: 'Start with Home Project Budget Review', href: '/services/homeowners', cta: 'Enter Project Details' },
      quote: { label: 'Start with a project review', href: '/services/homeowners#contact', cta: 'Request Project Review' },
    },
    paperwork: {
      buy: { label: 'Start with a homeowner consultation', href: '/services/homeowners', cta: 'Book Consultation' },
      pricing: { label: 'Start with permit help', href: '/services/homeowners', cta: 'Get Permit Help' },
      quote: { label: 'Start with oversight review', href: '/services/homeowners#contact', cta: 'Request Oversight Review' },
    },
    listing: {
      buy: { label: 'Realtor services may fit better', href: '/services/realtors', cta: 'See Realtor Services' },
      pricing: { label: 'Realtor services may fit better', href: '/services/realtors', cta: 'See Realtor Services' },
      quote: { label: 'Start with realtor listing support', href: '/services/realtors', cta: 'Request Listing Help' },
    },
    followup: {
      buy: { label: 'Start with Home Assessment', href: '/services/homeowners', cta: 'Buy Home Assessment' },
      pricing: { label: 'Start with budget or permit review', href: '/services/homeowners', cta: 'Get Homeowner Pricing' },
      quote: { label: 'Start with Construction Oversight', href: '/services/homeowners#contact', cta: 'Request Oversight Review' },
    },
  },
  investors: {
    permits: {
      buy: { label: 'Start with investor review', href: '/services/investors', cta: 'See Investor Services' },
      pricing: { label: 'Start with lender or permit-related review', href: '/services/investors', cta: 'Get Investor Pricing' },
      quote: { label: 'Start with project oversight', href: '/services/investors#contact', cta: 'Request Project Review' },
    },
    inspections: {
      buy: { label: 'Start with Investor Project Review', href: '/services/investors', cta: 'Enter Project Details' },
      pricing: { label: 'Start with Rehab Budget Review', href: '/services/investors', cta: 'Get Budget Pricing' },
      quote: { label: 'Start with oversight support', href: '/services/investors#contact', cta: 'Request Oversight Review' },
    },
    budget: {
      buy: { label: 'Start with Investor Project Review', href: '/services/investors', cta: 'Enter Project Details' },
      pricing: { label: 'Start with Rehab or Turn Budget Review', href: '/services/investors', cta: 'Get Budget Pricing' },
      quote: { label: 'Start with a project review', href: '/services/investors#contact', cta: 'Request Project Review' },
    },
    paperwork: {
      buy: { label: 'Start with contractor-fit or setup review', href: '/services/investors', cta: 'See Investor Services' },
      pricing: { label: 'Start with setup review', href: '/services/investors', cta: 'Get Setup Pricing' },
      quote: { label: 'Start with active project support', href: '/services/investors#contact', cta: 'Request Support Review' },
    },
    listing: {
      buy: { label: 'Realtor services may fit better', href: '/services/realtors', cta: 'See Realtor Services' },
      pricing: { label: 'Realtor services may fit better', href: '/services/realtors', cta: 'See Realtor Services' },
      quote: { label: 'Start with realtor support', href: '/services/realtors', cta: 'Request Listing Help' },
    },
    followup: {
      buy: { label: 'Start with Investor Project Review', href: '/services/investors', cta: 'Enter Project Details' },
      pricing: { label: 'Start with Turn Budget Review', href: '/services/investors', cta: 'Enter Unit Details' },
      quote: { label: 'Start with Construction Oversight', href: '/services/investors#contact', cta: 'Request Oversight Review' },
    },
  },
  realtors: {
    permits: {
      buy: { label: 'Start with Inspection Response', href: '/services/realtors', cta: 'Buy Inspection Response' },
      pricing: { label: 'Start with listing prep review', href: '/services/realtors', cta: 'Enter Property Details' },
      quote: { label: 'Start with listing prep coordination', href: '/services/realtors#contact', cta: 'Request Listing Prep Review' },
    },
    inspections: {
      buy: { label: 'Start with Inspection Response', href: '/services/realtors', cta: 'Buy Inspection Response' },
      pricing: { label: 'Start with pre-listing review', href: '/services/realtors', cta: 'Enter Property Details' },
      quote: { label: 'Start with deal help', href: '/services/realtors#contact', cta: 'Request Help' },
    },
    budget: {
      buy: { label: 'Start with Inspection Response', href: '/services/realtors', cta: 'Buy Inspection Response' },
      pricing: { label: 'Start with Pre-Listing Budget & Prep Review', href: '/services/realtors', cta: 'Enter Property Details' },
      quote: { label: 'Start with listing prep coordination', href: '/services/realtors#contact', cta: 'Request Listing Prep Review' },
    },
    paperwork: {
      buy: { label: 'Start with Inspection Response', href: '/services/realtors', cta: 'Buy Inspection Response' },
      pricing: { label: 'Start with listing prep review', href: '/services/realtors', cta: 'Get Pricing' },
      quote: { label: 'Start with recurring realtor support', href: '/recurring-support#realtors', cta: 'See Monthly Support' },
    },
    listing: {
      buy: { label: 'Start with Inspection Response', href: '/services/realtors', cta: 'Buy Inspection Response' },
      pricing: { label: 'Start with Pre-Listing Budget & Prep Review', href: '/services/realtors', cta: 'Enter Property Details' },
      quote: { label: 'Start with Listing Prep Coordination Review', href: '/services/realtors#contact', cta: 'Request Listing Prep Review' },
    },
    followup: {
      buy: { label: 'Start with Inspection Response', href: '/services/realtors', cta: 'Buy Inspection Response' },
      pricing: { label: 'Start with pre-listing review', href: '/services/realtors', cta: 'Get Pricing' },
      quote: { label: 'Start with Deal Desk or Listing Prep Desk', href: '/recurring-support#realtors', cta: 'See Monthly Support' },
    },
  },
  contractors: {
    permits: {
      buy: { label: 'Start with contractor permit help', href: '/services/contractors', cta: 'See Contractor Services' },
      pricing: { label: 'Start with Permit Administration', href: '/services/contractors', cta: 'Request Permit Review' },
      quote: { label: 'Start with ongoing contractor support', href: '/recurring-support#contractors', cta: 'See Monthly Support' },
    },
    inspections: {
      buy: { label: 'Start with contractor services', href: '/services/contractors', cta: 'See Contractor Services' },
      pricing: { label: 'Start with Inspection Scheduling Support', href: '/services/contractors', cta: 'Get Inspection Support Pricing' },
      quote: { label: 'Start with recurring contractor support', href: '/recurring-support#contractors', cta: 'See Monthly Support' },
    },
    budget: {
      buy: { label: 'Contractor services may fit better than pricing-first', href: '/services/contractors', cta: 'See Contractor Services' },
      pricing: { label: 'Start with Active Job Admin Triage', href: '/services/contractors', cta: 'Request Admin Review' },
      quote: { label: 'Start with Construction Oversight Support', href: '/services/contractors#contact', cta: 'Request Oversight Review' },
    },
    paperwork: {
      buy: { label: 'Start with contractor services', href: '/services/contractors', cta: 'See Contractor Services' },
      pricing: { label: 'Start with Active Job Admin Triage', href: '/services/contractors', cta: 'Request Admin Review' },
      quote: { label: 'Start with Back-Office Support', href: '/recurring-support#contractors', cta: 'See Monthly Support' },
    },
    listing: {
      buy: { label: 'Realtor services may fit better', href: '/services/realtors', cta: 'See Realtor Services' },
      pricing: { label: 'Realtor services may fit better', href: '/services/realtors', cta: 'See Realtor Services' },
      quote: { label: 'Realtor services may fit better', href: '/services/realtors', cta: 'See Realtor Services' },
    },
    followup: {
      buy: { label: 'Start with contractor services', href: '/services/contractors', cta: 'See Contractor Services' },
      pricing: { label: 'Start with Active Job Admin Triage', href: '/services/contractors', cta: 'Request Admin Review' },
      quote: { label: 'Start with Office Extension Retainer', href: '/recurring-support#contractors', cta: 'See Monthly Support' },
    },
  },
  developers: {
    permits: {
      buy: { label: 'Start with early project review', href: '/services/developers-landowners', cta: 'See Project Support' },
      pricing: { label: 'Start with Early Budget & Scope Review', href: '/services/developers-landowners', cta: 'Request Budget Review' },
      quote: { label: 'Start with project review', href: '/services/developers-landowners#contact', cta: 'Request Project Review' },
    },
    inspections: {
      buy: { label: 'Start with early project review', href: '/services/developers-landowners', cta: 'See Project Support' },
      pricing: { label: 'Start with Early Budget & Scope Review', href: '/services/developers-landowners', cta: 'Request Budget Review' },
      quote: { label: 'Start with permit + oversight review', href: '/services/developers-landowners#contact', cta: 'Request Project Review' },
    },
    budget: {
      buy: { label: 'Start with Early Project Review', href: '/services/developers-landowners', cta: 'See Project Support' },
      pricing: { label: 'Start with Early Budget & Scope Review', href: '/services/developers-landowners', cta: 'Request Budget Review' },
      quote: { label: 'Start with project review', href: '/services/developers-landowners#contact', cta: 'Request Project Review' },
    },
    paperwork: {
      buy: { label: 'Start with early project review', href: '/services/developers-landowners', cta: 'See Project Support' },
      pricing: { label: 'Start with permit handling review', href: '/services/developers-landowners', cta: 'Get Project Pricing' },
      quote: { label: 'Start with oversight retainer review', href: '/recurring-support#developers', cta: 'See Monthly Support' },
    },
    listing: {
      buy: { label: 'Realtor services may fit better', href: '/services/realtors', cta: 'See Realtor Services' },
      pricing: { label: 'Realtor services may fit better', href: '/services/realtors', cta: 'See Realtor Services' },
      quote: { label: 'Realtor services may fit better', href: '/services/realtors', cta: 'See Realtor Services' },
    },
    followup: {
      buy: { label: 'Start with Early Project Review', href: '/services/developers-landowners', cta: 'See Project Support' },
      pricing: { label: 'Start with Early Budget & Scope Review', href: '/services/developers-landowners', cta: 'Request Budget Review' },
      quote: { label: 'Start with Execution Oversight Retainer', href: '/recurring-support#developers', cta: 'See Monthly Support' },
    },
  },
};

const processSteps = [
  {
    title: 'Tell us where you are in the project',
    body: 'Start with your role and the area where you want better planning, better setup, or stronger follow-through.',
  },
  {
    title: 'We point you to the right kind of help',
    body: 'Southern Cities helps sort out whether you need an early review, a pricing step, a straightforward service, or a deeper project review.',
  },
  {
    title: 'You choose how to get started',
    body: 'You can buy the service, send project details for pricing, or request a review when the work needs more eyes before anyone should quote it casually.',
  },
  {
    title: 'We help keep the project cleaner',
    body: 'That can mean better early decisions before money goes out, or tighter follow-through once the job is already underway.',
  },
];

export default function Home() {
  const [activeRole, setActiveRole] = useState<RoleKey>('homeowners');
  const [activeProblem, setActiveProblem] = useState<ProblemKey>('permits');
  const [activeNeed, setActiveNeed] = useState<NeedKey>('pricing');
  const [openProblem, setOpenProblem] = useState<ProblemKey>('permits');
  const [openStep, setOpenStep] = useState<number>(0);

  const activeRoleContent = roleContent[activeRole];
  const recommendation = useMemo(
    () => routerRecommendations[activeRole][activeProblem][activeNeed],
    [activeRole, activeProblem, activeNeed]
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <SiteNav />

      <section className="relative overflow-hidden bg-navy-900 pt-28 pb-16 sm:pt-34 sm:pb-20">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#163061_0%,#10254c_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
        <div className="absolute -left-20 top-16 h-56 w-56 rounded-full bg-orange/15 blur-3xl" />
        <div className="absolute right-0 top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 container-pro">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)] lg:items-center">
            <div className="max-w-[46rem]">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                Help before small issues get expensive and after the work needs tighter follow-through
              </div>
              <h1 className="max-w-[12ch] text-[3rem] font-extrabold leading-[0.97] tracking-[-0.04em] text-white sm:text-[4rem] lg:text-[4.8rem]">
                Better project decisions early. Stronger follow-through once the work is underway.
              </h1>
              <p className="mt-6 max-w-[42rem] text-[18px] leading-[1.7] text-white sm:text-[20px]">
                Southern Cities helps homeowners, investors, realtors, contractors, and developers get clearer permit paths, more realistic budgets, better project setup, and steadier execution before confusion, bad assumptions, and weak follow-through turn into expensive problems.
              </p>

              <div className="mt-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange-200">Who are you?</p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {roleOrder.map((role) => {
                    const active = role === activeRole;
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setActiveRole(role)}
                        className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                          active
                            ? 'bg-orange text-white shadow-glow-orange'
                            : 'border border-white/20 bg-white/8 text-white hover:bg-white/14'
                        }`}
                      >
                        {roleContent[role].title}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href={activeRoleContent.href} className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-[15px] font-semibold text-white shadow-glow-orange transition-all hover:bg-orange-500 hover:-translate-y-0.5">
                  {activeRoleContent.primaryCta}
                </Link>
                <Link href="/services#contact" className="inline-flex min-w-[220px] items-center justify-center rounded-full border-2 border-white bg-white px-6 py-3.5 text-[14px] font-semibold text-navy transition-all hover:bg-stone-100 hover:-translate-y-0.5">
                  {activeRoleContent.secondaryCta}
                </Link>
              </div>
            </div>

            <div className="rounded-[26px] border border-white/15 bg-white p-6 text-navy shadow-[0_24px_60px_rgba(6,18,43,0.28)] sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(6,18,43,0.34)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Best fit right now</p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-navy">{activeRoleContent.title}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{activeRoleContent.pain}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{activeRoleContent.value}</p>
              <div className="mt-5 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                <p className="text-sm font-semibold text-navy">{activeRoleContent.fit}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="container-pro">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {trustPoints.map((item) => (
              <div key={item} className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4 text-[14.5px] leading-relaxed text-stone-800 transition-all duration-300 hover:-translate-y-1 hover:border-orange/25 hover:bg-white hover:shadow-elev-1">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-14 sm:py-16">
        <div className="container-pro">
          <div className="grid gap-8 xl:grid-cols-[0.88fr_1.12fr] xl:items-start">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Start with where you are in the project</p>
              <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl leading-[1.08]">
                Get to the right next step whether you are planning ahead or cleaning up a loose job.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-stone-700">
                You should not have to read the whole site to figure out what to click. Start with your role, the area where you need help, and the kind of support that makes sense before or during execution.
              </p>
            </div>

            <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-elev-1 sm:p-7">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">1. Who are you?</p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {roleOrder.map((role) => {
                    const active = role === activeRole;
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setActiveRole(role)}
                        className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                          active
                            ? 'bg-navy text-white'
                            : 'border border-stone-300 bg-white text-navy hover:border-orange hover:text-orange'
                        }`}
                      >
                        {roleContent[role].shortTitle}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">2. What do you want clearer before moving forward?</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {Object.entries(problemPanels).map(([key, panel]) => {
                    const active = key === activeProblem;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActiveProblem(key as ProblemKey)}
                        className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all ${
                          active
                            ? 'border-orange bg-orange/[0.08] text-navy'
                            : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-orange/35 hover:bg-white'
                        }`}
                      >
                        {panel.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">3. How do you want to start?</p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {[
                    { key: 'buy', label: 'Get started' },
                    { key: 'pricing', label: 'Get a price' },
                    { key: 'quote', label: 'Talk about a custom job' },
                  ].map((item) => {
                    const active = item.key === activeNeed;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setActiveNeed(item.key as NeedKey)}
                        className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                          active
                            ? 'bg-orange text-white shadow-glow-orange'
                            : 'border border-stone-300 bg-white text-navy hover:border-orange hover:text-orange'
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
                <h3 className="mt-3 text-2xl font-extrabold tracking-tight">{recommendation.label}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/80">{problemPanels[activeProblem].summary}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-white/80">{problemPanels[activeProblem].cost}</p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Link href={recommendation.href} className="inline-flex items-center justify-center rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-500">
                    {recommendation.cta}
                  </Link>
                  <Link href="/services" className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-orange hover:text-orange-200">
                    Browse All Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="container-pro">
          <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
            <div className="rounded-[24px] border border-stone-200 bg-navy-950 p-5 text-white shadow-[0_18px_40px_rgba(6,18,43,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(6,18,43,0.18)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Real project proof</p>
              <p className="mt-4 text-xl font-extrabold tracking-tight text-white">Good project help shows up in the setup, the follow-through, and the finished result.</p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/80">
                The difference is not just appearance. It is better decisions earlier, fewer loose ends during execution, and a job that is easier to trust from one step to the next.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {proofStrip.map((item) => (
                <div key={item.label} className="group rounded-[22px] border border-stone-200 bg-white p-5 shadow-elev-1 transition-all duration-300 hover:-translate-y-1 hover:border-orange/25 hover:shadow-elev-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange">{item.label}</p>
                  <p className="mt-3 text-[15px] font-semibold leading-relaxed text-navy transition-colors group-hover:text-orange">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[28px] border border-stone-200 bg-stone-50 p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Before and after</p>
                  <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Real visual proof still builds trust faster than promises do.</h2>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="overflow-hidden rounded-[24px] border border-stone-200 bg-white shadow-elev-1">
                  <div className="relative aspect-[4/3]">
                    <Image src="/before-3.jpg" alt="Before project condition" fill className="object-cover" />
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange">Before</p>
                    <p className="mt-2 text-[15px] font-semibold leading-relaxed text-navy">Before better planning, cleaner decisions, and stronger execution follow-through showed up in the work.</p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[24px] border border-stone-200 bg-white shadow-elev-1">
                  <div className="relative aspect-[4/3]">
                    <Image src="/after-4.jpg" alt="After project result" fill className="object-cover" />
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange">After</p>
                    <p className="mt-2 text-[15px] font-semibold leading-relaxed text-navy">Cleaner, more finished, and easier to trust when the project is set up and carried forward the right way.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-elev-1 sm:p-7">
              <div className="flex flex-wrap gap-2.5">
                {roleOrder.map((role) => {
                  const active = role === activeRole;
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setActiveRole(role)}
                      className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                        active
                          ? 'bg-orange text-white shadow-glow-orange'
                          : 'border border-stone-300 bg-white text-navy hover:border-orange hover:text-orange'
                      }`}
                    >
                      {roleContent[role].title}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 rounded-[24px] border border-stone-200 bg-stone-50 px-5 py-6 text-navy">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">{activeRoleContent.proof.title}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-stone-700">{activeRoleContent.proof.body}</p>
                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl border border-stone-200 bg-white px-4 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">What was creating the problem</p>
                    <p className="mt-2 text-sm font-semibold text-navy">{activeRoleContent.proof.pain}</p>
                  </div>
                  <div className="rounded-2xl border border-stone-200 bg-white px-4 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">What changed once it was handled right</p>
                    <p className="mt-2 text-sm font-semibold text-navy">{activeRoleContent.proof.result}</p>
                  </div>
                </div>
                <div className="mt-5">
                  <Link href={activeRoleContent.href} className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                    {activeRoleContent.primaryCta}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {featuredOffers.map((offer) => (
              <div key={offer.title} className="rounded-[24px] border border-stone-200 bg-white p-5 shadow-elev-1 transition-all duration-300 hover:-translate-y-1 hover:border-orange/25 hover:shadow-elev-3">
                <p className="text-xl font-extrabold tracking-tight text-navy">{offer.title}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{offer.body}</p>
                <div className="mt-5">
                  <Link href={offer.href} className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                    {offer.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-14 sm:py-16">
        <div className="container-pro">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Start with the issue</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl leading-[1.08]">
              If you already know what is causing the delay, start there.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-stone-700">
              Some people know the role they are in. Others just know the job is getting held up by permits, inspections, paperwork, budget questions, or too much chasing. This section gets you to the right next step faster.
            </p>
          </div>

          <div className="mt-8 grid gap-3">
            {Object.entries(problemPanels).map(([key, panel]) => {
              const active = openProblem === key;
              return (
                <div key={key} className="rounded-[22px] border border-stone-200 bg-white shadow-elev-1">
                  <button
                    type="button"
                    onClick={() => setOpenProblem(key as ProblemKey)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-lg font-bold tracking-tight text-navy">{panel.label}</span>
                    <span className={`text-xl font-bold transition-transform ${active ? 'rotate-45 text-orange' : 'text-navy'}`}>+</span>
                  </button>
                  {active ? (
                    <div className="border-t border-stone-200 px-5 py-5">
                      <p className="text-[15px] leading-relaxed text-stone-700">{panel.summary}</p>
                      <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{panel.cost}</p>
                      <p className="mt-3 text-[15px] font-semibold leading-relaxed text-navy">{panel.next}</p>
                      <div className="mt-4">
                        <Link href={panel.href} className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                          See the Best-Fit Service Page
                        </Link>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="container-pro">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">How this works</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl leading-tight">You do not need to guess your way through the process.</h2>
              <p className="mt-5 text-[15px] leading-relaxed text-stone-700">
                The point of the site is to help you figure out what fits, what happens next, and how to get moving without spending more time in the wrong place.
              </p>
            </div>
            <div className="space-y-3.5">
              {processSteps.map((step, index) => {
                const active = openStep === index;
                return (
                  <div key={step.title} className="rounded-[22px] border border-stone-200 bg-stone-50 p-5 transition-all duration-300 hover:border-orange/25 hover:bg-white hover:shadow-elev-1">
                    <button type="button" onClick={() => setOpenStep(index)} className="flex w-full items-start gap-4 text-left">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${active ? 'bg-orange' : 'bg-navy'}`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-base font-semibold leading-relaxed text-navy">{step.title}</p>
                        {active ? <p className="mt-2 text-[14.5px] leading-relaxed text-stone-700">{step.body}</p> : null}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-14 sm:py-16 text-white">
        <div className="container-pro max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Start here</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl leading-[1.08]">
            If the job is slowing down, getting confusing, or becoming more expensive to leave alone, start here.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/88">
            You do not need to have the whole project figured out before reaching out. If the job needs better follow-through, fewer delays, or a clearer next step, Southern Cities can help you move it forward.
          </p>
          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
            <Link href="/services" className="inline-flex items-center justify-center rounded-full bg-orange px-8 py-4 text-[15px] font-semibold text-white transition-all hover:bg-orange-500">
              Find the Right Service
            </Link>
            <Link href="/services#contact" className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-[15px] font-medium text-white transition-all hover:border-orange hover:text-orange-200">
              Request a Project Review
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

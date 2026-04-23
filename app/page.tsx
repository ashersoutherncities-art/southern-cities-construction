'use client';

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
    pain: 'Your project is getting more expensive, more confusing, or harder to trust.',
    value: 'Southern Cities helps cut permit confusion, inspection setbacks, and costly wrong moves before they get bigger.',
    fit: 'Best fit when you need a clearer next step before spending more money.',
    href: '/services/homeowners',
    primaryCta: 'See Homeowner Services',
    secondaryCta: 'Request a Project Review',
    proof: {
      title: 'Homeowners come to us when the job starts feeling loose',
      body: 'That usually means permit questions are not getting answered clearly, inspection issues are slowing things down, or the next step still does not feel solid enough to spend more money with confidence.',
      pain: 'Unclear scope, permit stress, and inspection setbacks',
      result: 'A clearer next step before the project got more expensive',
    },
  },
  investors: {
    title: 'Investors',
    shortTitle: 'Investor',
    pain: 'Your rehab, turn, or active job is losing time, money, or momentum.',
    value: 'Southern Cities helps reduce delay, bad handoffs, and budget surprises before they turn into bigger losses.',
    fit: 'Best fit when you need better numbers and fewer surprises before moving faster.',
    href: '/services/investors',
    primaryCta: 'See Investor Services',
    secondaryCta: 'Get Pricing',
    proof: {
      title: 'Investors come to us when too much is still uncertain',
      body: 'That usually means the numbers still feel too loose, contractor decisions are not locked in well enough, or the job is already losing time through bad handoffs and weak follow-through.',
      pain: 'Vacancy drag, bad handoffs, and expensive project drift',
      result: 'A better read on the deal before more money and time were lost',
    },
  },
  realtors: {
    title: 'Realtors',
    shortTitle: 'Realtor',
    pain: 'Repair items, listing prep, and inspection questions are slowing the deal down.',
    value: 'Southern Cities helps turn construction questions into clearer next steps, faster answers, and better follow-through.',
    fit: 'Best fit when the deal or listing keeps getting slowed down by construction questions.',
    href: '/services/realtors',
    primaryCta: 'See Realtor Services',
    secondaryCta: 'Request Help',
    proof: {
      title: 'Realtors come to us when the deal keeps getting slowed down by construction questions',
      body: 'That usually means inspection items are still being argued through, listing-prep decisions are not getting made fast enough, or clients need clearer guidance before the file can move.',
      pain: 'Client pressure, listing delay, and too much back-and-forth',
      result: 'Faster next steps and better client confidence',
    },
  },
  contractors: {
    title: 'Contractors',
    shortTitle: 'Contractor',
    pain: 'Permit follow-up, inspections, paperwork, and office back-and-forth are eating too much time.',
    value: 'Southern Cities helps reduce paperwork drag so the job keeps moving with fewer delays and less chasing.',
    fit: 'Best fit when office work keeps pulling time away from production.',
    href: '/services/contractors',
    primaryCta: 'See Contractor Services',
    secondaryCta: 'Get Support Pricing',
    proof: {
      title: 'Contractors come to us when office work starts choking production time',
      body: 'That usually means permit follow-up is dragging, inspection coordination is eating time, or too much of the job still depends on someone chasing paperwork instead of moving work forward.',
      pain: 'Office drag, repeated follow-up, and slow inspection handling',
      result: 'Less paperwork drag and better follow-through on active jobs',
    },
  },
  developers: {
    title: 'Developers / Landowners',
    shortTitle: 'Developer / Landowner',
    pain: 'Too much still feels uncertain before bigger money moves.',
    value: 'Southern Cities helps reduce delay, confusion, and expensive drift before the project gets harder to fix.',
    fit: 'Best fit when too much is still loose to move forward casually.',
    href: '/services/developers-landowners',
    primaryCta: 'See Project Support',
    secondaryCta: 'Request Project Review',
    proof: {
      title: 'Developers and landowners come to us before uncertainty gets expensive',
      body: 'That usually means scope, permits, budgeting, or execution still feel too loose to keep moving casually. The goal is to tighten the job before bigger money gets committed in the wrong direction.',
      pain: 'Permit uncertainty, scope drift, and weak coordination',
      result: 'A better early read before bigger money got committed',
    },
  },
};

const roleOrder: RoleKey[] = ['homeowners', 'investors', 'realtors', 'contractors', 'developers'];

const trustPoints = [
  'North Carolina residential project help',
  'Permit, inspection, and active-job help',
  'Help for homeowners, investors, realtors, contractors, and developers',
  'Help before delay and confusion get more expensive',
];

const proofStrip = [
  {
    label: 'Delay',
    text: 'The job starts slipping when nobody is clearly carrying the next step.',
  },
  {
    label: 'Money',
    text: 'Confusion gets expensive when people keep spending before the path is settled.',
  },
  {
    label: 'Trust',
    text: 'Confidence drops fast when follow-through, inspections, and scope all start feeling loose.',
  },
];

const problemPanels: Record<ProblemKey, { label: string; summary: string; cost: string; next: string; href: string }> = {
  permits: {
    label: 'Permit problems',
    summary: 'Permit paperwork, corrections, and approvals start dragging the whole job when nobody is carrying them tightly.',
    cost: 'This usually creates delay, repeated follow-up, and wasted time before real work can move cleanly.',
    next: 'Start with permit help or a project review.',
    href: '/services/homeowners',
  },
  inspections: {
    label: 'Inspection setbacks',
    summary: 'Inspection failures and correction lists create confusion fast when nobody turns them into a clear next step.',
    cost: 'This usually causes delay, repeated trips, and more back-and-forth than the job can afford.',
    next: 'Start with a review or inspection-response type service.',
    href: '/services/realtors',
  },
  budget: {
    label: 'Budget uncertainty',
    summary: 'People keep hesitating or spending wrong when the budget is still too loose.',
    cost: 'This usually leads to bad approvals, bad hiring, or costly delay while nobody is comfortable moving forward.',
    next: 'Start with pricing or a budget review.',
    href: '/services/investors',
  },
  paperwork: {
    label: 'Paperwork overload',
    summary: 'Jobs start slowing down when paperwork, admin, and office follow-up are not being handled consistently.',
    cost: 'This usually steals time from production and creates missed follow-up, slower inspections, and more owner involvement.',
    next: 'Start with contractor support or active-job admin help.',
    href: '/services/contractors',
  },
  listing: {
    label: 'Listing prep delays',
    summary: 'Listing prep gets stuck when nobody can quickly answer what to fix, what to skip, and what it may cost.',
    cost: 'This usually creates seller hesitation, deal delay, and too much back-and-forth before the listing goes live.',
    next: 'Start with realtor services.',
    href: '/services/realtors',
  },
  followup: {
    label: 'Too much owner follow-up',
    summary: 'When the owner has to keep chasing updates, the job usually is not being handled tightly enough.',
    cost: 'This usually creates slow decisions, confusion, and more project drift than there should be.',
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
    title: 'Tell us what is holding the job up',
    body: 'Start with the role you are in and the problem that is slowing the project down right now.',
  },
  {
    title: 'We point you to the right kind of help',
    body: 'Southern Cities helps you sort out whether this is a straightforward service, a pricing request, or something that needs real review first.',
  },
  {
    title: 'You choose how to get started',
    body: 'You can buy the service, send details for pricing, or request a review when the job needs more scoping before anyone should quote it.',
  },
  {
    title: 'We help move the work forward',
    body: 'Once the next step is set, Southern Cities helps reduce delay, tighten follow-through, and keep the project from drifting further.',
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
                Help for residential projects that are getting delayed, confusing, or harder to manage
              </div>
              <h1 className="max-w-[11ch] text-[3rem] font-extrabold leading-[0.97] tracking-[-0.04em] text-white sm:text-[4rem] lg:text-[4.8rem]">
                Help for residential projects that are getting delayed, unclear, or more expensive to leave alone.
              </h1>
              <p className="mt-6 max-w-[40rem] text-[18px] leading-[1.7] text-white sm:text-[20px]">
                Southern Cities helps homeowners, investors, realtors, contractors, and developers move residential projects forward when permit problems, inspection setbacks, paperwork, and weak follow-through start costing time and money.
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
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Start with what is happening now</p>
              <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl leading-[1.08]">
                Tell us where the job is stuck, then go straight to the right next step.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-stone-700">
                You should not have to read the whole site to figure out what to click. Start with your role, the main problem, and the kind of help you need right now.
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
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">2. What is the main problem right now?</p>
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
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">3. What do you need right now?</p>
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
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Why people reach out</p>
              <p className="mt-4 text-xl font-extrabold tracking-tight text-white">Most people do not need more theory. They need the job to stop slipping.</p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/80">
                Southern Cities is built for the moment when delay, confusion, and weak follow-through are starting to cost real time, money, and confidence.
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

          <div className="mt-8 rounded-[28px] border border-stone-200 bg-stone-50 p-6 sm:p-7">
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

            <div className="mt-5 rounded-[24px] border border-stone-200 bg-white px-5 py-6 text-navy shadow-elev-1">
              <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">{activeRoleContent.proof.title}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-stone-700">{activeRoleContent.proof.body}</p>
                </div>
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">What was creating the problem</p>
                    <p className="mt-2 text-sm font-semibold text-navy">{activeRoleContent.proof.pain}</p>
                  </div>
                  <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">What changed once it was handled right</p>
                    <p className="mt-2 text-sm font-semibold text-navy">{activeRoleContent.proof.result}</p>
                  </div>
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

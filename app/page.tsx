'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import TrustStrip from '@/components/TrustStrip';

type RoleKey = 'homeowners' | 'investors' | 'realtors' | 'contractors' | 'developers';

const roleContent: Record<RoleKey, { title: string; href: string; summary: string }> = {
  homeowners: {
    title: 'Homeowners',
    href: '/services/homeowners',
    summary: 'Help with permits, budgets, and project setup before work starts — plus oversight once the job is moving.',
  },
  investors: {
    title: 'Investors',
    href: '/services/investors',
    summary: 'Budget reviews, contractor decisions, and project control so deals and rehabs move cleaner with fewer surprises.',
  },
  realtors: {
    title: 'Realtors',
    href: '/services/realtors',
    summary: 'Repair direction, listing prep, and clearer construction answers so deals do not stall on inspection items.',
  },
  contractors: {
    title: 'Contractors',
    href: '/services/contractors',
    summary: 'Permit help, inspection scheduling, and back-office support so your team can focus on the field.',
  },
  developers: {
    title: 'Developers / Landowners',
    href: '/services/developers-landowners',
    summary: 'Early project review, scope and budget direction, and execution support before bigger money moves.',
  },
};

const roleOrder: RoleKey[] = ['homeowners', 'investors', 'realtors', 'contractors', 'developers'];

type StageKey = 'before-spending' | 'need-pricing' | 'job-active';
type NeedKey = 'permits' | 'budget' | 'contractor' | 'coordination';

type NeedOption = {
  label: string;
  summary: string;
  nextStepLabel: string;
  warning: string;
};

type ProofProject = {
  title: string;
  summary: string;
  rank: string;
  before: string;
  after: string;
  notes: string[];
};

type StageOption = {
  label: string;
  title: string;
  summary: string;
};

const questionnaireNeeds: Record<NeedKey, NeedOption> = {
  permits: {
    label: 'Permit path',
    summary: 'Figure out permits, approvals, and what has to happen before work starts or keeps moving.',
    nextStepLabel: 'Permit review',
    warning: 'This usually gets expensive when work starts first and the permit questions get answered later.',
  },
  budget: {
    label: 'Budget and pricing',
    summary: 'Get a better read on cost before committing to the wrong number.',
    nextStepLabel: 'Budget review',
    warning: 'This usually gets expensive when numbers are approved before the scope is really pinned down.',
  },
  contractor: {
    label: 'Contractor fit',
    summary: 'Sort out who should do the work and what questions need answers first.',
    nextStepLabel: 'Contractor and scope review',
    warning: 'This usually gets expensive when the wrong crew gets hired for the wrong scope.',
  },
  coordination: {
    label: 'Active project help',
    summary: 'Get people, schedules, paperwork, and follow-through back on track on an active project.',
    nextStepLabel: 'Project review',
    warning: 'When everyone is moving but nobody is coordinating, the project usually gets more expensive than it should.',
  },
};

const questionnaireStages: Record<StageKey, StageOption> = {
  'before-spending': {
    label: 'Before spending more',
    title: 'Get help before you commit.',
    summary: 'This is the right time to get permits, budgets, scope, and contractor decisions cleaner before more money goes out.',
  },
  'need-pricing': {
    label: 'Before approving a number',
    title: 'Get a clearer read on price.',
    summary: 'This is the right time to get a more honest budget or repair number before you sign off on a quote or contractor.',
  },
  'job-active': {
    label: 'The project is already moving',
    title: 'Help moving the project forward.',
    summary: 'This is the right time to bring in coordination, oversight, or active project support so the work keeps moving cleanly.',
  },
};

const proofProjects: ProofProject[] = [
  {
    title: 'Tired exterior turned into clean curb appeal',
    summary: 'A worn-down home updated into a clean, market-ready exterior that buyers and neighbors actually notice.',
    rank: 'Featured project',
    before: '/gallery/white-house-before.jpg',
    after: '/gallery/white-house-after.jpg',
    notes: [
      'Cleaner curb appeal for selling, listing, or living in',
      'Stronger first impression for showings and walkthroughs',
      'Real residential project completed in North Carolina',
    ],
  },
  {
    title: 'Older home brought back to life',
    summary: 'An older home brought back to life with cleaner finishes and steady, accountable follow-through on the work.',
    rank: 'Recent project',
    before: '/gallery/farmhouse-before.jpg',
    after: '/gallery/farmhouse-after.jpg',
    notes: [
      'Visible exterior improvement that holds up in person',
      'Cleaner finished look, not just a quick cosmetic patch',
      'Real residential project completed in North Carolina',
    ],
  },
  {
    title: 'Dated exterior made move-in ready',
    summary: 'A dated property updated into a finished look that feels move-in ready and easier to market or live in.',
    rank: 'Recent project',
    before: '/gallery/red-house-before.jpg',
    after: '/gallery/red-house-after.jpg',
    notes: [
      'Cleaner finishes, better presentation, less drag on the property',
      'Strong example of finished residential work, not just promises',
      'Real residential project completed in North Carolina',
    ],
  },
];

const trustPoints = [
  'Real residential projects across North Carolina',
  'Clear pricing options you can actually buy from',
  'Help with permits, budgets, contractor decisions, and active projects',
  'Full contracting available when one company should run the whole project',
];

export default function Home() {
  const [activeRole, setActiveRole] = useState<RoleKey>('homeowners');
  const [activeNeed, setActiveNeed] = useState<NeedKey>('permits');
  const [activeStage, setActiveStage] = useState<StageKey>('before-spending');
  const [activeProofIndex, setActiveProofIndex] = useState(0);

  const activeRoleContent = roleContent[activeRole];
  const activeNeedContent = questionnaireNeeds[activeNeed];
  const activeStageContent = questionnaireStages[activeStage];

  const activeProofProject = proofProjects[activeProofIndex];

  const questionnaireResult = (() => {
    if (activeStage === 'need-pricing') {
      return {
        title: 'Recommended next step',
        eyebrow: 'Best next step',
        body: `${activeNeedContent.nextStepLabel} plus pricing review is the strongest place to start for ${activeRoleContent.title.toLowerCase()} before a number gets approved.`,
        cta: 'Get Service Pricing',
        href: '/services#buying-paths',
        secondaryCta: 'See Services',
        secondaryHref: activeRoleContent.href,
      };
    }

    if (activeStage === 'job-active') {
      return {
        title: 'Recommended next step',
        eyebrow: 'Best next step',
        body: `${activeNeedContent.nextStepLabel} plus project review is the fastest way to stop drift and get the job moving in the right direction again.`,
        cta: 'See Services',
        href: activeRoleContent.href,
        secondaryCta: 'Request Review',
        secondaryHref: '/#contact',
      };
    }

    return {
      title: 'Recommended next step',
      eyebrow: 'Best next step',
      body: `${activeNeedContent.nextStepLabel} is the cleanest first move before spending more money or moving too fast.`,
      cta: 'See Services',
      href: activeRoleContent.href,
      secondaryCta: 'Get Service Pricing',
      secondaryHref: '/services#buying-paths',
    };
  })();

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <SiteNav />

      <section className="relative overflow-hidden bg-navy-900 pt-28 pb-16 sm:pt-34 sm:pb-20">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#163061_0%,#10254c_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
        <div className="absolute -left-20 top-16 h-56 w-56 rounded-full bg-orange/15 blur-3xl" />
        <div className="absolute right-0 top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex">
          <Image
            src="/sc-construction-minimal.png"
            alt=""
            width={560}
            height={560}
            className="h-auto w-[30rem] opacity-[0.07]"
            priority
          />
        </div>

        <div className="relative z-10 container-pro">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)] lg:items-center">
            <div className="max-w-[46rem]">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Two ways to work with us · Licensed NC General Contractor #107724</p>
              <h1 className="mt-4 max-w-[18ch] text-[3rem] font-extrabold leading-[0.97] tracking-[-0.04em] text-white sm:text-[4rem] lg:text-[4.5rem]">
                Get the right help at the right stage of your project.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white sm:text-xl">
                Most clients want one of two things. Either a licensed general contractor running the whole project, or focused project support on a specific piece like permits, budgets, contractor fit, or oversight. Pick the one that fits where you are right now.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/services" className="inline-flex min-w-[260px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-[15px] font-semibold text-white shadow-glow-orange transition-all hover:bg-orange-500 hover:-translate-y-0.5">
                  See Pricing for Project Support
                </Link>
                <Link href="/services#full-contracting" className="inline-flex min-w-[260px] items-center justify-center rounded-full border border-white/25 bg-white/8 px-7 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-white/14">
                  Request Full Contracting
                </Link>
              </div>
            </div>

            <div className="rounded-[26px] border border-white/15 bg-white p-6 text-navy shadow-[0_24px_60px_rgba(6,18,43,0.28)] sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(6,18,43,0.34)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">How it works</p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-navy">Pick what fits where you are.</h2>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-navy">
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                  <span><strong>Project Support</strong> when you need help with a specific piece — permits, budgets, contractor fit, coordination, oversight, or recurring support.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                  <span><strong>Full Contracting</strong> when you want one licensed company running the whole project from start to finish.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                  <span>Project Support comes in three forms: <strong>Buy Now</strong>, <strong>Get Pricing or Request Review</strong>, or <strong>Subscribe Monthly</strong>.</span>
                </li>
              </ul>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <Link href="/services" className="inline-flex items-center justify-center rounded-full bg-orange px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-500">
                  See Pricing
                </Link>
                <Link href="/services#full-contracting" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                  See Full Contracting
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <div className="rounded-[24px] border border-white/15 bg-white/10 p-6 text-white backdrop-blur-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">Project Support</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-white">Help with a specific piece of the project.</h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white">
                <li><strong>Buy Now</strong> for fixed-scope support like assessments, consultations, and reviews.</li>
                <li><strong>Get Pricing or Request Review</strong> when scope or condition affects the price.</li>
                <li><strong>Subscribe Monthly</strong> for ongoing support across active projects.</li>
              </ul>
              <Link href="/services" className="mt-5 inline-flex items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500">
                See Pricing
              </Link>
            </div>
            <div className="rounded-[24px] border border-white/15 bg-white/10 p-6 text-white backdrop-blur-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">Full Contracting</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-white">One licensed company running the whole project.</h3>
              <p className="mt-3 text-sm leading-relaxed text-white">
                Renovations, rehabs, additions, and new builds with Southern Cities as the licensed GC of record. One company, accountable from start to finish.
              </p>
              <Link href="/services#full-contracting" className="mt-5 inline-flex items-center justify-center rounded-full border border-white/30 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                Request Full Contracting
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className="bg-white py-14 sm:py-16">
        <div className="container-pro">
          <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-elev-1 sm:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Why owners and investors hire us</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Get the right help at the right stage.</h2>
              <div className="mt-6 grid gap-4">
                <div className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">Licensed and accountable</p>
                  <p className="mt-2 text-sm font-semibold leading-[1.6] text-navy">NC GC License #107724, fully insured, with five years in business and 15+ completed projects. That credibility sits behind the support model, so clients can buy help with real construction backing.</p>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">Built for practical construction decisions</p>
                  <p className="mt-2 text-sm font-semibold leading-[1.6] text-navy">Southern Cities helps clients plan before spending more money, buy only the support they need, and bring in deeper execution only when the scope calls for it.</p>
                </div>
                <div className="rounded-2xl border border-orange/20 bg-orange/5 px-5 py-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">Statewide NC, Charlotte HQ</p>
                  <p className="mt-2 text-sm font-semibold leading-[1.6] text-navy">Headquartered in Charlotte and licensed to operate statewide. We take projects across NC for investors, homeowners, and operating partners.</p>
                </div>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/services" className="inline-flex items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500">
                  See Pricing
                </Link>
                <Link href={activeRoleContent.href} className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                  See Services
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-stone-200 bg-stone-50 p-6 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-2xl">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Recent projects</p>
                  <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">See the work, not just promises.</h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-stone-700">
                    Real residential projects across North Carolina. Cleaner finishes, better follow-through, and visible results you can see for yourself.
                  </p>
                </div>
                <Link href="/gallery" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                  See More Projects
                </Link>
              </div>

              <div className="mt-6 rounded-[24px] border border-stone-200 bg-white p-4 shadow-elev-1 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange">{activeProofProject.rank}</p>
                    <p className="mt-2 text-lg font-semibold text-navy">{activeProofProject.title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveProofIndex((prev) => (prev - 1 + proofProjects.length) % proofProjects.length)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 bg-white text-navy transition hover:border-orange hover:text-orange"
                      aria-label="Show previous project"
                    >
                      <span aria-hidden="true">←</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveProofIndex((prev) => (prev + 1) % proofProjects.length)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 bg-white text-navy transition hover:border-orange hover:text-orange"
                      aria-label="Show next project"
                    >
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>

                <div className="mt-5 overflow-hidden rounded-[24px] border border-stone-200 bg-stone-50">
                  <div className="grid min-h-[260px] grid-cols-2 gap-px bg-stone-200 sm:min-h-[320px] lg:min-h-[360px]">
                    <div className="min-w-0 bg-white">
                      <div className="relative h-full min-h-[220px] sm:min-h-[280px] lg:min-h-[320px]">
                        <Image src={activeProofProject.before} alt={`${activeProofProject.title} before`} fill className="object-cover" />
                      </div>
                      <div className="px-4 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange">Before</p>
                      </div>
                    </div>
                    <div className="min-w-0 bg-white">
                      <div className="relative h-full min-h-[220px] sm:min-h-[280px] lg:min-h-[320px]">
                        <Image src={activeProofProject.after} alt={`${activeProofProject.title} after`} fill className="object-cover" />
                      </div>
                      <div className="px-4 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange">After</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                  <p className="text-[15px] leading-relaxed text-stone-700">{activeProofProject.summary}</p>
                  <ul className="space-y-2 text-sm leading-[1.6] text-stone-700">
                    {activeProofProject.notes.map((note) => (
                      <li key={note} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  {proofProjects.map((project, index) => {
                    const active = index === activeProofIndex;
                    return (
                      <button
                        key={project.title}
                        type="button"
                        onClick={() => setActiveProofIndex(index)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                          active
                            ? 'bg-orange text-white shadow-glow-orange'
                            : 'border border-stone-300 bg-white text-navy hover:border-orange hover:text-orange'
                        }`}
                      >
                        Set {index + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[28px] border border-stone-200 bg-stone-50 p-6 sm:p-7">
            <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Start with a few quick questions</p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Tell us a little about your project.</h2>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-stone-700">
                  Pick the answers that fit best and we will point you to the right next step.
                </p>
              </div>
              <div className="rounded-[24px] border border-stone-200 bg-white px-5 py-5 shadow-elev-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">What you get here</p>
                <ul className="mt-4 space-y-3 text-sm leading-[1.6] text-stone-700">
                  {trustPoints.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr]">
              <div className="grid gap-5">
                <div className="rounded-[24px] border border-stone-200 bg-white p-5 shadow-elev-1">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">1. Who are you?</p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
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
                </div>

                <div className="rounded-[24px] border border-stone-200 bg-white p-5 shadow-elev-1">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">2. What do you want help with?</p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {(Object.entries(questionnaireNeeds) as [NeedKey, { label: string; summary: string }][]) .map(([key, need]) => {
                      const active = key === activeNeed;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setActiveNeed(key)}
                          className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                            active
                              ? 'bg-orange text-white shadow-glow-orange'
                              : 'border border-stone-300 bg-white text-navy hover:border-orange hover:text-orange'
                          }`}
                        >
                          {need.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-[24px] border border-stone-200 bg-white p-5 shadow-elev-1">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">3. How do you want to start?</p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {(Object.entries(questionnaireStages) as [StageKey, { label: string; title: string }][]) .map(([key, stage]) => {
                      const active = key === activeStage;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setActiveStage(key)}
                          className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                            active
                              ? 'bg-orange text-white shadow-glow-orange'
                              : 'border border-stone-300 bg-white text-navy hover:border-orange hover:text-orange'
                          }`}
                        >
                          {stage.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1 lg:sticky lg:top-24 lg:self-start">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">{questionnaireResult.eyebrow}</p>
                <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-navy">{activeStageContent.title}</h3>
                <p className="mt-3 text-sm font-semibold text-orange">For {activeRoleContent.title}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-stone-700">{questionnaireResult.body}</p>
                <div className="mt-4 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                  <p className="text-sm font-semibold text-navy">{activeNeedContent.summary}</p>
                </div>
                <div className="mt-4 rounded-2xl border border-orange/20 bg-orange/5 px-4 py-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">Why this comes first</p>
                  <p className="mt-2 text-sm font-semibold text-navy">{activeNeedContent.warning}</p>
                </div>
                <div className="mt-4 rounded-2xl border border-stone-200 bg-white px-4 py-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">What happens next</p>
                  <p className="mt-2 text-sm font-semibold text-navy">{activeStageContent.summary}</p>
                </div>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href={questionnaireResult.href} className="inline-flex items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500">
                    {questionnaireResult.cta}
                  </Link>
                  <Link href={questionnaireResult.secondaryHref} className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                    {questionnaireResult.secondaryCta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="full-contracting" className="bg-navy-950 py-14 sm:py-16 text-white">
        <div className="container-pro grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl leading-[1.08]">
              Need full contracting? Southern Cities can take the project further.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/88">
              Some projects need more than planning, permit help, pricing review, or oversight. When the scope calls for it, Southern Cities can serve as the licensed GC for rehabs, renovations, additions, new builds, and larger residential scopes across North Carolina.
            </p>
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
              <Link href="/#contact" className="inline-flex items-center justify-center rounded-full bg-orange px-8 py-4 text-[15px] font-semibold text-white transition-all hover:bg-orange-500">
                Request Full Contracting Review
              </Link>
              <Link href="/services" className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-[15px] font-medium text-white transition-all hover:border-orange hover:text-orange-200">
                Start with Project Support
              </Link>
            </div>
          </div>
          <div className="rounded-[28px] border border-white/12 bg-white/[0.05] p-6 sm:p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">When to bring us in deeper</p>
            <div className="mt-5 space-y-4 text-sm leading-[1.6] text-white/88">
              <p><strong className="text-white">Rehabs and flips:</strong> When the project needs licensed execution instead of just planning or review.</p>
              <p><strong className="text-white">Homeowner work:</strong> When renovations, additions, or exterior scopes need a GC of record.</p>
              <p><strong className="text-white">Larger residential scopes:</strong> When support work has clarified the next step and the project now needs full construction delivery.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white py-14 sm:py-16">
        <div className="container-pro grid gap-8 lg:grid-cols-[1fr_0.92fr] lg:items-start">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Tell us about your project</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-700">
              Send the address, scope, and timeline. We will respond from <a href="mailto:orders@southerncitiesconstruction.com" className="text-orange underline">orders@southerncitiesconstruction.com</a> with a clear next step on pricing, project support, or full contracting. If we are not the right fit, we will let you know.
            </p>
            <div className="mt-6 rounded-[24px] border border-stone-200 bg-stone-50 px-5 py-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">What people buy from us</p>
              <ul className="mt-4 space-y-3 text-sm leading-[1.6] text-stone-700">
                <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" /><span>Permit path review, budget and scope review, contractor fit consultation, and investor review before bigger decisions get more expensive.</span></li>
                <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" /><span>Permit administration, draw review support, project oversight, and recurring support once the work is active.</span></li>
                <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" /><span>Full licensed GC support for rehabs, renovations, additions, and larger residential scopes when the project needs that level of execution.</span></li>
              </ul>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="tel:+19804737249" className="inline-flex items-center justify-center rounded-full bg-orange px-7 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-orange-500">
                Call (980) 473-7249
              </a>
              <a href="mailto:orders@southerncitiesconstruction.com" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-7 py-3.5 text-[15px] font-semibold text-navy transition hover:border-orange hover:text-orange">
                Email orders@southerncitiesconstruction.com
              </a>
            </div>
          </div>
          <div className="rounded-[24px] border border-stone-200 bg-white px-5 py-5 shadow-elev-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">Company facts</p>
            <ul className="mt-4 space-y-3 text-sm leading-[1.6] text-stone-700">
              <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" /><span>NC GC License #107724 — verify on the <a href="https://portal.nclbgc.org/Public/Search" target="_blank" rel="noopener noreferrer" className="underline hover:text-orange">NCLBGC public portal</a>.</span></li>
              <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" /><span>5 years in business, 15+ projects completed.</span></li>
              <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" /><span>Headquartered in Charlotte, NC. We work statewide.</span></li>
              <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" /><span>Project support for planning, permits, budgets, contractor fit, coordination, and oversight — plus full contracting when one company should run the whole project.</span></li>
            </ul>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

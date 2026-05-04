'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import TrustStrip from '@/components/TrustStrip';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';

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

type StageKey = 'before-you-spend' | 'getting-started' | 'keeping-work-moving';
type NeedKey = 'permits' | 'budget' | 'contractor' | 'coordination';

type NeedOption = {
  label: string;
  summary: string;
  nextStepLabel: string;
  warning: string;
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
  'before-you-spend': {
    label: 'Before you spend',
    title: 'Figure out the number, the scope, and the risk before more money goes out.',
    summary: 'Use this stage when you are trying to understand cost, permits, scope, or contractor fit before approving the wrong plan or budget.',
  },
  'getting-started': {
    label: 'Getting the project started',
    title: 'Get the project set up cleanly before early mistakes turn into delay.',
    summary: 'Use this stage when you are trying to start the project the right way, line up permits and next steps, and avoid confusion at the beginning.',
  },
  'keeping-work-moving': {
    label: 'Keeping work moving',
    title: 'Keep the job moving without drift, delays, or expensive confusion.',
    summary: 'Use this stage when work is already active and you need coordination, oversight, or project control to stop things from slipping.',
  },
};

const trustPoints = [
  'Fixed-price project reviews before you commit',
  'Clear pricing or pricing after review, no guessing',
  'Support at any stage of your project',
  'Full contracting when the scope actually calls for it',
];

export default function Home() {
  const [activeRole, setActiveRole] = useState<RoleKey>('homeowners');
  const [activeNeed, setActiveNeed] = useState<NeedKey>('permits');
  const [activeStage, setActiveStage] = useState<StageKey>('before-you-spend');
  const activeRoleContent = roleContent[activeRole];
  const activeNeedContent = questionnaireNeeds[activeNeed];
  const activeStageContent = questionnaireStages[activeStage];

  const questionnaireResult = (() => {
    if (activeStage === 'before-you-spend') {
      return {
        title: 'Recommended next step',
        eyebrow: 'Best next step',
        body: `${activeNeedContent.nextStepLabel} plus pricing review is the strongest place to start for ${activeRoleContent.title.toLowerCase()} when you are trying to understand cost, avoid bad assumptions, and make a cleaner decision before you spend.`,
        cta: 'Get Service Pricing',
        href: '/services#buying-paths',
        secondaryCta: 'See Services',
        secondaryHref: activeRoleContent.href,
      };
    }

    if (activeStage === 'keeping-work-moving') {
      return {
        title: 'Recommended next step',
        eyebrow: 'Best next step',
        body: `${activeNeedContent.nextStepLabel} plus project review is the fastest way to stop drift, keep work moving, and avoid the confusion that usually turns into delay and added cost.`,
        cta: 'See Services',
        href: activeRoleContent.href,
        secondaryCta: 'Request Review',
        secondaryHref: '/#contact',
      };
    }

    return {
      title: 'Recommended next step',
      eyebrow: 'Best next step',
      body: `${activeNeedContent.nextStepLabel} is the cleanest first move when you are getting the project started and want to avoid mistakes, delays, and confusion early.`,
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
        <div
          className="absolute inset-0 motion-safe:animate-gradient-pan bg-[linear-gradient(125deg,#163061_0%,#10254c_50%,#143367_100%)]"
          style={{ backgroundSize: '180% 180%' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(250,140,65,0.45),rgba(255,255,255,0.25),transparent)] motion-safe:animate-hairline-pan"
          style={{ backgroundSize: '200% 100%' }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute -left-20 top-16 h-56 w-56 rounded-full bg-orange/20 blur-3xl motion-safe:animate-aurora-a" aria-hidden="true" />
        <div className="pointer-events-none absolute right-0 top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl motion-safe:animate-aurora-b" aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/3 bottom-0 h-72 w-72 -translate-x-1/2 translate-y-1/3 rounded-full bg-orange/10 blur-3xl motion-safe:animate-aurora-c" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] items-center justify-center lg:flex" aria-hidden="true">
          <div className="relative flex h-full w-full items-center justify-center">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,48,97,0)_0%,rgba(22,48,97,0.18)_28%,rgba(22,48,97,0.38)_100%)]" />
            <Image
              src="/sc-construction-minimal.png"
              alt=""
              width={640}
              height={640}
              className="h-auto w-[30rem] translate-x-20 opacity-[0.028] mix-blend-screen motion-safe:animate-pulse-subtle"
              priority
            />
          </div>
        </div>

        <div className="relative z-10 container-pro">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)] lg:items-center">
            <div className="relative z-10 max-w-[46rem]">
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-orange motion-safe:animate-hero-rise">
                <span className="block h-px w-8 origin-left bg-orange/80 motion-safe:animate-rule-grow" aria-hidden="true" />
                <span>Licensed NC General Contractor #107724</span>
              </p>
              <h1
                className="mt-4 max-w-[11ch] text-[3rem] font-extrabold leading-[0.97] tracking-[-0.04em] text-white sm:text-[4rem] lg:text-[4.5rem] motion-safe:animate-hero-rise"
                style={{ animationDelay: '0.15s' }}
              >
                Plan it right. Run it better.
              </h1>
              <p
                className="mt-6 max-w-3xl rounded-2xl bg-navy-900/30 px-0 py-0 text-lg leading-relaxed text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:text-xl motion-safe:animate-hero-rise"
                style={{ animationDelay: '0.35s' }}
              >
                Southern Cities helps residential investors, owners, and project teams get the right construction support before money gets wasted, work gets messy, or execution starts drifting.
              </p>

              <div
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap motion-safe:animate-hero-rise"
                style={{ animationDelay: '0.5s' }}
              >
                <Link href="#two-paths" className="inline-flex min-w-[240px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-[15px] font-semibold text-white shadow-glow-orange transition-all hover:bg-orange-500 hover:-translate-y-0.5 motion-safe:animate-glow-pulse">
                  See the Two Paths
                </Link>
                <Link href="/contracting" className="inline-flex min-w-[240px] items-center justify-center rounded-full border border-white/25 bg-white/8 px-7 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-white/14 hover:-translate-y-0.5">
                  Full Contracting
                </Link>
              </div>
            </div>

            <div
              className="relative z-10 rounded-[26px] border border-white/15 bg-white p-6 text-navy shadow-[0_24px_60px_rgba(6,18,43,0.28)] sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(6,18,43,0.34)] motion-safe:animate-hero-rise"
              style={{ animationDelay: '0.65s' }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Simple first decision</p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-navy">Do you need help planning the project or running the project?</h2>
              <p className="mt-4 text-sm leading-relaxed text-navy">
                If you need help before you buy, start, or commit more money, start with planning. If the work needs to move, stay organized, or get managed, start with project support under execution.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <Link href="#two-paths" className="inline-flex items-center justify-center rounded-full bg-orange px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-500">
                  Choose Your Path
                </Link>
                <Link href="/contracting" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                  See Full Contracting
                </Link>
              </div>
            </div>
          </div>

          <div id="two-paths" className="mt-10 grid gap-4 lg:grid-cols-2">
            <div
              className="rounded-[24px] border border-white/15 bg-white/10 p-6 text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.13] hover:border-white/25 motion-safe:animate-hero-rise"
              style={{ animationDelay: '0.8s' }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">Plan the Project</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-white">Before you buy, start, or commit more money.</h3>
              <p className="mt-3 text-sm leading-relaxed text-white">
                Use this path when you are trying to figure out cost, scope, permits, contractor fit, or what needs to happen before the project moves forward.
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white">
                <li>Deal and Scope Review</li>
                <li>Budget Review</li>
                <li>Permit and Compliance Review</li>
                <li>Contractor Fit Consultation</li>
                <li>Lender-Ready Scope Support</li>
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-orange-100">
                Avoid wasted money, bad assumptions, and early decisions that create expensive cleanup later.
              </p>
              <Link href="/services/investors" className="mt-5 inline-flex items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500 hover:-translate-y-0.5">
                Plan Before You Spend
              </Link>
            </div>
            <div
              className="rounded-[24px] border border-white/15 bg-white/10 p-6 text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.13] hover:border-white/25 motion-safe:animate-hero-rise"
              style={{ animationDelay: '0.95s' }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">Run the Project</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-white">When the work needs to move, stay organized, or get managed.</h3>
              <p className="mt-3 text-sm leading-relaxed text-white">
                Use this path when the project is active and you need real execution support, coordination, oversight, or full contracting to keep things moving cleanly.
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white">
                <li>Full Contracting</li>
                <li>Owner-Controlled Construction</li>
                <li>Permit Coordination</li>
                <li>Draw Review</li>
                <li>Project Coordination</li>
                <li>Ongoing Support Plans</li>
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-orange-100">
                Avoid drift, delays, missed handoffs, and the confusion that usually shows up once work is already underway.
              </p>
              <Link href="/contracting" className="mt-5 inline-flex items-center justify-center rounded-full border border-white/30 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15 hover:-translate-y-0.5">
                Get Project Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className="bg-white py-14 sm:py-16">
        <div className="container-pro">
          <TestimonialsCarousel />
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="container-pro">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Why this works</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Buy only the construction support your project actually needs.</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {trustPoints.map((point) => (
              <div key={point} className="rounded-[24px] border border-stone-200 bg-stone-50 px-5 py-5 text-center shadow-elev-1">
                <p className="text-sm font-semibold leading-[1.6] text-navy">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-14 sm:py-16">
        <div className="container-pro">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Who this is for</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Built first for investors and serious residential projects.</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <div className="rounded-[24px] border border-stone-200 bg-white px-5 py-5 text-center shadow-elev-1">
              <p className="text-lg font-semibold text-navy">Investors</p>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">For people buying property where the numbers have to work.</p>
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-white px-5 py-5 text-center shadow-elev-1">
              <p className="text-lg font-semibold text-navy">Homeowners</p>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">For owners planning a renovation or new build.</p>
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-white px-5 py-5 text-center shadow-elev-1">
              <p className="text-lg font-semibold text-navy">Realtors</p>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">For agents who need fast, reliable construction insight on a deal.</p>
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-white px-5 py-5 text-center shadow-elev-1">
              <p className="text-lg font-semibold text-navy">Contractors</p>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">For builders who need extra coordination or oversight support.</p>
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-white px-5 py-5 text-center shadow-elev-1">
              <p className="text-lg font-semibold text-navy">Developers / Landowners</p>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">For owners moving land or projects toward construction.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="container-pro">
          <div className="rounded-[28px] border border-stone-200 bg-stone-50 p-6 sm:p-7">
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
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">3. Where are you in the decision?</p>
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
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">What you are trying to figure out</p>
                  <p className="mt-2 text-sm font-semibold text-navy">{activeNeedContent.summary}</p>
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

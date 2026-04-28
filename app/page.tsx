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
    summary: 'Permit questions, budget checks, and project setup before work starts moving in the wrong direction.',
  },
  investors: {
    title: 'Investors',
    href: '/services/investors',
    summary: 'Budget review, contractor fit, and project control before drift turns into lost time and money.',
  },
  realtors: {
    title: 'Realtors',
    href: '/services/realtors',
    summary: 'Listing prep, repair decisions, and cleaner coordination when deals start leaning on construction answers.',
  },
  contractors: {
    title: 'Contractors',
    href: '/services/contractors',
    summary: 'Permit handling, inspections, and office support when the field needs tighter backup.',
  },
  developers: {
    title: 'Developers / Landowners',
    href: '/services/developers-landowners',
    summary: 'Planning, permit review, and execution support before bigger money moves on shaky footing.',
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
    label: 'Project coordination',
    summary: 'Get people, schedules, paperwork, and follow-through back in line.',
    nextStepLabel: 'Project review',
    warning: 'This usually gets expensive when everyone is moving but nobody is lined up.',
  },
};

const questionnaireStages: Record<StageKey, StageOption> = {
  'before-spending': {
    label: 'Before spending more money',
    title: 'Start before the wrong call gets expensive.',
    summary: 'This is the right time to tighten up scope, permits, pricing, and contractor decisions before money goes out the door.',
  },
  'need-pricing': {
    label: 'Before committing to a number',
    title: 'Get pricing grounded in real inputs.',
    summary: 'This is the right time to clean up assumptions before a quote, budget, or repair number gets approved.',
  },
  'job-active': {
    label: 'Once the job is already active',
    title: 'Get the project back under control.',
    summary: 'This is the right time to stop drift, clean up communication, and fix what is already slipping.',
  },
};

const proofProjects = [
  {
    title: 'Older home exterior brought back to life',
    before: '/project-real-6.jpg',
    after: '/project-real-5.jpg',
    notes: ['Yellow house before, white house after', 'Useful for scope, finish, and rehab confidence', 'Shows a stronger jump from worn condition to completed exterior work'],
  },
  {
    title: 'Full exterior renovation in NC',
    before: '/before-4.jpg',
    after: '/after-4.jpg',
    notes: ['Red house before and after set', 'Useful for seller, listing, and hold decisions', 'Shows real visible change, not just abstract advice'],
  },
];

const trustPoints = [
  'Real project photos on the site',
  'Clear service options instead of vague contractor language',
  'Support for planning, permits, budgets, draw issues, and active jobs',
  'Review-first options when the work is too important to price casually',
];

export default function Home() {
  const [activeRole, setActiveRole] = useState<RoleKey>('homeowners');
  const [activeNeed, setActiveNeed] = useState<NeedKey>('permits');
  const [activeStage, setActiveStage] = useState<StageKey>('before-spending');

  const activeRoleContent = roleContent[activeRole];
  const activeNeedContent = questionnaireNeeds[activeNeed];
  const activeStageContent = questionnaireStages[activeStage];

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
        cta: 'Request a Project Review',
        href: '/services#contact',
        secondaryCta: 'See Services',
        secondaryHref: activeRoleContent.href,
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
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Licensed NC General Contractor · #107724</p>
              <h1 className="mt-4 max-w-[18ch] text-[3rem] font-extrabold leading-[0.97] tracking-[-0.04em] text-white sm:text-[4rem] lg:text-[4.5rem]">
                Full-service general contracting for North Carolina rehabs, renovations, and investor projects.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white sm:text-xl">
                Southern Cities Construction is a Charlotte-headquartered, statewide NC general contractor. Five years in business, 15+ projects completed, and a typical investor rehab turnaround of 1 to 3 months.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/services/investors" className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-[15px] font-semibold text-white shadow-glow-orange transition-all hover:bg-orange-500 hover:-translate-y-0.5">
                  Investor Rehabs & Flips
                </Link>
                <Link href="/services/homeowners" className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/20 bg-white/8 px-7 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-white/14">
                  Homeowner Renovations
                </Link>
                <Link href="/#contact" className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/20 bg-transparent px-7 py-3.5 text-[15px] font-semibold text-white transition-all hover:border-orange hover:text-orange-200">
                  Request a Quote
                </Link>
              </div>
            </div>

            <div className="rounded-[26px] border border-white/15 bg-white p-6 text-navy shadow-[0_24px_60px_rgba(6,18,43,0.28)] sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(6,18,43,0.34)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What we do</p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-navy">Three lanes of work, all licensed and managed in-house.</h2>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-navy">
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                  <span><strong>Full general contracting</strong> for renovations, additions, and rehabs across NC.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                  <span><strong>Permit administration</strong> — applications, plan review responses, and inspections handled for you.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                  <span><strong>Investor rehab management</strong> — our strongest channel, with typical 1–3 month turnaround.</span>
                </li>
              </ul>
              <div className="mt-5">
                <Link href="/services" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                  See All Services
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <div className="rounded-[24px] border border-white/15 bg-white/10 p-5 text-white backdrop-blur-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">Investor rehabs &amp; flips</p>
              <p className="mt-2 text-sm leading-relaxed text-white">
                Our strongest channel. Scope, permits, and execution for SFR rehabs, typically completed in 1 to 3 months.
              </p>
            </div>
            <div className="rounded-[24px] border border-white/15 bg-white/10 p-5 text-white backdrop-blur-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">Homeowner renovations</p>
              <p className="mt-2 text-sm leading-relaxed text-white">
                Full GC for owner-occupied renovations, additions, and exterior work — handled under one license.
              </p>
            </div>
            <div className="rounded-[24px] border border-white/15 bg-white/10 p-5 text-white backdrop-blur-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">Permit administration</p>
              <p className="mt-2 text-sm leading-relaxed text-white">
                Applications, plan review responses, and inspection coordination across NC jurisdictions.
              </p>
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
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">One licensed GC for the full job, not a string of subs.</h2>
              <div className="mt-6 grid gap-4">
                <div className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">Licensed and accountable</p>
                  <p className="mt-2 text-sm font-semibold leading-[1.6] text-navy">NC GC License #107724. Five years of operating history and 15+ completed projects across the state, run under one license and one point of accountability.</p>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">Built for investor pace</p>
                  <p className="mt-2 text-sm font-semibold leading-[1.6] text-navy">Investor rehabs and flips are our strongest channel. Typical scope completes in 1 to 3 months, with permit administration handled in-house so the schedule does not stall on paperwork.</p>
                </div>
                <div className="rounded-2xl border border-orange/20 bg-orange/5 px-5 py-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">Statewide NC, Charlotte HQ</p>
                  <p className="mt-2 text-sm font-semibold leading-[1.6] text-navy">Headquartered in Charlotte and licensed to operate statewide. We take projects across NC for investors, homeowners, and operating partners.</p>
                </div>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/#contact" className="inline-flex items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500">
                  Request a Quote
                </Link>
                <Link href={activeRoleContent.href} className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                  See Services
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-stone-200 bg-stone-50 p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Recent work</p>
                  <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Real project photos.</h2>
                </div>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-3">
                {proofProjects.map((project) => (
                  <div key={project.title} className="rounded-[24px] border border-stone-200 bg-white p-4 shadow-elev-1">
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      <div className="overflow-hidden rounded-[18px] border border-stone-200 bg-white">
                        <div className="relative aspect-[4/3]">
                          <Image src={project.before} alt={`${project.title} before`} fill className="object-cover" />
                        </div>
                        <div className="px-4 py-3">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange">Before</p>
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-[18px] border border-stone-200 bg-white">
                        <div className="relative aspect-[4/3]">
                          <Image src={project.after} alt={`${project.title} after`} fill className="object-cover" />
                        </div>
                        <div className="px-4 py-3">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange">After</p>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-[15px] font-semibold leading-relaxed text-navy">{project.title}</p>
                    <ul className="mt-3 space-y-2 text-sm leading-[1.6] text-stone-700">
                      {project.notes.map((note) => (
                        <li key={note} className="flex items-start gap-2.5">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[28px] border border-stone-200 bg-stone-50 p-6 sm:p-7">
            <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Start with a few quick questions</p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Tell us where you are in the project.</h2>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-stone-700">
                  Pick the answers that fit best and we’ll point you to the strongest next step.
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
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">2. What do you want clearer?</p>
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

      <section className="bg-navy-950 py-14 sm:py-16 text-white">
        <div className="container-pro grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl leading-[1.08]">
              Have a project? Send us the details.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/88">
              Tell us the property, the scope, and your timeline. If it fits our lane — investor rehab, renovation, or permit-administration project in NC — we will respond with a real path to a quote.
            </p>
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
              <Link href="/#contact" className="inline-flex items-center justify-center rounded-full bg-orange px-8 py-4 text-[15px] font-semibold text-white transition-all hover:bg-orange-500">
                Request a Quote
              </Link>
              <Link href="/services/investors" className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-[15px] font-medium text-white transition-all hover:border-orange hover:text-orange-200">
                Investor Services
              </Link>
            </div>
          </div>
          <div className="rounded-[28px] border border-white/12 bg-white/[0.05] p-6 sm:p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Who we work with</p>
            <div className="mt-5 space-y-4 text-sm leading-[1.6] text-white/88">
              <p><strong className="text-white">Investors:</strong> Single-family rehabs and flips, statewide NC. Typical turnaround of 1 to 3 months.</p>
              <p><strong className="text-white">Homeowners:</strong> Renovations, additions, and exterior work as your licensed GC of record.</p>
              <p><strong className="text-white">Industry partners:</strong> Realtors, trade contractors, and developers who need GC-side execution support — see <Link href="/services/industry-partners" className="underline hover:text-orange">industry partners</Link>.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white py-14 sm:py-16">
        <div className="container-pro grid gap-8 lg:grid-cols-[1fr_0.92fr] lg:items-start">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Request a Quote</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-700">
              Send the property address, scope, and timeline. We respond from <a href="mailto:orders@southerncitiesconstruction.com" className="text-orange underline">orders@southerncitiesconstruction.com</a> with a real path to a quote — or a fast no if the project is outside our lane.
            </p>
            <div className="mt-6 rounded-[24px] border border-stone-200 bg-stone-50 px-5 py-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">What we typically take on</p>
              <ul className="mt-4 space-y-3 text-sm leading-[1.6] text-stone-700">
                <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" /><span>Single-family investor rehabs and flips across NC, typically 1 to 3 months in scope.</span></li>
                <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" /><span>Homeowner renovations, additions, and exterior work under our GC license.</span></li>
                <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" /><span>Permit administration on projects where the owner already has a builder but needs the paperwork run.</span></li>
              </ul>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="tel:+12523396146" className="inline-flex items-center justify-center rounded-full bg-orange px-7 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-orange-500">
                Call (252) 339-6146
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
              <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" /><span>Services: full general contracting, permit administration, investor rehab management.</span></li>
            </ul>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

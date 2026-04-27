'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

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

const questionnaireNeeds: Record<NeedKey, { label: string; summary: string }> = {
  permits: {
    label: 'Permit path',
    summary: 'Figure out permits, approvals, and what has to happen before work starts or keeps moving.',
  },
  budget: {
    label: 'Budget and pricing',
    summary: 'Get a better read on cost before committing to the wrong number.',
  },
  contractor: {
    label: 'Contractor fit',
    summary: 'Sort out who should do the work and what questions need answers first.',
  },
  coordination: {
    label: 'Project coordination',
    summary: 'Get people, schedules, paperwork, and follow-through back in line.',
  },
};

const questionnaireStages: Record<StageKey, { label: string; title: string }> = {
  'before-spending': {
    label: 'Before spending more money',
    title: 'Start before the wrong call gets expensive.',
  },
  'need-pricing': {
    label: 'Before committing to a number',
    title: 'Get pricing grounded in real inputs.',
  },
  'job-active': {
    label: 'Once the job is already active',
    title: 'Get the project back under control.',
  },
};

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
        body: `${activeNeedContent.label} plus pricing review is probably the best place to start for ${activeRoleContent.title.toLowerCase()}.`,
        cta: 'Get Service Pricing',
        href: '/services#buying-paths',
      };
    }

    if (activeStage === 'job-active') {
      return {
        title: 'Recommended next step',
        body: `${activeNeedContent.label} plus project review is the fastest way to stop drift and get the job moving in the right direction again.`,
        cta: 'Request a Project Review',
        href: '/services#contact',
      };
    }

    return {
      title: 'Recommended next step',
      body: `${activeNeedContent.label} review is the cleanest first step before spending more money or moving too fast.`,
      cta: 'See Services',
      href: activeRoleContent.href,
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

        <div className="relative z-10 container-pro">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)] lg:items-center">
            <div className="max-w-[46rem]">
              <h1 className="max-w-[12ch] text-[3rem] font-extrabold leading-[0.97] tracking-[-0.04em] text-white sm:text-[4rem] lg:text-[4.8rem]">
                Where schedules, crews, and systems actually line up.
              </h1>

              <div className="mt-8">
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
                  Get Started
                </Link>
              </div>
            </div>

            <div className="rounded-[26px] border border-white/15 bg-white p-6 text-navy shadow-[0_24px_60px_rgba(6,18,43,0.28)] sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(6,18,43,0.34)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Best fit right now</p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-navy">Pick your role. We’ll show the right services.</h2>
              <div className="mt-5 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                <p className="text-sm font-semibold text-navy">{activeRoleContent.summary}</p>
              </div>
              <div className="mt-5">
                <Link href={activeRoleContent.href} className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                  See Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="container-pro">
          <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-elev-1 sm:p-7">
              <div className="mt-5 rounded-[24px] border border-stone-200 bg-stone-50 px-5 py-6 text-navy">
                <div className="mt-0 grid gap-3">
                  <div className="rounded-2xl border border-stone-200 bg-white px-4 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">The problem</p>
                    <p className="mt-2 text-sm font-semibold text-navy">People, permits, schedules, and paperwork stop lining up. Small misses turn into delay, cost, and rework.</p>
                  </div>
                  <div className="rounded-2xl border border-stone-200 bg-white px-4 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">What changes</p>
                    <p className="mt-2 text-sm font-semibold text-navy">Coordination tightens. Permits, inspections, crews, and communication actually line up, and the project stays on schedule.</p>
                  </div>
                </div>
                <div className="mt-5">
                  <Link href={activeRoleContent.href} className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                    See Services
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-stone-200 bg-stone-50 p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Recent work</p>
                  <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">See the work.</h2>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="overflow-hidden rounded-[24px] border border-stone-200 bg-white shadow-elev-1">
                  <div className="relative aspect-[4/3]">
                    <Image src="/before-3.jpg" alt="Before project condition" fill className="object-cover" />
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange">Before</p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[24px] border border-stone-200 bg-white shadow-elev-1">
                  <div className="relative aspect-[4/3]">
                    <Image src="/after-4.jpg" alt="After project result" fill className="object-cover" />
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange">After</p>
                  </div>
                </div>
              </div>
              {/* TODO(homepage-audit): replace placeholder project label with the real job name and location. */}
              <p className="mt-5 text-[15px] font-semibold leading-relaxed text-navy">[PROJECT LABEL PLACEHOLDER — e.g., “Kitchen renovation, Charlotte NC”]</p>
            </div>
          </div>

          <div className="mt-8 rounded-[28px] border border-stone-200 bg-stone-50 p-6 sm:p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Start with a few quick questions</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Tell us where you are in the project.</h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-stone-700">
              Pick the answers that fit best and we’ll point you to the strongest next step.
            </p>

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
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">{questionnaireResult.title}</p>
                <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-navy">{activeStageContent.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-stone-700">{questionnaireResult.body}</p>
                <div className="mt-4 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                  <p className="text-sm font-semibold text-navy">{activeNeedContent.summary}</p>
                </div>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href={questionnaireResult.href} className="inline-flex items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500">
                    {questionnaireResult.cta}
                  </Link>
                  <Link href={activeRoleContent.href} className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                    See {activeRoleContent.title} Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-14 sm:py-16 text-white">
        <div className="container-pro max-w-3xl">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl leading-[1.08]">
            Not sure where to start?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/88">
            Pick your role or request a project review.
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

      <section id="contact" className="bg-white py-14 sm:py-16">
        <div className="container-pro max-w-3xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Request a Project Review</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-stone-700">
            Tell us what kind of project you are dealing with and we’ll point you to the right next step.
          </p>
          <div className="mt-6">
            <Link href="/services#contact" className="inline-flex items-center justify-center rounded-full bg-orange px-7 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-orange-500">
              Request a Project Review
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

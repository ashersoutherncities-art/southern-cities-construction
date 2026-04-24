'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

type RoleKey = 'homeowners' | 'investors' | 'realtors' | 'contractors' | 'developers';

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

export default function Home() {
  const [activeRole, setActiveRole] = useState<RoleKey>('homeowners');

  const activeRoleContent = roleContent[activeRole];

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

      <section className="bg-white py-14 sm:py-16">
        <div className="container-pro">
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

      <section className="bg-navy-950 py-14 sm:py-16 text-white">
        <div className="container-pro max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Start here</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl leading-[1.08]">
            Not sure where to start?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/88">
            Pick your role or request a project review. We&apos;ll point you to the right next step.
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

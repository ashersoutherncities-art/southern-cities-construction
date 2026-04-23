'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

const whoWeHelp = [
  {
    title: 'Homeowners',
    pain: 'For homeowners dealing with a project that keeps getting more expensive, more confusing, or harder to trust.',
    value: 'Southern Cities helps cut permit confusion, inspection setbacks, and costly wrong moves before they get bigger.',
    cta: 'See Homeowner Services',
    href: '/services#homeowners',
  },
  {
    title: 'Investors',
    pain: 'For investors trying to keep a rehab, turn, or active job from losing time, money, or momentum.',
    value: 'Southern Cities helps reduce delay, bad handoffs, and budget surprises before they turn into bigger losses.',
    cta: 'See Investor Services',
    href: '/services#investors',
  },
  {
    title: 'Realtors',
    pain: 'For realtors trying to keep repair items, listing prep, and inspection questions from slowing the deal down.',
    value: 'Southern Cities helps turn construction questions into clearer next steps, faster answers, and better follow-through.',
    cta: 'See Realtor Services',
    href: '/services#realtors',
  },
  {
    title: 'Contractors',
    pain: 'For contractors losing too much time to permit follow-up, inspections, paperwork, and office back-and-forth.',
    value: 'Southern Cities helps reduce paperwork drag so the job keeps moving with fewer delays and less chasing.',
    cta: 'See Contractor Services',
    href: '/services#contractors',
  },
  {
    title: 'Developers / Landowners',
    pain: 'For residential projects where too much still feels uncertain before bigger money moves.',
    value: 'Southern Cities helps reduce delay, confusion, and expensive drift before the project gets harder to fix.',
    cta: 'See Project Support',
    href: '/services#developers-landowners',
  },
];

const problemList = [
  'permit paperwork is slowing the job down',
  'inspection issues are creating confusion',
  'the scope is active but the next step is not clear',
  'subcontractor coordination is loose',
  'listing prep has turned into a scramble',
  'investor turn work is losing momentum',
  'nobody is clearly owning the path forward',
];

const trustPoints = [
  'North Carolina residential project help',
  'Permit, inspection, and active-job help',
  'Help for homeowners, investors, realtors, contractors, and developers',
  'Help before delay and confusion get more expensive',
];

const proofCategories = [
  {
    title: 'Permit path gets clearer',
    body: 'Use real examples here of approvals, corrections, or filing issues that stopped delaying the job once Southern Cities got involved.',
  },
  {
    title: 'Inspection issues turn into next steps',
    body: 'Use real examples of failed inspections, punch items, or correction lists that got translated into practical action fast.',
  },
  {
    title: 'Investor decisions get cleaner',
    body: 'Use real examples of project reviews, scope direction, lender support, or turn planning that helped avoid bad spending.',
  },
  {
    title: 'Contractor admin drag comes off the field',
    body: 'Use real examples where permit follow-up, inspection scheduling, or paperwork handling freed up production time.',
  },
];

const proofExamples = [
  {
    role: 'Homeowners',
    title: 'What should show up here',
    body: 'A real quote about a project that felt confusing, delayed, or hard to trust before Southern Cities helped clarify the next step.',
    pain: 'Unclear scope, permit stress, inspection setbacks',
    result: 'More confidence before spending more money',
  },
  {
    role: 'Investors',
    title: 'What should show up here',
    body: 'A real quote about cleaner numbers, faster execution decisions, or less project drift after Southern Cities got involved.',
    pain: 'Vacancy drag, bad handoffs, expensive project drift',
    result: 'Cleaner decisions before more time and margin were lost',
  },
  {
    role: 'Realtors / Contractors',
    title: 'What should show up here',
    body: 'A real quote about faster answers, less admin burden, or better follow-through when the work needed tighter handling.',
    pain: 'Client pressure, office drag, repeated follow-up',
    result: 'Faster next steps and less time lost chasing the work',
  },
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

const processSteps = [
  'Review what is actually stuck',
  'Clarify the next step, scope issue, permit issue, or admin bottleneck',
  'Put the right support around the job',
  'Keep the work from drifting once the path is clear',
];

export default function Home() {
  const [activeProof, setActiveProof] = useState(proofExamples[0].role);
  const activeProofCard = useMemo(
    () => proofExamples.find((item) => item.role === activeProof) || proofExamples[0],
    [activeProof]
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
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-center">
            <div className="max-w-[42rem]">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                Help for residential projects that are getting delayed, confusing, or harder to manage
              </div>
              <h1 className="max-w-[11ch] text-[3rem] font-extrabold leading-[0.97] tracking-[-0.04em] text-white sm:text-[4rem] lg:text-[4.8rem]">
                Help for residential projects that are getting delayed, unclear, or more expensive to leave alone.
              </h1>
              <p className="mt-6 max-w-[38rem] text-[18px] leading-[1.7] text-white sm:text-[20px]">
                Southern Cities helps homeowners, investors, realtors, contractors, and developers move residential projects forward when permit problems, inspection setbacks, paperwork, and weak follow-through start costing time and money.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/services" className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-[15px] font-semibold text-white shadow-glow-orange transition-all hover:bg-orange-500 hover:-translate-y-0.5">
                  Find the Right Service
                </Link>
                <Link href="/services#contact" className="inline-flex min-w-[220px] items-center justify-center rounded-full border-2 border-white bg-white px-6 py-3.5 text-[14px] font-semibold text-navy transition-all hover:bg-stone-100 hover:-translate-y-0.5">
                  Request a Project Review
                </Link>
                <Link href="/services#homeowners" className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/30 bg-transparent px-6 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-white/10 hover:-translate-y-0.5">
                  See Services by Role
                </Link>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/15 bg-white p-6 text-navy shadow-[0_24px_60px_rgba(6,18,43,0.28)] sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(6,18,43,0.34)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">When people usually call Southern Cities</p>
              <ul className="mt-5 space-y-3">
                {trustPoints.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-stone-700">
                    <span className="mt-2 h-2 w-2 rounded-full bg-orange flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 transition-all duration-300 hover:border-orange/30 hover:bg-orange/[0.04]">
                <p className="text-sm font-semibold text-navy">Best fit when the job feels stuck or hard to move forward</p>
                <p className="mt-1 text-[14px] leading-relaxed text-stone-700">
                  Southern Cities usually gets called when the work is active, the details are still loose, or too much depends on the owner chasing answers and follow-up.
                </p>
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

          <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
            <div className="rounded-[24px] border border-stone-200 bg-navy-950 p-5 text-white shadow-[0_18px_40px_rgba(6,18,43,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(6,18,43,0.18)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What people need to know before they move forward</p>
              <p className="mt-4 text-xl font-extrabold tracking-tight text-white">You should be able to tell quickly whether Southern Cities is the right fit.</p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/80">
                Most people do not need a long explanation first. They need to know you understand the kind of delay, confusion, and cost that starts piling up when a residential job is not being handled tightly enough.
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
        </div>
      </section>

      <section className="bg-stone-50 py-14 sm:py-16">
        <div className="container-pro">
          <div className="mb-8 max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">
              <span className="w-6 h-px bg-orange/50" />
              Choose the page that fits your role
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl leading-[1.08]">Choose the page that fits your role</h2>
            <p className="mt-5 text-lg leading-relaxed text-stone-700">
              If the job is getting harder to price, harder to manage, or harder to keep moving, start with the page that fits how you are involved.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-6">
            {whoWeHelp.map((item, index) => {
              const totalCards = whoWeHelp.length;
              const remainder = totalCards % 3;
              const lastRowStart = totalCards - remainder;
              const isTailCard = remainder !== 0 && index >= lastRowStart;

              let tailClass = 'xl:col-span-2';
              if (remainder === 1 && isTailCard) tailClass = 'xl:col-start-3 xl:col-span-2';
              if (remainder === 2) {
                if (index === lastRowStart) tailClass = 'xl:col-start-2 xl:col-span-2';
                if (index === lastRowStart + 1) tailClass = 'xl:col-start-4 xl:col-span-2';
              }

              return (
                <div
                  key={item.title}
                  className={`${tailClass} group flex h-full w-full max-w-[420px] justify-self-center flex-col rounded-[22px] border border-stone-200 bg-white p-5 shadow-elev-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-elev-3 hover:border-orange/25`}
                >
                  <h3 className="text-[24px] font-extrabold tracking-tight text-navy transition-colors group-hover:text-orange">{item.title}</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-stone-700">{item.pain}</p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-stone-600">{item.value}</p>
                  <div className="mt-auto pt-5">
                    <Link href={item.href} className="inline-flex w-full items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-500 group-hover:-translate-y-0.5">
                      {item.cta}
                    </Link>
                  </div>
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
              <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">
                <span className="w-6 h-px bg-orange/50" />
                What usually slows the job down
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl leading-[1.08]">
                What usually slows the job down
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-stone-700">
                Projects do not usually get expensive because of one big mistake. They get expensive because too many small things stay unresolved for too long.
              </p>
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-6 sm:p-7 transition-all duration-300 hover:border-orange/25 hover:shadow-elev-1">
              <h3 className="text-2xl font-bold tracking-tight text-navy">What is usually going wrong</h3>
              <ul className="mt-5 space-y-2.5 text-[15px] leading-relaxed text-stone-700">
                {problemList.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[15px] font-semibold leading-relaxed text-navy">
                The goal is simple. Fewer delays, fewer surprises, and a clearer next step.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-14 sm:py-16 text-white">
        <div className="container-pro">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">
              <span className="w-6 h-px bg-orange/50" />
              What clients want to know before they reach out
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl leading-[1.08]">
              People want to know you understand what is going wrong, what it is costing them, and what gets easier next.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              The strongest proof on this site will not sound like marketing. It will sound like real situations, real setbacks, and real examples of how the work got easier to move forward.
            </p>
          </div>

          <div className="mt-8 grid gap-5 xl:grid-cols-[0.92fr_1.08fr] xl:items-start">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-2">
              {proofCategories.map((item) => (
                <div key={item.title} className="group rounded-[22px] border border-white/12 bg-white/[0.06] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.1] hover:border-white/20">
                  <h3 className="text-xl font-bold text-white transition-colors group-hover:text-orange-200">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/78">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[26px] border border-white/12 bg-white/[0.08] p-5 sm:p-6">
              <div className="flex flex-wrap gap-2">
                {proofExamples.map((item) => {
                  const active = item.role === activeProof;
                  return (
                    <button
                      key={item.role}
                      type="button"
                      onClick={() => setActiveProof(item.role)}
                      className={`rounded-full px-4 py-2 text-[12px] font-bold uppercase tracking-[0.18em] transition-all ${
                        active
                          ? 'bg-orange text-white shadow-glow-orange'
                          : 'border border-white/15 bg-white/[0.05] text-white/75 hover:bg-white/[0.1] hover:text-white'
                      }`}
                    >
                      {item.role}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 rounded-[24px] border border-white/10 bg-white px-5 py-6 text-navy shadow-[0_24px_50px_rgba(6,18,43,0.2)] transition-all duration-300 hover:-translate-y-1">
                <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">{activeProofCard.role}</p>
                    <h3 className="mt-3 text-2xl font-extrabold tracking-tight">{activeProofCard.title}</h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-stone-700">{activeProofCard.body}</p>
                  </div>
                  <div className="grid gap-3">
                    <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">What was going wrong</p>
                      <p className="mt-2 text-sm font-semibold text-navy">{activeProofCard.pain}</p>
                    </div>
                    <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">What got easier after that</p>
                      <p className="mt-2 text-sm font-semibold text-navy">{activeProofCard.result}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">Best proof format</p>
                    <p className="mt-2 text-sm font-semibold text-navy">Short testimonial + what changed</p>
                  </div>
                  <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">Best placement</p>
                    <p className="mt-2 text-sm font-semibold text-navy">On homepage and on the matching service page</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="container-pro">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">
                <span className="w-6 h-px bg-orange/50" />
                What happens next
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl leading-tight">How Southern Cities helps move the job forward</h2>
              <p className="mt-5 text-[15px] leading-relaxed text-stone-700">
                Southern Cities is usually brought in after the project has already started getting messy. The goal is to figure out what is slowing things down, what needs to be handled first, and what help makes the most sense from there.
              </p>
            </div>
            <div className="grid gap-3.5 md:grid-cols-2">
              {processSteps.map((step, index) => (
                <div key={step} className="group rounded-[22px] border border-stone-200 bg-stone-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-orange/25 hover:bg-white hover:shadow-elev-1">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange text-sm font-bold text-white transition-transform duration-300 group-hover:scale-110">{index + 1}</div>
                  <p className="mt-4 text-sm font-semibold leading-relaxed text-navy">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-14 sm:py-16">
        <div className="container-pro">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">
              <span className="w-6 h-px bg-orange/50" />
              Start where your problem fits
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl leading-[1.08]">
              Start where your problem fits.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-stone-700">
              Southern Cities has service pages built for the people most likely to deal with delays, permit friction, listing pressure, office burden, and active-job follow-up.
            </p>
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
              <Link href="/services" className="inline-flex items-center justify-center rounded-full bg-orange px-8 py-4 text-[15px] font-semibold text-white transition-all hover:bg-orange-500 hover:-translate-y-0.5">
                Find the Right Service
              </Link>
              <Link href="/services#contact" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-8 py-4 text-[15px] font-medium text-navy transition-all hover:border-orange hover:text-orange hover:-translate-y-0.5">
                Request a Project Review
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="container-pro">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">
              <span className="w-6 h-px bg-orange/50" />
              Start here
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl leading-[1.08]">
              If the job is slowing down, getting confusing, or becoming more expensive to leave alone, start here.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-stone-700">
              You do not need to have the whole project figured out before reaching out. If the job needs better follow-through, fewer delays, or a clearer next step, Southern Cities can help you move it forward.
            </p>
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
              <Link href="/services#contact" className="inline-flex items-center justify-center rounded-full bg-orange px-8 py-4 text-[15px] font-semibold text-white transition-all hover:bg-orange-500 hover:-translate-y-0.5">
                Request a Project Review
              </Link>
              <Link href="/services" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-8 py-4 text-[15px] font-medium text-navy transition-all hover:border-orange hover:text-orange hover:-translate-y-0.5">
                Browse Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

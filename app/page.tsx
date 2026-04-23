'use client';

import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

const whoWeHelp = [
  {
    title: 'Homeowners',
    pain: 'For homeowners dealing with a project that keeps getting harder to price, harder to trust, or more expensive to leave unclear.',
    value: 'Southern Cities helps stop permit confusion, inspection setbacks, and scope drift from costing more time and money.',
    cta: 'See Homeowner Services',
    href: '/services#homeowners',
  },
  {
    title: 'Investors',
    pain: 'For investors who need turns and active jobs to stop dragging on rent, timeline, and margin.',
    value: 'Southern Cities helps keep permit issues, handoff problems, and loose execution from adding vacancy drag and avoidable cost.',
    cta: 'See Investor Services',
    href: '/services#investors',
  },
  {
    title: 'Realtors',
    pain: 'For realtors who need repair items, listing prep, or inspection issues handled clearly so the deal or listing does not lose momentum.',
    value: 'Southern Cities helps turn construction questions into practical next steps you can use with clients and deadlines.',
    cta: 'See Realtor Services',
    href: '/services#realtors',
  },
  {
    title: 'Contractors',
    pain: 'For contractors whose field time keeps getting eaten by permit follow-up, inspection handling, and office work.',
    value: 'Southern Cities helps take admin drag off the job so production does not keep getting slowed down by paperwork and follow-up.',
    cta: 'See Contractor Services',
    href: '/services#contractors',
  },
  {
    title: 'Developers / Landowners',
    pain: 'For residential projects where permit uncertainty, weak coordination, and drift can get expensive fast.',
    value: 'Southern Cities helps reduce delay, wrong-step risk, and expensive drift before bigger money gets committed.',
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
  'North Carolina residential project support',
  'Permit, inspection, and active-project help',
  'Support for homeowners, investors, realtors, contractors, and developers',
  'Project review before delay and confusion get more expensive',
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
  },
  {
    role: 'Investors',
    title: 'What should show up here',
    body: 'A real quote about cleaner numbers, faster execution decisions, or less project drift after Southern Cities got involved.',
  },
  {
    role: 'Realtors / Contractors',
    title: 'What should show up here',
    body: 'A real quote about faster answers, less admin burden, or better follow-through when the work needed tighter handling.',
  },
];

const processSteps = [
  'Review what is actually stuck',
  'Clarify the next step, scope issue, permit issue, or admin bottleneck',
  'Put the right support around the job',
  'Keep the work from drifting once the path is clear',
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <SiteNav />

      <section className="relative overflow-hidden bg-navy-900 pt-28 pb-16 sm:pt-34 sm:pb-20">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#163061_0%,#10254c_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

        <div className="relative z-10 container-pro">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-center">
            <div className="max-w-[42rem]">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                Residential project support
              </div>
              <h1 className="max-w-[11ch] text-[3rem] font-extrabold leading-[0.97] tracking-[-0.04em] text-white sm:text-[4rem] lg:text-[4.8rem]">
                Help for residential projects that are getting delayed, unclear, or harder to control.
              </h1>
              <p className="mt-6 max-w-[38rem] text-[18px] leading-[1.7] text-white sm:text-[20px]">
                Southern Cities helps homeowners, investors, realtors, contractors, and developers move residential projects forward when permit issues, inspection setbacks, admin burden, and weak follow-through start costing time and money.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/services" className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-[15px] font-semibold text-white shadow-glow-orange transition-all hover:bg-orange-500">
                  Find the Right Service
                </Link>
                <Link href="/services#contact" className="inline-flex min-w-[220px] items-center justify-center rounded-full border-2 border-white bg-white px-6 py-3.5 text-[14px] font-semibold text-navy transition-all hover:bg-stone-100">
                  Request a Project Review
                </Link>
                <Link href="/services#homeowners" className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/30 bg-transparent px-6 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-white/10">
                  See Services by Role
                </Link>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/15 bg-white p-6 text-navy shadow-[0_24px_60px_rgba(6,18,43,0.28)] sm:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Why people bring Southern Cities in</p>
              <ul className="mt-5 space-y-3">
                {trustPoints.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-stone-700">
                    <span className="mt-2 h-2 w-2 rounded-full bg-orange flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                <p className="text-sm font-semibold text-navy">Used when the next step is unclear</p>
                <p className="mt-1 text-[14px] leading-relaxed text-stone-700">
                  Southern Cities gets brought in when the job is slowing down, the scope is still loose, or nobody is carrying the path forward closely enough.
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
              <div key={item} className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4 text-[14.5px] leading-relaxed text-stone-800">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-14 sm:py-16">
        <div className="container-pro">
          <div className="mb-8 max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">
              <span className="w-6 h-px bg-orange/50" />
              Who We Help
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl leading-[1.08]">Who we help</h2>
            <p className="mt-5 text-lg leading-relaxed text-stone-700">
              Southern Cities supports the people most exposed when residential work gets messy, slow, or hard to manage.
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
                  className={`${tailClass} flex h-full w-full max-w-[420px] justify-self-center flex-col rounded-[22px] border border-stone-200 bg-white p-5 shadow-elev-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-elev-3 hover:border-orange/25`}
                >
                  <h3 className="text-[24px] font-extrabold tracking-tight text-navy">{item.title}</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-stone-700">{item.pain}</p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-stone-600">{item.value}</p>
                  <div className="mt-auto pt-5">
                    <Link href={item.href} className="inline-flex w-full items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-500">
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
                What we help stop
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl leading-[1.08]">
                What keeps projects from moving
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-stone-700">
                Projects do not usually get expensive because one thing went wrong. They get expensive because the next step stays unclear for too long.
              </p>
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-6 sm:p-7">
              <h3 className="text-2xl font-bold tracking-tight text-navy">Where projects usually get stuck</h3>
              <ul className="mt-5 space-y-2.5 text-[15px] leading-relaxed text-stone-700">
                {problemList.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[15px] font-semibold leading-relaxed text-navy">
                The goal is simple. Reduce drift, reduce delay, and help the project move with more control.
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
              Proof and outcomes
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl leading-[1.08]">
              What should be proven more clearly on this homepage
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              Southern Cities already explains the work well. The next improvement is denser proof. The homepage should show more evidence of what changes when Southern Cities gets involved.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {proofCategories.map((item) => (
              <div key={item.title} className="rounded-[22px] border border-white/12 bg-white/[0.06] p-5">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/78">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {proofExamples.map((item) => (
              <div key={item.role} className="rounded-[24px] border border-white/12 bg-white px-5 py-6 text-navy shadow-[0_24px_50px_rgba(6,18,43,0.2)]">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">{item.role}</p>
                <h3 className="mt-3 text-xl font-extrabold tracking-tight">{item.title}</h3>
                <p className="mt-4 text-[14.5px] leading-relaxed text-stone-700">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="container-pro">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">
                <span className="w-6 h-px bg-orange/50" />
                How Southern Cities works
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl leading-tight">How the work gets back under control</h2>
              <p className="mt-5 text-[15px] leading-relaxed text-stone-700">
                The value is not just the service itself. It is getting the right action taken before delay, confusion, and weak follow-through cost more.
              </p>
            </div>
            <div className="grid gap-3.5 md:grid-cols-2">
              {processSteps.map((step, index) => (
                <div key={step} className="rounded-[22px] border border-stone-200 bg-stone-50 p-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange text-sm font-bold text-white">{index + 1}</div>
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
              Find your page
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl leading-[1.08]">
              Start with the role or project pressure that fits you now.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-stone-700">
              Southern Cities has service pages built for the people most exposed when residential work gets messy, slow, or hard to manage.
            </p>
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
              <Link href="/services" className="inline-flex items-center justify-center rounded-full bg-orange px-8 py-4 text-[15px] font-semibold text-white transition-all hover:bg-orange-500">
                Find the Right Service
              </Link>
              <Link href="/services#contact" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-8 py-4 text-[15px] font-medium text-navy transition-all hover:border-orange hover:text-orange">
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
              If the job is slowing down, unclear, or getting harder to manage, start here.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-stone-700">
              You do not need to have the whole project figured out before reaching out. If the job needs better direction, better follow-through, or a clearer next step, Southern Cities can help you get it moving again.
            </p>
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
              <Link href="/services#contact" className="inline-flex items-center justify-center rounded-full bg-orange px-8 py-4 text-[15px] font-semibold text-white transition-all hover:bg-orange-500">
                Request a Project Review
              </Link>
              <Link href="/services" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-8 py-4 text-[15px] font-medium text-navy transition-all hover:border-orange hover:text-orange">
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

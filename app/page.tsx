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
  'Permit help when approvals and paperwork start delaying the job',
  'Inspection coordination when corrections and next steps need to be handled clearly',
  'Project oversight when the work is active but nobody is driving it closely enough',
  'Clear service paths for homeowners, investors, realtors, contractors, and developers',
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
                Help for residential projects that are stalled, unclear, or getting more expensive by the week.
              </h1>
              <p className="mt-6 max-w-[38rem] text-[18px] leading-[1.7] text-white sm:text-[20px]">
                Southern Cities helps when permit issues, inspection setbacks, loose coordination, or unclear scope are slowing the job down and adding avoidable cost.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/services" className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-[15px] font-semibold text-white shadow-glow-orange transition-all hover:bg-orange-500">
                  Find the Right Service
                </Link>
                <Link href="/services#homeowners" className="inline-flex min-w-[220px] items-center justify-center rounded-full border-2 border-white bg-white px-6 py-3.5 text-[14px] font-semibold text-navy transition-all hover:bg-stone-100">
                  See Services by Role
                </Link>
                <Link href="/services#contact" className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/30 bg-transparent px-6 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-white/10">
                  Request a Quote
                </Link>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/15 bg-white p-6 text-navy shadow-[0_24px_60px_rgba(6,18,43,0.28)] sm:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Where jobs start losing time and money</p>
              <ul className="mt-5 space-y-3">
                {trustPoints.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-stone-700">
                    <span className="mt-2 h-2 w-2 rounded-full bg-orange flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                <p className="text-sm font-semibold text-navy">Know what to do before the job costs more</p>
                <p className="mt-1 text-[14px] leading-relaxed text-stone-700">
                  Choose a service, review pricing if needed, or request a quote for work that needs a closer look.
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
              Southern Cities supports homeowners, investors, realtors, contractors, and developers who need active residential work to stop getting slowed down by confusion, delay, and loose follow-through.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-6">
            {whoWeHelp.map((item, index) => {
              const isLast = index === whoWeHelp.length - 1;
              const isSecondToLast = index === whoWeHelp.length - 2;
              const tailClass = whoWeHelp.length % 3 === 2 && (isSecondToLast || isLast) ? 'xl:col-span-3' : 'xl:col-span-2';

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
                Where projects start losing time and money
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl leading-[1.08]">
                What keeps jobs from moving
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-stone-700">
                Some residential projects do not need a full general contractor from day one. They need permit help, inspection follow-up, and someone to stop the job from sitting still while costs, delays, and confusion keep stacking up.
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
                Southern Cities helps get the job moving again before delay, confusion, and bad handoffs cost more.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-14 sm:py-16 text-white">
        <div className="container-pro">
          <div className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">
                <span className="w-6 h-px bg-orange/50" />
                How to buy
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl leading-tight">How to get started</h2>
              <p className="mt-5 text-[15px] leading-relaxed text-white/88">
                Buy Now is for fixed services. Review Price is for work where a few project details affect cost. Request a Quote is for larger or less-defined jobs that need review first.
              </p>
            </div>
            <div className="grid gap-3.5 md:grid-cols-3">
              <div className="rounded-[22px] border border-white/12 bg-white/[0.06] p-5">
                <h3 className="text-xl font-bold text-white">Buy Now</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/88">Use this when the scope is fixed and you already know what you need.</p>
              </div>
              <div className="rounded-[22px] border border-white/12 bg-white/[0.06] p-5">
                <h3 className="text-xl font-bold text-white">Review Price</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/88">Use this when a few project details set the price before you move ahead.</p>
              </div>
              <div className="rounded-[22px] border border-white/12 bg-white/[0.06] p-5">
                <h3 className="text-xl font-bold text-white">Request a Quote</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/88">Use this when the work needs review, planning, or a larger scope conversation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="container-pro">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">
              <span className="w-6 h-px bg-orange/50" />
              Why Southern Cities
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl leading-[1.08]">
              Why clients use Southern Cities
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-stone-700">
              Clients use Southern Cities when the job is getting slow, unclear, or too easy for things to fall through the cracks.
            </p>
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
              <Link href="/services" className="inline-flex items-center justify-center rounded-full bg-orange px-8 py-4 text-[15px] font-semibold text-white transition-all hover:bg-orange-500">
                Find the Right Service
              </Link>
              <Link href="/services#contact" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-8 py-4 text-[15px] font-medium text-navy transition-all hover:border-orange hover:text-orange">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

'use client';

import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

const whoWeHelp = [
  {
    title: 'Homeowners',
    pain: 'When the budget keeps moving, the house stays torn up, and you do not feel confident in what you are being told, the whole project starts feeling unsafe.',
    value: 'Southern Cities helps homeowners get clear on scope, permits, and next steps so more money does not disappear into confusion, delay, and half-explained work.',
    cta: 'See Homeowner Services',
    href: '/services#homeowners',
  },
  {
    title: 'Investors',
    pain: 'Every extra week of drift means more holding cost, more vacancy loss, and more margin getting squeezed out of the deal.',
    value: 'Southern Cities helps investors tighten the work, cut avoidable delay, and keep turns, permits, and decisions from dragging the property down.',
    cta: 'See Investor Services',
    href: '/services#investors',
  },
  {
    title: 'Realtors',
    pain: 'When repair questions stay fuzzy, listings slow down, buyers hesitate, and client confidence starts dropping at the worst time.',
    value: 'Southern Cities helps realtors get a clean construction read, protect the timeline, and keep the deal or listing from getting weakened by repair chaos.',
    cta: 'See Realtor Services',
    href: '/services#realtors',
  },
  {
    title: 'Contractors',
    pain: 'When the office side keeps eating the owner alive, the field loses speed and the company hits a ceiling.',
    value: 'Southern Cities helps contractors get permits, inspections, and admin work handled with more discipline so production is not constantly interrupted by back-office drag.',
    cta: 'See Contractor Services',
    href: '/services#contractors',
  },
  {
    title: 'Developers / Landowners',
    pain: 'If feasibility is soft, the permit route is unclear, or ownership is loose, larger residential projects get expensive fast.',
    value: 'Southern Cities helps developers and landowners tighten the permit side, reduce execution risk, and make the job more dependable before drift turns into real loss.',
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

const differentiators = [
  'Permit administration when the paperwork side starts slowing the job down',
  'Construction oversight when a project needs tighter coordination and milestone control',
  'Inspection coordination when deal timing or job timing is at risk',
  'Clear next-step structure when the work is active but the path is still unclear',
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <SiteNav />

      <section className="relative overflow-hidden bg-navy-900 pt-28 pb-18 sm:pt-34 sm:pb-22">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,148,77,0.14),_transparent_28%),linear-gradient(135deg,#0f1f4a_0%,#13295c_52%,#0a1633_100%)]" />
          <div className="absolute inset-y-0 right-0 w-[42%] bg-gradient-to-l from-black/22 to-transparent" />
          <div className="absolute top-16 right-[8%] h-40 w-40 rounded-full border border-white/10 bg-white/[0.03] blur-3xl" />
          <div className="absolute bottom-[-4rem] left-[-5rem] h-56 w-56 rounded-full bg-orange/[0.12] blur-[120px]" />
        </div>

        <div className="relative z-10 container-pro">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,42rem)_minmax(280px,1fr)] lg:items-end">
            <div className="max-w-[42rem]">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/92 mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                Residential project support
              </div>
              <h1 className="max-w-[10ch] text-[3rem] font-extrabold text-white leading-[0.94] tracking-[-0.05em] sm:text-[4rem] lg:text-[5.35rem]">
                Bring the job back under control.
              </h1>
              <p className="mt-6 max-w-[39rem] text-[19px] leading-[1.65] text-white/96 sm:text-[21px]">
                When the work gets expensive, confusing, or stuck, Southern Cities helps stop wasted spend, schedule slippage, permit drag, and loose execution before the damage gets worse.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link href="/services" className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-[15px] font-semibold text-white shadow-glow-orange transition-all hover:-translate-y-0.5 hover:bg-orange-500">
                  Find the Right Service
                </Link>
                <Link href="/services#homeowners" className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/18 bg-white/[0.08] px-6 py-3.5 text-[14px] font-medium text-white/92 transition-all hover:bg-white/[0.12] hover:border-white/30 hover:text-white">
                  See Services by Role
                </Link>
                <Link href="/services#contact" className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/14 px-6 py-3.5 text-[14px] font-medium text-white/82 transition-all hover:border-white/28 hover:bg-white/[0.05] hover:text-white">
                  Request a Quote
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="rounded-[28px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/60">Where the money leaks</p>
                <div className="mt-5 space-y-4">
                  {[
                    'the permit side starts dragging the schedule',
                    'inspection issues stay unresolved too long',
                    'the scope is active but nobody is clearly driving the next step',
                    'office-side overload keeps pulling attention off execution',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/10 px-4 py-3 text-[14px] leading-relaxed text-white/88">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-orange flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-7">
        <div className="container-pro">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {differentiators.map((item) => (
              <div key={item} className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4 text-[14.5px] leading-relaxed text-stone-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 bg-stone-50">
        <div className="container-pro">
          <div className="max-w-3xl mb-8">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] mb-4 text-orange">
              <span className="w-6 h-px bg-orange/50" />
              Who We Help
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-navy leading-[1.08]">Start with the pressure you are under, not a vague service list.</h2>
            <p className="mt-5 text-lg leading-relaxed text-stone-700">
              Pick the role that matches the money, time, or trust problem hitting you right now. Then pick the service built to fix that exact pressure.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {whoWeHelp.map((item) => (
              <div
                key={item.title}
                className="flex w-full max-w-[420px] flex-col rounded-[22px] border border-stone-200 bg-white p-5 shadow-elev-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-elev-3 hover:border-orange/25 md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)]"
              >
                <h3 className="text-[24px] font-extrabold text-navy tracking-tight">{item.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-stone-700">{item.pain}</p>
                <p className="mt-3 text-[14.5px] leading-relaxed text-stone-600">{item.value}</p>
                <div className="mt-auto pt-5">
                  <Link href={item.href} className="inline-flex w-full items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-500">
                    {item.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 bg-white">
        <div className="container-pro">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] mb-4 text-orange">
                <span className="w-6 h-px bg-orange/50" />
                What Southern Cities solves
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-navy leading-[1.08]">
                This is for jobs where weak control is turning into wasted money, blown time, or growing mistrust.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-stone-700">
                Southern Cities is strongest when the work is already real and the cost of staying loose is starting to show up in budget, schedule, client confidence, or field performance.
              </p>
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-6 sm:p-7">
              <h3 className="text-2xl font-bold text-navy tracking-tight">Where projects usually get stuck</h3>
              <ul className="mt-5 space-y-2.5 text-[15px] leading-relaxed text-stone-700">
                {problemList.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[15px] leading-relaxed text-navy font-semibold">
                Southern Cities helps turn that into a defined path forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 bg-navy-950 text-white">
        <div className="container-pro">
          <div className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] mb-4 text-orange">
                <span className="w-6 h-px bg-orange/50" />
                How to buy
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl leading-tight">The next move should be clear before more time or money gets burned.</h2>
              <p className="mt-5 text-[15px] leading-relaxed text-white/78">
                Buy when the scope is already clear. Review price when a few details change the number. Request a quote when the job is too important or too messy to price loosely.
              </p>
            </div>
            <div className="grid gap-3.5 md:grid-cols-3">
              <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-5">
                <h3 className="text-xl font-bold">Buy Now</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/72">Use this when the scope is fixed and you already know what you need.</p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-5">
                <h3 className="text-xl font-bold">Review Price</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/72">Use this when a few project details set the price before you move ahead.</p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-5">
                <h3 className="text-xl font-bold">Request a Quote</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/72">Use this when the work needs review, planning, or a larger scope conversation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 bg-white">
        <div className="container-pro">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] mb-4 text-orange">
              <span className="w-6 h-px bg-orange/50" />
              Why Southern Cities
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-navy leading-[1.08]">
              Southern Cities is for the moment when residential work stops feeling manageable and starts needing real control.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-stone-700">
              Fewer bad assumptions. Less drift. Tighter follow-through. Budget protected, timing protected, and someone clearly in charge of the next move.
            </p>
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
              <Link href="/services" className="inline-flex items-center justify-center rounded-full bg-orange px-8 py-4 text-[15px] font-semibold text-white transition-all hover:bg-orange-500">
                Find the Right Service
              </Link>
              <Link href="/services#contact" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-8 py-4 text-[15px] font-medium text-navy transition-all hover:border-orange hover:text-orange">
                Talk Through the Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

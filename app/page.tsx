'use client';

import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

const whoWeHelp = [
  {
    title: 'Homeowners',
    pain: 'When a home project starts feeling expensive, disruptive, or hard to trust, the stress compounds fast.',
    value: 'Southern Cities helps homeowners reduce confusion, avoid waste, and move forward with a clearer plan instead of guessing through permits, coordination, and next steps.',
    cta: 'See Homeowner Services',
    href: '/services#homeowners',
  },
  {
    title: 'Investors',
    pain: 'Holding costs, vacancy drag, and loose execution start eating margin the second a project slows down.',
    value: 'Southern Cities helps investors keep work moving with tighter structure, less drift, and less delay between decision and execution.',
    cta: 'See Investor Services',
    href: '/services#investors',
  },
  {
    title: 'Realtors',
    pain: 'Deals and listings get fragile fast when inspection issues, repairs, or prep work stay unclear too long.',
    value: 'Southern Cities helps realtors protect the timeline, protect client confidence, and turn repair confusion into a clean next-step path.',
    cta: 'See Realtor Services',
    href: '/services#realtors',
  },
  {
    title: 'Contractors',
    pain: 'Back-office overload kills field momentum when permits, inspections, and paperwork keep pulling attention off production.',
    value: 'Southern Cities helps contractors protect field time, reduce admin drag, and keep jobs moving without burying the owner or team in office-side work.',
    cta: 'See Contractor Services',
    href: '/services#contractors',
  },
  {
    title: 'Developers / Landowners',
    pain: 'Larger residential work gets expensive fast when project feasibility, permit path, and execution reliability are not clearly controlled.',
    value: 'Southern Cities helps reduce execution risk with tighter structure, clearer milestones, and a more reliable path through permit and project complexity.',
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
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950" />
          <div className="absolute top-1/4 -right-32 w-[520px] h-[520px] rounded-full bg-orange/[0.08] blur-[130px]" />
          <div className="absolute -bottom-32 -left-40 w-[420px] h-[420px] rounded-full bg-blue-500/[0.06] blur-[110px]" />
        </div>

        <div className="relative z-10 container-pro">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
              Residential project support
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.02] tracking-tight">
              When a residential project starts getting messy, Southern Cities helps get it under control.
            </h1>
            <p className="mt-7 max-w-3xl text-lg sm:text-xl leading-relaxed text-white/82">
              We help homeowners, investors, realtors, contractors, and residential operators reduce delay, confusion, permit friction, inspection issues, back-office drag, and execution drift so the project can actually keep moving.
            </p>
            <div className="mt-10 flex flex-col gap-3.5 sm:flex-row">
              <Link href="/services" className="inline-flex items-center justify-center rounded-full bg-orange px-8 py-4 text-[15px] font-semibold text-white shadow-glow-orange transition-all hover:-translate-y-0.5 hover:bg-orange-500">
                Find the Right Service
              </Link>
              <Link href="/services#homeowners" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-8 py-4 text-[15px] font-medium text-white transition-all hover:bg-white/[0.12] hover:-translate-y-0.5">
                See Services by Role
              </Link>
              <Link href="/services#contact" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-transparent px-8 py-4 text-[15px] font-medium text-white transition-all hover:bg-white/[0.06] hover:-translate-y-0.5">
                Request a Quote
              </Link>
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
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-navy leading-[1.08]">Know where you fit before you spend another dollar or lose more time.</h2>
            <p className="mt-5 text-lg leading-relaxed text-stone-700">
              Start with the role that matches your situation. Then choose the service that best fits the real problem slowing the work down right now.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {whoWeHelp.map((item) => (
              <div key={item.title} className="flex h-full flex-col rounded-[22px] border border-stone-200 bg-white p-5 shadow-elev-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-elev-3 hover:border-orange/25">
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
                This is for active work where delay, confusion, and weak ownership are starting to cost real money.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-stone-700">
                Southern Cities is strongest when the project is real, the timing matters, and the next step cannot stay vague without creating more drift, stress, or cost.
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
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl leading-tight">The purchase path should be obvious before anyone clicks.</h2>
              <p className="mt-5 text-[15px] leading-relaxed text-white/78">
                Buy fixed services when the problem is already defined. Review price when a few project details affect scope. Request a quote when the work is larger, less defined, or needs real review first.
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
              Southern Cities is not just selling construction work. It is selling control when residential execution starts slipping.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-stone-700">
              Southern Cities is built for projects that are permit-heavy, inspection-sensitive, timeline-sensitive, under-coordinated, or already drifting. Construction is the mechanism. The real value is less chaos, less uncertainty, less admin burden, less delay, and more visible accountability over what happens next.
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

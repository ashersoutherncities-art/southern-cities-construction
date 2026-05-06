'use client';

import Image from 'next/image';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';

const credentials = [
  'Licensed NC General Contractor',
  'Residential Projects Across NC',
  'Investors & Homeowners Served',
  'Planning, Permits, Execution',
  'Clear Next Steps',
];

const stages = [
  {
    id: 'due-diligence',
    eyebrow: 'Project Due Diligence',
    timing: 'Before you commit more time or money',
    items: ['Deal Review', 'Budget', 'Permits'],
    cta: 'Review This Project',
  },
  {
    id: 'planning',
    eyebrow: 'Project Planning',
    timing: 'Before construction',
    items: ['Scope', 'Contractor', 'Permits'],
    cta: 'Plan This Project',
  },
  {
    id: 'execution',
    eyebrow: 'Project Execution',
    timing: 'During construction',
    items: ['Oversight', 'Draws', 'Full Contracting'],
    cta: 'Run This Project',
  },
];

export default function Home() {
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

        <div className="relative z-10 container-pro">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <div className="max-w-xl">
                <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-orange motion-safe:animate-hero-rise">
                  <span className="block h-px w-8 origin-left bg-orange/80 motion-safe:animate-rule-grow" aria-hidden="true" />
                  <span>Licensed NC General Contractor</span>
                </p>
                <h1
                  className="mt-5 text-[2.75rem] font-extrabold leading-[1.02] tracking-[-0.035em] text-white sm:text-[3.5rem] lg:text-[4rem] motion-safe:animate-hero-rise"
                  style={{ animationDelay: '0.15s' }}
                >
                  Plan it right. Run it better.
                </h1>

                <p
                  className="mt-6 text-lg font-medium leading-relaxed text-white/85 sm:text-xl motion-safe:animate-hero-rise"
                  style={{ animationDelay: '0.25s' }}
                >
                  Due diligence, planning, and execution support for residential projects.
                </p>

                <div
                  className="mt-10 flex flex-col gap-3 motion-safe:animate-hero-rise"
                  style={{ animationDelay: '0.35s' }}
                >
                  <Link
                    href="#due-diligence"
                    className="group flex w-full items-center justify-between rounded-xl border border-white/15 bg-white/[0.06] px-6 py-4 text-left text-base font-semibold text-white transition-all hover:border-orange/60 hover:bg-white/[0.1] hover:-translate-y-0.5"
                  >
                    <span>Project Due Diligence</span>
                    <span aria-hidden="true" className="text-orange transition-transform group-hover:translate-x-1">&rarr;</span>
                  </Link>
                  <Link
                    href="#planning"
                    className="group flex w-full items-center justify-between rounded-xl border border-white/15 bg-white/[0.06] px-6 py-4 text-left text-base font-semibold text-white transition-all hover:border-orange/60 hover:bg-white/[0.1] hover:-translate-y-0.5"
                  >
                    <span>Project Planning</span>
                    <span aria-hidden="true" className="text-orange transition-transform group-hover:translate-x-1">&rarr;</span>
                  </Link>
                  <Link
                    href="#execution"
                    className="group flex w-full items-center justify-between rounded-xl border border-white/15 bg-white/[0.06] px-6 py-4 text-left text-base font-semibold text-white transition-all hover:border-orange/60 hover:bg-white/[0.1] hover:-translate-y-0.5"
                  >
                    <span>Project Execution</span>
                    <span aria-hidden="true" className="text-orange transition-transform group-hover:translate-x-1">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden lg:col-span-5 lg:flex lg:items-center lg:justify-end" aria-hidden="true">
              <Image
                src="/sc-construction-minimal.png"
                alt=""
                width={640}
                height={640}
                className="h-auto w-full max-w-[28rem] opacity-20 motion-safe:animate-pulse-subtle"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8 sm:py-10 border-b border-stone-200">
        <div className="container-pro">
          <div className="grid gap-3 text-sm font-semibold text-navy-900 sm:grid-cols-2 lg:grid-cols-5">
            {credentials.map((item) => (
              <div key={item} className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-center">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="container-pro">
          <div className="grid gap-5 lg:grid-cols-3">
            {stages.map((stage) => (
              <div
                key={stage.id}
                id={stage.id}
                className="scroll-mt-24 rounded-2xl bg-white p-8 sm:p-10 shadow-elev-3 border border-stone-200"
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">{stage.eyebrow}</p>
                <h3 className="mt-3 text-[1.6rem] font-extrabold leading-tight tracking-tight text-navy-900 sm:text-[1.75rem]">
                  {stage.timing}
                </h3>
                <ul className="mt-7 space-y-3">
                  {stage.items.map((item) => (
                    <li key={item} className="text-base font-semibold text-navy-900 sm:text-[17px]">
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-orange px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-orange-500"
                >
                  {stage.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm font-medium text-stone-600">
            Need full contracting?{' '}
            <Link href="/contracting" className="font-semibold text-navy-900 underline underline-offset-4 hover:text-orange-500">
              We handle that when your project calls for it.
            </Link>
          </p>
        </div>
      </section>

      <TestimonialsCarousel />

      <section id="contact" className="bg-navy-950 py-14 sm:py-16 text-white">
        <div className="container-pro">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Final step</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Get clear next steps</h2>
            <div className="mt-8">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-orange px-8 py-4 text-[15px] font-semibold text-white transition-all hover:bg-orange-500">
                Request Project Review
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

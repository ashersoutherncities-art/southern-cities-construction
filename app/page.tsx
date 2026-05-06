'use client';

import Image from 'next/image';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

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
    timing: 'Before you buy',
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

const testimonials = [
  {
    quote: 'Saved us from a bad decision before we spent more money.',
    name: 'Madison M',
    role: 'Broker/Investor',
  },
  {
    quote: 'Got the specific help we needed without an oversold scope.',
    name: 'Iantha M',
    role: 'Investor',
  },
  {
    quote: 'Permit and admin follow-up took real pressure off our team.',
    name: 'Taquan P',
    role: 'Wholesaler',
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
        <div className="pointer-events-none absolute -left-20 top-16 h-56 w-56 rounded-full bg-orange/20 blur-3xl motion-safe:animate-aurora-a" aria-hidden="true" />
        <div className="pointer-events-none absolute right-0 top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl motion-safe:animate-aurora-b" aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/3 bottom-0 h-72 w-72 -translate-x-1/2 translate-y-1/3 rounded-full bg-orange/10 blur-3xl motion-safe:animate-aurora-c" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex" aria-hidden="true">
          <Image
            src="/sc-construction-minimal.png"
            alt=""
            width={640}
            height={640}
            className="h-auto w-[36rem] opacity-[0.045] mix-blend-screen motion-safe:animate-pulse-subtle"
            priority
          />
        </div>

        <div className="relative z-10 container-pro">
          <div className="max-w-[46rem]">
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
              className="mt-5 max-w-[34rem] text-lg font-medium leading-relaxed text-white/85 sm:text-xl motion-safe:animate-hero-rise"
              style={{ animationDelay: '0.25s' }}
            >
              Due diligence, planning, and execution support for residential projects.
            </p>

            <div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap motion-safe:animate-hero-rise"
              style={{ animationDelay: '0.35s' }}
            >
              <Link href="#due-diligence" className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-[15px] font-semibold text-white shadow-glow-orange transition-all hover:bg-orange-500 hover:-translate-y-0.5">
                Project Due Diligence
              </Link>
              <Link href="#planning" className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/25 bg-white/8 px-7 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-white/14 hover:-translate-y-0.5">
                Project Planning
              </Link>
              <Link href="#execution" className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/25 bg-white/8 px-7 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-white/14 hover:-translate-y-0.5">
                Project Execution
              </Link>
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

      <section className="bg-stone-50 py-14 sm:py-16">
        <div className="container-pro">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Reviews</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">What clients say.</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <article
                key={t.name}
                className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1"
              >
                <p className="text-[15px] leading-relaxed text-stone-700">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange text-base font-extrabold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-extrabold tracking-tight text-navy">{t.name}</p>
                    <p className="text-xs font-medium text-stone-600">{t.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

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

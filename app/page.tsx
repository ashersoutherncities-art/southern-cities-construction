'use client';

import Image from 'next/image';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import TrustStrip from '@/components/TrustStrip';

const trustPoints = [
  'Fixed-price reviews',
  'Clear pricing',
  'Any stage support',
  'Full contracting when needed',
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
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] items-center justify-center lg:flex" aria-hidden="true">
          <div className="relative flex h-full w-full items-center justify-center">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,48,97,0)_0%,rgba(22,48,97,0.18)_28%,rgba(22,48,97,0.38)_100%)]" />
            <Image
              src="/sc-construction-minimal.png"
              alt=""
              width={640}
              height={640}
              className="h-auto w-[30rem] translate-x-20 opacity-[0.028] mix-blend-screen motion-safe:animate-pulse-subtle"
              priority
            />
          </div>
        </div>

        <div className="relative z-10 container-pro">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)] lg:items-center">
            <div className="relative z-10 max-w-[46rem]">
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
                className="mt-6 max-w-2xl rounded-2xl bg-navy-900/30 px-0 py-0 text-lg leading-relaxed text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:text-xl motion-safe:animate-hero-rise"
                style={{ animationDelay: '0.35s' }}
              >
                Help with construction decisions before you spend, and help running projects once work starts.
              </p>

              <div
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap motion-safe:animate-hero-rise"
                style={{ animationDelay: '0.5s' }}
              >
                <Link href="/services/investors" className="inline-flex min-w-[240px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-[15px] font-semibold text-white shadow-glow-orange transition-all hover:bg-orange-500 hover:-translate-y-0.5 motion-safe:animate-glow-pulse">
                  Plan Before You Spend
                </Link>
                <Link href="/services" className="inline-flex min-w-[240px] items-center justify-center rounded-full border border-white/25 bg-white/8 px-7 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-white/14 hover:-translate-y-0.5">
                  Get Project Support
                </Link>
              </div>
            </div>

            <div
              className="relative z-10 rounded-[26px] border border-white/15 bg-white p-6 text-navy shadow-[0_24px_60px_rgba(6,18,43,0.28)] sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(6,18,43,0.34)] motion-safe:animate-hero-rise"
              style={{ animationDelay: '0.65s' }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Simple first decision</p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-navy">Plan the project or run the project.</h2>
              <p className="mt-4 text-sm leading-relaxed text-navy">
                Start with planning before you spend. Start with support when work needs to move.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <Link href="/services/investors" className="inline-flex items-center justify-center rounded-full bg-orange px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-500">
                  Plan Before You Spend
                </Link>
                <Link href="/services" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
                  Get Project Support
                </Link>
              </div>
            </div>
          </div>

          <div id="two-paths" className="mt-10 grid gap-4 lg:grid-cols-2">
            <div
              className="rounded-[24px] border border-white/15 bg-white/10 p-6 text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.13] hover:border-white/25 motion-safe:animate-hero-rise"
              style={{ animationDelay: '0.8s' }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">Plan the Project</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-white">Before you buy or spend money</h3>
              <ul className="mt-5 space-y-2 text-sm leading-relaxed text-white">
                <li>Deal Review</li>
                <li>Budget Review</li>
                <li>Permit Review</li>
                <li>Contractor Fit</li>
              </ul>
              <Link href="/services/investors" className="mt-6 inline-flex items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500 hover:-translate-y-0.5">
                Plan Before You Spend
              </Link>
            </div>
            <div
              className="rounded-[24px] border border-white/15 bg-white/10 p-6 text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.13] hover:border-white/25 motion-safe:animate-hero-rise"
              style={{ animationDelay: '0.95s' }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">Run the Project</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-white">When work needs to move</h3>
              <ul className="mt-5 space-y-2 text-sm leading-relaxed text-white">
                <li>Project Oversight</li>
                <li>Draw Review</li>
                <li>Permit Help</li>
                <li>Full Contracting</li>
              </ul>
              <Link href="/services" className="mt-6 inline-flex items-center justify-center rounded-full border border-white/30 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15 hover:-translate-y-0.5">
                Get Project Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className="bg-white py-14 sm:py-16">
        <div className="container-pro">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Why this works</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Buy only the help you need.</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {trustPoints.map((point) => (
              <div key={point} className="rounded-[24px] border border-stone-200 bg-stone-50 px-5 py-5 text-center shadow-elev-1">
                <p className="text-sm font-semibold leading-[1.6] text-navy">{point}</p>
              </div>
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

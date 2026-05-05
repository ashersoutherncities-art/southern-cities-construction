'use client';

import Image from 'next/image';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
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

            <div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap motion-safe:animate-hero-rise"
              style={{ animationDelay: '0.35s' }}
            >
              <Link href="/services/investors" className="inline-flex min-w-[240px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-[15px] font-semibold text-white shadow-glow-orange transition-all hover:bg-orange-500 hover:-translate-y-0.5 motion-safe:animate-glow-pulse">
                Plan Before You Spend
              </Link>
              <Link href="/services" className="inline-flex min-w-[240px] items-center justify-center rounded-full border border-white/25 bg-white/8 px-7 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-white/14 hover:-translate-y-0.5">
                Get Project Support
              </Link>
            </div>
          </div>

          <div id="two-paths" className="mt-14 grid gap-4 lg:grid-cols-2">
            <div
              className="rounded-[24px] border border-white/15 bg-white/10 p-6 text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.13] hover:border-white/25 motion-safe:animate-hero-rise"
              style={{ animationDelay: '0.5s' }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">Plan the Project</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-white">Before you spend</h3>
              <ul className="mt-5 grid gap-2 text-sm font-medium text-white sm:grid-cols-2">
                {[
                  'Deal Review',
                  'Budget',
                  'Permits',
                  'Contractor',
                ].map((item) => (
                  <li
                    key={item}
                    className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-all duration-300 hover:border-orange/40 hover:bg-white/[0.07]"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-orange/35 bg-orange/12 text-orange shadow-[0_0_18px_rgba(250,140,65,0.18)] transition-transform duration-300 group-hover:scale-105" aria-hidden="true">
                      <span className="h-2 w-2 rounded-full bg-orange" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/services/investors" className="mt-6 inline-flex items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500 hover:-translate-y-0.5">
                Plan Before You Spend
              </Link>
            </div>
            <div
              className="rounded-[24px] border border-white/15 bg-white/10 p-6 text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.13] hover:border-white/25 motion-safe:animate-hero-rise"
              style={{ animationDelay: '0.65s' }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">Run the Project</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-white">During construction</h3>
              <ul className="mt-5 grid gap-2 text-sm font-medium text-white sm:grid-cols-2">
                {[
                  'Oversight',
                  'Draws',
                  'Permits',
                  'Contracting',
                ].map((item) => (
                  <li
                    key={item}
                    className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-all duration-300 hover:border-orange/40 hover:bg-white/[0.07]"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-orange/35 bg-orange/12 text-orange shadow-[0_0_18px_rgba(250,140,65,0.18)] transition-transform duration-300 group-hover:scale-105" aria-hidden="true">
                      <span className="h-2 w-2 rounded-full bg-orange" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/services" className="mt-6 inline-flex items-center justify-center rounded-full border border-white/30 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15 hover:-translate-y-0.5">
                Get Project Support
              </Link>
            </div>
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

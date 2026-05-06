'use client';

import Image from 'next/image';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';

const galleryPreview = [
  {
    title: 'White house exterior transformation',
    image: '/gallery/white-house-after.jpg',
  },
  {
    title: 'Older home exterior refresh',
    image: '/gallery/farmhouse-after.jpg',
  },
  {
    title: 'Red house exterior refresh',
    image: '/gallery/red-house-after.jpg',
  },
];

const credentials = [
  'Licensed NC GC',
  'Fully Insured',
  'Investor-Focused',
  'Residential Projects Across NC',
  'Planning, Permits, Execution',
];

const proofCards = [
  {
    label: 'Get Your Deal Reviewed',
    detail: 'Catch issues before you put more money in',
  },
  {
    label: 'Know Your Real Budget',
    detail: 'Avoid underestimating scope and costs',
  },
  {
    label: 'Map Your Permit Path',
    detail: 'Know what gets approved - and what does not',
  },
  {
    label: 'Get Support During the Project',
    detail: 'Keep things moving without confusion',
  },
  {
    label: 'Work With a Licensed GC',
    detail: 'Execution when your project calls for it',
  },
  {
    label: 'Know What to Do Next',
    detail: 'Clear direction before moving forward',
  },
];

const stages = [
  {
    id: 'due-diligence',
    eyebrow: 'Project Due Diligence',
    timing: 'Before you commit more time or money',
    items: ['Review the deal', 'Check the budget', 'Map the permit path'],
    cta: 'Review This Project',
  },
  {
    id: 'planning',
    eyebrow: 'Project Planning',
    timing: 'Before construction',
    items: ['Define the scope', 'Choose the contractor', 'Prepare permits'],
    cta: 'Plan This Project',
  },
  {
    id: 'execution',
    eyebrow: 'Project Execution',
    timing: 'During construction',
    items: ['Monitor progress', 'Review draws', 'Execute the build'],
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

                <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <Link
                    href="#due-diligence"
                    className="flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] px-4 py-4 text-center text-sm font-semibold text-white transition-all motion-safe:animate-hero-rise hover:border-orange/60 hover:bg-white/[0.1] hover:-translate-y-0.5"
                    style={{ animationDelay: '0.35s' }}
                  >
                    Project Due Diligence
                  </Link>
                  <Link
                    href="#planning"
                    className="flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] px-4 py-4 text-center text-sm font-semibold text-white transition-all motion-safe:animate-hero-rise hover:border-orange/60 hover:bg-white/[0.1] hover:-translate-y-0.5"
                    style={{ animationDelay: '0.45s' }}
                  >
                    Project Planning
                  </Link>
                  <Link
                    href="#execution"
                    className="flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] px-4 py-4 text-center text-sm font-semibold text-white transition-all motion-safe:animate-hero-rise hover:border-orange/60 hover:bg-white/[0.1] hover:-translate-y-0.5"
                    style={{ animationDelay: '0.55s' }}
                  >
                    Project Execution
                  </Link>
                </div>

                <p
                  className="mt-4 text-sm font-medium text-white/75 motion-safe:animate-hero-rise"
                  style={{ animationDelay: '0.65s' }}
                >
                  Not sure where to start?{' '}
                  <Link href="/contact" className="text-white underline underline-offset-4 transition hover:text-orange">
                    Book a project call.
                  </Link>
                </p>
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

      <section className="border-b border-stone-200 bg-white py-8 sm:py-10 motion-safe:animate-hero-rise" style={{ animationDelay: '0.75s' }}>
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

      <section className="bg-stone-50 py-14 sm:py-18">
        <div className="container-pro">
          <div className="max-w-3xl motion-safe:animate-hero-rise">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What to Handle Before You Move Forward</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Before You Move Forward, Handle These First
            </h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {proofCards.map((card, index) => (
              <div
                key={card.label}
                className="rounded-[26px] border border-stone-200 bg-white p-6 shadow-elev-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-elev-3 motion-safe:animate-hero-rise"
                style={{ animationDelay: `${0.08 * index}s` }}
              >
                <p className="text-lg font-extrabold tracking-tight text-navy-900">{card.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{card.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex min-h-[56px] flex-1 items-center justify-center rounded-full bg-orange px-6 py-3.5 text-center text-[15px] font-semibold text-white transition-all hover:bg-orange-500"
            >
              Review This Before You Move Forward
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-[56px] flex-1 items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3.5 text-center text-[15px] font-semibold text-navy-900 transition-all hover:-translate-y-0.5 hover:border-orange hover:text-orange"
            >
              Talk Through Your Project
            </Link>
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
                className="scroll-mt-24 flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-8 shadow-elev-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)] sm:p-10"
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">{stage.eyebrow}</p>
                <h3 className="mt-3 text-[1.6rem] font-extrabold leading-tight tracking-tight text-navy-900 sm:text-[1.75rem]">
                  {stage.timing}
                </h3>
                <div className="mt-7 flex flex-1 flex-col">
                  <ul className="space-y-3">
                    {stage.items.map((item) => (
                      <li key={item} className="text-base font-semibold text-navy-900 sm:text-[17px]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-orange-500"
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

      <div className="motion-safe:animate-hero-rise" style={{ animationDelay: '0.2s' }}>
        <TestimonialsCarousel />
      </div>

      <section id="contact" className="bg-navy-950 py-14 text-white motion-safe:animate-hero-rise sm:py-16" style={{ animationDelay: '0.25s' }}>
        <div className="container-pro">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Not sure where to start?</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/78 sm:text-lg">
              Talk through your project and get direction on what to do next.
            </p>
            <div className="mt-8">
              <Link href="/contact" className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-8 py-4 text-[15px] font-semibold text-white transition-all hover:bg-orange-500">
                Book a Project Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-14 sm:py-18">
        <div className="container-pro">
          <div className="max-w-3xl motion-safe:animate-hero-rise">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Real project gallery</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Real Projects. Real Work.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-700 sm:text-lg">
              Renovations, builds, and active project work across North Carolina
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-[28px] border border-stone-200 bg-white p-4 shadow-elev-1 sm:p-6 motion-safe:animate-hero-rise">
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
              {galleryPreview.map((item) => (
                <div
                  key={item.title}
                  className="min-w-[88%] snap-start overflow-hidden rounded-[24px] border border-stone-200 bg-stone-50 sm:min-w-[48%] lg:min-w-[31.5%]"
                >
                  <div className="relative aspect-[4/3] bg-white">
                    <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 hover:scale-[1.02]" />
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm font-semibold text-navy-900">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-stone-600">Real project images with a clean preview and direct path to the full gallery.</p>
              <Link
                href="/gallery"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-navy-900 transition-all hover:-translate-y-0.5 hover:border-orange hover:text-orange"
              >
                View Full Project Gallery →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

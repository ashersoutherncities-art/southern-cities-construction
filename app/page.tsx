'use client';

import Image from 'next/image';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';

const CONSULTATION_CTA_HREF = '/services/homeowners/owner-consultation';

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

const processHighlights = [
  {
    title: 'Clear project direction',
    detail: 'Know what to do first, what to price next, and what can wait.',
  },
  {
    title: 'Faster decision-making',
    detail: 'Move through scope, budget, and permit questions without getting stuck.',
  },
  {
    title: 'Tailored project support',
    detail: 'Get the level of help that fits the job, from review to full execution.',
  },
  {
    title: 'Real contractor insight',
    detail: 'Use licensed construction judgment instead of guessing through risk.',
  },
];

const processSteps = [
  {
    number: '1',
    title: 'Book a free project call',
    detail: 'Start with a short conversation about the property, scope, timing, and where things feel unclear.',
  },
  {
    number: '2',
    title: 'Get a project-specific recommendation',
    detail: 'We point you to the right next step, whether that is due diligence, planning support, or execution help.',
  },
  {
    number: '3',
    title: 'Move forward with the right support',
    detail: 'Once the path is clear, we help you review, prepare, coordinate, or run the project.',
  },
];

const faqs = [
  {
    question: 'What types of projects do you help with?',
    answer: 'We support residential rehabs, rental turns, owner projects, investor projects, permit-heavy work, and jobs that need better planning before construction starts.',
  },
  {
    question: 'Do you only work on full construction jobs?',
    answer: 'No. Some clients need a deal review, budget review, permit help, or oversight support without hiring full contracting right away.',
  },
  {
    question: 'What happens on the free project call?',
    answer: 'We talk through the property, the scope, the current roadblocks, and what next step makes the most sense for the job.',
  },
  {
    question: 'Do you work with investors and homeowners?',
    answer: 'Yes. We work with investors, homeowners, developers, landowners, and operators who need real project guidance and execution support.',
  },
  {
    question: 'Can you help before permits or contractor selection?',
    answer: 'Yes. That is one of the biggest reasons clients come to us. We help clarify scope, budget, permits, and the path forward before the job gets more expensive.',
  },
  {
    question: 'How do I know which service to choose?',
    answer: 'Start with the free project call. We can point you toward the right review, planning service, or execution support based on where the project stands.',
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
                  <Link href={CONSULTATION_CTA_HREF} className="text-white underline underline-offset-4 transition hover:text-orange">
                    Book a free project call.
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
              href={CONSULTATION_CTA_HREF}
              className="inline-flex min-h-[56px] flex-1 items-center justify-center rounded-full bg-orange px-6 py-3.5 text-center text-[15px] font-semibold text-white transition-all hover:bg-orange-500"
            >
              Review This Before You Move Forward
            </Link>
            <Link
              href={CONSULTATION_CTA_HREF}
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
                  href={CONSULTATION_CTA_HREF}
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

      <section className="bg-white py-14 sm:py-20">
        <div className="container-pro">
          <div className="mx-auto max-w-3xl text-center motion-safe:animate-hero-rise">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Our process</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">How projects move forward</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-700 sm:text-lg">
              A simple process to help you get clarity, choose the right next step, and keep the project moving.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {processHighlights.map((item, index) => (
              <div
                key={item.title}
                className="rounded-[26px] border border-stone-200 bg-stone-50 p-6 text-center shadow-elev-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-elev-3 motion-safe:animate-hero-rise"
                style={{ animationDelay: `${0.08 * index}s` }}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-orange/20 bg-white text-lg font-extrabold text-orange shadow-sm">
                  {index + 1}
                </div>
                <p className="mt-5 text-xl font-extrabold tracking-tight text-navy-900">{item.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-0">
              <div className="space-y-8 lg:space-y-20">
                <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-elev-1 lg:mr-10 motion-safe:animate-hero-rise">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">Step 1</p>
                  <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-navy">{processSteps[0].title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{processSteps[0].detail}</p>
                </div>
                <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-elev-1 lg:mr-10 motion-safe:animate-hero-rise" style={{ animationDelay: '0.1s' }}>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">Step 3</p>
                  <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-navy">{processSteps[2].title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{processSteps[2].detail}</p>
                </div>
              </div>

              <div className="hidden lg:flex lg:flex-col lg:items-center">
                <div className="h-full w-px bg-stone-200" />
                <div className="absolute mt-10 flex flex-col items-center gap-[10.5rem]">
                  {processSteps.map((step, index) => (
                    <div key={step.number} className={`flex h-14 w-14 items-center justify-center rounded-full border-4 border-white text-lg font-extrabold shadow-lg ${index === 1 ? 'bg-orange text-white' : 'bg-navy-900 text-white'}`}>
                      {step.number}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8 pt-0 lg:pt-20 lg:space-y-20">
                <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-elev-1 lg:ml-10 motion-safe:animate-hero-rise" style={{ animationDelay: '0.05s' }}>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">Step 2</p>
                  <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-navy">{processSteps[1].title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{processSteps[1].detail}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:hidden">
              {processSteps.map((step) => (
                <div key={`mobile-${step.number}`} className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-base font-extrabold text-white">{step.number}</div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">Step {step.number}</p>
                      <h3 className="mt-1 text-xl font-extrabold tracking-tight text-navy">{step.title}</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-stone-700">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-navy-950 py-14 text-white motion-safe:animate-hero-rise sm:py-16" style={{ animationDelay: '0.25s' }}>
        <div className="container-pro">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Ready to move your project forward?</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/78 sm:text-lg">
              Book a free project call to talk through the job, get clarity on the next step, and decide what support makes sense.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={CONSULTATION_CTA_HREF} className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-8 py-4 text-[15px] font-semibold text-white transition-all hover:bg-orange-500">
                Book a Free Project Call
              </Link>
              <Link href={CONSULTATION_CTA_HREF} className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-white/20 bg-transparent px-8 py-4 text-[15px] font-semibold text-white transition-all hover:border-orange hover:text-orange">
                Talk Through Your Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-14 sm:py-18">
        <div className="container-pro">
          <div className="mx-auto max-w-3xl text-center motion-safe:animate-hero-rise">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">FAQ</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Frequently asked questions</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-700 sm:text-lg">
              Straight answers to the questions clients usually ask before they move forward.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1 motion-safe:animate-hero-rise"
                style={{ animationDelay: `${0.06 * index}s` }}
              >
                <h3 className="text-lg font-extrabold tracking-tight text-navy-900">{faq.question}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="container-pro">
          <div className="mx-auto max-w-3xl text-center motion-safe:animate-hero-rise">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Get in touch</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Talk with us about your project</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-700 sm:text-lg">
              Have questions about the project, the budget, or the right next step? Contact us or book a free project call.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-4">
              <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-6 shadow-elev-1">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">Call</p>
                <a href="tel:+19804737249" className="mt-3 block text-2xl font-extrabold tracking-tight text-navy-900 transition-colors hover:text-orange">
                  (980) 473-7249
                </a>
                <p className="mt-2 text-[15px] leading-relaxed text-stone-600">Talk through the job, ask questions, and get help figuring out the next move.</p>
              </div>

              <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-6 shadow-elev-1">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">Email</p>
                <a href="mailto:info@southerncitiesconstruction.com" className="mt-3 block break-all text-xl font-extrabold tracking-tight text-navy-900 transition-colors hover:text-orange">
                  info@southerncitiesconstruction.com
                </a>
                <p className="mt-2 text-[15px] leading-relaxed text-stone-600">Send over your project details, timeline, or questions and we can point you in the right direction.</p>
              </div>

              <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-6 shadow-elev-1">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">Service area</p>
                <p className="mt-3 text-2xl font-extrabold tracking-tight text-navy-900">Charlotte, NC and statewide North Carolina</p>
                <p className="mt-2 text-[15px] leading-relaxed text-stone-600">Residential projects, investor work, planning support, permits, oversight, and full contracting when needed.</p>
              </div>
            </div>

            <div className="rounded-[28px] border border-stone-200 bg-white p-7 shadow-elev-3 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">Next step</p>
              <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900">Choose how you want to start</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-stone-700">
                If you already know you want to talk, book the free call. If you want to send project details first, email us and we will follow up.
              </p>

              <div className="mt-8 space-y-4">
                <Link
                  href={CONSULTATION_CTA_HREF}
                  className="inline-flex min-h-[56px] w-full items-center justify-center rounded-full bg-orange px-6 py-4 text-center text-[15px] font-semibold text-white transition-all hover:bg-orange-500"
                >
                  Schedule a Free Project Call
                </Link>
                <a
                  href="mailto:info@southerncitiesconstruction.com"
                  className="inline-flex min-h-[56px] w-full items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-4 text-center text-[15px] font-semibold text-navy-900 transition-all hover:-translate-y-0.5 hover:border-orange hover:text-orange"
                >
                  Contact Us by Email
                </a>
              </div>

              <div className="mt-8 rounded-[22px] bg-stone-50 p-5">
                <p className="text-sm font-semibold text-navy-900">Best fit for this page</p>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  Early-stage project questions, scope clarity, budget direction, permit concerns, contractor planning, and deciding whether you need support or full execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

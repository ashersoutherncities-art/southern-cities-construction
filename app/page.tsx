'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';

const CONSULTATION_CTA_HREF = '/services/homeowners/owner-consultation';

const galleryPreview = [
  {
    title: 'Standard builder-grade home exterior refresh',
    image: '/gallery/white-house-after.jpg',
  },
  {
    title: 'Farmhouse-style siding and deck transformation',
    image: '/gallery/farmhouse-after.jpg',
  },
  {
    title: 'Historic waterfront district home exterior transformation',
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

const duplicatedCredentials = [...credentials, ...credentials];

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
    side: 'left',
  },
  {
    number: '2',
    title: 'Get a project-specific recommendation',
    detail: 'We point you to the right next step, whether that is due diligence, planning support, or execution help.',
    side: 'right',
  },
  {
    number: '3',
    title: 'Move forward with the right support',
    detail: 'Once the path is clear, we help you review, prepare, coordinate, or run the project.',
    side: 'left',
  },
  {
    number: '4',
    title: 'Project completion',
    detail: 'Finish with a cleaner handoff, a better result, and a project that actually gets across the line.',
    side: 'right',
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
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <SiteNav />

      <section className="relative overflow-hidden bg-[#f3f5f8] pt-28 pb-16 sm:pt-34 sm:pb-20">
        <div className="relative z-10 container-pro">
          <div className="flagship-shell px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
            <div className="flagship-split">
              <div>
                <div className="flagship-pill motion-safe:animate-hero-rise">
                  <span className="text-base leading-none">♛</span>
                  <span>Licensed NC GC Support</span>
                </div>

                <h1 className="flagship-title mt-7 text-white motion-safe:animate-hero-rise" style={{ animationDelay: '0.12s' }}>
                  Plan it right.
                  <span>Run it better.</span>
                </h1>

                <p className="flagship-subhead mt-8 max-w-[42rem] motion-safe:animate-hero-rise" style={{ animationDelay: '0.22s' }}>
                  Due diligence, planning, permits, and execution support for residential projects that need structure before they get expensive.
                </p>

                <div className="mt-10 flagship-mini-features motion-safe:animate-hero-rise" style={{ animationDelay: '0.32s' }}>
                  {[
                    { icon: '◎', title: 'Deal clarity', copy: 'See risks before you commit.' },
                    { icon: '盾', title: 'Permit path', copy: 'Know approvals and compliance.' },
                    { icon: '▤', title: 'Scope control', copy: 'Tighter budgets and expectations.' },
                    { icon: '⌂', title: 'Execution help', copy: 'Support during active work.' },
                    { icon: '↻', title: 'Flexible path', copy: 'Move to full contracting if needed.' },
                  ].map((item) => (
                    <div key={item.title} className="flagship-mini-feature">
                      <span className="flagship-mini-icon">{item.icon}</span>
                      <strong className="flagship-mini-title">{item.title}</strong>
                      <p className="flagship-mini-copy">{item.copy}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center motion-safe:animate-hero-rise" style={{ animationDelay: '0.42s' }}>
                  <Link
                    href={CONSULTATION_CTA_HREF}
                    className="btn-glow inline-flex min-h-[58px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#ff8b37,#f06a00)] px-8 py-4 text-[15px] font-extrabold text-white shadow-[0_18px_44px_rgba(240,106,0,0.28)] transition-all hover:-translate-y-0.5"
                  >
                    Book a Project Call →
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex min-h-[58px] items-center justify-center rounded-full border border-white/40 px-8 py-4 text-[15px] font-extrabold text-white transition-all hover:bg-white/[0.06]"
                  >
                    Explore Pricing Paths
                  </Link>
                </div>
              </div>

              <div className="flagship-panel p-6 sm:p-8 motion-safe:animate-hero-rise" style={{ animationDelay: '0.52s' }}>
                {[
                  {
                    icon: '◎',
                    title: 'Get the right first step',
                    copy: 'Know whether the job needs review, planning support, permits, or full execution.',
                  },
                  {
                    icon: '盾',
                    title: 'Licensed GC structure where needed',
                    copy: 'Use experienced construction judgment and accountability instead of guessing through risk.',
                  },
                  {
                    icon: '▤',
                    title: 'Permits, scope, and budget alignment',
                    copy: 'Keep the project moving with clearer approvals, numbers, and expectations.',
                  },
                  {
                    icon: '✓',
                    title: 'Support that fits the project',
                    copy: 'From one decision to an active job, get the level of help that actually matches the work.',
                  },
                  {
                    icon: '↻',
                    title: 'A path into full contracting',
                    copy: 'If the project needs heavier execution, Southern Cities can step in and carry more of the load.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flagship-feature-item">
                    <div className="flagship-icon-badge">{item.icon}</div>
                    <div>
                      <h3 className="text-[1.2rem] font-extrabold text-white">{item.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-white/72">{item.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flagship-band mt-10 pt-4">
              <div className="flex flex-col gap-2 text-sm text-white/72 sm:flex-row sm:items-center sm:gap-4">
                <div className="flex items-center gap-3 text-white">
                  <span className="text-orange">◉</span>
                  <span className="font-extrabold uppercase tracking-[0.08em]">Structure. Oversight. Execution support.</span>
                </div>
                <span className="hidden text-white/30 sm:inline">|</span>
                <span>Built for owners and investors who want clarity before the project gets chaotic.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-8 sm:py-10 motion-safe:animate-hero-rise" style={{ animationDelay: '0.75s' }}>
        <div className="container-pro overflow-hidden">
          <div className="flex w-max gap-2 motion-safe:animate-marquee hover:[animation-play-state:paused]">
            {duplicatedCredentials.map((item, index) => (
              <div key={`${item}-${index}`} className="flex min-w-[210px] items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-center text-sm font-semibold leading-tight text-navy-900">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f3f5f8] py-14 sm:py-18">
        <div className="container-pro">
          <div className="flagship-section-light px-6 py-8 sm:px-8 sm:py-10">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <div className="max-w-2xl motion-safe:animate-hero-rise">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What to handle first</p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
                  Before You Move Forward, Handle These First
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-stone-700 sm:text-lg">
                  The same premium structure applies here too. Clear priorities, cleaner decisions, and support built around how construction projects really move.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {proofCards.map((card, index) => (
                  <div
                    key={card.label}
                    className="rounded-[26px] border border-[#e6ebf2] bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] motion-safe:animate-hero-rise"
                    style={{ animationDelay: `${0.08 * index}s` }}
                  >
                    <span className="text-[28px] leading-none text-orange">◎</span>
                    <p className="mt-4 text-lg font-extrabold tracking-tight text-navy-900">{card.label}</p>
                    <p className="mt-3 text-sm leading-relaxed text-stone-600">{card.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center lg:justify-start">
              <Link
                href={CONSULTATION_CTA_HREF}
                className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#ff8b37,#f06a00)] px-8 py-3.5 text-center text-[15px] font-semibold text-white shadow-[0_14px_36px_rgba(240,106,0,0.24)] transition-all hover:-translate-y-0.5"
              >
                Talk Through Your Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="container-pro">
          <div className="flagship-shell px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange-200">Choose your support lane</p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Structured project support by stage</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-white/72 sm:text-lg">
                  Split-layout, premium card treatment, and cleaner service hierarchy across the core pricing experience.
                </p>
              </div>
              <Link href="/contracting" className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.05]">
                Need full contracting?
              </Link>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {stages.map((stage) => (
                <div
                  key={stage.id}
                  id={stage.id}
                  className="scroll-mt-24 flex h-full flex-col rounded-[28px] border border-white/12 bg-white/[0.06] p-8 shadow-[0_18px_44px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange/30 sm:p-9"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-200">{stage.eyebrow}</p>
                  <h3 className="mt-3 text-[1.6rem] font-extrabold leading-tight tracking-tight text-white sm:text-[1.75rem]">
                    {stage.timing}
                  </h3>
                  <div className="mt-7 flex flex-1 flex-col">
                    <ul className="space-y-3">
                      {stage.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-base font-semibold text-white/90 sm:text-[17px]">
                          <span className="mt-1 text-orange">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={CONSULTATION_CTA_HREF}
                    className="mt-6 inline-flex min-h-[56px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#ff8b37,#f06a00)] px-6 py-3.5 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5"
                  >
                    {stage.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
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
                <p className="text-xl font-extrabold tracking-tight text-navy-900">{item.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <div className="relative hidden lg:block">
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-stone-200" />
              <div className="space-y-10">
                {processSteps.map((step, index) => {
                  const isLeft = step.side === 'left';
                  const dotClass = index === 1 ? 'bg-orange text-white' : 'bg-navy-900 text-white';
                  return (
                    <div key={step.number} className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-8">
                      <div className={isLeft ? 'flex justify-end' : ''}>
                        {isLeft ? (
                          <div className="w-full max-w-[30rem] rounded-[28px] border border-stone-200 bg-white p-7 shadow-elev-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-elev-3 motion-safe:animate-hero-rise" style={{ animationDelay: `${0.08 * index}s` }}>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">Step {step.number}</p>
                            <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-navy">{step.title}</h3>
                            <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{step.detail}</p>
                          </div>
                        ) : null}
                      </div>

                      <div className="relative z-10 flex justify-center">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-full border-4 border-white text-lg font-extrabold shadow-lg ${dotClass}`}>
                          {step.number}
                        </div>
                      </div>

                      <div className={!isLeft ? 'flex justify-start' : ''}>
                        {!isLeft ? (
                          <div className="w-full max-w-[30rem] rounded-[28px] border border-stone-200 bg-white p-7 shadow-elev-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-elev-3 motion-safe:animate-hero-rise" style={{ animationDelay: `${0.08 * index}s` }}>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">Step {step.number}</p>
                            <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-navy">{step.title}</h3>
                            <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{step.detail}</p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:hidden">
              {processSteps.map((step, index) => (
                <div
                  key={`mobile-${step.number}`}
                  className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-elev-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-elev-3 motion-safe:animate-hero-rise"
                  style={{ animationDelay: `${0.08 * index}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full text-base font-extrabold text-white ${index === 1 ? 'bg-orange' : 'bg-navy-900'}`}>{step.number}</div>
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
            <div className="mt-8 flex items-center justify-center">
              <Link href={CONSULTATION_CTA_HREF} className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-8 py-4 text-[15px] font-semibold text-white transition-all hover:bg-orange-500">
                Book a Free Project Call
              </Link>
            </div>
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
                <p className="mt-3 text-2xl font-extrabold tracking-tight text-navy-900">North Carolina Statewide</p>
                <p className="mt-2 text-[15px] font-semibold leading-relaxed text-navy-900">525 N Tryon St, Charlotte, NC 28202</p>
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
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-[24px] border border-stone-200 bg-white shadow-elev-1 motion-safe:animate-hero-rise"
                  style={{ animationDelay: `${0.06 * index}s` }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <h3 className="text-lg font-extrabold tracking-tight text-navy-900">{faq.question}</h3>
                    <span className={`text-2xl font-light text-orange transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                      ˅
                    </span>
                  </button>
                  {isOpen ? (
                    <div className="px-6 pb-6">
                      <p className="text-[15px] leading-relaxed text-stone-700">{faq.answer}</p>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

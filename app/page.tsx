'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import FaqItem from '@/components/landing/FaqItem';
import LpLeadForm from '@/components/LpLeadForm';
import FaqJsonLd from '@/components/seo/FaqJsonLd';

// All generic "Book a Project Call" / "Talk Through Your Project" CTAs on
// the homepage route to /book — a role-routing page that lets the user
// pick the right consultation path (homeowner / investor / wholesaler /
// realtor). Previously this pointed to the homeowner-specific consultation
// page, which sent investor and wholesaler intent into the wrong funnel.
const CONSULTATION_CTA_HREF = '/book';

const galleryPreview = [
  { title: 'Standard builder-grade home exterior refresh', image: '/gallery/white-house-after.jpg' },
  { title: 'Farmhouse-style siding and deck transformation', image: '/gallery/farmhouse-after.jpg' },
  { title: 'Historic waterfront district home exterior transformation', image: '/gallery/red-house-after.jpg' },
];

const trustStats = [
  { value: '120+', label: 'Investors & owners served' },
  { value: '4.9★', label: 'Avg client rating' },
  { value: '2-day', label: 'Avg review turnaround' },
  { value: 'NC GC', label: 'Licensed in NC' },
];

const credentials = [
  'Licensed NC GC',
  'Fully Insured',
  'Investor-Focused',
  'Residential Projects Across NC',
  'Planning, Permits, Execution',
];
const duplicatedCredentials = [...credentials, ...credentials];

type ProofIconType = 'review' | 'budget' | 'permit' | 'support' | 'licensed' | 'compass';

const proofCards: { label: string; detail: string; tone: 'red' | 'amber' | 'rose' | 'orange' | 'navy' | 'emerald'; icon: ProofIconType }[] = [
  { label: 'Get Your Deal Reviewed', detail: 'Catch issues before you put more money in', tone: 'red', icon: 'review' },
  { label: 'Know Your Real Budget', detail: 'Avoid underestimating scope and costs', tone: 'amber', icon: 'budget' },
  { label: 'Map Your Permit Path', detail: 'Know what gets approved — and what does not', tone: 'rose', icon: 'permit' },
  { label: 'Get Support During the Project', detail: 'Keep things moving without confusion', tone: 'orange', icon: 'support' },
  { label: 'Work With a Licensed GC', detail: 'Execution when your project calls for it', tone: 'navy', icon: 'licensed' },
  { label: 'Know What to Do Next', detail: 'Clear direction before moving forward', tone: 'emerald', icon: 'compass' },
];

const standardBelief = {
  eyebrow: 'Our Standard',
  heading: 'A home is where someone lives their life. That deserves a standard.',
  body: 'Not a half-finished flip thrown back on the market. Not overpriced “luxury” nobody can afford. The standard isn’t fancy — it’s process, planning, execution, and management, done right. We hold ourselves and every investor and flipper we work with to it. Big fund or first flip, it doesn’t change.',
  tagline: 'Built to a standard. Priced for real life.',
};

const standardPillars = [
  { title: 'Held to a standard', detail: 'Every real estate professional — flippers included — accountable to real process, planning, and management.' },
  { title: 'Homes, not units', detail: 'A place where someone lives their life. We make it great, every time, to the best of our ability.' },
  { title: 'Quality, fairly priced', detail: 'Not janky half-fixes. Not unaffordable “luxury.” Places people can actually live in for a reasonable price.' },
  { title: 'Do right and do well', detail: 'Build it right and make money. It isn’t either/or — it’s both.' },
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


const homepageTestimonials = [
  {
    quote: 'We were about to sink more money in before they walked us through what was actually wrong. Saved us from a bad call.',
    name: 'Madison M.',
    role: 'Broker / Investor',
  },
  {
    quote: 'Scope and budget were all over the place when we called. After they walked through it, the project actually felt doable again.',
    name: 'Justin R.',
    role: 'Developer',
  },
  {
    quote: 'They did not try to sell us a huge scope we did not need. Just told us what to do next and why.',
    name: 'Trisha W.',
    role: 'Investor',
  },
  {
    quote: 'I needed something concrete to bring back to my buyer, not a maybe. They gave me a straight read and the deal kept moving.',
    name: 'Jethro A.',
    role: 'Wholesaler',
  },
  {
    quote: 'Permits and paperwork were eating up my week. They took it off my plate and the jobs stopped stalling.',
    name: 'Taquan P.',
    role: 'Wholesaler',
  },
  {
    quote: 'I had no idea what was a real problem and what was not. They told me what to fix now and what could wait.',
    name: 'Yvonne W.',
    role: 'Homeowner',
  },
];

const processHighlights = [
  { title: 'Clear project direction', detail: 'Know what to do first, what to price next, and what can wait.' },
  { title: 'Faster decision-making', detail: 'Move through scope, budget, and permit questions without getting stuck.' },
  { title: 'Tailored project support', detail: 'Get the level of help that fits the job, from review to full execution.' },
  { title: 'Real contractor insight', detail: 'Use licensed construction judgment instead of guessing through risk.' },
];

const processSteps = [
  { number: '1', title: 'Book a free project call', detail: 'Start with a short conversation about the property, scope, timing, and where things feel unclear.' },
  { number: '2', title: 'Get a project-specific recommendation', detail: 'We point you to the right next step, whether that is due diligence, planning support, or execution help.' },
  { number: '3', title: 'Move forward with the right support', detail: 'Once the path is clear, we help you review, prepare, coordinate, or run the project.' },
  { number: '4', title: 'Project completion', detail: 'Finish with a cleaner handoff, a better result, and a project that actually gets across the line.' },
];

const faqs = [
  { question: 'What types of projects do you help with?', answer: 'We support residential rehabs, rental turns, owner projects, investor projects, permit-heavy work, and jobs that need better planning before construction starts.' },
  { question: 'Do you only work on full construction jobs?', answer: 'No. Some clients need a deal review, budget review, permit help, or oversight support without hiring full contracting right away.' },
  { question: 'What happens on the free project call?', answer: 'We talk through the property, the scope, the current roadblocks, and what next step makes the most sense for the job.' },
  { question: 'Do you work with investors and homeowners?', answer: 'Yes. We work with investors, homeowners, developers, landowners, and operators who need real project guidance and execution support.' },
  { question: 'Can you help before permits or contractor selection?', answer: 'Yes. That is one of the biggest reasons clients come to us. We help clarify scope, budget, permits, and the path forward before the job gets more expensive.' },
  { question: 'How do I know which service to choose?', answer: 'Start with the free project call. We can point you toward the right review, planning service, or execution support based on where the project stands.' },
];

// Disciplined navy↔orange identity — alternating warm/cool tints instead of a
// six-hue rainbow, so the proof grid reads as one brand system.
const TONE_CLASSES: Record<string, string> = {
  red: 'from-[#fa8c41] to-[#e87520]',
  amber: 'from-[#1f376b] to-[#0a1530]',
  rose: 'from-[#fa8c41] to-[#e87520]',
  orange: 'from-[#1f376b] to-[#0a1530]',
  navy: 'from-[#fa8c41] to-[#e87520]',
  emerald: 'from-[#1f376b] to-[#0a1530]',
};

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function CheckIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProofIcon({ type, size = 28 }: { type: ProofIconType; size?: number }) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    'aria-hidden': true,
  };
  const s = { stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  if (type === 'review') {
    // Document with magnifying glass — "deal reviewed"
    return (
      <svg {...props}>
        <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" {...s} />
        <path d="M14 3v6h6" {...s} />
        <circle cx="11" cy="14" r="2.4" {...s} />
        <path d="M13 16l2 2" {...s} />
      </svg>
    );
  }
  if (type === 'budget') {
    // Dollar sign in circle — "real budget"
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="9" {...s} />
        <path d="M15 9.5c-.8-.8-2-1.3-3.2-1.3-1.7 0-3 .9-3 2.2 0 3.2 6.4 1.8 6.4 4.8 0 1.4-1.4 2.4-3.2 2.4-1 0-2-.3-2.8-.8" {...s} />
        <path d="M12 6.5v11" {...s} />
      </svg>
    );
  }
  if (type === 'permit') {
    // Map with pin — "permit path"
    return (
      <svg {...props}>
        <path d="M9 3L3 5v16l6-2 6 2 6-2V3l-6 2z" {...s} />
        <path d="M9 3v16M15 5v16" {...s} />
        <circle cx="12" cy="11" r="1.5" fill="currentColor" />
      </svg>
    );
  }
  if (type === 'support') {
    // Hard hat — "support during project"
    return (
      <svg {...props}>
        <path d="M4 17h16M5 17v-1a7 7 0 0114 0v1" {...s} />
        <path d="M9 10V7a1 1 0 011-1h4a1 1 0 011 1v3" {...s} />
        <path d="M3 20h18" {...s} />
      </svg>
    );
  }
  if (type === 'licensed') {
    // Shield with check — "licensed GC"
    return (
      <svg {...props}>
        <path d="M12 3l8 3v6c0 4.5-3.2 8.2-8 9-4.8-.8-8-4.5-8-9V6l8-3z" {...s} />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  // compass — "know what to do next"
  return (
    <svg {...props}>
      <circle cx="12" cy="12" r="9" {...s} />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  // Maintain FAQ open state (preserved from prior implementation)
  const [, setOpenFaqIndex] = useState(0);
  void setOpenFaqIndex;

  return (
    <>
      <style>{__motionStyles}</style>
      <div className="min-h-screen overflow-x-hidden bg-white text-[#0c1627]">
        <SiteNav />

        {/* HERO — LP-style premium dark navy with bg image + 2-col layout */}
        <section className="relative overflow-hidden bg-[#08111d] pt-24 sm:pt-28">
          <div className="absolute inset-0 scale-[1.04] animate-[heroFloat_22s_ease-in-out_infinite]">
            <Image src="/lp-budget-hero-bg.jpg" alt="" fill className="object-cover object-right opacity-[0.55]" priority />
          </div>
          <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(circle_at_30%_35%,rgba(245,130,32,0.22),transparent_55%)]" />
          <div className="absolute left-[-10%] top-[10%] h-72 w-72 rounded-full bg-[rgba(245,130,32,0.12)] blur-3xl" />
          <div className="absolute bottom-[-6rem] right-[5%] h-80 w-80 rounded-full bg-[rgba(255,255,255,0.06)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(95deg,rgba(4,10,18,0.97)_0%,rgba(5,12,22,0.94)_38%,rgba(6,15,27,0.78)_64%,rgba(7,15,27,0.52)_88%,rgba(7,15,27,0.4)_100%)]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
              maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-14 sm:px-8 sm:pb-28 sm:pt-16">
            <div className="max-w-4xl">
              <p className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41] motion-safe:animate-[heroRise_900ms_ease-out]">
                <span className="block h-px w-10 bg-[#fa8c41]/80" aria-hidden="true" />
                Licensed NC General Contractor · Investor-focused
              </p>
              <h1 className="mt-6 text-[3rem] font-black leading-[0.98] tracking-[-0.045em] text-white sm:text-[4.5rem] lg:text-[5.5rem] motion-safe:animate-[heroRise_1000ms_ease-out_0.1s_both]">
                Plan it right. <span className="text-[#fa8c41]">Run it better.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-[1.55] text-white/85 sm:text-2xl motion-safe:animate-[heroRise_1100ms_ease-out_0.2s_both]">
                Due diligence, planning, and execution support for residential projects.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 max-w-2xl motion-safe:animate-[heroRise_1200ms_ease-out_0.3s_both]">
                <Link
                  href="#due-diligence"
                  className="flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] px-4 py-4 text-center text-sm font-bold text-white transition-all hover:border-[#fa8c41]/60 hover:bg-white/[0.1] hover:-translate-y-0.5"
                >
                  Project Due Diligence
                </Link>
                <Link
                  href="#planning"
                  className="flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] px-4 py-4 text-center text-sm font-bold text-white transition-all hover:border-[#fa8c41]/60 hover:bg-white/[0.1] hover:-translate-y-0.5"
                >
                  Project Planning
                </Link>
                <Link
                  href="#execution"
                  className="flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] px-4 py-4 text-center text-sm font-bold text-white transition-all hover:border-[#fa8c41]/60 hover:bg-white/[0.1] hover:-translate-y-0.5"
                >
                  Project Execution
                </Link>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-5 motion-safe:animate-[heroRise_1300ms_ease-out_0.4s_both]">
                <Link
                  href={CONSULTATION_CTA_HREF}
                  className="inline-flex min-h-[60px] items-center justify-center gap-2 rounded-full bg-[#fa8c41] px-8 py-4 text-[15px] font-black uppercase tracking-[0.06em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.45)] transition-all hover:-translate-y-0.5 hover:bg-[#ffa463]"
                >
                  Book a Free Project Call <span aria-hidden="true">→</span>
                </Link>
                <p className="text-sm font-medium text-white/75">
                  Not sure where to start?{' '}
                  <Link href={CONSULTATION_CTA_HREF} className="text-white underline underline-offset-4 hover:text-[#fa8c41]">
                    Talk through your project.
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STATS BAR */}
        <section className="border-y border-stone-200 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4 sm:px-8">
            {trustStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-black tracking-[-0.03em] text-[#08111d] sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-stone-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CREDENTIALS MARQUEE */}
        <section className="border-b border-stone-200 bg-white py-8 sm:py-10">
          <div className="container-pro overflow-hidden">
            <div className="flex w-max gap-2 motion-safe:animate-marquee hover:[animation-play-state:paused]">
              {duplicatedCredentials.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="flex min-w-[210px] items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-center text-sm font-semibold leading-tight text-[#08111d]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROOF CARDS — LP problem-card style with gradient icons */}
        <section className="bg-stone-50">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="max-w-3xl">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">What to handle before you move forward</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#08111d] sm:text-5xl">
                Before You Move Forward, Handle These First
              </h2>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {proofCards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-2xl border border-stone-200 bg-white p-7 shadow-[0_8px_24px_-12px_rgba(8,17,29,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(8,17,29,0.15)]"
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${TONE_CLASSES[card.tone]} text-white shadow-lg`}>
                    <ProofIcon type={card.icon} size={28} />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold leading-tight tracking-tight text-[#08111d]">{card.label}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-stone-600">{card.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex items-center justify-center">
              <Link
                href={CONSULTATION_CTA_HREF}
                className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-[#fa8c41] px-8 py-4 text-[15px] font-black uppercase tracking-[0.06em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.45)] transition-all hover:-translate-y-0.5 hover:bg-[#ffa463]"
              >
                Talk Through Your Project <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 3 STAGE CARDS */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="max-w-3xl">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">Three places we step in</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#08111d] sm:text-5xl">
                Start at the stage you&rsquo;re actually in.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {stages.map((stage, idx) => (
                <div
                  key={stage.id}
                  id={stage.id}
                  className="scroll-mt-24 flex h-full flex-col rounded-2xl border-2 border-stone-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#fa8c41]/40 hover:shadow-[0_24px_60px_-20px_rgba(8,17,29,0.18)] sm:p-10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#08111d] text-xl font-black">
                    <span className="text-[#fa8c41]">0{idx + 1}</span>
                  </div>
                  <p className="mt-6 text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">{stage.timing}</p>
                  <h3 className="mt-3 text-[1.75rem] font-black leading-tight tracking-[-0.02em] text-[#08111d]">
                    {stage.eyebrow}
                  </h3>
                  <ul className="mt-7 flex flex-1 flex-col space-y-3">
                    {stage.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[15px] font-medium leading-relaxed text-[#08111d]">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[#fa8c41]">
                          <CheckIcon size={14} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={CONSULTATION_CTA_HREF}
                    className="mt-8 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#fa8c41] px-6 py-3 text-sm font-black uppercase tracking-[0.06em] text-white shadow-[0_10px_24px_-8px_rgba(245,130,32,0.4)] transition-all hover:-translate-y-0.5 hover:bg-[#ffa463]"
                  >
                    {stage.cta} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              ))}
            </div>

            <p className="mt-10 text-center text-sm font-medium text-stone-600">
              Need full contracting?{' '}
              <Link href="/contracting" className="font-bold text-[#08111d] underline underline-offset-4 hover:text-[#fa8c41]">
                We handle that when your project calls for it.
              </Link>
            </p>
          </div>
        </section>

        {/* DEAL PACK BRIDGE — wholesalers + realtors flagship, on brand cream */}
        <section className="bg-[#F6F2EC]">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">For wholesalers + realtors</p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#08111d] sm:text-5xl">
                  Selling or assigning a deal?<br />Hand the buyer a GC-verified package.
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-[1.6] text-stone-700">
                  Real investors won&rsquo;t pay top dollar for an unverified deal. Attach a licensed NC GC&rsquo;s
                  rehab budget, scope, and risk report to your assignment or listing &mdash; and attract the buyer pool
                  that actually pays for it. Same property, different buyer pool, 2&ndash;4&times; the fee.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/deal-pack"
                    className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-[#fa8c41] px-8 py-4 text-[15px] font-black uppercase tracking-[0.06em] text-white shadow-[0_14px_30px_-6px_rgba(250,140,65,0.45)] transition-all hover:-translate-y-0.5 hover:bg-[#ffa463]"
                  >
                    See the Deal Pack <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href="/guide/consistent-assignment-wholesaler"
                    className="text-sm font-bold text-[#08111d] underline underline-offset-4 hover:text-[#fa8c41]"
                  >
                    Or grab the free playbook
                  </Link>
                </div>
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[13px] font-bold uppercase tracking-[0.08em] text-stone-500">
                  <span><span className="text-[#fa8c41]">2&ndash;4&times;</span> fee uplift</span>
                  <span><span className="text-[#fa8c41]">5&ndash;9</span> days to close</span>
                  <span><span className="text-[#fa8c41]">NC GC</span> #107724 stamp</span>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-[40px] bg-[#fa8c41]/15 blur-[70px]" aria-hidden="true" />
                <div className="relative">
                  <div className="absolute -right-10 top-6 w-[180px] rotate-[7deg] opacity-80">
                    <Image src="/product-mockups/wholesale-to-flip-9-month-cover.jpg" alt="Wholesaler-to-flipper case study" width={180} height={233} className="rounded-[10px] border border-stone-300 shadow-[0_24px_50px_-16px_rgba(8,17,29,0.45)]" />
                  </div>
                  <div className="relative w-[240px] -rotate-[4deg]">
                    <Image src="/product-mockups/consistent-assignment-wholesaler-cover.jpg" alt="The $25–40K Assignment Playbook" width={240} height={310} className="rounded-[12px] border border-stone-300 shadow-[0_30px_60px_-18px_rgba(8,17,29,0.55)] ring-1 ring-[#fa8c41]/30" />
                    <div className="absolute -top-3 -right-3 rounded-full bg-[#fa8c41] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white shadow-[0_8px_20px_-4px_rgba(250,140,65,0.6)]">Free playbooks</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OWNER-CONTROLLED BUILD FLAGSHIP */}
        <section id="owner-controlled-build" className="relative overflow-hidden bg-[#08111d] text-white">
          <div className="absolute inset-0 motion-safe:animate-[heroFloat_22s_ease-in-out_infinite] bg-[linear-gradient(125deg,#163061_0%,#10254c_50%,#143367_100%)]" style={{ backgroundSize: '180% 180%' }} aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
              maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <p className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">
                  <span className="block h-px w-10 bg-[#fa8c41]/80" aria-hidden="true" />
                  Our flagship build model
                </p>
                <h2 className="mt-5 text-4xl font-black leading-[1.0] tracking-[-0.03em] text-white sm:text-6xl">
                  Owner-Controlled <span className="text-[#fa8c41]">Build.</span>
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
                  You stay the owner. We provide the GC structure, pull the permits, and run the execution controls. A hybrid model — most of the upside of self-managing, none of the chaos.
                </p>
                <div className="mt-9 grid gap-5 sm:grid-cols-2 max-w-xl">
                  {[
                    { title: 'GC authority on paper', detail: 'Permits pulled under our license.' },
                    { title: 'Execution controls', detail: 'Scope, schedule, budget, draws.' },
                    { title: 'You stay PM', detail: 'Own the calls. Keep the margin.' },
                    { title: 'Real backup', detail: 'Estimator, permit admin, draw support.' },
                  ].map((point) => (
                    <div key={point.title} className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#fa8c41]/30 bg-[#fa8c41]/10 text-[#fa8c41]">
                        <CheckIcon size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-white">{point.title}</p>
                        <p className="mt-0.5 text-sm text-white/65">{point.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link
                    href="/platform/co4"
                    className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-[#fa8c41] px-7 py-4 text-[15px] font-black uppercase tracking-[0.06em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.45)] hover:-translate-y-0.5 hover:bg-[#ffa463] transition-all"
                  >
                    See If It Fits <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href="/contracting"
                    className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-4 text-[15px] font-bold text-white hover:bg-white/5"
                  >
                    Compare with full contracting
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-7">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white/55">The three execution options</p>
                  <div className="mt-5 space-y-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-bold text-white">Construction Oversight</p>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">Advisory</span>
                      </div>
                      <p className="mt-2 text-sm text-white/65">We review. You run it.</p>
                    </div>
                    <div className="relative rounded-xl border-2 border-[#fa8c41]/60 bg-[#fa8c41]/[0.12] p-5">
                      <span className="absolute -top-2.5 left-4 rounded-full bg-[#fa8c41] px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.2em] text-white">Flagship</span>
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-bold text-white">Owner-Controlled Build</p>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#fa8c41]">Hybrid</span>
                      </div>
                      <p className="mt-2 text-sm text-white/80">We carry the license. You PM the build.</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-bold text-white">Full Execution</p>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">Full GC</span>
                      </div>
                      <p className="mt-2 text-sm text-white/65">We run it. You step back.</p>
                    </div>
                  </div>
                  <Link
                    href="/platform"
                    className="mt-5 inline-flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.08em] text-[#fa8c41] transition-all hover:gap-3"
                  >
                    See all three on the Investor Execution Platform <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS — 3-col grid with stars */}
        <section className="bg-stone-50">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">Reviews</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#08111d] sm:text-5xl">
                What clients say after working with Southern Cities.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-stone-600">
                Real feedback on project support, construction guidance, and getting the right next step before the wrong spend happens.
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {homepageTestimonials.map((t) => (
                <blockquote
                  key={t.name + t.role}
                  className="rounded-2xl border border-stone-200 bg-white p-7 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="flex items-center gap-1 text-[#fa8c41]">
                    {[1, 2, 3, 4, 5].map((i) => (<StarIcon key={i} />))}
                  </div>
                  <p className="mt-5 text-[15px] leading-[1.55] text-[#08111d]">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-6 flex items-center gap-3 border-t border-stone-100 pt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-[#fa8c41] text-sm font-black text-white">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-[#08111d]">{t.name}</p>
                      <p className="text-[13px] text-stone-500">{t.role}</p>
                    </div>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECT GALLERY */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">Real project gallery</p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#08111d] sm:text-5xl">
                  Real Projects. Real Work.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-stone-600">
                  Renovations, builds, and active project work across North Carolina.
                </p>
              </div>
              <Link
                href="/gallery"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-stone-300 bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.06em] text-[#08111d] transition-all hover:-translate-y-0.5 hover:border-[#fa8c41] hover:text-[#fa8c41]"
              >
                View Full Gallery →
              </Link>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {galleryPreview.map((item) => (
                <Link key={item.title} href="/gallery" className="group block overflow-hidden rounded-2xl border border-stone-200 bg-stone-50">
                  <div className="relative aspect-[4/3]">
                    <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm font-semibold text-[#08111d]">{item.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* OUR STANDARD — brand belief */}
        <section className="relative overflow-hidden bg-[#08111d]">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
              maskImage: 'radial-gradient(ellipse at top left, black 30%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse at top left, black 30%, transparent 75%)',
            }}
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="max-w-3xl">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">{standardBelief.eyebrow}</p>
              <h2 className="mt-3 text-4xl font-black leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
                {standardBelief.heading}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/75">{standardBelief.body}</p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {standardPillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-all hover:-translate-y-0.5 hover:border-[#fa8c41]/40"
                >
                  <p className="text-lg font-extrabold tracking-tight text-white">{pillar.title}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/65">{pillar.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col items-start gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-2xl font-black tracking-tight text-[#fa8c41] sm:text-3xl">{standardBelief.tagline}</p>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-white/50">NC General Contractor · License #107724</p>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="bg-stone-50">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">Our process</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#08111d] sm:text-5xl">How projects move forward</h2>
              <p className="mt-5 text-lg leading-relaxed text-stone-600">
                A simple process to help you get clarity, choose the right next step, and keep the project moving.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {processHighlights.map((item) => (
                <div key={item.title} className="rounded-2xl border border-stone-200 bg-white p-7 text-center transition-all hover:-translate-y-0.5 hover:shadow-lg">
                  <p className="text-lg font-extrabold tracking-tight text-[#08111d]">{item.title}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-stone-600">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="relative mt-16 grid gap-8 md:grid-cols-4">
              <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-[#fa8c41]/30 to-transparent md:block" aria-hidden="true" />
              {processSteps.map((step) => (
                <div key={step.number} className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#08111d] text-xl font-black shadow-lg ring-8 ring-stone-50">
                    <span className="text-[#fa8c41]">{step.number}</span>
                  </div>
                  <p className="mt-5 text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">Step {step.number}</p>
                  <h3 className="mt-2 text-xl font-extrabold tracking-tight text-[#08111d]">{step.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-stone-600">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BIG CTA */}
        <section className="relative overflow-hidden bg-[#08111d]">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
              maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            }}
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:px-8 sm:py-24">
            <h2 className="text-4xl font-black leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl">
              Ready to move your project <span className="text-[#fa8c41]">forward?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              Book a free project call to talk through the job, get clarity on the next step, and decide what support makes sense.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <Link
                href={CONSULTATION_CTA_HREF}
                className="inline-flex min-h-[60px] items-center justify-center gap-2 rounded-full bg-[#fa8c41] px-8 py-4 text-[15px] font-black uppercase tracking-[0.06em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.45)] transition-all hover:-translate-y-0.5 hover:bg-[#ffa463]"
              >
                Book a Free Project Call <span aria-hidden="true">→</span>
              </Link>
              <a href="tel:+19804737249" className="inline-flex items-center gap-2 text-sm font-bold text-white/75 hover:text-white">
                Or call (980) 473-7249
              </a>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">Get in touch</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#08111d] sm:text-5xl">Talk with us about your project</h2>
              <p className="mt-5 text-lg leading-relaxed text-stone-600">
                Have questions about the project, the budget, or the right next step? Contact us or book a free project call.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-4">
                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">Call</p>
                  <a href="tel:+19804737249" className="mt-3 block text-2xl font-black tracking-tight text-[#08111d] hover:text-[#fa8c41]">
                    (980) 473-7249
                  </a>
                  <p className="mt-2 text-[15px] leading-relaxed text-stone-600">Talk through the job, ask questions, and get help figuring out the next move.</p>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">Email</p>
                  <a href="mailto:info@southerncitiesconstruction.com" className="mt-3 block break-all text-lg font-black tracking-tight text-[#08111d] hover:text-[#fa8c41]">
                    info@southerncitiesconstruction.com
                  </a>
                  <p className="mt-2 text-[15px] leading-relaxed text-stone-600">Send over your project details, timeline, or questions and we can point you in the right direction.</p>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">Service area</p>
                  <p className="mt-3 text-xl font-black tracking-tight text-[#08111d]">North Carolina Statewide</p>
                  <p className="mt-2 text-[15px] font-semibold leading-relaxed text-[#08111d]">525 N Tryon St, Charlotte, NC 28202</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-stone-600">Residential projects, investor work, planning support, permits, oversight, and full contracting when needed.</p>
                </div>
              </div>

              <div>
                <LpLeadForm
                  id="homepage-contact-form"
                  serviceSlug="homepage-general-inquiry"
                  serviceName="Homepage — general project inquiry"
                  source="homepage-contact"
                  headline="Talk to us about your project"
                  subhead="Tell us where the project is — scope, timeline, what you're trying to figure out — and a licensed NC GC will get back within 1 business day."
                  submitLabel="Send Project Details"
                  variant="light"
                />
                <div className="mt-6 rounded-2xl border-2 border-[#fa8c41]/20 bg-stone-50 p-5">
                  <p className="text-sm font-bold text-[#08111d]">Prefer to talk live?</p>
                  <Link
                    href={CONSULTATION_CTA_HREF}
                    className="mt-3 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#fa8c41] px-5 py-3 text-[13px] font-black uppercase tracking-[0.06em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#ffa463]"
                  >
                    Schedule a Free Project Call <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-stone-50">
          <FaqJsonLd items={faqs} />
          <div className="mx-auto max-w-4xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">FAQ</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#08111d] sm:text-5xl">Frequently asked questions</h2>
              <p className="mt-5 text-lg leading-relaxed text-stone-600">
                Straight answers to the questions clients usually ask before they move forward.
              </p>
            </div>
            <div className="mt-12 space-y-3">
              {faqs.map((faq, idx) => (
                <FaqItem key={faq.question} faq={{ q: faq.question, a: faq.answer }} defaultOpen={idx === 0} />
              ))}
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}

const __motionStyles = `
@keyframes heroFloat {
  0%, 100% { transform: scale(1.04) translate3d(0, 0, 0); }
  50% { transform: scale(1.08) translate3d(-12px, -8px, 0); }
}

@keyframes heroRise {
  0% { opacity: 0; transform: translate3d(0, 24px, 0); filter: blur(4px); }
  60% { filter: blur(0); }
  100% { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); }
}
`;

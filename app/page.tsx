'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import RealDeals from '@/components/RealDeals';
import FaqItem from '@/components/landing/FaqItem';
import FaqJsonLd from '@/components/seo/FaqJsonLd';

// All generic homepage consultation CTAs ("Talk Through Your Project",
// "Get Started", etc.) route to /start — the universal intake form that
// routes the lead by audience + intent. Replaced the old /book role-router
// when the booking funnel was consolidated into one "Get Started" front door.
const CONSULTATION_CTA_HREF = '/start';

const galleryPreview = [
  { title: 'Standard builder-grade home exterior refresh', image: '/gallery/white-house-after.jpg' },
  { title: 'Farmhouse-style siding and deck transformation', image: '/gallery/farmhouse-after.jpg' },
  { title: 'Historic waterfront district home exterior transformation', image: '/gallery/red-house-after.jpg' },
];

const trustStats = [
  { value: '120+', label: 'Investors & owners served' },
  { value: '5 yrs', label: 'In business' },
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

const ladderRungs = [
  {
    title: 'Build-Ready Deal Pack',
    badge: '$1,997 · Flagship',
    badgeClass: 'bg-orange-50 text-orange-700',
    detail: 'Committed rehab price in writing, sealed with the NC GC license. Ships with plans, renderings, market study, materials list, vendor list, permit memo, and risk report.',
    cta: 'See Build-Ready',
    href: '/deal-pack',
  },
  {
    title: 'Bid-Ready Deal Pack',
    badge: '$599 · Downsell',
    badgeClass: 'bg-sky-50 text-sky-700',
    detail: 'The lighter version — GC-verified rehab budget range and scope, without the plans and renderings. When you just need the number.',
    cta: 'See Bid-Ready',
    href: '/deal-pack',
  },
  {
    title: 'Free Rehab Snapshot',
    badge: 'Free',
    badgeClass: 'bg-emerald-50 text-emerald-700',
    detail: 'A GC-calibrated rehab range and risk read on any NC property — in minutes, no commitment.',
    cta: 'Get the snapshot',
    href: '/lp/rehab-budget-range-execution-risk-snapshot',
  },
];

const standardBelief = {
  tagline: 'Built to a standard. Priced for real life.',
};

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

const faqs = [
  { question: 'What is the Build-Ready Deal Pack?', answer: 'A licensed NC GC delivers a committed rehab price in writing, sealed with license #107724 and transferable once to your end buyer. Ships with as-built plans, future-state renovation plan, three photoreal renderings, a market study, an initial materials list, a vendor list, a permit memo, and an execution risk report.' },
  { question: 'How does the wholesaler payment work?', answer: '$0 upfront. The fee is paid from your assignment proceeds at closing. No close, no pay. The specific fee is confirmed on a short scoping call.' },
  { question: 'Is the committed price a guarantee?', answer: 'It is a committed bid for the defined scope, sealed with the NC GC license. Not a guarantee against every possible condition — change orders apply to concealed or hidden conditions discovered during work.' },
  { question: 'How long is the committed price good for?', answer: '30 days from issue. Enough runway to underwrite, market, and close an assignment or investor buy.' },
  { question: 'Can the committed price be transferred to my buyer?', answer: 'Yes, once. The Commitment Certificate transfers from the wholesaler to their end buyer at closing so the buyer inherits the licensed GC and the price on paper.' },
  { question: 'Do you review a deal I don’t own yet?', answer: 'Yes. Most GCs won’t. We will. That’s the whole point of the pack — you get a real GC read before you sign.' },
];

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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
                A construction platform · Backed by a licensed NC GC · #107724
              </p>
              <h1 className="mt-6 text-[2.6rem] font-black leading-[1.02] tracking-[-0.04em] text-white sm:text-[4rem] lg:text-[4.75rem] motion-safe:animate-[heroRise_1000ms_ease-out_0.1s_both]">
                A licensed NC GC&rsquo;s <span className="text-[#fa8c41]">committed rehab price</span> on your deal &mdash; before you buy it.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-[1.55] text-white/85 sm:text-xl motion-safe:animate-[heroRise_1100ms_ease-out_0.2s_both]">
                Most GCs won&rsquo;t review a deal you don&rsquo;t own yet. <span className="text-white font-semibold">We will.</span> Pick your door below.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 max-w-3xl motion-safe:animate-[heroRise_1200ms_ease-out_0.3s_both]">
                <Link
                  href="/lp/wholesaler-deal-pack"
                  className="group flex flex-col justify-between rounded-xl border border-white/15 bg-white/[0.06] p-5 text-left transition-all hover:border-[#fa8c41]/60 hover:bg-white/[0.1] hover:-translate-y-0.5"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#fa8c41]">Wholesalers</span>
                  <span className="mt-2 text-[15px] font-bold leading-snug text-white">Committed rehab price on your deal. $0 upfront, paid at closing.</span>
                  <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-bold text-[#fa8c41] group-hover:gap-2 transition-all">Enter <span aria-hidden="true">&rarr;</span></span>
                </Link>
                <Link
                  href="/lp/investor-deal-pack"
                  className="group flex flex-col justify-between rounded-xl border border-white/15 bg-white/[0.06] p-5 text-left transition-all hover:border-[#fa8c41]/60 hover:bg-white/[0.1] hover:-translate-y-0.5"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#fa8c41]">Investors</span>
                  <span className="mt-2 text-[15px] font-bold leading-snug text-white">Know the real number before you buy the deal. $1,997.</span>
                  <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-bold text-[#fa8c41] group-hover:gap-2 transition-all">Enter <span aria-hidden="true">&rarr;</span></span>
                </Link>
                <Link
                  href="/lp/realtor-deal-pack"
                  className="group flex flex-col justify-between rounded-xl border border-white/15 bg-white/[0.06] p-5 text-left transition-all hover:border-[#fa8c41]/60 hover:bg-white/[0.1] hover:-translate-y-0.5"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#fa8c41]">Realtors</span>
                  <span className="mt-2 text-[15px] font-bold leading-snug text-white">Committed rehab price + renderings for listings that need work.</span>
                  <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-bold text-[#fa8c41] group-hover:gap-2 transition-all">Enter <span aria-hidden="true">&rarr;</span></span>
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
                  Homeowner?{' '}
                  <Link href="/contracting" className="text-white underline underline-offset-4 hover:text-[#fa8c41]">
                    See our full contracting page.
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

        {/* PRODUCT LADDER — how to work with us */}
        <section id="how-to-start" className="border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="max-w-3xl">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">How to work with us</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#08111d] sm:text-5xl">
                Start with the flagship. Downsize if it doesn&rsquo;t fit.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-600">
                Lead with the <span className="font-bold text-[#08111d]">Build-Ready Deal Pack ($1,997)</span> &mdash;
                a licensed NC GC&rsquo;s committed rehab price sealed with the license, plus everything a buyer or
                lender needs. Not sure yet? Start free.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {ladderRungs.map((rung, i) => (
                <Link
                  key={rung.title}
                  href={rung.href}
                  className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-7 shadow-[0_8px_24px_-12px_rgba(8,17,29,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#fa8c41]/50 hover:shadow-[0_20px_40px_-16px_rgba(8,17,29,0.15)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-[0.16em] text-stone-400">Step {i + 1}</span>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${rung.badgeClass}`}>{rung.badge}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-extrabold leading-tight tracking-tight text-[#08111d]">{rung.title}</h3>
                  <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-stone-600">{rung.detail}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#fa8c41]">
                    {rung.cta} <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* REAL DEALS — real NC case studies (proof) */}
        <RealDeals />

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
                  committed rehab price, scope, and risk report to your assignment or listing &mdash; and attract the
                  buyer pool that actually pays for it. Same property, different buyer pool.
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
                  <span><span className="text-[#fa8c41]">Committed price</span> in writing</span>
                  <span><span className="text-[#fa8c41]">$0 upfront</span> for wholesalers &middot; pay at closing</span>
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

        {/* OUR STANDARD — trimmed to two lines per brief */}
        <section className="relative overflow-hidden bg-[#08111d]">
          <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-16">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-2xl font-black tracking-tight text-[#fa8c41] sm:text-3xl">{standardBelief.tagline}</p>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-white/50">NC General Contractor · License #107724</p>
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

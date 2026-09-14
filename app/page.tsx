'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import RealDeals from '@/components/RealDeals';
import FaqItem from '@/components/landing/FaqItem';
import FaqJsonLd from '@/components/seo/FaqJsonLd';

const CONSULTATION_CTA_HREF = '/start';

const doors = [
  {
    label: 'Wholesalers',
    title: 'Committed rehab price on your deal.',
    meta: '$0 upfront · paid at closing · no close, no pay',
    href: '/lp/wholesaler-deal-pack',
  },
  {
    label: 'Investors',
    title: 'Know the real number before you buy.',
    meta: 'Build-Ready Deal Pack · $1,997',
    href: '/lp/investor-deal-pack',
  },
  {
    label: 'Realtors',
    title: 'Move listings that need work.',
    meta: 'Committed price + renderings',
    href: '/lp/realtor-deal-pack',
  },
];

const trustNumbers = [
  { value: '120+', label: 'Investors & owners served' },
  { value: '5 yrs', label: 'In business, NC' },
  { value: '2-day', label: 'Deal review turnaround' },
  { value: '#107724', label: 'NC GC license' },
];

const galleryPreview = [
  { title: 'Standard builder-grade home exterior refresh', image: '/gallery/white-house-after.jpg' },
  { title: 'Farmhouse-style siding and deck transformation', image: '/gallery/farmhouse-after.jpg' },
  { title: 'Historic waterfront district home exterior transformation', image: '/gallery/red-house-after.jpg' },
];

const homepageTestimonials = [
  { quote: 'We were about to sink more money in before they walked us through what was actually wrong. Saved us from a bad call.', name: 'Madison M.', role: 'Broker / Investor' },
  { quote: 'Scope and budget were all over the place when we called. After they walked through it, the project actually felt doable again.', name: 'Justin R.', role: 'Developer' },
  { quote: 'I needed something concrete to bring back to my buyer, not a maybe. They gave me a straight read and the deal kept moving.', name: 'Jethro A.', role: 'Wholesaler' },
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
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function Home() {
  const [, setOpenFaqIndex] = useState(0);
  void setOpenFaqIndex;

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--paper)', color: 'var(--ink-mid)' }}>
      <SiteNav />

      {/* HERO — full-bleed dark shell, huge display type, hard rules, 3 doors */}
      <section className="relative overflow-hidden" style={{ background: 'var(--shell)', color: '#f2efe7' }}>
        <div className="absolute inset-0 opacity-[0.20]">
          <Image src="/lp-budget-hero-bg.jpg" alt="" fill className="object-cover object-right" priority />
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, var(--shell) 0%, var(--shell) 42%, rgba(14,15,17,0.75) 72%, rgba(14,15,17,0.35) 100%)' }} />
        <div className="relative im-container pt-32 sm:pt-40 pb-20 sm:pb-24">
          <p className="im-eyebrow im-eyebrow--on-dark">A construction platform · NC GC #107724</p>
          <h1 className="im-display im-display--on-dark mt-8 text-[3.2rem] sm:text-[5rem] lg:text-[6.5rem] max-w-5xl">
            A licensed NC GC&rsquo;s <span style={{ color: 'var(--accent)' }}>committed rehab price</span> on your deal.
          </h1>
          <p className="im-body im-body--on-dark mt-8 max-w-2xl text-lg sm:text-xl">
            Most GCs won&rsquo;t review a deal you don&rsquo;t own yet.
            <span className="text-white font-semibold"> We will.</span> Pick your door.
          </p>
        </div>

        {/* Doors — full-width bar, sharp corners, hard rules */}
        <div className="relative im-container pb-20 sm:pb-24">
          <div className="im-doors im-doors--on-dark">
            {doors.map((d) => (
              <Link key={d.label} href={d.href} className="im-door">
                <div>
                  <span className="im-door__label">{d.label}</span>
                  <p className="im-door__title" style={{ color: '#ffffff' }}>{d.title}</p>
                  <p className="im-door__meta" style={{ color: 'rgba(242,239,231,0.6)' }}>{d.meta}</p>
                </div>
                <span className="im-door__cta" style={{ color: '#ffffff' }}>Enter</span>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link href={CONSULTATION_CTA_HREF} className="im-btn im-btn--primary">
              Book a Free Project Call <span aria-hidden="true">&rarr;</span>
            </Link>
            <p className="text-sm text-white/60">
              Homeowner?{' '}
              <Link href="/contracting" className="text-white underline underline-offset-4 hover:text-orange">
                See our full contracting page.
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* TRUST BAR — four numbers, monolithic, sharp */}
      <section className="border-y" style={{ borderColor: 'var(--line-1)', background: 'var(--paper)' }}>
        <div className="im-container grid grid-cols-2 md:grid-cols-4">
          {trustNumbers.map((n, i) => (
            <div
              key={n.label}
              className={`px-6 py-10 md:py-14 ${i < trustNumbers.length - 1 ? 'md:border-r' : ''} ${i < 2 ? 'border-b md:border-b-0' : ''} ${i === 0 || i === 2 ? 'border-r' : ''}`}
              style={{ borderColor: 'var(--line-1)' }}
            >
              <p className="font-black text-[2rem] md:text-[2.5rem] tracking-[-0.03em]" style={{ color: 'var(--ink-hi)' }}>{n.value}</p>
              <p className="mt-2 im-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: 'var(--ink-lo)' }}>{n.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REAL DEALS — the existing component (already tightened) */}
      <RealDeals />

      {/* DEAL PACK PROOF LINE — single-message, dark band, huge type */}
      <section className="im-shell relative overflow-hidden">
        <div className="im-container im-section">
          <p className="im-eyebrow im-eyebrow--on-dark">The offer</p>
          <h2 className="im-display im-display--on-dark mt-6 text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] max-w-4xl">
            The <span style={{ color: 'var(--accent)' }}>Build-Ready Deal Pack.</span>
            <br />Everything a serious buyer or lender needs.
          </h2>
          <p className="im-body im-body--on-dark mt-8 max-w-2xl text-lg">
            Committed rehab price in writing, sealed with the NC GC license and transferable once to your end buyer.
            Plans, renderings, market study, materials list, vendor list, permit memo, execution risk report.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/deal-pack" className="im-btn im-btn--primary">
              See what&rsquo;s inside &rarr;
            </Link>
            <Link href="/lp/wholesaler-deal-pack" className="im-btn im-btn--ghost-on-dark">
              Wholesaler terms
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — three columns, sharp cards, no rounded */}
      <section className="im-band">
        <div className="im-container im-section">
          <p className="im-eyebrow">Reviews</p>
          <h2 className="im-h2 mt-4 text-[2.25rem] sm:text-[3rem] max-w-2xl">
            What clients say after working with Southern Cities.
          </h2>
          <div className="mt-12 grid gap-0 md:grid-cols-3 border" style={{ borderColor: 'var(--line-1)' }}>
            {homepageTestimonials.map((t, i) => (
              <blockquote
                key={t.name}
                className={`bg-white p-8 ${i > 0 ? 'border-t md:border-t-0 md:border-l' : ''}`}
                style={{ borderColor: 'var(--line-1)' }}
              >
                <div className="flex items-center gap-1" style={{ color: 'var(--accent)' }}>
                  {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} />)}
                </div>
                <p className="mt-5 text-[15px] leading-[1.55]" style={{ color: 'var(--ink-mid)' }}>&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--line-2)' }}>
                  <p className="im-mono text-[13px] font-bold uppercase tracking-[0.1em]" style={{ color: 'var(--ink-hi)' }}>{t.name}</p>
                  <p className="text-[12px] mt-1" style={{ color: 'var(--ink-lo)' }}>{t.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY — big photos, sharp corners, hard captions */}
      <section className="im-paper">
        <div className="im-container im-section">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <p className="im-eyebrow">Real work</p>
              <h2 className="im-h2 mt-4 text-[2.25rem] sm:text-[3rem] max-w-2xl">
                Actual NC projects.
              </h2>
            </div>
            <Link href="/gallery" className="im-btn im-btn--ghost">
              View full gallery &rarr;
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {galleryPreview.map((item) => (
              <Link key={item.title} href="/gallery" className="group block">
                <div className="relative aspect-[4/3] overflow-hidden" style={{ borderRadius: 'var(--radius-block)' }}>
                  <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <p className="mt-4 im-mono text-[13px] uppercase tracking-[0.08em]" style={{ color: 'var(--ink-hi)' }}>{item.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STANDARD TAGLINE — one line, big, dark */}
      <section className="im-shell">
        <div className="im-container py-16">
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
            <p className="im-display im-display--on-dark text-[1.75rem] sm:text-[2.5rem]" style={{ color: 'var(--accent)' }}>
              Built to a standard. Priced for real life.
            </p>
            <p className="im-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: 'rgba(242,239,231,0.55)' }}>
              NC General Contractor · License #107724
            </p>
          </div>
        </div>
      </section>

      {/* BIG CTA */}
      <section className="im-shell border-t" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
        <div className="im-container im-section text-center">
          <h2 className="im-display im-display--on-dark text-[2.5rem] sm:text-[4rem] max-w-3xl mx-auto">
            Ready to move your project <span style={{ color: 'var(--accent)' }}>forward?</span>
          </h2>
          <p className="im-body im-body--on-dark mx-auto mt-6 max-w-2xl text-lg">
            Book a free project call to talk through the job, get clarity on the next step, and decide what support makes sense.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href={CONSULTATION_CTA_HREF} className="im-btn im-btn--primary">
              Book a Free Project Call &rarr;
            </Link>
            <a href="tel:+19804737249" className="im-btn im-btn--ghost-on-dark">
              Or call (980) 473-7249
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="im-band">
        <FaqJsonLd items={faqs} />
        <div className="im-container im-section max-w-4xl">
          <p className="im-eyebrow">FAQ</p>
          <h2 className="im-h2 mt-4 text-[2.25rem] sm:text-[3rem]">
            Straight answers.
          </h2>
          <div className="mt-10 space-y-3">
            {faqs.map((faq, idx) => (
              <FaqItem key={faq.question} faq={{ q: faq.question, a: faq.answer }} defaultOpen={idx === 0} />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

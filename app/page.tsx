'use client';

import { useState, useRef, useCallback, MouseEvent as ReactMouseEvent } from 'react';
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
    meta: 'A licensed NC GC prices your assignment — sealed with the license, transferable to your end buyer at closing.',
    price: '$0',
    priceNote: 'upfront · paid at closing · no close, no pay',
    href: '/lp/wholesaler-deal-pack',
  },
  {
    label: 'Investors',
    title: 'Know the real number before you buy.',
    meta: 'Full pre-construction package on your deal — plans, renderings, scope, permits, and a committed rehab price.',
    price: '$1,997',
    priceNote: 'Build-Ready Deal Pack · flagship',
    href: '/lp/investor-deal-pack',
  },
  {
    label: 'Realtors',
    title: 'Move listings that need work.',
    meta: 'Attach a committed rehab price and three photoreal renderings of the finished home to your listing.',
    price: '$1,997',
    priceNote: 'Per listing · MLS-ready package',
    href: '/lp/realtor-deal-pack',
  },
];

const stats = [
  { value: '120+', label: 'Investors & owners served' },
  { value: '2-day', label: 'Deal review turnaround' },
  { value: '100%', label: 'Sealed with #107724' },
  { value: '5 yrs', label: 'NC operations' },
];

const galleryPreview = [
  { title: 'Standard builder-grade home exterior refresh', image: '/gallery/white-house-after.jpg' },
  { title: 'Farmhouse-style siding and deck transformation', image: '/gallery/farmhouse-after.jpg' },
  { title: 'Historic waterfront district home exterior transformation', image: '/gallery/red-house-after.jpg' },
];

const testimonials = [
  { quote: 'They walked me through what was actually wrong before I sank more money into it. Saved me from a bad buy.', name: 'Madison M.', role: 'Broker / Investor · Charlotte' },
  { quote: 'Scope and budget were all over the place when we called. After they walked through it, the project actually felt doable again.', name: 'Justin R.', role: 'Developer · Raleigh' },
  { quote: 'I needed something concrete to bring back to my buyer, not a maybe. They gave me a straight read and the deal kept moving.', name: 'Jethro A.', role: 'Wholesaler · Greensboro' },
];

const faqs = [
  { question: 'What is the Build-Ready Deal Pack?', answer: 'A licensed NC GC delivers a committed rehab price in writing, sealed with license #107724 and transferable once to your end buyer. Ships with as-built plans, future-state renovation plan, three photoreal renderings, a market study, an initial materials list, a vendor list, a permit memo, and an execution risk report.' },
  { question: 'How does the wholesaler payment work?', answer: '$0 upfront. The fee is paid from your assignment proceeds at closing. No close, no pay. The specific fee is confirmed on a short scoping call.' },
  { question: 'Is the committed price a guarantee?', answer: 'It is a committed bid for the defined scope, sealed with the NC GC license. Not a guarantee against every possible condition — change orders apply to concealed or hidden conditions discovered during work.' },
  { question: 'How long is the committed price good for?', answer: '30 days from issue. Enough runway to underwrite, market, and close an assignment or investor buy.' },
  { question: 'Can the committed price be transferred to my buyer?', answer: 'Yes, once. The Commitment Certificate transfers from the wholesaler to their end buyer at closing so the buyer inherits the licensed GC and the price on paper.' },
  { question: 'Do you review a deal I don’t own yet?', answer: 'Yes. Most GCs won’t. We will. That’s the whole point of the pack — you get a real GC read before you sign.' },
];

/** Update --mx / --my CSS vars on the element as percentages of its own box. */
function trackMouse(el: HTMLElement, e: ReactMouseEvent) {
  const rect = el.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  el.style.setProperty('--mx', `${x}%`);
  el.style.setProperty('--my', `${y}%`);
}

/** Same, but sets --card-mx / --card-my (for door cards). */
function trackCardMouse(el: HTMLElement, e: ReactMouseEvent) {
  const rect = el.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  el.style.setProperty('--card-mx', `${x}%`);
  el.style.setProperty('--card-my', `${y}%`);
}

export default function Home() {
  const [, setOpenFaqIndex] = useState(0);
  void setOpenFaqIndex;

  const heroRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const onHeroMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    if (heroRef.current) trackMouse(heroRef.current, e);
  }, []);
  const onCtaMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    if (ctaRef.current) trackMouse(ctaRef.current, e);
  }, []);
  const onDoorMove = useCallback((e: ReactMouseEvent<HTMLAnchorElement>) => {
    trackCardMouse(e.currentTarget, e);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--paper)', color: 'var(--ink-mid)' }}>
      <SiteNav />

      {/* HERO — deep navy shell with cursor-following radial spotlight */}
      <section
        ref={heroRef}
        className="p-hero"
        onMouseMove={onHeroMove}
      >
        <div className="p-hero-bg" aria-hidden="true" />
        <div className="p-hero-grid" aria-hidden="true" />
        <div className="im-container pt-32 sm:pt-40 pb-20 sm:pb-24 relative">
          <span className="p-eyebrow-pill">
            <span className="p-eyebrow-dot" aria-hidden="true" />
            Committed rehab prices · NC statewide
          </span>
          <h1 className="im-display im-display--on-dark mt-8 text-[2.6rem] sm:text-[4rem] lg:text-[5.25rem] max-w-5xl">
            A licensed NC GC&rsquo;s <span className="p-gradient-text">committed rehab price</span> on your deal &mdash; before you buy it.
          </h1>
          <p className="im-body im-body--on-dark mt-6 max-w-2xl text-lg sm:text-xl">
            Most GCs won&rsquo;t review a deal you don&rsquo;t own yet.
            <span className="text-white font-semibold"> We will.</span> Sealed with license #107724 and transferable once at closing.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href={CONSULTATION_CTA_HREF} className="im-btn im-btn--primary">
              Book a free project call &rarr;
            </Link>
            <Link href="/deal-pack" className="im-btn im-btn--ghost-on-dark">
              See what&rsquo;s inside
            </Link>
          </div>
          <div className="p-trust-row mt-10">
            <div className="p-trust">
              <span className="p-stars">★★★★★</span>
              <span className="p-trust-num">4.9</span>
              <span className="p-trust-label">Google reviews</span>
            </div>
            <div className="p-trust">
              <span className="p-trust-num">120+</span>
              <span className="p-trust-label">Deals reviewed</span>
            </div>
            <div className="p-trust">
              <span className="p-trust-num">5 yrs</span>
              <span className="p-trust-label">NC operations</span>
            </div>
            <div className="p-trust">
              <span className="p-trust-num">#107724</span>
              <span className="p-trust-label">Licensed &amp; insured</span>
            </div>
          </div>
        </div>
      </section>

      {/* DOORS — three cards, each with its own cursor-following spotlight */}
      <section className="im-paper">
        <div className="im-container im-section">
          <p className="im-eyebrow">Pick your door</p>
          <h2 className="im-h2 mt-4 text-[2.25rem] sm:text-[3rem] max-w-2xl">
            Three ways in. Each one goes straight to the offer.
          </h2>
          <p className="im-body mt-6 max-w-2xl text-lg">
            Different audiences, different terms &mdash; same licensed GC on paper.
          </p>
          <div className="im-doors mt-12">
            {doors.map((d) => (
              <Link
                key={d.label}
                href={d.href}
                className="im-door"
                onMouseMove={onDoorMove}
              >
                <div>
                  <span className="im-door__label">{d.label}</span>
                  <p className="im-door__title">{d.title}</p>
                  <p className="im-door__meta">{d.meta}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-dashed" style={{ borderColor: 'var(--line-2)' }}>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[1.75rem] font-black tracking-[-0.02em]" style={{ color: 'var(--ink-hi)' }}>{d.price}</span>
                    <span className="im-mono text-[11px] uppercase tracking-[0.06em]" style={{ color: 'var(--ink-lo)' }}>{d.priceNote}</span>
                  </div>
                  <span className="im-door__cta mt-4">Enter &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAR — four numbers with orange left-rules */}
      <section className="border-y" style={{ borderColor: 'var(--line-2)', background: '#ffffff' }}>
        <div className="im-container py-14">
          <div className="p-stats">
            {stats.map((s) => (
              <div key={s.label} className="p-stat">
                <div className="p-stat-num">{s.value}</div>
                <div className="p-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REAL DEALS */}
      <RealDeals />

      {/* TESTIMONIAL GRID — 3 cards, hover lift */}
      <section className="im-band">
        <div className="im-container im-section">
          <p className="im-eyebrow">Reviews</p>
          <h2 className="im-h2 mt-4 text-[2.25rem] sm:text-[3rem] max-w-2xl">
            What NC investors say.
          </h2>
          <div className="p-testimonial-grid">
            {testimonials.map((t, i) => (
              <blockquote key={i} className="p-testimonial">
                <div className="p-stars">★★★★★</div>
                <p className="p-testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="p-testimonial-name">{t.name}</div>
                <div className="p-testimonial-role">{t.role}</div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
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
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                </div>
                <p className="mt-4 text-[13.5px] font-semibold" style={{ color: 'var(--ink-hi)' }}>{item.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BIG CTA — cursor-following radial glow on deep navy */}
      <section
        ref={ctaRef}
        className="p-cta-band"
        onMouseMove={onCtaMove}
      >
        <div className="im-container im-section text-center p-cta-inner">
          <h2 className="im-display im-display--on-dark text-[2.5rem] sm:text-[4rem] max-w-3xl mx-auto">
            Ready to move your project <span className="p-gradient-text">forward?</span>
          </h2>
          <p className="im-body im-body--on-dark mx-auto mt-6 max-w-2xl text-lg">
            Book a free project call &mdash; a licensed NC GC will tell you which door to walk through.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href={CONSULTATION_CTA_HREF} className="im-btn im-btn--primary">
              Book a free call &rarr;
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

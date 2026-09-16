'use client';

import { useState, useRef, useCallback, useEffect, MouseEvent as ReactMouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import RealDeals from '@/components/RealDeals';
import FaqItem from '@/components/landing/FaqItem';
import FaqJsonLd from '@/components/seo/FaqJsonLd';
import { SplashCurtain } from '@/components/SplashCurtain';

const CONSULTATION_CTA_HREF = '/start';

const doors = [
  {
    label: 'For investors',
    sub: 'Fix-and-flip · buy-and-hold · wholesalers',
    title: 'Know the real number before you buy.',
    meta:
      'A committed rehab price sealed with the NC GC license — the number you can underwrite off, hand your lender, or transfer to your end buyer at closing.',
    price: '$1,997',
    priceNote: '$0 upfront for wholesalers · paid at closing',
    href: '/lp/investor-deal-pack',
  },
  {
    label: 'For real estate professionals',
    sub: 'Realtors · lenders · brokers',
    title: 'Attach a licensed GC to your client’s deal.',
    meta:
      'Committed rehab price plus finished-home renderings and a permit memo — everything a serious buyer or lender needs to move faster with confidence.',
    price: '$1,997',
    priceNote: '$0 upfront for realtors · paid from commission at closing',
    href: '/lp/real-estate-professionals-deal-pack',
  },
];

const subAudienceLinks = [
  { label: 'Wholesaler-specific terms ($0 upfront)', href: '/lp/wholesaler-deal-pack' },
  { label: 'Realtor listing package ($0 upfront)', href: '/lp/realtor-deal-pack' },
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

/**
 * Ambient + reactive glow loop for hero-style sections.
 *
 * The spotlight (via CSS custom properties --mx / --my) drifts on its
 * own with a slow Lissajous curve so the section feels alive even
 * when the cursor is still. When the user moves the mouse over the
 * section, the target biases toward the cursor; when the mouse goes
 * idle, the bias decays back to ambient. All motion is skipped under
 * prefers-reduced-motion.
 */
function attachAmbientGlow(el: HTMLElement, opts?: { xRange?: number; yRange?: number; period?: number; ease?: number }) {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return () => {};

  const xRange = opts?.xRange ?? 30; // ± percentage points around center
  const yRange = opts?.yRange ?? 22;
  const period = opts?.period ?? 9500; // ms for one x-cycle; y is 1.38x this
  const ease = opts?.ease ?? 0.05; // approach speed toward target (0..1)

  let mouseX = 50;
  let mouseY = 34;
  let activity = 0; // 0 = pure ambient · 1 = pure mouse-tracking
  let lastMouseAt = -Infinity;
  let currentX = 50;
  let currentY = 34;
  const phase = Math.random() * Math.PI * 2;
  const start = performance.now();
  let raf = 0;
  let disposed = false;

  const onMove = (e: MouseEvent) => {
    const r = el.getBoundingClientRect();
    mouseX = ((e.clientX - r.left) / r.width) * 100;
    mouseY = ((e.clientY - r.top) / r.height) * 100;
    activity = 1;
    lastMouseAt = performance.now();
  };
  const onLeave = () => {
    // Let the ambient drift take back over gracefully.
    lastMouseAt = -Infinity;
  };

  const tick = (t: number) => {
    if (disposed) return;
    const dt = t - start;

    // Slow ambient drift — two out-of-phase sines, offset by a random
    // starting phase so different sections don't move in lockstep.
    const ambientX = 50 + Math.sin(dt / period + phase) * xRange;
    const ambientY = 34 + Math.cos(dt / (period * 1.38) + phase * 0.7) * yRange;

    // Decay activity ~2s after the last movement so we glide back to ambient.
    if (t - lastMouseAt > 120) {
      activity = Math.max(0, activity - 0.008);
    }

    const targetX = mouseX * activity + ambientX * (1 - activity);
    const targetY = mouseY * activity + ambientY * (1 - activity);

    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;

    el.style.setProperty('--mx', `${currentX.toFixed(2)}%`);
    el.style.setProperty('--my', `${currentY.toFixed(2)}%`);

    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', onLeave);

  return () => {
    disposed = true;
    cancelAnimationFrame(raf);
    el.removeEventListener('mousemove', onMove);
    el.removeEventListener('mouseleave', onLeave);
  };
}

/** Per-card cursor spotlight (unchanged — no ambient drift on cards). */
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

  useEffect(() => {
    const disposers: Array<() => void> = [];
    if (heroRef.current) {
      disposers.push(
        attachAmbientGlow(heroRef.current, { xRange: 32, yRange: 24, period: 9500 })
      );
    }
    if (ctaRef.current) {
      disposers.push(
        // A little slower + smaller amplitude for the bottom CTA so the two
        // sections don't feel synchronised.
        attachAmbientGlow(ctaRef.current, { xRange: 22, yRange: 18, period: 12500 })
      );
    }
    return () => disposers.forEach((d) => d());
  }, []);

  const onDoorMove = useCallback((e: ReactMouseEvent<HTMLAnchorElement>) => {
    trackCardMouse(e.currentTarget, e);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--paper)', color: 'var(--ink-mid)' }}>
      <SplashCurtain />
      <SiteNav />

      {/* HERO — deep navy shell with ambient-drifting orange spotlight
         that biases toward the cursor when the user moves */}
      <section ref={heroRef} className="p-hero">
        <div className="p-hero-bg" aria-hidden="true" />
        <div className="p-hero-grid" aria-hidden="true" />
        <div className="im-container pt-32 sm:pt-40 pb-20 sm:pb-24 relative">
          <span className="p-eyebrow-pill">
            <span className="p-eyebrow-dot" aria-hidden="true" />
            For NC investors + real estate professionals · #107724
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

      {/* DOORS — two-audience umbrella (Investors · RE Professionals) */}
      <section className="im-paper p-reveal">
        <div className="im-container im-section">
          <p className="im-eyebrow">Who this is for</p>
          <h2 className="im-h2 mt-4 text-[2.25rem] sm:text-[3rem] max-w-3xl">
            Two audiences. One committed rehab price.
          </h2>
          <p className="im-body mt-6 max-w-2xl text-lg">
            Built for NC <b style={{ color: 'var(--ink-hi)' }}>investors</b> &mdash; including wholesalers assigning
            contracts &mdash; and for the <b style={{ color: 'var(--ink-hi)' }}>real estate professionals</b> who
            serve them: realtors, lenders, and brokers.
          </p>
          <div className="im-doors mt-12" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {doors.map((d) => (
              <Link
                key={d.label}
                href={d.href}
                className="im-door"
                onMouseMove={onDoorMove}
              >
                <div>
                  <span className="im-door__label">{d.label}</span>
                  <p className="im-mono text-[11px] mt-1" style={{ color: 'var(--ink-lo)', letterSpacing: '0.06em' }}>{d.sub}</p>
                  <p className="im-door__title mt-3">{d.title}</p>
                  <p className="im-door__meta">{d.meta}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-dashed" style={{ borderColor: 'var(--line-2)' }}>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-[1.75rem] font-black tracking-[-0.02em]" style={{ color: 'var(--ink-hi)' }}>{d.price}</span>
                    <span className="im-mono text-[11px] uppercase tracking-[0.06em]" style={{ color: 'var(--ink-lo)' }}>{d.priceNote}</span>
                  </div>
                  <span className="im-door__cta mt-4">Enter &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px]" style={{ color: 'var(--ink-lo)' }}>
            <span className="im-mono text-[11px] uppercase tracking-[0.14em]">Direct paths</span>
            {subAudienceLinks.map((l, i) => (
              <span key={l.href} className="flex items-center gap-4">
                {i > 0 && <span aria-hidden="true" style={{ color: 'var(--line-1)' }}>·</span>}
                <Link href={l.href} className="underline underline-offset-4 hover:text-orange" style={{ color: 'var(--ink-mid)' }}>
                  {l.label} &rarr;
                </Link>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAR — four numbers with orange left-rules */}
      <section className="border-y p-reveal" style={{ borderColor: 'var(--line-2)', background: '#ffffff' }}>
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
      <div className="p-reveal"><RealDeals /></div>

      {/* TESTIMONIAL GRID — 3 cards, hover lift */}
      <section className="im-band p-reveal">
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
      <section className="im-paper p-reveal">
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

      {/* BIG CTA — same ambient + cursor-reactive glow, slower cadence */}
      <section ref={ctaRef} className="p-cta-band">
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
      <section className="im-band p-reveal">
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

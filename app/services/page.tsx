'use client';

import { useCallback, useEffect, useRef, MouseEvent as ReactMouseEvent } from 'react';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

const AVATARS: Array<{
  key: string;
  label: string;
  title: string;
  meta: string;
  price: string;
  priceNote: string;
  href: string;
}> = [
  {
    key: 'investor',
    label: 'For investors',
    title: 'Know the real rehab number before you buy.',
    meta:
      'Fix-and-flip and buy-and-hold operators pricing a deal before capital commits. Committed rehab price sealed with the NC GC license.',
    price: '$1,997',
    priceNote: 'Build-Ready Deal Pack',
    href: '/lp/investor-deal-pack',
  },
  {
    key: 'wholesaler',
    label: 'For wholesalers',
    title: 'A committed rehab price on your assignment.',
    meta:
      'Add a licensed NC GC to the deal so serious end buyers can underwrite it. Transferable at closing.',
    price: '$0',
    priceNote: 'upfront · paid at closing · no close, no pay',
    href: '/lp/wholesaler-deal-pack',
  },
  {
    key: 'realtor',
    label: 'For realtors',
    title: 'Move listings that need work.',
    meta:
      'Committed price + three finished-home renderings + permit memo. Attach to MLS, buyer packet, or open-house handout.',
    price: '$0',
    priceNote: 'upfront · $1,997 paid from commission at closing',
    href: '/lp/realtor-deal-pack',
  },
  {
    key: 'lender-broker',
    label: 'For lenders + brokers',
    title: 'Underwrite the rehab, not a hope.',
    meta:
      'A GC-sealed number for the construction line. Draw schedule template, permit memo, pre-closing sweep — the file arrives underwriteable.',
    price: '$1,997',
    priceNote: 'per deal · billed to the closing agent',
    href: '/lp/real-estate-professionals-deal-pack',
  },
];

/** Per-card cursor spotlight (matches the homepage door treatment). */
function trackCardMouse(el: HTMLElement, e: ReactMouseEvent) {
  const rect = el.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  el.style.setProperty('--card-mx', `${x}%`);
  el.style.setProperty('--card-my', `${y}%`);
}

/** Ambient + reactive glow loop shared with the homepage hero. */
function attachAmbientGlow(el: HTMLElement) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return () => {};
  let mouseX = 50;
  let mouseY = 34;
  let activity = 0;
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
    lastMouseAt = -Infinity;
  };
  const tick = (t: number) => {
    if (disposed) return;
    const dt = t - start;
    const ambientX = 50 + Math.sin(dt / 9500 + phase) * 32;
    const ambientY = 34 + Math.cos(dt / (9500 * 1.38) + phase * 0.7) * 24;
    if (t - lastMouseAt > 120) activity = Math.max(0, activity - 0.008);
    const targetX = mouseX * activity + ambientX * (1 - activity);
    const targetY = mouseY * activity + ambientY * (1 - activity);
    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;
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

export default function ServicesOverviewPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) return attachAmbientGlow(heroRef.current);
  }, []);

  const onDoorMove = useCallback((e: ReactMouseEvent<HTMLAnchorElement>) => {
    trackCardMouse(e.currentTarget, e);
  }, []);

  return (
    <>
      <SiteNav />
      <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--paper)', color: 'var(--ink-mid)' }}>

      {/* HERO */}
      <section ref={heroRef} className="p-hero">
        <div className="p-hero-bg" aria-hidden="true" />
        <div className="p-hero-grid" aria-hidden="true" />
        <div className="im-container pt-32 sm:pt-40 pb-20 sm:pb-24 relative">
          <span className="p-eyebrow-pill">
            <span className="p-eyebrow-dot" aria-hidden="true" />
            Who&rsquo;s this for
          </span>
          <h1 className="im-display im-display--on-dark mt-8 text-[2.5rem] sm:text-[3.75rem] lg:text-[4.75rem] max-w-4xl">
            Pick the role. Get a <span className="p-gradient-text">committed rehab price</span> on your deal.
          </h1>
          <p className="im-body im-body--on-dark mt-6 max-w-2xl text-lg">
            Southern Cities is built for real estate investors and the professionals who serve them. Choose the
            door that fits &mdash; every path lands on a licensed NC GC (#107724) with the same committed price
            and Commitment Certificate.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/lp/rehab-budget-range-execution-risk-snapshot"
              className="im-btn im-btn--primary"
            >
              Try the free rehab tool &rarr;
            </Link>
            <a href="#roles" className="im-btn im-btn--ghost-on-dark">
              Or pick a role &darr;
            </a>
          </div>
        </div>
      </section>

      {/* AVATAR ROUTER */}
      <section id="roles" className="im-paper p-reveal">
        <div className="im-container im-section">
          <p className="im-eyebrow">By role</p>
          <h2 className="im-h2 mt-4 text-[2.25rem] sm:text-[3rem] max-w-3xl">
            Five doors. One licensed GC on paper.
          </h2>
          <p className="im-body mt-6 max-w-2xl text-lg">
            Same offer, tuned to the audience. Investors buy the pack upfront; wholesalers and realtors are
            paid at closing; lenders and brokers attach it to a file; homeowners get full contracting.
          </p>
          <div className="im-doors mt-12" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {AVATARS.map((a) => (
              <Link
                key={a.key}
                href={a.href}
                className="im-door"
                onMouseMove={onDoorMove}
              >
                <div>
                  <span className="im-door__label">{a.label}</span>
                  <p className="im-door__title mt-3">{a.title}</p>
                  <p className="im-door__meta">{a.meta}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-dashed" style={{ borderColor: 'var(--line-2)' }}>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-[1.75rem] font-black tracking-[-0.02em]" style={{ color: 'var(--ink-hi)' }}>{a.price}</span>
                    <span className="im-mono text-[11px] uppercase tracking-[0.06em]" style={{ color: 'var(--ink-lo)' }}>{a.priceNote}</span>
                  </div>
                  <span className="im-door__cta mt-4">Enter &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SIMPLE TOOL — free rehab snapshot */}
      <section className="im-band p-reveal">
        <div className="im-container im-section max-w-5xl">
          <div className="grid gap-0 border lg:grid-cols-[1fr_auto]" style={{ borderColor: 'var(--line-1)', background: '#ffffff' }}>
            <div className="p-8 sm:p-10">
              <p className="im-eyebrow">Free tool</p>
              <h2 className="im-h2 mt-4 text-[1.75rem] sm:text-[2.25rem]">
                Not ready for a full pack? Get a <span style={{ color: 'var(--accent)' }}>rehab number in 60 seconds.</span>
              </h2>
              <p className="mt-5 text-[15px] leading-[1.65]" style={{ color: 'var(--ink-mid)' }}>
                A licensed NC GC has calibrated a square-footage rehab range against real NC cost data. Drop
                in a property, get a directional rehab budget and execution risks &mdash; free, no login, no
                sales call. Use it to screen a deal before you spend $1,997 on a full Deal Pack.
              </p>
              <ul className="mt-6 space-y-2 text-[14.5px] leading-[1.55]" style={{ color: 'var(--ink-mid)' }}>
                <li className="flex gap-3"><span className="im-tick mt-0.5">/</span><span>Instant per-SF rehab budget range</span></li>
                <li className="flex gap-3"><span className="im-tick mt-0.5">/</span><span>Confidence score + top execution risks</span></li>
                <li className="flex gap-3"><span className="im-tick mt-0.5">/</span><span>Recommended next step for that deal</span></li>
              </ul>
            </div>
            <div className="p-8 sm:p-10 border-t lg:border-t-0 lg:border-l flex flex-col justify-center" style={{ borderColor: 'var(--line-1)', background: 'var(--paper)' }}>
              <Link
                href="/lp/rehab-budget-range-execution-risk-snapshot"
                className="im-btn im-btn--primary"
              >
                Open the tool &rarr;
              </Link>
              <p className="im-mono text-[11px] uppercase tracking-[0.14em] mt-4" style={{ color: 'var(--ink-lo)' }}>
                Free · no signup
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      </div>
    </>
  );
}

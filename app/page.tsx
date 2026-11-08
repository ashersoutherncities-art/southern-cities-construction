'use client';

import { useState, useRef, useCallback, useEffect, MouseEvent as ReactMouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import RealDeals from '@/components/RealDeals';
import GoogleReviews from '@/components/GoogleReviews';
import GoogleRatingBadge from '@/components/GoogleRatingBadge';
import FaqItem from '@/components/landing/FaqItem';
import FaqJsonLd from '@/components/seo/FaqJsonLd';
import { SplashCurtain } from '@/components/SplashCurtain';

const CONSULTATION_CTA_HREF = '/start';

const doors = [
  {
    label: 'For investors',
    sub: 'Fix-and-flip · buy-and-hold · wholesalers',
    title: 'Know the real number before you buy.',
    meta: 'A committed rehab price, sealed with the NC GC license, transferable to your buyer at closing.',
    price: '$1,997',
    priceNote: '$0 upfront for wholesalers · paid at closing',
    href: '/lp/investor-deal-pack',
  },
  {
    label: 'For real estate professionals',
    sub: 'Realtors · lenders · brokers',
    title: 'Attach a licensed GC to your client’s deal.',
    meta: 'Committed rehab price, renderings, and a permit memo — what your buyer or lender needs to move fast.',
    price: '$1,997',
    priceNote: '$0 upfront for realtors · paid from commission at closing',
    href: '/lp/real-estate-professionals-deal-pack',
  },
];

// Simplified to the 2-offer path (2026-11-05): Screen (free) -> Plan (Deal
// Pack, the $1,997 flagship) -> Build (Construction execution/procurement).
// Construction Department ("Analyze") is archived; Procure folded into
// Build since they already shared the same destination.
const HOW_IT_WORKS = [
  { n: '01', label: 'Screen', href: '/lp/rehab-budget-range-execution-risk-snapshot' },
  { n: '02', label: 'Plan', href: '/deal-pack' },
  { n: '03', label: 'Build', href: '/construction' },
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

// Homepage FAQ — comprehensive. Every answer is anchored to facts already
// shipped on /deal-pack, /construction, /services, and the product catalogue.
// Nothing new is asserted here; the homepage just surfaces the detail so a
// cold reader can close every obvious objection without leaving the page.
const faqs = [
  {
    question: 'What is the Build-Ready Deal Pack?',
    answer:
      'A committed rehab price, in writing, delivered in 3–4 business days by a licensed North Carolina general contractor (NC GC license #107724) for $1,997. It is a decision-grade deliverable, not a bid-grade quote — meaning the number is good enough to underwrite the deal, run it past a lender, assign to a buyer, or sign a purchase contract on. The pack is designed around a single question: what will it actually cost to execute this rehab, with a real GC standing behind the number?',
  },
  {
    question: 'What exactly ships with it?',
    answer:
      'As-built plans drawn from the current property, a future-state renovation plan showing the planned scope, three photoreal renderings of the finished look, a short market study grounding the ARV, an initial materials list, a vendor list of the trades we would use, a permit memo for the specific jurisdiction, an execution-risk report flagging the top cost-to-cure items, and the Commitment Certificate itself — a one-page document issued under NC GC license #107724 that names the property, the scope, the committed price, and the 30-day commitment window.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'The Build-Ready Deal Pack is $1,997. A lighter Bid-Ready version is available at $599 for cases where the deliverable list does not need the renderings and formal commitment — Bid-Ready gets you the committed number, the scope, the materials list, and the permit memo. Both are flat fees; no hourly, no per-page, no change in price based on property size. Prices are listed on /deal-pack and in the cart; no discounts offered on either tier outside of our Pro membership.',
  },
  {
    question: 'How does payment work for wholesalers?',
    answer:
      'Zero dollars upfront. The $1,997 fee is paid from your assignment proceeds at the closing table, so no out-of-pocket is required to carry a deal through underwriting and buyer marketing. If the deal does not close, you do not pay. Terms are confirmed on a short scoping call before any work starts so both sides agree on the assignment-fee split and the closing instructions. The structure exists because we want wholesalers to use the pack without it becoming a bet against their own pipeline.',
  },
  {
    question: 'How does payment work for realtors?',
    answer:
      'Same shape as the wholesaler path: $0 upfront, paid from your commission at closing. Realtors use the pack two ways — on a listing, to show lenders and buyers the rehab number before the property hits the MLS and get an above-asking offer for a distressed home; and on a buyer offer, to attach a real GC’s committed number to the paperwork so the buyer and lender move fast without a financing contingency hanging on repair cost guesses.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Three to four business days from the scoping call. In practice: scoping call Monday, property walk (in person for Charlotte-area and most of the Piedmont, remote video walk otherwise) Tuesday, pack drafted Wednesday, delivered Thursday. Urgent deals can be turned in 2 business days with a day-rate expedite — flagged on the scoping call. The 2-day deal-review turnaround on our stats row refers to the earlier Rehab-Budget-Range Snapshot (a free first pass) which precedes the full pack.',
  },
  {
    question: 'Can the committed price be transferred to my buyer?',
    answer:
      'Yes — once, at closing. The Commitment Certificate is written so a wholesaler can transfer it to their end buyer, meaning the buyer inherits a licensed NC GC on the deal and the exact rehab number on paper. That gives the buyer something concrete to show their own lender rather than a projection. The transfer is a single assignment event at closing, not a reusable right to pass the number down a chain.',
  },
  {
    question: 'Is the committed price a guarantee?',
    answer:
      'It is a committed bid for the defined scope, sealed with the NC GC license — meaning if we build it and the work is in that scope, the price is the price. Change orders only apply to concealed or hidden conditions discovered once walls open: unexpected rot behind sheathing, undisclosed structural issues, outdated electrical in walls that we could not see from the walk. Everything visible and within the written scope stays at the committed number.',
  },
  {
    question: 'How long is the committed price good for?',
    answer:
      'Thirty days from issue. That is enough runway to underwrite, market the deal, line up the buyer, and close. If you need more time, we can re-issue the commitment after a quick re-check of materials pricing — most of the pack (plans, renderings, permit memo, execution risk) carries forward; only the number updates if trade-network costs have moved. The re-issue is a flat $249.',
  },
  {
    question: 'Do you review a deal I don’t own yet?',
    answer:
      'Yes, and that is the whole point. Most GCs refuse because scoping an unowned property is unbillable time if the deal dies — we charge for the pack, which is what makes doing the work before the purchase viable. A licensed NC GC pulls comps, pulls local permitting rules for the specific jurisdiction, walks the property, and delivers the full committed number plus every supporting document. You get a real contractor’s read before the purchase contract, not after.',
  },
  {
    question: 'How is this different from an inspection or an appraisal?',
    answer:
      'An inspection lists what is wrong with a property. An appraisal gives a comp-based value. Neither tells you what the repairs will actually cost to execute, who will do the work, how long it will take, or whether the scope is feasible under local permitting. The Deal Pack is the rehab-execution answer: a licensed GC scoping the exact work, pricing it with real NC trade-network unit costs, and standing behind the number in writing. You can hand the appraisal, the inspection, and the Deal Pack to a lender together and the deal underwrites.',
  },
  {
    question: 'What markets do you serve?',
    answer:
      'Southern Cities Construction is a North Carolina general contractor; we operate across the state. In-person property walks are routine for the Charlotte metro, Triad, Triangle, Fayetteville, Wilmington, and the coastal corridor. Deals further out (far-western NC, remote parcels) use a remote video walk — the resulting pack carries the same license seal and the same committed number. We do not operate in South Carolina or any other state.',
  },
  {
    question: 'What kinds of projects do you handle?',
    answer:
      'Residential only, no commercial. Within residential, there is no lower square-footage cutoff — small tiny-home projects through full four-bedroom rehabs all fit. The product grade we work to is workforce / mid-market finish — the kind of build that resells cleanly, cash-flows as a rental, or satisfies a buyer at the local comp-band price point. We do not do ultra-luxury custom finishes, and we will say so on the scoping call if that is the ask.',
  },
  {
    question: 'What happens after I have the Deal Pack — do you also build?',
    answer:
      'You are not obligated to build with us. The pack is a standalone deliverable you own and can take to any licensed GC. If you do want us to execute, we become the GC of record and the committed price becomes the contract price — no re-pricing exercise, no re-scoping. Southern Cities also offers Permit Administration ($1,499 starting) and Construction Oversight for projects where you want us only on the back end after you have the pack.',
  },
  {
    question: 'How do I start?',
    answer:
      'Either analyze a deal (that routes to the Rehab-Budget-Range + Execution-Risk Snapshot, a free first pass) or go straight to the Deal Pack if you already know the property and are ready for the committed number. Both start with a short intake form; a licensed NC GC reviews it and either schedules the scoping call or flags why a specific property is not a fit. First response is same business day, Monday through Friday.',
  },
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
    <>
      <SplashCurtain />
      <SiteNav />
      <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--paper)', color: 'var(--ink-mid)' }}>

      {/* HERO — deep navy shell with ambient-drifting orange spotlight
         that biases toward the cursor when the user moves */}
      <section ref={heroRef} className="p-hero">
        <div className="p-hero-bg" aria-hidden="true" />
        <div className="p-hero-grid" aria-hidden="true" />
        <div className="im-container pt-32 sm:pt-40 pb-20 sm:pb-24 relative">
          <h1 className="im-display im-display--on-dark text-[2.6rem] sm:text-[4rem] lg:text-[5.25rem] max-w-5xl">
            Your <span className="p-gradient-text">construction department</span> for real estate investing.
          </h1>
          <p className="im-body im-body--on-dark mt-6 max-w-2xl text-lg sm:text-xl">
            Screen the deal, get a licensed GC&rsquo;s read on it, price the rehab, put it out to bid,
            and get it built &mdash; without hiring a construction team of your own.
            <span className="text-white font-semibold"> Most GCs won&rsquo;t review a deal you don&rsquo;t own yet. We will.</span>
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/lp/rehab-budget-range-execution-risk-snapshot" className="im-btn im-btn--primary">
              Analyze a deal &rarr;
            </Link>
            <Link href="/deal-pack" className="im-btn im-btn--ghost-on-dark">
              See the Deal Pack
            </Link>
          </div>
          <div className="p-trust-row mt-10">
            <GoogleRatingBadge />
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

      {/* HOW IT WORKS — one compact strip, no per-step paragraphs */}
      <section id="how-it-works" className="im-band p-reveal scroll-mt-24">
        <div className="im-container im-section">
          <p className="im-eyebrow">How it works</p>
          <h2 className="im-h2 mt-4 text-[2.25rem] sm:text-[3rem] max-w-3xl">
            Three stages. One licensed GC the whole way through.
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-4">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.n} className="flex items-center gap-3">
                <Link href={step.href} className="flex items-center gap-2 group">
                  <span className="im-mono text-[11px]" style={{ color: 'var(--accent)' }}>{step.n}</span>
                  <span
                    className="text-[14px] font-black uppercase tracking-[0.08em] group-hover:text-orange"
                    style={{ color: 'var(--ink-hi)' }}
                  >
                    {step.label}
                  </span>
                </Link>
                {i < HOW_IT_WORKS.length - 1 && (
                  <span aria-hidden="true" style={{ color: 'var(--line-1)' }}>&rarr;</span>
                )}
              </div>
            ))}
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

      {/* GOOGLE REVIEWS — live from Places API */}
      <div className="p-reveal"><GoogleReviews /></div>

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
          <Link href="/deal-pack#faq" className="im-door__cta mt-6 inline-block">
            See the full FAQ &rarr;
          </Link>
        </div>
      </section>

      <SiteFooter />
      </div>
    </>
  );
}

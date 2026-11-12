import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import FounderStory from '@/components/FounderStory';
import RealDeals from '@/components/RealDeals';
import ProductJsonLd from '@/components/seo/ProductJsonLd';
import FaqItem from '@/components/landing/FaqItem';
import FaqJsonLd from '@/components/seo/FaqJsonLd';
import VideoWithSoundToggle from '@/components/VideoWithSoundToggle';

// Moved here from the homepage (2026-11-05 simplification pass) — this is
// where the detail is actually relevant. The homepage keeps a 3-item
// teaser that links to #faq.
const FAQS = [
  { question: 'What is the Build-Ready Deal Pack?', answer: 'A licensed NC GC delivers a committed rehab price in writing, sealed with license #107724 and transferable once to your end buyer. Ships with as-built plans, future-state renovation plan, three photoreal renderings, a market study, an initial materials list, a vendor list, a permit memo, and an execution risk report.' },
  { question: 'How does the wholesaler payment work?', answer: '$0 upfront. The fee is paid from your assignment proceeds at closing. No close, no pay. The specific fee is confirmed on a short scoping call.' },
  { question: 'Is the committed price a guarantee?', answer: 'It is a committed bid for the defined scope, sealed with the NC GC license. Not a guarantee against every possible condition — change orders apply to concealed or hidden conditions discovered during work.' },
  { question: 'How long is the committed price good for?', answer: '30 days from issue. Enough runway to underwrite, market, and close an assignment or investor buy.' },
  { question: 'Can the committed price be transferred to my buyer?', answer: 'Yes, once. The Commitment Certificate transfers from the wholesaler to their end buyer at closing so the buyer inherits the licensed GC and the price on paper.' },
  { question: 'Do you review a deal I don’t own yet?', answer: 'Yes. Most GCs won’t. We will. That’s the whole point of the pack — you get a real GC read before you sign.' },
];

// Restored 2026-11-09 (Asher) — Bid-Ready is back on the page as the second
// public path, alongside Build-Ready. Site Scan add-on, Pro subscription,
// and Plans à la carte stay out of the primary funnel per the strategic
// plan, but remain reachable by direct URL via lib/cart.ts.
const DEAL_PACK_PRODUCTS = [
  {
    name: 'Build-Ready Deal Pack',
    description:
      'A licensed NC GC puts a committed rehab price on your deal in writing, sealed with the license and transferable once to your end buyer. Ships with as-built + future-state plans, three photoreal renderings, a local market study, an initial materials list, a vendor list with drive time, a permit memo, and an execution risk report.',
    url: '/deal-pack',
    priceUsd: 1997,
    category: 'Deal Pack',
    sku: 'deal-pack-build-ready',
  },
  {
    name: 'Bid-Ready Deal Pack',
    description:
      'A GC-certified rehab budget range, dollarized scope of work, lender-killer risk flags, and an execution risk report, delivered as a branded PDF sealed with NC GC License #107724. Credits toward Build-Ready if you upgrade.',
    url: '/deal-pack',
    priceUsd: 599,
    category: 'Deal Pack',
    sku: 'deal-pack-bid-ready',
  },
];

export const metadata = {
  title: 'Deal Pack — A Committed NC GC Rehab Price on Your Deal | Southern Cities Construction',
  description:
    "Most GCs won't review a deal you don't own yet. We will. A licensed NC GC (#107724) puts a committed rehab price on your deal, sealed with the license and transferable to your end buyer. Build-Ready Deal Pack $1,997.",
  alternates: { canonical: '/deal-pack' },
  openGraph: {
    type: 'website',
    url: '/deal-pack',
    title: 'Deal Pack — A Committed NC GC Rehab Price on Your Deal',
    description:
      "A licensed NC GC puts a committed rehab price on your deal, sealed with the license and transferable once to your end buyer.",
    siteName: 'Southern Cities Construction',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deal Pack — Committed NC GC Rehab Price',
    description:
      "A licensed NC GC's committed rehab price on your deal — before you buy it.",
  },
};

type Tier = {
  badge: string;
  badgeColor: 'orange' | 'white' | 'navy';
  name: string;
  price: string;
  priceNote: string;
  promise: string;
  includes: string[];
  cta: string;
  ctaHref: string;
  highlight?: boolean;
  sample?: { pdfUrl: string; pages: number };
  video?: { src: string; poster: string; videoId: string };
};

// Restored 2026-11-09 (Asher) — two public paths again: Build-Ready
// (flagship, full pack) and Bid-Ready (lighter, for when you just need the
// number). SF Ballpark (free) and the $699 Site Scan add-on stay out of
// this grid — the Site Scan is already surfaced below in "How it works",
// and SF Ballpark is reachable via /start.
const TIERS: Tier[] = [
  {
    badge: 'START HERE',
    badgeColor: 'white',
    name: 'Bid-Ready Deal Pack',
    price: '$599',
    priceNote: '2–3 day turnaround · credits toward Build-Ready',
    promise:
      'Not sure of your numbers yet? Get the GC-certified budget range and scope first — use it to evaluate or pass along the deal. Upgrade to Build-Ready later and this fee credits toward it.',
    includes: [
      'GC-certified rehab budget range',
      'Dollarized scope of work',
      'Lender-killer risk flags',
      'Execution risk report',
      'Branded PDF, sealed with NC GC License #107724',
    ],
    cta: 'Order Bid-Ready · $599 →',
    ctaHref: '/cart?cart=deal-pack-bid-ready',
    video: {
      src: '/video/bid-ready-intro.mp4',
      poster: '/video/bid-ready-intro-poster.jpg',
      videoId: 'bid-ready-intro',
    },
  },
  {
    badge: 'FLAGSHIP',
    badgeColor: 'orange',
    name: 'Build-Ready Deal Pack',
    price: '$1,997',
    priceNote: '3–4 day turnaround · $0 upfront for wholesalers + realtors',
    promise:
      'A licensed NC GC puts your rehab price in writing, sealed with the license and transferable once to your end buyer at closing. The full pack: everything a serious buyer or lender needs to underwrite the deal.',
    includes: [
      'Committed rehab price in writing, sealed with the NC GC license (Commitment Certificate — see below)',
      'Trade-by-trade dollarized scope of work',
      'As-built floor plan + future-state renovation plan (PDF + editable)',
      '3 photoreal renderings of the finished home',
      'Market study report — finishes and fixtures in demand in that market (6 months of sold comps)',
      'Initial materials list with quantities (spreadsheet)',
      'Vendor list with proximity / drive time to the project',
      'Permit memo — which permits, which jurisdiction, expected timeline',
      'Execution risk report',
    ],
    cta: 'Order Build-Ready · $1,997 →',
    ctaHref: '/cart?cart=deal-pack-build-ready',
    highlight: true,
    sample: { pdfUrl: '/resources/samples/build-ready-deal-pack-sample.pdf', pages: 9 },
    video: {
      src: '/video/build-ready-intro.mp4',
      poster: '/video/build-ready-intro-poster.jpg',
      videoId: 'build-ready-intro',
    },
  },
];


export default function DealPackPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)', color: 'var(--ink-mid)' }}>
      <ProductJsonLd products={DEAL_PACK_PRODUCTS} />
      <SiteNav variant="solid" />

      {/* HERO — dark shell, huge headline, no floating mockup */}
      <section className="relative overflow-hidden" style={{ background: 'var(--shell)', color: '#f2efe7' }}>
        <div className="im-container pt-32 sm:pt-40 pb-20 sm:pb-24">
          <p className="im-eyebrow im-eyebrow--on-dark">Deal Pack · Wholesalers · Investors · Realtors · #107724</p>
          <h1 className="im-display im-display--on-dark mt-8 text-[2.75rem] sm:text-[4rem] lg:text-[5.5rem] max-w-5xl">
            A <span style={{ color: 'var(--accent)' }}>committed rehab price</span> on your deal.
            Sealed with the license.
          </h1>
          <p className="im-body im-body--on-dark mt-8 max-w-2xl text-lg">
            The <span className="text-white font-semibold">Build-Ready Deal Pack ($1,997)</span> is the full
            pre-construction package: committed rehab price sealed with license #107724 and transferable once to
            your end buyer, plus plans, renderings, market study, materials list, vendor list, permit memo, and
            execution risk report.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#tiers" className="im-btn im-btn--primary">
              See the tiers &darr;
            </a>
            <Link href="/guide/consistent-assignment-wholesaler" className="im-btn im-btn--ghost-on-dark">
              Free playbook PDF &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* WEDGE LINE — hard bordered block, sharp */}
      <div style={{ background: 'var(--ink-hi)', color: '#ffffff', borderTop: '1px solid rgba(255,255,255,0.14)', borderBottom: '1px solid rgba(255,255,255,0.14)' }}>
        <div className="im-container py-5 text-center">
          <p className="text-[15px] sm:text-[17px] font-bold tracking-[-0.01em]">
            Most GCs won&apos;t review a deal you don&apos;t own yet. <span style={{ color: 'var(--accent)' }}>We will.</span>
          </p>
        </div>
      </div>

      {/* STATS STRIP — monolithic 4-cell */}
      <section className="border-b" style={{ borderColor: 'var(--line-1)', background: 'var(--paper)' }}>
        <div className="im-container grid grid-cols-2 md:grid-cols-4">
          {[
            { value: '$1,997', label: 'Build-Ready · flagship' },
            { value: '$0', label: 'Wholesaler upfront · paid at closing' },
            { value: '30-day', label: 'Committed-price validity' },
            { value: '#107724', label: 'NC GC license stamp' },
          ].map((n, i) => (
            <div
              key={n.label}
              className={`px-6 py-10 md:py-14 ${i < 3 ? 'md:border-r' : ''} ${i < 2 ? 'border-b md:border-b-0' : ''} ${i === 0 || i === 2 ? 'border-r' : ''}`}
              style={{ borderColor: 'var(--line-1)' }}
            >
              <p className="font-black text-[1.9rem] md:text-[2.4rem] tracking-[-0.03em]" style={{ color: 'var(--ink-hi)' }}>{n.value}</p>
              <p className="mt-2 im-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: 'var(--ink-lo)' }}>{n.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMMITMENT CERTIFICATE + WHOLESALER TERMS — dark cards, hard borders */}
      <section className="im-shell">
        <div className="im-container im-section grid gap-0 lg:grid-cols-2 border" style={{ borderColor: 'rgba(255,255,255,0.14)' }}>
          <div className="p-10" style={{ background: 'var(--shell-2)' }}>
            <p className="im-eyebrow im-eyebrow--on-dark" style={{ color: 'var(--accent)' }}>Commitment Certificate</p>
            <h3 className="im-h2 im-h2--on-dark mt-4 text-[1.75rem] sm:text-[2rem]">
              Rehab price in writing. Sealed with the license.
            </h3>
            <p className="im-body im-body--on-dark mt-4">
              Southern Cities puts the rehab price in writing, seals it with NC GC license
              <span className="text-white font-semibold"> #107724</span>, and commits to perform the defined scope
              for that price.
            </p>
            <ul className="mt-6 space-y-3 text-[14.5px] leading-[1.55]" style={{ color: 'rgba(242,239,231,0.85)' }}>
              <li className="flex gap-3"><span className="im-tick mt-0.5">/</span><span><span className="text-white font-semibold">Transferable once</span> &mdash; from you to your end buyer</span></li>
              <li className="flex gap-3"><span className="im-tick mt-0.5">/</span><span><span className="text-white font-semibold">30-day expiry</span> from issue</span></li>
              <li className="flex gap-3"><span className="im-tick mt-0.5">/</span><span>Change orders apply only to concealed conditions discovered during work</span></li>
              <li className="flex gap-3"><span className="im-tick mt-0.5">/</span><span>Committed bid for the defined scope &mdash; not a guarantee against every possible condition</span></li>
            </ul>
          </div>
          <div className="p-10 border-t lg:border-t-0 lg:border-l" style={{ background: 'var(--shell-2)', borderColor: 'rgba(255,255,255,0.14)' }}>
            <p className="im-eyebrow im-eyebrow--on-dark" style={{ color: 'var(--accent)' }}>Wholesaler terms</p>
            <h3 className="im-h2 im-h2--on-dark mt-4 text-[1.75rem] sm:text-[2rem]">
              $0 upfront. Pay at closing. No close, no pay.
            </h3>
            <p className="im-body im-body--on-dark mt-4">
              Wholesalers put nothing down. We put a licensed NC GC&apos;s committed rehab price on your deal, and
              the fee comes out of your assignment proceeds when it closes.
            </p>
            <ul className="mt-6 space-y-3 text-[14.5px] leading-[1.55]" style={{ color: 'rgba(242,239,231,0.85)' }}>
              <li className="flex gap-3"><span className="im-tick mt-0.5">/</span><span><span className="text-white font-semibold">$0 upfront</span> &mdash; nothing due when we produce the pack</span></li>
              <li className="flex gap-3"><span className="im-tick mt-0.5">/</span><span><span className="text-white font-semibold">Paid at closing</span> from your assignment proceeds</span></li>
              <li className="flex gap-3"><span className="im-tick mt-0.5">/</span><span><span className="text-white font-semibold">No close, no pay</span> &mdash; if it doesn&apos;t close, nothing owed</span></li>
              <li className="flex gap-3"><span className="im-tick mt-0.5">/</span><span>Fee confirmed on a short scoping call</span></li>
            </ul>
            <Link href="/lp/wholesaler-deal-pack" className="mt-8 inline-flex items-center gap-3 im-mono text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: 'var(--accent)' }}>
              Wholesaler details &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* THE OFFER — two paths: Build-Ready flagship + Bid-Ready */}
      <section id="tiers" className="im-paper">
        <div className="im-container im-section">
          <div className="max-w-3xl">
            <p className="im-eyebrow">The offer</p>
            <h2 className="im-h2 mt-4 text-[2.5rem] sm:text-[3.5rem]">
              Two paths. One licensed GC.
            </h2>
            <p className="im-body mt-6 max-w-2xl text-lg">
              A licensed NC GC (#107724) stands behind both. Not sure of your numbers yet? Start
              with Bid-Ready. Ready to move? Go straight to Build-Ready &mdash; and wholesalers +
              realtors pay $0 upfront either way, from proceeds at closing.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2 items-stretch max-w-4xl mx-auto">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className="group relative flex flex-col p-8 sm:p-12 border"
                style={
                  tier.highlight
                    ? { background: 'var(--ink-hi)', color: '#ffffff', borderColor: 'var(--ink-hi)' }
                    : { background: 'var(--paper)', color: 'var(--ink-hi)', borderColor: 'var(--line-1)' }
                }
              >
                <span
                  className="im-mono text-[10.5px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: 'var(--accent)' }}
                >
                  {tier.badge}
                </span>
                <h3
                  className="mt-6 text-[2rem] sm:text-[2.5rem] font-black tracking-[-0.02em]"
                  style={{ color: tier.highlight ? '#ffffff' : 'var(--ink-hi)' }}
                >
                  {tier.name}
                </h3>
                <div
                  className="mt-4 pt-4 border-t flex items-baseline gap-3 flex-wrap"
                  style={{ borderColor: tier.highlight ? 'rgba(255,255,255,0.14)' : 'var(--line-1)' }}
                >
                  <span className="text-[2.5rem] sm:text-[3rem] font-black tracking-[-0.02em]" style={{ color: 'var(--accent)' }}>{tier.price}</span>
                  <span
                    className="im-mono text-[11px] uppercase tracking-[0.14em]"
                    style={{ color: tier.highlight ? 'rgba(255,255,255,0.6)' : 'var(--ink-lo)' }}
                  >
                    {tier.priceNote}
                  </span>
                </div>
                {tier.video ? (
                  <div className="relative mt-6 aspect-video overflow-hidden rounded-lg bg-black">
                    <VideoWithSoundToggle
                      src={tier.video.src}
                      poster={tier.video.poster}
                      videoId={tier.video.videoId}
                    />
                  </div>
                ) : null}
                <p
                  className="mt-5 text-[15.5px] leading-[1.65]"
                  style={{ color: tier.highlight ? 'rgba(255,255,255,0.85)' : 'var(--ink-mid)' }}
                >
                  {tier.promise}
                </p>
                <ul
                  className="mt-6 space-y-3 text-[14.5px] leading-[1.55]"
                  style={{ color: tier.highlight ? 'rgba(255,255,255,0.85)' : 'var(--ink-mid)' }}
                >
                  {tier.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="im-tick mt-0.5">/</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link href={tier.ctaHref} className="im-btn im-btn--primary">
                    {tier.cta}
                  </Link>
                  {tier.sample ? (
                    <a
                      href={tier.sample.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 im-mono text-[11.5px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: tier.highlight ? 'rgba(255,255,255,0.75)' : 'var(--ink-lo)' }}
                    >
                      See a {tier.sample.pages}-page sample &nearr;
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="im-shell">
        <div className="im-container im-section max-w-5xl">
          <p className="im-eyebrow im-eyebrow--on-dark">How it works</p>
          <h2 className="im-h2 im-h2--on-dark mt-4 text-[2.25rem] sm:text-[3rem]">
            What we need to build it.
          </h2>
          <p className="im-body im-body--on-dark mt-6 max-w-2xl text-lg">
            To produce your Deal Pack we need the property&rsquo;s plans. Already have them? Upload at checkout. Don&rsquo;t? We&rsquo;ll capture them for you.
          </p>
          <div className="mt-10 grid gap-0 md:grid-cols-2 border" style={{ borderColor: 'rgba(255,255,255,0.14)' }}>
            <div className="p-8" style={{ background: 'var(--shell-2)' }}>
              <p className="im-eyebrow im-eyebrow--on-dark" style={{ color: 'var(--accent)' }}>If you have plans</p>
              <h3 className="mt-3 text-[1.35rem] font-black tracking-[-0.02em] text-white">Upload at checkout</h3>
              <p className="mt-3 text-[14.5px] leading-[1.65]" style={{ color: 'rgba(242,239,231,0.75)' }}>
                Architectural plans, measurements, or an appraiser sketch &mdash; upload them at checkout and we go straight into Deal Pack production.
              </p>
            </div>
            <div className="p-8 border-t md:border-t-0 md:border-l" style={{ background: 'var(--shell-2)', borderColor: 'rgba(255,255,255,0.14)' }}>
              <p className="im-eyebrow im-eyebrow--on-dark" style={{ color: 'var(--accent)' }}>No plans? Add the scan</p>
              <h3 className="mt-3 text-[1.35rem] font-black tracking-[-0.02em] text-white">Site Scan + As-Built · +$699</h3>
              <p className="mt-3 text-[14.5px] leading-[1.65]" style={{ color: 'rgba(242,239,231,0.75)' }}>
                An NC field agent captures the property, our designer builds the floor plan and as-built, plus a licensed third-party inspector service. Required for accuracy when there are no existing plans.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border p-6 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: 'rgba(255,255,255,0.14)', background: 'var(--shell-2)' }}>
            <div>
              <p className="im-eyebrow im-eyebrow--on-dark" style={{ color: 'var(--accent)' }}>Free tool</p>
              <p className="mt-2 text-[15px] leading-[1.6]" style={{ color: 'rgba(242,239,231,0.85)' }}>
                Just sizing up a deal? Get a <span className="font-semibold text-white">free rehab estimate</span> &mdash; a square-footage rehab range from NC cost data, no plans needed.
              </p>
            </div>
            <Link href="/lp/rehab-budget-range-execution-risk-snapshot" className="im-btn im-btn--ghost-on-dark shrink-0">
              Get the free estimate &rarr;
            </Link>
          </div>
        </div>
      </section>

      <RealDeals />

      {/* FAQ — full detail; homepage links here from its 3-item teaser */}
      <section id="faq" className="im-paper scroll-mt-24">
        <FaqJsonLd items={FAQS} />
        <div className="im-container im-section max-w-4xl">
          <p className="im-eyebrow">FAQ</p>
          <h2 className="im-h2 mt-4 text-[2.25rem] sm:text-[3rem]">
            Straight answers.
          </h2>
          <div className="mt-10 space-y-3">
            {FAQS.map((faq, idx) => (
              <FaqItem key={faq.question} faq={{ q: faq.question, a: faq.answer }} defaultOpen={idx === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="im-shell">
        <div className="im-container im-section">
          <FounderStory
            theme="dark"
            productName="the Deal Pack"
          />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

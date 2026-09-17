import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import FounderStory from '@/components/FounderStory';
import RealDeals from '@/components/RealDeals';
import ProductJsonLd from '@/components/seo/ProductJsonLd';

// Focus pass: /deal-pack surfaces ONE product — the Build-Ready Deal Pack.
// Bid-Ready, Site Scan add-on, Pro subscription, and Plans à la carte still
// exist in lib/cart.ts and remain reachable by direct URL, but they no
// longer appear in the JSON-LD or on the page.
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
};

// Focus pass: /deal-pack now shows ONE offer — the Build-Ready Deal Pack.
// Bid-Ready ($599), SF Ballpark (free), and Site Scan add-on ($699) still
// exist in lib/cart.ts and are reachable by direct URL, but they no longer
// clutter the primary funnel.
const TIERS: Tier[] = [
  {
    badge: 'THE OFFER',
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

      {/* THE OFFER — single flagship, no tiers, no downsells */}
      <section id="tiers" className="im-paper">
        <div className="im-container im-section">
          <div className="max-w-3xl">
            <p className="im-eyebrow">The offer</p>
            <h2 className="im-h2 mt-4 text-[2.5rem] sm:text-[3.5rem]">
              One deal pack. One committed price.
            </h2>
            <p className="im-body mt-6 max-w-2xl text-lg">
              A licensed NC GC (#107724) produces the full pre-construction package on your deal.
              $1,997 &mdash; and wholesalers + realtors pay $0 upfront, from proceeds at closing.
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className="group relative flex flex-col p-8 sm:p-12 border"
                style={{ background: 'var(--ink-hi)', color: '#ffffff', borderColor: 'var(--ink-hi)' }}
              >
                <span
                  className="im-mono text-[10.5px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: 'var(--accent)' }}
                >
                  {tier.badge}
                </span>
                <h3 className="mt-6 text-[2rem] sm:text-[2.5rem] font-black tracking-[-0.02em]" style={{ color: '#ffffff' }}>{tier.name}</h3>
                <div className="mt-4 pt-4 border-t flex items-baseline gap-3 flex-wrap" style={{ borderColor: 'rgba(255,255,255,0.14)' }}>
                  <span className="text-[2.5rem] sm:text-[3rem] font-black tracking-[-0.02em]" style={{ color: 'var(--accent)' }}>{tier.price}</span>
                  <span className="im-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: 'rgba(255,255,255,0.6)' }}>{tier.priceNote}</span>
                </div>
                <p className="mt-5 text-[15.5px] leading-[1.65]" style={{ color: 'rgba(255,255,255,0.85)' }}>{tier.promise}</p>
                <ul className="mt-6 space-y-3 text-[14.5px] leading-[1.55]" style={{ color: 'rgba(255,255,255,0.85)' }}>
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
                      style={{ color: 'rgba(255,255,255,0.75)' }}
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

import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import FounderStory from '@/components/FounderStory';
import RealDeals from '@/components/RealDeals';
import ProductJsonLd from '@/components/seo/ProductJsonLd';
import DealPackProActions from '@/components/DealPackProActions';

// Product schema for the 4 Deal Pack tiers. Prices must match the page copy
// exactly (and the Stripe products). When tiers/prices change, update both.
const DEAL_PACK_PRODUCTS = [
  {
    name: 'Bid-Ready Deal Pack',
    description:
      'Licensed NC GC verification of your wholesale deal — rough rehab budget range, scope flags, and a credibility marker for end-investor buyers. 24-hour turnaround.',
    url: '/deal-pack',
    priceUsd: 599,
    category: 'Deal Pack',
    sku: 'deal-pack-bid-ready',
  },
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
    name: 'Site Scan + As-Built + Inspection',
    description:
      'NC field-agent 3D site scan converted into a Chief Architect as-built floorplan, PLUS a licensed third-party inspector service. Required input for high-accuracy Bid-Ready or Build-Ready Deal Packs when measurements or plans are missing.',
    url: '/deal-pack',
    priceUsd: 699,
    category: 'Deal Pack',
    sku: 'deal-pack-site-scan',
  },
  {
    name: 'Deal Pack Pro',
    description:
      'Recurring subscription for active NC wholesalers — 2 Bid-Ready credits per month, additional Bid-Readys at the $399 member rate (verified-member reorder) after that, 25% off Build-Ready upgrades, priority 2-day turnaround, and a "GC-Verified by Southern Cities #107724" co-marketing badge for every listing.',
    url: '/deal-pack',
    priceUsd: 897,
    recurrence: 'monthly' as const,
    category: 'Deal Pack',
    sku: 'deal-pack-pro',
  },
  {
    name: 'As-Built Plans',
    description:
      'Measured existing-condition floor plan of the property, delivered as a PDF plus an editable file. Includes 1 revision. NC GC License #107724.',
    url: '/deal-pack',
    priceUsd: 349,
    category: 'Plans & Visuals',
    sku: 'plans-as-built',
  },
  {
    name: 'Future-State Plans',
    description:
      'Proposed-design (future-state) floor plan showing the renovated layout, delivered as a PDF plus an editable file. Includes 2 revisions. NC GC License #107724.',
    url: '/deal-pack',
    priceUsd: 699,
    category: 'Plans & Visuals',
    sku: 'plans-future-state',
  },
  {
    name: 'Renderings (photoreal)',
    description:
      'Photoreal 3D renderings of the proposed design. $199 each, or three for $499, with 1 revision included per rendering. NC GC License #107724.',
    url: '/deal-pack',
    priceUsd: 199,
    category: 'Plans & Visuals',
    sku: 'renderings',
  },
];

// À la carte plans & visuals — inputs to a Deal Pack when plans are missing,
// or standalone deliverables. Prices must match lib/cart.ts exactly.
const PLANS_ADDONS = [
  {
    name: 'As-Built Plans',
    price: '$349',
    priceNote: 'Measured existing-condition floor plan · 1 revision',
    blurb: 'A measured existing-condition floor plan of the property — PDF + editable file. The base layer when you have no usable plans.',
    href: '/cart?cart=plans-as-built',
    cta: 'Add As-Built · $349 →',
  },
  {
    name: 'Future-State Plans',
    price: '$699',
    priceNote: 'Proposed-design floor plan · 2 revisions',
    blurb: 'A proposed-design floor plan showing the renovated layout — PDF + editable file. What the property becomes.',
    href: '/cart?cart=plans-future-state',
    cta: 'Add Future-State · $699 →',
  },
  {
    name: 'Renderings (photoreal)',
    price: '$199',
    priceNote: '3 for $499 · 1 revision each',
    blurb: 'Photoreal 3D renderings of the proposed design — $199 each, or three for $499. What sells the finished look.',
    href: '/cart?cart=renderings',
    cta: 'Add Renderings · $199 →',
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

const TIERS: Tier[] = [
  {
    badge: 'FLAGSHIP',
    badgeColor: 'orange',
    name: 'Build-Ready Deal Pack',
    price: '$1,997',
    priceNote: 'Per deal · 3–4 day turnaround',
    promise:
      'A licensed NC GC puts your rehab price in writing, sealed with the license and transferable once to your end buyer. The full pack: everything a serious buyer or lender needs to underwrite the deal.',
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
  {
    badge: 'DOWNSELL',
    badgeColor: 'white',
    name: 'Bid-Ready Deal Pack',
    price: '$599',
    priceNote: 'Per deal · 2–3 day turnaround · when you only need the number',
    promise:
      'The lighter version. GC-verified rehab budget range and dollarized scope, without the plans and renderings. When you just need the number to underwrite or offer.',
    includes: [
      'GC-verified rehab budget range',
      'Dollarized line-item scope of work',
      'Top execution risks with cost-to-cure',
      'Lender-killer flags (open permits, polybutylene, electrical, etc.)',
      'Branded PDF with NC GC License #107724 stamp',
    ],
    cta: 'Order Bid-Ready · $599 →',
    ctaHref: '/cart?cart=deal-pack-bid-ready',
  },
  {
    badge: 'FREE',
    badgeColor: 'white',
    name: 'SF-Based Ballpark Estimate',
    price: 'Free',
    priceNote: 'Default when there are no plans on the deal',
    promise:
      'A rough rehab budget range based on square footage + vintage. No commitment, 24-hour turnaround. Use it to decide whether to pull the trigger on Bid-Ready or Build-Ready.',
    includes: [
      'Square-footage + vintage cost ranges',
      'Project category tier (Cosmetic / Light Major / Full Gut)',
      'Top 3 likely lender-killer flags by vintage',
      'Clear upgrade path to a full Deal Pack',
    ],
    cta: 'Talk through your deal →',
    ctaHref: '/start',
  },
  {
    badge: 'ADD-ON',
    badgeColor: 'navy',
    name: 'Site Scan + As-Built + Inspection',
    price: '$699',
    priceNote: 'Add-on or standalone · 5-day turnaround',
    promise:
      'No plans? No measurements? We send an NC field agent to capture a full 3D scan of the property. Our designer converts it into a Chief Architect as-built floorplan — plus a licensed third-party inspector service — the input needed for a high-accuracy Build-Ready Deal Pack.',
    includes: [
      'NC field agent dispatch (scheduled with your seller-access)',
      'Full 3D property scan',
      'Designer-built as-built floorplan in Chief Architect',
      'Licensed third-party inspector service included',
      'PDF + native file delivered',
    ],
    cta: 'Add Site Scan · $699 →',
    ctaHref: '/cart?cart=deal-pack-site-scan',
    sample: { pdfUrl: '/resources/samples/site-scan-as-built-sample.pdf', pages: 8 },
  },
];

const PRO_TIER: Tier = {
  badge: 'SUBSCRIPTION',
  badgeColor: 'orange',
  name: 'Deal Pack Pro',
  price: '$897/mo',
  priceNote: 'For wholesalers doing 2+ deals/mo',
  promise:
    'Recurring subscription for active NC wholesalers. Includes 2 Bid-Ready credits per month, with every additional Bid-Ready at the $399 member rate (reorder anytime as a verified member) + 25% off Build-Ready upgrades + priority 2-day turnaround on every request + "GC-Verified by Southern Cities #107724" co-marketing badge for every assignment listing. Cancel anytime.',
  includes: [
    '2 Bid-Ready Deal Pack credits per month (worth $1,198)',
    'Every additional Bid-Ready at the member rate — $399 each (verified-member reorder, below)',
    '25% off any Build-Ready Deal Pack upgrade ($499 savings each)',
    'Priority 2-day turnaround on every request (faster than one-off Build-Ready)',
    '"GC-Verified by Southern Cities #107724" co-marketing badge',
    'Member-rate priority routing for your buyers into Active Oversight + Investor-Led Build',
    'Cancel anytime — no minimum term',
  ],
  cta: 'Subscribe to Pro · $897/mo →',
  // Pro now checks out as a real subscription via <DealPackProActions />, not
  // the cart. This href is retained only to satisfy the shared Tier type.
  ctaHref: '#pro',
};



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

      {/* TIERS */}
      <section id="tiers" className="im-paper">
        <div className="im-container im-section">
          <div className="max-w-3xl">
            <p className="im-eyebrow">The Deal Pack stack</p>
            <h2 className="im-h2 mt-4 text-[2.5rem] sm:text-[3.5rem]">
              Four ways to package the deal.
            </h2>
            <p className="im-body mt-6 max-w-2xl text-lg">
              Per-deal pricing for one-off use. Subscription for active wholesalers and realtors doing 2+ deals per month. Same execution infrastructure either way &mdash; NC GC License #107724.
            </p>
          </div>

          <div className="mt-12 grid gap-0 lg:grid-cols-2 border" style={{ borderColor: 'var(--line-1)' }}>
            {TIERS.map((tier, idx) => {
              const icons = [
                // Tier 0 — chart icon
                <path key="chart" strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />,
                // Bid-Ready — document with check
                <path key="doc" strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />,
                // Build-Ready — blueprint
                <path key="blueprint" strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />,
                // Site Scan — viewfinder
                <path key="scan" strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5ZM13.5 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5Z" />,
              ];
              const isFlagship = !!tier.highlight;
              const cardStyle = isFlagship
                ? { background: 'var(--ink-hi)', color: '#ffffff' }
                : { background: '#ffffff', color: 'var(--ink-mid)' };
              return (
                <div
                  key={tier.name}
                  className="group relative flex flex-col p-8 sm:p-10 border-t lg:border-t-0 lg:border-l first:border-t-0 first:lg:border-l-0 lg:[&:nth-child(2)]:border-l"
                  style={{ ...cardStyle, borderColor: 'var(--line-1)' }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="im-mono text-[10.5px] font-bold uppercase tracking-[0.22em]"
                      style={{ color: isFlagship ? 'var(--accent)' : 'var(--ink-lo)' }}
                    >
                      {tier.badge}
                    </span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} style={{ color: isFlagship ? 'rgba(255,255,255,0.4)' : 'var(--ink-lo)' }}>
                      {icons[idx]}
                    </svg>
                  </div>
                  <h3 className="mt-6 text-[1.75rem] sm:text-[2rem] font-black tracking-[-0.02em]" style={{ color: isFlagship ? '#ffffff' : 'var(--ink-hi)' }}>{tier.name}</h3>
                  <div className="mt-4 pt-4 border-t flex items-baseline gap-3" style={{ borderColor: isFlagship ? 'rgba(255,255,255,0.14)' : 'var(--line-2)' }}>
                    <span className="text-[2.25rem] font-black tracking-[-0.02em]" style={{ color: 'var(--accent)' }}>{tier.price}</span>
                    <span className="im-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: isFlagship ? 'rgba(255,255,255,0.6)' : 'var(--ink-lo)' }}>{tier.priceNote}</span>
                  </div>
                  <p className="mt-5 text-[15px] leading-[1.65]" style={{ color: isFlagship ? 'rgba(255,255,255,0.85)' : 'var(--ink-mid)' }}>{tier.promise}</p>
                  <ul className="mt-6 space-y-3 text-[14.5px] leading-[1.55]" style={{ color: isFlagship ? 'rgba(255,255,255,0.85)' : 'var(--ink-mid)' }}>
                    {tier.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="im-tick mt-0.5">/</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {tier.sample ? (
                    <a
                      href={tier.sample.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex w-fit items-center gap-2 border px-4 py-2 im-mono text-[11px] font-bold uppercase tracking-[0.14em] transition"
                      style={{
                        borderColor: isFlagship ? 'rgba(255,255,255,0.35)' : 'var(--line-1)',
                        color: isFlagship ? '#ffffff' : 'var(--ink-hi)',
                        borderRadius: '2px',
                      }}
                    >
                      See a {tier.sample.pages}-page sample &nearr;
                    </a>
                  ) : null}
                  <Link
                    href={tier.ctaHref}
                    className={`mt-auto pt-8 inline-flex items-center gap-3 im-mono text-[12px] font-bold uppercase tracking-[0.14em] transition group-hover:gap-4`}
                    style={{ color: isFlagship ? 'var(--accent)' : 'var(--ink-hi)' }}
                  >
                    {tier.cta}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Pro subscription — full-width below, sharp bordered */}
          <div id="pro" className="mt-10 scroll-mt-24 border p-8 sm:p-10" style={{ borderColor: 'var(--line-1)', background: '#ffffff' }}>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="lg:max-w-2xl">
                <span className="im-mono text-[10.5px] font-bold uppercase tracking-[0.22em]" style={{ color: 'var(--accent)' }}>
                  {PRO_TIER.badge}
                </span>
                <h3 className="mt-4 text-[1.75rem] sm:text-[2rem] font-black tracking-[-0.02em]" style={{ color: 'var(--ink-hi)' }}>{PRO_TIER.name}</h3>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-[2rem] font-black" style={{ color: 'var(--accent)' }}>{PRO_TIER.price}</span>
                  <span className="im-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: 'var(--ink-lo)' }}>{PRO_TIER.priceNote}</span>
                </div>
                <p className="mt-5 text-[15px] leading-[1.65]" style={{ color: 'var(--ink-mid)' }}>{PRO_TIER.promise}</p>
              </div>
              <div className="lg:max-w-md">
                <ul className="space-y-3 text-[14px] leading-[1.55]" style={{ color: 'var(--ink-mid)' }}>
                  {PRO_TIER.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="im-tick mt-0.5">/</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <DealPackProActions />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLANS & VISUALS — à la carte add-ons */}
      <section id="plans" className="im-band">
        <div className="im-container im-section">
          <div className="max-w-3xl">
            <p className="im-eyebrow">Plans &amp; visuals · à la carte</p>
            <h2 className="im-h2 mt-4 text-[2.25rem] sm:text-[3rem]">
              Add the plans and renderings the deal needs.
            </h2>
            <p className="im-body mt-6 max-w-2xl text-lg">
              Buy them standalone, or add them when a Deal Pack needs plans it doesn&apos;t have yet. Branded with NC GC License #107724.
            </p>
          </div>
          <div className="mt-12 grid gap-0 md:grid-cols-3 border" style={{ borderColor: 'var(--line-1)' }}>
            {PLANS_ADDONS.map((addon, i) => (
              <div
                key={addon.name}
                className={`flex flex-col p-8 bg-white ${i > 0 ? 'border-t md:border-t-0 md:border-l' : ''}`}
                style={{ borderColor: 'var(--line-1)' }}
              >
                <h3 className="text-[1.35rem] font-black tracking-[-0.02em]" style={{ color: 'var(--ink-hi)' }}>{addon.name}</h3>
                <div className="mt-4 pt-4 border-t flex items-baseline gap-3" style={{ borderColor: 'var(--line-2)' }}>
                  <span className="text-[1.75rem] font-black" style={{ color: 'var(--accent)' }}>{addon.price}</span>
                </div>
                <p className="mt-2 im-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: 'var(--ink-lo)' }}>{addon.priceNote}</p>
                <p className="mt-5 text-[14.5px] leading-[1.65]" style={{ color: 'var(--ink-mid)' }}>{addon.blurb}</p>
                <Link
                  href={addon.href}
                  className="mt-auto pt-8 inline-flex items-center gap-3 im-mono text-[12px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: 'var(--ink-hi)' }}
                >
                  {addon.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SC REALTY CMA CROSS-SELL */}
      <section className="im-paper">
        <div className="im-container py-16 sm:py-20">
          <div className="border p-8 sm:p-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between" style={{ borderColor: 'var(--line-1)', background: '#ffffff' }}>
            <div className="lg:max-w-2xl">
              <p className="im-eyebrow">Add the value side · SC Realty CMA</p>
              <h2 className="im-h2 mt-3 text-[1.75rem] sm:text-[2.25rem]">
                A Deal Pack prices the cost. A <span style={{ color: 'var(--accent)' }}>CMA</span> prices the value.
              </h2>
              <p className="mt-4 text-[15px] leading-[1.65]" style={{ color: 'var(--ink-mid)' }}>
                Your ARV ladder runs RentCast → HouseCanary → a licensed <span className="font-semibold" style={{ color: 'var(--ink-hi)' }}>SC Realty CMA</span> &mdash; a broker&apos;s opinion of value (not an appraisal). Add it to any budget product or run it standalone: <span className="font-semibold" style={{ color: 'var(--ink-hi)' }}>$99 for Deal Desk members, $149 non-members</span>. NC GC License #107724.
              </p>
            </div>
            <Link href="/deal-desk" className="im-btn im-btn--ghost shrink-0">
              Get an SC Realty CMA &rarr;
            </Link>
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
            cta={{ label: 'Order Bid-Ready · $599 →', href: '/cart?cart=deal-pack-bid-ready' }}
          />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

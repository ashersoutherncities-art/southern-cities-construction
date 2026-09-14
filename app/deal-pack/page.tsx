import Image from 'next/image';
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
    priceUsd: 1900,
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
    "Most GCs won't review a deal you don't own yet. We will. A licensed NC GC (#107724) puts a committed rehab price on your deal, sealed with the license and transferable to your end buyer. Build-Ready Deal Pack $1,900.",
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
    price: '$1,900',
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
    cta: 'Order Build-Ready · $1,900 →',
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


function badgeClass(color: 'orange' | 'white' | 'navy') {
  if (color === 'orange') return 'border-orange/60 bg-orange/15 text-orange';
  if (color === 'white') return 'border-white/40 bg-white/10 text-white/85';
  return 'border-white/50 bg-[#0a1428]/80 text-white/80';
}


export default function DealPackPage() {
  return (
    <div className="min-h-screen bg-[#08111d] text-white">
      <ProductJsonLd products={DEAL_PACK_PRODUCTS} />
      <SiteNav variant="solid" />
      {/* Page-context tag below the unified nav */}
      <div className="border-b border-white/8 pt-20 lg:pt-[84px]">
        <div className="container-pro py-3 text-center sm:text-right">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Deal Pack · For NC Wholesalers, Investors + Realtors · NC GC #107724
          </span>
        </div>
      </div>

      {/* WEDGE — the top-of-page positioning line, per brief */}
      <div className="border-b border-white/8 bg-gradient-to-r from-orange/[0.06] via-orange/[0.14] to-orange/[0.06]">
        <div className="container-pro py-4 text-center">
          <p className="text-[15px] font-black tracking-[-0.01em] text-white sm:text-[17px]">
            Most GCs won&apos;t review a deal you don&apos;t own yet. <span className="text-orange">We will.</span>
          </p>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full bg-orange/[0.20] blur-[160px]" aria-hidden="true" />
        <div className="absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full bg-orange/[0.10] blur-[140px]" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-orange/[0.04] blur-[180px]" aria-hidden="true" />
        <div className="relative z-10 container-pro">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
            {/* LEFT: Copy + CTAs */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-orange/50 bg-orange/15 px-4 py-1.5 text-[12px] font-black uppercase tracking-[0.18em] text-orange">
                <span className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
                FOR NC WHOLESALERS, INVESTORS + REALTORS
              </span>
              <h1 className="mt-6 text-3xl font-black leading-[1.04] tracking-[-0.035em] text-white sm:text-4xl lg:text-[3.25rem]">
                A licensed NC GC&apos;s <span className="text-orange">committed rehab price</span> on your deal &mdash; sealed with the license, before you buy it.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-[1.6] text-white/80 sm:text-lg">
                The <span className="text-white font-semibold">Build-Ready Deal Pack ($1,900)</span> is a full pre-construction
                package: committed rehab price sealed with license #107724 and transferable once to your end buyer, plus
                plans, renderings, a market study, a materials list, a vendor list, a permit memo, and an execution risk
                report. Everything a serious buyer or lender needs.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#tiers"
                  className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.5)] transition hover:bg-orange-500 hover:-translate-y-0.5"
                >
                  See the Deal Pack tiers &darr;
                </a>
                <Link
                  href="/guide/consistent-assignment-wholesaler"
                  className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-white transition hover:bg-white/10"
                >
                  Free playbook PDF &rarr;
                </Link>
              </div>
            </div>

            {/* RIGHT: Floating PDF mockup */}
            <div className="relative hidden lg:flex items-center justify-center">
              <div className="absolute inset-0 rounded-[40px] bg-orange/[0.15] blur-[80px]" aria-hidden="true" />
              <div className="relative">
                {/* Behind: secondary PDF tilted */}
                <div className="absolute -right-12 top-6 w-[200px] rotate-[8deg] opacity-70 blur-[1px] transition-transform hover:rotate-[6deg]">
                  <Image
                    src="/product-mockups/wholesale-to-flip-9-month-cover.jpg"
                    alt="Wholesaler-to-Flipper case study PDF"
                    width={200}
                    height={258}
                    className="rounded-[12px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] border border-white/10"
                  />
                </div>
                {/* Front: main PDF */}
                <div className="relative w-[260px] -rotate-[4deg] transition-transform hover:-rotate-[2deg]">
                  <Image
                    src="/product-mockups/consistent-assignment-wholesaler-cover.jpg"
                    alt="The $25-40K Assignment Playbook PDF cover"
                    width={260}
                    height={335}
                    className="rounded-[14px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] border border-white/15 ring-1 ring-orange/30"
                  />
                  <div className="absolute -top-3 -right-3 flex items-center gap-1.5 rounded-full bg-orange px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white shadow-[0_8px_20px_-4px_rgba(245,130,32,0.6)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    FREE PLAYBOOKS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP — substantive claims only */}
      <section className="border-y border-orange/20 bg-gradient-to-r from-orange/[0.04] via-orange/[0.08] to-orange/[0.04]">
        <div className="container-pro py-10 sm:py-12">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-black tracking-tight text-orange sm:text-4xl">$1,900</div>
              <div className="mt-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white/70 sm:text-[11px]">Build-Ready Deal Pack · flagship</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black tracking-tight text-orange sm:text-4xl">$0</div>
              <div className="mt-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white/70 sm:text-[11px]">Wholesaler upfront &middot; pay at closing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black tracking-tight text-orange sm:text-4xl">30-day</div>
              <div className="mt-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white/70 sm:text-[11px]">Committed-price validity</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black tracking-tight text-orange sm:text-4xl">#107724</div>
              <div className="mt-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white/70 sm:text-[11px]">NC GC license stamp</div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMITMENT CERTIFICATE + WHOLESALER TERMS — the two anchor blocks */}
      <section className="bg-[#0a1428] py-16 sm:py-20 border-t border-white/8">
        <div className="container-pro">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Commitment Certificate */}
            <div className="rounded-2xl border-2 border-orange/50 bg-gradient-to-br from-orange/[0.10] via-orange/[0.03] to-transparent p-7 shadow-[0_18px_40px_-18px_rgba(245,130,32,0.28)]">
              <span className="inline-flex items-center rounded-full border border-orange/60 bg-orange/15 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-orange">
                Commitment Certificate
              </span>
              <h3 className="mt-4 text-2xl font-black tracking-[-0.02em] text-white sm:text-[1.7rem]">
                Rehab price in writing. Sealed with the license.
              </h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-white/80">
                Southern Cities puts the rehab price in writing, seals it with NC GC license
                <span className="text-white font-semibold"> #107724</span>, and commits to perform the defined scope
                for that price.
              </p>
              <ul className="mt-4 space-y-2 text-[14.5px] leading-[1.55] text-white/80">
                <li className="flex gap-2"><span className="text-orange mt-0.5">▸</span><span><span className="text-white font-semibold">Transferable once</span> &mdash; from you to your end buyer</span></li>
                <li className="flex gap-2"><span className="text-orange mt-0.5">▸</span><span><span className="text-white font-semibold">30-day expiry</span> from issue</span></li>
                <li className="flex gap-2"><span className="text-orange mt-0.5">▸</span><span>Change orders apply only to concealed or hidden conditions discovered during work</span></li>
                <li className="flex gap-2"><span className="text-orange mt-0.5">▸</span><span>Committed bid for the defined scope &mdash; not a guarantee against every possible condition</span></li>
              </ul>
            </div>

            {/* Wholesaler Terms */}
            <div className="rounded-2xl border-2 border-orange/50 bg-gradient-to-br from-orange/[0.10] via-orange/[0.03] to-transparent p-7 shadow-[0_18px_40px_-18px_rgba(245,130,32,0.28)]">
              <span className="inline-flex items-center rounded-full border border-orange/60 bg-orange/15 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-orange">
                Wholesaler terms
              </span>
              <h3 className="mt-4 text-2xl font-black tracking-[-0.02em] text-white sm:text-[1.7rem]">
                $0 upfront. Pay at closing. No close, no pay.
              </h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-white/80">
                Wholesalers put nothing down. We put a licensed NC GC&apos;s committed rehab price on your deal, and
                the fee comes out of your assignment proceeds when it closes. Nothing closes, nothing owed.
              </p>
              <ul className="mt-4 space-y-2 text-[14.5px] leading-[1.55] text-white/80">
                <li className="flex gap-2"><span className="text-orange mt-0.5">▸</span><span><span className="text-white font-semibold">$0 upfront</span> &mdash; nothing due when we produce the pack</span></li>
                <li className="flex gap-2"><span className="text-orange mt-0.5">▸</span><span><span className="text-white font-semibold">Paid at closing</span> from your assignment proceeds</span></li>
                <li className="flex gap-2"><span className="text-orange mt-0.5">▸</span><span><span className="text-white font-semibold">No close, no pay</span> &mdash; if it doesn&apos;t close, nothing owed</span></li>
                <li className="flex gap-2"><span className="text-orange mt-0.5">▸</span><span>Fee confirmed on a short scoping call</span></li>
              </ul>
              <Link
                href="/lp/wholesaler-deal-pack"
                className="mt-6 inline-flex items-center gap-2 text-[13px] font-black uppercase tracking-[0.08em] text-orange hover:gap-3 transition-all"
              >
                Wholesaler landing page &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TIERS */}
      <section id="tiers" className="py-20 sm:py-24 border-t border-white/8">
        <div className="container-pro">
          <div className="max-w-3xl">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">The Deal Pack stack</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl">
              Four ways to package your next deal.
            </h2>
            <p className="mt-5 text-[16px] leading-[1.65] text-white/75">
              Per-deal pricing for one-off use. Subscription for active wholesalers and realtors doing 2+ deals per month. Same execution infrastructure either way — branded with NC GC License #107724.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
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
              return (
                <div
                  key={tier.name}
                  className={`group relative overflow-hidden rounded-2xl border p-7 flex flex-col transition-all ${
                    tier.highlight
                      ? 'border-orange/60 bg-gradient-to-br from-orange/[0.10] via-orange/[0.04] to-transparent shadow-[0_20px_50px_-20px_rgba(245,130,32,0.30)] hover:shadow-[0_30px_60px_-20px_rgba(245,130,32,0.45)]'
                      : 'border-white/12 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]'
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b-lg bg-orange px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-white">
                      ★ Most Popular
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${badgeClass(
                        tier.badgeColor,
                      )}`}
                    >
                      {tier.badge}
                    </span>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${tier.highlight ? 'bg-orange/25 border border-orange/50' : 'bg-white/[0.06] border border-white/12'}`}>
                      <svg className={`h-5 w-5 ${tier.highlight ? 'text-orange' : 'text-white/70'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                        {icons[idx]}
                      </svg>
                    </div>
                  </div>
                  <h3 className="mt-4 text-2xl font-black tracking-tight text-white">{tier.name}</h3>
                  <div className="mt-3 flex items-baseline gap-3">
                    <span className="text-3xl font-black text-orange">{tier.price}</span>
                    <span className="text-[12px] uppercase tracking-[0.12em] text-white/55">{tier.priceNote}</span>
                  </div>
                  <p className="mt-4 text-[15px] leading-[1.6] text-white/80">{tier.promise}</p>
                  <ul className="mt-5 space-y-2.5 text-[14px] leading-[1.55] text-white/75">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <svg className="h-4 w-4 flex-shrink-0 mt-0.5 text-orange" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {tier.sample ? (
                    <a
                      href={tier.sample.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-white/80 transition hover:border-orange/40 hover:text-orange"
                    >
                      See a {tier.sample.pages}-page sample ↗
                    </a>
                  ) : null}
                  <Link
                    href={tier.ctaHref}
                    className={`mt-auto pt-6 inline-flex items-center gap-1 font-black uppercase tracking-[0.08em] transition group-hover:gap-2 ${
                      tier.highlight ? 'text-orange' : 'text-white/90 hover:text-orange'
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Pro subscription — full-width below */}
          <div id="pro" className="mt-6 scroll-mt-24 rounded-2xl border border-orange/40 bg-gradient-to-br from-orange/[0.08] to-transparent p-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="lg:max-w-2xl">
                <span className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${badgeClass(PRO_TIER.badgeColor)}`}>
                  {PRO_TIER.badge}
                </span>
                <h3 className="mt-4 text-2xl font-black tracking-tight text-white">{PRO_TIER.name}</h3>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-3xl font-black text-orange">{PRO_TIER.price}</span>
                  <span className="text-[12px] uppercase tracking-[0.12em] text-white/55">{PRO_TIER.priceNote}</span>
                </div>
                <p className="mt-4 text-[15px] leading-[1.6] text-white/80">{PRO_TIER.promise}</p>
              </div>
              <div className="lg:max-w-md">
                <ul className="space-y-2 text-[14px] leading-[1.55] text-white/75">
                  {PRO_TIER.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-orange">▸</span>
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
      <section id="plans" className="py-16 sm:py-20 border-t border-white/8">
        <div className="container-pro">
          <div className="max-w-3xl">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">Plans &amp; visuals · à la carte</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl">
              Add the plans and renderings your deal needs.
            </h2>
            <p className="mt-5 text-[16px] leading-[1.65] text-white/75">
              Buy them standalone, or add them when a Deal Pack needs plans it doesn&apos;t have yet. As-built for what exists, future-state for what it becomes, photoreal renderings to sell the finished look. Branded with NC GC License #107724.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PLANS_ADDONS.map((addon) => (
              <div key={addon.name} className="flex flex-col rounded-2xl border border-white/12 bg-white/[0.03] p-7 transition-all hover:border-white/25 hover:bg-white/[0.05]">
                <h3 className="text-xl font-black tracking-tight text-white">{addon.name}</h3>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-3xl font-black text-orange">{addon.price}</span>
                </div>
                <p className="mt-1 text-[12px] uppercase tracking-[0.12em] text-white/55">{addon.priceNote}</p>
                <p className="mt-4 text-[14.5px] leading-[1.6] text-white/80">{addon.blurb}</p>
                <Link
                  href={addon.href}
                  className="mt-auto pt-6 inline-flex items-center gap-1 font-black uppercase tracking-[0.08em] text-white/90 transition hover:gap-2 hover:text-orange"
                >
                  {addon.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SC REALTY CMA CROSS-SELL — the value side of the deal math */}
      <section className="py-12 sm:py-14 border-t border-white/8">
        <div className="container-pro">
          <div className="rounded-[24px] border border-white/15 bg-white/[0.03] p-7 sm:p-9">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="lg:max-w-2xl">
                <span className="inline-flex items-center rounded-full border border-orange/50 bg-orange/15 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-orange">
                  Add the value side · SC Realty CMA
                </span>
                <h2 className="mt-4 text-2xl font-black tracking-[-0.025em] text-white sm:text-3xl">
                  A Deal Pack prices the cost. A <span className="text-orange">CMA</span> prices the value.
                </h2>
                <p className="mt-3 text-[15px] leading-[1.6] text-white/80 sm:text-base">
                  Your ARV ladder runs RentCast → HouseCanary → a licensed <span className="text-white">SC Realty CMA</span> — a broker&apos;s opinion of value (not an appraisal) to anchor the value side of your deal math. Add it to any budget product or run it standalone: <span className="text-white font-semibold">$99 for Deal Desk members, $149 non-members</span>. NC GC License #107724.
                </p>
              </div>
              <Link
                href="/deal-desk"
                className="shrink-0 inline-flex min-h-[56px] items-center justify-center rounded-full border border-orange/50 bg-orange/15 px-7 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-orange transition hover:bg-orange/25 hover:-translate-y-0.5"
              >
                Get an SC Realty CMA →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#0a1428] py-20 sm:py-24 border-t border-white/8">
        <div className="container-pro max-w-5xl">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">How it works</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl">
            What we need to build it.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70">
            To produce your Deal Pack we need the property&rsquo;s plans. Already have them? Upload at checkout. Don&rsquo;t? We&rsquo;ll capture them for you.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-6">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange">If you have plans</p>
              <h3 className="mt-3 text-lg font-black tracking-tight text-white">Upload at checkout</h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-white/70">
                Architectural plans, measurements, or an appraiser sketch &mdash; upload them at checkout and we go straight into Deal Pack production.
              </p>
            </div>
            <div className="rounded-2xl border border-orange/40 bg-orange/[0.04] p-6">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange">No plans? Add the scan</p>
              <h3 className="mt-3 text-lg font-black tracking-tight text-white">As-Built Site Scan + Inspection &middot; +$699</h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-white/70">
                We send an NC field agent to capture the property, our designer builds the floor plan and as-built, and a licensed third-party inspector service is included. Required for an accurate Bid-Ready or Build-Ready when there are no existing plans.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/12 bg-white/[0.02] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange">Free tool</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-white/80">
                Just sizing up a deal? Get a <span className="font-semibold text-white">free rehab estimate</span> &mdash; a square-footage rehab range from NC cost data, no plans needed.
              </p>
            </div>
            <Link
              href="/lp/rehab-budget-range-execution-risk-snapshot"
              className="shrink-0 inline-flex min-h-[48px] items-center justify-center rounded-full border border-orange/50 bg-orange/15 px-6 py-3 text-sm font-black uppercase tracking-[0.08em] text-orange transition hover:bg-orange/25"
            >
              Get the free estimate &rarr;
            </Link>
          </div>
        </div>
      </section>

      <RealDeals />

      {/* TRUST */}
      <section className="bg-[#0a1428] py-20 sm:py-24 border-t border-white/8">
        <div className="container-pro">
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

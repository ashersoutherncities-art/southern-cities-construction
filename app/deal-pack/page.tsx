import Image from 'next/image';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import FounderStory from '@/components/FounderStory';
import ProductJsonLd from '@/components/seo/ProductJsonLd';

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
      'Full GC-verified Deal Pack: as-built floorplans + elevations, itemized rehab budget, and the GC commitment to do the work at that price. Sell your wholesale deal as a finished pre-construction product.',
    url: '/deal-pack',
    priceUsd: 1997,
    category: 'Deal Pack',
    sku: 'deal-pack-build-ready',
  },
  {
    name: 'Site Scan + As-Built',
    description:
      'NC field-agent LIDAR scan converted into a Chief Architect as-built floorplan. Required input for high-accuracy Bid-Ready or Build-Ready Deal Packs when measurements or plans are missing.',
    url: '/deal-pack',
    priceUsd: 499,
    category: 'Deal Pack',
    sku: 'deal-pack-site-scan',
  },
  {
    name: 'Deal Pack Pro',
    description:
      'Recurring subscription for active NC wholesalers — 2 Bid-Ready credits per month, 25% off Build-Ready upgrades, priority 2-day turnaround, and a "GC-Verified by Southern Cities #107724" co-marketing badge for every listing.',
    url: '/deal-pack',
    priceUsd: 897,
    recurrence: 'monthly' as const,
    category: 'Deal Pack',
    sku: 'deal-pack-pro',
  },
];

export const metadata = {
  title: 'Deal Pack — Licensed GC Verification for NC Wholesalers + Realtors | Southern Cities Construction',
  description:
    "Real investors won't pay top dollar for unverified deals. Attach a licensed NC General Contractor's verification to your next assignment or listing — and attract the buyer pool that actually pays for it. NC GC License #107724.",
  alternates: { canonical: '/deal-pack' },
  openGraph: {
    type: 'website',
    url: '/deal-pack',
    title: 'Deal Pack — Licensed GC Verification for NC Wholesalers + Realtors',
    description:
      "Attach a licensed NC GC's verification to your next assignment or listing — attract the buyer pool that actually pays for it.",
    siteName: 'Southern Cities Construction',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deal Pack — Licensed GC Verification',
    description:
      "Attach a licensed NC GC's verification to your next assignment or listing — attract the buyers who pay top dollar.",
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
    badge: 'TIER 0 · FREE',
    badgeColor: 'white',
    name: 'SF-Based Ballpark Estimate',
    price: 'Free',
    priceNote: 'Default when no plans + no As-Built',
    promise:
      'Get a rough rehab budget range for your deal based on square footage + vintage. No commitment, 24-hour turnaround. Use it to decide if the deal is worth a Bid-Ready upgrade.',
    includes: [
      'Square-footage + vintage cost ranges',
      'Project category tier (Cosmetic / Light Major / Full Gut)',
      'Top 3 likely lender-killer flags by vintage',
      'A clear upgrade path to a full Bid-Ready Deal Pack',
    ],
    cta: 'Talk through your deal →',
    ctaHref: '/book',
  },
  {
    badge: 'TIER 1',
    badgeColor: 'orange',
    name: 'Bid-Ready Deal Pack',
    price: '$599',
    priceNote: 'Per deal · 2–3 day turnaround',
    promise:
      'GC-Certified rehab budget, dollarized scope of work, execution risk callouts, lender-killer flags. Branded PDF you attach to your assignment marketing — designed for real-investor buyers, not other wholesalers.',
    includes: [
      'GC-Certified Budget Range (Lender-Pass / Market-Standard / Premium tiers)',
      'Dollarized line-item scope of work',
      'Top execution risks with cost-to-cure',
      'Lender-killer flags (open permits, polybutylene, electrical, etc.)',
      'Branded PDF with NC GC License #107724 stamp',
      'Refund if we cannot deliver the report on time',
    ],
    cta: 'Order Bid-Ready · $599 →',
    ctaHref: '/cart?cart=deal-pack-bid-ready',
    highlight: true,
  },
  {
    badge: 'TIER 2',
    badgeColor: 'orange',
    name: 'Build-Ready Deal Pack',
    price: '$1,997',
    priceNote: 'Per deal · 3–4 day turnaround',
    promise:
      'Shovel-ready package end-investors actually pay top-of-market for — and we commit to do the work at the price we write. Floor plans, design renderings, full scope, vetted sub-trade quotes, draw schedule, pre-closing open-permit sweep. The premium tier.',
    includes: [
      'Everything in Bid-Ready PLUS',
      'We commit to do the work at the price we write — buyer can argue with the GC who’s going to swing the hammer, or sign',
      'Floor plans + 2–3 design renderings',
      'Full written scope of work (room-by-room)',
      '3 vetted NC sub-trade quotes per major trade',
      'Draw schedule template ready for lender submission',
      'Pre-closing open permit + lien sweep report',
      'License-stamped front + back covers for marketing',
    ],
    cta: 'Order Build-Ready · $1,997 →',
    ctaHref: '/cart?cart=deal-pack-build-ready',
    sample: { pdfUrl: '/resources/samples/build-ready-deal-pack-sample.pdf', pages: 9 },
  },
  {
    badge: 'ADD-ON',
    badgeColor: 'navy',
    name: 'Site Scan + As-Built',
    price: '$499',
    priceNote: 'Add-on or standalone · 5-day turnaround',
    promise:
      'No plans? No measurements? We send an NC field agent with a LIDAR scanner. The 3D scan gets converted by our designer into a Chief Architect as-built floorplan — required input for a high-accuracy Bid-Ready or Build-Ready Deal Pack.',
    includes: [
      'NC field agent dispatch (scheduled with your seller-access)',
      'Full LIDAR property scan',
      'Designer-built as-built floorplan in Chief Architect',
      'PDF + native file delivered',
      'Refund if we cannot deliver the scan + plan on time',
    ],
    cta: 'Add Site Scan · $499 →',
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
    'Recurring subscription for active NC wholesalers. Includes 2 Bid-Ready credits per month + 25% off Build-Ready upgrades + priority 2-day turnaround on every request + "GC-Verified by Southern Cities #107724" co-marketing badge for every assignment listing. Cancel anytime.',
  includes: [
    '2 Bid-Ready Deal Pack credits per month (worth $1,198)',
    '25% off any Build-Ready Deal Pack upgrade ($499 savings each)',
    'Priority 2-day turnaround on every request (faster than one-off Build-Ready)',
    '"GC-Verified by Southern Cities #107724" co-marketing badge',
    'Member-rate priority routing for your buyers into Active Oversight + GC-Supported Build',
    'Cancel anytime — no minimum term',
  ],
  cta: 'Subscribe to Pro · $897/mo →',
  ctaHref: '/cart?cart=deal-pack-pro-subscription',
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
            Deal Pack · For NC Wholesalers + Realtors · NC GC #107724
          </span>
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
                FOR NC WHOLESALERS + REALTORS · 2026
              </span>
              <h1 className="mt-6 text-3xl font-black leading-[1.04] tracking-[-0.035em] text-white sm:text-4xl lg:text-[3.25rem]">
                Real investors won&apos;t pay top dollar for unverified deals.<br />
                <span className="text-orange">Add a licensed GC&apos;s verification to yours.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-[1.6] text-white/80 sm:text-lg">
                Whether you&apos;re a wholesaler with an assignment or a realtor with a rehab-needed listing, the buyer pool that actually pays top of market won&apos;t touch a property without GC-verified scope, budget, and risk documentation. Attach a Deal Pack to your marketing — same property, different buyer pool, 2–4× the fee.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#tiers"
                  className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-orange px-7 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.5)] transition hover:bg-orange-500 hover:-translate-y-0.5"
                >
                  See the Deal Pack tiers ↓
                </a>
                <Link
                  href="/guide/consistent-assignment-wholesaler"
                  className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-white transition hover:bg-white/10"
                >
                  Free playbook PDF →
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

      {/* STATS STRIP */}
      <section className="border-y border-orange/20 bg-gradient-to-r from-orange/[0.04] via-orange/[0.08] to-orange/[0.04]">
        <div className="container-pro py-10 sm:py-12">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-black tracking-tight text-orange sm:text-4xl">2–4×</div>
              <div className="mt-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white/70 sm:text-[11px]">typical fee uplift</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black tracking-tight text-orange sm:text-4xl">5–9</div>
              <div className="mt-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white/70 sm:text-[11px]">days to close (vs. 14–21)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black tracking-tight text-orange sm:text-4xl">$0</div>
              <div className="mt-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white/70 sm:text-[11px]">to start (free SF ballpark)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black tracking-tight text-orange sm:text-4xl">#107724</div>
              <div className="mt-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white/70 sm:text-[11px]">NC GC license stamp</div>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="bg-[#0a1428] py-16 sm:py-20 border-t border-white/8">
        <div className="container-pro max-w-4xl">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">The buyer-pool problem</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl">
            Your fee is capped by who shows up to buy — not your deal.
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-6">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange">Layer 1 · You captured the smallest piece</p>
              <h3 className="mt-3 text-xl font-black tracking-tight text-white">15–25% of the total spread.</h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-white/75">
                Wholesaler: you assign for $10K. Your buyer flips the property for $80K profit. Realtor: your listing sits 60 days while investor-buyers pass; you negotiate it down $15K to attract one. The other 75% of value goes to whoever does the construction execution.
              </p>
            </div>
            <div className="rounded-2xl border border-orange/40 bg-orange/[0.04] p-6">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange">Layer 2 · The real buyers won&apos;t even look</p>
              <h3 className="mt-3 text-xl font-black tracking-tight text-white">Serious investors skip unverified deals.</h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-white/75">
                DSCR and hard-money lenders require verified scope. Out-of-state capital partners need license-backed packages. Without verification, your deal is invisible to the buyer pool that actually pays top of market — and you&apos;re stuck with the pool that doesn&apos;t.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIENCE-USE COMPARISON */}
      <section className="bg-[#0d1a30] py-16 sm:py-20 border-t border-white/8">
        <div className="container-pro max-w-5xl">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">Who uses Deal Pack · how</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl">
            Same product. Two audiences. Two attachment points.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* Wholesaler card */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-br from-orange/[0.08] via-white/[0.02] to-transparent p-7 transition-all hover:border-orange/40 hover:shadow-[0_24px_48px_-16px_rgba(245,130,32,0.25)]">
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-orange/10 blur-2xl transition-all group-hover:bg-orange/20" aria-hidden="true" />
              <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange/20 border border-orange/40">
                  <svg className="h-6 w-6 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange">For NC Wholesalers</p>
                  <h3 className="mt-1 text-xl font-black tracking-tight text-white sm:text-2xl">Attach to your assignment.</h3>
                </div>
              </div>
              <ul className="mt-5 space-y-3 text-[14.5px] leading-[1.6] text-white/80">
                <li className="flex gap-2"><span className="text-orange flex-shrink-0 mt-0.5">▸</span><span>Attract end-investors instead of other wholesalers</span></li>
                <li className="flex gap-2"><span className="text-orange flex-shrink-0 mt-0.5">▸</span><span>Lender-friendly package = buyer&apos;s financing approves faster</span></li>
                <li className="flex gap-2"><span className="text-orange flex-shrink-0 mt-0.5">▸</span><span>Close 2× faster at 2–4× your typical assignment fee</span></li>
                <li className="flex gap-2"><span className="text-orange flex-shrink-0 mt-0.5">▸</span><span>License stamp differentiates you from every other wholesaler in NC</span></li>
              </ul>
            </div>
            {/* Realtor card */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-br from-orange/[0.08] via-white/[0.02] to-transparent p-7 transition-all hover:border-orange/40 hover:shadow-[0_24px_48px_-16px_rgba(245,130,32,0.25)]">
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-orange/10 blur-2xl transition-all group-hover:bg-orange/20" aria-hidden="true" />
              <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange/20 border border-orange/40">
                  <svg className="h-6 w-6 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange">For NC Realtors</p>
                  <h3 className="mt-1 text-xl font-black tracking-tight text-white sm:text-2xl">Attach to your listing.</h3>
                </div>
              </div>
              <ul className="mt-5 space-y-3 text-[14.5px] leading-[1.6] text-white/80">
                <li className="flex gap-2"><span className="text-orange flex-shrink-0 mt-0.5">▸</span><span>List rehab-needed properties at top of band with confidence</span></li>
                <li className="flex gap-2"><span className="text-orange flex-shrink-0 mt-0.5">▸</span><span>Attract investor-buyers who&apos;d otherwise pass on un-scoped listings</span></li>
                <li className="flex gap-2"><span className="text-orange flex-shrink-0 mt-0.5">▸</span><span>Close investor-friendly listings faster, with fewer credit demands</span></li>
                <li className="flex gap-2"><span className="text-orange flex-shrink-0 mt-0.5">▸</span><span>Differentiate your listing presentation — GC scope in every offer talk</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTOR PATH — EXECUTION PLATFORM CROSS-LINK (reciprocal of the wholesaler callout on /platform) */}
      <section className="bg-[#08111d] py-12 sm:py-14 border-t border-white/8">
        <div className="container-pro">
          <div className="rounded-[24px] border border-white/15 bg-white/[0.03] p-7 sm:p-9">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="lg:max-w-2xl">
                <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-white/80">
                  Running your own rehab?
                </span>
                <h2 className="mt-4 text-2xl font-black tracking-[-0.025em] text-white sm:text-3xl">
                  Investors don&apos;t buy Deal Packs — they run the{' '}
                  <span className="text-orange">Execution Platform</span>.
                </h2>
                <p className="mt-3 text-[15px] leading-[1.6] text-white/75 sm:text-base">
                  The Deal Pack is built for wholesalers and agents packaging a deal to{' '}
                  <span className="text-white">sell</span>. If you own the property and you&apos;re executing the
                  rehab yourself, you want validation, setup, oversight, or full GC — sized to where your project
                  actually is.
                </p>
              </div>
              <Link
                href="/platform"
                className="shrink-0 inline-flex min-h-[56px] items-center justify-center rounded-full border border-orange/50 bg-orange/15 px-7 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-orange transition hover:bg-orange/25 hover:-translate-y-0.5"
              >
                See the Execution Platform →
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
          <div className="mt-6 rounded-2xl border border-orange/40 bg-gradient-to-br from-orange/[0.08] to-transparent p-7">
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
                <Link
                  href={PRO_TIER.ctaHref}
                  className="mt-6 inline-flex min-h-[52px] items-center justify-center rounded-full bg-orange px-6 py-3 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.5)] transition hover:bg-orange-500 hover:-translate-y-0.5"
                >
                  {PRO_TIER.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#0a1428] py-20 sm:py-24 border-t border-white/8">
        <div className="container-pro max-w-5xl">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">How it works</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl">
            Three input paths. Same fast turnaround.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-6">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange">Path A · You have plans</p>
              <h3 className="mt-3 text-lg font-black tracking-tight text-white">Upload + checkout</h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-white/70">
                Existing architectural plans, measurements, or appraiser sketch. Upload at checkout, we go straight to Deal Pack production.
              </p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-6">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange">Path B · SF-based default</p>
              <h3 className="mt-3 text-lg font-black tracking-tight text-white">Free ballpark estimate</h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-white/70">
                No plans, no As-Built. We deliver a square-footage-based rehab range using NC vintage cost data. Less accurate but $0 extra.
              </p>
            </div>
            <div className="rounded-2xl border border-orange/40 bg-orange/[0.04] p-6">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange">Path C · Site Scan</p>
              <h3 className="mt-3 text-lg font-black tracking-tight text-white">+ $499 Add-On</h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-white/70">
                No plans + want high accuracy. NC field agent dispatched with LIDAR scanner. Designer builds the as-built. Required for accurate Bid-Ready / Build-Ready on no-plan properties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-20 sm:py-24 border-t border-white/8">
        <div className="container-pro max-w-6xl">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">Free playbooks</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl">
            Two free PDFs. Two NC wholesaler stories. Two paths forward.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Link
              href="/guide/consistent-assignment-wholesaler"
              className="group flex flex-col sm:flex-row gap-6 rounded-2xl border border-white/12 bg-white/[0.03] p-6 transition-all hover:border-orange/40 hover:bg-orange/[0.04] hover:shadow-[0_24px_48px_-16px_rgba(245,130,32,0.18)]"
            >
              <div className="shrink-0 self-center sm:self-start">
                <div className="relative w-[120px] mx-auto sm:mx-0">
                  <Image
                    src="/product-mockups/consistent-assignment-wholesaler-cover.jpg"
                    alt="The $25-40K Assignment Playbook PDF cover"
                    width={120}
                    height={155}
                    className="rounded-lg shadow-[0_12px_24px_-8px_rgba(0,0,0,0.5)] border border-white/15 transition-transform group-hover:scale-105 group-hover:-rotate-2"
                  />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange">FREE · 12 PAGES · WHOLESALER</p>
                <h3 className="mt-2 text-lg font-black tracking-tight text-white group-hover:text-orange sm:text-xl">
                  The $25–40K Assignment Playbook
                </h3>
                <p className="mt-2 text-[14px] leading-[1.55] text-white/75">
                  How NC wholesalers are consistently closing $25–40K+ assignments without becoming flippers. Includes a sample Deal Pack excerpt that closed a $32K assignment in 9 days.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-black uppercase tracking-[0.08em] text-orange text-[12px] group-hover:gap-2 transition-all">
                  Get the free PDF →
                </span>
              </div>
            </Link>
            <Link
              href="/guide/wholesale-to-flip-9-month"
              className="group flex flex-col sm:flex-row gap-6 rounded-2xl border border-white/12 bg-white/[0.03] p-6 transition-all hover:border-orange/40 hover:bg-orange/[0.04] hover:shadow-[0_24px_48px_-16px_rgba(245,130,32,0.18)]"
            >
              <div className="shrink-0 self-center sm:self-start">
                <div className="relative w-[120px] mx-auto sm:mx-0">
                  <Image
                    src="/product-mockups/wholesale-to-flip-9-month-cover.jpg"
                    alt="From $10K to $104K in 9 Months PDF cover"
                    width={120}
                    height={155}
                    className="rounded-lg shadow-[0_12px_24px_-8px_rgba(0,0,0,0.5)] border border-white/15 transition-transform group-hover:scale-105 group-hover:rotate-2"
                  />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange">FREE · 14 PAGES · CASE STUDY</p>
                <h3 className="mt-2 text-lg font-black tracking-tight text-white group-hover:text-orange sm:text-xl">
                  From $10K to $104K in 9 Months
                </h3>
                <p className="mt-2 text-[14px] leading-[1.55] text-white/75">
                  Real 9-month case study of an NC wholesaler who kept his deal instead of assigning it. Full disclosed P&L. The 5-rule keep-vs-assign decision framework.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-black uppercase tracking-[0.08em] text-orange text-[12px] group-hover:gap-2 transition-all">
                  Get the free case study →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

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

import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import LpLeadForm from '@/components/LpLeadForm';

type Product = {
  name: string;
  description: string;
  price?: string;
  href: string;
  primaryCta: 'View Details';
  itemKey?: string;
  covers?: string[];
};

type Stage = {
  id: string;
  stage: string;
  title: string;
  label: string;
  cta: string;
  compact?: boolean;
  products: Product[];
};

const realtorStages: Stage[] = [
  {
    id: 'active-deal-at-risk',
    stage: 'When a deal is on the clock',
    title: 'Active Deal at Risk',
    label: 'Inspection issues, negotiation moments, and time-sensitive construction questions where the deal could die today.',
    cta: 'Get a Construction Read',
    products: [
      {
        name: 'Same-Day Quick Read',
        price: '$199 · 4-hour turnaround',
        description: 'Urgent inspection triage by a licensed NC GC. Critical-vs-cosmetic prioritization, rough cost ranges, and a response-path recommendation — same business day.',
        href: '/services/realtors/inspection-response',
        primaryCta: 'View Details',
        itemKey: 'inspection-response-service',
        covers: [
          'Critical-vs-cosmetic triage',
          'Rough cost ranges per issue',
          'Response-path recommendation',
          'Same-day turnaround',
        ],
      },
      {
        name: 'Realtor Inspection Review',
        price: '$299 · 1-day turnaround',
        description: 'Comprehensive inspection-report read with item-by-item severity, repair-scope notes, cost ranges, and a client-shareable PDF deliverable.',
        href: '/services/realtors/realtor-inspection-review',
        primaryCta: 'View Details',
        itemKey: 'realtor-inspection-review',
        covers: [
          'Item-by-item severity ratings',
          'Repair-scope per finding',
          'Cost ranges + contractor-fit',
          'Client-shareable PDF',
        ],
      },
      {
        name: 'Negotiation Strategy Read',
        price: '$299 · 1-day turnaround',
        description: 'Construction-side opinion on buyer concession asks. Per-issue reasonableness, counter-range recommendations, and talking points for the client conversation.',
        href: '/services/realtors/negotiation-strategy-read',
        primaryCta: 'View Details',
        itemKey: 'negotiation-strategy-read',
        covers: [
          'Per-issue reasonableness analysis',
          'Counter-range recommendations',
          'Client-conversation talking points',
          'Anchors counter-offer in real construction numbers',
        ],
      },
    ],
  },
  {
    id: 'before-the-offer',
    stage: 'When a buyer is about to commit',
    title: 'Before the Offer',
    label: 'For buyer\'s agents — construction-side read on a property before the offer goes in, not after the inspection.',
    cta: 'Read the Property',
    compact: true,
    products: [
      {
        name: 'Buyer-Side Property Read',
        price: '$299 · 1-day turnaround',
        description: 'Pre-offer construction-side perspective from a licensed NC GC. Visible condition assessment, likely repair needs, rough cost range, and offer-strategy note based on construction reality.',
        href: '/services/realtors/buyer-side-property-read',
        primaryCta: 'View Details',
        itemKey: 'buyer-side-property-read',
        covers: [
          'Address + photo review by licensed GC',
          'Visible condition assessment',
          'Likely repair needs + cost range',
          'Offer-strategy recommendation',
        ],
      },
    ],
  },
  {
    id: 'pre-listing',
    stage: 'When pricing or prepping a listing',
    title: 'Pre-Listing',
    label: 'Help with pricing strategy, prep scope, and what to fix vs leave alone before a listing goes live.',
    cta: 'Plan This Listing',
    compact: true,
    products: [
      {
        name: 'Pre-Listing Construction Valuation',
        price: '$399 · 1-day turnaround',
        description: 'Construction-side valuation read for pricing decisions. Condition-adjusted price band, top value-drag items with cost-to-fix vs cost-to-leave analysis, and pricing strategy note.',
        href: '/services/realtors/pre-listing-construction-valuation',
        primaryCta: 'View Details',
        itemKey: 'pre-listing-construction-valuation',
        covers: [
          'Condition-adjusted price band',
          'Top-3 value-drag items',
          'Cost-to-fix vs cost-to-leave analysis',
          'Pricing strategy note',
        ],
      },
      {
        name: 'Pre-Listing Work',
        description: 'Property-specific pricing direction for pre-listing prep — what to fix, what to skip, and what prep budget range makes sense given the listing goals.',
        href: '/services/realtors/pre-listing-budget-prep-review',
        primaryCta: 'View Details',
      },
      {
        name: 'Listing Prep Coordination',
        description: 'Review-first coordination for listings that need broader prep work scoped properly before going live.',
        href: '/services/realtors/listing-prep-coordination',
        primaryCta: 'View Details',
      },
    ],
  },
];

// Transaction-package bundle comparison rows. Each capability is either
// included (✔) or not (—) in each bundle column — mirrors the investor
// hub's `supportRows` / `supportBundles` pattern.
const transactionPackageRows = [
  'Pre-offer property read (photo)',
  'Pre-listing construction valuation',
  'Construction confidence sheet (MLS asset)',
  'Listing prep PM coordination call',
  'Realtor Inspection Review',
  'Paste-ready Repair Request Language',
  'Repair Scope Letter (GC-signed, buyer-side)',
  'Repair Credit Letter (GC-signed, listing-side)',
  'Negotiation Strategy memo',
  'Repair Verification Visit',
  'Year-1 Priority Repair Plan',
];

const transactionPackages = [
  {
    label: 'For Buyer Agents',
    title: 'Buyer Transaction Package',
    price: '$1,599 flat',
    saves: 'Saves ~$300 vs à la carte',
    includes: [
      'Pre-offer property read (photo)',
      'Realtor Inspection Review',
      'Paste-ready Repair Request Language',
      'Repair Scope Letter (GC-signed, buyer-side)',
      'Negotiation Strategy memo',
      'Repair Verification Visit',
      'Year-1 Priority Repair Plan',
    ],
    href: '/lp/buyer-transaction-package',
    highlighted: false,
  },
  {
    label: 'For Listing Agents',
    title: 'Listing Transaction Package',
    price: '$1,799 flat',
    saves: 'Saves ~$250 vs à la carte',
    includes: [
      'Pre-listing construction valuation',
      'Construction confidence sheet (MLS asset)',
      'Listing prep PM coordination call',
      'Realtor Inspection Review',
      'Paste-ready Repair Request Language',
      'Repair Credit Letter (GC-signed, listing-side)',
      'Repair Verification Visit',
    ],
    href: '/lp/listing-transaction-package',
    highlighted: true,
    badge: 'Most Common',
  },
  {
    label: 'Either Side',
    title: 'Per-Deal Co-Pilot',
    price: '$1,499 flat',
    saves: 'Pick listing or buying at intake',
    includes: [
      // Co-Pilot picks listing or buyer side at intake and includes the
      // standard products on that side. For the chart we show ✔ for any
      // item covered on either side — the LP explains the side-pick.
      'Pre-offer property read (photo)',
      'Pre-listing construction valuation',
      'Realtor Inspection Review',
      'Paste-ready Repair Request Language',
      'Negotiation Strategy memo',
      'Repair Verification Visit',
      'Year-1 Priority Repair Plan',
    ],
    href: '/lp/per-deal-copilot',
    highlighted: false,
  },
];

const supportTiers = [
  {
    label: 'For solo agents',
    title: 'Realtor Solo',
    price: '$299/mo',
    includes: [
      '2 inspection or listing reviews / mo',
      '1 pricing-direction question / mo',
      '24-hour response SLA',
      'Unused reviews bank up to 2',
    ],
    cta: 'Review Plan',
    href: '/services/realtors/realtor-solo',
    highlighted: false,
  },
  {
    label: 'For small teams · Most common',
    title: 'Realtor Team',
    price: '$649/mo',
    includes: [
      '4 inspection / listing reviews / mo',
      '2 pricing-direction questions / mo',
      'Same-day triage on urgent items',
      'Written deal-support summaries',
      'Shared team access (3–10 agents)',
    ],
    cta: 'Review Plan',
    href: '/services/realtors/realtor-team',
    highlighted: true,
    badge: 'Most Common',
  },
  {
    label: 'For brokerages (10+ agents)',
    title: 'Brokerage Pro',
    price: '$2,499/mo',
    includes: [
      'Unlimited reviews + pricing direction',
      'Dedicated SCC contact',
      '4-hour urgent SLA',
      'Quarterly business review',
      'White-label client briefings',
      'Agency-wide access (10+ agents)',
    ],
    cta: 'Review Plan',
    href: '/services/realtors/realtor-brokerage-pro',
    highlighted: false,
  },
];

export const metadata = {
  title: 'For Realtors | Southern Cities Construction',
  description:
    'Construction help for realtors — inspection response, listing prep, pre-offer property reads, negotiation strategy, and tiered monthly support for solo agents, teams, and brokerages.',
};

export default function RealtorsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <SiteNav variant="solid" />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#08111d] pt-32 pb-20 sm:pt-36 sm:pb-24">
        <div className="absolute inset-0 motion-safe:animate-[heroFloat_22s_ease-in-out_infinite] bg-[linear-gradient(125deg,#163061_0%,#10254c_50%,#143367_100%)]" style={{ backgroundSize: '180% 180%' }} aria-hidden="true" />
        <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(circle_at_30%_35%,rgba(245,130,32,0.22),transparent_55%)]" />
        <div className="relative container-pro">
          <div className="max-w-4xl">
            <p className="inline-flex rounded-full border border-orange/30 bg-orange/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-orange">For Realtors</p>
            <h1 className="mt-6 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Construction-side answers your clients are already asking — delivered in 4 hours to 1 business day.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
              Inspection issues, pre-listing prep, buyer-side reads, valuation, and negotiation strategy — all powered by a licensed NC GC who actually builds, not a chat-bot answering generic repair questions. One-off when you need it, monthly when the same questions keep coming up.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#stages" className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-orange px-7 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-8px_rgba(245,130,32,0.5)] transition hover:bg-orange-500">
                Browse Realtor Services
              </a>
              <a href="#pricing" className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                See Monthly Plans
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STAGES */}
      <section id="stages" className="bg-stone-50 py-16 sm:py-20">
        <div className="container-pro space-y-8">
          {realtorStages.map((stage) => (
            <StageSection key={stage.id} {...stage} />
          ))}
        </div>
      </section>

      {/* TRANSACTION PACKAGES — bundle comparison chart */}
      <section id="packages" className="bg-[#08111d] py-14 sm:py-18">
        <div className="container-pro">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#f58220]">Transaction packages</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">Realtor Bundle Pricing</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-white sm:text-lg">
              Buy the construction-side coverage your transaction needs in one fixed price — saves vs à la carte and removes per-step purchase decisions.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-[24px] border border-white/15 bg-[linear-gradient(135deg,#071b3d_0%,#0b2146_50%,#081730_100%)] shadow-[0_18px_40px_rgba(4,15,34,0.32)]">
            <div className="grid grid-cols-[1.15fr_1fr_1fr_1fr] border-b border-white/10">
              <div className="px-4 py-4 sm:px-5" />
              {transactionPackages.map((pkg) => (
                <div key={pkg.title} className={`px-3 py-4 text-center sm:px-5 ${pkg.highlighted ? 'border-x border-[#f58220]/40 bg-[#f58220]/[0.08]' : ''}`}>
                  {pkg.badge ? (
                    <span className="mb-2 inline-flex rounded-full bg-[#f58220] px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">{pkg.badge}</span>
                  ) : null}
                  <p className="mx-auto inline-flex rounded-full border border-[#f58220]/30 bg-[#0b1f44] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#f58220]">{pkg.label}</p>
                  <h3 className="mt-2 text-base font-extrabold tracking-tight text-white sm:text-lg">{pkg.title}</h3>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-[1.15fr_1fr_1fr_1fr] border-b border-white/10">
              <div className="px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white/85 sm:px-5">Pricing</div>
              {transactionPackages.map((pkg) => (
                <div key={`${pkg.title}-price`} className={`px-3 py-3 text-center text-sm font-bold text-[#f58220] sm:px-5 ${pkg.highlighted ? 'border-x border-[#f58220]/40 bg-[#f58220]/[0.06]' : ''}`}>
                  {pkg.price}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-[1.15fr_1fr_1fr_1fr] border-b border-white/10">
              <div className="px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white/85 sm:px-5">Value note</div>
              {transactionPackages.map((pkg) => (
                <div key={`${pkg.title}-saves`} className={`px-3 py-3 text-center text-[12px] text-white/70 sm:px-5 ${pkg.highlighted ? 'border-x border-[#f58220]/40 bg-[#f58220]/[0.06]' : ''}`}>
                  {pkg.saves}
                </div>
              ))}
            </div>

            {transactionPackageRows.map((row) => (
              <div key={row} className="grid grid-cols-[1.15fr_1fr_1fr_1fr] border-b border-white/10 last:border-b-0">
                <div className="px-4 py-2.5 text-sm font-semibold text-white sm:px-5">{row}</div>
                {transactionPackages.map((pkg) => {
                  const included = pkg.includes.includes(row);
                  return (
                    <div key={`${pkg.title}-${row}`} className={`flex items-center justify-center px-3 py-2.5 sm:px-5 ${pkg.highlighted ? 'border-x border-[#f58220]/40 bg-[#f58220]/[0.06]' : ''}`}>
                      <span className={`text-base font-bold ${included ? 'text-[#f58220]' : 'text-white/25'}`}>{included ? '✔' : '—'}</span>
                    </div>
                  );
                })}
              </div>
            ))}

            <div className="grid grid-cols-[1.15fr_1fr_1fr_1fr]">
              <div className="px-4 py-4 sm:px-5" />
              {transactionPackages.map((pkg) => (
                <div key={`${pkg.title}-cta`} className={`px-3 py-4 sm:px-5 ${pkg.highlighted ? 'border-x border-[#f58220]/40 bg-[#f58220]/[0.08]' : ''}`}>
                  <Link
                    href={pkg.href}
                    className={`inline-flex min-h-[46px] w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-bold uppercase tracking-[0.06em] transition hover:-translate-y-0.5 ${pkg.highlighted ? 'bg-[#f58220] text-white shadow-[0_10px_24px_-8px_rgba(245,130,32,0.5)] hover:bg-[#ff9229]' : 'border border-white/25 text-white hover:bg-white/5'}`}
                  >
                    View Package
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING TIERS */}
      <section id="pricing" className="bg-[#08111d] py-14 sm:py-18">
        <div className="container-pro">
          <div className="max-w-3xl">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#f58220]">Monthly support tiers</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">Realtor Subscription Plans</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/82 sm:text-lg">
              When the same construction questions keep coming up across your active deals, a monthly plan gives you defined response capacity at predictable cost — sized to whether you are a solo agent, a team, or a full brokerage.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {supportTiers.map((tier) => (
              <div key={tier.title} className={`rounded-3xl border p-7 sm:p-8 ${tier.highlighted ? 'border-[#f58220]/60 bg-gradient-to-br from-[#0e1c30] via-[#142840] to-[#0e1c30] shadow-[0_30px_60px_-20px_rgba(245,130,32,0.25)]' : 'border-white/10 bg-white/[0.03]'}`}>
                {tier.badge ? (
                  <p className="inline-flex rounded-full bg-[#f58220] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">{tier.badge}</p>
                ) : null}
                <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#f58220]">{tier.label}</p>
                <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-white">{tier.title}</h3>
                <p className="mt-3 text-3xl font-black tracking-[-0.02em] text-white">{tier.price}</p>
                <ul className="mt-6 space-y-2.5 text-[14px] leading-relaxed text-white/85">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f58220]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href={tier.href} className={`mt-7 inline-flex min-h-[48px] w-full items-center justify-center rounded-full px-5 py-3 text-sm font-bold uppercase tracking-wider transition ${tier.highlighted ? 'bg-[#f58220] text-white hover:bg-[#ff9229] shadow-[0_10px_24px_-8px_rgba(245,130,32,0.5)]' : 'border border-white/25 text-white hover:bg-white/5'}`}>
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREE GC-CERTIFIED CHECKLISTS (lead magnets) */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-pro max-w-5xl">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#f58220]">
              <span className="w-6 h-px bg-[#f58220]/50" />
              Free GC-Certified Resources
              <span className="w-6 h-px bg-[#f58220]/50" />
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#08111d]">
              Free checklists — built by a licensed NC GC
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-stone-600 leading-relaxed">
              Two single-document references your sellers and buyers can use directly.
              GC-certified, no fluff, instantly downloadable. We just need your contact info to send the file.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Link
              href="/resources#gc-certified-pre-listing-checklist"
              className="group rounded-2xl border border-stone-200 bg-stone-50 p-6 transition-all hover:border-[#f58220]/50 hover:bg-white hover:shadow-elev-1"
            >
              <span className="inline-flex rounded-full bg-[#f58220]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f58220]">
                For Sellers
              </span>
              <h3 className="mt-4 text-xl font-extrabold tracking-tight text-[#08111d]">
                Pre-Listing Construction Checklist
              </h3>
              <p className="mt-3 text-[14px] text-stone-600 leading-relaxed">
                What sellers should fix, disclose, or leave alone before listing — with prep-spend
                budget ranges by price tier. Use this before the listing goes live.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em] text-[#f58220] group-hover:gap-3 transition-all">
                Get the Checklist <span aria-hidden="true">→</span>
              </span>
            </Link>
            <Link
              href="/resources#gc-certified-pre-offer-checklist"
              className="group rounded-2xl border border-stone-200 bg-stone-50 p-6 transition-all hover:border-[#f58220]/50 hover:bg-white hover:shadow-elev-1"
            >
              <span className="inline-flex rounded-full bg-[#f58220]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f58220]">
                For Buyers
              </span>
              <h3 className="mt-4 text-xl font-extrabold tracking-tight text-[#08111d]">
                Pre-Offer Construction Checklist
              </h3>
              <p className="mt-3 text-[14px] text-stone-600 leading-relaxed">
                What buyers should look for at the showing — age-based red flags by system,
                replacement-cost ranges, and walk-away triggers. Use this BEFORE writing the offer.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em] text-[#f58220] group-hover:gap-3 transition-all">
                Get the Checklist <span aria-hidden="true">→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* INQUIRY FORM */}
      <section className="bg-stone-50 py-16 sm:py-20">
        <div className="container-pro max-w-4xl">
          <LpLeadForm
            id="realtor-inquiry"
            serviceSlug="realtors-hub-inquiry"
            serviceName="Realtor hub — general inquiry"
            source="hub-realtors"
            headline="Not sure which realtor service fits?"
            subhead="Tell us about the deal or listing — property address, what stage it is in, what you are trying to figure out — and a licensed NC GC will point you to the right path. Response within 1 business day."
            submitLabel="Get a Recommendation"
            variant="dark"
          />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function StageSection({ id, stage, title, label, cta, products, compact }: Stage) {
  const itemWidthClass = compact
    ? 'w-full md:w-[calc(50%-0.625rem)] xl:w-[calc(33.333%-0.834rem)]'
    : 'w-full md:w-[calc(50%-0.625rem)] xl:w-[calc(33.333%-0.834rem)]';

  return (
    <section id={id} className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-elev-1 sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="inline-flex rounded-full border border-orange/20 bg-orange/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-orange">{title}</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{stage}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-stone-700 sm:text-lg">{label}</p>
        </div>
        <a href="#pricing" className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-stone-100 px-5 py-3 text-sm font-semibold text-navy transition hover:bg-stone-200">
          {cta}
        </a>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-5">
        {products.map((product) => (
          <div key={product.name} className={itemWidthClass}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex h-full flex-col rounded-[24px] border border-stone-200 bg-white p-5 shadow-elev-1">
      <div>
        <h3 className="text-xl font-extrabold tracking-tight text-navy">{product.name}</h3>
        {product.price ? <p className="mt-2 text-sm font-bold text-orange">{product.price}</p> : null}
        <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{product.description}</p>
        {product.covers?.length ? (
          <div className="mt-4 space-y-2">
            {product.covers.map((item) => (
              <div key={item} className="rounded-2xl bg-stone-50 px-3 py-2 text-sm font-semibold text-navy-900">
                {item}
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="mt-auto pt-6">
        <Link href={product.href} className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange">
          {product.primaryCta}
        </Link>
      </div>
    </div>
  );
}


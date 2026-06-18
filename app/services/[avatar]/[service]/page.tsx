import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import AddToCartButton from '@/components/AddToCartButton';
import LpLeadForm from '@/components/LpLeadForm';
import { avatarPages, getServiceBySlug, type ServiceCardData } from '@/lib/services-data';

type Params = { avatar: string; service: string };

/**
 * Map a service-detail avatar slug to the consultation/booking destination
 * that matches the user's intent. Homeowner intent stays in the homeowner
 * funnel; wholesaler intent routes to the Deal Pack offer; everyone else
 * lands on /book (the role-router) since no single-purpose investor /
 * realtor consultation page exists today.
 */
function consultationHrefForAvatar(avatar: string): string {
  switch (avatar) {
    case 'homeowners':
      return '/services/homeowners/owner-consultation';
    case 'wholesalers':
      return '/deal-pack';
    case 'investors':
    case 'realtors':
    case 'contractors':
    case 'developers-landowners':
    case 'industry-partners':
    default:
      return '/start';
  }
}

// Per-service decision-page overrides for the 5 fixed-price reviews +
// the 2 realtor inspection products. Optional — services without
// overrides render from ServiceCardData directly.
type DecisionPageOverride = {
  headline?: string;
  subheadline?: string;
  whenToUse?: string[];
  whatThisDoes?: string[];
  deliverable?: { heading: string; items: string[] }[];
  testimonial?: { quote: string; name: string; role?: string };
  addOnBundle?: {
    eyebrow: string;
    heading: string;
    description: string;
    bullets?: string[];
    bundleProductKey: string;
    bundleLabel: string;
    bundlePriceLabel: string;
    savingsBadge?: string;
  };
};

const DECISION_PAGE_OVERRIDES: Record<string, DecisionPageOverride> = {
  'investors:investor-review': {
    headline: 'A construction-side opinion before you close',
    subheadline: 'Rough budget range, scope feasibility, risk callouts, and a walk-away trigger — for investors underwriting a deal they do not own yet. Decision-grade, not bid-grade.',
    whenToUse: ['Before earnest money goes hard', 'When you are weighing multiple deals', 'When your spreadsheet needs a real construction number', 'Before submitting an offer'],
    whatThisDoes: ['Reads your scope and flags what is realistic', 'Gives you a rough budget range with confidence levels', 'Calls out the construction-side risks worth knowing before close', 'Names the trigger that should make you walk'],
    deliverable: [
      { heading: 'Scope summary', items: ['What you are really buying based on photos + your stated plan', 'Implicit assumptions surfaced (additions? layout changes?)'] },
      { heading: 'Construction risk callouts', items: ['Slab cracking visible in photo 4 — $15K+ if structural', 'Permit jurisdiction is 6–8 weeks here, not 3–4', 'Roof age + slope suggests full replacement, not patch'] },
      { heading: 'Budget range with confidence', items: ['Likely $95K–$135K for the scope as described', 'High confidence on kitchen + baths; low on structural', 'Add 12% soft costs (permits, carry, contingency)'] },
      { heading: 'Timeline range', items: ['14–18 weeks from permit pull, not 8–10', 'Local queue + Q3 start = 4-month minimum'] },
      { heading: 'Walk-away trigger', items: ['"Walk if seller will not drop $20K — OR if slab cannot be verified before EMD goes hard."'] },
    ],
    testimonial: { quote: 'We were about to sink more money in before they walked us through what was actually wrong. Saved us from a bad call.', name: 'Madison M.', role: 'Broker / Investor' },
  },
  'investors:budget-review': {
    headline: 'Line-item audit of a budget you already have',
    subheadline: 'Pressure-test your numbers against current market costs — pre-purchase (validating an investor pro-forma) or post-purchase (before contractors price it or the lender locks in the draw). You bring a budget; we audit it.',
    whenToUse: ['Pre-purchase — validating an investor pro-forma or seller-supplied numbers', 'Post-purchase — before contractor bids come in or the lender finalizes the draw schedule', 'When you have a contractor bid in hand and want a second opinion', 'When your budget feels too clean to be true'],
    whatThisDoes: ['Audits your existing budget line by line against current market rates', 'Finds the scope items missing entirely', 'Corrects unit costs that are unrealistic', 'Surfaces buried assumptions that will break in execution'],
    deliverable: [
      { heading: 'Scope gaps found', items: ['HVAC line missing — add ~$8K', 'Demo + dump fees not included', 'Permit fees absent — $1.4K'] },
      { heading: 'Line-item corrections', items: ['Plumbing: 18% below market — correct to ~$18K', 'Tile allowance light by $4–6K', 'Trim package: assumes builder-grade, your scope calls for upgraded'] },
      { heading: 'Risk-weighted reserves', items: ['Recommended contingency: 12% for this scope size', 'Hidden-condition reserve: add 8% based on photos'] },
      { heading: 'Bid-grade summary', items: ['Corrected budget total: $86K (was $74K)', 'Take this to underwriting, contractors, or your lender'] },
    ],
    testimonial: { quote: 'They caught things we completely missed before we moved forward.', name: 'Justin R.', role: 'Developer' },
  },
  'investors:contractor-grade-budget': {
    headline: 'A pre-construction budget — built, not audited',
    subheadline: 'You own the property (or are committed to closing). You have plans or a clear scope, but no real budget yet. We build it from scratch — full takeoffs, real trade-network unit costs, documented assumptions, bid-ready spreadsheet. The number you would otherwise pay a GC to put together.',
    whenToUse: ['You own (or are closing on) the property and need real numbers', 'You have plans or a clear scope but no real budget yet', 'Before contractor bids come in or the lender finalizes the draw', 'When you would otherwise pay a GC retainer just to get the budget'],
    whatThisDoes: ['Reads your plans, photos, and scope', 'Builds full takeoffs (count, sqft, lf) for each major trade', 'Prices each line at current trade-network unit costs', 'Documents assumptions per major line', 'Delivers a bid-ready spreadsheet you can hand to contractors'],
    deliverable: [
      { heading: 'Takeoff sample (kitchen)', items: ['Cabinetry: 22 lf base + 18 lf upper', 'Counter: 38 sqft quartz, level 2', 'Floor: 184 sqft LVP'] },
      { heading: 'Line-item budget', items: ['Demo + dump: $4,200', 'Rough plumbing + fixtures: $18,400', 'Electrical (incl. 200A upgrade): $11,800', 'Drywall + paint (3 rooms): $9,600'] },
      { heading: 'Documented assumptions', items: ['Builder-grade tile unless plans say otherwise', 'No structural changes — quote pulled if walls move', 'Permits assumed standard residential — re-quote if commercial-grade'] },
      { heading: 'Soft costs + reserves', items: ['Contingency: 12% (residential rehab)', 'Soft costs: permits + carrying = 6%', 'Bid-ready total: $94,800'] },
    ],
    testimonial: { quote: "We didn't have to wait on a GC to build the budget. We took the spreadsheet straight to lender and bids.", name: 'Trisha W.', role: 'Investor' },
  },
  'investors:permit-local-compliance-review': {
    headline: 'Know if your project can get approved',
    subheadline: 'Understand permit requirements and risks before you move forward.',
    whenToUse: ['Before buying', 'Before planning', 'When unsure about permits'],
    whatThisDoes: ['Identifies permit requirements', 'Flags approval risks', 'Assesses local workability'],
    deliverable: [
      { heading: 'Permit requirements', items: ['Mecklenburg County: 4 permits required', 'Stormwater review: triggered by lot size'] },
      { heading: 'Approval risk points', items: ['Setback variance needed — 60% approval rate', 'Tree ordinance affects rear yard'] },
      { heading: 'Recommendation', items: ['Pre-app meeting before submission', 'Budget 5–7 weeks for full approval'] },
    ],
    testimonial: { quote: 'Permits and paperwork were eating up my week. They took it off my plate and the jobs stopped stalling.', name: 'Taquan P.', role: 'Wholesaler' },
  },
  'investors:contractor-fit-consultation': {
    headline: 'Know what kinds of contractors this project actually needs',
    subheadline: 'Which contractors fit, and why — before hiring conversations start.',
    whenToUse: ['Before any hiring conversations', 'When unsure if you need a GC, subs, or handyman', 'When the contractor mix is unclear', 'Before bidding starts'],
    whatThisDoes: ['Determines the contractor mix this project needs', 'Explains WHY each contractor type fits', 'Flags wrong-fit setups to avoid', 'Gives hiring direction for each role'],
    deliverable: [
      { heading: 'Recommended contractor mix', items: ['Licensed NC GC with permit-admin capability', 'Specialty subs needed: framing + HVAC', 'Generalist sub OK for: paint, flooring'] },
      { heading: 'Why this mix', items: ['Permit complexity rules out unlicensed work', 'Scope size justifies GC overhead', 'Two specialty trades > generalist range'] },
      { heading: 'Contractors to avoid', items: ['Out-of-area generalist (no permit familiarity)', 'Handyman crew (will not pass inspection)'] },
    ],
    testimonial: { quote: 'They did not try to sell us a huge scope we did not need. Just told us what to do next and why.', name: 'Trisha W.', role: 'Investor' },
    addOnBundle: {
      eyebrow: 'Bundle and save',
      heading: 'Pair with Contractor Match & Bid Coordination — save $300',
      description: 'Once we tell you what kinds of contractors you need, the obvious next move is to actually go find them and run the bids. Bundle the Fit Consultation ($349) with Contractor Match & Bid Coordination (normally $1,499) for $1,548 total — $300 off.',
      bullets: [
        'Contractor Fit Consultation — we tell you what contractor mix this project actually needs',
        'Contractor Match & Bid Coordination — we go source, bid, and level vetted candidates for you',
        '$300 off vs buying them separately',
        'Both kicked off in the same intake — no second form to fill out',
      ],
      bundleProductKey: 'fit-plus-match-bundle',
      bundleLabel: 'Add Bundle — $1,548 (save $300)',
      bundlePriceLabel: '$1,548 bundle · normally $1,848',
      savingsBadge: 'Save $300',
    },
  },
  'investors:bid-coordination-contractor-match': {
    headline: 'Vetted contractor sourcing + leveled bids',
    subheadline: 'We source contractors that fit your scope, collect bids on the same intake, level them side-by-side, and present the cleanest comparison — so the award decision is easy.',
    whenToUse: ['When chasing your own bids is eating weeks', 'When the bids you have look incomparable', 'When you need vetted candidates, not random Google results', 'Right after Contractor Fit Consultation tells you what kinds you need'],
    whatThisDoes: ['Targets vetted candidates that fit your scope', 'Runs a structured bid intake (same line items)', 'Levels the bids side-by-side so you can compare apples to apples', 'Calls out gaps and risks per bid', 'Recommends who to award'],
    deliverable: [
      { heading: 'Targeted candidates', items: ['3 GC candidates sized for your scope', '2 specialty subs (framing + HVAC)', 'All license-verified, insurance-confirmed'] },
      { heading: 'Leveled bid comparison', items: ['Same line items across all bids', 'Unit-cost variances flagged', 'Material vs labor splits exposed'] },
      { heading: 'Gap and risk notes', items: ['Bid 1 missing permit fees', 'Bid 2 assumes scope change you did not authorize', 'Bid 3 strongest on scope, mid on price'] },
      { heading: 'Award recommendation', items: ['Award Bid 3 (best scope coverage, mid-price)', 'Hold Bid 1 as backup', 'Reject Bid 2 — assumption mismatch'] },
    ],
    testimonial: { quote: 'I would have spent three weeks chasing my own bids. They had it leveled in ten days.', name: 'Madison M.', role: 'Broker / Investor' },
  },
  'investors:draw-review-support': {
    headline: 'Review the draw before the money goes out',
    subheadline: 'Make sure payment matches actual work before releasing funds.',
    whenToUse: ['Before submitting a draw', 'When unsure about progress vs payment'],
    whatThisDoes: ['Matches work to payment', 'Flags overbilling', 'Identifies missing work'],
    deliverable: [
      { heading: 'Progress vs payment', items: ['Rough-in: 60% complete, draw shows 80%', 'Drywall: not started, included in draw'] },
      { heading: 'Documentation gaps', items: ['No photos for electrical rough-in', 'Inspection sign-off missing'] },
      { heading: 'Recommendation', items: ['Hold $9.2K from this draw', 'Request photos + inspection before release'] },
    ],
    testimonial: { quote: 'We were about to sink more money in before they walked us through what was actually wrong. Saved us from a bad call.', name: 'Madison M.', role: 'Broker / Investor' },
  },
  'realtors:realtor-inspection-review': {
    headline: 'Handle inspection issues before they kill the deal',
    subheadline: 'Get clear direction on what matters and what does not.',
    whenToUse: ['When inspection items are causing confusion', 'Before clients overreact', 'When you need a cleaner repair read fast'],
    whatThisDoes: ['Clarifies what matters', 'Flags likely repair concerns', 'Helps explain the next move'],
  },
  'realtors:inspection-response': {
    headline: 'Get a clear plan for inspection repairs',
    subheadline: 'Know exactly what to fix and how to move forward.',
    whenToUse: ['When the repair list is slowing the deal', 'When buyers or sellers need direction', 'When you need a practical next step fast'],
    whatThisDoes: ['Breaks down repair priorities', 'Clarifies likely scope', 'Makes the next move easier'],
  },
};

// Map of avatar slug → human label + audience-context CTAs
const AVATAR_META: Record<string, { label: string; nextStep: string; backToCatalog: string }> = {
  homeowners: { label: 'For Homeowners', nextStep: 'Get Started', backToCatalog: '/services/homeowners' },
  investors: { label: 'For Investors', nextStep: 'Talk Through Your Project', backToCatalog: '/services/investors' },
  contractors: { label: 'For Contractors', nextStep: 'Talk Through Your Project', backToCatalog: '/services/contractors' },
  realtors: { label: 'For Realtors', nextStep: 'Talk Through Your Listing', backToCatalog: '/services/realtors' },
  'developers-landowners': { label: 'For Developers / Landowners', nextStep: 'Talk Through Your Project', backToCatalog: '/services/developers-landowners' },
  'industry-partners': { label: 'For Industry Partners', nextStep: 'Talk Through Your Project', backToCatalog: '/services/industry-partners' },
};

function CheckIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function getDefaultDeliverable(service: ServiceCardData): { heading: string; items: string[] }[] {
  // Auto-build a 3-section sample deliverable from the existing
  // ServiceCardData fields when no override is provided.
  return [
    { heading: 'What you receive', items: service.included?.slice(0, 4) || service.details.slice(0, 4) },
    { heading: 'Project focus', items: service.details.slice(0, 4) },
    { heading: 'Outcome', items: [service.outcome] },
  ];
}

function DeliverablePreview({ service, override }: { service: ServiceCardData; override?: DecisionPageOverride['deliverable'] }) {
  const sections = override || getDefaultDeliverable(service);
  return (
    <div className="relative">
      <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[8px] bg-white/10 blur-sm" aria-hidden="true" />
      <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[8px] bg-white/15" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-[8px] border border-white/20 bg-gradient-to-br from-white to-stone-50 p-7 text-[#0c1627] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] sm:p-8">
        <div className="flex items-start justify-between border-b border-stone-200 pb-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#fa8c41]">Southern Cities Construction</p>
            <h3 className="mt-1.5 text-lg font-extrabold tracking-tight text-[#08111d]">{service.title}</h3>
            <p className="mt-0.5 text-xs text-stone-500">Sample deliverable · For illustration</p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">Sample</span>
            <span className="text-[10px] text-stone-400">Page 1 of 3</span>
          </div>
        </div>
        <div className="mt-5 space-y-5">
          {sections.map((section, idx) => (
            <div key={section.heading}>
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#fa8c41] text-[10px] font-black text-white">{idx + 1}</span>
                <h4 className="text-[13px] font-extrabold uppercase tracking-wider text-[#08111d]">{section.heading}</h4>
              </div>
              <ul className="mt-2.5 space-y-1.5 pl-7">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13px] leading-relaxed text-stone-700">
                    <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-[#fa8c41]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-stone-200 pt-4 text-[10px] text-stone-400">
          <span>Licensed NC General Contractor</span>
          <span>scconstruction.com</span>
        </div>
      </div>
    </div>
  );
}

function PrimaryCta({
  service,
  className = '',
  variant = 'solid',
}: {
  service: ServiceCardData;
  className?: string;
  variant?: 'solid' | 'inverse';
}) {
  const isFixed = service.purchaseType === 'fixed' && !!service.itemKey;
  const base =
    variant === 'inverse'
      ? `inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-black uppercase tracking-[0.06em] text-[#08111d] transition-all hover:-translate-y-0.5 hover:bg-stone-100 ${className}`
      : `inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-[#fa8c41] px-7 py-3.5 text-sm font-black uppercase tracking-[0.06em] text-white shadow-[0_14px_30px_-6px_rgba(245,130,32,0.45)] transition-all hover:-translate-y-0.5 hover:bg-[#ffa463] ${className}`;
  const label = isFixed ? `Add to Cart · ${service.monthlyPrice || ''}`.trim() : service.cta;
  if (isFixed && service.itemKey) {
    return <AddToCartButton itemKey={service.itemKey} label={label} className={base} />;
  }
  return (
    <Link href={service.ctaHref || service.detailHref} className={base}>
      <span>{service.cta}</span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}

export function generateStaticParams() {
  return avatarPages.flatMap((avatar) => {
    const services = [...(avatar.fixed || []), ...(avatar.priced || []), ...(avatar.review || []), ...(avatar.recurring || [])];
    return services.map((service) => ({ avatar: avatar.slug, service: service.slug }));
  });
}

export function generateMetadata({ params }: { params: Params }) {
  const service = getServiceBySlug(params.avatar, params.service);
  const avatar = avatarPages.find((page) => page.slug === params.avatar);
  if (!service || !avatar) return { title: 'Service not found | Southern Cities Construction' };
  const path = `/services/${params.avatar}/${params.service}`;
  const title = `${service.title} — ${avatar.shortLabel} | Southern Cities Construction`;
  return {
    title,
    description: service.summary,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: path,
      title: `${service.title} — ${avatar.shortLabel}`,
      description: service.summary,
      siteName: 'Southern Cities Construction',
    },
  };
}

export default function ServiceDetailPage({ params }: { params: Params }) {
  const service = getServiceBySlug(params.avatar, params.service);
  const avatar = avatarPages.find((page) => page.slug === params.avatar);
  if (!service || !avatar) notFound();

  const override = DECISION_PAGE_OVERRIDES[`${params.avatar}:${params.service}`];
  const meta = AVATAR_META[params.avatar] || { label: avatar.shortLabel, nextStep: 'Get Started', backToCatalog: `/services/${params.avatar}` };

  const headline = override?.headline || service.title;
  const subheadline = override?.subheadline || service.summary;
  const whenToUse = override?.whenToUse || [service.fit, ...service.details.slice(0, 2)];
  const whatThisDoes = override?.whatThisDoes || service.details;
  const testimonial = override?.testimonial;

  const isFixed = service.purchaseType === 'fixed' && !!service.itemKey;
  const isRecurring = service.purchaseType === 'recurring';
  const priceLabel = service.monthlyPrice || (isFixed ? '$ Fixed' : 'Project-specific pricing');
  const priceSub = isRecurring ? 'recurring' : isFixed ? 'one-time' : 'after review';

  return (
    <>
      <style>{__motionStyles}</style>
      <div className="min-h-screen bg-white text-[#0c1627]">
        <SiteNav variant="solid" />

        {/* HERO */}
        <section className="relative overflow-hidden bg-[#08111d] pt-24 sm:pt-28">
          <div className="absolute inset-0 motion-safe:animate-[heroFloat_22s_ease-in-out_infinite] bg-[linear-gradient(125deg,#163061_0%,#10254c_50%,#143367_100%)]" style={{ backgroundSize: '180% 180%' }} aria-hidden="true" />
          <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(circle_at_30%_35%,rgba(245,130,32,0.22),transparent_55%)]" />
          <div className="absolute left-[-10%] top-[10%] h-72 w-72 rounded-full bg-[rgba(245,130,32,0.12)] blur-3xl" />
          <div className="absolute bottom-[-6rem] right-[5%] h-80 w-80 rounded-full bg-[rgba(255,255,255,0.06)] blur-3xl" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
              maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-14 sm:px-8 sm:pb-24 sm:pt-16 lg:grid lg:grid-cols-12 lg:gap-12 lg:pt-20">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41] motion-safe:animate-[heroRise_900ms_ease-out]">
                <Link href={meta.backToCatalog} className="text-white/55 hover:text-white">{meta.label}</Link>
                <span className="text-white/30">/</span>
                <span>{service.title}</span>
              </div>
              <h1
                className="mt-6 text-[2.5rem] font-black leading-[1.0] tracking-[-0.045em] text-white sm:text-[3.5rem] lg:text-[4.25rem] motion-safe:animate-[heroRise_1000ms_ease-out_0.1s_both]"
              >
                {headline}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-[1.6] text-white/85 sm:text-xl motion-safe:animate-[heroRise_1100ms_ease-out_0.2s_both]">
                {subheadline}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-white/85 motion-safe:animate-[heroRise_1200ms_ease-out_0.3s_both]">
                {service.turnaround ? (
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300"><CheckIcon size={14} /></span>
                    <span>{service.turnaround}</span>
                  </div>
                ) : null}
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300"><CheckIcon size={14} /></span>
                  <span>Licensed NC GC</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300"><CheckIcon size={14} /></span>
                  <span>{isFixed ? 'Buy now' : isRecurring ? 'Capped monthly' : 'Scoped after review'}</span>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4 motion-safe:animate-[heroRise_1300ms_ease-out_0.4s_both]">
                <PrimaryCta service={service} />
                <Link href={consultationHrefForAvatar(params.avatar)} className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/5">
                  {meta.nextStep}
                </Link>
              </div>
            </div>

            <div className="mt-14 lg:col-span-5 lg:mt-0 lg:flex lg:items-center motion-safe:animate-[heroRise_1400ms_ease-out_0.5s_both]">
              <DeliverablePreview service={service} override={override?.deliverable} />
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="border-y border-stone-200 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4 sm:px-8">
            <div className="text-center">
              <p className="text-3xl font-black tracking-[-0.03em] text-[#08111d] sm:text-4xl">120+</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-stone-500">Investors served</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black tracking-[-0.03em] text-[#08111d] sm:text-4xl">4.9★</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-stone-500">Avg client rating</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black tracking-[-0.03em] text-[#08111d] sm:text-4xl">2-day</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-stone-500">Avg turnaround</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black tracking-[-0.03em] text-[#08111d] sm:text-4xl">NC GC</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-stone-500">Licensed in NC</p>
            </div>
          </div>
        </section>

        {/* WHEN + WHAT THIS DOES */}
        <section className="bg-stone-50">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">When to use this</p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#08111d] sm:text-4xl">{service.pain || 'Use this when…'}</h2>
                <p className="mt-5 text-lg leading-relaxed text-stone-600">{service.outcome}</p>
                <ul className="mt-7 space-y-3">
                  {whenToUse.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#08111d]">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[#fa8c41]"><CheckIcon size={14} /></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">What this does</p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#08111d] sm:text-4xl">{service.title}</h2>
                <div className="mt-7 grid gap-3">
                  {whatThisDoes.map((item, idx) => (
                    <div key={item + idx} className="flex items-start gap-4 rounded-2xl border border-stone-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-[#fa8c41] text-white"><CheckIcon size={18} /></span>
                      <p className="text-[15px] font-medium leading-relaxed text-[#08111d]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INCLUDED + NOT INCLUDED */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border-2 border-emerald-100 bg-emerald-50/40 p-8">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-700">What&rsquo;s included</p>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-[#08111d]">Exactly what you get.</h2>
                <ul className="mt-6 space-y-3">
                  {(service.included || service.details).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#08111d]">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white"><CheckIcon size={14} /></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border-2 border-stone-200 bg-stone-50 p-8">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-stone-500">What this is not</p>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-[#08111d]">So you know exactly what you&rsquo;re buying.</h2>
                <ul className="mt-6 space-y-3">
                  {(service.notIncluded || ['Not a guarantee', 'Not project management', 'Not unlimited support']).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-stone-700">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-300 text-stone-600"><XIcon size={12} /></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="bg-stone-50">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="max-w-3xl">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">The Process</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#08111d] sm:text-5xl">How it works</h2>
              <p className="mt-5 text-lg leading-relaxed text-stone-600">
                {service.turnaround ? `Three steps. ${service.turnaround} from submission to direction.` : 'A simple three-step process from submission to direction.'}
              </p>
            </div>

            <div className="relative mt-14 grid gap-8 md:grid-cols-3">
              <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-[#fa8c41]/30 to-transparent md:block" aria-hidden="true" />
              {[
                { title: 'Submit your project', detail: 'Share the address, photos, scope notes, and anything else relevant. Submission takes a few minutes.' },
                { title: 'We review it', detail: 'A licensed NC GC reads the project, runs the numbers, and writes the direction in plain language.' },
                { title: 'You get clarity', detail: service.turnaround ? `Written guidance in your inbox within ${service.turnaround.toLowerCase().includes('day') ? service.turnaround : '2 business days'}.` : 'Written guidance in your inbox with a clear recommendation on what to do next.' },
              ].map((step, idx) => (
                <div key={step.title} className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#08111d] text-xl font-black shadow-lg ring-8 ring-stone-50">
                    <span className="text-[#fa8c41]">{idx + 1}</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-[#08111d]">{step.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-stone-600">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHO IT'S FOR + TRUST */}
        <section className="relative overflow-hidden bg-[#08111d] text-white">
          <div className="absolute inset-0 motion-safe:animate-[heroFloat_22s_ease-in-out_infinite] bg-[linear-gradient(125deg,#163061_0%,#10254c_50%,#143367_100%)]" style={{ backgroundSize: '180% 180%' }} aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">Best fit for</p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">{service.fit || meta.label}</h2>
                {service.why ? (
                  <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                    <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">Why this fits</p>
                    <p className="mt-3 text-[15px] leading-relaxed text-white/85">{service.why}</p>
                  </div>
                ) : null}
              </div>

              {testimonial ? (
                <blockquote className="rounded-2xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-sm">
                  <div className="flex items-center gap-1 text-[#fa8c41]">
                    {[1, 2, 3, 4, 5].map((i) => (<StarIcon key={i} />))}
                  </div>
                  <p className="mt-5 text-lg font-medium leading-[1.55] text-white/90">&ldquo;{testimonial.quote}&rdquo;</p>
                  <footer className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-[#fa8c41] text-base font-black text-white">{testimonial.name.charAt(0)}</div>
                    <div>
                      <p className="font-extrabold text-white">{testimonial.name}</p>
                      {testimonial.role ? <p className="text-[13px] text-white/60">{testimonial.role}</p> : null}
                    </div>
                  </footer>
                </blockquote>
              ) : service.proofTitle ? (
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-sm">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">Why it matters</p>
                  <p className="mt-4 text-xl font-bold leading-[1.4] text-white">{service.proofTitle}</p>
                  {service.proofBody ? <p className="mt-3 text-[15px] leading-relaxed text-white/75">{service.proofBody}</p> : null}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* SAMPLE DELIVERABLE — branded example report */}
        {service.sampleDeliverable ? (
          <section className="bg-white border-t border-stone-200">
            <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
              <div className="grid items-center gap-8 sm:grid-cols-[auto_1fr]">
                <a href={service.sampleDeliverable.pdfUrl} target="_blank" rel="noopener noreferrer" className="group relative mx-auto block w-[170px] shrink-0 sm:mx-0">
                  <div className="absolute inset-0 rounded-[12px] bg-orange/20 blur-[40px]" aria-hidden="true" />
                  <Image
                    src={service.sampleDeliverable.coverUrl}
                    alt={`${service.title} — sample report cover`}
                    width={170}
                    height={220}
                    className="relative w-full rounded-[10px] border border-stone-300 shadow-[0_24px_50px_-16px_rgba(8,17,29,0.45)] ring-1 ring-orange/30 transition-transform group-hover:-rotate-2 group-hover:scale-[1.03]"
                  />
                  <div className="absolute -top-2.5 -right-2.5 rounded-full bg-orange px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-white shadow-glow-orange">Sample</div>
                </a>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange">See it before you buy</p>
                  <h2 className="mt-3 text-2xl font-black tracking-[-0.02em] text-navy sm:text-3xl">A real example of the report you receive.</h2>
                  <p className="mt-3 text-[15px] leading-[1.6] text-stone-600">
                    Open an anonymized {service.sampleDeliverable.pages}-page sample of the actual branded {service.title} — real findings, real numbers, exactly what lands in your inbox.
                  </p>
                  <a href={service.sampleDeliverable.pdfUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-orange/50 bg-orange/10 px-7 py-3 text-sm font-black uppercase tracking-[0.08em] text-orange-600 transition hover:bg-orange/20 hover:-translate-y-0.5">
                    Open the sample report (PDF) ↗
                  </a>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* PRICING */}
        <section className="bg-gradient-to-b from-stone-50 to-stone-100">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="overflow-hidden rounded-3xl bg-white shadow-[0_40px_80px_-20px_rgba(8,17,29,0.15)] ring-2 ring-[#fa8c41]/10">
              <div className="grid lg:grid-cols-12">
                <div className="lg:col-span-7 p-10 sm:p-12 lg:p-14">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">Pricing</p>
                  <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#08111d] sm:text-4xl">Ready when you are.</h2>
                  <p className="mt-5 text-lg leading-relaxed text-stone-600">{service.summary}</p>

                  <p className="mt-9 text-[11px] font-black uppercase tracking-[0.22em] text-stone-500">What&rsquo;s included</p>
                  <ul className="mt-4 space-y-3">
                    {(service.included || service.details.slice(0, 5)).map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#08111d]">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><CheckIcon size={14} /></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative overflow-hidden bg-[#08111d] p-10 text-white sm:p-12 lg:col-span-5 flex flex-col justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,130,32,0.18),transparent_60%)]" />
                  <div className="relative">
                    <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">{service.title}</p>
                    <p className="mt-3 text-5xl font-black tracking-[-0.03em] sm:text-6xl">{priceLabel}</p>
                    <p className="mt-2 text-sm text-white/70">{priceSub}{service.turnaround ? ` · ${service.turnaround}` : ''}</p>

                    {service.monthlyLimit ? (
                      <p className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-[13px] leading-relaxed text-white/75">{service.monthlyLimit}</p>
                    ) : null}

                    <div className="mt-8">
                      <PrimaryCta service={service} className="w-full" />
                    </div>
                    <p className="mt-4 text-center text-xs text-white/50">{isFixed ? 'Secure checkout · No subscription' : 'No obligation · Scoped to your project'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BUNDLE CROSS-SELL (only renders if override.addOnBundle is set) */}
        {override?.addOnBundle ? (
          <section className="bg-stone-50">
            <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20">
              <div className="relative overflow-hidden rounded-3xl border-2 border-[#fa8c41]/40 bg-gradient-to-br from-[#0e1c30] via-[#142840] to-[#0e1c30] p-8 sm:p-12 shadow-[0_30px_60px_-20px_rgba(8,17,29,0.4)]">
                <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-[#fa8c41]/15 blur-3xl" aria-hidden="true" />
                <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-center">
                  <div className="lg:col-span-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">{override.addOnBundle.eyebrow}</p>
                      {override.addOnBundle.savingsBadge ? (
                        <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-emerald-300">{override.addOnBundle.savingsBadge}</span>
                      ) : null}
                    </div>
                    <h3 className="mt-4 text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">{override.addOnBundle.heading}</h3>
                    <p className="mt-5 text-lg leading-relaxed text-white/85">{override.addOnBundle.description}</p>
                    {override.addOnBundle.bullets ? (
                      <ul className="mt-7 space-y-3">
                        {override.addOnBundle.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3 text-[15px] leading-relaxed text-white/85">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fa8c41]/20 text-[#fa8c41]"><CheckIcon size={14} /></span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                  <div className="lg:col-span-4 flex flex-col items-stretch gap-4">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-sm">
                      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#fa8c41]">Bundle pricing</p>
                      <p className="mt-3 text-3xl font-black tracking-[-0.03em] text-white">{override.addOnBundle.bundlePriceLabel}</p>
                    </div>
                    <AddToCartButton
                      itemKey={override.addOnBundle.bundleProductKey}
                      label={override.addOnBundle.bundleLabel}
                      mode="checkout"
                      className="inline-flex min-h-[60px] w-full items-center justify-center gap-2 rounded-full bg-[#fa8c41] px-6 py-4 text-[15px] font-black uppercase tracking-wider text-white shadow-lg shadow-[#fa8c41]/30 transition-all hover:bg-[#e3720d] hover:shadow-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* INLINE LEAD FORM — captures visitors who read the detail page but
            aren't ready to buy. Fixed-price products show a light, secondary
            "Questions?" form so the buy CTA stays primary. Review/priced
            products already route to /review/<slug> or /pricing/<slug> for
            their forms — no duplicate form rendered here for those. */}
        {isFixed ? (
          <section className="bg-white">
            <div className="mx-auto max-w-3xl px-6 py-14 sm:px-8 sm:py-16">
              <LpLeadForm
                id="questions-form"
                serviceSlug={service.slug}
                serviceName={service.title}
                servicePrice={service.monthlyPrice}
                source={`detail-${service.slug}-presale`}
                headline="Questions before you buy?"
                subhead="Send them here and a licensed NC GC will respond within 1 business day. Or use the buy button above to start right away."
                submitLabel="Send Questions"
                variant="light"
              />
            </div>
          </section>
        ) : null}

        {/* FINAL CTA */}
        <section className="relative overflow-hidden bg-[#08111d]">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
              maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            }}
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:px-8 sm:py-24">
            <h2 className="text-4xl font-black leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl">
              Not sure yet? <span className="text-[#fa8c41]">Just ask.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              A short call is the fastest way to confirm whether this product fits — or whether something else makes more sense.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <PrimaryCta service={service} />
              <a href="tel:+19804737249" className="inline-flex items-center gap-2 text-sm font-bold text-white/75 hover:text-white">
                Or call (980) 473-7249
              </a>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}

const __motionStyles = `
@keyframes heroFloat {
  0%, 100% { transform: scale(1.04) translate3d(0, 0, 0); }
  50% { transform: scale(1.08) translate3d(-12px, -8px, 0); }
}

@keyframes heroRise {
  0% { opacity: 0; transform: translate3d(0, 24px, 0); filter: blur(4px); }
  60% { filter: blur(0); }
  100% { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); }
}
`;

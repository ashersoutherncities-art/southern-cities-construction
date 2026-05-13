import Link from 'next/link';
import { notFound } from 'next/navigation';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getResourceBySlug } from '@/lib/resources';

type Params = { slug: string };

type LeadMagnetLpConfig = {
  /** Maps to a lead-magnet entry in lib/resources.ts (leadMagnet: true). */
  resourceSlug: string;
  audienceTag: string;
  heroHeadlinePre: string;
  heroHeadlineHighlight: string;
  heroHeadlinePost: string;
  heroSubheadline: string;
  insideBullets: string[];
  bestFor: string;
  credibilityLines: string[];
  submitLabel: string;
};

const LEAD_MAGNET_LPS: LeadMagnetLpConfig[] = [
  {
    resourceSlug: 'gc-certified-pre-listing-checklist',
    audienceTag: 'LISTING AGENTS · SELLERS',
    heroHeadlinePre: 'Some prep work makes you money.',
    heroHeadlineHighlight: 'Most don\'t',
    heroHeadlinePost: '.',
    heroSubheadline:
      'A licensed NC general contractor wrote a 5-page pre-listing checklist that tells sellers exactly what to fix, what to disclose, and what to leave alone — with prep-spend budget ranges by price tier and the disclosure-critical items that create legal exposure if missed.',
    insideBullets: [
      'Exterior + interior fix-vs-skip-vs-disclose tables (8+ items each)',
      'Major-systems decision matrix — HVAC, roof, plumbing, electrical',
      'NC RPDS disclosure-critical items list',
      'Prep-spend budget guide by listing price range',
      'Hire-a-licensed-contractor vs DIY decision rules',
    ],
    bestFor:
      'Listing agents preparing a seller for market, or sellers deciding what prep work is worth doing before the listing goes live.',
    credibilityLines: [
      'Written by Asher Borden, NC GC License #107724',
      'Built from actual prep-work scoping calls Southern Cities Construction has run',
      'Updated for 2026 NC listing standards',
    ],
    submitLabel: 'Get the Pre-Listing Checklist',
  },
  {
    resourceSlug: 'gc-certified-investor-pre-loi-checklist',
    audienceTag: 'INVESTORS · PRE-LOI',
    heroHeadlinePre: 'Price the deal at',
    heroHeadlineHighlight: 'construction reality',
    heroHeadlinePost: ', not seller-presented condition.',
    heroSubheadline:
      'A licensed NC general contractor wrote a 5-page pre-LOI risk checklist for residential investors. Building envelope traps, hidden major-system risks (galvanized, polybutylene, Federal Pacific), permit-compliance landmines, and a realistic rehab $/sqft chart — so the underwrite reflects what the rehab will actually cost.',
    insideBullets: [
      'Building envelope risks + cost-impact ranges (roof underlayment, sheathing rot, soft-spot subfloor)',
      'Hidden major-system risks — galvanized, polybutylene, aluminum wiring, Federal Pacific panels',
      'Foundation + structural risks investors miss in due diligence',
      'Permit-compliance traps — unpermitted additions, asbestos, underground oil tanks',
      'Realistic rehab budget reality check ($/sqft by scope tier — flip, light major, full gut, addition, ground-up)',
      'Pre-LOI walk-away trigger list',
    ],
    bestFor:
      'Residential investors and small operators underwriting deals in NC who want construction risk priced into the offer before earnest money goes hard.',
    credibilityLines: [
      'Written by Asher Borden, NC GC License #107724',
      'Built from actual investor deal reviews Southern Cities runs every month',
      'Rehab cost ranges from 2026 NC trade-network unit pricing',
    ],
    submitLabel: 'Get the Investor Checklist',
  },
  {
    resourceSlug: 'gc-certified-pre-offer-checklist',
    audienceTag: 'BUYER AGENTS · BUYERS',
    heroHeadlinePre: 'Read the property',
    heroHeadlineHighlight: 'before the offer',
    heroHeadlinePost: ', not after the inspection.',
    heroSubheadline:
      'A licensed NC general contractor wrote a 5-page pre-offer checklist for buyer\'s agents — at-the-curb signal scan, interior walkthrough red flags, age-based concerns + replacement-cost ranges by major system, and walk-away triggers. Use it BEFORE writing the offer so the price reflects construction reality.',
    insideBullets: [
      'At-the-curb 60-second signal scan (8 checks)',
      'Interior walkthrough red-flag list',
      'Age-based concerns + replacement-cost ranges by system (roof, HVAC, plumbing, electrical, septic)',
      'What an inspection won\'t catch — blind-spot list',
      'Walk-away triggers — when to reconsider the deal entirely',
      'Pre-offer price-impact math',
    ],
    bestFor:
      'Buyer\'s agents helping clients evaluate a property before writing an offer.',
    credibilityLines: [
      'Written by Asher Borden, NC GC License #107724',
      'Built from buyer-side construction reads Southern Cities runs every week',
      'Updated for 2026 NC market conditions',
    ],
    submitLabel: 'Get the Pre-Offer Checklist',
  },
];

export function generateStaticParams() {
  return LEAD_MAGNET_LPS.map((lp) => ({ slug: lpRouteSlug(lp.resourceSlug) }));
}

export const dynamicParams = false;

function lpRouteSlug(resourceSlug: string): string {
  // /guide/pre-listing-checklist (drop the 'gc-certified-' prefix from resourceSlug for cleaner URL)
  return resourceSlug.replace(/^gc-certified-/, '');
}

export default function LeadMagnetLandingPage({ params }: { params: Params }) {
  const config = LEAD_MAGNET_LPS.find((lp) => lpRouteSlug(lp.resourceSlug) === params.slug);
  if (!config) notFound();

  const resource = getResourceBySlug(config.resourceSlug);
  if (!resource || !resource.downloadUrl) notFound();

  return (
    <div className="min-h-screen bg-[#08111d] text-white">
      {/* Minimal nav — single SCC wordmark, no nav links (focused funnel page) */}
      <header className="border-b border-white/8">
        <div className="container-pro flex items-center justify-between py-5">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-[15px] font-black tracking-tight text-white">
              SOUTHERN CITIES <span className="text-orange">CONSTRUCTION</span>
            </span>
          </Link>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
            NC GC #107724
          </span>
        </div>
      </header>

      {/* HERO + FORM (side-by-side on desktop, stacked on mobile) */}
      <section className="relative overflow-hidden py-14 sm:py-18 lg:py-22">
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-orange/[0.16] blur-[140px]" aria-hidden="true" />
        <div className="absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full bg-orange/[0.08] blur-[140px]" aria-hidden="true" />
        <div className="relative z-10 container-pro grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <span className="inline-flex items-center rounded-full border border-orange/50 bg-orange/15 px-4 py-1.5 text-[12px] font-black uppercase tracking-[0.18em] text-orange">
              For {config.audienceTag}
            </span>
            <h1 className="mt-5 text-3xl font-black leading-[1.05] tracking-[-0.035em] text-white sm:text-4xl lg:text-[3.25rem]">
              {config.heroHeadlinePre}{' '}
              <span className="text-orange">{config.heroHeadlineHighlight}</span>
              {config.heroHeadlinePost}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-[1.55] text-white/80 sm:text-lg">
              {config.heroSubheadline}
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-orange">What&apos;s inside</p>
              <ul className="mt-3 space-y-2.5">
                {config.insideBullets.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-white/85 sm:text-[15px]">
                    <span className="mt-2 flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 max-w-xl text-[13px] leading-relaxed text-white/60">
              <span className="font-bold text-white/80">Best for:</span> {config.bestFor}
            </p>
          </div>

          <div className="lg:pt-2">
            <LeadMagnetForm
              resourceSlug={config.resourceSlug}
              resourceTitle={resource.title}
              downloadUrl={resource.downloadUrl}
              source={`guide-${lpRouteSlug(config.resourceSlug)}`}
              submitLabel={config.submitLabel}
            />
            <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange">Why trust this</p>
              <ul className="mt-2 space-y-1.5">
                {config.credibilityLines.map((line) => (
                  <li key={line} className="text-[12px] leading-relaxed text-white/70">
                    · {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/8 bg-[#040810] py-8">
        <div className="container-pro flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-[12px] text-white/45">
            © 2026 Southern Cities Construction LLC · NC GC License #107724
          </p>
          <p className="text-[12px] text-white/45">
            <Link href="/privacy" className="hover:text-orange">Privacy</Link>
            <span className="mx-2 text-white/25">·</span>
            <Link href="/terms" className="hover:text-orange">Terms</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

export function generateMetadata({ params }: { params: Params }) {
  const config = LEAD_MAGNET_LPS.find((lp) => lpRouteSlug(lp.resourceSlug) === params.slug);
  if (!config) return {};
  const resource = getResourceBySlug(config.resourceSlug);
  return {
    title: `${resource?.title ?? 'Free GC-Certified Checklist'} | Southern Cities Construction`,
    description: config.heroSubheadline,
    robots: { index: true, follow: true },
  };
}

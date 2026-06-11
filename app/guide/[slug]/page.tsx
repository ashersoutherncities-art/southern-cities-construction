import Image from 'next/image';
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
    resourceSlug: 'consistent-assignment-wholesaler',
    audienceTag: 'NC WHOLESALERS · 2026 PLAYBOOK',
    heroHeadlinePre: 'How NC wholesalers are consistently closing',
    heroHeadlineHighlight: '$25–40K+ assignments',
    heroHeadlinePost: ' to real investors — without becoming flippers.',
    heroSubheadline:
      'Your assignment fee isn\'t capped by your deals. It\'s capped by who you\'re selling them to. Real investors won\'t touch unverified wholesale contracts — so you\'re stuck selling to other wholesalers and low-tier flippers. A licensed NC GC documented the two-layer problem, the 5-question framework you can run on any deal in 15 minutes, and shipped an anonymized excerpt of a real GC-Verified Deal Pack that closed a $32K assignment in 9 days.',
    insideBullets: [
      'The two-layer problem: spread cap + buyer pool quality',
      'Three reasons real investors skip your assignments today (lender veto, capital partner veto, duplicate DD)',
      'The Build-Ready Standard — buyer pool before / after comparison',
      'Anonymized 3-page Bid-Ready Deal Pack excerpt (real $32K assignment, line-item scope, risk callouts)',
      '5-Question Rehab Validation Framework — run it on any deal in 15 minutes',
      'The 4 things you can\'t do alone — sub quotes, plans, permit sweep, license stamp',
      'Four ways to start: free SF ballpark, Bid-Ready, Build-Ready, or the Pro subscription',
    ],
    bestFor:
      'NC wholesalers averaging $5K–$20K assignment fees who want to break the $10K ceiling by attracting real end-investors (not other wholesalers) to their assignments.',
    credibilityLines: [
      'I\'m not a real estate guru. I\'m a licensed NC General Contractor (#107724) running actual jobsites across NC — my name is on the license, so if the work\'s wrong, NC can pull it. Coaches don\'t have that downside.',
      'I built the Deal Pack because I lost over $100K on my own real estate investing deals 8 years ago — bad budget assumptions, the wrong sub network, missed permit timelines. The framework in this PDF is tuition I paid that you don\'t have to.',
      'Most GCs won\'t review a deal you don\'t own yet. We will, because the wholesale-deal-pre-LOI walk is the most defensible thing a licensed NC GC can do for the investor market.',
    ],
    submitLabel: 'Get the $25–40K Assignment Playbook — Free',
  },
  {
    resourceSlug: 'wholesale-to-flip-9-month',
    audienceTag: 'NC WHOLESALERS · LEVELING UP',
    heroHeadlinePre: 'How one NC wholesaler went from',
    heroHeadlineHighlight: '$10K assignments to $104K flips',
    heroHeadlinePost: ' in 9 months — without learning construction.',
    heroSubheadline:
      'Real 9-month case study with full disclosed P&L. He didn\'t pick up a hammer. He didn\'t learn construction. He underwrote the deal, approved milestones, signed the checks — Southern Cities ran the build using the Execution Review + Active Oversight services. Total hours across 9 months: ~20. Net profit on the flip: $104,761. Plus the 5-rule framework for which deals to keep vs. assign, and the honest math on capital, credit, and risk.',
    insideBullets: [
      'The wholesaler ceiling — why even $40K assignments still cap your business',
      'Marcus\'s 9-month transformation timeline (Discovery → Decision → Execution → Sale)',
      'Full disclosed P&L on the $104K flip — sale price, financing, rehab, fees, net',
      'The honest math — capital required ($25K–$60K), credit profile (650+), time commitment (~20 hrs)',
      'How Southern Cities runs the execution side — the Execution Review, Active Oversight, and GC-Supported Build explained, with license-level risk allocation',
      '5-rule decision framework for which deals to keep vs. assign (spread × 3, a clean Execution Review, capital ready, etc.)',
      'Three ways to work with us: the $499 Execution Review, a Build Desk membership, or a 30-minute founder call',
    ],
    bestFor:
      'NC wholesalers averaging $25K+ assignment fees who feel they\'ve outgrown wholesaling and want to evolve into flippers without taking on the construction risk themselves.',
    credibilityLines: [
      'I\'m Darius T. Walton — licensed NC General Contractor #107724 — and I built this entire platform because I tried to do exactly what Marcus did, 8 years ago, without a GC license or a sub network. I lost over $100K before I figured out the actual playbook.',
      'The Execution Review and Active Oversight are the products I wish I\'d had when I was making those mistakes. They\'re the reason a wholesaler-to-flipper transition now takes 9 months with Southern Cities instead of 3 years on your own.',
      'Most GCs won\'t co-pilot a wholesaler\'s first flip. We will. That\'s the wedge — and the reason this 9-month path is reproducible across NC.',
    ],
    submitLabel: 'Get the $104K Case Study — Free',
  },
  {
    resourceSlug: 'nc-execution-risks-investor',
    audienceTag: 'NC INVESTORS · PRE-OFFER',
    heroHeadlinePre: 'The 9 execution risks killing',
    heroHeadlineHighlight: 'NC investor deals',
    heroHeadlinePost: ' in 2026 — and how to spot each one in 5 seconds.',
    heroSubheadline:
      'Your next deal probably has 2 or 3 of them. They cost $5K–$50K each when discovered after earnest money goes hard. A licensed NC General Contractor documented all 9 in a free 12-page PDF — what each risk looks like in listing photos, dollar cost ranges from 2025–2026 NC jobs, and why your buyer’s lender cares.',
    insideBullets: [
      'Stale labor-multiplier diagnostic — Charlotte +28%, Raleigh +22% since 2024 ($12K–$16K typical impact)',
      'Permit-jurisdiction reality table — Mecklenburg / Wake / Durham / New Hanover / Cumberland',
      'Hidden major-system risks — galvanized plumbing, Federal Pacific / Zinsco panels, aluminum wiring, polybutylene',
      'Roof-life misjudgment and clay-sewer-line collapse — $6K–$18K impacts',
      'HVAC sequencing trap that costs $3K–$8K in rework',
      'Total cost-impact summary table for all 9 risks',
      'When and how to escalate to a licensed-GC Execution Review',
    ],
    bestFor:
      'NC real estate investors actively underwriting deals — flippers, BRRRR operators, small portfolio builders — who want to know which execution risks are hiding in the property before earnest money goes hard.',
    credibilityLines: [
      "I'm not a real estate guru. I'm a licensed NC General Contractor (#107724) running actual jobsites across NC — my name is on the license, so if the work's wrong, NC can pull it. Coaches don't have that downside.",
      "I built this because I lost over $100K on my own investing deals when I first got into real estate 8 years ago — bad budget assumptions, wrong labor multipliers, missed permit timelines. The 9 risks in this PDF are tuition I paid that you don't have to.",
      "Most GCs won't review a deal you don't own yet. We will, because we know exactly what costs investors money.",
    ],
    submitLabel: 'Get the 9-Risk PDF — Free',
  },
  {
    resourceSlug: 'gc-certified-pre-listing-checklist',
    audienceTag: 'LISTING AGENTS · SELLERS',
    heroHeadlinePre: 'Know exactly',
    heroHeadlineHighlight: 'what to fix',
    heroHeadlinePost: ', what to disclose, and what to leave alone.',
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
      'Written by Southern Cities Construction (NC GC License #107724)',
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
      'Written by Southern Cities Construction (NC GC License #107724)',
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
      'Written by Southern Cities Construction (NC GC License #107724)',
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

  const coverImage = `/product-mockups/${config.resourceSlug}-cover.jpg`;
  const pageCount = resource.pages ?? 0;

  return (
    <div className="min-h-screen bg-[#08111d] text-white">
      {/* Focused header — brand logo + license, no nav links */}
      <header className="border-b border-white/8 bg-[#08111d]/80 backdrop-blur">
        <div className="container-pro flex items-center justify-between py-4">
          <Link href="/" className="flex items-center" aria-label="Southern Cities Construction">
            <Image src="/sc-construction-logo-reversed.png" alt="Southern Cities Construction" width={280} height={109} className="h-9 w-auto sm:h-11" priority />
          </Link>
          <span className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Licensed NC GC · #107724
          </span>
        </div>
      </header>

      {/* HERO + FORM (side-by-side on desktop, stacked on mobile) */}
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-orange/[0.20] blur-[150px]" aria-hidden="true" />
        <div className="absolute -bottom-32 -left-32 w-[440px] h-[440px] rounded-full bg-orange/[0.08] blur-[140px]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '54px 54px',
            maskImage: 'radial-gradient(ellipse at center, black 35%, transparent 78%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 35%, transparent 78%)',
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 container-pro grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="motion-safe:animate-[heroRise_900ms_ease-out_both]">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange/50 bg-orange/15 px-4 py-1.5 text-[12px] font-black uppercase tracking-[0.18em] text-orange">
              <span className="h-1.5 w-1.5 rounded-full bg-orange motion-safe:animate-pulse" />
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

            {/* Trust-stat row */}
            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white/55">
              <span><span className="text-orange">Free</span> · instant access</span>
              {pageCount > 0 && <span><span className="text-orange">{pageCount}</span>-page PDF</span>}
              <span><span className="text-orange">Licensed</span> NC GC #107724</span>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-orange">What&apos;s inside</p>
              <ul className="mt-3 space-y-2.5">
                {config.insideBullets.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-white/85 sm:text-[15px]">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 max-w-xl text-[13px] leading-relaxed text-white/60">
              <span className="font-bold text-white/80">Best for:</span> {config.bestFor}
            </p>
          </div>

          <div className="lg:pt-2 motion-safe:animate-[heroRise_1000ms_ease-out_0.15s_both]">
            {/* Floating PDF preview above the form */}
            <div className="mb-6 flex items-end justify-center gap-4 lg:justify-start">
              <div className="relative w-[140px] shrink-0 sm:w-[160px]">
                <div className="absolute inset-0 rounded-[12px] bg-orange/20 blur-[40px]" aria-hidden="true" />
                <Image
                  src={coverImage}
                  alt={`${resource.title} cover`}
                  width={160}
                  height={207}
                  className="relative w-full rounded-[10px] border border-white/15 shadow-[0_30px_60px_-18px_rgba(0,0,0,0.7)] ring-1 ring-orange/25 -rotate-[4deg]"
                />
                <div className="absolute -top-2.5 -right-2.5 rounded-full bg-orange px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-white shadow-[0_8px_18px_-4px_rgba(250,140,65,0.6)]">Free</div>
              </div>
              <div className="pb-2">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-orange">Your free download</p>
                <p className="mt-1 text-[15px] font-bold leading-snug text-white">{resource.title}</p>
                {pageCount > 0 && <p className="mt-1 text-[12px] text-white/55">{pageCount}-page branded PDF · instant access</p>}
              </div>
            </div>

            <LeadMagnetForm
              resourceSlug={config.resourceSlug}
              resourceTitle={resource.title}
              downloadUrl={resource.downloadUrl}
              source={`guide-${lpRouteSlug(config.resourceSlug)}`}
              submitLabel={config.submitLabel}
            />
            <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange">Why trust this</p>
              <ul className="mt-2.5 space-y-2">
                {config.credibilityLines.map((line) => (
                  <li key={line} className="flex items-start gap-2 text-[12px] leading-relaxed text-white/70">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-orange/70" aria-hidden="true" />
                    <span>{line}</span>
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
            © 2026 Southern Cities Construction · NC GC License #107724
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
  const path = `/guide/${params.slug}`;
  return {
    title: `${resource?.title ?? 'Free GC-Certified Checklist'} | Southern Cities Construction`,
    description: config.heroSubheadline,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: path,
      title: resource?.title ?? 'Free GC-Certified Checklist',
      description: config.heroSubheadline,
      siteName: 'Southern Cities Construction',
    },
    robots: { index: true, follow: true },
  };
}

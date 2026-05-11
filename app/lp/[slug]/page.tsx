import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';
import FaqItem from '@/components/landing/FaqItem';

type ProblemIconType = 'triangle' | 'grid' | 'spark' | 'dollar';
type SolutionIconType = 'target' | 'layers' | 'alert' | 'arrow';

function ProblemIcon({ type }: { type: ProblemIconType }) {
  if (type === 'triangle') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="h-12 w-12">
        <path d="M32 14 50 46H14L32 14Z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M32 25v10" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="32" cy="40.5" r="1.8" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'grid') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="h-12 w-12">
        <rect x="16" y="16" width="32" height="32" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2.3" />
        <path d="M26.7 16v32M37.3 16v32M16 26.7h32M16 37.3h32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'spark') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="h-12 w-12">
        <path d="M16 43h32" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
        <path d="M20 38V22" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
        <path d="M23 35l7-9 8 5 8-12 4 3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-12 w-12">
      <circle cx="32" cy="32" r="16.5" fill="none" stroke="currentColor" strokeWidth="2.3" />
      <path d="M37 21.5c-1.35-.75-2.9-1.12-4.65-1.12-4.1 0-7.02 2.28-7.02 5.47 0 7.9 14.27 4.37 14.27 11.93 0 3.42-3.1 5.74-7.62 5.74-2.28 0-4.63-.63-6.4-1.78" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
      <path d="M32 17.5v29" fill="none" stroke="currentColor" strokeWidth="1.95" strokeLinecap="round" />
    </svg>
  );
}

function SolutionIcon({ type }: { type: SolutionIconType }) {
  if (type === 'target') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="h-9 w-9">
        <circle cx="24" cy="24" r="12" fill="none" stroke="currentColor" strokeWidth="1.55" />
        <circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" strokeWidth="1.55" />
        <path d="M24 12v-3m0 30v-3m12-12h3M9 24h3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'layers') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="h-9 w-9">
        <path d="M18 13h12l4 4v18H18z" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinejoin="round" />
        <path d="M30 13v6h6" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinejoin="round" />
        <path d="M22 24h8M22 29h8" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'alert') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="h-9 w-9">
        <path d="M24 10.5 35.5 17v14L24 37.5 12.5 31V17L24 10.5Z" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-9 w-9">
      <path d="M15 31 31 15" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" />
      <path d="M22 15h9v9" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 15h7" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.7" />
      <path d="M26 31h7" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

type Params = { slug: string };

type LandingPageConfig = {
  slug: string;
  productKey?: string;
  fallbackHref?: string;
  ctaLabel: string;
  price: string;
  priceLabel: string;
  pricingNote: string;

  heroBgImage: string;
  heroBgAlt: string;
  heroHeadlinePre: string;
  heroHeadlineHighlight: string;
  heroHeadlinePost: string;
  heroSubheadline: string;
  heroTrustText: string;

  problemEyebrow: string;
  problemHeadline: string;
  problemCards: { icon: ProblemIconType; title: string; body: string }[];
  problemTagline: string;

  solutionHeadline: string;
  solutionCards: { icon: SolutionIconType; title: string; body: string }[];

  processSteps: { num: string; title: string; body: string }[];

  trustBullets: string[];
  trustQuote: string;
  trustName: string;

  notIncluded: string[];
  notIncludedTagline: string;

  faqs: { q: string; a: string }[];
};

const SHARED_HERO_BG = '/lp-budget-hero-bg.jpg';
const SHARED_HERO_BG_ALT = 'Construction plans and project review';

const LANDING_PAGES: LandingPageConfig[] = [
  {
    slug: 'investor-deal-review',
    productKey: 'investor-review',
    ctaLabel: 'Start Deal Review',
    price: '$499',
    priceLabel: 'Investor Deal Review',
    pricingNote: 'One flat fee. 2-day turnaround.',
    heroBgImage: SHARED_HERO_BG,
    heroBgAlt: SHARED_HERO_BG_ALT,
    heroHeadlinePre: 'Don’t Commit to a Bad',
    heroHeadlineHighlight: 'Deal',
    heroHeadlinePost: '.',
    heroSubheadline: 'Get a licensed-GC read on the scope, budget, and risk before another dollar goes in.',
    heroTrustText: 'Trusted by investors across North Carolina',
    problemEyebrow: 'The Problem',
    problemHeadline: 'Most Investors Get Blindsided Here',
    problemCards: [
      { icon: 'triangle', title: 'Rehab gets underestimated', body: 'Tens of thousands missed before demo even starts.' },
      { icon: 'grid', title: 'Critical scope gets missed', body: 'Discovered halfway through, when fixes get expensive.' },
      { icon: 'spark', title: 'Hidden risk surfaces late', body: 'Structural and permit issues land mid-project.' },
      { icon: 'dollar', title: 'You commit without a plan', body: 'And the wrong next step costs more than the deal.' },
    ],
    problemTagline: 'That’s how good-looking deals go bad.',
    solutionHeadline: 'What You Get',
    solutionCards: [
      { icon: 'target', title: 'Full Deal Review', body: 'Licensed GC reads the address, photos, and scope.' },
      { icon: 'layers', title: 'Risk Callouts', body: 'Structural, permit, and scope risks flagged in writing.' },
      { icon: 'alert', title: 'Budget + Scope Validation', body: 'Whether the numbers hold up against the work.' },
      { icon: 'arrow', title: 'Clear Next Steps', body: 'Proceed, renegotiate, or walk — we tell you which.' },
    ],
    processSteps: [
      { num: '1', title: 'Submit the Deal', body: 'Address, photos, and any scope or rehab notes you have.' },
      { num: '2', title: 'We Review', body: 'Licensed GC reads it, runs the numbers, flags the risks.' },
      { num: '3', title: 'You Get Clarity', body: 'Written review in 2 business days with a clear recommendation.' },
    ],
    trustBullets: [
      'Licensed NC General Contractor',
      'Investor-focused construction support',
      'Projects reviewed across North Carolina',
    ],
    trustQuote: 'We were about to sink more money in before they walked us through what was actually wrong. Saved us from a bad call.',
    trustName: '— Madison M., Broker / Investor',
    notIncluded: [
      'Not an appraisal or BPO',
      'Not a contractor bid',
      'Not permit filing',
      'Not a guarantee or insurance',
    ],
    notIncludedTagline: 'This is a decision tool, not a full service.',
    faqs: [
      { q: 'What do you need from me?', a: 'Property address, photos, and any scope or rehab notes you already have.' },
      { q: 'How long does it take?', a: 'Typical turnaround is 2 business days from submission.' },
      { q: 'What do I get back?', a: 'A written review with risk callouts and a clear next-step recommendation.' },
      { q: 'Will you tell me not to do the deal?', a: 'Yes when the numbers say so. That is the whole point of the product.' },
    ],
  },
  {
    slug: 'budget-scope-review',
    productKey: 'budget-review',
    ctaLabel: 'Start Budget Review',
    price: '$599',
    priceLabel: 'Budget & Scope Review',
    pricingNote: 'One flat fee. Clear answers.',
    heroBgImage: SHARED_HERO_BG,
    heroBgAlt: SHARED_HERO_BG_ALT,
    heroHeadlinePre: 'Don’t Underestimate Your Rehab',
    heroHeadlineHighlight: 'Budget',
    heroHeadlinePost: '.',
    heroSubheadline: 'Know your real costs before you commit more money to the project.',
    heroTrustText: 'Trusted by investors across North Carolina',
    problemEyebrow: 'The Problem',
    problemHeadline: 'Most Investors Get This Wrong',
    problemCards: [
      { icon: 'triangle', title: 'Budgets miss major scope items', body: 'Important work gets overlooked and costs more later.' },
      { icon: 'grid', title: 'Contractor estimates don’t match reality', body: 'Numbers look good until the work actually starts.' },
      { icon: 'spark', title: 'Costs grow halfway through', body: 'Unidentified issues turn into expensive surprises.' },
      { icon: 'dollar', title: 'Profit disappears', body: 'The deal on paper does not work in reality.' },
    ],
    problemTagline: 'That’s how deals go bad.',
    solutionHeadline: 'What You Get',
    solutionCards: [
      { icon: 'target', title: 'Real Budget Alignment', body: 'Your budget actually matches the scope.' },
      { icon: 'layers', title: 'Missing Costs Identified', body: 'No more surprise expenses mid-project.' },
      { icon: 'alert', title: 'High-Risk Areas Flagged', body: 'Know what can blow up your numbers.' },
      { icon: 'arrow', title: 'Clear Next Steps', body: 'You know exactly what to fix or change.' },
    ],
    processSteps: [
      { num: '1', title: 'Submit Your Project', body: 'Send us your scope, budget, and any relevant details.' },
      { num: '2', title: 'We Review Everything', body: 'We analyze your scope, budget, and potential risk.' },
      { num: '3', title: 'You Get Clear Direction', body: 'Receive a written review with insights and recommended next steps.' },
    ],
    trustBullets: [
      'Licensed NC General Contractor',
      'Investor-focused construction support',
      'Projects reviewed across North Carolina',
    ],
    trustQuote: 'They caught things we completely missed before we moved forward.',
    trustName: '— Investor, NC',
    notIncluded: [
      'Not a contractor bid',
      'Not full estimating',
      'Not project management',
      'Not permit pulling',
    ],
    notIncludedTagline: 'This is a decision tool, not a full service.',
    faqs: [
      { q: 'What do you need from me?', a: 'Property address, photos, scope notes, and the budget or contractor numbers you want reviewed.' },
      { q: 'How long does it take?', a: 'Typical turnaround is 2 business days.' },
      { q: 'What do I get back?', a: 'A clearer read on whether the budget matches the actual scope.' },
      { q: 'Is this for my type of project?', a: 'Yes, if you are evaluating a residential rehab or investor project before moving forward.' },
    ],
  },
  {
    slug: 'permit-path-review',
    productKey: 'permit-local-compliance-review',
    ctaLabel: 'Start Permit Review',
    price: '$399',
    priceLabel: 'Permit Path Review',
    pricingNote: 'One flat fee. 2-day turnaround.',
    heroBgImage: SHARED_HERO_BG,
    heroBgAlt: SHARED_HERO_BG_ALT,
    heroHeadlinePre: 'Find Out If It Can Get',
    heroHeadlineHighlight: 'Permitted',
    heroHeadlinePost: ' First.',
    heroSubheadline: 'A licensed-GC read on permit and compliance risk before the project moves another step.',
    heroTrustText: 'Trusted by investors across North Carolina',
    problemEyebrow: 'The Problem',
    problemHeadline: 'Permit Problems Hide Until They’re Expensive',
    problemCards: [
      { icon: 'triangle', title: 'Permit issues show up mid-build', body: 'Surface after the money is already in.' },
      { icon: 'grid', title: 'Local compliance gets missed', body: 'Jurisdiction-specific rules catch outsiders.' },
      { icon: 'spark', title: 'Assumptions break against approval', body: 'Project plans collapse under permitting reality.' },
      { icon: 'dollar', title: 'Time and money disappear', body: 'Into rework, redrawing, and resubmissions.' },
    ],
    problemTagline: 'That’s how permitting kills timelines.',
    solutionHeadline: 'What You Get',
    solutionCards: [
      { icon: 'target', title: 'Permit Path Review', body: 'Licensed GC reads the likely approval path.' },
      { icon: 'layers', title: 'Local Compliance Check', body: 'Jurisdiction-specific risks called out clearly.' },
      { icon: 'alert', title: 'Approval Pressure Callouts', body: 'Where the project is likely to stall or get denied.' },
      { icon: 'arrow', title: 'Clear Next Steps', body: 'A direction on permit prep before you move further.' },
    ],
    processSteps: [
      { num: '1', title: 'Submit the Project', body: 'Address, photos, and a basic scope or rehab plan.' },
      { num: '2', title: 'We Review', body: 'Licensed GC reads permit and compliance risk for the jurisdiction.' },
      { num: '3', title: 'You Get Direction', body: 'Written review in 2 business days with a clear approval path.' },
    ],
    trustBullets: [
      'Licensed NC General Contractor',
      'Investor-focused construction support',
      'Projects reviewed across North Carolina',
    ],
    trustQuote: 'Permits and paperwork were eating up my week. They took it off my plate and the jobs stopped stalling.',
    trustName: '— Taquan P., Wholesaler',
    notIncluded: [
      'Not permit filing or pulling',
      'Not a guaranteed approval',
      'Not an inspection',
      'Not architectural drafting',
    ],
    notIncludedTagline: 'This is a decision tool, not a full service.',
    faqs: [
      { q: 'What do you need from me?', a: 'Property address, photos, and a basic scope or rehab plan.' },
      { q: 'How long does it take?', a: 'Typical turnaround is 2 business days.' },
      { q: 'What do I get back?', a: 'A review of likely permit requirements, risk points, and recommended next steps.' },
      { q: 'Is this permit filing?', a: 'No. This is a review before permit prep or submission.' },
    ],
  },
  {
    slug: 'contractor-fit',
    productKey: 'contractor-fit-consultation',
    ctaLabel: 'Start Fit Consultation',
    price: '$349',
    priceLabel: 'Contractor Fit Consultation',
    pricingNote: 'Scheduled call + written direction.',
    heroBgImage: SHARED_HERO_BG,
    heroBgAlt: SHARED_HERO_BG_ALT,
    heroHeadlinePre: 'Don’t Hire the Wrong',
    heroHeadlineHighlight: 'Contractor',
    heroHeadlinePost: '.',
    heroSubheadline: 'A licensed-GC read on contractor fit, bid risk, and execution readiness before you hire.',
    heroTrustText: 'Trusted by investors across North Carolina',
    problemEyebrow: 'The Problem',
    problemHeadline: 'The Wrong Contractor Is the Most Expensive Mistake',
    problemCards: [
      { icon: 'triangle', title: 'You hire on bad assumptions', body: 'The pitch sounds right; the execution doesn’t.' },
      { icon: 'grid', title: 'Delivery model doesn’t fit the scope', body: 'GC, handyman, or self-managed — wrong choice costs you.' },
      { icon: 'spark', title: 'Bids look fine until they don’t', body: 'Soft scope and missing lines surface mid-build.' },
      { icon: 'dollar', title: 'You start with the wrong expectations', body: 'And every later decision is shaped by it.' },
    ],
    problemTagline: 'That’s how the project goes sideways.',
    solutionHeadline: 'What You Get',
    solutionCards: [
      { icon: 'target', title: 'Fit Consultation', body: 'A working call with a licensed GC — not a sales pitch.' },
      { icon: 'layers', title: 'Bid Risk Read', body: 'What’s missing, what’s soft, what to push back on.' },
      { icon: 'alert', title: 'Execution Readiness', body: 'Whether the project is set up for the contractor.' },
      { icon: 'arrow', title: 'Clear Next Steps', body: 'A written recommendation after the call.' },
    ],
    processSteps: [
      { num: '1', title: 'Submit the Project', body: 'Scope notes, photos, and any contractor bids you have.' },
      { num: '2', title: 'We Schedule the Call', body: 'A working consultation with a licensed GC.' },
      { num: '3', title: 'You Get Direction', body: 'Written follow-up within 1 business day of the call.' },
    ],
    trustBullets: [
      'Licensed NC General Contractor',
      'Investor-focused construction support',
      'Projects reviewed across North Carolina',
    ],
    trustQuote: 'They did not try to sell us a huge scope we did not need. Just told us what to do next and why.',
    trustName: '— Trisha W., Investor',
    notIncluded: [
      'Not contractor sourcing',
      'Not a referral guarantee',
      'Not a performance audit',
      'Not project management',
    ],
    notIncludedTagline: 'This is a decision tool, not a full service.',
    faqs: [
      { q: 'What do you need from me?', a: 'Project address, scope notes, photos, and any contractor bids or notes you already have.' },
      { q: 'How long does it take?', a: 'A scheduled consultation followed by written direction within 1 business day.' },
      { q: 'What do I get back?', a: 'Guidance on contractor fit, bid risk, and the most sensible next move.' },
      { q: 'Is this contractor sourcing?', a: 'No. This is a fit consultation, not a sourcing campaign.' },
    ],
  },
  {
    slug: 'draw-review',
    productKey: 'draw-review-support',
    ctaLabel: 'Start Draw Review',
    price: '$399',
    priceLabel: 'Draw Review Support',
    pricingNote: 'One flat fee. 2-day turnaround.',
    heroBgImage: SHARED_HERO_BG,
    heroBgAlt: SHARED_HERO_BG_ALT,
    heroHeadlinePre: 'Review the Draw Before the',
    heroHeadlineHighlight: 'Money',
    heroHeadlinePost: ' Goes.',
    heroSubheadline: 'A licensed-GC check on whether payment actually matches progress before funds leave the account.',
    heroTrustText: 'Trusted by investors across North Carolina',
    problemEyebrow: 'The Problem',
    problemHeadline: 'Once the Money Is Out, So Is Your Leverage',
    problemCards: [
      { icon: 'triangle', title: 'You overpay before work warrants it', body: 'Cash goes out faster than the project moves.' },
      { icon: 'grid', title: 'Incomplete work slips through', body: 'Soft documentation hides what’s actually done.' },
      { icon: 'spark', title: 'Money releases on weak proof', body: 'No real check between progress and payment.' },
      { icon: 'dollar', title: 'You lose leverage on issues later', body: 'After the funds are gone, so is your pressure point.' },
    ],
    problemTagline: 'That’s how draws turn into write-offs.',
    solutionHeadline: 'What You Get',
    solutionCards: [
      { icon: 'target', title: 'Draw Review', body: 'Licensed GC reads the request against the work shown.' },
      { icon: 'layers', title: 'Progress vs Payment Check', body: 'Whether the dollar amount actually matches the build.' },
      { icon: 'alert', title: 'Risk Identification', body: 'What’s incomplete, out of sequence, or worth pushing back on.' },
      { icon: 'arrow', title: 'Clear Next Steps', body: 'A direction before you release the funds.' },
    ],
    processSteps: [
      { num: '1', title: 'Submit the Draw', body: 'Draw request, photos, scope, and payment schedule.' },
      { num: '2', title: 'We Review', body: 'Licensed GC reads progress vs payment and flags what’s soft.' },
      { num: '3', title: 'You Get Direction', body: 'Written review in 2 business days before funds go out.' },
    ],
    trustBullets: [
      'Licensed NC General Contractor',
      'Investor-focused construction support',
      'Projects reviewed across North Carolina',
    ],
    trustQuote: 'We were about to sink more money in before they walked us through what was actually wrong. Saved us from a bad call.',
    trustName: '— Madison M., Broker / Investor',
    notIncluded: [
      'Not lender approval',
      'Not a legal opinion',
      'Not project management',
      'Not a guarantee on contractor work',
    ],
    notIncludedTagline: 'This is a decision tool, not a full service.',
    faqs: [
      { q: 'What do you need from me?', a: 'The draw request, photos, scope or rehab plan, and any budget or payment schedule you have.' },
      { q: 'How long does it take?', a: 'Typical turnaround is 2 business days.' },
      { q: 'What do I get back?', a: 'A review of whether the payment request matches the actual progress shown.' },
      { q: 'Is this lender approval?', a: 'No. This is an independent review before you release money.' },
    ],
  },
];

function getConfig(slug: string) {
  return LANDING_PAGES.find((page) => page.slug === slug) || null;
}

function PrimaryCta({ config, className = '' }: { config: LandingPageConfig; className?: string }) {
  const classes = `inline-flex min-h-[48px] items-center justify-center rounded-[2px] bg-[#f58220] px-6 py-3 text-[12px] font-black uppercase tracking-[0.05em] text-white shadow-[0_10px_20px_rgba(245,130,32,0.28)] transition hover:bg-[#ff9229] ${className}`;

  if (config.productKey) {
    return <AddToCartButton itemKey={config.productKey} label={`${config.ctaLabel} →`} className={classes} />;
  }

  return (
    <Link href={config.fallbackHref || '/cart'} className={classes}>
      {config.ctaLabel} {'→'}
    </Link>
  );
}

function PremiumLandingPage({ config }: { config: LandingPageConfig }) {
  return (
    <main className="min-h-screen bg-white text-[#0c1627]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#08111d]">
        <div className="absolute inset-0 scale-[1.04] animate-[heroFloat_18s_ease-in-out_infinite]">
          <Image src={config.heroBgImage} alt={config.heroBgAlt} fill className="object-cover object-right" priority />
        </div>
        <div className="absolute inset-y-0 right-0 w-[58%] bg-[radial-gradient(circle_at_30%_35%,rgba(245,130,32,0.18),transparent_52%)] opacity-90" />
        <div className="absolute left-[-8%] top-[20%] h-40 w-40 rounded-full bg-[rgba(245,130,32,0.12)] blur-3xl animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-4rem] right-[10%] h-52 w-52 rounded-full bg-[rgba(255,255,255,0.08)] blur-3xl animate-[pulse_14s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,10,18,0.98)_0%,rgba(5,12,22,0.96)_28%,rgba(6,15,27,0.82)_56%,rgba(7,15,27,0.56)_78%,rgba(7,15,27,0.42)_100%)]" />
        <div className="relative z-10 mx-auto max-w-[1080px] px-6 pb-7 pt-4 sm:px-8 sm:pb-9 lg:px-8">
          <div className="flex items-start justify-between">
            <Image src="/sc-construction-logo.png" alt="Southern Cities Construction" width={164} height={40} className="h-10 w-auto" priority />
            <div className="hidden items-center gap-2 rounded-[2px] border border-white/18 bg-[rgba(4,10,18,0.72)] px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white sm:flex">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/60 text-[8px] text-white">{'✓'}</span>
              Licensed NC General Contractor
            </div>
          </div>

          <div className="mt-8 max-w-[372px] rounded-[4px] border border-white/12 bg-[linear-gradient(180deg,rgba(7,16,30,0.78)_0%,rgba(5,12,22,0.72)_100%)] px-5 py-5 shadow-[0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur-[3px] sm:mt-11 lg:mt-9 animate-[heroRise_900ms_ease-out]">
            <h1 className="text-[2.28rem] font-black leading-[0.94] tracking-[-0.058em] text-white sm:text-[2.92rem] lg:text-[3.42rem]">
              {config.heroHeadlinePre} <span className="text-[#f58220]">{config.heroHeadlineHighlight}</span>{config.heroHeadlinePost}
            </h1>
            <p className="mt-4 max-w-[280px] text-[0.98rem] leading-[1.62] text-white/95 sm:text-[1rem]">
              {config.heroSubheadline}
            </p>
            <div className="mt-8 animate-[heroRise_1100ms_ease-out]">
              <PrimaryCta config={config} className="min-w-[178px]" />
            </div>
            <div className="mt-4 inline-flex h-9 items-center gap-[10px] rounded-[8px] border border-white/15 bg-[#0d1323] px-3.5 text-[14px] font-medium leading-none text-white/90 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] animate-[heroRise_1300ms_ease-out]">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 flex-none text-[#f28c1b]">
                <path d="M12 3 18 5.5V11c0 4.2-2.7 7.2-6 8.9C8.7 18.2 6 15.2 6 11V5.5L12 3Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="m9.8 11.8 1.5 1.5 3-3.3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{config.heroTrustText}</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="bg-[#f7f8fa] px-6 py-10 sm:px-8 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-[1080px]">
          <p className="text-center text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#f58220]">{config.problemEyebrow}</p>
          <h2 className="mt-2 text-center text-[1.92rem] font-black tracking-[-0.03em] text-[#111827]">{config.problemHeadline}</h2>

          <div className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {config.problemCards.map((item) => (
              <div key={item.title} className="rounded-[20px] border border-[#ebeef2] bg-white px-5 py-7 text-center shadow-[0_10px_24px_rgba(17,24,39,0.04)]">
                <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center text-[#d5aa74]"><ProblemIcon type={item.icon} /></div>
                <h3 className="mx-auto mt-3 max-w-[176px] text-[0.99rem] font-extrabold leading-[1.24] text-[#111827]">{item.title}</h3>
                <p className="mx-auto mt-2 max-w-[176px] text-[11.5px] leading-[1.56] text-[#525b69]">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-9 flex justify-center">
            <div className="inline-flex min-w-[220px] items-center justify-center gap-2 rounded-full bg-[#f6e7d7] px-6 py-3 text-[13px] font-semibold text-[#77552f]">
              <span className="text-[#f58220]">{'✦'}</span>
              {config.problemTagline}
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="relative overflow-hidden bg-[#09192d] px-6 py-12 sm:px-8 lg:px-8 lg:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_60%)]" />
        <div className="relative mx-auto max-w-[1080px]">
          <p className="text-center text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#f58220]">The Solution</p>
          <h2 className="mt-2 text-center text-[1.92rem] font-black tracking-[-0.03em] text-white">{config.solutionHeadline}</h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {config.solutionCards.map((item) => (
              <div key={item.title} className="min-h-[176px] rounded-[3px] border border-white/14 bg-[rgba(7,15,27,0.18)] px-5 py-5 text-center text-white shadow-[0_12px_28px_rgba(0,0,0,0.08)]">
                <div className="mx-auto flex h-15 w-15 items-center justify-center text-[#f58220]"><SolutionIcon type={item.icon} /></div>
                <h3 className="mx-auto mt-4 max-w-[148px] text-[0.99rem] font-extrabold leading-[1.22]">{item.title}</h3>
                <p className="mx-auto mt-2 max-w-[156px] text-[11.5px] leading-[1.56] text-white/72">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <PrimaryCta config={config} className="min-w-[188px]" />
          </div>
        </div>
      </section>

      {/* PROCESS + TRUST + NOT INCLUDED */}
      <section className="bg-white px-6 py-12 sm:px-8 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-[1080px]">
          <p className="text-center text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#f58220]">The Process</p>
          <h2 className="mt-2 text-center text-[1.92rem] font-black tracking-[-0.03em] text-[#111827]">How It Works</h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-3 lg:items-start">
            {config.processSteps.map((step, index) => (
              <div key={step.num} className="relative text-center">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#0b1430] text-[12px] font-black text-white">{step.num}</div>
                {index < config.processSteps.length - 1 ? <div className="absolute left-[67%] top-[18px] hidden h-px w-[66%] bg-[#e9e1d5] lg:block" /> : null}
                <h3 className="mt-4 text-[0.95rem] font-extrabold text-[#111827]">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-[198px] text-[11.5px] leading-[1.56] text-[#59616d]">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="rounded-[3px] border border-[#22344b] bg-[#091729] p-6 text-white shadow-[0_18px_40px_rgba(7,15,27,0.16)] min-h-[252px]">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#f58220]">Why Trust Southern Cities</p>
              <ul className="mt-5 space-y-3 text-[13px] leading-[1.65] text-white/88">
                {config.trustBullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3"><span className="text-[#f58220]">{'◉'}</span><span>{bullet}</span></li>
                ))}
              </ul>
              <div className="mt-6 rounded-[2px] border border-white/14 bg-[rgba(255,255,255,0.03)] p-4">
                <p className="text-[12.5px] leading-[1.65] text-white/82">&ldquo;{config.trustQuote}&rdquo;</p>
                <p className="mt-3 text-[12px] font-semibold text-white">{config.trustName}</p>
              </div>
            </div>

            <div className="rounded-[3px] border border-[#ece6dc] bg-[#fcfaf7] p-6 shadow-[0_12px_28px_rgba(17,24,39,0.05)] min-h-[252px]">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#f58220]">What This Is Not</p>
              <ul className="mt-5 space-y-3 text-[13px] leading-[1.65] text-[#3e4856]">
                {config.notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-3"><span>{'⊗'}</span><span>{item}</span></li>
                ))}
              </ul>
              <p className="mt-7 text-[12.5px] leading-[1.68] text-[#5d6672]">{config.notIncludedTagline}</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-[linear-gradient(180deg,#faf7f1_0%,#f4ece2_100%)] px-6 py-7 sm:px-8 lg:px-8">
        <div className="mx-auto max-w-[1080px]">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#f58220]">{config.priceLabel}</p>
              <p className="mt-2 text-[3.05rem] font-black leading-none tracking-[-0.05em] text-[#111827]">{config.price}</p>
              <p className="mt-2 text-[12.5px] text-[#59616d]">{config.pricingNote}</p>
            </div>
            <div className="flex flex-col items-start lg:items-center lg:justify-center">
              <PrimaryCta config={config} className="min-w-[245px]" />
              <div className="mt-4 flex items-center gap-2 text-[10px] text-[#8a6a46]">
                <span className="text-[#f58220]">{'✓'}</span>
                Secure. Confidential. No obligation.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-6 pb-12 pt-8 sm:px-8 lg:px-8 lg:pb-14">
        <div className="mx-auto max-w-[1080px]">
          <p className="text-center text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#f58220]">FAQ</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {config.faqs.map((faq, index) => (
              <FaqItem key={faq.q} faq={faq} defaultOpen={index === 0} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return LANDING_PAGES.map((page) => ({ slug: page.slug }));
}

export default function LandingPage({ params }: { params: Params }) {
  const config = getConfig(params.slug);
  if (!config) notFound();

  return (
    <>
      <style>{__heroMotionStyles}</style>
      <PremiumLandingPage config={config} />
    </>
  );
}

const __heroMotionStyles = `
@keyframes heroFloat {
  0%, 100% { transform: scale(1.04) translate3d(0, 0, 0); }
  50% { transform: scale(1.08) translate3d(-10px, -6px, 0); }
}

@keyframes heroRise {
  0% { opacity: 0; transform: translate3d(0, 18px, 0); }
  100% { opacity: 1; transform: translate3d(0, 0, 0); }
}
`;

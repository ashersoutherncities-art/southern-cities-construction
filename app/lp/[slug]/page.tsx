import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';

type Params = { slug: string };

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

type LandingPageConfig = {
  slug: string;
  productKey?: string;
  fallbackHref?: string;
  ctaLabel: string;
  price: string;
  turnaround: string;
  audience: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroHighlight: string;
  heroSubheadline: string;
  heroBullets: string[];
  problemHeadline: string;
  problemIntro: string;
  problemBullets: string[];
  getHeadline: string;
  getBullets: { title: string; detail: string }[];
  processSteps: { title: string; detail: string }[];
  notIncluded: string[];
  testimonials: Testimonial[];
  finalHeadline: string;
  finalSubhead: string;
  faqs: { q: string; a: string }[];
};

const LANDING_PAGES: LandingPageConfig[] = [
  {
    slug: 'investor-deal-review',
    productKey: 'investor-review',
    ctaLabel: 'Buy Review — $499',
    price: '$499',
    turnaround: '2 business days',
    audience: 'For residential investors',
    heroEyebrow: 'Investor Deal Review',
    heroHeadline: "Don't put more money in a deal",
    heroHighlight: "until someone has actually looked at it.",
    heroSubheadline:
      "A licensed-GC review of the scope, budget, and project risks — before the deal moves another inch. Straight read, written guidance, $499.",
    heroBullets: [
      '2-business-day turnaround',
      'Licensed NC General Contractor',
      'Written next-step guidance',
    ],
    problemHeadline: 'What goes wrong when you skip it',
    problemIntro: 'Most blown deals look fine on paper. The damage is in what nobody checked.',
    problemBullets: [
      'Rehab gets underestimated by tens of thousands',
      'Critical scope items get missed until demo',
      'Hidden permit or structural risk shows up late',
      'You commit before you have a clear next move',
    ],
    getHeadline: 'What you actually get',
    getBullets: [
      { title: 'Full deal review', detail: 'Address, photos, and scope read by a licensed GC.' },
      { title: 'Risk callouts', detail: 'The structural, permit, and scope risks that move the number.' },
      { title: 'Budget + scope validation', detail: 'Whether the numbers you have hold up to the work involved.' },
      { title: 'Written next steps', detail: 'A clear recommendation on what to do — proceed, renegotiate, or walk.' },
    ],
    processSteps: [
      { title: 'Submit the deal', detail: 'Address, photos, and any scope or rehab notes you already have.' },
      { title: 'We review', detail: 'Licensed GC reads it, runs the numbers, flags the risks.' },
      { title: 'You get clarity', detail: 'Written review in 2 business days with a clear recommendation.' },
    ],
    notIncluded: [
      'A full appraisal or BPO',
      'A contractor bid or guaranteed price',
      'Permit filing or pulling',
      'A guarantee or insurance product',
    ],
    testimonials: [
      {
        quote:
          'We were about to sink more money in before they walked us through what was actually wrong. Saved us from a bad call.',
        name: 'Madison M.',
        role: 'Broker / Investor',
      },
      {
        quote:
          'I needed something concrete to bring back to my buyer, not a maybe. They gave me a straight read and the deal kept moving.',
        name: 'Jethro A.',
        role: 'Wholesaler',
      },
    ],
    finalHeadline: "Get the read before you commit.",
    finalSubhead:
      'One licensed-GC review, 2 business days, $499. Straight answers — even when the answer is don’t do this deal.',
    faqs: [
      { q: 'What do you need from me?', a: 'Property address, photos, and any scope or rehab notes you already have.' },
      { q: 'How long does it take?', a: 'Typical turnaround is 2 business days from submission.' },
      { q: 'What do I get back?', a: 'A written review with risk callouts and a clear next-step recommendation.' },
      { q: 'Is this for my project type?', a: 'Yes if it’s a residential investor deal in NC. Most fix-and-flip, rental, and BRRRR projects qualify.' },
      { q: 'Will you tell me not to do the deal?', a: 'Yes when the numbers say so. That’s the whole point of the product.' },
      { q: 'Can I add more reviews later?', a: 'Yes. Most clients add Budget, Permit, or Contractor Fit reviews once the deal is in motion.' },
    ],
  },
  {
    slug: 'budget-scope-review',
    productKey: 'budget-review',
    ctaLabel: 'Buy Review — $599',
    price: '$599',
    turnaround: '2 business days',
    audience: 'For residential investors',
    heroEyebrow: 'Budget & Scope Review',
    heroHeadline: 'Know what the rehab actually costs',
    heroHighlight: 'before you start cutting checks.',
    heroSubheadline:
      'A licensed-GC review of your budget against the real scope — before startup, lender conversations, or contractor decisions go further. $599, 2 business days.',
    heroBullets: [
      '2-business-day turnaround',
      'Licensed NC General Contractor',
      'Written budget + scope read',
    ],
    problemHeadline: 'What goes wrong when you skip it',
    problemIntro: 'A budget that looks tight on paper falls apart when the scope catches up to it.',
    problemBullets: [
      'Critical line items get underbudgeted',
      'Expensive scope gets missed until mid-project',
      'You approve weak contractor numbers without seeing the gaps',
      'You start with assumptions that won’t hold up',
    ],
    getHeadline: 'What you actually get',
    getBullets: [
      { title: 'Line-by-line budget review', detail: 'A licensed GC reads the numbers against the real scope.' },
      { title: 'Scope gap identification', detail: 'The items missing from the budget that will hit you later.' },
      { title: 'Cost pressure callouts', detail: 'Where the budget is most likely to break and why.' },
      { title: 'Written direction', detail: 'A clear path to fix the budget before construction starts.' },
    ],
    processSteps: [
      { title: 'Submit your project', detail: 'Address, photos, scope notes, and the budget or contractor numbers you want reviewed.' },
      { title: 'We review', detail: 'Licensed GC reads the budget against the actual scope and flags the gaps.' },
      { title: 'You get the read', detail: 'Written review in 2 business days with a fix path.' },
    ],
    notIncluded: [
      'A contractor bid from us',
      'A guaranteed price for the work',
      'Permit submission or filing',
      'Project management or oversight',
    ],
    testimonials: [
      {
        quote:
          'Scope and budget were all over the place when we called. After they walked through it, the project actually felt doable again.',
        name: 'Justin R.',
        role: 'Developer',
      },
      {
        quote: 'They did not try to sell us a huge scope we did not need. Just told us what to do next and why.',
        name: 'Trisha W.',
        role: 'Investor',
      },
    ],
    finalHeadline: 'Get the budget right before you spend.',
    finalSubhead:
      'One licensed-GC budget read, 2 business days, $599. Catch the gap before the project does.',
    faqs: [
      { q: 'What do you need from me?', a: 'Property address, photos, scope notes, and the budget or contractor numbers you want reviewed.' },
      { q: 'How long does it take?', a: 'Typical turnaround is 2 business days from submission.' },
      { q: 'What do I get back?', a: 'A clearer read on whether the budget matches the actual scope, with specific gaps called out.' },
      { q: 'Is this a contractor bid?', a: 'No. This is a review product. We read your budget; we don’t replace it with our own bid.' },
      { q: 'What if the budget is fine?', a: 'You’ll get that in writing too. Confidence in a good number is part of what you’re paying for.' },
      { q: 'Can you also help fix it?', a: 'Yes. After the review, most clients move into our Planning or Execution support.' },
    ],
  },
  {
    slug: 'permit-path-review',
    productKey: 'permit-local-compliance-review',
    ctaLabel: 'Buy Review — $399',
    price: '$399',
    turnaround: '2 business days',
    audience: 'For residential investors',
    heroEyebrow: 'Permit Path Review',
    heroHeadline: 'Find out if it can actually be permitted',
    heroHighlight: 'before you build a plan around it.',
    heroSubheadline:
      "A licensed-GC review of permit requirements and approval risk — so you know what gets through and what doesn't. $399, 2 business days.",
    heroBullets: [
      '2-business-day turnaround',
      'Licensed NC General Contractor',
      'Permit + compliance risk read',
    ],
    problemHeadline: 'What goes wrong when you skip it',
    problemIntro: 'Permit problems rarely show up early. By the time they do, the money is already in.',
    problemBullets: [
      'Permit issues surface mid-construction',
      'Local compliance gets missed entirely',
      'Project assumptions collapse against approval reality',
      'Time and money disappear into rework',
    ],
    getHeadline: 'What you actually get',
    getBullets: [
      { title: 'Permit path review', detail: 'A licensed GC reads the likely approval path for the work.' },
      { title: 'Local compliance check', detail: 'The jurisdiction-specific risk points that catch outsiders.' },
      { title: 'Approval pressure callouts', detail: 'Where this project is likely to stall or get denied.' },
      { title: 'Written next steps', detail: 'A clear direction on permit prep before you move further.' },
    ],
    processSteps: [
      { title: 'Submit the project', detail: 'Address, photos, and a basic scope or rehab plan.' },
      { title: 'We review', detail: 'Licensed GC reads permit and compliance risk against the jurisdiction.' },
      { title: 'You get direction', detail: 'Written review in 2 business days with a clear approval path.' },
    ],
    notIncluded: [
      'Permit prep, drafting, or filing',
      'A guaranteed approval',
      'An inspection or code enforcement review',
      'Architectural or engineering stamp',
    ],
    testimonials: [
      {
        quote: 'Permits and paperwork were eating up my week. They took it off my plate and the jobs stopped stalling.',
        name: 'Taquan P.',
        role: 'Wholesaler',
      },
      {
        quote: 'I had no idea what was a real problem and what was not. They told me what to fix now and what could wait.',
        name: 'Yvonne W.',
        role: 'Homeowner',
      },
    ],
    finalHeadline: 'Know the permit path before you commit.',
    finalSubhead: 'One licensed-GC permit read, 2 business days, $399. Catch the approval risk before it catches you.',
    faqs: [
      { q: 'What do you need from me?', a: 'Property address, photos, and a basic scope or rehab plan.' },
      { q: 'How long does it take?', a: 'Typical turnaround is 2 business days from submission.' },
      { q: 'What do I get back?', a: 'A review of likely permit requirements, risk points, and recommended next steps.' },
      { q: 'Is this permit filing?', a: 'No. This is a review before permit prep or submission. We can handle filing as a separate engagement.' },
      { q: 'Will this guarantee approval?', a: 'No one can. What you get is a realistic read on whether the path is clean, risky, or blocked.' },
      { q: 'Can you help submit after?', a: 'Yes. Permit Prep & Admin is a separate service that picks up where this review ends.' },
    ],
  },
  {
    slug: 'contractor-fit',
    productKey: 'contractor-fit-consultation',
    ctaLabel: 'Buy Review — $349',
    price: '$349',
    turnaround: 'Scheduled consultation',
    audience: 'For residential investors',
    heroEyebrow: 'Contractor Fit & Recommendation',
    heroHeadline: "Don't hire the wrong contractor",
    heroHighlight: 'for this project.',
    heroSubheadline:
      "A licensed-GC read on contractor fit, bid risk, and execution readiness — before hiring sends the project sideways. $349, scheduled consultation.",
    heroBullets: [
      'Scheduled consultation',
      'Licensed NC General Contractor',
      'Written guidance after the call',
    ],
    problemHeadline: 'What goes wrong when you skip it',
    problemIntro: 'The wrong contractor is the most expensive mistake on the project — and the hardest to undo.',
    problemBullets: [
      'You hire against bad assumptions',
      'You choose a delivery model that doesn’t fit the scope',
      'You pay based on weak contractor numbers',
      'You start the project with the wrong expectations baked in',
    ],
    getHeadline: 'What you actually get',
    getBullets: [
      { title: 'Contractor fit consultation', detail: 'A licensed GC walks through the project and the contractors you’re considering.' },
      { title: 'Bid risk read', detail: 'What’s missing, what’s soft, what’s a problem in the numbers you have.' },
      { title: 'Execution readiness review', detail: 'Whether the project is set up for the kind of contractor you’re hiring.' },
      { title: 'Written direction', detail: 'A clear next-step recommendation after the call.' },
    ],
    processSteps: [
      { title: 'Submit the project', detail: 'Address, scope notes, photos, and any contractor bids or notes you have.' },
      { title: 'We schedule the call', detail: 'A working consultation with a licensed GC — not a sales pitch.' },
      { title: 'You get the read', detail: 'Written direction sent within 1 business day of the call.' },
    ],
    notIncluded: [
      'Contractor sourcing or recruitment',
      'A referral guarantee',
      'A contractor performance audit',
      'Project management or oversight',
    ],
    testimonials: [
      {
        quote: 'They did not try to sell us a huge scope we did not need. Just told us what to do next and why.',
        name: 'Trisha W.',
        role: 'Investor',
      },
      {
        quote: 'We just needed help on one piece, not a full build out. They stuck to what we asked for and did not push extras.',
        name: 'Iantha M.',
        role: 'Investor',
      },
    ],
    finalHeadline: 'Make the contractor call cleanly.',
    finalSubhead: 'One licensed-GC consultation, written follow-up, $349. Hire with eyes open.',
    faqs: [
      { q: 'What do you need from me?', a: 'Project address, scope notes, photos, and any contractor bids or notes you already have.' },
      { q: 'How long does it take?', a: 'A scheduled consultation followed by written direction within 1 business day.' },
      { q: 'What do I get back?', a: 'Guidance on contractor fit, bid risk, and the most sensible next move.' },
      { q: 'Is this contractor sourcing?', a: 'No. This is a fit consultation, not a sourcing campaign.' },
      { q: 'Will you recommend a specific contractor?', a: 'We’ll tell you what kind of contractor fits and whether the ones you’re considering make sense.' },
      { q: 'Can you run the project after?', a: 'Yes. Our Owner-Controlled Build and Full Execution options pick up from here.' },
    ],
  },
  {
    slug: 'draw-review',
    productKey: 'draw-review-support',
    ctaLabel: 'Buy Review — $399',
    price: '$399',
    turnaround: '2 business days',
    audience: 'For residential investors',
    heroEyebrow: 'Draw Review Support',
    heroHeadline: 'Review the draw',
    heroHighlight: 'before you release the money.',
    heroSubheadline:
      "A licensed-GC check on whether the payment actually matches the progress — before funds go out the door. $399, 2 business days.",
    heroBullets: [
      '2-business-day turnaround',
      'Licensed NC General Contractor',
      'Progress-versus-payment read',
    ],
    problemHeadline: 'What goes wrong when you skip it',
    problemIntro: 'Once the money’s released, your leverage on the project goes with it.',
    problemBullets: [
      'You overpay before the work warrants it',
      'Incomplete or unfinished work slips through',
      'Money goes out against weak documentation',
      'You lose leverage when issues show up later',
    ],
    getHeadline: 'What you actually get',
    getBullets: [
      { title: 'Draw review', detail: 'A licensed GC reads the request against the work shown.' },
      { title: 'Progress-vs-payment check', detail: 'Whether the dollar amount actually matches what got built.' },
      { title: 'Risk identification', detail: 'What’s incomplete, what’s out of sequence, what to push back on.' },
      { title: 'Written direction', detail: 'A clear next step before you release the funds.' },
    ],
    processSteps: [
      { title: 'Submit the draw', detail: 'Draw request, photos, scope/rehab plan, payment schedule.' },
      { title: 'We review', detail: 'Licensed GC reads progress against payment and flags what’s soft.' },
      { title: 'You get direction', detail: 'Written review in 2 business days before funds go out.' },
    ],
    notIncluded: [
      'Lender approval',
      'A legal opinion',
      'Project management or oversight',
      'A guarantee on contractor work',
    ],
    testimonials: [
      {
        quote: 'Permits and paperwork were eating up my week. They took it off my plate and the jobs stopped stalling.',
        name: 'Taquan P.',
        role: 'Wholesaler',
      },
      {
        quote:
          'We were about to sink more money in before they walked us through what was actually wrong. Saved us from a bad call.',
        name: 'Madison M.',
        role: 'Broker / Investor',
      },
    ],
    finalHeadline: 'Check the draw before the money goes.',
    finalSubhead: 'One licensed-GC review, 2 business days, $399. Keep payment honest to progress.',
    faqs: [
      { q: 'What do you need from me?', a: 'The draw request, photos, scope or rehab plan, and any budget or payment schedule you have.' },
      { q: 'How long does it take?', a: 'Typical turnaround is 2 business days from submission.' },
      { q: 'What do I get back?', a: 'A review of whether the payment request matches the actual progress shown.' },
      { q: 'Is this lender approval?', a: 'No. This is an independent review before you release money.' },
      { q: 'What if the draw is fine?', a: 'You’ll get a written confirmation so you can release with confidence.' },
      { q: 'Can you do ongoing draw reviews?', a: 'Yes. Many clients set up recurring draw reviews for the duration of a project.' },
    ],
  },
];

function getConfig(slug: string) {
  return LANDING_PAGES.find((page) => page.slug === slug) || null;
}

function PrimaryCta({
  config,
  variant = 'orange',
  size = 'lg',
  fullWidth = false,
}: {
  config: LandingPageConfig;
  variant?: 'orange' | 'white';
  size?: 'lg' | 'md';
  fullWidth?: boolean;
}) {
  const sizeClasses = size === 'lg' ? 'min-h-[60px] px-8 py-4 text-base' : 'min-h-[52px] px-6 py-3 text-sm';
  const variantClasses =
    variant === 'white'
      ? 'bg-white text-navy-900 hover:bg-stone-100'
      : 'bg-orange text-white hover:bg-orange-500 shadow-glow-orange';
  const widthClass = fullWidth ? 'w-full' : 'min-w-[240px]';
  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-150 ${sizeClasses} ${variantClasses} ${widthClass}`;

  const arrow = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (config.productKey) {
    return (
      <AddToCartButton
        itemKey={config.productKey}
        label={config.ctaLabel}
        className={baseClasses}
      />
    );
  }

  return (
    <Link href={config.fallbackHref || '/cart'} className={baseClasses}>
      <span>{config.ctaLabel}</span>
      {arrow}
    </Link>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function generateStaticParams() {
  return LANDING_PAGES.map((page) => ({ slug: page.slug }));
}

export const dynamicParams = false;

export default function LandingPage({ params }: { params: Params }) {
  const config = getConfig(params.slug);
  if (!config) notFound();

  return (
    <main className="relative min-h-screen bg-stone-50 text-navy-900 pb-24 lg:pb-0">
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-900">
        <div
          className="absolute inset-0 motion-safe:animate-gradient-pan bg-[linear-gradient(125deg,#163061_0%,#10254c_50%,#143367_100%)]"
          style={{ backgroundSize: '180% 180%' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-6xl px-5 pt-7 sm:px-8 sm:pt-9">
          <div className="flex items-center justify-between">
            <Image
              src="/sc-construction-logo.png"
              alt="Southern Cities Construction"
              width={176}
              height={44}
              className="h-9 w-auto sm:h-10"
              priority
            />
            <div className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold text-white/85 sm:inline-flex">
              <span className="block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Licensed NC General Contractor
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-10 sm:px-8 sm:pb-24 sm:pt-12">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-orange motion-safe:animate-hero-rise">
              <span className="block h-px w-8 bg-orange/80" aria-hidden="true" />
              {config.heroEyebrow} · {config.audience}
            </p>
            <h1
              className="mt-6 text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.75rem] motion-safe:animate-hero-rise"
              style={{ animationDelay: '0.1s' }}
            >
              {config.heroHeadline}{' '}
              <span className="text-orange">{config.heroHighlight}</span>
            </h1>
            <p
              className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl motion-safe:animate-hero-rise"
              style={{ animationDelay: '0.2s' }}
            >
              {config.heroSubheadline}
            </p>

            <div
              className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-medium text-white/80 motion-safe:animate-hero-rise"
              style={{ animationDelay: '0.3s' }}
            >
              {config.heroBullets.map((bullet) => (
                <div key={bullet} className="flex items-center gap-2">
                  <span className="text-orange">
                    <CheckIcon />
                  </span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            <div
              className="mt-10 flex flex-wrap items-center gap-4 motion-safe:animate-hero-rise"
              style={{ animationDelay: '0.4s' }}
            >
              <PrimaryCta config={config} />
              <a href="#faq" className="text-sm font-semibold text-white/75 underline-offset-4 transition hover:text-white hover:underline">
                Questions first? See the FAQ ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="bg-white border-b border-stone-200">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Problem</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">{config.problemHeadline}</h2>
            <p className="mt-4 text-lg leading-relaxed text-stone-600">{config.problemIntro}</p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {config.problemBullets.map((bullet) => (
              <div
                key={bullet}
                className="flex items-start gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 9v4M12 17h.01M10.3 3.86l-8.2 14.2A2 2 0 003.83 21h16.34a2 2 0 001.73-3l-8.2-14.2a2 2 0 00-3.46 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <p className="text-[15px] font-medium leading-relaxed text-navy-900">{bullet}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="bg-stone-50 border-b border-stone-200">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What you get</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">{config.getHeadline}</h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {config.getBullets.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-stone-200 bg-white p-6 shadow-elev-1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elev-3"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange">
                    <CheckIcon />
                  </span>
                  <div>
                    <h3 className="text-lg font-extrabold tracking-tight text-navy-900">{item.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-stone-600">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <PrimaryCta config={config} />
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-white border-b border-stone-200">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Process</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">How it works</h2>
            <p className="mt-4 text-lg leading-relaxed text-stone-600">
              Three steps. {config.turnaround} from submission to direction.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {config.processSteps.map((step, idx) => (
              <div key={step.title} className="relative">
                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6 h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange text-xl font-extrabold text-white">
                    {idx + 1}
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold tracking-tight text-navy-900">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-stone-600">{step.detail}</p>
                </div>
                {idx < config.processSteps.length - 1 ? (
                  <div className="absolute left-full top-12 -translate-x-1/2 hidden md:block" aria-hidden="true">
                    <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
                      <path d="M2 10h28M22 4l8 6-8 6" stroke="#fa8c41" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-navy-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 motion-safe:animate-gradient-pan bg-[linear-gradient(125deg,#163061_0%,#10254c_50%,#143367_100%)]"
          style={{ backgroundSize: '180% 180%' }}
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Trust</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              From clients who have actually used this.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {config.testimonials.map((t) => (
              <blockquote key={t.name} className="rounded-2xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-sm">
                <svg className="text-orange/60" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                </svg>
                <p className="mt-4 text-lg font-medium leading-relaxed text-white/90">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-orange/40 bg-orange/10 font-bold text-orange">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white">{t.name}</p>
                    <p className="text-sm text-white/65">{t.role}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
            <span>Licensed NC GC</span>
            <span className="text-white/20">·</span>
            <span>Fully Insured</span>
            <span className="text-white/20">·</span>
            <span>Investor-Focused</span>
            <span className="text-white/20">·</span>
            <span>NC Statewide</span>
          </div>
        </div>
      </section>

      {/* WHAT THIS IS NOT */}
      <section className="bg-white border-b border-stone-200">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">What this is not</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
              So you know exactly what you&rsquo;re buying.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-stone-600">
              This is a review product with a clear scope. Here&rsquo;s what it isn&rsquo;t:
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {config.notIncluded.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl border border-stone-200 bg-stone-50 p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-stone-200 text-stone-600">
                  <XIcon />
                </span>
                <p className="text-[15px] font-medium text-navy-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING + CTA */}
      <section className="bg-stone-50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="overflow-hidden rounded-3xl border-2 border-orange/20 bg-white shadow-elev-3">
            <div className="grid lg:grid-cols-12">
              <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">Pricing</p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
                  {config.finalHeadline}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-stone-600">{config.finalSubhead}</p>

                <ul className="mt-7 space-y-3 text-[15px]">
                  {config.heroBullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="font-medium text-navy-900">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5 bg-navy-900 text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-center relative overflow-hidden">
                <div
                  className="absolute inset-0 motion-safe:animate-gradient-pan bg-[linear-gradient(125deg,#163061_0%,#10254c_50%,#143367_100%)]"
                  style={{ backgroundSize: '180% 180%' }}
                  aria-hidden="true"
                />
                <div className="relative z-10">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">{config.heroEyebrow}</p>
                  <p className="mt-2 text-6xl font-extrabold tracking-tight">{config.price}</p>
                  <p className="mt-2 text-sm text-white/65">one-time · {config.turnaround}</p>
                  <div className="mt-7">
                    <PrimaryCta config={config} fullWidth />
                  </div>
                  <p className="mt-4 text-center text-xs text-white/50">Secure checkout · No subscription</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white border-t border-stone-200">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">FAQ</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
              Questions before you buy.
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {config.faqs.map((faq, idx) => (
              <details
                key={faq.q}
                className="group overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 transition-colors open:bg-white open:border-orange/30 open:shadow-elev-1"
                open={idx === 0}
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left list-none [&::-webkit-details-marker]:hidden">
                  <span className="font-bold text-navy-900">{faq.q}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange/10 text-orange transition-transform group-open:rotate-45">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-[15px] leading-relaxed text-stone-700">{faq.a}</div>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center">
            <PrimaryCta config={config} />
            <p className="mt-4 text-sm text-stone-500">
              Or call <a href="tel:+19804737249" className="font-semibold text-navy-900 underline-offset-4 hover:text-orange hover:underline">(980) 473-7249</a> to talk it through first.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER (minimal — landing pages have no global nav) */}
      <footer className="bg-navy-950 text-white/55 py-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 text-center text-xs">
          <p>© 2026 Southern Cities Construction LLC. Licensed NC General Contractor.</p>
          <p className="mt-2">
            <Link href="/privacy" className="hover:text-orange">Privacy</Link>
            <span className="mx-3 text-white/20">·</span>
            <Link href="/terms" className="hover:text-orange">Terms</Link>
          </p>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white p-3 shadow-[0_-10px_30px_-15px_rgba(10,21,48,0.3)] lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">{config.heroEyebrow}</p>
            <p className="text-lg font-extrabold tracking-tight text-navy-900">{config.price}</p>
          </div>
          <PrimaryCta config={config} size="md" />
        </div>
      </div>
    </main>
  );
}

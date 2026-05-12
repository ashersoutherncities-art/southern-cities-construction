import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';
import FaqItem from '@/components/landing/FaqItem';
import LpLeadForm from '@/components/LpLeadForm';

type Params = { slug: string };

type Testimonial = { quote: string; name: string; role: string };

type DeliverableSection = { heading: string; items: string[] };

type LandingPageConfig = {
  slug: string;
  productKey?: string;
  fallbackHref?: string;
  ctaLabel: string;
  price: string;
  priceAnchor: string;
  priceLabel: string;
  turnaround: string;
  audience: string;

  heroEyebrow: string;
  heroHeadlinePre: string;
  heroHeadlineHighlight: string;
  heroHeadlinePost: string;
  heroSubheadline: string;

  problemHeadline: string;
  problemIntro: string;
  problemCards: { title: string; body: string; tone: 'red' | 'amber' | 'rose' | 'orange' }[];

  getHeadline: string;
  getBullets: { title: string; detail: string }[];

  deliverableTitle: string;
  deliverableSubtitle: string;
  deliverable: DeliverableSection[];

  processSteps: { title: string; detail: string }[];

  testimonials: Testimonial[];

  notIncluded: string[];

  valueStack: string[];

  finalHeadline: string;
  finalSubhead: string;

  faqs: { q: string; a: string }[];

  /** Optional override for the comparison-table rows. Use when the product's
   *  price tier or alternatives differ from the Stage 1 default (DIY / free
   *  contractor consult / architect / Southern Cities $349-599). */
  comparisonRows?: ComparisonRow[];

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

const SHARED_TRUST_STATS = [
  { value: '120+', label: 'Investors served' },
  { value: '4.9★', label: 'Avg client rating' },
  { value: '2-day', label: 'Avg turnaround' },
  { value: 'NC GC', label: 'Licensed in NC' },
];

type ComparisonRow = {
  label: string;
  cost: string;
  time: string;
  bias: string;
  licensed: boolean | string;
  highlight: boolean;
};

// Default comparison rows — used for Stage 1 review products ($299-599, 2-day turnaround).
// LPs in higher price tiers or different shapes override this via config.comparisonRows.
const COMPARISON_ROWS: ComparisonRow[] = [
  { label: 'DIY estimate', cost: 'Free', time: 'Hours', bias: 'High (your assumptions)', licensed: false, highlight: false },
  { label: 'Free contractor consult', cost: 'Free', time: 'Days', bias: 'High (they want the job)', licensed: 'Sometimes', highlight: false },
  { label: 'Architect review', cost: '$3,000–5,000+', time: '2–4 weeks', bias: 'Low', licensed: true, highlight: false },
  { label: 'Southern Cities Review', cost: '$349–599', time: '2 business days', bias: 'None — flat fee', licensed: true, highlight: true },
];

// Per-LP comparison overrides — used when the default doesn't match the product's
// actual price tier or alternatives.
const COMPARISON_ROWS_CONTRACTOR_GRADE_BUDGET: ComparisonRow[] = [
  { label: 'DIY spreadsheet', cost: 'Free', time: 'Days', bias: 'High — no takeoff training', licensed: false, highlight: false },
  { label: 'Contractor estimate', cost: 'Free', time: 'Days', bias: 'High (they want the job)', licensed: 'Sometimes', highlight: false },
  { label: 'Estimating service', cost: '$2,000–3,500', time: '1–2 weeks', bias: 'Low', licensed: 'Sometimes', highlight: false },
  { label: 'Hire GC for budget', cost: '$3,000–5,000 retainer', time: '1–2 weeks', bias: 'Low', licensed: true, highlight: false },
  { label: 'Southern Cities — Contractor-Grade Budget', cost: '$1,799', time: '5 business days', bias: 'None — flat fee', licensed: true, highlight: true },
];

const COMPARISON_ROWS_DUE_DILIGENCE_BUNDLE: ComparisonRow[] = [
  { label: 'DIY due diligence', cost: 'Free', time: 'Weeks', bias: 'High — your assumptions', licensed: false, highlight: false },
  { label: 'Buy 4 reviews individually', cost: '$1,846 total', time: '2 days each, sequential', bias: 'None — flat fees', licensed: true, highlight: false },
  { label: 'Hire 4 specialists', cost: '$3,000–5,000+', time: '2–3 weeks', bias: 'Low', licensed: 'Sometimes', highlight: false },
  { label: 'Southern Cities — Due Diligence Bundle', cost: '$1,499 flat', time: '2–4 business days combined', bias: 'None — flat fee', licensed: true, highlight: true },
];

const COMPARISON_ROWS_PROJECT_SETUP_BUNDLE: ComparisonRow[] = [
  { label: 'DIY project setup', cost: 'Free', time: 'Months', bias: 'High risk — your assumptions', licensed: false, highlight: false },
  { label: 'GC planning retainer', cost: '$3,000–5,000+', time: '2–4 weeks', bias: 'Mixed (they want the build)', licensed: true, highlight: false },
  { label: 'Architect + PM', cost: '$5,000–15,000+', time: '4–8 weeks', bias: 'Low', licensed: true, highlight: false },
  { label: 'Southern Cities — Project Setup Bundle', cost: 'Starting at $2,500', time: '2–4 weeks for full setup', bias: 'None — fixed scope', licensed: true, highlight: true },
];

const COMPARISON_ROWS_EXECUTION_SUPPORT_BUNDLE: ComparisonRow[] = [
  { label: 'Self-supervise', cost: 'Free', time: 'Project duration', bias: 'High — your blind spots', licensed: false, highlight: false },
  { label: "Owner's rep", cost: '$2,000–4,000/mo', time: 'Monthly', bias: 'Low', licensed: 'Sometimes', highlight: false },
  { label: 'Separate oversight GC', cost: '$5,000–10,000/mo', time: 'Monthly', bias: 'Low', licensed: true, highlight: false },
  { label: 'Southern Cities — Execution Support', cost: 'Starting at $3,500/mo', time: 'Monthly engagement', bias: 'None — scoped per project', licensed: true, highlight: true },
];

// Shared "alternatives" for realtor products — the SC row is per-product
// (different price + turnaround per LP) so customers see the exact price
// of THIS product in the comparison, not a category range.
const REALTOR_ALTERNATIVES: ComparisonRow[] = [
  { label: 'Read inspection yourself', cost: 'Free', time: 'Hours', bias: 'High — no construction context', licensed: false, highlight: false },
  { label: 'Ask a contractor friend', cost: 'Free', time: 'Days, if they reply', bias: 'High (they want the job)', licensed: 'Sometimes', highlight: false },
  { label: 'Second inspector', cost: '$400–800', time: '2–5 days', bias: 'Low', licensed: 'Inspector-licensed', highlight: false },
];

const COMPARISON_ROWS_SAME_DAY_QUICK_READ: ComparisonRow[] = [
  ...REALTOR_ALTERNATIVES,
  { label: 'Southern Cities — Same-Day Quick Read', cost: '$199', time: '4 hours', bias: 'None — flat fee', licensed: true, highlight: true },
];

const COMPARISON_ROWS_REALTOR_INSPECTION_REVIEW: ComparisonRow[] = [
  ...REALTOR_ALTERNATIVES,
  { label: 'Southern Cities — Inspection Review', cost: '$299', time: '1 business day', bias: 'None — flat fee', licensed: true, highlight: true },
];

const COMPARISON_ROWS_BUYER_SIDE_PROPERTY_READ: ComparisonRow[] = [
  ...REALTOR_ALTERNATIVES,
  { label: 'Southern Cities — Buyer-Side Property Read', cost: '$299', time: '1 business day', bias: 'None — flat fee', licensed: true, highlight: true },
];

const COMPARISON_ROWS_NEGOTIATION_STRATEGY_READ: ComparisonRow[] = [
  ...REALTOR_ALTERNATIVES,
  { label: 'Southern Cities — Negotiation Strategy Read', cost: '$299', time: '1 business day', bias: 'None — flat fee', licensed: true, highlight: true },
];

const COMPARISON_ROWS_PRE_LISTING_VALUATION: ComparisonRow[] = [
  ...REALTOR_ALTERNATIVES,
  { label: 'Southern Cities — Pre-Listing Construction Valuation', cost: '$399', time: '1 business day', bias: 'None — flat fee', licensed: true, highlight: true },
];

const COMPARISON_ROWS_PHASED_INSPECTIONS: ComparisonRow[] = [
  { label: 'Trust your contractor', cost: 'Free', time: "On contractor's schedule", bias: 'High — their own work', licensed: 'Varies', highlight: false },
  { label: 'Home inspector (final only)', cost: '$400–800', time: 'Days', bias: 'Low', licensed: 'Inspector-licensed', highlight: false },
  { label: 'City / AHJ inspector', cost: 'Included in permits', time: 'On AHJ schedule', bias: 'Code compliance only', licensed: 'Code-licensed', highlight: false },
  { label: 'Southern Cities — Phased Inspections', cost: 'Per-phase pricing', time: '1–2 days per phase', bias: 'None — independent', licensed: true, highlight: true },
];

const LANDING_PAGES: LandingPageConfig[] = [
  {
    slug: 'investor-deal-review',
    productKey: 'investor-review',
    ctaLabel: 'Start Deal Review',
    price: '$499',
    priceAnchor: 'A missed scope item can cost $30K+',
    priceLabel: 'Investor Deal Review',
    turnaround: '2 business days',
    audience: 'For residential investors',
    heroEyebrow: 'Investor Deal Review',
    heroHeadlinePre: "Don't put more money in a",
    heroHeadlineHighlight: 'deal',
    heroHeadlinePost: ' nobody has actually read.',
    heroSubheadline:
      'A licensed-GC underwriting opinion before earnest money: scope feasibility, a rough budget range with confidence levels, risk callouts, and the walk-away trigger — in your inbox in 2 business days. $499 flat.',
    problemHeadline: 'How good-looking deals go bad',
    problemIntro: 'Most blown deals look fine on paper. The damage is in what nobody checked before earnest money went hard.',
    problemCards: [
      { title: 'Rehab gets underestimated', body: 'Tens of thousands missed before demo even starts.', tone: 'red' },
      { title: 'Critical scope gets missed', body: 'Discovered halfway through, when fixes are expensive.', tone: 'amber' },
      { title: 'Hidden risk surfaces late', body: 'Structural and permit issues land mid-project.', tone: 'rose' },
      { title: 'You commit without a plan', body: 'And the wrong next step costs more than the deal.', tone: 'orange' },
    ],
    getHeadline: 'What you actually get',
    getBullets: [
      { title: 'Scope feasibility read', detail: 'Licensed GC reads the address, photos, and your stated scope.' },
      { title: 'Rough budget range', detail: 'A number you can underwrite with — with confidence levels per line.' },
      { title: 'Construction risk callouts', detail: 'Structural, permit, and scope risks flagged before close.' },
      { title: 'Walk-away trigger', detail: 'The specific condition that should make you kill the deal.' },
    ],
    deliverableTitle: 'Investor Deal Review',
    deliverableSubtitle: '123 Main St · Charlotte, NC',
    deliverable: [
      {
        heading: 'Scope summary',
        items: ['What you are really buying based on photos + your plan', 'Implicit assumptions surfaced (additions? layout changes?)'],
      },
      {
        heading: 'Construction risk callouts',
        items: ['Slab cracking visible — $15K+ if structural', 'Permit jurisdiction: 6–8 weeks here, not 3–4', 'Roof age suggests full replacement, not patch'],
      },
      {
        heading: 'Budget range with confidence',
        items: ['Likely $95K–$135K for scope as described', 'High confidence on kitchen + baths; low on structural', 'Add 12% soft costs'],
      },
      {
        heading: 'Timeline range',
        items: ['14–18 weeks from permit pull, not 8–10', 'Local queue + Q3 start = 4-month minimum'],
      },
      {
        heading: 'Walk-away trigger',
        items: ['"Walk if seller will not drop $20K — OR if slab cannot be verified before EMD goes hard."'],
      },
    ],
    processSteps: [
      { title: 'Submit the deal', detail: 'Address, photos, and any scope or rehab notes you have.' },
      { title: 'We review', detail: 'Licensed GC reads it, runs the numbers, flags the risks.' },
      { title: 'You get clarity', detail: 'Written review in your inbox in 2 business days.' },
    ],
    testimonials: [
      {
        quote: 'We were about to sink more money in before they walked us through what was actually wrong. Saved us from a bad call.',
        name: 'Madison M.',
        role: 'Broker / Investor',
      },
      {
        quote: 'I needed something concrete to bring back to my buyer, not a maybe. They gave me a straight read and the deal kept moving.',
        name: 'Jethro A.',
        role: 'Wholesaler',
      },
      {
        quote: 'They did not try to sell us a huge scope we did not need. Just told us what to do next and why.',
        name: 'Trisha W.',
        role: 'Investor',
      },
    ],
    notIncluded: [
      'Not a line-item budget audit — see Budget & Scope Review',
      'Not an appraisal or BPO',
      'Not a contractor bid',
      'Not permit filing',
      'Not a guarantee or insurance',
    ],
    valueStack: [
      'Licensed NC GC reads the deal personally',
      'Written review delivered in 2 business days',
      'Rough budget range with confidence levels',
      'Construction risk callouts: structural, permit, scope',
      'Realistic timeline range for the scope and jurisdiction',
      'Walk-away trigger — the condition that should kill the deal',
      'Email follow-up if anything is unclear',
      'Money-back if we cannot give you a clear answer',
    ],
    finalHeadline: "Don't go hard on earnest money blind.",
    finalSubhead: 'One licensed-GC underwriting opinion, 2 business days, $499. Straight answers — even when the answer is do not do this deal.',
    faqs: [
      { q: 'What do you need from me?', a: 'Property address, photos, and any scope or rehab notes you already have.' },
      { q: 'How long does it take?', a: 'Typical turnaround is 2 business days from submission.' },
      { q: 'What do I get back?', a: 'A written underwriting opinion: scope feasibility, rough budget range with confidence levels, construction risks, timeline range, and the walk-away trigger.' },
      { q: 'Will you tell me not to do the deal?', a: 'Yes when the numbers say so. That is the whole point of the product.' },
      { q: 'How precise is the budget number?', a: 'Decision-grade, not bid-grade. A range you can underwrite with (±20%), not a contractor bid sheet. After you close, the Budget & Scope Review gives you line-item precision.' },
      { q: 'Is this for my project type?', a: 'Yes if it is a residential investor deal in NC. Most fix-and-flip, rental, and BRRRR projects qualify.' },
      { q: 'What if I have more questions after?', a: 'Email follow-up is included. Most clients add Budget or Permit reviews once the deal is in motion.' },
    ],
  },
  {
    slug: 'budget-scope-review',
    productKey: 'budget-review',
    ctaLabel: 'Start Budget Review',
    price: '$599',
    priceAnchor: 'A scope gap can cost $40K+',
    priceLabel: 'Budget & Scope Review',
    turnaround: '2 business days',
    audience: 'For residential investors',
    heroEyebrow: 'Budget & Scope Review',
    heroHeadlinePre: 'Know the real',
    heroHeadlineHighlight: 'cost',
    heroHeadlinePost: ' before you cut the check.',
    heroSubheadline:
      'Pressure-test your numbers — a licensed-GC line-by-line audit of your existing budget against current market costs. Works pre-purchase (vetting a pro-forma) or post-purchase (before contractors price it or the lender locks in the draw). In your inbox in 2 business days. $599 flat.',
    problemHeadline: 'Where investor budgets quietly break',
    problemIntro: 'A budget that looks tight on paper falls apart when contractors price it or scope catches up to it.',
    problemCards: [
      { title: 'Budgets miss major scope items', body: 'Important work gets overlooked and costs more later.', tone: 'red' },
      { title: 'Contractor numbers don’t match reality', body: 'Numbers look good until the work actually starts.', tone: 'amber' },
      { title: 'Costs grow halfway through', body: 'Unidentified issues turn into expensive surprises.', tone: 'rose' },
      { title: 'Profit disappears', body: 'The deal on paper does not work in reality.', tone: 'orange' },
    ],
    getHeadline: 'What you actually get',
    getBullets: [
      { title: 'Line-by-line budget read', detail: 'A licensed GC reads the numbers against the real scope.' },
      { title: 'Scope gap identification', detail: 'The items missing from the budget that hit you later.' },
      { title: 'Cost pressure callouts', detail: 'Where the budget is most likely to break and why.' },
      { title: 'Written fix path', detail: 'A clear path to fix the budget before construction starts.' },
    ],
    deliverableTitle: 'Budget & Scope Review',
    deliverableSubtitle: '123 Main St · Charlotte, NC',
    deliverable: [
      {
        heading: 'Scope gaps found',
        items: ['HVAC line missing — add ~$8K', 'Demo + dump fees not included', 'Permit fees absent — $1.4K'],
      },
      {
        heading: 'Line-item corrections',
        items: ['Plumbing: 18% below market — correct to ~$18K', 'Tile allowance light by $4–6K', 'Trim package: scope calls for upgraded, budget assumes builder-grade'],
      },
      {
        heading: 'Risk-weighted reserves',
        items: ['Recommended contingency: 12% for this scope size', 'Hidden-condition reserve: add 8% based on photos'],
      },
      {
        heading: 'Bid-grade summary',
        items: ['Corrected budget total: $86K (was $74K)', 'Take this to contractors and lender before pricing'],
      },
    ],
    processSteps: [
      { title: 'Submit your project', detail: 'Address, photos, scope notes, and the budget or contractor numbers.' },
      { title: 'We review', detail: 'Licensed GC reads the budget against the actual scope and flags the gaps.' },
      { title: 'You get the read', detail: 'Written review in your inbox in 2 business days.' },
    ],
    testimonials: [
      {
        quote: 'Scope and budget were all over the place when we called. After they walked through it, the project actually felt doable again.',
        name: 'Justin R.',
        role: 'Developer',
      },
      {
        quote: 'They caught things we completely missed before we moved forward.',
        name: 'Investor',
        role: 'NC',
      },
      {
        quote: 'They did not try to sell us a huge scope we did not need. Just told us what to do next and why.',
        name: 'Trisha W.',
        role: 'Investor',
      },
    ],
    notIncluded: [
      'Not a pre-purchase go/no-go opinion — see Investor Deal & Scope Review',
      'Not a budget built from scratch — see Contractor-Grade Budget',
      'Not a contractor bid from us',
      'Not a guaranteed price',
      'Not permit submission',
      'Not project management',
    ],
    valueStack: [
      'Licensed NC GC audits your budget personally',
      'Line-by-line budget check against current market costs',
      'Scope gaps identified in writing',
      'Unit-cost corrections per line item',
      'Recommended contingency + hidden-condition reserves',
      'Bid-grade summary number you can hand to contractors',
      'Email follow-up if anything is unclear',
      'Money-back if we cannot give you a clear answer',
    ],
    finalHeadline: 'Catch the gap before the project does.',
    finalSubhead: 'One licensed-GC line-item audit, 2 business days, $599. Get the number right before contractors price it or the lender locks in the draw.',
    faqs: [
      { q: 'What do you need from me?', a: 'Property address, photos, scope notes, and the budget spreadsheet or contractor numbers you want audited.' },
      { q: 'How long does it take?', a: 'Typical turnaround is 2 business days from submission.' },
      { q: 'What do I get back?', a: 'A line-item audit of your budget: scope gaps, market-rate corrections, reserve recommendations, and a corrected bid-grade total.' },
      { q: 'How is this different from the Investor Deal Review?', a: 'The Deal Review is decision-grade — a rough range for underwriting a deal you do not own yet. This is bid-grade — a line-item audit for owners getting ready to build.' },
      { q: 'Is this a contractor bid?', a: 'No. This is a review product. We audit your budget; we do not replace it with our own bid.' },
      { q: 'What if the budget is fine?', a: 'You will get that in writing too. Confidence in a good number is part of what you are paying for.' },
      { q: 'Can you also help fix it?', a: 'Yes. After the review, most clients move into our Planning or Execution support.' },
    ],
  },
  {
    slug: 'contractor-grade-budget',
    productKey: 'contractor-grade-budget',
    ctaLabel: 'Build My Budget',
    price: '$1,799',
    priceAnchor: 'A GC would charge $3K+ to build this themselves',
    priceLabel: 'Contractor-Grade Budget',
    turnaround: '5 business days',
    audience: 'For owners and post-purchase investors',
    heroEyebrow: 'Pre-Construction Budget',
    heroHeadlinePre: 'The budget a',
    heroHeadlineHighlight: 'GC',
    heroHeadlinePost: ' would build for you — without hiring one.',
    heroSubheadline:
      'You own the property (or are committed to closing). You have plans or a clear scope — but no real budget yet. We build it from scratch — full takeoffs, real trade-network unit costs, documented assumptions, bid-ready spreadsheet. 5 business days. $1,799 flat.',
    problemHeadline: 'A vibes-grade budget kills good projects',
    problemIntro: 'Most owners hand contractors a spreadsheet that was put together with Google searches and guesses. The contractor marks it up, you build to it, and the gap shows up mid-project.',
    problemCards: [
      { title: 'Unit costs are off', body: 'Numbers pulled from Google last year do not match current trade pricing.', tone: 'red' },
      { title: 'Scope items get missed', body: 'The line items a GC would have caught from years of estimating.', tone: 'amber' },
      { title: 'Assumptions stay hidden', body: 'Until they break — and now you owe a change order.', tone: 'rose' },
      { title: 'Contractors mark up junk', body: 'Bad inputs produce bid prices that have nothing to do with reality.', tone: 'orange' },
    ],
    getHeadline: 'What you actually get',
    getBullets: [
      { title: 'Full project takeoff', detail: 'Count, sqft, linear footage for each major trade — same as a GC would do.' },
      { title: 'Trade-network unit costs', detail: 'Real current pricing from contractors we work with, not internet estimates.' },
      { title: 'Documented assumptions', detail: 'Every major line has an assumption you can sanity-check.' },
      { title: 'Bid-ready spreadsheet', detail: 'Hand it to contractors or your lender — it is the same shape as a real estimate.' },
    ],
    deliverableTitle: 'Contractor-Grade Budget',
    deliverableSubtitle: '123 Main St · Charlotte, NC',
    deliverable: [
      {
        heading: 'Takeoff sample (kitchen)',
        items: ['Cabinetry: 22 lf base + 18 lf upper', 'Counter: 38 sqft quartz, level 2', 'Floor: 184 sqft LVP'],
      },
      {
        heading: 'Line-item budget',
        items: ['Demo + dump: $4,200', 'Rough plumbing + fixtures: $18,400', 'Electrical (incl. 200A upgrade): $11,800'],
      },
      {
        heading: 'Soft costs + reserves',
        items: ['Contingency: 12% (residential rehab)', 'Soft costs: permits + carrying = 6%', 'Bid-ready total: $94,800'],
      },
    ],
    processSteps: [
      { title: 'Submit your project', detail: 'Plans (if you have them), photos, scope notes, and the location.' },
      { title: 'We build the budget', detail: 'Full takeoff + line-item pricing against current trade-network rates.' },
      { title: 'You get the spreadsheet', detail: 'Bid-ready Excel + written assumptions in your inbox in 5 business days.' },
    ],
    testimonials: [
      {
        quote: "We didn't have to wait on a GC to build the budget. We took the spreadsheet straight to lender and bids.",
        name: 'Trisha W.',
        role: 'Investor',
      },
      {
        quote: 'They caught things we completely missed before we moved forward.',
        name: 'Justin R.',
        role: 'Developer',
      },
      {
        quote: 'I needed something concrete to bring back to my buyer, not a maybe. They gave me a straight read and the deal kept moving.',
        name: 'Jethro A.',
        role: 'Wholesaler',
      },
    ],
    notIncluded: [
      'Not an audit of someone else\'s budget — see Budget & Scope Review',
      'Not a guaranteed contractor bid',
      'Not a site walk (available as add-on)',
      'Not permit submission',
      'Not project management',
    ],
    valueStack: [
      'Licensed NC GC builds the budget personally',
      'Full takeoffs per major trade (count, sqft, lf)',
      'Line-item pricing at current trade-network unit costs',
      'Soft cost + contingency recommendations',
      'Documented assumptions per major line',
      'Bid-ready Excel deliverable',
      'Email follow-up if anything is unclear',
      'Money-back if we cannot give you a clear answer',
    ],
    finalHeadline: 'Stop handing contractors a vibes-grade spreadsheet.',
    finalSubhead: 'One licensed-GC line-item build, 5 business days, $1,799. The budget a GC would write — without paying the GC retainer.',
    faqs: [
      { q: 'Should I buy this before or after closing?', a: 'After. This is a pre-construction product — built for owners (and post-purchase investors) who need a real number to take to contractors and lenders. If you are still deciding whether to buy a deal, use the Investor Deal & Scope Review ($499) instead — it gives you a rough budget range fast enough to fit inside an offer window.' },
      { q: 'How is this different from Budget & Scope Review?', a: 'Budget & Scope Review ($599) AUDITS a budget you already have — corrects line items, flags gaps. Contractor-Grade Budget BUILDS one from scratch with full takeoffs and trade-network pricing. Different starting point, different deliverable, different price.' },
      { q: 'What do you need from me?', a: 'Plans (if you have them), photos, written scope notes, and the property address.' },
      { q: 'How long does it take?', a: 'Typical turnaround is 5 business days from submission.' },
      { q: 'What do I get back?', a: 'A bid-ready Excel spreadsheet with full takeoffs, line-item pricing, soft costs + contingency, and documented assumptions per major line.' },
      { q: 'Do I need plans?', a: 'Plans help, but a clear written scope + photos can work. The clearer the inputs, the tighter the budget.' },
      { q: 'What if my project is huge?', a: 'For projects above ~$500K hard cost or with structural/commercial scope, contact us for a custom quote first.' },
    ],
    comparisonRows: COMPARISON_ROWS_CONTRACTOR_GRADE_BUDGET,
  },
  {
    slug: 'permit-path-review',
    productKey: 'permit-local-compliance-review',
    ctaLabel: 'Start Permit Review',
    price: '$399',
    priceAnchor: 'A permit miss can stall a project 6+ weeks',
    priceLabel: 'Permit Path Review',
    turnaround: '2 business days',
    audience: 'For residential investors',
    heroEyebrow: 'Permit Path Review',
    heroHeadlinePre: 'Find out if it can actually get',
    heroHeadlineHighlight: 'permitted',
    heroHeadlinePost: '.',
    heroSubheadline:
      'A licensed-GC read on permit requirements and approval risk — written, in your inbox, in 2 business days. $399 flat.',
    problemHeadline: "Permit problems hide until they're expensive",
    problemIntro: 'Permit issues rarely show up early. By the time they do, the money is already in.',
    problemCards: [
      { title: 'Permit issues show up mid-build', body: 'Surface after the money is already in.', tone: 'red' },
      { title: 'Local compliance gets missed', body: 'Jurisdiction-specific rules catch outsiders.', tone: 'amber' },
      { title: 'Assumptions collapse on approval', body: 'Project plans break under permitting reality.', tone: 'rose' },
      { title: 'Time and money disappear', body: 'Into rework, redrawing, and resubmissions.', tone: 'orange' },
    ],
    getHeadline: 'What you actually get',
    getBullets: [
      { title: 'Permit path review', detail: 'A licensed GC reads the likely approval path.' },
      { title: 'Local compliance check', detail: 'Jurisdiction-specific risks called out clearly.' },
      { title: 'Approval pressure points', detail: 'Where the project is likely to stall or get denied.' },
      { title: 'Written next steps', detail: 'A clear direction on permit prep before you move further.' },
    ],
    deliverableTitle: 'Permit Path Review',
    deliverableSubtitle: '123 Main St · Charlotte, NC',
    deliverable: [
      {
        heading: 'Permit requirements',
        items: ['Mecklenburg County: 4 permits required', 'Stormwater review: triggered by lot size'],
      },
      {
        heading: 'Approval risk points',
        items: ['Setback variance needed — 60% approval rate', 'Tree ordinance affects rear yard'],
      },
      {
        heading: 'Recommendation',
        items: ['Pre-app meeting before submission', 'Budget 5–7 weeks for full approval'],
      },
    ],
    processSteps: [
      { title: 'Submit the project', detail: 'Address, photos, and a basic scope or rehab plan.' },
      { title: 'We review', detail: 'Licensed GC reads permit and compliance risk against the jurisdiction.' },
      { title: 'You get direction', detail: 'Written review in your inbox in 2 business days.' },
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
      {
        quote: 'They did not try to sell us a huge scope we did not need. Just told us what to do next and why.',
        name: 'Trisha W.',
        role: 'Investor',
      },
    ],
    notIncluded: [
      'Not permit prep or filing',
      'Not a guaranteed approval',
      'Not an inspection',
      'Not architectural drafting',
    ],
    valueStack: [
      'Licensed NC GC reads the permit path personally',
      'Jurisdiction-specific compliance check',
      'Approval risk points flagged in writing',
      'Recommended pre-app strategy if needed',
      'Realistic timeline estimate',
      'Email follow-up if anything is unclear',
      'Money-back if we cannot give you a clear answer',
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
    ctaLabel: 'Start Fit Consultation',
    price: '$349',
    priceAnchor: 'The wrong contractor mix can cost 20%+ of the build',
    priceLabel: 'Contractor Fit & Recommendation',
    turnaround: 'Scheduled call',
    audience: 'For residential investors',
    heroEyebrow: 'Contractor Fit & Recommendation',
    heroHeadlinePre: 'Know what kinds of',
    heroHeadlineHighlight: 'contractors',
    heroHeadlinePost: ' this project actually needs.',
    heroSubheadline:
      'A licensed-GC read on the mix of contractors that fits — GC vs subs vs handyman, which specialty trades, what license level — and the reasoning behind every call. $349 flat.',
    problemHeadline: 'The wrong contractor mix is the most expensive mistake',
    problemIntro: 'Most projects need more than one contractor. Picking the wrong mix — too much GC, too little specialty, the wrong license level — costs more than picking a bad individual.',
    problemCards: [
      { title: 'Handyman on a permit job', body: 'Work gets red-tagged at inspection.', tone: 'red' },
      { title: 'Full GC on a 2-trade scope', body: 'GC overhead eats margin you did not need to spend.', tone: 'amber' },
      { title: 'Generalist on a specialty job', body: 'You pay for their learning curve on your dime.', tone: 'rose' },
      { title: 'Missing a specialty entirely', body: 'A trade gets bolted on late, doubling its cost.', tone: 'orange' },
    ],
    getHeadline: 'What you actually get',
    getBullets: [
      { title: 'Contractor mix recommendation', detail: 'Which contractors this project actually needs — GC, specialty subs, generalists — and at what license level.' },
      { title: 'Reasoning, in writing', detail: 'Why each contractor type fits — not just what.' },
      { title: 'Wrong-fit callouts', detail: 'Which contractor types to avoid for this specific project.' },
      { title: 'Hiring direction', detail: 'What to look for in candidates for each role you need to fill.' },
    ],
    deliverableTitle: 'Contractor Fit & Recommendation',
    deliverableSubtitle: '123 Main St · Charlotte, NC',
    deliverable: [
      {
        heading: 'Recommended contractor mix',
        items: ['Licensed NC GC with permit-admin capability', 'Specialty subs needed: framing + HVAC', 'Generalist sub OK for: paint, flooring'],
      },
      {
        heading: 'Why this mix',
        items: ['Permit complexity rules out unlicensed work', 'Scope size justifies GC overhead', 'Two specialty trades > generalist range'],
      },
      {
        heading: 'Contractors to avoid',
        items: ['Out-of-area generalist (no permit familiarity)', 'Handyman crew (will not pass inspection)'],
      },
    ],
    processSteps: [
      { title: 'Submit the project', detail: 'Address, photos, scope notes, and any project context.' },
      { title: 'We assess fit', detail: 'Licensed GC reads the project against contractor-mix options.' },
      { title: 'You get the call', detail: 'Working consultation + written recommendation within 1 business day.' },
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
      {
        quote: 'I needed something concrete to bring back to my buyer, not a maybe. They gave me a straight read and the deal kept moving.',
        name: 'Jethro A.',
        role: 'Wholesaler',
      },
    ],
    notIncluded: [
      'Not comparing specific named contractors',
      'Not bid review',
      'Not contractor sourcing or recruitment',
      'Not project management',
    ],
    valueStack: [
      'Working call with a licensed NC GC',
      'Contractor-mix recommendation (kinds, license levels, specialties)',
      'Written reasoning explaining each role',
      'Wrong-fit contractors to avoid',
      'Hiring direction for what to look for at each role',
      'Email follow-up if anything is unclear',
      'Money-back if we cannot give you a clear answer',
    ],
    finalHeadline: 'Hire the right kinds of contractors.',
    finalSubhead: 'One licensed-GC consultation, written follow-up, $349. Know the contractor mix — and why — before you start interviewing.',
    faqs: [
      { q: 'What do you need from me?', a: 'Project address, photos, scope notes, and any context about the project.' },
      { q: 'How long does it take?', a: 'A scheduled consultation followed by written direction within 1 business day.' },
      { q: 'What do I get back?', a: 'A contractor-mix recommendation (what kinds of contractors fit) plus the reasoning behind each role and the wrong-fit types to avoid.' },
      { q: 'Is this comparing specific contractors?', a: 'No. This tells you what KINDS of contractors fit — GC, subs, specialists, generalists, license level — not which named candidates are best. Comparing bids is a separate engagement (see Contractor Match & Bid Coordination, or bundle the two together below).' },
      { q: 'Is this contractor sourcing?', a: 'No — but you can bundle this with our Contractor Match & Bid Coordination service for $300 off.' },
      { q: 'Can you run the project after?', a: 'Yes. Our Owner-Controlled Build and Full Execution options pick up from here.' },
    ],
    addOnBundle: {
      eyebrow: 'Bundle and save $300',
      heading: 'Pair with Contractor Match & Bid Coordination',
      description: 'Once we tell you what kinds of contractors you need, the next move is to actually go find them. Bundle Contractor Fit Consultation ($349) + Contractor Match & Bid Coordination (normally $1,499) for $1,548 — save $300.',
      bullets: [
        'Contractor Fit Consultation — we tell you what contractor mix this project actually needs',
        'Contractor Match & Bid Coordination — we go source, bid, and level vetted candidates for you',
        '$300 off vs buying separately',
        'Both kicked off in the same intake — no second form',
      ],
      bundleProductKey: 'fit-plus-match-bundle',
      bundleLabel: 'Add Bundle — $1,548 (save $300)',
      bundlePriceLabel: '$1,548 bundle · normally $1,848',
      savingsBadge: 'Save $300',
    },
  },
  {
    slug: 'draw-review',
    productKey: 'draw-review-support',
    ctaLabel: 'Start Draw Review',
    price: '$399',
    priceAnchor: 'Once the money’s out, leverage is gone',
    priceLabel: 'Draw Review Support',
    turnaround: '2 business days',
    audience: 'For residential investors',
    heroEyebrow: 'Draw Review Support',
    heroHeadlinePre: 'Review the draw before the',
    heroHeadlineHighlight: 'money',
    heroHeadlinePost: ' goes out.',
    heroSubheadline:
      'A licensed-GC check on whether payment actually matches progress — written, in your inbox, in 2 business days. $399 flat.',
    problemHeadline: 'Once the money is out, leverage goes with it',
    problemIntro: "By the time you notice an issue, the contractor's already moved on.",
    problemCards: [
      { title: 'You overpay before work warrants it', body: 'Cash goes out faster than the project moves.', tone: 'red' },
      { title: 'Incomplete work slips through', body: 'Soft documentation hides what’s actually done.', tone: 'amber' },
      { title: 'Money releases on weak proof', body: 'No real check between progress and payment.', tone: 'rose' },
      { title: 'Leverage disappears with the funds', body: 'After the money is gone, so is your pressure point.', tone: 'orange' },
    ],
    getHeadline: 'What you actually get',
    getBullets: [
      { title: 'Draw review', detail: 'Licensed GC reads the request against the work shown.' },
      { title: 'Progress vs payment check', detail: 'Whether the dollar amount actually matches the build.' },
      { title: 'Risk identification', detail: 'What’s incomplete, out of sequence, or worth pushing back on.' },
      { title: 'Written direction', detail: 'A clear next step before you release the funds.' },
    ],
    deliverableTitle: 'Draw Review Support',
    deliverableSubtitle: 'Draw #3 · 123 Main St · Charlotte, NC',
    deliverable: [
      {
        heading: 'Progress vs payment',
        items: ['Rough-in: 60% complete, draw shows 80%', 'Drywall: not started, included in draw'],
      },
      {
        heading: 'Documentation gaps',
        items: ['No photos for electrical rough-in', 'Inspection sign-off missing'],
      },
      {
        heading: 'Recommendation',
        items: ['Hold $9.2K from this draw', 'Request photos + inspection before release'],
      },
    ],
    processSteps: [
      { title: 'Submit the draw', detail: 'Draw request, photos, scope/rehab plan, payment schedule.' },
      { title: 'We review', detail: 'Licensed GC reads progress against payment and flags what’s soft.' },
      { title: 'You get direction', detail: 'Written review in your inbox in 2 business days.' },
    ],
    testimonials: [
      {
        quote: 'Permits and paperwork were eating up my week. They took it off my plate and the jobs stopped stalling.',
        name: 'Taquan P.',
        role: 'Wholesaler',
      },
      {
        quote: 'We were about to sink more money in before they walked us through what was actually wrong. Saved us from a bad call.',
        name: 'Madison M.',
        role: 'Broker / Investor',
      },
      {
        quote: 'They did not try to sell us a huge scope we did not need. Just told us what to do next and why.',
        name: 'Trisha W.',
        role: 'Investor',
      },
    ],
    notIncluded: [
      'Not lender approval',
      'Not a legal opinion',
      'Not project management',
      'Not a guarantee on contractor work',
    ],
    valueStack: [
      'Licensed NC GC reads the draw personally',
      'Progress vs payment check in writing',
      'Documentation gap identification',
      'Specific hold-back recommendation',
      'Push-back language for the contractor',
      'Email follow-up if anything is unclear',
      'Money-back if we cannot give you a clear answer',
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
  {
    slug: 'due-diligence-bundle',
    productKey: 'due-diligence-bundle',
    ctaLabel: 'Add Bundle to Cart',
    price: '$1,499',
    priceAnchor: 'Individual reviews total $1,846 — bundle saves ~$347',
    priceLabel: 'Due Diligence Bundle',
    turnaround: '2–4 business days',
    audience: 'For residential investors evaluating a deal',
    heroEyebrow: 'Due Diligence Bundle',
    heroHeadlinePre: 'Four licensed-GC reviews of your',
    heroHeadlineHighlight: 'deal',
    heroHeadlinePost: ' — before earnest money goes hard.',
    heroSubheadline:
      'Does the construction actually pencil? Will the budget survive contact with reality? Can it get permitted in this jurisdiction? What kind of contractors will the job take? Four questions, four reads, one combined report — before earnest money goes hard. $1,499 flat.',
    problemHeadline: 'One review is a guess. Four reviews is a decision.',
    problemIntro: 'Investors who buy a single $499 deal review get a useful opinion. Investors who run all four reads catch things any one of them would miss.',
    problemCards: [
      { title: 'Scope risk hides from a budget review', body: 'Numbers can look fine while the scope is wrong for the property.', tone: 'red' },
      { title: 'Permits hide from a scope review', body: 'A clean scope can still die at the permit counter.', tone: 'amber' },
      { title: 'Contractor mix hides from a permit review', body: 'You can be permitted to do the wrong work with the wrong people.', tone: 'rose' },
      { title: 'Budget reality hides from a contractor read', body: 'The right team building to the wrong number still loses money.', tone: 'orange' },
    ],
    getHeadline: 'Every review, on the same deal, in one engagement',
    getBullets: [
      { title: 'Investor Deal & Scope Review ($499)', detail: 'Scope feasibility, rough budget range with confidence, risk callouts, and walk-away trigger.' },
      { title: 'Budget & Scope Review ($599)', detail: 'Line-item audit of any budget or pro-forma you have, against current market costs.' },
      { title: 'Permit & Local Compliance Review ($399)', detail: 'Likely permit path, compliance risk, and approval timeline for the jurisdiction.' },
      { title: 'Contractor Fit Consultation ($349)', detail: 'What kinds of contractors this project actually needs, and why.' },
    ],
    deliverableTitle: 'Due Diligence Bundle',
    deliverableSubtitle: '123 Main St · Charlotte, NC',
    deliverable: [
      { heading: 'Deal & scope read', items: ['Budget range: $95K–$135K (high confidence on kitchen/bath, low on structural)', 'Walk-away trigger: "If seller will not drop $20K"'] },
      { heading: 'Budget audit', items: ['Existing pro-forma off by ~$12K on plumbing', 'HVAC line missing entirely from seller numbers'] },
      { heading: 'Permit path', items: ['Wake County: 6–8 week residential queue', 'ADU likely needs zoning variance'] },
      { heading: 'Contractor fit', items: ['Licensed GC with permit-admin capability required', 'Specialty subs: framing + HVAC; generalist OK on paint/floor'] },
    ],
    processSteps: [
      { title: 'Submit the deal', detail: 'Address, photos, MLS sheet, your scope notes, any existing budget or contractor numbers.' },
      { title: 'We run all four reviews', detail: 'A licensed NC GC works the file across all four angles at once.' },
      { title: 'You get one combined report', detail: 'Each section addresses one of the four reviews, with a single go / renegotiate / walk recommendation at the top.' },
    ],
    testimonials: [
      { quote: 'We were about to sink more money in before they walked us through what was actually wrong. Saved us from a bad call.', name: 'Madison M.', role: 'Broker / Investor' },
      { quote: 'I needed something concrete to bring back to my buyer, not a maybe. They gave me a straight read and the deal kept moving.', name: 'Jethro A.', role: 'Wholesaler' },
      { quote: 'They did not try to sell us a huge scope we did not need. Just told us what to do next and why.', name: 'Trisha W.', role: 'Investor' },
    ],
    notIncluded: [
      'Not a contractor-grade budget built from scratch (see Contractor-Grade Budget — $1,799 — after close)',
      'Not contractor bids or sourcing',
      'Not permit submission',
      'Not appraisal or BPO',
    ],
    valueStack: [
      'All four pre-acquisition reviews on the same deal',
      'Written across one combined report',
      'One licensed NC GC reviews everything personally',
      '2–4 business day combined turnaround',
      'Single go / renegotiate / walk recommendation',
      'Email follow-up if anything is unclear',
      '$1,499 flat — same price every deal',
    ],
    finalHeadline: 'Decide with all four reads, not one.',
    finalSubhead: 'Four licensed-GC reviews on one deal, bundled. $1,499 flat. Add the bundle to cart and complete checkout in two minutes.',
    faqs: [
      { q: 'Is this really $1,499 flat?', a: 'Yes — $1,499 flat for any standard residential investor deal in NC. Multi-unit or commercial-grade conversions push into custom pricing; we will let you know on the intake if your deal falls in that bucket and refund the difference, or quote up if more scope is needed.' },
      { q: 'Can I buy just one review instead?', a: 'Yes. Each individual review is purchasable on its own at the prices listed. The bundle is for investors who want every angle covered and saves ~$347 vs buying them separately.' },
      { q: 'How fast?', a: 'Typical turnaround is 2–4 business days for the combined report — slower than a single review because there are four reads to coordinate.' },
      { q: 'What do you need from me?', a: 'Property address, photos, MLS sheet (if available), your stated scope, and any existing budget or contractor numbers.' },
      { q: 'What is the deliverable?', a: 'One combined PDF with four sections (one per review) and a single top-of-document recommendation.' },
      { q: 'Can I move into project setup after?', a: 'Yes — most investors who close on a deal we reviewed move into the Project Setup Bundle.' },
    ],
    comparisonRows: COMPARISON_ROWS_DUE_DILIGENCE_BUNDLE,
  },
  {
    slug: 'project-setup-bundle',
    fallbackHref: '#quote-form',
    ctaLabel: 'Request Custom Quote',
    price: 'Starting at $2,500',
    priceAnchor: 'Most-bought bundle — sets up an investor project to win',
    priceLabel: 'Project Setup Bundle',
    turnaround: '7–14 business days',
    audience: 'For investors closing on a deal',
    heroEyebrow: 'Project Setup Bundle',
    heroHeadlinePre: 'Set the project up to',
    heroHeadlineHighlight: 'win',
    heroHeadlinePost: ' before construction starts.',
    heroSubheadline:
      'What does this actually cost to build? What\'s the real timeline? Who\'s filing the permits? Who\'s going to build it? When does money move and from where? Everything answered before the first hammer swings — so the project starts where it should, not where you\'d be six weeks in trying to fix it. Starting at $2,500.',
    problemHeadline: 'The first 30 days decides the next 90',
    problemIntro: 'Projects that get into trouble usually started in trouble. Weak scope, vague timeline, unprepared permits, random bids, and no draw schedule create execution drag that compounds month over month.',
    problemCards: [
      { title: 'Scope drifts because no one wrote it down', body: 'Then change orders eat the margin.', tone: 'red' },
      { title: 'Permits get filed late', body: 'And the project waits six weeks for approval.', tone: 'amber' },
      { title: 'Bids come back incomparable', body: 'And you award to whoever called first instead of who fit best.', tone: 'rose' },
      { title: 'Cashflow gets reactive', body: 'And you scramble for draws instead of pulling them on schedule.', tone: 'orange' },
    ],
    getHeadline: 'Everything the project needs to start clean',
    getBullets: [
      { title: 'Contractor-Grade Budget ($1,799)', detail: 'Built from scratch — takeoffs, trade-priced unit costs, bid-ready spreadsheet.' },
      { title: 'Scope & Timeline Setup', detail: 'Written scope of work and realistic timeline for this scope + this jurisdiction.' },
      { title: 'Permit Administration', detail: 'Submission, correction handling, and inspection scheduling.' },
      { title: 'Contractor Match & Bid Coordination ($1,499)', detail: 'Vetted candidates sourced, structured bid intake, leveled comparison, award recommendation.' },
      { title: 'Cashflow Schedule', detail: 'Draw schedule that lines up with lender expectations and real progress milestones.' },
    ],
    deliverableTitle: 'Project Setup Bundle',
    deliverableSubtitle: '123 Main St · Charlotte, NC',
    deliverable: [
      { heading: 'Budget + scope', items: ['Bid-ready Excel with full takeoffs', 'Written scope of work (10–15 pages)', '$94,800 corrected total'] },
      { heading: 'Permit + timeline', items: ['Permits filed week 1', 'Inspections scheduled in advance', '14-week realistic timeline'] },
      { heading: 'Contractor selection', items: ['3 GC candidates sourced, vetted, bid', 'Leveled side-by-side comparison', 'Award recommendation: Bid 3 (best scope, mid-price)'] },
      { heading: 'Cashflow', items: ['8-draw schedule aligned to milestones', 'Lender-friendly format', 'Hard-cost vs soft-cost split documented'] },
    ],
    processSteps: [
      { title: 'Kickoff call', detail: 'You give us the scope, timeline expectations, lender contact, and any plans or photos.' },
      { title: 'We build everything', detail: 'Budget, scope, timeline, permits, bid coordination, and cashflow — over 1–2 weeks while you focus on closing.' },
      { title: 'You start construction', detail: 'Everything is set up before the first hammer swings. Award the contractor, file the permits, kick off the schedule.' },
    ],
    testimonials: [
      { quote: 'They caught things we completely missed before we moved forward.', name: 'Justin R.', role: 'Developer' },
      { quote: 'Scope and budget were all over the place when we called. After they walked through it, the project actually felt doable again.', name: 'Justin R.', role: 'Developer' },
      { quote: 'We just needed help on one piece, not a full build out. They stuck to what we asked for and did not push extras.', name: 'Iantha M.', role: 'Investor' },
    ],
    notIncluded: [
      'Not contractor performance during construction (see Execution Support Bundle)',
      'Not a guaranteed contractor bid',
      'Not project management of the actual build',
      'Not lender introductions',
    ],
    valueStack: [
      'Five planning products bundled in one engagement',
      'Bid-ready budget built from scratch',
      'Written scope of work + realistic timeline',
      'Permit administration through approval',
      'Vetted contractor candidates + leveled bids',
      'Cashflow schedule aligned to lender + milestones',
      'One licensed NC GC owns the engagement',
      'Custom quote based on project scale — starts at $2,500',
    ],
    finalHeadline: 'Walk into construction with the work already done.',
    finalSubhead: 'Five planning deliverables, bundled. Starting at $2,500 — request a custom quote based on your project.',
    faqs: [
      { q: 'Why is this not flat-priced?', a: 'Project scale matters — a single-family rehab gets the $2,500 floor; a multi-unit or new-build pushes into custom pricing. Most residential investor projects stay at or near the floor.' },
      { q: 'Can I buy just one piece?', a: 'Yes. Each component is purchasable individually at the prices listed. The bundle is for investors who want the entire first-30-day setup handled.' },
      { q: 'How long until we kick off construction?', a: 'Typical timeline is 2–4 weeks from kickoff to "ready to swing hammers" — depends on permit jurisdiction and bid response time.' },
      { q: 'What do you need from me?', a: 'Property address, plans (if available), photos, stated scope, lender contact, and your timeline expectations.' },
      { q: 'Can you also run the project after?', a: 'Yes — Execution Support Bundle picks up from here. Most investors who buy Project Setup move into Execution Support.' },
      { q: 'Do you do new construction?', a: 'Yes, but new construction usually pushes into custom pricing above the $2,500 floor.' },
    ],
    comparisonRows: COMPARISON_ROWS_PROJECT_SETUP_BUNDLE,
  },
  {
    slug: 'execution-support-bundle',
    fallbackHref: '#quote-form',
    ctaLabel: 'Request Custom Quote',
    price: 'Starting at $3,500',
    priceAnchor: 'Project oversight + draw control + full contracting available',
    priceLabel: 'Execution Support Bundle',
    turnaround: 'Monthly engagement',
    audience: 'For investors with an active project',
    heroEyebrow: 'Execution Support Bundle',
    heroHeadlinePre: 'Stay in',
    heroHeadlineHighlight: 'control',
    heroHeadlinePost: ' while the job runs.',
    heroSubheadline:
      'Who\'s watching the field? Is the contractor billing for work actually done? Is the project on schedule? Are inspections getting handled? Site visits, draw reviews, progress checks, and permit follow-through — so an active project doesn\'t quietly drift while nobody\'s looking. Full GC contracting available if you want us to run it ourselves. Starting at $3,500.',
    problemHeadline: 'Active projects drift fast without follow-through',
    problemIntro: 'Even a well-planned project loses money mid-build when nobody is watching the field, the bills, and the contractor in real time.',
    problemCards: [
      { title: 'Progress invoices outpace progress', body: 'And the lender funds work that is not done.', tone: 'red' },
      { title: 'Scope changes go undocumented', body: 'And come back as surprise change orders.', tone: 'amber' },
      { title: 'Inspections get missed', body: 'And the schedule slips a week per inspection.', tone: 'rose' },
      { title: 'The contractor disappears mid-phase', body: 'And nobody is watching to catch it until draw #3.', tone: 'orange' },
    ],
    getHeadline: 'Ongoing oversight that catches drift early',
    getBullets: [
      { title: 'Construction Oversight', detail: 'Site visits, progress checks, and a licensed NC GC watching the field.' },
      { title: 'Draw Review Support ($399 each)', detail: 'Every draw checked against actual work before payment goes out.' },
      { title: 'Progress Monitoring', detail: 'Documented progress photos, written status against schedule.' },
      { title: 'Bid Coordination', detail: 'Mid-project sub bidding if anything new comes up that needs sourced.' },
      { title: 'Permit Handling', detail: 'Inspection scheduling and correction handling during the build.' },
      { title: 'Full Contracting Available', detail: 'If you want us to take over as GC of record, that option is available within the engagement.' },
    ],
    deliverableTitle: 'Execution Support Bundle',
    deliverableSubtitle: 'Monthly engagement · 123 Main St',
    deliverable: [
      { heading: 'Monthly site visits', items: ['Two site visits per month minimum', 'Photo documentation per visit', 'Field notes against the timeline'] },
      { heading: 'Every draw reviewed', items: ['Draw 1: $14K approved — fully aligned to work', 'Draw 2: $18K → $12K (paint not started)', 'Hold-back rationale documented for the lender'] },
      { heading: 'Progress reporting', items: ['Weekly status email to the owner', 'Schedule slip-risk flagged early', 'Change-order tracking and approval workflow'] },
      { heading: 'Escalation triggers', items: ['Contractor non-performance: 5-day notice + escalation path', 'Inspection failure: same-day correction plan'] },
    ],
    processSteps: [
      { title: 'Engagement scoping', detail: 'Working call to confirm what level of support fits — advisory only, hybrid GC-of-record, or full contracting.' },
      { title: 'Monthly engagement begins', detail: 'Site visits, draw reviews, and progress reporting start week 1. Engagement runs as long as the project is active.' },
      { title: 'Project completion + handoff', detail: 'Final inspection coordination, lien-release coordination, and project closeout reporting.' },
    ],
    testimonials: [
      { quote: 'Permits and paperwork were eating up my week. They took it off my plate and the jobs stopped stalling.', name: 'Taquan P.', role: 'Wholesaler' },
      { quote: 'They caught things we completely missed before we moved forward.', name: 'Justin R.', role: 'Developer' },
      { quote: 'We were about to sink more money in before they walked us through what was actually wrong. Saved us from a bad call.', name: 'Madison M.', role: 'Broker / Investor' },
    ],
    notIncluded: [
      'Not a one-time review — this is a monthly engagement',
      'Not free contractor replacement (replacement is a separate scope if needed)',
      'Not insurance, bonding, or legal representation',
    ],
    valueStack: [
      'Monthly active oversight by a licensed NC GC',
      'Every draw reviewed before payment',
      'Site visits + written progress reports',
      'Change-order tracking and approval workflow',
      'Permit + inspection coordination throughout the build',
      'Escalation path for contractor non-performance',
      'Full GC contracting available if scope grows',
      'Custom quote based on project scale + engagement level — starts at $3,500',
    ],
    finalHeadline: 'Don\'t walk an active project alone.',
    finalSubhead: 'Monthly oversight, draw control, and full contracting available. Starting at $3,500 — request a custom quote based on your project.',
    faqs: [
      { q: 'Why is this not flat-priced?', a: 'Engagement level varies — advisory-only is at the $3,500 floor; hybrid GC-of-record is higher; full contracting is the highest tier. Project scale (size, duration, complexity) also moves the number.' },
      { q: 'Is this monthly or one-time?', a: 'Monthly. The engagement runs as long as the project is active. Most investor rehab projects run 3–6 months end to end.' },
      { q: 'What is the "Full Contracting Available" option?', a: 'If you decide mid-project you want us to take over as GC of record (handle permits, manage subs, run the build directly), that path is available within this engagement. Pricing adjusts when it kicks in.' },
      { q: 'How is this different from buying a contractor?', a: 'A contractor builds. We watch the contractor. Sometimes those are the same person (Full Contracting). Sometimes not (Oversight only). We are licensed to do both.' },
      { q: 'Can I add this mid-project?', a: 'Yes. We onboard mid-project regularly — typical first month is heavier (catch-up review) then settles into a normal monthly cadence.' },
      { q: 'What about scope changes?', a: 'We document every change, get owner sign-off in writing before approval, and update the budget + schedule.' },
    ],
    comparisonRows: COMPARISON_ROWS_EXECUTION_SUPPORT_BUNDLE,
  },
  {
    slug: 'phased-third-party-inspections',
    fallbackHref: '#quote-form',
    ctaLabel: 'Request Inspection Plan',
    price: 'Per-phase pricing',
    priceAnchor: 'A failed inspection or paused draw costs weeks — and the wall has to come back open',
    priceLabel: 'Phased Third-Party Inspections',
    turnaround: 'Inspections scheduled per phase',
    audience: 'For investors using outside contractors',
    heroEyebrow: 'Phased Third-Party Inspections',
    heroHeadlinePre: 'Catch problems before they fail an',
    heroHeadlineHighlight: 'inspection',
    heroHeadlinePost: '.',
    heroSubheadline:
      "When your contractor's done with a phase, a licensed NC general contractor comes by, looks at the work, and writes you a report — with photos and an issue list. Catches problems before the AHJ inspector red-tags it or your lender pauses the draw, when fixing them is still cheap.",
    problemHeadline: 'What goes wrong without phased eyes on the work',
    problemIntro: 'Construction problems compound. The cheapest moment to fix them is the moment they were created — but that moment passes fast, and most owners only find out weeks later.',
    problemCards: [
      { title: 'Foundation defects hide until framing', body: 'Slab off-level discovered when walls go up. Add weeks of rework.', tone: 'red' },
      { title: 'Bad rough-in gets buried in drywall', body: 'Missing GFCI, unsupported duct, plumbing slope wrong — closed up before anyone catches it.', tone: 'amber' },
      { title: 'AHJ inspector red-tags the work', body: 'And the contractor swore it was done correctly. Reschedule the inspection, lose a week.', tone: 'rose' },
      { title: 'Lender pauses the draw', body: 'Because the progress photos don\'t match the invoice. Now cashflow is tight.', tone: 'orange' },
    ],
    getHeadline: 'What you actually get',
    getBullets: [
      { title: 'Licensed NC GC personally inspects', detail: 'Not a checklist-only inspector — someone who knows what to look for at each phase because they\'ve built it.' },
      { title: 'Per-phase visits scheduled around your build', detail: 'Foundation, framing, pre-drywall, final — or whatever cadence fits the project.' },
      { title: 'Written report + photo documentation', detail: 'Every issue documented, photographed, and rated by severity (critical, important, cosmetic).' },
      { title: 'Remediation recommendations', detail: 'Not just "this is wrong" — what specifically needs to happen, in what order.' },
    ],
    deliverableTitle: 'Phased Third-Party Inspections',
    deliverableSubtitle: '123 Main St · Charlotte, NC',
    deliverable: [
      {
        heading: 'Phase 1 — Foundation (sample)',
        items: ['Slab level within ±¼" tolerance ✓', 'Anchor bolts placed correctly ✓', 'Vapor barrier intact ✓', 'CRITICAL: Slab cracked at southwest corner — investigate before framing'],
      },
      {
        heading: 'Phase 2 — Framing (sample)',
        items: ['IMPORTANT: 3 studs out-of-plumb at NE corner', 'Header missing for window 4 — must add before drywall', 'Double top-plate gap at east wall — fill before sheathing'],
      },
      {
        heading: 'Phase 3 — Pre-drywall MEP (sample)',
        items: ['Plumbing rough-in: passes ✓', 'CRITICAL: Kitchen missing GFCI on island circuit', 'HVAC duct unsupported in attic span — strap before drywall'],
      },
      {
        heading: 'Phase 4 — Final (sample)',
        items: ['Punch list: 12 items, 9 cosmetic, 3 functional', 'COSMETIC: Paint touchup at trim transitions', 'FUNCTIONAL: Bathroom exhaust fan venting into attic — must vent to exterior'],
      },
    ],
    processSteps: [
      { title: 'Tell us the project', detail: 'Address, contractor name, scope, expected build duration, and which phases you want inspected.' },
      { title: 'We schedule per phase', detail: 'When your contractor finishes a phase, ping us — we schedule the inspection within 1–2 business days.' },
      { title: 'You get the report', detail: 'Written report with photos, issue list with severity ratings, and remediation notes — emailed within 24 hours of the inspection.' },
    ],
    testimonials: [
      { quote: 'They caught things we completely missed before we moved forward.', name: 'Justin R.', role: 'Developer' },
      { quote: 'We were about to sink more money in before they walked us through what was actually wrong. Saved us from a bad call.', name: 'Madison M.', role: 'Broker / Investor' },
      { quote: 'Permits and paperwork were eating up my week. They took it off my plate and the jobs stopped stalling.', name: 'Taquan P.', role: 'Wholesaler' },
    ],
    notIncluded: [
      'Not official permit / AHJ inspections — those are still the jurisdiction\'s job',
      'Not contractor management or supervision — see Construction Oversight',
      'Not repair work — we identify, your contractor fixes',
      'Not daily site presence — discrete per-phase visits only',
    ],
    valueStack: [
      'Licensed NC GC personally inspects each phase',
      'Written report + photo documentation per phase',
      'Issue list rated by severity (critical / important / cosmetic)',
      'Remediation recommendations per issue',
      'Inspection scheduled within 1–2 business days of phase completion',
      'Report delivered within 24 hours of inspection',
      'Email follow-up if anything is unclear',
      'Per-phase pricing — pay only for what you inspect',
    ],
    finalHeadline: "Don't let a phase slip past unchecked.",
    finalSubhead: 'Per-phase inspections that catch construction defects before they cost weeks and dollars. Request a custom inspection plan based on your build.',
    faqs: [
      { q: 'How is this different from the city/county inspector?', a: 'They check code compliance — the legally-required minimum. We check construction quality — workmanship, durability, and whether the work will actually function correctly over time. Two different jobs. We catch problems BEFORE the AHJ inspector sees them, so by the time they show up your work passes.' },
      { q: 'How is this different from Construction Oversight?', a: 'Construction Oversight is broader project management — schedule, scope, draw coordination, contractor accountability. Phased Inspections is narrower — just the quality check at each phase. Cheaper, lighter touch, fewer touchpoints. Good if your contractor is competent and you mainly want quality assurance.' },
      { q: 'How many phases do most projects need?', a: '3–5 is typical. Foundation, framing, pre-drywall MEP, and final at minimum. We scope to your build during the intake — some projects add a roofing or exterior phase.' },
      { q: 'What if I\'m the contractor (DIY/owner-builder)?', a: 'Even better — extra eyes catch your own blind spots. Many owner-builders bring us in specifically so they can sign off on their own work with confidence.' },
      { q: 'What if you find something serious?', a: 'You get the report with severity ratings. Critical issues are flagged clearly. We don\'t fix them — that\'s the contractor\'s job — but the report gives you (and your lender, if relevant) documented grounds to require correction before the next draw releases.' },
      { q: 'Can you also schedule the inspections with the AHJ?', a: 'Not as part of this service — that\'s Permit Administration. The two services pair well: we handle official permits + inspections through Permit Admin, and quality inspections through this service.' },
      { q: 'Do you do this outside North Carolina?', a: 'NC residential only right now. The licensed-GC value comes from familiarity with NC code and AHJ practices — we\'d be guessing in other markets.' },
    ],
    comparisonRows: COMPARISON_ROWS_PHASED_INSPECTIONS,
  },
  {
    slug: 'same-day-quick-read',
    productKey: 'inspection-response-service',
    ctaLabel: 'Start My Same-Day Read',
    price: '$199',
    priceAnchor: 'Most deals die because nobody got construction-side answers fast enough',
    priceLabel: 'Same-Day Quick Read',
    turnaround: '4 hours during business hours',
    audience: 'For real estate agents with deals on the clock',
    heroEyebrow: 'Same-Day Quick Read',
    heroHeadlinePre: 'Inspection issues threatening the',
    heroHeadlineHighlight: 'deal',
    heroHeadlinePost: ' today?',
    heroSubheadline:
      'A licensed NC general contractor reads the inspection report within 4 hours, ranks every flagged item critical-vs-cosmetic, gives you rough repair cost ranges, and recommends how to respond — so you can move the conversation today instead of losing the deal tomorrow.',
    problemHeadline: 'Why deals die on the clock',
    problemIntro: 'Most blown deals are not blown by the inspection itself — they\'re blown by the agent not having a fast construction-side answer when the buyer panics.',
    problemCards: [
      { title: 'Buyer reads inspection report, panics', body: 'Cosmetic items get treated as critical. Now they want $15K credit.', tone: 'red' },
      { title: 'You don\'t know what is fair', body: 'No construction context = no credible counter. Deal drifts.', tone: 'amber' },
      { title: 'Contractor friend takes 3 days to reply', body: 'By then the buyer\'s already shopping other listings.', tone: 'rose' },
      { title: 'Deal dies on cosmetic noise', body: 'The actual structural items get drowned out by the long list of "issues."', tone: 'orange' },
    ],
    getHeadline: 'What you actually get within 4 hours',
    getBullets: [
      { title: 'Critical-vs-cosmetic triage', detail: 'Every flagged item rated by severity. Five critical items beat fifty cosmetic ones for the conversation.' },
      { title: 'Rough cost ranges per issue', detail: 'Not contractor-bid precise. Enough to anchor what concession is reasonable.' },
      { title: 'Response-path recommendation', detail: 'A clear written recommendation: counter at X, walk away from Y, ask seller to fix Z.' },
      { title: 'Licensed NC GC read', detail: 'Real construction perspective, not a generalist inspector\'s vibe-read.' },
    ],
    deliverableTitle: 'Same-Day Quick Read',
    deliverableSubtitle: '123 Main St · Charlotte, NC',
    deliverable: [
      { heading: 'Critical issues (3)', items: ['Foundation crack east wall — structural likely', 'HVAC: 2010 unit, end of life', 'Roof: 18+ years, replacement coming'] },
      { heading: 'Cosmetic / negotiable (12)', items: ['Paint chips, dated fixtures, cabinet wear, etc.', 'None should kill the deal'] },
      { heading: 'Rough costs', items: ['Foundation: $4K–8K to investigate + repair', 'HVAC replacement: $8K–14K', 'Roof: $14K–22K (depending on slope)'] },
      { heading: 'Response recommendation', items: ['"Counter buyer at $15K credit toward HVAC + roof — those are the real items. Decline structural until we get a foundation inspector to confirm severity."'] },
    ],
    processSteps: [
      { title: 'Send the inspection report', detail: 'Email or upload the PDF. Include the property address and any seller context.' },
      { title: 'We triage within 4 hours', detail: 'A licensed NC GC reads it, rates severity, estimates costs, and writes the response recommendation.' },
      { title: 'You get the report by email', detail: 'PDF deliverable in your inbox same business day — ready to share with your client or use as your counter-offer prep.' },
    ],
    testimonials: [
      { quote: 'I would have lost this deal without a real GC opinion on the inspection. Cosmetic items were drowning out the actual structural concern.', name: 'Madison M.', role: 'Realtor' },
      { quote: 'Buyer wanted $20K credit. Real number was $7K. Saved my client $13K and the deal closed.', name: 'Jethro A.', role: 'Realtor' },
      { quote: 'Four hours from sending the report to having actionable answers. Nothing else moves that fast.', name: 'Trisha W.', role: 'Listing Agent' },
    ],
    notIncluded: [
      'Not a comprehensive 1-day deep read — see Realtor Inspection Review',
      'Not contractor bid prices (rough ranges only)',
      'Not on-site inspection',
      'Not legal or negotiation strategy advice',
    ],
    valueStack: [
      'Same-business-day turnaround (4 hours during business hours)',
      'Licensed NC GC reads personally',
      'Critical-vs-cosmetic ratings',
      'Rough cost ranges per issue',
      'Written response-path recommendation',
      'PDF deliverable for client sharing',
      'Email follow-up if anything is unclear',
      'Money-back if we cannot give you a clear answer',
    ],
    finalHeadline: 'Get a construction read before the deal goes cold.',
    finalSubhead: 'One licensed-GC same-day read, 4 hours, $199. Don\'t let cosmetic noise kill a real deal.',
    faqs: [
      { q: 'How fast is "same-day"?', a: 'Within 4 hours during business hours (Mon–Fri 8am–6pm ET). Reports received after 4pm typically come back next business morning by 9am.' },
      { q: 'How is this different from Realtor Inspection Review?', a: 'This is faster + cheaper triage for urgent moments — within 4 hours, $199, rough cost ranges. The full Inspection Review ($299, 1 day) is a comprehensive deliverable with item-by-item analysis you can share with clients. Use Quick Read when the deal needs an answer today, Review when you need depth.' },
      { q: 'Can you negotiate with the seller for me?', a: 'No — this is a construction-side opinion you use to anchor your own negotiation. We give the numbers; you handle the conversation.' },
      { q: 'What do you need from me?', a: 'Just the inspection report PDF and the property address. Photos help but are optional for the quick read.' },
      { q: 'What if the inspection is huge?', a: 'Even for 100+ item reports, the 4-hour SLA holds. We focus on what actually matters for the deal decision.' },
    ],
    comparisonRows: COMPARISON_ROWS_SAME_DAY_QUICK_READ,
  },
  {
    slug: 'realtor-inspection-review',
    productKey: 'realtor-inspection-review',
    ctaLabel: 'Start My Inspection Review',
    price: '$299',
    priceAnchor: 'A wrong repair-credit estimate can cost your client $10K+',
    priceLabel: 'Realtor Inspection Review',
    turnaround: '1 business day',
    audience: 'For real estate agents preparing client conversations',
    heroEyebrow: 'Realtor Inspection Review',
    heroHeadlinePre: 'Comprehensive inspection read for your',
    heroHeadlineHighlight: 'client conversation',
    heroHeadlinePost: '.',
    heroSubheadline:
      'A licensed NC general contractor reads the full inspection report, rates every item by severity, scopes the likely repair path, gives cost ranges, and delivers a client-shareable PDF — ready in 1 business day.',
    problemHeadline: 'Where realtor inspection conversations go wrong',
    problemIntro: 'A bad inspection conversation does not lose one deal — it loses your client\'s trust for the rest of the transaction.',
    problemCards: [
      { title: 'Agent translates inspection in a vacuum', body: 'No construction context = wrong priorities communicated.', tone: 'red' },
      { title: 'Client treats every item as a dealbreaker', body: 'Or worse, none of them. No middle ground.', tone: 'amber' },
      { title: 'Buyer concession ask is way off', body: 'Either too high (kills deal) or too low (client overpays).', tone: 'rose' },
      { title: 'Cost ranges are guesses', body: 'And get exposed when contractor bids come back.', tone: 'orange' },
    ],
    getHeadline: 'What you actually get',
    getBullets: [
      { title: 'Item-by-item severity ratings', detail: 'Every flagged item: Critical / Important / Cosmetic. So you know what to prioritize in client conversation.' },
      { title: 'Repair-scope notes per finding', detail: 'What actually needs to happen to fix this — written in plain English you can share.' },
      { title: 'Cost ranges + contractor-fit guidance', detail: 'Realistic cost bands per item, plus what kind of contractor you\'d hire (specialty, GC, handyman).' },
      { title: 'Client-shareable PDF deliverable', detail: 'Branded, clear, and built to forward directly to your buyer or seller without rewriting anything.' },
    ],
    deliverableTitle: 'Realtor Inspection Review',
    deliverableSubtitle: '123 Main St · Charlotte, NC',
    deliverable: [
      { heading: 'Critical items (3)', items: ['Foundation crack east wall — $4K–8K to investigate + repair', 'HVAC end-of-life — $8K–14K replacement', 'Electrical: knob-and-tube remnants — $3K–6K to update'] },
      { heading: 'Important but negotiable (5)', items: ['Roof: 12 years left of 25 — repair vs replace decision', 'Plumbing: galvanized lines partial — $4K–8K', '...'] },
      { heading: 'Cosmetic (7)', items: ['Paint chips, fixture replacements, cabinet wear', 'None affect deal viability'] },
      { heading: 'Repair-path summary', items: ['Critical items justify $15K–28K credit ask', 'Important items: $5K–12K negotiation zone', 'Cosmetic: skip credit, mention in walkthrough'] },
    ],
    processSteps: [
      { title: 'Submit the inspection report', detail: 'Email the PDF + property address. Photos help but optional.' },
      { title: 'Licensed GC reads it', detail: 'Item-by-item analysis, severity ratings, scope notes, cost ranges.' },
      { title: 'You get the PDF in 1 business day', detail: 'Client-shareable deliverable in your inbox, ready to forward or anchor the next conversation.' },
    ],
    testimonials: [
      { quote: 'I sent the SCC review directly to my buyer. Made the negotiation conversation 10x easier — we had real numbers, not vibes.', name: 'Madison M.', role: 'Realtor' },
      { quote: 'The deliverable is professional enough to share with clients. That alone is worth $299.', name: 'Jethro A.', role: 'Realtor' },
      { quote: 'Before SCC I was eyeballing inspection severity. Now I have a licensed GC backing my recommendations.', name: 'Trisha W.', role: 'Listing Agent' },
    ],
    notIncluded: [
      'Not 4-hour turnaround — see Same-Day Quick Read',
      'Not contractor management or repair coordination',
      'Not negotiation strategy / counter-offer language — see Negotiation Strategy Read',
      'Not on-site inspection (report + photos only)',
    ],
    valueStack: [
      '1 business day turnaround',
      'Licensed NC GC reads personally',
      'Item-by-item severity ratings (Critical/Important/Cosmetic)',
      'Repair-scope notes per finding',
      'Cost ranges + contractor-fit guidance',
      'Client-shareable PDF deliverable',
      'Email follow-up if anything is unclear',
      'Money-back if we cannot give you a clear answer',
    ],
    finalHeadline: 'Walk into the client conversation prepared.',
    finalSubhead: 'One licensed-GC inspection review, 1 business day, $299. Real construction numbers instead of inspection-report panic.',
    faqs: [
      { q: 'How is this different from Same-Day Quick Read?', a: 'Quick Read is $199 / 4-hour urgent triage — critical vs cosmetic + rough numbers. This is $299 / 1-day comprehensive — every item analyzed with cost ranges and a PDF deliverable to share. Use Quick Read for crisis triage, Review for client conversations.' },
      { q: 'What do you need from me?', a: 'Inspection report PDF, property address, and any photos you have. Listing photos are fine.' },
      { q: 'Can I share the PDF with my client?', a: 'Yes — that\'s the point. The deliverable is built to be client-facing, branded but neutral. Many agents forward it directly.' },
      { q: 'Will you tell me what to put in the counter-offer?', a: 'You get cost ranges + severity ratings — strong inputs for your counter. For specific negotiation language and concession analysis, see Negotiation Strategy Read.' },
      { q: 'What if my client is selling, not buying?', a: 'Works either way — same analysis, just framed for the listing side. For pricing-driven analysis on listing decisions, see Pre-Listing Construction Valuation.' },
    ],
    comparisonRows: COMPARISON_ROWS_REALTOR_INSPECTION_REVIEW,
  },
  {
    slug: 'buyer-side-property-read',
    productKey: 'buyer-side-property-read',
    ctaLabel: 'Start My Property Read',
    price: '$299',
    priceAnchor: 'A missed condition issue can cost your buyer $20K post-close',
    priceLabel: 'Buyer-Side Property Read',
    turnaround: '1 business day',
    audience: 'For buyer\'s agents helping clients make offer decisions',
    heroEyebrow: 'Buyer-Side Property Read',
    heroHeadlinePre: 'Read the property',
    heroHeadlineHighlight: 'before',
    heroHeadlinePost: ' the offer, not after the inspection.',
    heroSubheadline:
      'A licensed NC general contractor reads the property from photos + listing data BEFORE your buyer makes the offer — visible condition, likely repair needs, rough cost range, and an offer-strategy recommendation. Different from inspection response: this is pre-offer construction context.',
    problemHeadline: 'Why pre-offer construction reads matter',
    problemIntro: 'Most buyer agents lean on the inspection to surface problems — but by then the offer is in, earnest money is at risk, and the construction conversation is reactive instead of proactive.',
    problemCards: [
      { title: 'Buyer over-offers on a problem house', body: 'No construction read before the offer. Now they\'re overpaying.', tone: 'red' },
      { title: 'Inspection surfaces issues you should have seen', body: 'Photos already showed end-of-life systems. Earnest money\'s at risk.', tone: 'amber' },
      { title: 'Multiple offers, no construction edge', body: 'Your buyer doesn\'t know the property\'s real condition vs others. They under-prepare.', tone: 'rose' },
      { title: 'Client trusts agent for construction context', body: 'But you\'re not a contractor. Educated guesses miss real issues.', tone: 'orange' },
    ],
    getHeadline: 'What you actually get',
    getBullets: [
      { title: 'Address + photo review', detail: 'Licensed NC GC reviews the listing photos and address-level public data.' },
      { title: 'Visible condition assessment', detail: 'What the photos show, what they hide, and what to expect when you walk through.' },
      { title: 'Likely repair needs + cost range', detail: 'Based on age, photo evidence, and patterns we\'ve seen in similar properties.' },
      { title: 'Offer-strategy recommendation', detail: 'Should they offer at ask? Lower? Walk? Tied to construction reality.' },
    ],
    deliverableTitle: 'Buyer-Side Property Read',
    deliverableSubtitle: '123 Main St · Charlotte, NC',
    deliverable: [
      { heading: 'What the listing shows', items: ['Roof: appears 15+ years old', 'HVAC condenser dated unit visible in photo 8', 'Foundation: no visible issues from listing photos', 'Windows: original to home (~1980s)'] },
      { heading: 'Likely repair needs (rough range)', items: ['Roof replacement within 5 years: $14K–22K', 'HVAC replacement likely needed: $8K–14K', 'Window upgrade if buyer wants efficiency: $12K–20K'] },
      { heading: 'Offer-strategy recommendation', items: ['"Offer 5–8% below ask. Anchor the lower number to roof + HVAC age. Be prepared for the inspection to surface issues — budget $25K–40K minimum for first 2 years of post-close work."'] },
      { heading: 'Watch-fors at inspection', items: ['Slab condition (photos can\'t verify)', 'Knob-and-tube wiring (age suggests possible)', 'Plumbing material (galvanized common in this era)'] },
    ],
    processSteps: [
      { title: 'Submit the listing', detail: 'Property address, MLS link, any photos you have, and your buyer\'s context (first home, investment, etc.).' },
      { title: 'We read the property', detail: 'Licensed GC reviews the listing + public data, drafts the construction-side perspective.' },
      { title: 'You get the read by email', detail: 'Written deliverable in 1 business day — ready before the offer goes in.' },
    ],
    testimonials: [
      { quote: 'I had a pre-offer read on a property that turned out to be a great deal — but only after we adjusted the offer based on real costs.', name: 'Madison M.', role: 'Buyer\'s Agent' },
      { quote: 'Multiple offer situation. My buyer had construction context. Won the deal at a fair price.', name: 'Iantha M.', role: 'Realtor' },
      { quote: 'Saved my client $18K by repositioning the offer based on what SCC saw in the photos.', name: 'Trisha W.', role: 'Buyer\'s Agent' },
    ],
    notIncluded: [
      'Not a formal inspection — pre-offer only, photo-based',
      'Not an appraisal or valuation (see Pre-Listing Construction Valuation for that lens)',
      'Not a guarantee — pre-offer reads can miss what photos hide',
      'Not on-site walkthrough',
    ],
    valueStack: [
      'Licensed NC GC reviews personally',
      'Visible condition assessment from photos',
      'Likely repair needs identified pre-offer',
      'Cost range for major systems',
      'Offer-strategy recommendation',
      'Watch-fors for the inspection',
      '1 business day turnaround',
      'Money-back if we cannot give you a clear answer',
    ],
    finalHeadline: 'Stop walking into offers blind on construction.',
    finalSubhead: 'One licensed-GC pre-offer read, 1 business day, $299. Help your buyer make the right offer, not the offer they wish they could take back.',
    faqs: [
      { q: 'Why pre-offer instead of post-inspection?', a: 'Pre-offer reads anchor offer strategy. Post-inspection reads anchor concession strategy. Both are useful, but pre-offer prevents the over-offer problem entirely.' },
      { q: 'What if you miss something?', a: 'Photos can\'t verify slab condition, structural issues hidden behind walls, or systems we can\'t see. The read flags watch-fors for the inspection. Real verification happens at inspection — this is pre-offer context, not a guarantee.' },
      { q: 'What do you need from me?', a: 'Property address, MLS listing link if available, listing photos, and any context on your buyer\'s goals.' },
      { q: 'Can you do an on-site walkthrough?', a: 'Not as part of this service — that\'s a separate scoped engagement. Most buyer agents find photo-based reads sufficient for offer strategy.' },
      { q: 'Does this replace an inspection?', a: 'No. Always recommend your buyer get a formal inspection. This read helps them DECIDE whether to make the offer that triggers the inspection.' },
    ],
    comparisonRows: COMPARISON_ROWS_BUYER_SIDE_PROPERTY_READ,
  },
  {
    slug: 'negotiation-strategy-read',
    productKey: 'negotiation-strategy-read',
    ctaLabel: 'Start My Negotiation Read',
    price: '$299',
    priceAnchor: 'A 5-figure concession decision should have construction backing',
    priceLabel: 'Negotiation Strategy Read',
    turnaround: '1 business day',
    audience: 'For real estate agents in active negotiation',
    heroEyebrow: 'Negotiation Strategy Read',
    heroHeadlinePre: 'Buyer wants $15K credit — is that',
    heroHeadlineHighlight: 'reasonable',
    heroHeadlinePost: '?',
    heroSubheadline:
      'When inspection-driven concession asks come in, get a licensed NC general contractor\'s opinion on what is reasonable, what is inflated, and what the right counter is. Per-issue breakdown with counter-range recommendations, ready in 1 business day.',
    problemHeadline: 'Where negotiations go wrong',
    problemIntro: 'Most realtors lose dollars in negotiation because they don\'t have construction-side numbers to anchor what is reasonable.',
    problemCards: [
      { title: 'Buyer asks for $20K credit, you give it', body: 'Real number was $7K. Seller overpaid by $13K.', tone: 'red' },
      { title: 'Buyer asks for $5K credit, you accept', body: 'Real number was $15K. Buyer overpaying.', tone: 'amber' },
      { title: 'Counter feels like a guess', body: 'Because it is. No construction context = no anchored counter.', tone: 'rose' },
      { title: 'Conversation drags on price arguments', body: 'Instead of construction-grounded numbers, everyone debates feelings.', tone: 'orange' },
    ],
    getHeadline: 'What you actually get',
    getBullets: [
      { title: 'Per-issue reasonableness analysis', detail: 'Each item the buyer wants credit for: is the ask reasonable, inflated, or under?' },
      { title: 'Counter-range recommendations', detail: 'For each issue: "Counter at $X–Y is reasonable. Below that you risk killing the deal."' },
      { title: 'Talking points for the conversation', detail: 'Written notes you can use directly in calls with the other agent.' },
      { title: 'Construction-side numbers, not vibes', detail: 'Anchored in real repair costs, not guesses or contractor-friend estimates.' },
    ],
    deliverableTitle: 'Negotiation Strategy Read',
    deliverableSubtitle: '123 Main St · Charlotte, NC',
    deliverable: [
      { heading: 'Buyer concession asks', items: ['$20K credit for HVAC system', '$8K credit for roof', '$5K credit for plumbing', '$12K credit for "general electrical concerns"'] },
      { heading: 'Per-issue reasonableness', items: ['HVAC: ask is HIGH. Real range $8K–14K. Counter $10K reasonable.', 'Roof: ask is LOW. Real range $14K–22K. Decline credit, ask seller to replace.', 'Plumbing: ask is FAIR. $4K–6K real range. Accept up to $5K.', 'Electrical: VAGUE — ask buyer for specifics. Likely $2K–4K real.'] },
      { heading: 'Recommended counter strategy', items: ['Total counter: $17K–21K credit (vs $45K ask)', 'Decline blanket "electrical concerns" — require specifics', 'On roof, push for seller replace not credit — more goodwill on close'] },
      { heading: 'Talking points', items: ['"The HVAC ask is high — industry replacement cost runs $8–14K, not $20K. We\'re offering $10K which is fair market."', '"Roof needs replacement, not credit. Let\'s have seller handle that pre-close."'] },
    ],
    processSteps: [
      { title: 'Send the concession ask', detail: 'Email what the buyer is asking for + the inspection report. Include any seller context.' },
      { title: 'We analyze per-issue', detail: 'Licensed GC reads each ask against real cost data and writes per-issue reasonableness + counter-range.' },
      { title: 'You get talking points in 1 business day', detail: 'Written deliverable ready to use in your next call with the other agent.' },
    ],
    testimonials: [
      { quote: 'Saved my seller $11K on the counter because we had real numbers to push back with. Total bargain.', name: 'Madison M.', role: 'Listing Agent' },
      { quote: 'Buyer wanted absurd credits. The SCC analysis showed exactly which were fair and which were inflated. We countered with confidence.', name: 'Jethro A.', role: 'Listing Agent' },
      { quote: 'I forwarded the talking points directly to the other agent. The conversation got 100x more grounded in reality.', name: 'Trisha W.', role: 'Realtor' },
    ],
    notIncluded: [
      'Not legal negotiation advice',
      'Not inspection report review — pair with Realtor Inspection Review if you need both',
      'Not contractor coordination or repair management',
      'Not negotiation services with the other agent (you handle the conversation)',
    ],
    valueStack: [
      'Per-issue reasonableness analysis',
      'Counter-range recommendations',
      'Construction-anchored talking points',
      'Licensed NC GC perspective',
      'Written deliverable in 1 business day',
      'Email follow-up if anything is unclear',
      'Pairs perfectly with Realtor Inspection Review for full picture',
      'Money-back if we cannot give you a clear answer',
    ],
    finalHeadline: 'Counter with real construction numbers.',
    finalSubhead: 'One licensed-GC negotiation read, 1 business day, $299. Stop losing 5-figures to inflated concession asks.',
    faqs: [
      { q: 'Do I need an Inspection Review first?', a: 'Not required, but they pair well. The Inspection Review covers severity + cost ranges for every item. The Negotiation Read takes the BUYER\'S concession ASK and tells you which numbers to fight for. Some agents buy both for high-stakes deals.' },
      { q: 'Can you talk to the other agent for me?', a: 'No — this is a coaching/strategy product. You handle the conversation, we give you the construction-side numbers and talking points.' },
      { q: 'What if the buyer just wants to walk?', a: 'Then walk. Sometimes the concession ask is a face-saving exit, not a real ask. The analysis includes a "is this ask negotiating or exiting?" judgment.' },
      { q: 'What do you need from me?', a: 'The buyer\'s concession ask (or addendum), the inspection report, and the property address.' },
      { q: 'What if the seller is my client?', a: 'Same product, same lens — we just frame the counter strategy from the listing side. Same analysis, opposite advice.' },
    ],
    comparisonRows: COMPARISON_ROWS_NEGOTIATION_STRATEGY_READ,
  },
  {
    slug: 'pre-listing-construction-valuation',
    productKey: 'pre-listing-construction-valuation',
    ctaLabel: 'Start My Valuation Read',
    price: '$399',
    priceAnchor: 'Mispricing a condition-flawed home by 5% costs the seller real dollars',
    priceLabel: 'Pre-Listing Construction Valuation',
    turnaround: '1 business day',
    audience: 'For listing agents pricing condition-flawed homes',
    heroEyebrow: 'Pre-Listing Construction Valuation',
    heroHeadlinePre: 'What should this home',
    heroHeadlineHighlight: 'list at',
    heroHeadlinePost: ' given the condition?',
    heroSubheadline:
      'A licensed NC general contractor reads the property and gives you a construction-side valuation read: condition-adjusted price band, top value-drag items (with cost-to-fix vs cost-to-leave analysis), and a pricing strategy note tied to construction reality. Different lens than a market appraisal.',
    problemHeadline: 'Why condition-driven listings get mispriced',
    problemIntro: 'Comps don\'t account for construction condition. Two identical-on-paper homes can be worth $30K apart based on roof age, HVAC condition, and structural items.',
    problemCards: [
      { title: 'Listed at comp price, condition drags it', body: 'Sits on market. Price reductions kick in. Seller blames you.', tone: 'red' },
      { title: 'Listed below comp to "be aggressive"', body: 'Real condition would have supported comp. Seller leaves $$$ on table.', tone: 'amber' },
      { title: 'Pre-listing repairs get over-spent', body: 'Without construction valuation, sellers spend $20K on cosmetic that adds $5K of value.', tone: 'rose' },
      { title: 'Negotiation breaks down on condition', body: 'Buyers see issues you missed. Counter-offers reflect construction reality you didn\'t price in.', tone: 'orange' },
    ],
    getHeadline: 'What you actually get',
    getBullets: [
      { title: 'Condition-adjusted price band', detail: 'What the comps say PLUS what the construction reality says. Both numbers, plus the recommended list price.' },
      { title: 'Top-3 value-drag items', detail: 'The specific construction issues dragging the price most — usually a couple structural or systems items.' },
      { title: 'Cost-to-fix vs cost-to-leave analysis', detail: 'For each value-drag: should the seller fix pre-listing or price-adjust and disclose? Per-item recommendation.' },
      { title: 'Pricing strategy note', detail: 'Final written recommendation tied to condition. Plus how to position the listing for the right buyer.' },
    ],
    deliverableTitle: 'Pre-Listing Construction Valuation',
    deliverableSubtitle: '123 Main St · Charlotte, NC',
    deliverable: [
      { heading: 'Market comp says', items: ['$425K based on similar floor plans and recent neighborhood sales'] },
      { heading: 'Construction reality says', items: ['Roof 18 years old → -$8K to -$12K drag', 'HVAC 2008 unit → -$5K to -$8K drag', 'Original windows → -$3K to -$5K drag (efficiency concerns)', 'Otherwise sound: foundation, plumbing, electrical OK'] },
      { heading: 'Condition-adjusted band', items: ['Recommended list: $399K–$412K', 'Reasoning: comp-supported floor of $425K minus visible condition drag', 'Hard floor: $390K. Below that you\'re leaving seller money on the table.'] },
      { heading: 'Cost-to-fix vs cost-to-leave', items: ['Roof: Leave + disclose. Replacement = $18K, value lift = $10–12K. Net loss to seller.', 'HVAC: Fix. Replacement = $10K, value lift = $12–14K. Net gain.', 'Windows: Leave. Replacement = $15K, value lift = $5–8K. Net loss.'] },
      { heading: 'Pricing strategy', items: ['List at $410K. Disclose roof + windows. Replace HVAC pre-listing.', 'Target buyer: first-time or investor willing to do roof in 2–5 years.', 'Expect 3–5% negotiation off ask given disclosures.'] },
    ],
    processSteps: [
      { title: 'Submit the listing', detail: 'Property address, listing photos, any prior inspection if you have one, and the comp range you\'re considering.' },
      { title: 'Construction valuation read', detail: 'Licensed NC GC reads the property condition, applies value-drag analysis, and writes pricing strategy.' },
      { title: 'You get the read in 1 business day', detail: 'Written deliverable ready to inform your CMA conversation with the seller.' },
    ],
    testimonials: [
      { quote: 'I priced a condition-flawed home aggressively. SCC showed I was leaving $15K on the table. We adjusted up, listed, and sold at the higher number.', name: 'Madison M.', role: 'Listing Agent' },
      { quote: 'Construction-side valuation is a different lens than market comps. Seller wanted to over-spend on pre-listing repairs. SCC showed which ones actually moved the price.', name: 'Trisha W.', role: 'Listing Agent' },
      { quote: 'Used this to set the right price on a 1980s home that comps didn\'t adjust for properly. Sold in 9 days.', name: 'Iantha M.', role: 'Realtor' },
    ],
    notIncluded: [
      'Not a formal appraisal or BPO',
      'Not an AVM (automated valuation model)',
      'Not a market comp analysis (use your CMA tool for that)',
      'Not on-site walkthrough (photo + listing data only)',
    ],
    valueStack: [
      'Condition-adjusted price band',
      'Top-3 value-drag items identified',
      'Cost-to-fix vs cost-to-leave per item',
      'Pricing strategy recommendation',
      'Target-buyer positioning notes',
      'Licensed NC GC reads personally',
      '1 business day turnaround',
      'Money-back if we cannot give you a clear answer',
    ],
    finalHeadline: 'Price the listing on construction reality, not just comps.',
    finalSubhead: 'One licensed-GC valuation read, 1 business day, $399. Stop pricing condition-flawed homes without construction context.',
    faqs: [
      { q: 'How is this different from an appraisal?', a: 'An appraisal is a formal market-based valuation tied to comparables. This is a construction-side valuation — what should the home be worth given its physical condition. Use both: market for the floor, construction for the adjustment.' },
      { q: 'How is this different from Realtor Inspection Review?', a: 'Inspection Review reads an inspection report and rates issues. This reads the listing photos + condition AHEAD of a buyer\'s inspection and translates condition into pricing strategy. Inspection Review for active deals, Valuation Read for pre-listing.' },
      { q: 'Will this conflict with my appraiser\'s number?', a: 'No — this is a different lens. Appraisers anchor to market comps. We anchor to construction reality. Use the construction valuation to ADJUST the comp range up or down.' },
      { q: 'What if the home is in great condition?', a: 'You\'ll get that in writing — no value-drag, list at comp ceiling. Confidence in a good number is part of what you\'re paying for.' },
      { q: 'What do you need from me?', a: 'Property address, listing photos (interior + exterior), any prior inspection report if available, and the comp range you\'re considering.' },
    ],
    comparisonRows: COMPARISON_ROWS_PRE_LISTING_VALUATION,
  },
];

function getConfig(slug: string) {
  return LANDING_PAGES.find((page) => page.slug === slug) || null;
}

function PrimaryCta({
  config,
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  className = '',
}: {
  config: LandingPageConfig;
  variant?: 'primary' | 'inverse';
  size?: 'lg' | 'md';
  fullWidth?: boolean;
  className?: string;
}) {
  const sizeClasses =
    size === 'lg'
      ? 'min-h-[60px] px-9 py-4 text-[14px]'
      : 'min-h-[48px] px-6 py-3 text-[13px]';
  const variantClasses =
    variant === 'inverse'
      ? 'bg-white text-[#08111d] hover:bg-stone-100'
      : 'bg-[#f58220] text-white hover:bg-[#ff9229] shadow-[0_14px_30px_-6px_rgba(245,130,32,0.45)]';
  const widthClass = fullWidth ? 'w-full' : '';
  const base = `inline-flex items-center justify-center gap-2 rounded-[4px] font-black uppercase tracking-[0.06em] transition-all duration-150 hover:-translate-y-0.5 ${sizeClasses} ${variantClasses} ${widthClass} ${className}`;

  if (config.productKey) {
    return <AddToCartButton itemKey={config.productKey} label={`${config.ctaLabel} →`} className={base} mode="direct-lp" />;
  }

  return (
    <Link href={config.fallbackHref || '/cart'} className={base}>
      <span>{config.ctaLabel}</span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}

function ProblemIcon({ tone }: { tone: 'red' | 'amber' | 'rose' | 'orange' }) {
  const fills: Record<typeof tone, string> = {
    red: 'from-rose-500 to-red-600',
    amber: 'from-amber-400 to-orange-500',
    rose: 'from-pink-500 to-rose-600',
    orange: 'from-orange-400 to-amber-500',
  };
  return (
    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${fills[tone]} text-white shadow-lg`}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 9v4M12 17h.01M10.3 3.86l-8.2 14.2A2 2 0 003.83 21h16.34a2 2 0 001.73-3l-8.2-14.2a2 2 0 00-3.46 0z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

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

function DeliverablePreview({ config }: { config: LandingPageConfig }) {
  return (
    <div className="relative">
      {/* card stack effect */}
      <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[8px] bg-white/10 blur-sm" aria-hidden="true" />
      <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[8px] bg-white/15" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-[8px] border border-white/20 bg-gradient-to-br from-white to-stone-50 p-7 text-[#0c1627] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] sm:p-8">
        <div className="flex items-start justify-between border-b border-stone-200 pb-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f58220]">Southern Cities Construction</p>
            <h3 className="mt-1.5 text-lg font-extrabold tracking-tight text-[#08111d]">{config.deliverableTitle}</h3>
            <p className="mt-0.5 text-xs text-stone-500">{config.deliverableSubtitle}</p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
              Sample
            </span>
            <span className="text-[10px] text-stone-400">Page 1 of 4</span>
          </div>
        </div>

        <div className="mt-5 space-y-5">
          {config.deliverable.map((section, idx) => (
            <div key={section.heading}>
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f58220] text-[10px] font-black text-white">
                  {idx + 1}
                </span>
                <h4 className="text-[13px] font-extrabold uppercase tracking-wider text-[#08111d]">{section.heading}</h4>
              </div>
              <ul className="mt-2.5 space-y-1.5 pl-7">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13px] leading-relaxed text-stone-700">
                    <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-[#f58220]" />
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

export function generateStaticParams() {
  return LANDING_PAGES.map((page) => ({ slug: page.slug }));
}

export const dynamicParams = false;

export default function LandingPage({ params }: { params: Params }) {
  const config = getConfig(params.slug);
  if (!config) notFound();

  return (
    <>
      <style>{__motionStyles}</style>
      <main className="relative min-h-screen bg-white text-[#0c1627] pb-24 lg:pb-0">
        {/* HERO — full-bleed, 2-col, no constraining panel */}
        <section className="relative overflow-hidden bg-[#08111d]">
          <div className="absolute inset-0 scale-[1.04] animate-[heroFloat_22s_ease-in-out_infinite]">
            <Image
              src="/lp-budget-hero-bg.jpg"
              alt=""
              fill
              className="object-cover object-right opacity-[0.55]"
              priority
            />
          </div>
          <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(circle_at_30%_35%,rgba(245,130,32,0.22),transparent_55%)]" />
          <div className="absolute left-[-10%] top-[10%] h-72 w-72 rounded-full bg-[rgba(245,130,32,0.12)] blur-3xl" />
          <div className="absolute bottom-[-6rem] right-[5%] h-80 w-80 rounded-full bg-[rgba(255,255,255,0.06)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(95deg,rgba(4,10,18,0.97)_0%,rgba(5,12,22,0.94)_38%,rgba(6,15,27,0.78)_64%,rgba(7,15,27,0.52)_88%,rgba(7,15,27,0.4)_100%)]" />

          {/* TOP BAR — logo + license badge */}
          <div className="relative z-10 mx-auto max-w-7xl px-6 pt-6 sm:px-8 sm:pt-8">
            <div className="flex items-center justify-between">
              <Image
                src="/sc-construction-logo.png"
                alt="Southern Cities Construction"
                width={176}
                height={44}
                className="h-10 w-auto sm:h-11"
                priority
              />
              <div className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white sm:inline-flex">
                <span className="block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Licensed NC General Contractor
              </div>
            </div>
          </div>

          {/* HERO CONTENT */}
          <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-12 sm:px-8 sm:pb-24 sm:pt-16 lg:grid lg:grid-cols-12 lg:gap-12 lg:pt-20">
            <div className="lg:col-span-7">
              <p className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.22em] text-[#f58220] motion-safe:animate-[heroRise_900ms_ease-out]">
                <span className="block h-px w-10 bg-[#f58220]/80" aria-hidden="true" />
                {config.heroEyebrow} · {config.audience}
              </p>
              <h1
                className="mt-6 text-[2.6rem] font-black leading-[0.98] tracking-[-0.045em] text-white sm:text-[3.5rem] lg:text-[4.5rem] motion-safe:animate-[heroRise_1000ms_ease-out_0.1s_both]"
              >
                {config.heroHeadlinePre}{' '}
                <span className="text-[#f58220]">{config.heroHeadlineHighlight}</span>
                {config.heroHeadlinePost}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-[1.6] text-white/85 sm:text-xl motion-safe:animate-[heroRise_1100ms_ease-out_0.2s_both]">
                {config.heroSubheadline}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-white/85 motion-safe:animate-[heroRise_1200ms_ease-out_0.3s_both]">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                    <CheckIcon size={14} />
                  </span>
                  <span>2-business-day turnaround</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                    <CheckIcon size={14} />
                  </span>
                  <span>Licensed NC GC</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                    <CheckIcon size={14} />
                  </span>
                  <span>Money-back guarantee</span>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-5 motion-safe:animate-[heroRise_1300ms_ease-out_0.4s_both]">
                <PrimaryCta config={config} />
                <a
                  href="#what-you-get"
                  className="text-sm font-bold text-white/80 underline-offset-4 hover:text-white hover:underline"
                >
                  See exactly what you get ↓
                </a>
              </div>

              <div className="mt-10 flex items-center gap-4 motion-safe:animate-[heroRise_1400ms_ease-out_0.5s_both]">
                <div className="flex -space-x-2">
                  {['M', 'J', 'T', 'I'].map((initial, i) => (
                    <div
                      key={initial + i}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#08111d] bg-gradient-to-br from-orange-400 to-orange-600 text-[11px] font-black text-white"
                    >
                      {initial}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[#f58220]">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                  <p className="mt-0.5 text-xs text-white/65">Trusted by 120+ NC investors</p>
                </div>
              </div>
            </div>

            <div className="mt-16 lg:col-span-5 lg:mt-0 lg:flex lg:items-center motion-safe:animate-[heroRise_1500ms_ease-out_0.6s_both]">
              <DeliverablePreview config={config} />
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="border-y border-stone-200 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4 sm:px-8">
            {SHARED_TRUST_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-black tracking-[-0.03em] text-[#08111d] sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-stone-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROBLEM */}
        <section className="bg-stone-50">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="max-w-3xl">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#f58220]">The Problem</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#08111d] sm:text-5xl">{config.problemHeadline}</h2>
              <p className="mt-5 text-lg leading-relaxed text-stone-600">{config.problemIntro}</p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {config.problemCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-stone-200 bg-white p-7 shadow-[0_8px_24px_-12px_rgba(8,17,29,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(8,17,29,0.15)]"
                >
                  <ProblemIcon tone={card.tone} />
                  <h3 className="mt-5 text-lg font-extrabold leading-tight tracking-tight text-[#08111d]">{card.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-stone-600">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT YOU GET */}
        <section id="what-you-get" className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="max-w-3xl">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#f58220]">What you get</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#08111d] sm:text-5xl">{config.getHeadline}</h2>
            </div>

            <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div className="grid gap-5 sm:grid-cols-2">
                {config.getBullets.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-stone-200 bg-stone-50 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#f58220]/30 hover:bg-white hover:shadow-lg"
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-[#f58220] text-white shadow-md">
                      <CheckIcon size={22} />
                    </span>
                    <h3 className="mt-4 text-lg font-extrabold tracking-tight text-[#08111d]">{item.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-stone-600">{item.detail}</p>
                  </div>
                ))}
              </div>

              <div className="lg:sticky lg:top-8">
                <div className="rounded-3xl bg-[#08111d] p-6 shadow-2xl sm:p-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#f58220]">Sample deliverable</p>
                  <p className="mt-2 text-base font-bold text-white">This is what arrives in your inbox.</p>
                  <div className="mt-6">
                    <DeliverablePreview config={config} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="bg-stone-50">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="max-w-3xl">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#f58220]">The Process</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#08111d] sm:text-5xl">How it works</h2>
              <p className="mt-5 text-lg leading-relaxed text-stone-600">
                Three steps. {config.turnaround} from submission to direction.
              </p>
            </div>

            <div className="relative mt-14 grid gap-8 md:grid-cols-3">
              <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-[#f58220]/30 to-transparent md:block" aria-hidden="true" />
              {config.processSteps.map((step, idx) => (
                <div key={step.title} className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#08111d] text-xl font-black text-white shadow-lg ring-8 ring-stone-50">
                    <span className="text-[#f58220]">{idx + 1}</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-[#08111d]">{step.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-stone-600">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARISON */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="max-w-3xl">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#f58220]">Compare</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#08111d] sm:text-5xl">
                Why not just&hellip;
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-stone-600">
                Every alternative has a real cost. Here&rsquo;s how we stack up.
              </p>
            </div>

            <div className="mt-10 overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead className="bg-stone-100">
                    <tr>
                      <th className="px-6 py-4 text-[11px] font-black uppercase tracking-wider text-stone-500">Option</th>
                      <th className="px-6 py-4 text-[11px] font-black uppercase tracking-wider text-stone-500">Cost</th>
                      <th className="px-6 py-4 text-[11px] font-black uppercase tracking-wider text-stone-500">Time</th>
                      <th className="px-6 py-4 text-[11px] font-black uppercase tracking-wider text-stone-500">Bias</th>
                      <th className="px-6 py-4 text-[11px] font-black uppercase tracking-wider text-stone-500">Licensed?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(config.comparisonRows ?? COMPARISON_ROWS).map((row) => (
                      <tr
                        key={row.label}
                        className={`border-t border-stone-200 ${row.highlight ? 'bg-orange-50/60' : 'bg-white'}`}
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            {row.highlight ? (
                              <span className="rounded bg-[#f58220] px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
                                Recommended
                              </span>
                            ) : null}
                            <span className={`font-bold ${row.highlight ? 'text-[#08111d]' : 'text-stone-700'}`}>{row.label}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-[14px] text-stone-700">{row.cost}</td>
                        <td className="px-6 py-5 text-[14px] text-stone-700">{row.time}</td>
                        <td className="px-6 py-5 text-[14px] text-stone-700">{row.bias}</td>
                        <td className="px-6 py-5">
                          {row.licensed === true ? (
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                              <CheckIcon size={16} />
                            </span>
                          ) : row.licensed === false ? (
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-stone-200 text-stone-500">
                              <XIcon size={14} />
                            </span>
                          ) : (
                            <span className="text-[13px] font-semibold text-stone-500">{row.licensed}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="relative overflow-hidden bg-[#08111d]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,130,32,0.12),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(80,120,255,0.12),transparent_50%)]" />
          <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="max-w-3xl">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#f58220]">Trust</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-white sm:text-5xl">
                From clients who actually used this.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {config.testimonials.map((t) => (
                <blockquote
                  key={t.name + t.role}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-1 text-[#f58220]">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                  <p className="mt-5 text-[17px] font-medium leading-[1.55] text-white/90">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-[#f58220] text-base font-black text-white">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-extrabold text-white">{t.name}</p>
                      <p className="text-[13px] text-white/60">{t.role}</p>
                    </div>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT THIS IS NOT */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="max-w-3xl">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#f58220]">What this is not</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#08111d] sm:text-5xl">
                So you know exactly what you&rsquo;re buying.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-stone-600">
                This is a review product with a clear scope. Here&rsquo;s what it isn&rsquo;t:
              </p>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {config.notIncluded.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50 p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-200 text-stone-500">
                    <XIcon size={16} />
                  </span>
                  <p className="text-[15px] font-semibold text-[#08111d]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING with value stack + anchor */}
        <section className="bg-gradient-to-b from-stone-50 to-stone-100">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="overflow-hidden rounded-3xl bg-white shadow-[0_40px_80px_-20px_rgba(8,17,29,0.15)] ring-2 ring-[#f58220]/10">
              <div className="grid lg:grid-cols-12">
                {/* Left: value stack */}
                <div className="lg:col-span-7 p-10 sm:p-12 lg:p-14">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#f58220]">Pricing</p>
                  <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#08111d] sm:text-5xl">
                    {config.finalHeadline}
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-stone-600">{config.finalSubhead}</p>

                  <div className="mt-8 rounded-2xl border-l-4 border-[#f58220] bg-orange-50 p-5">
                    <p className="text-[11px] font-black uppercase tracking-wider text-[#f58220]">For context</p>
                    <p className="mt-1.5 text-[15px] font-semibold text-[#08111d]">{config.priceAnchor}</p>
                  </div>

                  <p className="mt-9 text-[11px] font-black uppercase tracking-[0.22em] text-stone-500">What&rsquo;s included</p>
                  <ul className="mt-4 space-y-3">
                    {config.valueStack.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#08111d]">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                          <CheckIcon size={14} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: dark price card */}
                <div className="relative overflow-hidden bg-[#08111d] p-10 text-white sm:p-12 lg:col-span-5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,130,32,0.18),transparent_60%)]" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#f58220]">{config.priceLabel}</p>
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-6xl font-black tracking-[-0.03em] sm:text-7xl">{config.price}</span>
                      </div>
                      <p className="mt-2 text-sm text-white/70">one-time · {config.turnaround}</p>

                      <div className="mt-8 space-y-3 border-t border-white/10 pt-7 text-[13px] text-white/75">
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                            <CheckIcon size={12} />
                          </span>
                          <span>Secure checkout · No subscription</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                            <CheckIcon size={12} />
                          </span>
                          <span>Money-back if no clear answer</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                            <CheckIcon size={12} />
                          </span>
                          <span>Licensed NC GC reviews personally</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10">
                      <PrimaryCta config={config} fullWidth />
                      <p className="mt-4 text-center text-[11px] text-white/45">
                        Or call{' '}
                        <a href="tel:+19804737249" className="font-bold text-white/70 hover:text-[#f58220]">
                          (980) 473-7249
                        </a>{' '}
                        first
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BUNDLE CROSS-SELL (only renders if config.addOnBundle is set) */}
        {config.addOnBundle ? (
          <section className="bg-stone-50">
            <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20">
              <div className="relative overflow-hidden rounded-3xl border-2 border-[#f58220]/40 bg-gradient-to-br from-[#0e1c30] via-[#142840] to-[#0e1c30] p-8 sm:p-12 shadow-[0_30px_60px_-20px_rgba(8,17,29,0.4)]">
                <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-[#f58220]/15 blur-3xl" aria-hidden="true" />
                <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-center">
                  <div className="lg:col-span-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#f58220]">{config.addOnBundle.eyebrow}</p>
                      {config.addOnBundle.savingsBadge ? (
                        <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-emerald-300">{config.addOnBundle.savingsBadge}</span>
                      ) : null}
                    </div>
                    <h3 className="mt-4 text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">{config.addOnBundle.heading}</h3>
                    <p className="mt-5 text-lg leading-relaxed text-white/85">{config.addOnBundle.description}</p>
                    {config.addOnBundle.bullets ? (
                      <ul className="mt-7 space-y-3">
                        {config.addOnBundle.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3 text-[15px] leading-relaxed text-white/85">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f58220]/20 text-[#f58220]"><CheckIcon size={14} /></span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                  <div className="lg:col-span-4 flex flex-col items-stretch gap-4">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-sm">
                      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#f58220]">Bundle pricing</p>
                      <p className="mt-3 text-3xl font-black tracking-[-0.03em] text-white">{config.addOnBundle.bundlePriceLabel}</p>
                    </div>
                    <AddToCartButton
                      itemKey={config.addOnBundle.bundleProductKey}
                      label={config.addOnBundle.bundleLabel}
                      mode="direct-lp"
                      className="inline-flex min-h-[60px] w-full items-center justify-center gap-2 rounded-full bg-[#f58220] px-6 py-4 text-[15px] font-black uppercase tracking-wider text-white shadow-lg shadow-[#f58220]/30 transition-all hover:bg-[#e3720d] hover:shadow-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* INLINE LEAD FORM — two variants:
            - Non-cart LP (no productKey): dark, prominent form replacing the
              buy path. Lead is the primary conversion goal. (Project Setup,
              Execution Support.)
            - Cart LP (productKey set): light, secondary form for visitors who
              read the page but aren't ready to click Buy. Captures lower-
              intent leads without diluting the primary CTA. Same GHL tag
              (inquiry-<slug>) so one workflow handles both flows.
        */}
        {!config.productKey ? (
          <section className="bg-stone-50">
            <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 sm:py-20">
              <LpLeadForm
                id="quote-form"
                serviceSlug={config.slug}
                serviceName={config.priceLabel || config.heroEyebrow}
                servicePrice={config.price}
                source={`lp-${config.slug}`}
                headline={`Request a custom quote — ${config.priceLabel || config.heroEyebrow}`}
                subhead={`Send a few details about your project (address, scope, timeline, anything we should know) and we'll come back within 1 business day with scope, pricing, and next steps.`}
                submitLabel={config.ctaLabel}
                variant="dark"
              />
            </div>
          </section>
        ) : (
          <section className="bg-white">
            <div className="mx-auto max-w-3xl px-6 py-14 sm:px-8 sm:py-16">
              <LpLeadForm
                id="questions-form"
                serviceSlug={config.slug}
                serviceName={config.priceLabel || config.heroEyebrow}
                servicePrice={config.price}
                source={`lp-${config.slug}-presale`}
                headline="Questions before you buy?"
                subhead={`Send them here and we'll respond within 1 business day. Or click "${config.ctaLabel}" anywhere on this page to start right away — refunds available within 24 hours if it isn't the right fit.`}
                submitLabel="Send Questions"
                variant="light"
              />
            </div>
          </section>
        )}

        {/* FINAL CTA */}
        <section className="relative overflow-hidden bg-[#08111d]">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
              maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            }}
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:px-8 sm:py-24">
            <h2 className="text-4xl font-black leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl">
              {config.finalHeadline}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{config.finalSubhead}</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <PrimaryCta config={config} />
              <a
                href="tel:+19804737249"
                className="inline-flex items-center gap-2 text-sm font-bold text-white/75 hover:text-white"
              >
                Or call (980) 473-7249
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="text-center">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#f58220]">FAQ</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#08111d] sm:text-5xl">
                Questions before you buy.
              </h2>
            </div>
            <div className="mt-12 space-y-3">
              {config.faqs.map((faq, idx) => (
                <FaqItem key={faq.q} faq={faq} defaultOpen={idx === 0} />
              ))}
            </div>
            <div className="mt-14 text-center">
              <PrimaryCta config={config} />
              <p className="mt-4 text-sm text-stone-500">
                Or call{' '}
                <a href="tel:+19804737249" className="font-bold text-[#08111d] hover:text-[#f58220]">
                  (980) 473-7249
                </a>{' '}
                to talk it through first.
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#040810] py-10 text-center text-xs text-white/40">
          <p>© 2026 Southern Cities Construction LLC. Licensed NC General Contractor.</p>
          <p className="mt-2">
            <Link href="/privacy" className="hover:text-[#f58220]">Privacy</Link>
            <span className="mx-3 text-white/20">·</span>
            <Link href="/terms" className="hover:text-[#f58220]">Terms</Link>
          </p>
        </footer>

        {/* LP isolation: no floating cart pill. Each landing page is a focused
            single-product funnel; the customer's broader-site cart is intentionally
            invisible here and "Buy Now" routes through a direct-lp checkout that
            doesn't touch the main cart cookie. */}

        {/* STICKY MOBILE CTA */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white p-3 shadow-[0_-10px_30px_-15px_rgba(8,17,29,0.3)] lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-stone-500">{config.heroEyebrow}</p>
              <p className="text-xl font-black tracking-tight text-[#08111d]">{config.price}</p>
            </div>
            <PrimaryCta config={config} size="md" />
          </div>
        </div>
      </main>
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

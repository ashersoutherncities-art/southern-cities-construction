/**
 * Southern Cities Construction — Investor Execution Platform
 *
 * Canonical data model for the 5-stage investor execution funnel:
 *   LM1 → CO1 → CO2 → CO3 → CO4 → CO5
 *
 * This is INTENTIONALLY SEPARATE from `lib/services-data.ts` (legacy
 * investor catalog). The two systems run in parallel.
 *
 * Positioning: Southern Cities is a layered construction execution intelligence +
 * operational support platform for real estate investors — NOT a
 * traditional contractor company.
 *
 * Master frame: "Most real estate projects do not fail at acquisition.
 * They fail during execution."
 */

export type PlatformStageSlug = 'lm1' | 'co1' | 'co2' | 'co3' | 'co4' | 'co5';

export type PlatformStage = {
  slug: PlatformStageSlug;
  stageNumber: number;
  shortCode: string; // INTERNAL ONLY — "LM1", "CO1", etc. Never used in customer-facing copy.
  name: string; // marketing-facing full name
  marketingShortName: string; // marketing-facing short name (e.g., "Deal Pack"). Use this anywhere a short label is needed customer-side.
  internalName: string; // back-office descriptor
  audienceTag: string; // pill text in hero
  oneLiner: string; // 1-sentence positioning
  purpose: string; // longer purpose statement
  isAutomated: boolean; // LM1 = true, all others = false
  isPaid: boolean; // LM1 = false (lead magnet), all others = true
  pricing: string; // marketing-facing price
  pricingDetail?: string; // expanded pricing context
  turnaround: string;
  /** Tag fired in GHL when a user captures / purchases this stage. */
  ghlTag: string;
  /** The implicit question this stage answers for the investor. */
  questionAnswered: string;
  /** The "revealed problem" that pushes them to the next stage. */
  revealedProblem?: string;
  /** What they get (deliverables). */
  deliverables: string[];
  /** What it is NOT (positioning guardrails). */
  notThisIs: string[];
  /** What it IS. */
  thisIs: string[];
  /** Hero copy. */
  heroHeadlinePre: string;
  heroHeadlineHighlight: string;
  heroHeadlinePost: string;
  heroSubheadline: string;
  /** CTA labels. */
  ctaLabel: string;
  ctaLabelMid?: string;
  ctaLabelFinal?: string;
  /** Next stage in the funnel (for cross-sell). */
  nextStage?: PlatformStageSlug;
  /** If the actual tool/checkout for this stage lives at a separate URL,
   *  set it here. The stage page CTA will route here instead of an internal
   *  anchor. Used for LM1 (live tool at /lp/rehab-budget-range-execution-risk-snapshot)
   *  and for paid stages with cart-direct checkout. */
  toolUrl?: string;
  /** Optional cart product key for stages with direct-to-cart purchase
   *  (CO1 etc.). When set, the stage page renders an AddToCartButton
   *  using this key instead of the generic anchor CTA. */
  cartProductKey?: string;
  /** Optional branded SAMPLE deliverable — anonymized example of what the
   *  customer receives. When set, the stage page shows a preview thumbnail
   *  + download so prospects can see the actual output before buying. */
  sampleDeliverable?: { pdfUrl: string; coverUrl: string; pages: number };
  /** Who this stage is ideally for, across the investor avatars. Rendered
   *  as a "Who this is for" section when present. */
  idealFor?: Array<{ label: string; detail: string }>;
  /** Scope-boundary clarification (what's included vs. add-on, who holds
   *  permits/liability). Rendered as a callout band when present. */
  scopeNote?: string;

  // ============================================================
  // NO-BRAINER ARCHITECTURE FIELDS
  // ============================================================

  /** Which guarantee bucket this offer falls into. */
  bucket: 'Diagnosis' | 'Delivery' | 'Performance';
  /** The verb that shapes the promise. */
  verb: 'FIND' | 'DELIVER' | 'SOLVE';
  /** The verb-shaped outcome promise that headlines the offer. */
  promise: string;
  /** "Refund if we cannot perform" guarantee language. Omit for free offers. */
  refundMechanic?: string;
  /** Bullet list of asymmetric-ROI reasoning shown on the page. */
  noBrainerMath: string[];
  /** Bonus items stacked on the offer to raise perceived value. */
  bonusStack: Array<{ label: string; value?: string }>;
  /** Optional testimonials shown in a trust-band section. Render only if non-empty. */
  testimonials?: Array<{
    quote: string;
    attribution: string; // e.g., "BRRRR operator, Charlotte" or "Flipper, Wilmington"
    dollar?: string; // optional: "$22K saved" — appears as a chip
  }>;
};

// ============================================================
// STAGE DEFINITIONS
// ============================================================

const LM1: PlatformStage = {
  slug: 'lm1',
  sampleDeliverable: {
    pdfUrl: '/resources/samples/budget-snapshot-sample.pdf',
    coverUrl: '/product-mockups/budget-snapshot-sample-cover.jpg',
    pages: 8,
  },
  stageNumber: 1,
  shortCode: 'LM1',
  name: 'Rehab Budget Range & Execution Risk Snapshot',
  marketingShortName: 'Budget Snapshot',
  internalName: 'Automated rules-based rehab budget tool — lead magnet',
  audienceTag: 'INVESTORS · UNDERWRITING',
  oneLiner: '$0 to keep $10K+ in your pocket. A licensed NC GC delivers a decision-grade rehab budget range you can underwrite from. Free.',
  purpose:
    'Rules-based automated tool that gives investors a decision-grade rehab budget range, timeline, project category, and risk flags for early-stage underwriting. Built to be ~80% directionally useful so investors can make a confident go/no-go call on the deal — or build deeper analysis from. Designed to surface the need for a GC-verified number (the Bid-Ready Deal Pack) when the stakes get serious.',
  isAutomated: true,
  isPaid: false,
  pricing: 'Free',
  pricingDetail: 'Free tool · automated · no contractor review at this stage',
  turnaround: 'Instant snapshot · ~5-minute intake',
  ghlTag: 'platform-lm1-captured',
  questionAnswered: 'What is this project LIKELY to cost to execute?',
  revealedProblem:
    'The range gives you a number — but not a GC-verified budget and scope you can offer and build from. That is what the Bid-Ready Deal Pack delivers.',
  deliverables: [
    'Preliminary budget range based on classification + multipliers',
    'Timeline range estimate',
    'Confidence level on the estimate',
    'Risk flags surfaced from inputs',
    'Likely project category (cosmetic / rental turn / moderate / heavy rehab / full gut / structural / addition)',
    'Branded PDF emailed automatically',
  ],
  notThisIs: [
    'A quote',
    'Final pricing',
    'A contractor bid',
    'A guaranteed estimate',
    'Manual contractor review',
  ],
  thisIs: [
    'Decision-grade rehab budget range for go/no-go underwriting',
    'Foundation for deeper underwriting analysis',
    'Contractor-grade rules-based project classification',
    'Directional execution risk snapshot',
  ],
  heroHeadlinePre: '$0 to keep',
  heroHeadlineHighlight: '$10K+',
  heroHeadlinePost: ' in your pocket.',
  heroSubheadline:
    'Submit property details, scope of work, finish target, strategy, and photos. A licensed NC GC’s rules-based engine delivers a decision-grade budget range, timeline, project category, and execution risk flags — free. Built to be ~80% directionally useful so you can underwrite the deal or build deeper analysis from. Before one missed risk becomes ten.',
  ctaLabel: 'Get My Rehab Budget — Free',
  ctaLabelMid: 'See What the Snapshot Includes',
  ctaLabelFinal: 'Get My Rehab Budget — Free',
  nextStage: 'co1',
  toolUrl: '#rehab-snapshot-form',
  bucket: 'Diagnosis',
  verb: 'FIND',
  promise:
    'Find a decision-grade rehab budget range, timeline, project category, and execution risk snapshot for your deal — a contractor-grade underwriting foundation before one missed risk becomes ten.',
  noBrainerMath: [
    "It's free. Takes about 5 minutes of intake — snapshot delivers instantly.",
    'Tells you immediately whether the deal is even in the ballpark — before you sink time into deeper analysis.',
    'Decision-grade range you can underwrite from, or use as the foundation for deeper review.',
    'Surfaces risk flags that a spreadsheet budget cannot catch.',
    'Branded PDF emailed automatically — keep it for the file.',
  ],
  bonusStack: [
    { label: 'Branded PDF emailed automatically' },
    { label: 'Project category classification (cosmetic → structural)' },
    { label: 'Confidence-level scoring on the estimate' },
    { label: 'Risk flags surfaced from your inputs' },
  ],
};

// NOTE: CO1 was formerly the retired "Investor Execution Review" ($499). Per
// the catalogue (scripts/build-investor-catalogue.py — Execution Review is
// RETIRED because it duplicated the Deal Pack), the first paid validation step
// is now the existing Bid-Ready Deal Pack ($599). The `/platform/co1` route is
// redirected to `/deal-pack` in next.config.mjs so there is a single Deal Pack
// surface; this stage object still feeds the LM1 "next step" card and the
// on-ramp label, so it is kept consistent with the Deal Pack. The retired
// `platform-co1-execution-review` cart key stays resolvable in lib/cart.ts for
// old ad/email links (de-feature, don't delete).
const CO1: PlatformStage = {
  slug: 'co1',
  stageNumber: 2,
  shortCode: 'CO1',
  name: 'Bid-Ready Deal Pack',
  marketingShortName: 'Deal Pack',
  internalName: 'GC-verified rehab budget + deal validation (Bid-Ready Deal Pack)',
  audienceTag: 'INVESTORS · PRE-LOI / PRE-OFFER',
  oneLiner: 'A licensed NC GC pressure-tests your deal and hands back a GC-verified rehab budget + dollarized scope you can underwrite, offer, and assign from — $599, credits forward.',
  purpose:
    'This is where actual expertise enters. A licensed NC GC validates whether the project realistically works and turns it into a GC-certified rehab budget range, a dollarized line-item scope of work, and an execution-risk report — the number you can offer and build from.',
  isAutomated: false,
  isPaid: true,
  pricing: '$599',
  pricingDetail: '$599 per deal · 2–3 business day turnaround · fee credits forward against Project Setup, Active Oversight, Investor-Led Build, or Full GC Service',
  turnaround: '2–3 business days',
  ghlTag: 'platform-co1-purchased',
  questionAnswered: 'What will this rehab really cost — and is the deal worth doing at my number?',
  revealedProblem:
    'Now you have a GC-verified number and scope. The next question is how to properly organize and structure the project before construction begins.',
  deliverables: [
    'GC-certified 3-tier rehab budget range',
    'Dollarized line-item scope of work',
    'Top execution risks with cost-to-cure',
    'Loan-killer flags',
    'Branded NC GC #107724 PDF you can attach to your offer or assignment',
  ],
  notThisIs: [
    'Full project management',
    'Active oversight',
    'GC execution',
    'A guaranteed final construction bid',
  ],
  thisIs: [
    'A GC-verified rehab budget you can underwrite from',
    'A dollarized scope of work',
    'Execution-risk clarity',
    'Reduced decision error',
    'Investment clarity',
  ],
  heroHeadlinePre: 'Know what the rehab really costs',
  heroHeadlineHighlight: 'before you offer',
  heroHeadlinePost: '.',
  heroSubheadline:
    'A licensed NC GC pressure-tests your deal in 2–3 business days and hands back a GC-certified rehab budget range, a dollarized line-item scope, and an execution-risk report — the number you can offer, underwrite, and assign from. $599 flat, and it credits forward against anything you do next. NC GC #107724.',
  ctaLabel: 'Get My Bid-Ready Deal Pack — $599',
  ctaLabelMid: 'See a Sample Deal Pack',
  ctaLabelFinal: 'Get My Bid-Ready Deal Pack — $599 (credits forward)',
  nextStage: 'co2',
  cartProductKey: 'deal-pack-bid-ready',
  toolUrl: '/deal-pack',
  bucket: 'Diagnosis',
  verb: 'FIND',
  promise:
    'Get a GC-verified rehab budget and dollarized scope you can offer and build from — before one missed number turns into ten.',
  refundMechanic:
    'Performance guarantee: your $599 is fully refunded if we cannot perform the Bid-Ready Deal Pack at Southern Cities standard. Southern Cities evaluates your deal first — if we determine we cannot deliver a complete Deal Pack (deal is too unusual, data too thin, or otherwise outside what we underwrite), refund. Once we accept the engagement, we deliver. The refund trigger is Southern Cities’ call, not the buyer’s.',
  noBrainerMath: [
    'Pay $599 → get a GC-verified rehab budget + dollarized scope you can actually offer and build from, instead of a spreadsheet guess.',
    'Typical avoided mistake: $5,000+ of execution risk you would have walked into blind.',
    '$599 credits forward against any deeper engagement (Project Setup, Active Oversight, Investor-Led Build, Full GC Service) — so if you continue with Southern Cities at any deeper level, it is $0 net.',
    'The only buyers who pay $599 net are those who run the Deal Pack AND walk away from the deal — in which case it just saved them from a bad number.',
  ],
  bonusStack: [
    { label: '2–3 business day turnaround on the full Deal Pack', value: '$0 — included' },
    { label: 'Loan-killer flag review for your buyer’s lender', value: 'included' },
    { label: 'Branded NC GC #107724 PDF for your offer or assignment', value: 'included' },
    { label: '$599 credits forward to any deeper Southern Cities engagement', value: '$599 value' },
  ],
};

const CO2: PlatformStage = {
  slug: 'co2',
  sampleDeliverable: {
    pdfUrl: '/resources/samples/project-setup-sample.pdf',
    coverUrl: '/product-mockups/project-setup-sample-cover.jpg',
    pages: 8,
  },
  stageNumber: 3,
  shortCode: 'CO2',
  name: 'Project Setup & Pre-Construction Management',
  marketingShortName: 'Project Setup',
  internalName: 'Pre-construction operational setup + management retainer',
  audienceTag: 'INVESTORS · PRE-CONSTRUCTION',
  oneLiner: 'Eliminate the chaos that costs investors $10K+ mid-build. We structure your project end-to-end before the cracks split the deal — a one-time $3,500 setup, then step into Active Oversight for the build.',
  purpose:
    'This is pre-construction setup + management infrastructure. The goal is to remove ambiguity and chaos before any subcontractor touches the property, then hand a launched project to Active Oversight.',
  isAutomated: false,
  isPaid: true,
  pricing: '$3,500 one-time',
  pricingDetail: 'One-time pre-construction setup engagement · gets your project shovel-ready, then step into Active Oversight for the build · your Bid-Ready Deal Pack fee credits forward',
  turnaround: 'One-time engagement · ~5-day intake, then your project is launched into Active Oversight',
  cartProductKey: 'project-setup',
  ghlTag: 'platform-co2-purchased',
  questionAnswered: 'How do I properly organize and structure this project before construction begins?',
  revealedProblem:
    'The project is set up cleanly. Now: how do you keep execution from drifting once construction actually starts?',
  deliverables: [
    'Subcontractor fit analysis (matching project complexity to labor capability)',
    'Contractor sourcing from the Southern Cities vetted network',
    'Bid coordination (organizing + normalizing bids against the same scope)',
    'Scope alignment so contractors price identical assumptions',
    'Permit coordination',
    'Schedule setup',
    'Draw planning (lender draw sequencing + cash flow logic)',
    'Procurement coordination',
  ],
  notThisIs: [
    'Active project management',
    'Daily site supervision',
    'Construction execution',
  ],
  thisIs: [
    'Pre-construction execution infrastructure',
    'Operational organization',
    'Coordination layer',
  ],
  scopeNote:
    'Billed as a one-time $3,500 pre-construction setup fee. It gets the project fully organized, ready, and launched — then rolls into Active Oversight for the build.',
  heroHeadlinePre: 'Stop letting bad pre-construction cost you',
  heroHeadlineHighlight: '$10,000+',
  heroHeadlinePost: ' in execution corrections.',
  heroSubheadline:
    'A licensed NC GC structures your entire project before the cracks split the deal — bid coordination, scope alignment, permit prep, contractor sourcing, draw planning. Eliminate the chaos that costs investors $10K+ mid-build. Performance guarantee: full refund if we cannot perform setup at our standard. NC GC #107724.',
  ctaLabel: 'Eliminate the Chaos — Get Quote',
  ctaLabelMid: 'See What Setup Includes',
  ctaLabelFinal: 'Stop Mid-Build Surprises — Get Quote',
  nextStage: 'co3',
  bucket: 'Delivery',
  verb: 'DELIVER',
  promise:
    'Eliminate the chaos that costs investors $10,000+ mid-build. We structure your entire project end-to-end — subs, bids, scope, permits, schedule, draws — before the cracks split the deal.',
  refundMechanic:
    'Performance guarantee: full refund if after our 5-day intake we determine we cannot deliver project setup at our standard for your scope. The refund trigger is Southern Cities’ call, not the buyer’s.',
  noBrainerMath: [
    'A one-time $3,500 to get the entire project organized and launched — and your Bid-Ready Deal Pack fee credits forward, lowering the net.',
    'Skip 40–60 hours of contractor sourcing, bid normalization, scope writing, and schedule building yourself.',
    'A botched pre-construction setup typically costs $10K+ in execution corrections downstream.',
    'First-prevented setup miss ROI: 4x–12x.',
  ],
  bonusStack: [
    { label: 'Full vendor lineup with negotiated rate cards', value: 'irreplaceable' },
    { label: 'Permit submission package — Southern Cities drafts, you submit' },
    { label: 'Draw sequencing logic written for your lender' },
    { label: 'Your Bid-Ready Deal Pack fee credited automatically', value: '$599 value' },
  ],
};

const CO3: PlatformStage = {
  slug: 'co3',
  sampleDeliverable: {
    pdfUrl: '/resources/samples/active-oversight-sample.pdf',
    coverUrl: '/product-mockups/active-oversight-sample-cover.jpg',
    pages: 9,
  },
  stageNumber: 4,
  shortCode: 'CO3',
  name: 'Active Project Oversight',
  marketingShortName: 'Active Oversight',
  internalName: 'Ongoing execution oversight + coordination during construction',
  audienceTag: 'INVESTORS · ACTIVE CONSTRUCTION',
  oneLiner: 'We become your project manager. You keep the permits, the funding, and the upside — a licensed NC GC runs the execution layer so the job moves without you managing it.',
  purpose:
    'On Active Oversight, Southern Cities effectively becomes your project manager and execution layer during construction. You provide the funding and — where permits are required — remain the GC of record holding the permits and the liability that comes with them. We run execution: we coordinate the subs and materials you have in place, track budget and schedule against baseline, flag slippage early, manage draw releases, and run weekly site oversight. We do not pull permits (that is Investor-Led Build) and base scope does not include sourcing your crews (sourcing is an add-on, priced per trade, or step up to Project Setup).',
  idealFor: [
    { label: 'Active flippers with crews', detail: 'You have your subs but you are running too many projects to project-manage each one yourself.' },
    { label: 'BRRRR operators scaling', detail: 'You have outgrown what you can personally oversee and need a pro running each active build.' },
    { label: 'Out-of-state / remote investors', detail: 'You own NC property but cannot be on-site — we are your eyes, hands, and weekly control on the ground.' },
    { label: 'Wholesalers who kept a deal', detail: 'You can fund it and hold the permits, but you have never run a build — we run execution while you keep the upside.' },
    { label: 'Capital-rich, time-poor investors', detail: 'You want the margin of owning the deal without becoming the project manager.' },
    { label: 'Owner-builders of record', detail: 'You can legally pull the permits and want a licensed GC operating the job within that frame.' },
  ],
  scopeNote:
    'You hold the permits (where required) and the GC-of-record liability that comes with them; we run the execution layer. This is project management — we coordinate labor, materials, inspections, and draws — NOT a quality-assurance layer (QA/QC sign-off is Investor-Led Build / Full GC Service). Base scope coordinates the labor and materials YOU provide. Need us to source or recommend crews? That is an add-on, priced per trade — or step up to Project Setup. Permit-pulling under our license is Investor-Led Build.',
  isAutomated: false,
  isPaid: true,
  pricing: 'From $6,500 — scoped per project',
  pricingDetail: 'Flat fee per project (not monthly) · Light $6,500 / Standard $12,500 / Heavy $19,500 / Complex $28,500 · tier confirmed during the Bid-Ready Deal Pack based on project type and duration',
  turnaround: 'Engagement spans active construction (typical 6 weeks–12 months by tier)',
  ghlTag: 'platform-co3-purchased',
  questionAnswered: 'How do I keep execution from drifting once construction actually starts?',
  revealedProblem:
    'Oversight is in place. Now: who is actually controlling and assuming execution responsibility?',
  deliverables: [
    'We act as your project manager / execution layer',
    'Coordination of the labor YOU provide (base scope)',
    'Materials coordination',
    'Progress tracking against schedule',
    'Budget monitoring against approved baseline',
    'Schedule monitoring + slippage flagging',
    'Change tracking + written change log',
    'Draw release tracking + recommendations',
    'Periodic site inspections (frequency scoped per project)',
    'Weekly written execution reports',
    'Contractor communication on your behalf',
    'Issue escalation + owner decision cadence',
  ],
  notThisIs: [
    'Permit pulling (that is Investor-Led Build — we pull permits under our license and hold GC-of-record there)',
    'Sourcing your crews from scratch (add-on: $400 per trade, or Project Setup)',
    'Full GC execution / risk transfer (handled by Full GC Service)',
    'Quality assurance / QC sign-off — this is a project-management tier, not a QA layer (that is Investor-Led Build / Full GC Service)',
    'Simple admin work',
  ],
  thisIs: [
    'Execution coordination',
    'Oversight infrastructure',
    'Operational visibility',
    'Project control support',
  ],
  heroHeadlinePre: 'Stop watching your budget',
  heroHeadlineHighlight: 'bleed $5K+',
  heroHeadlinePost: ' mid-project.',
  heroSubheadline:
    'Weekly progress tracking, budget monitoring, schedule monitoring, contractor coordination, site inspections — for the full duration of your project at a scoped flat fee. A licensed NC GC kills execution drift before it kills your margin. Performance guarantee: full refund if we cannot perform oversight at our standard. NC GC #107724.',
  ctaLabel: 'Kill the Drift — Get Quote',
  ctaLabelMid: 'See How Oversight Works',
  ctaLabelFinal: 'Stop My Budget Bleed — Get Quote',
  nextStage: 'co4',
  bucket: 'Delivery',
  verb: 'DELIVER',
  promise:
    'Kill execution drift before it kills your margin. A licensed NC GC tracks progress, monitors budget, flags slippage, escalates issues, and coordinates contractors — every week, for the full duration of your project.',
  refundMechanic:
    'Performance guarantee: full refund if after the Bid-Ready Deal Pack we determine we cannot deliver oversight at our standard for your project tier. The refund trigger is Southern Cities’ call, not the buyer’s.',
  noBrainerMath: [
    'Light $6,500 / Standard $12,500 / Heavy $19,500 / Complex $28,500 — scoped flat fee, NOT monthly. You know your total upfront.',
    'Typical execution surprise on a rehab: $5K+. Active Oversight prevents 1+ surprise on nearly every project.',
    '100+ hours of your time saved chasing contractors, draws, and slippage.',
    'Your Bid-Ready Deal Pack fee credits forward — net cost is even lower if you validated the deal with us first.',
  ],
  bonusStack: [
    { label: 'Weekly written reports for the duration of the project' },
    { label: 'Direct cell access to your assigned Southern Cities PM during business hours' },
    { label: 'Vendor-level escalation handling — Southern Cities fights subs on your behalf' },
    { label: 'Your Bid-Ready Deal Pack fee credited automatically', value: '$599 value' },
  ],
};

const CO4: PlatformStage = {
  slug: 'co4',
  sampleDeliverable: {
    pdfUrl: '/resources/samples/gc-supported-build-sample.pdf',
    coverUrl: '/product-mockups/gc-supported-build-sample-cover.jpg',
    pages: 8,
  },
  stageNumber: 5,
  shortCode: 'CO4',
  name: 'Investor-Led Build',
  marketingShortName: 'Investor-Led Build',
  internalName: 'Licensed GC structure + oversight, investor manages daily ops',
  audienceTag: 'INVESTORS · INVESTOR-LED',
  oneLiner: 'Stop running your project on a permit and compliance prayer. Southern Cities pulls permits + owns compliance — you keep daily control.',
  purpose:
    'Provide licensed GC structure and oversight while the owner or owner-side PM manages daily operations. Best for experienced operators who want the legal + compliance scaffolding without giving up daily control.',
  isAutomated: false,
  isPaid: true,
  pricing: 'From $5,000 + 4% of project budget',
  pricingDetail: 'Engagement fee $5,000–$15,000 (scoped by complexity) + ongoing oversight retainer at 4% of project budget, billed monthly during active construction · scaled to project size and risk profile',
  turnaround: 'Engagement starts at permit pull',
  ghlTag: 'platform-co4-engaged',
  questionAnswered: 'Who is actually controlling and assuming execution responsibility?',
  revealedProblem:
    'For some investors, the next call is: have Southern Cities fully operate the project end-to-end.',
  deliverables: [
    'Permit pulls under Southern Cities license',
    'GC oversight + authority structure',
    'Inspection coordination with AHJs',
    'Compliance oversight',
    'QA overlay — quality sign-off at each phase',
    'Execution control systems',
    'Budget visibility support',
    'Risk monitoring',
    'Field validation visits',
    'Contract structure guidance',
  ],
  notThisIs: [
    'Full-service GC execution (handled by Full GC Service)',
    'Daily site supervision',
    'Labor coordination',
  ],
  thisIs: [
    'Permit + compliance scaffolding',
    'Investor-led execution under licensed GC infrastructure',
    'Risk + authority layer without daily ops',
  ],
  heroHeadlinePre: 'Stop running your project on a',
  heroHeadlineHighlight: 'permit and compliance prayer',
  heroHeadlinePost: '. Keep daily control.',
  heroSubheadline:
    'You or your PM run daily ops. Southern Cities pulls permits under our license, owns compliance, coordinates inspections, and provides the licensed-GC scaffolding that makes the project legally executable. For experienced operators who want structure without giving up control. Performance guarantee: full refund if we cannot perform the scaffolding at our standard. NC GC #107724.',
  ctaLabel: 'Eliminate Permit Risk — Discuss',
  ctaLabelMid: 'See How Investor-Led Build Works',
  ctaLabelFinal: 'Eliminate Permit + Compliance Risk',
  nextStage: 'co5',
  bucket: 'Delivery',
  verb: 'DELIVER',
  promise:
    'Eliminate permit and compliance risk on your build. Southern Cities pulls permits under licensed authority, owns compliance, coordinates AHJ inspections, and provides the GC scaffolding that makes the project legally executable — while you run daily ops.',
  refundMechanic:
    'Performance guarantee: full refund of engagement fee if after planning we determine we cannot deliver GC scaffolding for your project (permit path, compliance scope, or risk profile outside what we can underwrite). The refund trigger is Southern Cities’ call, not the buyer’s.',
  noBrainerMath: [
    'Without the Investor-Led Build: investor cannot legally pull permits, sub work runs unlicensed, compliance risk sits on the investor.',
    'With the Investor-Led Build: project is legally executable under licensed GC, AHJ inspections coordinated, compliance risk transferred to Southern Cities.',
    'Engagement fee from $5,000 + 4% of project budget retainer = pricing scales with project, not flat.',
    'Binary value: this is what makes the project legally possible at all.',
  ],
  bonusStack: [
    { label: 'Permit pulls included (no markup on permit fees)' },
    { label: 'AHJ inspection coordination across your jurisdiction' },
    { label: 'Contract structure templates for your subs' },
    { label: 'Your Bid-Ready Deal Pack fee credited automatically', value: '$599 value' },
  ],
};

const CO5: PlatformStage = {
  slug: 'co5',
  sampleDeliverable: {
    pdfUrl: '/resources/samples/full-gc-sample.pdf',
    coverUrl: '/product-mockups/full-gc-sample-cover.jpg',
    pages: 8,
  },
  stageNumber: 6,
  shortCode: 'CO5',
  name: 'Full-Service General Contracting',
  marketingShortName: 'Full GC Service',
  internalName: 'End-to-end project execution under Southern Cities license',
  audienceTag: 'INVESTORS · FULLY OUTSOURCED',
  oneLiner: 'Stop carrying budget and schedule risk yourself. Fixed-price + on-schedule penalty means Southern Cities carries both. You bring capital, we deliver keys.',
  purpose:
    'Provide full project execution responsibility from planning through delivery. Southern Cities fully manages and operates the project. Investor focuses on capital + strategy + asset goals.',
  isAutomated: false,
  isPaid: true,
  pricing: 'Scoped per project',
  pricingDetail: 'GC fee + cost-plus OR fixed-bid · no minimum project size · scoped after pre-construction review',
  turnaround: 'Engagement starts at planning',
  ghlTag: 'platform-co5-engaged',
  questionAnswered: 'I want Southern Cities to fully operate this project. What does that look like?',
  deliverables: [
    'Planning coordination',
    'Engineering coordination',
    'Permit pulls',
    'Subcontractor management',
    'Procurement',
    'Scheduling',
    'Site supervision',
    'Budget administration',
    'Draw coordination',
    'Inspections',
    'Quality control',
    'Project delivery',
    'Punch list',
    'Turnover + warranty coordination',
  ],
  notThisIs: [
    'Investor-led (handled by Investor-Led Build)',
    'Cost-plus only — depends on engagement structure',
  ],
  thisIs: [
    'Full execution responsibility',
    'Investor focuses on capital + strategy',
    'Southern Cities handles operations end-to-end',
  ],
  heroHeadlinePre: 'Stop carrying',
  heroHeadlineHighlight: 'budget and schedule risk',
  heroHeadlinePost: ' yourself. We carry it.',
  heroSubheadline:
    'Full project execution from planning through delivery — permits, subs, procurement, scheduling, supervision, draws, inspections, QC, turnover, warranty. Fixed-price contract means budget risk transfers to Southern Cities. On-schedule penalty means holding-cost risk transfers to Southern Cities. You bring capital. We deliver keys. NC GC #107724.',
  ctaLabel: 'Transfer the Risk — Discuss',
  ctaLabelMid: 'See What the Full GC Service Includes',
  ctaLabelFinal: 'Transfer Budget + Schedule Risk to Southern Cities',
  bucket: 'Delivery',
  verb: 'DELIVER',
  promise:
    'Transfer budget and schedule risk entirely to Southern Cities. We execute end-to-end — planning, engineering, permits, subs, procurement, scheduling, supervision, draws, inspections, QC, punch, turnover, warranty. You bring capital. We deliver keys.',
  refundMechanic:
    'Performance guarantee: full refund of pre-construction fee if we determine we cannot commit to a fixed-price contract at your scope. Once we sign fixed-price, daily penalty against fee for missed schedule milestones. The refund trigger is Southern Cities’ call, not the buyer’s.',
  noBrainerMath: [
    'Fixed price = budget risk transferred entirely to Southern Cities.',
    'On-schedule penalty mechanic = holding-cost risk transferred entirely to Southern Cities.',
    "Investor's risk = effectively zero. Investor's role = sign contract, collect keys.",
    'No minimum project size — engagement scales to fit any project worth taking.',
  ],
  bonusStack: [
    { label: 'First 90 days of Active Oversight equivalent included', value: '$6.5K–$12.5K value' },
    { label: 'Bid-Ready Deal Pack free on your next deal', value: '$599 value' },
    { label: 'All permit costs pass-through, zero markup' },
    { label: 'All prior platform credits applied across the ladder' },
  ],
};

// ============================================================
// EXPORTS
// ============================================================

export const PLATFORM_STAGES: PlatformStage[] = [LM1, CO1, CO2, CO3, CO4, CO5];

export function getPlatformStage(slug: string): PlatformStage | undefined {
  return PLATFORM_STAGES.find((s) => s.slug === slug);
}

/** All GHL tags fired by the platform funnel. Used for documentation + tag-creation scripts. */
export const PLATFORM_GHL_TAGS = {
  // Per-stage tags
  ...Object.fromEntries(PLATFORM_STAGES.map((s) => [s.slug, s.ghlTag])),
  // Cross-platform / funnel-wide tags
  generalLead: 'platform-lead',
  hubInquiry: 'platform-hub-inquiry',
  nurtureComplete: 'platform-nurture-complete',
  // LM1 wizard Step 1 partial capture — fires when investor submits Step 1 (contact)
  // but BEFORE completing Step 2 (property + scope). Different from
  // `platform-lm1-captured` which fires only on full Step 2 completion.
  lm1Step1Only: 'platform-lm1-step1-only',
} as const;

/** Master positioning statement — the master hook. */
export const PLATFORM_MASTER_HOOK =
  'Most real estate projects do not fail at acquisition. They fail during execution.';

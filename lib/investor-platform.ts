/**
 * Southern Cities Construction — Investor Execution Platform
 *
 * Canonical data model for the 5-stage investor execution funnel:
 *   LM1 → CO1 → CO2 → CO3 → CO4 → CO5
 *
 * This is INTENTIONALLY SEPARATE from `lib/services-data.ts` (legacy
 * investor catalog). The two systems run in parallel.
 *
 * Positioning: SCC is a layered construction execution intelligence +
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
  shortCode: string; // "LM1", "CO1", etc.
  name: string; // marketing-facing name
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
};

// ============================================================
// STAGE DEFINITIONS
// ============================================================

const LM1: PlatformStage = {
  slug: 'lm1',
  stageNumber: 1,
  shortCode: 'LM1',
  name: 'Rehab Budget Range & Execution Risk Snapshot',
  internalName: 'Automated rules-based rehab budget tool — lead magnet',
  audienceTag: 'INVESTORS · UNDERWRITING',
  oneLiner: 'Free automated rehab budget range + execution risk snapshot for early-stage underwriting.',
  purpose:
    'Near-free automated tool that gives investors a directional budget range, timeline, and risk flags before they commit earnest money. Designed to create awareness that deeper validation (CO1) is needed.',
  isAutomated: true,
  isPaid: false,
  pricing: 'Free',
  pricingDetail: 'Free tool · automated · no contractor review at this stage',
  turnaround: 'Instant',
  ghlTag: 'platform-lm1-captured',
  questionAnswered: 'What is this project LIKELY to cost to execute?',
  revealedProblem:
    'The range gives you a number — but it cannot tell you whether the project is realistically executable within those assumptions. That is what the Investor Execution Review (CO1) answers.',
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
    'Preliminary execution budgeting',
    'Directional feasibility analysis',
    'Execution risk snapshot',
    'Underwriting support',
  ],
  heroHeadlinePre: 'Get a',
  heroHeadlineHighlight: 'preliminary rehab budget range',
  heroHeadlinePost: ' in 60 seconds — before earnest money goes hard.',
  heroSubheadline:
    'Free automated tool. Drop in the property address, square footage, year built, scope, and a few photos. Get a directional budget range, timeline estimate, and execution risk snapshot. Not a quote — early-stage underwriting support.',
  ctaLabel: 'Get the Budget Snapshot',
  ctaLabelMid: 'See What the Snapshot Includes',
  ctaLabelFinal: 'Run a Snapshot — Free',
  nextStage: 'co1',
};

const CO1: PlatformStage = {
  slug: 'co1',
  stageNumber: 2,
  shortCode: 'CO1',
  name: 'Investor Execution Review',
  internalName: 'Human-reviewed execution feasibility validation',
  audienceTag: 'INVESTORS · PRE-LOI / PRE-OFFER',
  oneLiner: 'Human-reviewed execution feasibility — pressure-tests the budget, validates execution probability, identifies risk before earnest money.',
  purpose:
    'This is where actual expertise enters. A licensed NC GC validates whether the project realistically works, whether the assumptions are executable, and whether the budget is pressure-tested.',
  isAutomated: false,
  isPaid: true,
  pricing: '$499',
  pricingDetail: '$499 flat fee · 2 business day turnaround · refundable as credit on CO2 / CO3 / CO4 / CO5',
  turnaround: '2 business days',
  ghlTag: 'platform-co1-purchased',
  questionAnswered: 'Can this project realistically be executed within the assumptions required for the deal to work?',
  revealedProblem:
    'Now you know the deal works. The next question is how to properly organize and structure the project before construction begins.',
  deliverables: [
    'Refined budget range pressure-tested against current NC market labor + materials',
    'Execution feasibility analysis',
    'Labor market observations specific to the project location',
    'Permit path review',
    'Timeline analysis with sequencing observations',
    'Risk identification + contingency guidance',
    'Execution recommendations',
  ],
  notThisIs: [
    'Full project management',
    'Active oversight',
    'GC execution',
    'A construction quote',
  ],
  thisIs: [
    'Execution intelligence',
    'Feasibility validation',
    'Risk analysis',
    'Reduced decision error',
    'Investment clarity',
  ],
  heroHeadlinePre: 'Find out whether the project',
  heroHeadlineHighlight: 'actually executes',
  heroHeadlinePost: ' — before earnest money goes hard.',
  heroSubheadline:
    'A licensed NC GC pressure-tests the budget against real market labor and materials, validates the permit path, reviews timing, and tells you exactly where the execution risk lives. $499 flat — refundable as credit against any CO2 / CO3 / CO4 / CO5 engagement.',
  ctaLabel: 'Book the Execution Review',
  ctaLabelMid: 'See a Sample Review',
  ctaLabelFinal: 'Get Review — $499 (credited back)',
  nextStage: 'co2',
};

const CO2: PlatformStage = {
  slug: 'co2',
  stageNumber: 3,
  shortCode: 'CO2',
  name: 'Project Setup & Contractor Coordination',
  internalName: 'Pre-construction operational setup',
  audienceTag: 'INVESTORS · PRE-CONSTRUCTION',
  oneLiner: 'Organize the project operationally — bid coordination, scope alignment, permit prep, draw planning, contractor sourcing — BEFORE active execution begins.',
  purpose:
    'This is pre-construction setup infrastructure. The goal is to remove ambiguity and chaos before any subcontractor touches the property.',
  isAutomated: false,
  isPaid: true,
  pricing: 'Starting at $2,500',
  pricingDetail: 'Scoped per project · typical $2,500–$5,000 depending on scope complexity · Plans Development available as add-on',
  turnaround: '1–3 weeks depending on scope',
  ghlTag: 'platform-co2-purchased',
  questionAnswered: 'How do I properly organize and structure this project before construction begins?',
  revealedProblem:
    'The project is set up cleanly. Now: how do you keep execution from drifting once construction actually starts?',
  deliverables: [
    'Subcontractor fit analysis (matching project complexity to labor capability)',
    'Contractor sourcing from the SCC vetted network',
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
  heroHeadlinePre: 'Organize the project',
  heroHeadlineHighlight: 'before construction starts',
  heroHeadlinePost: ' — not after the chaos hits.',
  heroSubheadline:
    'Bid coordination, scope alignment, permit prep, contractor sourcing, draw planning. Done by a licensed NC GC before a single subcontractor touches the property. Most projects fail because pre-construction was skipped.',
  ctaLabel: 'Set Up the Project',
  ctaLabelMid: 'See What Setup Includes',
  ctaLabelFinal: 'Get Setup Quote',
  nextStage: 'co3',
};

const CO3: PlatformStage = {
  slug: 'co3',
  stageNumber: 4,
  shortCode: 'CO3',
  name: 'Active Project Oversight',
  internalName: 'Ongoing execution oversight + coordination during construction',
  audienceTag: 'INVESTORS · ACTIVE CONSTRUCTION',
  oneLiner: 'Execution visibility, coordination, and monitoring during active construction. Keeps execution from drifting.',
  purpose:
    'Provide ongoing execution visibility, coordination, monitoring, and operational control support DURING active construction.',
  isAutomated: false,
  isPaid: true,
  pricing: 'Starting at $3,500/mo',
  pricingDetail: 'Monthly engagement · scoped per project size + complexity · typical $3,500–$7,500/mo for residential rehab projects',
  turnaround: 'Monthly engagement during active construction',
  ghlTag: 'platform-co3-purchased',
  questionAnswered: 'How do I keep execution from drifting once construction actually starts?',
  revealedProblem:
    'Oversight is in place. Now: who is actually controlling and assuming execution responsibility?',
  deliverables: [
    'Labor coordination',
    'Materials coordination',
    'Progress tracking against schedule',
    'Budget monitoring against approved baseline',
    'Schedule monitoring + slippage flagging',
    'Change tracking',
    'Issue escalation to investor',
    'Periodic site inspections (frequency scoped per project)',
    'Execution reporting (weekly cadence)',
    'Contractor communication support',
    'Draw tracking support',
    'Owner update cadence',
  ],
  notThisIs: [
    'Simple admin work',
    'Pre-construction setup (that is CO2)',
    'Full GC execution (that is CO5)',
    'Daily on-site supervision',
  ],
  thisIs: [
    'Execution coordination',
    'Oversight infrastructure',
    'Operational visibility',
    'Project control support',
  ],
  heroHeadlinePre: 'Stop execution from',
  heroHeadlineHighlight: 'drifting',
  heroHeadlinePost: ' once construction starts.',
  heroSubheadline:
    'Weekly progress tracking, budget monitoring, change tracking, contractor coordination, periodic site inspections. A licensed NC GC keeps execution on plan — without you running the daily ops.',
  ctaLabel: 'Get Oversight Quote',
  ctaLabelMid: 'See How Oversight Works',
  ctaLabelFinal: 'Get My Oversight Quote',
  nextStage: 'co4',
};

const CO4: PlatformStage = {
  slug: 'co4',
  stageNumber: 5,
  shortCode: 'CO4',
  name: 'GC-Supported Owner Build',
  internalName: 'Licensed GC structure + oversight, owner manages daily ops',
  audienceTag: 'INVESTORS · OWNER-CONTROLLED',
  oneLiner: 'Licensed GC structure (permits, compliance, authority) while you or your PM run the daily operations.',
  purpose:
    'Provide licensed GC structure and oversight while the owner or owner-side PM manages daily operations. Best for experienced operators who want the legal + compliance scaffolding without giving up daily control.',
  isAutomated: false,
  isPaid: true,
  pricing: 'Scoped per project',
  pricingDetail: 'Custom engagement · typical $5K–$15K + ongoing oversight retainer · depends on project size and risk profile',
  turnaround: 'Engagement starts at permit pull',
  ghlTag: 'platform-co4-engaged',
  questionAnswered: 'Who is actually controlling and assuming execution responsibility?',
  revealedProblem:
    'For some investors, the next call is: have SCC fully operate the project end-to-end.',
  deliverables: [
    'Permit pulls under SCC license',
    'GC oversight + authority structure',
    'Inspection coordination with AHJs',
    'Compliance oversight',
    'Execution control systems',
    'Budget visibility support',
    'Risk monitoring',
    'Field validation visits',
    'Contract structure guidance',
  ],
  notThisIs: [
    'Full-service GC execution (that is CO5)',
    'Daily site supervision',
    'Labor coordination',
  ],
  thisIs: [
    'Permit + compliance scaffolding',
    'Owner-controlled execution under licensed GC infrastructure',
    'Risk + authority layer without daily ops',
  ],
  heroHeadlinePre: 'Keep daily control —',
  heroHeadlineHighlight: 'get GC scaffolding underneath',
  heroHeadlinePost: '.',
  heroSubheadline:
    'You or your PM run daily ops. Southern Cities pulls permits, owns compliance, coordinates inspections, and provides the licensed-GC oversight that makes the project legally executable. For experienced operators who want structure without giving up control.',
  ctaLabel: 'Discuss CO4 Engagement',
  ctaLabelMid: 'See How CO4 Works',
  ctaLabelFinal: 'Discuss Engagement',
  nextStage: 'co5',
};

const CO5: PlatformStage = {
  slug: 'co5',
  stageNumber: 6,
  shortCode: 'CO5',
  name: 'Full-Service General Contracting',
  internalName: 'End-to-end project execution under SCC license',
  audienceTag: 'INVESTORS · FULLY OUTSOURCED',
  oneLiner: 'Southern Cities fully operates the project from planning through delivery. You provide capital + strategy.',
  purpose:
    'Provide full project execution responsibility from planning through delivery. SCC fully manages and operates the project. Investor focuses on capital + strategy + asset goals.',
  isAutomated: false,
  isPaid: true,
  pricing: 'Scoped per project',
  pricingDetail: 'Custom engagement · typically scoped at GC fee + cost-plus or fixed-bid depending on project',
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
    'Owner-controlled (that is CO4)',
    'Cost-plus only — depends on engagement structure',
  ],
  thisIs: [
    'Full execution responsibility',
    'Investor focuses on capital + strategy',
    'SCC handles operations end-to-end',
  ],
  heroHeadlinePre: 'You bring',
  heroHeadlineHighlight: 'capital and strategy',
  heroHeadlinePost: '. We handle execution end-to-end.',
  heroSubheadline:
    'Full project execution from planning through delivery — permits, subs, procurement, scheduling, supervision, draws, inspections, QC, turnover. For investors who want operational ownership off the table entirely.',
  ctaLabel: 'Discuss CO5 Engagement',
  ctaLabelMid: 'See What CO5 Includes',
  ctaLabelFinal: 'Discuss Engagement',
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
} as const;

/** Master positioning statement — the master hook. */
export const PLATFORM_MASTER_HOOK =
  'Most real estate projects do not fail at acquisition. They fail during execution.';

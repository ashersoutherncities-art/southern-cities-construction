export type Resource = {
 slug: string;
 title: string;
 kind: 'free' | 'paid';
 category: string;
 audience: string;
 format: string;
 pages?: number;
 price?: string;
 priceNote?: string;
 summary: string;
 includes: string[];
 bestFor: string;
 /** If set, file is served directly (no lead-capture form). */
 downloadUrl?: string;
 /** If true, resource is gated: form is required BEFORE the download link
  * appears. Use for lead-magnet checklists. Pair with downloadUrl so the
  * success state can reveal the file immediately after capture. */
 leadMagnet?: boolean;
};

export const RESOURCES: Resource[] = [
 {
  slug: 'consistent-assignment-wholesaler',
  title: 'The $25–40K Assignment Playbook',
  kind: 'free',
  category: 'Wholesalers',
  audience: 'NC Wholesalers · Assigners',
  format: 'Lead-Magnet PDF',
  pages: 12,
  summary:
   'How NC wholesalers are consistently closing $25–40K+ assignments to real investors — without becoming flippers and without learning construction themselves. The buyer-pool problem you didn\'t know you had, the 5-question rehab validation framework you can run in 15 minutes, and an anonymized excerpt from a real GC-Verified Deal Pack that closed a $32K assignment. Plus the 4 things you can\'t do alone — and how Southern Cities\'s Deal Pack covers all of them.',
  includes: [
   'The two-layer problem (spread cap + buyer pool quality)',
   'Three reasons real investors skip unverified wholesale deals',
   'The Build-Ready Standard — before/after buyer pool comparison',
   'Anonymized 3-page Bid-Ready Deal Pack excerpt (real $32K assignment)',
   '5-Question Rehab Validation Framework (run it on any deal in 15 minutes)',
   'The 4 things you can\'t do alone — the Deal Pack execution stack',
   'Four ways to start: free SF ballpark, Bid-Ready, Build-Ready, or the Pro subscription',
  ],
  bestFor: 'NC wholesalers averaging $5K–$20K assignment fees who want to break the $10K ceiling by attracting real end-investors (not other wholesalers) to their assignments.',
  downloadUrl: '/resources/consistent-assignment-wholesaler-lm.pdf',
  leadMagnet: true,
 },
 {
  slug: 'wholesale-to-flip-9-month',
  title: 'From $10K to $104K in 9 Months: The NC Wholesaler-to-Flipper Transformation',
  kind: 'free',
  category: 'Wholesalers',
  audience: 'NC Wholesalers · Aspiring Flippers',
  format: 'Lead-Magnet PDF',
  pages: 14,
  summary:
   'A real 9-month case study of an NC wholesaler who stopped giving away his best deals and kept one — netting $104K profit on his first flip using Southern Cities\'s execution stack (the Execution Review + Active Oversight services). He didn\'t learn construction. He didn\'t pick up a hammer. He underwrote the deal, approved milestones, signed the checks — Southern Cities ran the build. Full P&L disclosed, honest math on capital and risk, decision framework for which deals to keep vs. assign.',
  includes: [
   'The wholesaler ceiling — why even $40K assignments cap your business',
   'The 9-month transformation timeline (Discovery → Decision → Execution → Sale)',
   'Full disclosed P&L on the $104K flip (sale price, financing, rehab, fees, net)',
   'The honest math — capital required, credit profile, time commitment, real risks',
   'How Southern Cities runs the execution side (the Execution Review, Active Oversight, and Owner-Controlled Build explained)',
   '5-rule decision framework for which deals to keep vs. assign',
   'Three ways to work with us: the Execution Review, a Build Desk membership, or a founder strategy call',
  ],
  bestFor: 'NC wholesalers averaging $25K+ assignment fees who feel they\'ve outgrown wholesaling and want to evolve into flippers without taking on the construction risk themselves.',
  downloadUrl: '/resources/wholesale-to-flip-9-month-lm.pdf',
  leadMagnet: true,
 },
 {
  slug: 'nc-execution-risks-investor',
  title: 'The 9 Execution Risks Killing NC Investor Deals in 2026',
  kind: 'free',
  category: 'Investors',
  audience: 'Residential Investors · Operators · BRRRR · Flippers',
  format: 'Lead-Magnet PDF',
  pages: 12,
  summary:
   'The 9 execution risks Southern Cities Construction sees kill more NC investor deals than any other category. For each risk: what it is, how to spot it in 5 seconds (visual tells from listing photos / drive-by), dollar cost range based on 2025–2026 Charlotte / Triangle / Wilmington jobs, and why your buyer’s lender cares. Your next deal probably has 2 or 3 of these. From a licensed NC GC.',
  includes: [
   'Stale labor-multiplier diagnostic ($12K-$16K impact per deal)',
   'Permit-jurisdiction reality (Mecklenburg vs Wake vs Durham vs New Hanover vs Cumberland)',
   'Hidden major-system risks (galvanized plumbing, Federal Pacific / Zinsco panels, aluminum wiring, polybutylene supply lines)',
   'Roof-life and clay-sewer-line risk + cost ranges',
   'HVAC sequencing trap that costs $3K-$8K in rework',
   'Total cost-impact summary table for all 9 risks',
   'When and how to escalate to a licensed-GC Execution Review',
  ],
  bestFor: 'NC real estate investors actively underwriting deals who want to know which execution risks are hiding in the property before earnest money goes hard.',
  downloadUrl: '/resources/nc-execution-risks-investor.pdf',
  leadMagnet: true,
 },
 {
  slug: 'gc-certified-pre-listing-checklist',
  title: 'GC-Certified Pre-Listing Construction Checklist',
  kind: 'free',
  category: 'Realtors',
  audience: 'Realtors · Sellers',
  format: 'Lead-Magnet PDF',
  pages: 5,
  summary:
   'What sellers should fix, what to disclose, and what to leave alone before a listing goes live — from a licensed NC General Contractor. Use this to make defensible prep-spend decisions and stop dragging the price down with the wrong fixes.',
  includes: [
   'Exterior + interior fix-vs-skip-vs-disclose tables',
   'Major-systems decision matrix (HVAC, roof, plumbing, electrical)',
   'NC RPDS disclosure-critical items list',
   'Prep-spend budget guide by price range',
   'Hire-a-licensed-contractor vs DIY decision rules',
  ],
  bestFor: 'Listing agents preparing a seller for market, or sellers deciding what prep work is worth doing before listing.',
  downloadUrl: '/resources/gc-certified-pre-listing-checklist.pdf',
  leadMagnet: true,
 },
 {
  slug: 'gc-certified-investor-pre-loi-checklist',
  title: 'GC-Certified Investor Pre-LOI Construction Risk Checklist',
  kind: 'free',
  category: 'Investors',
  audience: 'Residential Investors · Operators',
  format: 'Lead-Magnet PDF',
  pages: 5,
  summary:
   'The construction-side risks you should price into your offer BEFORE the LOI — from a licensed NC General Contractor. Use this to underwrite the deal at construction reality, not seller-presented condition.',
  includes: [
   'Building envelope risks + cost-impact ranges',
   'Hidden major-system risks (galvanized, polybutylene, aluminum wiring, Federal Pacific panels)',
   'Foundation + structural risk checklist',
   'Compliance + permit risks investors regularly miss (unpermitted additions, asbestos, underground oil tanks)',
   'Rehab budget reality check — realistic $/sqft by scope tier',
   'Pre-LOI walk-away triggers',
  ],
  bestFor: 'Residential investors and small operators underwriting deals in NC who want construction-side risk priced into the offer before earnest money goes hard.',
  downloadUrl: '/resources/gc-certified-investor-pre-loi-checklist.pdf',
  leadMagnet: true,
 },
 {
  slug: 'gc-certified-pre-offer-checklist',
  title: 'GC-Certified Pre-Offer Construction Checklist for Buyers',
  kind: 'free',
  category: 'Realtors',
  audience: 'Realtors · Buyers',
  format: 'Lead-Magnet PDF',
  pages: 5,
  summary:
   'What buyers should look for at the showing — and price into the offer BEFORE the inspection. From a licensed NC General Contractor. Use this so the offer reflects construction reality instead of getting blindsided after earnest money is in.',
  includes: [
   'At-the-curb 60-second signal scan',
   'Interior walkthrough red-flag list',
   'Age-based concerns + replacement-cost ranges by system',
   'What an inspection won\'t catch',
   'Walk-away triggers (when to reconsider the deal entirely)',
   'Pre-offer price-impact math',
  ],
  bestFor: 'Buyer\'s agents helping clients evaluate properties before writing an offer.',
  downloadUrl: '/resources/gc-certified-pre-offer-checklist.pdf',
  leadMagnet: true,
 },
 {
  slug: 'nc-residential-permit-prep-checklist',
  title: 'NC Residential Permit Prep Checklist',
  kind: 'free',
  category: 'Permitting',
  audience: 'Owners · Investors',
  format: 'Free Download',
  pages: 6,
  summary:
   'Every document, drawing, and submission detail a residential permit application in North Carolina needs before it hits the plan-review desk.',
  includes: [
   'Parcel and jurisdiction verification steps',
   'Scope narrative template used on our own projects',
   'Drawing set expectations by project type',
   'Residential energy compliance note (2018 NCECC)',
   'Pre-submission review sheet used before we file',
  ],
  bestFor: 'Owners or PMs about to file a residential permit in Mecklenburg, Cabarrus, Iredell, Union, or Gaston counties.',
  downloadUrl: '/resources/nc-residential-permit-prep-checklist.pdf',
 },
 {
  slug: 'nc-rough-inspection-pass-list',
  title: 'NC Rough-Inspection Pass List',
  kind: 'free',
  category: 'Inspections',
  audience: 'Contractors · Owners',
  format: 'Free Download',
  pages: 4,
  summary:
   'The exact field checks we run the day before every rough framing, rough electrical, rough plumbing, and rough mechanical inspection in NC.',
  includes: [
   'Framing hold-down and strap checklist',
   'Rough electrical AFCI / tamper-resistant checklist',
   'Rough plumbing AAV and vent verification',
   'Rough mechanical return-air and duct sizing checks',
   'Insulation readiness items before the blower-door visit',
  ],
  bestFor: 'Project managers and GC field leads who want to stop losing days on avoidable inspection failures.',
  downloadUrl: '/resources/nc-rough-inspection-pass-list.pdf',
 },
 {
  slug: 'owner-scope-lock-worksheet',
  title: 'Owner Scope-Lock Worksheet',
  kind: 'free',
  category: 'Planning',
  audience: 'Owners · Developers',
  format: 'Free Download',
  pages: 5,
  summary:
   'The scope-review worksheet we use with owners during pre-construction — allowance sizing, open items, draw structure, and change-order setup.',
  includes: [
   'Allowance-sizing table with residential norms',
   'Open-item register template',
   'Draw schedule by milestone',
   'Change-order log format',
   'Pre-construction meeting agenda',
  ],
  bestFor: 'Owners and developers entering pre-construction on a renovation, addition, or ground-up residential project.',
  downloadUrl: '/resources/owner-scope-lock-worksheet.pdf',
 },
 {
  slug: 'nc-investor-construction-playbook',
  title: 'NC Investor Construction Playbook',
  kind: 'paid',
  category: 'Investor Playbook',
  audience: 'Investors · Small Operators',
  format: 'Digital Playbook',
  pages: 48,
  price: '$149',
  priceNote: 'One-time license · email delivery',
  summary:
   'A full operational playbook for investors running residential construction in North Carolina — licensing, scope lock, draw structure, contractor vetting, and close-out.',
  includes: [
   'NC general contractor licensing deep-dive',
   'Scope and draw schedule templates by project type',
   'Contractor vetting and onboarding workflow',
   'Risk register for residential renovation and ground-up',
   'Close-out, final-inspection, and refinance readiness checklist',
   'Email delivery with signed update notifications for one year',
  ],
  bestFor: 'Investors running two or more projects per year who want a repeatable operational standard across the portfolio.',
 },
 {
  slug: 'nc-subcontractor-onboarding-toolkit',
  title: 'NC Subcontractor Onboarding Toolkit',
  kind: 'paid',
  category: 'Contractor Toolkit',
  audience: 'General Contractors',
  format: 'Document Pack',
  pages: 32,
  price: '$99',
  priceNote: 'One-time license · email delivery',
  summary:
   'The document pack we use to onboard every subcontractor into our coordination workflow — insurance verification, W-9, scope agreement, and communication cadence.',
  includes: [
   'Subcontractor master services agreement template',
   'Insurance and COI verification checklist',
   'Scope agreement and change-order templates',
   'Communication cadence and documentation standard',
   'Payment milestone and lien-waiver templates',
  ],
  bestFor: 'General contractors in NC who want a consistent onboarding standard for every trade partner, not a different paper trail on every job.',
 },
 {
  slug: 'nc-permit-to-closeout-timeline-template',
  title: 'Permit-to-Closeout Timeline Template',
  kind: 'paid',
  category: 'Project Operations',
  audience: 'PMs · GCs · Owners',
  format: 'Editable Template',
  pages: 18,
  price: '$79',
  priceNote: 'One-time license · email delivery',
  summary:
   'The editable project timeline template we run on our own residential projects — permit, pre-construction, rough, finish, and closeout milestones aligned to NC inspection sequencing.',
  includes: [
   'Milestone-by-milestone residential sequence',
   'Inspection scheduling calendar overlay',
   'Draw-and-documentation checkpoints',
   'Pre-final and final inspection readiness lists',
   'Handoff and closeout document checklist',
  ],
  bestFor: 'Project managers who want a proven sequence of operations to run new residential jobs against.',
 },
];

export function getResourceBySlug(slug: string): Resource | undefined {
 return RESOURCES.find((r) => r.slug === slug);
}

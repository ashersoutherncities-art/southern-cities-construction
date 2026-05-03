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
  downloadUrl?: string;
};

export const RESOURCES: Resource[] = [
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

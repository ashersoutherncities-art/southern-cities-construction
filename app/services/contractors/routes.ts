export type ActionRoute = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  cta: string;
  mode: 'pricing' | 'quote' | 'subscribe';
  priceLabel: string;
  bullets: string[];
  fit: string;
  nextStep: string;
  primaryHref: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export const actionRoutes: ActionRoute[] = [
  {
    slug: 'permit-administration',
    title: 'Permit Administration',
    eyebrow: 'Contractor Pricing Review',
    summary: 'Start pricing review for permit support based on job type, jurisdiction, and current file condition.',
    cta: 'Start Pricing Review',
    mode: 'pricing',
    priceLabel: 'Priced from job type, jurisdiction, and file condition',
    bullets: ['Permit application prep', 'Submission follow-up', 'Correction handling', 'Inspection scheduling support'],
    fit: 'Best when the field should not be carrying office paperwork.',
    nextStep: 'Enter the permit details so Southern Cities can size the support scope and return the right pricing path.',
    primaryHref: '/pricing/contractor-permit-administration',
    secondaryHref: '/services/industry-partners#contractors',
    secondaryLabel: 'Back to Contractor Services',
  },
  {
    slug: 'inspection-scheduling-support',
    title: 'Inspection Scheduling Support',
    eyebrow: 'Contractor Pricing Review',
    summary: 'Get pricing based on job count, support level, and coordination needs before inspection handling keeps disrupting production.',
    cta: 'Get Pricing',
    mode: 'pricing',
    priceLabel: 'Priced from job count and coordination load',
    bullets: ['Inspection scheduling', 'Follow-up coordination', 'Correction tracking', 'Status updates'],
    fit: 'Best when inspection handling keeps disrupting field time.',
    nextStep: 'Enter the active-job details so Southern Cities can return the right pricing direction for inspection support.',
    primaryHref: '/pricing/inspection-scheduling-support',
    secondaryHref: '/services/industry-partners#contractors',
    secondaryLabel: 'Back to Contractor Services',
  },
  {
    slug: 'admin-support-for-active-jobs',
    title: 'Admin Support for Active Jobs',
    eyebrow: 'Contractor Quote Review',
    summary: 'Start with a review when office strain is already hurting execution and the support scope needs to match the real backlog.',
    cta: 'Request Admin Review',
    mode: 'quote',
    priceLabel: 'Scoped after review',
    bullets: ['Admin task review', 'Coordination support', 'Documentation follow-up', 'Clear next-step support'],
    fit: 'Best when office strain is already hurting execution.',
    nextStep: 'Send the job load, backlog, and admin pain points so Southern Cities can scope the right support review.',
    primaryHref: '/review/admin-support-for-active-jobs',
    secondaryHref: '/services/industry-partners#contractors',
    secondaryLabel: 'Back to Contractor Services',
  },
  {
    slug: 'construction-oversight-support',
    title: 'Construction Oversight Support',
    eyebrow: 'Contractor Quote Review',
    summary: 'Start with a review when active jobs need tighter milestone control, updates, and follow-through.',
    cta: 'Request Oversight Review',
    mode: 'quote',
    priceLabel: 'Scoped after review',
    bullets: ['Project review', 'Support scope', 'Milestone structure', 'Coordination support plan'],
    fit: 'Best when active jobs need stronger control than the team currently has.',
    nextStep: 'Send the active project condition and coordination issues so Southern Cities can scope the oversight review correctly.',
    primaryHref: '/review/construction-oversight-support',
    secondaryHref: '/services/industry-partners#contractors',
    secondaryLabel: 'Back to Contractor Services',
  },
  {
    slug: 'permit-inspection-support-plan',
    title: 'Permit & Inspection Support Plan',
    eyebrow: 'Contractor Support Plan',
    summary: 'Monthly support for contractors who need recurring permit follow-up, inspection scheduling, and correction handling taken off their plate.',
    cta: 'Review Plan',
    mode: 'subscribe',
    priceLabel: '$899/mo',
    bullets: ['Up to 4 permit or admin requests each month', 'Inspection scheduling support', 'Correction follow-up support', 'Permit status coordination on active files'],
    fit: 'Best when the same office-side friction keeps coming back.',
    nextStep: 'Review the monthly support fit and expected request load before starting recurring support.',
    primaryHref: '/review/permit-inspection-support-plan',
    secondaryHref: '/recurring-support#contractors',
    secondaryLabel: 'See All Contractor Plans',
  },
  {
    slug: 'back-office-support-plan',
    title: 'Back-Office Support Plan',
    eyebrow: 'Contractor Support Plan',
    summary: 'A broader monthly support plan for contractors who need recurring help with admin, follow-up, documentation, and coordination across active jobs.',
    cta: 'Review Plan',
    mode: 'subscribe',
    priceLabel: '$1,750/mo',
    bullets: ['Up to 8 support requests each month', 'Permit and admin support', 'Inspection coordination', 'Documentation and follow-up support'],
    fit: 'Best when the contractor needs a real office extension without hiring full-time first.',
    nextStep: 'Review the monthly support fit and active-job volume before starting recurring support.',
    primaryHref: '/review/back-office-support-plan',
    secondaryHref: '/recurring-support#contractors',
    secondaryLabel: 'See All Contractor Plans',
  },
  {
    slug: 'contractor-office-extension-retainer',
    title: 'Contractor Office Extension Retainer',
    eyebrow: 'Contractor Support Plan',
    summary: 'A retainer for busy contractors who need steadier outside office help without building a full internal admin team yet.',
    cta: 'Request Retainer Review',
    mode: 'subscribe',
    priceLabel: 'Starting at $2,900/mo',
    bullets: ['Weekly check-in', 'Up to 12 support requests each month', 'Priority permit and inspection coordination', 'Documentation and follow-up support across active jobs'],
    fit: 'Best when the contractor needs higher-touch outside office support.',
    nextStep: 'Review the retainer fit, active-job volume, and support load before moving into recurring support.',
    primaryHref: '/review/contractor-office-extension-retainer',
    secondaryHref: '/recurring-support#contractors',
    secondaryLabel: 'See All Contractor Plans',
  },
];

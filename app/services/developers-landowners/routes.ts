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
    slug: 'project-review',
    title: 'Project Review',
    eyebrow: 'Developer Project Review',
    summary: 'Start with a project review when larger residential work needs a clearer read on scope, permits, and execution before moving further.',
    cta: 'Request Project Review',
    mode: 'quote',
    priceLabel: 'Scoped after review',
    bullets: ['Project review', 'Permit-path observations', 'Risk notes', 'Recommended next step'],
    fit: 'Best when you need an informed read before the project gets further into motion.',
    nextStep: 'Send the project, current scope, and decision pressure so Southern Cities can review the right next step.',
    primaryHref: '/review/project-review',
    secondaryHref: '/services/industry-partners#developers',
    secondaryLabel: 'Back to Developer Services',
  },
  {
    slug: 'budget-scope-review',
    title: 'Budget & Scope Review',
    eyebrow: 'Developer Project Review',
    summary: 'Start with a review when larger residential cost and scope assumptions need to be pressure-tested before money moves.',
    cta: 'Request Budget Review',
    mode: 'quote',
    priceLabel: 'Scoped after review',
    bullets: ['Scope review', 'Budget observations', 'Visible assumptions', 'Cost-risk notes'],
    fit: 'Best when you need better early visibility into cost and scope.',
    nextStep: 'Send the scope, budget assumptions, and current questions so Southern Cities can review the project properly.',
    primaryHref: '/review/budget-scope-review',
    secondaryHref: '/services/industry-partners#developers',
    secondaryLabel: 'Back to Developer Services',
  },
  {
    slug: 'permit-administration-construction-oversight',
    title: 'Permit Administration + Construction Oversight',
    eyebrow: 'Developer Project Review',
    summary: 'Start with a review when larger residential work needs tighter permit handling, job follow-through, and execution support.',
    cta: 'Request Project Review',
    mode: 'quote',
    priceLabel: 'Scoped after review',
    bullets: ['Project review', 'Permit path planning', 'Oversight scope', 'Execution support around milestones and coordination'],
    fit: 'Best when larger residential work needs tighter control around permits and execution.',
    nextStep: 'Send the project condition, permit concerns, and active execution issues so Southern Cities can scope the review correctly.',
    primaryHref: '/review/permit-administration-construction-oversight',
    secondaryHref: '/services/industry-partners#developers',
    secondaryLabel: 'Back to Developer Services',
  },
  {
    slug: 'project-control-plan',
    title: 'Project Control Plan',
    eyebrow: 'Developer Support Plan',
    summary: 'Monthly support for repeat operators who need a better read on active projects, upcoming risks, and the next decision that matters.',
    cta: 'Review Plan',
    mode: 'subscribe',
    priceLabel: '$1,250/mo',
    bullets: ['Up to 2 active project reviews each month', 'Milestone check-ins', 'Permit-path and coordination guidance', 'Risk and next-step summaries'],
    fit: 'Best when repeat operators need a steadier read across active files.',
    nextStep: 'Review the monthly plan fit and expected active-project volume before starting recurring support.',
    primaryHref: '/review/project-control-plan',
    secondaryHref: '/recurring-support#developers',
    secondaryLabel: 'See All Developer Plans',
  },
  {
    slug: 'execution-oversight-retainer',
    title: 'Execution Oversight Retainer',
    eyebrow: 'Developer Support Plan',
    summary: 'A retainer for repeat operators who need weekly oversight, better coordination, and tighter follow-through across larger or more active residential projects.',
    cta: 'Request Retainer Review',
    mode: 'subscribe',
    priceLabel: 'Starting at $3,500/mo',
    bullets: ['Weekly oversight touchpoint', 'Up to 4 project reviews each month', 'Budget and scope review support', 'Milestone and risk summaries'],
    fit: 'Best when active files need higher-touch recurring oversight.',
    nextStep: 'Review the retainer fit, project load, and oversight needs before moving into recurring support.',
    primaryHref: '/review/execution-oversight-retainer',
    secondaryHref: '/recurring-support#developers',
    secondaryLabel: 'See All Developer Plans',
  },
];

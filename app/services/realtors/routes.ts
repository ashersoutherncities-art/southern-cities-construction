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
    slug: 'pre-listing-work',
    title: 'Pre-Listing Work',
    eyebrow: 'Realtor Pricing Review',
    summary: 'Get cleaner property-specific prep direction before sellers start spending in the wrong places or delaying the listing.',
    cta: 'Enter Property Details',
    mode: 'pricing',
    priceLabel: 'Property-specific pricing direction',
    bullets: ['Scope review', 'Prep-priority guidance', 'Likely budget range', 'Timeline notes tied to listing goals'],
    fit: 'Best when presentation and timing matter, but you need cleaner direction first.',
    nextStep: 'Enter the property details so Southern Cities can review the listing-prep scope and return the right pricing direction.',
    primaryHref: '/pricing/pre-listing-budget-prep-review',
    secondaryHref: '/services/industry-partners#realtors',
    secondaryLabel: 'Back to Realtor Services',
  },
  {
    slug: 'listing-prep-coordination',
    title: 'Listing Prep Coordination',
    eyebrow: 'Realtor Quote Review',
    summary: 'Start with a scoped review when the listing needs broader prep coordination instead of a quick answer.',
    cta: 'Request Listing Prep Review',
    mode: 'quote',
    priceLabel: 'Scoped after review',
    bullets: ['Property review', 'Scope planning', 'Coordination plan', 'Quote path based on the work involved'],
    fit: 'Best when the property needs more than a quick repair answer.',
    nextStep: 'Send the property, listing goals, and current repair questions so Southern Cities can scope the coordination review properly.',
    primaryHref: '/review/listing-prep-coordination',
    secondaryHref: '/services/industry-partners#realtors',
    secondaryLabel: 'Back to Realtor Services',
  },
  {
    slug: 'deal-desk',
    title: 'Deal Desk',
    eyebrow: 'Realtor Support Plan',
    summary: 'Monthly support for active deals that need faster repair direction and inspection answers before the file drags.',
    cta: 'Review Plan',
    mode: 'subscribe',
    priceLabel: '$649/mo',
    bullets: ['Up to 4 active deal reviews each month', 'Inspection report review and repair-priority guidance', 'Up to 2 rough pricing-direction requests each month', 'Written summaries for client conversations'],
    fit: 'Best when active deals need repeated repair guidance every month.',
    nextStep: 'Review the monthly plan fit and expected case volume before starting recurring support.',
    primaryHref: '/review/deal-desk',
    secondaryHref: '/recurring-support#realtors',
    secondaryLabel: 'See All Realtor Plans',
  },
  {
    slug: 'listing-prep-desk',
    title: 'Listing Prep Desk',
    eyebrow: 'Realtor Support Plan',
    summary: 'Monthly support for agents who repeatedly need better pre-listing repair direction before seller indecision turns into delay.',
    cta: 'Review Plan',
    mode: 'subscribe',
    priceLabel: '$649/mo',
    bullets: ['Up to 4 listing-prep reviews each month', 'Repair vs leave-alone guidance', 'Prep-priority and sequencing notes', 'Up to 2 follow-up clarifications per property'],
    fit: 'Best when listing-prep indecision keeps showing up across active files.',
    nextStep: 'Review the monthly support fit and expected listing volume before starting recurring support.',
    primaryHref: '/review/listing-prep-desk',
    secondaryHref: '/recurring-support#realtors',
    secondaryLabel: 'See All Realtor Plans',
  },
];

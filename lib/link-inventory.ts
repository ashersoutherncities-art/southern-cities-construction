import { avatarPages } from '@/lib/services-data';
import { STATIC_SITE_ROUTES } from '@/lib/site-inventory';

const BASE_URL = 'https://southerncitiesconstruction.com';

export type InventoryKind = 'core' | 'avatar' | 'service' | 'landing_page';

export type InventoryLink = {
  url: string;
  path: string;
  title: string;
  kind: InventoryKind;
  audience?: string;
  hidden?: boolean;
  description: string;
  icon: string;
};

export type KindTreatment = {
  label: string;
  icon: string;
  accent: string;
  badge: string;
  ring: string;
};

export const KIND_TREATMENT: Record<InventoryKind, KindTreatment> = {
  core: {
    label: 'Core website pages',
    icon: '🏛️',
    accent: 'bg-navy-900 text-white',
    badge: 'bg-navy-50 text-navy-900 border-navy-200',
    ring: 'ring-navy-200',
  },
  avatar: {
    label: 'Audience pages',
    icon: '👥',
    accent: 'bg-orange text-white',
    badge: 'bg-orange-50 text-orange-700 border-orange-200',
    ring: 'ring-orange-200',
  },
  service: {
    label: 'Service pages',
    icon: '🛠️',
    accent: 'bg-emerald-700 text-white',
    badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    ring: 'ring-emerald-200',
  },
  landing_page: {
    label: 'Direct-link landing pages',
    icon: '🎯',
    accent: 'bg-amber-600 text-white',
    badge: 'bg-amber-50 text-amber-800 border-amber-200',
    ring: 'ring-amber-200',
  },
};

const HIDDEN_DIRECT_LINKS = new Set([
  '/services/investors/investor-review',
  '/services/investors/budget-review',
  '/services/investors/permit-local-compliance-review',
  '/services/investors/contractor-fit-consultation',
  '/services/investors/draw-review-support',
  '/services/realtors/realtor-inspection-review',
  '/services/realtors/inspection-response',
]);

const CORE_PAGE_META: Record<string, { title: string; description: string; icon: string }> = {
  '/': {
    title: 'Homepage',
    description:
      'Decision and execution support entry point. 3 pathway routing (Due Diligence / Planning / Execution), flagship Owner-Controlled Build section, real testimonials and project gallery.',
    icon: '🏠',
  },
  '/blog': {
    title: 'Blog',
    description: 'Construction insights, case studies, and decision frameworks for owners and investors.',
    icon: '📝',
  },
  '/cart': {
    title: 'Cart',
    description: 'Checkout flow for purchasable services like reviews, assessments, and consultations.',
    icon: '🛒',
  },
  '/contracting': {
    title: 'Full Contracting',
    description: 'Full general contracting service page — for when one company should run the whole project.',
    icon: '🏗️',
  },
  '/gallery': {
    title: 'Project Gallery',
    description: 'Real photos from active and completed residential builds, renovations, and exterior work.',
    icon: '🖼️',
  },
  '/partners': {
    title: 'Partners',
    description: 'Partnership opportunities and information for industry partners working with Southern Cities.',
    icon: '🤝',
  },
  '/privacy': {
    title: 'Privacy',
    description: 'Privacy policy for southerncitiesconstruction.com.',
    icon: '🔒',
  },
  '/realtor': {
    title: 'Realtor Hub',
    description: 'Realtor-facing offers for listing prep, inspection response, and deal-desk support.',
    icon: '🏘️',
  },
  '/recurring-support': {
    title: 'Recurring Support',
    description: 'Ongoing monthly support plans for investors and contractors needing consistent backup.',
    icon: '🔁',
  },
  '/resources': {
    title: 'Resources',
    description: 'Free resources, guides, and templates for residential project decisions.',
    icon: '📚',
  },
  '/terms': {
    title: 'Terms',
    description: 'Terms of service for southerncitiesconstruction.com.',
    icon: '📜',
  },
};

const AVATAR_PAGE_META: Record<string, { description: string; icon: string }> = {
  '/services': {
    description: 'Full services catalog across all audiences — homeowners, investors, contractors, realtors, developers.',
    icon: '🗂️',
  },
  '/services/homeowners': {
    description: 'Decision and execution support for residential homeowners managing renovations and builds.',
    icon: '🏠',
  },
  '/services/investors': {
    description: 'Deal review, planning, draws, and execution support for residential investors.',
    icon: '💼',
  },
  '/services/contractors': {
    description: 'Back-office and admin support for licensed contractors needing more bandwidth without overhead.',
    icon: '🦺',
  },
  '/services/realtors': {
    description: 'Inspection response, listing prep, and deal-desk support for active realtors.',
    icon: '🔑',
  },
  '/services/developers-landowners': {
    description: 'Project review, oversight, and execution support for developers and landowners.',
    icon: '📐',
  },
  '/services/industry-partners': {
    description: 'Partnership lane for industry players working with Southern Cities.',
    icon: '🤝',
  },
};

const AD_LANDING_PAGES: InventoryLink[] = [
  {
    url: `${BASE_URL}/lp/investor-deal-review`,
    path: '/lp/investor-deal-review',
    title: 'Investor Deal Review Landing Page',
    kind: 'landing_page',
    audience: 'Investors',
    hidden: true,
    description: 'Paid ad LP — $499 investor deal review with 48hr turnaround. Used for cold-traffic conversion on direct-link campaigns.',
    icon: '🔍',
  },
  {
    url: `${BASE_URL}/lp/budget-scope-review`,
    path: '/lp/budget-scope-review',
    title: 'Budget Scope Review Landing Page',
    kind: 'landing_page',
    audience: 'Investors',
    hidden: true,
    description: 'Paid ad LP — $599 budget & scope review. Catches investors before they over-spend on the wrong scope.',
    icon: '💰',
  },
  {
    url: `${BASE_URL}/lp/permit-path-review`,
    path: '/lp/permit-path-review',
    title: 'Permit Path Review Landing Page',
    kind: 'landing_page',
    audience: 'Investors',
    hidden: true,
    description: 'Paid ad LP — $399 permit path feasibility review. For investors uncertain whether the project will even get approved.',
    icon: '📋',
  },
  {
    url: `${BASE_URL}/lp/contractor-fit`,
    path: '/lp/contractor-fit',
    title: 'Contractor Fit Landing Page',
    kind: 'landing_page',
    audience: 'Investors',
    hidden: true,
    description: 'Paid ad LP — $349 contractor fit & recommendation. Investor decides who to actually hire from an outside read.',
    icon: '🤝',
  },
  {
    url: `${BASE_URL}/lp/draw-review`,
    path: '/lp/draw-review',
    title: 'Draw Review Landing Page',
    kind: 'landing_page',
    audience: 'Investors',
    hidden: true,
    description: 'Paid ad LP — $399 draw review support. Prevents releasing money blindly during the build.',
    icon: '💸',
  },
];

function labelFromPath(path: string) {
  if (path === '/') return 'Homepage';
  const last = path.split('/').filter(Boolean).pop() || '';
  return last
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function deriveServiceIcon(slug: string): string {
  if (/review|assessment/i.test(slug)) return '🔍';
  if (/permit/i.test(slug)) return '📋';
  if (/oversight/i.test(slug)) return '👁️';
  if (/budget/i.test(slug)) return '💰';
  if (/draw/i.test(slug)) return '💸';
  if (/contractor.*fit|fit.*contractor/i.test(slug)) return '🤝';
  if (/bid|coordination/i.test(slug)) return '📨';
  if (/scope/i.test(slug)) return '📐';
  if (/listing|pre-listing/i.test(slug)) return '🏷️';
  if (/inspection/i.test(slug)) return '🔬';
  if (/deal/i.test(slug)) return '🎯';
  if (/turn|rent-ready/i.test(slug)) return '🔁';
  if (/retainer|support.*plan/i.test(slug)) return '🛡️';
  if (/setup|consultation/i.test(slug)) return '💬';
  return '🛠️';
}

export function getSouthernCitiesConstructionInventory(): InventoryLink[] {
  const coreRoutes: InventoryLink[] = STATIC_SITE_ROUTES.filter(
    (path) => !['/reports', '/portal/marketing-assets', '/portal'].includes(path),
  ).map((path) => {
    const isAvatar = path.startsWith('/services');
    if (isAvatar) {
      const meta = AVATAR_PAGE_META[path];
      return {
        url: `${BASE_URL}${path}`,
        path,
        title: labelFromPath(path),
        kind: 'avatar' as const,
        description: meta?.description ?? 'Audience-specific services page.',
        icon: meta?.icon ?? '👥',
      };
    }
    const meta = CORE_PAGE_META[path];
    return {
      url: `${BASE_URL}${path}`,
      path,
      title: meta?.title ?? labelFromPath(path),
      kind: 'core' as const,
      description: meta?.description ?? 'Core marketing page on southerncitiesconstruction.com.',
      icon: meta?.icon ?? '📄',
    };
  });

  const serviceLinks: InventoryLink[] = avatarPages.flatMap((avatar) => {
    const services = [
      ...(avatar.fixed || []),
      ...(avatar.priced || []),
      ...(avatar.review || []),
      ...(avatar.recurring || []),
    ];

    return services.map((service) => {
      const path = service.detailHref;
      const isHidden = HIDDEN_DIRECT_LINKS.has(path);
      return {
        url: `${BASE_URL}${path}`,
        path,
        title: service.title,
        kind: (isHidden ? 'landing_page' : 'service') as InventoryKind,
        audience: avatar.shortLabel,
        hidden: isHidden,
        description: service.summary,
        icon: deriveServiceIcon(service.slug),
      } satisfies InventoryLink;
    });
  });

  const deduped = new Map<string, InventoryLink>();
  [...coreRoutes, ...serviceLinks, ...AD_LANDING_PAGES].forEach((item) => {
    if (!deduped.has(item.path)) deduped.set(item.path, item);
  });

  return Array.from(deduped.values()).sort((a, b) => a.path.localeCompare(b.path));
}

export function summarizeInventory(items: InventoryLink[]) {
  return {
    total: items.length,
    core: items.filter((item) => item.kind === 'core').length,
    avatars: items.filter((item) => item.kind === 'avatar').length,
    services: items.filter((item) => item.kind === 'service').length,
    landingPages: items.filter((item) => item.kind === 'landing_page').length,
  };
}

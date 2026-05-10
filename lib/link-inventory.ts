import { avatarPages } from '@/lib/services-data';
import { STATIC_SITE_ROUTES } from '@/lib/site-inventory';

const BASE_URL = 'https://southerncitiesconstruction.com';

export type InventoryLink = {
  url: string;
  path: string;
  title: string;
  kind: 'core' | 'avatar' | 'service' | 'landing_page';
  audience?: string;
  hidden?: boolean;
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

function labelFromPath(path: string) {
  if (path === '/') return 'Homepage';
  const last = path.split('/').filter(Boolean).pop() || '';
  return last
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function getSouthernCitiesConstructionInventory(): InventoryLink[] {
  const coreRoutes: InventoryLink[] = STATIC_SITE_ROUTES.filter(
    (path) => !['/', '/reports', '/portal/marketing-assets', '/portal'].includes(path)
  ).map((path) => ({
    url: `${BASE_URL}${path}`,
    path,
    title: labelFromPath(path),
    kind: path.startsWith('/services/') ? 'avatar' : 'core',
  }));

  const serviceLinks: InventoryLink[] = avatarPages.flatMap((avatar) => {
    const services = [
      ...(avatar.fixed || []),
      ...(avatar.priced || []),
      ...(avatar.review || []),
      ...(avatar.recurring || []),
    ];

    return services.map((service) => {
      const path = service.detailHref;
      return {
        url: `${BASE_URL}${path}`,
        path,
        title: service.title,
        kind: HIDDEN_DIRECT_LINKS.has(path) ? 'landing_page' : 'service',
        audience: avatar.shortLabel,
        hidden: HIDDEN_DIRECT_LINKS.has(path),
      } as InventoryLink;
    });
  });

  const deduped = new Map<string, InventoryLink>();
  [...coreRoutes, ...serviceLinks].forEach((item) => {
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

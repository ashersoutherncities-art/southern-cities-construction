import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/blog';
import { SITE_CONFIG } from '@/lib/site-config';
import { getAllServices, avatarPages } from '@/lib/services-data';
import { PLATFORM_STAGES } from '@/lib/investor-platform';

/**
 * Sitemap covers every public, indexable route. Explicitly EXCLUDES:
 *   - /cart           (transactional, noindex via layout)
 *   - /portal/**      (authenticated, noindex via layout)
 *   - /api/**         (server routes, not user-facing)
 *   - /realtor        (legacy redirect to /services/realtors)
 *   - /services/industry-partners (legacy redirect to /services)
 *
 * If you add a new public route, add it here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.baseUrl;
  const now = new Date();

  // Top-level static routes (priority 0.7–1.0)
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/deal-pack`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/contracting`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/recurring-support`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/gallery`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/platform`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/resources`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/partners`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // All /services/{role} avatar pages
  const avatarRoutes: MetadataRoute.Sitemap = avatarPages.map((avatar) => ({
    url: `${baseUrl}/services/${avatar.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  // All /services/{avatar}/{service} dynamic service detail pages
  const serviceDetailRoutes: MetadataRoute.Sitemap = avatarPages.flatMap((avatar) => {
    const services = [
      ...(avatar.fixed || []),
      ...(avatar.priced || []),
      ...(avatar.review || []),
      ...(avatar.recurring || []),
    ];
    return services.map((service) => ({
      url: `${baseUrl}/services/${avatar.slug}/${service.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  });

  // /pricing/{slug} (fixed-priced services)
  const pricingRoutes: MetadataRoute.Sitemap = getAllServices()
    .filter((s) => s.purchaseType === 'priced')
    .map((s) => ({
      url: `${baseUrl}/pricing/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  // /review/{slug} (review + recurring services)
  const reviewRoutes: MetadataRoute.Sitemap = getAllServices()
    .filter((s) => s.purchaseType === 'review' || s.purchaseType === 'recurring')
    .map((s) => ({
      url: `${baseUrl}/review/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  // /platform/{stage}
  const platformRoutes: MetadataRoute.Sitemap = PLATFORM_STAGES.map((stage) => ({
    url: `${baseUrl}/platform/${stage.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Blog posts
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...avatarRoutes,
    ...serviceDetailRoutes,
    ...pricingRoutes,
    ...reviewRoutes,
    ...platformRoutes,
    ...blogRoutes,
  ];
}

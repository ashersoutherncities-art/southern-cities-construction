import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/site-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Disallow non-indexable surfaces:
        //   /cart       — transactional cart page
        //   /portal/    — internal authenticated client portal
        //   /api/       — server route handlers (not user-facing)
        disallow: ['/cart', '/cart/', '/portal/', '/api/'],
      },
    ],
    sitemap: `${SITE_CONFIG.baseUrl}/sitemap.xml`,
    host: SITE_CONFIG.baseUrl,
  };
}

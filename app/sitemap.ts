import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://southerncitiesconstruction.com';
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/realtor`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/resources`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/partners`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}

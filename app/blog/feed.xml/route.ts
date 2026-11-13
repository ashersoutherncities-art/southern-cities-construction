import { getPublishedPosts } from '@/lib/blog';
export const revalidate = 300;
const escape = (s: string) => s.replace(/[<>&"']/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]!));
export function GET() {
  const base = 'https://southerncitiesconstruction.com';
  const items = getPublishedPosts().slice(0, 50).map(p => `<item><title>${escape(p.title)}</title><link>${base}/blog/${p.slug}</link><guid isPermaLink="true">${base}/blog/${p.slug}</guid><description>${escape(p.excerpt)}</description><category>${escape(p.category)}</category><pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate></item>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Southern Cities Construction Field Guide</title><link>${base}/blog</link><description>Practical rehab and construction guidance for North Carolina.</description><language>en-us</language>${items}</channel></rss>`, {headers:{'Content-Type':'application/rss+xml; charset=utf-8'}});
}

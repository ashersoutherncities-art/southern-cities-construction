import fs from 'node:fs';
import assert from 'node:assert/strict';
const posts = JSON.parse(fs.readFileSync('content/blog/posts.json','utf8'));
const legacy = fs.readFileSync('lib/blog.ts','utf8');
const slugs = new Set([...legacy.matchAll(/slug: '([^']+)'/g)].map(m=>m[1]));
assert(Array.isArray(posts));
for (const p of posts) {
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug), 'Invalid slug');
  assert(!slugs.has(p.slug), `Duplicate slug: ${p.slug}`); slugs.add(p.slug);
  for (const key of ['title','excerpt','category','audience','readTime','author','coverImage','publishedAt']) assert(typeof p[key] === 'string' && p[key].trim(), `${p.slug}: missing ${key}`);
  assert(Number.isFinite(Date.parse(p.publishedAt)), 'Invalid date');
  assert(['published','draft'].includes(p.status), 'Explicit status required');
  assert(p.coverImage.startsWith('/') && !p.coverImage.includes('..') && fs.existsSync(`public${p.coverImage}`), 'Use existing local cover');
  assert(p.content.length >= 5, 'Article too short');
  assert(p.sources?.length, 'Sources required');
  for (const s of p.sources) {assert(s.title); assert(new URL(s.url).protocol === 'https:');}
  for (const b of p.content) {
    assert(['paragraph','heading','list','callout'].includes(b.type));
    if(b.type === 'list') assert(b.items.length && b.items.every(s=>typeof s === 'string' && s.trim()));
    else assert(typeof b.text === 'string' && b.text.trim());
    if(b.type === 'callout') assert(b.title);
  }
}
console.log(`Validated ${posts.length} new article(s); ${slugs.size} unique total slugs.`);

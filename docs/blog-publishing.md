# Blog publishing

The existing five articles remain in `lib/blog.ts`. Add new articles to the JSON array in `content/blog/posts.json`. No database, extra paid service or API key is needed. One entry per unique slug; do not replace old articles to publish new ones.

## Fields and behavior

Use the first entry as a schema example. Required: slug, title, excerpt, category, audience, readTime, publishedAt (ISO timestamp), author, coverImage (existing /public path), status (`draft` or `published`), content blocks, sources. Optional: tags, takeaway, updatedAt. Content blocks are paragraph, heading, list, callout; text is rendered safely as plain text, not HTML.

Published entries appear when publishedAt is reached; drafts/future posts are excluded from article lookup, index, sitemap and RSS. Routes revalidate every five minutes. Metadata, canonical URL, BlogPosting structured data, table of contents, sources, related articles, category filter, text search and pagination are automatic. RSS: `/blog/feed.xml`.

## Daily editorial run

1. Pull current main and read existing articles to avoid duplicates. Publish at most one genuinely useful new article per day in America/New_York. Check today's published entry before doing anything.
2. Choose an original practical topic for NC rehab/construction investors or owners: due diligence, scopes, budgets, contractor comparison, project coordination, permitting, inspections, additions, new builds, risk or handoff. Research primary sources before stating requirements, current figures or timelines. Rotate themes and keep distinct search intent.
3. Write substantive original content, practical checklist/examples, source links and limitations. Never invent company projects, testimonials, prices, guarantees, professional review or results. Distinguish illustrative calculations from quotes. Do not copy source text. Avoid publishing unsafe DIY instructions or unsupported legal/code advice. Use the company author unless a real byline is authorized.
4. Add one entry to content/blog/posts.json, status published with an honest timestamp. Preserve every existing entry. Use owned existing imagery; do not falsely caption it as the article's project. For a major factual revision use updatedAt; do not reset publication date.
5. Run `node scripts/validate-blog.mjs`, `npm run lint`, `npx tsc --noEmit`, `npm run build`. Inspect relevant UI. Resolve errors introduced by this change and disclose unrelated failures.
6. Commit the content, integrate concurrent main updates without overwriting, push only the intended files. Verify remote SHA. Deploy the exact SHA to the existing Vercel production project; legacy GitHub Pages workflow does not serve the live domain.
7. Verify new article and blog index return 200 on southerncitiesconstruction.com; verify canonical, source links, sitemap and RSS. Do not call it published before deployment is ready and the public URL works. If blocked, retain a draft and report the blocker. Do not add paid services or change permissions.

Deployment context at setup: GitHub `ashersoutherncities-art/southern-cities-construction`, branch `main`; Vercel project `prj_BGDoCESMcx3AwQcaan9OoA6DO9Ec`, team `team_OF9aGR58LYnMFxbHAnSg0Lxw`. Reverify deployment mapping before publishing.

Recurring execution must be created by the assistant's automation service. This code does not independently generate articles or promise publishing when an automation is not running.

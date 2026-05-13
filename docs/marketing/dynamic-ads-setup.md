# Dynamic Ad Setup — Meta DCO + Google for SCC Lead-Magnet Campaign

The equity-protection video ads are designed to run as **Dynamic Creative Optimization** (DCO) ad sets, not static one-shot creatives. Algorithm tests combinations of hooks/headlines/CTAs against the audience; SCC keeps the video renders clean and reusable.

## Why dynamic, not static

| Static ad | Dynamic ad |
|---|---|
| 1 video + 1 headline + 1 CTA, locked | Multiple hook variants + multiple headlines + multiple CTAs, algorithm tests combos |
| Need to manually A/B test each variant | Meta/Google handles testing automatically |
| Video has license number baked in — re-render needed if it changes | License number is a text overlay at the ad-platform level — video render stays reusable forever |
| Hard to optimize at $2,500/mo budget | Right-sized for small budgets — let the algorithm work the variants |

## Compliance note (license number)

Per the SCC compliance rule, **NC GC License #107724 must appear on every advertising piece.** Two implementation paths — pick one:

### Path A — Overlay at ad-platform level (recommended)

- Video render: NO license number baked in
- Meta Ads Manager: add a **persistent text overlay** to the ad creative that reads `NC GC License #107724` — positioned bottom-right, small font, visible throughout. Meta supports this via the "Ad creative → Text overlay" feature.
- Google Performance Max: add license number as one of the **text assets** that get composed into responsive display variants.
- **Benefit:** Video files stay reusable. License updates are a one-click change at the ad-platform level.

### Path B — Bake into video render

- Argil / HeyGen: include the license-number text overlay in the video itself before rendering.
- **Benefit:** Compliance is enforced regardless of where the video gets shared (organic post, email embed, etc.).
- **Downside:** Re-render every time anything changes.

**SCC default:** Path A for paid ads + organic social. Path B for any video embedded into evergreen LPs (since those aren't dynamic).

## Meta DCO Setup (Primary channel)

### Campaign structure

```
Campaign: SCC Pre-Listing Checklist (Lead Generation)
└── Ad Set 1: Listing Agents (statewide NC)
│   ├── Creative bundle (DCO):
│   │   ├── 3 video variants (30s + 60s + 90s)
│   │   ├── 5 primary text variants
│   │   ├── 3 headline variants
│   │   ├── 2 description variants
│   │   └── 1 CTA: "Download"
│   └── Audience: NC real estate agents, age 28–55
├── Ad Set 2: Sellers (Charlotte + Triangle metro)
│   ├── Same creative bundle
│   └── Audience: NC homeowners, age 35–65, in-market signals
└── Ad Set 3: Buyer Agents (statewide NC)
    ├── B2B variant scripts (from script doc)
    └── Audience: NC buyer-side realtors
```

### Creative variants to upload (per ad set)

**Videos (3 — pick at least 2):**
1. 30s — Pre-Listing pain hook
2. 60s — Equity-protection with proof
3. 90s — Full narrative + soft pitch to Pre-Listing Audit

**Primary text (5 hooks to test):**
1. "Listing your home soon? There's a $20K repair surprise hiding in it right now."
2. "Most sellers lose $20K to repair surprises during escrow. Here's how to find them before you list."
3. "Home inspectors can't legally tell you what repairs cost. A licensed GC can."
4. "Before you list — find out what's actually going to cost you. Free GC-certified checklist inside."
5. "If you're listing your NC home in 2026, this 5-page checklist could save you a $20K credit at the closing table."

**Headlines (3 to test):**
1. "Free GC-Certified Pre-Listing Checklist"
2. "Avoid the $20K Equity Loss During Escrow"
3. "What to Fix, Disclose, or Skip — Before You List"

**Descriptions (2 to test):**
1. "Licensed NC GC. 5 pages. Real cost ranges. Free PDF."
2. "Built by a licensed NC General Contractor. Real numbers. No fluff."

**CTA button:**
- "Download" (most converting on Meta for lead magnets — beats "Learn More" by ~30%)

**Text overlay (compliance, applied to all variants):**
- Bottom-right of video frame
- Text: `NC GC License #107724`
- Font: Inter or system sans-serif, 14pt, white with 60% opacity drop-shadow for readability

### Tracking parameters

Append to the LP URL (https://southerncitiesconstruction.com/guide/pre-listing-checklist) for every ad variant:

```
?utm_source=meta&utm_medium=paid_social&utm_campaign=pre-listing-checklist&utm_content={{ad.id}}&utm_term={{adset.id}}
```

This lets you see in Google Analytics / GHL which exact creative variant drove the lead.

## Google Setup (Secondary channel — $750/mo)

### Performance Max campaign

```
Campaign: SCC Pre-Listing Checklist (Search + Display)
└── Asset Group 1: Pre-Listing Checklist
    ├── 5 headlines (30 char max each)
    ├── 5 long headlines (90 char max)
    ├── 5 descriptions (90 char max)
    ├── 3 videos (30s/60s/90s reuploaded)
    ├── 5 square images (1:1) — pulled from video stills
    ├── 5 landscape images (16:9) — pulled from video stills
    ├── 1 logo
    └── 1 text asset: "NC GC License #107724" (always-shown)
```

### Keywords (Search portion)

**Top-of-funnel intent:**
- "pre-listing inspection NC"
- "what to fix before selling home Charlotte"
- "pre-listing repair checklist"
- "selling my home what to disclose NC"

**Bottom-of-funnel intent (for the GC-Grade Inspection product, not the lead magnet):**
- "pre-listing inspection Charlotte cost"
- "GC pre-listing inspection NC"

## Budget allocation (initial, first 30 days)

| Channel | Daily | Monthly | Lead-magnet target |
|---|---|---|---|
| Meta DCO — Ad Set 1 (Listing Agents) | $13 | $400 | Pre-Listing Checklist |
| Meta DCO — Ad Set 2 (Sellers) | $13 | $400 | Pre-Listing Checklist |
| Meta DCO — Ad Set 3 (Buyer Agents) | $7 | $200 | Pre-Offer Checklist |
| Google Performance Max | $25 | $750 | Both checklists + GC-Grade Inspection |
| LinkedIn (investors) | $10 | $300 | Investor Pre-LOI Checklist |
| Apollo + Instantly (cold email tooling) | $15 | $450 | B2B outreach to NC realtors |

Total: $2,500/mo

## Metrics to watch (weekly)

| Metric | Target | Action if missed |
|---|---|---|
| CPL (cost per lead) | $5–10 | If >$15 after 2 weeks → pause and audit creative |
| Lead-magnet form completion rate | 35%+ | If <20% → LP isn't converting, fix copy |
| Email-to-paid conversion (60-day) | 2–5% | If <1% → nurture sequence isn't working |
| Best-performing video length | (whatever wins) | Reallocate budget toward winning length |
| Best-performing hook | (whatever wins) | Pause losing variants, double down on winners |

After 2 weeks of data, Meta DCO will start auto-allocating to winning combinations. Don't manually pause variants for the first 7 days — let it learn.

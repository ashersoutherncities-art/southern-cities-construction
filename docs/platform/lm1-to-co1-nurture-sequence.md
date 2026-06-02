# Platform Nurture Sequence — LM1 → CO1

**Goal:** Convert a free LM1 snapshot capture into a paid CO1 Investor Execution Review ($499) within 30 days.

**Trigger:** Contact tagged `platform-lm1-captured` (fires automatically when investor submits the Rehab Budget Snapshot form at `/lp/rehab-budget-range-execution-risk-snapshot`).

**Sender:** Darius T. Walton / Southern Cities Construction · NC GC License #107724

**Sequence length:** 6 emails over ~28 days

**Stop conditions:** Workflow stops the moment ANY of these tags is added:
- `purchased-platform-co1-execution-review` — they bought CO1
- `platform-co2-purchased` / `platform-co3-purchased` — they jumped straight to setup or oversight
- `platform-co4-engaged` / `platform-co5-engaged` — they went straight to GC engagement

---

## Email 1 — Snapshot delivered (immediate, on `platform-lm1-captured`)

**Subject:** Your rehab budget snapshot is ready ↓
**Pre-header:** And the question this snapshot can't answer.

> Hey {{contact.first_name}},
>
> Your snapshot is attached. Here's the range we estimated for the property:
>
> **{{LM1 Project Category}} project · {{LM1 Estimated Budget Range}} · {{LM1 Confidence Level}} confidence**
>
> A few important things to know before you act on this number:
>
> This is **directional**. It's a rules-based estimate built on classification + multipliers + market norms. It tells you what the project *probably* costs. It does NOT tell you whether the project is *realistically executable* within those assumptions in your specific market right now.
>
> Most investors stop at the budget number. The deals that fail in escrow or in execution are the ones where the budget was theoretically right but operationally wrong — labor pricing in the local market spiked, the permit path was longer than assumed, sequencing didn't account for a particular trade, the contractor mix wasn't appropriate to the scope.
>
> The next step — when you're ready — is a licensed-GC pressure test of those assumptions before earnest money goes hard. Reply to this email or hit the link below. I'll show you what the CO1 Investor Execution Review looks like and we'll talk about whether this specific deal needs it.
>
> — Darius T. Walton
> Southern Cities Construction · NC GC License #107724

---

## Email 2 — Why budgets fail (Day 3)

**Subject:** The 4 ways your snapshot budget can be wrong
**Pre-header:** Not because the math is wrong. Because the assumptions are.

> Hey {{contact.first_name}},
>
> A rehab budget snapshot is a starting point — not a finished number. Here are the four most common ways the range can be off, and how to know if YOUR deal is exposed to any of them:
>
> **1. Local labor market spike.** National averages and regional norms work most of the time. But certain NC submarkets (Charlotte uptown, Asheville, Wilmington beach areas) routinely run 20–35% above regional norms because of trade availability. If your deal is in one of these markets, the snapshot is light.
>
> **2. Permit path is longer than assumed.** A "moderate rehab" classification assumes a normal permit cycle. If the work touches the structural envelope, has prior unpermitted work, or is in a jurisdiction with a slow review queue, the timeline assumption can be off by 6–12 weeks. That's holding costs you weren't underwriting.
>
> **3. Hidden execution risk.** Galvanized plumbing throughout. Federal Pacific panel. Aluminum wiring. Polybutylene. Each one is a category-shifter — a deal that looks like "rental turn" becomes "heavy rehab" because of a single hidden item.
>
> **4. Sequencing gaps.** The classification assumes a typical sequence. If the actual scope requires non-typical sequencing (HVAC before drywall before flooring), the timeline + labor costs change.
>
> The Investor Execution Review (CO1) catches all four. It's a licensed NC GC reviewing your specific deal against current market labor + materials, permit reality, and execution sequencing. $499 flat, 2 business days, fully refundable as credit against CO2 / CO3 / CO4 / CO5 if you continue.
>
> Want to run the snapshot you got through a CO1 review? Reply and I'll send the intake form.
>
> — Darius

---

## Email 3 — The execution probability frame (Day 7)

**Subject:** The question your snapshot doesn't answer
**Pre-header:** "Can this project actually execute within those assumptions?"

> Hey {{contact.first_name}},
>
> Underwriting is two questions:
>
> 1. Will the math work if the project executes within assumptions?
> 2. Can the project actually execute within those assumptions?
>
> Snapshots and rules-based tools answer question one. They cannot answer question two — and question two is where most investor deals get broken.
>
> "Execution probability" is the framing I'd push you toward. It's not "is this project doable" — every project is doable with enough money. It's "is this project executable within the budget, timeline, and assumption set the deal requires to be profitable."
>
> When you reach that question, the rules-based snapshot has done its job. The next step is a human pressure-test by someone who's actually built dozens of projects in your market.
>
> That's CO1.
>
> $499, 2 business days. Fully refunded as credit on any later engagement (CO2 setup, CO3 oversight, CO4 owner-build, CO5 full GC). So if you continue working with SCC at any deeper level, the $499 effectively cost you nothing.
>
> Want to know what CO1 covers specifically? Here's the page: https://southerncitiesconstruction.com/platform/co1
>
> — Darius

---

## Email 4 — Case-study style proof (Day 14)

**Subject:** When CO1 actually mattered
**Pre-header:** A real example of where the budget snapshot was wrong.

> Hey {{contact.first_name}},
>
> Quick example, framed generically because client confidentiality matters:
>
> An investor ran a snapshot on a 1,400 sq ft Charlotte property. Classification: moderate rehab. Snapshot range: $42K–$68K. Confidence: medium. Looked like a clean deal.
>
> They paid $499 for a CO1 Execution Review before earnest money went hard.
>
> What the CO1 surfaced:
>
> - **Polybutylene plumbing throughout.** Visible at the water heater. Would have been a buyer-financing flag at resale + $12K repipe. Snapshot missed it because the classification engine had no way to know.
> - **Permit path was 11 weeks, not 6.** This jurisdiction had a backlog. The investor's timeline assumption was off by 5 weeks = ~$8K in additional holding costs.
> - **Roof was past useful life.** Snapshot priced a partial repair. CO1 said full replacement was required for FHA/VA financing the buyer would likely use. $15K, not the snapshot's $4K assumption.
>
> Total miss vs snapshot: ~$31K. Deal had a $25K margin assuming snapshot was right.
>
> They walked. Found a different deal the next month. The $499 CO1 saved them from losing $25K (or more, after closing costs).
>
> Not every deal needs a CO1. But every deal worth more than $10K in margin probably does.
>
> Run yours: https://southerncitiesconstruction.com/platform/co1
>
> — Darius

---

## Email 5 — Refundable-fee mechanic (Day 21)

**Subject:** The $499 is refundable. Read this before you decide.
**Pre-header:** The CO1 fee is structured so it's free if you keep working with us.

> Hey {{contact.first_name}},
>
> One thing I want to make explicit because most investors don't realize this:
>
> The $499 CO1 fee is **fully credited back** if you engage SCC at any deeper level on the same project:
>
> - Use CO2 (Project Setup) for the same property → $499 refunded against the CO2 fee
> - Use CO3 (Active Oversight) → $499 refunded against the first month
> - Use CO4 (GC-Supported Owner Build) → $499 refunded against the engagement
> - Use CO5 (Full GC) → $499 refunded against the project fee
>
> So the only investors who actually pay $499 net are the ones who:
>
> 1. Run the review
> 2. Decide NOT to do the deal (because CO1 surfaced something that killed the deal)
>
> And in that case, the $499 saved them from a deal that would have lost them $5K–$50K+ in execution surprises.
>
> Either way, the math works. Run the review.
>
> https://southerncitiesconstruction.com/platform/co1
>
> — Darius

---

## Email 6 — Final nudge + soft handoff (Day 28)

**Subject:** Last note on the snapshot for {{Property Address}}
**Pre-header:** And what to do if you're not ready yet.

> Hey {{contact.first_name}},
>
> Last note on the snapshot I sent you four weeks ago for {{Property Address}}.
>
> If you've moved on from that deal — no problem. The snapshot tool is free, run another one anytime: https://southerncitiesconstruction.com/lp/rehab-budget-range-execution-risk-snapshot
>
> If you're still considering it OR you have a different deal in the pipeline — the CO1 Investor Execution Review is the right next step. $499, 2 business days, refundable against anything deeper.
>
> If neither of those fits — I'll move you off this sequence and onto the monthly platform newsletter. Reply with anything if you want me to know what you're actually working on. I read every reply personally.
>
> — Darius T. Walton
> Southern Cities Construction
> NC GC License #107724
> (980) 473-7249

---

## Compliance footer (required on every email)

```
—
Southern Cities Construction
NC GC License #107724
southerncitiesconstruction.com · (980) 473-7249
[Unsubscribe] · [Privacy]
```

## GHL workflow setup (build this in GHL)

### Trigger
**Contact Tag Added:** `platform-lm1-captured`

### Stop conditions (any of these stops the workflow)
- Tag added: `purchased-platform-co1-execution-review`
- Tag added: `platform-co2-purchased`
- Tag added: `platform-co3-purchased`
- Tag added: `platform-co4-engaged`
- Tag added: `platform-co5-engaged`

### Schedule

| # | Action | Delay | Template name in GHL |
|---|---|---|---|
| 1 | Send Email | Immediate | `LM1-1-snapshot-delivered` |
| 2 | Wait | 3 days | — |
| 3 | Send Email | — | `LM1-2-why-budgets-fail` |
| 4 | Wait | 4 days | — |
| 5 | Send Email | — | `LM1-3-execution-probability` |
| 6 | Wait | 7 days | — |
| 7 | Send Email | — | `LM1-4-case-study` |
| 8 | Wait | 7 days | — |
| 9 | Send Email | — | `LM1-5-refundable-fee` |
| 10 | Wait | 7 days | — |
| 11 | Send Email | — | `LM1-6-final-nudge` |
| 12 | Add Tag | — | `platform-nurture-complete` |

### Settings
- Time zone: Eastern (NC local)
- Send window: 9am–5pm ET weekdays only
- Skip weekends + US holidays

## Personalization variables expected

The emails use these GHL custom fields populated by the LM1 form:

- `{{contact.first_name}}` — standard GHL field
- `{{LM1 Project Category}}` — populated by LM1 form (rules engine output)
- `{{LM1 Estimated Budget Range}}` — populated by LM1 form
- `{{LM1 Confidence Level}}` — populated by LM1 form
- `{{Property Address}}` — populated by LM1 form

If these custom fields aren't yet created in GHL, create them before launching the workflow.

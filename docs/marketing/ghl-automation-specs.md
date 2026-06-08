# GHL Automation Specs — Lead-Magnet → Nurture → Conversion

Everything you need to build in the GHL workflow UI. Three workflows total:

1. **Lead Magnet Welcome + Realtor Nurture** (new — for realtor lead magnets)
2. **Lead Magnet Welcome + Investor Nurture** (Phase 2, structure noted)
3. **Order Fulfillment Stop** (small workflow — stops nurture when purchase happens)

Plus tag-based **stop conditions** so contacts exit the nurture cleanly when they buy.

---

## Workflow 1 — Realtor Nurture Sequence

### Trigger

**Contact Tag Added** — fires when EITHER of these tags is added:
- `lead-magnet-gc-certified-pre-listing-checklist`
- `lead-magnet-gc-certified-pre-offer-checklist`

GHL doesn't natively support "OR" in tag triggers via a single trigger node — so configure TWO trigger nodes, both pointing into the same workflow.

### Stop conditions (top-of-workflow)

Add a "Stop on event" rule:
- **Tag added:** any tag matching pattern `purchased-*`
- **Effect:** Remove from workflow immediately

This ensures the moment a contact buys ANY product, the nurture stops and the **Order Fulfillment Workflow** (existing) takes over.

### Steps

| # | Type | Delay | Content / Action |
|---|---|---|---|
| 1 | Send Email | Immediate | Email 1 (Welcome + Deliver) — paste from `realtor-nurture-sequence.md` |
| 2 | Wait | 3 days | — |
| 3 | Send Email | — | Email 2 (Identify the moment) |
| 4 | Wait | 4 days | — |
| 5 | Send Email | — | Email 3 (Authority + the GC moat) |
| 6 | Wait | 5 days | — |
| 7 | Send Email | — | Email 4 (Negotiation moment) |
| 8 | Wait | 9 days | — |
| 9 | Send Email | — | Email 5 (The flagship) |
| 10 | Wait | 7 days | — |
| 11 | Send Email | — | Email 6 (Bundle math + soft close) |
| 12 | Wait | 60 days | — |
| 13 | Add Tag | — | `nurture-complete-no-purchase` |

### Settings

- **Time zone:** Asher's local (NC) so emails go out at 9am ET
- **Quiet hours:** 8pm–7am ET (no emails sent during this window — pushed to next morning)
- **Skip weekends:** Yes (less ignored email)
- **Subject line A/B testing:** Optional — turn on after the first 50 leads

---

## Workflow 2 — Investor Nurture Sequence (Phase 2)

### Trigger

**Contact Tag Added:** `lead-magnet-gc-certified-investor-pre-loi-checklist`

### Sequence structure (5 emails over ~4 weeks)

1. **Day 0** — Welcome + Deliver (with PDF link)
2. **Day 4** — Pain framing: the construction-side risks every investor underwrites incorrectly
3. **Day 10** — Authority: why a GC sees risks an inspector doesn't
4. **Day 18** — The flagship investor product: Investor Deal Review ($499)
5. **Day 28** — The bundle math: Due Diligence Bundle ($1,499 saves $300+)

*Email copy to be drafted in Phase 2.*

### Stop conditions

Same as Workflow 1 — stop on any `purchased-*` tag.

---

## Workflow 3 — Post-Purchase Upsell (Phase 2)

After the first purchase, a contact enters this workflow.

### Trigger

**Contact Tag Added:** any `purchased-*` tag

### Stop conditions

- Tag added: `purchased-listing-transaction-package` OR `purchased-buyer-transaction-package` → they already bought a bundle, no further upsell needed in the short-term
- Tag added: `nurture-complete-no-purchase` removed automatically (since they DID purchase)

### Logic

The workflow routes based on which product they bought first:

| First purchase | Upsell after 7 days | Upsell after 21 days |
|---|---|---|
| `purchased-inspection-response-service` (Same-Day Read) | → Realtor Inspection Review ($299) | → Buyer/Listing Package ($1,999/$2,299) |
| `purchased-realtor-inspection-review` | → Repair Credit/Scope Letter ($349) | → GC-Grade Inspection ($899) |
| `purchased-repair-credit-letter` | → Buyer/Listing Package | → Subscription tier |
| `purchased-repair-scope-letter` | → Buyer Package ($1,999) | → Subscription tier |
| `purchased-gc-grade-property-inspection` | → Buyer/Listing Package ($1,999/$2,299) | → Subscription tier |
| `purchased-buyer-transaction-package` | → Subscription tier (Solo/Team) | — (stop) |
| `purchased-listing-transaction-package` | → Subscription tier (Solo/Team) | — (stop) |

### Implementation note

GHL "Decision" branches handle the routing. Build it as a single workflow with multiple decision points, OR build 7 separate small workflows (one per first-purchase product). Smaller workflows are easier to maintain.

---

## Workflow 4 — Subscription Conversion Trigger (Phase 2)

### Trigger

**Custom Condition:** Contact has 2+ tags matching `purchased-*` in last 6 months

### Action

- Create Task: "Manual outreach — call/text {{contact.first_name}} about Solo/Team subscription tier"
- Assign Task to: Asher

### Why it's manual, not automated

Subscription pitches need human voice + context on the agent's specific deal flow. The data ($249/mo Solo for 3–10 deals/mo, $649/mo Team for 3–6 agents, $2,499/mo Brokerage) only makes sense in conversation. The trigger just flags "this person is buying repeatedly, time to upgrade them."

---

## Lead-Magnet Tag → Email Mapping (Reference)

When you create the emails in GHL's email builder, use these tags so segmentation works later:

| Email Template Name | Used in Workflow | Description |
|---|---|---|
| `LM-R1-Welcome` | Realtor Nurture | Welcome + deliver PDF |
| `LM-R2-Moment` | Realtor Nurture | Identify the deal moment |
| `LM-R3-Authority` | Realtor Nurture | GC vs inspector legal frame |
| `LM-R4-Negotiation` | Realtor Nurture | Repair Letter pitch |
| `LM-R5-Flagship` | Realtor Nurture | GC-Grade Inspection pitch |
| `LM-R6-Bundle` | Realtor Nurture | Package math + soft close |
| `LM-I1-Welcome` through `LM-I5-Bundle` | Investor Nurture | (Phase 2) |
| `UPSELL-{first-product}` | Post-Purchase Upsell | Various — one per first-purchase product |

---

## Phase 1 vs Phase 2 build order

**Phase 1 (do now, in this order):**

1. Create the 6 realtor nurture emails in GHL's email builder (copy-paste from `realtor-nurture-sequence.md`)
2. Build Workflow 1 (Realtor Nurture) with the schedule above
3. Add stop condition for any `purchased-*` tag
4. Test: add `lead-magnet-gc-certified-pre-listing-checklist` to a test contact → verify Email 1 fires immediately, Email 2 fires after 3 days

**Phase 2 (after Phase 1 has 20+ leads through it):**

5. Draft + build investor nurture emails (5 emails)
6. Build Workflow 2 (Investor Nurture)
7. Build Workflow 3 (Post-Purchase Upsell) — 7 small workflows
8. Build Workflow 4 (Subscription Conversion Trigger)

---

## Metrics to watch in GHL

After 30 days of running Phase 1, check:

| Metric | Target | Action if missed |
|---|---|---|
| Email 1 open rate | 70%+ | Subject line A/B test |
| Email 1 click rate (PDF download) | 90%+ | If low, the PDF link isn't prominent enough |
| Email 6 open rate | 30%+ | If <20%, sequence is too long or off-topic |
| Lead-to-paid conversion | 2–5% within 60 days | If <1%, the products on offer don't fit the audience |
| Reply rate (any email) | 1–3% | Replies = high-intent — manually follow up |
| Unsubscribe rate | <5% | If >10%, the nurture cadence is too aggressive |

---

## Recommended ad budget allocation (Phase 1)

Once the nurture workflow is built and tested, here's a realistic Meta/Google ad allocation for the first 90 days:

| Channel | Budget/mo | Targeting | Goal |
|---|---|---|---|
| Meta (Facebook + Instagram) | $400 | NC real estate agents, age 28–55 | $5–10 CPL on the Pre-Listing Checklist |
| Meta (Facebook + Instagram) | $400 | NC real estate agents (buyer-focused) | $5–10 CPL on the Pre-Offer Checklist |
| Google Search | $400 | "pre-listing inspection checklist" + similar | $7–15 CPL, higher intent |
| LinkedIn (optional) | $300 | NC investors, residential | $15–25 CPL on the Investor Pre-LOI Checklist |

Total: **~$1,500/mo**. At 5% lead-to-paid conversion, that's 8–15 leads/week → 1–3 paid customers/week. Realistic ROAS only positive after 60–90 days as the LTV stack builds.

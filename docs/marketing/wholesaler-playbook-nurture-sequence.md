# Wholesaler Playbook → Deal Pack Nurture Sequence

**Goal:** Convert a free "$25–40K Assignment Playbook" download into a GC-Verified Deal Pack purchase (Bid-Ready $599 / Build-Ready $1,997).

**Trigger:** Contact tagged `nurture-wholesaler` (added at the end of the "Wholesaler Lead Assignment" workflow, after the PDF delivery email).

**Sender:** Southern Cities Construction · orders@southerncitiesconstruction.com · NC GC License #107724
**Voice:** Brand ("we" / "The Southern Cities Team") — no personal name.
**Length:** 5 emails over ~18 days (runs AFTER the immediate PDF-delivery email).

**Stop conditions:** End workflow if the contact is tagged `customer`, `deal-pack-purchased`, `unsubscribed`, or replies STOP.

---

## Email 2 — The reframe (Day 2)
**Subject:** The rehab number is where your spread dies
**Pre-header:** Buyers don't argue your price. They argue your rehab estimate.

> Hey {{contact.first_name}},
>
> Quick follow-up on the Assignment Playbook.
>
> Here's the pattern we see most: a wholesaler locks up a solid deal, the cash buyer walks the property, and then comes the line — "the rehab's gonna run way more than that." Suddenly your $35K assignment is an $18K one.
>
> The deal didn't change. The number just wasn't defensible.
>
> Three things buyers check that a napkin number misses:
> 1. Permit-triggering work hiding behind "cosmetic" scope
> 2. Mechanical, electrical & plumbing the comps never show
> 3. Real labor costs by trade in today's NC market
>
> When your rehab number is backed by a licensed GC, there's nothing left to argue.
>
> Got a deal in your pipeline right now? Reply with the address and we'll tell you if your number looks defensible.
>
> — The Southern Cities Team

---

## Email 3 — The proof (Day 4)
**Subject:** How a $32K assignment almost became $18K
**Pre-header:** Same deal, two very different numbers.

> Hey {{contact.first_name}},
>
> A wholesaler we worked with had a deal under contract — solid spread, motivated buyer. On the walk-through, the buyer started picking the rehab apart: "this needs a full repipe," "that roof's shot," "you're light on the electrical."
>
> The wholesaler had no way to push back. The number was a guess.
>
> We put a GC-verified budget and scope on the property — line by line, what's actually required to current NC code. No gold-plating, no band-aids. The repipe the buyer "assumed"? Not needed. The electrical? Already to code.
>
> The buyer stopped negotiating. The deal closed at $32K instead of the $18K they were trying to chop it to.
>
> That's the whole game: a number nobody can argue with.
>
> 👉 This is exactly what a GC-Verified Deal Pack gives you: https://southerncitiesconstruction.com/deal-pack
>
> — The Southern Cities Team

---

## Email 4 — The offer (Day 7)
**Subject:** What a GC-Verified Deal Pack actually gets you
**Pre-header:** A number your buyer can't argue with — in writing.

> Hey {{contact.first_name}},
>
> When you're ready to put a defensible number on a deal, here's how it works.
>
> A GC-Verified Deal Pack is a licensed GC's budget and scope on your actual property — the document you hand a buyer so they stop negotiating against your spread.
>
> Two tiers most wholesalers use:
> • **Bid-Ready ($599)** — a GC-verified rehab budget and scope you attach to your assignment. The number buyers trust.
> • **Build-Ready ($1,997)** — everything in Bid-Ready plus a full trade-by-trade scope and plan, AND we commit to do the work at the price we write. 3–4 day turnaround. For buyers who want to move straight to construction with the same GC who wrote the number.
>
> Not sure your deal even pencils yet? Start free with a ballpark range — we'll give you a rough number before you spend a dime.
>
> 👉 See the tiers: https://southerncitiesconstruction.com/deal-pack
>
> — The Southern Cities Team

---

## Email 5 — The objection (Day 12)
**Subject:** Is $599 worth it to verify a deal?
**Pre-header:** Do the math on the spread you're protecting.

> Hey {{contact.first_name}},
>
> Fair question. Here's the math.
>
> A Bid-Ready Deal Pack is $599. The spread you're protecting on a single assignment is $25–40K. If a verified number keeps a buyer from chopping even $5K off your fee, it paid for itself 8 times over — on one deal.
>
> And it's not just one assignment. Once buyers know your deals come with a GC-verified number, they stop treating you like every other wholesaler. They start taking your deals first.
>
> That's the real return: you become the wholesaler whose numbers hold up.
>
> 👉 Get your next deal verified: https://southerncitiesconstruction.com/deal-pack
>
> — The Southern Cities Team

---

## Email 6 — Final nudge + free option (Day 18)
**Subject:** Last note — and a free way to start
**Pre-header:** No deal in pipeline? Keep the Playbook for the next one.

> Hey {{contact.first_name}},
>
> Last note in this series.
>
> If you've got a deal in your pipeline right now, the fastest way to protect your spread is to get the rehab number verified before your buyer walks it. Start free with a ballpark range — zero cost, zero risk: https://southerncitiesconstruction.com/deal-pack
>
> If you're between deals, no problem — keep the Assignment Playbook handy and run the 5-question rehab check on the next one.
>
> Either way, when you're ready to put a number on a deal that buyers can't argue with, we're here.
>
> — The Southern Cities Team

---

## Compliance footer (paste at the bottom of every email — required)
```
—
Southern Cities Construction
NC GC License #107724
southerncitiesconstruction.com · (980) 473-7249
{{custom_values.unsubscribe_url}} · {{custom_values.privacy_url}}
```

---

## GHL build — the nurture workflow

**Create a new workflow:** "Wholesaler Playbook Nurture"

**Trigger:** Contact Tag added → tag = `nurture-wholesaler`

**Steps (in order):**
| Step | Action | Detail |
|---|---|---|
| 1 | Wait | 2 days |
| 2 | Send Email | Email 2 — reframe |
| 3 | Wait | 2 days |
| 4 | Send Email | Email 3 — proof |
| 5 | Wait | 3 days |
| 6 | Send Email | Email 4 — offer |
| 7 | Wait | 5 days |
| 8 | Send Email | Email 5 — objection |
| 9 | Wait | 6 days |
| 10 | Send Email | Email 6 — final nudge |

**From Name:** Southern Cities Construction · **From Email:** orders@southerncitiesconstruction.com

**Stop / exit:** In workflow Settings, remove contact if tagged `customer`, `deal-pack-purchased`, `unsubscribed`, or replied STOP.

**Connect it to the main workflow:** at the END of "Wholesaler Lead Assignment," add a final step → **Add Contact Tag = `nurture-wholesaler`**. That hands the lead off into this nurture automatically.

# Southern Cities — Money Model Launch Spec
NC GC License #107724 · drafted 2026-08-01

Two separate money models (Hormozi: attraction → core → upsell → downsell → continuity).
**Run the Realtor ladder first for fast cold proof. Build the Wholesaler ladder ready to switch on.**

Before launch: **lock every rung price to ONE source of truth.** `services-data.ts`, `deal-pack/page.tsx`,
and `/lp` pages currently disagree in places — a money model breaks if the rungs contradict across pages.

---

## LADDER 1 — REALTOR (run first)

Hero: **Inspection + GC Budget Report ($899)**. Buyer pain: winning listings + surviving inspection.

| Layer | Product | Price | Trigger / job |
|---|---|---|---|
| Attraction (tripwire) | Same-Day Quick Read | **$199** | Next inspection report → top 3–5 items that matter + $ ranges, in 4 hrs |
| Core | Inspection + GC Budget Report (on-site + 3-tier estimate) | **$899** (·$1,199 rush) | Turns an inspection fight into a closing tool |
| Upsell (attach to live deal) | Repair Credit Letter $349 · Appraisal Response Letter $449 · Repair Verification Visit $249 · Negotiation Read $299 | +$249–$449 | Same hot deal, more concessions won |
| Bundle upsell | Listing Transaction Package / Buyer Transaction Package | $2,299 / $1,999 | "Whole transaction covered, one price" |
| Downsell | Realtor Inspection Review (report-only, no on-site) → then Quick Read | $299 → $199 | Recover the no to $899 |
| Continuity | Realtor Solo / Team / Brokerage Pro | $299 / $649 / $2,499 /mo | A GC on call for every deal |

**Order bumps (at $899 Report checkout):**
- "+ Repair Credit Letter, normally $349 — add for $249 with your Report" (pre-arms the negotiation).
- "+ Repair Verification Visit $249" for buyers days from closing.

**Downsell logic:** prospect balks at $899 → offer $299 report-only Inspection Review ("same GC read, you skip the on-site visit") → still no → $199 Quick Read as the smallest yes. A no to $899 is a no to on-site today, not a no to you.

**Continuity pitch (Solo $299/mo):** "Every deal you write carries construction risk you can't price. For $299/mo you get [N] Quick Reads, member pricing on full Reports, and a licensed GC on call — the unfair advantage the agent across the table doesn't have." Team/Brokerage = seats.

**Attraction outbound — CALL + EMAIL ONLY (never cold-text realtors).**

Cold call (goal: get a yes to *try* one Quick Read on their next inspection, or book 10 min):
> "Hi [Name], this is [You] with Southern Cities — we're a licensed NC general contractor, #107724. Quick reason for the call: when your inspection report comes back on a deal, instead of guessing at repair numbers or chasing a contractor for a callback, you send it to us and a licensed GC gives you back the 3–5 items that actually matter with real dollar ranges — same day, $199. It's the number you use to protect your client and hold the deal together. Do you have a deal in inspection right now, or one coming up this week?"

- If yes/warm → "Great — next report you get, forward it to [email/portal] and we'll turn it in 4 hours. Want me to text you the link so it's handy?" (they opt in → now you have consent).
- If not now → book the follow-up, send the email.

Follow-up email (subject: "The inspection number, same day — $199"):
> [Name] — licensed NC GC here (#107724). When an inspection report lands, we give you the 3–5 items that matter, with real repair-cost ranges, same day for $199 — so your repair-credit ask is defensible instead of a guess. Next report you get, send it over: [link]. If the deal's bigger, we also do a full on-site inspection + GC budget report ($899) that a lot of agents attach right to their listing. — [You], Southern Cities · NC GC #107724

**2-week target:** ~150 dials → ~20 conversations → **5 Quick Reads or 3 full Reports paid, from cold agents.** That number is your demand answer.

---

## LADDER 2 — WHOLESALER / INVESTOR (build ready, switch on after Realtor proof)

Hero: **Build-Ready Deal Pack ($1,997)** — the binding build commitment, powered by the vetted statewide sub bench.

| Layer | Product | Price | Trigger / job |
|---|---|---|---|
| Attraction | Rehab Budget Range & Execution-Risk Snapshot (free tool) | $0 | Rough number, reveals need for a GC-verified one |
| Core / flagship | Build-Ready Deal Pack (budget+scope+plans+designs+mood board+materials/furniture+market report+sub quotes+vendor list+closing sweep + **we build it at that price**) | **$1,997** | The only product carrying the build commitment |
| Order bump | Site Scan + As-Built (no plans/measurements) | ~$499 (confirm) | Required input for accuracy when no plans exist |
| Upsell / ascension | Project Setup → Active Oversight → Investor-Led Build → Full GC | $3,500 → $6.5–28.5K → GC contract | From a deal into the actual construction |
| Downsell (= on-ramp) | Bid-Ready Deal Pack (budget+scope+risk, no build commitment) | **$599, credits forward** | Recover the no to $1,997; deposit on the core |
| Handoff (overflow revenue) | Refer out-of-box deals to a vetted GC in the network | referral fee / rev-share | Monetize deals too big/far/outside wheelhouse |
| Continuity | Deal Pack Pro | **$897/mo** | 2 Bid-Readys/mo, +$399 each after, 25% off Build-Ready, GC-Verified badge |

**Order bump (Bid-Ready checkout):** "No existing plans? Add Site Scan + As-Built so the number is accurate." Then immediate ascension offer: "Upgrade to Build-Ready — your $599 credits forward, net $1,398 — and we commit to build it at the price we write."

**Downsell logic:** balks at $1,997 Build-Ready → offer $599 Bid-Ready **framed as "start here, it credits forward"** (never "the cheaper one") → still no → free Snapshot + nurture.

**Handoff logic:** deal is too big, out of region, commercial, or timeline-impossible → route to a vetted GC in the network → capture a flat referral fee or % rev-share in a short referral agreement. Every "we can't take this" becomes revenue, not a dead lead.

**Continuity pitch (Deal Pack Pro $897/mo):** "If you run 2+ deals a month, Pro pays for itself — 2 Bid-Readys included, 25% off every Build-Ready, priority 2-day turnaround, and a 'GC-Verified by Southern Cities #107724' badge on every assignment listing that makes your deals move faster."

**Attraction outbound (call + email; SMS only after opt-in):**
> "This is [You] with Southern Cities, a licensed NC GC. Before you offer on your next deal, run it through our free rehab budget snapshot — you'll get a decision-grade cost range, timeline, and the execution risks in a couple minutes, so you're not underwriting off a guess. Want the link?" → then Bid-Ready ($599) → Build-Ready ($1,997).

---

## SEQUENCING
1. **Weeks 1–2:** run Realtor attraction outbound to the 17K-realtor list. Hit the paid-conversion target from cold agents. That proves demand.
2. **Week 3+:** flip on Wholesaler ladder — free Snapshot as the attraction, Build-Ready as the hero, sub bench marketed as the moat.
3. Don't run both cold at once. Prove one, clone the structure.

## PRE-LAUNCH CHECKLIST
- [ ] Reconcile rung prices across `services-data.ts`, `deal-pack/page.tsx`, `/lp` pages.
- [x] ~$699 Site Scan + Inspection package — ALREADY a live SKU (`deal-pack-site-scan` in lib/cart.ts, buyable at /cart?cart=deal-pack-site-scan). Optional: add a no-as-built variant.
- [x] Sub DB schema now tracks pricing (rate card + sub_quotes history) + availability per trade per region — `supabase/subcontractors_master.sql` (Phase 1 foundation). Still to do: apply it + the 119-sub import, then build the matching engine (Phase 2).
- [ ] Draft the GC referral agreement (fee/rev-share) for the handoff node.
- [ ] License #107724 on every marketing piece.

# Realtor Outbound Playbook — $199 Same-Day Quick Read (attraction offer)
NC GC License #107724 · drafted 2026-08-04 · CALLS + EMAIL ONLY (never cold-text realtors)

Goal: prove cold demand. Turn the 17K-realtor list into paid Quick Reads (and Reports),
answering "is there real demand" with a number, not a feeling.

## THE OFFER (attraction / tripwire)
**Same-Day Quick Read — $199.** Agent forwards an inspection report; a licensed NC GC returns
the 3–5 items that actually matter, each with a rough dollar range + a recommended response, in 4 hours.
Low-risk first purchase that leads up to the $899 Inspection + GC Budget Report (the core).

## SEGMENT (GHL smart list — build in the UI)
- Filter: tag `realtor-coldcall-2026-06`.
- Prioritize: cell-phone tag first (better connect rate), then by region (start Charlotte + Triangle).
- Suppress: anyone already tagged `aud-realtor` + purchased, or `do-not-contact`.

## CADENCE — 5 touches / 2 weeks (call + email only)
| Day | Touch | Channel |
|-----|-------|---------|
| 1 | Call #1 (script below) | Phone |
| 1 | Email #1 (if no answer / after call) | Email |
| 3 | Call #2 | Phone |
| 5 | Email #2 (follow-up) | Email |
| 10 | Call #3 (final) | Phone |
Log the outcome tag after every touch (see TAGS). No SMS in cold outreach.

## CALL SCRIPT
**Opener:**
> "Hi [Name], this is [You] with Southern Cities — we're a licensed NC general contractor, #107724.
> Quick reason for the call: when your inspection report comes back on a deal, instead of guessing at
> repair numbers or chasing a contractor for a callback, you send it to us and a licensed GC gives you
> back the 3–5 items that actually matter with real dollar ranges — same day, $199. It's the number you
> use to protect your client and hold the deal together. **Do you have a deal in inspection right now,
> or one coming up this week?**"

**If yes / warm:**
> "Perfect — next report you get, go to southerncitiesconstruction.com/lp/same-day-quick-read, and we'll turn it in 4 hours.
> Want me to email you the link so it's handy for when it lands?"  → (they say yes = opt-in captured)

**If "I have my own contractor":**
> "Totally — keep them for the work. This is different: it's a licensed GC's *written* number you can
> hand your client and the other side to justify the credit ask. Your contractor gives you a verbal;
> this gives you something defensible in writing, same day."

**If "not right now":**
> "No problem — deals move fast though. Can I send you the one-pager so when an inspection lands you've
> got it? What's the best email?"  → book the email, tag `do-realtor-quickread-pitched`.

**Goal of the call:** a yes to *try one* on their next inspection, or a booked email. Not a hard close.

## EMAIL #1  (subject: "The inspection number, same day — $199")
> [Name] — licensed NC GC here (#107724). When an inspection report lands, we give you the 3–5 items
> that matter, with real repair-cost ranges, same day for $199 — so your repair-credit ask is
> defensible instead of a guess. Next report you get, send it over: southerncitiesconstruction.com/lp/same-day-quick-read.
> If the deal's bigger, we also do a full on-site inspection + GC budget report ($899) that a lot of
> agents attach right to their listing.
> — [You], Southern Cities · NC GC #107724

## EMAIL #2  (subject: "quick one on inspection repair numbers")
> [Name] — following up. The agents using this send us the report the moment it lands and have the
> repair numbers back before the other side even responds. $199, 4-hour turnaround, licensed NC GC.
> Want the intake link for your next deal? — [You] · #107724

## OUTCOME TAGS (log in GHL after each touch — namespaced, per taxonomy)
- `do-realtor-quickread-pitched` — pitched (removes after workflow starts if automated later)
- `aud-realtor` — confirmed realtor audience
- `int-quickread` — expressed interest
- `own-quickread` — PURCHASED a Quick Read (the conversion that matters)
- `status-not-now` / `do-not-contact`

## KPIs — 2-week demand test
- Target: ~150 dials → ~20 real conversations → **5 Quick Reads OR 3 full $899 Reports, from cold agents.**
- Daily tally: dials / connects / pitched / interested / **paid**. Track paid-from-cold above all —
  that single number is the demand answer.
- If paid-from-cold ≥ 3 in 2 weeks → demand is real; scale dials + turn on the Wholesaler ladder.
- If 0 paid after 150 real dials → the offer or the segment is wrong; diagnose before spending more.

## BLOCKERS / NOTES
- GHL push is manual: tokens are dead (OAuth expired, no refresh) and smart-lists/workflows are UI-only.
  To automate later, create a GHL **Private Integration Token** (never expires) — then the cadence can run itself.
- Confirm the Quick Read intake link/email and a $199 checkout before dialing (offer must be buyable).
- License #107724 stays on every email + one-pager.

# SCC operating controls — implementation baseline (November 2026)

**Branch only: not deployed; no checkout prices, invoices, contracts, production data or auth rules changed.**

## Audit findings
- `gqmwohackdrmlpsohewp` already contains projects, estimates, orders, subcontractors (840 records), vendor invitations (310), staffing awards (9), and the GC procurement schema; do not build duplicate tables by default.
- Existing `app/api/cart-checkout/route.ts` supports bundled Stripe line items, and the current catalog has a `deal-pack-site-scan` SKU at $699. Verify **optional** add-on UX in customer flow and deal-pack agreement/fulfillment route before calling it complete.
- `app/api/ghl/booking-webhook/route.ts` has secure event recording/dedup logic; re-test live booking without generating fake billable events.
- `lib/gc-procurement.ts` has a bid-comparison model distinct from the preferred 24-hour **SCC target-price acceptance** model. Reuse vendor profiles and existing staffing_awards; do not silently replace competitive bids with automatic awards.
- Client hub Vercel deployment is READY but code tree was unavailable through API; user role/tenant access audit still required.
- Separate Supabase project `siauwfbtdtcorqouottd` has nine tables with RLS disabled, flagged critical. Map consumers and policies before changing permissions.
- QuickBooks connection row exists; **never inspect raw tokens** or assume active sync.

## Pricing policy implemented on this branch
`lib/scc-project-pricing.ts` calculates cost base = direct costs (including PM) + allocated overhead excluding warranty + separately computed/provided warranty reserve + separately approved extras. It then applies 45% markup to **that entire base**. 1.5% warranty of direct costs is the *provisional* default. All figures integer cents.
Example: $65,000 direct + $12,700 allocated overhead + $975 warranty = $78,675 cost; price = $114,078.75.
Callers **must not** pass PM twice or include warranty inside allocated overhead and again in warrantyReserveCents.
Costs and markup are business assumptions, not an authorization to send prices to clients. Technical scope, materials, labor and owner-approved estimate are mandatory first.

## Operational gates to add to existing systems
1. Pricing: scope revisions, independent technical check, accurate takeoff, allowed contingencies, financial approval.
2. Construction: signed contract, permits, partner capacity, PM kickoff inspection, procurement schedule.
3. Work: milestone evidence and governmental approvals prior to covering work.
4. Payment/closeout: executed change orders, verified milestones, accounting reconciliation, documented warranties.

## Suggested integration order
1. Audit hub source, current auth permissions, checkout and GHL flows.
2. Reuse existing project IDs and map a canonical project lifecycle.
3. Attach this pricing calculator to **internal** draft estimates after cross-checking direct/overhead/warranty inputs.
4. Implement procurement requests with $500 PM emergency and $5,000 Philippines budgeted authority as **proposed** limits, 2-hour routine and 30-minute urgent targets; do not auto-approve.
5. Extend preferred vendors with 24-hour target-price *response* and technical qualification, then inspections, customer updates and scorecards.

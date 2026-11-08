# Security + Fulfillment Critical Fixes — 2026-11-07

## Scope
Branch: `security/critical-fixes-2026-11-07`. Addresses every finding on `main` that was independently verified in this audit. Three reported findings were already fixed on main prior to this PR (noted below).

## Confirmed and fixed on main

| # | Finding | Fix |
|---|---|---|
| 1 | `generateComparisonLinkAction` signed tokens with no auth | `app/portal/bid-packages/[id]/actions.ts` now calls `authorized()`, validates the id, and checks the package exists before signing |
| 4 | Stripe webhook marked events processed before fulfillment ran | New `stripe_webhook_events` table + `beginStripeWebhookEvent` / `markStripeWebhookEventProcessed`. Event claimed on entry, flipped to processed ONLY after all fulfillment succeeds; errors leave the row unprocessed so retries re-enter cleanly |
| 5 | `/api/permit-oversight-checkout/complete` called orders without internal header + defaulted to permit workflow | Added `x-internal-secret` to the server-to-server fetch. Removed the `|| 'permit_oversight'` default so only sessions explicitly tagged `workflow=permit_oversight` run onboarding |
| 6 | Pro reorder trusted submitted email | Request must carry a signed magic-link token (`lib/construction-department/token.ts`), token email must match the submitted email, THEN the Stripe membership check runs |
| 7 | Pro reorder had no webhook fulfillment branch | Pro-reorder sessions now stamp `cart_keys` + `cart_summary` metadata, routing them through the standard cart fulfillment path. Each unit of quantity is fulfilled |
| 8 | Fulfillment loop ignored quantities | New `order_line_items` table + `deriveLineItemsFromSessionMetadata` parses authoritative per-unit records from `cart_summary`. Webhook loops per unit for GHL, Hub mirror, and Deal Pack portal provisioning |
| 9 | `gc_procurement_used` reset every month | Split monthly vs annual counters. `gc_procurement_year_start` and `site_visit_year_start` columns track the annual window; counters reset only after 365 days. Existing usage preserved on plan changes |
| 10 | `CD_PROCUREMENT_ADMIN_KEY` accepted by pages but middleware ignored it | Added it to `matchKey()` in `middleware.ts` |

## Already fixed on main (no change required this PR)

| # | Finding | Status |
|---|---|---|
| 2 | `/api/permit-oversight-orders` unauth POST | Already requires `x-internal-secret` (fail-closed) |
| 3 | Client-supplied `item.amount` | `lib/cart.ts` already uses the server catalog `product.price * quantity` for charges |
| 11 | Missing cart-order fallback on main | Webhook already creates a canonical order for cart sessions with `cart_keys` metadata |

## Migrations

Run in this order (all idempotent via `IF NOT EXISTS`):

1. `supabase/stripe_webhook_events.sql` — new dedup table. **Deploy the SQL FIRST**, then the webhook code. The old `order_events.stripe_event_id` dedup path keeps working until the new code is live.
2. `supabase/order_line_items.sql` — new per-line-item table. Deploy before the new webhook code so writes have a target; legacy orders without rows keep working.
3. `supabase/cd_members_annual_counters.sql` — adds `gc_procurement_year_start` and `site_visit_year_start` to `cd_members`, back-fills with existing `usage_period_start` or `now()`. Safe `ADD COLUMN IF NOT EXISTS` — the old code ignores the new columns; the new code reads them.

None of the migrations drop or rewrite existing data. Each uses `CREATE TABLE IF NOT EXISTS` / `ADD COLUMN IF NOT EXISTS`. They can be applied against production at any time ahead of the code deploy.

## Configuration

The fix relies on env vars that are already configured in production:
- `INTERNAL_API_SECRET` — required for the webhook → orders API hop and for the `/complete` → orders hop.
- `CD_LINK_SECRET` (falls back to `DEAL_DESK_LINK_SECRET`, then `INTERNAL_API_SECRET`) — signs the pro-reorder identity token.
- `CD_PROCUREMENT_ADMIN_KEY` — now exchangeable via `?key=<...>` on any `/portal/*` URL.

No new env vars introduced.

## Tests (`npm run test`)

40 tests across 9 files, all passing:

- `tests/bid-comparison-auth.test.ts` — `generateComparisonLinkAction` throws without a valid portal cookie; rejects empty ids
- `tests/cart-pricing.test.ts` — `getCartLineItems` ignores client-supplied amount, applies server catalog price × quantity; `parseCartSummary` validates product keys, quantities, and amounts
- `tests/cd-members-annual.test.ts` — monthly counters reset on billing-period advance, annual counters persist within the year, annual counters reset after 365 days, existing non-zero usage preserved on plan changes
- `tests/complete-workflow-routing.test.ts` — unspecified workflow metadata does NOT route to permit onboarding; explicit non-permit workflows do not; missing `INTERNAL_API_SECRET` returns 500 with a clear error; unpaid session returns 400
- `tests/line-item-derivation.test.ts` — cart_summary quantities preserved; cart_keys fallback; legacy `item` fallback; server-authoritative unit pricing regardless of metadata amount
- `tests/middleware-admin-keys.test.ts` — middleware exchanges `CD_PROCUREMENT_ADMIN_KEY`, `MARKETING_PORTAL_ACCESS_KEY`, and `REHAB_SNAPSHOT_ADMIN_KEY`; strips any unknown key; passes through no-key requests
- `tests/permit-oversight-orders.test.ts` — 401 without header, 401 with wrong header, fail-closed when env var unset, pass auth with correct header
- `tests/pro-reorder-identity.test.ts` — 401 without token, 401 on token/email mismatch, passes identity gate with matching token
- `tests/stripe-webhook-events.test.ts` — fresh event claimed; already-processed events dedup; stale in-progress events allow retry with incremented attempt; concurrent delivery reports in_progress

### Checks run
- `npm run test` — 40/40 passing
- `npm run build` — successful, no type errors
- `npm run lint` — clean (pre-existing `<img>` warnings in blog pages only, unrelated to this PR)

### What could not be run
- Live Stripe end-to-end against test mode — would require a configured Stripe test key and webhook secret in the local environment. All Stripe interactions are mocked. The webhook event lifecycle is covered by unit tests against an in-memory Supabase fake.
- Real Supabase queries — none hit a live DB. Fakes model the subset of the client surface the helpers use. Running the migrations against a staging DB is required before production deploy.

## Non-main branch coverage

Of the 7 non-main branches audited, only 2 carry unique commits; the other 5 are strict ancestors of main.

| Branch | Status | Action |
|---|---|---|
| `construction/website-redesign-v2` | Ancestor of main (0 ahead) | Delete after confirming no open PR |
| `feature/cart-checkout-and-tax` | Ancestor of main (0 ahead) | Delete after confirming no open PR |
| `positioning/investor-vs-budget-review` | Ancestor of main (0 ahead) | Delete after confirming no open PR |
| `security/critical-fixes` | Ancestor of main (0 ahead) — this is the commit that originally shipped findings #2 and #4 | Delete after confirming no open PR |
| `website-fix-2026-09-13` | Ancestor of main (0 ahead) | Delete after confirming no open PR |
| `control-center/website-redesign-v2` | 20 unique commits — ControlCenter nav/footer, LP templates, reports surface, services redesign | Separate review PR: cherry-pick design/content commits onto current main; do NOT bring the branch's `lib/cart.ts`, webhook, or permit-oversight-orders files (they are vulnerable predecessors of main) |
| `optimizer/2026-09-17-site-scc` | 1 unique commit — rate-limit module + small refactors + removes `lib/sms-consent.ts` | Separate review PR: cherry-pick single commit after verifying the SMS-consent removal against the SMS-consent-persistence policy |

## Remaining blockers / unresolved risks

- `/complete` still uses an HTTP hop to `/api/permit-oversight-orders`. Short-term fine (gate is correct). Longer-term, extract `createPermitOversightOrder(...)` into `lib/` and call it directly from both the webhook and `/complete` to remove the self-fetch and the shared-secret dance.
- `app/api/deal-desk/webhook/route.ts` uses a different (upsert-by-subscription-id) idempotency model. Not changed in this PR — scoped to primary webhook. Worth a follow-up to unify on the same `stripe_webhook_events` table.
- `INTERNAL_API_SECRET` is still reused as the fallback for the bid-comparison link secret via `lib/gc-procurement-token.ts`. Rotating it to address any future incident would silently invalidate signed comparison links. Worth splitting into dedicated secrets in a follow-up.
- All callers of `/api/deal-pack/pro-reorder` must now supply a signed token. The portal UI that posts to this endpoint needs an update (out of scope here) to include the member's access token in the request body. Until then, the endpoint will reject all reorder requests — a conservative default. The current portal link flow already issues the token for member pages; threading it into the reorder form is a small UI change.

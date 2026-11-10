# SCC campaign performance

The private report lives at `/admin/marketing`. The data flow is Meta Insights, GoHighLevel Contacts and the existing booking ledger, plus PostHog landing events → daily Supabase snapshots → Vercel report. There is no Windsor.ai dependency.

## Integration audit

- `BookingCalendarEmbed` already passes the site's campaign parameters to the GHL iframe. GHL needs matching custom fields for the values to persist.
- GHL's existing booking workflow calls `/api/ghl/booking-webhook`. That route deduplicates on appointment ID in `scc_webhook_events` and mirrors each successful insert to PostHog. The report reads the ledger and leaves the webhook unchanged. Reusing the ledger avoids counting the PostHog mirror, confirmation page visits, Meta conversions, and retries as additional appointments.
- The PostHog landing event already supplies `campaign_id`, `utm_source`, and `utm_campaign`. Calendar views and CTA clicks lack the same explicit campaign fields and are omitted from this campaign report.
- The ledger only covers deliveries it has received and retained. Existing bookings from before the workflow or during delivery outages require a separately reconciled import. The dashboard tracks booking activity by webhook receipt day. Cancellations after the booking webhook and attendance require a separate status feed.
- Meta Insights reads campaign spend and all clicks. This report does not use Meta's modeled leads or view-through attribution.

## Preview setup

1. Use the site's preview deployment and an isolated Supabase database for testing. Set the preview values of `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to that database. Apply `supabase/scc_analytics_webhook_events.sql` if the ledger is absent, then apply `supabase/scc_marketing_daily.sql`. Use synthetic ledger fixtures for preview or explicitly authorize a scrubbed copy. The daily snapshot table and save RPC are service-role only.
2. In Vercel Settings → Environment Variables, enter the following server-side values in Preview. Scope them to this branch when possible. Use a different secret for each purpose. Store credentials in Vercel or the team's password manager.

| Variable | Value |
| --- | --- |
| `MARKETING_ADMIN_PASSWORD` | Random 32+ character password. Use username `marketing` at the browser's HTTPS Basic Auth prompt. Rotate the shared password when access changes. |
| `CRON_SECRET` | Independent random 32+ character bearer secret. |
| `MARKETING_ID_KEY` | Stable random 32+ character HMAC key for pseudonymizing IDs. Changing it requires rebuilding all snapshots to keep cohort joins valid. |
| `MARKETING_META_ACCOUNT_ID` | Numeric ad account ID without the `act_` prefix. |
| `MARKETING_META_API_VERSION` | A supported Graph version in `vNN.0` form, pinned after testing the app. |
| `MARKETING_META_TOKEN` | Read-only Marketing API system user token. |
| `MARKETING_GHL_TOKEN` | GoHighLevel sub-account private integration token with `contacts.readonly`. |
| `MARKETING_GHL_LOCATION_ID` | SCC sub-account location ID. Use the same sub-account that owns the consultation calendar. |
| `MARKETING_GHL_CALENDAR_ID` | ID of the consultation calendar as written in the existing webhook ledger. Confirm older rows have that ID. |
| `MARKETING_QUALIFIED_TAG` | Exact GHL contact tag the SCC team agrees marks a qualified consultation. Verify with one tagged and one untagged test contact. |
| `MARKETING_LEAD_TAG` | Optional exact tag to restrict reporting to the SCC lead funnel if the location contains other leads. |
| `MARKETING_GHL_CAMPAIGN_FIELD_ID` | Optional ID of the GHL contact custom field carrying the numeric Meta campaign ID. Use the field ID from GHL, not its display label. |
| `MARKETING_CAMPAIGN_ALIASES` | Optional JSON mapping exact historical paid Meta UTM campaign slugs to numeric campaign IDs stored as strings. Use verified mappings. |
| `MARKETING_POSTHOG_HOST` | `https://us.posthog.com` or `https://eu.posthog.com`, matching the existing project region. |
| `MARKETING_POSTHOG_PROJECT_ID` | Existing SCC PostHog project ID. |
| `MARKETING_POSTHOG_QUERY_KEY` | PostHog personal API key scoped to the SCC project with query-read permission. The browser ingestion key serves a different purpose. |

## Meta authorization

1. In Meta for Developers, select or create an app owned by the SCC business portfolio and enable the Marketing API product.
2. In the business portfolio settings, create or select a system user and assign the app and SCC ad account with the permissions required to view performance. Generate a system user token for that app with `ads_read`. Follow the app dashboard's access-level, review, and business verification requirements for the account being read.
3. Store the token as a sensitive Vercel environment variable. Verify the authorized account's currency and time zone and test the read-only `GET /act_<id>/insights` endpoint through the preview sync. Rotate or revoke the token through Meta if it expires or access changes.

[Meta Marketing API authorization](https://developers.facebook.com/docs/marketing-api/overview/authorization/) · [Meta Insights API](https://developers.facebook.com/docs/marketing-api/insights/) · [HighLevel Contacts Search](https://marketplace.gohighlevel.com/docs/ghl/contacts/search-contacts-advanced/) · [PostHog Query API](https://posthog.com/docs/api/query/)

## Sync and release checks

- Once the preview deploy is ready, request `GET /api/cron/marketing?day=YYYY-MM-DD` with `Authorization: Bearer <CRON_SECRET>` from a trusted client. Use a completed day in the Meta account time zone. Deployment Protection may require a separate Vercel authorization step. A request without `day` refreshes the last three completed account days. Backfill older days one at a time with the same endpoint.
- Verify the report's 401 challenge before sign-in, then compare synced spend and clicks to Ads Manager in the same account time zone. Compare new GHL lead counts and webhook appointment counts for the same period. Trigger the existing webhook only in a sandbox if testing delivery. Re-run a completed day and verify the totals are stable. Confirm aliases and the campaign field using one known campaign.
- Once reviewed for release, apply the additive SQL and configure Production variables in Vercel. Vercel Cron schedules a daily request at 12:00 UTC on production deployments. Cron can run within the schedule's permitted delivery window. A failed refresh preserves the most recent successful day. Inspect Vercel function logs and rerun the affected day.
- Change attribution settings, lead definitions, currency/account, or the HMAC key only with a planned backfill. Run source tests with `node --test tests/marketing.test.mjs`.

## Report definitions

Each snapshot covers one completed day in the Meta ad account's time zone. Leads are unique new GHL contacts with type `lead` and the optional funnel tag. Appointments are unique observed GHL booking IDs on the selected calendar. Booking conversion is the share of leads created in the selected range with at least one recorded booking during that range. Qualified consultations are recorded appointments whose contact has the configured tag when that day is synced. Resync older days to reflect qualification added after the rolling window. The metric describes qualified bookings, regardless of later attendance.

Attribution uses exact numeric campaign IDs and explicit paid Meta aliases. Bookings prefer the campaign on the booking payload and fall back to the contact's acquisition data. The conversion rate uses the lead's acquisition campaign. Missing links stay in **Unattributed / other**. The headline cost divides total Meta spend by qualified bookings attributed to campaigns with spend in the range. Undefined ratios display a dash. Missing dates are visibly excluded from the selected report.

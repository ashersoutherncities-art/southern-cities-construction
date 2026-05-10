# Supabase schema

Apply these SQL files in the Supabase SQL editor in this order. Every file is
idempotent (`create table if not exists`, `add column if not exists`,
`create index if not exists`), so re-running them is safe.

1. `service_inquiries.sql`
2. `realtor_inquiries.sql`
3. `subcontractor_applications.sql`
4. `resource_requests.sql`
5. `orders.sql`
6. `order_events.sql` — depends on `orders`
7. `permit_oversight_orders.sql` — depends on `orders` (foreign key)
8. `marketing_assets.sql`

## Tables

- `service_inquiries` — generic site contact form (`/api/inquiries`).
- `realtor_inquiries` — realtor pre-listing / inspection-response form.
- `subcontractor_applications` — partner-network applications.
- `resource_requests` — free downloads and paid resource purchase requests.
- `orders` — generic checkout order, written at session creation and updated
  through the Stripe payment lifecycle. Carries Stripe references
  (`stripe_session_id`, `stripe_customer_id`, `stripe_payment_intent_id`,
  `stripe_charge_id`), buyer + project info, and a JSON `metadata` blob.
- `order_events` — append-only lifecycle log per order
  (`created`, `checkout_completed`, `payment_succeeded`, `refunded`, etc.).
- `permit_oversight_orders` — flagship-service onboarding record. Now linked to
  the canonical `orders` row via `order_id` and carries the same Stripe
  references for backward compatibility.
- `marketing_assets` — source-of-truth catalog of marketing pages, brand assets,
  and infrastructure-owned site surfaces.
- `marketing_links` — trackable marketing links and CTA destinations, including
  click counters and campaign metadata.
- `marketing_link_events` — append-only click log for trackable marketing links.

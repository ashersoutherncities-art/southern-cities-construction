# Southern Cities Construction Buy Now QA Report

Date: 2026-04-29
Repo: `/Users/ashborn/.openclaw/workspace/southern-cities-construction`

## Scope
Audited and corrected Buy Now behavior across:
- homepage
- services overview
- homeowners page
- investors page
- realtors page
- contractors page
- developers / landowners page
- recurring support page
- fixed-price service detail pages

## Summary
The main failure was on the investor page, where multiple Buy Now buttons pointed to `/#contact` instead of a real cart or checkout flow. I replaced those with working cart-preload routes for true fixed-price services and removed Buy Now from services that should not behave like ecommerce products.

I also added missing fixed-price product records so fixed-price investor services now have real cart entries, portal preload handling, and consistent naming/pricing across the site.

## A. Broken Buy Now Link List

| Page location | Button text | Previous URL | Intended service | Product existed | Cart / checkout worked | 404 | Recommended fix |
|---|---|---|---|---|---|---|---|
| `/services/investors` | Buy Now | `/#contact` | Deal & Scope Review | No durable product record | No | No | Create product and route to cart preload |
| `/services/investors` | Buy Now | `/#contact` | Permit & Local Compliance Review | No durable product record | No | No | Create product and route to cart preload |
| `/services/investors` | Buy Now | `/#contact` | Budget Review | No durable product record | No | No | Create product and route to cart preload |
| `/services/investors` | Buy Now | `/#contact` | Contractor Fit Consultation | Partial product support existed only in data/cart mismatch | No | No | Route to correct cart preload |
| `/services/investors` | Buy Now | `/#contact` | Full Due Diligence Package | No fixed-price product | No | No | Replace Buy Now with Request Quote |
| `/services/investors` | Buy Now | `/#contact` | Project Timeline & Schedule Preparation | No fixed-price product | No | No | Replace Buy Now with Get Pricing |
| `/services/investors` | Buy Now | `/#contact` | Schedule of Cashflows Preparation | No fixed-price product | No | No | Replace Buy Now with Get Pricing |
| `/services/investors` | Buy Now | `/#contact` | Material Logistics Setup | No fixed-price product | No | No | Replace Buy Now with Get Pricing |
| `/services/investors` | Buy Now | `/#contact` | Lender-Ready Scope & Bid Package | No fixed-price product | No | No | Replace Buy Now with Get Pricing |
| `/services/investors` | Buy Now | `/#contact` | Construction Draw Strategy & Alignment | No fixed-price product | No | No | Replace Buy Now with Get Pricing |
| `/services/investors` | Buy Now | `/#contact` | Draw Review Support | No durable product record | No | No | Create product and route to cart preload |

## B. Correct Product / Checkout Map

| Product name | Price | Short description | Slug / item key | Checkout URL | Success path | Intake handling |
|---|---:|---|---|---|---|---|
| Home Assessment | $299 | Property review with next-step guidance | `home-assessment` | `/cart?cart=home-assessment` | `/portal?checkout=success&session_id=...` | Intake before Stripe on portal |
| Owner Consultation | $349 | Advisory consultation for scope, permits, budget, and next step | `owner-consultation` | `/cart?cart=owner-consultation` | `/portal?checkout=success&session_id=...` | Intake before Stripe on portal |
| Permit Path Review | $299 | Early permit-path review | `permit-path-review` | `/cart?cart=permit-path-review` | `/portal?checkout=success&session_id=...` | Intake before Stripe on portal |
| Inspection Response | $299 | Inspection issue review for realtor workflow | `inspection-response-service` | `/cart?cart=inspection-response-service` | `/portal?checkout=success&session_id=...` | Intake before Stripe on portal |
| Realtor Inspection Review | $299 | Inspection review for agents | `realtor-inspection-review` | `/cart?cart=realtor-inspection-review` | `/portal?checkout=success&session_id=...` | Intake before Stripe on portal |
| Investor Deal & Scope Review | $499 | Construction-side deal and scope review | `investor-review` | `/cart?cart=investor-review` | `/portal?checkout=success&session_id=...` | Intake before Stripe on portal |
| Permit & Local Compliance Review | $399 | Early permit and compliance review | `permit-local-compliance-review` | `/cart?cart=permit-local-compliance-review` | `/portal?checkout=success&session_id=...` | Intake before Stripe on portal |
| Budget Review | $599 | Budget-direction review for one project | `budget-review` | `/cart?cart=budget-review` | `/portal?checkout=success&session_id=...` | Intake before Stripe on portal |
| Contractor Fit Consultation | $349 | Contractor model fit consultation | `contractor-fit-consultation` | `/cart?cart=contractor-fit-consultation` | `/portal?checkout=success&session_id=...` | Intake before Stripe on portal |
| Draw Review Support | $399 | Per-draw review support | `draw-review-support` | `/cart?cart=draw-review-support` | `/portal?checkout=success&session_id=...` | Intake before Stripe on portal |

## C. Fixed URL Map

| Service | Old URL | New URL |
|---|---|---|
| Deal & Scope Review | `/#contact` | `/cart?cart=investor-review` |
| Permit & Local Compliance Review | `/#contact` | `/cart?cart=permit-local-compliance-review` |
| Budget Review | `/#contact` | `/cart?cart=budget-review` |
| Contractor Fit Consultation | `/#contact` | `/cart?cart=contractor-fit-consultation` |
| Draw Review Support | `/#contact` | `/cart?cart=draw-review-support` |
| Full Due Diligence Package | `/#contact` | `/#contact` with CTA changed to `Request Quote` |
| Project Timeline & Schedule Preparation | `/#contact` | `/#contact` with CTA changed to `Get Pricing` |
| Schedule of Cashflows Preparation | `/#contact` | `/#contact` with CTA changed to `Get Pricing` |
| Material Logistics Setup | `/#contact` | `/#contact` with CTA changed to `Get Pricing` |
| Lender-Ready Scope & Bid Package | `/#contact` | `/#contact` with CTA changed to `Get Pricing` |
| Construction Draw Strategy & Alignment | `/#contact` | `/#contact` with CTA changed to `Get Pricing` |

## D. Services That Should Not Have Buy Now

### Request Quote
- Full Due Diligence Package
- Owner-Controlled Construction, GC-Led
- Full Construction Management Service
- Regional Investor Construction Network Development
- Any active-job oversight or highly custom execution service

### Get Pricing
- Project Timeline & Schedule Preparation
- Schedule of Cashflows Preparation
- Material Logistics Setup
- Permit Coordination & Administration
- Lender-Ready Scope & Bid Package
- Construction Draw Strategy & Alignment
- Contractor Match + Bid Coordination
- Rehab Budget Review
- Rent-Ready Turn
- Any service where file condition, project size, draw size, or scope materially changes the fee

### Review / Plan CTA Instead of Buy Now
- Permit Administration review services
- Construction oversight review services
- Recurring support plans
- Developer / landowner review services
- Contractor recurring support plans

## E. Final QA Checklist

### Route integrity
- [x] Build passes locally
- [x] Fixed-price cart preload routes return successfully
- [x] Portal preload routes return successfully
- [x] Legacy investor Buy Now buttons no longer point to `/#contact`
- [x] Non-fixed-price investor services no longer use Buy Now

### Product correctness
- [x] Service names align across service data, cart, and portal preload handling
- [x] Fixed-price services have explicit item keys
- [x] Cart shows expected price for corrected investor fixed-price services

### Still requires live transaction verification
- [ ] Real Stripe checkout completion tested in production
- [ ] Real success redirect and thank-you/finalization tested in production
- [ ] Mobile tap-through tested against deployed production build

## Local Verification Performed
- `npm run build` passed after changes
- Verified these routes locally:
  - `/cart?cart=home-assessment`
  - `/cart?cart=owner-consultation`
  - `/cart?cart=permit-path-review`
  - `/cart?cart=inspection-response-service`
  - `/cart?cart=realtor-inspection-review`
  - `/cart?cart=investor-review`
  - `/cart?cart=permit-local-compliance-review`
  - `/cart?cart=budget-review`
  - `/cart?cart=contractor-fit-consultation`
  - `/cart?cart=draw-review-support`
- Verified portal preload pages resolve for sample fixed-price services.

## Files Changed
- `lib/cart.ts`
- `lib/services-data.ts`
- `app/portal/page.tsx`
- `app/services/investors/page.tsx`
- `scripts/audit_buy_now.py`

## Commits
- `0c92552` - Fix Southern Cities Construction buy now routes

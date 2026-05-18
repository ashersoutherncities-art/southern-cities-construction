# Investor Execution Platform — GHL Tag Schema

**Principle:** Platform tags are completely separate from existing investor-catalog tags. Don't mix `platform-*` with `purchased-investor-deal-review` etc. The two systems run in parallel and the platform is the canonical investor funnel going forward.

## Tag namespace

All platform tags start with `platform-` prefix.

| Tag | Fires when | Workflow it triggers |
|---|---|---|
| `platform-lm1-captured` | User submits the LM1 free-tool form (automated rehab budget snapshot) | Send LM1 PDF → start LM1 nurture sequence |
| `platform-co1-purchased` | User buys CO1 Investor Execution Review ($499) | Send CO1 onboarding → schedule kickoff call · stop LM1 nurture |
| `platform-co2-purchased` | User buys CO2 Project Setup & Contractor Coordination | Send CO2 onboarding → assign scoping coordinator |
| `platform-co3-purchased` | User signs CO3 Active Project Oversight monthly engagement | Send CO3 onboarding → schedule kickoff |
| `platform-co4-engaged` | User commits to CO4 GC-Supported Owner Build | Send legal docs · permit-pull paperwork · scoping call |
| `platform-co5-engaged` | User commits to CO5 Full GC | Send legal docs · pre-construction kickoff |
| `platform-lead` | Generic platform-funnel lead (any platform LP form submit not tied to LM1) | Add to platform general newsletter |
| `platform-hub-inquiry` | User submits the platform hub general inquiry form | Internal notification + manual outreach |
| `platform-nurture-complete` | User completes LM1 nurture sequence without purchasing | Move to low-frequency reactivation list |

## Workflow architecture (high level)

```
LM1 form submit → platform-lm1-captured tag fires
   ↓
   LM1 Nurture Workflow:
   - Day 0: Send PDF + welcome
   - Day 3: Pain framing (why budgets fail)
   - Day 7: CO1 pitch (Investor Execution Review $499)
   - Day 14: Case study / social proof
   - Day 21: Final CO1 nudge with refundable-fee framing
   - Day 30: Hand off to general newsletter · tag platform-nurture-complete

ANY purchase tag (platform-co1-purchased, etc.) → STOP the LM1 nurture immediately
   ↓
   Post-purchase workflows fire per-product (onboarding, kickoff, etc.)
```

## Stop conditions

All nurture sequences MUST stop when any `platform-co*-purchased` or `platform-co*-engaged` tag is added. Otherwise the customer keeps getting LM1-to-CO1 pitches AFTER they bought CO3.

## Custom fields populated by the LM1 form

When the GPT-built LM1 fires its form submission, it should populate these GHL custom fields on the contact:

| GHL Custom Field | Source from LM1 form | Notes |
|---|---|---|
| `Property Address` | Form input | Already exists as a custom field |
| `LM1 Estimated Budget Range` | Calculated from rules engine (e.g., "$45K–$72K") | NEW custom field — create in GHL |
| `LM1 Project Category` | Calculated (cosmetic / rental turn / etc.) | NEW custom field |
| `LM1 Risk Flags` | Calculated (comma-separated risk codes) | NEW custom field |
| `LM1 Confidence Level` | Calculated (low / medium / high) | NEW custom field |
| `LM1 Submitted At` | Form timestamp | NEW custom field |

These let the email templates personalize: "Based on your project at {{Property Address}}, our preliminary range was {{LM1 Estimated Budget Range}}..."

## Existing legacy investor tags (do NOT touch)

These continue to fire on the legacy investor catalog at `/services/investors`. They're independent of the platform.

- `purchased-investor-deal-review`
- `purchased-budget-scope-review`
- `purchased-contractor-grade-budget`
- `purchased-permit-local-compliance-review`
- `purchased-contractor-fit-consultation`
- `purchased-draw-review-support`
- `purchased-due-diligence-bundle`
- `purchased-fit-plus-match-bundle`

Legacy products may eventually be deprecated, but for now they continue to fulfill existing demand.

## Tags to create in GHL (one-time setup)

When the platform launches, create these tags via the GHL API:

```bash
# Platform stage tags
platform-lm1-captured
platform-co1-purchased
platform-co2-purchased
platform-co3-purchased
platform-co4-engaged
platform-co5-engaged

# Platform funnel-wide tags
platform-lead
platform-hub-inquiry
platform-nurture-complete
```

Script available in `/scripts/create-platform-ghl-tags.sh` (to be built).

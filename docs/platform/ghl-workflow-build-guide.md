# GHL Workflow Build Guide — LM1 → CO1 Nurture

**Time estimate:** 30–45 minutes total.

**Open these tabs:**
1. GHL Sub-account → Email Builder
2. GHL Sub-account → Workflows
3. This doc
4. `docs/platform/lm1-to-co1-nurture-sequence.md` (the email copy source)

---

## Prerequisites — already done ✓

- 10 platform GHL tags created via API
- 5 LM1 custom fields created via API (IDs are wired into sendRehabSnapshotToGhl)
- The LM1 form at `/lp/rehab-budget-range-execution-risk-snapshot` is live and tagging submissions with `platform-lm1-captured` + `platform-lead` automatically

You should NOT need to create any tags or custom fields manually. If anything below references a tag/field you don't see in GHL, ping me — it means something didn't propagate.

---

## Part A — Create 6 email templates (20 minutes)

In GHL: **Marketing → Emails → Templates → New Template**

For each of the 6 emails below:

1. Click **New Template**
2. Name it exactly as shown in the "Template Name" column
3. Set **From Name:** `Asher Borden — Southern Cities Construction`
4. Set **From Email:** `asher@southerncitiesconstruction.com` (or `orders@…` — pick one and stay consistent)
5. Set **Reply-To:** same as From
6. Paste the **Subject** and **Pre-header**
7. Switch to **HTML / Plain Text** mode (NOT the drag-drop builder — easier for plain-text style emails)
8. Paste the body from `lm1-to-co1-nurture-sequence.md`
9. Append the compliance footer (see below)
10. Save

### Compliance footer (paste at the bottom of EVERY email — required)

```
—
Southern Cities Construction LLC
NC GC License #107724
southerncitiesconstruction.com · (980) 473-7249
{{custom_values.unsubscribe_url}} · {{custom_values.privacy_url}}
```

(GHL will auto-replace `{{custom_values.unsubscribe_url}}` with the actual unsubscribe link at send time.)

### Template inventory

| # | Template Name | Subject | Pre-header |
|---|---|---|---|
| 1 | `LM1-1-snapshot-delivered` | Your rehab budget snapshot is ready ↓ | And the question this snapshot can't answer. |
| 2 | `LM1-2-why-budgets-fail` | The 4 ways your snapshot budget can be wrong | Not because the math is wrong. Because the assumptions are. |
| 3 | `LM1-3-execution-probability` | The question your snapshot doesn't answer | "Can this project actually execute within those assumptions?" |
| 4 | `LM1-4-case-study` | When CO1 actually mattered | A real example of where the budget snapshot was wrong. |
| 5 | `LM1-5-refundable-fee` | The $499 is refundable. Read this before you decide. | The CO1 fee is structured so it's free if you keep working with us. |
| 6 | `LM1-6-final-nudge` | Last note on the snapshot for {{contact.project_address}} | And what to do if you're not ready yet. |

### Merge tag reference

GHL uses these merge tag formats. Drop these into the email bodies where the markdown doc shows `{{Property Address}}` etc:

| Reference in markdown | GHL merge tag |
|---|---|
| `{{contact.first_name}}` | `{{contact.first_name}}` (same) |
| `{{Property Address}}` | `{{contact.project_address}}` |
| `{{LM1 Estimated Budget Range}}` | `{{contact.lm1_estimated_budget_range}}` |
| `{{LM1 Project Category}}` | `{{contact.lm1_project_category}}` |
| `{{LM1 Confidence Level}}` | `{{contact.lm1_confidence_level}}` |

GHL auto-converts custom field names to `lowercase_snake_case` in merge tags. Verify by hovering over the field in the custom fields list — GHL shows the merge tag.

---

## Part B — Build the workflow (15 minutes)

In GHL: **Automation → Workflows → New Workflow → Start from Scratch**

Name: `Platform LM1 → CO1 Nurture Sequence`

### Step 1 — Add the trigger

Click **+ Add New Trigger** → Select **Contact Tag**.

Configuration:
- **Tag is added:** `platform-lm1-captured`
- **Filters:** none

Save.

### Step 2 — Add stop conditions (top of workflow)

Click **Workflow Settings (gear icon top right) → Settings → Trigger Behavior**.

For each of these 5 tags, add a "Stop on event":
- `purchased-platform-co1-execution-review` (cart purchase)
- `platform-co2-purchased`
- `platform-co3-purchased`
- `platform-co4-engaged`
- `platform-co5-engaged`

This ensures a contact who buys anything stops getting nurture emails.

### Step 3 — Build the sequence

Click **+ Add Action** between the trigger and the end.

For each step below, add the corresponding GHL action:

| # | GHL Action | Configuration |
|---|---|---|
| 1 | **Send Email** | Template: `LM1-1-snapshot-delivered` · Wait until: (skip — fires immediately) |
| 2 | **Wait** | 3 days |
| 3 | **Send Email** | Template: `LM1-2-why-budgets-fail` |
| 4 | **Wait** | 4 days |
| 5 | **Send Email** | Template: `LM1-3-execution-probability` |
| 6 | **Wait** | 7 days |
| 7 | **Send Email** | Template: `LM1-4-case-study` |
| 8 | **Wait** | 7 days |
| 9 | **Send Email** | Template: `LM1-5-refundable-fee` |
| 10 | **Wait** | 7 days |
| 11 | **Send Email** | Template: `LM1-6-final-nudge` |
| 12 | **Add Tag** | `platform-nurture-complete` |

### Step 4 — Configure send window

In **Workflow Settings → Quiet Hours**:
- **Time zone:** Eastern (America/New_York)
- **Send between:** 9:00 AM – 5:00 PM
- **Days:** Monday – Friday only

This prevents emails from landing at 3 AM Sunday.

### Step 5 — Save & publish

- Click **Save**
- Toggle **Status: Draft → Publish**

The workflow is now live.

---

## Part C — Test the funnel (10 minutes)

### Test 1 — Email 1 fires immediately

1. In GHL: **Contacts → New Contact**
2. Create a test contact with YOUR personal email (one you can check)
3. Add the tag `platform-lm1-captured` manually to that contact
4. **Within 60 seconds**, Email 1 should land in your inbox
5. Verify: subject line, pre-header, merge tags resolve, compliance footer is present

### Test 2 — Real LM1 form path

1. Open `/lp/rehab-budget-range-execution-risk-snapshot` in an incognito window
2. Fill out the LM1 form with a test property and YOUR email
3. Submit
4. **Check that:**
   - Snapshot PDF arrives
   - In GHL: contact has tags `platform-lm1-captured`, `platform-lead`, `rehab-budget-snapshot`, etc.
   - Custom fields are populated (LM1 Estimated Budget Range, Project Category, etc.)
   - Email 1 of the nurture sequence arrives within 60 seconds

### Test 3 — Stop condition

1. On the same test contact, manually add the tag `purchased-platform-co1-execution-review`
2. Wait 3 days
3. **Email 2 should NOT arrive** — the workflow should have stopped

If Email 2 arrives anyway, your stop conditions aren't wired correctly. Re-check Workflow Settings.

### Test 4 — Real CO1 purchase

1. On a fresh test contact (or the same one after clearing tags), go to `/platform/co1`
2. Click "Book the Execution Review"
3. Complete Stripe checkout (use a real card → refund yourself after, OR ask me to add a $1 override)
4. **Check that:**
   - Tag `purchased-platform-co1-execution-review` is added
   - Any LM1 nurture in progress stops
   - Post-purchase confirmation email fires (existing Order Fulfillment workflow)

---

## What to watch for in the first 30 days

| Metric | Target | What to do if missed |
|---|---|---|
| Email 1 open rate | 70%+ | Subject line A/B test |
| Email 1 → PDF download | 90%+ | If low, the LM1 PDF link in email isn't prominent enough |
| Email 6 open rate | 30%+ | If <20%, sequence is too long or off-topic — cut to 4 emails |
| LM1 → CO1 conversion (60-day) | 2–4% | If <1%, CO1 offer or pricing isn't fitting — adjust |
| Reply rate (any email) | 1–3% | Replies = high-intent — manually follow up |
| Unsubscribe rate | <5% | If >10%, cadence is too aggressive — space out by 1–2 more days each |

---

## If you get stuck

Most common issues:
- **Merge tag not resolving** → confirm the custom field name in GHL matches `lm1_estimated_budget_range` etc. (lowercase snake case)
- **Stop condition not firing** → make sure the stop tag is checked in Workflow Settings, not as a regular action
- **Email going to spam** → set up SPF + DKIM in GHL Domain Settings before launch (10 min)
- **Workflow not triggering at all** → confirm the contact actually has the `platform-lm1-captured` tag (manually add it via Contact → Tags to verify)

Ping me with the specific error message and I'll debug.

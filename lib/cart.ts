export const CART_QUERY_KEY = 'cart';

export type ConstructionCartProduct = {
  key: string;
  name: string;
  shortName: string;
  price: number;
  priceLabel: string;
  description: string;
  checkoutAmount: string;
};

export type CartSelection = {
  key: string;
  amount?: number;
  quantity?: number;
};

export type CartLineItem = {
  key: string;
  amount: number;
  quantity: number;
  product: ConstructionCartProduct;
};

export const CART_PRODUCTS: Record<string, ConstructionCartProduct> = {
  'execution-consultation': {
    key: 'execution-consultation',
    name: 'Execution Consultation',
    shortName: 'Execution Consult',
    price: 9900,
    priceLabel: '$99 · credits toward your project',
    description: 'A paid consultation to scope your build and map the right execution path — Project Setup, Active Oversight, Owner-Controlled Build, or Full-Service GC. Credited toward your engagement if you proceed. NC GC License #107724.',
    checkoutAmount: '99',
  },
  'flagship-permit-oversight': {
    key: 'flagship-permit-oversight',
    name: 'Permit Administration + Construction Oversight',
    shortName: 'Flagship Oversight',
    price: 449900,
    priceLabel: '$4,499 starting price',
    description: 'Flagship GC-of-record service with permit administration, inspection coordination, and construction oversight.',
    checkoutAmount: '4499',
  },
  'permit-management-service': {
    key: 'permit-management-service',
    name: 'Permit Administration',
    shortName: 'Permit Admin',
    price: 149900,
    priceLabel: '$1,499 starting price',
    description: 'Permit submission support, correction handling, inspection coordination, and status tracking.',
    checkoutAmount: '1499',
  },
  'pre-listing-renovation': {
    key: 'pre-listing-renovation',
    name: 'Pre-Listing Renovation',
    shortName: 'Pre-Listing',
    price: 499900,
    priceLabel: '$4,999 starting price',
    description: 'Listing prep work for owners and agents who need the property ready before launch.',
    checkoutAmount: '4999',
  },
  'inspection-response-service': {
    key: 'inspection-response-service',
    name: 'Same-Day Quick Read',
    shortName: 'Same-Day Read',
    price: 19900,
    priceLabel: '$199 same-day',
    description: 'Urgent inspection triage for active deals — a licensed NC GC reads the inspection within 4 hours: top 3–5 items that actually matter, rough dollar range per item, and a recommended response path. Noise-vs-matters is judged on cost magnitude + severity + remaining useful life + negotiability — not just severity rating.',
    checkoutAmount: '199',
  },
  'permit-path-review': {
    key: 'permit-path-review',
    name: 'Permit Path Review',
    shortName: 'Permit Path Review',
    price: 29900,
    priceLabel: '$299 assessment',
    description: 'Early permit-path review for homeowners who need to understand likely permitting requirements before work starts.',
    checkoutAmount: '299',
  },
  'home-assessment': {
    key: 'home-assessment',
    name: 'Home Assessment',
    shortName: 'Home Assessment',
    price: 29900,
    priceLabel: '$299 assessment',
    description: 'Property walkthrough, condition review, and a clear next-step recommendation before repairs or renovation.',
    checkoutAmount: '299',
  },
  'realtor-inspection-review': {
    key: 'realtor-inspection-review',
    name: 'Realtor Inspection Review',
    shortName: 'Inspection Review',
    price: 29900,
    priceLabel: '$299 review',
    description: 'Comprehensive 1-day inspection-report read by a licensed NC GC — item-by-item severity, repair-scope notes, cost ranges, a client-shareable PDF deliverable, AND a ready-to-send Repair Request Language section the agent can paste directly into an email to the other side.',
    checkoutAmount: '299',
  },
  'buyer-side-property-read': {
    key: 'buyer-side-property-read',
    name: 'Buyer-Side Property Read',
    shortName: 'Buyer-Side Read',
    price: 29900,
    priceLabel: '$299 read',
    description: 'Pre-offer construction-side read for buyer\'s agents — likely repair needs, rough cost range, and offer-strategy notes BEFORE the offer goes in (not after the inspection).',
    checkoutAmount: '299',
  },
  'negotiation-strategy-read': {
    key: 'negotiation-strategy-read',
    name: 'Negotiation Strategy Read',
    shortName: 'Negotiation Read',
    price: 29900,
    priceLabel: '$299 read',
    description: 'Construction-side opinion on inspection-driven concession requests — per-issue reasonableness, counter-range recommendations, and talking points for the client conversation.',
    checkoutAmount: '299',
  },
  'pre-listing-construction-valuation': {
    key: 'pre-listing-construction-valuation',
    name: 'Pre-Listing Audit',
    shortName: 'Pre-Listing Audit',
    price: 64900,
    priceLabel: '$649 · licensed inspection + GC seller analysis',
    description: 'A licensed inspector visits the property AND a licensed NC GC turns the findings into a seller-side pre-listing analysis: fix-vs-skip-vs-disclose per item, a condition-adjusted price band, top value-drag items (cost-to-fix vs cost-to-leave), and a pricing-strategy recommendation. The seller-side sibling of the Inspected GC Read ($400 inspection + $249 GC analysis). The GC portion is credited back if Southern Cities handles the repair work over $1,000.',
    checkoutAmount: '649',
  },
  'investor-review': {
    key: 'investor-review',
    name: 'Investor Execution Review',
    shortName: 'Execution Review',
    price: 49900,
    priceLabel: '$499 review',
    description: 'You bring the deal — we build the numbers. A pre-acquisition underwriting opinion for a property you do not own yet: scope feasibility, a rough budget range with confidence levels, construction risk callouts, and the walk-away trigger. No spreadsheet input needed. Decision-grade, not bid-grade.',
    checkoutAmount: '499',
  },
  'permit-local-compliance-review': {
    key: 'permit-local-compliance-review',
    name: 'Permit & Local Compliance Review',
    shortName: 'Permit Compliance Review',
    price: 39900,
    priceLabel: '$399 review',
    description: 'Early permit and local compliance review before closing so rehab path, approval risk, and code exposure are clearer.',
    checkoutAmount: '399',
  },
  'budget-review': {
    key: 'budget-review',
    name: 'Budget & Scope Review',
    shortName: 'Budget & Scope Review',
    price: 39900,
    priceLabel: '$399 review',
    description: 'You bring the numbers — we pressure-test them. A line-by-line audit of an existing budget and scope against current market costs. Works pre-purchase (vetting an investor pro-forma) or post-purchase (before contractors price it or the lender locks in the draw). Bring a budget; we audit it.',
    checkoutAmount: '399',
  },
  'contractor-grade-budget': {
    key: 'contractor-grade-budget',
    name: 'Contractor-Grade Budget',
    shortName: 'Contractor-Grade Budget',
    price: 179900,
    priceLabel: '$1,799 starting price',
    description: 'We BUILD the budget for you from scratch — full takeoffs, real trade-network unit costs, written assumptions, and a bid-ready spreadsheet. The number you would otherwise pay a GC to put together, delivered without hiring one.',
    checkoutAmount: '1799',
  },
  'bid-coordination-contractor-match': {
    key: 'bid-coordination-contractor-match',
    name: 'Contractor Match & Bid Coordination',
    shortName: 'Contractor Match',
    price: 149900,
    priceLabel: '$1,499 starting price',
    description: 'We source vetted contractors that fit your scope, collect bids on a structured intake, level them against each other, and present the cleanest comparison so the award decision is easier.',
    checkoutAmount: '1499',
  },
  'due-diligence-bundle': {
    key: 'due-diligence-bundle',
    name: 'Due Diligence Bundle',
    shortName: 'Due Diligence Bundle',
    price: 149900,
    priceLabel: '$1,499 starting price',
    description: 'Four licensed-GC reads on the same pre-acquisition deal: scope feasibility + rough budget range, line-item audit of any existing budget, permit path and approval timeline, and contractor-mix recommendation. One combined report covering every angle before earnest money goes hard.',
    checkoutAmount: '1499',
  },
  'fit-plus-match-bundle': {
    key: 'fit-plus-match-bundle',
    name: 'Contractor Fit + Match Bundle',
    shortName: 'Fit + Match Bundle',
    price: 189900,
    priceLabel: '$1,899 bundle',
    description: 'Contractor Fit Consultation + Contractor Match & Bid Coordination + Permit & Local Compliance Review. First we figure out what kinds of contractors you need, then we go find them and run the bids, and we check the permit path and local compliance.',
    checkoutAmount: '1899',
  },
  'draw-review-support': {
    key: 'draw-review-support',
    name: 'Draw Management',
    shortName: 'Draw Management',
    price: 59900,
    priceLabel: '$599 · all draws for a project',
    description: 'We manage every draw for your project: inspection photos captured as required (separate fee), we submit the draws for you (we can take your logins and file them, or you forward/upload), and we collect all receipts and proof of payment from you.',
    checkoutAmount: '599',
  },
  'owner-consultation': {
    key: 'owner-consultation',
    name: 'Owner Consultation',
    shortName: 'Consultation',
    price: 34900,
    priceLabel: '$349 starting price',
    description: 'Project review, budget guidance, risk notes, and next-step recommendations before committing to scope.',
    checkoutAmount: '349',
  },
  'contractor-fit-consultation': {
    key: 'contractor-fit-consultation',
    name: 'Contractor Fit Consultation',
    shortName: 'Contractor Fit',
    price: 34900,
    priceLabel: '$349 consultation',
    description: 'Construction-side consultation for investors deciding what contractor setup fits the project before hiring gets expensive.',
    checkoutAmount: '349',
  },
  'repair-credit-letter': {
    key: 'repair-credit-letter',
    name: 'Repair Credit Calculation Letter',
    shortName: 'Repair Credit Letter',
    price: 34900,
    priceLabel: '$349 letter',
    description: 'A GC-signed single-page letter with itemized repair costs and a recommended total credit figure — built to forward directly to the other side and anchor the negotiation on defensible numbers instead of gut-feel.',
    checkoutAmount: '349',
  },
  'repair-scope-letter': {
    key: 'repair-scope-letter',
    name: 'Repair Scope Letter',
    shortName: 'Repair Scope Letter',
    price: 34900,
    priceLabel: '$349 letter',
    description: 'A GC-signed scope of repair for buyer agents — names each item, defines what "fixed correctly" means, gives a fair-market dollar figure, and lists the trades and permits required. Forces the seller to either agree or hire their own GC to dispute.',
    checkoutAmount: '349',
  },
  'appraisal-response-letter': {
    key: 'appraisal-response-letter',
    name: 'Appraisal Response Letter',
    shortName: 'Appraisal Response',
    price: 44900,
    priceLabel: '$449 letter',
    description: 'A licensed GC rebuttal to an appraiser\'s condition findings — addresses each concern point-by-point with documentation and GC sign-off. Saves deals stuck at appraisal because of condition flags or required-repair calls.',
    checkoutAmount: '449',
  },
  'repair-verification-visit': {
    key: 'repair-verification-visit',
    name: 'Repair Verification Visit',
    shortName: 'Repair Verification',
    price: 24900,
    priceLabel: '$249 visit',
    description: 'A licensed NC GC visits the property before final walkthrough to verify the seller\'s repairs were actually done — and done correctly. Written confirmation or punch-list so your buyer is not inheriting a botched fix.',
    checkoutAmount: '249',
  },
  'multi-offer-construction-read': {
    key: 'multi-offer-construction-read',
    name: 'Multi-Offer Construction Read',
    shortName: 'Multi-Offer Read',
    price: 19900,
    priceLabel: '$199 read',
    description: 'For listing agents with multiple offers on the table — a licensed GC risk-ranks each offer based on inspection-contingency language, repair-credit thresholds, and buyer behavior signals. Highest price doesn\'t always win.',
    checkoutAmount: '199',
  },
  'year-one-repair-plan': {
    key: 'year-one-repair-plan',
    name: 'Year-1 Priority Repair Plan',
    shortName: 'Year-1 Repair Plan',
    price: 29900,
    priceLabel: '$299 plan',
    description: 'A prioritized 12-month repair and maintenance plan for the new owner — what must be done in months 0–3, 3–6, 6–12, with rough budgets per item. Agent looks like a hero handing this over at close.',
    checkoutAmount: '299',
  },
  'construction-confidence-sheet': {
    key: 'construction-confidence-sheet',
    name: 'Construction Confidence Sheet',
    shortName: 'Confidence Sheet',
    price: 9900,
    priceLabel: '$99 add-on',
    description: 'Single-page brand-neutral PDF highlighting the property\'s construction strengths and acknowledging known items proactively. MLS-ready and built to set buyer expectations in writing. Free when bundled with Pre-Listing Valuation.',
    checkoutAmount: '99',
  },
  'listing-transaction-package': {
    key: 'listing-transaction-package',
    name: 'Listing Transaction Package',
    shortName: 'Listing Package',
    price: 229900,
    priceLabel: '$2,299 flat per listing',
    description: 'The full listing-side construction co-pilot: Inspection + GC Budget Report + Pre-Listing Valuation + Construction Confidence Sheet + Prep PM coordination call + Inspection Review + Repair Credit Letter + Repair Verification Visit. Saves vs à la carte.',
    checkoutAmount: '2299',
  },
  'buyer-transaction-package': {
    key: 'buyer-transaction-package',
    name: 'Buyer Transaction Package',
    shortName: 'Buyer Package',
    price: 199900,
    priceLabel: '$1,999 flat per deal',
    description: 'The full buyer-side construction co-pilot: Inspection + GC Budget Report + Negotiation Strategy Read + Inspection Review + Repair Scope Letter + Repair Verification Visit + Year-1 Priority Repair Plan. Anchored by the flagship on-site Inspection + GC Budget Report. Saves vs à la carte.',
    checkoutAmount: '1999',
  },
  'platform-co1-execution-review': {
    key: 'platform-co1-execution-review',
    name: 'Investor Execution Review',
    shortName: 'Execution Review',
    price: 49900,
    priceLabel: '$499 → stop losing $5K+ to execution mistakes · 48-hour turnaround · refund if we cannot perform · credits forward',
    description: 'Stop losing $5,000+ to execution mistakes you didn’t see coming. A licensed NC GC pressure-tests your deal in 48 hours and eliminates every hidden execution risk — labor market spikes, permit reality, sequencing gaps, category-shifters — or confirms the deal is clean. Performance guarantee: $499 fully refunded if we cannot perform the review at our standard. The refund trigger is Southern Cities’ call, not the buyer’s — you are paying for our commitment to deliver. $499 credits forward against Project Setup, Active Oversight ($6.5K–$28.5K tiered), Owner-Controlled Build, or Full GC Service — so if you continue, it is $0 net. Bonuses included: 48-hour turnaround, permit-jurisdiction timeline check ($150 value), vendor-lineup intro list for your submarket ($300 value), $499 credit forward. NC GC License #107724.',
    checkoutAmount: '499',
  },
  'per-deal-copilot': {
    key: 'per-deal-copilot',
    name: 'Per-Deal Construction Co-Pilot',
    shortName: 'Per-Deal Co-Pilot',
    price: 149900,
    priceLabel: '$1,499 flat per deal',
    description: 'Construction co-pilot for the entire deal — listing or buying — for agents who already have their own inspection or only need the analytical + negotiation products. Excludes Inspection + GC Budget Report (buy separately if needed).',
    checkoutAmount: '1499',
  },
  'gc-grade-property-inspection': {
    key: 'gc-grade-property-inspection',
    name: 'Inspection + GC Budget Report',
    shortName: 'Inspection + GC Budget',
    price: 89900,
    priceLabel: '$899 · the GC commits to do the work at this number',
    description: 'A licensed inspector visits the property AND a licensed NC GC turns the findings into a 3-tier estimate: MANDATORY items (code violations + loan-killers, 5–7 day fix guarantee), HIGH-ROI items (2× return cosmetics), and DISCLOSE & SKIP (formatted as a quote for the seller to credit the buyer). The deliverable that closes deals instead of opening fights. 3–5 business day turnaround, statewide NC. The same licensed NC GC commits to do the work at the budget we write — and your $899 Report fee credits toward the job if we do it.',
    checkoutAmount: '899',
  },
  'realtor-quick-read': {
    key: 'realtor-quick-read',
    name: 'GC Quick Read',
    shortName: 'GC Quick Read',
    price: 29900,
    priceLabel: '$299 · same-day rush available · buyer or seller',
    description: 'A licensed NC GC reads your inspection report (or property details) and gives you: critical-vs-cosmetic triage, loan-killer flags, a rough order-of-magnitude cost, item-by-item severity with repair-scope notes, paste-ready repair-request language, and a client-shareable PDF. Works buyer-side or seller-side. 1–2 business days (same-day rush available), statewide NC. Desk read — no inspector dispatched. Your $299 credits toward the GC Budget or the full Report.',
    checkoutAmount: '299',
  },
  'gc-grade-property-inspection-rush': {
    key: 'gc-grade-property-inspection-rush',
    name: 'Inspection + GC Budget Report — RUSH',
    shortName: 'Inspection + GC Budget (Rush)',
    price: 119900,
    priceLabel: '$1,199 rush',
    description: 'Same as the standard Inspection + GC Budget Report (licensed inspector on-site + GC 3-tier budget: Mandatory / High-ROI / Disclose & Skip + 5–7 day Mandatory fix guarantee) but with 24–48 hour turnaround. Priority scheduling + report delivered next business day after on-site visit. Statewide NC.',
    checkoutAmount: '1199',
  },
  'deal-pack-bid-ready': {
    key: 'deal-pack-bid-ready',
    name: 'Bid-Ready Deal Pack',
    shortName: 'Bid-Ready Deal Pack',
    price: 59900,
    priceLabel: '$599 per deal',
    description: 'GC-Certified rehab budget range, dollarized scope of work, lender-killer risk flags, execution risk report. Branded PDF the wholesaler attaches to their assignment marketing. 2–3 business day turnaround. Required input: existing plans, dimensions, OR Site Scan + As-Built add-on. NC GC License #107724.',
    checkoutAmount: '599',
  },
  'deal-pack-build-ready': {
    key: 'deal-pack-build-ready',
    name: 'Build-Ready Deal Pack',
    shortName: 'Build-Ready Deal Pack',
    price: 199700,
    priceLabel: '$1,997 per deal',
    description: 'Everything in Bid-Ready PLUS floor plans + design renderings + 3 vetted sub-trade quotes per major trade + draw schedule template + pre-closing open-permit sweep + a permit path (every permit identified up front) + a finance-partner referral. The shovel-ready package end-investors expect for $40K+ assignment fees — and we commit to do the work at the price we write. 3–4 business day turnaround. NC GC License #107724.',
    checkoutAmount: '1997',
  },
  'deal-pack-site-scan': {
    key: 'deal-pack-site-scan',
    name: 'Site Scan + As-Built + Inspection',
    shortName: 'Site Scan + Inspection',
    price: 69900,
    priceLabel: '$699 add-on or standalone',
    description: 'NC field agent dispatched for a full 3D site scan, converted into a Chief Architect as-built floorplan by our designer, plus a licensed third-party inspector service. Required when there are no existing plans or dimensions AND you want a high-accuracy Deal Pack rather than an SF-based estimate. 5 business day turnaround.',
    checkoutAmount: '699',
  },
  // ---- Stage B: Realtor read/report ladder additions ----
  'realtor-gc-budget': {
    key: 'realtor-gc-budget',
    name: 'GC Budget (on your inspection)',
    shortName: 'GC Budget',
    price: 59900,
    priceLabel: '$599 · GC budget on the inspection you already have',
    description: 'The GC budget built on the inspection you already have — no new inspection. A licensed NC GC turns your existing inspection into a full 3-tier budget (Mandatory / High-ROI / Disclose & Skip), with paste-ready repair-request language, and the same GC commits to do the work at the budget we write. Priced like an investor Bid-Ready ($599) — the GC budget, consistent across audiences. A GC Quick Read credits in; add our licensed inspection (+$400) to make it the full $899 Inspection + GC Budget Report. NC GC License #107724.',
    checkoutAmount: '599',
  },
  'realtor-inspected-gc-read': {
    key: 'realtor-inspected-gc-read',
    name: 'Inspected GC Read',
    shortName: 'Inspected GC Read',
    price: 64900,
    priceLabel: '$649 · licensed inspection + GC read',
    description: 'For when there is no inspection yet: a licensed third-party inspector goes on-site and produces a full standard inspection report, then a licensed NC GC layers a GC Quick Read on the findings — real-vs-cosmetic, loan-killer flags, rough cost, and a clear GC call. The bridge into the budget. Relevant fees credit forward: the $299 GC-read value credits toward the budget — the inspection is a third-party pass-through cost, so only our own service value rolls forward. NC GC License #107724.',
    checkoutAmount: '649',
  },
  'realtor-diagnosis': {
    key: 'realtor-diagnosis',
    name: 'Diagnosis',
    shortName: 'Diagnosis',
    price: 19900,
    priceLabel: 'from $199 + test cost · GC coordinates the right test',
    description: 'When a symptom could have several causes, a licensed NC GC scopes which test the symptom actually needs, coordinates the vetted specialist or sub, and translates the finding into your budget. Southern Cities COORDINATES the tests — inspection port + borescope, sewer scope, moisture/thermal imaging, structural-engineer evaluation (licensed PE) — it does not self-perform structural engineering. The $199 is the GC coordination + judgment fee; the third-party test cost is billed separately as a pass-through and does not credit. Run only where the cause is uncertain AND the cost swing is big. NC GC License #107724.',
    checkoutAmount: '199',
  },
  // ---- Stage B: Investor plans & renderings add-ons ----
  'plans-as-built': {
    key: 'plans-as-built',
    name: 'As-Built Plans',
    shortName: 'As-Built Plans',
    price: 34900,
    priceLabel: '$349 · measured existing-condition floor plan · 1 revision',
    description: 'A measured existing-condition floor plan of the property, delivered as a PDF plus an editable file. Includes 1 revision. NC GC License #107724.',
    checkoutAmount: '349',
  },
  'plans-future-state': {
    key: 'plans-future-state',
    name: 'Future-State Plans',
    shortName: 'Future-State Plans',
    price: 69900,
    priceLabel: '$699 · proposed-design floor plan · 2 revisions',
    description: 'A proposed-design (future-state) floor plan showing the renovated layout, delivered as a PDF plus an editable file. Includes 2 revisions. NC GC License #107724.',
    checkoutAmount: '699',
  },
  'renderings': {
    key: 'renderings',
    name: 'Renderings (photoreal)',
    shortName: 'Renderings',
    price: 19900,
    priceLabel: '$199 each · 3 for $499 · 1 revision each',
    description: 'Photoreal 3D renderings of the proposed design. $199 each (or order the 3-pack for $499), with 1 revision included per rendering; extra revisions $99 each. NC GC License #107724.',
    checkoutAmount: '199',
  },
  'renderings-3pack': {
    key: 'renderings-3pack',
    name: 'Renderings — 3-Pack (photoreal)',
    shortName: 'Renderings 3-Pack',
    price: 49900,
    priceLabel: '$499 · three photoreal renderings · 1 revision each',
    description: 'Three photoreal 3D renderings of the proposed design (save vs $199 each), with 1 revision included per rendering; extra revisions $99 each. NC GC License #107724.',
    checkoutAmount: '499',
  },
  // Deal Pack Pro is a TRUE recurring subscription, sold via
  // /api/deal-pack/pro-checkout (mode: subscription) — NOT a one-time cart
  // item. The old `deal-pack-pro-subscription` one-time SKU was removed so a
  // stray /cart link can't mis-charge $897 as a single payment.
};

function normalizeAmount(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return undefined;
  return Math.round(parsed * 100);
}

function sanitizeCartSelections(items: CartSelection[]): CartSelection[] {
  const grouped = new Map<string, CartSelection>();
  for (const item of items) {
    if (!CART_PRODUCTS[item.key]) continue;
    const existing = grouped.get(item.key);
    const nextQuantity = Math.max(1, item.quantity ?? 1);

    if (!existing) {
      grouped.set(item.key, item.amount ? { key: item.key, amount: item.amount, quantity: nextQuantity } : { key: item.key, quantity: nextQuantity });
      continue;
    }

    grouped.set(item.key, {
      key: item.key,
      amount: item.amount ?? existing.amount,
      quantity: (existing.quantity ?? 1) + nextQuantity,
    });
  }
  return Array.from(grouped.values());
}

export function sanitizeCartItems(items: string[]): string[] {
  return sanitizeCartSelections(items.map((item) => ({ key: item }))).map((item) => item.key);
}

function serializeCartSelection(item: CartSelection): string {
  const amountPart = item.amount ? `${(item.amount / 100).toString()}` : '';
  const quantityPart = item.quantity && item.quantity > 1 ? `${item.quantity}` : '';
  if (amountPart && quantityPart) return `${item.key}:${amountPart}:${quantityPart}`;
  if (amountPart) return `${item.key}:${amountPart}`;
  if (quantityPart) return `${item.key}::${quantityPart}`;
  return item.key;
}

export function buildCartHref(items: Array<string | CartSelection>): string {
  const selections = items.map((item) => (typeof item === 'string' ? { key: item } : item));
  const valid = sanitizeCartSelections(selections);
  if (!valid.length) return '/cart';
  return `/cart?${CART_QUERY_KEY}=${encodeURIComponent(valid.map(serializeCartSelection).join(','))}`;
}

export function parseCartParam(value: string | null | undefined): CartSelection[] {
  if (!value) return [];
  return sanitizeCartSelections(
    value
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry) => {
        const [key, rawAmount, rawQuantity] = entry.split(':');
        const quantity = rawQuantity ? Number(rawQuantity) : undefined;
        return {
          key,
          amount: normalizeAmount(rawAmount),
          quantity: quantity && Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : undefined,
        };
      })
  );
}

export function getCartProducts(items: Array<string | CartSelection>): ConstructionCartProduct[] {
  const selections = items.map((item) => (typeof item === 'string' ? { key: item } : item));
  return sanitizeCartSelections(selections).map((item) => CART_PRODUCTS[item.key]).filter(Boolean);
}

export function getCartLineItems(items: CartSelection[]): CartLineItem[] {
  return sanitizeCartSelections(items)
    .map((item) => {
      const product = CART_PRODUCTS[item.key];
      if (!product) return null;
      const quantity = item.quantity ?? 1;
      // SECURITY: price is authoritative from the server-side catalog only.
      // The client-supplied `item.amount` is NEVER trusted for the charge —
      // it cannot lower (or raise) what Stripe bills. Prevents price tampering.
      return {
        key: item.key,
        amount: product.price * quantity,
        quantity,
        product,
      };
    })
    .filter((item): item is CartLineItem => item !== null);
}

export function buildDirectCheckoutHref(item: CartSelection): string {
  const product = CART_PRODUCTS[item.key];
  const amount = item.amount ?? product?.price;
  if (!product || !amount) return '/portal';
  return `/portal?item=${product.key}&amount=${encodeURIComponent((amount / 100).toString())}`;
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

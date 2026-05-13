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
  'sub-network-access': {
    key: 'sub-network-access',
    name: 'Sub Network Access',
    shortName: 'Sub Network',
    price: 34900,
    priceLabel: '$349 starting price',
    description: 'Access to vetted subcontractor coverage, structured coordination, and priority overflow routing.',
    checkoutAmount: '349',
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
    name: 'Pre-Listing Construction Valuation',
    shortName: 'Construction Valuation',
    price: 39900,
    priceLabel: '$399 valuation',
    description: 'Construction-side valuation read for pricing decisions — condition-adjusted price band, top value-drag items with cost-to-fix vs cost-to-leave analysis, and a pricing strategy note.',
    checkoutAmount: '399',
  },
  'investor-review': {
    key: 'investor-review',
    name: 'Investor Deal & Scope Review',
    shortName: 'Deal & Scope Review',
    price: 49900,
    priceLabel: '$499 review',
    description: 'A pre-acquisition underwriting opinion. Scope feasibility, a rough budget range with confidence levels, construction risk callouts, and the walk-away trigger — for investors evaluating a deal they do not own yet. Decision-grade, not bid-grade.',
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
    price: 59900,
    priceLabel: '$599 review',
    description: 'Pressure-test the numbers — a line-by-line audit of your existing budget and scope against current market costs. Works pre-purchase (vetting an investor pro-forma) or post-purchase (before contractors price it or the lender locks in the draw). You bring a budget; we audit it.',
    checkoutAmount: '599',
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
    price: 154800,
    priceLabel: '$1,548 bundle (save $300)',
    description: 'Contractor Fit Consultation ($349) + Contractor Match & Bid Coordination ($1,199 bundled, normally $1,499). First we figure out what kinds of contractors you need; then we go find them and run the bids for you.',
    checkoutAmount: '1548',
  },
  'draw-review-support': {
    key: 'draw-review-support',
    name: 'Draw Review Support',
    shortName: 'Draw Review',
    price: 39900,
    priceLabel: '$399 review',
    description: 'Per-draw support review so scope, progress, and support materials are cleaner before lender submission.',
    checkoutAmount: '399',
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
    description: 'The full listing-side construction co-pilot: GC-Grade Property Inspection + Pre-Listing Valuation + Construction Confidence Sheet + Prep PM coordination call + Inspection Review + Repair Credit Letter + Repair Verification Visit. Saves vs à la carte.',
    checkoutAmount: '2299',
  },
  'buyer-transaction-package': {
    key: 'buyer-transaction-package',
    name: 'Buyer Transaction Package',
    shortName: 'Buyer Package',
    price: 199900,
    priceLabel: '$1,999 flat per deal',
    description: 'The full buyer-side construction co-pilot: GC-Grade Property Inspection + Negotiation Strategy Read + Inspection Review + Repair Scope Letter + Repair Verification Visit + Year-1 Priority Repair Plan. The on-site inspection replaces the retired photo-only Buyer-Side Property Read. Saves vs à la carte.',
    checkoutAmount: '1999',
  },
  'per-deal-copilot': {
    key: 'per-deal-copilot',
    name: 'Per-Deal Construction Co-Pilot',
    shortName: 'Per-Deal Co-Pilot',
    price: 149900,
    priceLabel: '$1,499 flat per deal',
    description: 'Construction co-pilot for the entire deal — listing or buying — for agents who already have their own inspection or only need the analytical + negotiation products. Excludes GC-Grade Property Inspection (buy separately if needed).',
    checkoutAmount: '1499',
  },
  'gc-grade-property-inspection': {
    key: 'gc-grade-property-inspection',
    name: 'GC-Grade Property Inspection + Budget Report',
    shortName: 'GC-Grade Inspection',
    price: 89900,
    priceLabel: '$899 standard',
    description: 'A licensed inspector visits the property AND a licensed NC GC reads the inspection through a construction lens — item-by-item severity, real cost ranges per finding, paste-ready repair-request language, negotiation strategy. The dual-layer flagship: real on-site inspection PLUS GC-grade budget analysis that inspectors legally cannot provide. 3–5 business day turnaround, statewide NC.',
    checkoutAmount: '899',
  },
  'gc-grade-property-inspection-rush': {
    key: 'gc-grade-property-inspection-rush',
    name: 'GC-Grade Property Inspection + Budget Report — RUSH',
    shortName: 'GC-Grade Inspection (Rush)',
    price: 119900,
    priceLabel: '$1,199 rush',
    description: 'Same as the standard GC-Grade Property Inspection but with 24–48 hour turnaround. Priority scheduling + report delivered next business day after on-site visit. Statewide NC.',
    checkoutAmount: '1199',
  },
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
      return {
        key: item.key,
        amount: (item.amount ?? product.price) * quantity,
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

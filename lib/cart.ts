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
    name: 'Inspection Response Service',
    shortName: 'Inspection Response',
    price: 29900,
    priceLabel: '$299 assessment',
    description: 'Assessment-first service for inspection issues that are threatening close probability.',
    checkoutAmount: '299',
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
    shortName: 'Realtor Review',
    price: 29900,
    priceLabel: '$299 review',
    description: 'Inspection report review with repair-path guidance built for agents trying to keep a deal on track.',
    checkoutAmount: '299',
  },
  'investor-review': {
    key: 'investor-review',
    name: 'Investor Deal & Scope Review',
    shortName: 'Deal & Scope Review',
    price: 49900,
    priceLabel: '$499 review',
    description: 'Construction-side review of deal scope, execution risk, and the next decision before earnest money or startup risk gets expensive.',
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
    name: 'Budget Review',
    shortName: 'Budget Review',
    price: 59900,
    priceLabel: '$599 review',
    description: 'Construction budget review for one project so underwriting and startup decisions use a cleaner number.',
    checkoutAmount: '599',
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

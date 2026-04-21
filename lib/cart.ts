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
};

export type CartLineItem = {
  key: string;
  amount: number;
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
    name: 'Investor Review',
    shortName: 'Investor Review',
    price: 49900,
    priceLabel: '$499 starting price',
    description: 'Paid construction-side review of project scope, execution risk, and what it will take to get the job moving.',
    checkoutAmount: '499',
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
};

function normalizeAmount(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return undefined;
  return Math.round(parsed * 100);
}

function sanitizeCartSelections(items: CartSelection[]): CartSelection[] {
  const seen = new Set<string>();
  const output: CartSelection[] = [];
  for (const item of items) {
    if (!CART_PRODUCTS[item.key] || seen.has(item.key)) continue;
    seen.add(item.key);
    output.push(item.amount ? { key: item.key, amount: item.amount } : { key: item.key });
  }
  return output;
}

export function sanitizeCartItems(items: string[]): string[] {
  return sanitizeCartSelections(items.map((item) => ({ key: item }))).map((item) => item.key);
}

function serializeCartSelection(item: CartSelection): string {
  if (!item.amount) return item.key;
  return `${item.key}:${(item.amount / 100).toString()}`;
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
        const [key, rawAmount] = entry.split(':');
        return { key, amount: normalizeAmount(rawAmount) };
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
      return {
        key: item.key,
        amount: item.amount ?? product.price,
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

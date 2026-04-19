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

export const CART_PRODUCTS: Record<string, ConstructionCartProduct> = {
  'permit-management-service': {
    key: 'permit-management-service',
    name: 'Permit Management Service',
    shortName: 'Permit Management',
    price: 150000,
    priceLabel: '$1,500 starting price',
    description: 'Permit submission support, correction handling, inspection coordination, and status tracking.',
    checkoutAmount: '1500',
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
    price: 500000,
    priceLabel: '$5,000 starting price',
    description: 'Listing prep work for owners and agents who need the property ready before launch.',
    checkoutAmount: '5000',
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
};

export function sanitizeCartItems(items: string[]): string[] {
  const seen = new Set<string>();
  const output: string[] = [];
  for (const item of items) {
    if (!CART_PRODUCTS[item] || seen.has(item)) continue;
    seen.add(item);
    output.push(item);
  }
  return output;
}

export function buildCartHref(items: string[]): string {
  const valid = sanitizeCartItems(items);
  if (!valid.length) return '/cart';
  return `/cart?${CART_QUERY_KEY}=${encodeURIComponent(valid.join(','))}`;
}

export function parseCartParam(value: string | null | undefined): string[] {
  if (!value) return [];
  return sanitizeCartItems(
    value
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean)
  );
}

export function getCartProducts(items: string[]): ConstructionCartProduct[] {
  return sanitizeCartItems(items).map((item) => CART_PRODUCTS[item]).filter(Boolean);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

import { SITE_CONFIG } from '@/lib/site-config';

/**
 * Product JSON-LD generator for individually-purchasable offerings.
 * Use for Deal Pack tiers, fixed-price products, and recurring plans.
 */
export type ProductSchemaInput = {
  /** Product name as shown to a buyer (e.g. "Build-Ready Deal Pack") */
  name: string;
  /** Short product description (1–2 sentences) */
  description: string;
  /** Page URL where this product lives (e.g. "/deal-pack") */
  url: string;
  /** Price in USD as a plain number (no $ or commas) */
  priceUsd: number;
  /** Optional billing recurrence ("monthly" if subscription, omit for one-time) */
  recurrence?: 'monthly' | 'yearly';
  /** Optional category for grouping (e.g. "Deal Pack") */
  category?: string;
  /** Optional explicit SKU / product key */
  sku?: string;
};

export default function ProductJsonLd({ products }: { products: ProductSchemaInput[] }) {
  const data = products.map((p, idx) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE_CONFIG.baseUrl}${p.url}#product-${p.sku ?? idx}`,
    name: p.name,
    description: p.description,
    url: `${SITE_CONFIG.baseUrl}${p.url}`,
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.name,
    },
    ...(p.sku ? { sku: p.sku } : {}),
    ...(p.category ? { category: p.category } : {}),
    offers: {
      '@type': 'Offer',
      url: `${SITE_CONFIG.baseUrl}${p.url}`,
      price: p.priceUsd.toFixed(2),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
      },
      ...(p.recurrence
        ? {
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: p.priceUsd.toFixed(2),
              priceCurrency: 'USD',
              billingIncrement: 1,
              unitCode: p.recurrence === 'monthly' ? 'MON' : 'ANN',
            },
          }
        : {}),
    },
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

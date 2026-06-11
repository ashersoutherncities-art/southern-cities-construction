import type { Metadata } from 'next';

/**
 * Default metadata for the /services route (the role selector overview page).
 *
 * Child role pages (/services/homeowners, /services/investors, etc.)
 * each export their own metadata or have their own layout.tsx — those
 * override this layout's metadata for the specific child route.
 */
export const metadata: Metadata = {
  title: 'Pricing & Services — Find the Right Path | Southern Cities Construction',
  description:
    'Find the right construction pricing path for your role — homeowner, investor, wholesaler, realtor, contractor, or developer. Clear scope, clear price, licensed NC GC behind every offer.',
  alternates: { canonical: '/services' },
  openGraph: {
    type: 'website',
    url: '/services',
    title: 'Pricing & Services — Find the Right Path',
    description:
      'Find the construction pricing path that fits your role — homeowner, investor, wholesaler, realtor, contractor, or developer.',
    siteName: 'Southern Cities Construction',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

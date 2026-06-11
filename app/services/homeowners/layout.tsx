import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For Homeowners | Southern Cities Construction',
  description:
    'Project support and full contracting for North Carolina homeowners — get a licensed NC GC behind your renovation, addition, or rehab project. Clear scope, clear price, structured execution.',
  alternates: { canonical: '/services/homeowners' },
  openGraph: {
    type: 'website',
    url: '/services/homeowners',
    title: 'For Homeowners — Construction Help in NC',
    description:
      'Project support and full contracting for North Carolina homeowners — clear scope, clear price, structured execution.',
    siteName: 'Southern Cities Construction',
  },
};

export default function HomeownersLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For Homeowners | Southern Cities Construction',
  description:
    'Packaged construction expertise for North Carolina homeowners — a licensed NC GC for any stage of your renovation, addition, or rehab. Buy the help you need now, or a full build. Clear scope, clear price, structured execution.',
  alternates: { canonical: '/services/homeowners' },
  openGraph: {
    type: 'website',
    url: '/services/homeowners',
    title: 'For Homeowners — Construction Help in NC',
    description:
      'Packaged construction expertise for NC homeowners — a licensed GC for any stage, from a deal review to a full build. Clear scope, clear price, structured execution.',
    siteName: 'Southern Cities Construction',
  },
};

export default function HomeownersLayout({ children }: { children: React.ReactNode }) {
  return children;
}

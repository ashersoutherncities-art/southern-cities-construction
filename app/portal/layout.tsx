import type { Metadata } from 'next';

// /portal/* houses internal client portal landing pages and authenticated
// asset views. None of them should be indexed by search engines.
export const metadata: Metadata = {
  title: 'Client Portal | Southern Cities Construction',
  description: 'Authenticated client portal access for Southern Cities Construction project owners.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return children;
}

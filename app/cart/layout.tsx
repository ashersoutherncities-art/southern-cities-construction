import type { Metadata } from 'next';

// Cart is a transactional page — should not be indexed by search engines.
// noindex,nofollow prevents it from appearing in SERPs and avoids
// crawl budget waste on a page that has no organic value.
export const metadata: Metadata = {
  title: 'Cart | Southern Cities Construction',
  description: 'Review your selected services and checkout.',
  alternates: { canonical: '/cart' },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}

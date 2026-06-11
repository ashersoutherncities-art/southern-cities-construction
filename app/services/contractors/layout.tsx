import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For Contractors | Southern Cities Construction',
  description:
    'For NC residential contractors — partner with a licensed general contractor on overflow work, scope verification, and structured project handoffs. Documented workflow, real pay schedule.',
  alternates: { canonical: '/services/contractors' },
  openGraph: {
    type: 'website',
    url: '/services/contractors',
    title: 'For NC Contractors — Partner With Southern Cities',
    description:
      'Partner with a licensed NC General Contractor on overflow work, scope verification, and structured project handoffs.',
    siteName: 'Southern Cities Construction',
  },
};

export default function ContractorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

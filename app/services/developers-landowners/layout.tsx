import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For Developers & Landowners | Southern Cities Construction',
  description:
    'Construction support for NC developers and landowners — feasibility, planning, permitting, and execution oversight on residential and small-scale infill builds.',
  alternates: { canonical: '/services/developers-landowners' },
  openGraph: {
    type: 'website',
    url: '/services/developers-landowners',
    title: 'For NC Developers & Landowners',
    description:
      'Feasibility, planning, permitting, and execution oversight on residential and small-scale infill builds.',
    siteName: 'Southern Cities Construction',
  },
};

export default function DevelopersLandownersLayout({ children }: { children: React.ReactNode }) {
  return children;
}

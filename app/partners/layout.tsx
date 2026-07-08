import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subcontractor Partners | Apply to Join the Network — Southern Cities Construction',
  description:
    'Join Southern Cities Construction’s statewide network of NC trade partners. We’re actively adding licensed, insured subcontractors across North Carolina for steady, repeat residential work on investor rehabs, renovations, and new builds.',
  alternates: { canonical: 'https://southerncitiesconstruction.com/partners' },
  openGraph: {
    type: 'website',
    url: 'https://southerncitiesconstruction.com/partners',
    title: 'Join Our Statewide NC Trade Network | Southern Cities Construction',
    description:
      'A licensed NC general contractor building a statewide network of licensed, insured trade partners for steady, repeat residential work across North Carolina.',
  },
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return children;
}

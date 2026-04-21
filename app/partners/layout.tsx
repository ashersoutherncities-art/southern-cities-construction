import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subcontractor Partners | Apply to Join the Network — Southern Cities Construction',
  description:
    'Apply to become a recommended subcontractor partner with Southern Cities Construction. Licensed, insured NC trades who want repeat residential work on a documented, structured workflow.',
  alternates: { canonical: 'https://southerncitiesconstruction.com/partners' },
  openGraph: {
    type: 'website',
    url: 'https://southerncitiesconstruction.com/partners',
    title: 'Subcontractor Partner Application | Southern Cities Construction',
    description:
      'A selective application for licensed, insured North Carolina subcontractors who want repeat residential work on a documented, structured coordination workflow.',
  },
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return children;
}

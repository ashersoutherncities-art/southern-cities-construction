import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Gallery | Southern Cities Construction',
  description:
    "Before-and-after residential project gallery from Southern Cities Construction — exterior refreshes, full renovations, additions, and rehabs across North Carolina.",
  alternates: { canonical: '/gallery' },
  openGraph: {
    type: 'website',
    url: '/gallery',
    title: 'NC Residential Project Gallery | Southern Cities Construction',
    description:
      'Before-and-after residential work across North Carolina — exterior refreshes, full renovations, additions, and rehabs.',
    siteName: 'Southern Cities Construction',
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}

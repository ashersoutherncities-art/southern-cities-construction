import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources | NC Construction Guides, Playbooks & Templates — Southern Cities Construction',
  description:
    'Free checklists and paid playbooks for North Carolina residential construction — permit prep, inspection pass-lists, scope-lock worksheets, investor playbooks, and GC onboarding toolkits.',
  alternates: { canonical: 'https://southerncitiesconstruction.com/resources' },
  openGraph: {
    type: 'website',
    url: 'https://southerncitiesconstruction.com/resources',
    title: 'Resources | NC Construction Guides, Playbooks & Templates',
    description:
      'Free guides for NC owners, paid playbooks for investors and GCs. The same checklists, worksheets, and workflows we use on active residential projects.',
  },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

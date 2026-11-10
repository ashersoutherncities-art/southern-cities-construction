import type { Metadata } from 'next';
import Script from 'next/script';
import ProjectRoadmapFunnel from '@/components/ProjectRoadmapFunnel';

export const metadata: Metadata = {
  title: 'Free NC Investor Project Readiness Assessment | Southern Cities Construction',
  description:
    'Evaluating a North Carolina investment property? Take a short project-readiness assessment and see whether your next step is rehab budgeting, a detailed scope, or construction execution.',
  alternates: { canonical: '/project-roadmap' },
  robots: { index: false, follow: true },
  openGraph: {
    type: 'website',
    url: '/project-roadmap',
    title: 'Know What Your NC Deal Needs Before You Commit',
    description:
      'Free project-readiness assessment for real estate investors buying, renovating, and building in North Carolina.',
  },
};

export default function ProjectRoadmapPage() {
  return (
    <>
      <ProjectRoadmapFunnel />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </>
  );
}

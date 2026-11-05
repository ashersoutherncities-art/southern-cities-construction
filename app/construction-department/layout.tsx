import type { Metadata } from 'next';

// Archived 2026-11-05 — no longer linked from nav, footer, or sitemap.
// Still reachable by direct URL / for existing subscribers; noindexed so
// it stops surfacing in search while the page itself stays live.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ConstructionDepartmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}

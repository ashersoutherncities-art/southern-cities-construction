import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Southern Cities Control Center',
  description: 'Standalone control center for Southern Cities companies, starting with Southern Cities Construction.',
  metadataBase: new URL('https://southern-cities-control-center.vercel.app'),
  openGraph: {
    type: 'website',
    title: 'Southern Cities Control Center',
    description: 'Executive overview, KPI dashboards, AI operator workflows, and company visibility.',
    siteName: 'Southern Cities Control Center',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Southern Cities Control Center',
    description: 'Executive overview, KPI dashboards, AI operator workflows, and company visibility.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SCCOPS.AI',
  description: 'Private operating system for Southern Cities companies, starting with Southern Cities Construction.',
  metadataBase: new URL('https://sccops.ai'),
  openGraph: {
    type: 'website',
    title: 'SCCOPS.AI',
    description: 'Private reports, operating dashboards, AI workflows, and executive visibility for Southern Cities.',
    siteName: 'SCCOPS.AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SCCOPS.AI',
    description: 'Private reports, operating dashboards, AI workflows, and executive visibility for Southern Cities.',
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

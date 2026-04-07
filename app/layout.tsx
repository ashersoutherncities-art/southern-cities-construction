import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Southern Cities Construction | Licensed General Contractor — Charlotte, NC",
  description: "Southern Cities Construction is a licensed general contractor in Charlotte, NC specializing in residential renovation, new construction, and ground-up development.",
  keywords: "general contractor Charlotte NC, licensed general contractor, residential renovation Charlotte, new construction Charlotte, ground-up development, permit management, Southern Cities Construction",
  metadataBase: new URL("https://southerncitiesconstruction.com"),
  alternates: {
    canonical: "https://southerncitiesconstruction.com",
  },
  openGraph: {
    type: "website",
    url: "https://southerncitiesconstruction.com",
    title: "Southern Cities Construction | Licensed General Contractor — Charlotte, NC",
    description: "Southern Cities Construction is a licensed general contractor in Charlotte, NC specializing in residential renovation, new construction, and ground-up development.",
    siteName: "Southern Cities Construction",
  },
  twitter: {
    card: "summary_large_image",
    title: "Southern Cities Construction | Licensed General Contractor — Charlotte, NC",
    description: "Licensed GC in Charlotte, NC. New construction, renovations, permit management & ground-up development.",
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://southerncitiesconstruction.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}

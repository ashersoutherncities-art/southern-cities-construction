import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Southern Cities Construction | Licensed General Contractor in Charlotte, NC",
  description: "Professional general contracting services in Charlotte, NC. Licensed (L.107724) for new construction, renovations, permit management, and project oversight.",
  icons: {
    icon: [
      { url: '/southern-cities-construction/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/southern-cities-construction/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/southern-cities-construction/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/southern-cities-construction/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
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
      <body>{children}</body>
    </html>
  );
}

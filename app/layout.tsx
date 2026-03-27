import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Southern Cities Construction | Licensed General Contractor in Charlotte, NC",
  description: "Professional general contracting services in Charlotte, NC. Licensed (L.107724) for new construction, renovations, permit management, and project oversight.",
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

/*
 * Root Layout — fonts and global styles only. Site chrome (nav, footer,
 * smooth scroll) lives in app/(site)/layout.tsx; the admin panel under
 * /admin ships its own chrome.
 */

import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Courier_Prime } from "next/font/google";
import "./globals.css";
import { getSite } from "@/lib/content";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500"],
  display: "swap",
});

const mono = Courier_Prime({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: {
      default: `${site.name} — ${site.tagline}`,
      template: `%s — ${site.name}`,
    },
    description: site.description,
    openGraph: {
      title: `${site.name} — ${site.tagline}`,
      description: site.tagline,
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}

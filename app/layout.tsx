/* ──────────────────────────────────────────────────────────────────────────
 * Root Layout — fonts, metadata, nav, footer, smooth scroll.
 *
 * Site-wide metadata comes from /content/about.ts.
 * Font setup uses next/font (Cormorant Garamond for display, Inter for body).
 *
 * You normally don't need to touch this file. To change fonts, edit the
 * `serif` / `sans` configurations below.
 * ────────────────────────────────────────────────────────────────────────── */

import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { about } from "@/content/about";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

export const metadata: Metadata = {
  title: {
    default: `${about.name} — ${about.tagline}`,
    template: `%s — ${about.name}`,
  },
  description: `The personal index of ${about.name}. Builder, data analyst, watch collector, and writer based in ${about.location}.`,
  openGraph: {
    title: `${about.name} — ${about.tagline}`,
    description: about.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-paper text-ink grain antialiased">
        <SmoothScroll />
        <Nav />
        <main>{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}

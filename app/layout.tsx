/*
 * Root Layout — fonts, theme bootstrap, global styles. Site chrome (nav,
 * footer, smooth scroll) lives in app/(site)/layout.tsx; the admin panel
 * under /admin ships its own chrome.
 */

import type { Metadata } from "next";
import { Cormorant_Garamond, EB_Garamond, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./redesign.css";
import { getSite } from "@/lib/content";

const SITE_URL = "https://hkryu.space";

// Public brand for all crawlable metadata — kept separate from the legal name
// so the site doesn't rank for an exact full-name search. The hero carries a
// practice statement rather than the name; the name lives in the About bio.
const BRAND = "hkryu";
const SEO_DESCRIPTION =
  "Independent builder working at the edge of AI systems, agents, markets, and horology. Notes, projects, and writing — hkryu.space.";

// Display — high-contrast Garamond, set large, light and lowercase
const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Body — old-style Garamond reading voice, paired with the display serif
const body = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// UI — quiet grotesque for studio chrome and form controls only
const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

// Meta — monospace carries every label, index numeral and spec rail
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

// Applies stored theme/motion preferences before first paint (no flash).
// The concrete ground is the signature look, so dark is the default; the raw
// plaster theme applies only when the visitor picks it from the toggle.
const bootstrap = `(function(){try{
var t=localStorage.getItem('theme');
if(t==='dark')document.documentElement.classList.add('dark');
if(localStorage.getItem('motion')==='reduced')document.documentElement.classList.add('reduce-motion');
}catch(e){}})()`;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${BRAND} — ${site.tagline}`,
      template: `%s — ${BRAND}`,
    },
    description: SEO_DESCRIPTION,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        "max-snippet": -1,
        "max-image-preview": "none",
        "max-video-preview": -1,
      },
    },
    alternates: { types: { "application/rss+xml": `${SITE_URL}/feed.xml` } },
    openGraph: {
      title: `${BRAND} — ${site.tagline}`,
      description: SEO_DESCRIPTION,
      url: SITE_URL,
      siteName: BRAND,
      type: "website",
      locale: "en_SG",
    },
    twitter: {
      card: "summary",
      title: `${BRAND} — ${site.tagline}`,
      description: SEO_DESCRIPTION,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
      </head>
      <body className="bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}

/*
 * Root Layout — fonts, theme bootstrap, global styles. Site chrome (nav,
 * footer, smooth scroll) lives in app/(site)/layout.tsx; the admin panel
 * under /admin ships its own chrome.
 */

import type { Metadata } from "next";
import { Cormorant_Garamond, EB_Garamond, Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import { getSite } from "@/lib/content";

const SITE_URL = "https://hkryu.space";

// Public brand for all crawlable metadata — kept separate from the legal name
// so the site doesn't rank for an exact full-name search. The name still
// appears (stylised, obfuscated) in the hero, just not in title/OG/JSON-LD.
const BRAND = "hkryu";
const SEO_DESCRIPTION =
  "Independent builder working at the edge of AI systems, agents, markets, and horology. Notes, projects, and writing — hkryu.space.";

// Display — high-contrast classical serif, used light and very large
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

// Body — classical garamond reading voice
const body = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// UI — reserved for labels, nav meta and studio chrome only
const sans = Atkinson_Hyperlegible({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "700"],
  display: "swap",
});

// Applies stored theme/motion preferences before first paint (no flash).
// The slate ground is the signature look, so dark is the default; the bone
// theme applies only when the visitor picks it from the toggle.
const bootstrap = `(function(){try{
var t=localStorage.getItem('theme');
if(t!=='light')document.documentElement.classList.add('dark');
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
      className={`${serif.variable} ${body.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
      </head>
      <body className="bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}

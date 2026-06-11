/*
 * Root Layout — fonts, theme bootstrap, global styles. Site chrome (nav,
 * footer, smooth scroll) lives in app/(site)/layout.tsx; the admin panel
 * under /admin ships its own chrome.
 */

import type { Metadata } from "next";
import { Cormorant_Garamond, Courier_Prime, Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import { getSite } from "@/lib/content";

const SITE_URL = "https://hkryu.space";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const sans = Atkinson_Hyperlegible({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "700"],
  display: "swap",
});

const mono = Courier_Prime({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
});

// Applies stored theme/motion preferences before first paint (no flash).
// Falls back to prefers-color-scheme when nothing is stored.
const bootstrap = `(function(){try{
var t=localStorage.getItem('theme');
if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark');
if(localStorage.getItem('motion')==='reduced')document.documentElement.classList.add('reduce-motion');
}catch(e){}})()`;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${site.name} — ${site.tagline}`,
      template: `%s — ${site.name}`,
    },
    description: site.description,
    alternates: { types: { "application/rss+xml": `${SITE_URL}/feed.xml` } },
    openGraph: {
      title: `${site.name} — ${site.tagline}`,
      description: site.description,
      url: SITE_URL,
      siteName: site.name,
      type: "website",
      locale: "en_SG",
    },
    twitter: {
      card: "summary",
      title: `${site.name} — ${site.tagline}`,
      description: site.description,
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
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
      </head>
      <body className="bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}

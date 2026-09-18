/*
 * Site layout — public-facing chrome: nav, footer, smooth scroll, grain.
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getSite } from "@/lib/content";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSite();
  return (
    <div className="portfolio-shell">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">{children}</main>
      <Footer site={site} />
    </div>
  );
}

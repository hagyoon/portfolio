/*
 * Site layout — public-facing chrome: nav, footer, smooth scroll, grain.
 */

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { getSite } from "@/lib/content";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSite();
  return (
    <div className="grain">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SmoothScroll />
      <Nav />
      <main id="main">{children}</main>
      <Footer site={site} />
    </div>
  );
}

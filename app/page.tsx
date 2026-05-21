/* ──────────────────────────────────────────────────────────────────────────
 * Homepage — single-scroll editorial narrative.
 *
 * To reorder sections, drag the JSX below.
 * To remove a section, delete or comment its line.
 * To add a new section, create a component in /components/sections/
 * and import it here.
 *
 * Content for each section lives in:
 *   /content/about.ts          — name, tagline, bio, manifesto, contact
 *   /content/projects.ts       — Selected Work entries
 *   /content/explorations.ts   — Currently Exploring entries
 *   /content/gallery.ts        — Atmosphere images
 *   /content/writing/*.md      — Long-form essays (markdown, frontmatter)
 * ────────────────────────────────────────────────────────────────────────── */

import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Explorations from "@/components/sections/Explorations";
import Gallery from "@/components/sections/Gallery";
import Writing from "@/components/sections/Writing";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <Explorations />
      <Gallery />
      <Writing />
      <Contact />
    </>
  );
}

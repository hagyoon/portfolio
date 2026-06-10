/*
 * Homepage — single-scroll editorial narrative.
 *
 * All content is markdown, loaded server-side from /content (which mirrors
 * Portfolio/content/ in the Obsidian vault and is editable at /admin):
 *   content/site.md          — copy, manifesto, marquee, gallery, contact
 *   content/projects/*.md    — Selected Work
 *   content/interests/*.md   — Currently Exploring
 *   content/writing/*.md     — essays
 */

import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Explorations from "@/components/sections/Explorations";
import Gallery from "@/components/sections/Gallery";
import Writing from "@/components/sections/Writing";
import Contact from "@/components/sections/Contact";
import { getSite, getProjects, getInterests, getEssays } from "@/lib/content";

export default async function HomePage() {
  const [site, projects, interests, essays] = await Promise.all([
    getSite(),
    getProjects(),
    getInterests(),
    getEssays(),
  ]);

  return (
    <>
      <Hero site={site} />
      <Marquee words={site.marquee} />
      <About site={site} />
      <Projects projects={projects} />
      <Explorations interests={interests} />
      <Gallery images={site.gallery} />
      <Writing essays={essays} />
      <Contact site={site} />
    </>
  );
}

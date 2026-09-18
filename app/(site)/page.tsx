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
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Explorations from "@/components/sections/Explorations";
import Gallery from "@/components/sections/Gallery";
import Writing from "@/components/sections/Writing";
import SystemPlayground from "@/components/sections/SystemPlayground";
import { getSite, getProjects, getInterests, getEssays } from "@/lib/content";

export default async function HomePage() {
  const [site, projects, interests, essays] = await Promise.all([
    getSite(),
    getProjects(),
    getInterests(),
    getEssays(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "hkryu",
    description: site.tagline,
    url: "https://hkryu.space",
    jobTitle: "AI & Systems Builder",
    address: { "@type": "PostalAddress", addressLocality: "Singapore" },
    sameAs: [site.contact.linkedin, site.contact.github].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero site={site} />
      <Projects projects={projects} />
      <SystemPlayground />
      <About site={site} />
      <Explorations interests={interests} />
      <Gallery images={site.gallery} index="04" />
      {/* Gallery only renders once images exist, so the dial numerals close
          up behind it rather than leaving a gap in the sequence. */}
      <Writing essays={essays} index={site.gallery.length ? "05" : "04"} />
    </>
  );
}

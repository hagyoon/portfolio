/* ──────────────────────────────────────────────────────────────────────────
 * PROJECTS — The Selected Work section on the homepage reads from this list.
 *
 * • To ADD a project: copy any block below, change the fields, push to top.
 * • To REMOVE a project: delete the block.
 * • To REORDER: drag blocks. Display order = order in this array.
 * • To LINK to a detail case study: keep `slug` matching the filename in
 *   /content/projects/<slug>.md (the markdown file holds the long version).
 *
 * Image: drop a JPG/PNG/AVIF into /public/images/projects/ and reference
 * the path here as "/images/projects/your-file.jpg". Recommended ratio 4:5
 * or 3:4 for portrait, 16:9 for landscape. If you leave `image` empty, the
 * card renders as a typographic block with no image.
 * ────────────────────────────────────────────────────────────────────────── */

export type Project = {
  slug: string;          // URL slug + matches markdown filename in content/projects/
  title: string;
  year: string;
  domain: string;        // e.g. "AI · Agents · Systems" — display tag string
  summary: string;       // One sentence, shown on homepage card
  image?: string;        // Optional. Path under /public/. Empty = no image.
  imageAspect?: "portrait" | "landscape" | "square";  // Layout hint
};

export const projects: Project[] = [

  // ── 01 ──────────────────────────────────────────────────────────────────
  {
    slug: "openclaw",
    title: "OpenClaw",
    year: "2026",
    domain: "AI · Agents · Systems",
    summary: "A production multi-agent AI system running on a Berlin VPS. A manager agent coordinates specialist agents through Telegram. Different bots, different employees.",
    image: "/images/projects/openclaw.jpg",
    imageAspect: "landscape",
  },

  // ── 02 ──────────────────────────────────────────────────────────────────
  {
    slug: "watch-roll",
    title: "Watch-Roll",
    year: "2026",
    domain: "Product · Mobile · B2B",
    summary: "Swipe-based watch discovery with taste profiling and B2B dealer intelligence. Tinder mechanics applied to horological connoisseurship.",
    image: "/images/projects/watch-roll.jpg",
    imageAspect: "portrait",
  },

  // ── 03 ──────────────────────────────────────────────────────────────────
  {
    slug: "second-brain",
    title: "Second Brain",
    year: "2026",
    domain: "AI · Knowledge · Infrastructure",
    summary: "An LLM-maintained Obsidian knowledge system. Three layers (raw sources, synthesised wiki, context schema) designed to get more useful as it grows.",
    image: "/images/projects/second-brain.jpg",
    imageAspect: "landscape",
  },

  // ── 04 ──────────────────────────────────────────────────────────────────
  {
    slug: "finance-os",
    title: "Finance OS",
    year: "2026",
    domain: "Finance · Analytics · Personal",
    summary: "A personal financial dashboard with the rigour of a small company's FP&A function. Net worth, portfolio performance, scenario modelling, all in one place.",
    image: "/images/projects/finance-os.jpg",
    imageAspect: "landscape",
  },

  // ── 05 ──────────────────────────────────────────────────────────────────
  {
    slug: "macro-monitor",
    title: "Macro Monitor",
    year: "2026",
    domain: "Markets · Automation · Data",
    summary: "A daily 10am SGT market briefing delivered via Telegram. BTC, energy complex, systematic trading signals, key economic events. Curated, not a data dump.",
    image: "/images/projects/macro-monitor.jpg",
    imageAspect: "portrait",
  },

];

/* ──────────────────────────────────────────────────────────────────────────
 * ABOUT — Edit your name, tagline, bio, philosophy, and contact details here.
 *
 * • All copy on the Hero, About, and Contact sections comes from this file.
 * • Plain text. No markdown. Edit in any text editor.
 * • To wrap a line in editorial italic on the page, use { italic: "..." }
 *   inside the paragraph arrays (see philosophy lines below for examples).
 * ────────────────────────────────────────────────────────────────────────── */

export const about = {

  // ── Identity ────────────────────────────────────────────────────────────
  name: "Hakyun Ryu",
  tagline: "Builder. Watch geek. Exploring the edge of AI systems and human workflows.",
  location: "Singapore",
  coordinates: "1°N",

  // ── Hero descriptor (short line under the name) ─────────────────────────
  // Keep this under ~12 words for the visual rhythm.
  descriptor: "Systems thinker. Data analyst. Quiet builder.",

  // ── About / Philosophy paragraphs ───────────────────────────────────────
  // Each entry is one paragraph. Add or remove as you like.
  bio: [
    "I've always been drawn to systems. Financial markets, independent watchmaking, automation, knowledge networks, the way humans think and operate. The same curiosity that pulled me into investing and independent horology eventually led me deep into AI agents and autonomous workflows. Find what matters before it's mainstream, figure it out myself, then bring others along.",

    "My work sits at the intersection of technology, finance, and design. Less hype, more about systems that are useful day to day. I'm currently exploring how autonomous AI systems, personal knowledge graphs, and intelligent workflows can reshape the way individuals and small teams operate, especially through live data pipelines and AI tooling for non-technical SME owners.",

    "Beyond the technical side, I'm deeply interested in independent watchmaking, thoughtful product design, and how philosophy shapes the way we interact with the world. I'm especially drawn to tools that feel innately human. Quiet infrastructure that amplifies thinking rather than replacing it.",

    "I care about building things that compound over time. Knowledge, systems, relationships, ideas.",
  ],

  // ── Manifesto lines (rendered as numbered editorial list) ───────────────
  // Each line stands alone. Punchy is good.
  manifesto: [
    "Find the thing before it's mainstream. Figure it out. Bring others with you.",
    "Build systems that are useful day to day, not impressive in a pitch deck.",
    "The interesting questions live one floor below the dashboard.",
    "Aesthetics isn't decoration. It's a form of clear thinking.",
  ],

  // ── Marquee strip on the homepage (italic ticker just under hero) ───────
  marquee: [
    "Watches",
    "AI Builder",
    "Data Analytics",
    "Second Brain",
    "Capital Markets",
    "Horology",
    "Autonomous Agents",
    "Philosophy",
  ],

  // ── Contact section ─────────────────────────────────────────────────────
  contact: {
    invitation: "If you're working on ambitious systems, unconventional ideas, or thoughtful products — let's connect.",
    email: "ryuhakyun@gmail.com",
    linkedin: "https://www.linkedin.com/in/hakyunryu",
    github: "https://github.com/hagyoon",
  },

};

export type About = typeof about;

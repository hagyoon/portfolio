# Portfolio — Hakyun Ryu

A personal portfolio site built as an editorial object: minimal, architectural, Seoul-inflected. Stack is Next.js 15 + Tailwind + Framer Motion + Lenis smooth scrolling. Content lives in plain markdown files, sourced from the Obsidian second brain.

## How content flows

The site runs as a live Node service on Zo (`https://portfolio-hagyoon.zocomputer.io`), not on Vercel. GitHub is no longer part of this pipeline at all — the vault reaches Zo directly.

```
A. Add clippings / write in Obsidian, as usual, on the Mac

B. A local rsync job on the Mac pushes the vault over SSH
   (the existing ssh-openclaw-agent service, ts6.zocomputer.io:10052)
   into /home/workspace/obsidian_llmwiki/vault/ on Zo
        │
        ▼
   A Zo automation runs scripts/sync-obsidian.sh on a schedule:
     - rsync vault/Portfolio/content/ → content/ in this checkout
     - commit locally (never pushed to GitHub)
        │
        ▼
   If content changed, the automation restarts the live Zo service
   → change is visible on the site within a minute or two

C. Edit in the browser at /admin (login required)
   Saves write straight to this checkout's content/ (local filesystem —
   no GITHUB_TOKEN is set, so the GitHub-API write path is inactive).
   Media uploads land in public/uploads/.
```

**Source of truth for synced content:** `/home/workspace/obsidian_llmwiki/vault/Portfolio/content/` — a mirror of the local Obsidian vault, kept current by a Mac-side rsync push (see that folder's own notes). Direct edits to this repo's `content/` folder will be overwritten by the next sync — edit in Obsidian, or at `/admin` if you want the change to stick outside the sync cycle.

To run a sync manually, ask Zo to run `scripts/sync-obsidian.sh`.

## The admin studio (/admin)

Log in at `/admin/login` with your personal credentials and you can edit every
piece of content — site copy, projects, essays, interests, the gallery — and
upload/delete images (jpg · png · webp · gif · svg · avif) without touching
code. Saves publish immediately (commit → deploy, live in ~1–2 minutes).

Setup (Vercel env vars, see `.env.local.example`):

- `ADMIN_EMAIL` — your login email
- `ADMIN_PASSWORD_HASH` — generate with `node scripts/hash-password.mjs "your-password"`
- `SESSION_SECRET` — any long random string (`openssl rand -hex 32`)
- `GITHUB_TOKEN` — PAT with contents read/write on both repos; without it the
  CMS falls back to writing the local filesystem (dev mode)

## Editing content (no code required)

All editable content lives under `content/` (canonical copy in `Portfolio/content/` in the Obsidian vault). Edit any file, save, and the change shows up after the next dev reload or deploy.

```
content/
├── site.md                  # site copy: name, tagline, intro, manifesto, marquee, contact
├── projects/
│   ├── quiet-ledger.md      # one file per project — filename is the URL slug
│   └── …
├── writing/
│   ├── quiet-as-a-strategy.md   # one file per essay
│   └── …
└── interests/
    ├── horology.md          # one file per interest section
    └── …
```

### Adding a new project

Create `content/projects/your-slug.md`:

```markdown
---
title: Project Name
client: Client name (optional)
domain: Data · Strategy
year: "2026"
status: selected     # or "archive" to hide from the homepage
role: Your role
stack:
  - Tool 1
  - Tool 2
links:
  - label: Read more
    href: https://example.com
summary: One-line summary shown on the index and case-study header.
cover: /covers/your-image.jpg   # optional — drop image in public/covers/
---

## Section heading

Body copy. Standard markdown. **Bold**, _italics_, [links](https://example.com), lists, blockquotes — all supported.

> Pull-quotes render as editorial blockquotes.
```

### Adding a new essay

Create `content/writing/your-slug.md`:

```markdown
---
title: Essay Title
date: 2026-05-20
tag: Essay
excerpt: One-line teaser shown on the index.
---

Body copy in markdown.
```

### Editing the homepage copy, tagline, marquee, contact

Open `content/site.md` and edit the frontmatter. The keys:

- `name`, `tagline`, `description`, `location` — header / hero
- `intro` — large editorial line on the homepage
- `manifesto` — the numbered short-line credo block
- `marquee` — words that scroll across the band under the hero
- `about` — the about-page biography (multi-paragraph, use `|` and newlines)
- `contact.email`, `contact.linkedin`, `contact.x` — surfaced in the footer and contact page

### Editing interests

Each markdown file in `content/interests/` becomes a section on `/interests`. Edit, reorder by renaming (alphabetical), or add new ones with the same frontmatter shape (`title`, `caption`).

### Adding images

Drop image files under `public/` (e.g. `public/covers/foo.jpg`) and reference them in markdown frontmatter as `cover: /covers/foo.jpg`, or in essay bodies as standard markdown: `![alt text](/covers/foo.jpg)`.

The about-page portrait expects a file at `/about-portrait.jpg` (in `public/`) — drop one there to replace the placeholder block.

---

## Running locally

```bash
npm install      # first time only
npm run dev      # http://localhost:3000
```

Edit any markdown file in `content/` and the page refreshes automatically.

## Building & deploying

**Currently live on Zo**, not Vercel — a supervised Node process (`next start`) running directly on the Zo server, edited in place at `/home/workspace/Projects/portfolio`. Content and code changes take effect after a service restart, no build/deploy step needed from the outside.

```bash
npm run build    # production build — fully static
npm run start    # serve the built site
```

The project can still be deployed on Vercel if ever needed (push to a Git repo, import on [vercel.com/new](https://vercel.com/new), accept the Next.js defaults) — but that path is not currently wired up, on purpose.

---

## Design notes

- **Palette** — off-white paper (`#f4f1ec`), warm stone, charcoal ink. No pure white. No pure black. The grain overlay is intentional; remove it by deleting `.grain` from `app/layout.tsx`.
- **Typography** — Cormorant Garamond for display & headings, Inter for body. Both loaded via `next/font`. Swap in `app/layout.tsx`.
- **Motion** — All animation lives in `components/Reveal.tsx`, `Hero.tsx`, `SelectedProjects.tsx`, and `SmoothScroll.tsx`. Easing is `cubic-bezier(0.22, 1, 0.36, 1)` throughout. Tune duration if the site feels too slow.
- **Grid** — 12-column with `container-edge` for outer padding. Asymmetric placement is deliberate — see `app/page.tsx` for the pattern.

## Project structure

```
app/                # Next.js 15 app router pages
components/         # Nav, Footer, Hero, Reveal, motion primitives
content/            # All editable markdown
lib/content.ts      # Markdown loader & types
public/             # Static images / assets
tailwind.config.ts  # Colours, fonts, type scale
app/globals.css     # Base styles, grain, prose
```

---

Built quietly. Edited often.

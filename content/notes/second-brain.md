---
title: "Second Brain"
topic: "AI & Technology"
summary: "The methodology behind this wiki system. Sources: Karpathy's LLM Wiki pattern, Tiago Forte's PARA/CODE, Hakyun's AI Second Brain build guide"
---

# Second Brain

> The methodology behind this wiki system. Sources: Karpathy's LLM Wiki pattern, Tiago Forte's PARA/CODE, Hakyun's AI Second Brain build guide.

---

## The Core Idea (Karpathy)

Most LLM-document systems are RAG: retrieve chunks at query time, regenerate from scratch every time. Nothing accumulates.

The wiki pattern is different: the LLM **incrementally builds and maintains a persistent artifact**. When a new source arrives, it's read, synthesized, and integrated — updating entity pages, flagging contradictions, strengthening existing synthesis. Knowledge compounds.

> "The wiki is a persistent, compounding artifact. The cross-references are already there. The contradictions have already been flagged."

**Human role:** Source curation, exploration, asking good questions.
**LLM role:** Summarizing, cross-referencing, filing, bookkeeping.

---

## Three-Layer Architecture

| Layer | What It Is | Who Owns It |
|-------|-----------|-------------|
| **Raw sources** | Articles, papers, images, data files — immutable source of truth | Human |
| **Wiki** | LLM-generated markdown: summaries, entity pages, concept pages, synthesis | LLM |
| **Schema (CLAUDE.md)** | Conventions, workflows, how to ingest/query/maintain | Co-evolved |

This vault's schema is at `CLAUDE.md/CLAUDE.md.md`.

---

## Operations

### Ingest
Drop a source into `raw-sources/`, tell the LLM to process it.

**Flow:** Read source → discuss key takeaways → write summary page → update index → update related entity/concept pages → append to log.

A single source typically touches 5–15 wiki pages.

### Query
Ask questions against the wiki. LLM reads index first, drills into relevant pages, synthesizes with citations.

**Output forms:** markdown page, comparison table, Marp slide deck, matplotlib chart, canvas.

**Key insight:** Good answers can be filed back as new wiki pages — explorations compound just like sources.

### Lint (Health Check)
Periodic check for:
- Contradictions between pages
- Stale claims superseded by newer sources
- Orphan pages (no inbound links)
- Important concepts mentioned but lacking their own page
- Missing cross-references
- Data gaps that could be filled with web search

---

## Index + Log Structure

**`index.md`** — Content-oriented catalog. Every page listed with link + one-line summary + optional metadata. LLM reads this first on every query to find relevant pages.

**`log.md`** — Chronological, append-only. Format: `## [YYYY-MM-DD] ingest | Source Title`. Parseable with `grep "^## \[" log.md | tail -5`.

---

## Tiago Forte's PARA + CODE

### PARA (Organization)
- **Projects** — Active work with a defined end
- **Areas** — Ongoing responsibilities (health, finances, relationships)
- **Resources** — Reference material
- **Archive** — Inactive items

### CODE (Workflow)
- **Capture** — Get ideas out of your head
- **Organize** — File into PARA structure
- **Distill** — Extract key insights (progressive summarization)
- **Express** — Produce outputs (writing, projects, presentations)

### Key principles
- Search is the primary retrieval mechanism (not perfect filing)
- Second brain improves output production by offloading cognitive load
- Build for future self who needs to find it quickly

---

## Hakyun's Philosophy for This System

From `raw-sources/Life and Finances/1. SECONDBRAIN - AI pipeline.md`:

- Obsidian as local markdown knowledge graph
- AI as thinking *partner*, not passive storage
- Feedback loop: refine → accept/reject AI links → improve
- Avoid passive dump — focus on **atomic notes + aggressive linking + AI as synthesis partner**

> "A system that thinks with me, not just stores information."

---

## Tooling Notes

- **Obsidian Web Clipper** — browser extension, converts articles to markdown
- **Obsidian graph view** — best way to see connection topology, hub pages, orphans
- **Dataview plugin** — runs queries over YAML frontmatter (tags, dates, source counts)
- **Marp** — markdown slide deck format; useful for generating presentations from wiki content
- **qmd** — local hybrid BM25/vector search for markdown at scale

---

## Karpathy's LLM Wiki — Full Pattern Details

**Source:** `raw-sources/AI Projects/Karpathy's LLM wiki.md` (Karpathy, 2026)

This is the canonical source for the pattern this vault is built on. Key additions beyond what was already summarized:

**Operations in full:**
- **Ingest:** Read source → discuss key takeaways → write summary page → update index → update 5–15 related pages → append log. "Personally I prefer to ingest sources one at a time and stay involved."
- **Query outputs:** markdown page, comparison table, Marp slide deck, matplotlib chart, canvas. **Good answers should be filed back as new pages** — explorations compound.
- **Lint:** Contradictions, stale claims, orphan pages, missing cross-references, data gaps.

**Why it works:** "The tedious part of maintaining a knowledge base is not the reading or the thinking — it's the bookkeeping. Humans abandon wikis because the maintenance burden grows faster than the value. LLMs don't get bored."

**Vannevar Bush connection:** Related in spirit to the Memex (1945) — personal curated knowledge store with associative trails. Bush's vision was private, actively curated, with connections as valuable as documents. The part he couldn't solve: who does the maintenance. LLMs handle that.

**Optional CLI:** `qmd` — local hybrid BM25/vector search for markdown files (when wiki grows past index-file scale).

---

## How I Built My Second Brain — Obsidian Approach

**Source:** `raw-sources/AI Projects/How I Built My Second Brain with Obsidian.md` (Kevin T'Syen, 2025)

### Alternative Vault Structure (for reference)

```
00. Inbox        → scratchpad; dump and sort later
01. Daily Notes  → log, tasks, journal (one note/day)
02. Projects     → each project: meeting notes, todos, planning, references
03. Code Snippets → reusable functions, terminal commands
04. Architecture & Design → system diagrams, technical decisions
05. Learnings    → summaries of books, courses, articles
```

### Why Obsidian Over Notion

| Factor | Obsidian | Notion |
|--------|---------|--------|
| Data ownership | Local markdown (yours) | Closed ecosystem (theirs) |
| Offline | Fully offline | Needs internet |
| Speed | Fast even at scale | Sluggish with large databases |
| Version control | Git (full history, free) | Basic undo only |
| Customization | Hundreds of plugins | Limited integrations |
| Dev-friendly | Markdown native; query with Dataview | Block-based, not text-native |

**Free sync via Git:** Obsidian Git plugin → auto-commits to private GitHub repo. Free syncing + full version history.

**Key plugins:**
- **Excalidraw** — Diagrams embedded directly in notes
- **Kanban** — Task management inside Obsidian
- **Templater** — Consistent note structure (daily log, meeting notes, bug reports)
- **Tasks** — Recurring tasks, filters, due dates
- **Dataview** — SQL/JS queries over note frontmatter (surface open tasks, recent notes)

---

## Monetising the Second Brain

**Source:** `raw-sources/AI Projects/Monetising Secondbrain.md`

The second brain is infrastructure, not the product. It becomes valuable when it saves time, makes money, or improves decisions for someone else.

### Six Monetisation Paths

**1. Done-for-You Second Brain Systems (fastest to monetise)**
Build custom Obsidian + AI workflows for clients:
- Target: financial advisors, founders, analysts, content creators
- Sell: decision systems, workflow automation, time saved
- Pricing: $300–$2,000 per setup

**2. AI Knowledge Operator Service**
Combine Obsidian (storage) + Claude/GPT (reasoning) + system design. Becomes a personal AI analyst for the client. "The guy who builds AI brains for professionals."

**3. Niche Product (scalable)**
"Second Brain for Watch Collectors" — Hakyun's unfair edge:
- Collection tracker, strap pairing database, market price tracking, brand wiki
- Sell as Notion/Obsidian template ($19–$79) or premium AI-feature version

**4. Analytics + Second Brain Hybrid**
Merge data skills with knowledge system → "decision intelligence system." For a business: store data insights, link sales trends + staffing decisions + forecasts, then layer AI to answer "why did revenue drop?"

**5. Internal Tool for Companies**
AI-powered company wiki, internal knowledge systems, decision dashboards. Solves: scattered docs, lost knowledge, inefficient workflows.

**6. Content → Audience → Monetization**
Second brain as content engine and idea generator. Publish insights/frameworks on LinkedIn, Substack. Monetize via consulting, templates, paid content.

### The 3 Most Realistic Paths for Hakyun

1. **High-ticket service** — Build systems for finance people, analysts, founders
2. **Watch niche product** — No one else has his level of niche interest + systems thinking
3. **AI + analytics hybrid** — "I build decision systems for businesses" (extends Merlion Café-type analytics work)

> ⚠️ Trap to avoid: "I need to perfect the system first." Don't. Need 70% working system + 30% real-world feedback.

---

## Related Pages

[[active-projects]] | [[hakyun-ryu]] | [[index]] | [[claude-code-tools]]

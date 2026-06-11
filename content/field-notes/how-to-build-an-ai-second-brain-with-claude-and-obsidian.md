---
title: "How to Build an AI Second Brain with Claude and Obsidian"
topic: "Projects & Ideas"
summary: "Reference to his github: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f"
---

Reference to his github: [https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f]

WHY THIS IS DIFFERENT FROM EVERYTHING ELSE

Most people's experience with AI and documents looks like this: you upload files, the AI retrieves relevant chunks when you ask a question, and generates an answer. That is how NotebookLM, ChatGPT file uploads, and most RAG systems work. The AI is rediscovering knowledge from scratch on every question. There is no accumulation. Nothing compounds.

This is different. Instead of retrieving from raw documents every time you ask something, the AI incrementally builds and maintains a persistent wiki. A structured, interlinked collection of markdown files that sits between you and your raw sources. When you add a new source, the AI reads it, extracts the key information, and integrates it into the existing wiki. It updates topic pages, revises summaries, flags where new data contradicts old claims, and strengthens the evolving synthesis.

The wiki is a persistent, compounding artifact. The cross-references are already there. The contradictions have already been flagged. The synthesis already reflects everything you have read. It gets richer with every source you add and every question you ask.

You never write the wiki yourself. The AI writes and maintains all of it. Your job is sourcing, exploration, and asking the right questions. The AI does the summarizing, cross-referencing, filing, and bookkeeping that makes a knowledge base actually useful over time.

WHAT YOU NEED

Obsidian: Download it from obsidian.md. It is free. It is a markdown editor that gives you a beautiful way to browse your wiki with graph views, links, and search.

Claude Code: Download it from claude.com/product/claude-code. This is the AI agent that reads your files, builds the wiki, and maintains everything.

That is it. Two tools.

STEP 1: CREATE YOUR VAULT

Open Obsidian and create a new vault. Name it whatever you want. This is the folder where everything lives.

Inside the vault, create these folders:

raw-sources/ is your junk drawer. Articles, notes, screenshots, meeting transcripts, bookmarks, research, book notes, podcast takeaways. Everything goes here. Do not organize it. That is the AI's job. These files are immutable. The AI reads from them but never modifies them. This is your source of truth.

wiki/ is where the AI writes the organized version. Summaries, concept pages, entity pages, comparisons, an overview, a synthesis. The AI owns this folder entirely. It creates pages, updates them when new sources arrive, maintains cross-references, and keeps everything consistent. You read it. The AI writes it. You never edit this by hand.

Inside wiki/ there are two special files:

index.md is a catalog of everything in the wiki. Each page listed with a link and a one-line summary, organized by category. The AI updates this on every ingest. When answering a question, the AI reads the index first to find relevant pages, then drills into them. This works surprisingly well even with hundreds of pages and avoids the need for any embedding or RAG infrastructure.

log.md is a chronological record of what happened and when. Ingests, queries, health checks. An append-only timeline of the wiki's evolution that helps the AI understand what has been done recently.

STEP 2: ADD THE SCHEMA FILE

This is the most important step. Create a file in the root of your vault called CLAUDE.md (if you are using Claude Code) or AGENTS.md (if you are using OpenAI Codex). This is your schema file. It tells the AI how the wiki is structured, what the conventions are, and what workflows to follow.

This is the key configuration file. It is what makes the AI a disciplined wiki maintainer rather than a generic chatbot. You and the AI co-evolve this over time as you figure out what works for your domain.

Here is Karpathy's prompt to paste into your schema file. It is split into two parts. Copy both and combine them:

# LLM Wiki

A pattern for building personal knowledge bases using LLMs.

This is an idea file, it is designed to be copy pasted to your own LLM Agent (e.g. OpenAI Codex, Claude Code, OpenCode / Pi, or etc.). Its goal is to communicate the high level idea, but your agent will build out the specifics in collaboration with you.

## The core idea

Most people's experience with LLMs and documents looks like RAG: you upload a collection of files, the LLM retrieves relevant chunks at query time, and generates an answer. This works, but the LLM is rediscovering knowledge from scratch on every question. There's no accumulation. Ask a subtle question that requires synthesizing five documents, and the LLM has to find and piece together the relevant fragments every time. Nothing is built up. NotebookLM, ChatGPT file uploads, and most RAG systems work this way.

The idea here is different. Instead of just retrieving from raw documents at query time, the LLM **incrementally builds and maintains a persistent wiki** — a structured, interlinked collection of markdown files that sits between you and the raw sources. When you add a new source, the LLM doesn't just index it for later retrieval. It reads it, extracts the key information, and integrates it into the existing wiki — updating entity pages, revising topic summaries, noting where new data contradicts old claims, strengthening or challenging the evolving synthesis. The knowledge is compiled once and then *kept current*, not re-derived on every query.

This is the key difference: **the wiki is a persistent, compounding artifact.** The cross-references are already there. The contradictions have already been flagged. The synthesis already reflects everything you've read. The wiki keeps getting richer with every source you add and every question you ask.

You never (or rarely) write the wiki yourself — the LLM writes and maintains all of it. You're in charge of sourcing, exploration, and asking the right questions. The LLM does all the grunt work — the summarizing, cross-referencing, filing, and bookkeeping that makes a knowledge base actually useful over time. In practice, I have the LLM agent open on one side and Obsidian open on the other. The LLM makes edits based on our conversation, and I browse the results in real time — following links, checking the graph view, reading the updated pages. Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase.

This can apply to a lot of different contexts. A few examples:

- **Personal**: tracking your own goals, health, psychology, self-improvement — filing journal entries, articles, podcast notes, and building up a structured picture of yourself over time.

- **Research**: going deep on a topic over weeks or months — reading papers, articles, reports, and incrementally building a comprehensive wiki with an evolving thesis.

- **Reading a book**: filing each chapter as you go, building out pages for characters, themes, plot threads, and how they connect. By the end you have a rich companion wiki. Think of fan wikis like [Tolkien Gateway](https://tolkiengateway.net/wiki/Main_Page) — thousands of interlinked pages covering characters, places, events, languages, built by a community of volunteers over years. You could build something like that personally as you read, with the LLM doing all the cross-referencing and maintenance.

- **Business/team**: an internal wiki maintained by LLMs, fed by Slack threads, meeting transcripts, project documents, customer calls. Possibly with humans in the loop reviewing updates. The wiki stays current because the LLM does the maintenance that no one on the team wants to do.

- **Competitive analysis, due diligence, trip planning, course notes, hobby deep-dives** — anything where you're accumulating knowledge over time and want it organized rather than scattered.

## Architecture

There are three layers:

**Raw sources** — your curated collection of source documents. Articles, papers, images, data files. These are immutable — the LLM reads from them but never modifies them. This is your source of truth.

**The wiki** — a directory of LLM-generated markdown files. Summaries, entity pages, concept pages, comparisons, an overview, a synthesis. The LLM owns this layer entirely. It creates pages, updates them when new sources arrive, maintains cross-references, and keeps everything consistent. You read it; the LLM writes it.

**The schema** — a document (e.g. CLAUDE.md for Claude Code or AGENTS.md for Codex) that tells the LLM how the wiki is structured, what the conventions are, and what workflows to follow when ingesting sources, answering questions, or maintaining the wiki. This is the key configuration file — it's what makes the LLM a disciplined wiki maintainer rather than a generic chatbot. You and the LLM co-evolve this over time as you figure out what works for your domain.

## Operations

**Ingest.** You drop a new source into the raw collection and tell the LLM to process it. An example flow: the LLM reads the source, discusses key takeaways with you, writes a summary page in the wiki, updates the index, updates relevant entity and concept pages across the wiki, and appends an entry to the log. A single source might touch 10-15 wiki pages. Personally I prefer to ingest sources one at a time and stay involved — I read the summaries, check the updates, and guide the LLM on what to emphasize. But you could also batch-ingest many sources at once with less supervision. It's up to you to develop the workflow that fits your style and document it in the schema for future sessions.

**Query.** You ask questions against the wiki. The LLM searches for relevant pages, reads them, and synthesizes an answer with citations. Answers can take different forms depending on the question — a markdown page, a comparison table, a slide deck (Marp), a chart (matplotlib), a canvas. The important insight: **good answers can be filed back into the wiki as new pages.** A comparison you asked for, an analysis, a connection you discovered — these are valuable and shouldn't disappear into chat history. This way your explorations compound in the knowledge base just like ingested sources do.

**Lint.** Periodically, ask the LLM to health-check the wiki. Look for: contradictions between pages, stale claims that newer sources have superseded, orphan pages with no inbound links, important concepts mentioned but lacking their own page, missing cross-references, data gaps that could be filled with a web search. The LLM is good at suggesting new questions to investigate and new sources to look for. This keeps the wiki healthy as it grows.

And then this is the second one

## Indexing and logging

Two special files help the LLM (and you) navigate the wiki as it grows. They serve different purposes:

**index.md** is content-oriented. It's a catalog of everything in the wiki — each page listed with a link, a one-line summary, and optionally metadata like date or source count. Organized by category (entities, concepts, sources, etc.). The LLM updates it on every ingest. When answering a query, the LLM reads the index first to find relevant pages, then drills into them. This works surprisingly well at moderate scale (~100 sources, ~hundreds of pages) and avoids the need for embedding-based RAG infrastructure.

**log.md** is chronological. It's an append-only record of what happened and when — ingests, queries, lint passes. A useful tip: if each entry starts with a consistent prefix (e.g. `## [2026-04-02] ingest | Article Title`), the log becomes parseable with simple unix tools — `grep "^## \[" log.md | tail -5` gives you the last 5 entries. The log gives you a timeline of the wiki's evolution and helps the LLM understand what's been done recently.

## Optional: CLI tools

At some point you may want to build small tools that help the LLM operate on the wiki more efficiently. A search engine over the wiki pages is the most obvious one — at small scale the index file is enough, but as the wiki grows you want proper search. [qmd](https://github.com/tobi/qmd) is a good option: it's a local search engine for markdown files with hybrid BM25/vector search and LLM re-ranking, all on-device. It has both a CLI (so the LLM can shell out to it) and an MCP server (so the LLM can use it as a native tool). You could also build something simpler yourself — the LLM can help you vibe-code a naive search script as the need arises.

## Tips and tricks

- **Obsidian Web Clipper** is a browser extension that converts web articles to markdown. Very useful for quickly getting sources into your raw collection.

- **Download images locally.** In Obsidian Settings → Files and links, set "Attachment folder path" to a fixed directory (e.g. `raw/assets/`). Then in Settings → Hotkeys, search for "Download" to find "Download attachments for current file" and bind it to a hotkey (e.g. Ctrl+Shift+D). After clipping an article, hit the hotkey and all images get downloaded to local disk. This is optional but useful — it lets the LLM view and reference images directly instead of relying on URLs that may break. Note that LLMs can't natively read markdown with inline images in one pass — the workaround is to have the LLM read the text first, then view some or all of the referenced images separately to gain additional context. It's a bit clunky but works well enough.

- **Obsidian's graph view** is the best way to see the shape of your wiki — what's connected to what, which pages are hubs, which are orphans.

- **Marp** is a markdown-based slide deck format. Obsidian has a plugin for it. Useful for generating presentations directly from wiki content.

- **Dataview** is an Obsidian plugin that runs queries over page frontmatter. If your LLM adds YAML frontmatter to wiki pages (tags, dates, source counts), Dataview can generate dynamic tables and lists.

- The wiki is just a git repo of markdown files. You get version history, branching, and collaboration for free.

## Why this works

The tedious part of maintaining a knowledge base is not the reading or the thinking — it's the bookkeeping. Updating cross-references, keeping summaries current, noting when new data contradicts old claims, maintaining consistency across dozens of pages. Humans abandon wikis because the maintenance burden grows faster than the value. LLMs don't get bored, don't forget to update a cross-reference, and can touch 15 files in one pass. The wiki stays maintained because the cost of maintenance is near zero.

The human's job is to curate sources, direct the analysis, ask good questions, and think about what it all means. The LLM's job is everything else.

The idea is related in spirit to Vannevar Bush's Memex (1945) — a personal, curated knowledge store with associative trails between documents. Bush's vision was closer to this than to what the web became: private, actively curated, with the connections between documents as valuable as the documents themselves. The part he couldn't solve was who does the maintenance. The LLM handles that.

## Note

This document is intentionally abstract. It describes the idea, not a specific implementation. The exact directory structure, the schema conventions, the page formats, the tooling — all of that will depend on your domain, your preferences, and your LLM of choice. Everything mentioned above is optional and modular — pick what's useful, ignore what isn't. For example: your sources might be text-only, so you don't need image handling at all. Your wiki might be small enough that the index file is all you need, no search engine required. You might not care about slide decks and just want markdown pages. You might want a completely different set of output formats. The right way to use this is to share it with your LLM agent and work together to instantiate a version that fits your needs. The document's only job is to communicate the pattern. Your LLM can figure out the rest.

STEP 3: FILL YOUR RAW SOURCES

This is where people stall. They create the folders and stare at an empty directory. Do not do that. Dump everything you already have:

Articles you saved and never re-read. Book highlights from Kindle. Podcast notes. Meeting transcripts. Project docs. Research you did before a big decision. Old project notes. Lessons from things that went wrong. YouTube rabbit hole notes. Screenshots of things you wanted to remember.

Copy-paste articles into .md or .txt files. Export notes from whatever app you use. Do not rename anything. Do not clean it up. Just get it all into raw-sources/.

No existing material? Open a Claude chat and talk for 20 minutes about your work, your goals, what you are building, what you are figuring out. Save that conversation as a Memory.md file and drop it in raw-sources/. That is enough to make your first session feel like Claude actually knows you. The vault does not need to be complete to be useful. It just needs to be real.

STEP 4: TELL CLAUDE TO BUILD THE WIKI

Open Claude Code, point it at your vault folder, and run this:

claude -p "Read everything in /raw-sources/. Compile a wiki in /wiki/ following the rules in CLAUDE.md. Create an index.md first, then one .md file per major topic. Link related topics using [[topic-name]] format. Summarize every source. Log everything to log.md." --allowedTools Bash,Write,Read

Then walk away. Let it work.

When it is done, you will have a wiki folder full of organized articles with connections you did not see, summaries of things you forgot you saved, and an index that makes everything searchable in seconds.

Open Obsidian on one side and Claude Code on the other. The AI makes edits and you browse the results in real time, following links, checking the graph view, reading the updated pages. Obsidian is the IDE. The AI is the programmer. The wiki is the codebase.

STEP 5: USE IT EVERY DAY

This is where the system becomes valuable. There are three operations you will use regularly.

INGEST NEW SOURCES

Clip an article with Obsidian's Web Clipper browser extension. It lands in raw-sources/. Tell Claude:

claude -p "I just added an article to /raw-sources/. Read it, extract the key ideas, write a summary page to /wiki/, update index.md with a link and one-line description, and update any existing concept pages that this article connects to. Log what you changed to log.md. Show me every file you touched." --allowedTools Bash,Write,Read

One article can touch 10 to 15 wiki pages. Claude surfaces unexpected connections, flags contradictions with existing knowledge, and logs exactly what changed.

ASK YOUR WIKI QUESTIONS

Once the wiki has 10 or more articles, start asking questions:

"Based on everything in wiki/, what are the three biggest gaps in my understanding of [topic]?"

"Compare what source A says about [concept] vs source B. Where do they disagree?"

"Write me a 500-word briefing on [topic] using only what is in this knowledge base."

Claude scans the index, pulls the right pages, and gives you answers with citations. The important part: save good answers back into the wiki as new pages. A comparison you asked for, an analysis, a connection you discovered. These should not disappear into chat history. Every question makes the next answer better. That is the compounding loop.

RUN A HEALTH CHECK

Once a week, run this:

claude -p "Read every file in /wiki/. Find: contradictions between pages, orphan pages with no inbound links, concepts mentioned repeatedly but with no dedicated page, and claims that seem outdated based on newer files in /raw-sources/. Write a health report to /wiki/lint-report.md with specific fixes." --allowedTools Bash,Write,Read

This catches errors before they compound. If the AI writes something slightly wrong and you save it back, the next answer builds on that mistake. The health check is your quality control.

STEP 6: SET UP AUTOMATIONS (OPTIONAL BUT POWERFUL)

MORNING BRIEFING

Set this up once and it runs every morning without you touching anything:

claude -p "Write a Python script called morning_digest.py that: 1) reads Memory.md and surfaces any open actions due today 2) reads any new files added to /raw-sources/ in the last 24 hours 3) prints a clean briefing to the terminal. Then schedule it as a cron job every morning at 7:30am." --allowedTools Bash,Write

Every morning you open your laptop to a summary of what needs your attention and what new knowledge has been added. You set it up once. It never stops working.

PROCESS A CALL TRANSCRIPT

After any meeting or client call:

claude -p "Read the transcript in /raw-sources/call-today.md. Extract every decision made, every action item with owner and deadline, and a 3-bullet summary. Add actions to /wiki/action-tracker.md, log decisions to /wiki/decision-log.md, and create a topic page linking back to this transcript." --allowedTools Bash,Write,Read

Every decision filed, every action tracked, nothing lost to chat history ever again.

WHAT YOU CAN BUILD WITH THIS

Personal knowledge base: tracking your goals, health, self-improvement. Filing journal entries, articles, podcast notes, and building a structured picture of yourself over time.

Research wiki: going deep on a topic over weeks or months. Reading papers, articles, reports, and incrementally building a comprehensive wiki with an evolving thesis.

Book companion wiki: filing each chapter as you go, building out pages for characters, themes, plot threads, and how they connect. By the end you have a rich companion wiki that makes re-reading unnecessary.

Business wiki: an internal wiki fed by Slack threads, meeting transcripts, project documents, customer calls. The wiki stays current because the AI does the maintenance that nobody on the team wants to do.

Competitive analysis vault: monitoring competitor pricing, features, hiring, and positioning. Every new data point gets integrated into the existing picture automatically.

Client knowledge vault: everything you know about each client in one searchable system that updates itself.

Course notes: building a comprehensive study wiki as you take a course, with the AI cross-referencing concepts across lectures.

TIPS AND TRICKS

Install the Obsidian Web Clipper browser extension. It converts any web article to markdown with one click. This is the fastest way to get sources into your raw collection.

Use Obsidian's graph view. It is the best way to see the shape of your wiki. What is connected to what, which pages are hubs, which are orphans.

Install the Dataview plugin. If the AI adds tags and dates to wiki pages, Dataview can generate dynamic tables and lists automatically.

Put your vault in a git repo. The wiki is just markdown files. You get version history, branching, and collaboration for free.

You do not need Obsidian to make this work. A folder of markdown files and a good schema file will outperform a fancy tool stack 90% of the time. Obsidian is just a nice window to look through. The real system is the folders, the schema, and the AI.

---
title: Second Brain
client: Independent
domain: AI · Knowledge · Infrastructure
year: "2026"
status: selected
role: Architect
summary: An LLM-maintained Obsidian knowledge system. Three layers (raw sources, synthesised wiki, context schema) designed to get more useful as it grows, not more unwieldy. This portfolio pulls content from it directly.
stack:
  - Obsidian
  - Claude API
  - GitHub
  - Next.js ISR
---

## Premise

The problem with most note-taking systems is they optimise for input and neglect retrieval. A second brain should do the opposite. Accept anything, make everything findable. The ideal is a system that thinks with you, not just stores information.

Most knowledge work today is fragmented across chats, articles, PDFs, screenshots, bookmarks, browser tabs, scattered notes, and temporary memory. Valuable ideas disappear into disconnected systems before they can compound into anything meaningful. Traditional note-taking tools solve storage, but not synthesis.

The goal was not simply to create a note vault, but to build a second cognitive layer: a living intelligence system capable of continuously ingesting information, organizing itself autonomously, identifying relationships between ideas, and evolving alongside its user over time.

The project began with a simple migration idea from Notion into Obsidian, but gradually evolved into a fully AI-assisted second brain architecture powered by autonomous agents, persistent memory systems, and markdown-native knowledge graphs.

## Approach

A three-layer architecture inspired by Andrej Karpathy's writing on knowledge systems. Layer one is raw sources, immutable, never edited after capture. Layer two is a wiki of synthesised entries, written and maintained by LLMs from the raw sources. Layer three is a context document (CLAUDE.md) that gives any LLM instant orientation when it enters the system.

Raw information enters through a `/raw-sources/` ingestion layer. This includes exported conversations, research papers, financial analyses, coding documentation, screenshots, articles, transcripts, market theses, automation logs, and personal reflections. The emphasis is intentionally on frictionless capture rather than immediate organisation.

Claude Code then processes these raw sources autonomously using structured instructions defined inside a `CLAUDE.md` ruleset. The AI synthesises information into interconnected markdown pages stored inside a `/wiki/` layer. Each topic becomes its own node within the knowledge graph, with aggressive backlinking using Obsidian's `[[wiki-links]]` structure.

The core orchestration workflow was designed around recursive vault synthesis:

```
claude -p "Read everything in /raw-sources/. Compile a wiki in /wiki/ following the rules
in CLAUDE.md. Create an index.md first, then one .md file per major topic. Link related
topics using [[topic-name]] format. Summarize every source. Log everything to log.md."
--allowedTools Bash,Write,Read
```

## Outcome

A working knowledge system, used daily, synced to GitHub, and connected to this portfolio. The most durable outcome is not the system itself. It's the discipline it enforces. Everything worth knowing goes through one place.

Rather than behaving like a conventional summariser, the AI operates as a knowledge architect. Concepts appearing repeatedly across projects gain structural importance over time, allowing the vault to gradually identify recurring intellectual themes automatically.

The system eventually expanded beyond static knowledge management into persistent autonomous memory. OpenClaw agents integrated directly into the vault architecture through Telegram interfaces and VPS-hosted workflows. Conversations, tasks, project discussions, and research sessions became long-term memory inputs into the knowledge graph.

A multi-layer memory hierarchy emerged in practice:

- Short-term conversational memory
- Medium-term project memory
- Long-term evergreen knowledge storage

Cron jobs and heartbeat processes maintain system continuity: consolidating fragmented notes, monitoring unresolved tasks, restarting failed sessions, summarising daily activity, and refining the vault structure without manual intervention.

The architecture also revealed broader commercial applications. The same framework can be adapted for founders, researchers, consultants, and operational teams overwhelmed by fragmented institutional knowledge. The long-term direction is a persistent AI-assisted operating layer capable of organising, synthesising, and continuously improving how individuals and small teams work with information.

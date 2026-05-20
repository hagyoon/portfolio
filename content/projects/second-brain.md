---
title: Second Brain
client: Independent
domain: AI · Knowledge · Infrastructure
year: "2023"
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

## Approach

A three-layer architecture inspired by Andrej Karpathy's writing on knowledge systems. Layer one is raw sources, immutable, never edited after capture. Layer two is a wiki of synthesised entries, written and maintained by LLMs from the raw sources. Layer three is a context document (CLAUDE.md) that gives any LLM instant orientation when it enters the system.

## Outcome

A working knowledge system, used daily, synced to GitHub, and connected to this portfolio. The most durable outcome isn't the system itself. It's the discipline it enforces. Everything worth knowing goes through one place.

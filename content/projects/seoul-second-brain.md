---
title: Second Brain, Seoul Edition
client: Independent
domain: AI · Knowledge
year: "2024"
status: selected
role: Architect
summary: A locally-hosted personal knowledge system that quietly ingests reading, notes, and conversations — designed less as a chat interface, more as a long-running, well-organised mind on the side.
stack:
  - Obsidian
  - Python
  - Local LLMs
  - Whisper
---

## Premise

The current generation of AI assistants is loud, eager, and bad at silence. A second brain should do the opposite: collect quietly, retrieve when asked, and otherwise stay out of the way.

## Approach

A modest stack — Obsidian as the writing surface, a Python pipeline for daily ingestion, a local model for retrieval, and Whisper for the occasional voice memo. Everything stored as plain markdown. Nothing depends on a vendor that could shut off tomorrow.

## Outcome

A working system, used daily, that has survived two laptop changes without ceremony. Most of the value comes not from clever retrieval, but from the discipline of writing things down in the first place.

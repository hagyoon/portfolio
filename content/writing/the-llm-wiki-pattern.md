---
title: The LLM Wiki Pattern
date: 2026-04-23
tag: AI
excerpt: Most LLM-document systems are RAG. Retrieve, regenerate, repeat. The wiki pattern is different. The LLM maintains a persistent artefact, and knowledge actually compounds.
---

The standard architecture for an LLM-over-documents system is retrieval-augmented generation. You drop sources into a vector store. At query time, the model retrieves chunks, regenerates an answer from scratch, and you read the output. Nothing accumulates between sessions. Every question pays the full cost of reading and synthesis again. The system has no memory of what it has already figured out.

Andrej Karpathy's writing on the LLM wiki pattern proposes the inverse. Instead of regenerating from scratch on every query, the LLM incrementally builds and maintains a persistent artefact. A wiki of entity pages, concept pages, summaries, cross-references. When a new source arrives, the model reads it, synthesises it, and integrates it into the existing structure. Updating relevant pages, flagging contradictions with prior claims, strengthening the synthesis. Knowledge compounds across sessions.

I've been running this pattern in my own second brain for over a year. The setup is unglamorous, and that's the point.

## The three layers

The architecture sits on three strict layers. The first is raw sources. Articles, papers, clippings, books, conversation transcripts, all kept immutable. They're the ground truth. Edits aren't allowed at this layer. The source stays exactly as it arrived.

The second layer is the wiki itself. LLM-written markdown. Entity pages on people, concept pages on ideas, project pages on builds, thesis pages on positions I hold. The wiki gets generated and maintained by the model from the raw sources. It's allowed to be edited, contradicted, and revised. A single new source typically touches five to fifteen wiki pages on ingest.

The third layer is the schema. A `CLAUDE.md` file that gives any LLM instant orientation when it enters the system. Conventions, workflows, how to ingest, how to query, how to lint. The schema co-evolves with the wiki as the system matures.

## The operations

Three operations keep the system alive. *Ingest*. A new source gets read, key takeaways discussed with a human, a summary page written, the index updated, related entity and concept pages touched, a log entry appended. *Query*. Questions get asked against the wiki. The model reads the index first, drills into relevant pages, synthesises with citations, and (critically) files good answers back as new pages, so explorations compound just like sources. *Lint*. A periodic health check for contradictions, stale claims, orphan pages, missing cross-references, and concepts that get mentioned often enough that they deserve their own page.

The thing humans do well (source curation, taste, asking good questions) is preserved. The thing humans do badly (bookkeeping, cross-referencing, maintenance) is delegated.

## Why it works

Karpathy's framing is sharper than mine. *The tedious part of maintaining a knowledge base isn't the reading or the thinking. It's the bookkeeping. Humans abandon wikis because the maintenance burden grows faster than the value. LLMs don't get bored.*

The spiritual ancestor is Vannevar Bush's Memex from 1945. A personal, curated knowledge store with associative trails, where connections matter as much as documents. Bush's vision was right. What he couldn't solve was the maintenance problem. The maintenance problem is what large language models are unusually good at.

## What I've learned running it

Three observations that have surprised me. First, the system gets more useful the longer it runs, not less. Most knowledge systems degrade as cruft accumulates. This one improves, because the maintenance burden has been delegated, and the LLM treats every ingest as an opportunity to strengthen the structure rather than fragment it further.

Second, the wiki layer is genuinely better than the underlying sources at answering questions. The sources are noisy. The wiki is the noise-removed view. Asking the wiki "what is my position on uranium" returns a synthesised answer that draws on six different sources and flags the one place where my own claims contradict each other. No single source could do that.

Third, the discipline of the system reshapes what I read. I read less. I read more carefully. The mental cost of capturing-and-filing is now low enough that I'm more willing to engage seriously with sources I would previously have skimmed.

The portfolio you're reading this on pulls content directly from the wiki via GitHub. The system is downstream of itself. Everything I learn ends up in one place, and the place gets smarter the more I put into it.

That's the entire pitch.

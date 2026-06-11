---
title: "Claude Code & AI Agent Tools"
topic: "AI & Technology"
summary: "Covers: AI agent memory file ecosystem (CLAUDE.md, AGENTS.md, auto-memory), Karpathy's LLM coding guidelines, best practices for AI-assisted development. See second-brain for the wiki methodology this system is built on"
---

# Claude Code & AI Agent Tools

> Covers: AI agent memory file ecosystem (CLAUDE.md, AGENTS.md, auto-memory), Karpathy's LLM coding guidelines, best practices for AI-assisted development. See [[second-brain]] for the wiki methodology this system is built on.

---

## The Memory File Ecosystem

**Source:** `Clippings/The Complete Guide to AI Agent Memory Files.md` (Paolo Perrone, Feb 2026)

### The Problem

Every AI coding tool wants its own instruction file:
- Claude Code → `CLAUDE.md`
- Cursor → `.cursorrules` / `.cursor/rules/*.mdc`
- GitHub Copilot → `.github/copilot-instructions.md`
- Windsurf → `.windsurfrules`
- Google Jules → `JULES.md`

Same content copied into 5 files. **AGENTS.md** was created to solve this fragmentation.

---

### CLAUDE.md — The Original

Loaded at the start of every Claude Code session. Think of it as a briefing document for an amnesiac new team member.

**Hierarchy (loads bottom-up; more specific overrides broader):**
- Enterprise-level (global user settings)
- Personal preferences (`~/.claude/`)
- Project-level (project root)
- Subdirectory-level (closest to file being edited)

**What actually belongs in it (keep under 300 lines):**
1. **Project context** — One line: "Next.js e-commerce app with Stripe integration."
2. **Code style** — Specific: "ES modules, named exports, 2-space indentation."
3. **Commands** — Exact strings: `pnpm test:integration`, `make build-docker`.
4. **Architecture decisions** — "API routes go in `/src/api/[resource]/route.ts`. Repository pattern for DB access."

**The @imports system:**
```
See @README.md for project overview
See @docs/api-patterns.md for API conventions
```
Supports recursive imports up to 5 levels. Keeps CLAUDE.md lean; moves detail into docs/.

**Limitation:** Claude-only. Teams using Cursor or Copilot won't read it.

---

### AGENTS.md — The Universal Standard

Emerged mid-2025 from a collaboration between Sourcegraph, OpenAI, Google, Cursor, and others. Maintained under the Linux Foundation by the Agentic AI Foundation. Now supported by Claude Code, Cursor, GitHub Copilot, Gemini CLI, Windsurf, Aider, Zed, Warp, RooCode.

**How it works:** Standard markdown, no special schema. Closest `AGENTS.md` to the file takes precedence. Explicit user prompts override everything.

**Recommendation:** If using multiple AI tools → put shared instructions in `AGENTS.md` + keep `CLAUDE.md` for Claude-specific features (@imports, /init workflow). If Claude-only → `CLAUDE.md` alone is fine.

**Symlink hack for multi-tool consistency:**
```bash
ln -sfn AGENTS.md .github/copilot-instructions.md
mkdir -p .cursor/rules && ln -sfn ../../AGENTS.md .cursor/rules/main.mdc
```

---

### CLAUDE.local.md

Personal, project-specific preferences not committed to git. Auto-added to `.gitignore`. For sandbox URLs, preferred test data, personal workflow quirks. Teammates don't see it.

---

### Claude's Auto-Memory System

Claude Code writes notes to itself during sessions. Lives at `~/.claude/projects/<project>/memory/`:
```
memory/
├── MEMORY.md          # Index — loaded every session (first 200 lines)
├── debugging.md       # Notes on debugging patterns
├── api-conventions.md # API design decisions
└── ...
```

**The key difference:** You write CLAUDE.md (instructions). Claude writes MEMORY.md (learnings).

- Only first 200 lines of MEMORY.md load automatically
- Topic files load on-demand
- Review with `/memory` during any session

**Practical workflow:**
- Claude discovers something → saves to auto-memory → knows it next session
- End of productive session: "Update your memory files with what you learned today"
- Review monthly — quality varies since Claude writes them

---

### The /init Workflow

1. Run `/init` in project directory
2. Claude generates starter `CLAUDE.md` based on project structure
3. **Delete most of what it generates** — obvious things (yes, this is TypeScript) waste context
4. Build organically: when Claude makes wrong assumption, correct it and say "add to CLAUDE.md"
5. Every few weeks: ask Claude to review and optimize CLAUDE.md

---

## Karpathy's LLM Coding Guidelines

**Source:** `raw-sources/AI Projects/A single CLAUDE.md file to improve Claude Code behavior...md` (forrestchang/andrej-karpathy-skills)

Derived from Andrej Karpathy's observations on LLM coding pitfalls:

> "The models make wrong assumptions on your behalf and just run along with them without checking. They don't manage their confusion, don't seek clarifications, don't surface inconsistencies."
>
> "They really like to overcomplicate code and APIs, bloat abstractions... implement a bloated construction over 1000 lines when 100 would do."

### Four Principles

**1. Think Before Coding**

Don't assume. Don't hide confusion. Surface tradeoffs.
- State assumptions explicitly — ask rather than guess
- Present multiple interpretations — don't pick silently when ambiguous
- Push back when a simpler approach exists
- Stop when confused — name what's unclear

**2. Simplicity First**

Minimum code that solves the problem. Nothing speculative.
- No features beyond what was asked
- No abstractions for single-use code
- No "flexibility" that wasn't requested
- No error handling for impossible scenarios
- If 200 lines could be 50, rewrite it

*Test:* Would a senior engineer say this is overcomplicated? If yes, simplify.

**3. Surgical Changes**

Touch only what you must. Clean up only your own mess.
- Don't "improve" adjacent code, comments, or formatting
- Don't refactor things that aren't broken
- Match existing style
- If you notice unrelated dead code → mention it, don't delete it

*Test:* Every changed line should trace directly to the user's request.

**4. Goal-Driven Execution**

Define success criteria. Loop until verified.

| Instead of... | Transform to... |
|--------------|-----------------|
| "Add validation" | "Write tests for invalid inputs, then make them pass" |
| "Fix the bug" | "Write a test that reproduces it, then make it pass" |
| "Refactor X" | "Ensure tests pass before and after" |

*Karpathy's key insight:* "LLMs are exceptionally good at looping until they meet specific goals. Don't tell it what to do, give it success criteria and watch it go."

**When it's working:**
- Fewer unnecessary changes in diffs
- Fewer rewrites due to overcomplication
- Clarifying questions come before implementation
- Clean, minimal PRs

---

## How This Wiki Uses These Systems

This vault uses Claude Code's auto-memory system at `~/.claude/projects/-Users-ryu/memory/`:
- `MEMORY.md` — index of memories about the user (Hakyun), project context, feedback
- Topic files — specific memories about user preferences, project state

The wiki itself (this `wiki/` directory) is the persistent compounding artifact maintained by Claude — exactly the Karpathy LLM wiki pattern described in [[second-brain]].

**Meta-observation:** The AI Agent Memory Files article describes this exact system we're running. The wiki is built on Karpathy's pattern; the memory files are the session-level state on top of it.

---

## Recommended Setup for Hakyun's Projects

Based on the guide and Hakyun's multi-tool workflow:

```
project-root/
├── AGENTS.md              # Shared: build commands, code standards, test setup
├── CLAUDE.md              # Claude-specific: @imports, workflow notes
├── CLAUDE.local.md        # Personal: sandbox URLs, test data (gitignored)
├── .claude/
│   └── settings.json      # Permissions, hooks
└── docs/
    ├── architecture.md    # @imported by CLAUDE.md
    └── conventions.md     # @imported by CLAUDE.md
```

---

## Third-Party Skills — Futu / Moomoo API

Two official Claude Code skills from Futu enable natural-language programmatic trading directly from the terminal.

| Skill | Command | What it does |
|-------|---------|-------------|
| `futuapi` | `/futuapi` | 25 scripts covering market data, order placement, real-time subscriptions. Quick reference for all 65 Futu API signatures. |
| `install-futu-opend` | `/install-futu-opend` | One-click OpenD download + SDK install; auto-detects macOS / Windows / Linux. |

**Install:** download `opend-skills.zip` from Futu, extract to `~/.claude/skills/`. See [[futu-moomoo-api]] for full setup, market coverage, and usage patterns.

---

## Learning Resources — Claude / AI (Free)

**Source:** `Clippings/Post by @rubenhassid on X.md` (Ruben Hassid, @rubenhassid, 2026-02-20)

A curated free alternative to paid AI courses. Key links from his Substack (ruben.substack.com):

| Topic | Focus |
|-------|-------|
| Claude 101 | Core Claude usage foundations |
| Claude Code | Development workflow with Claude Code CLI |
| Claude Skills | Building and using slash-command skills |
| Claude Cowork | Multi-agent cowork setup |
| Claude in Excel | Spreadsheet automation via Claude |
| Claude as your computer | Computer use / desktop automation |
| No prompt saves you | Prompt engineering limits; system design over prompts |
| Setup AI before prompting | Configuring context before generating |
| 1M followers with AI | Content creation at scale |

**Key insight:** The jump from "using Claude" to "building with Claude" happens at the Skills and Cowork layers — both of which Hakyun's OpenClaw system already implements natively. These resources are useful for onboarding collaborators or accelerating new skill creation.

---

## Related Pages

[[second-brain]] | [[active-projects]] | [[machine-learning]] | [[hakyun-ryu]] | [[futu-moomoo-api]]

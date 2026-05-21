---
title: Company Secretary Bot
client: Independent
domain: AI · Legal · Singapore
year: "2025"
status: selected
role: Architect & Developer
summary: An AI compliance assistant for Singapore company secretarial work. Statutory deadlines, ACRA filings, AGM resolutions. Deployed as an OpenClaw skill.
stack:
  - Claude API
  - OpenClaw
  - Telegram
  - ACRA Open Data
  - Python
---

## Premise

Singapore has some of the most legible and well-documented company law in the world. It also has a surprisingly tedious compliance surface for small companies. Annual returns, AGM resolutions, statutory registers, director particulars, share allotments. All of it has to be filed correctly and on time or there are penalties.

Most founders outsource this to a corporate secretary at $500 to $1,500 per year. The work itself is largely mechanical: knowing what to file, when, and in what format. That is an AI-solvable problem.

## Approach

The bot was built as a skill inside the OpenClaw agent architecture, so it inherits the Telegram interface and the manager-agent routing layer without any additional infrastructure.

The knowledge base was built from ACRA's published regulations, the Companies Act (Cap. 50), and a structured set of filing templates for the most common corporate actions. These were processed into the second-brain vault and then surfaced through a retrieval layer.

The core capabilities:

- Annual return deadlines and AGM notice periods based on company type (private exempt, non-exempt, etc.)
- Director appointment and resignation filing timelines
- Share allotment resolution drafting with standard boilerplate
- Statutory register update checklists
- Plain-language answers to Companies Act questions

The bot does not file anything itself. It surfaces the right information, drafts the right documents, and tells the user exactly what to submit and where. The human remains the agent for anything that touches ACRA's Bizfile portal.

## Outcome

The bot reduced the cognitive overhead of running a Singapore private limited company to a Telegram message. Questions that previously required digging through ACRA's website or emailing a corporate secretary now resolve in under thirty seconds.

The architecture is deliberately narrow. It does not try to replace a lawyer or handle contested situations. It handles the 80 percent of routine compliance work that does not require professional judgment.

A broader version of the same architecture could handle compliance work across multiple jurisdictions. The constraint is not the model, it is the quality of the regulatory knowledge base. Singapore is well-suited for a first deployment because the law is clear, the documentation is public, and the penalty structure is well-defined.

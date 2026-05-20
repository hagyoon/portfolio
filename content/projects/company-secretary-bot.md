---
title: Company Secretary Bot
client: Independent
domain: AI · Legal · Singapore
year: "2025"
status: selected
role: Architect & Builder
summary: An AI compliance assistant for Singapore company secretarial work. Statutory deadlines, ACRA filings, AGM and director resolutions, share transfers. Deployed as an OpenClaw skill on a Berlin VPS.
stack:
  - Claude API
  - Python
  - Telegram
  - Singapore Companies Act
---

## Premise

Singapore's company secretarial requirements are rigorous and unforgiving. Annual returns to ACRA, AGM obligations under the Companies Act, director and shareholder resolutions for any structural change, statutory registers maintained continuously. The work is mostly procedural, the penalties are concrete, and the price of retaining a full-time corporate secretary for a small entity is meaningfully higher than the value extracted. There's an obvious AI shape to the problem.

## Approach

The bot knows the Companies Act and the ACRA filing calendar. It tracks statutory deadlines relative to each entity's incorporation date and financial year end. It generates templated resolutions, minutes, and routine correspondence in the correct legal form. Edge cases and judgement calls get flagged back to the human. Everything procedural gets handled autonomously.

Architecturally, it sits as one of several agents inside the OpenClaw multi-agent system. The manager agent routes incoming requests. The secretarial agent picks up Singapore compliance work and synthesises responses. The system runs on a Contabo VPS via systemd, with Telegram as the primary interface.

## Outcome

Compliance work for one small entity has gone from roughly four hours per quarter down to about twenty minutes of review. The next stage is opening this up as a service for founders and small business owners who currently retain corporate secretaries mostly for the calendar discipline, which is the part the bot does best.

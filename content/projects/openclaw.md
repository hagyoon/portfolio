---
title: OpenClaw
client: Independent
domain: AI · Agents · Systems
year: "2024"
status: selected
role: Architect & Builder
summary: A production multi-agent AI system running on a Berlin VPS. Manager agent coordinates specialist agents through a Telegram interface — different bots as different employees, each owning a domain.
stack:
  - Claude API
  - OpenAI API
  - Python
  - Telegram Bot API
  - Contabo VPS
---

## Premise

A single AI assistant is a tool. A structured team of agents is infrastructure. OpenClaw is the latter — built on the idea that specialisation matters as much in AI systems as it does in organisations.

## Approach

Manager agent receives tasks via Telegram, routes them to specialist agents — research, writing, code, data, market briefing — and synthesises results back to the user. Backends are swappable between Claude and GPT depending on task type. The system runs continuously via systemd, handling tasks asynchronously with zero downtime restarts.

## Outcome

A personal AI infrastructure that runs while I sleep. Most of the value is in the routing logic: knowing which agent to trust for which task, and when to escalate back to the human.

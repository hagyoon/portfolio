---
title: OpenClaw
client: Independent Project
domain: AI · Agents · Systems
year: "2026"
status: selected
role: Architect & Builder
summary: A production multi-agent AI system running on a VPS. A single agent coordinates multiple sub agents through a Telegram interface. Different bots, different employees.
stack:
  - Claude API
  - OpenAI Codex API
  - Python
  - Telegram Bot API
  - Contabo VPS
  - Zo Computer (Experimental Stage)
---

## Premise

A single AI assistant is a tool. A structured team of agents is infrastructure. OpenClaw is the latter, built on the idea that specialisation matters as much in AI systems as it does in any organisation.

## Approach

A manager agent receives tasks via Telegram, routes them to specialist agents for research, writing, code, data, or market briefing, then synthesises results back to the user. Backends are swappable between Claude and GPT depending on the task. The whole thing runs continuously via systemd, handling work asynchronously, restarts cleanly when something falls over.

## Outcome

A personal AI infrastructure that runs while I sleep. Most of the value isn't in any one agent. It's in the routing logic. Knowing which agent to trust for which task, and when to escalate back to the human.

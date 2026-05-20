---
title: Finance OS
client: Independent
domain: Finance · Analytics · Personal
year: "2024"
status: selected
role: Builder & Analyst
summary: A personal financial dashboard built with the rigour of a small company's FP&A function — net worth tracked across asset classes, portfolio benchmarked against relevant indices, cash flow analysed at category level.
stack:
  - Python
  - Supabase
  - Plotly
  - Pandas
  - Futu API
links:
  - label: Futu API integration
    href: https://www.futunn.com/openAPI
---

## Premise

Most personal finance tools optimise for simplicity at the cost of insight. The aggregator apps tell you what you spent on coffee. They do not tell you whether your savings rate is consistent with your stated time horizon, or how your portfolio is performing against the right benchmark, or what your net worth would look like under three reasonable scenarios. Finance OS is built for someone who actually wants to know.

## Approach

A Python pipeline ingests data from brokerage, bank, and CPF accounts via Futu's API, statement parsers, and direct entry where APIs do not exist. Everything lands in a Supabase store with a clean schema. A Plotly dashboard renders the views — net worth curve by asset class, portfolio performance versus benchmarks, cash flow by category with drill-down, and a scenario engine that runs three forward paths for any major decision.

The design philosophy is single-source-of-truth. Every number on the dashboard traces back to a primary record. No estimates, no extrapolations, no plausible-sounding fiction.

## Outcome

Replaced six spreadsheets and three apps with one system. The most valuable feature has turned out to be the scenario engine — being able to model a major purchase, a job change, or a portfolio reallocation against the actual numbers, rather than guess, has changed how I make medium-horizon decisions.

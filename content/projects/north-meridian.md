---
title: North Meridian
client: Confidential, Singapore
domain: Analytics · Strategy
year: "2025"
status: selected
role: Lead Analyst
summary: Designed and built a unified customer-intelligence layer across five disconnected systems for a regional financial services group — replacing twelve weekly reports with a single, slow-read morning brief.
stack:
  - dbt
  - Snowflake
  - Looker
  - Python
---

## Brief

A regional financial services group inherited a tangle of overlapping reports across five business units. Twelve different weekly artefacts, all pulling from the same warehouse, none agreeing. Leadership did not need more dashboards. They needed _one document_ that could be read in fifteen minutes and trusted for the rest of the week.

## Approach

The work was equal parts engineering and editing. A canonical semantic layer in dbt resolved definitional drift between teams. A small set of weekly narrative briefs — automatically generated, then lightly hand-edited — replaced the dashboard noise. The constraint that everything had to fit on three printed pages did more for clarity than any modelling decision.

## Outcome

Twelve reports retired. Three new ones authored. Forecast accuracy across two of the five units improved measurably in the first quarter — not because the models were better, but because the inputs finally agreed.

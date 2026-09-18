---
title: Market Ledger
client: Personal
domain: Markets · Data · Interface
year: "2026"
status: selected
role: Builder
summary: >-
  A personal futures positioning archive across 36 markets, pairing every weekly
  CFTC release with long-run price history and a sortable positioning screener.
stack:
  - Python
  - CFTC Socrata API
  - Yahoo Finance
  - React
  - SVG
links:
  - label: Open Market Ledger
    href: https://hagyoon.zo.space/ftracker
---

## Premise

The CFTC publishes one of the clearest views into futures positioning, but the source reports are dense and fragmented across multiple formats. I wanted one place that made the structure legible without flattening the detail.

## Approach

Market Ledger normalises disaggregated commodity reports, Traders in Financial Futures reports, and legacy reports into one interface. It covers 36 contracts, combines each market with weekly price history, and keeps the charts aligned by date across different reporting calendars.

The data pipeline rebuilds 72 reports from the official CFTC feed. Refreshes are validated and applied atomically, with scheduled retries for delayed releases, so an incomplete pull never replaces a good dataset.

## Outcome

A live research terminal with report history reaching back to 1986, sortable cross-market analytics, long and short report views, and hand-built SVG charts. It also fills gaps in the reference source, including VIX long format and legacy reports for heating oil and gasoline.

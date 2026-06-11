---
title: "Futu / Moomoo API"
topic: "AI & Technology"
summary: "Futu (FUTU HK) and Moomoo (international brand) are the same platform. This page covers the OpenD gateway architecture, API capabilities, and Claude Code Skills integration"
---

# Futu / Moomoo API

> Futu (FUTU HK) and Moomoo (international brand) are the same platform. This page covers the OpenD gateway architecture, API capabilities, and Claude Code Skills integration.
> Sources: `Clippings/Moomoo API Doc v10.5.md`, `Clippings/AI Integration & OpenClaw Futu API Doc v10.5.md` (ingested 2026-05-19)

---

## Architecture

```
Your Strategy (Python / Java / C# / C++ / JavaScript)
        ↓
     API SDK  (Moomoo-encapsulated)
        ↓
     OpenD   (local gateway — runs on your machine or a cloud server)
        ↓
  Moomoo / Futu servers  →  Exchange
```

**OpenD** is the critical piece: it runs locally, handles auth, rate-limiting, and protocol translation. It exposes a TCP interface — language-agnostic. The SDK just wraps that.

---

## Accounts

| Type | Purpose |
|------|---------|
| **moomoo ID** | Login credential for OpenD — unlocks market data |
| **Universal Account — Securities** | Stocks, ETFs, options across HK / US / A-share |
| **Universal Account — Futures** | HK, US CME, Singapore, Japanese futures |
| **Universal Account — Crypto** | Crypto pairs (FUTU HK, moomoo US, moomoo SG) |

Single universal account trades across all markets — no separate accounts per exchange.

---

## Market Coverage (Moomoo users)

| Market | Quote | Trade |
|--------|-------|-------|
| US stocks/ETFs/options | ✓ | ✓ |
| HK stocks/ETFs/warrants | ✓ | ✓ (FUTU HK) |
| A-share (China Connect) | ✓ | ✓ |
| Singapore | ✗ quote | SG futures only (live, moomoo SG) |
| Japan / Australia | ✗ | ✗ |
| Crypto | ✓ | ✓ (select entities) |

**Note for Hakyun:** Singapore stocks/ETFs are not available for quoting via Moomoo API. US and HK are the primary programmatic markets.

---

## Capabilities

### Market Data (Quotation)
- Real-time snapshots (price, volume, bid/ask, capital flows)
- Historical and real-time candlesticks (daily, weekly, minute-level)
- Order book, tick-by-tick trades, intraday time-sharing
- Stock screener: filter by price, market cap, PE, turnover rate
- Sector/plate membership and constituent lists
- Subscription-based real-time push (100–2000 subscription quota)

### Trading
- Place / cancel / modify orders
- Paper trading (SIMULATE mode) — **the default**
- Live trading — requires explicit "real" or "live" instruction + trading password
- Rate limit: 15 orders per 30 seconds
- Fastest order execution: 0.0014s
- No additional API charge beyond normal Moomoo account

---

## Claude Code Skills Integration

Two skills from `opend-skills.zip` (Futu official):

| Skill | Slash command | Scope |
|-------|--------------|-------|
| `futuapi` | `/futuapi` | 25 scripts: 13 market data, 7 trading, 5 real-time push. Quick reference for all 65 API signatures. Futures code generation. |
| `install-futu-opend` | `/install-futu-opend` | Auto-detects OS. Downloads + starts OpenD. Upgrades `futu-api` / `moomoo-api` SDK. |

**Install (one-click):** Paste the install block from `Clippings/AI Integration & OpenClaw Futu API Doc v10.5.md` into any Claude Code session. Installs to `~/.claude/skills/` globally.

**Manual install path (Claude Code):** `~/.claude/skills/`

---

## Usage Patterns (relevant to Hakyun's setups)

| Intent | Natural language trigger |
|--------|--------------------------|
| Check ZS / LRCX / KLAC quote | "Get the latest snapshot for ZS" |
| Pull candlestick history | "Get daily candlesticks for LRCX for the last 3 months" |
| Monitor IBIT (Bitcoin proxy) | "Get market data for IBIT" |
| Paper trade a position entry | "Buy 10 shares of ZS using paper trading" |
| Review account positions | "Show my account positions and funds" |
| Run a stock screen | "Screen for US stocks with PE < 30 and market cap > 10B" |

---

## Practical Constraints

- **Must log in to OpenD manually before using skills** — no automated auth
- Paper trading is the default; say "real" / "live" explicitly for live orders
- Subscription quota: 100–2000 subscriptions. Release unused subscriptions periodically
- API rate limits: 15 orders / 30s
- Singapore equities: not available via Moomoo API (use SG brokerage directly)

---

## Connection to Other Projects

- **[[active-projects#Macro Monitor Bot]]** — Futu API provides the programmatic data feed for the daily BTC/ETH/SOL + equity snapshot
- **[[active-projects#Finance OS]]** — Futu API can push live portfolio positions into the Finance OS dashboard
- **[[trading/weekly-plays]]** — Futu API Skills allow paper-trading the weekly setups directly from Claude Code without leaving the terminal
- **[[portfolio-construction]]** — Paper trading is the correct mode for testing position sizing before committing capital

---

## Related Pages

[[active-projects]] | [[trading/weekly-plays]] | [[financial-markets]] | [[claude-code-tools]] | [[portfolio-construction]]

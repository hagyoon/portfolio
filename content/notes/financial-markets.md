---
title: "Financial Markets"
topic: "Finance & Markets"
summary: "Covers: Options, Gold/Silver ratio, Semiconductors, SORA, Compounding critique, Debt/Ownership mechanics"
---

# Financial Markets

> Covers: Options, Gold/Silver ratio, Semiconductors, SORA, Compounding critique, Debt/Ownership mechanics. See also [[cybersecurity-thesis]] for equity thesis and [[economics-and-scarcity]] for structural theory.

---

## Options Trading

**Source:** `raw-sources/Life and Finances/Options.md`

### Definitions

| Term | Meaning |
|------|---------|
| **Call** | Right to buy at strike price |
| **Put** | Right to sell at strike price |
| **Premium** | Price paid for the option |
| **Strike** | The agreed purchase/sale price |
| **Expiry** | When the contract expires |
| **ITM** | In-the-money (profitable to exercise) |
| **OTM** | Out-of-the-money (not profitable to exercise) |
| **ATM** | At-the-money (strike = current price) |

### Option Value Components

**Intrinsic value:** `max(0, Current Price - Strike)` for calls; `max(0, Strike - Current Price)` for puts.

**Time value:** Premium - Intrinsic value. Decays toward expiry (theta decay).

### The Greeks

| Greek | Measures | Direction |
|-------|----------|-----------|
| **Delta** | Sensitivity to underlying price | Call: 0→1; Put: -1→0 |
| **Theta** | Time decay (per day) | Always negative for buyers |
| **Vega** | Sensitivity to implied volatility | Positive for buyers |
| **Gamma** | Rate of change of Delta | Highest at ATM |

### P&L Formulas

**Long Call:** `(Current Price - Strike - Premium) × 100` if ITM; `-Premium × 100` if OTM at expiry.

**Long Put:** `(Strike - Current Price - Premium) × 100` if ITM; `-Premium × 100` if OTM at expiry.

**Covered Call:** Own stock + sell call. Income = premium. Cap upside at strike.

**Cash-Secured Put:** Sell put + hold cash = premium income + obligation to buy at strike.

### Key Strategies

| Strategy | Construction | Outlook |
|----------|-------------|---------|
| Long Call | Buy call | Bullish |
| Long Put | Buy put | Bearish |
| Covered Call | Long stock + short call | Neutral/mild bullish |
| Cash-Secured Put | Short put + cash | Neutral/mild bullish |
| Bull Call Spread | Buy lower call + sell higher call | Moderately bullish |
| Bear Put Spread | Buy higher put + sell lower put | Moderately bearish |
| Straddle | Buy call + buy put (same strike/expiry) | High volatility expected |
| Strangle | Buy OTM call + buy OTM put | High volatility, cheaper than straddle |

**Leveraged ETFs:** Hakyun's view — precision instruments, not long-hold vehicles. Daily rebalancing causes volatility decay over time (beta slippage). Best used for short-term directional trades.

---

## Gold & Silver Ratio

**Source:** `raw-sources/Life and Finances/Gold & Silver.md`

### The Indicator

**Gold-silver ratio** = Gold price ÷ Silver price (in oz).

As of June 4, 2025: Gold $3,346/oz, Silver $34.39/oz → **ratio ~97x** (historically elevated).

**⚠️ Prices stale (Q1 2026):** Silver flash-crashed from $121 → $79 (-33%) in Jan 2026; Gold hit $5,500+ post-Iran then fell to $4,664 (-11.2%) under Warsh/rising-real-yield pressure. These figures are baseline only. See [[market-intelligence]] for Q1 2026 commodity data.

### Risk Sentiment Signal

| Ratio direction | What it means |
|----------------|---------------|
| Rising ratio | Risk-off; investors fleeing to gold (pure safety) |
| Falling ratio | Risk-on; money rotating from gold → silver (industrial demand rising) |

**Why:** Gold = pure store of value / safe haven. Silver = hybrid (safe haven + industrial metal: solar panels, electronics, EVs). In risk-on environments, industrial demand pulls silver up faster.

### Historical behavior
- 2008 GFC: ratio spiked sharply as gold outperformed
- COVID March 2020: ratio hit ~125x (panic peak)
- Post-COVID recovery: ratio fell as silver ripped on industrial demand

**Current reading (~97x):** Still elevated. Suggests market remains defensive, or silver is lagging a transition.

---

## Semiconductors

**Source:** `raw-sources/Life and Finances/Semiconductors.md`

### What They Are

Silicon-based chips with transistors as the fundamental switching unit. More transistors = more compute per area.

**Performance factors:**
- Transistor size (nm node) — smaller = faster + more efficient
- Architecture (chip design choices)
- Memory bandwidth

**Key players:**

| Company | Role |
|---------|------|
| Nvidia | GPU design (AI inference/training) |
| TSMC | Foundry — manufactures chips for others |
| Intel | Legacy x86 CPU + foundry push |
| Samsung | DRAM + foundry |
| AMD | CPU + GPU |
| Qualcomm | Mobile SoC |
| Broadcom | Networking chips |
| Micron | DRAM + NAND |
| SK Hynix | HBM (High Bandwidth Memory — critical for AI) |
| ASML | EUV lithography machines (monopoly) — geopolitical chokepoint |
| Lam Research / Applied Materials | Semiconductor equipment |

### Nvidia Supply Chain (GB200 Rack)

| Supplier | Role | Approx. share |
|----------|------|---------------|
| TSMC | CoWoS advanced packaging + logic | ~25% |
| Samsung | DRAM modules | ~15% |
| ASE | Assembly and packaging | ~10% |
| SK Hynix | HBM3e memory | ~8% |
| Micron | Memory alternatives | ~8% |
| Navitas | GaN power | — |
| Astera Labs | PCIe retimers | — |
| Foxconn / Inventec | GB200 NVL racks | — |

**Geopolitical note:** ASML controls EUV lithography globally. Export restrictions on ASML tools to China are the key chokepoint in semiconductor supply chain geopolitics. Nvidia has also developed a China-market variant (B40 chip) manufactured via ZJK Industrial, designed to comply with export control thresholds — showing active geopolitical adaptation in real time.

---

## Compounding — Why It Fails for the Middle Class

**Source:** `raw-sources/Life and Finances/Compounding.md`

The conventional wisdom: start early, invest consistently, let compounding do the work.

**Six structural reasons it fails for lower/middle class:**

### 1. Principal Problem
$1,000 × 7% = $70/year. $1,000,000 × 7% = $70,000/year.

Compounding is multiplicative — starting capital is determinative. The middle class starts at a fundamental disadvantage.

### 2. Liquidity Trap
Compounding requires uninterrupted capital. One medical emergency, job loss, or family crisis forces premature liquidation → the chain breaks.

The rich can compound because they have buffers. The middle class cannot because they have none.

### 3. Inflation Erosion
Returns must exceed inflation net of fees and taxes. 7% gross return - 2% inflation - 1% fees - 2% taxes = 2% real return. The headline number is deeply misleading.

### 4. Access to Better Vehicles
Private equity, venture, hedge funds, real estate (at scale) historically outperform public markets. These are inaccessible to small investors.

### 5. Tax Efficiency
Wealth taxes (capital gains, inheritance) compound in reverse. The rich have access to structures (trusts, offshore, stepped-up basis) that minimize this. Middle class does not.

### 6. Time Horizon as Class Privilege
Investing for 30+ years requires stability — stable employment, health, family circumstances. This stability is itself a class privilege.

**Conclusion (Piketty's r > g):**
- r = return on capital (~4-5%)
- g = economic growth (~2%)
- r > g is structural: capital owners grow faster than the economy, concentrating wealth

**Practical implication:** For early-career individuals, invest in earning potential first (skills, network, credentials) before capital. The marginal return on human capital early in life exceeds the marginal return on financial capital.

---

## Debt / Ownership Mechanics

**Source:** `raw-sources/Clippings/Debt & Ownership.md` (Gary's Economics)

### Debt = Money (Symmetry)

Every debt is an asset on someone else's balance sheet. Total net debt in a closed economy = zero. When the government borrows £700B, someone holds £700B in UK government bonds.

**Implication:** "Reducing national debt" means reducing someone's asset. Debt is not destruction — it is redistribution of claims.

### Debt as Ownership

A mortgage is not "your" house — you rent it from the lender.

- Bank holds first claim on the asset
- If prices fall, the borrower bears the loss (negative equity)
- If prices rise, the borrower captures the upside — but the bank captures the stability

**Bondholders vs shareholders analogy:** Debt holders get fixed income, shareholders get residual. The debt buyer is making a lower-risk, lower-upside bet. They didn't make money because they were smart — they made money because money itself was devalued (inflation eroded the debt in real terms while asset prices rose).

### Who Takes Price Risk?

In a mortgage: the borrower takes price risk (gains and losses on equity).
In government bonds: the bondholder takes inflation risk (fixed nominal return eroded by inflation).

**Gary's conclusion:** Rising asset prices are a transfer mechanism — from non-owners (renters, low-income, young) to owners (landowners, capital holders). Compounding inequality is structural, not accidental. See also [[financial-markets#Compounding]] above.

---

## SORA — Singapore Interest Rate Benchmark

**Sources:** `raw-sources/Clippings/Switching To SORA.md` | `Clippings/SORA Rates 1-Month & 3-Month Compounded.md`

**SORA** = Singapore Overnight Rate Average. Volume-weighted **overnight** interbank lending rate published daily by MAS (~9am). Replaced SIBOR (discontinued end-2024).

**Why the switch:**
- Global shift toward transaction-data-based benchmarks (post-LIBOR scandals)
- SORA is based on actual transactions, not bank estimates
- More robust — backward-looking data, less susceptible to market manipulation

### How Compounded SORA Works

Spot SORA is an overnight rate — it fluctuates daily. For mortgages, raw spot SORA is too volatile to use directly. MAS solves this with a **SORA Index:**
- Base date: Jan 3, 2020 = 1.0000000000
- Each day, the index grows by the day's SORA rate (think: compound interest on $1 deposit)
- Compounded SORA for any period = ratio of SORA Index values at start and end dates

**1-month vs 3-month SORA:**

| Period | Volatility | Best for |
|--------|-----------|---------|
| 1-month SORA | Higher | Falling rate environments — captures cuts quickly |
| 3-month SORA | Lower (lagging) | Rising rate environments — smooths out spikes |

A longer compounding period smooths out more of the underlying daily volatility. In periods of rate escalation, prefer 3-month (acts like a temporary fixed rate). In periods of rate decline, prefer 1-month (captures falls quickly).

**Current trend (as of mid-2025):** SORA falling from peak of 3.76%. Signs pointing toward 2% level. Any Fed cuts in H2 2025 would push SORA below 2% — return of low-rate regime in Singapore.

**⚠️ Update (Q1 2026):** Warsh nomination (Jan 30, 2026) established a "QT-for-cuts" framework — hawkish pause, not rate cuts. The H2 2025 cut trajectory did not materialize as expected. Iran war (Feb-March 2026) created a stagflation trap that makes Fed cuts even harder. Convergence toward 2% is delayed; monitor Warsh Senate confirmation and Fed forward guidance. See [[market-intelligence]] for full context.

**Conversion spreads (for legacy SOR mortgages):**
- 1-month SOR → 3-month SORA: +0.96%
- 3-month SOR → 3-month SORA: +1.33%
- 6-month SOR → 3-month SORA: +1.71%

No lock-in fee for converting with existing bank. MSR/TDSR do not need recomputation for same-institution switches.

---

## Dollar Cost Averaging (DCA)

**Source:** `raw-sources/Life and Finances/Dollar cost averaging (DCA).md`

Invest a fixed amount at regular intervals regardless of asset price. Spreads purchases over time to reduce timing risk.

**How it works (example — $100/month):**

| Month | Stock Price | Shares Bought |
|-------|------------|--------------|
| Jan | $100 | 1.00 |
| Feb | $50 | 2.00 |
| Mar | $25 | 4.00 |

Invested $300, own 7 shares. Average cost = $42.86. Price fell 75%; average cost fell 57% — DCA softened the blow.

**Key benefits:**
1. Reduces timing risk (no need to call market tops/bottoms)
2. Lowers average cost over time
3. Forces discipline (routine investing vs. emotional decisions)
4. Works well for volatile assets (equities, crypto)

**Critical caveat:** *"Regardless, the stock you're buying still has to have strong fundamentals and generate real value as a business."* DCA lowers average cost on a losing position — it doesn't rescue a bad investment.

**Limitations:**
- In a steadily rising bull market, lump-sum investing may outperform DCA
- Requires long horizon (years, not weeks) to work
- Discipline is the real challenge — must stay committed through highs AND lows

**Combine with dynamic rebalancing:** Use 5–10% deviation thresholds to rebalance. DCA builds positions; rebalancing keeps risk from skewing over time.

**Tension with the Compounding critique above:** DCA doesn't solve the structural compounding problem (principal still matters, access to better vehicles still matters) — but it is a better *behavioral* approach than market-timing for most retail investors. The compounding critique argues against naive optimism, not against investing consistently.

---

## The Financial System — Institutional Overview

**Source:** `Clippings/FINANCIAL SYSTEM explained in 18 mins.md`

How the major institutions interconnect to create, move, and multiply money:

| Institution | Core Function | Key Feature |
|------------|--------------|-------------|
| **Central Banks** (Fed, BoE, PBoC) | Create money; set interest rates; monetary policy | Quantitative easing (buy bonds = inject money); quantitative tightening (sell bonds = remove money) |
| **Commercial Banks** (JPM, WF, BoA) | Move money from savers to borrowers | Create new money when issuing loans; reserve rate now effectively 0% in major economies |
| **Pension Funds** | Ensure retirees get paid; invest $60T+ globally | Largest single source of capital for PE and VC firms; own landmarks and major assets |
| **Mutual Funds** (Vanguard, Fidelity) | Diversified investment pools for retail investors | Active (stock-picking) vs. passive (index-tracking); passive far cheaper in fees |
| **Hedge Funds** (Bridgewater, Citadel) | Complex strategies for accredited investors | 2-and-20 fee structure; most underperform S&P 500; some extraordinary outliers (Jim Simons) |
| **Investment Banks** (Goldman, Morgan Stanley) | IPOs, M&A, capital raising | Connecting businesses and governments with money at scale |
| **Private Equity** (Blackstone, KKR) | Buy, fix, flip companies using leverage | Leveraged buyout (LBO) — 20% equity, 80% debt dumped on target company |
| **Insurance Companies** (State Farm, Geico) | Spread risk across millions; invest premiums | Quietly one of the biggest investors in global markets |
| **Venture Capital** (Sequoia, a16z) | Bet on startups via power law | ~90% fail; 2–3 cover all losses with 1000x returns (e.g., Peter Thiel's $500K → $1B+ in Facebook) |

**Commercial banks create money:** When a bank issues a loan, it creates new deposits. $10M in reserves → $100M in loans (traditional 10% reserve; now 0% in most major economies). This is why central banks matter so much — they control the multiplier.

**PE's sneaky play:** Buy $100M company with $20M equity + $80M debt. Dump the $80M debt onto the company's books. If it fails → PE only loses $20M. If it succeeds → massive upside. Toys R Us was loaded with $5B debt by KKR/Bain/Vornado — paid $400M/yr in interest until bankruptcy (2017).

---

## Dalio's Big Cycle (Context)

Hakyun positions his market thinking within Dalio's long-term debt cycle framework. Singapore and the US are assessed at approximately Stage 6 (late-cycle / reset phase):

- Debt-to-income ratios at extremes
- Central bank money printing expanding
- Wealth/political/geopolitical conflicts intensifying

**Investment implication:** Diversification across currencies and asset classes; gold as hedge (but see Warsh Complication below — gold fails as a hedge in rising real yield environments); caution on long-duration bonds.

---

## Gold as Safe Haven — Warsh Complication

**⚠️ Contradiction flag:** The Gold & Silver Ratio section treats gold as a reliable safe haven. The Q1 2026 Synapse wraps show gold falling **11%** on the Warsh nomination in January, despite simultaneous geopolitical crisis — because rising real yields override haven demand when a hawkish central bank is the source of volatility.

**Revised mental model:**
- Gold rises during: demand shocks (recession), financial panic, currency debasement, negative real yields
- Gold falls during: rising real yield environment, strong dollar + hawkish central bank, forced selling (margin calls, algorithmic triggers)
- The Warsh Effect = "sound money" doctrine signals positive real yields → gold loses its primary investment thesis

**In March 2026:** Gold fell 11.2% despite the Iran conflict (rising real yields dominated). Bitcoin outperformed Gold (+2–3% vs -11%) as the "inflation hedge." Institutional capital rotated from gold ETFs to Bitcoin ETFs during the crisis. This may represent a structural shift in crisis hedging tools.

See [[market-intelligence]] for full Q1 2026 context.

---

## Related Pages

[[cybersecurity-thesis]] | [[economics-and-scarcity]] | [[hakyun-ryu]] | [[active-projects]] | [[market-intelligence]] | [[energy-commodities]] | [[portfolio-construction]] | [[singapore-finance]] | [[behavioral-finance]]

---
title: "Portfolio Construction & Risk Management"
topic: "Finance & Markets"
summary: "**Gap identified 2026-04-24:** The wiki contains many strong investment theses but no framework for translating them into actual portfolio decisions. This page closes that gap. See financial-markets for individual instruments and behavioral-finance for the psychology layer"
---

# Portfolio Construction & Risk Management

> **Gap identified 2026-04-24:** The wiki contains many strong investment theses but no framework for translating them into actual portfolio decisions. This page closes that gap. See [[financial-markets]] for individual instruments and [[behavioral-finance]] for the psychology layer.

---

## The Gap in Plain Terms

Hakyun can construct an investment thesis well — the cybersecurity paper is evidence. But a thesis answers "what to buy." A portfolio framework answers:

- **How much** to put in each position
- **How much loss** is acceptable before exiting
- **Whether** two positions are actually the same bet in different clothes
- **When** the thesis is broken, not just temporarily wrong

Without this layer, good analysis produces bad outcomes. A correct thesis entered at 20% of portfolio with no exit rule is still a coin flip on whether it adds value.

---

## The Risk Hierarchy (Howard Marks)

Before sizing, understand the three types of risk that matter:

| Risk Type | Definition | Common mistake |
|-----------|-----------|----------------|
| **Permanent loss of capital** | Money that doesn't come back | Treating volatility as risk |
| **Volatility** | Price moving around | Treating it as permanent loss |
| **Shortfall risk** | Not achieving what you need | Ignoring opportunity cost |

> *"Risk is not volatility. Risk is the probability of permanent loss."* — Marks

**For Hakyun specifically:** The most dangerous risk is permanent loss on leveraged positions (options, leveraged ETFs) where time decay or gap-down events eliminate capital. The second most dangerous is shortfall risk — having money in low-returning assets while high-conviction theses play out without you.

---

## The Barbell Approach (Taleb / Dalio)

Referenced in the Synapse market wraps but never explained. Two versions:

### Taleb's Barbell

Split capital between:
- **Safe (85–90%):** Treasury bills, cash equivalents, instruments with near-zero downside
- **Speculative (10–15%):** High-upside asymmetric bets with capped downside (long options, early-stage positions)

Nothing in the middle. The middle — moderate-risk, moderate-return assets — has the worst risk-adjusted return because it provides false security while exposing to permanent loss.

**Why it works:** The safe end funds the speculative end. Maximum loss is ~15%. Maximum gain is uncapped (options can return 10–100x). Convexity is on your side.

**Application to Hakyun's theses:**

| Allocation | Instruments |
|-----------|------------|
| Safe (85%) | Singapore T-bills (currently 3–4% annualized), CPF-SA (2.5–5%), SGS bonds, cash |
| Speculative (15%) | Long-dated calls on CRWD/ZS thesis, URA (uranium ETF), energy sector plays, direct cybersecurity positions |

### Dalio's All Weather

Designed for all four macro environments:

| Environment | Performing assets |
|------------|-------------------|
| Rising growth | Equities, corporate bonds, commodities |
| Falling growth | Treasury bonds, gold |
| Rising inflation | Commodities, gold, TIPS, inflation-linked bonds |
| Falling inflation | Equities, long-duration bonds |

**All Weather allocation (Dalio's classic):**
- 30% Equities
- 40% Long-term bonds
- 15% Intermediate bonds
- 7.5% Gold
- 7.5% Commodities

**Warning:** This was designed for institutional investors. The bond weighting is dangerous in a rising-rate environment (which Warsh's tenure may produce). Also designed before crypto existed as an asset class.

**The Q1 2026 insight:** March 2026 proved that the bond allocation fails in an inflationary war shock — bonds and stocks fell simultaneously. Only energy and commodities provided protection. This is the stagflation scenario that the All Weather portfolio historically underperforms.

---

## Position Sizing: The Kelly Criterion

Kelly calculates the theoretically optimal bet size given your edge.

**Full Kelly formula:**
```
f* = (bp - q) / b

f* = fraction of capital to bet
b  = net odds received (if you bet $1 and win, you get $b back)
p  = probability of winning
q  = probability of losing (1 - p)
```

**Example:** If you believe CRWD has 60% probability of 50% upside and 40% probability of 30% downside:
- b = 1.5 (win $1.50 per $1 at risk)
- p = 0.60
- q = 0.40
- f* = (1.5 × 0.60 - 0.40) / 1.5 = (0.90 - 0.40) / 1.5 = **33%**

**But:** Full Kelly is almost always too aggressive for real portfolios. The standard practice is **Half Kelly** (16.5% in this example) or **Quarter Kelly** (8.25%).

**Why Half Kelly:**
- Full Kelly maximizes long-run geometric growth but produces violent drawdowns
- Half Kelly captures ~75% of the long-run growth with ~50% of the drawdown
- Quarter Kelly is appropriate when probability estimates are uncertain (which they always are)

**Practical rule:** For high-conviction, well-researched theses with asymmetric upside (like ZS with 36% YTD decline + fundamental strength), use Half Kelly. For speculative positions (uranium, hydrogen), use Quarter Kelly or less.

---

## Correlation: Are You Actually Diversified?

The single most common error in portfolio construction: owning five "different" things that are all the same bet.

**Hakyun's current thesis portfolio (implicit):**

| Thesis | Real underlying bet |
|--------|---------------------|
| Cybersecurity (CRWD, PANW, ZS) | AI transition + enterprise IT spending |
| Uranium | Clean energy demand + supply shock |
| Oil/energy | Geopolitical risk premium + inflation |
| Bitcoin | Liquidity / debasement / digital asset adoption |
| Gold | Real yield decline / debasement |

**Correlation analysis:**
- CRWD/PANW/ZS: **High correlation** with each other (same sector, same thesis drivers). These three don't add diversification — they amplify each other. Treat as one position.
- Bitcoin + Gold (2026 context): **Used to be correlated** (both = debasement hedge). In Q1 2026, they **decoupled** — Bitcoin held while gold fell during Warsh shock. The correlation may be breaking down permanently.
- Oil + Bitcoin: **Negative correlation in inflation shock** — oil is the inflation driver; Bitcoin fell on oil spike initially, then recovered. They're different bets.
- Uranium + Oil: **Both energy, but different thesis** — uranium = clean energy demand; oil = geopolitical risk. Partial correlation but not high.

**Rule of thumb:** If two positions would both get destroyed by the same event (e.g., a severe global recession destroys both equity and oil demand), they're correlated. Don't size both at full weight.

---

## Asymmetric Payoff: Why Options Fit the Barbell

The wiki covers options mechanics but not their portfolio function. For thesis-based investing:

**Long calls on high-conviction names** provide:
- **Capped downside:** Premium paid (e.g., 2–5% of portfolio)
- **Uncapped upside:** If thesis plays out faster/harder than expected
- **Time as risk, not capital as risk**

**The ZS case study (April 2026):**
- Stock at -36% YTD
- Fundamentals: AI Security ARR hit FY26 target 3 quarters early; ARR +25% YoY
- A long-dated call (12–18 months out) on a narrative reversal:
  - If thesis correct in 12 months: 200–400% on the option
  - If thesis wrong: lose the premium (2–3% of portfolio)
  - Max loss: small. Max gain: 20–40× the cost.

This is the barbell applied to a specific opportunity.

---

## Exit Rules: When Is the Thesis Broken?

The most important discipline in the wiki. For each thesis:

### Cybersecurity Thesis Exit Criteria

The thesis breaks (not just pauses) if:
1. **ARR growth decelerates below 15% for two consecutive quarters** at CRWD/ZS — this would signal the AI disruption narrative is actually playing out in fundamentals, not just market sentiment
2. **Microsoft achieves genuine share in a security segment** through bundling that results in negative net new ARR at a pure-play (not just lower growth, but actual customer losses to MSFT)
3. **A genuine frontier offensive AI model deploys capabilities** that defenders cannot match — i.e., the "Mythos" scenario actually materializes with a confirmed large-scale breach of a major incumbent's own platform
4. **Multiple compression continues to 15x revenue** or below on ZS/CRWD — this would mean the market is pricing in secular decline, not just sentiment correction

### Uranium Thesis Exit Criteria

1. **New mines brought online significantly faster than expected** — typically requires 5–10 years, but fast-track permitting could change this
2. **Nuclear reactor cancellations accelerate** — if countries reverse nuclear commitments (post-Fukushima 2 scenario)
3. **Kazatomprom reverses production cuts** or geopolitical stabilization restores Niger production

### General Exit Discipline

**The pre-mortem rule:** Before entering any position, write one paragraph: "It is 18 months later and this position has lost 50%. What happened?" This forces you to articulate the bear case before you're emotionally invested.

**The thesis journal:** Every position should have:
```
Entry date:
Entry thesis (2 sentences max):
Price targets:
Specific events that would prove me wrong:
Stop-loss level and what it represents:
Re-evaluation date:
```

---

## Leverage and Time Decay: The Lethal Combination

The wiki notes leveraged ETFs (e.g., 2× or 3× ETFs on semiconductors, energy) as "precision instruments, not long-hold vehicles." The mechanism of why:

**Volatility decay (beta slippage):** A 2× ETF on an index that goes +10%, -10% in two days doesn't return 0%.
- Day 1: $100 × (1 + 2×0.10) = $120
- Day 2: $120 × (1 - 2×0.10) = $120 × 0.80 = $96

The unleveraged index returned 0% ($100 → $110 → $99). The 2× ETF returned -4%. Over months of choppy markets, this decay compounds into significant losses even when the underlying thesis is directionally correct.

**Rule:** Leveraged ETFs → maximum 1–2 week holding periods for tactical trades. Never hold during earnings, Fed meetings, or known binary events.

---

## Practical Framework for Hakyun's Situation

### Stage 1 (Now — NTU Student, Limited Capital)

- **Priority:** Human capital returns > financial capital returns. The marginal return on a new skill or internship experience at 22 far exceeds the marginal return on $5,000 invested.
- **Allocation:** 80% safe (T-bills, CPF, HYSA), 20% learning capital (small positions in high-conviction theses to build decision-making discipline under real conditions)
- **Purpose:** Not to make money. To build the decision journal, test thesis construction, feel the psychology of loss.

### Stage 2 (First Job, $50k–$200k Capital)

- Implement barbell: 75% safe/income-generating + 25% thesis-driven
- CPF OA → CPFIS for REITs or ETFs; SA → let it compound at 4–5%
- First priority position: diversified low-cost global ETF (VWRA or similar)
- Second: One or two high-conviction thesis positions sized at Quarter Kelly

### Stage 3 (CFA Chartered, Asset Management Role)

- Professional-grade portfolio construction with risk budgeting
- Correlation matrices, factor exposure analysis, formal drawdown limits
- More options as hedging tools, not speculative instruments

---

## Key Questions to Answer Before Any Investment

1. **What is my edge?** Information advantage? Time horizon advantage? Structural advantage (Singapore tax treatment)? If I have no edge, I should own an index.
2. **What is the downside scenario?** Specifically, not abstractly.
3. **How much will I regret this loss?** The regret test is better than any model.
4. **Is this a signal or noise?** Is the price move caused by fundamentals or sentiment? (The cybersecurity selloff was sentiment. The SMCI DOJ indictment was fundamentals.)
5. **What would change my mind?** If I can't answer this, I'm not analyzing — I'm rationalizing.

---

## Related Pages

[[financial-markets]] | [[behavioral-finance]] | [[cybersecurity-thesis]] | [[market-intelligence]] | [[energy-commodities]] | [[hakyun-ryu]]

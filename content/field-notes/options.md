---
title: "Options"
topic: "Investing"
summary: "1️⃣ Basics of Options"
---

## **1️⃣ Basics of Options**

|**Term**|**Meaning**|
|---|---|
|**Call Option**|Right to **buy** the underlying asset at strike price before/at expiry|
|**Put Option**|Right to **sell** the underlying asset at strike price before/at expiry|
|**Premium**|Price paid to buy the option|
|**Strike Price (K)**|Price at which the option can be exercised|
|**Expiry**|Last day option is valid|
|**In-the-Money (ITM)**|Call: Stock > Strike; Put: Stock < Strike|
|**Out-of-the-Money (OTM)**|Call: Stock < Strike; Put: Stock > Strike|
|**At-the-Money (ATM)**|Stock ≈ Strike|

---

## **2️⃣ Option Value Components**

|**Component**|**Definition**|
|---|---|
|**Intrinsic Value**|Amount by which option is ITM: Call: Max(0, S-K) Put: Max(0, K-S)|
|**Time Value**|Premium – Intrinsic Value; decreases as expiry approaches|
|**Theta**|Time decay rate: value lost per day|
|**Vega**|Sensitivity to implied volatility|
|**Delta**|Sensitivity to underlying price changes|
|**Gamma**|Rate of change of delta|

> Tip:

---

## **3️⃣ Profit / Loss for Simple Positions**

### **Call Option (Buy)**

- **Profit** = Max(0, S-K) – Premium
- **Loss** = Premium (if expires OTM)

### **Put Option (Buy)**

- **Profit** = Max(0, K-S) – Premium
- **Loss** = Premium

### **Short Calls / Puts**

- Short calls → unlimited loss if stock rises above strike
- Short puts → large loss if stock falls below strike

---

## **4️⃣ Settlement**

|**Type**|**Description**|
|---|---|
|**Exchange-Traded**|Cleared by central clearinghouse (e.g., OCC, SGX Clearing). Guarantees settlement. Can be physical or cash-settled.|
|**OTC**|Bilateral between parties. Counterparty risk exists. Usually cash-settled.|

> Most retail traders use
> 
> **exchange-traded options**

---

## **5️⃣ Basic Strategies**

### **A. Directional / Simple**

|**Strategy**|**Position**|**Risk**|**Reward**|**When to Use**|
|---|---|---|---|---|
|**Long Call**|Buy call|Premium paid|Unlimited|Expect stock to rise|
|**Long Put**|Buy put|Premium paid|Limited to K|Expect stock to fall|
|**Covered Call**|Own stock + sell call|Limited by stock price|Premium + stock gains|Earn income, limit upside|
|**Cash-Secured Put**|Hold cash + sell put|Buy stock at strike if exercised|Premium|Acquire stock at discount|

---

### **B. Spreads**

|**Strategy**|**Structure**|**Goal**|
|---|---|---|
|**Bull Call Spread**|Buy call low strike + sell call high strike|Profit from moderate rise; reduces cost|
|**Bear Put Spread**|Buy put high strike + sell put low strike|Profit from moderate drop; reduces cost|
|**Credit Spread**|Sell option closer to ATM, buy further OTM|Collect premium, limited risk|

---

### **C. Volatility Plays**

|**Strategy**|**Structure**|**Goal**|
|---|---|---|
|**Straddle**|Buy call + put same strike|Profit if stock moves a lot in either direction|
|**Strangle**|Buy call + put at different strikes|Cheaper than straddle; needs larger move|

---

### **D. Risk / Reward Overview**

|**Position**|**Max Loss**|**Max Gain**|**Breakeven**|
|---|---|---|---|
|Long Call|Premium|Unlimited|Strike + Premium|
|Long Put|Premium|Strike – Premium|Strike – Premium|
|Short Call|Unlimited|Premium|Strike + Premium|
|Short Put|Strike – Premium|Premium|Strike – Premium|

---

## **6️⃣ Key Concepts to Remember**

1. **Time Decay (Theta)**: Options lose value as expiry approaches. Faster for OTM options.
2. **Intrinsic vs Time Value**: Intrinsic is “real money,” time value is “hope money.”
3. **Leverage**: Small stock moves → large P/L swings.
4. **Liquidity**: Trade only options with enough volume to enter/exit efficiently.
5. **Greeks**: Delta (price sensitivity), Theta (time decay), Vega (volatility).

---

## **7️⃣ Practical Tips for Beginners**

1. Start with **long calls or puts**. Avoid spreads initially.
2. Risk **only what you can afford to lose** (premium).
3. Paper trade first to understand payoff diagrams.
4. Track **Greeks**, especially Theta and Delta.
5. Sell before expiry if OTM to minimize loss.

---

## **8️⃣ Quick Payoff Visuals**

### **Long Call**

```
Profit
  |
  |       /
  |      /
  |     /
  |    /
  |___/________ Stock Price
      K
Loss = Premium
```

### **Long Put**

```
Profit
  |
  |\\
  | \\
  |  \\
  |   \\
  |____\\_____ Stock Price
       K
Loss = Premium
```

### **Covered Call**

```
Profit
  |\\
  | \\
  |  \\____ max = strike + premium
Loss = Stock decline – premium
```

---

## **9️⃣ Suggested Learning Path**

1. Learn **calls and puts** basics.
2. Paper trade **long options** on stocks you know.
3. Experiment with **bull/bear spreads**.
4. Add **volatility strategies** (straddles/strangles).
5. Track **Greeks** and **Theta decay** to understand time effect.
6. Gradually explore **income strategies** like covered calls or cash-secured puts.

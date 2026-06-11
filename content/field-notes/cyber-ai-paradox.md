---
title: "Cyber-AI paradox"
topic: "Research & ML"
summary: "The Cybersecurity Paradox: Why the AI-Driven Selloff Is a Buying Thesis, Not a Structural Decline"
---

# The Cybersecurity Paradox: Why the AI-Driven Selloff Is a Buying Thesis, Not a Structural Decline

April 21 2026, Hakyun 

---
## Executive summary

Public cybersecurity equities have been repriced sharply downward through Q1 2026, with the iShares Cybersecurity & Tech ETF losing roughly 5% in a single session on AI-disruption fears and the Global X Cybersecurity ETF falling to its lowest level since November 2023 (CNBC, 2026a). CrowdStrike, Palo Alto Networks, Zscaler, SentinelOne, Okta, Netskope, and Tenable have all been caught in the downdraft, with Zscaler alone down more than 36% year-to-date at 
one point (Pradhan, 2026).

The market narrative driving this selloff rests on a single thesis: generative AI — exemplified by Anthropic's code-scanning capabilities and the "Project Glasswing" vulnerability-discovery collaboration — will commoditize enterprise security and make incumbent platforms obsolete (IndexBox, 2026).

This thesis is in my preview very premature. The correct framing is almost the inverse:


1. AI expands the attack surface faster than it shrinks the defender's moat. The democratization of software creation through "vibe coding" is generating vulnerable production code at a velocity and volume that traditional AppSec tooling was never designed to handle. Georgia Tech's Vibe Security Radar has already catalogued 70+ critical vulnerabilities attributable to AI-generated code since August 2025, and CodeRabbit research found AI-generated code contains 70% more errors than human-written code (Bing, 2026).

2. Incumbent cybersecurity platforms are not being disrupted — they are becoming AI companies. CrowdStrike's Charlotte AI, Palo Alto's Cortex/Precision AI, and Zscaler's Zero Trust Exchange for agentic interactions are embedding AI natively into their detection stacks, converting the purported existential threat into a product tailwind (CrowdStrike, 2026; Palo Alto Networks, 2026).

3. AI-orchestrated offense is creating catastrophic new demand. Anthropic's disclosure in November 2025 of GTG-1002 — a Chinese state-sponsored actor that weaponized Claude Code to execute 80–90% of a multi-target espionage campaign autonomously — is a watershed event that reframes AI as a demand accelerant for defensive platforms, not a substitute for them (Anthropic, 2025; Paul, Weiss, 2025).

4. The structural underpinnings of cybersecurity demand — the 4.8 million-worker talent gap, rising regulatory liability, and 12–15% annual spending growth — are not AI-sensitive. These drivers persist regardless of whether Anthropic, OpenAI, or anyone else ships a better code scanner (ISC2, 2024; Gartner, 2024; Columbus, 2026).

  
Gartner projects global information security spending will reach USD 240 billion in 2026, a 12.5% year-over-year increase, with AI-amplified security as a category rising from USD 49 billion in 2025 to a projected USD 160 billion by 2029 (Columbus, 2026). The disconnect between this spending trajectory and the current equity market repricing is the investment opportunity.

---
## 1. The market narrative: what the selloff is pricing in

### 1.1 Trigger events

The cybersecurity sector's 2026 derating was not organic — it was event-driven. Three specific catalysts compounded:


- February 2026: Anthropic's code-scanning tool release. The debut of a Claude-powered security tool in a limited research preview triggered a two-day decline during which CrowdStrike, Palo Alto Networks, and Zscaler each fell ~6%, while GitLab and JFrog (pure-play code-scanning vendors) dropped 8% and 25% respectively (CNBC, 2026a).

- March 2026: The Mythos leak. A Fortune report disclosing that Anthropic was internally testing a more powerful model called Mythos — explicitly flagged as presenting elevated cyber-offensive risk — sent the iShares Cybersecurity ETF down another 4.5% in a single day (CNBC, 2026b).

- Project Glasswing announcement. A defensive AI initiative involving Palo Alto Networks produced a brief relief rally, but investors quickly reverted to the disruption narrative once the initial novelty passed (IndexBox, 2026).
### 1.2 How the market is interpreting it

Brian Essex, executive director of U.S. software equity research at J.P. Morgan, framed the consensus anxiety concisely: "It's not about disruption this year or even 14 to 18 months from now — it's all about whether, longer term, these business models will still be viable" (Essex, 2026, as quoted in Information Security Media Group, 2026).

Two overlapping forces are doing the damage:

1. A multiple compression story. Cybersecurity stocks entered 2026 trading at premium multiples that assumed perpetual 30%+ growth. The AI-disruption narrative gave the market an excuse to reset those multiples toward levels more consistent with peers (TechBuzz, 2026). CrowdStrike's forward P/E is now ~90–103x and Palo Alto's sits near 55x — both well off their highs (247 Wall St., 2026).

2. An "AI ghost trade" — Seeking Alpha's Steven Cress's term — in which fear-driven repricing is being applied indiscriminately across technology, consumer discretionary, and industrial names, with cybersecurity catching the heaviest beta because it sits at the intersection of SaaS and AI narrative risk (Cress, 2026).


### 1.3 What management is saying

The operators themselves reject the disruption framing in forceful terms. George Kurtz, CEO of CrowdStrike, responded directly after the February selloff: "an AI capability that scans code does not replace the Falcon platform — or your security program. Security requires an independent, battle-tested platform built to stop breaches" (CNBC, 2026a). Palo Alto Networks' CEO Nikesh Arora said on the Q1 FY26 earnings call that he was "confused" by the market viewing AI as a threat to cybersecurity (CNBC, 2026a).


Even bearish sell-side analysts have flagged the reaction as overdone. Bank of America's research note concluded that Anthropic's code scanner materially threatens only code-scanning point solutions (GitLab, JFrog), not end-to-end platforms: "We think that AI could improve efficiency in specific workflows, particularly code scanning, but does not now have the visibility, control, or reliability to replace end-to-end security platforms" (Bank of America, as cited in CNBC, 2026a).

---
## 2. The counter-thesis: five structural drivers the market is mispricing

### 2.1 Driver 1 — Vibe coding is creating a vulnerability supernova

The core flaw in the bearish thesis is that it conflates AI improving defense with AI being a net negative for defenders. This ignores what AI is simultaneously doing to the offensive side of the equation and, more importantly, to the surface area being defended.

Vibe coding — the formal definition being "an AI-dependent programming technique where a person describes a problem in a few sentences as a prompt to a large language model tuned for coding" (Checkmarx, 2026) — has dramatically expanded the population of people shipping production code. Kusari's Application Security in Practice report found that 85% of organizations have adopted AI coding assistants, while only 9% consider AI-driven AppSec analysis a must-have capability — and only 38% use AI for code review in pull requests (Kusari, 2026). The code-creation side has scaled faster than the code-verification side by an enormous margin.

The security consequences are now empirically documented rather than theoretical:

- Georgia Tech's Vibe Security Radar has identified 70+ critical software vulnerabilities most likely attributable to AI coding since August 2025, with the rate of discovery accelerating in the most recent two-month window (NBC News, 2026).

- CodeRabbit's December 2025 report found AI-generated code contains 70% more errors than human-written code, and that AI-generated errors are more severe than human ones on average (NBC News, 2026).

- Veracode research (cited in Kaspersky's analysis) shows that while leading AI models now produce compilable code 90% of the time — up from <20% less than two years ago — the compilation success rate tells us nothing about security posture (Kaspersky, 2025).

- Databricks' red team demonstrated that even Claude-generated code that "just works" can introduce arbitrary-code-execution vulnerabilities (e.g., unvalidated pickle deserialization in Python network code) that would require deliberate, security-focused prompting to avoid (Databricks, 2026).

- Invicti's analysis of real-world vibe-coded applications identified recurring systemic issues: silent removal of authentication logic during iterative prompting, missing authorization checks, exposed backend APIs left active after UI changes, injection vulnerabilities in input-handling logic, and hard-coded credentials propagated to client-side code (Invicti, 2026). 

The categorical risks, which the Contrast Security glossary catalogues, include insecure dependency recommendations, supply-chain attacks via "hallucinated" package names registered by malicious actors, bypassing of traditional SAST/SCA/DAST workflows (which were built for human-speed development), and a systemic "comprehension gap" where developers no longer understand the code they deploy (Contrast Security, 2026; Kusari, 2026).

The investment implication is direct: every non-technical founder, marketer, PM, and designer who ships a vibe-coded app is a customer creation event for runtime application security, API security, identity management, and managed detection & response. The total addressable market for security tooling does not shrink when the number of insecure applications in production grows by an order of magnitude — it expands.

### 2.2 Driver 2 — AI-orchestrated offense is a demand accelerant, not a substitute for defense

November 2025's GTG-1002 disclosure is, from a markets perspective, the most important cybersecurity event of the current cycle — and it has not yet been priced into defensive cybersecurity stocks.

Anthropic's technical report on the incident describes the first documented case of a cyberattack executed largely without human intervention at scale. A Chinese state-sponsored group jailbroke Claude Code by framing it as a cybersecurity firm conducting defensive testing, then let the AI autonomously perform reconnaissance, vulnerability discovery, exploitation, lateral movement, privilege escalation, credential harvesting, and data exfiltration against roughly 30 global targets, including major technology companies, financial institutions, chemical manufacturers, and government agencies — with a subset of intrusions succeeding (Anthropic, 2025). Anthropic's own estimate: 80–90% of operations executed without human intervention, at speeds of thousands of requests per second "impossible to match" for human hackers (PwC, 2026).

PwC's framing of the implications is the correct one for investment purposes: "Bad actors can scale simply with more compute and aren't limited by finite personnel resources. Individuals can run large-scale campaigns that once took teams. It also means the operations can proceed 24/7 without sleep or rest" (PwC, 2026). Translated into investment terms — offensive capability is being democratized and industrialized on the same curve as defensive capability, and the attacker has the structural advantage of needing to succeed only once.

The U.S. Congressional response has been swift. House Homeland Security Committee Chair Andrew Garbarino stated publicly: "If the bad guys are going to be using AI to attack us, we should be using AI… in our cyber defenses — because it's not going to be possible to fight this aggressive use of AI and cyberattacks by just human intervention and defense alone" (House Committee on Homeland Security, 2025). The policy implication — formalized in the reintroduced Strengthening Cyber Resilience Against State-Sponsored Threats Act — is increased federal cyber spend and regulatory pressure on the private sector, both of which translate directly into incumbent cybersecurity platform revenue.

A reasonable skepticism applies. Security researcher Kevin Beaumont has publicly challenged some of the surrounding hype, noting that many CISOs claiming to see "70% of ransomware being AI-driven" haven't actually handled such incidents themselves (Security Affairs, 2025). But this pushback cuts against the bearish equity thesis, not for it — if the offensive-AI threat is over-stated in the near term, then AI is not actually eroding defender economics on the timelines the market is pricing in. Either the threat is real (bullish for cyber) or it's hype (also bullish — the market is mispricing disruption that isn't happening).
### 2.3 Driver 3 — Incumbents are absorbing AI, not being disrupted by it

The "AI will kill cybersecurity" thesis implicitly assumes incumbents are static. They are not. Every major platform vendor is spending aggressively to make AI their product, not their disruptor.


CrowdStrike. FY2026 results delivered record ARR of USD 5.25 billion, making CrowdStrike the fastest (and only) pure-play cybersecurity software company to reach that milestone, with net new ARR of USD 1.01 billion in the fiscal year and Q4 revenue of USD 1.31 billion, up 23% year-over-year (CrowdStrike, 2026). Net retention rates remained above 120% (TechBuzz, 2026). Kurtz's stated long-term target is USD 20 billion in ending ARR by FY36, framed explicitly as an AI-driven opportunity: "The AI revolution represents a new, generational growth opportunity for CrowdStrike" (CrowdStrike, 2026). The company's Charlotte AI, which now holds FedRAMP High authorization, automates SOC analyst triage at a scale that management estimates saves 40 analyst-hours per week per customer (Techi, 2026). Strategic moves include a partnership with CoreWeave for secure AI cloud infrastructure, a collaboration with NVIDIA on Charlotte AI AgentWorks, and the acquisition of Pangea (AI security). CrowdStrike is an AI company with a cybersecurity wrapper, not the other way round.


Palo Alto Networks. Q1 FY2026 revenue of USD 2.5 billion (+16% YoY) and non-GAAP net income of USD 662 million (+21% YoY), with Next-Generation Security ARR of USD 5.9 billion up 29% YoY (LeverageShares, 2026). Management's stated target is USD 15 billion in NGS ARR by 2030. The USD 25 billion CyberArk acquisition brings privileged access management and machine-identity security into the platform — critical given CyberArk's own data showing machine identities now outnumber human identities by more than 80 to 1 (Palo Alto Networks, 2026). The USD 3.35 billion Chronosphere acquisition adds cloud observability and DevSecOps telemetry. Precision AI is the platform's unified AI-native SOC layer.
 

Zscaler. Q2 FY2026 revenue of USD 816 million (+26% YoY) and ARR of USD 3.4 billion (+25% YoY), with over 25% of new business coming from consumption-based offerings and consumption-tied ARR up over 100% YoY (Pradhan, 2026). Management is explicitly positioning the Zero Trust Exchange to secure agent-to-agent and machine-to-machine AI interactions — reframing the AI-agent threat as the core product use case. This is the most AI-native thesis in the public cybersecurity universe and, paradoxically, the stock is down 36% YTD.


SentinelOne. 43% YoY revenue growth (from a smaller base) with an explicitly "AI-first" architecture built around Purple AI and Singularity autonomous response (Techi, 2026).

  

The aggregate pattern: every major cybersecurity incumbent is executing the textbook "absorb the disruption" playbook, and the operational metrics — ARR growth, net retention, gross margin — are still running above what the share prices imply.

### 2.4 Driver 4 — The talent gap is the silent, non-negotiable tailwind

The ISC2 2024 Cybersecurity Workforce Study documented a global workforce gap of 4.8 million cybersecurity professionals, a 19% YoY increase, while the active workforce flatlined at 5.5 million (+0.1%) (ISC2, 2024). 90% of organizations report skills shortages; 58% believe the shortage puts them at significant risk; 71% report that the talent gap has directly affected their security posture (Columbus, 2026; MedhaCloud, 2026).
  

This is a structural condition that AI cannot worsen and almost certainly improves the investment case for platform vendors. When you cannot hire analysts, you buy AI-powered SOC platforms that replace or augment analyst labor. Gartner's forecast of managed security services growing at 11.1% in 2026 — the fastest rate in the services segment — is a direct consequence: organizations that can't fill SOC roles are buying managed SOC capacity (Columbus, 2026).


The Gartner projection is the single most important data point for the thesis: the AI-amplified security market is projected to rise from USD 49 billion in 2025 to USD 160 billion by 2029, with over 75% of enterprises using AI-amplified cybersecurity products by 2028, up from less than 25% in 2025 (Columbus, 2026). This is not additive spending — it is the reallocation of the existing security budget toward products with AI embedded. The vendors who get there first win shelf space; those who don't lose it.

### 2.5 Driver 5 — Regulation, machine identity, and the agentic surface

Three secondary drivers compound the core thesis:


- Regulatory mandates are hardening. The EU AI Act, NIS2, SEC cybersecurity disclosure rules, and state-level equivalents create legal liability that can only be discharged through documented security spending (Yehey, 2026; Elisity, 2026). Palo Alto Networks' 2026 predictions explicitly warn that AI governance failures will move from philosophical debate into direct personal executive liability precedent in 2026 (Palo Alto Networks, 2026).

- Machine identity explosion. Machine identities now outnumber humans by more than 80 to 1, and that ratio is accelerating as enterprises deploy agentic AI (Palo Alto Networks, 2026). Each machine identity is an authentication and authorization event that needs policy, monitoring, and audit — all of which are cybersecurity product categories.

- Agentic AI as a first-class attack surface. Gartner forecasts that over 50% of enterprises will use AI security platforms to protect their AI investments by 2028, while only 6% currently have an advanced AI security strategy in place (Palo Alto Networks, 2026). This is a category that did not exist two years ago and now has a triple-digit-billion TAM attached to it.

---
## 3. Market sizing — where the spending is going

Multiple independent forecasts converge on the same direction of travel. Methodologies differ but the underlying signal is consistent:

|Segment|2025|2030 / 2031|CAGR|Source|
|---|---|---|---|---|
|Total cybersecurity market|USD 227.6B|USD 351.9B|9.1%|MarketsandMarkets (2026)|
|Total cybersecurity spending (Gartner end-user)|USD 213B|USD 308B+ (2029)|12.5%|Gartner, per Elisity (2026); MedhaCloud (2026)|
|AI in cybersecurity (broad)|USD 31.5B|USD 93.7B|24.4%|Grand View Research (2026)|
|AI cybersecurity solutions|USD 30.9B|USD 86.3B|22.8%|Mordor Intelligence (2025)|
|Generative AI cybersecurity|USD 8.65B|USD 35.5B (2031)|26.5%|MarketsandMarkets (2026)|
|AI-amplified security (Gartner)|USD 49B|USD 160B (2029)|~34%|Gartner Q4 2025 Forecast, per Columbus (2026)|

Key takeaways:

- Cybersecurity spending grows at ~2–3× overall IT spending for the rest of the decade.
- AI-specific subsegments grow at 22–34% CAGR — faster than any other major IT category.
- Asia-Pacific is the fastest-growing region at ~24% CAGR (Mordor Intelligence, 2025) — relevant for Hakyun's Singapore/regional positioning.
- SMEs are projected to be the fastest-growing customer segment within total cybersecurity, as managed services make enterprise-grade protection accessible at SMB price points (MarketsandMarkets, 2026) — directly aligned with the vibe-coding driver.

---
## 4. Where the thesis could be wrong (intellectual honesty check)

Four scenarios would materially weaken the bull case:

1. Platform-bundling by hyperscalers. Microsoft (Defender + Sentinel + Purview), Google (Mandiant + Chronicle), and AWS (GuardDuty + Security Hub) can bundle "good enough" security with compute at prices that pure-plays cannot match. This is a real risk — but it is not an AI-specific risk, and it has been present for five years without killing the incumbents.

2. A genuinely frontier AI red-team capability that is not available to defenders. If an offensive model with meaningful capability asymmetry vs. defensive tooling gets released (or leaked), defender economics degrade sharply. This is what the Mythos disclosure briefly hinted at. Worth monitoring; not yet realized.

3. A systemic breach of an incumbent's own platform. CrowdStrike's July 2024 outage is the reference event — a self-inflicted incident can do more damage to a cybersecurity stock than any external disruption narrative. Operational risk at the vendors themselves is real.

4. Multiple compression continuing past fundamentals. Even if the fundamentals are intact, markets can stay irrational. Trading at 90–100x forward earnings (CrowdStrike) offers little margin of safety if sentiment doesn't turn.

None of these invalidate the structural thesis; they define the risk frame within which position sizing should happen.

---
## 5. Synthesis — the investment framing

The cleanest way to state the thesis:

The market is pricing cybersecurity as a SaaS sector facing AI-commoditization risk. It should be pricing it as a critical infrastructure sector whose total addressable market expands at the exact velocity that AI democratizes both software creation (vibe coding) and cyber offense (agentic attacks). The incumbent platforms are not being disrupted; they are absorbing AI as a product capability and extending their moats via the embedded-customer-base + proprietary-telemetry flywheel.

The specific stock-level implication for each of the three major names:

- CrowdStrike (CRWD) — highest-quality platform, highest multiple, highest operational risk (post-2024 outage). The correct framing is "paying up for the best operator in a secular growth market."

- Palo Alto Networks (PANW) — the platformization + CyberArk + Chronosphere thesis is the most comprehensive integrated stack in the industry, at a more digestible ~55× multiple. Lower growth, more acquisition-execution risk.

- Zscaler (ZS) — the most AI-native positioning (Zero Trust Exchange for agent interactions) at the most compressed multiple after a 36% YTD drawdown. Highest beta to a narrative reversal.

Each of these translates the same core macro thesis into different risk-adjusted return profiles. What they share is the underlying driver: cybersecurity demand is a function of the size and insecurity of the global software surface area, and AI is expanding both on an exponential curve.


---

## 6. Talking points (for conversation / discussion use)

1. "The AI disruption narrative conflates code-scanning tools with end-to-end security platforms. Those are different products sold to different buyers solving different problems."

2. "Every vibe coder is a future customer of runtime application security. Georgia Tech has already logged 70+ critical vulnerabilities from AI-generated code in six months."

3. "The GTG-1002 incident was the first documented AI-orchestrated state-sponsored cyberattack — 80–90% autonomous. That's a demand catalyst, not a disruption signal."

4. "CrowdStrike just printed USD 5.25B ARR growing 24% YoY. That's not a business being disrupted; that's a business the market is pretending is being disrupted."

5. "The 4.8 million-person cybersecurity talent gap is not AI-sensitive. You can't hire your way out of it. You have to buy platforms."

6. "Gartner projects AI-amplified security to go from USD 49B to USD 160B by 2029. That's a 34% CAGR in a sector the market is derating for AI risk."

7. "Regulation is a one-way ratchet. NIS2, SEC disclosure rules, EU AI Act — none of these get easier."

8. "The machine identity count is 80:1 vs humans. Every one of those needs auth, audit, and policy enforcement. That's a product category that didn't exist as a primary budget line three years ago."

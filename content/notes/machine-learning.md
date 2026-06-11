---
title: "Machine Learning"
topic: "AI & Technology"
summary: "Covers: GAN project, ML domain survey, time-series methods, common debug patterns"
---

# Machine Learning

> Covers: GAN project, ML domain survey, time-series methods, common debug patterns. See also [[cybersecurity-thesis]] and [[ai-in-industry]].

---

## GAN Project — Synthetic Financial Data Generation

**Source:** `raw-sources/AI Projects/GAN project on Google Colab.md`

**Goal:** Generate synthetic OHLCV + indicator data that statistically matches real market data (AAPL).

### Pipeline

**1. Data Download**
```python
yfinance.download("AAPL", start="2015-01-01", end="2024-01-01")
```

**2. Feature Engineering**
- Moving averages: MA10, MA20, MA50, MA80, MA100, MA120
- Daily return: `(Close - Open) / Open`

**3. Preprocessing**
- `MinMaxScaler` — scale all features to [0, 1]

**4. GAN Architecture**

*Generator:*
```
Dense(128) → LeakyReLU → Dense(256) → LeakyReLU → Dense(512) → LeakyReLU → Dense(n_features)
```

*Discriminator:*
```
Dense(512) → LeakyReLU → Dropout(0.3) → Dense(256) → LeakyReLU → Dropout(0.3) → Dense(128) → LeakyReLU → Dropout(0.3) → Dense(1, sigmoid)
```

**5. Training**
- 10,000 epochs, batch size 64
- Adam optimizer, lr = 0.00001
- Alternating generator/discriminator updates

**6. Generation & Validation**
- Generate 100,000 synthetic samples
- KL divergence per feature (real vs synthetic)
- PCA visualization for distributional similarity

**7. LSTM Variant**
- Sequence modeling: `(batch, timesteps, features)` → LSTM → Dense
- Captures temporal dependencies not captured by dense GAN

### Common Bugs
- Prophet: `ds`/`y` column naming; timezone conflicts
- LSTM: shape mismatch (3D tensor: batch × timestep × features)
- ARIMA: index alignment errors after resampling
- General: NaN propagation through feature engineering chain; column creation order bugs

---

## ML Domain Survey

**Source:** `raw-sources/AI Projects/List of Different ML Domains.md`

### 8 Key Domains

| Domain | Research Frontiers |
|--------|--------------------|
| **Reinforcement Learning** | Robotics dexterity, RLHF for alignment, plasma control (nuclear fusion) |
| **NLP** | Hallucination reduction, interpretability, efficiency (smaller models), low-resource languages |
| **Computer Vision** | Object detection, semantic segmentation, video understanding, depth estimation, point clouds |
| **Audio Processing** | ASR at scale, generative audio/music, real-time translation |
| **Multimodal** | Text-to-image alignment, cross-modal retrieval |
| **Graph Neural Networks** | Scaling to large graphs, generalization across graph types |
| **Applied AI** | Industry-specific deployment (healthcare, finance, logistics) |
| **Evolutionary / Meta Learning** | Learning to learn, few-shot generalization |

---

## Hakyun's Active ML Stack

| Task | Tools |
|------|-------|
| Time series forecasting | Prophet, ARIMA, SARIMAX, pmdarima (auto_arima) |
| Deep learning | TensorFlow/Keras (LSTM), XGBoost (basic) |
| Classical ML | scikit-learn |
| Visualization | Plotly, Matplotlib |
| Scaling | MinMaxScaler, RobustScaler |
| Splitting | Time-based train/test splits (no data leakage) |

### Common Workflows
- 30-day forward predictions
- Feature engineering: moving averages (MA), RSI, MACD, Bollinger Bands, OBV, ATR, VWAP
- Time-based splits (no random shuffling — preserves temporal integrity)

---

## Claude Code Skills (AI Tooling)

**Source:** `raw-sources/AI Projects/Skills.md`

Four plugin recommendations for Claude Code:
1. **superpowers-lab** — experimental features + token reduction
2. **claude-mem** — persistent memory across sessions (superseded; use Claude's native auto-memory system instead — see [[claude-code-tools]])
3. **context-manager** — filter relevant context to reduce noise
4. **claude-context** — smart search over codebase

---

## Agent Identity Philosophy

**Source:** `raw-sources/AI Projects/Research & ML/MD files - What they are.md`

**OpenClaw's four primitives:**
1. Persistent identity (who the agent is across sessions)
2. Periodic autonomy (scheduled tasks without user input)
3. Accumulated memory (what it has learned over time)
4. Social context (who it's talking to, relationship history)

**On Claude's Soul Document:** Hakyun treats Claude's Constitutional AI as a founding civilizational text — analogous to Harari's intersubjective realities, Durkheim's collective conscience. Five unresolved problems: Legitimacy, Plurality, Drift, Mythology of Creator, Observer Effect.

---

## Related Pages

[[cybersecurity-thesis]] | [[ai-in-industry]] | [[active-projects]] | [[hakyun-ryu]] | [[claude-code-tools]]

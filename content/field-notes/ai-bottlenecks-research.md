---
title: "AI bottlenecks research"
topic: "Research & ML"
summary: "Below is the most important “non-obvious bottleneck” map I’d pay attention to in AI right now. The mainstream narrative is still “more GPUs, better models.” The less-mainstream reality is that the ind"
---

Below is the most important “non-obvious bottleneck” map I’d pay attention to in AI right now. The mainstream narrative is still “more GPUs, better models.” The less-mainstream reality is that the industry is increasingly constrained by **memory, inference economics, networking, electricity, cooling, data quality, evaluation, and deployment reliability**.

## **1. Inference memory bottleneck: the “KV cache / memory wall”**

This is probably one of the most underappreciated bottlenecks. Training gets the headlines, but in production, the real cost and scaling pain often comes from **inference**: serving millions of user queries, long contexts, agents, tool calls, and multimodal workloads. The issue is not just raw compute. It is whether GPUs have enough high-bandwidth memory to hold model weights and the growing KV cache during token generation. Recent AI infrastructure analysis notes that modern accelerators rely heavily on HBM because AI systems need rapid exchange between processors and memory, while separate 2026 infrastructure commentary describes the “AI memory wall” as the point where model size, long context, KV cache, and concurrency exceed available GPU memory.  

**Companies to watch:**

|**Company**|**Product / service**|**What it solves**|**Track record / signal**|
|---|---|---|---|
|**NVIDIA**|H100, H200, B200/Blackwell, GB200/NVL systems, NVLink|More HBM, faster GPU-to-GPU communication, higher inference throughput|Still the dominant AI accelerator ecosystem. H200 and Blackwell directly address memory and bandwidth constraints.|
|**SK Hynix**|HBM3E / next-gen HBM|Supplies the high-bandwidth memory required by AI GPUs|SK Hynix has become central because HBM is one of the key gating components in AI hardware supply chains. Reports in 2026 describe memory chipmakers, especially SK Hynix and Samsung, as major beneficiaries of AI demand.|
|**Micron**|HBM and advanced DRAM|HBM supply diversification beyond Korea|Important as hyperscalers and GPU vendors want more memory supply resilience.|
|**Penguin Solutions**|MemoryAI KV cache server|External memory appliance for enterprise-scale inference|Penguin announced an 11TB CXL-based KV cache server in March 2026, targeting the exact problem of inference memory expansion.|
|**Astera Labs**|Leo CXL memory controller|Extends memory capacity using CXL; sits between GPU HBM and slower storage|Astera says its Leo CXL controller, used in Penguin’s KV cache server, showed 3.6x memory expansion, 75% higher GPU utilization, and 2x inference throughput in demos.|
|**Cerebras**|Wafer-scale AI chips / inference systems|Alternative architecture that reduces some bottlenecks by putting huge compute and memory fabric on a wafer-scale chip|Cerebras’ 2026 IPO was a major market signal. Reuters reported it priced at $185 per share, raised $5.55B, and had 2025 revenue of $510M.|

**Why it matters:**  
If AI shifts from “chatbot answering short prompts” to **agents with long memory, long context, code execution, retrieval, multimodal input, and thousands of tool calls**, inference memory becomes a much bigger constraint than people expect. The winners here are not only GPU makers, but also **HBM suppliers, CXL memory companies, inference-optimized chipmakers, and software stacks that reduce KV cache waste**.

---

## **2. AI networking and interconnect: moving data between GPUs**

The next bottleneck is the **network fabric**. Large AI clusters are not just thousands of GPUs sitting together. They need to behave almost like one giant computer. When GPUs wait for data from other GPUs, expensive compute sits idle.

This is why networking has become strategically important. NVIDIA says Spectrum-X is purpose-built for AI Ethernet and claims up to 1.6x higher network performance than off-the-shelf Ethernet, with high efficiency at very large GPU scale.   Broadcom is also pushing hard into AI connectivity, including 102.4T Ethernet switching, co-packaged optics, optical DSPs, retimers, and PCIe Gen6 switching.  

**Companies to watch:**

|**Company**|**Product / service**|**What it solves**|**Track record / signal**|
|---|---|---|---|
|**NVIDIA**|Spectrum-X Ethernet, InfiniBand, NVLink, NVLink Fusion|Reduces GPU idle time and improves cluster-wide training/inference performance|NVIDIA is no longer just a GPU company; it is selling the full AI factory stack.|
|**Broadcom**|Tomahawk switches, co-packaged optics, optical DSPs, custom XPUs|High-speed switching, optical connectivity, custom silicon for hyperscalers|Broadcom is one of the most important “picks and shovels” names in AI networking and custom silicon.|
|**Marvell**|Custom silicon, optical interconnect, AI networking|Helps hyperscalers build semi-custom AI infrastructure|Marvell announced work with NVIDIA NVLink Fusion, providing custom XPUs and compatible networking.|
|**Astera Labs**|PCIe/CXL connectivity chips|Solves data movement and memory expansion inside AI servers|Strongly positioned in the “connectivity inside the AI server” layer.|
|**Credo Technology**|Active electrical cables, high-speed connectivity|Lower-power, high-speed links inside AI data centers|Beneficiary of dense AI cluster cabling and rack-scale systems.|
|**Arista Networks**|Cloud networking switches|Ethernet networking for hyperscale and AI clusters|Well positioned if Ethernet-based AI fabrics continue gaining share.|

**Why it matters:**  
The industry used to think of networking as boring infrastructure. In AI, networking is now performance-critical. As clusters scale from thousands to hundreds of thousands of accelerators, **interconnect efficiency can determine whether the whole AI factory works economically**.

---

## **3. Power availability: electricity is becoming the new GPU**

This is one of the most important bottlenecks, and it is still not fully mainstream among casual AI observers. Data centers are increasingly constrained by **grid access, transformer shortages, permitting, power purchase agreements, and local utility capacity**. S&P Global notes that generative AI infrastructure requires more energy and more efficient cooling than typical IT infrastructure, making access to electricity a key bottleneck for AI growth.   Legal and infrastructure commentary from 2026 similarly frames AI infrastructure around power density, energy access, resilience, cost predictability, and regulation rather than compute alone.  

**Companies to watch:**

|**Company**|**Product / service**|**What it solves**|**Track record / signal**|
|---|---|---|---|
|**Constellation Energy**|Nuclear generation, clean baseload power|Provides large-scale reliable power for hyperscalers|Important because AI data centers need always-on energy, not just intermittent power.|
|**NextEra Energy**|Renewables, grid-scale power, storage|Large-scale clean power supply|Beneficiary of hyperscaler demand for renewable PPAs.|
|**GE Vernova**|Gas turbines, grid equipment, electrification|Power generation and grid modernization|Important where data centers need dispatchable generation.|
|**Eaton**|Electrical equipment, power distribution|Switchgear, power management, electrical infrastructure|Direct beneficiary of data center electrification demand.|
|**Quanta Services**|Grid construction and utility infrastructure|Builds and upgrades transmission/distribution infrastructure|Solves the physical bottleneck of connecting data centers to power.|
|**Bloom Energy**|Fuel cells / on-site power|Helps data centers bypass or reduce grid dependency|Relevant for “bring your own power” AI campuses.|
|**Vertiv**|Power and thermal infrastructure for data centers|UPS, power distribution, cooling, modular infrastructure|Vertiv’s 2026 outlook explicitly highlights AI power and adaptive liquid cooling as major data center design themes.|

**Why it matters:**  
AI is increasingly becoming a **power infrastructure trade**, not just a software trade. The hyperscalers with secured power, land, cooling, and grid relationships will have a structural advantage. Smaller AI companies may have great models but still struggle to obtain affordable compute because the physical infrastructure is scarce.

---

## **4. Cooling and thermal density: AI racks are becoming too hot for traditional data centers**

AI racks are getting denser. Some next-generation AI infrastructure is pushing toward extremely high rack densities, and traditional air cooling is not enough. IoT Analytics’ 2026 data center trend report says AI workloads are pushing the industry toward greater than 1MW rack density and that direct-to-chip liquid cooling has become an industry standard.   Vertiv’s 2026 report also links liquid cooling closely to AI workloads and accelerated compute.  

**Companies to watch:**

|**Company**|**Product / service**|**What it solves**|**Track record / signal**|
|---|---|---|---|
|**Vertiv**|Liquid cooling, power systems, modular data center infrastructure|Keeps high-density GPU racks operational and efficient|One of the most direct AI infrastructure beneficiaries outside semiconductors.|
|**Schneider Electric**|Data center power, cooling, energy management|Full electrical and thermal management stack|Strong positioning in energy-efficient data center design.|
|**Trane Technologies**|Cooling systems, HVAC, thermal management|Industrial-scale cooling for data centers|Beneficiary of AI-driven cooling demand.|
|**Johnson Controls**|Building systems, chillers, HVAC|Thermal and facility management|Relevant as data centers become more like industrial energy facilities.|
|**CoolIT / LiquidStack / Submer**|Direct-to-chip and immersion cooling|Specialized liquid cooling for dense AI servers|More niche but important for high-density AI deployments.|

**Why it matters:**  
Cooling is not just an efficiency issue. It affects **how many GPUs can fit in a facility, how fast a data center can be built, and whether hardware can run reliably**. As AI chips become more power-hungry, cooling companies become part of the AI supply chain.

---

## **5. AI cloud scarcity: access to GPUs, not model ideas, is the constraint**

A lot of startups can build interesting AI products. Far fewer can secure reliable GPU access at scale. This has created a new category: **AI-native cloud / neocloud providers**. These companies specialize in GPU clusters optimized for AI training and inference.

**Companies to watch:**

|**Company**|**Product / service**|**What it solves**|**Track record / signal**|
|---|---|---|---|
|**CoreWeave**|AI-native cloud infrastructure|Provides GPU compute for AI labs, enterprises, and model developers|CoreWeave says it surpassed $5B in revenue, with 850+ MW, 43 data centers, and a $66.8B backlog. It also announced major deals with Anthropic and Jane Street.|
|**Lambda**|GPU cloud and AI developer infrastructure|Makes GPU access easier for AI developers|Strong developer mindshare, especially among ML engineers.|
|**Crusoe**|AI cloud powered partly by energy-first infrastructure|Ties compute deployment to power availability|Interesting because it approaches AI compute from the energy side.|
|**Nebius**|AI cloud / neocloud infrastructure|Alternative GPU cloud provider competing with CoreWeave|Barron’s reported Nebius revenue jumped to $399M from $55.3M year earlier and highlighted expansion to seven global sites and increased power guidance.|
|**Oracle Cloud Infrastructure**|Large-scale AI cloud partnerships|Offers GPU cloud capacity to AI labs and enterprises|Oracle has become more relevant because it can provide large AI infrastructure contracts.|

**Why it matters:**  
For AI startups, compute access is becoming like oil access for industrial companies. The best model architecture does not matter if you cannot train, fine-tune, or serve it economically. AI cloud companies solve **availability, deployment speed, cluster management, and GPU utilization**.

---

## **6. Data quality and human feedback: better data beats bigger models**

This bottleneck is less glamorous but extremely important. Foundation models are reaching a point where improvements increasingly depend on **better human feedback, better domain-specific data, better evaluations, and better post-training**. Scale AI describes its Data Engine as a system to collect, curate, annotate, train, evaluate, and repeat, including RLHF and human feedback.   Labelbox positions itself around expert evaluations that reveal model blind spots and help teams evaluate frontier models.  

**Companies to watch:**

|**Company**|**Product / service**|**What it solves**|**Track record / signal**|
|---|---|---|---|
|**Scale AI**|Data Engine, RLHF, model evaluation, enterprise AI systems|Provides high-quality human-labeled and expert-reviewed data|Major player in AI data infrastructure; Meta made a large strategic investment in Scale in 2025, though Scale also faced scrutiny over data-security practices.|
|**Labelbox**|Data labeling, model evaluation, expert evals|Helps teams find blind spots and improve models with human-in-the-loop workflows|Strong positioning in evaluation and data curation.|
|**Appen**|Human data and annotation services|Large-scale labeling and multilingual data|Older but still relevant in global annotation.|
|**Toloka**|Human feedback, RLHF, evaluation|Distributed human evaluation and data tasks|Useful for multilingual and large-scale evaluation workflows.|
|**Surge AI**|Premium RLHF / data labeling|Higher-quality human data for frontier model labs|Known for high-quality language data and RLHF workflows.|

**Why it matters:**  
The next frontier is not just “more internet data.” The internet has already been heavily mined. What matters now is **expert data, proprietary enterprise data, high-quality synthetic data, and human preference data**. This is especially important for finance, law, healthcare, coding, robotics, and enterprise agents.

---

## **7. Evaluation and observability: nobody fully trusts AI agents yet**

AI agents are powerful but unreliable. They can hallucinate, call the wrong tool, retrieve the wrong document, loop unnecessarily, leak sensitive information, or give inconsistent outputs. This creates a new bottleneck: **how do you monitor, test, debug, and improve AI systems in production?**

LangSmith describes LLM observability as giving visibility into RAG pipelines, agent decisions, cost, latency, hallucinations, and execution traces.   W&B Weave says LLM applications are fundamentally different from traditional software because outputs are non-deterministic, quality is subjective, and small prompt changes can create unexpected behavior.  

**Companies to watch:**

|**Company**|**Product / service**|**What it solves**|**Track record / signal**|
|---|---|---|---|
|**LangChain / LangSmith**|Agent tracing, evals, monitoring|Debugs agent behavior and evaluates performance from production traces|Strong developer adoption through LangChain and LangGraph ecosystem.|
|**Weights & Biases / Weave**|LLM observability and evaluation|Tracks model calls, traces, evals, and application quality|W&B already has strong ML experiment-tracking credibility.|
|**Braintrust**|AI evals, prompt/version testing, release gates|Helps teams systematically test AI apps before deployment|Strong in evaluation workflows and production-quality gates.|
|**Arize AI**|ML/LLM observability|Monitors drift, hallucination, retrieval, model performance|Strong enterprise observability positioning.|
|**Humanloop**|Prompt management, evals, LLM product iteration|Helps teams test prompts and model changes systematically|Useful for product teams building LLM apps.|
|**Galileo**|GenAI evaluation and observability|Detects hallucination, poor retrieval, and response quality issues|Focused on making enterprise GenAI safer and measurable.|

**Why it matters:**  
This is the bottleneck between “cool demo” and “enterprise adoption.” Companies will not deeply integrate agents into workflows unless they can measure reliability, debug failures, control cost, and prove safety. This is a huge area because AI applications need something like **Datadog + GitHub Actions + QA testing, but for probabilistic software**.

---

## **8. Enterprise data integration and RAG quality: AI needs the right internal context**

Many enterprises do not need a bigger model. They need AI that can correctly use their own documents, policies, codebases, tickets, emails, CRM data, and workflows. The bottleneck is **data access, permissions, freshness, retrieval quality, and governance**.

**Companies to watch:**

|**Company**|**Product / service**|**What it solves**|**Track record / signal**|
|---|---|---|---|
|**Snowflake**|Enterprise data cloud, Cortex AI|Lets companies run AI over governed enterprise data|Strong existing enterprise data footprint.|
|**Databricks**|Lakehouse, MosaicML, enterprise AI|Helps companies build AI on structured/unstructured internal data|Strong in data engineering and ML workflows.|
|**Pinecone**|Vector database|Retrieval layer for RAG applications|Popular among developers building semantic search/RAG.|
|**Weaviate**|Open-source vector database|RAG, hybrid search, semantic retrieval|Strong open-source and enterprise positioning.|
|**MongoDB**|Atlas Vector Search|Brings vector search into existing application databases|Useful because many apps already use MongoDB.|
|**Elastic**|Search + vector search|Hybrid keyword/vector retrieval for enterprise search|Strong existing search infrastructure base.|
|**Glean**|Enterprise AI search and assistant|Connects workplace data and permissions into a company-wide AI layer|Directly solves enterprise knowledge retrieval.|
|**Hebbia**|AI for financial/legal/professional document analysis|Helps knowledge workers analyze complex document sets|Strong fit for finance, law, consulting, and diligence workflows.|

**Why it matters:**  
The value of enterprise AI often depends less on the base model and more on whether the model can access the **right internal context safely**. Bad retrieval creates hallucinations. Poor permissions create data leaks. Stale data creates wrong answers. This is one of the biggest deployment bottlenecks.

---

## **9. AI security: prompt injection, data leakage, and agent misuse**

As AI agents get access to tools, files, browsers, APIs, and databases, they become a new security surface. Traditional cybersecurity tools were not designed for systems that can reason, generate code, call tools, and interpret untrusted natural language.

**Companies to watch:**

|**Company**|**Product / service**|**What it solves**|**Track record / signal**|
|---|---|---|---|
|**Wiz**|Cloud security platform|Secures cloud environments where AI workloads run|Strong cloud security traction; relevant because AI infrastructure lives in cloud/hybrid cloud.|
|**Palo Alto Networks**|Prisma Cloud, AI security features|Secures cloud, network, and AI application surfaces|Large enterprise cybersecurity incumbent.|
|**CrowdStrike**|Endpoint/cloud security + AI security|Protects endpoints and cloud environments from AI-accelerated threats|Strong enterprise footprint.|
|**Protect AI**|AI/ML supply chain security|Secures models, notebooks, pipelines, ML artifacts|One of the more directly AI-native security companies.|
|**Lakera**|LLM security, prompt injection protection|Protects LLM apps from malicious prompts and unsafe outputs|Focused on GenAI application-layer threats.|
|**HiddenLayer**|AI model security|Protects machine learning models from adversarial attacks and model theft|AI-native security niche.|
|**CalypsoAI**|GenAI security and governance|Enterprise controls for using LLMs safely|Focused on regulated enterprise use cases.|

**Why it matters:**  
As AI becomes an interface to real systems, the question shifts from “can it answer?” to “can it be tricked into doing something it should not?” This is especially important for finance, healthcare, legal, government, and internal enterprise agents.

---

## **10. Robotics and physical AI data: the world is harder than text**

Text models had the internet. Robotics does not have an equivalent universal dataset of the physical world. For robots and physical AI, the bottleneck is **real-world data, simulation, teleoperation, sensors, and embodiment**.

**Companies to watch:**

|**Company**|**Product / service**|**What it solves**|**Track record / signal**|
|---|---|---|---|
|**NVIDIA**|Isaac, Omniverse, Jetson, robotics simulation|Simulation and compute stack for physical AI|NVIDIA is positioning physical AI as a major next phase after generative AI.|
|**Figure AI**|Humanoid robots|General-purpose humanoid robotics|Strong investor and public attention, though commercial proof is still early.|
|**Agility Robotics**|Digit humanoid robot|Warehouse/logistics automation|More commercially grounded than many humanoid peers.|
|**Physical Intelligence**|Robotics foundation models|General-purpose robot intelligence|Important if foundation-model logic transfers into robotics.|
|**Apptronik**|Humanoid robots|Industrial humanoid labor|Competing in general-purpose robot hardware.|
|**Tesla**|Optimus|Humanoid robot + manufacturing data advantage|Potentially huge if Tesla converts factory data and manufacturing scale into robotics advantage.|
|**Scale AI / specialized data firms**|Robotics data collection and annotation|Human data layer for physical AI|Human-derived robotics data is becoming more important; recent reports highlight investment into human data layers for physical AI and robotics.|

**Why it matters:**  
Robotics will not be bottlenecked by language intelligence alone. It needs **safe motion, manipulation, perception, simulation-to-real transfer, and real-world feedback loops**. The physical world has far more edge cases than chat.

---

# **My ranking of the most significant underappreciated bottlenecks**

If I had to rank them by importance and market potential:

|**Rank**|**Bottleneck**|**Why it matters**|
|---|---|---|
|1|**Power and grid access**|Without electricity, GPUs do not matter. This is becoming the hard physical constraint.|
|2|**Inference memory / KV cache**|AI usage shifts from training to serving; long-context agents make memory the pain point.|
|3|**Networking / interconnect**|Large clusters only work if GPUs can communicate efficiently.|
|4|**Cooling / thermal density**|High-density AI racks require new facility designs.|
|5|**Evaluation and observability**|Enterprises need measurable reliability before deploying agents deeply.|
|6|**Data quality / human feedback**|Better post-training data may matter more than just larger models.|
|7|**Enterprise data integration / RAG**|Most enterprise AI value depends on safe access to internal context.|
|8|**AI security**|Agents create new attack surfaces.|
|9|**AI cloud scarcity**|GPU access remains unevenly distributed.|
|10|**Robotics data**|Physical AI needs data and feedback loops that are much harder than text.|

# **The bigger thesis**

The AI industry is moving from a **model race** to an **infrastructure, reliability, and deployment race**. The next set of winners may not only be model labs like OpenAI, Anthropic, Google DeepMind, or xAI. They may be the companies solving hidden constraints: HBM, memory expansion, interconnects, optical networking, power equipment, cooling, data-center construction, evaluation tooling, secure RAG, and AI observability.

The cleanest way to think about it:

**Phase 1 AI winners:** model labs and GPU makers.  
**Phase 2 AI winners:** cloud GPU providers, HBM suppliers, networking/interconnect companies, power/cooling infrastructure.  
**Phase 3 AI winners:** evals, observability, data-quality, security, enterprise workflow integration, and robotics data.

For an investment or business-building lens, I would pay special attention to the “boring but essential” layers: **power, cooling, memory, networking, evals, and enterprise data integration**. These are less hyped than consumer AI apps, but they solve problems that every serious AI company eventually runs into.

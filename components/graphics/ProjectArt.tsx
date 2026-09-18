import type { CSSProperties } from "react";

export function projectKind(slug: string): "market" | "agents" | "knowledge" | "watch" {
  if (/market|finance|macro/.test(slug)) return "market";
  if (/brain|knowledge/.test(slug)) return "knowledge";
  if (/watch|horolog/.test(slug)) return "watch";
  return "agents";
}

export default function ProjectArt({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const kind = projectKind(slug);
  return (
    <div className={`project-art art-${kind} ${compact ? "art-compact" : ""}`} aria-hidden="true">
      <div className="art-grid" />
      {kind === "market" && <div className="market-object">
        <div className="object-toolbar"><span className="object-dot" /> MARKET LEDGER <span>POSITIONING ARCHIVE</span></div>
        <div className="market-object-body"><div className="mini-sidebar"><b>Overview</b><span>Commodities</span><span>Currencies</span><span>Indices</span><span>Rates</span></div>
          <div className="mini-chart"><div className="mini-chart-head"><span>Reading the market.</span><b>36 <small>markets</small></b></div>
            <svg viewBox="0 0 400 150"><path d="M0 35H400M0 75H400M0 115H400" fill="none" stroke="currentColor" opacity=".12" />
              <path d="M0 118L20 110L40 116L60 95L80 104L100 83L120 91L140 62L160 80L180 68L200 76L220 44L240 60L260 32L280 46L300 26L320 38L340 16L360 25L380 9L400 19" fill="none" stroke="#63826c" strokeWidth="3"/>
              <path d="M0 132L30 126L60 133L90 120L120 124L150 111L180 118L210 107L240 113L270 95L300 105L330 84L360 94L400 80" fill="none" stroke="#b48974" strokeWidth="2"/>
            </svg><div className="mini-chart-foot"><span>Price history</span><span>Weekly positioning</span></div>
          </div>
        </div>
      </div>}
      {kind === "agents" && <div className="agent-object">
        <div className="agent-input">A question worth exploring <span>↗</span></div>
        <div className="agent-line" /><div className="agent-core"><span>✳</span> Orchestrator</div>
        <div className="agent-branches" /><div className="agent-team">{["Research", "Build", "Synthesis"].map((v,i)=><div key={v}><span>{["⌕","⌘","≋"][i]}</span>{v}<small>Specialist 0{i+1}</small></div>)}</div>
        <div className="agent-result"><i /> One considered response</div>
      </div>}
      {kind === "knowledge" && <div className="knowledge-object">
        {[0,1,2].map((i)=><div className="knowledge-sheet" key={i} style={{"--sheet":i} as CSSProperties}><span className="sheet-meta">0{i+1} / {["SOURCES","CONNECTIONS","CONTEXT"][i]}</span><div className="sheet-title">{["Capture anything.","Connect the ideas.","Think with it."][i]}</div><div className="sheet-lines"><i/><i/><i/></div></div>)}
        <div className="knowledge-orbit"><span/><span/><span/><span/></div>
      </div>}
      {kind === "watch" && <div className="watch-object"><div className="watch-strap"/><div className="watch-crown"/><div className="watch-case"><div className="watch-dial">
        {Array.from({length:60},(_,i)=><i key={i} className={i%5===0?"hour-mark":""} style={{transform:`rotate(${i*6}deg)`} as CSSProperties}/>)}
        <span className="watch-brand">FORM & FEEL</span><span className="watch-hour"/><span className="watch-minute"/><span className="watch-pin"/><span className="watch-subdial">60</span><span className="watch-caption">INDEPENDENT SPIRIT</span>
      </div></div></div>}
      <div className="art-caption"><span>{({market:"SIGNAL / CONTEXT",agents:"INTENT / EXECUTION",knowledge:"INFORMATION / UNDERSTANDING",watch:"MECHANISM / EMOTION"})[kind]}</span><span>FIG. {({market:"01",agents:"02",knowledge:"03",watch:"04"})[kind]}</span></div>
    </div>
  );
}

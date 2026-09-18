"use client";

import { useRef, useState, type CSSProperties } from "react";
import { useMotionPref } from "@/components/Preferences";
import type { Site } from "@/lib/content";

const layers = [
  { name: "Intent", detail: "Start with a question worth asking.", tint: "clay" },
  { name: "Structure", detail: "Give the idea a system to live in.", tint: "sage" },
  { name: "Craft", detail: "Make the details earn their place.", tint: "lilac" },
];

export default function Hero({site}:{site:Site}) {
  const [active,setActive]=useState(1);
  const [spread,setSpread]=useState(55);
  const scene=useRef<HTMLDivElement>(null);
  const reduced=useMotionPref();
  return <section className="new-hero">
    <div className="container-edge hero-grid">
      <div className="hero-copy">
        <p className="hero-eyebrow"><span/> Independent practice · {site.location}</p>
        <h1>Systems that<br/>hold <em>attention.</em></h1>
        <p className="hero-subtitle">Long after the novelty fades.</p>
        <p className="hero-description">Agents, markets, and mechanical watches.<br className="desktop-break"/> Building useful things. Studying what makes them tick.</p>
        <div className="hero-actions"><a href="#projects" className="btn-solid">Explore the work <span aria-hidden="true">↗</span></a><a href="#about" className="text-link">Meet the builder <span aria-hidden="true">→</span></a></div>
        <div className="hero-footnote"><span className="small-cross">+</span> Technology, with a considered point of view.</div>
      </div>
      <div className="hero-exhibit">
        <div className="exhibit-topline"><span>ANATOMY OF A PRACTICE</span><span>OBJECT / 001</span></div>
        <div ref={scene} className="sculpture-scene" style={{"--spread":spread+"px"} as CSSProperties}
          onPointerMove={e=>{if(reduced||e.pointerType!=="mouse")return;const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty("--tilt",((e.clientX-r.left)/r.width*12-6)+"deg");}}
          onPointerLeave={()=>scene.current?.style.setProperty("--tilt","0deg")}>
          <div className="sculpture-shadow"/>
          <div className="sculpture">
            {layers.map((layer,i)=><div key={layer.name} className={`sculpture-layer layer-${i} ${active===i?"is-active":""}`} style={{"--layer":i} as CSSProperties} aria-hidden="true">
              <span className="plate-index">0{i+1}</span><span className="plate-rings"/><span className="plate-core"/><span className="plate-line"/><span className="plate-name">{layer.name}</span>
            </div>)}
          </div>
          <div className="sculpture-axis" aria-hidden="true"/><span className="axis-label" aria-hidden="true">A—A</span>
        </div>
        <div className="layer-selectors" role="group" aria-label="Inspect a layer">{layers.map((layer,i)=><button key={layer.name} type="button" aria-label={"Inspect "+layer.name} aria-pressed={active===i} onClick={()=>setActive(i)}><span className={"material-dot "+layer.tint}/>{layer.name}</button>)}</div>
        <div className="exhibit-caption" aria-live="polite"><span className={"material-dot "+layers[active].tint}/><div><strong>{layers[active].name}</strong><span>{layers[active].detail}</span></div><span className="exhibit-index">0{active+1}/03</span></div>
        <label className="assembly-control"><span>Assembled</span><input type="range" min="12" max="85" value={spread} onChange={e=>setSpread(Number(e.target.value))} aria-label="Separate the layers" aria-valuetext={spread<35?"Assembled":spread>65?"Exploded":"Partially separated"}/><span>Exploded</span></label>
      </div>
    </div>
    <div className="discipline-rail container-edge"><span className="rail-intro">A few connected obsessions</span><div>{["Agentic systems","Knowledge architecture","Financial markets","Independent horology"].map(v=><span key={v}><i/> {v}</span>)}</div><a href="#projects" aria-label="Scroll to selected work">↓</a></div>
  </section>;
}

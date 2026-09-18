"use client";

import { useState, useId } from "react";
import ProjectArt from "@/components/graphics/ProjectArt";

const studies = [
  { label: "Agent systems", slug: "openclaw", eyebrow: "INTENT → COORDINATION → OUTCOME", title: "The right mind for the task.", intro: "A useful agent system is a set of clear responsibilities. Follow a request from the first question to the final response.", steps: [
    {name:"Receive",text:"Start with intent. A request arrives through one familiar interface, with its context and constraints intact."},
    {name:"Coordinate",text:"Route the work to a specialist. Research, code, and synthesis need different tools and different kinds of attention."},
    {name:"Review",text:"Bring the pieces back together. Check the result, preserve the context, and keep human judgement in the loop."}
  ]},
  { label: "Second brain", slug: "second-brain", eyebrow: "CAPTURE → CONNECT → COMPOUND", title: "Knowledge that gets more useful.", intro: "The value of a note is what it connects to. Explore the three layers behind a living, markdown-native knowledge system.", steps: [
    {name:"Capture",text:"Keep the raw material. Articles, conversations, and observations enter a source layer without losing their provenance."},
    {name:"Connect",text:"Turn fragments into understanding. A maintained wiki draws connections and keeps related ideas within reach."},
    {name:"Compound",text:"Give each session a starting point. Persistent context helps the next question build on what is already known."}
  ]},
  { label: "Horology", slug: "watch-roll", eyebrow: "ENERGY → REGULATION → EXPRESSION", title: "Precision, with a human touch.", intro: "A mechanical watch makes an invisible system tangible. Its appeal lives in both the mechanism and the feeling it creates.", steps: [
    {name:"Store",text:"A wound mainspring stores potential energy. An ordinary gesture becomes the power for the hours ahead."},
    {name:"Regulate",text:"An escapement meters the release of energy. Small, repeated decisions turn force into a reliable rhythm."},
    {name:"Express",text:"The dial makes that rhythm legible. Proportion, texture, and finishing turn an instrument into an object of affection."}
  ]}
];

export default function SystemPlayground() {
  const [active,setActive]=useState(0);
  const [step,setStep]=useState(0);
  const id=useId();
  const study=studies[active];
  function select(index:number){setActive(index);setStep(0);}
  return <section className="study-section" aria-labelledby={id+"-heading"}>
    <div className="container-edge">
      <div className="section-heading"><div><p className="eyebrow">02 / Beneath the surface</p><h2 id={id+"-heading"}>The interesting part<br/>is how it <em>works.</em></h2></div><p>Different disciplines. The same curiosity.<br/>Take a closer look at the mechanisms.</p></div>
      <div className="study-tabs" role="tablist" aria-label="Explore a mechanism">
        {studies.map((s,i)=><button key={s.slug} role="tab" id={id+"-tab-"+i} aria-controls={id+"-panel"} aria-selected={active===i} tabIndex={active===i?0:-1} onClick={()=>select(i)} onKeyDown={e=>{let n=i;if(e.key==="ArrowRight")n=(i+1)%studies.length;else if(e.key==="ArrowLeft")n=(i+studies.length-1)%studies.length;else if(e.key==="Home")n=0;else if(e.key==="End")n=studies.length-1;else return;e.preventDefault();select(n);document.getElementById(id+"-tab-"+n)?.focus();}}><span>0{i+1}</span>{s.label}</button>)}
      </div>
      <div className="study-panel" id={id+"-panel"} role="tabpanel" aria-labelledby={id+"-tab-"+active}>
        <div className="study-visual" data-step={step}><ProjectArt slug={study.slug}/><div className="study-progress" aria-hidden="true">{study.steps.map((s,i)=><span key={s.name} className={i<=step?"is-lit":""}/>)}</div><p className="study-visual-caption">Conceptual model · {study.steps[step].name}</p></div>
        <div className="study-copy"><p className="eyebrow">{study.eyebrow}</p><h3>{study.title}</h3><p>{study.intro}</p>
          <div className="study-steps" role="group" aria-label="Explore each stage">{study.steps.map((s,i)=><button key={s.name} aria-pressed={step===i} onClick={()=>setStep(i)}><span>0{i+1}</span>{s.name}</button>)}</div>
          <div className="study-detail" aria-live="polite"><h4>{study.steps[step].name}</h4><p>{study.steps[step].text}</p></div>
          <a className="text-link" href={active===2?"/#explorations":"/projects/"+study.slug}>{active===2?"Explore the interests":"Read the case study"} <span>↗</span></a>
        </div>
      </div>
    </div>
  </section>;
}

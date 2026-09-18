import type { Site } from "@/lib/content";

export default function About({site}:{site:Site}){
  const paragraphs=site.about.split(/\n\s*\n/).map(p=>p.trim()).filter(Boolean);
  return <section id="about" className="about-section container-edge">
    <div className="section-heading"><div><p className="eyebrow">03 / The person behind the practice</p><h2>Curiosity is the<br/><em>common thread.</em></h2></div><p>{site.tagline}</p></div>
    <div className="about-grid"><div className="about-statement"><span className="about-asterisk" aria-hidden="true">✳</span><blockquote>{site.intro}</blockquote><span className="eyebrow">Hakyun Ryu · {site.location}</span></div>
    <div className="about-copy"><p>{paragraphs[1]||paragraphs[0]}</p>{paragraphs[2]&&<p>{paragraphs[2]}</p>}
      {paragraphs.length>3&&<details className="bio-details"><summary>More about the practice <span>+</span></summary><div>{paragraphs.slice(3).map((p,i)=><p key={i}>{p}</p>)}</div></details>}
      <div className="focus-tags">{site.marquee.map(s=><span key={s}>{s}</span>)}</div>
    </div></div>
    {site.manifesto.length>0&&<div className="principle-grid">{site.manifesto.map((p,i)=><div key={i}><span className="eyebrow">0{i+1}</span><p>{p}</p></div>)}</div>}
    {site.timeline.length>0&&<ol className="practice-timeline">{site.timeline.map((t,i)=><li key={i}><span className="eyebrow">{t.period}</span><h3>{t.title}</h3>{t.detail&&<p>{t.detail}</p>}</li>)}</ol>}
  </section>;
}

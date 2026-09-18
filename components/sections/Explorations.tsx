import type { Interest } from "@/lib/content";

export default function Explorations({interests}:{interests:Interest[]}){
  if(!interests.length)return null;
  return <section id="explorations" className="interests-section"><div className="container-edge interests-grid">
    <div className="interests-intro"><p className="eyebrow">04 / Currently exploring</p><h2>A wider<br/>field of <em>view.</em></h2><p>Some interests become projects.<br/>Others change the way I see.</p><div className="orbital-mark" aria-hidden="true"><i/><i/><i/><span>+</span></div></div>
    <div className="interest-list">{interests.map((item,i)=><details key={item.slug} className="interest-item" name="interests"><summary><span className="interest-number">0{i+1}</span><div><h3>{item.title}</h3><p>{item.caption}</p></div><span className="interest-expand" aria-hidden="true">+</span></summary><div className="prose-editorial interest-body" dangerouslySetInnerHTML={{__html:item.bodyHtml}}/></details>)}</div>
  </div></section>;
}

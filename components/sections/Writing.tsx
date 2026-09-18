import Link from "next/link";
import type { Essay } from "@/lib/content";

export default function Writing({essays}:{essays:Essay[];index?:string}){
  if(!essays.length)return null;
  return <section id="writing" className="writing-section container-edge"><div className="section-heading"><div><p className="eyebrow">05 / Notes from the practice</p><h2>Thinking, slowly,<br/><em>in public.</em></h2></div><Link href="/writing" className="text-link">All writing <span>↗</span></Link></div>
    <div className="essay-grid">{essays.slice(0,3).map((e,i)=><Link href={"/writing/"+e.slug} key={e.slug} className={"essay-card essay-tone-"+i}><div className="essay-top"><span>{e.tag||"Essay"}</span><span>{e.readingMins} min read</span></div><div className="essay-symbol" aria-hidden="true">{["∴","≈","↗"][i]}</div><h3>{e.title}</h3><p>{e.excerpt}</p><div className="essay-bottom"><time dateTime={e.date}>{e.date?new Date(e.date+"T00:00:00Z").toLocaleDateString("en-SG",{month:"short",year:"numeric",timeZone:"UTC"}):"From the archive"}</time><span aria-hidden="true">↗</span></div></Link>)}</div>
    <div className="library-callout"><div><p className="eyebrow">The working library</p><h3>The raw material behind the ideas.</h3><p>Knowledge notes, field observations, and a considered reading list.</p></div><Link className="btn-outline" href="/library">Browse the library <span>↗</span></Link></div>
  </section>;
}

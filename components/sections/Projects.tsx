import Link from "next/link";
import SafeImage from "@/components/ui/SafeImage";
import ProjectArt from "@/components/graphics/ProjectArt";
import type { Project } from "@/lib/content";

export default function Projects({projects, indexPage=false}:{projects:Project[];indexPage?:boolean}){
  const selected=projects.filter(p=>p.status!=="archive");
  return <section id="projects" className={"work-section container-edge"+(indexPage?" work-index":"")}>
    {!indexPage&&<div className="section-heading"><div><p className="eyebrow">01 / Selected work</p><h2>Ideas, made <em>useful.</em></h2></div><Link href="/projects" className="text-link">All projects <span>↗</span></Link></div>}
    <div className="work-grid">{selected.map((project,i)=><Link href={"/projects/"+project.slug} key={project.slug} className="work-card">
      <div className="work-cover">{project.cover?<SafeImage src={project.cover} alt={project.title+" cover"} sizes="(min-width: 768px) 45vw, 100vw"/>:<ProjectArt slug={project.slug}/>}<span className="work-open" aria-hidden="true">↗</span></div>
      <div className="work-meta"><span>{project.domain}</span><span>{project.year}</span></div><h3>{project.title}</h3><p>{project.summary}</p><span className="work-link">Explore case study <span aria-hidden="true">→</span></span>
    </Link>)}</div>
    {!selected.length&&<p className="empty-note">New projects are taking shape. Explore the writing in the meantime.</p>}
  </section>;
}

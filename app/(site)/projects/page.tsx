import Projects from "@/components/sections/Projects";
import { getProjects } from "@/lib/content";

export const metadata={title:"Projects",description:"Selected work and case studies — AI systems, data tooling, and thoughtful interfaces."};

export default async function ProjectsIndexPage(){
  const projects=await getProjects();
  return <div className="project-index-page"><header className="container-edge page-heading"><p className="eyebrow">The project index</p><h1>Ideas, made <em>useful.</em></h1><p>Independent projects across agents, knowledge, markets, and design.<br/>Built to answer a question. Refined through use.</p></header><Projects projects={projects} indexPage/></div>;
}

import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { getProject, getProjects } from "@/lib/content";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const projects = await getProjects();
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="pt-40 md:pt-48 pb-24">
      <header className="container-edge mb-20 md:mb-32">
        <Reveal>
          <Link
            href="/projects"
            className="label text-stone-500 underline-grow"
          >
            ← All projects
          </Link>
        </Reveal>

        <div className="grid grid-cols-12 gap-6 mt-12">
          <div className="col-span-12 md:col-span-3 space-y-8">
            <Reveal delay={0.05}>
              <div>
                <div className="label">Domain</div>
                <div className="mt-2 text-stone-700">{project.domain}</div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <div className="label">Year</div>
                <div className="mt-2 text-stone-700 tabular-nums">
                  {project.year}
                </div>
              </div>
            </Reveal>
            {project.role && (
              <Reveal delay={0.15}>
                <div>
                  <div className="label">Role</div>
                  <div className="mt-2 text-stone-700">{project.role}</div>
                </div>
              </Reveal>
            )}
            {project.stack && project.stack.length > 0 && (
              <Reveal delay={0.2}>
                <div>
                  <div className="label">Stack</div>
                  <ul className="mt-2 space-y-1 text-stone-700">
                    {project.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>

          <div className="col-span-12 md:col-span-9">
            <Reveal>
              <div className="label text-stone-500 mb-6">
                Case Study · {project.client || "Independent"}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="display-1">
                {project.title}
                {project.client && (
                  <span className="text-stone-400 italic block md:inline">
                    {" "}— {project.client}
                  </span>
                )}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-10 max-w-2xl font-serif text-2xl md:text-3xl leading-snug tracking-tight text-stone-600">
                {project.summary}
              </p>
            </Reveal>
          </div>
        </div>
      </header>

      {project.cover && (
        <div className="container-edge mb-24 md:mb-32">
          <Reveal>
            <div
              className="w-full aspect-[16/9] bg-stone-100"
              style={{
                backgroundImage: `url(${project.cover})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </Reveal>
        </div>
      )}

      <div className="container-edge">
        <div className="grid grid-cols-12 gap-6">
          <div className="hidden md:block md:col-span-3" />
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <div
                className="prose-editorial"
                dangerouslySetInnerHTML={{ __html: project.bodyHtml }}
              />
            </Reveal>

            {project.links && project.links.length > 0 && (
              <div className="mt-16 pt-8 border-t border-ink/15">
                <div className="label mb-4">Outbound</div>
                <ul className="space-y-2">
                  {project.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-serif text-2xl tracking-tight underline-grow"
                      >
                        {l.label} →
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {next && next.slug !== project.slug && (
        <div className="container-edge mt-32 md:mt-48 pt-10 border-t border-ink/15">
          <Link
            href={`/projects/${next.slug}`}
            className="grid grid-cols-12 gap-6 group items-end"
          >
            <div className="col-span-12 md:col-span-3 label text-stone-500">
              Next project →
            </div>
            <div className="col-span-12 md:col-span-9">
              <div className="font-serif text-5xl md:text-7xl tracking-tightest leading-[1.02] group-hover:translate-x-3 transition-transform duration-700 ease-editorial">
                {next.title}
                {next.client && (
                  <span className="text-stone-400 italic ml-3">
                    — {next.client}
                  </span>
                )}
              </div>
            </div>
          </Link>
        </div>
      )}
    </article>
  );
}

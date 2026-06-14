import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import SafeImage from "@/components/ui/SafeImage";
import ImageCarousel from "@/components/motion/ImageCarousel";
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `https://hkryu.space/projects/${project.slug}`,
    author: { "@type": "Person", name: "hkryu", url: "https://hkryu.space" },
    dateCreated: project.year,
    ...(project.cover ? { image: `https://hkryu.space${project.cover}` } : {}),
  };

  return (
    <article className="pt-40 md:pt-48 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            <div className="relative w-full aspect-[16/9] bg-stone-100">
              <SafeImage src={project.cover} alt={project.title} sizes="100vw" />
            </div>
          </Reveal>
        </div>
      )}

      <div className="container-edge">
        <div className="grid grid-cols-12 gap-6">
          <div className="hidden md:block md:col-span-3" />
          <div className="col-span-12 md:col-span-7">
            {project.problem && (
              <Reveal>
                <div className="mb-14">
                  <h2 className="label mb-4">The problem</h2>
                  <p className="font-serif text-2xl md:text-3xl leading-snug tracking-tight text-stone-700">
                    {project.problem}
                  </p>
                </div>
              </Reveal>
            )}

            <Reveal>
              <div
                className="prose-editorial"
                dangerouslySetInnerHTML={{ __html: project.bodyHtml }}
              />
            </Reveal>

            {project.images && project.images.length > 0 && (
              <Reveal>
                <ImageCarousel images={project.images} title={project.title} />
              </Reveal>
            )}

            {project.outcome && (
              <Reveal>
                <div className="mt-14 border-l-2 border-butter pl-6">
                  <h2 className="label mb-3">Outcome</h2>
                  <p className="text-stone-700 text-lg leading-relaxed">{project.outcome}</p>
                </div>
              </Reveal>
            )}

            {project.metrics && project.metrics.length > 0 && (
              <Reveal>
                <div className="mt-14">
                  <h2 className="label mb-5">By the numbers</h2>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink/10 border border-ink/10">
                    {project.metrics.map((m) => {
                      const [value, ...rest] = m.split("—").map((s) => s.trim());
                      return (
                        <div key={m} className="bg-paper p-6">
                          <dt className="sr-only">{rest.join(" — ") || value}</dt>
                          <dd>
                            <span className="font-serif text-4xl block">{value}</span>
                            {rest.length > 0 && (
                              <span className="text-stone-600 text-sm mt-1 block">
                                {rest.join(" — ")}
                              </span>
                            )}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              </Reveal>
            )}

            {project.testimonial && (
              <Reveal>
                <blockquote className="mt-14 border border-ink/15 bg-ivory p-8">
                  <p className="font-serif text-2xl italic leading-snug">
                    “{project.testimonial.quote}”
                  </p>
                  {project.testimonial.by && (
                    <cite className="block mt-4 not-italic font-mono text-sm text-stone-500">
                      — {project.testimonial.by}
                    </cite>
                  )}
                </blockquote>
              </Reveal>
            )}

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

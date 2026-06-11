/*
 * Projects overview — thumbnail grid of all projects (selected + archive),
 * each with cover (or a monogram placeholder) and a brief summary.
 */

import Link from "next/link";
import Reveal from "@/components/Reveal";
import SafeImage from "@/components/ui/SafeImage";
import { getProjects } from "@/lib/content";

export const metadata = {
  title: "Projects",
  description: "Selected work and case studies — AI systems, data tooling, and quiet infrastructure.",
};

export default async function ProjectsIndexPage() {
  const projects = await getProjects();

  return (
    <div className="container-edge pt-40 md:pt-48 pb-24">
      <Reveal>
        <p className="eyebrow mb-4">Selected Work</p>
        <h1 className="display-2 max-w-3xl">Projects &amp; case studies.</h1>
      </Reveal>

      <ul className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10 list-none">
        {projects.map((p, i) => (
          <li key={p.slug} className="bg-paper">
            <Reveal delay={(i % 3) * 0.06}>
              <Link
                href={`/projects/${p.slug}`}
                className="group block p-7 md:p-8 h-full hover:bg-ivory transition-colors duration-300"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-ivory border border-ink/10 mb-6">
                  {p.cover ? (
                    <SafeImage
                      src={p.cover}
                      alt={`${p.title} cover`}
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                      className="transition-transform duration-700 ease-editorial group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div
                      aria-hidden
                      className="absolute inset-0 grid place-items-center wash-sage"
                    >
                      <span className="font-serif text-7xl text-stone-300 select-none">
                        {p.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <h2 className="font-serif text-2xl tracking-tight">{p.title}</h2>
                  <span className="font-mono text-sm text-stone-500 tabular-nums shrink-0">
                    {p.year}
                  </span>
                </div>
                <p className="text-stone-600 text-sm leading-relaxed">{p.summary}</p>
                <span className="mt-4 inline-block label underline-grow group-hover:text-ink">
                  Read case study →
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}

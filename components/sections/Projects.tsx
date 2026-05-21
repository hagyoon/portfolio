/* ──────────────────────────────────────────────────────────────────────────
 * Projects — editorial grid of selected work.
 *
 * Reads from /content/projects.ts.
 * Each project has an image (optional) and links to /projects/<slug>
 * for the full case study (markdown file in /content/projects/<slug>.md).
 *
 * Layout: alternating asymmetric editorial blocks. Not uniform cards.
 * ────────────────────────────────────────────────────────────────────────── */

import Link from "next/link";
import Reveal from "@/components/Reveal";
import SafeImage from "@/components/ui/SafeImage";
import { projects } from "@/content/projects";

export default function Projects() {
  return (
    <section id="projects" className="container-edge pt-32 md:pt-48">

      {/* ── Section header ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
        <div className="col-span-12 md:col-span-3">
          <Reveal>
            <div className="label">Selected Work</div>
            <div className="mt-3 text-stone-500 text-sm">
              ({String(projects.length).padStart(2, "0")})
            </div>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-9">
          <Reveal>
            <h2 className="display-2">
              Work treated as <em className="text-clay">considered</em>{" "}
              <br className="hidden md:block" />
              objects, not deliverables.
            </h2>
          </Reveal>
        </div>
      </div>

      {/* ── Project list ───────────────────────────────────────────────── */}
      <div className="border-t border-ink/15">
        {projects.map((project, index) => {
          const flip = index % 2 === 1; // alternate the image side

          return (
            <Reveal key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block border-b border-ink/15 py-12 md:py-20"
              >
                <div className="grid grid-cols-12 gap-6 md:gap-10 items-center">

                  {/* ── Number ────────────────────────────────────────── */}
                  <div className="col-span-2 md:col-span-1 label text-stone-400 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* ── Image (flips side based on index) ─────────────── */}
                  {project.image && (
                    <div
                      className={`col-span-10 md:col-span-5 ${
                        flip ? "md:order-3" : ""
                      }`}
                    >
                      <div
                        className={`relative w-full overflow-hidden ${
                          project.imageAspect === "portrait"
                            ? "aspect-[4/5]"
                            : project.imageAspect === "square"
                            ? "aspect-square"
                            : "aspect-[16/10]"
                        }`}
                      >
                        <SafeImage
                          src={project.image}
                          alt={project.title}
                          sizes="(min-width: 768px) 40vw, 100vw"
                          className="transition-transform duration-1000 ease-editorial group-hover:scale-[1.02]"
                        />
                      </div>
                    </div>
                  )}

                  {/* ── Text block ────────────────────────────────────── */}
                  <div
                    className={`col-span-12 md:col-span-6 ${
                      project.image && !flip ? "" : ""
                    }`}
                  >
                    <div className="flex items-baseline gap-4 mb-3">
                      <h3 className="font-serif text-3xl md:text-5xl tracking-tightest leading-[1.05]">
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 mb-5">
                      <span className="label text-stone-500">{project.domain}</span>
                      <span className="label text-stone-400 tabular-nums">{project.year}</span>
                    </div>
                    <p className="max-w-lg text-stone-600 text-sm md:text-base leading-relaxed">
                      {project.summary}
                    </p>
                    <div className="mt-6 label text-stone-500 underline-grow inline-block">
                      View case study →
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

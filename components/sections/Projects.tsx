"use client";

/*
 * Projects — alternating editorial rows. Covers parallax inside their frame
 * and scale on hover; rows reveal with a soft clip as they enter.
 */

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ParallaxInner } from "@/components/motion/Parallax";
import SafeImage from "@/components/ui/SafeImage";
import type { Project } from "@/lib/content";

export default function Projects({ projects }: { projects: Project[] }) {
  const selected = projects.filter((p) => p.status !== "archive");

  return (
    <section id="projects" className="container-edge pt-32 md:pt-44">
      {/* Section header */}
      <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
        <div className="col-span-12 md:col-span-3">
          <Reveal>
            <div className="eyebrow">Selected Work</div>
            <div className="mt-3 text-stone-500 text-sm">
              ({String(selected.length).padStart(2, "0")})
            </div>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-9">
          <Reveal>
            <h2 className="display-2">
              Projects treated with <em className="text-blush">intention</em>,{" "}
              <br className="hidden md:block" />
              with people and ideas I believe in.
            </h2>
          </Reveal>
        </div>
      </div>

      {/* Project rows */}
      <div className="border-t border-ink/15">
        {selected.map((project, index) => {
          const flip = index % 2 === 1;

          return (
            <Reveal key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block border-b border-ink/15 py-12 md:py-20"
              >
                <div className="grid grid-cols-12 gap-6 md:gap-10 items-center">
                  <div className="col-span-2 md:col-span-1 label text-stone-400 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {project.cover && (
                    <div className={`col-span-10 md:col-span-5 ${flip ? "md:order-3" : ""}`}>
                      <div className="relative w-full overflow-hidden aspect-[16/10]">
                        <div className="absolute inset-0 transition-transform duration-1000 ease-editorial group-hover:scale-[1.04]">
                          <ParallaxInner amount={6}>
                            <div className="relative w-full h-[112%]">
                              <SafeImage
                                src={project.cover}
                                alt={project.title}
                                sizes="(min-width: 768px) 40vw, 100vw"
                              />
                            </div>
                          </ParallaxInner>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="col-span-12 md:col-span-6">
                    <h3 className="font-serif text-3xl md:text-5xl tracking-tightest leading-[1.05] mb-3">
                      {project.title}
                    </h3>
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

"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";
import type { Project } from "@/lib/content";

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const numberOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.2, 1, 1, 0.2]);

  return (
    <motion.a
      ref={ref}
      href={`/projects/${project.slug}`}
      className="group grid grid-cols-12 gap-6 py-10 md:py-14 border-t border-ink/15 items-start"
      whileHover="hover"
    >
      <motion.div
        style={{ opacity: numberOpacity }}
        className="col-span-2 md:col-span-1 label text-stone-500 tabular-nums"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.div>

      <div className="col-span-10 md:col-span-7">
        <div className="font-serif text-3xl md:text-5xl tracking-tightest leading-[1.02]">
          <span className="block">
            <motion.span
              variants={{ hover: { x: 8 } }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {project.title}
            </motion.span>
            {project.client && (
              <motion.span
                variants={{ hover: { opacity: 0.7 } }}
                transition={{ duration: 0.6 }}
                className="text-stone-400 italic ml-3"
              >
                — {project.client}
              </motion.span>
            )}
          </span>
        </div>
        <p className="mt-4 max-w-xl text-stone-600 text-sm md:text-base leading-relaxed">
          {project.summary}
        </p>
      </div>

      <div className="hidden md:block md:col-span-2 label text-stone-500">
        {project.domain}
      </div>
      <div className="col-span-12 md:col-span-2 label text-stone-500 tabular-nums">
        {project.year}
        <motion.span
          variants={{ hover: { x: 4, opacity: 1 } }}
          initial={{ opacity: 0.5 }}
          transition={{ duration: 0.6 }}
          className="ml-2 inline-block"
        >
          →
        </motion.span>
      </div>
    </motion.a>
  );
}

export default function SelectedProjects({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="container-edge pt-32 md:pt-48">
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

      <div>
        {projects.map((p, i) => (
          <ProjectRow key={p.slug} project={p} index={i} />
        ))}
        <div className="border-t border-ink/15 pt-10 flex justify-end">
          <Link href="/projects" className="label underline-grow">
            View full index →
          </Link>
        </div>
      </div>
    </section>
  );
}

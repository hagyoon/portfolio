"use client";

/*
 * Hero — statement-led, no name. A quiet monospaced eyebrow, a large light
 * Garamond thesis about the practice, and a single ghost word cropped by
 * the bottom edge of the viewport. The whole block eases and fades as the
 * visitor scrolls (desktop only; on small screens it flows normally).
 *
 * Copy lives here rather than site.md so the hero can be composed line by
 * line. Edit STATEMENT / GHOST / SPECS below.
 */

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import type { Site } from "@/lib/content";

// The thesis — three lines, the middle one in italic
const STATEMENT = {
  a: "Systems that hold",
  b: "attention",
  c: "long after the novelty fades.",
};

// One ghost word, cropped at the fold. Change freely; it's decorative.
const GHOST = "practice";

// Monospaced spec rail — the hero's only supporting type
const SPECS = [
  { k: "Field", v: "Agents · Markets · Horology" },
  { k: "Mode", v: "Independent" },
  { k: "Est.", v: "2026" },
];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export default function Hero({ site }: { site: Site }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  const scale = useTransform(progress, [0, 1], [1, 0.96]);
  const opacity = useTransform(progress, [0, 0.75], [1, 0]);
  const lift = useTransform(progress, [0, 1], ["0%", "-6%"]);
  const ghostY = useTransform(progress, [0, 1], ["0%", "18%"]);
  const ghostX = useTransform(progress, [0, 1], ["0%", "-4%"]);

  return (
    <div ref={ref} className="relative lg:h-[150svh]">
      <section className="lg:sticky top-0 min-h-[100svh] lg:h-[100svh] flex flex-col overflow-hidden">
        {/* Tonal ground — a soft vertical wash, nothing figurative */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-ivory via-paper to-paper"
        />

        {/* Exposed structural grid — four bays, hairline rules */}
        <div aria-hidden className="pointer-events-none absolute inset-0 grid-lines" />

        {/* Ghost word — enormous, outlined, cut off by the fold */}
        <motion.div
          aria-hidden
          style={{ y: ghostY, x: ghostX }}
          className="pointer-events-none absolute -bottom-[0.18em] left-[-0.04em] select-none ghost-type"
        >
          {GHOST}
        </motion.div>

        <motion.div
          style={{ scale, opacity, y: lift }}
          className="flex-1 flex flex-col justify-center origin-left pt-32 pb-16 lg:pt-28 lg:pb-6"
        >
          <div className="container-edge w-full">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-end">
              {/* Statement */}
              <div className="lg:col-span-9">
                <motion.div {...fade(0.1)} className="flex items-center gap-4 mb-10 md:mb-14">
                  <span aria-hidden className="h-1.5 w-1.5 bg-terracotta" />
                  <span className="label">An independent practice — {site.location}</span>
                </motion.div>

                <motion.h1 {...fade(0.3)} className="display-hero max-w-[14ch]">
                  <span className="block">{STATEMENT.a}</span>
                  <span className="block">
                    <em className="editorial-italic">{STATEMENT.b}</em>
                  </span>
                  <span className="block">{STATEMENT.c}</span>
                </motion.h1>

                <motion.p
                  {...fade(0.55)}
                  className="mt-10 md:mt-14 text-base md:text-lg leading-[1.65] text-stone-500 max-w-[44ch]"
                >
                  Agents, markets and mechanical watches — built, studied and
                  written about from Singapore. Work that compounds quietly.
                </motion.p>

                <motion.div {...fade(0.7)} className="mt-9 flex flex-wrap gap-3">
                  <a href="/#projects" className="btn-solid">
                    Selected work <span aria-hidden>↓</span>
                  </a>
                  <a href="/#about" className="btn-outline">
                    The practice <span aria-hidden>→</span>
                  </a>
                </motion.div>
              </div>

              {/* Spec rail — monospaced key/value pairs on a hairline grid */}
              <motion.dl
                {...fade(0.85)}
                className="hidden lg:grid lg:col-span-3 grid-cols-1 gap-px bg-ink/12 border border-ink/12"
              >
                {SPECS.map((s) => (
                  <div key={s.k} className="bg-paper/80 backdrop-blur-sm px-5 py-5">
                    <dt className="label">{s.k}</dt>
                    <dd className="mt-2 font-mono text-[13px] text-ink">{s.v}</dd>
                  </div>
                ))}
              </motion.dl>
            </div>
          </div>
        </motion.div>

        {/* Meta rail */}
        <motion.div style={{ opacity }} className="relative z-10 container-edge w-full pb-8 md:pb-10">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.3, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
            className="h-px bg-ink/20 mb-5"
          />
          <motion.div {...fade(0.9)} className="flex items-center justify-between gap-6 label">
            <span>{site.location}</span>
            <span className="hidden md:flex gap-10">
              <span>Builder</span>
              <span>Collector</span>
              <span>Systems thinker</span>
            </span>
            <span className="flex items-center gap-2">
              Scroll
              <motion.span
                aria-hidden
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                ↓
              </motion.span>
            </span>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

"use client";

/*
 * Hero — a full-bleed architectural frame with the wordmark stacked hard
 * against the left edge, a monospaced spec rail beneath, and an exposed
 * structural grid overlaid. The name scales and lifts away on scroll
 * (desktop only; on small screens the hero flows normally so nothing clips).
 */

import { Fragment, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import SafeImage from "@/components/ui/SafeImage";
import type { Site } from "@/lib/content";

// Monospaced spec rail — the hero's only supporting type
const SPECS = [
  { k: "Practice", v: "Independent" },
  { k: "Focus", v: "Agents · Markets" },
  { k: "Est.", v: "2026" },
];

const fade = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1.1, delay, ease: "easeOut" as const },
});

/*
 * Letters — renders a word as individual letters that lift in a wave on
 * hover. A zero-width space is interleaved so the contiguous name string
 * isn't present in crawlable DOM text; the h1's aria-label carries the
 * accessible label instead.
 */
function Letters({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((ch, i) => (
        <Fragment key={i}>
          <span className="hero-letter">
            <span
              className="inline-block transition-transform duration-500 ease-out group-hover/name:-translate-y-[0.04em]"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {ch}
            </span>
          </span>
          {"​"}
        </Fragment>
      ))}
    </>
  );
}

export default function Hero({ site }: { site: Site }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  const scale = useTransform(progress, [0, 1], [1, 0.94]);
  const opacity = useTransform(progress, [0, 0.8], [1, 0]);
  const lift = useTransform(progress, [0, 1], ["0%", "-8%"]);
  const plateY = useTransform(progress, [0, 1], ["0%", "12%"]);
  const plateScale = useTransform(progress, [0, 1], [1, 1.08]);

  const [first, ...rest] = site.name.split(" ");
  const last = rest.join(" ");

  return (
    <div ref={ref} className="relative lg:h-[160svh]">
      <section className="lg:sticky top-0 min-h-[100svh] lg:h-[100svh] flex flex-col overflow-hidden">
        {/* Architectural plate — full-bleed, heavily dimmed so type stays legible */}
        <motion.div
          aria-hidden
          style={{ y: plateY, scale: plateScale }}
          className="absolute inset-0 -z-10"
        >
          <SafeImage
            src="/images/atmosphere/facade.webp"
            alt=""
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Tonal scrim — grounds the image into the concrete palette */}
          <div className="absolute inset-0 bg-paper/72" />
          <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/40 to-paper/85" />
        </motion.div>

        {/* Exposed structural grid — four bays, hairline rules */}
        <div aria-hidden className="pointer-events-none absolute inset-0 grid-lines" />

        <motion.div
          style={{ scale, opacity, y: lift }}
          className="flex-1 flex flex-col justify-end origin-bottom-left pb-8 pt-32 lg:pt-0"
        >
          <div className="container-edge w-full">
            {/* Standfirst */}
            <motion.div
              {...fade(0.15)}
              className="flex items-center gap-4 mb-8 md:mb-10"
            >
              <span aria-hidden className="h-2 w-2 bg-terracotta" />
              <span className="label text-stone-400">
                Independent practice — {site.location}
              </span>
            </motion.div>

            {/* Wordmark — heavy grotesque, stacked, run to the edge */}
            <h1
              aria-label="hkryu — AI and Systems Builder, Singapore"
              className="group/name display-1 select-none cursor-default"
            >
              <span aria-hidden className="block">
                <Letters text={first} />
              </span>
              <span aria-hidden className="block text-stone-300">
                <Letters text={last} />
              </span>
            </h1>

            {/* Statement + actions */}
            <div className="mt-10 md:mt-14 grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
              <div className="lg:col-span-5">
                <motion.p
                  {...fade(0.5)}
                  className="text-base md:text-lg leading-[1.6] text-stone-500 max-w-[46ch]"
                >
                  {site.tagline}
                </motion.p>
                <motion.div {...fade(0.65)} className="mt-8 flex flex-wrap gap-3">
                  <a href="/#projects" className="btn-solid">
                    Selected work <span aria-hidden>↓</span>
                  </a>
                  <a href="/#contact" className="btn-outline">
                    Get in touch <span aria-hidden>→</span>
                  </a>
                </motion.div>
              </div>

              {/* Spec rail — monospaced key/value pairs on a hairline grid */}
              <motion.dl
                {...fade(0.8)}
                className="hidden lg:grid lg:col-start-8 lg:col-span-5 grid-cols-3 gap-px bg-ink/15 border border-ink/15"
              >
                {SPECS.map((s) => (
                  <div key={s.k} className="bg-paper/70 backdrop-blur-sm px-4 py-5">
                    <dt className="label text-stone-400">{s.k}</dt>
                    <dd className="mt-2 font-mono text-[13px] text-ink">{s.v}</dd>
                  </div>
                ))}
              </motion.dl>
            </div>
          </div>
        </motion.div>

        {/* Meta rail */}
        <motion.div style={{ opacity }} className="container-edge w-full pb-8 md:pb-10">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.3, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
            className="h-px bg-ink/20 mb-5"
          />
          <motion.div
            {...fade(0.8)}
            className="flex items-center justify-between gap-6 label"
          >
            <span>{site.location}</span>
            <span className="hidden md:flex gap-10">
              <span>Builder</span>
              <span>Collector</span>
              <span>Systems Thinker</span>
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

/* ──────────────────────────────────────────────────────────────────────────
 * Hero — editorial opener with reserved media zone.
 *
 * Name sits top-left as a small byline identifier.
 * The large empty field below is reserved for scrolling images / video —
 * drop a MediaReel component here when ready.
 * Bottom strip: location left · disciplines centre · scroll right.
 *
 * Pulls name, location from /content/about.ts.
 * ────────────────────────────────────────────────────────────────────────── */

"use client";

import { motion } from "framer-motion";
import { about } from "@/content/about";

const fade = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1.1, delay, ease: "easeOut" },
});

const rise = (delay: number) => ({
  initial: { y: "110%" },
  animate: { y: 0 },
  transition: { duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden">

      {/* ── Name — small byline, top-left ────────────────────────────────── */}
      <div className="container-edge pt-28 md:pt-32">
        <h1
          aria-label={about.name}
          className="font-serif leading-[0.9] select-none"
          style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.75rem)", letterSpacing: "-0.02em" }}
        >
          <span className="block overflow-hidden">
            <motion.span {...rise(0.2)} className="block text-ink">
              Hakyun
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span {...rise(0.33)} className="block italic text-clay">
              Ryu.
            </motion.span>
          </span>
        </h1>
      </div>

      {/* ── Media zone — reserved for future scrolling images / video ──────
           To populate: drop a <MediaReel /> or <HeroCarousel /> here.
           Currently an open field with the site's grain texture.          ── */}
      <div className="flex-1" />

      {/* ── Bottom strip ─────────────────────────────────────────────────── */}
      <div className="container-edge pb-10 md:pb-14">

        {/* Rule — expands left to right on load */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left" }}
          className="h-px bg-ink/20 mb-7"
        />

        <motion.div {...fade(0.75)} className="flex items-center justify-between">

          {/* Location */}
          <div className="label text-stone-400 flex items-center gap-3">
            <span>{about.location}</span>
            <span className="text-stone-300">·</span>
            <span className="hidden sm:inline text-stone-300">{about.coordinates}</span>
          </div>

          {/* Disciplines — hidden on mobile, centred on desktop */}
          <div className="hidden md:flex gap-10 label text-stone-500">
            <span>Builder</span>
            <span>Collector</span>
            <span>Systems Thinker</span>
          </div>

          {/* Scroll cue */}
          <div className="label text-stone-400 flex items-center gap-2">
            <span>Scroll</span>
            <span>↓</span>
          </div>

        </motion.div>
      </div>

    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * Hero — full-viewport editorial opener.
 *
 * Layout: sparse metadata at top, empty field, name as masthead at bottom,
 * thin rule, discipline strip. Intentionally minimal — like a niche
 * architecture magazine's opening spread.
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
  initial: { y: "108%" },
  animate: { y: 0 },
  transition: { duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export default function Hero() {
  const year = new Date().getFullYear();

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden">

      {/* ── Top metadata bar ─────────────────────────────────────────────── */}
      <div className="container-edge pt-28 md:pt-32">
        <motion.div
          {...fade(0.15)}
          className="flex items-center justify-between"
        >
          {/* Location */}
          <div className="label text-stone-400 flex items-center gap-3">
            <span>{about.location}</span>
            <span className="text-stone-300">·</span>
            <span className="text-stone-300">{about.coordinates}</span>
          </div>

          {/* Year */}
          <div className="label text-stone-400">{year}</div>
        </motion.div>
      </div>

      {/* ── Empty field — the negative space is the composition ──────────── */}
      <div className="flex-1" />

      {/* ── Name + rule + discipline strip ───────────────────────────────── */}
      <div className="container-edge pb-10 md:pb-14">

        {/* Name — masthead scale, pushed to the bottom of the viewport */}
        <h1
          aria-label={about.name}
          className="font-serif leading-[0.86] select-none mb-10 md:mb-14"
          style={{ fontSize: "clamp(5rem, 19.5vw, 20rem)", letterSpacing: "-0.03em" }}
        >
          <span className="block overflow-hidden">
            <motion.span {...rise(0.18)} className="block text-ink">
              Hakyun
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span {...rise(0.32)} className="block italic text-clay">
              Ryu.
            </motion.span>
          </span>
        </h1>

        {/* Thin rule — expands left to right on load */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left" }}
          className="h-px bg-ink/20 mb-7"
        />

        {/* Discipline strip */}
        <motion.div
          {...fade(0.88)}
          className="flex items-center justify-between"
        >
          <div className="flex gap-8 md:gap-14 label text-stone-500">
            <span>Builder</span>
            <span>Collector</span>
            <span className="hidden sm:inline">Systems Thinker</span>
          </div>
          <div className="label text-stone-400 flex items-center gap-2">
            <span>Scroll</span>
            <span>↓</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

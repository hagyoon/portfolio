/* ──────────────────────────────────────────────────────────────────────────
 * Hero — first viewport.
 *
 * Pulls name, descriptor, location, credentials from /content/about.ts.
 * The italic last-name treatment is hardcoded for typographic effect.
 * ────────────────────────────────────────────────────────────────────────── */

"use client";

import { motion } from "framer-motion";
import { about } from "@/content/about";

export default function Hero() {
  const [first, ...rest] = about.name.split(" ");
  const last = rest.join(" ");

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between pt-32 pb-10">
      <div className="container-edge">
        <div className="grid grid-cols-12 gap-6">

          {/* ── Top-left location strip ──────────────────────────────────── */}
          <div className="col-span-12 md:col-span-2 label flex items-start gap-4 text-stone-500">
            <span className="block h-px w-8 bg-stone-300 mt-[10px]" />
            <div className="space-y-1">
              <div>{about.location}</div>
              <div className="text-stone-400">{about.coordinates}</div>
            </div>
          </div>

          {/* ── Name + descriptor ────────────────────────────────────────── */}
          <div className="col-span-12 md:col-span-10">
            <h1 className="display-1 tracking-tightest">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {first}
                </motion.span>
              </span>
              <span className="block overflow-hidden italic text-clay">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {last}.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 md:mt-14 max-w-xl font-sans text-base md:text-lg leading-relaxed text-stone-600"
            >
              {about.tagline}
            </motion.p>
          </div>
        </div>
      </div>

      {/* ── Bottom strip: credentials left, scroll cue right ─────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.9 }}
        className="container-edge mt-10 flex items-end justify-between"
      >
        <div className="label text-stone-500 flex items-center gap-3">
          <span className="block h-px w-12 bg-stone-300" />
          <span>{about.credentials}</span>
        </div>
        <div className="hidden md:flex items-center gap-3 label text-stone-500">
          <span>Scroll</span>
          <span className="inline-block">↓</span>
        </div>
      </motion.div>
    </section>
  );
}

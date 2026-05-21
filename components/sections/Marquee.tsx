/* ──────────────────────────────────────────────────────────────────────────
 * Marquee — sliding ticker strip of italic phrases.
 *
 * Edit the phrases in /content/about.ts → marquee array.
 * Edit speed by changing the `duration` prop here (lower = faster).
 * ────────────────────────────────────────────────────────────────────────── */

"use client";

import { motion } from "framer-motion";
import { about } from "@/content/about";

export default function Marquee() {
  const items = [...about.marquee, ...about.marquee]; // duplicate for seamless loop

  return (
    <section className="border-y border-ink/10 py-6 md:py-7 overflow-hidden">
      <motion.div
        className="flex gap-16 whitespace-nowrap will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 48,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {items.map((word, i) => (
          <span
            key={i}
            className="font-serif italic text-2xl md:text-3xl text-stone-500 tracking-tight"
          >
            {word}
            <span className="mx-10 text-stone-300">◦</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}

"use client";

/*
 * Marquee — steady slow drift. Constant speed, one direction; the strip
 * renders four identical copies and wraps at one copy-width (25%) so the
 * loop is seamless.
 */

import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { useMotionPref } from "@/components/Preferences";

// Percent of the strip per second — one full loop (25%) every ~45 s.
const SPEED = 0.55;

export default function Marquee({ words }: { words: string[] }) {
  const baseX = useMotionValue(0);
  const reduced = useMotionPref();

  useAnimationFrame((_, delta) => {
    if (reduced) return; // hold still under reduced motion
    let next = baseX.get() - SPEED * (delta / 1000);
    if (next <= -25) next += 25;
    baseX.set(next);
  });

  const x = useTransform(baseX, (v) => `${v}%`);
  const items = words.length ? words : ["Portfolio"];

  return (
    <section aria-hidden className="py-8 md:py-10 border-y border-ink/15 overflow-hidden bg-ivory">
      <motion.div style={{ x }} className="flex whitespace-nowrap will-change-transform">
        {[0, 1, 2, 3].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {items.map((w, i) => (
              <span
                key={`${copy}-${i}`}
                className="font-serif font-light text-3xl md:text-5xl tracking-[-0.02em] text-stone-400 mx-5 md:mx-8"
              >
                {w}
                <span className="text-rosegold ml-10 md:ml-16 italic">·</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  );
}

"use client";

/*
 * Marquee — steady slow drift. Constant speed, one direction; the strip
 * renders four identical copies and wraps at one copy-width (25%) so the
 * loop is seamless.
 */

import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";

// Percent of the strip per second — one full loop (25%) every ~45 s.
const SPEED = 0.55;

export default function Marquee({ words }: { words: string[] }) {
  const baseX = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    let next = baseX.get() - SPEED * (delta / 1000);
    if (next <= -25) next += 25;
    baseX.set(next);
  });

  const x = useTransform(baseX, (v) => `${v}%`);
  const items = words.length ? words : ["Portfolio"];

  return (
    <section aria-hidden className="py-10 md:py-14 border-y border-ink/10 overflow-hidden wash-mist">
      <motion.div style={{ x }} className="flex whitespace-nowrap will-change-transform">
        {[0, 1, 2, 3].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {items.map((w, i) => (
              <span
                key={`${copy}-${i}`}
                className="font-serif italic text-3xl md:text-5xl text-stone-500 mx-6 md:mx-10"
              >
                {w}
                <span className="not-italic text-stone-300 ml-12 md:ml-20">·</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  );
}

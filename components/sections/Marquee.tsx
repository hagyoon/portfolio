"use client";

/*
 * Marquee — velocity-reactive ticker. Scroll speed feeds the drift, so the
 * band accelerates with the page and settles when you stop.
 */

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

export default function Marquee({ words }: { words: string[] }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 380 });
  const factor = useTransform(smoothVelocity, [-2500, 0, 2500], [-4, 1, 4], {
    clamp: false,
  });
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    const move = direction.current * 2.4 * Math.abs(f) * (delta / 100);
    let next = baseX.get() - move;
    // one list-width = 25% of the strip (it renders 4 copies)
    if (next <= -25) next += 25;
    if (next > 0) next -= 25;
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

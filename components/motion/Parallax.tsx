"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import clsx from "clsx";

/**
 * Wraps children in a container that drifts vertically as it crosses the
 * viewport. `amount` is the total drift in px (positive = moves up slower
 * than the page, i.e. classic depth parallax).
 */
export default function Parallax({
  children,
  amount = 60,
  className,
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <div ref={ref} className={clsx("overflow-hidden", className)}>
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Image-specific parallax: the inner layer is oversized so the drift never
 * exposes the container edges. Use inside a sized/aspect container.
 */
export function ParallaxInner({
  children,
  amount = 8,
  className,
}: {
  children: ReactNode;
  amount?: number; // percent of extra height
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);

  return (
    <div ref={ref} className={clsx("absolute inset-0 overflow-hidden", className)}>
      <motion.div
        style={{ y, top: `-${amount}%`, bottom: `-${amount}%` }}
        className="absolute left-0 right-0"
      >
        {children}
      </motion.div>
    </div>
  );
}

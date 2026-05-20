"use client";

import { motion, useInView, type MotionProps } from "framer-motion";
import { useRef, type ReactNode } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: keyof typeof motion;
} & MotionProps;

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
  as = "div",
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });
  const Comp = (motion as any)[as];
  return (
    <Comp
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration: 1.05,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
      className={clsx(className)}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function RevealLines({
  lines,
  className,
  baseDelay = 0,
  step = 0.08,
}: {
  lines: ReactNode[];
  className?: string;
  baseDelay?: number;
  step?: number;
}) {
  return (
    <div className={className}>
      {lines.map((l, i) => (
        <div key={i} className="overflow-hidden">
          <Reveal y={60} delay={baseDelay + i * step}>
            {l}
          </Reveal>
        </div>
      ))}
    </div>
  );
}

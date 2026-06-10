"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import clsx from "clsx";

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.28em]">
      {word}
    </motion.span>
  );
}

/**
 * Apple-style scrubbed paragraph: each word fades from ghost to full ink as
 * the block moves through the viewport, tied directly to scroll position.
 */
export default function ScrubWords({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <p ref={ref} className={clsx("flex flex-wrap", className)}>
      {words.map((w, i) => (
        <Word
          key={`${w}-${i}`}
          word={w}
          progress={scrollYProgress}
          range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]}
        />
      ))}
    </p>
  );
}

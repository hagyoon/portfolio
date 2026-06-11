"use client";

/*
 * ImageCarousel — keyboard-accessible case-study gallery. Prev/next
 * buttons, arrow keys, dot indicators with text alternative, fast (<300ms)
 * fade between slides, lazy-loaded images.
 */

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMotionPref } from "@/components/Preferences";

export default function ImageCarousel({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const reduced = useMotionPref();
  const count = images.length;

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  if (!count) return null;

  return (
    <figure
      aria-roledescription="carousel"
      aria-label={`${title} images`}
      className="my-12"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="relative w-full aspect-[16/10] bg-ivory overflow-hidden border border-ink/10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={`${title} — image ${index + 1} of ${count}`}
            loading="lazy"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      <figcaption className="mt-3 flex items-center justify-between gap-4">
        <span className="font-mono text-sm text-stone-500" aria-live="polite">
          {index + 1} / {count}
        </span>
        <span className="flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 border border-ink/40 transition-colors ${
                i === index ? "bg-ink" : "bg-transparent hover:bg-ink/30"
              }`}
            />
          ))}
        </span>
        <span className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous image"
            className="border border-ink/25 px-3.5 py-1.5 text-sm hover:bg-ink hover:text-paper active:opacity-70 transition-colors cursor-pointer"
          >
            ← Prev
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next image"
            className="border border-ink/25 px-3.5 py-1.5 text-sm hover:bg-ink hover:text-paper active:opacity-70 transition-colors cursor-pointer"
          >
            Next →
          </button>
        </span>
      </figcaption>
    </figure>
  );
}

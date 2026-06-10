"use client";

/*
 * Gallery — pinned horizontal glide. The section holds while the image
 * strip slides across, scrubbed by scroll. Hidden when no images are set
 * (manage the list in site.md `gallery:` or via /admin).
 */

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Reveal from "@/components/Reveal";
import SafeImage from "@/components/ui/SafeImage";
import type { GalleryImage } from "@/lib/content";

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });
  const x = useTransform(progress, [0, 1], ["2%", "-62%"]);

  if (!images.length) return null;

  return (
    <section id="gallery" className="pt-32 md:pt-44">
      <div className="container-edge mb-12 md:mb-16">
        <Reveal>
          <div className="eyebrow">Note 03 — Atmosphere</div>
        </Reveal>
      </div>

      <div ref={ref} className="relative h-[280svh]">
        <div className="sticky top-0 h-[100svh] flex items-center overflow-hidden wash-lavender">
          <motion.div style={{ x }} className="flex gap-6 md:gap-10 pl-6 md:pl-16 will-change-transform">
            {images.map((img, i) => (
              <figure
                key={`${img.src}-${i}`}
                className={`relative shrink-0 overflow-hidden bg-ivory ${
                  i % 3 === 1 ? "w-[58vw] md:w-[34vw] aspect-[4/5]" : "w-[70vw] md:w-[44vw] aspect-[16/11]"
                }`}
              >
                <SafeImage
                  src={img.src}
                  alt={img.caption ?? `Gallery image ${i + 1}`}
                  sizes="(min-width: 768px) 44vw, 70vw"
                />
                {img.caption && (
                  <figcaption className="absolute bottom-0 left-0 right-0 px-4 py-3 text-[11px] uppercase tracking-widest text-paper bg-ink/35 backdrop-blur-sm">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

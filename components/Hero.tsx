"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import HeroTime from "./HeroTime";

export default function Hero({
  name,
  tagline,
  location,
}: {
  name: string;
  tagline: string;
  location: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  const [first, ...rest] = name.split(" ");
  const last = rest.join(" ");

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex flex-col justify-between pt-32 pb-10"
    >
      <motion.div style={{ y, opacity, scale }} className="container-edge">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2 label flex items-start gap-4 text-stone-500">
            <span className="block h-px w-8 bg-stone-300 mt-[10px]" />
            <div className="space-y-1">
              <div>{location}</div>
              <HeroTime />
            </div>
          </div>

          <div className="col-span-12 md:col-span-10">
            <h1 className="display-1 tracking-tightest">
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.3,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block overflow-hidden"
              >
                <span className="block">{first}</span>
              </motion.span>
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.3,
                  delay: 0.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block overflow-hidden italic text-clay"
              >
                <span className="block">{last}.</span>
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 md:mt-14 max-w-xl font-sans text-base md:text-lg leading-relaxed text-stone-600"
            >
              {tagline}
            </motion.p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
        className="container-edge mt-10 flex items-end justify-between"
      >
        <div className="label text-stone-500 flex items-center gap-3">
          <span className="block h-px w-12 bg-stone-300" />
          <span>Index of work, thought, and care</span>
        </div>
        <div className="hidden md:flex items-center gap-3 label text-stone-500">
          <span>Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            ↓
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

/*
 * Hero — a single held frame: an oversized classical wordmark on the slate
 * ground, a hairline meta rail beneath it, nothing else. The name scales
 * and lifts away as the page scrolls (desktop only; on small screens the
 * hero flows normally so nothing clips).
 */

import { Fragment, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Terminal from "@/components/motion/Terminal";
import { HeroFigure } from "@/components/graphics/Ornament";
import type { Site } from "@/lib/content";

const TERMINAL_LINES = [
  { cmd: "cat role.txt", out: "ai & systems builder — data · agents · markets" },
  { cmd: "ls ~/current", out: "agentic-systems  markets  horology  second-brain" },
  { cmd: "studio --unlock", out: "sign in to the studio", href: "/admin" },
];

const fade = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1.2, delay, ease: "easeOut" as const },
});

/*
 * Letters — renders a word as individual letters that lift in a wave on
 * hover. A zero-width space is interleaved so the contiguous name string
 * isn't present in crawlable DOM text; the h1's aria-label carries the
 * accessible label instead.
 */
function Letters({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((ch, i) => (
        <Fragment key={i}>
          <span className="hero-letter">
            <span
              className="inline-block transition-transform duration-500 ease-out group-hover/name:-translate-y-[0.06em]"
              style={{ transitionDelay: `${i * 35}ms` }}
            >
              {ch}
            </span>
          </span>
          {"​"}
        </Fragment>
      ))}
    </>
  );
}

export default function Hero({ site }: { site: Site }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  const scale = useTransform(progress, [0, 1], [1, 0.9]);
  const opacity = useTransform(progress, [0, 0.8], [1, 0]);
  const lift = useTransform(progress, [0, 1], ["0%", "-10%"]);
  const figureOpacity = useTransform(progress, [0, 0.7], [1, 0]);
  const figureY = useTransform(progress, [0, 1], ["-50%", "-62%"]);

  const [first, ...rest] = site.name.split(" ");
  const last = rest.join(" ");

  return (
    <div ref={ref} className="relative lg:h-[165svh]">
      <section className="lg:sticky top-0 min-h-[100svh] lg:h-[100svh] flex flex-col overflow-hidden pt-32 lg:pt-0">
        {/* Instrument dial — occupies the open field beside the wordmark */}
        <motion.div
          aria-hidden
          style={{ opacity: figureOpacity, y: figureY }}
          className="pointer-events-none absolute right-[-8%] top-1/2 hidden lg:block w-[46vw] max-w-[720px] aspect-square text-stone-300"
        >
          <HeroFigure className="w-full h-full" />
        </motion.div>

        {/* Matte warmth — two low-saturation fields, barely there */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-[15%] right-[6%] w-[45vw] h-[45vw] rounded-full blur-3xl opacity-[0.16]"
            style={{ background: "radial-gradient(circle, rgb(var(--c-ochre)) 0%, transparent 68%)" }}
          />
          <div
            className="absolute bottom-[-22%] left-[-8%] w-[38vw] h-[38vw] rounded-full blur-3xl opacity-[0.14]"
            style={{ background: "radial-gradient(circle, rgb(var(--c-sage)) 0%, transparent 68%)" }}
          />
        </div>

        <motion.div
          style={{ scale, opacity, y: lift }}
          className="flex-1 flex flex-col justify-center origin-center"
        >
          <div className="container-edge w-full">
            {/* Standfirst */}
            <motion.p {...fade(0.15)} className="label mb-10 md:mb-14">
              Independent practice — {site.location}
            </motion.p>

            {/* Wordmark — set very large, allowed to run to the edges */}
            <h1
              aria-label="hkryu — AI and Systems Builder, Singapore"
              className="group/name display-1 select-none cursor-default"
            >
              <span aria-hidden className="block">
                <Letters text={first} />
              </span>
              <span aria-hidden className="block italic text-stone-400">
                <Letters text={last} />
              </span>
            </h1>

            {/* Statement + actions, with the console occupying the open field */}
            <div className="mt-12 md:mt-16 grid lg:grid-cols-12 gap-10 lg:gap-12 items-end">
              <div className="lg:col-span-6 xl:col-span-5">
                <motion.p
                  {...fade(0.5)}
                  className="text-xl md:text-2xl leading-[1.55] text-stone-500"
                >
                  {site.tagline}
                </motion.p>
                <motion.div {...fade(0.65)} className="mt-8 flex flex-wrap gap-3">
                  <a href="/#projects" className="btn-solid">
                    Selected work <span aria-hidden>↓</span>
                  </a>
                  <a href="/#contact" className="btn-outline">
                    Get in touch <span aria-hidden>→</span>
                  </a>
                </motion.div>
              </div>

              <motion.div
                {...fade(0.8)}
                className="hidden lg:block lg:col-span-6 xl:col-start-8 xl:col-span-5"
              >
                <Terminal host="ryu@hkryu.space" lines={TERMINAL_LINES} className="w-full" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Meta rail */}
        <motion.div style={{ opacity }} className="container-edge w-full pb-10 md:pb-12">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left" }}
            className="h-px bg-ink/15 mb-6"
          />
          <motion.div
            {...fade(0.8)}
            className="flex items-center justify-between gap-6 label"
          >
            <span>{site.location}</span>
            <span className="hidden md:flex gap-10">
              <span>Builder</span>
              <span>Collector</span>
              <span>Systems Thinker</span>
            </span>
            <span className="flex items-center gap-2">
              Scroll
              <motion.span
                aria-hidden
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                ↓
              </motion.span>
            </span>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

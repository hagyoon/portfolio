"use client";

/*
 * Hero — pinned opener. The viewport holds while the name scales down and
 * lifts away, Apple-product-page style. A slow pastel wash drifts behind.
 */

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Terminal from "@/components/motion/Terminal";
import HeroGraph from "@/components/motion/HeroGraph";
import type { Site } from "@/lib/content";

const TERMINAL_LINES = [
  { cmd: "cat role.txt", out: "ai & systems builder — data · agents · markets" },
  { cmd: "ls ~/current", out: "agentic-systems  markets  horology  second-brain" },
  { cmd: "studio --unlock", out: "→ sign in to the studio", href: "/admin" },
];

const rise = (delay: number) => ({
  initial: { y: "110%" },
  animate: { y: 0 },
  transition: { duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const fade = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1.1, delay, ease: "easeOut" as const },
});

export default function Hero({ site }: { site: Site }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  const scale = useTransform(progress, [0, 1], [1, 0.86]);
  const opacity = useTransform(progress, [0, 0.75], [1, 0]);
  const lift = useTransform(progress, [0, 1], ["0%", "-12%"]);
  const washY = useTransform(progress, [0, 1], ["0%", "30%"]);

  const [first, ...rest] = site.name.split(" ");
  const last = rest.join(" ");

  return (
    // The scroll-pin is desktop-only; on smaller screens the hero flows
    // normally so name + CTAs + terminal never clip on short viewports.
    <div ref={ref} className="relative lg:h-[170svh]">
      <section className="lg:sticky top-0 min-h-[100svh] lg:h-[100svh] flex flex-col overflow-hidden pt-28 lg:pt-0">
        {/* Blueprint grid + scanlines + drifting phosphor glow */}
        <div aria-hidden className="absolute inset-0 pointer-events-none grid-lines" />
        <div aria-hidden className="absolute inset-0 pointer-events-none scanlines" />
        <motion.div
          aria-hidden
          style={{ y: washY }}
          className="absolute inset-0 pointer-events-none"
        >
          <div
            className="glow-drift absolute -top-1/4 right-[-15%] w-[70vw] h-[70vw] rounded-full opacity-60"
            style={{
              background:
                "radial-gradient(circle at center, rgba(236,142,63,0.16) 0%, transparent 65%)",
            }}
          />
          <div
            className="glow-drift absolute bottom-[-30%] left-[-10%] w-[55vw] h-[55vw] rounded-full opacity-55"
            style={{
              background:
                "radial-gradient(circle at center, rgba(132,168,192,0.18) 0%, transparent 65%)",
              animationDelay: "-16s",
              animationDirection: "alternate-reverse",
            }}
          />
        </motion.div>

        {/* Name — scales and lifts away as you scroll */}
        <motion.div
          style={{ scale, opacity, y: lift }}
          className="flex-1 flex flex-col justify-center origin-center"
        >
          <div className="container-edge w-full">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">

              {/* ── Left column: identity ──────────────────────────────── */}
              <div className="lg:col-span-7">
                <h1
                  aria-label={site.name}
                  className="font-serif leading-[0.92] tracking-tightest select-none"
                  style={{ fontSize: "clamp(3.25rem, 7.5vw, 7rem)" }}
                >
                  <span className="block overflow-hidden pb-[0.06em]">
                    <motion.span {...rise(0.15)} className="block text-ink">
                      {first}
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden pb-[0.06em]">
                    <motion.span {...rise(0.28)} className="block italic text-butter">
                      {last}.
                      <span
                        aria-hidden
                        className="cursor-blink not-italic inline-block align-baseline ml-[0.08em] w-[0.45em] h-[0.72em] bg-butter/80"
                      />
                    </motion.span>
                  </span>
                </h1>
                <motion.p
                  {...fade(0.6)}
                  className="mt-8 font-mono text-lg md:text-xl text-stone-700"
                >
                  AI &amp; Systems Builder — Singapore
                </motion.p>
                <motion.p
                  {...fade(0.7)}
                  className="mt-3 max-w-md text-stone-600 text-base md:text-lg leading-relaxed"
                >
                  {site.tagline}
                </motion.p>
                {/* Primary calls to action */}
                <motion.div {...fade(0.85)} className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="/#projects"
                    className="inline-flex items-center gap-2 bg-ink text-paper px-7 py-3.5 label !text-paper hover:opacity-85 active:opacity-70 transition-opacity"
                  >
                    View my work <span aria-hidden>↓</span>
                  </a>
                  <a
                    href="/#contact"
                    className="inline-flex items-center gap-2 border border-ink/30 px-7 py-3.5 label hover:bg-ink hover:!text-paper active:opacity-70 transition-colors"
                  >
                    Contact me <span aria-hidden>→</span>
                  </a>
                </motion.div>
              </div>

              {/* ── Right column: interactive constellation + terminal ─── */}
              <motion.div
                {...fade(1.0)}
                className="hidden lg:flex lg:col-span-5 flex-col items-stretch gap-6"
              >
                <div className="h-[22rem] xl:h-[26rem] w-full">
                  <HeroGraph />
                </div>
                <Terminal
                  host="ryu@hkryu.space"
                  lines={TERMINAL_LINES}
                  className="w-full"
                />
              </motion.div>

            </div>
          </div>
        </motion.div>

        {/* Bottom strip */}
        <motion.div style={{ opacity }} className="container-edge w-full pb-10 md:pb-12">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left" }}
            className="h-px bg-ink/20 mb-7"
          />
          <motion.div {...fade(0.85)} className="flex items-center justify-between">
            <div className="label text-stone-400">{site.location}</div>
            <div className="hidden md:flex gap-10 label text-stone-500">
              <span>Builder</span>
              <span>Collector</span>
              <span>Systems Thinker</span>
            </div>
            <div className="label text-stone-400 flex items-center gap-2">
              <span>Scroll</span>
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                ↓
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

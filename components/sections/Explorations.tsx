"use client";

/*
 * Explorations — current threads of thinking, sourced from the interests
 * markdown collection. Cards stagger in and lift on hover.
 */

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import type { Interest } from "@/lib/content";

export default function Explorations({ interests }: { interests: Interest[] }) {
  if (!interests.length) return null;

  return (
    <section id="explorations" className="band-deep py-32 md:py-44 mt-40 md:mt-56">
      <div className="container-edge">
        <div className="grid grid-cols-12 gap-6 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-3">
            <Reveal>
              <div className="index-num">03</div>
              <div className="mt-3 label">Currently Exploring</div>
              <div aria-hidden className="mt-6 h-px w-16 bg-terracotta" />
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-9">
            <Reveal>
              <h2 className="display-2 max-w-3xl">
                Open questions, <em>active</em> threads.
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/15 border border-ink/15">
          {interests.map((item, i) => (
            <Reveal key={item.slug} delay={(i % 3) * 0.08} className="bg-paper">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full p-7 md:p-9 group cursor-default"
              >
                <div className="flex items-baseline justify-between mb-8">
                  <span className="label text-stone-400 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="h-2 w-2 bg-terracotta transition-transform duration-500 ease-editorial group-hover:scale-[1.8]"
                  />
                </div>
                <h3 className="font-serif font-normal text-2xl tracking-[-0.015em] leading-[1.1] mb-3">
                  {item.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">{item.caption}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

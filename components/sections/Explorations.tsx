"use client";

/*
 * Explorations — current threads of thinking, sourced from the interests
 * markdown collection. Cards stagger in and lift on hover.
 */

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import type { Interest } from "@/lib/content";

const accents = ["bg-mist/30", "bg-blush/30", "bg-sage/30", "bg-lavender/30", "bg-butter/30"];

export default function Explorations({ interests }: { interests: Interest[] }) {
  if (!interests.length) return null;

  return (
    <section id="explorations" className="pt-32 md:pt-44">
      <div className="container-edge">
        <div className="grid grid-cols-12 gap-6 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-3">
            <Reveal>
              <div className="eyebrow">Note 02</div>
              <div className="mt-3 text-stone-500 text-sm">Currently Exploring</div>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-9">
            <Reveal>
              <h2 className="display-2 max-w-3xl">
                Open questions, <em className="text-sage">active</em> threads.
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10">
          {interests.map((item, i) => (
            <Reveal key={item.slug} delay={(i % 3) * 0.08} className="bg-paper">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full p-8 md:p-10 group cursor-default"
              >
                <div
                  className={`w-8 h-8 rounded-full mb-8 transition-transform duration-700 ease-editorial group-hover:scale-125 ${
                    accents[i % accents.length]
                  }`}
                />
                <div className="label text-stone-400 mb-3 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-serif text-2xl tracking-tight mb-3">{item.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{item.caption}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

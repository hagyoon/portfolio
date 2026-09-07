"use client";

/*
 * Writing — editorial index of essays. Rows reveal in sequence; hovering a
 * row dims its siblings to spotlight the active line.
 */

import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import Reveal from "@/components/Reveal";
import type { Essay } from "@/lib/content";

export default function Writing({ essays }: { essays: Essay[] }) {
  const [active, setActive] = useState<string | null>(null);
  const list = essays.slice(0, 8);

  if (!list.length) return null;

  return (
    <section id="writing" className="container-edge pt-40 md:pt-56">
      <div className="grid grid-cols-12 gap-6 mb-14 md:mb-20">
        <div className="col-span-12 md:col-span-3">
          <Reveal>
            <div className="index-num">05</div>
            <div className="mt-3 label">Writing</div>
            <div aria-hidden className="mt-6 h-px w-16 bg-terracotta" />
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-9">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="display-2 max-w-3xl">
                Thinking, <em>slowly</em>, in public.
              </h2>
              <Link
                href="/writing"
                className="link-inline label text-stone-500 mb-2 shrink-0"
              >
                All writing — search &amp; topics →
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="border-t border-ink/20" onPointerLeave={() => setActive(null)}>
        {list.map((essay, i) => (
          <Reveal key={essay.slug} delay={i * 0.04}>
            <Link
              href={`/writing/${essay.slug}`}
              onPointerEnter={() => setActive(essay.slug)}
              className={clsx(
                "group grid grid-cols-12 gap-4 items-baseline border-b border-ink/20 py-6 md:py-8 transition-opacity duration-500",
                active && active !== essay.slug ? "opacity-35" : "opacity-100"
              )}
            >
              <div className="col-span-3 md:col-span-2 label text-stone-400 tabular-nums">
                {essay.date}
              </div>
              <div className="col-span-9 md:col-span-7">
                <h3 className="font-serif font-normal text-2xl md:text-4xl tracking-[-0.02em] leading-[1.05]">
                  {essay.title}
                </h3>
                <p className="mt-2.5 text-stone-500 text-sm leading-[1.65] max-w-xl hidden md:block">
                  {essay.excerpt}
                </p>
              </div>
              <div className="hidden md:flex col-span-3 justify-end items-center gap-6">
                {essay.tag && <span className="label text-stone-400">{essay.tag}</span>}
                <span className="text-stone-400 transition-transform duration-500 ease-editorial group-hover:translate-x-1.5">
                  →
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

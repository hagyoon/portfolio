"use client";

/*
 * Terminal — a typed console panel. Commands type out character by
 * character, output prints beneath, and a block cursor blinks at the
 * prompt. Restyled for the concrete ground: hard frame, mono chrome,
 * oxide prompt glyphs.
 */

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/components/Preferences";

type Line = { cmd: string; out: string; href?: string };

const TYPE_MS = 38;
const PAUSE_AFTER_CMD = 260;
const PAUSE_AFTER_OUT = 420;

export default function Terminal({
  host,
  lines,
  className,
}: {
  host: string;
  lines: Line[];
  className?: string;
}) {
  const [done, setDone] = useState<Line[]>([]);
  const [typing, setTyping] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;
    // Under reduced motion, print everything at once — no typing animation
    if (prefersReducedMotion()) {
      setDone(lines);
      return;
    }
    const queue = async () => {
      const wait = (ms: number) =>
        new Promise<void>((r) => {
          timer.current = setTimeout(r, ms);
        });
      await wait(900); // let the hero entrance land first
      for (const line of lines) {
        for (let i = 1; i <= line.cmd.length; i++) {
          if (cancelled) return;
          setTyping(line.cmd.slice(0, i));
          await wait(TYPE_MS);
        }
        await wait(PAUSE_AFTER_CMD);
        if (cancelled) return;
        setTyping(null);
        setDone((d) => [...d, line]);
        await wait(PAUSE_AFTER_OUT);
      }
    };
    queue();
    return () => {
      cancelled = true;
      if (timer.current) clearTimeout(timer.current);
    };
  }, [lines]);

  const finished = done.length === lines.length;

  return (
    <div className={`border border-ink/20 bg-abyss/70 backdrop-blur-md ${className ?? ""}`}>
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-ink/15 px-4 py-2.5">
        <span className="font-mono text-[11px] tracking-wide text-stone-400">{host}</span>
        <span aria-hidden className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-stone-300/50" />
          <span className="w-2 h-2 bg-stone-300/35" />
          <span className="w-2 h-2 bg-terracotta/70" />
        </span>
      </div>
      {/* Body */}
      <div className="px-4 py-4 font-mono text-[13px] leading-relaxed">
        {done.map((line, i) => (
          <div key={i}>
            <div>
              <span className="text-terracotta">$ </span>
              <span className="text-ink">{line.cmd}</span>
            </div>
            {line.href ? (
              <a
                href={line.href}
                className="group inline-flex items-center gap-1.5 text-terracotta link-inline mb-2"
              >
                {line.out}
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            ) : (
              <div className="text-stone-500 mb-2">{line.out}</div>
            )}
          </div>
        ))}
        <div>
          <span className="text-terracotta">$ </span>
          {typing !== null && <span className="text-ink">{typing}</span>}
          {(typing !== null || finished) && (
            <span
              aria-hidden
              className="cursor-blink inline-block align-middle ml-px w-[0.5em] h-[1.05em] bg-ink/70"
            />
          )}
        </div>
      </div>
    </div>
  );
}

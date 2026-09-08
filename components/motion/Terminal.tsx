"use client";

/*
 * Terminal — a typed console printed directly onto the ground. No frame,
 * no chrome, no panel: a hairline rule, a caption, and mono lines that
 * type themselves in. Sits at the bottom of the hero's open field and
 * carries the studio entrance as its last line.
 */

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/components/Preferences";

type Line = { cmd: string; out: string; href?: string };

const TYPE_MS = 42;
const PAUSE_AFTER_CMD = 300;
const PAUSE_AFTER_OUT = 460;

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
      await wait(1400); // let the hero entrance land first
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
    <div className={className}>
      {/* Caption + hairline — the only structure */}
      <div className="flex items-baseline justify-between gap-4 pb-2.5">
        <span className="label">{host}</span>
        <span aria-hidden className="label text-stone-300">
          {finished ? "idle" : "•••"}
        </span>
      </div>
      <div className="h-px bg-ink/12" />

      <div className="pt-4 font-mono text-[12px] leading-[1.75]">
        {done.map((line, i) => (
          <div key={i} className="mb-2.5 last:mb-0">
            <div className="text-stone-300">
              <span className="text-rosegold/50">›&nbsp;</span>
              {line.cmd}
            </div>
            {line.href ? (
              <a
                href={line.href}
                className="group mt-0.5 inline-flex items-center gap-1.5 text-stone-500 underline-grow
                           transition-colors duration-300 hover:text-rosegold focus-visible:text-rosegold"
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
              <div className="mt-0.5 text-stone-500">{line.out}</div>
            )}
          </div>
        ))}
        <div className="text-stone-300">
          <span className="text-rosegold/50">›&nbsp;</span>
          {typing !== null && <span>{typing}</span>}
          {(typing !== null || finished) && (
            <span
              aria-hidden
              className="cursor-blink ml-px inline-block h-[1em] w-px align-middle bg-stone-400"
            />
          )}
        </div>
      </div>
    </div>
  );
}

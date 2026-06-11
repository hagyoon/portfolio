"use client";

/*
 * Terminal — Odysseus-style typed terminal window. Title bar with host
 * string, commands type out character by character, output prints, and a
 * block cursor blinks on the empty prompt at the end.
 */

import { useEffect, useRef, useState } from "react";

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
  // done[i] = fully printed line; typing = partial command being typed
  const [done, setDone] = useState<Line[]>([]);
  const [typing, setTyping] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;
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
    <div className={`border border-ink/15 bg-ivory/80 backdrop-blur-sm ${className ?? ""}`}>
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-ink/10 bg-bone px-3 py-1.5">
        <span className="font-mono text-[11px] text-stone-500">{host}: ~</span>
        <span className="font-mono text-[11px] text-stone-400 select-none">— ✕</span>
      </div>
      {/* Body */}
      <div className="px-4 py-3.5 font-mono text-[13px] leading-relaxed">
        {done.map((line, i) => (
          <div key={i}>
            <div>
              <span className="text-butter">$ </span>
              <span className="text-ink">{line.cmd}</span>
            </div>
            {line.href ? (
              <a
                href={line.href}
                className="block text-butter underline underline-offset-4 decoration-1 hover:opacity-75 transition-opacity mb-1.5"
              >
                {line.out}
              </a>
            ) : (
              <div className="text-stone-600 mb-1.5">{line.out}</div>
            )}
          </div>
        ))}
        <div>
          <span className="text-butter">$ </span>
          {typing !== null && <span className="text-ink">{typing}</span>}
          {(typing !== null || finished) && (
            <span aria-hidden className="cursor-blink inline-block align-middle ml-px w-[0.55em] h-[1.05em] bg-ink/80" />
          )}
        </div>
      </div>
    </div>
  );
}

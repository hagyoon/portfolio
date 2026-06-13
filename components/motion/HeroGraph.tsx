"use client";

/*
 * HeroGraph — an interactive "knowledge constellation".
 *
 * Six domain nodes (the things Ryu builds and thinks about) connected as a
 * graph. The nodes drift gently, parallax toward the cursor, brighten on
 * hover, and link to the matching section of the site. It's the visual
 * anchor on the right of the hero — a living second-brain graph.
 *
 * Pure SVG + a single requestAnimationFrame loop writing transforms straight
 * to refs (no per-frame React state), so it stays smooth. Honours
 * prefers-reduced-motion by rendering a calm static graph.
 */

import { useEffect, useRef, useState } from "react";

type Node = { id: string; label: string; x: number; y: number; href: string; depth: number };

// Positions are in a 0–100 viewBox. depth drives parallax strength.
const NODES: Node[] = [
  { id: "ai",        label: "AI Systems",   x: 50, y: 22, href: "/#projects",     depth: 1.0 },
  { id: "agents",    label: "Agents",       x: 19, y: 44, href: "/#projects",     depth: 1.4 },
  { id: "brain",     label: "Second Brain", x: 80, y: 40, href: "/#about",        depth: 1.2 },
  { id: "markets",   label: "Markets",      x: 31, y: 74, href: "/#writing",      depth: 1.5 },
  { id: "horology",  label: "Horology",     x: 73, y: 76, href: "/#gallery",      depth: 1.3 },
  { id: "philosophy",label: "Philosophy",   x: 52, y: 52, href: "/#writing",      depth: 0.8 },
];

const EDGES: [string, string][] = [
  ["ai", "agents"],
  ["ai", "brain"],
  ["ai", "philosophy"],
  ["agents", "markets"],
  ["brain", "philosophy"],
  ["brain", "horology"],
  ["markets", "philosophy"],
  ["philosophy", "horology"],
];

// Theme-aware: --ink flips light/dark with the theme, --butter is the accent.
const FG = "var(--ink)";
const ACCENT = "var(--butter)";

export default function HeroGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const groupRefs = useRef<(SVGGElement | null)[]>([]);
  const edgeRefs = useRef<(SVGLineElement | null)[]>([]);
  const offsets = useRef(NODES.map(() => ({ dx: 0, dy: 0 })));
  const pointer = useRef({ x: 0, y: 0 });   // target, normalized -1..1
  const pointerLerp = useRef({ x: 0, y: 0 }); // smoothed
  const [hover, setHover] = useState<string | null>(null);

  const idx = (id: string) => NODES.findIndex((n) => n.id === id);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const phases = NODES.map((_, i) => i * 1.7);
    const speeds = NODES.map((_, i) => 0.18 + (i % 3) * 0.05);
    const amp = 1.7;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = (now - start) / 1000;

      // ease pointer toward target
      pointerLerp.current.x += (pointer.current.x - pointerLerp.current.x) * 0.06;
      pointerLerp.current.y += (pointer.current.y - pointerLerp.current.y) * 0.06;

      for (let i = 0; i < NODES.length; i++) {
        const drift = reduce
          ? { dx: 0, dy: 0 }
          : {
              dx: Math.sin(t * speeds[i] + phases[i]) * amp,
              dy: Math.cos(t * speeds[i] * 0.8 + phases[i]) * amp,
            };
        const par = {
          dx: pointerLerp.current.x * 3.2 * NODES[i].depth,
          dy: pointerLerp.current.y * 3.2 * NODES[i].depth,
        };
        const off = offsets.current[i];
        off.dx = drift.dx + par.dx;
        off.dy = drift.dy + par.dy;
        groupRefs.current[i]?.setAttribute("transform", `translate(${off.dx} ${off.dy})`);
      }

      // update edge endpoints to follow drifting nodes
      EDGES.forEach((e, k) => {
        const a = idx(e[0]);
        const b = idx(e[1]);
        const line = edgeRefs.current[k];
        if (!line) return;
        line.setAttribute("x1", String(NODES[a].x + offsets.current[a].dx));
        line.setAttribute("y1", String(NODES[a].y + offsets.current[a].dy));
        line.setAttribute("x2", String(NODES[b].x + offsets.current[b].dx));
        line.setAttribute("y2", String(NODES[b].y + offsets.current[b].dy));
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    const r = svgRef.current?.getBoundingClientRect();
    if (!r) return;
    pointer.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    pointer.current.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
  };
  const onLeave = () => {
    pointer.current.x = 0;
    pointer.current.y = 0;
  };

  const isEdgeActive = (e: [string, string]) =>
    hover !== null && (e[0] === hover || e[1] === hover);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="w-full h-full overflow-visible"
      role="group"
      aria-label="Interactive graph of focus areas — AI systems, agents, second brain, markets, horology, philosophy"
    >
      {/* Edges */}
      <g>
        {EDGES.map((e, k) => (
          <line
            key={k}
            ref={(el) => { edgeRefs.current[k] = el; }}
            x1={NODES[idx(e[0])].x}
            y1={NODES[idx(e[0])].y}
            x2={NODES[idx(e[1])].x}
            y2={NODES[idx(e[1])].y}
            stroke={isEdgeActive(e) ? ACCENT : FG}
            strokeOpacity={isEdgeActive(e) ? 0.9 : 0.22}
            strokeWidth={isEdgeActive(e) ? 0.5 : 0.3}
            style={{ transition: "stroke 0.4s ease, stroke-opacity 0.4s ease, stroke-width 0.4s ease" }}
          />
        ))}
      </g>

      {/* Nodes */}
      {NODES.map((n, i) => {
        const active = hover === n.id;
        return (
          <a key={n.id} href={n.href} aria-label={`Go to ${n.label}`}>
            <g
              ref={(el) => { groupRefs.current[i] = el; }}
              onPointerEnter={() => setHover(n.id)}
              onPointerLeave={() => setHover(null)}
              className="cursor-pointer"
              style={{ pointerEvents: "auto" }}
            >
              {/* hover halo */}
              <circle
                cx={n.x}
                cy={n.y}
                r={active ? 5.2 : 3.4}
                fill={ACCENT}
                opacity={active ? 0.18 : 0}
                style={{ transition: "r 0.4s ease, opacity 0.4s ease" }}
              />
              {/* node dot */}
              <circle
                cx={n.x}
                cy={n.y}
                r={active ? 2.4 : 1.9}
                fill={active ? ACCENT : FG}
                style={{ transition: "r 0.35s ease, fill 0.35s ease" }}
              />
              {/* label */}
              <text
                x={n.x}
                y={n.y - 3.6}
                textAnchor="middle"
                fontSize={3.1}
                fill={FG}
                fillOpacity={active ? 1 : 0.6}
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  letterSpacing: "0.02em",
                  transition: "fill-opacity 0.35s ease",
                  userSelect: "none",
                }}
              >
                {n.label}
              </text>
            </g>
          </a>
        );
      })}
    </svg>
  );
}

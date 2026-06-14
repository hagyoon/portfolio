"use client";

/*
 * HeroGraph — an Obsidian-style knowledge graph.
 *
 * Six topic clusters (hub + 3 leaves each), laid out radially. Node size
 * scales with how many links it has; each cluster has its own colour. Hover a
 * node and it + its neighbours brighten while the rest of the graph dims,
 * exactly like Obsidian's graph view. Nodes float gently and are pushed away
 * by the cursor, so it feels alive and draggable. Click any node to jump to
 * that part of the site.
 *
 * One requestAnimationFrame loop writes transforms straight to refs (no
 * per-frame React state). Honours prefers-reduced-motion.
 */

import { useEffect, useMemo, useRef, useState } from "react";

type ClusterDef = {
  id: string;
  label: string;
  color: string; // CSS var name (theme-aware)
  href: string;
  leaves: string[];
};

const CLUSTERS: ClusterDef[] = [
  { id: "ai",         label: "AI Systems",   color: "--butter",   href: "/#projects", leaves: ["LLMs", "RAG", "Automation"] },
  { id: "agents",     label: "Agents",       color: "--ochre",    href: "/#projects", leaves: ["Telegram", "Multi-agent", "VPS"] },
  { id: "brain",      label: "Second Brain", color: "--sage",     href: "/#about",    leaves: ["Obsidian", "Wiki", "Memory"] },
  { id: "markets",    label: "Markets",      color: "--mist",     href: "/#writing",  leaves: ["Uranium", "Treasuries", "Crypto"] },
  { id: "horology",   label: "Horology",     color: "--blush",    href: "/#gallery",  leaves: ["Independents", "Straps", "Vintage"] },
  { id: "philosophy", label: "Philosophy",   color: "--lavender", href: "/#writing",  leaves: ["Girard", "Gita", "Stoicism"] },
];

type GNode = {
  key: string;
  label: string;
  color: string;
  href: string;
  hub: boolean;
  bx: number; // base x in 0..100
  by: number;
  depth: number; // parallax/float strength
};

// Deterministic layout (no Math.random → SSR-safe).
const CENTER = 50;
const HUB_RX = 33;
const HUB_RY = 27;
const LEAF_R = 11.5;
const rad = (deg: number) => (deg * Math.PI) / 180;

function buildGraph() {
  const nodes: GNode[] = [];
  const index: Record<string, number> = {};
  const edges: [number, number][] = [];

  CLUSTERS.forEach((c, i) => {
    const a = -90 + i * 60;
    const hx = CENTER + HUB_RX * Math.cos(rad(a));
    const hy = CENTER + HUB_RY * Math.sin(rad(a));
    const hubIdx = nodes.length;
    index[c.id] = hubIdx;
    nodes.push({ key: c.id, label: c.label, color: c.color, href: c.href, hub: true, bx: hx, by: hy, depth: 0.7 });

    c.leaves.forEach((leaf, j) => {
      const la = a + (j - 1) * 30;
      const lx = hx + LEAF_R * Math.cos(rad(la)) * 1.05;
      const ly = hy + LEAF_R * Math.sin(rad(la));
      const li = nodes.length;
      index[`${c.id}:${leaf}`] = li;
      nodes.push({ key: `${c.id}:${leaf}`, label: leaf, color: c.color, href: c.href, hub: false, bx: lx, by: ly, depth: 1.5 });
      edges.push([hubIdx, li]);
    });
  });

  // Ring + cross-spokes between hubs
  for (let i = 0; i < CLUSTERS.length; i++) {
    edges.push([index[CLUSTERS[i].id], index[CLUSTERS[(i + 1) % CLUSTERS.length].id]]);
  }
  edges.push([index["ai"], index["markets"]]);
  edges.push([index["agents"], index["horology"]]);
  edges.push([index["brain"], index["philosophy"]]);

  // A few cross-cluster leaf links for texture
  edges.push([index["ai:Automation"], index["agents:Multi-agent"]]);
  edges.push([index["brain:Memory"], index["ai:LLMs"]]);
  edges.push([index["markets:Crypto"], index["ai:RAG"]]);

  // Degree → adjacency + sizes
  const deg = nodes.map(() => 0);
  const adj: Set<number>[] = nodes.map(() => new Set());
  edges.forEach(([a, b]) => {
    deg[a]++; deg[b]++;
    adj[a].add(b); adj[b].add(a);
  });
  const radii = nodes.map((n, i) =>
    n.hub ? 2.8 + deg[i] * 0.16 : 1.15 + deg[i] * 0.22
  );

  return { nodes, edges, adj, radii };
}

export default function HeroGraph() {
  const { nodes, edges, adj, radii } = useMemo(buildGraph, []);

  const svgRef = useRef<SVGSVGElement>(null);
  const nodeRefs = useRef<(SVGGElement | null)[]>([]);
  const edgeRefs = useRef<(SVGLineElement | null)[]>([]);
  const offsets = useRef(nodes.map(() => ({ dx: 0, dy: 0 })));
  const pointer = useRef({ x: 50, y: 50, active: false });
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const phase = nodes.map((_, i) => i * 1.3);
    const speed = nodes.map((_, i) => 0.16 + (i % 4) * 0.04);
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const p = pointer.current;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const amp = n.hub ? 0.8 : 1.7;
        let dx = reduce ? 0 : Math.sin(t * speed[i] + phase[i]) * amp;
        let dy = reduce ? 0 : Math.cos(t * speed[i] * 0.85 + phase[i]) * amp;

        // gentle parallax
        dx += ((p.x - 50) / 50) * 1.4 * n.depth;
        dy += ((p.y - 50) / 50) * 1.4 * n.depth;

        // cursor repulsion — nodes shy away from the pointer
        if (p.active) {
          const rx = n.bx - p.x;
          const ry = n.by - p.y;
          const d = Math.hypot(rx, ry) || 0.001;
          const R = 18;
          if (d < R) {
            const push = ((R - d) / R) * 7;
            dx += (rx / d) * push;
            dy += (ry / d) * push;
          }
        }

        const off = offsets.current[i];
        off.dx = dx; off.dy = dy;
        nodeRefs.current[i]?.setAttribute("transform", `translate(${dx.toFixed(2)} ${dy.toFixed(2)})`);
      }

      edges.forEach(([a, b], k) => {
        const line = edgeRefs.current[k];
        if (!line) return;
        line.setAttribute("x1", (nodes[a].bx + offsets.current[a].dx).toFixed(2));
        line.setAttribute("y1", (nodes[a].by + offsets.current[a].dy).toFixed(2));
        line.setAttribute("x2", (nodes[b].bx + offsets.current[b].dx).toFixed(2));
        line.setAttribute("y2", (nodes[b].by + offsets.current[b].dy).toFixed(2));
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [nodes, edges]);

  const onMove = (e: React.PointerEvent) => {
    const r = svgRef.current?.getBoundingClientRect();
    if (!r) return;
    pointer.current.x = ((e.clientX - r.left) / r.width) * 100;
    pointer.current.y = ((e.clientY - r.top) / r.height) * 100;
    pointer.current.active = true;
  };
  const onLeave = () => {
    pointer.current.active = false;
    pointer.current.x = 50;
    pointer.current.y = 50;
  };

  // Highlight set: hovered node + its neighbours
  const isHi = (i: number) =>
    hover === null || i === hover || adj[hover].has(i);
  const edgeHi = (a: number, b: number) =>
    hover === null || a === hover || b === hover;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full overflow-visible select-none"
      role="img"
      aria-label="Knowledge graph of focus areas: AI systems, agents, second brain, markets, horology, philosophy"
    >
      {/* Edges */}
      <g>
        {edges.map(([a, b], k) => {
          const hi = edgeHi(a, b);
          return (
            <line
              key={k}
              ref={(el) => { edgeRefs.current[k] = el; }}
              x1={nodes[a].bx} y1={nodes[a].by}
              x2={nodes[b].bx} y2={nodes[b].by}
              stroke={hover !== null && hi ? `var(${nodes[hover].color})` : "var(--ink)"}
              strokeOpacity={hover === null ? 0.16 : hi ? 0.85 : 0.04}
              strokeWidth={hover !== null && hi ? 0.45 : 0.28}
              style={{ transition: "stroke 0.4s ease, stroke-opacity 0.4s ease, stroke-width 0.4s ease" }}
            />
          );
        })}
      </g>

      {/* Nodes */}
      {nodes.map((n, i) => {
        const hi = isHi(i);
        const focused = hover === i;
        const showLabel = n.hub || focused || (hover !== null && hi);
        const r = radii[i];
        return (
          <a key={n.key} href={n.href} aria-label={`Go to ${n.label}`}>
            <g
              ref={(el) => { nodeRefs.current[i] = el; }}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
              className="cursor-pointer"
              style={{ opacity: hi ? 1 : 0.18, transition: "opacity 0.4s ease" }}
            >
              {/* glow on focus */}
              <circle
                cx={n.bx} cy={n.by}
                r={focused ? r * 2.4 : r * 1.6}
                fill={`var(${n.color})`}
                opacity={focused ? 0.22 : 0}
                style={{ transition: "r 0.4s ease, opacity 0.4s ease" }}
              />
              {/* dot */}
              <circle
                cx={n.bx} cy={n.by}
                r={focused ? r * 1.18 : r}
                fill={`var(${n.color})`}
                stroke="var(--paper)"
                strokeWidth={n.hub ? 0.4 : 0.25}
                style={{ transition: "r 0.3s ease" }}
              />
              {/* label */}
              <text
                x={n.bx}
                y={n.by - r - 1.6}
                textAnchor="middle"
                fontSize={n.hub ? 3.1 : 2.5}
                fill="var(--ink)"
                fillOpacity={showLabel ? (n.hub ? 0.85 : 0.7) : 0}
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  letterSpacing: "0.02em",
                  transition: "fill-opacity 0.35s ease",
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

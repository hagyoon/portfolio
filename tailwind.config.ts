import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base — soft warm beige, light and airy
        paper: "#f6f3ec",       // cream
        ivory: "#efebe0",       // raised panel
        bone: "#e8e3d5",        // card surface
        sand: "#dad3c0",        // dividers, secondary surfaces
        // Text — soft green-tinged charcoal, never pure black
        ink: "#272a22",
        // Stones — warm-grey ramp on light ground
        stone: {
          50: "#f1eee6",
          100: "#e6e2d6",
          200: "#d0cbbb",
          300: "#aaa593",
          400: "#8b8775",
          500: "#6d6a5b",
          600: "#535145",
          700: "#3c3b32",
          800: "#2a2a23",
          900: "#1b1b16",
        },
        // Soft modern accents — tangerine leads, sage seconds
        butter: "#ec8e3f",      // soft tangerine
        sage: "#85a87b",        // soft sage green
        mist: "#84a8c0",        // light blue
        blush: "#d98a6e",       // soft coral
        lavender: "#a7a0c2",    // soft violet
        forest: "#3d5745",      // grounded deep green
        // Legacy accent names, re-tinted to match
        terracotta: "#c96f4a",
        clay: "#ec8e3f",
        moss: "#85a87b",
        ochre: "#c89a4f",
      },
      fontFamily: {
        // Mondwest leads the display stack; Cormorant holds until the file lands
        serif: ["Mondwest", "var(--font-serif)", "Cormorant Garamond", "serif"],
        // Body is typewriter mono, Hermes-style
        sans: ["var(--font-mono)", "Courier Prime", "ui-monospace", "monospace"],
        mono: ["var(--font-mono)", "Courier Prime", "ui-monospace", "monospace"],
        condensed: ["Collapse", "var(--font-serif)", "serif"],
        wide: ["Rules Expanded", "var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
        wider: "0.08em",
        widest: "0.18em",
      },
      fontSize: {
        "display-xl": ["clamp(4rem, 12vw, 12rem)", { lineHeight: "0.92", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(3rem, 8vw, 8rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(2.25rem, 5vw, 4.5rem)", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

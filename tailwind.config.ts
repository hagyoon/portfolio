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
        // Base — warm paper, more clay-tinted
        paper: "#efe7d6",       // warmer sand-cream (was #f4f1ec)
        ivory: "#e3d9c3",       // deeper warm beige (was #ece8e1)
        bone: "#ebe2cf",        // card / panel surface
        sand: "#d3c4a6",        // section dividers, secondary surfaces
        // Text — richer warm black
        ink: "#1e1a13",         // warmer than pure black (was #16140f)
        // Stones — shifted toward clay-tan across the scale
        stone: {
          50: "#ede4d2",
          100: "#dccfb1",
          200: "#c3b48f",
          300: "#a89878",       // was #aaa094 — warmer
          400: "#857562",       // was #857c72
          500: "#665849",       // was #615a52 — warmer
          600: "#4b3f33",       // was #46413b
          700: "#352c23",       // was #33302b
          800: "#251e17",       // was #26231f
          900: "#19140e",       // was #1a1816
        },
        // Earth accents — used sparingly
        terracotta: "#a85f3d",  // deeper, more pigmented (was #b07a5b)
        clay: "#c4825c",        // softer ember
        moss: "#75836a",        // muted olive-moss
        ochre: "#b1864a",       // warm yellow-brown
        sage: "#8b9582",        // quieter sage (was #9aa291)
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
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

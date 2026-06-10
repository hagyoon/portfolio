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
        // Base — neutral porcelain, cooler and quieter than the old clay
        paper: "#f7f5f1",       // porcelain
        ivory: "#efece6",       // fog
        bone: "#e9e5dd",        // card / panel surface
        sand: "#ddd8ce",        // section dividers, secondary surfaces
        // Text — soft graphite, never pure black
        ink: "#21201c",
        // Stones — neutral warm-grey scale
        stone: {
          50: "#f2f0eb",
          100: "#e6e3db",
          200: "#cfcbc0",
          300: "#afaaa0",
          400: "#8e897f",
          500: "#6f6a61",
          600: "#55514a",
          700: "#3e3b35",
          800: "#2b2925",
          900: "#1b1a17",
        },
        // Pastel accents — used sparingly, one per section at most
        mist: "#a9bfcc",        // powder blue
        blush: "#d9b9ae",       // muted rose
        sage: "#a9b4a0",        // quiet green
        lavender: "#b6afc6",    // grey violet
        butter: "#decfa8",      // pale straw
        // Legacy accent names, re-tinted pastel so older pages keep working
        terracotta: "#b98a72",
        clay: "#c4a18a",
        moss: "#99a68f",
        ochre: "#c2a878",
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

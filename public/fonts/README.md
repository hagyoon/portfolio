# Fonts

The site now runs entirely on Google-hosted faces loaded via `next/font` in
`app/layout.tsx` — nothing needs to be dropped in here:

| Role | Face | Where |
| --- | --- | --- |
| Display / headings | **Cormorant Garamond** (300) | `--font-serif` |
| Body / reading | **EB Garamond** (400–600) | `--font-body` |
| Labels, nav meta, studio UI | **Atkinson Hyperlegible** | `--font-sans` |
| Code / tabular | system mono stack | `--font-mono` |

The earlier local-file slots (Mondwest, Collapse, Rules Expanded) were part of
the retired terminal-aesthetic direction and have been removed. If you ever
want a licensed display face again, add an `@font-face` block at the top of
`app/globals.css` and put it in front of `--font-serif` in the
`.display-*` rules and the `@layer base` heading stack.

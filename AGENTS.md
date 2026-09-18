# Portfolio

Canonical source: `/home/workspace/Projects/portfolio`. The separate `/home/workspace/portfolio` directory is an older copy. Read README.md for the markdown content schema; some hosting and visual notes there predate the redesign.

## Hosting and review

- Existing public portfolio: service `svc_1v35r_Tpkso`, port 3000, production `.next` build, https://portfolio-hagyoon.zocomputer.io.
- September 2026 redesign preview: private service `svc_LgzXy33xFH8`, port 3001, https://portfolio-preview-hagyoon.zo.computer. Uses `PORTFOLIO_DIST_DIR=.next-preview`.
- Build the review version with `PORTFOLIO_DIST_DIR=.next-preview npm run build`, then restart only the preview service through Zo's service tool. Do not rebuild `.next` or restart the public service until publishing is authorised.
- The preview uses the same content directory. Avoid editing content through its admin panel as a test. Preview has no production admin credentials configured.
- Public release requires a production build and managed service restart; restarting alone does not compile source changes.

## Design and protected behaviour

- Warm limestone, sage, clay, and muted lilac; crisp sans-serif interface with selective italic Garamond and serif article text.
- `app/redesign.css` contains the redesign tokens and responsive styles. `components/graphics/ProjectArt.tsx` provides lightweight code-drawn illustrations.
- Hero controls and `SystemPlayground` explain the actual themes of the portfolio. Keep interactions operable by keyboard and respect reduced motion.
- Preserve markdown loading, project URLs, writing/notes/field-notes/library search, RSS, admin authentication, and the Telegram contact handoff. Contact prepares a message; it does not send one.
- Market Ledger's canonical external destination is https://hagyoon.zo.space/ftracker.
- Content sync can overwrite direct edits to `content/`; see README.md for the Obsidian source path. Keep redesign work in components and styles where possible.

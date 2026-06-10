# Display fonts

Drop these files here to activate the full type system (declared in
`app/globals.css`; the site falls back gracefully while they're missing):

| File | Used for | Where to get it |
| --- | --- | --- |
| `Mondwest-Regular.woff2` | All headings & display type | [PP Mondwest](https://pangrampangram.com/products/mondwest) — free personal-use license |
| `Collapse-Bold.woff2` | Marquee band | Nous Research's licensed face — needs the file from a licensed source |
| `RulesExpanded-Bold.woff2` | Labels / eyebrows | Same as above |

Courier Prime (body & terminal) loads from Google Fonts — nothing to do.

If you have `.otf`/`.ttf` files, convert to woff2 first:
`npx fonteditor-core` or https://cloudconvert.com/otf-to-woff2 — then name
them exactly as above.

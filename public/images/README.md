# Images

Drop your own images here. Folder names match the categories used in
`/content/gallery.ts` and `/content/projects.ts`.

```
/public/images/
├── projects/    — Hero shots for each project (referenced from projects.ts)
├── watches/     — Horology shots (referenced from gallery.ts)
├── workspace/   — Desk, terminal, obsidian screenshots
├── portraits/   — Portrait / about-page images
└── diagrams/    — Architecture diagrams, system illustrations
```

## Naming convention

Lowercase, hyphenated, descriptive. The filename ends up in the URL.

```
✅  cartier-tank-must.jpg
✅  openclaw-architecture.png
❌  IMG_1234.JPEG
❌  Screenshot 2026-04-21 at 11.32.51.png
```

## Recommended formats and sizes

- **JPG** for photography (1600px wide max, ~85% quality)
- **PNG** for screenshots and diagrams with sharp edges
- **AVIF** for best compression if you can export it
- Next.js will optimise and resize automatically on the fly

## Referencing in content files

Once a file is here, reference it as an absolute path starting with `/images/`:

```ts
// In content/projects.ts:
image: "/images/projects/openclaw.jpg"

// In content/gallery.ts:
src: "/images/watches/cartier-tank-must.jpg"
```

## Hiding an image entry

To temporarily hide an image without deleting the file:

```ts
// In content/gallery.ts, just comment out the block:
// {
//   src: "/images/watches/cartier-tank-must.jpg",
//   ...
// },
```

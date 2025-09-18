# Julián Casaburi — Personal Portfolio

My personal website and portfolio built with Astro and TypeScript. Based on the excellent Astro Theme Pure: https://github.com/cworld1/astro-theme-pure

Live site: https://casaburi.dev/

## Develop locally

Requirements: Node.js 18+

Install dependencies and start the dev server (pick one):

```sh
# Bun
bun install
bun run dev

# npm
npm install
npm run dev

# pnpm
pnpm install
pnpm dev
```

Other useful scripts:

```sh
# type-check and build
npm run build

# preview the production build
npm run preview

# lint & format
npm run lint
npm run format
```

## Project structure

- `src/pages/` — static pages (about, projects, etc.)
- `src/content/` — Markdown content (blog, docs)
- `src/components/` — UI components
- `src/layouts/` — page layouts
- `public/` — static assets (icons, images, fonts)
- `src/site.config.ts` — site metadata and footer options

## Deploy

The site is a static build. Run a production build and deploy the `dist/` folder to any static host (GitHub Pages, Vercel, Netlify, etc.).

```sh
npm run build
npm run preview
```

## License

Apache-2.0 — see `LICENSE`.

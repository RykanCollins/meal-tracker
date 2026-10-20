# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server at http://localhost:3000
npm run build     # production build
npm run start     # run the production build locally
npm run lint      # run ESLint
```

No test runner is configured yet.
collinsportaz
## Architecture

This is a **Next.js 16 App Router** project (React 19, TypeScript, Tailwind CSS v4). The meal-tracker feature has not been built yet — `app/page.tsx` is still the default create-next-app scaffold.

- `app/` — all routes and UI (App Router convention)
  - `layout.tsx` — root layout with Geist fonts and full-height flex body
  - `page.tsx` — home route (`/`)
  - `globals.css` — Tailwind base styles
- `@/*` path alias maps to the repo root

## Important notes

**Next.js 16 breaking changes:** Before writing any routing, data-fetching, or config code, read the relevant guide in `node_modules/next/dist/docs/` — `AGENTS.md` in the repo root enforces this. APIs and conventions differ significantly from earlier versions.

**`LayoutProps` generic:** `layout.tsx` uses `LayoutProps<"/">` — a Next.js 16 built-in typed layout prop. Follow the same pattern for any nested layouts.

**Tailwind v4:** Configured via `postcss.config.mjs` / `@tailwindcss/postcss`. There is no `tailwind.config.js` — use CSS-first configuration in `globals.css` instead.

# SILVAN Digital Studio

The website of SILVAN Digital Studio — Silvan Hahn, independent digital
developer in Switzerland. German and English, statically rendered. The only runtime
dependencies are Next.js, React and Vercel's cookieless analytics.

Live domain: **https://silvandigital.ch**

## Requirements

- Node.js `^20.9.0 || >=22.0.0`

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (32 static routes) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Unit tests (Vitest) |
| `npm run test:e2e` | End-to-end tests (Playwright, builds first) |

## Environment

One variable decides whether this deployment is the real site or a preview.

```bash
NEXT_PUBLIC_SITE_URL=https://silvandigital.ch
```

**This has to be set in the Vercel project settings for production, or the site
stays invisible.** Without a valid `https` value:

- `robots.txt` serves `Disallow: /`, so no search engine indexes anything,
- no canonical URL is claimed,
- every page carries `noindex`.

That is deliberate — it keeps preview deployments out of the search index so
they can never compete with the production domain. It also means production
without the variable is a silent launch failure. Copy `.env.example` to
`.env.local` for local work.

## Deployment

1. Set `NEXT_PUBLIC_SITE_URL` in the Vercel project (Production environment).
2. Add `silvandigital.ch` as a domain in Vercel and let it be the primary one.
3. Enter the DNS records Vercel shows into the Infomaniak DNS zone.
4. Redeploy, then check `https://silvandigital.ch/robots.txt` actually reads
   `Allow: /`.

## Structure

```
src/
  app/          Routes. (de) and (en) are separate root layouts, so <html lang>
                really matches the page. Icons, manifest, robots, sitemap and
                the OG card are generated here.
  components/   Presentational units, one stylesheet each.
  content/      All copy, per language, typed against content/types.ts.
  features/     Whole pages, composed from components.
  lib/          Routing, locale, metadata and validation helpers.
  styles/       Design tokens, layout primitives, shared page scaffolding.
tests/
  unit/         Vitest, including a stylesheet contract test.
  e2e/          Playwright across Chromium, Firefox, WebKit and iPhone 13.
```

## Content

Copy lives in `src/content/de.ts` and `src/content/en.ts` and is checked against
`SiteContent`, so the two languages cannot drift apart in shape. Both are frozen
at runtime.

Two things are intentionally empty and should stay that way until they can be
filled truthfully:

- `home.testimonials` — the section renders only once a real, named client quote
  exists. No `Review` or `AggregateRating` markup is emitted until then.
- `public/images/portrait/` — no generated likeness stands in for a photograph.

The projects under `/work` are self-initiated concepts and are labelled as such
on every view, in the copy and in the imprint.

## Legal

`/imprint` and `/privacy` (and their `/en/...` equivalents) are generated from
`imprint` and `privacy` in the content files. If the hosting provider changes,
update the "Hosting" section in both languages — it currently names Vercel.

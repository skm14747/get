# GoEasyTools

English browser tools for text, calculators, images, and PDFs. Typed text and files stay in the visitor’s browser. This repository also keeps the Phase 1 and Phase 2 market research. Those files are historical and were not rewritten when the tools were added.

## Run locally

```bash
npm install
npm test
npm run dev
```

`npm run build` produces the static pages. Copy `.env.example` to `.env.local` only when you have a real site URL, contact address, Search Console verification token, or analytics endpoint. Leave secrets empty. Do not put tool inputs in environment variables.

The default canonical host is `https://goeasytools.com`. It is a planning value until DNS and hosting are approved.

## Routes

The home page lists every row in `lib/tools.ts`. English paths are unprefixed, including `/word-counter`, `/percentage-calculator`, `/discount-calculator`, `/case-converter`, `/json-formatter`, `/character-counter`, `/age-calculator`, `/qr-code-generator`, `/password-generator`, `/image-compressor`, `/image-resizer`, `/merge-pdf`, `/split-pdf`, `/jpg-to-pdf`, `/unit-converter`, `/date-calculator`, `/gst-calculator`, `/emi-calculator`, and `/base64`. There is no compress-PDF route. `/privacy` and `/contact` explain storage and the optional contact address.

## How to read the research

`research/` and `research/phase-2/` are the evidence baseline from 2026-10-24. Google Trends indexes in those files are not monthly search volume. Blank keyword metrics are unknown, not zero. `research/serp-url-audit/` explains why result URLs were not backfilled. `research/phase-3-file-tools/` records why PDF tools were not treated as a validated opportunity. The later browser PDF tools do not change that research conclusion, and they do not compress PDFs.

The intended launch set is ten languages, listed in `lib/locales.ts`. Only English is published. See `docs/internationalization.md`.

Current planning notes are `docs/implementation-plan.md`, `docs/tool-opportunity-matrix.md`, `docs/seo-checklist.md`, `docs/monetization.md`, and `docs/privacy-security.md`. Older planning remains in `docs/roadmap/`.

## Checks

`npm test`, `npm run typecheck`, `npm run lint`, and `npm run build` are the local equivalents of `.github/workflows/ci.yml`.
# get

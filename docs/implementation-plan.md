# Implementation plan

Written 2026-10-24 after inspecting the repository and then implementing the requested tools. This file describes the application as it is now. It does not replace the historical research in `research/` or `research/phase-2/`.

## Current architecture

The site is a Next.js 15 App Router application with React 19, TypeScript, and Tailwind 4. There is no database, account system, or server upload route. Tool math and file transforms live in `lib/`. Each tool page is a server component that renders `ToolPage`, a client control, and an explanation. English URLs are unprefixed. `app/[locale]` exists only to reject unpublished prefixes with `notFound()`.

The registry is `lib/tools.ts`. The sitemap reads published paths from `lib/hreflang.ts`. Analytics payloads are filtered in `lib/analytics.ts`. Consent is stored locally and events are not sent unless `NEXT_PUBLIC_ANALYTICS_ENDPOINT` is an approved URL and the visitor has granted consent.

Dependencies added for this work are `pdf-lib` and `qrcode`. Both are imported only from the PDF and QR tools, and the PDF library is loaded with a dynamic import when the visitor runs the tool.

## What was already worth keeping

- Browser-side word, percentage, discount, and case logic, with tests.
- Absolute titles, canonical URLs that drop queries, and structured data limited to `WebApplication` and `BreadcrumbList`.
- The consent gate and the analytics allow-list.
- The decision that English stays unprefixed and that a second locale is not published until its catalog and slugs are real.
- Phase 1 and Phase 2 research files, including blank SERP URLs.

## Gaps and risks

- Nine locales are still blocked. See `docs/internationalization.md`.
- Search volume, keyword difficulty, CPC, and publisher RPM were not measured. Trends indexes are not volume.
- PDF compression is not implemented. A pdf-lib rewrite does not recompress images, and no server processor was approved.
- The root layout’s `lang` is static English, so a prefixed locale cannot be honest until document language is per request.
- Japanese word counts still split on whitespace.
- `npm audit` on 2026-10-24 reported five advisories in the Next/PostCSS and Vitest trees. They were not force-upgraded. They are build and test tooling, not a browser upload service.
- Core Web Vitals were not measured in the field.

## Shared architecture

New tools use the same registry, `ToolPage`, related links, and `useToolSession`. Expected failures return `{ ok: false, reason }` from `lib/`. Guides are server-rendered on the page. Heavy PDF and QR code stay off the other routes.

## Tool order and status

| Phase | Tool | Status |
| --- | --- | --- |
| 1 | Word counter | Working. Whitespace word counts, including the Japanese limitation. |
| 1 | Percentage calculator | Working, including reverse increase and reverse discount. |
| 1 | Discount calculator | Working. Successive discounts and a currency format for USD, EUR, GBP, INR, BRL, and SAR. Yen is omitted because amounts use hundredths. |
| 1 | Case converter | Working. Text with no case distinction is left unchanged and the page says so. |
| 1 | JSON formatter | Working. `JSON.parse` and `JSON.stringify` only. Inputs over 1,000,000 characters are refused. |
| 2 | Character counter | Working. Optional limit and remaining count. Same character rules as the word counter. |
| 2 | Age calculator | Working. Leap-day anniversaries use February 28 in a non-leap year. |
| 2 | QR code generator | Working for URL, text, and Wi-Fi. Contact cards were not added. |
| 2 | Password generator | Working. `crypto.getRandomValues`, rejection sampling, local only. |
| 2 | Image compressor | Working in the browser. JPEG and WebP honor quality. PNG canvas export is lossless and the page says so. |
| 3 | Image resizer | Working, with an optional aspect-ratio lock. |
| 3 | Merge PDF | Working in the browser. Encrypted files are refused. |
| 3 | Split PDF | Working for inclusive ranges such as `1-3,5`, as one output file. |
| 3 | Compress PDF | Not implemented. See the decision log. |
| 3 | JPG to PDF | Working for JPG and PNG. WebP is refused. |
| 4 | Unit converter | Working for length, mass, temperature, area, volume, and speed. |
| 4 | Date calculator | Working. Business days are Monday to Friday only. No holiday calendar was sourced. |
| 4 | GST calculator | Working from a rate the visitor enters. Not a tax-rate lookup and not tax advice. |
| 4 | EMI calculator | Working, with a schedule capped at 360 months. Not a loan offer. |
| 4 | Base64 | Working for UTF-8 text. The page says this is not encryption. |

## Internationalization

Ten locale records exist. Only English is published. Do not fill the other catalogs with unreviewed text. Details are in `docs/internationalization.md`.

## SEO and monetization

English tool pages are indexable, with unique titles, descriptions, canonicals, and Open Graph fields. `hreflang` stays empty until a second locale is actually published. Ads are not rendered. Details are in `docs/seo-checklist.md` and `docs/monetization.md`.

## Test and release plan

`npm test`, `npm run typecheck`, `npm run lint`, and `npm run build` are the checks. Do not deploy, change DNS, or submit a sitemap until that is explicitly requested. Search Console is not connected. A locale ships only after native review, researched slugs, and a per-request `lang` and `dir`.

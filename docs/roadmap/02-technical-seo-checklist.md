# Technical SEO checklist

Reviewed 2026-10-24 against the implementation in this repository. “Verified” means checked in code or by the production build. It does not mean a search engine has fetched the site.

## Implemented

| Item | Status | Where |
| --- | --- | --- |
| Titles and descriptions | Implemented | `lib/seo.ts`, each page’s `metadata` |
| Canonical URLs | Implemented | `canonicalUrl()` strips queries, hashes, and trailing slashes. Tested in `tests/seo.test.ts` |
| Sitemap | Implemented | `app/sitemap.ts` lists every published English path from `publishedIndexablePaths()`, including the tools in `lib/tools.ts`, plus `/`, `/privacy`, and `/contact`. Updated 2026-10-24 after the registry grew past the original four tools |
| Robots | Implemented | `app/robots.ts` allows `/` and points at the sitemap |
| Internal links | Implemented | Home, header, and related-tool links |
| One h1 and explanatory headings | Implemented | Tool pages render an h1 and server-rendered h2 sections |
| Crawlable explanations | Implemented | Guides are server components |
| Open Graph title, description & image | Implemented | Emits 1200x630 static OG cards via `app/opengraph-image.tsx` and `lib/seo.ts` |
| Not found | Implemented | `app/not-found.tsx` |
| Trailing slash | Implemented | `trailingSlash: false` in `next.config.ts` |
| Query parameters | Implemented | Tool state is not copied into the URL, so a query does not create a second indexable version. The canonical omits it |
| Structured data | Implemented | `WebApplication` with domain categories (`FinanceApplication`, `DeveloperApplication`, etc.) and `BreadcrumbList` via `lib/schema.ts` |
| AI Search Manifests | Implemented | `public/llms.txt` and `public/llms-full.txt` |
| Category Pillars & Intent Bridges | Implemented | Educational category overviews in `app/topics/*` and task-chaining in `components/tool-intent-bridge.tsx` |
| `lang` | Implemented | `<html lang="en">` |

The build output lists every route as static.

## Search intent

| Page | Primary query | Evidence | Related queries kept on the same URL |
| --- | --- | --- | --- |
| Word counter | word counter | Phase 2 US Trends index 64 beside percentage calculator at 74. Volume unknown. US results page led by wordcounter.net | Character count, sentence count, reading time |
| Percentage calculator | percentage calculator | Phase 2 US Trends index 74 on the anchor chart. Volume unknown. Google’s calculator was on the US results page | What percent, increase, decrease, difference, percentage change |
| Discount calculator | discount calculator | Phase 2 US Trends index 13 beside 74. Volume unknown. Results page not collected | Amount off, second discount |
| Case converter | case converter | Phase 2 US Trends index 10 beside 74. Volume unknown. Results page not collected | The eight case names |

No extra URLs were created for those variants. Monthly volume is unknown for all four.

## Not verified

- Google’s rendering of the pages. The site is not deployed.
- Search Console verification. Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` to the token from the property, rebuild, and confirm the meta tag in the HTML. The HTML tag method is the one this code supports. DNS and file methods are not configured.
- Index coverage, enhancements, and the structured-data testing tool.
- A results-page check for the discount calculator and the case converter.
- Whether the canonical host will be `www` or the apex. The default is `https://goeasytools.com`. Change `NEXT_PUBLIC_SITE_URL` before launch and do not publish both hosts without a redirect.

## Search Console steps, when a property is approved

1. Add the property for the exact host in `NEXT_PUBLIC_SITE_URL`.
2. Choose the HTML tag method and put only the token in `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
3. Deploy and confirm the tag is present.
4. Submit `https://<host>/sitemap.xml`.
5. Inspect `/`, `/word-counter`, and `/percentage-calculator` first.
6. Wait for a query report before rewriting titles. Do not invent the queries that report will show.

## Duplicate-URL check

The tool registry test requires unique paths with no trailing slash and no query. There is no `/en/` alias. A second locale, when it exists, needs its own path and a reciprocal `hreflang` pair. Do not add `hreflang` while English is the only published locale.

## Redirects

No legacy routes exist, so no redirects were added. Add a redirect only when a public URL actually changes.

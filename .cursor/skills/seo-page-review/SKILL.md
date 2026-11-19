---
name: seo-page-review
description: Audits a GoEasyTools page for indexability, metadata, content, accessibility, and unsupported claims. Use when reviewing SEO, a tool page, the sitemap, robots, or canonical URLs.
---

# SEO page review

## When to use

Use this for one URL or a set of related tool pages. Do not claim a ranking you did not measure.

## Inputs

- Path or paths, such as `/word-counter`
- The intended task and query group, if known

## Steps

1. Read the route, `lib/tools.ts`, `lib/seo.ts`, `lib/site.ts`, `app/sitemap.ts`, `app/robots.ts`, the guide component, and `docs/roadmap/02-technical-seo-checklist.md`.
2. State the user task. Confirm the page is the only indexable URL for that task.
3. Check the title, meta description, canonical, `h1`, heading order, and `robots`. Canonicals must match `canonicalUrl` and must not include a query.
4. Confirm the guide and the tool explanation are in server-rendered components, not only in client state.
5. Check `related` links for relevance and for paths that exist.
6. Inspect JSON-LD in `components/tool-page.tsx` only for fields the page actually supports. Do not add review or rating markup.
7. Check the layout at a narrow width and the labeled controls. Use the accessibility rule for the interaction.
8. Run `npm run build` when you need the production route output. Use a measured performance tool only if it is already available. Do not invent Core Web Vitals.
9. Check claims against `lib/` and the research files. Remove or rewrite anything the code does not do.
10. Confirm analytics and privacy copy still match `lib/analytics.ts` and `app/privacy/page.tsx`.

## Verification

Reproduce a finding from a file path or a page you opened. After an approved fix, re-read the changed route and re-run the test or build you actually ran.

## Deliverable

Findings with severity, evidence, location, and a proposed fix:

- **Blocker:** indexable duplicate, wrong canonical, false claim, or private input in a URL
- **High:** missing crawlable explanation, broken internal link, or invalid structured data
- **Medium:** weak title, heading skip, or thin supporting copy
- **Note:** unverified ranking or performance

Fix only the issues the task approves.

# SEO checklist

Updated 2026-10-24. “Implemented” means the repository does it. It does not mean a search engine has crawled the site. Search Console is not connected. No sitemap has been submitted.

| Requirement | Status |
| --- | --- |
| Server-rendered tool explanation | Implemented. The control is a client component. The guide is in the server page. |
| Unique title and meta description | Implemented through `toolMetadata` and `pageMetadata`. Titles are absolute and end with `· GoEasyTools`. |
| Canonical URL | Implemented. Queries, hashes, and trailing slashes are removed. |
| `hreflang` | Implemented as an empty set until two locales are published. The reciprocal fixture is tested. |
| `x-default` | Only in that two-locale fixture, pointing at English. |
| `lang` and Arabic direction | Root `lang` is `en`. Arabic `dir` is recorded and not yet used on a public page. |
| Visible headings and instructions | Implemented in English. |
| Sitemap | `app/sitemap.ts` emits `publishedIndexablePaths()`. Unpublished prefixes are absent. |
| Robots | `app/robots.ts` allows `/` and links the sitemap. Unfinished locales are not routes that return 200. |
| Open Graph | Title, description, URL, site name, and `en_US`. No image. |
| Related tools | Registry `related` ids. |
| Breadcrumbs | Visible and as `BreadcrumbList`. |
| Structured data | `WebApplication` and `BreadcrumbList` only. No ratings or reviews. |
| Thin locale pages | Not published. |
| Compress PDF | Not in the registry and not in the sitemap. |

Do not add a near-duplicate URL for a mode that already lives on a tool page. Do not invent rankings or Core Web Vitals.

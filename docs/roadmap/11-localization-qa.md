# Localization QA checklist

Written 2026-10-24. English is the only published locale. The other nine intended launch languages are implemented as registry entries and are not routed.

Use this list before changing `published` to true. A locale is not ready when any content row is open.

## Content

| Check | English | Other nine locales |
| --- | --- | --- |
| Source or native-approved copy, not an unreviewed draft | Source copy authored in English | Open. No native review is recorded |
| Chrome, validation, guides, titles, and descriptions exist for every key in `locales/en.ts` | `missingTranslationKeys` passes | Open. No catalog file |
| Examples were recalculated in that locale’s number format | English examples use the dot decimal | Open |
| Tool slugs come from a cited local query, not a literal translation of the English path | English slugs match the current routes | Open. Slug maps are empty |
| Page is the same tool, not a near-duplicate keyword URL | One URL per tool | Must stay one URL per tool per locale |

## Routing and metadata

| Check | Current result |
| --- | --- |
| Canonical URL has no query and no trailing slash | Covered by `tests/seo.test.ts` |
| Unpublished prefixes are absent from `publishedIndexablePaths()` and the sitemap | Covered by `tests/locales.test.ts` |
| `/es`, `/ar`, and other prefixes resolve to not-found until publication | `resolvePrefixedRequest` returns null, and `app/[locale]` calls `notFound()` |
| Reciprocal `hreflang`, including a self reference and `x-default`, appears only when at least two locales are published | Fixture test passes. Live metadata emits none, because only English is published |
| `<html lang>` and `dir` match the locale | Live root layout is `lang="en"` and left to right. A prefixed locale cannot be published until the document element itself changes. An inner wrapper is not sufficient |
| Arabic `dir="rtl"` | Registry and a jsdom frame test. Not checked on the tool templates with Arabic copy |

## Behavior

| Check | Current result |
| --- | --- |
| Calculations stay in shared `lib/` functions | Unchanged |
| Locale number formatting is separate from the English parser | `formatLocaleDecimal`. The English inputs still reject commas |
| Arabic, Hindi, and Japanese fixtures | Spaced Arabic and Hindi count as separate words. `こんにちは世界` is one whitespace word and seven characters. Japanese needs a segmentation decision before launch |
| RTL layout on the actual tool screens | Not run |
| Screen reader in each language | Not run |

## Approval

Do not flip `published` in `lib/locales.ts` until the content rows for that locale are closed and this checklist is updated with the reviewer’s name and date.

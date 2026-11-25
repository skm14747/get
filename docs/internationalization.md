# Internationalization

Updated 2026-11-25.

## Published set

`lib/locales.ts` records ten intended locales: `en`, `es`, `fr`, `ar`, `pt-BR`, `de`, `ja`, `hi`, `id`, and `it`. All ten have `published: true`. English URLs have no `/en` prefix. The other nine use a prefix strategy (e.g. `/es/contador-de-palabras`).

`hreflang` links are emitted for all published locales. `x-default` points at the English URL. Each locale has researched tool slugs in the native language. The root layout reads the `x-locale` header (set by middleware) to set `<html lang>` and `<html dir>` server-side.

## Translation status

Chrome strings (navigation, consent banner, error pages) live in `locales/{code}.ts`. All nine non-English catalogs were AI-translated and are marked `translationReview: "ai-translated"`. `publicationWarnings()` flags these for native review. `canPublish()` returns `true` — AI translations are publishable but carry a warning.

## Resolved blockers

| Blocker | Resolution |
| --- | --- |
| No locale catalogs | Created `locales/{code}.ts` for all 9 non-English locales |
| Document language stuck on English | Root layout reads `x-locale` header from middleware, sets `lang`/`dir` |
| Japanese word segmentation | `countWords(text, "ja")` uses `Intl.Segmenter` with `granularity: "word"` |
| Arabic-Indic vs Western numerals | Decided: Western Arabic (`ar-u-nu-latn`). Standard for web tools. |
| RTL layout not checked | Arabic locale sets `dir="rtl"` via root layout. Verified with browser testing. |

## Remaining work

- **Native review**: All non-English catalogs need native speaker review. Set `translationReview: "native-approved"` after review.
- **Tool labels and guides**: Currently served in English for all locales. Full localization of tool-specific content (titles, descriptions, guide text) is a future milestone.
- **Word counter UI**: The word counter tool does not yet pass the user's locale to `countText()`. When it does, CJK users will get proper word segmentation.

## Formatting

`formatLocaleDecimal` covers the launch number locales and is tested. Arabic uses `ar-u-nu-latn` for Western numerals. The English parser still rejects commas so `1,000` is not read as `1`. Discount currency uses `Intl` with an explicit currency code. Dates in the age and date tools are `YYYY-MM-DD` calendar dates via UTC ordinals, so a local timezone does not move the day.

## What a future locale page must include

Translated navigation, labels, errors, the guide, the title, and the meta description. No concatenated sentence fragments. No raw keys. `hreflang` must be reciprocal for the pages that exist in both locales and must be omitted for a tool that has no equivalent URL.

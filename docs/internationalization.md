# Internationalization

Updated 2026-10-24.

## Published set

`lib/locales.ts` records ten intended locales: `en`, `es`, `fr`, `ar`, `pt-BR`, `de`, `ja`, `hi`, `id`, and `it`. Only `en` has `published: true`. English URLs have no `/en` prefix. The other nine use a prefix strategy but `resolvePrefixedRequest` returns null, and `app/[locale]` calls `notFound()`.

`hreflang` is empty while fewer than two locales are published. `x-default` is added only in the fixture that publishes a second complete locale, and it points at the English URL. A prefixed locale is not publishable until every tool has a researched slug. `publicationReady` checks that.

## Why the other nine are blocked

- There is no native-reviewed catalog. `locales/en.ts` is English chrome only. Tool labels and guides are English source copy beside the components. Missing keys are detected by `missingTranslationKeys`.
- Local slugs were not researched, so they are not invented.
- The root document `lang` is still `en`. An inner `dir` wrapper would not make an Arabic URL honest.
- Japanese word counting is whitespace segmentation. `こんにちは世界` is one word and seven characters. That is tested, and it blocks `ja`.
- Arabic-Indic versus Western numerals are undecided. RTL was checked as a `dir` attribute in jsdom, not with Arabic copy on the live templates. jsdom does not apply the user-agent `dir` stylesheet, so tests do not read computed `direction`.

Publishing English source under a Spanish URL, or shipping machine-translated filler, is not allowed. A locale can ship only after a native-reviewed catalog, cited slugs, and per-request `lang` and `dir`.

## Formatting

`formatLocaleDecimal` covers the launch number locales and is tested. The English parser still rejects commas so `1,000` is not read as `1`. Discount currency uses `Intl` with an explicit currency code. Dates in the age and date tools are `YYYY-MM-DD` calendar dates via UTC ordinals, so a local timezone does not move the day.

## What a future locale page must include

Translated navigation, labels, errors, the guide, the title, and the meta description. No concatenated sentence fragments. No raw keys. `hreflang` must be reciprocal for the pages that exist in both locales and must be omitted for a tool that has no equivalent URL.

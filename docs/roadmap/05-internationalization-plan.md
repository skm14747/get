# Internationalization plan

Written 2026-10-24. Updated the same day for a ten-locale launch request. English is still the only published locale. Spanish, French, Arabic, Brazilian Portuguese, German, Japanese, Hindi, Indonesian, and Italian are registered in `lib/locales.ts` and are not routed. The quality bar and the market evidence are in `11-localization-qa.md` and `12-market-validation.md`. A locale is not being skipped because an English-only plan is preferred. It is unpublished because native review and local terminology are missing.

## Current shape

- `<html lang="en">`.
- `locales/en.ts` exports `locale`, `direction: "ltr"`, and the chrome strings used by the header, footer, consent banner, skip link, and not-found page.
- Tool explanations and form labels are still English source next to those components. Move them into the locale dictionary before a translator works on them. Do not translate the components in place.
- Numbers use `en-US` grouping and a dot decimal. The calculators reject commas so `1,000` is not silently read as `1`. A future locale can accept a local decimal separator only with its own parser tests.
- Dates and currency are not formatted because the tools do not show dates, and the discount calculator does not assume a currency.
- English URLs have no `/en` prefix. Adding that prefix later would create a duplicate of every current URL.

## Future routing

When a locale is actually published:

1. Add `/fr/...` or the chosen prefix. Keep the English URLs where they are.
2. Emit reciprocal `hreflang`, including a self-reference, only between pages that exist.
3. Add `x-default` only when a language chooser exists. Do not point it at an unfinished locale.
4. Give each locale its own title, description, canonical, and sitemap entries.
5. Set `dir="rtl"` from the locale dictionary for Arabic. The current CSS uses logical gaps more often than physical margins, but RTL still needs a layout pass. It has not been tested.
6. Ship translations only after a native reviewer reads the tool, the examples, and the search-intent notes.

## Expansion hypothesis

Phase 2’s order, which has to be recomputed if volume data arrives:

1. English experiment. In progress in this repository. Not launched.
2. French, starting with France if a results page and a volume export support a specific query.
3. Spanish, with Spain and each Latin American country judged separately. A Spain index is not a Mexico index.
4. Arabic, after RTL testing and country-specific research. Saudi Arabia, the UAE, Egypt, and Kuwait were not shown to share demand.

Direct translation of “word counter” or “percentage calculator” is not evidence of the local query. Phase 1 autocomplete and Phase 2 Trends already show different winning terms by country, especially for PDF tools. Those PDF terms are not a reason to translate the current four pages.

## Locale tests to add with the second language

- The decimal parser accepts that locale’s separator and still rejects ambiguous input.
- A fixture string for capitalization rules. The English converter documents that it uses `en-US` and mishandles Turkish casing.
- `hreflang` pairs are complete and do not reference a 404.
- The RTL page can be completed from the keyboard.

None of those tests exist yet, because the second locale does not exist.

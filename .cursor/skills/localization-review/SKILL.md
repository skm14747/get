---
name: localization-review
description: Reviews whether a GoEasyTools language or country variant is justified and correctly routed. Use when localizing, translating, adding hreflang, or evaluating a country-specific tool.
---

# Localization review

## When to use

The live site is English at unprefixed paths. Use this before adding a language, a country URL, or a translated page. A literal translation is not sufficient, and demand in one country does not transfer to another.

## Inputs

- Language and country
- Source path, such as `/word-counter` or a tax tool that does not exist yet

## Steps

1. Read `docs/roadmap/05-internationalization-plan.md`, `locales/en.ts`, the language gates in `research/06-mvp-roadmap.md`, and the current launch limit in `research/phase-2/08-revised-mvp-recommendation.md`.
2. Confirm the source page is a real tool with unique content. Do not localize a page that should not exist.
3. Research local wording from sources you can cite. French TVA is not Belgian TVA. Spanish IVA is not Latin American IVA. Record the source and date.
4. Check whether a person has reviewed the copy. Machine translation may draft. It must not ship.
5. Check formats: decimals, currency, dates, and numerals. The English parsers reject commas on purpose (`lib/numbers.ts`). A locale that uses a comma decimal needs an explicit parser and tests, not a silent change to the English tools.
6. If more than one language is live, each URL needs its own canonical. `hreflang` must list every live equivalent, including itself, plus `x-default` only when that URL exists. Do not add `hreflang` for a page that is not deployed.
7. For Arabic, require `dir="rtl"`, a font that covers the script, mixed-direction samples, and a numeral decision. Do not treat that as done because the HTML `lang` changed.
8. Check the header, footer, and language switcher. Links stay inside the active language unless the control is the switcher.
9. Reject scaled or near-duplicate translations. One country URL only when the tool itself changes, such as a sourced tax rate.
10. Run the locale tests that exist. If none exist, add them before calling the locale ready, and say they were added.

## Verification

List gates that are met and gates that are not. Unresolved legal, linguistic, or rate questions stay open.

## Approval

Do not publish a locale, add `hreflang`, or change the English URLs unless the task explicitly approves that release.

## Deliverable

A ready or not-ready decision. Not-ready is the expected result while the site is the four-tool English experiment.

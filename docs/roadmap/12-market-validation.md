# Market validation for the ten launch locales

Date: 2026-10-24. This report does not change Phase 1 or Phase 2 files. It separates measurements already in those files from assumptions. Demand, ranking difficulty, and publisher RPM are not treated as equal across locales.

## Measured

These figures are Google Trends indexes for web search, the past 12 months, exact terms, collected 2026-10-24. An index is relative to the other terms on the same chart. It is not monthly search volume. Volume, keyword difficulty, CPC, and publisher RPM were not measured for any locale.

| Locale | What was measured | What it does not say |
| --- | --- | --- |
| English | US chart: percentage calculator 74, word counter 64. Canada: percentage calculator 48, word counter 47. India: percentage calculator 6, word counter 2, on a chart peaked by merge PDF. US results pages were opened for the word counter and the percentage calculator | No volume. No RPM. US results do not describe the UK, Canada, Australia, or India |
| Spanish | Spain: “contador de palabras” 9, “calculadora de porcentajes” 0, on a chart peaked by “unir pdf” at 76. Mexico: “contador de palabras” 5, “calculadora de porcentajes” 1, peaked by “unir pdf” at 78. Index 0 is not zero demand | Spain is not Mexico. No results pages. No volume or RPM |
| French | France: “calcul pourcentage” 30, “compteur de mots” 5, on a chart peaked by “compresser pdf” at 77 | France is not Belgium, Switzerland, or French-speaking Canada. No results page. No volume or RPM |
| Arabic | Saudi Arabia: “حاسبة النسبة المئوية” and “عداد الكلمات” averaged 0 on a chart peaked by “دمج pdf” at 68. One week of the percentage term was 2 | Saudi Arabia is not the UAE, Egypt, or Kuwait. No results page. No volume or RPM |
| Brazilian Portuguese, German, Japanese, Hindi, Indonesian, Italian | No keyword row, Trends comparison, or results page in this repository | Nothing about demand or competition |

Discount-calculator and case-converter terms were not measured outside one US Trends chart (indexes 13 and 10 beside percentage calculator at 74). Those two have no results pages in any language.

## Assumptions, labeled as assumptions

- The four tools can share one calculation implementation across languages. This is an engineering assumption. It is already how `lib/` is structured.
- A translated interface would not by itself create a ranking. Phase 2 already treated translation as insufficient differentiation.
- Publisher RPM is unknown in every country, including the United States. No locale is marked more profitable than another.

## Terminology

Local wording that appears in the Trends file is evidence of a query that was compared, not proof that it should be the URL slug. “compteur de mots”, “contador de palabras”, and “عداد الكلمات” were the terms typed into those charts. They were not validated with a native speaker, a results page, or a volume export. No equivalent cited term exists here for Brazilian Portuguese, German, Japanese, Hindi, Indonesian, or Italian. Slug maps for those locales stay empty so the site does not invent a literal translation and publish it.

## Decision

The ten languages are the intended launch set in `lib/locales.ts`. English remains the only published locale because the other nine fail the content bar in `11-localization-qa.md`: no native-reviewed catalog, no researched slugs, and, for Japanese and Arabic, unresolved segmentation and numeral or RTL checks.

Approval requested: provide native-reviewed catalogs and a cited slug for each tool, or explicitly accept unreviewed copy. Unreviewed copy will not be published without that acceptance. This is not a claim that those markets have no demand. Their demand was not measured.

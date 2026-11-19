# Data gaps and next actions

## Collected on 2026-10-24

- Google Trends, web search, past 12 months, exact search terms: 61 keyword-country rows in `02-keyword-validation.csv`. Nine comparisons: US-A through US-E, GB, AU, IN, FR, ES, MX, SA, CA.
- Google results pages: 8 queries, 53 rows in `03-serp-analysis.csv`. Queries: merge pdf, word counter, json formatter, percentage calculator, jpg to pdf, pdf compressor (US parameters), vat calculator (`gl=uk`), compound interest calculator (US parameters).

## Not collected

| Source | Result |
| --- | --- |
| Google Keyword Planner | No account. Template: `keyword-planner-import-template.csv`. |
| Ahrefs, Semrush, Moz | Not opened and not authenticated. |
| Search Console | No property. |
| CPC, advertiser competition, keyword difficulty | Unknown. Not zero. |
| Publisher RPM | Unknown for every country. |
| Google results for the other build candidates | Case converter, discount calculator, Base64, URL encode, length, timestamp, text cleaner, split, rotate, time zone, working days, days between dates, UUID, color, HTML entities, and slug were not opened. |
| Google results outside the US and the UK VAT query | France, Belgium, Switzerland, French-speaking Canada, Spain, Mexico, Colombia, Argentina, Chile, Saudi Arabia, the UAE, Egypt, Kuwait, India, Australia, and Canada were not opened. |
| Trends for Belgium, Switzerland, Colombia, Argentina, Chile, the UAE, Egypt, Kuwait, and French-speaking Canada | Not run. Do not copy France, Spain, or Saudi Arabia onto them. |

The browser location control said it could not determine location on every Google results page. `gl` still produced UK domains for the VAT query. Treat every results set as parameterized, not as a residential IP in that country.

Trends returned HTTP 429 from a script in Phase 1. The browser Explore page worked in this pass. Do not mix the two.

## Next actions, in order

1. Export Keyword Planner for the rows in `keyword-planner-import-template.csv`. One country per export. Keep ranges. Record match type, account, and date. Do not paste Trends indexes into the volume column.
2. Open the US results for “case converter,” “discount calculator,” and “days between dates” before writing those pages. Record the first ten domains the same way as `03-serp-analysis.csv`.
3. Open “fusionner pdf” with `hl=fr` and `gl=fr`, “unir pdf” with `hl=es` and `gl=mx`, and “دمج pdf” with `hl=ar` and `gl=sa`, before any PDF build.
4. Re-read GOV.UK VAT rates and the ATO GST page on the day a tax preset is published. Do not publish a preset for a country whose authority page was not opened that day.
5. After the English experiment has been indexed, read Search Console before adding a language. The gate from Phase 1 still applies: eight weeks of clicks on at least one URL, eight of the live tools indexed, and no manual action. The live set is now four tools, so the gate is “the live tools are indexed,” not “eight of the old ten.”
6. When an ad account exists, replace the sensitivity table with that account’s country RPM. Until then leave monetization unscored.

## Quality checks run with this file

- 61 Trends rows, 0 duplicate country-code plus keyword pairs.
- 53 SERP rows, 8 query-country pairs.
- No unknown volume stored as 0. Trends averages of 0 are labeled as indexes.
- Phase 1 files were not edited.
- Subtotals in `06-opportunity-matrix.csv` were checked against the components listed on each row.
- The 100-point score is blank.

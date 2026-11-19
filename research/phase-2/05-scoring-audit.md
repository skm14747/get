# Scoring audit

Phase 1’s weights stay:

| Component | Points | This pass |
| --- | --- | --- |
| Search demand | 25 | Unscored. Trends is not monthly volume. |
| Organic ranking feasibility | 25 | Scored only where a Google results page was read. Judgment, not a difficulty index. |
| Advertising monetization | 20 | Unscored. No publisher RPM. |
| Implementation ease | 15 | Engineering judgment. |
| Localization or differentiation | 10 | Judgment. Translation alone scores low. |
| Maintenance | 5 | Judgment. |

`priority_score_of_100` is blank on every row. It is not a renormalized partial score.

## Corrections from Phase 1

Phase 1 stored a `feasibility_subscore` that added whichever components happened to be filled. Tools with a ranking judgment were on a different scale from tools without one, and the column name sounded like a ranking score.

Phase 2 replaces that with:

- `components_included`, the exact list of components in the subtotal
- `scored_components_subtotal`
- `subtotal_max_for_those_components`

Compare two tools only when `components_included` is the same. In this file there are two groups:

- Ranking plus implementation, localization, and maintenance. Maximum 55. Used only for tools with a results page.
- Implementation, localization, and maintenance. Maximum 30. Used when the results page was not collected.

The UK VAT row is in the first group because the UK page was read. That ranking score is not a score for India, Mexico, or Saudi Arabia.

Search-demand evidence is written in prose beside an unscored 25-point field. The Trends ratio is evidence. It is not the 25 points.

Technical confidence and commercial confidence are separate columns. A tool can be easy to build and still have low commercial confidence.

## How the ranking judgments were set

These are not measurements.

| Query | Score | Why |
| --- | --- | --- |
| JSON formatter, US | 9 | Many tool sites, more fragmented than the PDF brands, already including an in-browser claim. |
| Word counter, US | 8 | A specialist with sitelinks plus large writing products. |
| VAT calculator, UK | 8 | Many exact-match calculators, no government page in the observed list, no obvious missing feature in the titles. |
| Percentage calculator, US | 5 | Google’s own calculator plus several calculator sites. |
| Merge PDF, US | 4 | iLovePDF, Smallpdf, and Adobe at the top. |
| JPG to PDF, US | 4 | Same brand set, plus a specialist domain. |
| Compound interest, US | 4 | investor.gov and finance publishers. |
| PDF compressor, US | 3 | Same brands, plus a product requirement this stack should not promise. |

Raising every PDF ranking score to 20 would not create a validated opportunity. Demand volume and RPM would still be blank, and the results pages would still show the same brands.

## Sensitivity

If Keyword Planner later shows US “word counter” and “percentage calculator” with large volume, they stay build candidates. They become validated only if a results page, or a long-tail page, also looks reachable. The pages read on 2026-10-24 do not look reachable for a new domain on the head query.

If Planner shows large volume and a weak page for a PDF long-tail that does not require image recompression, move merge or split from defer to investigate. Do not move the target-size compressor. That reject is about the product, not the index.

If a publisher report shows tax pages earning several times the RPM of a word counter, move the UK and Australia calculators up the investigate list. It still does not fill in the 20 monetization points until that report is in hand.

## What not to do with the subtotals

The word counter’s subtotal includes a ranking score. The case converter’s does not. The word counter is not “ahead” by the difference in those numbers. The decision column is the recommendation. The subtotal only shows that the arithmetic of the included judgments was checked.

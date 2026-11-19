# Phase 2 datasets

Research date: 2026-10-24. Phase 1 stays in the parent `research/` folder and was not edited.

## Files

| File | What it is |
| --- | --- |
| `01-research-update.md` | What changed and what is still unknown |
| `02-keyword-validation.csv` | 61 Google Trends rows. Volume, difficulty, and CPC are `unknown`. |
| `03-serp-analysis.csv` | 53 Google result rows across 8 queries |
| `04-competitor-gaps.md` | What the results pages support, and what is still a hypothesis |
| `05-scoring-audit.md` | Why partial scores are not a 100-point rank |
| `06-opportunity-matrix.csv` | 24 tools. No validated opportunity. |
| `07-revenue-sensitivity.md` | Phase 1 scenarios kept. Extra arithmetic only. |
| `08-revised-mvp-recommendation.md` | Four English experiments, then a stop |
| `09-data-gaps-and-next-actions.md` | Missing sources and the next exports |
| `keyword-planner-import-template.csv` | Blank volume sheet. Do not fill it with Trends indexes. |

## How to read a number

- **Google Trends average.** Measured. A 0–100 index inside one comparison, for web search over the past 12 months, for that country. Comparable only with the anchor term on the same row. Not monthly searches. Not comparable across countries. An average of 0 is not zero demand.
- **`trends_ratio_to_anchor`.** The row’s index divided by the anchor’s index on that same chart. Use this when one US chart rescaled because a new term set the peak. US-D did that: the percentage-calculator average moved from 74 to 63.
- **Ranking score.** A judgment from a results page, with the reason in the matrix. Not a Moz or Ahrefs difficulty score.
- **Implementation, localization, and maintenance scores.** Engineering judgments.
- **Blank 100-point score.** Intentional. Demand and monetization were not scored.
- **Phase 1 revenue scenarios.** Assumptions. `07-revenue-sensitivity.md` does not upgrade them.

## Refresh

1. Repeat a Trends comparison with the same anchor term if you add a keyword. Record the comparison id, both averages, the geo, and the date.
2. For a results page, set `hl`, `gl`, and `pws=0`. Write down whether the location footer was determined. Copy the visible domain from the result, not a `google.com/goto` redirect.
3. Put Keyword Planner output in the template. One country per export.
4. Do not sort tools by `scored_components_subtotal` unless `components_included` matches.

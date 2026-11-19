# SERP URL audit

Audit date: 2026-10-24. This note does not replace `research/phase-2/03-serp-analysis.csv`. That file was not edited.

## Finding

The Phase 2 file has 53 result rows. The `result_url` column is empty on all 53 rows. The `domain` and truncated `page_title` columns were recorded from the visible result text. The browser hrefs were Google redirect tokens, so a destination URL was not stored.

## What was not done

No URL was filled in from memory, from a current visit, or from a guessed path such as `/merge_pdf`. A page that can be opened today is not proof of the URL that ranked on 24 October 2026. Reconstructed URLs would be a new dataset, and this pass did not collect one.

## How to repair it later

1. Repeat the query with the same `hl`, `gl`, and `pws=0` parameters.
2. Open the rendered results page, not a fetched HTML interstitial.
3. Record the visible domain, title, and the final URL after the redirect.
4. Save the new rows in a new file. Keep the Phase 2 file as the historical observation with blank URLs.
5. Label the new file with the collection date. Do not describe it as a recovery of the missing Phase 2 hrefs.

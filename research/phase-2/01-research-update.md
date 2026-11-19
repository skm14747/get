# Phase 2 research update

**Date:** 2026-10-24  
**Phase 1 files:** left unchanged in `research/`.  
**What this pass added:** Google Trends averages for 61 keyword-country pairs, and a Google results-page review for 8 queries (53 result rows).

## What changed

Phase 1 could only say that queries exist. This pass can say which queries are large or small **relative to each other inside one country**, and what the Google results page actually shows for eight of them.

The practical change is the order of the first build.

Phase 1 put ten easy tools on equal footing, including JSON, Base64, URL encoding, a unit converter, and a timestamp converter. On US Google Trends for the past 12 months, those developer and unit queries are small next to “percentage calculator” and “word counter.” “Unix timestamp converter” and “remove duplicate lines” did not rise above an average of 0 on a chart where “percentage calculator” averaged 74. An average of 0 is not zero searches. It is too small to register on that chart.

The other change is geographic. The same English words do not have the same shape:

- United States, unscaled chart: percentage calculator 74, word counter 64, merge PDF 33, PDF compressor 17, JSON formatter 7.
- Canada: merge PDF 78, percentage calculator 48, word counter 47.
- India: merge PDF 82, percentage calculator 6, GST calculator 5, word counter 2.
- France: compresser PDF 77, fusionner PDF 74, calcul pourcentage 30, calcul TVA 26, compteur de mots 5.
- Spain and Mexico: unir PDF leads; the Spanish percentage and IVA queries in the comparison are small on those charts.
- Saudi Arabia: دمج PDF 68 and ضغط PDF 50; the Arabic percentage, VAT, and word-counter queries averaged 0 on that chart.

Those numbers are Google Trends indexes. They are not monthly searches, and a 74 in the US is not comparable to a 74 in France.

## What the results pages showed

Eight queries were opened. The browser’s location control said it could not determine location, so `gl` is a request parameter, not a confirmed local IP. The UK query still returned UK calculator domains, which is evidence that `gl=uk` changed the page.

- **Percentage calculator, US:** Google shows its own calculator on the results page, then established calculator sites.
- **Word counter, US:** wordcounter.net has sitelinks. Grammarly and QuillBot also rank. A result already offers reading time.
- **JSON formatter, US:** several formatters rank, and one title already says the work is in the browser.
- **Merge PDF, JPG to PDF, and PDF compressor, US:** Adobe, iLovePDF, and Smallpdf are at the top. Compressor-related searches include 200KB, 100KB, 50KB, and 1MB. The AI Overview says text-only PDFs shrink very little.
- **VAT calculator, UK:** dedicated VAT sites, Wise, and Xero. GOV.UK was not in the observed list. Titles already say “add or remove VAT at 20%.”
- **Compound interest, US:** investor.gov ranks first, then NerdWallet, Bankrate, and other finance sites.

Landing pages were not opened again in this pass, except where Phase 1 had already opened them or the tool was embedded in the results page. Mobile layout, paywalls, and backlinks were not measured.

## Decision

No tool is a validated commercial opportunity. Volume, keyword difficulty, CPC, and publisher RPM are still unknown, and the results pages that were checked are occupied.

The evidence is enough to start a **small English experiment**, not the Phase 1 list of ten and not a PDF directory.

Build candidates, in this order:

1. Word counter, with characters, sentences, and reading time on the same page.
2. Percentage calculator, with increase, decrease, and difference on the same page.
3. Discount calculator.
4. Case converter.

Defer PDF tools even though several countries show stronger relative interest in them than in text tools. The US pages that were checked are brand-heavy, and image compression is a different product from a pdf-lib rewrite. Reject a compressor marketed at a target file size.

UK VAT and Australian GST are the strongest localization signals in this pass. They stay in “investigate” because the UK page is already full of calculators and no publisher RPM exists.

## What remains unknown

Monthly search volume, keyword difficulty, advertiser bids, and publisher RPM for every keyword. Google results for the build-candidate queries other than the word counter and the percentage calculator. Results pages for France, India, Spain, Mexico, Saudi Arabia, Canada, Belgium, Switzerland, and the rest of the Spanish-speaking and Arabic-speaking countries. French-speaking Canada was not rechecked.

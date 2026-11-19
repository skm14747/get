# Methodology and reproducibility

**Collection date:** 2026-10-24  
**Property:** none. GoEasyTools.com was not treated as an existing ranked site.  
**Repository at collection:** empty. No application stack was in the repo. The feasibility notes assume a future Next.js, TypeScript, React, and Tailwind app because the brief asked for that baseline. Nothing was installed.

## What was measured

| Source | What it can support | What it cannot support |
| --- | --- | --- |
| Google Autocomplete, `https://suggestqueries.google.com/complete/search?client=firefox&hl=&gl=` | Discovery of wording, modifiers, and brand associations. 128 seeds, 1,229 rows, 0 request errors. | Monthly volume, trend, difficulty, CPC. The `gl` parameter is a hint. Saudi, UAE, and Egypt VAT suggestions came back identical, so country separation failed for that cluster. |
| Official or institutional pages listed below | Rates, policies, library limits, timezone data. | Rankings and revenue. |
| Public competitor pages | What those pages claim to do and how they say files are handled. | Their traffic, revenue, or Google position. |

## What was attempted and blocked

| Source | Result |
| --- | --- |
| Google Search top 10 | Blocked by Google’s automated interstitial. |
| Google Trends explore API | HTTP 429. No interest index was collected. Trends values would have been normalized even if the call had worked. |
| Google Keyword Planner, Ahrefs, Semrush, Moz, Search Console | No credentials and no property. Names are reserved in `/.env.example`. No paid call was made. |
| Bing top 10 | Returned. The session mixed on-topic PDF results with unrelated results, so it is not used as a ranking dataset. One on-topic “compress pdf” list is described in the competitor note. |

## Keyword dataset

Files: `keywords-en.csv`, `keywords-fr.csv`, `keywords-es.csv`, `keywords-ar.csv`, and `keywords-all.csv`.

Countries are rows. They are not summed. A French query from Belgium is not added to a French query from France. Suggestion text is copied, not translated, except for the seed’s English gloss. Expansions of non-English seeds say the English gloss belongs to the cluster.

Every volume, trend, difficulty, CPC, paid-competition, and traffic-potential cell is `unknown`. Confidence is `low`. Intent labels are rule-of-thumb tags from words such as “free”, “gratuit”, “gratis”, and brand names. They are not a search-intent model.

Seeds cover the four categories in US English, plus country tax queries and a smaller French, Spanish, and Arabic set. The brief asked for 100 seeds. This pass stored 128. It did not invent extra rows to enlarge the count. Empty suggestion lists are kept and labeled. They are not zero-volume rows.

## Scoring model

The requested 100-point model is:

| Component | Points | Treatment on 2026-10-24 |
| --- | --- | --- |
| Search demand | 25 | Unscored. No volume. |
| Organic ranking feasibility | 25 | Unscored, except a low judgment where autocomplete repeatedly attached iLovePDF or Adobe. That judgment is not a difficulty index. |
| Advertising monetization | 20 | Unscored. No RPM. US display spend is not allocated to tools. |
| Implementation ease | 15 | Scored as an engineering judgment. |
| Localization or differentiation | 10 | Scored only for a real regional difference, not for the existence of a language. |
| Maintenance | 5 | Scored. Statutory and feed-driven tools score lower. |

`priority_score_of_100` is `incomplete` for every row in `04-tool-prioritization.csv`. `feasibility_subscore` adds only the scored parts. It must not be read as the winner of the 100-point model. Sorting by it favors cheap, stable tools, which matches the sequencing decision and does **not** identify the highest-demand tool.

### Sensitivity

If a later Keyword Planner pull assigns PDF head terms a demand score of 25 and the text tools a demand score of 8, PDF merge would pass the text tools on a completed 100-point total even with a poor rank score. The recommendation would then need a fresh SERP review. It would still not justify a target-size compressor or PDF-to-Word, because those fail implementation and honesty, not just demand.

If monetization is later shown to be much higher on tax pages than on developer tools, move the sourced UK and Australia calculators forward. That change does not justify unsourced ZIP-code or GST-slab tools.

The “build ten cheap English tools” decision is stable under RPM uncertainty, because RPM is unknown for every category. It is not stable under a future finding of large, weakly competed demand. The ten tools are how that finding gets measured.

## Technical notes used in the feasibility scores

- **pdf-lib** creates and modifies PDFs, including merge, split, and metadata, in the browser. It does not extract ordinary page text. It does not support encrypted documents. https://pdf-lib.js.org/ and https://github.com/Hopding/pdf-lib
- **PDF.js** renders and can extract text. It is not a PDF editor. https://github.com/mozilla/pdf.js/wiki/frequently-asked-questions
- A structural rewrite is not image recompression. PDF24 documents image DPI and quality as the compression method, and says the work happens on its servers. https://tools.pdf24.org/en/compress-pdf
- **IANA tzdb** is the timezone source. Release 2026e was published 2026-09-29. Browsers ship this data through their ICU timezone database. Do not hardcode offsets. https://www.iana.org/time-zones/tz-link and https://www.iana.org/time-zones/releases/2026e
- JWT tools, if built later, decode locally and do not claim signature verification without the key and algorithm.
- Password removal is out of scope.

## Rates that were checked

| Jurisdiction | What was read | Retrieved |
| --- | --- | --- |
| United Kingdom | Standard 20%, reduced 5%, zero 0%. Standard rate 20% since 4 January 2011. Exemptions exist. https://www.gov.uk/vat-rates | 2026-10-24 |
| Australia | GST is 10% on most items. GST-free sales exist. The ATO points to MoneySmart for a calculator and says GST is one-eleventh of the amount charged. https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/how-gst-works and https://www.ato.gov.au/businesses-and-organisations/international-tax-for-business/gst-for-non-resident-businesses/how-australian-gst-works (page said last updated 11 September 2025) | 2026-10-24 |
| France | Normal 20%, intermediate 10%, reduced 5.5%, particular 2.1%, with DOM and Corsica exceptions. https://www.economie.gouv.fr/cedef/taux-tva-france-et-union-europeenne | 2026-10-24 |
| EU table, including Belgium 21 / 6 / 12, Spain 21 / 10 / 4, France as above | The European Commission page says each country sets rates and tells readers to confirm locally. The table omits some regions, including the Canary Islands. https://europa.eu/youreurope/business/finance-and-tax/vat/vat-rules-rates/index_en.htm | 2026-10-24 |
| Saudi Arabia | ZATCA’s April 2025 guideline says registered persons charge a standard rate of 15% where applicable. The 15% rate took effect 1 July 2020. https://zatca.gov.sa/en/HelpCenter/guidelines/Documents/Amendments-to-the-Implementing-Regulation-of-%28VAT%29.PDF and https://zatca.gov.sa/en/MediaCenter/News/Pages/News-342.aspx | 2026-10-24 |
| United Arab Emirates | Federal Decree-Law No. 8 of 2017: standard rate of 5% on a taxable supply or import, subject to the decree. https://tax.gov.ae/DataFolder/Files/Legislation/Federal%20Decree-Law%20No.%208%20of%202017%20and%20amendments%20-%20For%20Publishing.pdf | 2026-10-24 |

Not checked with the authority, so not safe as presets: Switzerland, Canada, India, Mexico, Argentina, Colombia, Chile, Egypt, Kuwait, and US local sales tax. Autocomplete numbers for those places stay in the keyword file as suggestions.

## SEO architecture recommendation

Google’s guidance is to use a different URL per language and to annotate equivalents with hreflang. Google detects language from the visible content, not from the URL alone. https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites and https://developers.google.com/search/docs/specialty/international/localized-versions

Recommended shape:

- `/en/word-counter/`, `/fr/compteur-de-mots/`, `/es/contador-de-palabras/`, `/ar/…` when that language is actually launched.
- hreflang on every live equivalent, each page listing itself and the others, plus `x-default` on a language chooser.
- Country in the URL only for a different tool, for example `/en/vat-calculator/gb/` and `/fr/calcul-tva/be/`. Do not create an `/en-au/` word counter.
- One sitemap index, with a sitemap per live language. `hreflang` can also be expressed in the sitemap. One method is enough.
- Canonical points at the current language URL, not at English, when the body is translated.
- `robots` allows the live tools and disallows draft or parameter copies.
- Breadcrumbs and internal links stay inside the language.
- `WebApplication` or `SoftwareApplication` structured data only if the page is a real tool and the fields are accurate. Do not mark up a form that does not work.
- No pagination is required for the first ten tools.
- Titles and descriptions are written per language. They describe the function, not a keyword list.

Each indexable tool needs a working utility, instructions, examples, accurate output, local terminology, useful errors, metadata, related links, a privacy statement that matches the network behavior, and enough unique explanation that the page is not a translated shell.

Arabic, when it comes, needs `dir="rtl"`, a font that covers the script, correct mixed-direction runs, and a decision about numerals. French and Spanish need local verbs and tax names. France and Belgium do not share a TVA page. Spain, Mexico, Colombia, Argentina, and Chile do not share an IVA page.

Core Web Vitals for this product means a small client bundle, no server round trip for the first ten tools, and no layout shift from ads. Ads wait until there is content.

## How to refresh

1. Export Keyword Planner volumes by country for the seed column in the CSVs. Keep the planner’s ranges if it does not give a point value. Write the account, the country, the date, and the match type.
2. Record a Google top 10 for each “build” and “investigate” primary keyword, in the target country, in a private window. Store URL, title, and whether a working tool is on the page.
3. Re-read every tax page’s official source on the day a preset is published. Replace the rate if the authority has.
4. Check IANA’s latest release before shipping timezone features.
5. Replace the hypothetical RPM table with the ad account’s country report. Do not mix it with CPC.
6. Leave `unknown` in place rather than interpolating. A new row should say whether the figure is measured, a third-party estimate, or a judgment.

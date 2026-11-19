# MVP roadmap

The first release is English, at `/en/{tool}/`. It is one market-language, not four country clones. India, French, Spanish, and Arabic wait for the gates at the end.

Effort figures are engineering judgments for a new Next.js, TypeScript, and React app with client-side computation and automated tests. They are not quotes. The shared shell (layout, metadata, privacy note, related tools, sitemap, tests) is about 20–40 hours and is not repeated in each line.

Success for every tool, measured in Search Console and a privacy-safe completion event that does not include the user’s text or file:

- Indexed URL
- Organic clicks, impressions, and the countries sending them
- Completion without a JavaScript error
- No manual action
- Ad viewability and RPM only after an ad account exists

## First ten

### 1. Word, character, sentence, and reading-time counter

- **Why:** Stable, local, and useful on one URL. Splitting these into four pages would be a doorway pattern.
- **Cluster:** “word counter” and its US suggestions (online, essay, PDF). PDF counting is out of scope for this page.
- **Market:** English, shared US/UK/CA/AU page.
- **Competitors:** Not confirmed in Google’s top 10. Grammarly and Google Docs appear in autocomplete, so some demand is for a product the user already has open.
- **Differentiation:** Counts update locally, with the counting rules stated (what a word is, whether line breaks count).
- **Effort:** 6–10 hours plus tests for empty input, emoji, and Arabic or CJK text even if the UI is English.
- **Content:** The counting rules, two examples, and a privacy line.
- **Measure:** Indexed page and clicks by country. Do not expect this to prove the category’s volume by itself.

### 2. Case converter

- **Cluster:** “case converter”.
- **Market:** Same English page.
- **Competitors:** Unknown in Google.
- **Differentiation:** Sentence case, title case, and a stated rule for short words. No account.
- **Effort:** 4–8 hours.
- **Content:** Examples, including names and acronyms the transform will get wrong.

### 3. Text cleaner

- **Cluster:** “remove duplicate lines”, “remove extra spaces”, “sort lines alphabetically”.
- **Market:** Same English page, with modes.
- **Competitors:** Unknown in Google.
- **Differentiation:** One control for duplicates, whitespace, and sort. Processing stays in the page.
- **Effort:** 6–10 hours.
- **Content:** Explain whether the sort is byte order or locale order. Start with a documented Unicode default.

### 4. JSON formatter, validator, and minifier

- **Cluster:** “json formatter”, including validator and beautify suggestions. Some suggestions are editor extensions, so the page should serve people who paste JSON, not pretend to replace VS Code.
- **Market:** English. Developer audience. RPM may be weaker than consumer finance. That penalty is unmeasured and is accepted because the tool is cheap.
- **Competitors:** Unknown in Google. MDN documents the language; it is not a formatter.
- **Differentiation:** Parse errors with a line and a local-only note. Minify and format are modes.
- **Effort:** 8–12 hours, including malformed samples.
- **Content:** A short JSON example and a statement that the payload is not uploaded.

### 5. Base64 encoder and decoder

- **Cluster:** “base64 decode”.
- **Market:** English.
- **Differentiation:** Encode and decode, UTF-8 stated, errors named. Local only, because payloads can be credentials.
- **Effort:** 4–8 hours.
- **Content:** Say that Base64 is encoding, not encryption.

### 6. URL encoder and decoder

- **Cluster:** “url encode”.
- **Market:** English.
- **Differentiation:** Encode and decode with `encodeURIComponent` semantics written down. Local only.
- **Effort:** 4–6 hours.
- **Content:** One query-string example.

### 7. Percentage calculator

- **Cluster:** “percentage calculator”, plus increase, difference, and “between two numbers”.
- **Market:** English, shared page. Modes replace separate URLs.
- **Competitors:** Calculator.net publishes formulas and examples. The page has to be correct and clear. It does not have a demonstrated ranking opening.
- **Differentiation:** All three common questions on one page, with the formula beside the result.
- **Effort:** 8–12 hours, with rounding tests.
- **Content:** Worked examples. No financial advice.

### 8. Unit converter

- **Cluster:** length, weight, and temperature, launched as one tool. Area, volume, speed, data, time, and fuel stay off the first release so the page is not a thin unit farm.
- **Market:** English. Show metric and US customary labels. That is localization of labels, not a country URL.
- **Differentiation:** Exact conversion factors cited from a standards body when the factor is not a definition (the metre and the inch have defined relationships; say which definition is used).
- **Effort:** 10–16 hours including factor tests.
- **Content:** The factor table.

### 9. Unix timestamp converter

- **Cluster:** “unix timestamp converter” and “epoch converter” on one page, both directions.
- **Market:** English. Display UTC and the browser’s local zone.
- **Competitors:** Unknown in Google. Do not hardcode offsets.
- **Differentiation:** Seconds and milliseconds are explicit. Ambiguous 10-digit versus 13-digit values are explained. Local time uses the runtime’s IANA data, not a copied offset table. IANA’s current release at research time was 2026e (2026-09-29): https://www.iana.org/time-zones/releases/2026e
- **Effort:** 8–14 hours, including DST transition tests.
- **Content:** State that historical zones depend on the shipped timezone data and can change when governments change rules.

### 10. Discount calculator

- **Cluster:** “discount calculator”.
- **Market:** English.
- **Differentiation:** User-supplied percent. Result shows original, discount amount, and final. It does not apply VAT.
- **Effort:** 4–8 hours.
- **Content:** One worked example and a line that tax is separate.

## Second wave, after the English pages are indexed

Build these only with a source, a date, and a sentence that the preset is the standard rate and not a ruling on the user’s supply.

| Tool | First market | Why it waits | Source already checked |
| --- | --- | --- | --- |
| VAT calculator | United Kingdom | Reduced and zero rates depend on the goods. | GOV.UK: standard 20%, reduced 5%, zero 0%. https://www.gov.uk/vat-rates |
| GST calculator | Australia | GST-free supplies exist. On a tax-inclusive price the GST component is one-eleventh, which is not the same operation as dividing a tax-exclusive price by 10. | ATO: 10% on most items. https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/how-gst-works and https://www.ato.gov.au/businesses-and-organisations/international-tax-for-business/gst-for-non-resident-businesses/how-australian-gst-works |
| TVA calculator | France | French copy has to be written, not translated word for word. DOM and Corsica differ. | economie.gouv.fr and the EU table: 20%, 10%, 5.5%, 2.1%. https://www.economie.gouv.fr/cedef/taux-tva-france-et-union-europeenne |
| TVA calculator | Belgium | Separate from France even in French. | EU table retrieved 2026-10-24: standard 21, reduced 6 and 12. Reconfirm with FPS Finance. https://europa.eu/youreurope/business/finance-and-tax/vat/vat-rules-rates/index_en.htm |
| IVA calculator | Spain | Distinct from Latin American IVA. | EU table: standard 21, reduced 10, super-reduced 4. Reconfirm with AEAT. |
| VAT calculator | Saudi Arabia | Arabic UI and exempt supplies. | ZATCA guideline, April 2025: standard rate 15% where applicable. https://zatca.gov.sa/en/HelpCenter/guidelines/Documents/Amendments-to-the-Implementing-Regulation-of-%28VAT%29.PDF |

UAE Federal Decree-Law No. 8 of 2017 states a standard rate of 5%. That is enough to keep the UAE on the investigate list. It is not enough to ship a calculator before a current FTA page is re-read. Switzerland, Canada, India, Mexico, Argentina, Colombia, Chile, Egypt, and Kuwait do not get presets from this research.

Also in the second wave if the first ten produce indexed pages: compound-interest calculator with the user supplying the rate; age and date difference; slug, UUID, color, and HTML-entity tools.

## Later investigation, not the first year of URLs

- PDF merge, split, rotate, reorder, delete, and image-to-PDF, client-side, with a tested memory ceiling and no target-size claim.
- Time-zone converter and meeting planner on IANA data, knowing timeanddate.com already covers DST.
- Working days with a stated weekend and user-supplied holidays.
- Currency only with a dated public rate and a failure state when the rate is old.

## Rejected for this business

- Password removal.
- Password protection until a maintained cryptography library is reviewed. Upstream pdf-lib does not support encrypted documents: https://github.com/Hopding/pdf-lib
- PDF-to-Word, Word-to-PDF, and PDF comparison as display-ad features.
- A compressor marketed against 100KB, 200KB, or 1MB queries. pdf-lib does not recompress page images. PDF24’s own page says image resolution is the lever: https://tools.pdf24.org/en/compress-pdf
- A standalone “PDF page counter” or “file size” URL.
- A translated page per tool per country.

## Language expansion gates

Add the next language only when all of these are true:

1. Search Console is verified on the production property.
2. At least eight of the ten English tools are indexed.
3. There is no manual action.
4. At least one tool has organic clicks in each of eight consecutive weeks.
5. A person edits the new language. Machine translation can draft. It cannot ship.
6. The new language launches the same tools, not a new category.
7. Arabic also passes RTL layout, mixed Arabic and English input, and numeral formatting checks.

French is the better first translation if the editor is available, because TVA pages already have distinct wording. That is a reason to prepare French second, not a reason to launch French now. Spain versus Mexico still must not share one IVA page.

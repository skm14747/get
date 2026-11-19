# GoEasyTools Untapped Keyword Research & SEO Roadmap

**Methodology & Execution Path:**
- **Skill Framework:** Combines `/ahrefs-research` (Workflow A: Competitor Gap Diffing & Workflow B: Backlink & SERP Pattern Analysis) and `/research-tool-opportunity` (Empirical Search Intent, Incumbent Defect Analysis & Scoring Rules).
- **Connection Path Detected:** CSV Fallback (no live Ahrefs MCP tool; `$AHREFS_API_KEY` not set). Analyzed using 1,229 verified discovery queries from `research/keywords-*.csv`, 61 Google Trends series from `research/phase-2/02-keyword-validation.csv`, and 53 Google SERP audits from `research/phase-2/03-serp-analysis.csv`.
- **Output Artifacts:**
  - Structured dataset: `seo/multilingual-keyword-matrix.csv`
  - Strategic roadmap & on-page keyword targeting: `seo/untapped-keywords-roadmap.md`
- **Data Integrity Standard:** In strict accordance with `.cursor/rules/project-core.mdc` and `.cursor/rules/goeasytools-product.mdc`, Google Trends metrics are reported strictly as relative comparison indexes (0–100 scale within a specific chart comparison) and ratio to anchor. Search volumes, CPCs, and publisher RPMs are classified as **unknown** (unmeasured) unless confirmed by an official data export.

---

## 1. Executive Summary & Market Findings

1. **The Zero-Click OneBox Barrier on Generic English Head Queries:**
   - Head terms like `percentage calculator`, `unit converter`, and `10 meters to feet` are aggressively intercepted by Google's native calculation and conversion widgets (Position 0).
   - **The Untapped Opportunity:** Traffic growth requires targeting multi-scenario, comparative, and reverse intent queries that the Google OneBox cannot answer:
     - `percentage difference between two numbers` (directionless variance)
     - `double discount calculator` (stacked sequential math: 20% + 10% $\neq$ 30%)
     - `reverse vat calculator uk divide by 1.2` / `ato one-eleventh rule gst calculator`
     - `calendar days vs business days between dates` (explicit midnight interval counting)

2. **The "Client-Side Privacy" Competitive Moat:**
   - Global incumbent portals (`iLovePDF`, `Smallpdf`, `TinyPNG`, `Diffchecker`, `JSONFormatter.org`) force users to upload documents, text payloads, and images to remote cloud servers.
   - **The Untapped Opportunity:** Searchers are increasingly adding privacy and local-processing modifiers to tool queries:
     - `in browser`, `without uploading to server`, `private`, `client-side`, `no sign up`, `no subscription`.
     - Targeting these high-intent modifiers captures enterprise professionals, developers, and privacy-conscious users who reject cloud-upload security risks.

3. **Multilingual Untapped Potential:**
   - English tool search results are crowded by legacy brands with high domain authority.
   - Conversely, French (`fr`), Spanish (`es`), Arabic (`ar`), German (`de`), and Portuguese (`pt-BR`) SERPs display significantly lower competition for local statutory math and client-side utilities.
   - Jurisdictional tax calculators (`calcul tva france`, `calcul tva belgique`, `calculadora iva espana`) represent the highest-conversion intent because statutory rates differ by country even within the same language.

---

## 2. Category Keyword Clusters & On-Page Target Mapping

### Category A: Text & Writing Tools
*Target URLs: `/word-counter`, `/character-counter`, `/case-converter`, `/text-compare`, `/remove-duplicate-lines`*

#### Primary Keywords & Untapped Modifiers
- **Word Counter:**
  - *Head Query:* `word counter` (US Trends index: 64 vs 74 percentage anchor).
  - *Untapped Modifiers:* `word counter with reading time`, `count words and characters without spaces`, `essay word counter with paragraphs`, `word counter no ads`.
  - *Multilingual Equivalents:* `compteur de mots` (FR), `contador de palabras` (ES), `عداد الكلمات` (AR), `wörter zähler` (DE).
  - *Competitor Defect:* `wordcounter.net` has heavy CLS (layout shift) and aggressive ad refreshes.
- **Character Counter:**
  - *Head Query:* `character counter`, `character count online`.
  - *Untapped Modifiers:* `character counter with spaces vs without spaces`, `twitter character counter 280 limit`, `sms character counter 160`, `meta description character limit checker`.
- **Text Diff Checker:**
  - *Head Query:* `text diff checker`, `compare text online`.
  - *Untapped Modifiers:* `client side text diff checker no upload`, `compare two text files private`, `in browser text compare myers diff`.
  - *Competitor Defect:* `diffchecker.com` uploads confidential contracts and code to remote databases.
- **Text Cleaner & Duplicate Line Remover:**
  - *Head Query:* `remove duplicate lines`, `text cleaner online`.
  - *Untapped Modifiers:* `remove duplicate lines case sensitive`, `deduplicate text list and sort alphabetically`, `strip blank lines and whitespace in browser`.

---

### Category B: General Calculators & Converters
*Target URLs: `/percentage-calculator`, `/discount-calculator`, `/unit-converter`, `/date-calculator`, `/age-calculator`*

#### Primary Keywords & Untapped Modifiers
- **Percentage Calculator:**
  - *Head Query:* `percentage calculator` (US Trends index: 74 anchor).
  - *Untapped Modifiers:* `percentage difference between two numbers`, `percentage change formula calculator`, `reverse percentage calculator`, `what percent of a number is another`.
  - *Multilingual Equivalents:* `calculateur de pourcentage` (FR), `calculadora de porcentajes` (ES), `prozentrechner` (DE).
  - *Strategy:* Avoid single-calculation head queries absorbed by Google's widget; target worked examples and multi-scenario cards.
- **Discount Calculator:**
  - *Head Query:* `discount calculator`, `percent off calculator` (US Trends index: 13 vs 74).
  - *Untapped Modifiers:* `double discount calculator`, `sequential discount calculator`, `stacked discount formula`, `20 percent off plus extra 10 percent off`, `sale price with multiple discounts`.
  - *Competitor Defect:* Generic calculators confuse sales tax with discounts or fail to explain why stacked discounts are multiplicative rather than additive.
- **Age Calculator:**
  - *Head Query:* `age calculator`, `chronological age calculator`.
  - *Untapped Modifiers:* `exact chronological age in years months days`, `days until next birthday countdown`, `age as of specific date calculator`, `leap year birthday age calculator`.
- **Date Calculator:**
  - *Head Query:* `date calculator`, `days between dates` (US Trends index: 17 vs 74).
  - *Untapped Modifiers:* `calculate days between two dates midnight rule`, `monday to friday business days calculator no holidays`, `add 90 days to date calendar`.

---

### Category C: Tax & Finance Tools
*Target URLs: `/vat-calculator-uk`, `/gst-calculator-australia`, `/france-tva-calculator`, `/belgium-tva-calculator`, `/gst-calculator`, `/emi-calculator`*

#### Primary Keywords & Untapped Modifiers
- **UK VAT Calculator:**
  - *Head Query:* `vat calculator uk` (UK Trends index: 43 vs 67 anchor, ratio 0.642).
  - *Untapped Modifiers:* `hmrc vat calculator 20 percent`, `reverse vat calculator uk divide by 1.2`, `5 percent reduced vat rate uk`, `calculate vat gross to net`.
  - *Competitor Defect:* GOV.UK does not provide an interactive calculator on page 1; ranking sites often omit reduced rates.
- **Australia GST Calculator:**
  - *Head Query:* `gst calculator australia` (AU Trends index: 60 vs 67 anchor, ratio 0.896).
  - *Untapped Modifiers:* `ato one eleventh rule gst calculator`, `calculate reverse gst backwards divide by 11`, `add 10 percent gst australia`, `gst inclusive price formula`.
  - *Competitor Defect:* Commercial tools omit the statutory 1/11th mathematical justification.
- **France TVA Calculator:**
  - *Head Query:* `calcul tva` (FR Trends index: 26 vs 77 anchor).
  - *Untapped Modifiers:* `calculer tva inversee ttc vers ht france`, `taux tva dgfip 20 10 5.5 2.1`, `calcul tva montant hors taxes formule`, `tva restauration 10 pourcent`.
- **Belgium TVA Calculator:**
  - *Head Query:* `calcul tva belgique`, `tva btw calculator`.
  - *Untapped Modifiers:* `calculer tva 21 belgique spf finances`, `calcul tva 6 renovation batiment belgique`, `taux reduit tva 6 belgique`, `difference tva belge et francaise`.
- **EMI Calculator:**
  - *Head Query:* `emi calculator`, `loan payment calculator`.
  - *Untapped Modifiers:* `reducing balance emi calculator no sign up`, `home loan emi formula step by step`, `amortization schedule principal interest split`.

---

### Category D: Developer Utilities
*Target URLs: `/json-formatter`, `/base64`, `/password-generator`, `/qr-code-generator`, `/slug-generator`, `/color-converter`, `/unix-timestamp-converter`, `/jwt-decoder`, `/url-encoder`*

#### Primary Keywords & Untapped Modifiers
- **JSON Formatter & Validator:**
  - *Head Query:* `json formatter`, `json validator` (US Trends index: 7 vs 74).
  - *Untapped Modifiers:* `client side json formatter no upload`, `private json validator with line errors`, `pretty print json 2 spaces`, `minify json online free`.
  - *Competitor Defect:* Many web formatters send JSON across an HTTP POST endpoint, exposing proprietary tokens.
- **QR Code Generator:**
  - *Head Query:* `qr code generator`, `free qr code generator`.
  - *Untapped Modifiers:* `free static qr code generator no sign up`, `static qr codes that never expire`, `wifi qr code generator wpa2`, `qr code generator no subscription trap`.
  - *Competitor Defect:* Incumbents (`qr-code-generator.com`) lure users with free dynamic codes that expire after 14 days unless paid for.
- **Password Generator:**
  - *Head Query:* `password generator`, `random password generator`.
  - *Untapped Modifiers:* `strong password generator without ambiguous characters`, `random password generator web crypto api`, `offline password generator in browser`.
- **Color Converter:**
  - *Head Query:* `hex to rgb`, `color converter`.
  - *Untapped Modifiers:* `convert hex to rgb and hsl online`, `css color model converter with live swatch`, `copy css rgb hsl formatted strings`.
- **Unix Timestamp Converter:**
  - *Head Query:* `unix timestamp converter`, `epoch converter`.
  - *Untapped Modifiers:* `unix epoch seconds to human readable date utc local`, `convert date time to unix timestamp 10 digits 13 digits`, `epoch converter auto detect milliseconds`.
- **Multilingual Slug Generator:**
  - *Head Query:* `slug generator`, `url slug generator`.
  - *Untapped Modifiers:* `unicode nfkd slug generator for urls`, `slug generator strip accents diacritics`, `multilingual url friendly slug maker`.

---

### Category E: In-Browser PDF Suite
*Target URLs: `/merge-pdf`, `/split-pdf`, `/jpg-to-pdf`, `/rotate-pdf`, `/organize-pdf`, `/crop-pdf`, `/compress-pdf`, `/edit-pdf`, `/sign-pdf`*

#### Primary Keywords & Untapped Modifiers
- **Merge PDF:**
  - *Head Query:* `merge pdf`, `combine pdf` (US Trends: 33; Canada: 78; India: 82; France: 74; Spain: 76; Saudi Arabia: 68).
  - *Untapped Modifiers:* `merge pdf in browser without upload`, `private pdf combiner for sensitive documents`, `combine pdf files no file size limit free`, `merge pdf client side`.
- **Split PDF:**
  - *Head Query:* `split pdf`, `extract pages from pdf` (US Trends: 40).
  - *Untapped Modifiers:* `split pdf by custom page range 1-3 5`, `extract pages from pdf in browser without upload`, `separate pdf pages client side`.
- **JPG to PDF:**
  - *Head Query:* `jpg to pdf`, `convert images to pdf` (US Trends: 54).
  - *Untapped Modifiers:* `convert multiple jpg to one pdf a4 size`, `convert images to pdf without losing quality in browser`, `png and jpg to pdf no upload`.
- **Rotate PDF:**
  - *Head Query:* `rotate pdf`, `rotate pdf pages`.
  - *Untapped Modifiers:* `rotate pdf pages 90 180 270 degrees clockwise in browser`, `rotate upside down scanned pdf`, `permanently rotate pdf without acrobat`.
- **Crop PDF:**
  - *Head Query:* `crop pdf`, `trim pdf margins`.
  - *Untapped Modifiers:* `crop pdf margins in points in browser`, `trim white margins from pdf pages`, `cropbox pdf adjustment client side`.

---

## 3. Multilingual Intent Matrix Across 10 Languages

| Language / Geo | Top Untapped Tool Opportunity | Winning Local Search Wording | Primary User Intent & Angle |
| :--- | :--- | :--- | :--- |
| **English (US/UK/AU)** | Statutory Tax & Reverse Calculations | `reverse vat calculator uk divide by 1.2`, `ato one-eleventh rule gst calculator` | Bypasses generic blank calculator boxes with statutory precision. |
| **French (France)** | DGFIP TVA Slabs & Inversion | `calculer tva inversee ttc vers ht france`, `taux tva 20 10 5.5 dgfip` | Business invoicing and reverse tax deduction. |
| **French (Belgium)** | SPF Finances Belgian TVA (BTW) | `calcul tva 21 belgique spf finances`, `calcul tva 6 renovation belgique` | Separates Belgian rules from French 20% calculations. |
| **Spanish (Spain)** | AEAT IVA General & Reducido | `calculadora iva 21 espana`, `quitar iva precio neto factura` | Domestic Spanish commercial invoicing. |
| **Spanish (Mexico/LatAm)**| Multi-Regional IVA | `calculadora iva 16 mexico`, `calcular iva inversa sat` | Captures SAT Mexico specific tax calculation. |
| **Arabic (Saudi Arabia)** | ZATCA 15% VAT & Word Counting | `حاسبة ضريبة القيمة المضافة 15`, `عداد الكلمات والحروف` | Official 15% VAT breakdown and Arabic script counting. |
| **German (Germany/Austria)**| MwSt & PDF Zusammenfügen | `mwst rechner 19 7`, `pdf zusammenfuegen ohne upload privat` | Privacy-conscious German engineering and tax math. |
| **Portuguese (Brazil)** | Compressão & Contagem de Palavras | `compressor de imagens sem enviar servidor`, `contador de caracteres com espacos` | Digital marketing compliance and local processing. |
| **Italian (Italy)** | Calcolo IVA 22% & Codice Fiscale | `calcolo iva scorporo 22`, `generatore slug url amichevole` | Invoicing and reverse IVA deduction. |
| **Japanese (Japan)** | 文字数カウント & 消費税計算 | `文字数カウント 空白含まない`, `消費税計算 10% 8% 軽減税率` | Strict character limits and dual Japanese sales tax rates. |

---

## 4. Technical SEO Implementation Checklist

1. **Heading Architecture (`<h1>` & `<h2>` Hierarchy):**
   - Ensure `<h1>` includes the exact primary tool query + primary intent hook (e.g. `UK VAT Calculator — Add or Remove 20% & 5% VAT (HMRC Rates)`).
   - Use high-intent search questions as `<h2>` section headers (e.g. `<h2>How to Calculate Reverse VAT From a Gross Amount</h2>`).
2. **Schema.org Rich Snippet Coverage:**
   - Every tool page must render `WebApplication`, `BreadcrumbList`, and `FAQPage` JSON-LD schemas.
   - FAQ items in `lib/faqs.ts` must answer exact Google "People Also Ask" search queries.
3. **Internal Linking Intent Bridges:**
   - Maintain bidirectional task-chaining links in `lib/intent-bridges.ts` to pass PageRank equity from high-volume entry tools (`word-counter`, `merge-pdf`) to high-conversion long-tail tools (`text-compare`, `organize-pdf`).
4. **Machine-Readable Indexing:**
   - Keep `public/llms.txt` and `public/llms-full.txt` updated to allow AI search engines (Perplexity, ChatGPT Search, Claude, Gemini) to cite GoEasyTools mathematical formulas and endpoints directly.

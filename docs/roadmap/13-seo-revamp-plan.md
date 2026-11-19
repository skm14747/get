# Staff SEO Revamp Plan — GoEasyTools

Written 2026-11-19. This document defines the engineering, content, structured data, and architectural revamp across seven execution phases. It serves as the single source of truth for transitioning GoEasyTools from an unindexed utility experiment into an authoritative, high-ranking, client-side web utility platform.

---

## Strategic Overview

### Core Product Moat
1. **Zero-Upload Privacy:** 100% in-browser processing via WebAssembly, HTML5 Canvas, and Web Crypto. No user document, image, financial record, or text leaves the client.
2. **Instant Performance:** Next.js 15 App Router static generation (SSG) with sub-50ms TTFB, zero layout shift (CLS), and strict resource isolation.
3. **Frictionless Utility:** No forced registrations, paywalls, or artificial countdown delays.

### Baseline Deficits Identified in Audit
1. **Internal Roadmap Copy Leaking to Crawlers (Critical):** 15 of 19 tools render internal development notes (`tool.evidence`) in the indexable DOM stating: *"Not yet validated. No monthly search volume, keyword difficulty, CPC, or results page was collected for this query."*
2. **Asymmetric Content Depth (High):** Only 4 tools have dedicated educational guides. The remaining 15 tools contain stubby 2-sentence descriptions (< 100 words), running extreme risk of soft-404 or thin-content penalties.
3. **Inelastic Title Tags (Medium):** All routes use flat `<Name> · GoEasyTools` format with no intent modifiers ("Free", "Online", "100% In-Browser", "No Uploads").
4. **Missing Social & Visual Metadata (Medium):** No Open Graph images (`og:image`) are emitted anywhere on the site.
5. **No AI Search Engine Manifest (Medium):** No `llms.txt` or structured answer extraction blocks for Perplexity, ChatGPT Search, or Google AI Overviews.

---

## Phase Breakdown & Work Packages

```
Phase 0: Emergency Triage & Foundation Cleaning (Days 1–7)
Phase 1: SERP Real Estate & CTR Maximization (Weeks 2–3)
Phase 2: Content Depth, E-E-A-T & Guide Engineering (Weeks 4–5)
Phase 3: Generative Engine Optimization (GEO) & AI Search (Weeks 6–7)
Phase 4: Topical Clusters & Internal PageRank Architecture (Weeks 8–9)
Phase 5: Programmatic Long-Tail Sub-Intent Architecture (Weeks 10–12)
Phase 6: Multi-Locale Global Expansion (Weeks 13+)
```

---

## Phase 0: Emergency Triage & Foundation Cleaning (Days 1–7)

### Objective
Purge search quality red flags, fix crawling leaks, and implement automated social preview cards.

### Work Packages

#### WP 0.1: Purge `{tool.evidence}` from Public Tool Pages
* **Files:**
  * `app/gst-calculator/page.tsx`
  * `app/base64/page.tsx`
  * `app/emi-calculator/page.tsx`
  * `app/date-calculator/page.tsx`
  * `app/unit-converter/page.tsx`
  * `app/jpg-to-pdf/page.tsx`
  * `app/split-pdf/page.tsx`
  * `app/merge-pdf/page.tsx`
  * `app/image-resizer/page.tsx`
  * `app/image-compressor/page.tsx`
  * `app/password-generator/page.tsx`
  * `app/qr-code-generator/page.tsx`
  * `app/age-calculator/page.tsx`
  * `app/character-counter/page.tsx`
  * `app/json-formatter/page.tsx`
* **Action:**
  * Remove `<p>{tool.evidence}</p>` from the server component templates.
  * Add a unit test in `tests/seo.test.ts` asserting that no rendered page includes strings matching `"Not yet validated"`.

#### WP 0.2: Automated Dynamic Open Graph Engine
* **Files:**
  * `app/opengraph-image.tsx`
  * `app/[tool]/opengraph-image.tsx` or `app/api/og/route.tsx`
  * `lib/seo.ts`
* **Action:**
  * Use `@vercel/og` with Next.js App Router `ImageResponse` to emit 1200x630 cards dynamically.
  * Layout includes: Tool Name, Category Tag, GoEasyTools branding, and the USP pill: *"100% In-Browser • Zero Server Uploads"*.

#### WP 0.3: Layout Landmarks & Heading Hierarchy Audit
* **Files:**
  * `app/layout.tsx`
  * `components/tool-page.tsx`
  * `app/globals.css`
* **Action:**
  * Verify single `<h1>` per page.
  * Validate `:focus-visible` ring contrast in light and dark viewing contexts.

---

## Phase 1: SERP Real Estate & CTR Maximization (Weeks 2–3)

### Objective
Modernize title tags, meta descriptions, and schema graphs to capture maximum organic click-through rates.

### Work Packages

#### WP 1.1: High-CTR Metadata Re-engineering
* **Files:** `lib/tools.ts`, `lib/seo.ts`
* **Template Pattern:** `[Tool Name] – [Key Benefit / USP] · GoEasyTools`
* **Target Mappings:**
  * `word-counter`: *Free Word Counter & Character Count (Real-Time)*
  * `percentage-calculator`: *Percentage Calculator – Fast Percentage Change & Difference*
  * `discount-calculator`: *Discount Calculator – Sale Price & Double Discount*
  * `case-converter`: *Case Converter – Convert UPPERCASE, lowercase, camelCase*
  * `merge-pdf`: *Merge PDF Files Online Free – 100% Private in Browser*
  * `split-pdf`: *Split PDF Pages Online Free – Extract Pages Locally*
  * `jpg-to-pdf`: *JPG to PDF Converter Free – Convert Images in Browser*
  * `image-compressor`: *Free Image Compressor – Compress JPG, PNG & WebP Online*
  * `image-resizer`: *Image Resizer Online Free – Resize Dimensions & Scale*
  * `json-formatter`: *JSON Formatter & Validator – Pretty Print JSON Locally*
  * `base64`: *Base64 Encoder & Decoder – UTF-8 Text to Base64 Online*
  * `password-generator`: *Secure Password Generator – Cryptographically Strong Passwords*
  * `qr-code-generator`: *Free QR Code Generator – Custom QR Codes for URLs & Wi-Fi*
  * `unit-converter`: *Unit Converter – Metric & Imperial Measurement Calculator*
  * `date-calculator`: *Date Calculator – Days Between Dates & Add/Subtract Days*
  * `age-calculator`: *Age Calculator – Exact Age in Years, Months, and Days*
  * `gst-calculator`: *GST Calculator – Calculate Inclusive & Exclusive GST Rates*
  * `emi-calculator`: *EMI Calculator – Loan Payment & Interest Breakdown*
  * `character-counter`: *Character Counter – Count Characters with & without Spaces*

#### WP 1.2: Structured Data (JSON-LD) Modernization
* **Files:** `components/tool-page.tsx`, `lib/schema.ts`
* **Action:**
  * Upgrade `WebApplication` taxonomy:
    * Map finance tools (`emi-calculator`, `gst-calculator`) to `FinanceApplication`.
    * Map developer tools (`json-formatter`, `base64`) to `DeveloperApplication`.
    * Map utility tools to `UtilitiesApplication`.
  * Set `"operatingSystem": "All"` and `"browserRequirements": "Requires JavaScript. Requires HTML5."`
  * Add procedural `HowTo` steps for workflow tools (`merge-pdf`, `image-resizer`, `split-pdf`).
  * Add FAQ schema graphs from `lib/faqs.ts` where eligible.

---

## Phase 2: Content Depth, E-E-A-T & Guide Engineering (Weeks 4–5)

### Objective
Create 15 new authoritative server-rendered guides to eliminate thin content and establish domain expertise.

### Standard Guide Architecture (5-Block Format)
1. **Definitional Lead (AEO):** Direct, quotable definition of the utility or calculation in under 50 words.
2. **Step-by-Step Instructions:** Concise 3-to-4 step actionable sequence.
3. **Formulas & Algorithm Specifications:** Explicit mathematical and computational equations.
4. **Platform Boundaries & Edge Cases:** Documented limitations (file sizes, character limits, rounding heuristics).
5. **Client-Side Privacy Advantage:** Explaining the technical difference between browser execution and server uploads.

### Work Packages

#### WP 2.1: Developer & Text Tool Guides
* **Components:**
  * `components/json-formatter-guide.tsx` (RFC 8259 syntax, parse vs stringify, security of local parsing)
  * `components/base64-guide.tsx` (RFC 4648 radix-64, UTF-8 multi-byte encoding, encoding vs encryption)
  * `components/password-generator-guide.tsx` (Entropy calculations \(E = L \log_2 N\), CSPRNG vs Math.random)
  * `components/qr-code-generator-guide.tsx` (Reed-Solomon error correction, MECARD Wi-Fi payloads)
  * `components/character-counter-guide.tsx` (Unicode code points vs grapheme clusters, social limit table)

#### WP 2.2: PDF & Image Suite Guides
* **Components:**
  * `components/merge-pdf-guide.tsx` (Linearized PDF streams, pdf-lib DOM processing, zero cloud risk)
  * `components/split-pdf-guide.tsx` (Page tree extraction, inclusive range syntax, font retention)
  * `components/jpg-to-pdf-guide.tsx` (Canvas rasterization, A4 vs Letter aspect ratios, DPI preservation)
  * `components/image-compressor-guide.tsx` (Lossy quantization vs lossless indexing, Canvas toBlob quality)
  * `components/image-resizer-guide.tsx` (Bicubic interpolation, aspect ratio math, pixel density standards)

#### WP 2.3: Calculator & Financial Guides
* **Components:**
  * `components/emi-guide.tsx` (Reducing balance formula, loan tenure impact, sample payment matrices)
  * `components/gst-guide.tsx` (Inclusive vs exclusive math, CGST/SGST 50/50 split, penny rounding)
  * `components/unit-converter-guide.tsx` (SI base units vs Imperial, exact conversion factors)
  * `components/date-calculator-guide.tsx` (Gregorian arithmetic, Monday-to-Friday business day filtering)
  * `components/age-calculator-guide.tsx` (Calendar day counting, leap year Feb 28th anniversary rules)

---

## Phase 3: Generative Engine Optimization (GEO) & AI Search (Weeks 6–7)

### Objective
Position GoEasyTools as the canonical calculation source for AI search engines (Perplexity, ChatGPT Search, Claude, Google Gemini).

### Work Packages

#### WP 3.1: Machine-Readable Utility Manifests (`llms.txt`)
* **Files:** `public/llms.txt`, `public/llms-full.txt`
* **Action:**
  * Author concise markdown inventory in `public/llms.txt` linking every tool with its capabilities and privacy model.
  * Author `public/llms-full.txt` detailing exact mathematical formulas, boundary limits, and input/output contracts.

#### WP 3.2: Direct-Answer Content Optimization (AEO)
* **Action:**
  * Ensure the opening paragraph of each guide provides an immediate answer to high-intent queries.
  * Embed structured HTML conversion tables in guides (e.g., Common Discount Table, Metric-to-Imperial Reference Table, GST Slab Reference Table).

---

## Phase 4: Topical Clusters & Internal PageRank Architecture (Weeks 8–9)

### Objective
Upgrade topic directories into authoritative topic pillars and implement task-based user routing.

### Work Packages

#### WP 4.1: Pillar Page Overhaul (`app/topics/[topic]/page.tsx`)
* **Action:**
  * Expand topic landing pages from plain card listings into authoritative category pillars:
    * `/topics/calculators`: Guide to percentage math, discount stacking, and financial estimates.
    * `/topics/pdf-tools`: Guide to private, in-browser PDF manipulation and document workflows.
    * `/topics/developer-tools`: Developer utility cheat sheet (JSON debugging, Base64 data URIs, password entropy).
    * `/topics/image-tools`: Image optimization guide (compression tradeoffs, dimension scaling, WebP benefits).

#### WP 4.2: Contextual Intent-Bridge Component
* **Files:** `components/tool-intent-bridge.tsx`, `components/tool-page.tsx`
* **Action:**
  * Deploy task-chaining callouts directly below tools:
    * `Word Counter` ➔ *"Need to adjust letter capitalization?"* ➔ `Case Converter`
    * `Percentage Calculator` ➔ *"Calculating shopping sales?"* ➔ `Discount Calculator`
    * `Image Compressor` ➔ *"Need exact pixel dimensions?"* ➔ `Image Resizer`
    * `JPG to PDF` ➔ *"Have multiple PDFs to merge?"* ➔ `Merge PDF`

---

## Phase 5: Programmatic Long-Tail Sub-Intent Architecture (Weeks 10–12)

### Objective
Capture high-volume long-tail search demand without creating low-quality doorway pages.

### Work Packages

#### WP 5.1: High-Volume Dedicated Conversion Routes
* **Target Routes:**
  * `/unit-converter/kg-to-lbs` & `/unit-converter/lbs-to-kg`
  * `/unit-converter/celsius-to-fahrenheit` & `/unit-converter/fahrenheit-to-celsius`
  * `/unit-converter/meters-to-feet` & `/unit-converter/feet-to-meters`
  * `/date-calculator/days-between-dates`
  * `/date-calculator/business-days-calculator`
* **Quality Guardrails:**
  * Pre-populate exact converter state immediately on load.
  * Provide unique, crawlable derivation formulas and lookup reference tables.
  * Enforce strict canonicalization and zero-duplicate indexation rules.

---

## Phase 6: Multi-Locale Global Expansion (Weeks 13+)

### Objective
Launch high-volume international variants using the repository's native `lib/hreflang.ts` architecture.

### Work Packages

#### WP 6.1: Locale Prioritization & Localization QA
* **Target Locales:**
  1. Spanish (`es`) — Latin America & Spain
  2. Portuguese (`pt-BR`) — Brazil
  3. French (`fr`) — France & Canada
  4. German (`de`) — Germany & Austria
  5. Hindi (`hi`) — India
* **Prerequisites Before Publication:**
  * Complete translation of both interactive UI chrome and educational server guides.
  * Verify document-level `lang` and `dir` attributes per request.
  * Enforce reciprocal `hreflang` validation via `tests/locale-security.test.ts`.
  * Ensure `x-default` points to the canonical English route.

---

## Quality Gates & Verification Sequence

Every phase must pass the strict repository verification suite before completion:

```bash
# 1. Behavioral & Unit Tests (369+ tests)
npm run test

# 2. Strict TypeScript Verification
npm run typecheck

# 3. Next.js ESLint & Core Web Vitals
npm run lint

# 4. Production Static Generation Build
npm run build
```

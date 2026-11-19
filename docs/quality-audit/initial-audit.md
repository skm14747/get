# GoEasyTools — Initial Audit Baseline

**Date:** 2026-10-24  
**Stack:** Next.js 15.5.28, React 19, TypeScript strict, Vitest 3.2.7, jsdom  
**CI:** `.github/workflows/ci.yml` → `npm ci && npm test && npm run typecheck && npm run lint && npm run build`

---

## Baseline test results (before this audit)

| Metric | Value |
|--------|-------|
| Test files | 13 |
| Total tests | 60 |
| Pass rate | 100% |
| Duration | ~960 ms |

## Existing test inventory

| File | Tests | Coverage area |
|------|:-----:|---------------|
| `tests/word-count.test.ts` | 8 | Word, character, sentence, paragraph, reading time |
| `tests/percentage.test.ts` | 6 | percentOf, whatPercent, percentageChange |
| `tests/discount.test.ts` | 6 | quoteDiscount, sequential, negative |
| `tests/case-convert.test.ts` | 6 | All 8 case modes |
| `tests/numbers.test.ts` | 3 | parseDecimal, formatDecimal |
| `tests/analytics.test.ts` | 4 | sanitizeProperties, allowed keys |
| `tests/browse.test.ts` | 2 | Tool registry completeness |
| `tests/seo.test.ts` | 2 | Indexable paths |
| `tests/locales.test.ts` | 7 | Published locales, hreflang, RTL, locale decimal |
| `tests/expanded-tools.test.ts` | 12 | JSON, age, QR, password, base64, units, dates, GST, EMI, files, PDF, analytics |
| `tests/components/rtl.test.tsx` | 2 | Arabic `dir=rtl` attribute |
| `tests/components/json-tool.test.tsx` | 1 | Render smoke |
| `tests/components/word-counter.test.tsx` | 1 | Render smoke |

## Tool classification

| Classification | Tools |
|---------------|-------|
| **Implemented + tested** | word-counter, percentage-calculator, discount-calculator, case-converter |
| **Implemented + under-tested** | json-formatter, age-calculator, qr-code-generator, password-generator, image-compressor, image-resizer, merge-pdf, split-pdf, jpg-to-pdf, unit-converter, date-calculator, gst-calculator, emi-calculator, base64, character-counter |
| **Not implemented (by constraint)** | compress-pdf |

## Highest-risk areas (tested first in this audit)

1. **EMI calculator** — compound-interest formula, amortization schedule, rounding
2. **GST calculator** — inclusive/exclusive, CGST/SGST odd-paisa split
3. **Percentage calculator** — 8 modes, division by zero
4. **Age calculator** — leap-day birthdays, calendar arithmetic
5. **Date calculator** — leap years, business days, month/year boundaries
6. **Unit converter** — 6 categories, temperature affine transform
7. **Password generator** — cryptographic randomness, character-set guarantees
8. **PDF tools** — pdf-lib integration, page extraction, image embedding

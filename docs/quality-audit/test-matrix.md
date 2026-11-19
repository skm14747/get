# GoEasyTools — Test Matrix

**Before audit:** 13 files, 60 tests  
**After audit:** 29 files, 369 tests  
**New tests:** 309 (+515%)

---

## Test file inventory

| # | File | Tests | Tool/Area | Oracle type | New? |
|:-:|------|:-----:|-----------|-------------|:----:|
| 1 | `tests/emi.test.ts` | 14 | EMI calculator | Independent formula, metamorphic (2× principal), schedule convergence | ✅ |
| 2 | `tests/gst.test.ts` | 14 | GST calculator | Independent tax formula, CGST+SGST sum invariant, exclusive↔inclusive round-trip | ✅ |
| 3 | `tests/percentage-full.test.ts` | 18 | Percentage calculator | All 8 modes, direct formula, symmetry, round-trip | ✅ |
| 4 | `tests/discount-full.test.ts` | 17 | Discount calculator | Cents arithmetic, stacked 20%+10%≠30%, formatMoney currencies | ✅ |
| 5 | `tests/units.test.ts` | 35 | Unit converter | NIST reference factors, round-trip tolerance, identity, temperature affine | ✅ |
| 6 | `tests/dates.test.ts` | 22 | Date calculator | Leap year, month/year boundary, business days, same date | ✅ |
| 7 | `tests/age.test.ts` | 26 | Age calculator | Leap-day birthday, partial months, next-birthday bounds, parseIsoDate, daysInMonth, isLeapYear | ✅ |
| 8 | `tests/word-count-full.test.ts` | 16 | Word counter | Sentence abbreviations, paragraphs, reading time, multilingual (Arabic, Hindi, CJK) | ✅ |
| 9 | `tests/case-convert-full.test.ts` | 23 | Case converter | All 8 modes, identifier splitting, accented chars, convertCase dispatch | ✅ |
| 10 | `tests/base64.test.ts` | 15 | Base64 encoder/decoder | Known vectors, round-trip UTF-8 (café, CJK, emoji, Arabic, Hindi) | ✅ |
| 11 | `tests/json-format.test.ts` | 14 | JSON formatter | Format↔minify round-trip, special chars, unicode, size limit | ✅ |
| 12 | `tests/password.test.ts` | 12 | Password generator | Set guarantee, ambiguous char exclusion, boundary lengths, single-set | ✅ |
| 13 | `tests/qr-payload.test.ts` | 18 | QR payload builder | WiFi escaping, URL protocol filter, XSS rejection, unicode text | ✅ |
| 14 | `tests/files.test.ts` | 25 | File utilities | MIME type filtering, page range parsing, reduction percent | ✅ |
| 15 | `tests/numbers.full.test.ts` | 21 | Number parser/formatter | Parse/format edge cases, trailing %, comma rejection | ✅ |
| 16 | `tests/locale-security.test.ts` | 19 | Locale + security | en-IN/de-DE formatting, analytics privacy, JSON no-eval, parseDecimal comma rejection | ✅ |
| 17 | `tests/word-count.test.ts` | 8 | Word counter (original) | Basic word/char/sentence counts | — |
| 18 | `tests/percentage.test.ts` | 6 | Percentage (original) | percentOf, whatPercent, change | — |
| 19 | `tests/discount.test.ts` | 6 | Discount (original) | quoteDiscount basics | — |
| 20 | `tests/case-convert.test.ts` | 6 | Case converter (original) | Basic 8 modes | — |
| 21 | `tests/numbers.test.ts` | 3 | Numbers (original) | parseDecimal, formatDecimal | — |
| 22 | `tests/analytics.test.ts` | 4 | Analytics | sanitizeProperties, allowed keys | — |
| 23 | `tests/browse.test.ts` | 2 | Tool registry | Completeness | — |
| 24 | `tests/seo.test.ts` | 2 | SEO | Indexable paths | — |
| 25 | `tests/locales.test.ts` | 7 | Locale routing | Published locales, hreflang, RTL, locale decimal | — |
| 26 | `tests/expanded-tools.test.ts` | 12 | Cross-tool (original) | JSON, age, QR, password, base64, units, dates, GST, EMI, files, PDF | — |
| 27 | `tests/components/rtl.test.tsx` | 2 | RTL component | Arabic dir=rtl | — |
| 28 | `tests/components/json-tool.test.tsx` | 1 | JSON tool UI | Render smoke | — |
| 29 | `tests/components/word-counter.test.tsx` | 1 | Word counter UI | Render smoke | — |

---

## Coverage by tool

| Tool | Dedicated test file | Tests | Status |
|------|-------------------|:-----:|--------|
| EMI calculator | `emi.test.ts` | 14 | ✅ Comprehensive |
| GST calculator | `gst.test.ts` | 14 | ✅ Comprehensive |
| Percentage calculator | `percentage-full.test.ts` | 18 | ✅ Comprehensive |
| Discount calculator | `discount-full.test.ts` | 17 | ✅ Comprehensive |
| Unit converter | `units.test.ts` | 35 | ✅ Comprehensive |
| Date calculator | `dates.test.ts` | 22 | ✅ Comprehensive |
| Age calculator | `age.test.ts` | 26 | ✅ Comprehensive |
| Word counter | `word-count-full.test.ts` | 16 | ✅ Comprehensive |
| Case converter | `case-convert-full.test.ts` | 23 | ✅ Comprehensive |
| Base64 encoder | `base64.test.ts` | 15 | ✅ Comprehensive |
| JSON formatter | `json-format.test.ts` | 14 | ✅ Comprehensive |
| Password generator | `password.test.ts` | 12 | ✅ Comprehensive |
| QR code generator | `qr-payload.test.ts` | 18 | ✅ Comprehensive |
| Character counter | `word-count-full.test.ts` (shared) | — | ✅ Shared module |
| Image compressor | `files.test.ts` (pure functions) | — | ⚠️ Browser APIs untestable |
| Image resizer | `files.test.ts` (pure functions) | — | ⚠️ Browser APIs untestable |
| Merge PDF | `expanded-tools.test.ts` | 2 | ✅ Integration |
| Split PDF | `expanded-tools.test.ts` | 1 | ✅ Integration |
| JPG to PDF | `expanded-tools.test.ts` | 1 | ✅ Integration |
| File utilities | `files.test.ts` | 25 | ✅ Comprehensive |

---

## Testing techniques used

| Technique | Tests using it |
|-----------|---------------|
| Independent oracle (hardcoded expected values) | EMI, GST, percentage, units, dates, age, base64 |
| Metamorphic testing | EMI (2× principal), GST (excl↔incl), percentage (round-trip), units (round-trip), JSON (format↔minify) |
| Boundary analysis | All tools — min/max lengths, zero, NaN, Infinity, leap day |
| Security assertions | QR (javascript: rejection), password (ambiguous chars), analytics (key stripping), JSON (no-eval) |
| Multilingual input | Base64, word counter, case converter, QR, JSON, locale formatting |
| Property-based invariants | CGST+SGST=tax, schedule sum=totalPayment, diff(a,b)=diff(b,a) |

# GoEasyTools — Known Limitations

Documented limitations that are design decisions, not defects. Each entry
explains why the limitation exists and what would be needed to lift it.

---

## 1. Word counter does not segment CJK or Thai text

**Behavior:** "こんにちは世界" (7 characters) counts as 1 word.

**Reason:** The word counter uses whitespace-based splitting (`text.split(/\s+/u)`).
Chinese, Japanese, and Thai do not use spaces between words. A proper word
segmenter would require `Intl.Segmenter` with `granularity: "word"`, which
would change the counting behavior for all languages.

**To lift:** Add an `Intl.Segmenter("ja", { granularity: "word" })` code path
for CJK locales. This would be a behavioral change and needs its own test
suite and user communication.

---

## 2. Business day counter does not include holidays

**Behavior:** `businessDaysBetween` counts Monday–Friday only. National,
regional, and religious holidays are not excluded.

**Reason:** There is no universal holiday calendar. Supporting holidays would
require a per-country database that must be maintained and updated annually.

**To lift:** Add an optional `holidays: CalendarDate[]` parameter. Populate
from a maintained dataset (e.g., Nager.Date API or a bundled JSON file).

---

## 3. Non-English locales return 404

**Behavior:** All 9 non-English locales (`es`, `fr`, `ar`, `pt-BR`, `de`,
`ja`, `hi`, `id`, `it`) return 404.

**Reason:** `published: false` in `lib/locales.ts`. Non-English content has
not been native-reviewed. Publishing machine-translated content without review
would violate the project's quality standards.

**To lift:** Complete native review for each locale, set `published: true`,
and verify hreflang reciprocity.

---

## 4. compress-pdf is not implemented

**Behavior:** There is no compress-pdf tool page.

**Reason:** Standing constraint. pdf-lib performs structural rewrite (removing
unused objects), not actual compression. Claiming "compression" without true
size reduction would be misleading.

**To lift:** Integrate a WASM-based PDF compressor (e.g., mupdf-wasm or
Ghostscript compiled to WASM) that can actually reduce file sizes.

---

## 5. Image tools require browser APIs

**Behavior:** Image compressor and resizer use the Canvas API and cannot be
unit-tested in Node/jsdom. Only the pure utility functions in `lib/files.ts`
are tested.

**Reason:** jsdom does not implement the Canvas API, `createImageBitmap`, or
`toBlob`. Browser-based testing requires Playwright or a real browser.

**To lift:** Install Playwright and write E2E tests, or extract the
compression/resize logic into a Web Worker that can be tested with a Canvas
polyfill.

---

## 6. No country-specific currency formatting in the calculator tools

**Behavior:** EMI and GST calculators format numbers using `en-US` or
`en-IN` locale via `Intl.NumberFormat`. The currency symbol shown depends
on the user's selected currency but the number grouping follows the
hardcoded locale.

**Reason:** The tools serve a global audience with English-only UI. Matching
number grouping to the currency's country would require detecting the user's
locale or adding a locale selector.

**To lift:** Use the currency's native locale for `Intl.NumberFormat` or
add a locale preference in settings.

---

## 7. Password generator uses rejection sampling

**Behavior:** `indexBelow` discards random bytes that would introduce modulo
bias. For small alphabets this can waste bytes.

**Reason:** Correctness over efficiency. Rejection sampling is the standard
approach for unbiased random selection from arbitrary-length alphabets when
the source provides uniform bytes.

**Impact:** Negligible. The maximum waste ratio is `< 1 byte per character`
for the smallest alphabet (8 digits). The `nextByte` function is called from
`crypto.getRandomValues` which produces batches.

---

## 8. Analytics consent is localStorage-based

**Behavior:** Analytics only fire when `goeasytools.analytics-consent` is
`"granted"` in localStorage.

**Reason:** Simple, client-side consent without a cookie banner dependency.
No data is sent without explicit consent.

**Limitation:** localStorage is per-origin and per-browser. Users who clear
storage must re-consent. There is no server-side consent record.

---

## 9. QR code generator does not support vCard or calendar events

**Behavior:** Only URL, text, and Wi-Fi payloads are supported.

**Reason:** vCard and iCalendar payloads have complex formats with many
optional fields. Supporting them would significantly increase the UI
complexity and the payload validation logic.

**To lift:** Add vCard 3.0/4.0 and iCalendar payload builders with their
own test suites.

---

## 10. PDF tools do not validate page content

**Behavior:** `mergePdfs`, `extractPdfPages`, and `imagesToPdf` operate on
the PDF structure (pages, images) but do not validate or extract text
content.

**Reason:** pdf-lib is a structural library, not a content parser. Text
extraction would require a different library (e.g., pdf.js).

**Impact:** Users cannot preview PDF content before merging or splitting.
The tools operate on page boundaries only.

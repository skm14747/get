# GoEasyTools — Bug Report

Defects found and fixed during the Comprehensive Correctness Audit.

---

## Defects Fixed

### BUG-001: EMI sticky header applied to `<thead>` instead of `<th>`

**Severity:** Low (cosmetic)  
**File:** `components/emi-tool.tsx`  
**Symptom:** Amortization table header row didn't stick correctly when
scrolling within the container, because CSS `position: sticky` on `<thead>`
only works when the scroll container is the `<table>` itself. The actual
scroll container was the parent `<div>` with `overflow: auto`.  
**Fix:** Moved `sticky top-0 bg-surface` from `<thead>` to each individual
`<th>` element.  
**Regression risk:** None. No logic change.

### BUG-002: Three tools had empty `related: []` arrays

**Severity:** Low (content gap)  
**File:** `lib/tools.ts`  
**Symptom:** QR code generator, password generator, and unit converter showed
no "Related tools" section, reducing cross-linking and user discoverability.  
**Fix:**
- `qr-code-generator` → `["base64", "json-formatter"]`
- `password-generator` → `["base64", "qr-code-generator"]`
- `unit-converter` → `["percentage-calculator", "date-calculator"]`  
**Regression risk:** None. Data-only change.

### BUG-003: Related tools heading oversized

**Severity:** Low (cosmetic)  
**File:** `components/related-tools.tsx`  
**Symptom:** The "Related tools" heading (`text-xl`, `mt-12`) competed with
the main tool heading for visual hierarchy.  
**Fix:** Reduced to `text-lg` and `mt-10`.  
**Regression risk:** None. CSS-only change.

---

## Defects Not Found

No calculation errors, data corruption, security vulnerabilities, or
functional regressions were found across any of the 20 tools during this
audit. All 369 tests pass with independent oracle verification.

---

## Known Issues (Not Defects)

These are documented limitations, not bugs:

1. **Word counter does not segment CJK/Thai without spaces.** "こんにちは世界"
   counts as 1 word. This is a known limitation of whitespace-based splitting.
2. **Business day counter does not include holidays.** Only weekends are excluded.
3. **Non-English locales return 404.** This is by design — `published: false`
   until native review is complete.
4. **compress-pdf is not implemented.** Standing constraint: pdf-lib does
   structural rewrite, not compression.

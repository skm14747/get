# GoEasyTools — Behavioral Contracts

Each section specifies the exact formula, input validation, output format,
rounding, error behavior, and boundary conditions for one tool. Tests in
this audit use these contracts as the independent oracle.

---

## 1. EMI Calculator (`lib/emi.ts`)

### Formula

```
r = annualPercent / 12 / 100
EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ − 1)
```

When `annualPercent = 0`: `EMI = P / n`

### Input validation

| Input | Type | Valid range |
|-------|------|------------|
| `principal` | `number` | `≥ 0`, finite |
| `annualPercent` | `number` | `≥ 0`, finite |
| `months` | `number` | Integer, `1 ≤ months ≤ 360` |

Invalid → `{ ok: false, reason: "invalid" }`  
Too long → `{ ok: false, reason: "too_long" }`

### Rounding

All monetary values: `Math.round(value * 100) / 100`

### Amortization schedule

- Each row: `interest = round(balance × r)`, `principal = round(payment − interest)`
- Final row: `principal = round(balance)`, `payment = principal + interest`
- Final balance: `0`
- Sum of all payments: `totalPayment`

### Metamorphic property

Doubling `P` doubles `EMI` (same rate, same tenure).

---

## 2. GST Calculator (`lib/gst.ts`)

### Formulas

- **Exclusive:** `tax = round(amount × rate / 100)`, `total = taxable + tax`
- **Inclusive:** `taxable = round(amount / (1 + rate / 100))`, `tax = round(amount − taxable)`

### Split

- **IGST:** `igst = tax`, `cgst = 0`, `sgst = 0`
- **CGST+SGST:** `cgst = round(tax / 2)`, `sgst = round(tax − cgst)`
- Invariant: `cgst + sgst = tax`

### Input validation

| Input | Type | Valid range |
|-------|------|------------|
| `amount` | `number` | `≥ 0`, finite |
| `ratePercent` | `number` | `≥ 0`, finite |
| `inclusive` | `boolean` | — |
| `split` | `"igst" \| "cgst-sgst"` | — |

Negative → `{ ok: false, reason: "negative" }`  
Non-finite → `{ ok: false, reason: "not_finite" }`

### Special case

Zero rate + inclusive: returns `{ taxable: amount, tax: 0, total: amount }`

### Metamorphic property

`exclusive(taxable, rate).total` fed into `inclusive(total, rate)` yields the same `taxable`.

---

## 3. Percentage Calculator (`lib/percentage.ts`)

### 8 modes

| Mode | Formula | Divide-by-zero |
|------|---------|----------------|
| `percentOf(p, w)` | `(p / 100) × w` | Never (0% of anything = 0) |
| `whatPercent(part, whole)` | `(part / whole) × 100` | `whole = 0` |
| `percentageChange(orig, next)` | `((next − orig) / orig) × 100` | `orig = 0` |
| `percentageIncrease(orig, next)` | Same as `percentageChange` | `orig = 0` |
| `percentageDecrease(orig, next)` | `((orig − next) / orig) × 100` | `orig = 0` |
| `originalBeforeIncrease(final, p)` | `final / (1 + p/100)` | `1 + p/100 = 0` |
| `originalBeforeDiscount(final, p)` | `final / (1 − p/100)` | `1 − p/100 = 0` (100% discount) |
| `percentageDifference(a, b)` | `\|a − b\| / ((|a| + |b|) / 2) × 100` | `a = 0 and b = 0` |

### Error result

`{ ok: false, reason: "divide_by_zero" | "not_finite" }`

### Metamorphic properties

- `percentOf(whatPercent(x, y), y) ≈ x`
- `percentageDifference(a, b) = percentageDifference(b, a)` (symmetric)

---

## 4. Discount Calculator (`lib/discount.ts`)

### Internal representation

All monetary values stored as integer **cents** (`Math.round(amount × 100)`).

### Formula

```
firstDiscount = round(originalCents × discount / 100)  (percent mode)
             or toCents(discount)                       (amount mode)
afterFirst = originalCents − firstDiscount
secondDiscount = round(afterFirst × additionalPercent / 100)
finalCents = afterFirst − secondDiscount
effectivePercent = (originalCents − finalCents) / originalCents × 100
```

### Key rule

20% + 10% ≠ 30%. The additional discount applies to the **reduced** price.

### Input validation

Negative price → `"negative_price"`  
Negative discount → `"negative_discount"`  
Non-finite → `"not_finite"`

### Currencies

`formatMoney(cents, currency)` uses `Intl.NumberFormat` with `narrowSymbol`.
Supported: USD, EUR, GBP, INR, BRL, SAR.

---

## 5. Unit Converter (`lib/units.ts`)

### Categories and reference units

| Category | Reference unit | Conversion |
|----------|---------------|------------|
| Length | metres | Multiply by factor |
| Mass | kilograms | Multiply by factor |
| Area | m² | Multiply by factor |
| Volume | litres | Multiply by factor |
| Speed | m/s | Multiply by factor |
| Temperature | °C | Affine transform |

### Conversion formula (non-temperature)

```
result = value × fromFactor / toFactor
```

### Temperature (affine, not multiplicative)

```
°C → °F: C × 9/5 + 32
°F → °C: (F − 32) × 5/9
°C → K:  C + 273.15
K → °C:  K − 273.15
```

### Reference conversion factors

| Unit | Factor |
|------|--------|
| km | 1000 m |
| mi | 1609.344 m |
| ft | 0.3048 m |
| in | 0.0254 m |
| yd | 0.9144 m |
| lb | 0.45359237 kg |
| oz | 0.028349523125 kg |
| acre | 4046.8564224 m² |
| US gal | 3.785411784 L |
| mph | 0.44704 m/s |
| kn | 1852/3600 m/s |

### Error

Unknown unit → `null`. Non-finite input → `null`.

### Identity

Same-unit conversion returns the input value exactly.

---

## 6. Date Calculator (`lib/dates.ts`)

### `daysBetween(start, end)`

Returns `Math.abs(ordinal(end) − ordinal(start))`.  
Ordinal = `Math.floor(Date.UTC(y, m-1, d) / 86400000)`.

### `addDays(start, amount)`

Returns the ISO date at `ordinal(start) + amount`.  
Rejects non-integer amounts.

### `businessDaysBetween(start, end)`

Counts Monday–Friday dates **after** the start date through the end date.
No holiday calendar. Saturday/Sunday excluded.

### Error

Invalid date string → `{ ok: false, reason: "invalid_date" }`.

---

## 7. Age Calculator (`lib/age.ts`)

### Algorithm

Calendar arithmetic (not day-count approximation):

1. `years = referenceYear − birthYear`, adjusted down if anniversary hasn't occurred
2. `months` and `days` counted from the last birthday
3. If `days < 0`, borrow from previous month

### Leap-day birthdays

Feb 29 birthday in a non-leap year: anniversary treated as Feb 28.
`clampDay(year, month, day)` = `min(day, daysInMonth(year, month))`

### Next birthday

Always in the future. If today is the birthday, next birthday is next year.

### `daysUntilNextBirthday`

Always `> 0` and `≤ 366`.

### Error

Invalid date → `"invalid_date"`  
Reference before birth → `"reference_before_birth"`

### `parseIsoDate`

Regex: `/^(\d{4})-(\d{2})-(\d{2})$/`  
Rejects month 0, 13+, day 0, day > `daysInMonth(year, month)`.

### `isLeapYear`

`(y % 4 === 0 && y % 100 !== 0) || y % 400 === 0`

---

## 8. Word Counter (`lib/word-count.ts`)

### Words

`text.trim().split(/\s+/u).length` (0 for empty/whitespace-only).

### Characters

Code points (`Array.from(text).length`), including spaces.

### Characters (no spaces)

Code points excluding `\s`.

### Graphemes

`Intl.Segmenter("en", { granularity: "grapheme" })` when available;
falls back to code points.

### Sentences

Split on `[.!?]+`, then filter parts containing `\p{L}` or `\p{N}`.
Protected patterns: abbreviations (Mr., Dr., e.g., etc.), decimal points (`\d.\d`), initials (`X.`).

### Paragraphs

Split on `\n\s*\n`, filter non-empty.

### Lines

`text.split("\n").length` (0 for empty string).

### Reading time

`WORDS_PER_MINUTE = 200`. Minutes = `words / 200`.

### Locale behavior

Whitespace-split does **not** segment CJK or Thai. "こんにちは世界" = 1 word.
This is a known limitation, not a bug.

---

## 9. Case Converter (`lib/case-convert.ts`)

### 8 modes

| Mode | Rule |
|------|------|
| upper | `toLocaleUpperCase("en-US")` |
| lower | `toLocaleLowerCase("en-US")` |
| title | First letter of each word upper, rest lower; apostrophe doesn't break |
| sentence | First letter after `.!?` or start upper; rest lower |
| camel | `splitIdentifierWords` → first word lower, rest capitalized, joined |
| pascal | `splitIdentifierWords` → all capitalized, joined |
| snake | `splitIdentifierWords` → all lower, joined with `_` |
| kebab | `splitIdentifierWords` → all lower, joined with `-` |

### `splitIdentifierWords`

1. Replace `[-_]+` between non-space chars with space
2. Insert space before uppercase preceded by lowercase/digit
3. Split on non-letter, non-digit

---

## 10. JSON Formatter (`lib/json-format.ts`)

### Behavior

`JSON.parse` then `JSON.stringify(parsed, null, space)`.
Does **not** evaluate code. Parse-only.

### Input limits

Max 1,000,000 characters.

### Errors

Empty → `"empty"`, too large → `"too_large"`, parse fail → `"invalid"`.

### Metamorphic property

`formatJson(formatJson(input, 2).value, null)` = canonical minified form.

---

## 11. Base64 Encoder/Decoder (`lib/base64.ts`)

### Encode

`TextEncoder.encode()` → `btoa()` via `String.fromCharCode` chunks.

### Decode

Regex validation: `/^[A-Za-z0-9+/]+={0,2}$/` and `length % 4 === 0`.
Then `atob()` → `Uint8Array` → `TextDecoder("utf-8", { fatal: true })`.

### Round-trip

`decodeUtf8(encodeUtf8(text).value).value === text` for any valid UTF-8 text.

### Errors

Empty input → `"empty"`. Invalid base64 → `"invalid"`.

---

## 12. Password Generator (`lib/password.ts`)

### Character sets (ambiguous characters excluded)

| Set | Alphabet |
|-----|----------|
| lower | `abcdefghijkmnopqrstuvwxyz` (no `l`) |
| upper | `ABCDEFGHJKLMNPQRSTUVWXYZ` (no `I`, `O`) |
| digits | `23456789` (no `0`, `1`) |
| symbols | `!@#$%^&*_-+=?` |

### Length

`PASSWORD_MIN = 8`, `PASSWORD_MAX = 128`. Integer only.

### Guarantee

At least one character from each selected set (placed first, then shuffled).

### Randomness

Uses injected `nextByte: () => number`. Production uses `crypto.getRandomValues`.
Bias rejection: `indexBelow` discards bytes `≥ floor(256/limit) × limit`.

### Errors

`"length"` — out of range. `"no_set"` — no character set selected.
`"too_short_for_sets"` — length < number of selected sets.

---

## 13. QR Payload Builder (`lib/qr-payload.ts`)

### `textPayload`

Accepts any non-whitespace-only string.

### `urlPayload`

Must parse as `URL`. Only `http:` and `https:` protocols allowed.
Rejects `javascript:`, `data:`, `ftp:`.

### `wifiPayload`

Format: `WIFI:T:{type};S:{ssid};P:{password};;`  
`nopass`: omits `P:` field.  
Escapes `;`, `:`, `,`, `"`, `\` in SSID and password.

### Errors

Empty text → `"empty"`. Bad URL → `"url"`. Empty SSID → `"ssid"`.

---

## 14. File Utilities (`lib/files.ts`)

### `acceptedImageType(mime)`

`image/jpeg`, `image/jpg` → `"jpeg"`. `image/png` → `"png"`. `image/webp` → `"webp"`. Else `null`.

### `MAX_IMAGE_BYTES` = 15 MB. `MAX_PDF_BYTES` = 20 MB. `MAX_PDF_FILES` = 10.

### `parsePageRanges(input, pageCount)`

Comma-separated single pages or `start-end` ranges.  
Rejects: empty, reversed ranges, page 0, page > pageCount, non-numeric.

### `reductionPercent(before, after)`

`((before − after) / before) × 100`. Returns `null` if `before ≤ 0`.

---

## 15. PDF Tools (`lib/pdf-tools.ts`)

### `mergePdfs(files[])`

Requires `≥ 2` files. Copies all pages into a new document.
Returns `{ ok: true, bytes, pages }` or error `"need_two"`, `"encrypted"`, `"unreadable"`.

### `extractPdfPages(file, pages[])`

1-indexed page numbers. Returns extracted pages in a new document.

### `imagesToPdf(images[], size)`

Embeds PNG/JPEG. Size `"a4"` uses A4 page dimensions; `"fit"` uses image dimensions.
Center-scales the image to fit the page.

### `pdfPageCount(file)`

Returns the page count or `"encrypted"` / `"unreadable"`.

---

## 16. Number Parser (`lib/numbers.ts`)

### `parseDecimal(raw)`

Strips trailing `%`, trims whitespace.  
Regex: `/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/`.  
Rejects commas, non-numeric, non-finite.

### `formatDecimal(value, maxFractionDigits)`

`Intl.NumberFormat("en-US")` with grouping. Returns `"Not a number"` for NaN/Infinity.

---

## 17. Discount Currencies

`formatMoney(cents, currency)` via `Intl.NumberFormat` with `narrowSymbol`.
Supported: `USD`, `EUR`, `GBP`, `INR`, `BRL`, `SAR`.

---

## 18. Analytics (`lib/analytics.ts`)

### Allowed keys

`tool_id`, `operation`, `error_code`, `destination_tool_id`, `locale`.

### Blocked patterns

`/text|input|value|query|document|price|amount|content|paste|result_text|password|filename|secret|ssid/i`

### String value constraints

Length 1–64, matches `/^[a-z0-9_-]+$/i`. Empty, too long, or special chars → dropped.

---

## 19. Locale Routing (`lib/locales.ts`, `lib/hreflang.ts`)

### Published locales

Only `en` has `published: true`. All 9 others return 404.

### `resolvePrefixedRequest(locale, page)`

Returns `null` for unpublished locales → `notFound()`.

### Hreflang

Only emitted when ≥ 2 locales are published. Currently none.
Must be reciprocal (every page links to every other language version).

---

## 20. Image Compressor / Resizer

Browser-only (Canvas API). Pure-function testing limited to `lib/files.ts`.
No server-side image processing. File size limits enforced on the client.

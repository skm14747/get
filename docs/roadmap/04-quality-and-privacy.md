# Quality, privacy, security, and accessibility

Reviewed 2026-10-24.

## Performance

Targets, using Google’s published Core Web Vitals thresholds at the 75th percentile of field data:

- LCP no more than 2.5 seconds.
- INP no more than 200 milliseconds.
- CLS no more than 0.1.

These are targets. This site has no field data. A Lighthouse run was not collected in this pass.

What the implementation does:

- Pages are statically generated.
- The typeface is the device font, so there is no font download and no font-swap shift.
- There is no hero image and no ad slot.
- Calculator pages do not import a PDF or date library. The production build reported about 109–110 KB of first-load JavaScript for a tool page, including the shared Next.js runtime. That figure is a build output, not a user-perceived time.
- Counts and calculations run on the client during typing. A word-counter note appears after 100,000 characters. Very large pastes can still block the main thread. That limit was not benchmarked on a phone.

## Privacy

| Behavior | Evidence |
| --- | --- |
| Tool text and numbers are not posted by the tool code | Client components call pure functions. There is no server action and no `fetch` of the input |
| Tool state is not put in the URL | Inputs are React state. The canonical helper drops queries |
| Analytics cannot accept free text | `sanitizeProperties()` allow-list, covered by tests |
| No remote font, ad, or analytics script in the current pages | No third-party script tag in the layout. Consent does not load a tag by itself |
| Consent choice | `localStorage` key `goeasytools.analytics-consent` only |

Hosting logs are unknown because no host is selected. The privacy page says that a future host can still see an IP address and the URL. That is a disclosure, not a measurement.

“Processed in the browser” describes this implementation. It is not a claim that competing tools lack the same behavior. Phase 2 did not reopen the ranking pages to check.

## Security

Response headers from `next.config.ts`:

- `Content-Security-Policy` with `default-src 'self'`, `frame-ancestors 'none'`, `object-src 'none'`, and `connect-src 'self'`.
- `script-src 'self' 'unsafe-inline'` because the current Next.js pages still need inline bootstrap scripts. This is weaker than a nonce policy. It is documented rather than described as strict.
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: DENY`
- `Permissions-Policy` disables camera, microphone, geolocation, and payment.

User text is rendered as React text, not as HTML. JSON-LD is serialized with `JSON.stringify` from our own metadata, not from tool input.

`npm audit` on 2026-10-24 reported PostCSS advisories through Next and Vitest advisories in the test runner. See the repository audit. They were not force-upgraded.

Clipboard access uses the browser permission. Failure shows a message and does not log the text.

## Accessibility

Implemented in the components:

- Skip link.
- Labels on the text boxes and number fields.
- Buttons are `type="button"` inside forms that do not navigate.
- Minimum control height of 44px via `min-h-11`.
- Visible `:focus-visible` outline.
- `aria-live="polite"` for the word-counter summary, debounced so it does not announce every key.
- `role="alert"` for validation and undefined percentages.
- `prefers-reduced-motion: reduce` removes animations and transitions. The interface does not depend on motion.
- Color uses stone text on a light background and white text on `#0f5c56`. A numeric contrast audit was not run.

Checked with an automated component test: the word counter exposes a textbox named “Text”, a Clear button, an empty state, and a count after typing “hello world”.

Checked in the browser during this pass: the four tools at desktop width, a 390px-wide viewport with no horizontal overflow, and button heights of 44px. An automated Tab press did not move focus, so keyboard order is inferred from the accessibility tree and was not confirmed by a manual walk. A screen reader was not used.

## Test layers

| Layer | What it covers |
| --- | --- |
| Unit | Formulas, rounding, sentence heuristic, Unicode examples, case limits, canonical URLs, analytics allow-list |
| Component | Word-counter empty state and a typed count |
| Production build | TypeScript, lint, static generation |
| Browser | Primary flows, recorded in the execution report |
| Not run | Screen reader, axe CLI, Lighthouse, mobile device lab, Search Console |

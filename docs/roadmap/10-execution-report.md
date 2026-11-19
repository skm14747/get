# Execution report

Date: 2026-10-24. This describes the repository after the work, not a deployed site.

## What was inspected

The repository contained research files and an empty `.env.example`. There was no application, test, or host configuration. Phase 1 and Phase 2 were read, including the revised recommendation for four English experiments and the SERP file.

`research/phase-2/03-serp-analysis.csv` has 53 rows. `result_url` is empty on every row. The original file was not edited. `research/serp-url-audit/README.md` records why those URLs were not guessed. SHA-256 hashes of the Phase 1 and Phase 2 files matched the hashes taken before this work. `.env.example` was extended with empty public site settings. No secret was added.

## What was implemented

A static Next.js site with four English tools:

- Word counter, with documented Unicode and sentence-heuristic rules.
- Percentage calculator, with percent-of, share, change, increase, decrease, and difference on one URL.
- Discount calculator, including a second discount applied to the reduced price.
- Case converter, with eight English case forms and documented limits.

Shared pieces include the header, footer, consent banner, sitemap, robots file, canonical helper, privacy page, contact page, not-found page, and an analytics allow-list that sends nothing until an HTTPS endpoint is configured and consent is granted.

A PDF prototype was not built. The decision is in `research/phase-3-file-tools/03-prototype-decision.md`.

## Checks that ran

On 2026-10-24, after the final title and copy-label edits:

- `npm test`: 8 files, 34 tests, all passed.
- `npm run lint`: no ESLint warnings or errors. `next lint` printed a deprecation notice for Next.js 16.
- `npm run typecheck`: passed during the earlier full run. The final command sequence ran tests, lint, and the production build.
- `npm run build`: passed. Pages are static. Tool routes reported about 109–110 KB first-load JavaScript, including the shared runtime. The home page reported about 106 KB.

GitHub Actions was not executed. The workflow file is `.github/workflows/ci.yml`.

`npm audit` reported 5 advisories in PostCSS/Next and in Vitest. They were not force-fixed. They are build and test tools, not scripts shipped as application features. Details are in `00-repository-audit.md`.

## Browser checks

Against `next start` on `http://localhost:3456`:

- Home lists the four tools and the consent banner. At a 390px-wide viewport the home page and the word counter did not overflow horizontally. The word-counter buttons were 44px tall.
- Word counter: “Dr. Smith paid 3.14. Then she left.” announced 7 words, 35 characters, 2 sentences, and less than 1 minute. The URL stayed `/word-counter`.
- Percentage calculator: 15% of 80 displayed 12. Five as a percent of zero displayed the divide-by-zero message.
- Discount calculator: 100 with 20% off and an additional 10% displayed a final price of 72.00.
- Case converter: “hello world” produced the eight documented forms. Copy buttons are named “Copy UPPERCASE”, “Copy lowercase”, and so on.
- Contact says no address is configured.
- `/not-a-tool` returned the not-found page.
- Sitemap and robots responses use `https://goeasytools.com`. Response headers include the content security policy.
- Titles after the final build: “Free text and calculator tools · GoEasyTools”, “Word counter · GoEasyTools”, and “Case converter · GoEasyTools”. The home title had been missing the site name when it relied on the layout template. Titles are now set absolutely.

An automated Tab press did not move focus off the page body, so keyboard order was not confirmed that way. A screen reader, Lighthouse, and field Core Web Vitals were not run.

The local server was stopped after these checks.

## Known limits

- Monthly search volume, keyword difficulty, CPC, and publisher RPM remain unknown.
- SERP result URLs from Phase 2 remain blank.
- No host, DNS, Search Console property, contact inbox, analytics endpoint, or ad account.
- Sentence counts are a heuristic. Case conversion is `en-US` and does not understand acronyms.
- The content security policy allows inline scripts because the current Next.js bootstrap needs them.
- Large pastes were not benchmarked on a phone.
- The site is not launched. The launch checklist marks hosting, contact, and Search Console as blocked.

## Decisions that need approval

1. A host and the canonical hostname, if it will not be `https://goeasytools.com`.
2. A real contact address before any ad application.
3. A Search Console property and verification token.
4. An analytics endpoint, if product events should leave the browser.
5. Any deploy, DNS change, paid account, ad script, PDF prototype, or translation.

## Next three actions

1. Choose a host and put a monitored address in `NEXT_PUBLIC_CONTACT_EMAIL`, then add the Search Console token and deploy only after that approval.
2. Fill `research/phase-2/keyword-planner-import-template.csv` from Keyword Planner. Do not copy Trends indexes into the volume column.
3. Read fresh results pages for “discount calculator” and “case converter” in the US, and record final URLs in a new file. Those two pages are live without that evidence.

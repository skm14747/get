# Product roadmap

Written 2026-10-24. Weeks below are a planning horizon counted from a future kickoff. They are not committed calendar dates, and they are not a promise of rankings or ad revenue. The four English tools were implemented in the same effort as this document so the experiment can be measured. Launch still depends on hosting approval.

## Product

GoEasyTools is a free English utility site. The business model under consideration is display advertising. The current release is a measurement experiment: useful pages, crawlable explanations, and no claim that demand has been proved.

## Initial release

| Priority | Tool | Route | Decision |
| --- | --- | --- | --- |
| 1 | Word counter | `/word-counter` | Built. Counting rules are documented, including the sentence heuristic. |
| 2 | Percentage calculator | `/percentage-calculator` | Built. Change, increase, decrease, and difference are separate controls on one page. |
| 3 | Discount calculator | `/discount-calculator` | Built. Included because Phase 2 found no material blocker and the extra calculator reuses the same shell. |
| 4 | Case converter | `/case-converter` | Built, for the same reason. English casing only. |

Phase 2 did not call any of these a validated opportunity. Building them is allowed as a low-cost experiment. It does not authorize a directory, a PDF suite, or a translation.

## Shared behavior

Every tool has a label, a result, a clear action, and a copy action. Empty inputs do not pretend that a calculation has happened. Errors say what is wrong. Related tools are real neighbors: the word counter links to the case converter, and the percentage calculator links to the discount calculator. There is no account.

## Explicitly not in this release

PDF merge, split, rotate, image-to-PDF, and compression. JSON, URL encoding, Base64, units, dates, time zones, UUID, HTML entities, slugs, and country tax calculators. The file-tool review is `research/phase-3-file-tools/03-prototype-decision.md`. The decision is not to prototype yet.

## Weeks 1–2 — Audit and validate

- Read the research and confirm the blank SERP URLs. Done in this repository pass.
- Finish Keyword Planner exports. Not done. The import sheet remains `research/phase-2/keyword-planner-import-template.csv`.
- Read results pages for case converter, discount calculator, and days between dates, then one non-US PDF query if file tools are still candidates. Not done.
- Specify the first tools, privacy, and analytics. Done as code plus `03-analytics-plan.md` and `04-quality-and-privacy.md`.

Exit: the four pages exist, and missing commercial metrics are still labeled unknown.

## Weeks 3–5 — Build

- Shared shell, word counter, percentage calculator, discount calculator, case converter, metadata, sitemap, tests, and consent. Done in this repository pass.
- Search Console and a production host. Not started. Needs approval.

Exit: `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build` pass. See the execution report for the run that satisfied this exit inside the repository. A public launch is a separate exit.

## Weeks 6–9 — Launch and learn

- Deploy only after explicit approval.
- Verify the Search Console property and inspect coverage.
- Read the first query report before changing titles or adding pages.
- Do not add a language or a tool family because the code is ready.

Exit: at least one URL has impressions, or the property has been inspected and the coverage state is recorded. A lack of impressions is a result, not a cue to publish more pages immediately.

## Weeks 10–13 — Decide

- Compare the four URLs on impressions, clicks, and the completion event.
- Build one more tool only if the decision framework in `08-decision-log.md` has the evidence it requires.
- Revisit a file-tool pilot or a France-only page only with new keyword and results-page evidence.
- Write the next-90-days memo from `09-90-day-review-template.md`.

Exit: a build, investigate, defer, or reject decision for the next candidate, with the unknowns still listed.

## Scoring framework

Use the Phase 2 weights. Do not change them without a written sensitivity test.

| Component | Points | Direction |
| --- | --- | --- |
| Search-demand evidence | 25 | Higher means stronger evidence of demand for the landing page |
| Ranking feasibility | 25 | Higher means a more plausible chance to rank, based on observed results |
| Monetization evidence | 20 | Higher means stronger evidence of publisher yield. CPC is not RPM |
| Implementation ease | 15 | Higher means less effort |
| Localization or differentiation | 10 | Higher means a real unmet need, not translation by itself |
| Maintenance | 5 | Higher means easier maintenance |

Rules:

- Unknown volume is unscored, not zero.
- Unknown RPM is unscored, not zero.
- An easy build does not get a full score on the other components.
- Partial totals may be compared only when they include the same components and the same maximum.
- The 100-point total stays blank while demand or monetization is unscored.
- Confidence is recorded separately for the engineering judgment and the commercial evidence.
- A high score does not by itself authorize a build. The recommendation is a separate label: Build, Investigate, Defer, or Reject.

The current tool decision is Build for the four English experiments, in the Phase 2 sense of a cheap experiment. It is not “Validated opportunity.”

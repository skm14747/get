# Repository audit

Audit date: 2026-10-24. The application code in this repository was added after this audit started. The findings below separate what existed before that work from what was then built.

## What existed

The repository contained research only. There was no framework, package manifest, page, test, or deployment configuration. `.env.example` held empty placeholders for Google Ads, Ahrefs, Semrush, and Moz. No secret was present, and no paid API was called.

Phase 1 and Phase 2 research is in `research/` and `research/phase-2/`. The newest recommendation is `research/phase-2/08-revised-mvp-recommendation.md`: four English experiments, no validated commercial opportunity, and no PDF suite or second language yet.

`research/phase-2/03-serp-analysis.csv` has 53 rows and an empty `result_url` on every row. That file was left unchanged. The limitation is recorded in `research/serp-url-audit/README.md`. No historical URL was invented.

## Stack choice

There was no existing application stack to retain or migrate. The Phase 2 planning assumption was Next.js, TypeScript, React, and Tailwind. That is the stack now in the repository:

- Next.js 15 App Router, statically generated pages.
- TypeScript in strict mode.
- React 19 client components for the interactive tools.
- Tailwind CSS 4 for layout and spacing.
- Vitest for unit tests and one jsdom component test.
- ESLint through `eslint-config-next`.

A different framework was not introduced. There is no database, account system, queue, or payment integration. None of those has a demonstrated need.

## Directory structure

| Path | Role |
| --- | --- |
| `app/` | Routes, metadata, sitemap, robots, global stylesheet |
| `components/` | Header, footer, consent, tool shells, and guides |
| `lib/` | Counting, percentage, discount, case, analytics, SEO, and tool registry |
| `locales/en.ts` | English chrome strings and `ltr` direction |
| `tests/` | Automated checks |
| `docs/roadmap/` | Plans and the execution report |
| `research/` | Preserved research, plus the later URL audit and file-tool review |

Tool logic lives in pure functions under `lib/`. Pages stay server-rendered. The interactive panel is a client component on the same URL. Editorial explanations are server components, so the formulas are in the HTML without waiting for the calculator to run.

## What is implemented

Four tools, a home page, privacy, contact, a custom not-found page, canonical URLs, a sitemap, robots rules, security headers, a consent banner, and an analytics function that sends nothing until an endpoint is configured. Details and test results are in `10-execution-report.md`.

## What should be retained

- The research files and their unknown values.
- One URL per intent. Percentage variants stay on `/percentage-calculator`.
- Browser-side calculation for these four tools.
- The scoring rule that a missing volume or RPM is unscored, not zero.

## What should be refactored later

- Move the remaining tool-page sentences into `locales/en.ts` before a translation project. Chrome strings are already there. Tool explanations are still beside the components.
- Replace `script-src 'unsafe-inline'` with a nonce-based content security policy if a later Next.js setup makes that practical.
- Add an Open Graph image. The metadata currently has a title and description only.

## What is missing

- A host, a DNS record, and a Search Console property.
- A real contact address.
- An analytics collector.
- Field Core Web Vitals.
- Keyword Planner volumes and the unfilled SERP URLs.
- Ads. None are loaded, and none should be loaded before the monetization plan’s gates.

## Dependency notes

`npm audit` on 2026-10-24 reported 5 advisories: PostCSS via Next (moderate and high, build-time CSS processing), and Vitest / tinypool (critical, test runner). They were not removed with `npm audit fix --force`, because that flag can introduce breaking upgrades. They do not run in the visitor’s browser. Recheck them before production hosting and before anyone exposes the Vitest runner.

## Baseline commands

There were no tests or builds to run before the application existed. The first baseline is the command set in the execution report, run after the initial implementation.

## Implementation sequence that followed this audit

1. Preserve research and record the blank SERP URLs.
2. Add the shared shell, the four tools, and their tests.
3. Add SEO, privacy, and measurement behavior that does not collect inputs.
4. Write the roadmap and the file-tool decision.
5. Leave deployment, ads, PDF processing, and translation unbuilt.

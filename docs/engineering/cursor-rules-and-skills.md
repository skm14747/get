# Cursor rules and skills

Inventory date: 2026-10-24. Structural checks ran in this session. Cursor's rule picker and skill list were not queried, so nothing here is marked runtime-loaded.

Activation follows the Cursor docs fetched the same day. `alwaysApply: true` is included every session. A glob rule is included when a matching file is in context. `documentation-and-decisions.mdc` has a description and no glob, so the agent includes it when the description is relevant. Skills are selected from their descriptions, or started with `/` and the skill name. `paths` was left unset so a skill is not hidden until a matching file is already open.

## Validation that ran

| Check | Result |
| --- | --- |
| Every `.mdc` file parses as frontmatter with `description` and `alwaysApply` | Passed, 10 files |
| Glob rules match at least one project file and no `node_modules` or `.next` file | Passed. Counts are in the table |
| `project-core.mdc` is the only always-on rule and is 19 lines | Passed |
| No `.cursorrules` and no root `AGENTS.md` | Passed |
| Each skill directory contains `SKILL.md`, and `name` matches the directory | Passed, 11 skills |
| Each skill has a description under 1024 characters, a verification section, and a distinct name | Passed |
| `npm test` | Passed. Vitest 3.2.7, 8 files, 34 tests |
| `npm run typecheck` | Passed. `tsc --noEmit`, exit 0 |
| `npm run lint` | Passed. `next lint` reported no warnings or errors, and printed that `next lint` is deprecated and will be removed in Next.js 16 |
| `npm run build` | Not run |
| Cursor rule or skill discovery UI | Not available in this session |

`npm test`, typecheck, and lint exercise the app, not the instruction files. They confirm the commands the skills name are runnable in this tree.

## Rules

| File | Type | Purpose | Scope or activation | When it should be used | Dependencies or references | Validation status |
| --- | --- | --- | --- | --- | --- | --- |
| `.cursor/rules/project-core.mdc` | Rule | Inspect first, keep changes small, report real checks | Always | Any repository work | `package.json`, `.github/workflows/ci.yml` | Structurally valid. 19 lines. Not runtime-loaded |
| `.cursor/rules/architecture-and-design.mdc` | Rule | Keep pure logic, routes, and client UI apart | Glob, 35 files: `app`, `components`, `lib`, `locales`, `next.config.ts` | Editing application structure | `app/word-counter/page.tsx`, `lib/word-count.ts`, `locales/en.ts` | Structurally valid. Not runtime-loaded |
| `.cursor/rules/coding-standards.mdc` | Rule | TypeScript and React habits ESLint does not state | Glob, 44 files under app, components, lib, locales, tests, and the two TS configs | Editing those sources | `eslint.config.mjs`, `tsconfig.json` | Structurally valid. Excludes `node_modules`. Not runtime-loaded |
| `.cursor/rules/testing-and-verification.mdc` | Rule | Vitest placement, jsdom directive, honest results | Glob, 42 files: lib, components, app, tests, `vitest.config.ts` | Behavior changes and test edits | `tests/components/word-counter.test.tsx` | Structurally valid. Not runtime-loaded |
| `.cursor/rules/security-and-privacy.mdc` | Rule | Input, rendering, analytics, secrets, headers | Glob, 35 files: app, components, lib, `next.config.ts`, `.env.example` | Security-sensitive edits | `lib/analytics.ts`, `next.config.ts` | Structurally valid. Not runtime-loaded |
| `.cursor/rules/seo-and-web-quality.mdc` | Rule | Canonicals, content, structured data, no thin URLs | Glob, 20 files: app routes, SEO libs, guides, tool shell | Page and metadata edits | `lib/seo.ts`, `app/sitemap.ts` | Structurally valid. Not runtime-loaded |
| `.cursor/rules/goeasytools-product.mdc` | Rule | Four-tool English scope and evidence limits | Glob, 57 files: lib, components, pages, `research` | Tool or research edits | `docs/roadmap/01-product-roadmap.md`, `research/phase-2/08-revised-mvp-recommendation.md` | Structurally valid. Not runtime-loaded |
| `.cursor/rules/documentation-and-decisions.mdc` | Rule | Update the doc that already owns the fact | Description only. No glob | Documentation or decision changes | `docs/roadmap/08-decision-log.md` | Structurally valid. Intelligent apply is not runtime-verified |
| `.cursor/rules/frontend-accessibility.mdc` | Rule | Labels, keyboard use, live results, motion | Glob, 24 files: app and component TSX, the word-counter test, `app/globals.css` | UI edits | `components/word-counter-tool.tsx` | Structurally valid. Not runtime-loaded |
| `.cursor/rules/nextjs-app-router.mdc` | Rule | Server pages, client tools, crawl files | Glob, 12 files: `app`, `next.config.ts` | Routing or Next config | `app/layout.tsx`, `locales/en.ts` | Structurally valid. Not runtime-loaded |

## Skills

| File | Type | Purpose | Scope or activation | When it should be used | Dependencies or references | Validation status |
| --- | --- | --- | --- | --- | --- | --- |
| `.cursor/skills/add-new-tool/SKILL.md` | Skill | Add one utility on the existing shell | Description, or `/add-new-tool` | A new tool or tool page | `lib/tools.ts`, `locales/en.ts` | Structurally valid. Not runtime-loaded |
| `.cursor/skills/research-tool-opportunity/SKILL.md` | Skill | Recommend build, investigate, defer, or reject | Description, or `/research-tool-opportunity` | A candidate tool or keyword | `research/08-methodology.md`, `research/phase-3-file-tools/03-prototype-decision.md` | Structurally valid. Not runtime-loaded |
| `.cursor/skills/seo-page-review/SKILL.md` | Skill | Audit indexability and claims for a page | Description, or `/seo-page-review` | SEO, sitemap, canonical, or content review | `docs/roadmap/02-technical-seo-checklist.md` | Structurally valid. Not runtime-loaded |
| `.cursor/skills/bug-investigation/SKILL.md` | Skill | Reproduce, add a regression test, fix narrowly | Description, or `/bug-investigation` | A defect | Nearby `tests/` file | Structurally valid. Not runtime-loaded |
| `.cursor/skills/code-review/SKILL.md` | Skill | Review a diff for correctness, privacy, and regressions | Description, or `/code-review` | A review before merge | The files in the diff | Structurally valid. Not runtime-loaded |
| `.cursor/skills/test-and-verify/SKILL.md` | Skill | Run targeted tests, then lint, types, and build | Description, or `/test-and-verify` | Verifying a change | `vitest.config.ts`, `eslint.config.mjs` | Structurally valid. Not runtime-loaded |
| `.cursor/skills/prepare-release/SKILL.md` | Skill | Release checklist without deploying | Description, or `/prepare-release` | Go or no-go | `docs/roadmap/07-launch-checklist.md`, `.github/workflows/ci.yml` | Structurally valid. Not runtime-loaded |
| `.cursor/skills/localization-review/SKILL.md` | Skill | Decide whether a language or country URL is ready | Description, or `/localization-review` | Translation, hreflang, or a country tool | `docs/roadmap/05-internationalization-plan.md`, `locales/en.ts` | Structurally valid. Not runtime-loaded |
| `.cursor/skills/privacy-security-audit/SKILL.md` | Skill | Scoped data-flow and header review | Description, or `/privacy-security-audit` | Privacy or security review | `docs/roadmap/04-quality-and-privacy.md` | Structurally valid. Not runtime-loaded |
| `.cursor/skills/add-analytics-event/SKILL.md` | Skill | Add an allow-listed event and its test | Description, or `/add-analytics-event` | A new measurement | `lib/analytics.ts`, `docs/roadmap/03-analytics-plan.md` | Structurally valid. Not runtime-loaded |
| `.cursor/skills/architecture-decision-record/SKILL.md` | Skill | Append a hard-to-reverse decision | Description, or `/architecture-decision-record` | An architecture or URL choice | `docs/roadmap/08-decision-log.md` | Structurally valid. Not runtime-loaded |

## Overlaps

Several rules attach together when a tool component is open: architecture, coding standards, testing, security, product, and accessibility. They are split by concern so each stays under 35 lines. Product and SEO both say not to add ads; both point at the same current state. The decision skill writes to the roadmap log, not a second file.

## Gaps

- No rule runs the checks. CI does, after a push to a Git remote. This directory is not a Git repository, so that workflow has not run here.
- Percentage, discount, and case tools have logic tests and no component test.
- `next lint` is deprecated. The flat config already exists.
- PDF work has a research decision and no skill, because a prototype was declined.

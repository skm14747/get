# Cursor customization audit

Inspection date: 2026-10-24. This record describes the repository as found, then the instruction set added in the same change. It does not claim that Cursor has loaded the files at runtime.

## Detected stack and versions

Versions below are the ranges in `package.json`. A second look, after other files appeared in the working tree, found `package-lock.json`, `node_modules`, `eslint.config.mjs`, and `.github/workflows/ci.yml`. This task did not install packages. Resolved versions were not re-read from the lockfile.

| Piece | Declared |
| --- | --- |
| App | Next.js `^15.5.4`, React `^19.1.1`, React DOM `^19.1.1` |
| Language | TypeScript `^5.9.2`, `strict: true`, path alias `@/*` |
| Styling | Tailwind CSS `^4.1.14` via `@tailwindcss/postcss`, tokens in `app/globals.css` |
| Tests | Vitest `^3.2.4`, Testing Library `^16.3.0`, jsdom `^26.1.0` |
| Lint | `eslint.config.mjs` extends `next/core-web-vitals` and `next/typescript` |
| Package manager | npm, with `package-lock.json` present on the second look. CI uses `npm ci` on Node 22 |

The app is a small English site. Tool math and text transforms live in pure modules under `lib/`. Interactive tools are client components. Routes are the Next.js App Router. There is no database, authentication, server action, queue, or file upload. Security headers and the content security policy are set in `next.config.ts`.

Canonical examples:

- Registry: `lib/tools.ts`
- Pure logic: `lib/word-count.ts`, `lib/percentage.ts`, `lib/discount.ts`, `lib/case-convert.ts`, `lib/numbers.ts`
- Route: `app/word-counter/page.tsx`
- Client tool: `components/word-counter-tool.tsx`
- Explanatory copy: `components/word-counter-guide.tsx`
- Page shell: `components/tool-page.tsx`
- Metadata: `lib/seo.ts`, `lib/site.ts`, `app/sitemap.ts`, `app/robots.ts`
- Analytics and consent: `lib/analytics.ts`, `components/consent-banner.tsx`, `app/privacy/page.tsx`
- Chrome copy: `locales/en.ts`
- Tests: `tests/word-count.test.ts`, `tests/analytics.test.ts`, `tests/components/word-counter.test.tsx`
- Plans that instructions must not duplicate: `docs/roadmap/` and `research/phase-3-file-tools/03-prototype-decision.md`

## Existing instruction and skill files

None found before this change.

- No `AGENTS.md`, including nested copies
- No `.cursor/` directory
- No legacy `.cursorrules`
- No `.agents/skills/`, `.claude/skills/`, or `.codex/skills/`

No existing rules or skills needed a merge.

## Current tooling and quality gates

| Gate | State |
| --- | --- |
| `npm run test` | Vitest, include `tests/**/*.test.ts` and `tests/**/*.test.tsx`. Default environment is `node`. Component tests opt into jsdom with a file directive. |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | `next lint` via `eslint.config.mjs` |
| `npm run build` | `next build` |
| CI | `.github/workflows/ci.yml`: `npm ci`, test, typecheck, lint, build |
| Pre-commit, dependency scan, secret scan, link check, markdown lint | Not configured |
| Git | This directory is not a Git repository |
| Browser verification | Not run by this task |

Tests present on inspection: `tests/word-count.test.ts`, `tests/percentage.test.ts`, `tests/discount.test.ts`, `tests/case-convert.test.ts`, `tests/numbers.test.ts`, `tests/analytics.test.ts`, `tests/seo.test.ts`, `tests/components/word-counter.test.tsx`.

## Contradictions and gaps

- `research/06-mvp-roadmap.md` describes a first ten tools at `/en/{tool}/`. `research/phase-2/08-revised-mvp-recommendation.md` narrows the launch to four English experiments and says not to start the ten-tool list, a PDF suite, or a second language. The code implements those four tools at unprefixed paths such as `/word-counter`. Instructions follow the code and the Phase 2 launch scope. Phase 1 stays historical research.
- Phase 1 methodology says the repository was empty and no stack was installed. The application now exists. Feasibility notes in that file are not a description of every current file.
- `priority_score_of_100` is intentionally incomplete. Trends indexes are not monthly volume. See `research/08-methodology.md` and `research/phase-2/05-scoring-audit.md`.
- Sitemap and privacy copy match the four tools plus `/privacy` and `/contact`. Advertising scripts are not loaded.
- Public env vars are documented in `.env.example`. Research API tokens there were not used by the 2026-10-24 research pass. The Next.js app does not read the research tokens.
- Only the word counter has a component test. The other tools have logic tests.
- PDF processing is explicitly not a prototype. See `research/phase-3-file-tools/03-prototype-decision.md`.
- `docs/roadmap/08-decision-log.md` already records the stack, the four-tool scope, unprefixed English URLs, analytics, ads, and deploy limits. A second decision log would conflict with it, so none was added under `docs/engineering/`.

## Instruction architecture

Official format used, from Cursor docs retrieved 2026-10-24:

- Rules: `.cursor/rules/*.mdc` with `description`, `globs`, and `alwaysApply`. Comma-separated globs. `alwaysApply: true` ignores globs and description for inclusion.
- Skills: `.cursor/skills/<name>/SKILL.md`. `name` matches the directory. `description` is how the agent chooses the skill. `paths` and `disable-model-invocation` were left unset on purpose.

`paths` would hide a skill unless a matching file was already in context. These workflows are usually requested in chat before those files are open, so descriptions are the selector. `disable-model-invocation` was omitted so Cursor may apply a skill when the request matches. Each skill can still be started with `/` and its name.

No root `AGENTS.md` was added. An always-applied `project-core` rule is the short universal layer. A second always-on document would duplicate it.

No legacy `.cursorrules` file was added.

## Rules and skills to add

Rules:

| File | Activation |
| --- | --- |
| `project-core.mdc` | Always |
| `architecture-and-design.mdc` | App, components, `lib`, `locales`, `next.config.ts` |
| `coding-standards.mdc` | App, components, `lib`, `locales`, tests, Next and Vitest config. Not `node_modules` |
| `testing-and-verification.mdc` | `lib`, components, app, tests, Vitest config |
| `security-and-privacy.mdc` | App source, Next config, `.env.example` |
| `seo-and-web-quality.mdc` | Routes, metadata, guides, sitemap and robots |
| `goeasytools-product.mdc` | Tool source and `research/` |
| `documentation-and-decisions.mdc` | Intelligent, from its description. No glob, so it is not injected into every source file |
| `frontend-accessibility.mdc` | TSX and `app/globals.css` |
| `nextjs-app-router.mdc` | `app/` and `next.config.ts` |

Skills, each under `.cursor/skills/<name>/SKILL.md`: add-new-tool, research-tool-opportunity, seo-page-review, bug-investigation, code-review, test-and-verify, prepare-release, localization-review, privacy-security-audit, add-analytics-event, architecture-decision-record.

## Omitted on purpose

| Item | Reason |
| --- | --- |
| `pdf-tool-prototype` | `research/phase-3-file-tools/03-prototype-decision.md` says not to build a prototype. A target-size compressor stays rejected. |
| Separate TypeScript, React, or Tailwind rules | Covered by coding standards, architecture, accessibility, and the Next.js rule. Extra files would attach to the same edits. |
| Python, database, or API rules | The project has none of those. |
| `AGENTS.md`, `.cursorrules` | Would duplicate `project-core` or use a legacy format. |
| ESLint flat config, CI, lockfile, roadmap, README | Already present by the second inspection. Left unchanged. |
| EditorConfig, pre-commit hooks, extra scanners, PR template, security policy | Not added. CI already runs the test, type, lint, and build commands. A hook that repeats that on every commit needs a separate decision. |
| Second engineering decision log | Not kept. Accepted decisions stay in `docs/roadmap/08-decision-log.md`. The ADR skill appends a row there. |

## Uncertainty left unresolved

- Installed Cursor build was not queried. Formats follow the docs pages fetched on 2026-10-24: `https://cursor.com/docs/rules` and `https://cursor.com/docs/skills`. If a local build rejects a frontmatter field, treat the docs as the source and record the difference here.
- Whether Cursor includes both `description` and `globs` the way this audit assumes is not runtime-verified. File-scoped rules set both so the picker has a label. Inclusion for those rules is the glob.
- Command results for this task are in `docs/engineering/cursor-rules-and-skills.md`. They are not a production launch check.
- This directory is not a Git repository, so history was not inspected.
- The working tree gained roadmap docs, locales, ESLint, CI, and a lockfile during inspection. Rules were updated to match that tree. They were not assumed from the first listing alone.

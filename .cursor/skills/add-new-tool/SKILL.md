---
name: add-new-tool
description: Adds a GoEasyTools utility with registry metadata, pure logic, an App Router page, a guide, tests, and privacy-safe analytics. Use when creating a new tool, calculator, converter, or tool page.
---

# Add a new tool

## When to use

Use this when the task is to add a tool to the site. If the tool is not already approved in `research/phase-2/08-revised-mvp-recommendation.md`, say it is a prototype and do not present it as a launch decision.

## Inputs

- Tool name, user job, and whether the scope is approved or a prototype
- Inputs, outputs, and the formula or transform
- Edge cases and what the user should see on failure

## Steps

1. Read `lib/tools.ts`, `app/word-counter/page.tsx`, `components/word-counter-tool.tsx`, `components/word-counter-guide.tsx`, and `components/tool-page.tsx`.
2. Reuse an existing route or `lib/` function if it already does the job. Do not add a second URL for a mode of an existing tool.
3. Add a pure module under `lib/`. Return a result object for expected failures. Do not import React.
4. Add one `ToolDefinition` in `lib/tools.ts` with a unique unprefixed path, a real meta description, evidence text that does not invent volume, and `related` ids that exist.
5. Add `app/<path>/page.tsx` as a server component. It exports `toolMetadata` and renders `ToolPage`, the client tool, and a guide.
6. Build the client tool with labeled controls, a polite live result, and `track` calls that pass only allowed keys from `lib/analytics.ts`. Site chrome goes through `locales/en.ts`. Tool labels stay in the component until a translation project.
7. Write the counting rules, formula, examples, and limitations in the guide so they are in the server HTML.
8. Add `tests/<module>.test.ts` for success, edges, and failures. Add `tests/components/<tool>.test.tsx` with `/** @vitest-environment jsdom */` when the interaction matters.
9. Confirm `app/sitemap.ts` picks up the new path through `tools`. Do not duplicate the URL list.

## Verification

Run `npm run test -- tests/<module>.test.ts`, then `npm run typecheck`. Run `npm run build` when a route was added. If dependencies are not installed, report the checks as not run.

## Do not

- Add a package, a server upload, a locale prefix, or an ad unit without an explicit approval.
- Ship the tool if its guide hides a known limitation of the formula.

## Deliverable

The route, the registry row, tests, and a short note of behavior that is still untested or out of scope.

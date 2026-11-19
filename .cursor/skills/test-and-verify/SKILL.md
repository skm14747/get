---
name: test-and-verify
description: Runs and extends GoEasyTools tests, typecheck, lint, and build for a change. Use when verifying a feature, asking what to run, or checking that a change is actually tested.
---

# Test and verify

## Inputs

- The behavior or files that changed

## Steps

1. List the user-visible behavior and the `lib/` functions involved.
2. Read `vitest.config.ts` and one nearby test. Default environment is `node`. Component tests need `/** @vitest-environment jsdom */` as the first line.
3. Run the targeted file: `npm run test -- tests/<file>.test.ts`
4. Add tests for a new branch, a failure result, and any privacy constraint on an analytics change. Do not lower an existing assertion.
5. Run `npm run test` for the full suite when shared code changed or the targeted run passed.
6. Run `npm run typecheck`.
7. Run `npm run lint`. The config is `eslint.config.mjs`.
8. Run `npm run build` for route, metadata, config, or dependency changes.
9. Read the diff for unrelated edits and generated files.

## Verification

A successful build is not a behavioral test. Report a table of command, exit status, and a one-line result. Use "not run" with the reason for anything skipped.

## Deliverable

What is verified, what failed, and which critical path still has no test.

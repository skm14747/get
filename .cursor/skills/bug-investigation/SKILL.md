---
name: bug-investigation
description: Investigates a GoEasyTools defect, adds a regression test, and applies the smallest fix. Use when debugging wrong results, UI failures, broken routes, or reported errors.
---

# Bug investigation

## Inputs

- Observed behavior and expected behavior
- Tool id, input sample, and browser or runtime if known

## Steps

1. Reproduce the failure with the smallest input. If you cannot reproduce it, say what you tried and stop before changing code.
2. Write the exact failing case and the expected result.
3. Read the `lib/` function and the component that calls it. Check `tests/` for a gap. Git history is available only if this directory is a repository.
4. Name the plausible causes, then drop the ones the code contradicts.
5. Add a failing test that expresses the expected behavior. Logic belongs in `tests/<module>.test.ts`. UI belongs in a jsdom component test.
6. Fix the smallest span of code that makes that test meaningful. Do not catch and ignore the error. Do not special-case one sample when the rule is general.
7. Run the new test, then the rest of that file's suite. Run `npm run typecheck` if types changed.
8. Check the sibling operations in the same module for the same mistake.

## Verification

Report root cause, files changed, commands run, and what remains uncertain. A test you did not run is "not run", not "passed".

## Do not

- Delete or loosen the failing assertion to go green.
- Expand the change into a redesign.

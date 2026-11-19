---
name: code-review
description: Reviews GoEasyTools changes for correctness, privacy, architecture, tests, accessibility, and SEO. Use when the user asks for a code review, a PR review, or a review of the current diff.
---

# Code review

## Inputs

- A diff, a set of files, or the working tree. If Git is unavailable, review the files the user names and say history was not available.

## Steps

1. Read the diff before commenting. Do not review files you have not opened.
2. Check correctness against the `lib/` rules and existing tests.
3. Look for regressions in shared helpers: `lib/numbers.ts`, `lib/analytics.ts`, `lib/seo.ts`, `lib/tools.ts`, and `components/tool-page.tsx`.
4. Check privacy: user text, prices, and documents must not appear in URLs, logs, or analytics payloads.
5. Check the server/client split and that no new infrastructure was added without a requirement.
6. Check error results, empty input, divide-by-zero, and non-finite numbers where the change touches them.
7. Check tests assert behavior rather than implementation trivia. Note a missing test for a new branch.
8. Check accessibility names, keyboard use, and live regions on UI changes.
9. Check metadata, canonicals, sitemap coverage, and unsupported claims on page changes.
10. Call out new dependencies, env vars, and CSP changes.

## Verification

Confirm a finding by citing the file. Separate a confirmed defect from a risk you could not execute.

## Deliverable

Use only these severities, and omit empty sections:

- **Blocker:** incorrect result, data leak, or broken public URL
- **High:** untested behavior change, security-header regression, or false user-facing claim
- **Medium:** maintainability or accessibility gap with a concrete failure mode
- **Note:** question or residual risk

Do not invent defects to fill the list. End with whether you ran tests or only read the code.

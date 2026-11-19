---
name: privacy-security-audit
description: Reviews a GoEasyTools change for data flows, untrusted input, analytics, headers, and dependencies. Use for a privacy review, security review, or threat pass over a feature.
---

# Privacy and security audit

## Scope

This is a scoped review of the files in the task. It is not a claim that the whole application is secure.

## Steps

1. Map the path from the control to `lib/` and to any network call. Current tool code is browser-local except `track` in `lib/analytics.ts`.
2. List untrusted inputs: text areas, number fields, clipboard text, query strings, and env values.
3. Check validation, React rendering, and error handling. Confirm user strings are not written with `dangerouslySetInnerHTML`.
4. Read `sanitizeProperties`, the consent banner, `app/privacy/page.tsx`, and `docs/roadmap/04-quality-and-privacy.md`. The privacy page must match the network behavior.
5. File processing is out of scope for the current tools. If a change adds it, stop and treat that as a new risk requiring approval.
6. Authentication is not implemented. Do not assume an access-control model that is not in the code. If one is added, review both the check and the failure path.
7. Read `next.config.ts` headers and any new dependency or env var.
8. Run `npm run test -- tests/analytics.test.ts` and any new tests. There is no dependency scanner configured. Do not claim one ran.
9. Mark each issue as verified from code or as a hypothesis.
10. Order fixes by what an untrusted input can actually do in this app.
11. After a fix, re-run the tests that cover it.
12. State residual risk, including hosting logs the repo cannot see.

## Verification

Re-run the tests that cover a changed path. Say which scanners were not available. Do not call the review complete.

## Approval

Do not exploit a finding beyond a local proof, and do not add a scanner package unless the task asks.

## Deliverable

Verified findings, hypotheses, fixes made, tests run, and residual risk.

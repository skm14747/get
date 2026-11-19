---
name: prepare-release
description: Prepares a GoEasyTools release checklist without deploying. Use when cutting a release, checking release readiness, or asking for a go or no-go decision.
---

# Prepare a release

## When to use

Use this to decide whether a build is ready to ship. It does not deploy, push, or change DNS.

## Steps

1. Inspect the working tree. If Git is present, read status and the full diff from the release base. If Git is absent, say so and review only the files you can see.
2. Separate the intended release from unrelated edits and generated output (`.next`, `node_modules`, coverage).
3. Run `npm run test`, `npm run typecheck`, `npm run lint`, and `npm run build`. CI in `.github/workflows/ci.yml` runs the same checks after `npm ci`. Record any command that fails or cannot start.
4. Read dependency and config diffs. A new package needs a reason and a version. Do not add one during the checklist.
5. Compare `process.env` reads with `.env.example`. Confirm no secret is committed.
6. This app has no database migration. If one appears, stop and document the rollback before recommending a release.
7. Check privacy copy, analytics allow-list, canonicals, sitemap, and accessibility changes against the current pages and `docs/roadmap/07-launch-checklist.md`.
8. Confirm `next.config.ts` still sets the content security policy and the other security headers.
9. Update the launch checklist only when an item's state actually changed. Do not invent a changelog file.
10. Give a go or no-go. No-go if tests failed, a privacy claim is false, or a required check did not run.

## Verification

The checklist cites the exit status of each command. A previous passing build does not count for this release.

## Approval

Do not deploy, push, force-push, change DNS, or edit a production service. Those need a separate explicit request.

## Deliverable

Checklist with the commands that ran, the release contents, residual risks, and the go or no-go.

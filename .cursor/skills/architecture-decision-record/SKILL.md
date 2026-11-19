---
name: architecture-decision-record
description: Records a hard-to-reverse GoEasyTools engineering decision in the decision log. Use when choosing architecture, a public URL scheme, a new platform, or another choice that later work should not reopen casually.
---

# Architecture decision record

## When to use

Use this for a choice that is expensive to undo. Do not use it for a local refactor, a naming tweak, or a research hypothesis. Research stays in `research/`.

## Steps

1. State the problem and the constraints you can point to in the repo.
2. Describe the current behavior and the files that implement it.
3. List realistic alternatives, including keeping the current design.
4. Compare trade-offs: complexity, privacy, SEO, testability, and maintenance.
5. Record the choice and why it won.
6. Record consequences and risks.
7. Write what evidence would justify revisiting it.
8. Append one row to the table in `docs/roadmap/08-decision-log.md`. Use the date, the decision, why, and what would change it. Do not open a second decision log.

## Verification

The new row does not contradict an existing row. A rule that must enforce the decision gets a short pointer, not a second copy of the rationale.

## Deliverable

The new row in `docs/roadmap/08-decision-log.md` and the list of code or docs updated so they do not contradict it.

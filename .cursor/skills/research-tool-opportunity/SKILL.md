---
name: research-tool-opportunity
description: Evaluates whether a candidate GoEasyTools utility deserves implementation using existing research rules. Use when deciding to build, investigate, defer, or reject a tool, keyword, or category.
---

# Research a tool opportunity

## When to use

Use this before implementing a tool that is not one of the four live English experiments. Do not use a Trends index as proof of commercial demand.

## Inputs

- Candidate tool and the user problem
- Target country and language
- Sources you can actually access in this session

## Steps

1. Read `research/README.md`, `research/phase-2/README.md`, `research/08-methodology.md`, `research/phase-2/05-scoring-audit.md`, and `research/phase-2/08-revised-mvp-recommendation.md`. For a file tool, also read `research/phase-3-file-tools/03-prototype-decision.md`. Note the collection date and any later note.
2. Define the primary job and the query group. Separate navigational brand queries from people who need a tool.
3. Record only metrics you retrieved. For each figure store country, language, match type, date, source, and whether it is a point value or a range.
4. Keep Trends indexes labeled as indexes. Do not convert them to searches. An average of 0 is not zero demand. Compare a term only with the anchor on the same chart.
5. If a results page cannot be read, write "not collected". Do not fill a top 10 from memory. Do not backfill empty historical result URLs.
6. Note Google-owned widgets and strong incumbents when a page was actually read.
7. Judge differentiation, feasibility, and maintenance from the codebase. Client-side text and arithmetic match the current app. File upload, tax presets, and PDF do not.
8. Monetization stays unknown unless an ad-account report is in the repo. Do not invent RPM or turn CPC into revenue.
9. Apply the scoring model without rescaling. The 100-point total stays blank when demand or monetization is unscored. Compare subtotals only when the included components match.
10. Recommend one of Build, Investigate, Defer, or Reject. List the missing evidence that would change it.

## Verification

Every number in the write-up traces to a file path or to a source fetched in this session. Missing data is written as unknown.

## Approval

Do not call a paid keyword or SEO API, and do not spend money, unless the task explicitly approves that call. If the API is unavailable, label the result "preliminary" and stop.

## Deliverable

A recommendation with sources, unknowns, and the evidence that would reopen it. Do not edit historical research files unless the task says to record the new pass.

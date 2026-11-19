# Analytics plan

Written 2026-10-24. No analytics account, Search Console property, or ad account is connected. This document is the measurement specification. It is not a dashboard of production numbers.

## Systems

| System | Role | State |
| --- | --- | --- |
| Google Search Console | Impressions, clicks, queries, coverage | Not connected. Setup steps are in `02-technical-seo-checklist.md` |
| First-party event endpoint | Product events, only after consent | Not configured. `NEXT_PUBLIC_ANALYTICS_ENDPOINT` empty means `track()` returns before any network call |
| Hosting metrics | Requests, status codes, bandwidth | No host selected |
| Ad network | Revenue and page RPM | No network, no ad script |

Do not add a third-party analytics script until the endpoint, the consent record, and the payload rules below are reviewed against that vendor.

## Events

Names use snake_case. The implementation is `lib/analytics.ts`.

| Event | Trigger | Allowed properties | Never send | Consent | Dedupe |
| --- | --- | --- | --- | --- | --- |
| `tool_view` | Tool component mounts | `tool_id`, `locale` | Input, URL query | Required, and an endpoint must be set | Once per tool id per page load |
| `tool_input_started` | First non-empty input | `tool_id` | The characters or numbers entered | Same | Once until Clear |
| `tool_completed` | A valid result has been on screen, after a short pause | `tool_id`, `operation` | Result values, prices, text | Same | Once per mount until Clear. Changing the numbers again does not send another completion |
| `tool_error` | A defined failure such as divide-by-zero, after a short pause | `tool_id`, `error_code` | The rejected text | Same | Once per operation and error code until Clear |
| `copy_result` | Copy succeeds | `tool_id`, `operation` for the case converter | Clipboard contents | Same | Each successful copy. The payload still has no text |
| `clear_input` | Clear is pressed | `tool_id` | Previous text | Same | Each press |
| `related_tool_clicked` | Related tool link | `tool_id`, `destination_tool_id` | — | Same | Each click |

`sanitizeProperties()` keeps only `tool_id`, `operation`, `error_code`, `destination_tool_id`, and `locale`. Strings must match `^[a-z0-9_-]+$` and be at most 64 characters. Tests in `tests/analytics.test.ts` cover rejected text, prices, and queries.

Consent is stored only as `granted` or `denied` in `localStorage` under `goeasytools.analytics-consent`. The banner does not block the tool. No choice means no event is eligible.

An endpoint is accepted only for `https`, or for `http://localhost`. Credentials, query strings, and hashes in the endpoint URL are rejected so a collector address cannot smuggle user content.

## Completion boundary

A completion is “the visitor reached a usable result,” not “a key was pressed.” The word counter and case converter send one completion after the first non-empty text has settled for about 700 milliseconds. The calculators send one completion after a valid result, or one error after a defined failure. Clear resets the gate.

## Reporting specification

When the accounts exist, review these together. Do not fill this table with estimates.

| Measure | Source | Current value |
| --- | --- | --- |
| Organic impressions, clicks, queries | Search Console | Unknown |
| Index coverage | Search Console | Unknown |
| Landing page | Search Console page report | Unknown |
| Tool completion and errors | Event endpoint | Unknown. No endpoint |
| Returning visitors | Not defined until a collector exists | Unknown |
| LCP, INP, CLS | Field data, 75th percentile | Unknown |
| Ad revenue and page RPM | Ad network | Unknown |
| Hosting and operating cost | Invoices | Unknown |

Laboratory bundle sizes from the 2026-10-24 production build are in the execution report. They are not field Core Web Vitals.

## Sample rows for a future dashboard test

`samples/measurement-sample.csv` contains invented rows so a chart can be built without a production extract. Every row is marked `synthetic`. Do not cite them as traffic, revenue, or rankings.

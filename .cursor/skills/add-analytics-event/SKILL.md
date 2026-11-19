---
name: add-analytics-event
description: Adds a privacy-safe GoEasyTools analytics event with an allow-listed payload and tests. Use when instrumenting a user action, adding an event, or changing analytics properties.
---

# Add an analytics event

## When to use

Use this only when an existing event cannot answer the product question. The current names are in `ANALYTICS_EVENTS` in `lib/analytics.ts`.

## Steps

1. Write the question, such as "which operation completed", not "what did the user type".
2. If `tool_view`, `tool_input_started`, `tool_completed`, `tool_error`, `copy_result`, `clear_input`, or `related_tool_clicked` already answers it, use that event. The measurement plan is `docs/roadmap/03-analytics-plan.md`.
3. Choose a stable snake_case name. Properties may use only `tool_id`, `operation`, `error_code`, `destination_tool_id`, and `locale`. Adding a key means editing `ALLOWED_KEYS` and the blocked-key pattern together.
4. Do not send raw text, documents, prices, amounts, queries, secrets, or result strings. The blocked-key test must keep rejecting those names.
5. Keep the consent gate and the empty-endpoint gate in `track`. Do not call `fetch` or `sendBeacon` from a component.
6. Add the name to `ANALYTICS_EVENTS` so the payload type stays closed.
7. Fire the event at the interaction boundary once. `tool_view` already dedupes per tool id in a page lifetime. Match that care for any new high-frequency event.
8. Extend `tests/analytics.test.ts` for the allowed shape and for dropped sensitive fields.
9. Update `app/privacy/page.tsx` if a user could observe a new category of measurement.
10. In development, confirm no request leaves the browser until consent is granted and `NEXT_PUBLIC_ANALYTICS_ENDPOINT` is set. If you cannot observe the network, say so.

## Verification

`npm run test -- tests/analytics.test.ts` passes, and the privacy page still matches the payload. A code reading without that test is not verification.

## Approval

Do not add an analytics vendor script or widen `connect-src` unless the task explicitly approves that host and the privacy page names it.

## Deliverable

The event name, the property list, the test result, and any privacy-copy change.

# Monetization plan

Written 2026-10-24. The business model under consideration is display advertising. Affiliate offers, subscriptions, paywalls, paid APIs, and sponsored listings are not part of this plan and are not implemented.

No ad script, ad slot, or network account is present. Approval and revenue are unknown.

## Gates before an application

- The four tools, privacy page, and contact page are deployed on the final host.
- `NEXT_PUBLIC_CONTACT_EMAIL` is a monitored address. The contact page currently says the address is not configured.
- Search Console shows the property is indexed, or the application’s current written policy no longer requires that. Recheck the network’s eligibility page on the day of application. This repository does not copy a policy that may have changed.
- Consent behavior matches the network’s requirements for the countries being measured. The current banner covers optional product measurement only. It is not an ad-consent implementation.
- Ads, when eventually added, sit outside the primary controls. They do not shift the tool when they load, and they are not placed against the copy and clear buttons.
- A before-and-after check records LCP, INP, CLS, and whether the main task still completes.

Do not insert a placeholder ad iframe. An empty box that jumps is a layout-shift risk without any revenue information.

## Sensitivity model

Phase 1 scenarios in `research/05-revenue-scenarios.md` stay historical assumptions. Phase 2 extended them in `research/phase-2/07-revenue-sensitivity.md`. This plan does not replace those numbers with new ones.

Formulas, using inputs that must be labeled:

- `pageviews = gross revenue × 1000 / page RPM`
- `sessions = pageviews / pages per session`
- `contribution = gross ad revenue − operating costs`

| Input | Label in the current repository |
| --- | --- |
| Page RPM | Unknown. Not inferred from CPC or from national ad spend |
| Pages per session | Unknown. Phase 1 used assumptions of 1.3, 1.8, and 2.2 in named scenarios |
| Sessions and pageviews | Unknown. No analytics |
| Gross revenue | Unknown |
| Operating cost | Unknown. No host invoice |

Worked arithmetic that is already checked in Phase 2, and is still hypothetical: at an assumed $5 page RPM, $1,000 of gross revenue needs 200,000 pageviews, because `1000 × 1000 / 5 = 200,000`. At an assumed 1.8 pages per session, that is `200,000 / 1.8 = 111,111` sessions, rounded to the nearest session. Those RPM and pages-per-session figures are assumptions, not measurements.

Contribution is gross revenue minus cost. A positive gross figure can still be a negative contribution. The Phase 1 conservative scenario was that kind of case. It remains a scenario.

No country in the research has a measured publisher RPM. Do not describe the US, UK, France, Spain, or any Arabic-speaking country as more profitable until a report from the ad account says so.

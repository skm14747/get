# Revenue sensitivity

Phase 1’s conservative, base, and optimistic scenarios are unchanged. They live in `research/05-revenue-scenarios.md`. They are assumptions. This file does not replace them with a more official-looking forecast.

No publisher RPM was collected for the United States, the United Kingdom, Canada, Australia, India, France, Belgium, Switzerland, Spain, Mexico, Colombia, Argentina, Chile, Saudi Arabia, the United Arab Emirates, Egypt, or Kuwait. Country ad spend and keyword CPC are not RPM. None of those CPCs were collected either.

## Labels

| Input | Status |
| --- | --- |
| Phase 1 session counts, pages per session, RPM, and monthly cost | Assumption, historical |
| IAB/PwC 2025 US display revenue of $81.6 billion | Measured advertiser-side market total, not a yield |
| Google Trends indexes | Measured relative interest, not revenue |
| Page RPM in the tables below | Assumption, for sensitivity only |
| Pages per session below | Assumption |
| Operating costs below | Assumption, not a hosting quote |
| Actual GoEasyTools RPM, fill rate, and sessions | Unknown |

## Formula

```
pageviews = monthly gross revenue × 1,000 / page RPM
sessions  = pageviews / pages per session
contribution = gross revenue − monthly operating cost
```

## Pageviews and sessions for $1,000 gross

Pages per session are labeled assumptions. A single-purpose tool often finishes in one view. 2.5 pages per session is an optimistic tool session, not a measured average.

| Assumed page RPM | Pageviews | Sessions at 1.2 pages | Sessions at 1.8 pages | Sessions at 2.5 pages |
| --- | ---: | ---: | ---: | ---: |
| $0.50 | 2,000,000 | 1,666,667 | 1,111,111 | 800,000 |
| $1 | 1,000,000 | 833,333 | 555,556 | 400,000 |
| $2 | 500,000 | 416,667 | 277,778 | 200,000 |
| $5 | 200,000 | 166,667 | 111,111 | 80,000 |
| $10 | 100,000 | 83,333 | 55,556 | 40,000 |
| $20 | 50,000 | 41,667 | 27,778 | 20,000 |

Check: 200,000 / 1,000 × $5 = $1,000. 200,000 / 1.8 = 111,111 sessions.

For $100, divide the pageview column by 10. For $5,000, multiply it by 5. At $5 RPM, $5,000 gross needs 1,000,000 pageviews.

## Cost, separate from traffic

Hold gross revenue at the three Phase 1 assumption levels and vary cost. Founder time is not in the cost.

| Gross revenue assumption | Cost $0 | Cost $25 | Cost $100 | Cost $500 |
| --- | ---: | ---: | ---: | ---: |
| Phase 1 conservative, $2.60 | $2.60 | −$22.40 | −$97.40 | −$497.40 |
| Phase 1 base, $180 | $180 | $155 | $80 | −$320 |
| Phase 1 optimistic, $3,520 | $3,520 | $3,495 | $3,420 | $3,020 |

The base case’s $140 contribution in Phase 1 used a $40 cost. At $100 cost the same assumed revenue contributes $80. At $500 cost it is negative. Traffic and RPM do not have to move for the contribution to change.

## What would not be valid

Do not multiply a Trends index by a guessed volume, then by an RPM. Do not take the US IAB display total and divide it by an impression guess to price this site. Do not treat Canada’s higher merge-PDF index as evidence that Canadian visits pay more than US visits.

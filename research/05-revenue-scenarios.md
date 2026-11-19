# Revenue scenarios

**Status:** hypothetical. No AdSense account, RPM report, or competitor analytics export was available. Google Ads CPC is not used as RPM. The IAB figure below is advertiser revenue in the United States, not a publisher yield.

## Why the money metrics differ

- **Google Ads CPC** is what an advertiser pays for a click on an ad.
- **Advertiser competition** is how many buyers want that impression or click. It can raise the auction price. It does not tell you the publisher’s yield.
- **Page RPM** is publisher revenue per 1,000 pageviews, after the network’s share and after unfilled impressions, viewability, and invalid-traffic deductions.
- **Session RPM** is revenue per 1,000 sessions. It moves with pages per session.
- **Gross ad revenue** is network receipts before hosting, tax, and the founder’s time.
- **Operating contribution** here means gross ad revenue minus the monthly operating costs listed in the scenario. It is not profit after tax or compensation.

A high-CPC query can still produce a low page RPM if the visit is a single mobile pageview, the ad is below the fold, or the network fills it cheaply. A tools page often ends when the task ends, so pages per session should be assumed to be low until analytics exist.

## Formula

```
monthly pageviews = monthly sessions × pageviews per session
gross ad revenue  = monthly pageviews / 1,000 × page RPM
operating contribution = gross ad revenue − monthly operating costs
```

Pageviews required for a revenue target:

```
pageviews = target revenue × 1,000 / page RPM
sessions  = pageviews / pageviews per session
```

## Pageviews required

These RPM values are sensitivity inputs. They are not measured yields and they are not industry averages.

| Hypothetical page RPM (USD) | Pageviews for $100 | Pageviews for $1,000 | Pageviews for $5,000 |
| --- | ---: | ---: | ---: |
| 0.50 | 200,000 | 2,000,000 | 10,000,000 |
| 1 | 100,000 | 1,000,000 | 5,000,000 |
| 2 | 50,000 | 500,000 | 2,500,000 |
| 5 | 20,000 | 200,000 | 1,000,000 |
| 10 | 10,000 | 100,000 | 500,000 |
| 20 | 5,000 | 50,000 | 250,000 |

At 1.5 pageviews per session, the $1,000 row becomes about 1,333,000 sessions at $0.50 RPM and about 33,300 sessions at $20 RPM. Both ends are assumptions.

## Three planning scenarios

Costs are planning allowances for a client-side site on a small host, a domain renewal spread monthly, error monitoring, and email. They are not vendor quotes. A PDF server or a currency feed would raise them. Founder time is excluded.

| | Conservative | Base | Optimistic |
| --- | --- | --- | --- |
| What it represents | Early indexed site, weak RPM | A site that has found a few queries | A large utility site, still not a top-10 assumption |
| Monthly organic sessions | 2,000 | 25,000 | 200,000 |
| Pageviews per session | 1.3 | 1.8 | 2.2 |
| Monthly pageviews | 2,600 | 45,000 | 440,000 |
| Page RPM (USD) | 1 | 4 | 8 |
| Gross monthly ad revenue | $2.60 | $180 | $3,520 |
| Gross annualized | $31 | $2,160 | $42,240 |
| Monthly operating cost | $25 | $40 | $100 |
| Operating contribution | −$22 | $140 | $3,420 |

Worked base case: 25,000 × 1.8 = 45,000 pageviews. 45,000 / 1,000 × $4 = $180. $180 − $40 = $140.

None of these sessions are a forecast. The base case does not reach Raptive’s 25,000 **pageview** minimum by itself as a quality bar; 45,000 pageviews would clear that count and would still need the published geography mix, a domain at least six months old, and long-form content. Ezoic’s published new-site rule of 250,000 monthly active users is above the optimistic session count. Mediavine Official’s $5,000 annual ad-revenue bar is above the base case and below the optimistic annualized figure, which remains hypothetical.

## What would have to be true

- **$100 in a month** at a $2 RPM needs 50,000 pageviews. At 1.5 pageviews per session, about 33,000 sessions. Believable only after several tools have real rankings. Not evidenced now.
- **$1,000 in a month** at a $5 RPM needs 200,000 pageviews. That is a mature utility site, not an MVP month.
- **$5,000 in a month** at an $8 RPM needs 625,000 pageviews. At a $2 RPM it needs 2.5 million. Planning around $5,000 before volume data exists is not supported.

RPM is unlikely to be the same for a JSON formatter and a UK VAT calculator. This model uses one RPM per scenario because no category yield was available. When a real account exists, replace the single RPM with country and page-type yields. Do not backfill the difference from keyword CPC.

## Sourced market context, and what it is not

IAB/PwC reported US internet ad revenue of $294.6 billion in 2025 and US display revenue of $81.6 billion. Source: https://www.iab.com/news/digital-ad-revenue-climbs-to-nearly-300b-as-iab-celebrates-30-year-anniversary/ (16 April 2026). This shows a large US advertiser pool. It cannot be divided into an RPM for GoEasyTools.

A third-party blog that divides ad revenue by estimated impressions was found and **not used**. Its CPM ranges are derived, and they are not publisher RPMs for utility pages.

## AdSense and alternatives

Eligibility and policy, retrieved 2026-10-24:

- AdSense requires the applicant to be 18, to control the HTML, and to have original content that complies with program policies. https://support.google.com/adsense/answer/9724
- Google’s publisher policies and restrictions are separate. Restricted content can simply receive little or no demand. https://support.google.com/adsense/answer/10008391
- Rejection reasons include insufficient text, under-construction pages, and auto-generated pages. https://support.google.com/adsense/answer/81904
- Google Search spam policies, which also matter for an AdSense site, prohibit doorway pages and scaled content abuse, including mass translation that adds little value. https://developers.google.com/search/docs/essentials/spam-policies

Alternatives checked:

- Ezoic new sites: generally 250,000 monthly active users, with a grandfathering rule for publishers already on Ezoic before 19 February 2026. https://support.ezoic.com/kb/article/getting-started-ezoics-requirements
- Raptive: 25,000 monthly pageviews, geography mix, six-month domain, analytics, and original content. https://help.raptive.com/hc/en-us/articles/360032840891-Who-is-eligible-for-Raptive
- Mediavine Journey: more than 1,000 sessions. Mediavine Official: $5,000 or more in annual ad revenue. https://help.mediavine.com/what-does-it-take-to-get-approved-by-mediavine

The realistic first network is AdSense or a similar open network, after the pages have real text. Premium networks are a later option if the traffic and geography actually appear.

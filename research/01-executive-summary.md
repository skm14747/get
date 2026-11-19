# Executive summary

**Date:** 2026-10-24  
**Subject:** GoEasyTools.com, a proposed new display-ad tools site  
**Scope:** Research only. No product was built.

## Overall market opportunity

People ask Google for online PDF tools, calculators, time converters, and developer utilities in English, French, Spanish, and Arabic. That statement is a discovery finding, not a traffic forecast. On 2026-10-24 this environment collected 128 seed queries and 1,229 autocomplete rows from Google’s public suggestion endpoint. It did **not** measure monthly search volume, keyword difficulty, cost per click, or publisher RPM.

A new domain with no authority should not start as a broad multilingual directory. The expensive, brand-associated jobs (PDF compression to a target size, PDF-to-Word, currency, ZIP-level sales tax) are the wrong place to spend the first build. The rational first release is a small set of accurate, client-side tools in English, instrumented so Search Console can replace this gap.

## What the evidence supports

**Query existence is strongest for PDF tools, and ranking evidence is weakest there.** Suggestions for compress, merge, split, JPG-to-PDF, and PDF-to-Word repeatedly include “iLovePDF” or “Adobe” in the US, France, French-speaking Canada, Spain, Mexico, Saudi Arabia, and Kuwait. US suggestions also include target sizes: “pdf compressor to 100kb”, “to 200kb”, and “to 1mb”. French and Spanish suggestions include “sans inscription” and “sin registro”. Those are intent clues. They are not volumes.

**Tax and GST tools are country products.** The same language does not make the same tool. UK suggestions say “vat calculator uk”. Australian suggestions name the ATO and MoneySmart. Canadian suggestions name Ontario, Quebec, BC, Alberta, Manitoba, and Newfoundland. Indian suggestions say “cgst sgst”. Belgian suggestions include “21” and “6”. French suggestions include “20”, “10”, and “5.5”. Argentine, Colombian, Chilean, and Mexican suggestions name different authorities or rates. Saudi suggestions include “15” and also mention the UAE and Egypt.

**Arabic VAT suggestions did not separate by country.** The same suggestion list came back for Saudi Arabia, the UAE, and Egypt. That is a data-quality limit of this autocomplete pull. It must not be read as three measured markets.

**Two seeds returned no suggestions:** Spanish “convertidor timestamp unix” (Spain) and Arabic “محول المنطقة الزمنية” (UAE). Empty suggestions are not zero demand. The wording may be wrong.

**French-speaking Africa was not validated.** No query in this pass produced a measured or even a distinct African-country suggestion set. It is excluded from the launch recommendation.

## Category judgment

| Category | Evidence in hand | Launch role |
| --- | --- | --- |
| PDF tools | Richest autocomplete clusters and the clearest incumbent-brand association. Target-size compression is a product promise upstream pdf-lib cannot keep. | Do not lead. Revisit page operations only after Search Console data. Reject target-size compression, PDF-to-Word, Word-to-PDF, comparison, and any password removal. |
| Calculators | Percentage and unit tools are cheap and stable. Statutory tax tools match real country wording, and several rates were verified. ZIP and GST-slab tools need external data this pass did not collect. | Build generic math first. Add sourced UK, Australia, France, Belgium, Spain, and Saudi presets only as a second wave. |
| Time and date | Suggestions exist for time-zone conversion and meeting planning. timeanddate.com already converts past, present, and future time with DST. Accuracy requires the IANA timezone database, current release 2026e as of 2026-09-29. | Ship a timestamp converter now. Defer world clock and meeting planner. |
| Text tools | Suggestions exist for word counting. No reliable Google result set was collected, so competition is unknown. Implementation risk is low. | Core of the first release. |
| Developer tools | JSON suggestions mix web tools with VS Code, Notepad++, and browser extensions, so web-tool intent is mixed. Tools are cheap and must stay local. | Include JSON, Base64, and URL encoding in the first release. Hold the long developer catalog. |

## Language and country judgment

Do not treat a language as one advertising market.

The only advertising **market-size** figure collected from a primary industry source is the United States. IAB, using PwC, reported US internet advertising revenue of $294.6 billion in 2025, of which display was $81.6 billion (9.8% year over year, 27.7% of the total). That is advertiser spend, not the RPM a new tools site will earn. Source: [IAB news release, 16 April 2026](https://www.iab.com/news/digital-ad-revenue-climbs-to-nearly-300b-as-iab-celebrates-30-year-anniversary/).

A second, narrower signal: Raptive’s help page, updated 26 September 2026, says sites under 100,000 monthly pageviews need 50% of traffic from the United States, United Kingdom, Canada, New Zealand, or Australia. That is one network’s eligibility rule, not an RPM. Source: [Raptive eligibility](https://help.raptive.com/hc/en-us/articles/360032840891-Who-is-eligible-for-Raptive).

No CPC or RPM was collected for France, Belgium, Switzerland, Canada’s French market, Spain, Mexico, Colombia, Argentina, Chile, Saudi Arabia, the UAE, Egypt, Kuwait, or India. English is the first language because the first tools do not need country-specific rules and because the US is the one market with a sourced display-ad pool. It is not because English was proven to pay more per visit.

Switzerland’s “8.1” rate appeared in autocomplete and was **not** confirmed with the Federal Tax Administration in this pass. Mexico, Argentina, Colombia, Chile, Egypt, Kuwait, India, and Canadian provincial rates were also not confirmed with the authority. They are not launch presets.

## Recommended initial strategy

1. Build one English site section, `/en/`, with ten client-side tools. Do not create `/en-us/`, `/en-gb/`, `/en-ca/`, and `/en-au/` copies of the same tool.
2. Add country URLs only when the function changes. The first candidates are VAT and GST pages with a manual rate, a dated official citation, and the standard rate prefilled only where this report verified it.
3. Keep files and text in the browser. Say so only after the implementation is checked for analytics or server actions that would upload the payload.
4. Apply for AdSense only after the tools have original explanations, examples, and privacy notes. A form alone is a known rejection reason.
5. Expand to French or Spanish only after the gates in the roadmap. Arabic waits for a native review and RTL QA. Do not machine-translate the catalog.

## Main competitive risks

- PDF queries already surface incumbent brands in the suggestion lists.
- PDF24’s compressor recompresses images on its servers. A browser rewrite that only cleans PDF structure will disappoint the 200KB query.
- Calculator.net publishes explanatory percentage content. Beating it was not demonstrated.
- timeanddate.com is a specialist with historical DST handling and a paid time API.
- Premium ad networks are not available to a new domain. Ezoic’s current new-site rule is 250,000 monthly active users. Raptive wants 25,000 pageviews and a six-month-old domain. Mediavine Official wants $5,000 in annual ad revenue; Journey wants more than 1,000 sessions.

## Biggest unresolved questions

1. Monthly search volume and a real Google top-10 for each shortlisted query, by country.
2. Publisher RPM by country for utility pages, from a publisher’s own ad account. Not from advertiser CPC.
3. Whether “sans inscription” and “sin registro” queries have enough volume to support a local-only PDF page-tool test.
4. Official, current rates and exemption rules before any Canada, India, Switzerland, Mexico, Argentina, Colombia, Chile, Egypt, Kuwait, or UAE preset. UAE’s statute was checked at 5%; a maintained FTA page should still be re-read at build time.
5. French-speaking African demand. Currently unknown.

## Answers to the ten decision questions

1. **Broad directory or focused niche?** Focused niche first. A broad directory would create near-duplicate tool URLs and translated pages before any query has a measured volume.
2. **Which 10 tools first?** Word and reading-time counter; case converter; text cleaner; JSON formatter; Base64; URL encoder; percentage calculator; unit converter; Unix timestamp converter; discount calculator. Detail is in [06-mvp-roadmap.md](06-mvp-roadmap.md).
3. **Initial market for each?** English, one shared page, indexed for US, UK, Canada, and Australia. No separate country URLs until the tool itself changes. India is not in the first release.
4. **Strongest evidence of search demand?** PDF tools have the strongest evidence that queries exist and that commercial modifiers exist. Nobody in this dataset has a measured volume, so “strongest demand” is not a traffic ranking.
5. **Best evidence of attainable rankings?** None. Head PDF terms have evidence of incumbent brands. Every other term lacks a Google result set. Cheap tools are a way to buy measurement, not a proven ranking gap.
6. **Inexpensive tests?** The ten tools above. Each is client-side. A shared shell is on the order of 20–40 hours, and each later tool is on the order of 4–12 hours, as an engineering judgment rather than a quote.
7. **Most promising ad markets, and confidence?** The US is the only country with a sourced display-ad revenue pool. UK, Canada, and Australia join it because a major network publishes them as preferred traffic, which is a moderate, indirect signal. Confidence in any RPM figure is low. Confidence that France, the Gulf, or Latin America is “easier” or “more profitable” is not supported.
8. **Traffic required for $100, $1,000, and $5,000?** See [05-revenue-scenarios.md](05-revenue-scenarios.md). At a hypothetical $5 RPM, $1,000 of monthly ad revenue requires 200,000 pageviews. That RPM is an assumption, not a benchmark.
9. **Evidence still missing?** Keyword Planner or an equivalent volume source, Google result pages by country, and a real RPM. Building the ten tools does not require those numbers. Building PDF conversion, currency, or a tax directory does.
10. **When to add a language?** After the English property has been live long enough to index at least eight of the ten tools, has no manual action, and has at least one tool receiving organic clicks for eight consecutive weeks in Search Console. Then add one language, on the same tools, after human editing. Arabic also needs RTL and bidirectional-text QA.

# Risk register

Collected 2026-10-24. Severity is a judgment. “Open” means the research did not close it.

| Risk | Evidence | What to do | Status |
| --- | --- | --- | --- |
| SEO competition on PDF head terms | Autocomplete pairs those queries with iLovePDF and Adobe in several languages. Google’s own top 10 was blocked. | Do not spend the first release on those URLs. | Open |
| Thin or duplicate content | AdSense cites insufficient content and auto-generated pages. Google spam policy covers doorway pages and scaled translation. | One URL per real tool, with rules, examples, and errors. No country clone unless the function changes. | Controllable at build |
| AdSense rejection or limited demand | New site, tool pages can look empty, and premium networks have traffic floors. | Launch tools before applying. Keep ad density low. Expect AdSense, not Raptive or Ezoic, at the start. | Open |
| Accidental clicks and policy | Tool pages are short. Ads against the buttons create misclicks. | Place ads away from the result and the primary button. Follow the Better Ads Standards referenced by AdSense. | Controllable at build |
| Privacy claim stronger than the implementation | iLovePDF, Smallpdf, and PDF24 upload files and say they delete them. A browser UI can still leak data through a server action, logs, or analytics. | Client-side by design. Review the network panel before calling a tool private. Never send secrets to a third party for these tools. | Controllable at build |
| PDF memory and bandwidth | Browser PDF work holds the file in the tab. Phone browsers crash on large scans. | If PDF tools are tested later, set a page and byte ceiling and say so. Do not take uploads onto the server for the first test. | Deferred with PDF |
| Target-size compression disappointment | US suggestions ask for 100KB, 200KB, and 1MB. pdf-lib does not recompress images. PDF24 does, on its servers. | Reject that promise. | Closed for the MVP |
| Unauthorized access | Password removal would help open documents the user may not control. | Do not build it. Upstream pdf-lib also refuses encrypted files rather than decrypting them. | Closed |
| Wrong timezone or DST | Governments change rules with little notice. IANA 2026e is the researched release, not a permanent dataset. | Use the platform timezone database. Test a DST boundary. Do not ship a handwritten offset table. | Controllable at build |
| Wrong tax rate | Autocomplete contains plausible numbers, including Switzerland 8.1 and Chile 15.25, that this pass did not verify. Arabic VAT suggestions repeated across three countries. | Prefill a rate only from an official page, with the retrieval date. Everything else is a blank rate box. Re-check before each release. | Open for unverified countries |
| Financial YMYL | Loan, wage, and interest pages can be read as advice. | User-supplied rates, formulas shown, not-advice label. No lender offers. | Deferred |
| Currency and holiday feeds | A stale FX rate or a wrong public holiday is worse than no tool. | Fail closed. Cite the feed and the date. | Deferred |
| Localization errors | Literal translation misses “fusionner”, “TVA”, “IVA”, and “ضريبة القيمة المضافة”. | Human edit. Separate France from Belgium and Spain from Mexico. | Open until a language ships |
| Arabic directionality | Mixed Arabic and English, and Eastern or Western numerals, break naive layouts. | Do not translate the first release into Arabic. Budget a dedicated QA pass. | Deferred |
| RPM assumed from CPC or from US market size | IAB’s $81.6 billion is US display **spend**. | Keep RPM hypothetical until the ad account reports it. | Open |
| Overdependence on search | The business model in this brief is organic display traffic. | Measure other acquisition only after the tools exist. Do not buy traffic to force AdSense approval. | Accepted |
| Unreliable research session | Google Trends returned HTTP 429. Google Search returned a sorry page. Bing drifted off-topic. | Do not fill the holes with estimated volumes. Refresh with Keyword Planner. | Open |
| Library abandonment | pdf-lib’s own issues say encryption is unsupported. Forks exist and were not reviewed. | Stay on maintained, widely used libraries for the first ten tools. Re-review before any PDF cryptography. | Open if PDF starts |

## Advertising policy notes that affect the product

Google can review the whole site, not the signup URL. Pages need sentences and paragraphs, not only a widget. Doorway pages and scaled translated pages are a search risk and a publisher-policy risk. Sources are linked in [05-revenue-scenarios.md](05-revenue-scenarios.md) and [08-methodology.md](08-methodology.md).

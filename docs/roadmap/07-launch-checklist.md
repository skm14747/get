# Launch checklist

Updated 2026-10-24. The site is not launched. Items are marked from the repository state, not from a production property.

| Item | State |
| --- | --- |
| Word counter counts the documented cases | Done in unit tests and a browser check of typing |
| Percentage calculator, including zero and negatives | Done in unit tests and a browser check of 15% of 80 |
| Discount and case tools | Done in unit tests and a browser check |
| Edge-case tests | Done for the pure functions. Phone memory limits were not tested |
| Keyboard use of the primary fields | Partial. Controls are native buttons, links, and fields in a logical accessibility-tree order, and button height was 44px at a 390px viewport. An automated Tab press did not move focus, so a manual keyboard walk is still unverified |
| Desktop and a narrow viewport | Done in the browser at 1280 and 390 CSS pixels |
| Crawlable content and metadata | Done in the static build. Not fetched by Google |
| Sitemap and canonical helper | Done. Test covers the helper. The live sitemap was requested from the local production server |
| No duplicate tool routes | Done. Registry test |
| Analytics does not collect entered content | Done. Allow-list test. Endpoint unset |
| Performance | Build sizes recorded. Field vitals and Lighthouse not run |
| Privacy and security documented | Done in `04-quality-and-privacy.md` and `/privacy` |
| Error states | Done for bad numbers and divide by zero. Browser confirmed the zero-divide message |
| Production build | Passed on 2026-10-24. Re-run before any deploy |
| Critical known defects | None filed from the checks that ran. Screen reader and field performance are unverified, not defect tickets |
| Search Console | Blocked. No property and no verification token |
| Contact address | Blocked. Not configured on purpose |
| Host, DNS, TLS | Blocked. Not approved |
| Ads | Not applicable. Not implemented |
| Content security policy in a browser | Header is set by `next.config.ts`. A browser console check for violations is in the execution report |

Launch remains blocked by hosting approval, a contact address, and Search Console. The repository checks are not a substitute for those.

# Revised MVP recommendation

No tool is a validated commercial opportunity. Volume and publisher RPM are unknown, and every results page that was read is already served by a working tool, a brand, or Google’s own calculator.

The evidence is enough to build a two-page English experiment and two smaller companions. It is not enough to build the Phase 1 list of ten, a PDF suite, or a tax directory.

## Low-cost experiments

These are justified by small build cost and, for the first two, by US relative interest. They are not justified by an open results page.

1. **Word counter.** One URL for words, characters, sentences, and reading time. State the counting rules. US Trends put it close to “percentage calculator” and well above JSON. The US results page is led by wordcounter.net. Success is indexation and Search Console queries, not a top-three ranking.
2. **Percentage calculator.** One URL with increase, decrease, and difference. Highest unscaled US Trends average in this pass. Google’s calculator sits on the head query, so the page has to be worth opening for the variants.
3. **Discount calculator.** User-supplied rate. US index 13 versus 74 for the percentage anchor. No results page yet. Add it only because it is a few hours and uses the same calculator shell.
4. **Case converter.** US index 10 versus 74. Same reason. Do not translate it yet.

Shared shell: about 20–40 hours. Each of these four is about 4–12 hours. Client-side only. No file upload.

Do not start with JSON, Base64, URL encoding, the unit converter, or the timestamp converter. Their US indexes were 7, 6, 2, 3, and 0 on charts where the percentage calculator averaged 74.

## Validated commercial opportunities

None.

## Investigate later

- **UK VAT and Australian GST.** Strongest within-country indexes next to a percentage calculator (UK 43 versus 67, Australia 60 versus 67). The UK results page is already full of 20% calculators. Build only with a rate re-read from GOV.UK or the ATO on the day of publication, reduced and zero rates named, and no claim that the preset fits every supply.
- **Date difference.** US index 17 versus 74. Read the results page before writing the page. Test leap years.
- **JSON formatter.** Real tool demand in the results, weak relative interest. Build after the experiment has Search Console data, and only if the payload stays in the browser. An incumbent already claims that.
- **PDF merge, split, and JPG-to-PDF.** Relative interest is high in Canada, India, France, Spain, Mexico, and Saudi Arabia, and JPG-to-PDF is high in the US comparison. The US pages are brand-heavy. Read one non-US results page before any PDF build. Keep the work in the browser, refuse encrypted files, and set a memory limit. Do not add a target file size.
- **Time zone converter.** US index is modest, and timeanddate.com already covers DST. Use IANA data if it is built.
- **Base64, URL encoding, color, HTML entities, slug, UUID.** Cheap, little or no demand evidence. A later sprint inside the same shell, not a launch set.
- **Sales-tax and GST pages for Canada and India.** Autocomplete from Phase 1 shows province and CGST/SGST wording. This pass did not fetch the rate tables. Trends does not show them leading those countries.

## Defer or reject

Defer compound interest. US relative interest is high and the first result is investor.gov, followed by finance publishers.

Defer a working-days tool that embeds holidays. The US index is 1, and a wrong calendar is a product defect.

Defer Unix timestamp and a standalone duplicate-line tool until a volume export disagrees with the flat Trends index.

Reject a PDF compressor sold against 100KB, 200KB, or 1MB queries. Reject password removal. Reject password protection until a maintained cryptography library is reviewed. Reject PDF-to-Word, Word-to-PDF, PDF comparison, and a page-count URL. Reject a translated directory.

## Is the MVP allowed to start?

Yes, as the four English experiments above, instrumented with Search Console and a completion event that does not store the user’s text.

No, if “start” means the ten-tool catalog, PDF, or a second language. Those need the missing volume export or a results page that this pass did not get.

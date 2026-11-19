# File tools — technical feasibility

Assessment date: 2026-10-24. No PDF library was installed in this pass. This is an engineering judgment based on the Phase 1 library notes and the current site, which has no upload path and no server runtime beyond the Next.js host that renders pages.

## What a browser merge would mean

A merge that copies pages from one PDF into another can run in the browser with a library such as pdf-lib. That work is structural. It is different from recompressing images inside the file, and it is different from OCR.

Known constraints recorded in Phase 1 and still applicable as library behavior to re-check before any code is written:

- pdf-lib can merge, split, and edit metadata in the browser.
- It does not extract ordinary page text.
- Upstream does not support encrypted PDFs. An option named `ignoreEncryption` does not decrypt a file.
- PDF.js can render and extract text. It does not edit a PDF or run OCR.
- Rewriting the file structure is not image recompression. A target size such as 200KB is not an honest promise for that method.

## Limits to design before a prototype

| Topic | Planning assumption | Evidence class |
| --- | --- | --- |
| Where bytes are processed | Browser only, unless a later decision approves an upload | Product rule |
| File size and page count | Hard caps, shown before processing | Engineering judgment. The numbers are not chosen yet |
| Memory exhaustion | Stop and explain. Do not retry on a server | Engineering judgment |
| Encrypted files | Refuse and say the file is encrypted | Based on pdf-lib’s documented behavior. Re-read the version that would ship |
| Malformed files | Tests with truncated and empty files | Not written, because no prototype was built |
| Output check | Open the produced PDF in a second parser and compare page count | Not implemented |
| Server upload | Not introduced | No demonstrated need |

Memory, CPU, and mobile Safari limits were not measured. There is no benchmark in this repository.

## Privacy and cost if processing stayed in the browser

The file would not need to leave the device. That is a property of this design, not a claim that competitors lack it. A future results-page review has to check the live tools.

A browser library still adds a large dependency to one route. It should be loaded only on that route. The text and calculator pages should not download it.

## If browser processing is not reliable

The alternative is a server that receives the file. That needs an explicit product decision. It also needs a disclosed upload, a retention limit, abuse controls, malware handling, a cost estimate, and a privacy-policy change. None of that exists. This pass does not add it.

## Maintenance

A PDF library needs version updates and regression files. Encrypted-file behavior and browser memory limits need to be retested when the library changes. That is a higher maintenance load than the four text and calculator tools, which depend only on the language runtime.

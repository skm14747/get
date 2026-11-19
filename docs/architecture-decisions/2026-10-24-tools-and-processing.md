# Browser tools, PDF compression, and ads

Date: 2026-10-24. The running log is `docs/roadmap/08-decision-log.md`. This note is the short version for the tool expansion.

## Routing

English stays unprefixed. A future locale adds a prefix and does not duplicate English at `/en`. Prefixed routes 404 until that locale is published with slugs for every tool and a per-request document language.

## Processing

Text, numbers, passwords, QR payloads, images, and the implemented PDF operations stay in the browser. `pdf-lib` and `qrcode` are justified by those features and are loaded only for those tools.

Compress PDF is deferred. Copying pages into a new PDF is not image recompression, and a control that returned the same bytes would be misleading. A server compressor needs an explicit approval that states retention, deletion, size limits, and who can read the file.

## Translations and ads

Unreviewed translations are not published. No ad script and no empty ad box are rendered. Measurement events keep the existing allow-list, with download and file-processing names added and content keys rejected.

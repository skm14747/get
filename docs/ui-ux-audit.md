# UI and UX audit

Reviewed 2026-10-24 against the running Next.js app, before the redesign in the same change.

## What was already working

- Tools calculate in the browser. Labels exist. Buttons are at least 44px tall. Focus outlines are visible.
- The word counter already used two columns on wide screens. Calculators already updated as the visitor typed.
- English is the only published language. Prefixed locales return 404 rather than showing unfinished translations.
- No ad script and no empty advertisement box.

## What felt unfinished

- One warm paper background, one teal link color, and the same bordered box on almost every tool. There was no type scale, no category, and no search.
- The header listed every tool in a wrapping row. On a phone that row became a long block of links above the tool.
- The homepage was a single list. It did not group text, files, dates, and finance, and it did not help someone who does not already know the tool name.
- Related tools were plain links, not a next step.
- Statistics, prices, and generated passwords had the same visual weight as helper text.
- File tools used a native file input with no drop target, no thumbnail, and no clear empty state.
- The character limit was always on, so “remaining” appeared before the visitor asked for a limit.
- JSON input and output stacked in one column. Case conversions were one long list with no grouping.
- Breadcrumbs skipped the category. Guides and the tool sat in the same visual stream.
- Copy buttons sometimes changed a nearby sentence and sometimes did not say “Copied”.
- Directional layout used physical left padding in the skip link. Arabic was not a published page, and the shell was not built to flip.

## Priorities

1. A tokenized light theme, shared controls, and a header that leads with categories and search.
2. A homepage that can be scanned, plus category pages that only list real tools.
3. Distinct workspaces for text, calculators, files, and generators.
4. Accessible empty, error, and copied states without new modal dialogs.
5. Logical CSS and an honest language menu. Do not publish the nine unfinished locales to make the menu look international.

Compress PDF stays off the site. A polished card for a compressor that does not compress would be a worse interface than no card.

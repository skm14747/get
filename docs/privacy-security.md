# Privacy and security

Updated 2026-10-24 from the code, not from a hoped-for design. The public summary is `app/privacy/page.tsx`.

## Data flows

| Data | Where it goes |
| --- | --- |
| Typed text, prices, dates, units, JSON, and Base64 | Component state in the browser. Not written to the URL. Not included in analytics. |
| Passwords from the generator | Component state and the clipboard if the visitor copies. `crypto.getRandomValues` supplies bytes. The password is not sent to a server and the analytics allow-list drops `password`. |
| Wi-Fi password inside a QR image | Stays in the generated image the visitor downloads. It is not an analytics property. `ssid` and `password` keys are blocked. |
| Images and PDFs | Read in the browser. Image work uses canvas. PDF work uses pdf-lib after a dynamic import. Limits are 15 MB per image, 20 MB per PDF, and 10 files. Object URLs are revoked when the preview changes or the download link is done. Files are not uploaded, because there is no upload route. |
| Analytics | Not sent unless consent is `granted` and `NEXT_PUBLIC_ANALYTICS_ENDPOINT` is https or localhost without user info, a query, or a hash. Allowed keys: `tool_id`, `operation`, `error_code`, `destination_tool_id`, `locale`. |
| Ads | No request. |
| Recently used tools | The tool id only, in `localStorage` under `goeasytools.recent-tools`. Typed text, prices, passwords, and files are not stored. |
| Accounts and database | None. |

`locale_changed` is an allowed event name and is not fired. The language menu lists the planned locales and does not change the page, because only English is published.

## Processing choices

Browser-side processing was verified for the pure functions and for pdf-lib merge, split, and PNG embed in Vitest. Image canvas encoding was not executed in Vitest because it needs a browser canvas. The image page tells the visitor that PNG output is lossless.

Encrypted PDFs are refused when the library error mentions encryption. They are not unlocked.

JSON uses `JSON.parse`. It is not evaluated as JavaScript.

## Headers and dependencies

`next.config.ts` sets a content security policy without `unsafe-eval`, plus `nosniff`, a referrer policy, `X-Frame-Options: DENY`, and a permissions policy that disables camera, microphone, geolocation, and payment. The typeface is the device font.

`pdf-lib` 1.17 and `qrcode` 1.5 are the feature libraries. `npm audit` on 2026-10-24 still reported five advisories in the Next/PostCSS and Vitest trees. They were not force-fixed. No credentials are committed. `.env.example` values for ads APIs and analytics are empty.

## What this file does not claim

It does not claim that a future host’s access logs are invisible. Those logs can include an IP address and the URL. It does not claim field Core Web Vitals, a penetration test, or that every phone scanner accepts the Wi-Fi QR payload.

# Monetization

Updated 2026-10-24. The intended model is display advertising. No ad network is integrated.

## Placement principles

- The tool has to work with ads absent, blocked, or not yet approved.
- A future placement sits outside the controls and the result, with a visible label that it is an advertisement.
- It must not look like Copy, Download, Generate, or Clear.
- It must not cover the tool or sit close enough that a mis-tap hits it.
- Do not use an interstitial.
- Do not render an empty box to “reserve” the space. That shifts the layout and looks broken. The current pages therefore render no ad slot at all.

## Configuration

There is no `NEXT_PUBLIC_ADS_ENABLED` flag and no ad script. Add one only with a reviewed provider, a public site id that is not a secret, and a consent state that covers that provider. Do not put a secret key in a `NEXT_PUBLIC` variable or in the client bundle.

## Performance and consent

Third-party ad scripts are render-blocking and a privacy disclosure. They stay out until the privacy page can name the provider and the consent banner can refuse them. The current banner only covers optional measurement, and measurement itself is not sent without an endpoint.

## Launch prerequisites

- A host and a final canonical URL.
- An approved ad account. This repository does not claim one.
- A consent design for that vendor.
- A placement check on a phone-width viewport so the control remains the primary target.
- No revenue forecast until RPM is measured. Phase 1 scenarios stay historical arithmetic, not a prediction.

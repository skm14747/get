import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "What GoEasyTools stores, how in-browser processing works, advertising disclosures, and cookie policies.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-6 px-4 py-10 text-[15px] leading-7">
      <h1 className="text-3xl font-bold tracking-tight text-ink">Privacy Policy</h1>
      <p className="text-sm text-muted">Last updated: November 2026</p>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-ink">1. 100% Client-Side Processing</h2>
        <p>
          All utility processing—including text analysis, calculators, developer syntax formatting, cryptographic password generation, QR code generation, image conversions, audio trimming, and PDF manipulations—executes directly inside your browser runtime using standard Web APIs (WebAssembly, HTML5 2D Canvas Context, Web Audio API, and the Web Crypto API).
        </p>
        <p>
          Our application code <strong>never transmits, uploads, or logs</strong> your typed text, passwords, invoice figures, uploaded photos, audio recordings, or PDF document bytes to any GoEasyTools server. Your data stays entirely in your device&apos;s local memory.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-ink">2. Advertising &amp; Google AdSense</h2>
        <p>
          GoEasyTools uses Google AdSense to display advertisements that fund free server hosting and development. Google and third-party advertising vendors may use cookies, web beacons, or unique device identifiers to serve personalized or non-personalized ads based on your visits to this and other websites.
        </p>
        <p>
          <strong>Ad Isolation Guarantee:</strong> Third-party ad scripts have zero access to your file contents, typed inputs, passwords, or calculation results. Ad placements are strictly isolated from tool controls (upload dropzones, processing buttons, and download links) to prevent accidental clicks and maintain layout stability.
        </p>
        <p>
          You can opt out of personalized advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-action underline"
          >
            Google Ads Settings
          </a>{" "}
          or through the Digital Advertising Alliance at{" "}
          <a
            href="https://optout.aboutads.info"
            target="_blank"
            rel="noopener noreferrer"
            className="text-action underline"
          >
            aboutads.info
          </a>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-ink">3. Analytics &amp; User Consent</h2>
        <p>
          A choice regarding optional privacy-safe measurement is stored locally in your browser under the key <code>goeasytools.analytics-consent</code>. The allowed values are <code>granted</code> and <code>denied</code>. Until you make an explicit selection via the consent banner, no analytics events are collected.
        </p>
        <p>
          When enabled, measurement events record only anonymous operational telemetry (such as tool name, operation type, error code like <code>divide_by_zero</code>, or destination tool clicks). Analytics events strictly strip and drop all typed strings, file bytes, prices, passwords, and URL query strings.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-ink">4. Local Browser Storage</h2>
        <p>
          Using tools stores recently accessed tool names in your browser under <code>goeasytools.recent-tools</code> so the homepage can display your frequently used shortcuts. This storage is strictly local to your browser and does not include user content or data values.
        </p>
        <p>
          GoEasyTools does not require accounts, user profiles, or logins. We never ask for your name, phone number, or email address.
        </p>
      </section>
    </article>
  );
}

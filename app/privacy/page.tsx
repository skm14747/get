import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description: "What GoEasyTools stores, what stays in the browser, and which third-party requests the current site makes.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-6 px-4 py-10 text-[15px] leading-7">
      <h1 className="text-3xl font-medium">Privacy</h1>
      <p>
        Text tools, calculators, the password generator, QR codes, image re-encoding, and PDF merge, split, and image-to-PDF conversion run in the browser. That code does not send typed text, prices, passwords, file names, or file bytes to a GoEasyTools server, and it does not put them in the page address. A PDF compressor is not included, because copying a PDF without recompressing its images would not be real compression.
      </p>
      <p>
        A choice about optional measurement is stored in this browser under the key <code>goeasytools.analytics-consent</code>. The allowed values are granted and denied. Until you choose, no measurement event is sent. If you allow measurement and <code>NEXT_PUBLIC_ANALYTICS_ENDPOINT</code> is empty, the event is still not sent.
      </p>
      <p>
        A measurement event may include the tool name, an operation name such as merge or encode, an error code such as divide_by_zero or encrypted, and the related tool that was clicked. The event names also cover a download, the start and end of file processing, and a locale change. The language menu does not switch pages, because only English is published, so a locale-change event is not sent. Events are not allowed to include typed text, passwords, file names, file bytes, prices, results, or the page query string. They are also withheld when no endpoint has been configured.
      </p>
      <p>
        Choosing a tool stores that tool’s name in this browser under <code>goeasytools.recent-tools</code> so the homepage can list it. The list does not include typed text, prices, passwords, or files. The current pages do not load advertising scripts, analytics scripts, or remote fonts. The typeface is the device font. Image and PDF libraries load only on the pages that use them. Hosting logs, if a host is added later, can still record an IP address and the requested URL. That hosting behavior is not something this repository can measure before a host is chosen.
      </p>
      <p>There is no account, and the tools do not ask for a name or an email address.</p>
    </article>
  );
}

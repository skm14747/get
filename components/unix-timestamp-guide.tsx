export function UnixTimestampGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          View the real-time live Unix epoch clock at the top of the page. Enter any timestamp (in seconds or milliseconds) to view the equivalent UTC ISO date, RFC 2822 date, and your local timezone date. Or, select any calendar date in the bottom converter to generate its exact Unix epoch seconds.
        </p>
        <p className="mt-2">
          The tool auto-detects whether you entered a timestamp in seconds (10-digit) or milliseconds (13-digit) and adjusts the conversion accordingly. All parsing uses JavaScript&apos;s native Date API with your system&apos;s IANA timezone database.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Unix epoch principles and time standards</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>The Unix Epoch:</strong> Defined as 00:00:00 UTC on 1 January 1970. Unix timestamps measure elapsed time since this reference point, ignoring leap seconds.</li>
          <li><strong>Seconds vs. Milliseconds:</strong> Standard Unix timestamps in systems programming (C, Python, Go) use seconds (10 digits). Web APIs and JavaScript <code className="rounded bg-line px-1 py-0.5 text-xs">Date.now()</code> use milliseconds (13 digits). The tool auto-detects both scales.</li>
          <li><strong>Timezone Handling:</strong> Timestamps are absolute universal timestamps. Local date and time representations are rendered client-side using your system&apos;s native IANA timezone database.</li>
          <li><strong>Year 2038 Problem:</strong> Systems storing epoch seconds in signed 32-bit integers overflow on 19 January 2038. This JavaScript utility uses 64-bit IEEE-754 floating point numbers, safely supporting dates millions of years into the future.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Server log debugging:</strong> Convert epoch timestamps from application logs, error reports, or monitoring dashboards into human-readable dates to correlate events.</li>
          <li><strong>Database records:</strong> Many databases (PostgreSQL, MongoDB) store creation timestamps as Unix epoch integers — paste them here to quickly see the actual date.</li>
          <li><strong>API development:</strong> Verify <code className="rounded bg-line px-1 py-0.5 text-xs">exp</code>, <code className="rounded bg-line px-1 py-0.5 text-xs">iat</code>, and <code className="rounded bg-line px-1 py-0.5 text-xs">nbf</code> claim values in JWT tokens or OAuth responses.</li>
          <li><strong>Cron job scheduling:</strong> Convert target execution times to epoch seconds for use in scheduling scripts and automation platforms.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Why developers use Unix timestamps</h2>
        <p className="mt-2">
          Unix timestamps are timezone-agnostic: the same integer represents the same instant everywhere in the world. This eliminates timezone conversion bugs in distributed systems. They are also compact, sortable as integers, and trivially comparable — making them ideal for database storage, log files, and inter-service communication.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common timestamp formats compared</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Unix epoch (seconds):</strong> <code className="rounded bg-line px-1 py-0.5 text-xs">1735689600</code> — compact integer, used in C, Python, Go, and system logs.</li>
          <li><strong>Unix epoch (milliseconds):</strong> <code className="rounded bg-line px-1 py-0.5 text-xs">1735689600000</code> — JavaScript, Java, and many web APIs.</li>
          <li><strong>ISO 8601:</strong> <code className="rounded bg-line px-1 py-0.5 text-xs">2025-01-01T00:00:00Z</code> — human-readable, timezone-aware, used in JSON APIs.</li>
          <li><strong>RFC 2822:</strong> <code className="rounded bg-line px-1 py-0.5 text-xs">Wed, 01 Jan 2025 00:00:00 +0000</code> — email headers and HTTP date fields.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>If your timestamp is 10 digits, it&apos;s in seconds. If it&apos;s 13 digits, it&apos;s in milliseconds. The tool handles both automatically.</li>
          <li>Negative timestamps represent dates before January 1, 1970 — useful for historical date conversions.</li>
          <li>The live clock at the top of the page is a quick reference for the current epoch second without needing a terminal.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy guarantee</h2>
        <p className="mt-2">
          Timestamps and dates are parsed entirely within your browser runtime. No scheduling data, timestamps, or conversion results are logged, cached, or sent to any server. The tool has zero backend — all parsing uses native JavaScript Date APIs.
        </p>
      </section>
    </div>
  );
}

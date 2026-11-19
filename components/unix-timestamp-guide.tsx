export function UnixTimestampGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          View the real-time live Unix epoch clock at the top of the page. Enter any timestamp (in seconds or milliseconds) to view the equivalent UTC ISO date, RFC 2822 date, and your local timezone date. Or, select any calendar date in the bottom converter to generate its exact Unix epoch seconds.
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
        <h2 className="text-xl font-semibold">Privacy guarantee</h2>
        <p className="mt-2">
          Timestamps and dates are parsed entirely within your browser runtime. No scheduling data or timestamps are logged or sent to any server.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Why this page exists</h2>
        <p className="mt-2">
          Software engineers and DevOps professionals inspect epoch timestamps in server logs and database records daily. This tool provides an instant, private, and ad-free converter with local and UTC breakdowns.
        </p>
      </section>
    </div>
  );
}

export function CsvJsonGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">What is CSV to JSON conversion?</h2>
        <p className="mt-2">
          CSV to JSON conversion parses Comma-Separated Values (CSV) spreadsheets and translates each row into a structured JSON array of objects. It allows developers and data analysts to convert tabular data from Excel, Google Sheets, or database exports into machine-readable JSON for web APIs and frontend applications.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Choose your conversion direction (CSV to JSON or JSON to CSV). Paste your data into the left editor or click Load sample. Select your delimiter (Auto-detect, Comma, Tab, Semicolon, or Pipe) and configure whether the first row represents table headers. The parsed data is immediately available to copy to your clipboard or download as a <code className="rounded bg-line px-1 py-0.5 text-xs">.json</code> or <code className="rounded bg-line px-1 py-0.5 text-xs">.csv</code> file.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">RFC 4180 CSV parsing and escaping rules</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <strong>Embedded Delimiters:</strong> Fields containing commas, tabs, or semicolons must be wrapped in double quotes (e.g. <code className="rounded bg-line px-1 py-0.5 text-xs">&quot;Smith, John&quot;</code>).
          </li>
          <li>
            <strong>Escaped Quotes:</strong> If a field contains a literal double quote character, RFC 4180 requires it to be escaped by doubling it (e.g. <code className="rounded bg-line px-1 py-0.5 text-xs">&quot;He said &quot;&quot;Hello&quot;&quot;&quot;</code>).
          </li>
          <li>
            <strong>Line Breaks in Data:</strong> Multi-line text inside quoted fields is safely preserved without breaking table row alignment.
          </li>
          <li>
            <strong>Data Type Coercion:</strong> When &quot;Parse numbers &amp; booleans&quot; is checked, numeric strings like <code className="rounded bg-line px-1 py-0.5 text-xs">&quot;42&quot;</code> and <code className="rounded bg-line px-1 py-0.5 text-xs">&quot;true&quot;</code> are converted into JSON integers, floats, and booleans rather than raw text.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Delimiter auto-detection</h2>
        <p className="mt-2">
          Different software exports use different separators: US spreadsheets typically use commas (<code className="rounded bg-line px-1 py-0.5 text-xs">,</code>), European accounting systems use semicolons (<code className="rounded bg-line px-1 py-0.5 text-xs">;</code>) because the comma is a decimal separator, and log files frequently use tabs (<code className="rounded bg-line px-1 py-0.5 text-xs">\t</code>) or pipes (<code className="rounded bg-line px-1 py-0.5 text-xs">|</code>). The auto-detect feature samples the header row to choose the correct delimiter automatically.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Privacy guarantee for proprietary datasets</h2>
        <p className="mt-2">
          Customer lists, internal analytics, financial spreadsheets, and database backups often contain confidential records. GoEasyTools executes all CSV parsing and JSON stringification entirely within your browser memory. Your spreadsheets never leave your device.
        </p>
      </section>
    </div>
  );
}

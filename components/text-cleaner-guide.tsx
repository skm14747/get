export function TextCleanerGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Paste your raw text, list of email addresses, URLs, or data lines into the editor. Select your preferred options (remove duplicates, case sensitivity, trim spaces, or remove blank lines) and pick an optional alphabetical sorting order. Click Copy Cleaned Text to copy the result to your clipboard.
        </p>
        <p className="mt-2">
          The tool processes each line independently: trimming whitespace, detecting and removing duplicates using an in-memory hash set, and optionally sorting the remaining unique lines. All transformations happen in a single pass for fast results even on large lists.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Cleaning and deduplication rules</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Duplicate Line Removal:</strong> Uses an in-memory hash set to identify duplicate lines. The first occurrence of each unique line is preserved, maintaining original list order.</li>
          <li><strong>Case Sensitivity Toggle:</strong> When Case-sensitive is enabled, &quot;Apple&quot; and &quot;apple&quot; are treated as distinct lines. When disabled, differing capitalization variants are recognized as duplicates.</li>
          <li><strong>Line Whitespace Trimming:</strong> Removes invisible spaces and tab characters from the beginning and end of each line before deduplicating.</li>
          <li><strong>Blank Line Removal:</strong> Strips empty rows and lines containing only whitespace, condensing sparse lists into compact datasets.</li>
          <li><strong>Alphabetical Sorting:</strong> Sorts lines in ascending (A to Z) or descending (Z to A) order using natural collation rules.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Email list cleanup:</strong> Remove duplicate email addresses exported from a CRM or spreadsheet before importing into a mailing platform.</li>
          <li><strong>Log file analysis:</strong> Deduplicate repeated error messages or log entries to find unique occurrences of issues.</li>
          <li><strong>Data migration:</strong> Clean CSV column values or database exports by removing blank rows and trimming whitespace before re-importing.</li>
          <li><strong>Content editing:</strong> Sort keyword lists, tag collections, or vocabulary lists alphabetically for organized reference.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Enable &ldquo;Trim spaces&rdquo; before deduplication — lines that look identical but have trailing spaces will otherwise be treated as different.</li>
          <li>Disable case sensitivity when cleaning email addresses, since email local parts are case-insensitive in practice.</li>
          <li>Use ascending sort after deduplication to quickly scan for near-duplicates that differ by a single character.</li>
          <li>For very large lists (10,000+ lines), the tool remains fast because deduplication uses an O(n) hash set rather than nested comparisons.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">How deduplication works internally</h2>
        <p className="mt-2">
          The tool uses a JavaScript <code className="rounded bg-line px-1 py-0.5 text-xs">Set</code> data structure to track seen lines. Each line (after optional trimming and case normalization) is checked against the set. If it already exists, the line is dropped; if not, it is added to the set and kept in the output. This provides O(1) lookup time per line, making the tool fast even for lists with tens of thousands of entries.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Supported text encodings</h2>
        <p className="mt-2">
          The tool processes text as Unicode (UTF-16, as used by JavaScript internally). It correctly handles accented characters, CJK scripts, emoji, and other non-ASCII text. Deduplication and sorting use standard JavaScript string comparison rules, which follow Unicode code point order by default.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy and local processing</h2>
        <p className="mt-2">
          All line processing, hashing, and sorting run locally in your browser tab. Your customer lists, email databases, and confidential datasets are never transmitted across the network or stored in cookies.
        </p>
      </section>
    </div>
  );
}

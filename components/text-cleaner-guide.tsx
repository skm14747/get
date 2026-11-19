export function TextCleanerGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Paste your raw text, list of email addresses, URLs, or data lines into the editor. Select your preferred options (remove duplicates, case sensitivity, trim spaces, or remove blank lines) and pick an optional alphabetical sorting order. Click Copy Cleaned Text to copy the result to your clipboard.
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
        <h2 className="text-xl font-semibold">Privacy and local processing</h2>
        <p className="mt-2">
          All line processing, hashing, and sorting run locally in your browser tab. Your customer lists, email databases, and confidential datasets are never transmitted across the network or stored in cookies.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Why this page exists</h2>
        <p className="mt-2">
          Data analysts, developers, and marketers clean and deduplicate lists multiple times a week. This tool unifies line deduplication, whitespace trimming, and sorting onto a single, private page without server uploads.
        </p>
      </section>
    </div>
  );
}

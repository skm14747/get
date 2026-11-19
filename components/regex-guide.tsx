export function RegexGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">What is a regular expression (regex)?</h2>
        <p className="mt-2">
          A regular expression (regex) is a sequence of characters forming a search pattern. Commonly used for pattern matching, input validation, string replacement, and data parsing, regular expressions allow developers to extract phone numbers, validate email addresses, or clean textual datasets with surgical precision.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Select a quick preset (Email, URL, IPv4, Date, or Hex color) or enter your custom regex between the slash delimiters. Toggle active regex flags (<code className="rounded bg-line px-1 py-0.5 text-xs">g</code>, <code className="rounded bg-line px-1 py-0.5 text-xs">i</code>, <code className="rounded bg-line px-1 py-0.5 text-xs">m</code>, <code className="rounded bg-line px-1 py-0.5 text-xs">s</code>, <code className="rounded bg-line px-1 py-0.5 text-xs">u</code>) and paste your test string. The tool highlights all matches in real time, displays execution benchmarks, and outputs a detailed table of capture groups.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Standard regex flags explained</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <strong>global (<code className="rounded bg-line px-1 py-0.5 text-xs">g</code>):</strong> Searches for all matches throughout the text rather than stopping after the first occurrence.
          </li>
          <li>
            <strong>ignoreCase (<code className="rounded bg-line px-1 py-0.5 text-xs">i</code>):</strong> Makes the pattern case-insensitive, matching both uppercase and lowercase letters.
          </li>
          <li>
            <strong>multiline (<code className="rounded bg-line px-1 py-0.5 text-xs">m</code>):</strong> Treats caret (<code className="rounded bg-line px-1 py-0.5 text-xs">^</code>) and dollar (<code className="rounded bg-line px-1 py-0.5 text-xs">$</code>) anchors as matching the beginning and end of each individual line instead of the whole string.
          </li>
          <li>
            <strong>dotAll (<code className="rounded bg-line px-1 py-0.5 text-xs">s</code>):</strong> Allows the dot (<code className="rounded bg-line px-1 py-0.5 text-xs">.</code>) metacharacter to match newline characters (<code className="rounded bg-line px-1 py-0.5 text-xs">\n</code>).
          </li>
          <li>
            <strong>unicode (<code className="rounded bg-line px-1 py-0.5 text-xs">u</code>):</strong> Enables full Unicode code point support and handles 4-byte surrogate pairs such as emojis correctly.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Catastrophic backtracking protection</h2>
        <p className="mt-2">
          Poorly nested quantifiers (such as <code className="rounded bg-line px-1 py-0.5 text-xs">(a+)+$</code>) can trigger exponential complexity (ReDoS) and freeze browsers. GoEasyTools executes matching client-side with zero-length loop guards and caps total global iterations to protect your browser tab from crashing on accidental runaway patterns.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Privacy guarantee for confidential logs</h2>
        <p className="mt-2">
          Testing server logs, authentication tokens, and user records often involves sensitive customer data. GoEasyTools executes the native JavaScript <code className="rounded bg-line px-1 py-0.5 text-xs">RegExp</code> engine entirely in your local browser memory. No test strings or patterns are sent across network sockets.
        </p>
      </section>
    </div>
  );
}

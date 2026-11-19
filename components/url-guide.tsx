export function UrlGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">What is URL encoding (percent-encoding)?</h2>
        <p className="mt-2">
          URL encoding (also known as percent-encoding) is an RFC 3986 mechanism for translating arbitrary text, spaces, and reserved symbols into US-ASCII format. Characters outside the standard unreserved set are replaced with a percent sign (<code className="rounded bg-line px-1 py-0.5 text-xs">%</code>) followed by their two-digit hexadecimal byte value.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Select your intended encoding mode (URL Component, Full URL, or Query Params Table). Enter or paste your string into the editor, then click Encode URL or Decode URL. Use the Swap button to reverse operations instantly, or check &quot;Encode space as +&quot; when preparing data for legacy form submissions.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Difference between encodeURI and encodeURIComponent</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <strong>URL Component (<code className="rounded bg-line px-1 py-0.5 text-xs">encodeURIComponent</code>):</strong> Encodes all characters except <code className="rounded bg-line px-1 py-0.5 text-xs">A-Z a-z 0-9 - _ . ! ~ * &apos; ( )</code>. It encodes structural separators like <code className="rounded bg-line px-1 py-0.5 text-xs">/ ? : @ & = + $ #</code>. Use this mode when encoding query parameter values or path segments so separators are not misread as protocol controls.
          </li>
          <li>
            <strong>Full URL (<code className="rounded bg-line px-1 py-0.5 text-xs">encodeURI</code>):</strong> Preserves structural URL characters (<code className="rounded bg-line px-1 py-0.5 text-xs">: / ? # & = @ +</code>) and only encodes illegal characters (such as spaces into <code className="rounded bg-line px-1 py-0.5 text-xs">%20</code> and non-ASCII Unicode characters). Use this when you have a complete URL that needs spaces or accents escaped without breaking protocol delimiters.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Common percent-encoding character table</h2>
        <div className="mt-3 overflow-x-auto rounded-lg border border-line">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-line text-muted">
              <tr>
                <th className="p-2.5 font-medium">Character</th>
                <th className="p-2.5 font-medium">Meaning</th>
                <th className="p-2.5 font-medium">Percent-Encoded Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line text-ink">
              <tr>
                <td className="p-2.5 font-mono">(Space)</td>
                <td className="p-2.5 text-muted">Whitespace delimiter</td>
                <td className="p-2.5 font-mono">%20 or +</td>
              </tr>
              <tr>
                <td className="p-2.5 font-mono">/</td>
                <td className="p-2.5 text-muted">Path forward slash</td>
                <td className="p-2.5 font-mono">%2F</td>
              </tr>
              <tr>
                <td className="p-2.5 font-mono">?</td>
                <td className="p-2.5 text-muted">Query string start</td>
                <td className="p-2.5 font-mono">%3F</td>
              </tr>
              <tr>
                <td className="p-2.5 font-mono">&amp;</td>
                <td className="p-2.5 text-muted">Parameter separator</td>
                <td className="p-2.5 font-mono">%26</td>
              </tr>
              <tr>
                <td className="p-2.5 font-mono">=</td>
                <td className="p-2.5 text-muted">Key-value assignment</td>
                <td className="p-2.5 font-mono">%3D</td>
              </tr>
              <tr>
                <td className="p-2.5 font-mono">#</td>
                <td className="p-2.5 text-muted">Anchor / fragment hash</td>
                <td className="p-2.5 font-mono">%23</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Privacy guarantee</h2>
        <p className="mt-2">
          All encoding, decoding, and query string conversions execute locally in your browser memory. URLs, sensitive query parameter keys, and confidential authorization tokens are never sent to a server or stored in session logs.
        </p>
      </section>
    </div>
  );
}

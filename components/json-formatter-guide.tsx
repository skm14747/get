import Link from "next/link";
import { MAX_JSON_CHARS } from "@/lib/json-format";

export function JsonFormatterGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Paste your JSON payload into the input box. Choose Pretty-print (2 spaces) to format and indent nested objects, or Minify to strip all unnecessary whitespace. Click Copy to place the formatted JSON onto your clipboard. If you need typed interfaces for your data, use our{" "}
          <Link href="/json-to-typescript" className="text-action underline">
            JSON to TypeScript
          </Link>{" "}
          or{" "}
          <Link href="/json-to-python" className="text-action underline">
            JSON to Python
          </Link>{" "}
          generators.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Validation and syntax rules</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <strong>Syntax Validation:</strong> Validation uses native <code className="rounded bg-line px-1 py-0.5 text-xs">JSON.parse()</code>. If the syntax is malformed (e.g. trailing commas, unquoted keys, single quotes), the exact parser error message is displayed with character offsets.
          </li>
          <li>
            <strong>Pretty-Printing:</strong> Formatting uses <code className="rounded bg-line px-1 py-0.5 text-xs">JSON.stringify(parsed, null, 2)</code>. Keys and values maintain strict JSON data types: strings, numbers, booleans, null, arrays, and nested objects.
          </li>
          <li>
            <strong>Minification:</strong> Strips indentation, line breaks, and space characters outside quoted strings to produce a compact single-line payload for production wire transmission and storage.
          </li>
          <li>
            <strong>Spreadsheet Data:</strong> If your JSON array originates from a spreadsheet or you need to export table rows to Excel, use our{" "}
            <Link href="/csv-to-json" className="text-action underline">
              CSV to JSON Converter
            </Link>.
          </li>
          <li>
            <strong>Token Decoding:</strong> If your JSON payload is encoded inside an authorization bearer token, decode it with our{" "}
            <Link href="/jwt-decoder" className="text-action underline">
              JWT Decoder
            </Link>{" "}
            or decode raw Base64 data with our{" "}
            <Link href="/base64" className="text-action underline">
              Base64 Encoder &amp; Decoder
            </Link>.
          </li>
          <li>
            <strong>Input Limit:</strong> Bounded to {MAX_JSON_CHARS.toLocaleString()} characters (1 MB) to prevent browser memory exhaustion on accidental massive pastes.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Example: Before &amp; After</h2>
        <div className="grid gap-3 sm:grid-cols-2 mt-2">
          <div className="rounded-lg border border-line bg-canvas p-3">
            <span className="text-xs font-semibold text-muted block mb-1">Unformatted Input:</span>
            <code className="text-xs font-mono text-ink break-all">
              {`{"user":"Alex","active":true,"roles":["admin","editor"]}`}
            </code>
          </div>
          <div className="rounded-lg border border-line bg-canvas p-3">
            <span className="text-xs font-semibold text-muted block mb-1">Pretty-Printed Output:</span>
            <pre className="text-xs font-mono text-ink">
{`{
  "user": "Alex",
  "active": true,
  "roles": [
    "admin",
    "editor"
  ]
}`}
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Privacy and client-side execution</h2>
        <p className="mt-2">
          The JSON is parsed and formatted entirely inside your browser tab. Your data, API responses, configuration files, and authentication tokens are never transmitted to a server, logged to disk, or stored in cookies.
        </p>
      </section>
    </div>
  );
}

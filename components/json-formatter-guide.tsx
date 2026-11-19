import { MAX_JSON_CHARS } from "@/lib/json-format";

export function JsonFormatterGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Paste your JSON payload into the input box. Choose Pretty-print (2 spaces) to format and indent nested objects, or Minify to strip all unnecessary whitespace. Click Copy to place the formatted JSON onto your clipboard.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Validation and syntax rules</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Validation uses native <code className="rounded bg-line px-1 py-0.5 text-xs">JSON.parse()</code>. If the syntax is malformed (e.g. trailing commas, unquoted keys, single quotes), the exact parser error message is displayed.</li>
          <li>Formatting uses <code className="rounded bg-line px-1 py-0.5 text-xs">JSON.stringify(parsed, null, 2)</code>. Keys and values maintain strict JSON data types: strings, numbers, booleans, null, arrays, and nested objects.</li>
          <li>Minification strips indentation, line breaks, and space characters outside quoted strings to produce a compact single-line payload for production wire transmission.</li>
          <li>Input is limited to {MAX_JSON_CHARS.toLocaleString()} characters (1 MB) to prevent browser memory exhaustion on accidental massive pastes.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Example</h2>
        <p className="mt-2">
          Given <code className="rounded bg-line px-1 py-0.5 text-xs">{`{"user":"Alex","active":true,"roles":["admin"]}`}</code>, pretty-printing formats the text across multiple lines with two-space indentation for each nested level.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy and client-side execution</h2>
        <p className="mt-2">
          The JSON is parsed and formatted entirely inside your browser tab. Your data, API responses, configuration files, and authentication tokens are never transmitted to a server, logged to disk, or stored in cookies.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Why this page exists</h2>
        <p className="mt-2">Developers format and validate JSON dozens of times a day during API integration, debugging, and configuration work. An in-browser tool avoids pasting sensitive payloads into third-party services.</p>
      </section>
    </div>
  );
}

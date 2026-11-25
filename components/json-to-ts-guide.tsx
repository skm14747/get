export function JsonToTsGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">What is JSON to TypeScript conversion?</h2>
        <p className="mt-2">
          JSON to TypeScript conversion inspects raw JSON data structures and automatically generates strongly typed TypeScript interfaces or type aliases. It eliminates manual typing errors when consuming REST APIs, GraphQL payloads, or configuration files in modern web applications.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Paste your JSON payload into the left editor or click Load sample. Choose your preferred Root Name and select whether you want standard <code className="rounded bg-line px-1 py-0.5 text-xs">interface</code> or <code className="rounded bg-line px-1 py-0.5 text-xs">type</code> alias declarations. The generated TypeScript interfaces appear on the right with a one-click Copy Code action.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How type inference works</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <strong>Primitive Mapping:</strong> JSON strings, numbers, booleans, and null values map directly to TypeScript <code className="rounded bg-line px-1 py-0.5 text-xs">string</code>, <code className="rounded bg-line px-1 py-0.5 text-xs">number</code>, <code className="rounded bg-line px-1 py-0.5 text-xs">boolean</code>, and <code className="rounded bg-line px-1 py-0.5 text-xs">any</code> types.
          </li>
          <li>
            <strong>Nested Objects:</strong> Nested objects are automatically extracted into distinct, reusable child interfaces named after the parent property (e.g. an <code className="rounded bg-line px-1 py-0.5 text-xs">author</code> property produces an <code className="rounded bg-line px-1 py-0.5 text-xs">Author</code> interface).
          </li>
          <li>
            <strong>Array Unions:</strong> Arrays containing multiple data types produce clean union types, such as <code className="rounded bg-line px-1 py-0.5 text-xs">(string | number)[]</code>.
          </li>
          <li>
            <strong>Special Characters:</strong> Keys containing hyphens, spaces, or non-alphanumeric symbols (e.g. <code className="rounded bg-line px-1 py-0.5 text-xs">&quot;content-type&quot;</code>) are automatically wrapped in quotes to ensure syntactically valid TypeScript definitions.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>API integration:</strong> Paste a sample REST API response to generate typed interfaces for safe data access with full IntelliSense support in VS Code or Cursor.</li>
          <li><strong>GraphQL schema typing:</strong> Convert GraphQL JSON responses into TypeScript types for client-side query result handling.</li>
          <li><strong>Configuration files:</strong> Generate type definitions for JSON config files to catch typos and missing fields at compile time.</li>
          <li><strong>Mock data typing:</strong> Create interfaces from test fixture JSON files so mock data matches your production data shape.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Interfaces vs. type aliases in TypeScript</h2>
        <p className="mt-2">
          TypeScript interfaces are extendable via declaration merging and are the standard pattern for object shape definitions in libraries. Type aliases are preferred when defining unions, primitives, or tuple structures. For API payloads, both formats provide identical compile-time type safety and IntelliSense in editors like VS Code and Cursor.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Use representative sample data — if a field can be <code className="rounded bg-line px-1 py-0.5 text-xs">null</code> in production but isn&apos;t in your sample, the generated type won&apos;t include <code className="rounded bg-line px-1 py-0.5 text-xs">null</code>.</li>
          <li>Review array types carefully — if your sample has only one item, the tool infers that item&apos;s type. Multiple items with different shapes produce a union.</li>
          <li>Use the interface format for public library types (benefits from declaration merging) and type aliases for internal application code.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Privacy guarantee for private API responses</h2>
        <p className="mt-2">
          Pasting private backend JSON payloads, database rows, or customer schemas into online generators can leak proprietary data. GoEasyTools performs all AST traversal and interface generation entirely in your browser memory. Your data never touches a remote server.
        </p>
      </section>
    </div>
  );
}

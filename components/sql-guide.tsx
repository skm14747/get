export function SqlGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">What is an SQL formatter?</h2>
        <p className="mt-2">
          An SQL formatter parses raw, unformatted SQL queries and organizes clauses onto separate lines with consistent indentation and uppercase keywords. It transforms monolithic one-line database queries into clean, readable code suitable for code reviews, database migrations, and debugging.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Paste any SQL query into the left editor or click Load sample. Choose your indentation preference (2 or 4 spaces) and toggle keyword capitalization. The formatted SQL immediately updates on the right. You can also click Minify to strip comments and excess whitespace before deploying queries in production code.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Standard SQL formatting rules applied</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <strong>Major Clause Breaks:</strong> Core statement clauses (<code className="rounded bg-line px-1 py-0.5 text-xs">SELECT</code>, <code className="rounded bg-line px-1 py-0.5 text-xs">FROM</code>, <code className="rounded bg-line px-1 py-0.5 text-xs">WHERE</code>, <code className="rounded bg-line px-1 py-0.5 text-xs">GROUP BY</code>, <code className="rounded bg-line px-1 py-0.5 text-xs">HAVING</code>, <code className="rounded bg-line px-1 py-0.5 text-xs">ORDER BY</code>, <code className="rounded bg-line px-1 py-0.5 text-xs">LIMIT</code>) begin on their own line with zero indentation.
          </li>
          <li>
            <strong>Sub-Clause Indentation:</strong> Join conditions (<code className="rounded bg-line px-1 py-0.5 text-xs">LEFT JOIN</code>, <code className="rounded bg-line px-1 py-0.5 text-xs">INNER JOIN</code>, <code className="rounded bg-line px-1 py-0.5 text-xs">ON</code>) and boolean logic (<code className="rounded bg-line px-1 py-0.5 text-xs">AND</code>, <code className="rounded bg-line px-1 py-0.5 text-xs">OR</code>) are indented to maintain clear logical hierarchy.
          </li>
          <li>
            <strong>Column Lists:</strong> Commas in column projection lists are followed by newline line breaks for fast visual scanning of table attributes.
          </li>
          <li>
            <strong>Literal Preservation:</strong> Quoted string literals, numbers, table aliases, and SQL comments (<code className="rounded bg-line px-1 py-0.5 text-xs">--</code> or <code className="rounded bg-line px-1 py-0.5 text-xs">{"/* */"}</code>) are preserved exactly as written.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Supported database dialects</h2>
        <p className="mt-2">
          The formatting rules apply standard ANSI SQL syntax, compatible with PostgreSQL, MySQL, MariaDB, SQLite, Microsoft SQL Server (T-SQL), Snowflake, and Google BigQuery.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Privacy guarantee for proprietary database schemas</h2>
        <p className="mt-2">
          Database queries often reveal internal business schemas, table relations, and sensitive query filters. GoEasyTools tokenizes and formats your SQL entirely inside your local browser memory. Queries are never sent across network sockets, cached on disk, or logged.
        </p>
      </section>
    </div>
  );
}

"use client";

import { useId, useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import { formatSql, minifySql, type SqlFormatResult } from "@/lib/sql-format";

const SAMPLE_SQL =
  "select u.id, u.first_name, u.last_name, count(o.id) as total_orders, sum(o.amount) as total_spent from users u left join orders o on u.id = o.user_id where u.active = 1 and o.status in ('completed', 'shipped') group by u.id, u.first_name, u.last_name having total_spent > 500 order by total_spent desc limit 25;";

export function SqlTool() {
  const session = useToolSession("sql-formatter");
  const [inputSql, setInputSql] = useState("");
  const [indent, setIndent] = useState<2 | 4>(2);
  const [uppercase, setUppercase] = useState(true);
  const [copied, setCopied] = useState(false);
  const inputId = useId();

  const result: SqlFormatResult | null = inputSql.trim()
    ? formatSql(inputSql, { indent, uppercase })
    : null;

  async function handleCopy() {
    if (!result || !result.ok) return;
    try {
      await navigator.clipboard.writeText(result.formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }

  function handleMinify() {
    if (!inputSql.trim()) return;
    const minified = minifySql(inputSql);
    setInputSql(minified);
    session.markInput();
  }

  function handleLoadSample() {
    setInputSql(SAMPLE_SQL);
    session.markInput();
  }

  function handlePaste() {
    navigator.clipboard
      ?.readText()
      .then((text) => {
        setInputSql(text);
        session.markInput();
      })
      .catch(() => {});
  }

  function handleClear() {
    setInputSql("");
    setCopied(false);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* ── Configuration Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-surface p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-medium text-ink">
            <span className="text-muted">Indent:</span>
            <select
              value={indent}
              onChange={(e) => {
                setIndent(Number(e.target.value) as 2 | 4);
                session.markInput();
              }}
              className="field-control h-8 text-xs font-mono"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
            </select>
          </div>

          <label className="flex items-center gap-1.5 text-xs text-muted cursor-pointer">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => {
                setUppercase(e.target.checked);
                session.markInput();
              }}
              className="rounded border-line"
            />
            Uppercase Keywords (SELECT, FROM...)
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={handleLoadSample} className="btn btn-secondary text-xs">
            Load sample
          </button>
          <button type="button" onClick={handleMinify} disabled={!inputSql.trim()} className="btn btn-secondary text-xs">
            Minify
          </button>
          <button type="button" onClick={handlePaste} className="btn btn-secondary text-xs">
            Paste
          </button>
          {inputSql && (
            <button type="button" onClick={handleClear} className="btn btn-secondary text-xs">
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Dual Editor Grid ── */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left: Input Pane */}
        <div className="rounded-xl border border-line bg-surface p-4">
          <div className="flex items-center justify-between pb-2 border-b border-line">
            <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-muted">
              Raw SQL Input
            </label>
            <span className="text-[11px] text-faint">Standard SQL dialects</span>
          </div>
          <textarea
            id={inputId}
            value={inputSql}
            onChange={(e) => {
              setInputSql(e.target.value);
              session.markInput();
            }}
            placeholder="Paste your unformatted SQL query here (e.g. select a, b from table where c = 1)..."
            rows={14}
            className="field-control mt-3 w-full font-mono text-xs leading-relaxed"
            spellCheck={false}
          />
        </div>

        {/* Right: Formatted Output Pane */}
        <div className="rounded-xl border border-line bg-surface p-4">
          <div className="flex items-center justify-between pb-2 border-b border-line">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              Formatted SQL Query
            </span>
            {result?.ok && (
              <button type="button" onClick={handleCopy} className="btn btn-primary text-xs">
                {copied ? "Copied!" : "Copy SQL"}
              </button>
            )}
          </div>

          <div className="mt-3 min-h-[300px]">
            {!inputSql.trim() ? (
              <div className="flex h-full min-h-[280px] items-center justify-center rounded-lg border border-dashed border-line p-6 text-center text-xs text-muted">
                Enter an SQL statement on the left to see clean formatted clauses with standard indentation.
              </div>
            ) : result && !result.ok ? (
              <div className="rounded-lg border border-danger/20 bg-danger/5 p-4 text-xs text-danger" role="alert">
                <span className="font-semibold">Error: </span>
                {result.reason}
              </div>
            ) : result && result.ok ? (
              <pre className="overflow-x-auto rounded-lg bg-canvas p-3 font-mono text-xs text-ink leading-relaxed max-h-[360px] whitespace-pre">
                <code>{result.formatted}</code>
              </pre>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

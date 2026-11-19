"use client";

import { useId, useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import {
  csvToJson,
  jsonToCsv,
  type CsvDelimiter,
  type CsvJsonResult,
} from "@/lib/csv-json";

const SAMPLE_CSV = `id,name,role,department,salary
101,Alice Smith,Engineering Lead,Engineering,145000
102,"Johnson, Bob",Product Manager,Product,130000
103,Charlie Davis,Senior Designer,Design,115000
104,Diana Prince,"Security ""Architect""",Security,155000`;

const SAMPLE_JSON = JSON.stringify(
  [
    { id: 101, name: "Alice Smith", department: "Engineering", active: true },
    { id: 102, name: "Bob Johnson", department: "Product", active: true },
    { id: 103, name: "Charlie Davis", department: "Design", active: false },
  ],
  null,
  2
);

export function CsvJsonTool() {
  const session = useToolSession("csv-to-json");
  const [direction, setDirection] = useState<"csv2json" | "json2csv">("csv2json");
  const [input, setInput] = useState("");
  const [delimiter, setDelimiter] = useState<CsvDelimiter>("auto");
  const [firstRowHeader, setFirstRowHeader] = useState(true);
  const [parseTypes, setParseTypes] = useState(true);
  const [copied, setCopied] = useState(false);
  const inputId = useId();

  const result: CsvJsonResult | null = input.trim()
    ? direction === "csv2json"
      ? csvToJson(input, { delimiter, firstRowHeader, parseTypes })
      : jsonToCsv(input, { delimiter: delimiter === "auto" ? "," : delimiter })
    : null;

  async function handleCopy() {
    if (!result || !result.ok) return;
    try {
      await navigator.clipboard.writeText(result.result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback
    }
  }

  function handleDownload() {
    if (!result || !result.ok) return;
    const blob = new Blob([result.result], {
      type: direction === "csv2json" ? "application/json" : "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = direction === "csv2json" ? "data.json" : "data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function handleSample() {
    setInput(direction === "csv2json" ? SAMPLE_CSV : SAMPLE_JSON);
    session.markInput();
  }

  function handlePaste() {
    navigator.clipboard
      ?.readText()
      .then((text) => {
        setInput(text);
        session.markInput();
      })
      .catch(() => {});
  }

  function handleClear() {
    setInput("");
    setCopied(false);
  }

  function handleSwapDirection() {
    const newDir = direction === "csv2json" ? "json2csv" : "csv2json";
    setDirection(newDir);
    if (result && result.ok) {
      setInput(result.result);
    } else {
      setInput("");
    }
    session.markInput();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* ── Mode & Settings Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-surface p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex rounded-lg bg-canvas p-1 border border-line">
            <button
              type="button"
              onClick={() => {
                setDirection("csv2json");
                session.markInput();
              }}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                direction === "csv2json" ? "bg-action text-paper shadow-sm" : "text-muted hover:text-ink"
              }`}
            >
              CSV to JSON
            </button>
            <button
              type="button"
              onClick={() => {
                setDirection("json2csv");
                session.markInput();
              }}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                direction === "json2csv" ? "bg-action text-paper shadow-sm" : "text-muted hover:text-ink"
              }`}
            >
              JSON to CSV
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-ink">
            <span className="text-muted">Delimiter:</span>
            <select
              value={delimiter}
              onChange={(e) => {
                setDelimiter(e.target.value as CsvDelimiter);
                session.markInput();
              }}
              className="field-control h-8 text-xs font-mono"
            >
              <option value="auto">Auto-detect</option>
              <option value=",">Comma (,)</option>
              <option value="&#9;">Tab (\t)</option>
              <option value=";">Semicolon (;)</option>
              <option value="|">Pipe (|)</option>
            </select>
          </div>

          {direction === "csv2json" && (
            <div className="flex items-center gap-3 text-xs text-muted">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={firstRowHeader}
                  onChange={(e) => {
                    setFirstRowHeader(e.target.checked);
                    session.markInput();
                  }}
                  className="rounded border-line"
                />
                First row is header
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={parseTypes}
                  onChange={(e) => {
                    setParseTypes(e.target.checked);
                    session.markInput();
                  }}
                  className="rounded border-line"
                />
                Parse numbers &amp; booleans
              </label>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={handleSample} className="btn btn-secondary text-xs">
            Load sample
          </button>
          <button type="button" onClick={handlePaste} className="btn btn-secondary text-xs">
            Paste
          </button>
          {input && (
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
              {direction === "csv2json" ? "CSV Input" : "JSON Input (Array of Objects)"}
            </label>
            <span className="text-[11px] text-faint">
              {direction === "csv2json" ? "RFC 4180 format" : "JSON Array"}
            </span>
          </div>
          <textarea
            id={inputId}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              session.markInput();
            }}
            placeholder={
              direction === "csv2json"
                ? "id,name,role\n1,Alice,Engineer\n2,Bob,Designer..."
                : '[{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]...'
            }
            rows={14}
            className="field-control mt-3 w-full font-mono text-xs leading-relaxed"
            spellCheck={false}
          />
        </div>

        {/* Right: Output Pane */}
        <div className="rounded-xl border border-line bg-surface p-4">
          <div className="flex items-center justify-between pb-2 border-b border-line">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              {direction === "csv2json" ? "Converted JSON" : "Converted CSV"}
              {result && result.ok && (
                <span className="ml-2 lowercase font-normal text-faint">
                  ({result.rowCount} rows, {result.columnCount} cols)
                </span>
              )}
            </span>
            {result?.ok && (
              <div className="flex items-center gap-2">
                <button type="button" onClick={handleCopy} className="btn btn-secondary text-xs">
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button type="button" onClick={handleDownload} className="btn btn-secondary text-xs">
                  Download
                </button>
              </div>
            )}
          </div>

          <div className="mt-3 min-h-[300px]">
            {!input.trim() ? (
              <div className="flex h-full min-h-[280px] items-center justify-center rounded-lg border border-dashed border-line p-6 text-center text-xs text-muted">
                Enter {direction === "csv2json" ? "CSV" : "JSON"} on the left to see the instant conversion result.
              </div>
            ) : result && !result.ok ? (
              <div className="rounded-lg border border-danger/20 bg-danger/5 p-4 text-xs text-danger" role="alert">
                <span className="font-semibold">Error: </span>
                {result.reason}
              </div>
            ) : result && result.ok ? (
              <pre className="overflow-x-auto rounded-lg bg-canvas p-3 font-mono text-xs text-ink leading-relaxed max-h-[360px] whitespace-pre-wrap break-all">
                <code>{result.result}</code>
              </pre>
            ) : null}
          </div>
        </div>
      </div>

      {result?.ok && (
        <div className="flex items-center justify-center pt-2">
          <button
            type="button"
            onClick={handleSwapDirection}
            className="btn btn-secondary text-xs flex items-center gap-1.5"
          >
            ⇅ Reverse Conversion ({direction === "csv2json" ? "Switch to JSON to CSV" : "Switch to CSV to JSON"})
          </button>
        </div>
      )}
    </div>
  );
}

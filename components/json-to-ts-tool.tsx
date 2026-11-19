"use client";

import { useId, useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import { jsonToTypeScript, type JsonToTsResult } from "@/lib/json-to-ts";

const SAMPLE_JSON = JSON.stringify(
  {
    id: 101,
    title: "Understanding Web Security",
    author: {
      id: 42,
      name: "Sarah Connor",
      email: "sarah@example.com",
    },
    tags: ["security", "web", "privacy"],
    published: true,
    views: 12500,
  },
  null,
  2
);

export function JsonToTsTool() {
  const session = useToolSession("json-to-typescript");
  const [jsonInput, setJsonInput] = useState("");
  const [rootName, setRootName] = useState("RootObject");
  const [useInterface, setUseInterface] = useState(true);
  const [copied, setCopied] = useState(false);
  const inputId = useId();
  const rootId = useId();

  const result: JsonToTsResult | null = jsonInput.trim()
    ? jsonToTypeScript(jsonInput, { rootName, useInterface })
    : null;

  async function handleCopy() {
    if (!result || !result.ok) return;
    try {
      await navigator.clipboard.writeText(result.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback
    }
  }

  function handleSample() {
    setJsonInput(SAMPLE_JSON);
    session.markInput();
  }

  function handlePaste() {
    navigator.clipboard
      ?.readText()
      .then((text) => {
        setJsonInput(text);
        session.markInput();
      })
      .catch(() => {});
  }

  function handleClear() {
    setJsonInput("");
    setCopied(false);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* ── Configuration Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-surface p-4">
        <div className="flex flex-wrap items-center gap-4">
          <label htmlFor={rootId} className="flex items-center gap-2 text-xs font-medium text-ink">
            Root Name:
            <input
              id={rootId}
              type="text"
              value={rootName}
              onChange={(e) => {
                setRootName(e.target.value);
                session.markInput();
              }}
              className="field-control h-8 w-36 font-mono text-xs"
              placeholder="RootObject"
            />
          </label>

          <div className="flex items-center gap-2 text-xs font-medium text-muted">
            <span className="text-ink">Format:</span>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="ts-keyword"
                checked={useInterface}
                onChange={() => {
                  setUseInterface(true);
                  session.markInput();
                }}
                className="text-action"
              />
              interface
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="ts-keyword"
                checked={!useInterface}
                onChange={() => {
                  setUseInterface(false);
                  session.markInput();
                }}
                className="text-action"
              />
              type alias
            </label>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={handleSample} className="btn btn-secondary text-xs">
            Load sample
          </button>
          <button type="button" onClick={handlePaste} className="btn btn-secondary text-xs">
            Paste
          </button>
          {jsonInput && (
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
              JSON Input
            </label>
            <span className="text-[11px] text-faint">Paste raw JSON</span>
          </div>
          <textarea
            id={inputId}
            value={jsonInput}
            onChange={(e) => {
              setJsonInput(e.target.value);
              session.markInput();
            }}
            placeholder='Paste JSON here (e.g. {"name": "Alice", "age": 30})...'
            rows={14}
            className="field-control mt-3 w-full font-mono text-xs leading-relaxed"
            spellCheck={false}
          />
        </div>

        {/* Right: Output Pane */}
        <div className="rounded-xl border border-line bg-surface p-4">
          <div className="flex items-center justify-between pb-2 border-b border-line">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              TypeScript Interfaces
            </span>
            {result?.ok && (
              <button type="button" onClick={handleCopy} className="btn btn-secondary text-xs">
                {copied ? "Copied!" : "Copy Code"}
              </button>
            )}
          </div>

          <div className="mt-3 min-h-[300px]">
            {!jsonInput.trim() ? (
              <div className="flex h-full min-h-[280px] items-center justify-center rounded-lg border border-dashed border-line p-6 text-center text-xs text-muted">
                Enter JSON on the left to see inferred TypeScript types generated in real time.
              </div>
            ) : result && !result.ok ? (
              <div className="rounded-lg border border-danger/20 bg-danger/5 p-4 text-xs text-danger" role="alert">
                <span className="font-semibold">Error: </span>
                {result.reason}
              </div>
            ) : result && result.ok ? (
              <pre className="overflow-x-auto rounded-lg bg-canvas p-3 font-mono text-xs text-ink leading-relaxed max-h-[360px]">
                <code>{result.code}</code>
              </pre>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

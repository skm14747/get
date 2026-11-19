"use client";

import { useId, useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import {
  decodeFullUrl,
  decodeUrlComponent,
  encodeFullUrl,
  encodeUrlComponent,
  formatQueryParams,
  parseQueryParams,
  type QueryParamPair,
  type UrlEncodeMode,
} from "@/lib/url-encode";

const SAMPLE_TEXT = "https://api.example.com/search?query=web tools & privacy=100%&tags=free,browser";

export function UrlTool() {
  const session = useToolSession("url-encoder");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<UrlEncodeMode>("component");
  const [spaceAsPlus, setSpaceAsPlus] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [queryParams, setQueryParams] = useState<QueryParamPair[]>([]);
  const inputId = useId();

  function handleEncode(source: string = input) {
    setError(null);
    if (!source) {
      setOutput("");
      return;
    }
    if (mode === "full-url") {
      setOutput(encodeFullUrl(source));
    } else {
      setOutput(encodeUrlComponent(source, spaceAsPlus));
    }
    session.markInput();
  }

  function handleDecode(source: string = input) {
    setError(null);
    if (!source) {
      setOutput("");
      return;
    }
    const res = mode === "full-url" ? decodeFullUrl(source) : decodeUrlComponent(source);
    if (res.ok) {
      setOutput(res.result);
    } else {
      setError(res.reason);
    }
    session.markInput();
  }

  function handleSwap() {
    if (!output) return;
    setInput(output);
    setOutput(input);
    setError(null);
    session.markInput();
  }

  function handleLoadSample() {
    setInput(SAMPLE_TEXT);
    setError(null);
    if (mode === "query-params") {
      setQueryParams(parseQueryParams(SAMPLE_TEXT));
    } else {
      handleEncode(SAMPLE_TEXT);
    }
    session.markInput();
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setError(null);
    setQueryParams([]);
  }

  async function handleCopy() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback
    }
  }

  function handleModeChange(newMode: UrlEncodeMode) {
    setMode(newMode);
    setError(null);
    if (newMode === "query-params") {
      setQueryParams(parseQueryParams(input));
    }
  }

  function handleParamChange(index: number, field: "key" | "value", val: string) {
    const updated = [...queryParams];
    if (updated[index]) {
      updated[index][field] = val;
      setQueryParams(updated);
      const formatted = formatQueryParams(updated);
      setOutput(formatted);
      session.markInput();
    }
  }

  function handleAddParam() {
    setQueryParams([...queryParams, { key: "", value: "" }]);
  }

  function handleRemoveParam(index: number) {
    const updated = queryParams.filter((_, i) => i !== index);
    setQueryParams(updated);
    setOutput(formatQueryParams(updated));
    session.markInput();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* ── Mode Selector Tabs ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <div className="flex rounded-lg bg-surface p-1 border border-line">
          <button
            type="button"
            onClick={() => handleModeChange("component")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              mode === "component" ? "bg-action text-paper shadow-sm" : "text-muted hover:text-ink"
            }`}
          >
            URL Component (Parameters)
          </button>
          <button
            type="button"
            onClick={() => handleModeChange("full-url")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              mode === "full-url" ? "bg-action text-paper shadow-sm" : "text-muted hover:text-ink"
            }`}
          >
            Full URL
          </button>
          <button
            type="button"
            onClick={() => handleModeChange("query-params")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              mode === "query-params" ? "bg-action text-paper shadow-sm" : "text-muted hover:text-ink"
            }`}
          >
            Query Params Table
          </button>
        </div>

        <div className="flex items-center gap-2">
          {mode === "component" && (
            <label className="flex items-center gap-1.5 text-xs text-muted cursor-pointer">
              <input
                type="checkbox"
                checked={spaceAsPlus}
                onChange={(e) => {
                  setSpaceAsPlus(e.target.checked);
                  if (input) handleEncode(input);
                }}
                className="rounded border-line"
              />
              Encode space as +
            </label>
          )}
          <button type="button" onClick={handleLoadSample} className="btn btn-secondary text-xs">
            Load sample
          </button>
          {(input || output || queryParams.length > 0) && (
            <button type="button" onClick={handleClear} className="btn btn-secondary text-xs">
              Clear
            </button>
          )}
        </div>
      </div>

      {mode !== "query-params" ? (
        <>
          {/* ── Input Box ── */}
          <div className="rounded-xl border border-line bg-surface p-4">
            <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-muted">
              Input Text or URL
            </label>
            <textarea
              id={inputId}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                session.markInput();
              }}
              placeholder={
                mode === "full-url"
                  ? "Enter full URL (e.g. https://example.com/search?q=hello world)..."
                  : "Enter string or parameters to encode or decode..."
              }
              rows={4}
              className="field-control mt-2 w-full font-mono text-xs leading-relaxed"
              spellCheck={false}
            />

            {/* Action Bar */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleEncode()}
                disabled={!input.trim()}
                className="btn btn-primary text-xs"
              >
                Encode URL
              </button>
              <button
                type="button"
                onClick={() => handleDecode()}
                disabled={!input.trim()}
                className="btn btn-secondary text-xs"
              >
                Decode URL
              </button>
              {output && (
                <button type="button" onClick={handleSwap} className="btn btn-secondary text-xs">
                  ⇅ Swap input & output
                </button>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-xl border border-danger/20 bg-danger/5 p-4 text-sm text-danger" role="alert">
              <span className="font-semibold">Error: </span>
              {error}
            </div>
          )}

          {/* ── Output Box ── */}
          {output && (
            <div className="rounded-xl border border-line bg-surface p-4" aria-live="polite">
              <div className="flex items-center justify-between pb-2 border-b border-line">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Result
                </span>
                <button type="button" onClick={handleCopy} className="btn btn-secondary text-xs">
                  {copied ? "Copied!" : "Copy Result"}
                </button>
              </div>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-canvas p-3 font-mono text-xs text-ink leading-relaxed break-all whitespace-pre-wrap">
                <code>{output}</code>
              </pre>
            </div>
          )}
        </>
      ) : (
        /* ── Query Parameter Table Mode ── */
        <div className="space-y-4">
          <div className="rounded-xl border border-line bg-surface p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-ink">Query Parameters</h2>
              <button type="button" onClick={handleAddParam} className="btn btn-secondary text-xs">
                + Add parameter
              </button>
            </div>

            {queryParams.length === 0 ? (
              <p className="text-xs text-muted py-4 text-center">
                No parameters loaded. Click &quot;Load sample&quot; or &quot;+ Add parameter&quot; to build a query string.
              </p>
            ) : (
              <div className="space-y-2">
                {queryParams.map((param, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={param.key}
                      onChange={(e) => handleParamChange(idx, "key", e.target.value)}
                      placeholder="Parameter key"
                      className="field-control flex-1 text-xs font-mono"
                    />
                    <span className="text-muted">=</span>
                    <input
                      type="text"
                      value={param.value}
                      onChange={(e) => handleParamChange(idx, "value", e.target.value)}
                      placeholder="Parameter value"
                      className="field-control flex-1 text-xs font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveParam(idx)}
                      className="text-xs text-muted hover:text-danger px-2 py-1"
                      title="Remove row"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {output && (
            <div className="rounded-xl border border-line bg-surface p-4">
              <div className="flex items-center justify-between pb-2 border-b border-line">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Compiled Query String
                </span>
                <button type="button" onClick={handleCopy} className="btn btn-secondary text-xs">
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-canvas p-3 font-mono text-xs text-ink leading-relaxed break-all whitespace-pre-wrap">
                <code>?{output}</code>
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import { formatJson } from "@/lib/json-format";

export function JsonTool() {
  const { markClear, markCopy, markError, markInput, markSuccess } = useToolSession("json-formatter");
  const [text, setText] = useState("");
  const [indent, setIndent] = useState("2");
  const [notice, setNotice] = useState("");
  const space = indent === "minify" ? null : Number(indent);
  const result = useMemo(() => (text.trim() === "" ? null : formatJson(text, space)), [space, text]);
  useEffect(() => {
    if (result?.ok) markSuccess(indent);
    else if (result && result.reason !== "empty") markError(result.reason);
  }, [indent, markError, markSuccess, result]);

  async function copy() {
    if (!result?.ok) return;
    await navigator.clipboard.writeText(result.value);
    setNotice("Formatted JSON copied.");
    markCopy("json");
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* ── Controls ── */}
      <div className="lg:col-span-2">
        <label className="text-sm font-medium">
          Indentation
          <select className="field-control ms-2 inline-block w-auto" value={indent} onChange={(e) => setIndent(e.target.value)}>
            <option value="2">2 spaces</option>
            <option value="4">4 spaces</option>
            <option value="minify">Minify</option>
          </select>
        </label>
      </div>

      {/* ── Input ── */}
      <label className="text-sm font-medium">
        JSON
        <textarea className="field-control mt-1 min-h-56 font-mono text-sm" value={text} spellCheck={false} onChange={(e) => { setText(e.target.value); markInput(); }} />
      </label>

      {/* ── Output ── */}
      <div>
        <p className="text-sm font-medium">Formatted output</p>
        {result?.ok ? (
          <pre className="mt-1 min-h-56 overflow-auto rounded-lg border border-line bg-canvas p-3 font-mono text-sm">{result.value}</pre>
        ) : result && !result.ok ? (
          <div className="mt-1 flex min-h-56 flex-col justify-center rounded-lg border border-danger bg-red-50 p-4">
            <p role="alert" className="text-sm text-danger">{result.message}</p>
          </div>
        ) : (
          <div className="mt-1 flex min-h-56 items-center justify-center rounded-lg border border-dashed border-line p-3">
            <p className="text-sm text-muted">A formatted result appears after valid JSON is entered. The text is parsed, not executed.</p>
          </div>
        )}
      </div>

      {/* ── Actions ── */}
      <div className="flex flex-wrap gap-2 lg:col-span-2">
        <button type="button" className="btn btn-primary" onClick={() => void copy()} disabled={!result?.ok}>Copy result</button>
        <button type="button" className="btn btn-secondary" onClick={() => { setText(""); setNotice(""); markClear(); }}>Clear</button>
        {notice ? <p role="status" className="self-center text-sm text-muted">{notice}</p> : null}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import { decodeUtf8, encodeUtf8 } from "@/lib/base64";

export function Base64Tool() {
  const session = useToolSession("base64");
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const result = text.trim() === "" ? null : mode === "encode" ? encodeUtf8(text) : decodeUtf8(text);

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {/* ── Controls ── */}
      <div className="lg:col-span-2">
        <fieldset>
          <legend className="sr-only">Direction</legend>
          <div className="flex gap-1.5">
            {(["encode", "decode"] as const).map((item) => (
              <label key={item} className={`flex min-h-9 cursor-pointer items-center rounded-md border px-4 text-[0.8125rem] font-medium transition-colors ${mode === item ? "border-action bg-action-soft text-action" : "border-line text-muted hover:border-line-strong"}`}>
                <input type="radio" className="sr-only" checked={mode === item} onChange={() => setMode(item)} />
                {item === "encode" ? "Encode" : "Decode"}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* ── Input ── */}
      <label className="text-sm font-medium">
        {mode === "encode" ? "Plain text" : "Base64 string"}
        <textarea className="field-control mt-1 min-h-36 font-mono text-sm" value={text} onChange={(e) => { setText(e.target.value); session.markInput(); }} spellCheck={false} />
      </label>

      {/* ── Output ── */}
      <div>
        <p className="text-sm font-medium">{mode === "encode" ? "Base64 output" : "Decoded text"}</p>
        {result?.ok ? (
          <pre className="mt-1 min-h-36 overflow-auto rounded-lg border border-line bg-canvas p-3 font-mono text-sm">{result.value}</pre>
        ) : result && !result.ok ? (
          <p role="alert" className="mt-2 text-sm text-danger">That value is not valid Base64 UTF-8.</p>
        ) : (
          <div className="mt-1 flex min-h-36 items-center justify-center rounded-lg border border-dashed border-line p-3">
            <p className="text-sm text-muted">Output appears here.</p>
          </div>
        )}
      </div>

      {/* ── Actions ── */}
      <div className="lg:col-span-2">
        <button type="button" className="btn btn-primary" disabled={!result?.ok} onClick={() => { if (result?.ok) { void navigator.clipboard.writeText(result.value); session.markCopy(mode); session.markSuccess(mode); } }}>
          Copy result
        </button>
      </div>
    </div>
  );
}

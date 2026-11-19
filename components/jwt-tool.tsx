"use client";

import { useId, useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import { decodeJwt, type JwtDecodeResult } from "@/lib/jwt";

const SAMPLE_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggSm9obnNvbiIsImFkbWluIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTgwMDAwMDAwMH0.signature_verification_demo";

export function JwtTool() {
  const session = useToolSession("jwt-decoder");
  const [token, setToken] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const inputId = useId();

  const result: JwtDecodeResult | null = token.trim() ? decodeJwt(token) : null;

  async function handleCopy(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard fallback
    }
  }

  function handlePaste() {
    navigator.clipboard
      ?.readText()
      .then((text) => {
        setToken(text);
        session.markInput();
      })
      .catch(() => {});
  }

  function handleSample() {
    setToken(SAMPLE_JWT);
    session.markInput();
  }

  function handleClear() {
    setToken("");
    setCopied(null);
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* ── Input Box ── */}
      <div className="rounded-xl border border-line bg-surface p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label htmlFor={inputId} className="text-sm font-semibold text-ink">
            Encoded JWT Token
          </label>
          <div className="flex items-center gap-2">
            <button type="button" onClick={handleSample} className="btn btn-secondary text-xs">
              Load sample
            </button>
            <button type="button" onClick={handlePaste} className="btn btn-secondary text-xs">
              Paste
            </button>
            {token && (
              <button type="button" onClick={handleClear} className="btn btn-secondary text-xs">
                Clear
              </button>
            )}
          </div>
        </div>

        <textarea
          id={inputId}
          value={token}
          onChange={(e) => {
            setToken(e.target.value);
            session.markInput();
          }}
          placeholder="Paste your encoded JWT (header.payload.signature) here..."
          rows={5}
          className="field-control mt-3 w-full font-mono text-xs leading-relaxed"
          spellCheck={false}
        />
        <p className="mt-2 text-xs text-muted">
          Your token is parsed entirely in your browser using local decoding. No bearer credentials are ever uploaded or sent across the network.
        </p>
      </div>

      {/* ── Output / Status Area ── */}
      {result && (
        <div aria-live="polite" className="space-y-6">
          {!result.ok ? (
            <div className="rounded-xl border border-danger/20 bg-danger/5 p-4 text-sm text-danger">
              <span className="font-semibold">Decoding Error: </span>
              {result.reason}
            </div>
          ) : (
            <>
              {/* Claims Summary Cards */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-line bg-surface p-3.5">
                  <span className="text-xs font-medium text-muted">Algorithm</span>
                  <p className="mt-1 font-mono text-sm font-semibold text-ink">{result.algorithm}</p>
                </div>
                <div className="rounded-lg border border-line bg-surface p-3.5">
                  <span className="text-xs font-medium text-muted">Token Status</span>
                  <p className="mt-1 text-sm font-semibold">
                    {result.isExpired === null ? (
                      <span className="text-muted">No Expiration Claim</span>
                    ) : result.isExpired ? (
                      <span className="text-danger">● Expired</span>
                    ) : (
                      <span className="text-emerald-600 dark:text-emerald-400">● Active</span>
                    )}
                  </p>
                </div>
                {result.claims
                  .filter((c) => c.key === "exp" || c.key === "iat")
                  .map((claim) => (
                    <div key={claim.key} className="rounded-lg border border-line bg-surface p-3.5">
                      <span className="text-xs font-medium text-muted">{claim.label}</span>
                      <p className="mt-1 font-mono text-xs text-ink truncate" title={claim.value}>
                        {claim.value}
                      </p>
                    </div>
                  ))}
              </div>

              {/* Header & Payload Panes */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Header Pane */}
                <div className="rounded-xl border border-line bg-surface p-4">
                  <div className="flex items-center justify-between pb-3 border-b border-line">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                      Header (Algorithm & Type)
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(result.rawHeader, "header")}
                      className="btn btn-secondary text-xs"
                    >
                      {copied === "header" ? "Copied!" : "Copy Header"}
                    </button>
                  </div>
                  <pre className="mt-3 overflow-x-auto rounded-lg bg-canvas p-3 font-mono text-xs text-ink leading-relaxed">
                    <code>{result.rawHeader}</code>
                  </pre>
                </div>

                {/* Payload Pane */}
                <div className="rounded-xl border border-line bg-surface p-4">
                  <div className="flex items-center justify-between pb-3 border-b border-line">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                      Payload (Claims & Data)
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(result.rawPayload, "payload")}
                      className="btn btn-secondary text-xs"
                    >
                      {copied === "payload" ? "Copied!" : "Copy Payload"}
                    </button>
                  </div>
                  <pre className="mt-3 overflow-x-auto rounded-lg bg-canvas p-3 font-mono text-xs text-ink leading-relaxed">
                    <code>{result.rawPayload}</code>
                  </pre>
                </div>
              </div>

              {/* Signature Info */}
              <div className="rounded-xl border border-line bg-surface p-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Signature
                </span>
                <p className="mt-2 font-mono text-xs text-muted break-all">
                  {result.signature || "(No signature)"}
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

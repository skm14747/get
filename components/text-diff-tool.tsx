"use client";

import { useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import { computeDiff, type DiffMode } from "@/lib/text-diff";

export function TextDiffTool() {
  const session = useToolSession("text-compare");
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [mode, setMode] = useState<DiffMode>("lines");

  const result = computeDiff(original, modified, mode);

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-[0.8125rem] leading-relaxed text-muted">
        Compare two text blocks in-browser. Additions and deletions are computed locally using an in-memory diff algorithm. Your documents are never uploaded to any server.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-ink">
          Original text
          <textarea
            className="field-control mt-1 min-h-[140px] font-mono text-xs resize-y"
            placeholder="Paste original text here..."
            value={original}
            onChange={(e) => {
              setOriginal(e.target.value);
              session.markInput();
            }}
          />
        </label>
        <label className="text-sm font-medium text-ink">
          Modified text
          <textarea
            className="field-control mt-1 min-h-[140px] font-mono text-xs resize-y"
            placeholder="Paste modified text here..."
            value={modified}
            onChange={(e) => {
              setModified(e.target.value);
              session.markInput();
            }}
          />
        </label>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-ink">Diff Mode:</span>
          <button
            type="button"
            className={`min-h-11 rounded-md px-3 text-xs font-medium transition-colors ${
              mode === "lines"
                ? "bg-ink text-paper"
                : "border border-line bg-surface text-muted hover:text-ink"
            }`}
            onClick={() => setMode("lines")}
          >
            Line-by-line
          </button>
          <button
            type="button"
            className={`min-h-11 rounded-md px-3 text-xs font-medium transition-colors ${
              mode === "words"
                ? "bg-ink text-paper"
                : "border border-line bg-surface text-muted hover:text-ink"
            }`}
            onClick={() => setMode("words")}
          >
            Word-by-word
          </button>
        </div>

        {result.ok && !result.isIdentical ? (
          <div className="flex gap-3 text-xs font-medium">
            <span className="text-accent">+{result.additionsCount} additions</span>
            <span className="text-danger">−{result.deletionsCount} deletions</span>
          </div>
        ) : null}
      </div>

      <div aria-live="polite" className="mt-5 rounded-lg bg-canvas p-5">
        {result.ok ? (
          result.isIdentical ? (
            <p className="text-sm font-medium text-muted">
              The two text blocks are completely identical. No differences found.
            </p>
          ) : (
            <div className="overflow-x-auto rounded border border-line bg-surface p-4 font-mono text-xs leading-relaxed">
              {result.changes.map((chunk, index) => {
                if (chunk.type === "added") {
                  return (
                    <span
                      key={index}
                      className="bg-accent/15 text-accent font-semibold px-0.5 rounded"
                    >
                      {chunk.value}
                    </span>
                  );
                }
                if (chunk.type === "removed") {
                  return (
                    <span
                      key={index}
                      className="bg-danger/15 text-danger line-through px-0.5 rounded"
                    >
                      {chunk.value}
                    </span>
                  );
                }
                return <span key={index} className="text-ink">{chunk.value}</span>;
              })}
            </div>
          )
        ) : (
          <p className="text-sm text-muted">
            Paste text into both boxes to view additions, deletions, and inline modifications.
          </p>
        )}
      </div>
    </div>
  );
}

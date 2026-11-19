"use client";

import { useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import { cleanTextLines } from "@/lib/text-cleaner";

export function TextCleanerTool() {
  const session = useToolSession("remove-duplicate-lines");
  const [input, setInput] = useState("");
  const [removeDuplicates, setRemoveDuplicates] = useState(true);
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [trimLines, setTrimLines] = useState(true);
  const [removeBlankLines, setRemoveBlankLines] = useState(true);
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");
  const [copied, setCopied] = useState(false);

  const result = cleanTextLines(input, {
    removeDuplicates,
    caseSensitive,
    trimLines,
    removeBlankLines,
    sortOrder,
  });

  async function handleCopy() {
    if (result.ok) {
      await navigator.clipboard.writeText(result.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-[0.8125rem] leading-relaxed text-muted">
        Clean, deduplicate, and sort lists of text or URLs in your browser. All processing executes locally in memory.
      </p>

      <div className="mt-4">
        <label className="text-sm font-medium text-ink">
          Text or list input
          <textarea
            className="field-control mt-1 min-h-[160px] font-mono text-xs resize-y"
            placeholder="Paste lines of text, email lists, keywords, or data rows here..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              session.markInput();
            }}
          />
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="flex items-center gap-2 text-sm text-ink cursor-pointer">
          <input
            type="checkbox"
            checked={removeDuplicates}
            onChange={(e) => setRemoveDuplicates(e.target.checked)}
          />
          Remove duplicate lines
        </label>
        <label className="flex items-center gap-2 text-sm text-ink cursor-pointer">
          <input
            type="checkbox"
            checked={caseSensitive}
            disabled={!removeDuplicates}
            onChange={(e) => setCaseSensitive(e.target.checked)}
          />
          Case-sensitive deduplication
        </label>
        <label className="flex items-center gap-2 text-sm text-ink cursor-pointer">
          <input
            type="checkbox"
            checked={trimLines}
            onChange={(e) => setTrimLines(e.target.checked)}
          />
          Trim whitespace around lines
        </label>
        <label className="flex items-center gap-2 text-sm text-ink cursor-pointer">
          <input
            type="checkbox"
            checked={removeBlankLines}
            onChange={(e) => setRemoveBlankLines(e.target.checked)}
          />
          Remove empty blank lines
        </label>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span className="text-sm font-medium text-ink">Sort order:</span>
        <select
          className="field-control w-auto text-sm"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "none" | "asc" | "desc")}
        >
          <option value="none">Preserve original order</option>
          <option value="asc">Alphabetical (A to Z)</option>
          <option value="desc">Alphabetical (Z to A)</option>
        </select>
      </div>

      <div aria-live="polite" className="mt-5 rounded-lg bg-canvas p-5">
        {result.ok ? (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
              <div className="flex gap-4 text-xs font-medium text-muted">
                <span>Original: {result.originalLineCount} lines</span>
                <span>Cleaned: {result.cleanedLineCount} lines</span>
                {result.duplicatesRemoved > 0 ? (
                  <span className="text-accent">−{result.duplicatesRemoved} duplicates</span>
                ) : null}
              </div>
              <button
                type="button"
                className="min-h-11 rounded-md border border-line bg-surface px-4 text-xs font-medium text-ink hover:bg-canvas transition-colors"
                onClick={handleCopy}
              >
                {copied ? "Copied!" : "Copy cleaned text"}
              </button>
            </div>
            <textarea
              readOnly
              className="field-control mt-3 min-h-[160px] font-mono text-xs bg-surface"
              value={result.text}
            />
          </div>
        ) : (
          <p className="text-sm text-muted">
            Paste text above to remove duplicates, trim spaces, and sort lines in real time.
          </p>
        )}
      </div>
    </div>
  );
}

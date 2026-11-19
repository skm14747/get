"use client";

import { useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import { generateSlug } from "@/lib/slug";

export function SlugTool() {
  const session = useToolSession("slug-generator");
  const [input, setInput] = useState("");
  const [delimiter, setDelimiter] = useState<"-" | "_">("-");
  const [lowercase, setLowercase] = useState(true);
  const [stripAccents, setStripAccents] = useState(true);
  const [copied, setCopied] = useState(false);

  const result = generateSlug(input, { delimiter, lowercase, stripAccents });

  async function handleCopy() {
    if (result.ok) {
      await navigator.clipboard.writeText(result.slug);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <p className="text-[0.8125rem] leading-relaxed text-muted">
        Generate URL-safe slugs with Unicode normalization. Accents and diacritics are converted to plain Latin characters while preserving multilingual script text.
      </p>

      <div className="mt-4">
        <label className="text-sm font-medium text-ink">
          Source text
          <textarea
            className="field-control mt-1 min-h-[100px] resize-y"
            placeholder="e.g. Café au Lait & Crème Brûlée — 2026 Guide!"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              session.markInput();
            }}
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-ink">Delimiter:</span>
          <button
            type="button"
            className={`min-h-11 rounded-md px-3 text-xs font-medium transition-colors ${
              delimiter === "-"
                ? "bg-ink text-paper"
                : "border border-line bg-surface text-muted hover:text-ink"
            }`}
            onClick={() => setDelimiter("-")}
          >
            Hyphen (-)
          </button>
          <button
            type="button"
            className={`min-h-11 rounded-md px-3 text-xs font-medium transition-colors ${
              delimiter === "_"
                ? "bg-ink text-paper"
                : "border border-line bg-surface text-muted hover:text-ink"
            }`}
            onClick={() => setDelimiter("_")}
          >
            Underscore (_)
          </button>
        </div>

        <label className="flex items-center gap-2 text-sm text-ink cursor-pointer">
          <input
            type="checkbox"
            checked={lowercase}
            onChange={(e) => setLowercase(e.target.checked)}
          />
          Lowercase
        </label>

        <label className="flex items-center gap-2 text-sm text-ink cursor-pointer">
          <input
            type="checkbox"
            checked={stripAccents}
            onChange={(e) => setStripAccents(e.target.checked)}
          />
          Strip accents (é → e)
        </label>
      </div>

      <div aria-live="polite" className="mt-5 rounded-lg bg-canvas p-5">
        {result.ok ? (
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-faint">Generated Slug</span>
              <button
                type="button"
                className="min-h-11 rounded-md border border-line bg-surface px-3 text-xs font-medium text-ink hover:bg-canvas transition-colors"
                onClick={handleCopy}
              >
                {copied ? "Copied!" : "Copy slug"}
              </button>
            </div>
            <p className="mt-2 break-all font-mono text-lg font-medium text-ink select-all">
              {result.slug}
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted">
            Type or paste text above to generate a URL-safe slug in real time.
          </p>
        )}
      </div>
    </div>
  );
}

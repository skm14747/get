"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import {
  countWords,
  estimateTokenCount,
  findExpensiveWords,
  findFrequentTokens,
  loadEncoder,
  MODEL_OPTIONS,
  tokenizeOpenAI,
  TOKEN_COLORS,
  type ModelOption,
  type TokenizeResult,
} from "@/lib/tokenizer";

const DEBOUNCE_MS = 500;

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export function TokenizerTool() {
  const selectId = useId();
  const textareaId = useId();

  const [text, setText] = useState("");
  const [selectedModel, setSelectedModel] = useState<ModelOption>(MODEL_OPTIONS[0]);
  const [viewMode, setViewMode] = useState<"text" | "ids">("text");

  const debouncedText = useDebounce(text, DEBOUNCE_MS);

  // Lazy-load encoder for OpenAI models
  const [encoderReady, setEncoderReady] = useState(false);
  useEffect(() => {
    if (selectedModel.provider !== "openai" || !selectedModel.encoding) return;
    setEncoderReady(false);
    loadEncoder(selectedModel.encoding).then(() => setEncoderReady(true));
  }, [selectedModel]);

  // Client-side OpenAI tokenization
  const clientResult = useMemo<TokenizeResult | null>(() => {
    if (selectedModel.provider !== "openai" || !selectedModel.encoding || !debouncedText || !encoderReady) {
      return null;
    }
    return tokenizeOpenAI(debouncedText, selectedModel.encoding);
  }, [debouncedText, selectedModel, encoderReady]);

  // Estimated token count for non-OpenAI models
  const estimatedCount = useMemo(() => {
    if (selectedModel.provider === "openai" || !selectedModel.charsPerToken || !debouncedText) {
      return null;
    }
    return estimateTokenCount(debouncedText, selectedModel.charsPerToken);
  }, [debouncedText, selectedModel]);

  // Unified counts
  const tokenCount = selectedModel.provider === "openai" ? (clientResult?.count ?? 0) : (estimatedCount ?? 0);
  const wordCount = useMemo(() => countWords(text), [text]);
  const charCount = text.length;

  // Expensive words (OpenAI only)
  const expensiveWords = useMemo(() => {
    if (!selectedModel.encoding || !debouncedText || !encoderReady) return [];
    return findExpensiveWords(debouncedText, selectedModel.encoding);
  }, [debouncedText, selectedModel.encoding, encoderReady]);

  // Frequent tokens (OpenAI only)
  const frequentTokens = useMemo(() => {
    if (clientResult && clientResult.count > 0) {
      return findFrequentTokens(
        clientResult.tokenIds,
        (id) => clientResult.tokens[clientResult.tokenIds.indexOf(id)] ?? String(id),
      );
    }
    return [];
  }, [clientResult]);

  // Analytics
  const started = useRef(false);
  const completed = useRef(false);

  useEffect(() => {
    track("tool_view", { tool_id: "tokenizer" });
  }, []);

  useEffect(() => {
    if (!text.trim()) return;
    if (!started.current) {
      started.current = true;
      track("tool_input_started", { tool_id: "tokenizer" });
    }
    if (!completed.current && tokenCount > 0) {
      completed.current = true;
      track("tool_completed", { tool_id: "tokenizer", operation: "tokenize" });
    }
  }, [text, tokenCount]);

  function handleModelChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const model = MODEL_OPTIONS.find((m) => m.value === e.target.value);
    if (model) {
      setSelectedModel(model);
      setViewMode("text");
      started.current = false;
      completed.current = false;
    }
  }

  function clear() {
    setText("");
    started.current = false;
    completed.current = false;
    track("clear_input", { tool_id: "tokenizer" });
  }

  const hasInput = text.trim().length > 0;
  const isLoading = selectedModel.provider === "openai" && !encoderReady && hasInput;
  const isStale = text !== debouncedText;
  const isEstimate = selectedModel.provider !== "openai";

  return (
    <div className="grid gap-5">
      {/* Model selector */}
      <div className="flex flex-wrap items-center gap-3">
        <label htmlFor={selectId} className="text-sm font-medium">
          Model:
        </label>
        <select
          id={selectId}
          value={selectedModel.value}
          onChange={handleModelChange}
          className="field-control w-auto min-w-[16rem]"
        >
          {MODEL_OPTIONS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      {/* Text + tokenized output */}
      <div className={`grid gap-5 ${selectedModel.decodable ? "lg:grid-cols-2" : ""}`}>
        {/* Input */}
        <div>
          <div className="flex items-center justify-between gap-2">
            <label htmlFor={textareaId} className="text-sm font-medium">
              Text:
            </label>
            <button type="button" className="btn btn-secondary" onClick={clear}>
              Clear
            </button>
          </div>
          <textarea
            id={textareaId}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={12}
            className="field-control mt-2"
            placeholder="Enter text to tokenize it"
            spellCheck={false}
          />
        </div>

        {/* Tokenized text (OpenAI only) */}
        {selectedModel.decodable && (
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium">Tokenized text:</span>
              <div className="flex rounded-md border border-line text-xs" role="radiogroup" aria-label="Token display mode">
                <button
                  type="button"
                  role="radio"
                  aria-checked={viewMode === "text"}
                  className={`rounded-l-md px-3 py-1.5 transition-colors ${viewMode === "text" ? "bg-accent text-white" : "bg-surface text-muted hover:text-ink"}`}
                  onClick={() => setViewMode("text")}
                >
                  Text
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={viewMode === "ids"}
                  className={`rounded-r-md border-l border-line px-3 py-1.5 transition-colors ${viewMode === "ids" ? "bg-accent text-white" : "bg-surface text-muted hover:text-ink"}`}
                  onClick={() => setViewMode("ids")}
                >
                  Token IDs
                </button>
              </div>
            </div>
            <div className="field-control mt-2 min-h-[19rem] overflow-auto whitespace-pre-wrap text-sm leading-7">
              {(isLoading || isStale) && hasInput && (
                <span className="text-muted animate-pulse">Loading tokenizer…</span>
              )}
              {!isLoading && !isStale && clientResult && viewMode === "text" &&
                clientResult.tokens.map((token, i) => (
                  <span
                    key={i}
                    className="tokenizer-token"
                    style={{ backgroundColor: TOKEN_COLORS[i % TOKEN_COLORS.length] }}
                    title={`ID: ${clientResult.tokenIds[i]}`}
                  >
                    {token}
                  </span>
                ))}
              {!isLoading && !isStale && clientResult && viewMode === "ids" && (
                <span className="text-muted tabular-nums">
                  {clientResult.tokenIds.join(", ")}
                </span>
              )}
              {!hasInput && (
                <span className="text-muted">Tokens appear when the text box has text.</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Counts bar */}
      <section aria-label="Token counts" className="flex flex-wrap gap-6 rounded-lg bg-canvas px-5 py-4">
        <div>
          {isLoading || isStale ? (
            <p className="text-lg font-medium text-muted animate-pulse">…</p>
          ) : (
            <p className="text-lg font-medium tabular-nums text-ink">
              {isEstimate && hasInput ? "~\u2009" : ""}
              {tokenCount.toLocaleString("en-US")}
            </p>
          )}
          <p className="text-xs text-muted">Tokens{isEstimate ? " (estimate)" : ""}</p>
        </div>
        <div>
          <p className="text-lg font-medium tabular-nums text-ink">{wordCount.toLocaleString("en-US")}</p>
          <p className="text-xs text-muted">Words</p>
        </div>
        <div>
          <p className="text-lg font-medium tabular-nums text-ink">{charCount.toLocaleString("en-US")}</p>
          <p className="text-xs text-muted">Characters</p>
        </div>
      </section>

      {/* Estimate notice for non-OpenAI models */}
      {isEstimate && hasInput && !isStale && (
        <p className="text-[0.8125rem] text-muted">
          {selectedModel.label.split("(")[0].trim()} does not publish its tokenizer.
          This estimate uses ~{selectedModel.charsPerToken} characters per token for English text.
          Actual counts may vary by ±15% depending on language and content.
        </p>
      )}

      {/* Analytics tables (OpenAI only) */}
      {(expensiveWords.length > 0 || frequentTokens.length > 0) && hasInput && (
        <div className="grid gap-5 lg:grid-cols-2">
          {expensiveWords.length > 0 && (
            <section>
              <h2 className="text-sm font-medium">Top 5 most expensive words</h2>
              <div className="mt-2 overflow-hidden rounded-lg border border-line">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-line bg-surface">
                      <th className="px-4 py-2.5 text-left font-medium text-muted">Word</th>
                      <th className="px-4 py-2.5 text-right font-medium text-muted">Tokens</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expensiveWords.map((w) => (
                      <tr key={w.word} className="border-b border-line last:border-0">
                        <td className="px-4 py-2">
                          {w.tokens.map((t, i) => (
                            <span
                              key={i}
                              className="tokenizer-token"
                              style={{ backgroundColor: TOKEN_COLORS[i % TOKEN_COLORS.length] }}
                            >
                              {t}
                            </span>
                          ))}
                        </td>
                        <td className="px-4 py-2 text-right tabular-nums">{w.tokenCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {frequentTokens.length > 0 && (
            <section>
              <h2 className="text-sm font-medium">Top 5 most frequent tokens</h2>
              <div className="mt-2 overflow-hidden rounded-lg border border-line">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-line bg-surface">
                      <th className="px-4 py-2.5 text-left font-medium text-muted">Token</th>
                      <th className="px-4 py-2.5 text-right font-medium text-muted">ID</th>
                      <th className="px-4 py-2.5 text-right font-medium text-muted">Frequency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {frequentTokens.map((t) => (
                      <tr key={t.tokenId} className="border-b border-line last:border-0">
                        <td className="px-4 py-2">
                          <span
                            className="tokenizer-token"
                            style={{ backgroundColor: TOKEN_COLORS[t.tokenId % TOKEN_COLORS.length] }}
                          >
                            {t.text}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-right tabular-nums text-muted">{t.tokenId}</td>
                        <td className="px-4 py-2 text-right tabular-nums">{t.frequency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useId, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { CASE_OPTIONS, convertCase, type CaseName } from "@/lib/case-convert";

export function CaseConverterTool() {
  const inputId = useId();
  const [text, setText] = useState("");
  const [notice, setNotice] = useState("");
  const started = useRef(false);
  const completed = useRef(false);

  useEffect(() => { track("tool_view", { tool_id: "case-converter" }); }, []);

  useEffect(() => {
    if (text.trim() === "") return;
    if (!started.current) {
      started.current = true;
      track("tool_input_started", { tool_id: "case-converter" });
    }
    if (completed.current) return;
    const handle = window.setTimeout(() => {
      completed.current = true;
      track("tool_completed", { tool_id: "case-converter", operation: "all" });
    }, 700);
    return () => window.clearTimeout(handle);
  }, [text]);

  async function copy(name: CaseName, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setNotice(`${name} copied.`);
      track("copy_result", { tool_id: "case-converter", operation: name });
    } catch {
      setNotice("Clipboard writing was blocked.");
    }
  }

  function clear() {
    setText(""); setNotice("");
    started.current = false; completed.current = false;
    track("clear_input", { tool_id: "case-converter" });
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {/* ── Editor ── */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label htmlFor={inputId} className="text-sm font-medium">Text</label>
          <button type="button" className="btn btn-secondary" onClick={clear}>Clear</button>
        </div>
        <textarea id={inputId} value={text} onChange={(e) => { setText(e.target.value); setNotice(""); }} rows={6} className="field-control mt-2" placeholder="Type or paste text" />
        {notice ? <p role="status" className="mt-2 text-sm text-muted">{notice}</p> : null}
        {text.trim() && convertCase(text, "upper") === text && convertCase(text, "lower") === text ? (
          <p className="mt-2 text-[0.8125rem] text-muted">This text has no case distinction, so the conversions leave it unchanged. That includes Arabic, Hindi, and Japanese kana.</p>
        ) : null}
      </div>

      {/* ── Conversions ── */}
      <section aria-labelledby="cases-heading">
        <h2 id="cases-heading" className="text-sm font-medium">Converted text</h2>
        {text.length === 0 ? <p className="mt-2 text-sm text-muted">Each case appears here after you enter text.</p> : null}
        {([
          ["Writing", CASE_OPTIONS.slice(0, 4)],
          ["Identifiers", CASE_OPTIONS.slice(4)],
        ] as const).map(([title, options]) => (
          <div key={title} className="mt-4">
            <h3 className="text-xs font-medium text-faint">{title}</h3>
            <ul className="mt-2 grid gap-2">
              {options.map((option) => {
                const value = text.length === 0 ? "" : convertCase(text, option.id);
                return (
                  <li key={option.id} className="rounded-lg border border-line bg-surface px-4 py-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-sm font-medium text-ink">{option.label}</h4>
                      <button type="button" className="btn btn-secondary" onClick={() => copy(option.id, value)} disabled={text.length === 0}>Copy</button>
                    </div>
                    <p className={`mt-1.5 whitespace-pre-wrap break-words text-sm ${text.length === 0 ? "text-muted" : "text-ink"}`}>{value || "—"}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}

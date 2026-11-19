"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { countText, readingTimeLabel, WORDS_PER_MINUTE } from "@/lib/word-count";

function countsSummary(text: string): string {
  const counts = countText(text);
  return [
    `Words: ${counts.words}`,
    `Characters: ${counts.characters}`,
    `Characters without spaces: ${counts.charactersNoSpaces}`,
    `Graphemes: ${counts.graphemes}`,
    `Sentences: ${counts.sentences}`,
    `Paragraphs: ${counts.paragraphs}`,
    `Lines: ${counts.lines}`,
    `Reading time: ${readingTimeLabel(counts.words)} at ${WORDS_PER_MINUTE} words per minute`,
  ].join("\n");
}

export function WordCounterTool() {
  const inputId = useId();
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");
  const [notice, setNotice] = useState("");
  const [announcement, setAnnouncement] = useState("Empty. No counts yet.");
  const started = useRef(false);
  const completed = useRef(false);

  const counts = useMemo(() => countText(text), [text]);
  const large = counts.characters > 100000;

  useEffect(() => {
    track("tool_view", { tool_id: "word-counter" });
  }, []);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      if (text.trim() === "") {
        setAnnouncement("Empty. No counts yet.");
        return;
      }
      setAnnouncement(`${counts.words} words, ${counts.characters} characters, ${counts.sentences} sentences, ${readingTimeLabel(counts.words)}.`);
      if (!started.current) {
        started.current = true;
        track("tool_input_started", { tool_id: "word-counter" });
      }
      if (!completed.current) {
        completed.current = true;
        track("tool_completed", { tool_id: "word-counter", operation: "count" });
      }
    }, 700);
    return () => window.clearTimeout(handle);
  }, [counts.characters, counts.sentences, counts.words, text]);

  async function paste() {
    try {
      const value = await navigator.clipboard.readText();
      setText(value);
      setNotice("");
    } catch {
      setNotice("Clipboard reading was blocked. Use the keyboard to paste into the text box.");
    }
  }

  async function copyCounts() {
    try {
      await navigator.clipboard.writeText(countsSummary(text));
      setNotice("Counts copied.");
      track("copy_result", { tool_id: "word-counter" });
    } catch {
      setNotice("Clipboard writing was blocked.");
    }
  }

  function clear() {
    setText("");
    setNotice("");
    started.current = false;
    completed.current = false;
    track("clear_input", { tool_id: "word-counter" });
    areaRef.current?.focus();
  }

  const rows = [
    ["Characters", counts.characters],
    ["Without spaces", counts.charactersNoSpaces],
    ["Graphemes", counts.graphemes],
    ["Sentences", counts.sentences],
    ["Paragraphs", counts.paragraphs],
    ["Lines", counts.lines],
  ] as const;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(15rem,0.7fr)]">
      {/* ── Editor ── */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label id="text-label" htmlFor={inputId} className="text-sm font-medium">Text</label>
          <div className="flex flex-wrap gap-1.5">
            <button type="button" className="btn btn-secondary" onClick={paste}>Paste</button>
            <button type="button" className="btn btn-secondary" onClick={() => { void navigator.clipboard.writeText(text).then(() => setNotice("Text copied.")).catch(() => setNotice("Clipboard writing was blocked.")); }}>Copy text</button>
            <button type="button" className="btn btn-secondary" onClick={() => areaRef.current?.select()}>Select all</button>
            <button type="button" className="btn btn-secondary" onClick={clear}>Clear</button>
          </div>
        </div>
        <textarea
          ref={areaRef}
          id={inputId}
          value={text}
          onChange={(e) => { setText(e.target.value); setNotice(""); }}
          rows={14}
          spellCheck
          className="field-control mt-2"
          placeholder="Type or paste text"
        />
        {large ? <p className="mt-2 text-[0.8125rem] text-muted">This is a large piece of text. Counting still happens in this browser and may take longer.</p> : null}
        {notice ? <p role="status" className="mt-2 text-sm">{notice}</p> : null}
      </div>

      {/* ── Counts ── */}
      <section aria-labelledby="counts-heading" className="rounded-lg bg-canvas p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 id="counts-heading" className="text-sm font-medium text-muted">Counts</h2>
          <button type="button" className="btn btn-primary" onClick={copyCounts}>Copy counts</button>
        </div>
        <p className="sr-only" aria-live="polite">{announcement}</p>
        {text.length === 0 ? (
          <p className="mt-4 text-sm text-muted">Counts appear when the text box has text.</p>
        ) : (
          <div className="mt-4">
            <p className="text-4xl font-medium tabular-nums tracking-tight text-ink">{counts.words.toLocaleString("en-US")}</p>
            <p className="text-sm text-muted">Words</p>
            <dl className="mt-4 grid grid-cols-2 gap-2">
              {rows.map(([label, value]) => (
                <div key={label} className="rounded-md bg-surface px-3 py-2">
                  <dt className="text-xs text-faint">{label}</dt>
                  <dd className="font-medium tabular-nums text-ink">{value.toLocaleString("en-US")}</dd>
                </div>
              ))}
              <div className="rounded-md bg-surface px-3 py-2">
                <dt className="text-xs text-faint">Reading time</dt>
                <dd className="font-medium text-ink">{readingTimeLabel(counts.words)}</dd>
              </div>
            </dl>
          </div>
        )}
      </section>
    </div>
  );
}

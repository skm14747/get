"use client";

import { useId, useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import {
  evaluateRegex,
  REGEX_PRESETS,
  type RegexFlag,
  type RegexPreset,
  type RegexResult,
} from "@/lib/regex";

export function RegexTool() {
  const session = useToolSession("regex-tester");
  const [pattern, setPattern] = useState(
    "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"
  );
  const [flags, setFlags] = useState<Record<RegexFlag, boolean>>({
    g: true,
    i: true,
    m: false,
    s: false,
    u: false,
  });
  const [testString, setTestString] = useState(
    "Contact our engineering team at dev@goeasytools.com or support@company.org. For urgent issues, email admin@cloud.io."
  );
  const patternId = useId();
  const testStringId = useId();

  const flagStr = (Object.keys(flags) as RegexFlag[])
    .filter((f) => flags[f])
    .join("");

  const result: RegexResult = evaluateRegex(pattern, flagStr, testString);

  function toggleFlag(flag: RegexFlag) {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
    session.markInput();
  }

  function handleLoadPreset(preset: RegexPreset) {
    setPattern(preset.pattern);
    const newFlags: Record<RegexFlag, boolean> = {
      g: preset.flags.includes("g"),
      i: preset.flags.includes("i"),
      m: preset.flags.includes("m"),
      s: preset.flags.includes("s"),
      u: preset.flags.includes("u"),
    };
    setFlags(newFlags);
    setTestString(preset.sample);
    session.markInput();
  }

  function handleClear() {
    setPattern("");
    setTestString("");
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* ── Preset Chips ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-muted mr-1">Presets:</span>
        {REGEX_PRESETS.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => handleLoadPreset(preset)}
            className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink transition-colors hover:border-line-strong"
          >
            {preset.name}
          </button>
        ))}
        {(pattern || testString) && (
          <button
            type="button"
            onClick={handleClear}
            className="btn btn-secondary text-xs ml-auto"
          >
            Clear
          </button>
        )}
      </div>

      {/* ── Regular Expression Input Box ── */}
      <div className="rounded-xl border border-line bg-surface p-5 space-y-3">
        <label htmlFor={patternId} className="block text-xs font-semibold uppercase tracking-wider text-muted">
          Regular Expression
        </label>
        <div className="flex items-center gap-2 rounded-lg border border-line bg-canvas px-3 py-2">
          <span className="font-mono text-base font-bold text-muted">/</span>
          <input
            id={patternId}
            type="text"
            value={pattern}
            onChange={(e) => {
              setPattern(e.target.value);
              session.markInput();
            }}
            placeholder="Enter regex pattern (e.g. [a-z0-9]+)..."
            className="flex-1 bg-transparent font-mono text-sm text-ink outline-none"
            spellCheck={false}
          />
          <span className="font-mono text-base font-bold text-muted">/</span>
          <span className="font-mono text-xs font-semibold text-action">{flagStr || "-"}</span>
        </div>

        {/* Flag Toggles */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-muted font-medium mr-1">Flags:</span>
          {(
            [
              { flag: "g", label: "global (g)", desc: "Find all matches" },
              { flag: "i", label: "ignoreCase (i)", desc: "Case-insensitive" },
              { flag: "m", label: "multiline (m)", desc: "^ and $ match line breaks" },
              { flag: "s", label: "dotAll (s)", desc: ". matches newlines" },
              { flag: "u", label: "unicode (u)", desc: "Unicode code points" },
            ] as const
          ).map((item) => (
            <button
              key={item.flag}
              type="button"
              onClick={() => toggleFlag(item.flag)}
              className={`rounded px-2.5 py-1 font-mono text-xs transition-colors ${
                flags[item.flag]
                  ? "bg-action text-paper font-bold"
                  : "bg-canvas text-muted hover:text-ink border border-line"
              }`}
              title={item.desc}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {!result.ok && (
        <div className="rounded-xl border border-danger/20 bg-danger/5 p-4 text-xs font-mono text-danger" role="alert">
          <span className="font-bold">Regex Syntax Error: </span>
          {result.reason}
        </div>
      )}

      {/* ── Test String Area ── */}
      <div className="rounded-xl border border-line bg-surface p-5 space-y-3">
        <div className="flex items-center justify-between">
          <label htmlFor={testStringId} className="text-xs font-semibold uppercase tracking-wider text-muted">
            Test String
          </label>
          {result.ok && (
            <span className="text-xs text-muted">
              {result.matchCount} match{result.matchCount === 1 ? "" : "es"} in {result.executionTimeMs}ms
            </span>
          )}
        </div>
        <textarea
          id={testStringId}
          value={testString}
          onChange={(e) => {
            setTestString(e.target.value);
            session.markInput();
          }}
          placeholder="Paste or type text to test against your regular expression..."
          rows={5}
          className="field-control w-full font-mono text-xs leading-relaxed"
          spellCheck={false}
        />
      </div>

      {/* ── Visual Highlight Overlay Box ── */}
      {result.ok && testString && (
        <div className="rounded-xl border border-line bg-surface p-5 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            Match Highlights
          </span>
          <div className="overflow-x-auto rounded-lg bg-canvas p-4 font-mono text-xs text-ink leading-relaxed max-h-60 whitespace-pre-wrap break-all">
            {result.segments.map((seg, idx) =>
              seg.isMatch ? (
                <mark
                  key={idx}
                  className="rounded bg-amber-400/30 text-amber-950 dark:bg-amber-400/20 dark:text-amber-200 px-1 py-0.5 font-bold"
                  title={`Match #${(seg.matchIndex ?? 0) + 1}`}
                >
                  {seg.text}
                </mark>
              ) : (
                <span key={idx}>{seg.text}</span>
              )
            )}
          </div>
        </div>
      )}

      {/* ── Match Details Table ── */}
      {result.ok && result.matches.length > 0 && (
        <div className="rounded-xl border border-line bg-surface p-5 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            Match Details Table ({result.matches.length})
          </span>
          <div className="overflow-x-auto rounded-lg border border-line">
            <table className="w-full text-left text-xs">
              <thead className="bg-canvas border-b border-line text-muted">
                <tr>
                  <th className="p-2.5 font-medium w-16">#</th>
                  <th className="p-2.5 font-medium w-24">Index</th>
                  <th className="p-2.5 font-medium">Matched Text</th>
                  <th className="p-2.5 font-medium">Capture Groups</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line font-mono text-ink">
                {result.matches.slice(0, 100).map((m, idx) => (
                  <tr key={idx} className="hover:bg-surface">
                    <td className="p-2.5 text-muted">{idx + 1}</td>
                    <td className="p-2.5 text-muted">{m.index}</td>
                    <td className="p-2.5 font-bold text-action break-all">{m.match}</td>
                    <td className="p-2.5 text-muted">
                      {m.groups.length > 0 ? (
                        <div className="space-y-0.5">
                          {m.groups.map((grp, gIdx) => (
                            <span key={gIdx} className="mr-2 inline-block rounded bg-line px-1.5 py-0.5 text-[11px]">
                              ${gIdx + 1}: {grp ?? "undefined"}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-faint">(None)</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {result.matches.length > 100 && (
            <p className="text-xs text-muted text-center pt-2">
              Showing first 100 of {result.matches.length} matches.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

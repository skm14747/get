"use client";

import { useId, useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import { calculateContrastRatio, type ContrastResult } from "@/lib/contrast";

export function ContrastTool() {
  const session = useToolSession("contrast-checker");
  const [fg, setFg] = useState("#1f2937");
  const [bg, setBg] = useState("#ffffff");
  const fgId = useId();
  const bgId = useId();

  const result: ContrastResult = calculateContrastRatio(fg, bg);

  function handleSwap() {
    const temp = fg;
    setFg(bg);
    setBg(temp);
    session.markInput();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* ── Inputs Bar ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 rounded-xl border border-line bg-surface p-5 items-end">
        {/* Foreground */}
        <div className="lg:col-span-2 space-y-1.5">
          <label htmlFor={fgId} className="text-xs font-semibold uppercase tracking-wider text-muted">
            Text (Foreground)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={result.ok ? result.fgHex : "#1f2937"}
              onChange={(e) => {
                setFg(e.target.value);
                session.markInput();
              }}
              className="h-10 w-12 cursor-pointer rounded border border-line bg-transparent p-0.5"
            />
            <input
              id={fgId}
              type="text"
              value={fg}
              onChange={(e) => {
                setFg(e.target.value);
                session.markInput();
              }}
              placeholder="#1f2937"
              className="field-control font-mono text-sm uppercase"
            />
          </div>
        </div>

        {/* Swap Action */}
        <div className="flex justify-center pb-1">
          <button
            type="button"
            onClick={handleSwap}
            className="btn btn-secondary text-xs flex items-center gap-1.5 h-10 w-full justify-center"
            title="Swap foreground and background"
          >
            ⇅ Swap
          </button>
        </div>

        {/* Background */}
        <div className="lg:col-span-2 space-y-1.5">
          <label htmlFor={bgId} className="text-xs font-semibold uppercase tracking-wider text-muted">
            Background
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={result.ok ? result.bgHex : "#ffffff"}
              onChange={(e) => {
                setBg(e.target.value);
                session.markInput();
              }}
              className="h-10 w-12 cursor-pointer rounded border border-line bg-transparent p-0.5"
            />
            <input
              id={bgId}
              type="text"
              value={bg}
              onChange={(e) => {
                setBg(e.target.value);
                session.markInput();
              }}
              placeholder="#ffffff"
              className="field-control font-mono text-sm uppercase"
            />
          </div>
        </div>
      </div>

      {/* ── Results Area ── */}
      {result.ok ? (
        <div className="space-y-6" aria-live="polite">
          {/* Main Ratio Card */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-line bg-surface p-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                Contrast Ratio
              </span>
              <div className="mt-1 flex items-baseline gap-3">
                <span className="text-4xl font-bold tracking-tight text-ink">
                  {result.formattedRatio}
                </span>
                <span className="text-xs text-muted">
                  (Luminance: FG {result.fgLuminance} / BG {result.bgLuminance})
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                  result.wcag.aaNormal
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : "bg-danger/10 text-danger"
                }`}
              >
                {result.wcag.aaNormal ? "✓ Passes WCAG AA" : "✕ Fails WCAG AA"}
              </span>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                  result.wcag.aaaNormal
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : "bg-amber-500/10 text-amber-700 dark:text-amber-300"
                }`}
              >
                {result.wcag.aaaNormal ? "✓ Passes WCAG AAA" : "✕ Fails WCAG AAA"}
              </span>
            </div>
          </div>

          {/* Compliance Matrix */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div className="rounded-lg border border-line bg-surface p-3.5 text-center">
              <span className="block text-xs font-medium text-muted">AA Normal Text</span>
              <span className="block text-[11px] text-faint">&ge; 4.5:1</span>
              <span className={`mt-2 inline-block text-xs font-bold ${result.wcag.aaNormal ? "text-emerald-600" : "text-danger"}`}>
                {result.wcag.aaNormal ? "PASS" : "FAIL"}
              </span>
            </div>
            <div className="rounded-lg border border-line bg-surface p-3.5 text-center">
              <span className="block text-xs font-medium text-muted">AA Large Text</span>
              <span className="block text-[11px] text-faint">&ge; 3.0:1 (18pt+)</span>
              <span className={`mt-2 inline-block text-xs font-bold ${result.wcag.aaLarge ? "text-emerald-600" : "text-danger"}`}>
                {result.wcag.aaLarge ? "PASS" : "FAIL"}
              </span>
            </div>
            <div className="rounded-lg border border-line bg-surface p-3.5 text-center">
              <span className="block text-xs font-medium text-muted">AAA Normal Text</span>
              <span className="block text-[11px] text-faint">&ge; 7.0:1</span>
              <span className={`mt-2 inline-block text-xs font-bold ${result.wcag.aaaNormal ? "text-emerald-600" : "text-danger"}`}>
                {result.wcag.aaaNormal ? "PASS" : "FAIL"}
              </span>
            </div>
            <div className="rounded-lg border border-line bg-surface p-3.5 text-center">
              <span className="block text-xs font-medium text-muted">AAA Large Text</span>
              <span className="block text-[11px] text-faint">&ge; 4.5:1 (18pt+)</span>
              <span className={`mt-2 inline-block text-xs font-bold ${result.wcag.aaaLarge ? "text-emerald-600" : "text-danger"}`}>
                {result.wcag.aaaLarge ? "PASS" : "FAIL"}
              </span>
            </div>
            <div className="rounded-lg border border-line bg-surface p-3.5 text-center">
              <span className="block text-xs font-medium text-muted">UI Components</span>
              <span className="block text-[11px] text-faint">&ge; 3.0:1 borders</span>
              <span className={`mt-2 inline-block text-xs font-bold ${result.wcag.uiComponents ? "text-emerald-600" : "text-danger"}`}>
                {result.wcag.uiComponents ? "PASS" : "FAIL"}
              </span>
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="rounded-xl border border-line overflow-hidden shadow-sm">
            <div className="bg-canvas px-4 py-2 border-b border-line text-xs font-semibold text-muted">
              Live Preview
            </div>
            <div
              className="p-8 transition-colors"
              style={{ backgroundColor: result.bgHex, color: result.fgHex }}
            >
              <h2 className="text-2xl font-bold tracking-tight">
                Preview Headline Text (Large Text)
              </h2>
              <p className="mt-3 text-sm leading-relaxed max-w-2xl">
                This is a preview of body copy (14px to 16px) rendered with your selected foreground color directly on top of the background. Clear contrast ensures readability for users with low vision, aging eyes, or when reading in bright ambient sunlight.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  className="rounded px-3 py-1.5 text-xs font-medium border"
                  style={{ borderColor: result.fgHex, color: result.fgHex }}
                >
                  Interactive Button
                </button>
                <span className="text-xs font-mono">
                  Sample Link / Badge
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-danger/20 bg-danger/5 p-4 text-sm text-danger" role="alert">
          <span className="font-semibold">Error: </span>
          {result.reason}
        </div>
      )}
    </div>
  );
}

"use client";

import { useId, useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import {
  CRON_PRESETS,
  explainCron,
  type CronResult,
} from "@/lib/cron";

export function CronTool() {
  const session = useToolSession("cron-generator");
  const [expression, setExpression] = useState("0 9 * * 1-5");
  const [mode, setMode] = useState<"explainer" | "builder">("explainer");
  const [copied, setCopied] = useState(false);
  const inputId = useId();

  // Builder state
  const [builderMin, setBuilderMin] = useState("0");
  const [builderHr, setBuilderHr] = useState("9");
  const [builderDom, setBuilderDom] = useState("*");
  const [builderMon, setBuilderMon] = useState("*");
  const [builderDow, setBuilderDow] = useState("1-5");

  const result: CronResult = explainCron(expression);

  function handleExpressionChange(val: string) {
    setExpression(val);
    session.markInput();
  }

  function handleBuilderChange(
    newMin: string,
    newHr: string,
    newDom: string,
    newMon: string,
    newDow: string
  ) {
    setBuilderMin(newMin);
    setBuilderHr(newHr);
    setBuilderDom(newDom);
    setBuilderMon(newMon);
    setBuilderDow(newDow);
    const expr = `${newMin} ${newHr} ${newDom} ${newMon} ${newDow}`;
    setExpression(expr);
    session.markInput();
  }

  function handleLoadPreset(presetExpr: string) {
    setExpression(presetExpr);
    const parts = presetExpr.split(/\s+/);
    if (parts.length === 5) {
      setBuilderMin(parts[0]!);
      setBuilderHr(parts[1]!);
      setBuilderDom(parts[2]!);
      setBuilderMon(parts[3]!);
      setBuilderDow(parts[4]!);
    }
    session.markInput();
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(expression.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* ── Preset Chips ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-muted mr-1">Presets:</span>
        {CRON_PRESETS.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => handleLoadPreset(preset.expression)}
            className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink transition-colors hover:border-line-strong"
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* ── Mode Tabs & Expression Editor ── */}
      <div className="rounded-xl border border-line bg-surface p-5 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
          <div className="flex rounded-lg bg-canvas p-1 border border-line">
            <button
              type="button"
              onClick={() => {
                setMode("explainer");
                session.markInput();
              }}
              className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                mode === "explainer" ? "bg-action text-paper shadow-sm" : "text-muted hover:text-ink"
              }`}
            >
              Direct Input / Explainer
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("builder");
                session.markInput();
              }}
              className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                mode === "builder" ? "bg-action text-paper shadow-sm" : "text-muted hover:text-ink"
              }`}
            >
              Visual Builder
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="btn btn-primary text-xs flex items-center gap-1.5"
          >
            {copied ? "Copied!" : "Copy Expression"}
          </button>
        </div>

        {mode === "explainer" ? (
          <div className="space-y-3">
            <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-muted">
              Standard 5-Field Cron Expression
            </label>
            <div className="flex items-center gap-2">
              <input
                id={inputId}
                type="text"
                value={expression}
                onChange={(e) => handleExpressionChange(e.target.value)}
                placeholder="* * * * *"
                className="field-control font-mono text-base font-bold text-ink w-full max-w-md tracking-wider"
                spellCheck={false}
              />
            </div>
            <p className="text-xs text-muted">
              Syntax: <code className="font-mono">minute hour day-of-month month day-of-week</code>
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-1">
              <span className="block text-xs font-medium text-muted">Minute</span>
              <select
                value={builderMin}
                onChange={(e) =>
                  handleBuilderChange(e.target.value, builderHr, builderDom, builderMon, builderDow)
                }
                className="field-control text-xs font-mono w-full"
              >
                <option value="*">Every minute (*)</option>
                <option value="*/5">Every 5 mins (*/5)</option>
                <option value="*/15">Every 15 mins (*/15)</option>
                <option value="*/30">Every 30 mins (*/30)</option>
                <option value="0">At minute 00 (:00)</option>
                <option value="30">At minute 30 (:30)</option>
              </select>
            </div>

            <div className="space-y-1">
              <span className="block text-xs font-medium text-muted">Hour</span>
              <select
                value={builderHr}
                onChange={(e) =>
                  handleBuilderChange(builderMin, e.target.value, builderDom, builderMon, builderDow)
                }
                className="field-control text-xs font-mono w-full"
              >
                <option value="*">Every hour (*)</option>
                <option value="*/2">Every 2 hours (*/2)</option>
                <option value="*/6">Every 6 hours (*/6)</option>
                <option value="0">Midnight (00:00)</option>
                <option value="6">06:00 AM</option>
                <option value="9">09:00 AM</option>
                <option value="12">12:00 PM (Noon)</option>
                <option value="18">06:00 PM</option>
              </select>
            </div>

            <div className="space-y-1">
              <span className="block text-xs font-medium text-muted">Day of Month</span>
              <select
                value={builderDom}
                onChange={(e) =>
                  handleBuilderChange(builderMin, builderHr, e.target.value, builderMon, builderDow)
                }
                className="field-control text-xs font-mono w-full"
              >
                <option value="*">Every day (*)</option>
                <option value="1">1st of the month</option>
                <option value="15">15th of the month</option>
                <option value="*/2">Every other day (*/2)</option>
              </select>
            </div>

            <div className="space-y-1">
              <span className="block text-xs font-medium text-muted">Month</span>
              <select
                value={builderMon}
                onChange={(e) =>
                  handleBuilderChange(builderMin, builderHr, builderDom, e.target.value, builderDow)
                }
                className="field-control text-xs font-mono w-full"
              >
                <option value="*">Every month (*)</option>
                <option value="1">January (1)</option>
                <option value="*/3">Every quarter (*/3)</option>
                <option value="1,7">Semi-annually (1,7)</option>
              </select>
            </div>

            <div className="space-y-1">
              <span className="block text-xs font-medium text-muted">Day of Week</span>
              <select
                value={builderDow}
                onChange={(e) =>
                  handleBuilderChange(builderMin, builderHr, builderDom, builderMon, e.target.value)
                }
                className="field-control text-xs font-mono w-full"
              >
                <option value="*">Every day (*)</option>
                <option value="1-5">Weekdays only (Mon-Fri)</option>
                <option value="0,6">Weekends only (Sat-Sun)</option>
                <option value="1">Monday only (1)</option>
                <option value="5">Friday only (5)</option>
                <option value="0">Sunday only (0)</option>
              </select>
            </div>
          </div>
        )}

        {/* 5-Field Breakdown Pills */}
        {result.ok && (
          <div className="grid grid-cols-5 gap-2 pt-2 border-t border-line text-center">
            <div className="bg-canvas rounded-lg p-2.5 border border-line">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">Minute</span>
              <span className="font-mono text-sm font-bold text-action">{result.parts[0]}</span>
            </div>
            <div className="bg-canvas rounded-lg p-2.5 border border-line">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">Hour</span>
              <span className="font-mono text-sm font-bold text-action">{result.parts[1]}</span>
            </div>
            <div className="bg-canvas rounded-lg p-2.5 border border-line">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">Day</span>
              <span className="font-mono text-sm font-bold text-action">{result.parts[2]}</span>
            </div>
            <div className="bg-canvas rounded-lg p-2.5 border border-line">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">Month</span>
              <span className="font-mono text-sm font-bold text-action">{result.parts[3]}</span>
            </div>
            <div className="bg-canvas rounded-lg p-2.5 border border-line">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">Weekday</span>
              <span className="font-mono text-sm font-bold text-action">{result.parts[4]}</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Explanation & Upcoming Execution Runs ── */}
      {result.ok ? (
        <div className="space-y-6" aria-live="polite">
          {/* Human Translation Banner */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Human-Readable Schedule
            </span>
            <p className="mt-1 text-base sm:text-lg font-semibold text-ink">
              “{result.description}”
            </p>
          </div>

          {/* Upcoming Schedule Dates */}
          {result.nextDates.length > 0 && (
            <div className="rounded-xl border border-line bg-surface p-5 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                Next 5 Scheduled Runs
              </span>
              <ul className="divide-y divide-line rounded-lg border border-line bg-canvas">
                {result.nextDates.map((dateStr, idx) => (
                  <li key={idx} className="flex items-center justify-between px-4 py-2.5 text-xs">
                    <span className="font-medium text-muted">Run #{idx + 1}</span>
                    <span className="font-mono font-semibold text-ink">{dateStr}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-faint">
                Times computed relative to your local system clock and timezone.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-danger/20 bg-danger/5 p-4 text-xs font-mono text-danger" role="alert">
          <span className="font-bold">Invalid Cron Syntax: </span>
          {result.reason}
        </div>
      )}
    </div>
  );
}

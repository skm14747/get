"use client";

import { useEffect, useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import { dateToUnixTimestamp, parseUnixTimestamp } from "@/lib/unix-timestamp";

export function UnixTimestampTool() {
  const session = useToolSession("unix-timestamp-converter");
  const [currentSec, setCurrentSec] = useState(() => Math.floor(Date.now() / 1000));
  const [inputTs, setInputTs] = useState(() => String(Math.floor(Date.now() / 1000)));
  const [dateInput, setDateInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSec(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const parsed = parseUnixTimestamp(inputTs);
  const reverseResult = dateInput ? dateToUnixTimestamp(dateInput) : null;

  async function handleCopy(text: string, label: string) {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="mx-auto max-w-xl">
      <p className="text-[0.8125rem] leading-relaxed text-muted">
        Convert Unix epoch timestamps to human-readable UTC and local date formats, or convert calendar dates to Unix seconds and milliseconds.
      </p>

      <div className="mt-4 flex items-center justify-between rounded-lg border border-line bg-surface p-4">
        <div>
          <span className="block text-xs font-medium text-faint">Current Unix Epoch (Seconds)</span>
          <span className="font-mono text-2xl font-bold tracking-tight text-ink">{currentSec}</span>
        </div>
        <button
          type="button"
          className="min-h-11 rounded-md border border-line px-3 text-xs font-medium text-ink hover:bg-canvas transition-colors"
          onClick={() => {
            setInputTs(String(currentSec));
            session.markInput();
          }}
        >
          Use Current
        </button>
      </div>

      <div className="mt-5">
        <label className="text-sm font-medium text-ink">
          Unix Timestamp (Seconds or Milliseconds)
          <input
            className="field-control mt-1 font-mono text-base"
            value={inputTs}
            placeholder="e.g. 1774000000"
            onChange={(e) => {
              setInputTs(e.target.value);
              session.markInput();
            }}
          />
        </label>
      </div>

      <div aria-live="polite" className="mt-5 rounded-lg bg-canvas p-5">
        {parsed.ok ? (
          <dl className="space-y-3">
            <div className="flex items-center justify-between rounded-md bg-surface p-3 text-sm">
              <div>
                <dt className="text-xs font-medium text-faint">UTC ISO 8601</dt>
                <dd className="font-mono font-medium text-ink">{parsed.utcIso}</dd>
              </div>
              <button
                type="button"
                className="min-h-11 rounded-md border border-line px-3 text-xs font-medium text-muted hover:text-ink transition-colors"
                onClick={() => handleCopy(parsed.utcIso, "iso")}
              >
                {copied === "iso" ? "Copied!" : "Copy"}
              </button>
            </div>

            <div className="flex items-center justify-between rounded-md bg-surface p-3 text-sm">
              <div>
                <dt className="text-xs font-medium text-faint">Local Time</dt>
                <dd className="font-medium text-ink">{parsed.localString}</dd>
              </div>
              <button
                type="button"
                className="min-h-11 rounded-md border border-line px-3 text-xs font-medium text-muted hover:text-ink transition-colors"
                onClick={() => handleCopy(parsed.localString, "local")}
              >
                {copied === "local" ? "Copied!" : "Copy"}
              </button>
            </div>

            <div className="flex justify-between rounded-md bg-surface p-3 text-sm">
              <div>
                <dt className="text-xs font-medium text-faint">Relative Time</dt>
                <dd className="font-medium text-accent">{parsed.relativeString}</dd>
              </div>
              <div className="text-right">
                <dt className="text-xs font-medium text-faint">Epoch Seconds / Millis</dt>
                <dd className="font-mono text-xs text-muted">{parsed.seconds} s / {parsed.milliseconds} ms</dd>
              </div>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-muted">
            Enter a numeric timestamp to view human-readable UTC and local time dates.
          </p>
        )}
      </div>

      <div className="mt-8 border-t border-line pt-6">
        <h3 className="text-base font-semibold text-ink">Convert Date to Unix Timestamp</h3>
        <div className="mt-3">
          <label className="text-sm font-medium text-ink">
            Date &amp; Time
            <input
              type="datetime-local"
              className="field-control mt-1"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
            />
          </label>
        </div>

        {reverseResult?.ok ? (
          <div className="mt-3 flex items-center justify-between rounded-md bg-surface p-3 text-sm">
            <div>
              <span className="block text-xs font-medium text-faint">Timestamp (Seconds)</span>
              <span className="font-mono font-medium text-ink">{reverseResult.seconds}</span>
            </div>
            <button
              type="button"
              className="min-h-11 rounded-md border border-line px-3 text-xs font-medium text-muted hover:text-ink transition-colors"
              onClick={() => handleCopy(String(reverseResult.seconds), "rev")}
            >
              {copied === "rev" ? "Copied!" : "Copy Seconds"}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

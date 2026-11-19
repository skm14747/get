"use client";

import { useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import { convertColor } from "@/lib/color-convert";

export function ColorTool() {
  const session = useToolSession("color-converter");
  const [hexInput, setHexInput] = useState("#1f2937");
  const [copied, setCopied] = useState<string | null>(null);

  const result = convertColor({ hex: hexInput });

  async function handleCopy(text: string, label: string) {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="mx-auto max-w-xl">
      <p className="text-[0.8125rem] leading-relaxed text-muted">
        Convert color codes between HEX, RGB, and HSL color models with real-time visual swatch preview.
      </p>

      <div className="mt-5 flex items-center gap-4 rounded-lg border border-line bg-surface p-4">
        <div
          className="h-16 w-16 shrink-0 rounded-lg border border-line shadow-sm"
          style={{ backgroundColor: result.ok ? result.hex : "#cccccc" }}
          aria-label="Color preview swatch"
        />
        <div className="min-w-0 flex-1">
          <label className="text-xs font-medium text-faint">
            Enter HEX Color
            <input
              className="field-control mt-1 font-mono text-base uppercase"
              value={hexInput}
              placeholder="#1F2937"
              onChange={(e) => {
                setHexInput(e.target.value);
                session.markInput();
              }}
            />
          </label>
        </div>
      </div>

      <div aria-live="polite" className="mt-5 rounded-lg bg-canvas p-5">
        {result.ok ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-md bg-surface p-3 text-sm">
              <div>
                <span className="block text-xs font-medium text-faint">HEX</span>
                <span className="font-mono font-medium text-ink">{result.hex.toUpperCase()}</span>
              </div>
              <button
                type="button"
                className="min-h-11 rounded-md border border-line px-3 text-xs font-medium text-muted hover:text-ink transition-colors"
                onClick={() => handleCopy(result.hex.toUpperCase(), "hex")}
              >
                {copied === "hex" ? "Copied!" : "Copy HEX"}
              </button>
            </div>

            <div className="flex items-center justify-between rounded-md bg-surface p-3 text-sm">
              <div>
                <span className="block text-xs font-medium text-faint">RGB</span>
                <span className="font-mono font-medium text-ink">{result.cssRgb}</span>
              </div>
              <button
                type="button"
                className="min-h-11 rounded-md border border-line px-3 text-xs font-medium text-muted hover:text-ink transition-colors"
                onClick={() => handleCopy(result.cssRgb, "rgb")}
              >
                {copied === "rgb" ? "Copied!" : "Copy RGB"}
              </button>
            </div>

            <div className="flex items-center justify-between rounded-md bg-surface p-3 text-sm">
              <div>
                <span className="block text-xs font-medium text-faint">HSL</span>
                <span className="font-mono font-medium text-ink">{result.cssHsl}</span>
              </div>
              <button
                type="button"
                className="min-h-11 rounded-md border border-line px-3 text-xs font-medium text-muted hover:text-ink transition-colors"
                onClick={() => handleCopy(result.cssHsl, "hsl")}
              >
                {copied === "hsl" ? "Copied!" : "Copy HSL"}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted">
            Enter a valid 3-digit or 6-digit hex color (e.g. #3b82f6) to see RGB and HSL conversions.
          </p>
        )}
      </div>
    </div>
  );
}

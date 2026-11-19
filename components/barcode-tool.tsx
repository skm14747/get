"use client";

import { useId, useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import {
  generateBarcode,
  renderBarcodeSvg,
  type BarcodeFormat,
  type BarcodePatternResult,
} from "@/lib/barcode";

const SAMPLE_PAYLOADS: Record<BarcodeFormat, string> = {
  CODE128: "INV-2026-9901",
  EAN13: "400638133393",
  UPCA: "01234567890",
  CODE39: "PROD-882",
};

export function BarcodeTool() {
  const session = useToolSession("barcode-generator");
  const [format, setFormat] = useState<BarcodeFormat>("CODE128");
  const [text, setText] = useState("INV-2026-9901");
  const [height, setHeight] = useState(80);
  const [barWidth, setBarWidth] = useState(2);
  const [showText, setShowText] = useState(true);
  const [copied, setCopied] = useState(false);
  const inputId = useId();

  const result: BarcodePatternResult = generateBarcode(text, format);
  const svgXml = result.ok
    ? renderBarcodeSvg(result.bars, result.displayText, { barWidth, height, showText })
    : "";

  function handleFormatChange(newFormat: BarcodeFormat) {
    setFormat(newFormat);
    setText(SAMPLE_PAYLOADS[newFormat]);
    session.markInput();
  }

  function handleDownloadSvg() {
    if (!svgXml) return;
    const blob = new Blob([svgXml], { type: "image/svg+xml;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `barcode-${text || "code"}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function handleDownloadPng() {
    if (!svgXml) return;
    const img = new Image();
    const svgBlob = new Blob([svgXml], { type: "image/svg+xml;charset=utf-8;" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width * 2; // 2x scale for sharp print
      canvas.height = img.height * 2;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(2, 2);
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const pngUrl = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = pngUrl;
            a.download = `barcode-${text || "code"}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(pngUrl);
          }
        }, "image/png");
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }

  async function handleCopySvg() {
    if (!svgXml) return;
    try {
      await navigator.clipboard.writeText(svgXml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* ── Configuration Bar ── */}
      <div className="rounded-xl border border-line bg-surface p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Format Selector Tabs */}
          <div className="flex rounded-lg bg-canvas p-1 border border-line">
            {(
              [
                { id: "CODE128", label: "Code 128 (General)" },
                { id: "EAN13", label: "EAN-13 (Retail)" },
                { id: "UPCA", label: "UPC-A (US Retail)" },
                { id: "CODE39", label: "Code 39 (Inventory)" },
              ] as const
            ).map((fmt) => (
              <button
                key={fmt.id}
                type="button"
                onClick={() => handleFormatChange(fmt.id)}
                className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${
                  format === fmt.id
                    ? "bg-action text-paper shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                {fmt.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setText(SAMPLE_PAYLOADS[format])}
            className="btn btn-secondary text-xs"
          >
            Reset Sample
          </button>
        </div>

        {/* Input Text Box */}
        <div className="space-y-1.5">
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-muted">
            Barcode Payload ({format})
          </label>
          <input
            id={inputId}
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              session.markInput();
            }}
            placeholder="Enter text or numbers to encode..."
            className="field-control font-mono text-sm tracking-wide w-full"
            spellCheck={false}
          />
        </div>

        {/* Sizing & Text Toggles */}
        <div className="grid gap-4 sm:grid-cols-3 pt-2 border-t border-line items-center">
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted">Bar Height:</span>
              <span className="font-mono text-ink">{height}px</span>
            </div>
            <input
              type="range"
              min={40}
              max={140}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full accent-action"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted">Bar Width Scale:</span>
              <span className="font-mono text-ink">{barWidth}x</span>
            </div>
            <input
              type="range"
              min={1}
              max={4}
              value={barWidth}
              onChange={(e) => setBarWidth(Number(e.target.value))}
              className="w-full accent-action"
            />
          </div>

          <div className="flex items-center pt-3 sm:justify-end">
            <label className="flex items-center gap-2 text-xs font-medium text-ink cursor-pointer">
              <input
                type="checkbox"
                checked={showText}
                onChange={(e) => setShowText(e.target.checked)}
                className="rounded border-line"
              />
              Show text label
            </label>
          </div>
        </div>
      </div>

      {/* ── Output / Preview Area ── */}
      {result.ok ? (
        <div className="rounded-xl border border-line bg-surface p-6 space-y-5" aria-live="polite">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-line">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              Live Vector Preview
            </span>
            <div className="flex items-center gap-2">
              <button type="button" onClick={handleDownloadPng} className="btn btn-primary text-xs">
                Download PNG
              </button>
              <button type="button" onClick={handleDownloadSvg} className="btn btn-secondary text-xs">
                Download SVG
              </button>
              <button type="button" onClick={handleCopySvg} className="btn btn-secondary text-xs">
                {copied ? "Copied SVG!" : "Copy SVG"}
              </button>
            </div>
          </div>

          {/* Centered Barcode Card */}
          <div className="flex items-center justify-center p-8 bg-white rounded-xl border border-line overflow-x-auto shadow-sm">
            <div
              className="max-w-full"
              dangerouslySetInnerHTML={{ __html: svgXml }}
            />
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-danger/20 bg-danger/5 p-4 text-xs font-mono text-danger" role="alert">
          <span className="font-bold">Validation Error: </span>
          {result.reason}
        </div>
      )}
    </div>
  );
}

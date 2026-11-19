"use client";

import { useEffect, useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import {
  exportCssVariables,
  generatePalette,
  type HarmonyMode,
  type PaletteSwatch,
} from "@/lib/palette";

export function PaletteTool() {
  const session = useToolSession("color-palette-generator");
  const [seedHex, setSeedHex] = useState("#3b82f6");
  const [mode, setMode] = useState<HarmonyMode>("analogous");
  const [swatches, setSwatches] = useState<PaletteSwatch[]>(() =>
    generatePalette("#3b82f6", "analogous")
  );
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedCss, setCopiedCss] = useState(false);

  function handleGenerate(seed: string = seedHex, currentMode: HarmonyMode = mode) {
    const newPalette = generatePalette(seed, currentMode);
    // Preserve locked swatches
    const merged = newPalette.map((item, idx) => {
      const existing = swatches[idx];
      return existing?.locked ? existing : item;
    });
    setSwatches(merged);
    session.markInput();
  }

  function handleRandomize() {
    const randomHex = () =>
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    const nextSeed = randomHex();
    setSeedHex(nextSeed);
    handleGenerate(nextSeed, mode);
  }

  function toggleLock(index: number) {
    setSwatches(
      swatches.map((s, idx) => (idx === index ? { ...s, locked: !s.locked } : s))
    );
  }

  async function handleCopySwatch(hex: string, idx: number) {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch {
      // fallback
    }
  }

  async function handleCopyCssVariables() {
    try {
      await navigator.clipboard.writeText(exportCssVariables(swatches));
      setCopiedCss(true);
      setTimeout(() => setCopiedCss(false), 2000);
    } catch {
      // fallback
    }
  }

  // Support Spacebar to randomize
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        handleRandomize();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* ── Configuration Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-surface p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted">Seed Color:</span>
            <input
              type="color"
              value={seedHex}
              onChange={(e) => {
                setSeedHex(e.target.value);
                handleGenerate(e.target.value, mode);
              }}
              className="h-8 w-9 cursor-pointer rounded border border-line bg-transparent p-0.5"
            />
            <input
              type="text"
              value={seedHex}
              onChange={(e) => {
                setSeedHex(e.target.value);
                if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) {
                  handleGenerate(e.target.value, mode);
                }
              }}
              className="field-control h-8 w-24 font-mono text-xs uppercase"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted">Harmony:</span>
            <select
              value={mode}
              onChange={(e) => {
                const nextMode = e.target.value as HarmonyMode;
                setMode(nextMode);
                handleGenerate(seedHex, nextMode);
              }}
              className="field-control h-8 text-xs font-medium capitalize"
            >
              <option value="analogous">Analogous</option>
              <option value="monochromatic">Monochromatic</option>
              <option value="triadic">Triadic</option>
              <option value="complementary">Complementary</option>
              <option value="split-complementary">Split-Complementary</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRandomize}
            className="btn btn-primary text-xs flex items-center gap-1.5"
          >
            🎲 Generate (Spacebar)
          </button>
          <button
            type="button"
            onClick={handleCopyCssVariables}
            className="btn btn-secondary text-xs"
          >
            {copiedCss ? "Copied CSS!" : "Copy CSS Variables"}
          </button>
        </div>
      </div>

      {/* ── 5 Interactive Vertical Swatches ── */}
      <div className="grid grid-cols-1 sm:grid-cols-5 h-96 sm:h-[420px] rounded-2xl overflow-hidden shadow-sm border border-line">
        {swatches.map((swatch, idx) => (
          <div
            key={swatch.id}
            className="relative flex flex-col justify-between p-5 transition-colors duration-200"
            style={{ backgroundColor: swatch.hex }}
          >
            {/* Top: Lock toggle */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => toggleLock(idx)}
                className={`rounded-full p-2 text-xs transition-opacity ${
                  swatch.isLight
                    ? "text-black/60 hover:text-black hover:bg-black/5"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                } ${swatch.locked ? "opacity-100 font-bold" : "opacity-40 hover:opacity-100"}`}
                title={swatch.locked ? "Unlock color" : "Lock color (keep when generating)"}
              >
                {swatch.locked ? "🔒 Locked" : "🔓"}
              </button>
            </div>

            {/* Bottom: Color Code Details */}
            <div
              className={`space-y-1 ${
                swatch.isLight ? "text-neutral-900" : "text-white"
              }`}
            >
              <button
                type="button"
                onClick={() => handleCopySwatch(swatch.hex, idx)}
                className="w-full text-left font-mono text-lg font-bold tracking-tight hover:underline flex items-center justify-between"
              >
                <span>{swatch.hex.toUpperCase()}</span>
                {copiedIndex === idx && (
                  <span className="text-[11px] font-sans font-normal opacity-80">
                    Copied!
                  </span>
                )}
              </button>
              <p className="font-mono text-[11px] opacity-75">{swatch.rgb}</p>
              <p className="font-mono text-[11px] opacity-75">{swatch.hsl}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Keyboard Shortcut Note ── */}
      <p className="text-center text-xs text-muted">
        Press <kbd className="rounded border border-line bg-canvas px-1.5 py-0.5 text-xs font-mono">Spacebar</kbd> anywhere to shuffle unlocked colors. Click a hex code to copy.
      </p>
    </div>
  );
}

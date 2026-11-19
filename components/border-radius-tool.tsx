"use client";

import { useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import {
  BORDER_RADIUS_PRESETS,
  compileBorderRadius,
  compileFullBorderRadiusCss,
  type AdvancedBorderRadius,
  type BorderRadiusConfig,
  type BorderRadiusMode,
  type SimpleBorderRadius,
} from "@/lib/border-radius";

export function BorderRadiusTool() {
  const session = useToolSession("css-border-radius-generator");
  const [mode, setMode] = useState<BorderRadiusMode>("advanced");
  const [simple, setSimple] = useState<SimpleBorderRadius>({
    topLeft: 24,
    topRight: 24,
    bottomRight: 24,
    bottomLeft: 24,
  });
  const [advanced, setAdvanced] = useState<AdvancedBorderRadius>({
    tlH: 60,
    trH: 40,
    brH: 30,
    blH: 70,
    tlV: 60,
    trV: 30,
    brV: 70,
    blV: 40,
  });
  const [allLinked, setAllLinked] = useState(false);
  const [copied, setCopied] = useState(false);

  const config: BorderRadiusConfig = {
    mode,
    simple,
    advanced,
  };

  const cssValue = compileBorderRadius(config);
  const fullCss = compileFullBorderRadiusCss(config);

  function handleSimpleChange(corner: keyof SimpleBorderRadius, value: number) {
    if (allLinked) {
      setSimple({ topLeft: value, topRight: value, bottomRight: value, bottomLeft: value });
    } else {
      setSimple({ ...simple, [corner]: value });
    }
    session.markInput();
  }

  function handleAdvancedChange(key: keyof AdvancedBorderRadius, value: number) {
    setAdvanced({ ...advanced, [key]: value });
    session.markInput();
  }

  function handleLoadPreset(presetConfig: BorderRadiusConfig) {
    setMode(presetConfig.mode);
    setSimple(presetConfig.simple);
    setAdvanced(presetConfig.advanced);
    session.markInput();
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(fullCss);
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
        {BORDER_RADIUS_PRESETS.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => handleLoadPreset(preset.config)}
            className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink transition-colors hover:border-line-strong"
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* ── Live Preview Shape ── */}
      <div className="rounded-2xl border border-line bg-canvas p-12 sm:p-20 flex items-center justify-center">
        <div
          className="h-56 w-56 sm:h-72 sm:w-72 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-lg flex items-center justify-center text-center p-6 text-white transition-all duration-150"
          style={{ borderRadius: cssValue }}
        >
          <span className="text-sm font-semibold opacity-90 drop-shadow">
            Interactive Shape
          </span>
        </div>
      </div>

      {/* ── Dual Controls & Code Grid ── */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Controls Pane */}
        <div className="rounded-xl border border-line bg-surface p-5 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-line">
            <h2 className="text-sm font-semibold text-ink">Radius Controls</h2>

            {/* Mode Tabs */}
            <div className="flex rounded-lg bg-canvas p-1 border border-line">
              <button
                type="button"
                onClick={() => {
                  setMode("simple");
                  session.markInput();
                }}
                className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                  mode === "simple" ? "bg-action text-paper shadow-sm" : "text-muted hover:text-ink"
                }`}
              >
                Simple (px)
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("advanced");
                  session.markInput();
                }}
                className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                  mode === "advanced" ? "bg-action text-paper shadow-sm" : "text-muted hover:text-ink"
                }`}
              >
                8-Point Organic (%)
              </button>
            </div>
          </div>

          {mode === "simple" ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted">Corner Radii</span>
                <label className="flex items-center gap-1.5 text-xs text-ink cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allLinked}
                    onChange={(e) => setAllLinked(e.target.checked)}
                    className="rounded border-line"
                  />
                  Link all corners
                </label>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">Top-Left</span>
                    <span className="font-mono text-ink">{simple.topLeft}px</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={150}
                    value={simple.topLeft}
                    onChange={(e) => handleSimpleChange("topLeft", Number(e.target.value))}
                    className="w-full accent-action"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">Top-Right</span>
                    <span className="font-mono text-ink">{simple.topRight}px</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={150}
                    value={simple.topRight}
                    onChange={(e) => handleSimpleChange("topRight", Number(e.target.value))}
                    className="w-full accent-action"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">Bottom-Left</span>
                    <span className="font-mono text-ink">{simple.bottomLeft}px</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={150}
                    value={simple.bottomLeft}
                    onChange={(e) => handleSimpleChange("bottomLeft", Number(e.target.value))}
                    className="w-full accent-action"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">Bottom-Right</span>
                    <span className="font-mono text-ink">{simple.bottomRight}px</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={150}
                    value={simple.bottomRight}
                    onChange={(e) => handleSimpleChange("bottomRight", Number(e.target.value))}
                    className="w-full accent-action"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Horizontal Radii */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Horizontal Radii (%)
                </span>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-xs text-muted">
                      <span>Top-Left H</span>
                      <span className="font-mono">{advanced.tlH}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={advanced.tlH}
                      onChange={(e) => handleAdvancedChange("tlH", Number(e.target.value))}
                      className="w-full accent-action"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-xs text-muted">
                      <span>Top-Right H</span>
                      <span className="font-mono">{advanced.trH}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={advanced.trH}
                      onChange={(e) => handleAdvancedChange("trH", Number(e.target.value))}
                      className="w-full accent-action"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-xs text-muted">
                      <span>Bottom-Left H</span>
                      <span className="font-mono">{advanced.blH}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={advanced.blH}
                      onChange={(e) => handleAdvancedChange("blH", Number(e.target.value))}
                      className="w-full accent-action"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-xs text-muted">
                      <span>Bottom-Right H</span>
                      <span className="font-mono">{advanced.brH}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={advanced.brH}
                      onChange={(e) => handleAdvancedChange("brH", Number(e.target.value))}
                      className="w-full accent-action"
                    />
                  </div>
                </div>
              </div>

              {/* Vertical Radii */}
              <div className="space-y-2 pt-2 border-t border-line">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Vertical Radii (%)
                </span>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-xs text-muted">
                      <span>Top-Left V</span>
                      <span className="font-mono">{advanced.tlV}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={advanced.tlV}
                      onChange={(e) => handleAdvancedChange("tlV", Number(e.target.value))}
                      className="w-full accent-action"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-xs text-muted">
                      <span>Top-Right V</span>
                      <span className="font-mono">{advanced.trV}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={advanced.trV}
                      onChange={(e) => handleAdvancedChange("trV", Number(e.target.value))}
                      className="w-full accent-action"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-xs text-muted">
                      <span>Bottom-Left V</span>
                      <span className="font-mono">{advanced.blV}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={advanced.blV}
                      onChange={(e) => handleAdvancedChange("blV", Number(e.target.value))}
                      className="w-full accent-action"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-xs text-muted">
                      <span>Bottom-Right V</span>
                      <span className="font-mono">{advanced.brV}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={advanced.brV}
                      onChange={(e) => handleAdvancedChange("brV", Number(e.target.value))}
                      className="w-full accent-action"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Code Output Pane */}
        <div className="rounded-xl border border-line bg-surface p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-line">
            <h2 className="text-sm font-semibold text-ink">CSS Code</h2>
            <button type="button" onClick={handleCopy} className="btn btn-primary text-xs">
              {copied ? "Copied!" : "Copy CSS"}
            </button>
          </div>

          <pre className="overflow-x-auto rounded-lg bg-canvas p-4 font-mono text-xs text-ink leading-relaxed whitespace-pre-wrap break-all">
            <code>{fullCss}</code>
          </pre>

          <div className="pt-2">
            <span className="text-xs font-semibold text-muted">Tailwind CSS Arbitrary Value:</span>
            <pre className="mt-1.5 overflow-x-auto rounded-lg bg-canvas p-2.5 font-mono text-xs text-muted whitespace-pre-wrap break-all">
              <code>rounded-[{cssValue.replace(/ /g, "_")}]</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

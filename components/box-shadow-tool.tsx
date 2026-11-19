"use client";

import { useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import {
  BOX_SHADOW_PRESETS,
  compileBoxShadow,
  compileFullBoxShadowCss,
  type ShadowLayer,
} from "@/lib/box-shadow";

export function BoxShadowTool() {
  const session = useToolSession("css-box-shadow-generator");
  const [layers, setLayers] = useState<ShadowLayer[]>([
    { id: "1", x: 0, y: 10, blur: 15, spread: -3, color: "#000000", opacity: 0.1, inset: false },
    { id: "2", x: 0, y: 4, blur: 6, spread: -4, color: "#000000", opacity: 0.1, inset: false },
  ]);
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [previewDarkBg, setPreviewDarkBg] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeLayer = layers[activeLayerIndex] ?? layers[0]!;
  const cssShadow = compileBoxShadow(layers);
  const fullCss = compileFullBoxShadowCss(layers);

  function handleUpdateActive<K extends keyof ShadowLayer>(field: K, value: ShadowLayer[K]) {
    setLayers(
      layers.map((layer, idx) => (idx === activeLayerIndex ? { ...layer, [field]: value } : layer))
    );
    session.markInput();
  }

  function handleAddLayer() {
    if (layers.length >= 4) return;
    const newId = String(Date.now());
    setLayers([
      ...layers,
      { id: newId, x: 0, y: 4, blur: 8, spread: 0, color: "#000000", opacity: 0.1, inset: false },
    ]);
    setActiveLayerIndex(layers.length);
    session.markInput();
  }

  function handleRemoveLayer(index: number) {
    if (layers.length <= 1) return;
    const next = layers.filter((_, i) => i !== index);
    setLayers(next);
    setActiveLayerIndex(Math.max(0, index - 1));
    session.markInput();
  }

  function handleLoadPreset(presetLayers: ShadowLayer[]) {
    setLayers(presetLayers);
    setActiveLayerIndex(0);
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
        {BOX_SHADOW_PRESETS.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => handleLoadPreset(preset.layers)}
            className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink transition-colors hover:border-line-strong"
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* ── Live Preview Box ── */}
      <div
        className={`rounded-2xl border border-line p-12 sm:p-20 flex items-center justify-center transition-colors ${
          previewDarkBg ? "bg-slate-900" : "bg-slate-50"
        }`}
      >
        <div
          className="h-44 w-60 sm:h-52 sm:w-80 rounded-2xl bg-white flex flex-col items-center justify-center p-6 text-center transition-all duration-150"
          style={{ boxShadow: cssShadow }}
        >
          <span className="text-sm font-semibold text-slate-800">Preview Box</span>
          <span className="mt-1 text-xs text-slate-500">
            {layers.length} shadow layer{layers.length > 1 ? "s" : ""} applied
          </span>
          <button
            type="button"
            onClick={() => setPreviewDarkBg(!previewDarkBg)}
            className="mt-4 text-[11px] text-slate-400 hover:text-slate-600 underline"
          >
            Switch to {previewDarkBg ? "Light" : "Dark"} backdrop
          </button>
        </div>
      </div>

      {/* ── Dual Controls & Code Grid ── */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Controls Pane */}
        <div className="rounded-xl border border-line bg-surface p-5 space-y-5">
          {/* Layer Tabs */}
          <div className="flex items-center justify-between pb-2 border-b border-line">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted mr-2">
                Layers:
              </span>
              {layers.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveLayerIndex(idx)}
                  className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                    activeLayerIndex === idx
                      ? "bg-action text-paper font-bold"
                      : "bg-canvas text-muted hover:text-ink border border-line"
                  }`}
                >
                  Layer {idx + 1}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              {layers.length < 4 && (
                <button type="button" onClick={handleAddLayer} className="btn btn-secondary text-xs">
                  + Add Layer
                </button>
              )}
              {layers.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveLayer(activeLayerIndex)}
                  className="text-xs text-muted hover:text-danger px-1"
                  title="Remove layer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            {/* Horizontal & Vertical Offsets */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-ink">Horizontal (X)</span>
                  <span className="font-mono text-muted">{activeLayer.x}px</span>
                </div>
                <input
                  type="range"
                  min={-50}
                  max={50}
                  value={activeLayer.x}
                  onChange={(e) => handleUpdateActive("x", Number(e.target.value))}
                  className="w-full accent-action"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-ink">Vertical (Y)</span>
                  <span className="font-mono text-muted">{activeLayer.y}px</span>
                </div>
                <input
                  type="range"
                  min={-50}
                  max={50}
                  value={activeLayer.y}
                  onChange={(e) => handleUpdateActive("y", Number(e.target.value))}
                  className="w-full accent-action"
                />
              </div>
            </div>

            {/* Blur & Spread */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-ink">Blur Radius</span>
                  <span className="font-mono text-muted">{activeLayer.blur}px</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={activeLayer.blur}
                  onChange={(e) => handleUpdateActive("blur", Number(e.target.value))}
                  className="w-full accent-action"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-ink">Spread Radius</span>
                  <span className="font-mono text-muted">{activeLayer.spread}px</span>
                </div>
                <input
                  type="range"
                  min={-50}
                  max={50}
                  value={activeLayer.spread}
                  onChange={(e) => handleUpdateActive("spread", Number(e.target.value))}
                  className="w-full accent-action"
                />
              </div>
            </div>

            {/* Color, Opacity & Inset */}
            <div className="grid gap-4 sm:grid-cols-3 pt-2 items-center">
              <div className="space-y-1">
                <span className="block text-xs font-medium text-ink">Color</span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={activeLayer.color}
                    onChange={(e) => handleUpdateActive("color", e.target.value)}
                    className="h-8 w-8 cursor-pointer rounded border border-line bg-transparent p-0.5"
                  />
                  <input
                    type="text"
                    value={activeLayer.color}
                    onChange={(e) => handleUpdateActive("color", e.target.value)}
                    className="field-control h-8 w-20 font-mono text-xs uppercase"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-ink">Opacity</span>
                  <span className="font-mono text-muted">{Math.round(activeLayer.opacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={activeLayer.opacity}
                  onChange={(e) => handleUpdateActive("opacity", Number(e.target.value))}
                  className="w-full accent-action"
                />
              </div>

              <div className="flex items-center pt-4">
                <label className="flex items-center gap-2 text-xs font-medium text-ink cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeLayer.inset}
                    onChange={(e) => handleUpdateActive("inset", e.target.checked)}
                    className="rounded border-line"
                  />
                  Inset (Inner Shadow)
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Output Code Pane */}
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
              <code>shadow-[{cssShadow.replace(/ /g, "_")}]</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

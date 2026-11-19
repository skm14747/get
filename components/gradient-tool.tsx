"use client";

import { useId, useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import {
  compileCssGradient,
  compileFullCssRule,
  GRADIENT_PRESETS,
  type ColorStop,
  type GradientConfig,
  type GradientType,
  type RadialShape,
} from "@/lib/gradient";

export function GradientTool() {
  const session = useToolSession("gradient-generator");
  const [type, setType] = useState<GradientType>("linear");
  const [angle, setAngle] = useState(135);
  const [radialShape, setRadialShape] = useState<RadialShape>("circle");
  const [stops, setStops] = useState<ColorStop[]>([
    { id: "1", color: "#f97316", position: 0 },
    { id: "2", color: "#ec4899", position: 100 },
  ]);
  const [copied, setCopied] = useState(false);
  const angleId = useId();

  const config: GradientConfig = {
    type,
    angle,
    radialShape,
    stops,
  };

  const cssGradient = compileCssGradient(config);
  const fullCss = compileFullCssRule(config);

  function handleAddStop() {
    if (stops.length >= 6) return;
    const newId = String(Date.now());
    const lastPos = stops[stops.length - 1]?.position ?? 50;
    const newPos = Math.min(100, lastPos - 20 > 0 ? lastPos - 20 : 50);
    setStops([...stops, { id: newId, color: "#3b82f6", position: newPos }]);
    session.markInput();
  }

  function handleRemoveStop(id: string) {
    if (stops.length <= 2) return;
    setStops(stops.filter((s) => s.id !== id));
    session.markInput();
  }

  function handleUpdateStop(id: string, field: "color" | "position", value: string | number) {
    setStops(
      stops.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
    session.markInput();
  }

  function handleLoadPreset(presetConfig: GradientConfig) {
    setType(presetConfig.type);
    setAngle(presetConfig.angle);
    if (presetConfig.radialShape) setRadialShape(presetConfig.radialShape);
    setStops(presetConfig.stops);
    session.markInput();
  }

  function handleRandomize() {
    const randomHex = () =>
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    const newAngle = Math.floor(Math.random() * 360);
    setAngle(newAngle);
    setStops([
      { id: "1", color: randomHex(), position: 0 },
      { id: "2", color: randomHex(), position: 100 },
    ]);
    session.markInput();
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(fullCss);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* ── Preset Chips ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-muted mr-1">Presets:</span>
        {GRADIENT_PRESETS.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => handleLoadPreset(preset.config)}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink transition-colors hover:border-line-strong"
          >
            <span
              className="h-2.5 w-2.5 rounded-full border border-black/10"
              style={{ background: compileCssGradient(preset.config) }}
            />
            {preset.name}
          </button>
        ))}
        <button
          type="button"
          onClick={handleRandomize}
          className="btn btn-secondary text-xs ml-auto"
        >
          🎲 Randomize
        </button>
      </div>

      {/* ── Live Preview Box ── */}
      <div className="rounded-xl border border-line overflow-hidden shadow-sm">
        <div
          className="h-64 sm:h-80 w-full transition-all duration-200"
          style={{ background: cssGradient }}
        />
      </div>

      {/* ── Dual Controls & Code Grid ── */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Controls Pane */}
        <div className="rounded-xl border border-line bg-surface p-5 space-y-5">
          <h2 className="text-sm font-semibold text-ink">Gradient Options</h2>

          {/* Type Selector */}
          <div className="flex rounded-lg bg-canvas p-1 border border-line max-w-xs">
            <button
              type="button"
              onClick={() => {
                setType("linear");
                session.markInput();
              }}
              className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors ${
                type === "linear" ? "bg-action text-paper shadow-sm" : "text-muted hover:text-ink"
              }`}
            >
              Linear Gradient
            </button>
            <button
              type="button"
              onClick={() => {
                setType("radial");
                session.markInput();
              }}
              className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors ${
                type === "radial" ? "bg-action text-paper shadow-sm" : "text-muted hover:text-ink"
              }`}
            >
              Radial Gradient
            </button>
          </div>

          {/* Angle / Shape Slider */}
          {type === "linear" ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor={angleId} className="text-xs font-medium text-ink">
                  Angle: {angle}°
                </label>
                <div className="flex gap-1 text-[11px]">
                  {[0, 45, 90, 135, 180, 270].map((deg) => (
                    <button
                      key={deg}
                      type="button"
                      onClick={() => {
                        setAngle(deg);
                        session.markInput();
                      }}
                      className="px-1.5 py-0.5 rounded border border-line bg-canvas text-muted hover:text-ink"
                    >
                      {deg}°
                    </button>
                  ))}
                </div>
              </div>
              <input
                id={angleId}
                type="range"
                min={0}
                max={360}
                value={angle}
                onChange={(e) => {
                  setAngle(Number(e.target.value));
                  session.markInput();
                }}
                className="w-full accent-action"
              />
            </div>
          ) : (
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-ink">Radial Shape:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setRadialShape("circle");
                    session.markInput();
                  }}
                  className={`btn text-xs ${radialShape === "circle" ? "btn-primary" : "btn-secondary"}`}
                >
                  Circle
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRadialShape("ellipse");
                    session.markInput();
                  }}
                  className={`btn text-xs ${radialShape === "ellipse" ? "btn-primary" : "btn-secondary"}`}
                >
                  Ellipse
                </button>
              </div>
            </div>
          )}

          {/* Color Stops Manager */}
          <div className="space-y-3 pt-3 border-t border-line">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                Color Stops ({stops.length}/6)
              </span>
              {stops.length < 6 && (
                <button
                  type="button"
                  onClick={handleAddStop}
                  className="btn btn-secondary text-xs"
                >
                  + Add Stop
                </button>
              )}
            </div>

            <div className="space-y-2.5">
              {stops.map((stop) => (
                <div key={stop.id} className="flex items-center gap-2.5 bg-canvas p-2.5 rounded-lg border border-line">
                  <input
                    type="color"
                    value={stop.color}
                    onChange={(e) => handleUpdateStop(stop.id, "color", e.target.value)}
                    className="h-8 w-9 cursor-pointer rounded border border-line bg-transparent p-0.5"
                  />
                  <input
                    type="text"
                    value={stop.color}
                    onChange={(e) => handleUpdateStop(stop.id, "color", e.target.value)}
                    className="field-control h-8 w-24 font-mono text-xs uppercase"
                  />
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={stop.position}
                    onChange={(e) => handleUpdateStop(stop.id, "position", Number(e.target.value))}
                    className="flex-1 accent-action"
                  />
                  <span className="text-xs font-mono text-muted w-10 text-right">
                    {stop.position}%
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveStop(stop.id)}
                    disabled={stops.length <= 2}
                    className="text-xs text-muted hover:text-danger disabled:opacity-30 p-1"
                    title="Remove stop"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Code Output Pane */}
        <div className="rounded-xl border border-line bg-surface p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-line">
            <h2 className="text-sm font-semibold text-ink">CSS Code</h2>
            <button type="button" onClick={handleCopy} className="btn btn-primary text-xs">
              {copied ? "Copied!" : "Copy CSS"}
            </button>
          </div>

          <pre className="overflow-x-auto rounded-lg bg-canvas p-4 font-mono text-xs text-ink leading-relaxed">
            <code>{fullCss}</code>
          </pre>

          <div className="pt-2">
            <span className="text-xs font-semibold text-muted">Tailwind CSS Arbitrary Value:</span>
            <pre className="mt-1.5 overflow-x-auto rounded-lg bg-canvas p-2.5 font-mono text-xs text-muted">
              <code>bg-[{cssGradient.replace(/ /g, "_")}]</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

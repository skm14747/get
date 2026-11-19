import { describe, expect, it } from "vitest";
import {
  compileCssGradient,
  compileFullCssRule,
  GRADIENT_PRESETS,
  type GradientConfig,
} from "@/lib/gradient";

describe("CSS Gradient Generator", () => {
  it("compiles standard 2-stop linear gradient", () => {
    const config: GradientConfig = {
      type: "linear",
      angle: 90,
      stops: [
        { id: "1", color: "#ff0000", position: 0 },
        { id: "2", color: "#0000ff", position: 100 },
      ],
    };
    const css = compileCssGradient(config);
    expect(css).toBe("linear-gradient(90deg, #ff0000 0%, #0000ff 100%)");
  });

  it("sorts color stops by position", () => {
    const config: GradientConfig = {
      type: "linear",
      angle: 45,
      stops: [
        { id: "2", color: "#0000ff", position: 100 },
        { id: "1", color: "#ff0000", position: 0 },
      ],
    };
    const css = compileCssGradient(config);
    expect(css).toBe("linear-gradient(45deg, #ff0000 0%, #0000ff 100%)");
  });

  it("compiles radial gradient with shape", () => {
    const config: GradientConfig = {
      type: "radial",
      angle: 0,
      radialShape: "circle",
      stops: [
        { id: "1", color: "#ffffff", position: 0 },
        { id: "2", color: "#000000", position: 100 },
      ],
    };
    const css = compileCssGradient(config);
    expect(css).toBe("radial-gradient(circle, #ffffff 0%, #000000 100%)");
  });

  it("normalizes angles within 0 to 359 degrees", () => {
    const config: GradientConfig = {
      type: "linear",
      angle: 450, // 450 - 360 = 90
      stops: [
        { id: "1", color: "#fff", position: 0 },
        { id: "2", color: "#000", position: 100 },
      ],
    };
    expect(compileCssGradient(config)).toBe("linear-gradient(90deg, #fff 0%, #000 100%)");
  });

  it("compiles full CSS fallback rule", () => {
    const config: GradientConfig = {
      type: "linear",
      angle: 90,
      stops: [
        { id: "1", color: "#10b981", position: 0 },
        { id: "2", color: "#3b82f6", position: 100 },
      ],
    };
    const full = compileFullCssRule(config);
    expect(full).toContain("background: #10b981;");
    expect(full).toContain("background: linear-gradient(90deg, #10b981 0%, #3b82f6 100%);");
  });

  it("ensures all presets compile valid CSS", () => {
    for (const preset of GRADIENT_PRESETS) {
      const css = compileCssGradient(preset.config);
      expect(css.length).toBeGreaterThan(15);
      expect(css.startsWith("linear-gradient") || css.startsWith("radial-gradient")).toBe(true);
    }
  });
});

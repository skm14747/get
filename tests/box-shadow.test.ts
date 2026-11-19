import { describe, expect, it } from "vitest";
import {
  BOX_SHADOW_PRESETS,
  compileBoxShadow,
  compileFullBoxShadowCss,
  compileSingleShadow,
  type ShadowLayer,
} from "@/lib/box-shadow";

describe("CSS Box Shadow Generator", () => {
  it("compiles standard single shadow layer", () => {
    const layer: ShadowLayer = {
      id: "1",
      x: 0,
      y: 4,
      blur: 8,
      spread: 0,
      color: "#000000",
      opacity: 0.15,
      inset: false,
    };
    const css = compileSingleShadow(layer);
    expect(css).toBe("0px 4px 8px 0px rgba(0, 0, 0, 0.15)");
  });

  it("compiles inset shadow layer", () => {
    const layer: ShadowLayer = {
      id: "1",
      x: 2,
      y: 2,
      blur: 4,
      spread: 1,
      color: "#1f2937",
      opacity: 0.2,
      inset: true,
    };
    const css = compileSingleShadow(layer);
    expect(css).toBe("inset 2px 2px 4px 1px rgba(31, 41, 55, 0.2)");
  });

  it("compiles multi-layer composite shadow", () => {
    const layers: ShadowLayer[] = [
      { id: "1", x: 0, y: 1, blur: 3, spread: 0, color: "#000", opacity: 0.1, inset: false },
      { id: "2", x: 0, y: 1, blur: 2, spread: -1, color: "#000", opacity: 0.1, inset: false },
    ];
    const css = compileBoxShadow(layers);
    expect(css).toBe(
      "0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)"
    );
  });

  it("compiles full CSS with webkit fallback", () => {
    const layers: ShadowLayer[] = [
      { id: "1", x: 0, y: 2, blur: 4, spread: 0, color: "#000", opacity: 0.2, inset: false },
    ];
    const full = compileFullBoxShadowCss(layers);
    expect(full).toContain("box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);");
    expect(full).toContain("-webkit-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);");
  });

  it("returns none for empty layers", () => {
    expect(compileBoxShadow([])).toBe("none");
  });

  it("ensures all presets compile valid CSS", () => {
    for (const preset of BOX_SHADOW_PRESETS) {
      const css = compileBoxShadow(preset.layers);
      expect(css.length).toBeGreaterThan(10);
      expect(css).toContain("px");
      expect(css).toContain("rgba(");
    }
  });
});

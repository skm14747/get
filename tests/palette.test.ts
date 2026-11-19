import { describe, expect, it } from "vitest";
import {
  exportCssVariables,
  generatePalette,
  hslToRgb,
  parseHexToRgb,
  rgbToHex,
  rgbToHsl,
  type HarmonyMode,
} from "@/lib/palette";

describe("Color Palette Generator", () => {
  it("converts RGB to HSL and back losslessly", () => {
    const original = { r: 59, g: 130, b: 246 };
    const hsl = rgbToHsl(original);
    const converted = hslToRgb(hsl);
    // Allow minor 1-unit rounding diff in RGB space
    expect(Math.abs(converted.r - original.r)).toBeLessThanOrEqual(1);
    expect(Math.abs(converted.g - original.g)).toBeLessThanOrEqual(1);
    expect(Math.abs(converted.b - original.b)).toBeLessThanOrEqual(1);
  });

  it("parses 3 and 6 digit hex colors", () => {
    expect(parseHexToRgb("#3b82f6")).toEqual({ r: 59, g: 130, b: 246 });
    expect(parseHexToRgb("fff")).toEqual({ r: 255, g: 255, b: 255 });
    expect(parseHexToRgb("invalid")).toBeNull();
  });

  it("generates 5 swatches for all harmony modes", () => {
    const modes: HarmonyMode[] = [
      "analogous",
      "monochromatic",
      "triadic",
      "complementary",
      "split-complementary",
    ];

    for (const mode of modes) {
      const swatches = generatePalette("#3b82f6", mode);
      expect(swatches).toHaveLength(5);
      for (const swatch of swatches) {
        expect(swatch.hex).toMatch(/^#[0-9a-f]{6}$/);
        expect(swatch.rgb).toContain("rgb(");
        expect(swatch.hsl).toContain("hsl(");
        expect(typeof swatch.isLight).toBe("boolean");
      }
    }
  });

  it("exports clean CSS root variables", () => {
    const swatches = generatePalette("#10b981", "analogous");
    const css = exportCssVariables(swatches);
    expect(css).toContain(":root {");
    expect(css).toContain("  --color-1: #");
    expect(css).toContain("  --color-5: #");
  });
});

import { describe, expect, it } from "vitest";
import {
  calculateContrastRatio,
  calculateRelativeLuminance,
  parseHexToRgb,
  rgbToHex,
} from "@/lib/contrast";

describe("WCAG Color Contrast Checker", () => {
  it("parses 3-digit and 6-digit hex colors", () => {
    expect(parseHexToRgb("#fff")).toEqual({ r: 255, g: 255, b: 255 });
    expect(parseHexToRgb("000")).toEqual({ r: 0, g: 0, b: 0 });
    expect(parseHexToRgb("#1f2937")).toEqual({ r: 31, g: 41, b: 55 });
    expect(parseHexToRgb("invalid")).toBeNull();
  });

  it("converts RGB to Hex string", () => {
    expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe("#ffffff");
    expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe("#000000");
    expect(rgbToHex({ r: 31, g: 41, b: 55 })).toBe("#1f2937");
  });

  it("calculates relative luminance correctly", () => {
    expect(calculateRelativeLuminance({ r: 255, g: 255, b: 255 })).toBe(1);
    expect(calculateRelativeLuminance({ r: 0, g: 0, b: 0 })).toBe(0);
  });

  it("calculates 21:1 ratio for black on white (passes all criteria)", () => {
    const res = calculateContrastRatio("#000000", "#ffffff");
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.ratio).toBe(21);
    expect(res.formattedRatio).toBe("21.00:1");
    expect(res.wcag.aaNormal).toBe(true);
    expect(res.wcag.aaLarge).toBe(true);
    expect(res.wcag.aaaNormal).toBe(true);
    expect(res.wcag.aaaLarge).toBe(true);
    expect(res.wcag.uiComponents).toBe(true);
  });

  it("calculates 1:1 ratio for identical colors (fails all criteria)", () => {
    const res = calculateContrastRatio("#ffffff", "#ffffff");
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.ratio).toBe(1);
    expect(res.formattedRatio).toBe("1.00:1");
    expect(res.wcag.aaNormal).toBe(false);
    expect(res.wcag.aaLarge).toBe(false);
    expect(res.wcag.aaaNormal).toBe(false);
  });

  it("evaluates AA threshold (~4.5:1) accurately", () => {
    // #767676 on #ffffff is ~4.54:1 (passes AA normal, fails AAA normal)
    const res = calculateContrastRatio("#767676", "#ffffff");
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.ratio).toBeGreaterThanOrEqual(4.5);
    expect(res.wcag.aaNormal).toBe(true);
    expect(res.wcag.aaLarge).toBe(true);
    expect(res.wcag.aaaNormal).toBe(false);
  });

  it("rejects invalid hex strings with informative error", () => {
    const res1 = calculateContrastRatio("not-hex", "#ffffff");
    expect(res1.ok).toBe(false);

    const res2 = calculateContrastRatio("#000000", "xyz");
    expect(res2.ok).toBe(false);
  });
});

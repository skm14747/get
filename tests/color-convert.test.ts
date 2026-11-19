import { describe, expect, it } from "vitest";
import { convertColor, hexToRgb, rgbToHex, rgbToHsl } from "@/lib/color-convert";

describe("color-convert", () => {
  it("converts 6-digit and 3-digit HEX to RGB", () => {
    expect(hexToRgb("#ffffff")).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb("#000000")).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb("#fff")).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb("3b82f6")).toEqual({ r: 59, g: 130, b: 246 });
  });

  it("converts RGB to HEX string", () => {
    expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe("#ffffff");
    expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe("#000000");
    expect(rgbToHex({ r: 59, g: 130, b: 246 })).toBe("#3b82f6");
  });

  it("converts RGB to HSL", () => {
    const redHsl = rgbToHsl({ r: 255, g: 0, b: 0 });
    expect(redHsl.h).toBe(0);
    expect(redHsl.s).toBe(100);
    expect(redHsl.l).toBe(50);
  });

  it("converts full color object cleanly", () => {
    const result = convertColor({ hex: "#1f2937" });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.hex).toBe("#1f2937");
    expect(result.rgb).toEqual({ r: 31, g: 41, b: 55 });
    expect(result.cssRgb).toBe("rgb(31, 41, 55)");
    expect(result.cssHsl).toContain("hsl(");
  });

  it("rejects invalid color inputs", () => {
    expect(convertColor({ hex: "invalid-hex" }).ok).toBe(false);
    expect(convertColor({ hex: "#12" }).ok).toBe(false);
  });
});

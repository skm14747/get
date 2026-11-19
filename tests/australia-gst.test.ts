import { describe, expect, it } from "vitest";
import { AUSTRALIA_GST_RATE, calculateAustraliaGst } from "@/lib/australia-gst";

describe("calculateAustraliaGst", () => {
  it("calculates exclusive 10% GST correctly", () => {
    const result = calculateAustraliaGst(100, false);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.net).toBe(100);
    expect(result.gst).toBe(10);
    expect(result.total).toBe(110);
    expect(result.ratePercent).toBe(AUSTRALIA_GST_RATE);
    expect(result.usedOneEleventhRule).toBe(false);
  });

  it("calculates reverse GST using the statutory 1/11th rule for inclusive prices", () => {
    const result = calculateAustraliaGst(110, true);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.gst).toBe(10); // 110 / 11 = 10
    expect(result.net).toBe(100);
    expect(result.total).toBe(110);
    expect(result.usedOneEleventhRule).toBe(true);
  });

  it("handles odd cents under 1/11th rule accurately", () => {
    const result = calculateAustraliaGst(55, true);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.gst).toBe(5);
    expect(result.net).toBe(50);
  });

  it("handles zero rate properly", () => {
    const result = calculateAustraliaGst(50, false, 0);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.net).toBe(50);
    expect(result.gst).toBe(0);
    expect(result.total).toBe(50);
  });

  it("rejects negative amounts and non-finite inputs", () => {
    expect(calculateAustraliaGst(-10, false).ok).toBe(false);
    expect(calculateAustraliaGst(Infinity, false).ok).toBe(false);
    expect(calculateAustraliaGst(100, false, -5).ok).toBe(false);
  });
});

import { describe, expect, it } from "vitest";
import {
  calculateEan13Checksum,
  generateBarcode,
  renderBarcodeSvg,
} from "@/lib/barcode";

describe("Barcode Generator", () => {
  it("encodes valid Code 128 barcodes", () => {
    const res = generateBarcode("GOEASY-100", "CODE128");
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.format).toBe("CODE128");
    expect(res.displayText).toBe("GOEASY-100");
    expect(res.bars.length).toBeGreaterThan(50);
    expect(/^[01]+$/.test(res.bars)).toBe(true);
  });

  it("calculates accurate EAN-13 modulo 10 checksums", () => {
    // 4006381333931 -> 400638133393 is base, checksum is 1
    const check = calculateEan13Checksum("400638133393");
    expect(check).toBe(1);
  });

  it("encodes valid 12-digit EAN-13 and generates check digit", () => {
    const res = generateBarcode("400638133393", "EAN13");
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.displayText).toBe("4006381333931");
    expect(res.bars.length).toBe(95); // Standard EAN-13 bar count (3+42+5+42+3 = 95)
  });

  it("encodes valid Code 39 barcodes", () => {
    const res = generateBarcode("HELLO-123", "CODE39");
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.format).toBe("CODE39");
    expect(res.displayText).toBe("HELLO-123");
    expect(res.bars.length).toBeGreaterThan(40);
  });

  it("rejects invalid characters in Code 39", () => {
    const res = generateBarcode("lowercase_not_allowed", "CODE39");
    expect(res.ok).toBe(false);
  });

  it("renders valid standalone SVG XML", () => {
    const res = generateBarcode("ITEM-99", "CODE128");
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    const svg = renderBarcodeSvg(res.bars, res.displayText);
    expect(svg).toContain("<svg");
    expect(svg).toContain("</svg>");
    expect(svg).toContain('fill="#000000"');
    expect(svg).toContain("ITEM-99");
  });
});

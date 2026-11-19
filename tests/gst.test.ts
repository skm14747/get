import { describe, expect, it } from "vitest";
import { calculateGst } from "@/lib/gst";

function money(v: number): number {
  return Math.round(v * 100) / 100;
}

describe("GST calculator — independent oracle", () => {
  // Exclusive: tax = amount * rate / 100
  it("₹1000 + 18% exclusive = ₹180 tax, ₹1180 total", () => {
    const result = calculateGst(1000, 18, false, "igst");
    expect(result).toMatchObject({ ok: true, taxable: 1000, tax: 180, total: 1180, igst: 180, cgst: 0, sgst: 0 });
  });

  // Inclusive: taxable = total / (1 + rate/100)
  it("₹1180 inclusive at 18% = ₹1000 taxable, ₹180 tax", () => {
    const result = calculateGst(1180, 18, true, "igst");
    expect(result).toMatchObject({ ok: true, taxable: 1000, tax: 180, total: 1180 });
  });

  it("₹500 + 12% exclusive CGST+SGST = ₹30 each", () => {
    const result = calculateGst(500, 12, false, "cgst-sgst");
    expect(result).toMatchObject({ ok: true, taxable: 500, tax: 60, total: 560, cgst: 30, sgst: 30, igst: 0 });
  });

  // Odd paisa split: ₹1 + 5% = ₹0.05 tax, CGST=₹0.03, SGST=₹0.02
  it("odd paisa: ₹1 + 5% CGST+SGST splits correctly", () => {
    const result = calculateGst(1, 5, false, "cgst-sgst");
    expect(result).toMatchObject({ ok: true, tax: 0.05, cgst: 0.03, sgst: 0.02 });
    if (result.ok) expect(result.cgst + result.sgst).toBe(result.tax);
  });

  it("zero rate produces zero tax", () => {
    const result = calculateGst(1000, 0, false, "igst");
    expect(result).toMatchObject({ ok: true, taxable: 1000, tax: 0, total: 1000 });
  });

  it("zero rate inclusive returns the amount unchanged", () => {
    const result = calculateGst(500, 0, true, "igst");
    expect(result).toMatchObject({ ok: true, taxable: 500, tax: 0, total: 500 });
  });

  it("zero amount", () => {
    const result = calculateGst(0, 18, false, "igst");
    expect(result).toMatchObject({ ok: true, taxable: 0, tax: 0, total: 0 });
  });

  it("rejects negative amount", () => {
    expect(calculateGst(-100, 18, false, "igst")).toMatchObject({ ok: false, reason: "negative" });
  });

  it("rejects negative rate", () => {
    expect(calculateGst(100, -5, false, "igst")).toMatchObject({ ok: false, reason: "negative" });
  });

  it("rejects NaN", () => {
    expect(calculateGst(NaN, 18, false, "igst")).toMatchObject({ ok: false, reason: "not_finite" });
  });

  it("rejects Infinity", () => {
    expect(calculateGst(Infinity, 18, false, "igst")).toMatchObject({ ok: false, reason: "not_finite" });
  });

  it("CGST + SGST always sum to the total tax", () => {
    for (const amount of [100, 333, 1, 999.99, 0.01]) {
      for (const rate of [5, 12, 18, 28]) {
        const result = calculateGst(amount, rate, false, "cgst-sgst");
        if (!result.ok) continue;
        expect(money(result.cgst + result.sgst)).toBe(result.tax);
      }
    }
  });

  // Metamorphic: exclusive amount + tax = inclusive total
  it("exclusive total equals inclusive input that gives same taxable", () => {
    const excl = calculateGst(1000, 18, false, "igst");
    expect(excl.ok).toBe(true);
    if (!excl.ok) return;
    const incl = calculateGst(excl.total, 18, true, "igst");
    expect(incl.ok).toBe(true);
    if (!incl.ok) return;
    expect(incl.taxable).toBeCloseTo(1000, 1);
  });

  it("large amount: ₹10,00,000 + 28%", () => {
    const result = calculateGst(1_000_000, 28, false, "igst");
    expect(result).toMatchObject({ ok: true, taxable: 1_000_000, tax: 280_000, total: 1_280_000 });
  });
});

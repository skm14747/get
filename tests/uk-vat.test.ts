import { describe, expect, it } from "vitest";
import { calculateUkVat, UK_VAT_RATES } from "@/lib/uk-vat";

describe("calculateUkVat", () => {
  it("calculates standard 20% VAT on exclusive amount", () => {
    const result = calculateUkVat(100, "standard", false);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.net).toBe(100);
    expect(result.vat).toBe(20);
    expect(result.gross).toBe(120);
    expect(result.ratePercent).toBe(20);
    expect(result.rateType).toBe("standard");
  });

  it("calculates reverse VAT (inclusive) at standard 20%", () => {
    const result = calculateUkVat(120, "standard", true);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.net).toBe(100);
    expect(result.vat).toBe(20);
    expect(result.gross).toBe(120);
  });

  it("calculates reduced 5% VAT", () => {
    const exclusive = calculateUkVat(100, "reduced", false);
    expect(exclusive.ok).toBe(true);
    if (!exclusive.ok) return;
    expect(exclusive.net).toBe(100);
    expect(exclusive.vat).toBe(5);
    expect(exclusive.gross).toBe(105);

    const inclusive = calculateUkVat(105, "reduced", true);
    expect(inclusive.ok).toBe(true);
    if (!inclusive.ok) return;
    expect(inclusive.net).toBe(100);
    expect(inclusive.vat).toBe(5);
    expect(inclusive.gross).toBe(105);
  });

  it("handles zero 0% rate properly", () => {
    const result = calculateUkVat(75.5, "zero", false);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.net).toBe(75.5);
    expect(result.vat).toBe(0);
    expect(result.gross).toBe(75.5);
  });

  it("supports numeric custom rates", () => {
    const result = calculateUkVat(200, 12.5, false);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.net).toBe(200);
    expect(result.vat).toBe(25);
    expect(result.gross).toBe(225);
    expect(result.rateType).toBe("custom");
  });

  it("rejects negative amounts and non-finite inputs", () => {
    expect(calculateUkVat(-50, "standard", false).ok).toBe(false);
    expect(calculateUkVat(NaN, "standard", false).ok).toBe(false);
    expect(calculateUkVat(100, -5, false).ok).toBe(false);
  });
});

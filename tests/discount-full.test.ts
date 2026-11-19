import { describe, expect, it } from "vitest";
import { centsToAmount, formatMoney, quoteDiscount, type DiscountInput } from "@/lib/discount";

describe("Discount calculator — independent oracle", () => {
  it("20% off $100 = $80", () => {
    const result = quoteDiscount({ original: 100, mode: "percent", discount: 20 });
    expect(result).toMatchObject({ ok: true, originalCents: 10000, firstDiscountCents: 2000, finalCents: 8000, effectivePercent: 20 });
  });

  it("$15 off $100", () => {
    const result = quoteDiscount({ original: 100, mode: "amount", discount: 15 });
    expect(result).toMatchObject({ ok: true, originalCents: 10000, firstDiscountCents: 1500, finalCents: 8500 });
  });

  it("20% + 10% stacked (not 30%)", () => {
    const result = quoteDiscount({ original: 100, mode: "percent", discount: 20, additionalPercent: 10 });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    // After 20%: $80. After 10% of $80: $72. Effective: 28%.
    expect(result.finalCents).toBe(7200);
    expect(result.effectivePercent).toBeCloseTo(28, 5);
  });

  it("0% discount = no change", () => {
    const result = quoteDiscount({ original: 50, mode: "percent", discount: 0 });
    expect(result).toMatchObject({ ok: true, finalCents: 5000, effectivePercent: 0 });
  });

  it("100% discount = free", () => {
    const result = quoteDiscount({ original: 50, mode: "percent", discount: 100 });
    expect(result).toMatchObject({ ok: true, finalCents: 0, effectivePercent: 100 });
  });

  it("zero original price", () => {
    const result = quoteDiscount({ original: 0, mode: "percent", discount: 50 });
    expect(result).toMatchObject({ ok: true, finalCents: 0, effectivePercent: 0 });
  });

  it("rejects negative price", () => {
    expect(quoteDiscount({ original: -10, mode: "percent", discount: 10 })).toMatchObject({ ok: false, reason: "negative_price" });
  });

  it("rejects negative discount", () => {
    expect(quoteDiscount({ original: 100, mode: "percent", discount: -5 })).toMatchObject({ ok: false, reason: "negative_discount" });
  });

  it("rejects negative additional percent", () => {
    expect(quoteDiscount({ original: 100, mode: "percent", discount: 10, additionalPercent: -5 })).toMatchObject({ ok: false, reason: "negative_discount" });
  });

  it("NaN inputs", () => {
    expect(quoteDiscount({ original: NaN, mode: "percent", discount: 10 })).toMatchObject({ ok: false, reason: "not_finite" });
  });

  it("Infinity inputs", () => {
    expect(quoteDiscount({ original: 100, mode: "percent", discount: Infinity })).toMatchObject({ ok: false, reason: "not_finite" });
  });

  it("small amounts: $0.01 - 10%", () => {
    const result = quoteDiscount({ original: 0.01, mode: "percent", discount: 10 });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.finalCents).toBe(1); // 1 cent - 0 = 1 (rounds to nearest)
  });
});

describe("centsToAmount", () => {
  it("converts 1234 cents to 12.34", () => expect(centsToAmount(1234)).toBe(12.34));
  it("converts 0 to 0", () => expect(centsToAmount(0)).toBe(0));
});

describe("formatMoney", () => {
  it("formats USD", () => expect(formatMoney(12345, "USD")).toContain("123.45"));
  it("formats INR", () => expect(formatMoney(100000, "INR")).toContain("1,000.00"));
  it("formats EUR", () => expect(formatMoney(5050, "EUR")).toContain("50.50"));
});

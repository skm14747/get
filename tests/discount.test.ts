import { describe, expect, it } from "vitest";
import { formatMoney, quoteDiscount } from "@/lib/discount";

describe("quoteDiscount", () => {
  it("takes 20 percent off 50", () => {
    const quote = quoteDiscount({ original: 50, mode: "percent", discount: 20 });
    expect(quote.ok).toBe(true);
    if (!quote.ok) return;
    expect(formatMoney(quote.firstDiscountCents)).toBe("$10.00");
    expect(formatMoney(quote.finalCents)).toBe("$40.00");
  });

  it("rounds 10 percent of 19.99 to the nearest hundredth", () => {
    const quote = quoteDiscount({ original: 19.99, mode: "percent", discount: 10 });
    expect(quote.ok).toBe(true);
    if (!quote.ok) return;
    expect(formatMoney(quote.firstDiscountCents)).toBe("$2.00");
    expect(formatMoney(quote.finalCents)).toBe("$17.99");
  });

  it("applies a second discount to the reduced price", () => {
    const quote = quoteDiscount({
      original: 100,
      mode: "percent",
      discount: 20,
      additionalPercent: 10,
    });
    expect(quote.ok).toBe(true);
    if (!quote.ok) return;
    expect(formatMoney(quote.firstDiscountCents)).toBe("$20.00");
    expect(formatMoney(quote.secondDiscountCents)).toBe("$8.00");
    expect(formatMoney(quote.finalCents)).toBe("$72.00");
    expect(quote.effectivePercent).toBeCloseTo(28, 5);
  });

  it("derives the percent from a discount amount", () => {
    const quote = quoteDiscount({ original: 40, mode: "amount", discount: 8 });
    expect(quote.ok).toBe(true);
    if (!quote.ok) return;
    expect(formatMoney(quote.finalCents)).toBe("$32.00");
    expect(quote.effectivePercent).toBeCloseTo(20, 5);
  });

  it("rejects a negative price or discount", () => {
    expect(quoteDiscount({ original: -1, mode: "percent", discount: 10 }).ok).toBe(false);
    expect(quoteDiscount({ original: 10, mode: "percent", discount: -5 }).ok).toBe(false);
  });

  it("allows a discount larger than the price", () => {
    const quote = quoteDiscount({ original: 10, mode: "percent", discount: 150 });
    expect(quote.ok).toBe(true);
    if (!quote.ok) return;
    expect(quote.finalCents).toBeLessThan(0);
  });
});

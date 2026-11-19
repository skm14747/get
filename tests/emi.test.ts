import { describe, expect, it } from "vitest";
import { calculateEmi, EMI_MAX_MONTHS } from "@/lib/emi";

/**
 * Independent EMI oracle: P * r * (1+r)^n / ((1+r)^n - 1)
 * where r = annual% / 12 / 100, n = months
 */
function expectedEmi(principal: number, annualPercent: number, months: number): number {
  if (annualPercent === 0) return principal / months;
  const r = annualPercent / 12 / 100;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function money(v: number): number {
  return Math.round(v * 100) / 100;
}

describe("EMI calculator — independent oracle", () => {
  it("standard 12% annual, 12 months on 100000", () => {
    const result = calculateEmi(100_000, 12, 12);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.payment).toBeCloseTo(money(expectedEmi(100_000, 12, 12)), 2);
    expect(result.totalPayment).toBeCloseTo(result.payment * 12, 1);
    expect(result.totalInterest).toBeCloseTo(result.totalPayment - 100_000, 1);
  });

  it("8.5% annual, 240 months (20y mortgage) on 5000000", () => {
    const result = calculateEmi(5_000_000, 8.5, 240);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const expected = money(expectedEmi(5_000_000, 8.5, 240));
    expect(result.payment).toBeCloseTo(expected, 0); // within ₹1
  });

  it("zero interest divides principal evenly", () => {
    const result = calculateEmi(12000, 0, 12);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.payment).toBe(1000);
    expect(result.totalInterest).toBe(0);
    expect(result.totalPayment).toBe(12000);
  });

  it("amortization schedule final balance converges to zero", () => {
    const result = calculateEmi(100_000, 12, 12);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const lastRow = result.schedule.at(-1);
    expect(lastRow).toBeDefined();
    expect(lastRow!.balance).toBe(0);
  });

  it("amortization schedule payments sum to totalPayment", () => {
    const result = calculateEmi(500_000, 10, 60);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const sum = result.schedule.reduce((s, row) => s + row.payment, 0);
    expect(money(sum)).toBeCloseTo(result.totalPayment, 1);
  });

  it("rejects negative principal", () => {
    expect(calculateEmi(-1000, 10, 12)).toMatchObject({ ok: false, reason: "invalid" });
  });

  it("rejects negative interest rate", () => {
    expect(calculateEmi(1000, -5, 12)).toMatchObject({ ok: false, reason: "invalid" });
  });

  it("rejects fractional months", () => {
    expect(calculateEmi(1000, 10, 12.5)).toMatchObject({ ok: false, reason: "invalid" });
  });

  it("rejects zero months", () => {
    expect(calculateEmi(1000, 10, 0)).toMatchObject({ ok: false, reason: "invalid" });
  });

  it("rejects tenure beyond max", () => {
    expect(calculateEmi(1000, 10, EMI_MAX_MONTHS + 1)).toMatchObject({ ok: false, reason: "too_long" });
  });

  it("accepts tenure at max", () => {
    const result = calculateEmi(1000, 10, EMI_MAX_MONTHS);
    expect(result.ok).toBe(true);
  });

  it("handles NaN and Infinity", () => {
    expect(calculateEmi(NaN, 10, 12)).toMatchObject({ ok: false, reason: "invalid" });
    expect(calculateEmi(1000, Infinity, 12)).toMatchObject({ ok: false, reason: "invalid" });
  });

  it("very small loan amount", () => {
    const result = calculateEmi(1, 12, 12);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.payment).toBeGreaterThan(0);
  });

  // Metamorphic: doubling principal doubles EMI
  it("doubling principal doubles EMI", () => {
    const r1 = calculateEmi(100_000, 10, 60);
    const r2 = calculateEmi(200_000, 10, 60);
    expect(r1.ok && r2.ok).toBe(true);
    if (!r1.ok || !r2.ok) return;
    expect(r2.payment).toBeCloseTo(r1.payment * 2, 0);
  });
});

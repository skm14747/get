import { describe, expect, it } from "vitest";
import {
  originalBeforeDiscount,
  originalBeforeIncrease,
  percentageChange,
  percentageDecrease,
  percentageDifference,
  percentageIncrease,
  percentOf,
  whatPercent,
} from "@/lib/percentage";

describe("Percentage calculator — independent oracle", () => {
  // percentOf: percent/100 * whole
  it("15% of 80 = 12", () => {
    const r = percentOf(15, 80);
    expect(r).toMatchObject({ ok: true, value: 12 });
  });

  it("50% of 200 = 100", () => {
    expect(percentOf(50, 200)).toMatchObject({ ok: true, value: 100 });
  });

  it("0% of anything = 0", () => {
    expect(percentOf(0, 999)).toMatchObject({ ok: true, value: 0 });
  });

  it("100% of 42 = 42", () => {
    expect(percentOf(100, 42)).toMatchObject({ ok: true, value: 42 });
  });

  it("200% of 50 = 100", () => {
    expect(percentOf(200, 50)).toMatchObject({ ok: true, value: 100 });
  });

  // whatPercent: part / whole * 100
  it("25 of 200 = 12.5%", () => {
    expect(whatPercent(25, 200)).toMatchObject({ ok: true, value: 12.5 });
  });

  it("divide by zero", () => {
    expect(whatPercent(10, 0)).toMatchObject({ ok: false, reason: "divide_by_zero" });
  });

  // percentageChange: (next - original) / original * 100
  it("80 to 100 = +25%", () => {
    expect(percentageChange(80, 100)).toMatchObject({ ok: true, value: 25 });
  });

  it("100 to 80 = -20%", () => {
    expect(percentageChange(100, 80)).toMatchObject({ ok: true, value: -20 });
  });

  it("change from 0 is divide_by_zero", () => {
    expect(percentageChange(0, 100)).toMatchObject({ ok: false, reason: "divide_by_zero" });
  });

  // percentageDecrease: (original - next) / original * 100
  it("100 to 80 decrease = 20%", () => {
    expect(percentageDecrease(100, 80)).toMatchObject({ ok: true, value: 20 });
  });

  // percentageDifference: |a-b| / ((|a| + |b|) / 2) * 100
  it("80 and 100 difference = 22.222...%", () => {
    const result = percentageDifference(80, 100);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value).toBeCloseTo(22.2222, 3);
  });

  it("symmetric: diff(a,b) = diff(b,a)", () => {
    const r1 = percentageDifference(80, 100);
    const r2 = percentageDifference(100, 80);
    expect(r1).toEqual(r2);
  });

  it("diff(0, 0) = divide_by_zero", () => {
    expect(percentageDifference(0, 0)).toMatchObject({ ok: false, reason: "divide_by_zero" });
  });

  // originalBeforeIncrease: final / (1 + pct/100)
  it("after 25% increase to 125, original was 100", () => {
    expect(originalBeforeIncrease(125, 25)).toMatchObject({ ok: true, value: 100 });
  });

  // originalBeforeDiscount: final / (1 - pct/100)
  it("after 20% discount to 80, original was 100", () => {
    expect(originalBeforeDiscount(80, 20)).toMatchObject({ ok: true, value: 100 });
  });

  it("100% discount = divide_by_zero", () => {
    expect(originalBeforeDiscount(80, 100)).toMatchObject({ ok: false, reason: "divide_by_zero" });
  });

  // Metamorphic: percentOf(whatPercent(x, y), y) ≈ x
  it("round-trip: percentOf(whatPercent(25, 200), 200) ≈ 25", () => {
    const pct = whatPercent(25, 200);
    expect(pct.ok).toBe(true);
    if (!pct.ok) return;
    const val = percentOf(pct.value, 200);
    expect(val.ok).toBe(true);
    if (!val.ok) return;
    expect(val.value).toBeCloseTo(25, 10);
  });
});

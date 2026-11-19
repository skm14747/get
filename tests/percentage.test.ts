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

describe("percentage formulas", () => {
  it("finds a percent of a number", () => {
    expect(percentOf(15, 80)).toEqual({ ok: true, value: 12 });
  });

  it("finds what percent one number is of another", () => {
    expect(whatPercent(25, 200)).toEqual({ ok: true, value: 12.5 });
  });

  it("rejects a zero whole", () => {
    expect(whatPercent(5, 0)).toEqual({ ok: false, reason: "divide_by_zero" });
    expect(percentageChange(0, 10)).toEqual({ ok: false, reason: "divide_by_zero" });
    expect(percentageDifference(0, 0)).toEqual({ ok: false, reason: "divide_by_zero" });
  });

  it("distinguishes change, increase, decrease, and difference", () => {
    expect(percentageChange(80, 100)).toEqual({ ok: true, value: 25 });
    expect(percentageIncrease(80, 100)).toEqual(percentageChange(80, 100));
    expect(percentageChange(100, 80)).toEqual({ ok: true, value: -20 });
    expect(percentageDecrease(100, 80)).toEqual({ ok: true, value: 20 });
    const difference = percentageDifference(80, 100);
    expect(difference.ok).toBe(true);
    if (difference.ok) expect(difference.value).toBeCloseTo(22.222222, 5);
  });

  it("reverses an increase and a discount", () => {
    const increase = originalBeforeIncrease(112, 12);
    const discount = originalBeforeDiscount(80, 20);
    expect(increase.ok).toBe(true);
    expect(discount.ok).toBe(true);
    if (increase.ok) expect(increase.value).toBeCloseTo(100, 8);
    if (discount.ok) expect(discount.value).toBeCloseTo(100, 8);
    expect(originalBeforeDiscount(50, 100)).toEqual({ ok: false, reason: "divide_by_zero" });
  });

  it("allows a negative part", () => {
    expect(whatPercent(-25, 200)).toEqual({ ok: true, value: -12.5 });
  });
});

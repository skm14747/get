import { describe, expect, it } from "vitest";
import { calculateBelgiumTva, BELGIUM_TVA_RATES } from "@/lib/belgium-tva";

describe("calculateBelgiumTva", () => {
  it("calculates standard 21% rate on HT amount", () => {
    const result = calculateBelgiumTva(100, "standard", false);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.ht).toBe(100);
    expect(result.tva).toBe(21);
    expect(result.ttc).toBe(121);
    expect(result.ratePercent).toBe(BELGIUM_TVA_RATES.standard);
  });

  it("calculates reverse TVA (TTC to HT) at 21%", () => {
    const result = calculateBelgiumTva(121, "standard", true);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.ht).toBe(100);
    expect(result.tva).toBe(21);
    expect(result.ttc).toBe(121);
  });

  it("calculates reduced 6% and intermediate 12% rates", () => {
    const reduit = calculateBelgiumTva(100, "reduit", false);
    expect(reduit.ok).toBe(true);
    if (!reduit.ok) return;
    expect(reduit.tva).toBe(6);
    expect(reduit.ttc).toBe(106);

    const inter = calculateBelgiumTva(100, "intermediaire", false);
    expect(inter.ok).toBe(true);
    if (!inter.ok) return;
    expect(inter.tva).toBe(12);
    expect(inter.ttc).toBe(112);
  });

  it("rejects negative amounts and non-finite numbers", () => {
    expect(calculateBelgiumTva(-50, "standard", false).ok).toBe(false);
    expect(calculateBelgiumTva(Infinity, "standard", false).ok).toBe(false);
    expect(calculateBelgiumTva(100, -1, false).ok).toBe(false);
  });
});

import { describe, expect, it } from "vitest";
import { calculateFranceTva, FRANCE_TVA_RATES } from "@/lib/france-tva";

describe("calculateFranceTva", () => {
  it("calculates standard 20% normal rate on HT amount", () => {
    const result = calculateFranceTva(100, "normal", false);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.ht).toBe(100);
    expect(result.tva).toBe(20);
    expect(result.ttc).toBe(120);
    expect(result.ratePercent).toBe(FRANCE_TVA_RATES.normal);
  });

  it("calculates reverse TVA (TTC to HT) at 20%", () => {
    const result = calculateFranceTva(120, "normal", true);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.ht).toBe(100);
    expect(result.tva).toBe(20);
    expect(result.ttc).toBe(120);
  });

  it("calculates intermediate 10% rate", () => {
    const result = calculateFranceTva(100, "intermediaire", false);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.ht).toBe(100);
    expect(result.tva).toBe(10);
    expect(result.ttc).toBe(110);
  });

  it("calculates reduced 5.5% and super-reduced 2.1% rates", () => {
    const reduit = calculateFranceTva(100, "reduit", false);
    expect(reduit.ok).toBe(true);
    if (!reduit.ok) return;
    expect(reduit.tva).toBe(5.5);
    expect(reduit.ttc).toBe(105.5);

    const particulier = calculateFranceTva(100, "particulier", false);
    expect(particulier.ok).toBe(true);
    if (!particulier.ok) return;
    expect(particulier.tva).toBe(2.1);
    expect(particulier.ttc).toBe(102.1);
  });

  it("supports custom numeric rate", () => {
    const custom = calculateFranceTva(200, 8.5, false);
    expect(custom.ok).toBe(true);
    if (!custom.ok) return;
    expect(custom.tva).toBe(17);
    expect(custom.ttc).toBe(217);
  });

  it("rejects negative amounts and non-finite inputs", () => {
    expect(calculateFranceTva(-10, "normal", false).ok).toBe(false);
    expect(calculateFranceTva(NaN, "normal", false).ok).toBe(false);
    expect(calculateFranceTva(100, -2, false).ok).toBe(false);
  });
});

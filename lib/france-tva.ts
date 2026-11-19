export type FranceTvaRateType = "normal" | "intermediaire" | "reduit" | "particulier" | "custom";

export const FRANCE_TVA_RATES = {
  normal: 20,
  intermediaire: 10,
  reduit: 5.5,
  particulier: 2.1,
} as const;

export type FranceTvaResult =
  | {
      ok: true;
      ht: number; // Hors Taxes (Net)
      tva: number; // Taxe sur la Valeur Ajoutée (VAT)
      ttc: number; // Toutes Taxes Comprises (Gross)
      ratePercent: number;
      rateType: FranceTvaRateType;
      inclusive: boolean;
    }
  | { ok: false; reason: "not_finite" | "negative" };

function money(value: number): number {
  return Math.round(value * 100) / 100;
}

export function calculateFranceTva(
  amount: number,
  rateInput: FranceTvaRateType | number,
  inclusive: boolean
): FranceTvaResult {
  if (!Number.isFinite(amount)) return { ok: false, reason: "not_finite" };
  if (amount < 0) return { ok: false, reason: "negative" };

  let ratePercent: number;
  let rateType: FranceTvaRateType;

  if (typeof rateInput === "number") {
    if (!Number.isFinite(rateInput) || rateInput < 0) return { ok: false, reason: "not_finite" };
    ratePercent = rateInput;
    rateType =
      rateInput === FRANCE_TVA_RATES.normal
        ? "normal"
        : rateInput === FRANCE_TVA_RATES.intermediaire
        ? "intermediaire"
        : rateInput === FRANCE_TVA_RATES.reduit
        ? "reduit"
        : rateInput === FRANCE_TVA_RATES.particulier
        ? "particulier"
        : "custom";
  } else if (rateInput === "custom") {
    rateType = "custom";
    ratePercent = 20;
  } else {
    rateType = rateInput;
    ratePercent = FRANCE_TVA_RATES[rateInput];
  }

  if (ratePercent === 0) {
    const rounded = money(amount);
    return {
      ok: true,
      ht: rounded,
      tva: 0,
      ttc: rounded,
      ratePercent: 0,
      rateType,
      inclusive,
    };
  }

  if (inclusive) {
    const ht = money(amount / (1 + ratePercent / 100));
    const tva = money(amount - ht);
    const ttc = money(amount);
    return { ok: true, ht, tva, ttc, ratePercent, rateType, inclusive };
  }

  const ht = money(amount);
  const tva = money(amount * (ratePercent / 100));
  const ttc = money(ht + tva);
  return { ok: true, ht, tva, ttc, ratePercent, rateType, inclusive };
}

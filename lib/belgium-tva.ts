export type BelgiumTvaRateType = "standard" | "reduit" | "intermediaire" | "custom";

export const BELGIUM_TVA_RATES = {
  standard: 21,
  reduit: 6,
  intermediaire: 12,
} as const;

export type BelgiumTvaResult =
  | {
      ok: true;
      ht: number; // Hors Taxes (Net)
      tva: number; // Taxe sur la Valeur Ajoutée (VAT / BTW)
      ttc: number; // Toutes Taxes Comprises (Gross)
      ratePercent: number;
      rateType: BelgiumTvaRateType;
      inclusive: boolean;
    }
  | { ok: false; reason: "not_finite" | "negative" };

function money(value: number): number {
  return Math.round(value * 100) / 100;
}

export function calculateBelgiumTva(
  amount: number,
  rateInput: BelgiumTvaRateType | number,
  inclusive: boolean
): BelgiumTvaResult {
  if (!Number.isFinite(amount)) return { ok: false, reason: "not_finite" };
  if (amount < 0) return { ok: false, reason: "negative" };

  let ratePercent: number;
  let rateType: BelgiumTvaRateType;

  if (typeof rateInput === "number") {
    if (!Number.isFinite(rateInput) || rateInput < 0) return { ok: false, reason: "not_finite" };
    ratePercent = rateInput;
    rateType =
      rateInput === BELGIUM_TVA_RATES.standard
        ? "standard"
        : rateInput === BELGIUM_TVA_RATES.reduit
        ? "reduit"
        : rateInput === BELGIUM_TVA_RATES.intermediaire
        ? "intermediaire"
        : "custom";
  } else if (rateInput === "custom") {
    rateType = "custom";
    ratePercent = 21;
  } else {
    rateType = rateInput;
    ratePercent = BELGIUM_TVA_RATES[rateInput];
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

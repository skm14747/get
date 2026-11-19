export type UkVatRateType = "standard" | "reduced" | "zero" | "custom";

export const UK_VAT_RATES = {
  standard: 20,
  reduced: 5,
  zero: 0,
} as const;

export type UkVatResult =
  | {
      ok: true;
      net: number;
      vat: number;
      gross: number;
      ratePercent: number;
      rateType: UkVatRateType;
      inclusive: boolean;
    }
  | { ok: false; reason: "not_finite" | "negative" };

function money(value: number): number {
  return Math.round(value * 100) / 100;
}

export function calculateUkVat(
  amount: number,
  rateInput: UkVatRateType | number,
  inclusive: boolean
): UkVatResult {
  if (!Number.isFinite(amount)) return { ok: false, reason: "not_finite" };
  if (amount < 0) return { ok: false, reason: "negative" };

  let ratePercent: number;
  let rateType: UkVatRateType;

  if (typeof rateInput === "number") {
    if (!Number.isFinite(rateInput) || rateInput < 0) return { ok: false, reason: "not_finite" };
    ratePercent = rateInput;
    rateType =
      rateInput === UK_VAT_RATES.standard
        ? "standard"
        : rateInput === UK_VAT_RATES.reduced
        ? "reduced"
        : rateInput === UK_VAT_RATES.zero
        ? "zero"
        : "custom";
  } else {
    rateType = rateInput;
    ratePercent = rateInput === "custom" ? 0 : UK_VAT_RATES[rateInput];
  }

  if (ratePercent === 0) {
    const rounded = money(amount);
    return {
      ok: true,
      net: rounded,
      vat: 0,
      gross: rounded,
      ratePercent: 0,
      rateType,
      inclusive,
    };
  }

  if (inclusive) {
    const net = money(amount / (1 + ratePercent / 100));
    const vat = money(amount - net);
    const gross = money(amount);
    return { ok: true, net, vat, gross, ratePercent, rateType, inclusive };
  }

  const net = money(amount);
  const vat = money(amount * (ratePercent / 100));
  const gross = money(net + vat);
  return { ok: true, net, vat, gross, ratePercent, rateType, inclusive };
}

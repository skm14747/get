export type GstSplit = "igst" | "cgst-sgst";

export type GstResult =
  | { ok: true; taxable: number; tax: number; total: number; cgst: number; sgst: number; igst: number }
  | { ok: false; reason: "negative" | "rate" | "not_finite" };

function money(value: number): number {
  return Math.round(value * 100) / 100;
}

export function calculateGst(amount: number, ratePercent: number, inclusive: boolean, split: GstSplit): GstResult {
  if (!Number.isFinite(amount) || !Number.isFinite(ratePercent)) return { ok: false, reason: "not_finite" };
  if (amount < 0 || ratePercent < 0) return { ok: false, reason: "negative" };
  if (inclusive && ratePercent === 0) {
    return { ok: true, taxable: money(amount), tax: 0, total: money(amount), cgst: 0, sgst: 0, igst: 0 };
  }
  const taxable = inclusive ? amount / (1 + ratePercent / 100) : amount;
  const tax = taxable * (ratePercent / 100);
  if (!Number.isFinite(taxable) || !Number.isFinite(tax)) return { ok: false, reason: "not_finite" };
  const roundedTax = money(tax);
  const roundedTaxable = money(taxable);
  const total = money(roundedTaxable + roundedTax);
  if (split === "igst") {
    return { ok: true, taxable: roundedTaxable, tax: roundedTax, total, cgst: 0, sgst: 0, igst: roundedTax };
  }
  const cgst = money(roundedTax / 2);
  const sgst = money(roundedTax - cgst);
  return { ok: true, taxable: roundedTaxable, tax: roundedTax, total, cgst, sgst, igst: 0 };
}

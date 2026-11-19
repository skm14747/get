export type DiscountError = "negative_price" | "negative_discount" | "not_finite" | "invalid_cents";

export type DiscountQuote =
  | {
      ok: true;
      originalCents: number;
      firstDiscountCents: number;
      secondDiscountCents: number;
      finalCents: number;
      effectivePercent: number;
    }
  | { ok: false; reason: DiscountError };

function toCents(amount: number): number | null {
  if (!Number.isFinite(amount)) return null;
  const cents = Math.round(amount * 100);
  if (!Number.isFinite(cents)) return null;
  return cents;
}

function percentOfCents(cents: number, percent: number): number {
  return Math.round((cents * percent) / 100);
}

export type DiscountInput = {
  original: number;
  mode: "percent" | "amount";
  discount: number;
  additionalPercent?: number | null;
};

export function quoteDiscount(input: DiscountInput): DiscountQuote {
  const originalCents = toCents(input.original);
  if (originalCents === null) return { ok: false, reason: "not_finite" };
  if (originalCents < 0) return { ok: false, reason: "negative_price" };
  if (!Number.isFinite(input.discount)) return { ok: false, reason: "not_finite" };
  if (input.discount < 0) return { ok: false, reason: "negative_discount" };

  const additional = input.additionalPercent ?? 0;
  if (!Number.isFinite(additional)) return { ok: false, reason: "not_finite" };
  if (additional < 0) return { ok: false, reason: "negative_discount" };

  let firstDiscountCents: number;
  if (input.mode === "percent") {
    firstDiscountCents = percentOfCents(originalCents, input.discount);
  } else {
    const amountCents = toCents(input.discount);
    if (amountCents === null) return { ok: false, reason: "invalid_cents" };
    firstDiscountCents = amountCents;
  }

  const afterFirst = originalCents - firstDiscountCents;
  const secondDiscountCents = percentOfCents(afterFirst, additional);
  const finalCents = afterFirst - secondDiscountCents;
  const totalOff = originalCents - finalCents;
  const effectivePercent = originalCents === 0 ? 0 : (totalOff / originalCents) * 100;

  if (![firstDiscountCents, secondDiscountCents, finalCents, effectivePercent].every(Number.isFinite)) {
    return { ok: false, reason: "not_finite" };
  }

  return {
    ok: true,
    originalCents,
    firstDiscountCents,
    secondDiscountCents,
    finalCents,
    effectivePercent,
  };
}

export function centsToAmount(cents: number): number {
  return cents / 100;
}

export const DISCOUNT_CURRENCIES = ["USD", "EUR", "GBP", "INR", "BRL", "SAR"] as const;

export type DiscountCurrency = (typeof DISCOUNT_CURRENCIES)[number];

export function formatMoney(cents: number, currency: DiscountCurrency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

export function discountErrorMessage(reason: DiscountError): string {
  if (reason === "negative_price") return "Enter a price of zero or more.";
  if (reason === "negative_discount") return "Enter a discount of zero or more.";
  return "Enter a finite price and discount.";
}

export const DISCOUNT_RULES = {
  rounding: "Prices are rounded to the nearest hundredth before the discount is applied. Each discount amount is then rounded to the nearest hundredth.",
  additional:
    "An additional discount is applied to the price after the first discount. A 20% discount followed by 10% is not a 30% discount.",
} as const;

export type PercentError = "divide_by_zero" | "not_finite";

export type PercentValue =
  | { ok: true; value: number }
  | { ok: false; reason: PercentError };

function finite(value: number): PercentValue {
  if (!Number.isFinite(value)) return { ok: false, reason: "not_finite" };
  return { ok: true, value };
}

export function percentOf(percent: number, whole: number): PercentValue {
  return finite((percent / 100) * whole);
}

export function whatPercent(part: number, whole: number): PercentValue {
  if (whole === 0) return { ok: false, reason: "divide_by_zero" };
  return finite((part / whole) * 100);
}

export function percentageChange(original: number, next: number): PercentValue {
  if (original === 0) return { ok: false, reason: "divide_by_zero" };
  return finite(((next - original) / original) * 100);
}

export function percentageIncrease(original: number, next: number): PercentValue {
  return percentageChange(original, next);
}

export function percentageDecrease(original: number, next: number): PercentValue {
  if (original === 0) return { ok: false, reason: "divide_by_zero" };
  return finite(((original - next) / original) * 100);
}

export function originalBeforeIncrease(finalAmount: number, percent: number): PercentValue {
  const factor = 1 + percent / 100;
  if (factor === 0) return { ok: false, reason: "divide_by_zero" };
  return finite(finalAmount / factor);
}

export function originalBeforeDiscount(finalAmount: number, percent: number): PercentValue {
  const factor = 1 - percent / 100;
  if (factor === 0) return { ok: false, reason: "divide_by_zero" };
  return finite(finalAmount / factor);
}

export function percentageDifference(first: number, second: number): PercentValue {
  const baseline = (Math.abs(first) + Math.abs(second)) / 2;
  if (baseline === 0) return { ok: false, reason: "divide_by_zero" };
  return finite((Math.abs(first - second) / baseline) * 100);
}

export function percentErrorMessage(reason: PercentError): string {
  if (reason === "divide_by_zero") {
    return "This calculation divides by zero, so the percentage is undefined.";
  }
  return "The result is too large or too small to display as a normal number.";
}

export const PERCENT_EXAMPLES = [
  {
    id: "part",
    label: "15% of 80",
    detail: "15 percent of 80 is 12.",
  },
  {
    id: "share",
    label: "25 out of 200",
    detail: "25 is 12.5% of 200. That is the same question as “what percentage is 25 of 200?”",
  },
  {
    id: "change-up",
    label: "80 to 100",
    detail: "The change from 80 to 100 is a 25% increase. The decrease figure for the same pair is −25%, which means the second number is larger.",
  },
  {
    id: "change-down",
    label: "100 to 80",
    detail: "The change from 100 to 80 is −20%. The decrease from 100 to 80 is 20%.",
  },
  {
    id: "difference",
    label: "80 and 100",
    detail:
      "The percentage difference is 22.222222%. It uses the average of the absolute values as the baseline, so it has no direction. It is not the same as percentage change.",
  },
] as const;

export type ParseFailure = "empty" | "comma" | "invalid" | "not_finite";

export type ParsedNumber =
  | { ok: true; value: number }
  | { ok: false; reason: ParseFailure };

const DECIMAL = /^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/;

export function parseDecimal(raw: string): ParsedNumber {
  const trimmed = raw.trim().replace(/%$/, "").trim();
  if (trimmed === "") return { ok: false, reason: "empty" };
  if (trimmed.includes(",")) return { ok: false, reason: "comma" };
  if (!DECIMAL.test(trimmed)) return { ok: false, reason: "invalid" };
  const value = Number(trimmed);
  if (!Number.isFinite(value)) return { ok: false, reason: "not_finite" };
  return { ok: true, value };
}

export function formatDecimal(value: number, maximumFractionDigits = 6): string {
  if (!Number.isFinite(value)) return "Not a number";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
    minimumFractionDigits: 0,
    useGrouping: true,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${formatDecimal(value)}%`;
}

export function messageForParseFailure(reason: ParseFailure): string {
  if (reason === "empty") return "Enter a number.";
  if (reason === "comma") return "Use a dot for the decimal point, for example 12.5.";
  return "Enter a plain number such as 12.5 or -3.";
}

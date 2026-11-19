export const AUSTRALIA_GST_RATE = 10;

export type AustraliaGstResult =
  | {
      ok: true;
      net: number;
      gst: number;
      total: number;
      ratePercent: number;
      inclusive: boolean;
      usedOneEleventhRule: boolean;
    }
  | { ok: false; reason: "not_finite" | "negative" };

function money(value: number): number {
  return Math.round(value * 100) / 100;
}

export function calculateAustraliaGst(
  amount: number,
  inclusive: boolean,
  customRate?: number
): AustraliaGstResult {
  if (!Number.isFinite(amount)) return { ok: false, reason: "not_finite" };
  if (amount < 0) return { ok: false, reason: "negative" };

  const ratePercent = customRate !== undefined ? customRate : AUSTRALIA_GST_RATE;
  if (!Number.isFinite(ratePercent) || ratePercent < 0) return { ok: false, reason: "not_finite" };

  if (ratePercent === 0) {
    const rounded = money(amount);
    return {
      ok: true,
      net: rounded,
      gst: 0,
      total: rounded,
      ratePercent: 0,
      inclusive,
      usedOneEleventhRule: false,
    };
  }

  if (inclusive) {
    // Under standard ATO 10% rate, GST is exactly 1/11th of the total price
    const usedOneEleventhRule = ratePercent === AUSTRALIA_GST_RATE;
    const gst = usedOneEleventhRule ? money(amount / 11) : money(amount - amount / (1 + ratePercent / 100));
    const net = money(amount - gst);
    const total = money(amount);
    return { ok: true, net, gst, total, ratePercent, inclusive, usedOneEleventhRule };
  }

  const net = money(amount);
  const gst = money(amount * (ratePercent / 100));
  const total = money(net + gst);
  return { ok: true, net, gst, total, ratePercent, inclusive, usedOneEleventhRule: false };
}

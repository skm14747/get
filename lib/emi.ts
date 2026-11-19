export const EMI_MAX_MONTHS = 360;

export type EmiRow = { month: number; payment: number; principal: number; interest: number; balance: number };

export type EmiResult =
  | { ok: true; payment: number; totalPayment: number; totalInterest: number; schedule: EmiRow[] }
  | { ok: false; reason: "invalid" | "too_long" };

function money(value: number): number {
  return Math.round(value * 100) / 100;
}

export function calculateEmi(principal: number, annualPercent: number, months: number): EmiResult {
  if (!Number.isFinite(principal) || !Number.isFinite(annualPercent) || !Number.isInteger(months)) {
    return { ok: false, reason: "invalid" };
  }
  if (principal < 0 || annualPercent < 0 || months < 1) return { ok: false, reason: "invalid" };
  if (months > EMI_MAX_MONTHS) return { ok: false, reason: "too_long" };
  const monthlyRate = annualPercent / 12 / 100;
  const payment = monthlyRate === 0 ? principal / months : (principal * monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1);
  if (!Number.isFinite(payment)) return { ok: false, reason: "invalid" };
  const roundedPayment = money(payment);
  let balance = principal;
  const schedule: EmiRow[] = [];
  for (let month = 1; month <= months; month += 1) {
    const interest = money(balance * monthlyRate);
    const principalPart = month === months ? money(balance) : money(roundedPayment - interest);
    balance = money(Math.max(0, balance - principalPart));
    schedule.push({ month, payment: month === months ? money(principalPart + interest) : roundedPayment, principal: principalPart, interest, balance });
  }
  const totalPayment = money(schedule.reduce((sum, row) => sum + row.payment, 0));
  return { ok: true, payment: roundedPayment, totalPayment, totalInterest: money(totalPayment - principal), schedule };
}

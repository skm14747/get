import { daysInMonth, parseIsoDate, type CalendarDate } from "@/lib/age";

export type DateMathResult = { ok: true; days: number; end?: string } | { ok: false; reason: "invalid_date" | "range" };

function ordinal(date: CalendarDate): number {
  return Math.floor(Date.UTC(date.year, date.month - 1, date.day) / 86_400_000);
}

function fromOrdinal(dayNumber: number): CalendarDate {
  const date = new Date(dayNumber * 86_400_000);
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
}

function iso(date: CalendarDate): string {
  return `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
}

export function daysBetween(startValue: string, endValue: string): DateMathResult {
  const start = parseIsoDate(startValue);
  const end = parseIsoDate(endValue);
  if (!start || !end) return { ok: false, reason: "invalid_date" };
  return { ok: true, days: Math.abs(ordinal(end) - ordinal(start)) };
}

export function addDays(startValue: string, amount: number): DateMathResult {
  const start = parseIsoDate(startValue);
  if (!start || !Number.isInteger(amount)) return { ok: false, reason: "invalid_date" };
  const shifted = fromOrdinal(ordinal(start) + amount);
  if (shifted.day < 1 || shifted.day > daysInMonth(shifted.year, shifted.month)) {
    return { ok: false, reason: "range" };
  }
  return { ok: true, days: amount, end: iso(shifted) };
}

function isWeekend(date: CalendarDate): boolean {
  const weekday = new Date(Date.UTC(date.year, date.month - 1, date.day)).getUTCDay();
  return weekday === 0 || weekday === 6;
}

/** Counts Monday–Friday dates after the start date through the end date. No holiday calendar is applied. */
export function businessDaysBetween(startValue: string, endValue: string): DateMathResult {
  const start = parseIsoDate(startValue);
  const end = parseIsoDate(endValue);
  if (!start || !end) return { ok: false, reason: "invalid_date" };
  const startNumber = ordinal(start);
  const endNumber = ordinal(end);
  const [low, high] = startNumber <= endNumber ? [startNumber, endNumber] : [endNumber, startNumber];
  let count = 0;
  for (let day = low + 1; day <= high; day += 1) {
    if (!isWeekend(fromOrdinal(day))) count += 1;
  }
  return { ok: true, days: count };
}

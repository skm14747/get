export type CalendarDate = { year: number; month: number; day: number };

export type AgeResult =
  | { ok: true; years: number; months: number; days: number; daysUntilNextBirthday: number; nextBirthday: CalendarDate }
  | { ok: false; reason: "invalid_date" | "reference_before_birth" };

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function daysInMonth(year: number, month: number): number {
  const lengths = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return lengths[month - 1] ?? 0;
}

export function parseIsoDate(value: string): CalendarDate | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > daysInMonth(year, month)) return null;
  return { year, month, day };
}

export function formatIsoDate(date: CalendarDate): string {
  const month = String(date.month).padStart(2, "0");
  const day = String(date.day).padStart(2, "0");
  return `${date.year}-${month}-${day}`;
}

function ordinal(date: CalendarDate): number {
  return Math.floor(Date.UTC(date.year, date.month - 1, date.day) / 86_400_000);
}

function compare(left: CalendarDate, right: CalendarDate): number {
  return ordinal(left) - ordinal(right);
}

function clampDay(year: number, month: number, day: number): CalendarDate {
  return { year, month, day: Math.min(day, daysInMonth(year, month)) };
}

export function ageOn(birthValue: string, referenceValue: string): AgeResult {
  const birth = parseIsoDate(birthValue);
  const reference = parseIsoDate(referenceValue);
  if (!birth || !reference) return { ok: false, reason: "invalid_date" };
  if (compare(reference, birth) < 0) return { ok: false, reason: "reference_before_birth" };

  const anniversaryThisYear = clampDay(reference.year, birth.month, birth.day);
  let years = reference.year - birth.year;
  if (compare(reference, anniversaryThisYear) < 0) years -= 1;

  const lastYear = compare(reference, anniversaryThisYear) < 0 ? reference.year - 1 : reference.year;
  const lastBirthday = clampDay(lastYear, birth.month, birth.day);
  let months = (reference.year - lastBirthday.year) * 12 + (reference.month - lastBirthday.month);
  let days = reference.day - lastBirthday.day;
  if (days < 0) {
    months -= 1;
    const previousMonth = reference.month === 1 ? 12 : reference.month - 1;
    const previousYear = reference.month === 1 ? reference.year - 1 : reference.year;
    days += daysInMonth(previousYear, previousMonth);
  }

  let nextYear = reference.year;
  let nextBirthday = clampDay(nextYear, birth.month, birth.day);
  if (compare(nextBirthday, reference) <= 0) {
    nextYear += 1;
    nextBirthday = clampDay(nextYear, birth.month, birth.day);
  }

  return {
    ok: true,
    years,
    months,
    days,
    daysUntilNextBirthday: ordinal(nextBirthday) - ordinal(reference),
    nextBirthday,
  };
}

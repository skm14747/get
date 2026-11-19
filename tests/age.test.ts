import { describe, expect, it } from "vitest";
import { ageOn, daysInMonth, formatIsoDate, isLeapYear, parseIsoDate } from "@/lib/age";

describe("Age calculator — independent oracle", () => {
  it("exactly 1 year old", () => {
    expect(ageOn("2000-06-15", "2001-06-15")).toMatchObject({ ok: true, years: 1, months: 0, days: 0 });
  });

  it("day before first birthday = 0 years, 11 months", () => {
    const result = ageOn("2000-06-15", "2001-06-14");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.years).toBe(0);
    expect(result.months).toBe(11);
  });

  it("same day birth = 0 years 0 months 0 days", () => {
    expect(ageOn("2024-01-01", "2024-01-01")).toMatchObject({ ok: true, years: 0, months: 0, days: 0 });
  });

  it("leap day birthday — non-leap year treated as Feb 28", () => {
    const result = ageOn("2000-02-29", "2001-02-28");
    expect(result).toMatchObject({ ok: true, years: 1, months: 0, days: 0 });
  });

  it("leap day birthday — exact match on leap year", () => {
    expect(ageOn("2000-02-29", "2004-02-29")).toMatchObject({ ok: true, years: 4, months: 0, days: 0 });
  });

  it("next birthday after leap day in non-leap year", () => {
    const result = ageOn("2000-02-29", "2001-02-28");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(formatIsoDate(result.nextBirthday)).toBe("2002-02-28");
  });

  it("next birthday on same day", () => {
    const result = ageOn("2000-06-15", "2024-06-15");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.daysUntilNextBirthday).toBeGreaterThan(0);
    expect(result.nextBirthday.year).toBe(2025);
  });

  it("reference before birth returns error", () => {
    expect(ageOn("2000-06-15", "2000-06-14")).toMatchObject({ ok: false, reason: "reference_before_birth" });
  });

  it("invalid date: Feb 30", () => {
    expect(ageOn("2000-02-30", "2001-01-01")).toMatchObject({ ok: false, reason: "invalid_date" });
  });

  it("invalid date: month 13", () => {
    expect(ageOn("2000-13-01", "2001-01-01")).toMatchObject({ ok: false, reason: "invalid_date" });
  });

  it("age across multiple years with partial months", () => {
    const result = ageOn("1990-03-25", "2024-10-15");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.years).toBe(34);
    expect(result.months).toBe(6);
    expect(result.days).toBe(20);
  });

  it("days until next birthday < 366", () => {
    const result = ageOn("1990-01-01", "2024-06-15");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.daysUntilNextBirthday).toBeGreaterThan(0);
    expect(result.daysUntilNextBirthday).toBeLessThanOrEqual(366);
  });
});

describe("daysInMonth", () => {
  it("Feb in leap year = 29", () => expect(daysInMonth(2024, 2)).toBe(29));
  it("Feb in non-leap year = 28", () => expect(daysInMonth(2023, 2)).toBe(28));
  it("Jan = 31", () => expect(daysInMonth(2024, 1)).toBe(31));
  it("Apr = 30", () => expect(daysInMonth(2024, 4)).toBe(30));
});

describe("isLeapYear", () => {
  it("2024 is leap", () => expect(isLeapYear(2024)).toBe(true));
  it("2023 is not leap", () => expect(isLeapYear(2023)).toBe(false));
  it("1900 is not leap (divisible by 100)", () => expect(isLeapYear(1900)).toBe(false));
  it("2000 is leap (divisible by 400)", () => expect(isLeapYear(2000)).toBe(true));
});

describe("parseIsoDate", () => {
  it("valid date", () => expect(parseIsoDate("2024-06-15")).toEqual({ year: 2024, month: 6, day: 15 }));
  it("rejects garbage", () => expect(parseIsoDate("not-a-date")).toBeNull());
  it("rejects Feb 29 in non-leap year", () => expect(parseIsoDate("2023-02-29")).toBeNull());
  it("accepts Feb 29 in leap year", () => expect(parseIsoDate("2024-02-29")).not.toBeNull());
  it("rejects month 0", () => expect(parseIsoDate("2024-00-15")).toBeNull());
  it("rejects day 0", () => expect(parseIsoDate("2024-06-00")).toBeNull());
});

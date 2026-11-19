import { describe, expect, it } from "vitest";
import { addDays, businessDaysBetween, daysBetween } from "@/lib/dates";

describe("Date calculator — independent oracle", () => {
  // Days between
  it("same date = 0 days", () => {
    expect(daysBetween("2024-03-15", "2024-03-15")).toMatchObject({ ok: true, days: 0 });
  });

  it("consecutive dates = 1 day", () => {
    expect(daysBetween("2024-03-15", "2024-03-16")).toMatchObject({ ok: true, days: 1 });
  });

  it("reversed dates give absolute difference", () => {
    expect(daysBetween("2024-03-16", "2024-03-15")).toMatchObject({ ok: true, days: 1 });
  });

  it("across month boundary: Jan 31 to Feb 1", () => {
    expect(daysBetween("2024-01-31", "2024-02-01")).toMatchObject({ ok: true, days: 1 });
  });

  it("across year boundary: Dec 31 to Jan 2", () => {
    expect(daysBetween("2024-12-31", "2025-01-02")).toMatchObject({ ok: true, days: 2 });
  });

  it("leap year: Feb 28 to Mar 1 in 2024", () => {
    expect(daysBetween("2024-02-28", "2024-03-01")).toMatchObject({ ok: true, days: 2 });
  });

  it("non-leap year: Feb 28 to Mar 1 in 2023", () => {
    expect(daysBetween("2023-02-28", "2023-03-01")).toMatchObject({ ok: true, days: 1 });
  });

  it("full year: Jan 1 to Dec 31 2024 (leap) = 365", () => {
    expect(daysBetween("2024-01-01", "2024-12-31")).toMatchObject({ ok: true, days: 365 });
  });

  it("invalid date", () => {
    expect(daysBetween("2024-02-30", "2024-03-01")).toMatchObject({ ok: false, reason: "invalid_date" });
  });

  // Add days
  it("add 0 days", () => {
    expect(addDays("2024-06-15", 0)).toMatchObject({ ok: true, end: "2024-06-15" });
  });

  it("add 1 day to Jan 31", () => {
    expect(addDays("2024-01-31", 1)).toMatchObject({ ok: true, end: "2024-02-01" });
  });

  it("add 1 day to Feb 28 in leap year", () => {
    expect(addDays("2024-02-28", 1)).toMatchObject({ ok: true, end: "2024-02-29" });
  });

  it("add 1 day to Feb 28 in non-leap year", () => {
    expect(addDays("2023-02-28", 1)).toMatchObject({ ok: true, end: "2023-03-01" });
  });

  it("subtract days (negative)", () => {
    expect(addDays("2024-03-01", -1)).toMatchObject({ ok: true, end: "2024-02-29" });
  });

  it("add days across year boundary", () => {
    expect(addDays("2024-12-31", 2)).toMatchObject({ ok: true, end: "2025-01-02" });
  });

  it("rejects fractional days", () => {
    expect(addDays("2024-01-01", 1.5)).toMatchObject({ ok: false, reason: "invalid_date" });
  });

  // Business days
  it("Mon to Tue = 1 business day (Fri-Mon weekend excluded)", () => {
    // 2024-01-08 is Monday, 2024-01-09 is Tuesday
    expect(businessDaysBetween("2024-01-08", "2024-01-09")).toMatchObject({ ok: true, days: 1 });
  });

  it("Friday to Monday = 1 business day", () => {
    // 2024-01-05 is Friday, 2024-01-08 is Monday
    expect(businessDaysBetween("2024-01-05", "2024-01-08")).toMatchObject({ ok: true, days: 1 });
  });

  it("Mon to next Mon = 5 business days", () => {
    expect(businessDaysBetween("2024-01-08", "2024-01-15")).toMatchObject({ ok: true, days: 5 });
  });

  it("same date = 0 business days", () => {
    expect(businessDaysBetween("2024-01-08", "2024-01-08")).toMatchObject({ ok: true, days: 0 });
  });

  it("Saturday to Sunday = 0 business days", () => {
    // 2024-01-06 Sat, 2024-01-07 Sun
    expect(businessDaysBetween("2024-01-06", "2024-01-07")).toMatchObject({ ok: true, days: 0 });
  });

  it("two full weeks = 10 business days", () => {
    expect(businessDaysBetween("2024-01-01", "2024-01-15")).toMatchObject({ ok: true, days: 10 });
  });
});

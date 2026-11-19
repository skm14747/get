import { describe, expect, it } from "vitest";
import { dateToUnixTimestamp, formatRelativeTime, parseUnixTimestamp } from "@/lib/unix-timestamp";

describe("unix-timestamp", () => {
  it("parses numeric epoch seconds into UTC ISO string", () => {
    const result = parseUnixTimestamp(1700000000);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.seconds).toBe(1700000000);
    expect(result.milliseconds).toBe(1700000000000);
    expect(result.utcIso).toBe("2023-11-14T22:13:20.000Z");
  });

  it("auto-detects 13-digit millisecond timestamps", () => {
    const result = parseUnixTimestamp(1700000000000);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.seconds).toBe(1700000000);
    expect(result.milliseconds).toBe(1700000000000);
  });

  it("converts date string to Unix epoch seconds", () => {
    const result = dateToUnixTimestamp("2023-11-14T22:13:20.000Z");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.seconds).toBe(1700000000);
    expect(result.milliseconds).toBe(1700000000000);
  });

  it("formats relative time strings", () => {
    const now = new Date(1700000000000);
    const twoHoursEarlier = new Date(1700000000000 - 2 * 3600 * 1000);
    expect(formatRelativeTime(twoHoursEarlier, now)).toBe("2 hours ago");
  });

  it("rejects invalid timestamps", () => {
    expect(parseUnixTimestamp("invalid").ok).toBe(false);
    expect(parseUnixTimestamp(NaN).ok).toBe(false);
    expect(dateToUnixTimestamp("not-a-date").ok).toBe(false);
  });
});

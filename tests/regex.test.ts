import { describe, expect, it } from "vitest";
import { evaluateRegex, REGEX_PRESETS } from "@/lib/regex";

describe("Regular Expression Tester", () => {
  it("matches simple patterns and flags correctly", () => {
    const res = evaluateRegex("apple", "gi", "I have an Apple and an apple pie.");
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.matchCount).toBe(2);
    expect(res.matches[0]?.match).toBe("Apple");
    expect(res.matches[1]?.match).toBe("apple");
  });

  it("extracts capture groups and named capture groups", () => {
    const pattern = "(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})";
    const res = evaluateRegex(pattern, "g", "Date is 2026-11-19.");
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.matchCount).toBe(1);
    expect(res.matches[0]?.match).toBe("2026-11-19");
    expect(res.matches[0]?.groups).toEqual(["2026", "11", "19"]);
    expect(res.matches[0]?.namedGroups).toEqual({
      year: "2026",
      month: "11",
      day: "19",
    });
  });

  it("returns syntax error on invalid regular expressions", () => {
    const res = evaluateRegex("[a-z", "g", "sample test");
    expect(res.ok).toBe(false);
    if (res.ok) return;

    expect(res.reason).toContain("Invalid regular expression");
  });

  it("handles empty pattern gracefully", () => {
    const res = evaluateRegex("", "g", "sample text");
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.matchCount).toBe(0);
    expect(res.segments).toHaveLength(1);
  });

  it("prevents infinite loops on zero-length matches", () => {
    const res = evaluateRegex("^|a*", "g", "aaa");
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.matchCount).toBeGreaterThan(0);
  });

  it("ensures all presets evaluate without errors", () => {
    for (const preset of REGEX_PRESETS) {
      const res = evaluateRegex(preset.pattern, preset.flags, preset.sample);
      expect(res.ok).toBe(true);
      if (res.ok) {
        expect(res.matchCount).toBeGreaterThan(0);
      }
    }
  });
});

import { describe, expect, it } from "vitest";
import { formatDecimal, formatPercent, messageForParseFailure, parseDecimal } from "@/lib/numbers";

describe("Number parsing — independent oracle", () => {
  it("parses integer", () => expect(parseDecimal("42")).toMatchObject({ ok: true, value: 42 }));
  it("parses decimal", () => expect(parseDecimal("3.14")).toMatchObject({ ok: true, value: 3.14 }));
  it("parses negative", () => expect(parseDecimal("-5")).toMatchObject({ ok: true, value: -5 }));
  it("parses positive sign", () => expect(parseDecimal("+10")).toMatchObject({ ok: true, value: 10 }));
  it("parses leading dot", () => expect(parseDecimal(".5")).toMatchObject({ ok: true, value: 0.5 }));
  it("strips trailing %", () => expect(parseDecimal("50%")).toMatchObject({ ok: true, value: 50 }));
  it("trims whitespace", () => expect(parseDecimal("  42  ")).toMatchObject({ ok: true, value: 42 }));
  it("rejects empty", () => expect(parseDecimal("")).toMatchObject({ ok: false, reason: "empty" }));
  it("rejects whitespace only", () => expect(parseDecimal("   ")).toMatchObject({ ok: false, reason: "empty" }));
  it("rejects comma", () => expect(parseDecimal("1,000")).toMatchObject({ ok: false, reason: "comma" }));
  it("rejects letters", () => expect(parseDecimal("abc")).toMatchObject({ ok: false, reason: "invalid" }));
  it("rejects double dot", () => expect(parseDecimal("1.2.3")).toMatchObject({ ok: false, reason: "invalid" }));
});

describe("Number formatting", () => {
  it("formats integer", () => expect(formatDecimal(42)).toBe("42"));
  it("formats with grouping", () => expect(formatDecimal(1234567)).toBe("1,234,567"));
  it("formats decimal", () => expect(formatDecimal(3.14159, 2)).toBe("3.14"));
  it("formats percent", () => expect(formatPercent(12.5)).toBe("12.5%"));
  it("handles NaN", () => expect(formatDecimal(NaN)).toBe("Not a number"));
  it("handles Infinity", () => expect(formatDecimal(Infinity)).toBe("Not a number"));
});

describe("parseFailure messages", () => {
  it("empty", () => expect(messageForParseFailure("empty")).toContain("Enter"));
  it("comma", () => expect(messageForParseFailure("comma")).toContain("dot"));
  it("invalid", () => expect(messageForParseFailure("invalid")).toContain("number"));
});

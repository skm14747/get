import { describe, expect, it } from "vitest";
import { formatPercent, parseDecimal } from "@/lib/numbers";

describe("parseDecimal", () => {
  it("accepts a trailing percent sign and a leading dot", () => {
    expect(parseDecimal(" 12.5% ")).toEqual({ ok: true, value: 12.5 });
    expect(parseDecimal(".5")).toEqual({ ok: true, value: 0.5 });
  });

  it("rejects commas, blanks, and words", () => {
    expect(parseDecimal("")).toEqual({ ok: false, reason: "empty" });
    expect(parseDecimal("1,000")).toEqual({ ok: false, reason: "comma" });
    expect(parseDecimal("twelve")).toEqual({ ok: false, reason: "invalid" });
  });

  it("formats a repeating percentage to six places", () => {
    expect(formatPercent(22.222222222)).toBe("22.222222%");
  });
});

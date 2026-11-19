import { describe, expect, it } from "vitest";
import { acceptedImageType, parsePageRanges, reductionPercent } from "@/lib/files";

describe("File utilities", () => {
  describe("acceptedImageType", () => {
    it("accepts image/jpeg", () => expect(acceptedImageType("image/jpeg")).toBe("jpeg"));
    it("accepts image/jpg", () => expect(acceptedImageType("image/jpg")).toBe("jpeg"));
    it("accepts image/png", () => expect(acceptedImageType("image/png")).toBe("png"));
    it("accepts image/webp", () => expect(acceptedImageType("image/webp")).toBe("webp"));
    it("rejects image/gif", () => expect(acceptedImageType("image/gif")).toBeNull());
    it("rejects image/bmp", () => expect(acceptedImageType("image/bmp")).toBeNull());
    it("rejects image/svg+xml", () => expect(acceptedImageType("image/svg+xml")).toBeNull());
    it("rejects text/plain", () => expect(acceptedImageType("text/plain")).toBeNull());
    it("rejects empty string", () => expect(acceptedImageType("")).toBeNull());
  });

  describe("parsePageRanges", () => {
    it("single page", () => expect(parsePageRanges("3", 10)).toEqual({ ok: true, pages: [3] }));
    it("range", () => expect(parsePageRanges("1-3", 10)).toEqual({ ok: true, pages: [1, 2, 3] }));
    it("mixed", () => expect(parsePageRanges("1-3,5,7", 10)).toEqual({ ok: true, pages: [1, 2, 3, 5, 7] }));
    it("all pages", () => expect(parsePageRanges("1-5", 5)).toEqual({ ok: true, pages: [1, 2, 3, 4, 5] }));
    it("rejects empty", () => expect(parsePageRanges("", 10)).toMatchObject({ ok: false, reason: "empty" }));
    it("rejects out of range", () => expect(parsePageRanges("11", 10)).toMatchObject({ ok: false, reason: "out_of_range" }));
    it("rejects page 0", () => expect(parsePageRanges("0", 10)).toMatchObject({ ok: false, reason: "out_of_range" }));
    it("rejects reversed range", () => expect(parsePageRanges("5-3", 10)).toMatchObject({ ok: false, reason: "invalid" }));
    it("rejects letters", () => expect(parsePageRanges("a-b", 10)).toMatchObject({ ok: false, reason: "invalid" }));
    it("handles whitespace in range", () => expect(parsePageRanges(" 1 - 3 , 5 ", 10)).toEqual({ ok: true, pages: [1, 2, 3, 5] }));
  });

  describe("reductionPercent", () => {
    it("100 -> 40 = 60%", () => expect(reductionPercent(100, 40)).toBe(60));
    it("100 -> 0 = 100%", () => expect(reductionPercent(100, 0)).toBe(100));
    it("100 -> 100 = 0%", () => expect(reductionPercent(100, 100)).toBe(0));
    it("0 before = null", () => expect(reductionPercent(0, 10)).toBeNull());
    it("negative before = null", () => expect(reductionPercent(-10, 5)).toBeNull());
    it("100 -> 120 = -20% (expansion)", () => expect(reductionPercent(100, 120)).toBe(-20));
  });
});

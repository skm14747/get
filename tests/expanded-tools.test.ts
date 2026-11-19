import { PDFDocument } from "pdf-lib";
import { describe, expect, it } from "vitest";
import { ageOn, formatIsoDate } from "@/lib/age";
import { sanitizeProperties } from "@/lib/analytics";
import { decodeUtf8, encodeUtf8 } from "@/lib/base64";
import { addDays, businessDaysBetween, daysBetween } from "@/lib/dates";
import { calculateEmi } from "@/lib/emi";
import { acceptedImageType, parsePageRanges, reductionPercent } from "@/lib/files";
import { calculateGst } from "@/lib/gst";
import { formatJson } from "@/lib/json-format";
import { generatePassword } from "@/lib/password";
import { extractPdfPages, imagesToPdf, mergePdfs, pdfPageCount } from "@/lib/pdf-tools";
import { textPayload, urlPayload, wifiPayload } from "@/lib/qr-payload";
import { convertUnit } from "@/lib/units";

const png = Uint8Array.from(
  Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
    "base64",
  ),
);

async function blankPdf(): Promise<Uint8Array> {
  const document = await PDFDocument.create();
  document.addPage();
  return document.save();
}

describe("expanded tools", () => {
  it("formats and rejects JSON without evaluating it", () => {
    expect(formatJson('{"a":1}', 2).ok && formatJson('{"a":1}', 2)).toMatchObject({
      ok: true,
      value: '{\n  "a": 1\n}',
    });
    expect(formatJson('{"a":1}', null)).toMatchObject({ ok: true, value: '{"a":1}' });
    expect(formatJson("{", 2).ok).toBe(false);
    expect(formatJson(" ", 2)).toMatchObject({ ok: false, reason: "empty" });
    expect(formatJson("x".repeat(1_000_001), 2)).toMatchObject({ ok: false, reason: "too_large" });
  });

  it("handles a leap-day birthday", () => {
    const exact = ageOn("2000-02-29", "2004-02-29");
    expect(exact).toMatchObject({ ok: true, years: 4, months: 0, days: 0 });
    if (!exact.ok) return;
    expect(formatIsoDate(exact.nextBirthday)).toBe("2005-02-28");
    expect(ageOn("2000-02-29", "2001-02-28")).toMatchObject({ ok: true, years: 1, months: 0, days: 0 });
    expect(ageOn("2000-02-29", "2000-02-28")).toMatchObject({ ok: false, reason: "reference_before_birth" });
    expect(ageOn("2000-02-30", "2001-02-28")).toMatchObject({ ok: false, reason: "invalid_date" });
  });

  it("builds QR payloads and rejects unsupported URLs", () => {
    expect(urlPayload("https://goeasytools.com/word-counter").ok).toBe(true);
    expect(urlPayload("javascript:alert(1)")).toMatchObject({ ok: false, reason: "url" });
    expect(textPayload("  ")).toMatchObject({ ok: false, reason: "empty" });
    expect(wifiPayload("Cafe;Net", "a:b", "WPA").ok && wifiPayload("Cafe;Net", "a:b", "WPA")).toMatchObject({
      ok: true,
      value: "WIFI:T:WPA;S:Cafe\\;Net;P:a\\:b;;",
    });
  });

  it("draws passwords from the supplied bytes and skips biased leftovers", () => {
    const bytes = [255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    let index = 0;
    const result = generatePassword(
      { length: 8, lower: true, upper: true, digits: true, symbols: false },
      () => bytes[index++] ?? 0,
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.password).toHaveLength(8);
    expect(result.sets).toEqual(["lower", "upper", "digits"]);
    expect(result.password).toMatch(/[a-z]/);
    expect(result.password).toMatch(/[A-Z]/);
    expect(result.password).toMatch(/[2-9]/);
    expect(result.password).not.toMatch(/[lIO01]/);
    expect(generatePassword({ length: 7, lower: true, upper: false, digits: false, symbols: false }, () => 0)).toMatchObject({
      ok: false,
      reason: "length",
    });
    expect(generatePassword({ length: 12, lower: false, upper: false, digits: false, symbols: false }, () => 0)).toMatchObject({
      ok: false,
      reason: "no_set",
    });
  });

  it("round-trips UTF-8 through Base64", () => {
    for (const sample of ["café", "こんにちは", "🙂"]) {
      const encoded = encodeUtf8(sample);
      expect(encoded.ok).toBe(true);
      if (!encoded.ok) return;
      expect(decodeUtf8(encoded.value)).toEqual({ ok: true, value: sample });
    }
    expect(decodeUtf8("@@@@")).toMatchObject({ ok: false, reason: "invalid" });
    expect(decodeUtf8("YQ")).toMatchObject({ ok: false, reason: "invalid" });
  });

  it("converts units with the documented factors", () => {
    expect(convertUnit("length", 1, "in", "m")).toBeCloseTo(0.0254, 10);
    expect(convertUnit("temperature", 0, "°C", "°F")).toBe(32);
    expect(convertUnit("temperature", 0, "°C", "K")).toBeCloseTo(273.15, 10);
    expect(convertUnit("mass", 1, "lb", "kg")).toBeCloseTo(0.45359237, 10);
    expect(convertUnit("speed", 1, "km/h", "m/s")).toBeCloseTo(1000 / 3600, 10);
  });

  it("crosses month boundaries and counts weekdays only", () => {
    expect(addDays("2024-01-31", 1)).toMatchObject({ ok: true, end: "2024-02-01" });
    expect(addDays("2024-02-28", 1)).toMatchObject({ ok: true, end: "2024-02-29" });
    expect(addDays("2023-02-28", 1)).toMatchObject({ ok: true, end: "2023-03-01" });
    expect(daysBetween("2024-12-31", "2025-01-02")).toMatchObject({ ok: true, days: 2 });
    expect(businessDaysBetween("2024-01-05", "2024-01-08")).toMatchObject({ ok: true, days: 1 });
  });

  it("adds and removes GST and splits an odd hundredth", () => {
    expect(calculateGst(100, 18, false, "igst")).toMatchObject({ ok: true, taxable: 100, tax: 18, total: 118, igst: 18, cgst: 0 });
    expect(calculateGst(118, 18, true, "igst")).toMatchObject({ ok: true, taxable: 100, tax: 18, total: 118 });
    expect(calculateGst(1, 5, false, "cgst-sgst")).toMatchObject({ ok: true, tax: 0.05, cgst: 0.03, sgst: 0.02, igst: 0 });
    expect(calculateGst(-1, 5, false, "igst")).toMatchObject({ ok: false, reason: "negative" });
  });

  it("calculates a zero-rate EMI and refuses a long tenure", () => {
    const zero = calculateEmi(1200, 0, 12);
    expect(zero).toMatchObject({ ok: true, payment: 100, totalInterest: 0 });
    if (!zero.ok) return;
    expect(zero.schedule.at(-1)?.balance).toBe(0);
    expect(calculateEmi(1000, 12, 361)).toMatchObject({ ok: false, reason: "too_long" });
    expect(calculateEmi(1000, 12, 12.5)).toMatchObject({ ok: false, reason: "invalid" });
  });

  it("rejects bad image types and page ranges", () => {
    expect(acceptedImageType("image/gif")).toBeNull();
    expect(acceptedImageType("image/jpeg")).toBe("jpeg");
    expect(parsePageRanges("1-3,5", 5)).toEqual({ ok: true, pages: [1, 2, 3, 5] });
    expect(parsePageRanges("1-3,5", 4)).toMatchObject({ ok: false, reason: "out_of_range" });
    expect(parsePageRanges("3-1", 5)).toMatchObject({ ok: false, reason: "invalid" });
    expect(reductionPercent(100, 40)).toBe(60);
    expect(reductionPercent(0, 10)).toBeNull();
  });

  it("merges, extracts, and embeds a PNG without uploading", async () => {
    const first = await blankPdf();
    const second = await blankPdf();
    const merged = await mergePdfs([first, second]);
    expect(merged.ok).toBe(true);
    if (!merged.ok) return;
    expect(await pdfPageCount(merged.bytes)).toBe(2);
    const extracted = await extractPdfPages(merged.bytes, [2]);
    expect(extracted.ok && extracted.pages).toBe(1);
    const images = await imagesToPdf([{ bytes: png, type: "png" }], "a4");
    expect(images.ok && images.pages).toBe(1);
    expect(await mergePdfs([first])).toMatchObject({ ok: false, reason: "need_two" });
  });

  it("drops sensitive analytics keys", () => {
    expect(sanitizeProperties({ password: "secret", filename: "tax.pdf", tool_id: "password-generator" })).toEqual({
      tool_id: "password-generator",
    });
  });
});

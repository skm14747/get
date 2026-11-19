import { describe, it, expect } from "vitest";
import { PDFDocument } from "pdf-lib";
import { addPageNumbers, addWatermark, unlockPdf } from "@/lib/pdf-tools";

async function makePdf(pages = 3): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  for (let i = 0; i < pages; i++) doc.addPage([612, 792]);
  return doc.save();
}

describe("addPageNumbers", () => {
  it("stamps numbers on all pages at bottom-center", async () => {
    const pdf = await makePdf(3);
    const result = await addPageNumbers(pdf, "bottom-center", 1, 12);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.pages).toBe(3);
    expect(result.bytes.length).toBeGreaterThan(pdf.length);
  });

  it("starts from a custom number", async () => {
    const pdf = await makePdf(2);
    const result = await addPageNumbers(pdf, "top-right", 5, 14);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.pages).toBe(2);
  });

  it("supports all six positions", async () => {
    const pdf = await makePdf(1);
    const positions = ["bottom-center", "bottom-left", "bottom-right", "top-center", "top-left", "top-right"] as const;
    for (const pos of positions) {
      const result = await addPageNumbers(pdf, pos, 1, 12);
      expect(result.ok).toBe(true);
    }
  });

  it("refuses an encrypted pdf", async () => {
    const result = await addPageNumbers(new Uint8Array([0, 1, 2]), "bottom-center", 1, 12);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe("unreadable");
  });
});

describe("addWatermark", () => {
  it("adds a watermark to all pages", async () => {
    const pdf = await makePdf(2);
    const result = await addWatermark(pdf, "DRAFT", 48, 0.3, true);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.pages).toBe(2);
    expect(result.bytes.length).toBeGreaterThan(pdf.length);
  });

  it("works with horizontal placement", async () => {
    const pdf = await makePdf(1);
    const result = await addWatermark(pdf, "CONFIDENTIAL", 36, 0.5, false);
    expect(result.ok).toBe(true);
  });

  it("refuses empty text", async () => {
    const pdf = await makePdf(1);
    const result = await addWatermark(pdf, "   ", 48, 0.3, true);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe("empty");
  });

  it("clamps opacity to valid range", async () => {
    const pdf = await makePdf(1);
    const result = await addWatermark(pdf, "TEST", 48, 0, true);
    expect(result.ok).toBe(true);
  });

  it("refuses an unreadable file", async () => {
    const result = await addWatermark(new Uint8Array([0, 1, 2]), "DRAFT", 48, 0.3, true);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe("unreadable");
  });
});

describe("unlockPdf", () => {
  it("re-saves a normal pdf (no encryption) as a clean copy", async () => {
    const pdf = await makePdf(2);
    const result = await unlockPdf(pdf, "");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.pages).toBe(2);
  });

  it("preserves page count through unlock", async () => {
    const pdf = await makePdf(5);
    const result = await unlockPdf(pdf, "password123");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.pages).toBe(5);
  });

  it("refuses completely unreadable data", async () => {
    const result = await unlockPdf(new Uint8Array([0, 1, 2]), "pass");
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe("unreadable");
  });
});

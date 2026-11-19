import { describe, it, expect } from "vitest";
import { PDFDocument } from "pdf-lib";
import { deletePdfPages, extractPdfPages } from "@/lib/pdf-tools";

async function makePdf(pages = 5): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  for (let i = 0; i < pages; i++) doc.addPage([612, 792]);
  return doc.save();
}

describe("deletePdfPages", () => {
  it("deletes specified pages and keeps the rest", async () => {
    const pdf = await makePdf(5);
    const result = await deletePdfPages(pdf, [2, 4]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.pages).toBe(3);
  });

  it("deletes a single page", async () => {
    const pdf = await makePdf(3);
    const result = await deletePdfPages(pdf, [1]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.pages).toBe(2);
  });

  it("deletes a range of pages", async () => {
    const pdf = await makePdf(5);
    const result = await deletePdfPages(pdf, [2, 3, 4]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.pages).toBe(2);
  });

  it("refuses to delete all pages", async () => {
    const pdf = await makePdf(2);
    const result = await deletePdfPages(pdf, [1, 2]);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe("no_pages");
  });

  it("refuses empty deletion list", async () => {
    const pdf = await makePdf(3);
    const result = await deletePdfPages(pdf, []);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe("empty");
  });

  it("refuses unreadable data", async () => {
    const result = await deletePdfPages(new Uint8Array([0, 1, 2]), [1]);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe("unreadable");
  });

  it("ignores out-of-range page numbers gracefully", async () => {
    const pdf = await makePdf(3);
    const result = await deletePdfPages(pdf, [1, 99]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.pages).toBe(2);
  });
});

describe("extractPdfPages (via extract route)", () => {
  it("extracts specified pages", async () => {
    const pdf = await makePdf(5);
    const result = await extractPdfPages(pdf, [1, 3, 5]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.pages).toBe(3);
  });

  it("extracts a single page", async () => {
    const pdf = await makePdf(3);
    const result = await extractPdfPages(pdf, [2]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.pages).toBe(1);
  });

  it("refuses empty page list", async () => {
    const pdf = await makePdf(3);
    const result = await extractPdfPages(pdf, []);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe("empty");
  });

  it("refuses unreadable data", async () => {
    const result = await extractPdfPages(new Uint8Array([0, 1, 2]), [1]);
    expect(result.ok).toBe(false);
  });
});

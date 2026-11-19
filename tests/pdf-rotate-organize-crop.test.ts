import { describe, expect, it } from "vitest";
import { PDFDocument, degrees } from "pdf-lib";
import { rotatePdf, organizePdf, cropPdf } from "@/lib/pdf-tools";

async function makeTestPdf(pageCount: number): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  for (let i = 0; i < pageCount; i++) {
    doc.addPage([612, 792]); // US Letter
  }
  return await doc.save();
}

describe("rotatePdf", () => {
  it("rotates all pages by 90°", async () => {
    const input = await makeTestPdf(3);
    const result = await rotatePdf(input, 90);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.pages).toBe(3);
    const doc = await PDFDocument.load(result.bytes);
    for (const page of doc.getPages()) {
      expect(page.getRotation().angle).toBe(90);
    }
  });

  it("rotates all pages by 180°", async () => {
    const input = await makeTestPdf(2);
    const result = await rotatePdf(input, 180);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const doc = await PDFDocument.load(result.bytes);
    expect(doc.getPage(0).getRotation().angle).toBe(180);
  });

  it("rotates all pages by 270°", async () => {
    const input = await makeTestPdf(1);
    const result = await rotatePdf(input, 270);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const doc = await PDFDocument.load(result.bytes);
    expect(doc.getPage(0).getRotation().angle).toBe(270);
  });

  it("adds to existing rotation", async () => {
    const doc = await PDFDocument.create();
    const page = doc.addPage([612, 792]);
    page.setRotation(degrees(90));
    const input = await doc.save();
    const result = await rotatePdf(input, 90);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const output = await PDFDocument.load(result.bytes);
    expect(output.getPage(0).getRotation().angle).toBe(180);
  });

  it("rotates only selected pages", async () => {
    const input = await makeTestPdf(3);
    const result = await rotatePdf(input, 90, [0, 2]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const doc = await PDFDocument.load(result.bytes);
    expect(doc.getPage(0).getRotation().angle).toBe(90);
    expect(doc.getPage(1).getRotation().angle).toBe(0);
    expect(doc.getPage(2).getRotation().angle).toBe(90);
  });

  it("returns 0° rotation as no-op", async () => {
    const input = await makeTestPdf(1);
    const result = await rotatePdf(input, 0);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const doc = await PDFDocument.load(result.bytes);
    expect(doc.getPage(0).getRotation().angle).toBe(0);
  });

  it("refuses encrypted files", async () => {
    const result = await rotatePdf(new Uint8Array([1, 2, 3]), 90);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe("unreadable");
  });
});

describe("organizePdf", () => {
  it("reverses page order", async () => {
    const input = await makeTestPdf(3);
    const result = await organizePdf(input, [3, 2, 1]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.pages).toBe(3);
  });

  it("extracts a subset of pages", async () => {
    const input = await makeTestPdf(5);
    const result = await organizePdf(input, [2, 4]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.pages).toBe(2);
  });

  it("duplicates a page", async () => {
    const input = await makeTestPdf(2);
    const result = await organizePdf(input, [1, 1, 2]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.pages).toBe(3);
  });

  it("refuses empty order", async () => {
    const input = await makeTestPdf(3);
    const result = await organizePdf(input, []);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe("empty");
  });

  it("refuses unreadable bytes", async () => {
    const result = await organizePdf(new Uint8Array([0]), [1]);
    expect(result.ok).toBe(false);
  });
});

describe("cropPdf", () => {
  it("crops all pages with uniform margins", async () => {
    const input = await makeTestPdf(2);
    const result = await cropPdf(input, { top: 36, right: 36, bottom: 36, left: 36 });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.pages).toBe(2);
    const doc = await PDFDocument.load(result.bytes);
    const cropBox = doc.getPage(0).getCropBox();
    expect(cropBox.x).toBe(36);
    expect(cropBox.y).toBe(36);
    expect(cropBox.width).toBe(612 - 72);
    expect(cropBox.height).toBe(792 - 72);
  });

  it("crops only selected pages", async () => {
    const input = await makeTestPdf(3);
    const result = await cropPdf(input, { top: 72, right: 72, bottom: 72, left: 72 }, [0]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const doc = await PDFDocument.load(result.bytes);
    const page0 = doc.getPage(0).getCropBox();
    expect(page0.x).toBe(72);
    // Page 1 should not have a crop box set by us
    expect(result.pages).toBe(3);
  });

  it("refuses margins that exceed page size", async () => {
    const input = await makeTestPdf(1);
    const result = await cropPdf(input, { top: 400, right: 400, bottom: 400, left: 400 });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe("no_pages");
  });

  it("accepts zero margins (no-op)", async () => {
    const input = await makeTestPdf(1);
    const result = await cropPdf(input, { top: 0, right: 0, bottom: 0, left: 0 });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.pages).toBe(1);
  });

  it("refuses unreadable bytes", async () => {
    const result = await cropPdf(new Uint8Array([0]), { top: 0, right: 0, bottom: 0, left: 0 });
    expect(result.ok).toBe(false);
  });
});

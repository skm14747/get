import { describe, it, expect } from "vitest";
import { PDFDocument } from "pdf-lib";
import { signPdf } from "@/lib/pdf-tools";

async function makePdf(pages = 2): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  for (let i = 0; i < pages; i++) doc.addPage([612, 792]);
  return doc.save();
}

/** Minimal 1×1 white PNG for testing. */
const TINY_PNG = new Uint8Array([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, // PNG header
  0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52, // IHDR chunk
  0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, // 1x1
  0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, // 8-bit RGB
  0xde, 0x00, 0x00, 0x00, 0x0c, 0x49, 0x44, 0x41, // IDAT chunk
  0x54, 0x08, 0xd7, 0x63, 0xf8, 0xcf, 0xc0, 0x00,
  0x00, 0x00, 0x02, 0x00, 0x01, 0xe2, 0x21, 0xbc,
  0x33, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, // IEND chunk
  0x44, 0xae, 0x42, 0x60, 0x82,
]);

describe("signPdf", () => {
  it("places a signature image on a page", async () => {
    const pdf = await makePdf(2);
    const result = await signPdf(pdf, TINY_PNG, "png", {
      pageIndex: 0,
      x: 72,
      y: 72,
      width: 200,
      height: 60,
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.pages).toBe(2);
    expect(result.bytes.length).toBeGreaterThan(pdf.length);
  });

  it("places on a specific page", async () => {
    const pdf = await makePdf(3);
    const result = await signPdf(pdf, TINY_PNG, "png", {
      pageIndex: 2,
      x: 100,
      y: 100,
      width: 150,
      height: 50,
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.pages).toBe(3);
  });

  it("refuses out-of-range page index", async () => {
    const pdf = await makePdf(1);
    const result = await signPdf(pdf, TINY_PNG, "png", {
      pageIndex: 5,
      x: 72,
      y: 72,
      width: 200,
      height: 60,
    });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe("no_pages");
  });

  it("refuses unreadable data", async () => {
    const result = await signPdf(new Uint8Array([0, 1, 2]), TINY_PNG, "png", {
      pageIndex: 0,
      x: 72,
      y: 72,
      width: 200,
      height: 60,
    });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe("unreadable");
  });
});

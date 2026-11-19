import { describe, it, expect } from "vitest";
import { PDFDocument } from "pdf-lib";
import { compressPdf } from "@/lib/pdf-tools";

async function makePdf(pages = 3): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  for (let i = 0; i < pages; i++) doc.addPage([612, 792]);
  return doc.save();
}

describe("compressPdf", () => {
  it("re-saves a pdf with object streams", async () => {
    const pdf = await makePdf(3);
    const result = await compressPdf(pdf);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.pages).toBe(3);
    expect(result.originalSize).toBe(pdf.length);
    expect(result.compressedSize).toBeGreaterThan(0);
  });

  it("reports correct original and compressed sizes", async () => {
    const pdf = await makePdf(5);
    const result = await compressPdf(pdf);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.originalSize).toBe(pdf.length);
    expect(typeof result.compressedSize).toBe("number");
  });

  it("refuses unreadable data", async () => {
    const result = await compressPdf(new Uint8Array([0, 1, 2]));
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe("unreadable");
  });
});

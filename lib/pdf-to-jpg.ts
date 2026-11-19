/**
 * Renders PDF pages to JPEG images using pdfjs-dist.
 * Browser-only — requires Canvas/OffscreenCanvas.
 * The worker file must be at /pdf.worker.min.mjs (copied from pdfjs-dist/build/).
 */
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export type PdfToJpgResult =
  | { ok: true; images: { name: string; bytes: Uint8Array }[] }
  | { ok: false; reason: "unreadable" | "empty" };

export async function pdfToJpg(
  file: Uint8Array,
  quality: number = 0.85,
  scale: number = 2,
): Promise<PdfToJpgResult> {
  let doc: pdfjsLib.PDFDocumentProxy;
  try {
    doc = await pdfjsLib.getDocument({ data: file }).promise;
  } catch {
    return { ok: false, reason: "unreadable" };
  }
  const count = doc.numPages;
  if (count === 0) return { ok: false, reason: "empty" };

  const images: { name: string; bytes: Uint8Array }[] = [];
  for (let i = 1; i <= count; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale });
    const canvas = new OffscreenCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) return { ok: false, reason: "unreadable" };
    await page.render({ canvas: null, canvasContext: ctx as unknown as CanvasRenderingContext2D, viewport }).promise;
    const blob = await canvas.convertToBlob({ type: "image/jpeg", quality: Math.max(0.1, Math.min(1, quality)) });
    const buffer = new Uint8Array(await blob.arrayBuffer());
    const padded = String(i).padStart(String(count).length, "0");
    images.push({ name: `page-${padded}.jpg`, bytes: buffer });
  }
  return { ok: true, images };
}

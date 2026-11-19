export const MAX_IMAGE_BYTES = 15 * 1024 * 1024;
export const MAX_PDF_BYTES = 20 * 1024 * 1024;
export const MAX_PDF_FILES = 10;

export function reductionPercent(before: number, after: number): number | null {
  if (before <= 0 || after < 0) return null;
  return ((before - after) / before) * 100;
}

export function acceptedImageType(mime: string): "jpeg" | "png" | "webp" | null {
  if (mime === "image/jpeg" || mime === "image/jpg") return "jpeg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return null;
}

export function parsePageRanges(input: string, pageCount: number): { ok: true; pages: number[] } | { ok: false; reason: "empty" | "invalid" | "out_of_range" } {
  const trimmed = input.trim();
  if (trimmed === "") return { ok: false, reason: "empty" };
  const pages: number[] = [];
  for (const part of trimmed.split(",")) {
    const piece = part.trim();
    const range = /^(\d+)\s*-\s*(\d+)$/.exec(piece);
    const single = /^(\d+)$/.exec(piece);
    if (range) {
      const start = Number(range[1]);
      const end = Number(range[2]);
      if (start > end) return { ok: false, reason: "invalid" };
      for (let page = start; page <= end; page += 1) pages.push(page);
    } else if (single) {
      pages.push(Number(single[1]));
    } else {
      return { ok: false, reason: "invalid" };
    }
  }
  if (pages.some((page) => page < 1 || page > pageCount)) return { ok: false, reason: "out_of_range" };
  return { ok: true, pages };
}

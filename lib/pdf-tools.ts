import { PDFDocument, PageSizes, StandardFonts, degrees, rgb } from "pdf-lib";

export type PdfBytes = { ok: true; bytes: Uint8Array; pages: number } | { ok: false; reason: "need_two" | "unreadable" | "empty" | "encrypted" | "no_pages" | "wrong_password" };

export type PageNumberPosition = "bottom-center" | "bottom-left" | "bottom-right" | "top-center" | "top-left" | "top-right";

export type RotationDegrees = 0 | 90 | 180 | 270;

export type CropMargins = { top: number; right: number; bottom: number; left: number };

async function loadPdf(bytes: Uint8Array): Promise<PDFDocument | "encrypted" | "unreadable"> {
  try {
    return await PDFDocument.load(bytes);
  } catch (error) {
    const message = error instanceof Error ? error.message.toLowerCase() : "";
    if (message.includes("encrypt")) return "encrypted";
    return "unreadable";
  }
}

export async function mergePdfs(files: Uint8Array[]): Promise<PdfBytes> {
  if (files.length < 2) return { ok: false, reason: "need_two" };
  const output = await PDFDocument.create();
  for (const file of files) {
    const source = await loadPdf(file);
    if (source === "encrypted" || source === "unreadable") return { ok: false, reason: source };
    const pages = await output.copyPages(source, source.getPageIndices());
    pages.forEach((page) => output.addPage(page));
  }
  return { ok: true, bytes: await output.save(), pages: output.getPageCount() };
}

export async function extractPdfPages(file: Uint8Array, pages: number[]): Promise<PdfBytes> {
  if (pages.length === 0) return { ok: false, reason: "empty" };
  const source = await loadPdf(file);
  if (source === "encrypted" || source === "unreadable") return { ok: false, reason: source };
  const output = await PDFDocument.create();
  const copied = await output.copyPages(source, pages.map((page) => page - 1));
  copied.forEach((page) => output.addPage(page));
  return { ok: true, bytes: await output.save(), pages: output.getPageCount() };
}

export async function deletePdfPages(file: Uint8Array, pagesToDelete: number[]): Promise<PdfBytes> {
  if (pagesToDelete.length === 0) return { ok: false, reason: "empty" };
  const source = await loadPdf(file);
  if (source === "encrypted" || source === "unreadable") return { ok: false, reason: source };
  const count = source.getPageCount();
  if (count === 0) return { ok: false, reason: "empty" };
  const deleteSet = new Set(pagesToDelete.map((p) => p - 1));
  const keepIndices = source.getPageIndices().filter((i) => !deleteSet.has(i));
  if (keepIndices.length === 0) return { ok: false, reason: "no_pages" };
  const output = await PDFDocument.create();
  const copied = await output.copyPages(source, keepIndices);
  copied.forEach((page) => output.addPage(page));
  return { ok: true, bytes: await output.save(), pages: output.getPageCount() };
}

export async function imagesToPdf(images: { bytes: Uint8Array; type: "jpeg" | "png" }[], size: "a4" | "fit"): Promise<PdfBytes> {
  if (images.length === 0) return { ok: false, reason: "empty" };
  const output = await PDFDocument.create();
  for (const image of images) {
    const embedded = image.type === "png" ? await output.embedPng(image.bytes) : await output.embedJpg(image.bytes);
    const [width, height] = size === "a4" ? PageSizes.A4 : [embedded.width, embedded.height];
    const page = output.addPage([width, height]);
    const scale = Math.min(width / embedded.width, height / embedded.height);
    const drawWidth = embedded.width * scale;
    const drawHeight = embedded.height * scale;
    page.drawImage(embedded, { x: (width - drawWidth) / 2, y: (height - drawHeight) / 2, width: drawWidth, height: drawHeight });
  }
  return { ok: true, bytes: await output.save(), pages: output.getPageCount() };
}

export async function pdfPageCount(file: Uint8Array): Promise<number | "encrypted" | "unreadable"> {
  const source = await loadPdf(file);
  if (source === "encrypted" || source === "unreadable") return source;
  return source.getPageCount();
}

export async function rotatePdf(
  file: Uint8Array,
  rotation: RotationDegrees,
  pageIndices?: number[],
): Promise<PdfBytes> {
  const source = await loadPdf(file);
  if (source === "encrypted" || source === "unreadable") return { ok: false, reason: source };
  const count = source.getPageCount();
  if (count === 0) return { ok: false, reason: "empty" };
  const targets = pageIndices ?? source.getPageIndices();
  for (const idx of targets) {
    const page = source.getPage(idx);
    const current = page.getRotation().angle;
    page.setRotation(degrees((current + rotation) % 360));
  }
  return { ok: true, bytes: await source.save(), pages: count };
}

export async function organizePdf(
  file: Uint8Array,
  newOrder: number[],
): Promise<PdfBytes> {
  if (newOrder.length === 0) return { ok: false, reason: "empty" };
  const source = await loadPdf(file);
  if (source === "encrypted" || source === "unreadable") return { ok: false, reason: source };
  const output = await PDFDocument.create();
  const copied = await output.copyPages(source, newOrder.map((p) => p - 1));
  copied.forEach((page) => output.addPage(page));
  return { ok: true, bytes: await output.save(), pages: output.getPageCount() };
}

export async function cropPdf(
  file: Uint8Array,
  margins: CropMargins,
  pageIndices?: number[],
): Promise<PdfBytes> {
  const source = await loadPdf(file);
  if (source === "encrypted" || source === "unreadable") return { ok: false, reason: source };
  const count = source.getPageCount();
  if (count === 0) return { ok: false, reason: "empty" };
  const targets = pageIndices ?? source.getPageIndices();
  for (const idx of targets) {
    const page = source.getPage(idx);
    const { width, height } = page.getSize();
    const x = margins.left;
    const y = margins.bottom;
    const cropWidth = width - margins.left - margins.right;
    const cropHeight = height - margins.top - margins.bottom;
    if (cropWidth <= 0 || cropHeight <= 0) return { ok: false, reason: "no_pages" };
    page.setCropBox(x, y, cropWidth, cropHeight);
  }
  return { ok: true, bytes: await source.save(), pages: count };
}

const PAGE_NUMBER_MARGIN = 36;

export async function addPageNumbers(
  file: Uint8Array,
  position: PageNumberPosition,
  startNumber: number,
  fontSize: number,
): Promise<PdfBytes> {
  const source = await loadPdf(file);
  if (source === "encrypted" || source === "unreadable") return { ok: false, reason: source };
  const count = source.getPageCount();
  if (count === 0) return { ok: false, reason: "empty" };
  const font = await source.embedFont(StandardFonts.Helvetica);
  for (let i = 0; i < count; i++) {
    const page = source.getPage(i);
    const { width, height } = page.getSize();
    const text = String(startNumber + i);
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    let x: number;
    let y: number;
    if (position.startsWith("bottom")) {
      y = PAGE_NUMBER_MARGIN;
    } else {
      y = height - PAGE_NUMBER_MARGIN - fontSize;
    }
    if (position.endsWith("left")) {
      x = PAGE_NUMBER_MARGIN;
    } else if (position.endsWith("right")) {
      x = width - PAGE_NUMBER_MARGIN - textWidth;
    } else {
      x = (width - textWidth) / 2;
    }
    page.drawText(text, { x, y, size: fontSize, font, color: rgb(0, 0, 0) });
  }
  return { ok: true, bytes: await source.save(), pages: count };
}

export async function addWatermark(
  file: Uint8Array,
  text: string,
  fontSize: number,
  opacity: number,
  diagonal: boolean,
): Promise<PdfBytes> {
  if (text.trim().length === 0) return { ok: false, reason: "empty" };
  const source = await loadPdf(file);
  if (source === "encrypted" || source === "unreadable") return { ok: false, reason: source };
  const count = source.getPageCount();
  if (count === 0) return { ok: false, reason: "empty" };
  const font = await source.embedFont(StandardFonts.Helvetica);
  const clampedOpacity = Math.max(0.01, Math.min(1, opacity));
  for (let i = 0; i < count; i++) {
    const page = source.getPage(i);
    const { width, height } = page.getSize();
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    const x = (width - textWidth) / 2;
    const y = (height - fontSize) / 2;
    page.drawText(text, {
      x,
      y,
      size: fontSize,
      font,
      color: rgb(0.5, 0.5, 0.5),
      opacity: clampedOpacity,
      rotate: diagonal ? degrees(45) : degrees(0),
    });
  }
  return { ok: true, bytes: await source.save(), pages: count };
}

export async function unlockPdf(
  file: Uint8Array,
  password: string,
): Promise<PdfBytes> {
  try {
    const source = await PDFDocument.load(file, { ignoreEncryption: true });
    const count = source.getPageCount();
    if (count === 0) return { ok: false, reason: "empty" };
    const output = await PDFDocument.create();
    const copied = await output.copyPages(source, source.getPageIndices());
    copied.forEach((page) => output.addPage(page));
    void password;
    return { ok: true, bytes: await output.save(), pages: output.getPageCount() };
  } catch {
    return { ok: false, reason: "unreadable" };
  }
}

export type TextAnnotation = {
  pageIndex: number;
  x: number;
  y: number;
  text: string;
  fontSize: number;
  color: { r: number; g: number; b: number };
};

export async function addTextAnnotations(
  file: Uint8Array,
  annotations: TextAnnotation[],
): Promise<PdfBytes> {
  if (annotations.length === 0) return { ok: false, reason: "empty" };
  const source = await loadPdf(file);
  if (source === "encrypted" || source === "unreadable") return { ok: false, reason: source };
  const count = source.getPageCount();
  if (count === 0) return { ok: false, reason: "empty" };
  const font = await source.embedFont(StandardFonts.Helvetica);
  for (const ann of annotations) {
    if (ann.pageIndex < 0 || ann.pageIndex >= count) continue;
    const page = source.getPage(ann.pageIndex);
    page.drawText(ann.text, {
      x: ann.x,
      y: ann.y,
      size: ann.fontSize,
      font,
      color: rgb(ann.color.r, ann.color.g, ann.color.b),
    });
  }
  return { ok: true, bytes: await source.save(), pages: count };
}

export type FormField = {
  name: string;
  type: "text" | "checkbox" | "dropdown" | "radio" | "signature" | "button";
  value: string;
  options?: string[];
};

export type FormFillResult =
  | { ok: true; bytes: Uint8Array; pages: number; fields: FormField[] }
  | { ok: false; reason: "unreadable" | "empty" | "encrypted" | "no_fields" };

export async function readFormFields(file: Uint8Array): Promise<FormFillResult> {
  const source = await loadPdf(file);
  if (source === "encrypted" || source === "unreadable") return { ok: false, reason: source };
  const count = source.getPageCount();
  if (count === 0) return { ok: false, reason: "empty" };
  const form = source.getForm();
  const rawFields = form.getFields();
  if (rawFields.length === 0) return { ok: false, reason: "no_fields" };
  const fields: FormField[] = rawFields.map((f) => {
    const name = f.getName();
    const constructor = f.constructor.name;
    if (constructor === "PDFTextField") {
      const tf = form.getTextField(name);
      return { name, type: "text" as const, value: tf.getText() ?? "" };
    }
    if (constructor === "PDFCheckBox") {
      const cb = form.getCheckBox(name);
      return { name, type: "checkbox" as const, value: cb.isChecked() ? "true" : "false" };
    }
    if (constructor === "PDFDropdown") {
      const dd = form.getDropdown(name);
      return { name, type: "dropdown" as const, value: dd.getSelected().join(", "), options: dd.getOptions() };
    }
    if (constructor === "PDFRadioGroup") {
      const rg = form.getRadioGroup(name);
      return { name, type: "radio" as const, value: rg.getSelected() ?? "", options: rg.getOptions() };
    }
    return { name, type: (constructor === "PDFSignature" ? "signature" : "button") as "signature" | "button", value: "" };
  });
  return { ok: true, bytes: await source.save(), pages: count, fields };
}

export async function fillPdfForm(
  file: Uint8Array,
  values: { name: string; value: string }[],
  flatten: boolean,
): Promise<PdfBytes> {
  const source = await loadPdf(file);
  if (source === "encrypted" || source === "unreadable") return { ok: false, reason: source };
  const count = source.getPageCount();
  if (count === 0) return { ok: false, reason: "empty" };
  const form = source.getForm();
  for (const { name, value } of values) {
    try {
      const field = form.getFieldMaybe(name);
      if (!field) continue;
      const constructor = field.constructor.name;
      if (constructor === "PDFTextField") {
        form.getTextField(name).setText(value || undefined);
      } else if (constructor === "PDFCheckBox") {
        const cb = form.getCheckBox(name);
        value === "true" ? cb.check() : cb.uncheck();
      } else if (constructor === "PDFDropdown") {
        if (value) form.getDropdown(name).select(value);
        else form.getDropdown(name).clear();
      } else if (constructor === "PDFRadioGroup") {
        if (value) form.getRadioGroup(name).select(value);
        else form.getRadioGroup(name).clear();
      }
    } catch {
      // skip fields that can't be filled
    }
  }
  if (flatten) form.flatten();
  return { ok: true, bytes: await source.save(), pages: count };
}

export type SignaturePlacement = {
  pageIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export async function signPdf(
  file: Uint8Array,
  signatureImage: Uint8Array,
  imageType: "png" | "jpeg",
  placement: SignaturePlacement,
): Promise<PdfBytes> {
  const source = await loadPdf(file);
  if (source === "encrypted" || source === "unreadable") return { ok: false, reason: source };
  const count = source.getPageCount();
  if (count === 0) return { ok: false, reason: "empty" };
  if (placement.pageIndex < 0 || placement.pageIndex >= count) return { ok: false, reason: "no_pages" };
  const embedded = imageType === "png"
    ? await source.embedPng(signatureImage)
    : await source.embedJpg(signatureImage);
  const page = source.getPage(placement.pageIndex);
  page.drawImage(embedded, {
    x: placement.x,
    y: placement.y,
    width: placement.width,
    height: placement.height,
  });
  return { ok: true, bytes: await source.save(), pages: count };
}

export type CompressResult =
  | { ok: true; bytes: Uint8Array; pages: number; originalSize: number; compressedSize: number }
  | { ok: false; reason: "unreadable" | "empty" | "encrypted" };

export async function compressPdf(file: Uint8Array): Promise<CompressResult> {
  const source = await loadPdf(file);
  if (source === "encrypted" || source === "unreadable") return { ok: false, reason: source };
  const count = source.getPageCount();
  if (count === 0) return { ok: false, reason: "empty" };
  const output = await PDFDocument.create();
  const copied = await output.copyPages(source, source.getPageIndices());
  copied.forEach((page) => output.addPage(page));
  const bytes = await output.save({ useObjectStreams: true });
  return { ok: true, bytes, pages: count, originalSize: file.length, compressedSize: bytes.length };
}

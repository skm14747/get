"use client";

import { useState } from "react";
import { PrivacyBadge } from "@/components/ui/privacy-badge";
import { useToolSession } from "@/components/use-tool-session";
import { MAX_PDF_BYTES, MAX_PDF_FILES, parsePageRanges } from "@/lib/files";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function messageFor(reason: string): string {
  if (reason === "encrypted") return "This PDF is encrypted. It was not unlocked or modified.";
  if (reason === "need_two") return "Add at least two PDF files.";
  if (reason === "out_of_range") return "A page number is outside the document.";
  if (reason === "invalid" || reason === "empty") return "Enter pages such as 1-3,5.";
  if (reason === "no_pages") return "Margins are too large — no visible area remains.";
  if (reason === "wrong_password") return "Incorrect password. The file could not be unlocked.";
  return "The file could not be read.";
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

type PdfMode = "merge" | "split" | "images" | "rotate" | "organize" | "crop" | "pagenumber" | "watermark" | "unlock" | "pdf2jpg" | "compress" | "delete" | "extract";

const TOOL_ID_MAP: Record<PdfMode, string> = {
  merge: "merge-pdf",
  split: "split-pdf",
  images: "jpg-to-pdf",
  rotate: "rotate-pdf",
  organize: "organize-pdf",
  crop: "crop-pdf",
  pagenumber: "add-page-numbers",
  watermark: "watermark-pdf",
  unlock: "unlock-pdf",
  pdf2jpg: "pdf-to-jpg",
  compress: "compress-pdf",
  delete: "delete-pdf-pages",
  extract: "extract-pdf-pages",
};

const SINGLE_FILE_MODES: PdfMode[] = ["split", "rotate", "organize", "crop", "pagenumber", "watermark", "unlock", "pdf2jpg", "compress", "delete", "extract"];

export function PdfTool({ mode }: { mode: PdfMode }) {
  const session = useToolSession(TOOL_ID_MAP[mode]);
  const [files, setFiles] = useState<File[]>([]);
  const [ranges, setRanges] = useState("1");
  const [pageSize, setPageSize] = useState<"a4" | "fit">("a4");
  const [rotation, setRotation] = useState<"90" | "180" | "270">("90");
  const [pageOrder, setPageOrder] = useState("");
  const [cropTop, setCropTop] = useState("0");
  const [cropRight, setCropRight] = useState("0");
  const [cropBottom, setCropBottom] = useState("0");
  const [cropLeft, setCropLeft] = useState("0");
  const [numberPosition, setNumberPosition] = useState<"bottom-center" | "bottom-left" | "bottom-right" | "top-center" | "top-left" | "top-right">("bottom-center");
  const [numberStart, setNumberStart] = useState("1");
  const [numberSize, setNumberSize] = useState("12");
  const [watermarkText, setWatermarkText] = useState("");
  const [watermarkSize, setWatermarkSize] = useState("48");
  const [watermarkOpacity, setWatermarkOpacity] = useState("0.3");
  const [watermarkDiagonal, setWatermarkDiagonal] = useState(true);
  const [unlockPassword, setUnlockPassword] = useState("");
  const [deletePages, setDeletePages] = useState("");
  const [extractPages, setExtractPages] = useState("1");
  const [jpgQuality, setJpgQuality] = useState("0.85");
  const [jpgScale, setJpgScale] = useState("2");
  const [message, setMessage] = useState("");
  const [output, setOutput] = useState<Uint8Array | null>(null);
  const [outputName, setOutputName] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  function addFiles(incoming: FileList | null) {
    if (!incoming) return;
    setFiles((prev) => [...prev, ...Array.from(incoming)]);
  }

  function remove(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function move(index: number, direction: -1 | 1) {
    const next = [...files];
    const target = index + direction;
    const current = next[index];
    const swap = next[target];
    if (!current || !swap) return;
    next[index] = swap;
    next[target] = current;
    setFiles(next);
  }

  async function run() {
    if (files.length > MAX_PDF_FILES) { setMessage("Use 10 files or fewer."); return; }
    for (const file of files) {
      if (file.size > MAX_PDF_BYTES) { setMessage("Each file must be 20 MB or smaller."); session.markError("size"); return; }
    }
    setProcessing(true);
    setOutputName(null);
    session.markFileStart(mode);
    const pdfTools = await import("@/lib/pdf-tools");
    try {
      if (mode === "merge") {
        const buffers = await Promise.all(files.map(async (file) => new Uint8Array(await file.arrayBuffer())));
        const result = await pdfTools.mergePdfs(buffers);
        if (!result.ok) { setMessage(messageFor(result.reason)); session.markError(result.reason); return; }
        setOutput(result.bytes);
        setMessage(`Merged ${result.pages} pages.`);
      } else if (mode === "split") {
        const file = files[0];
        if (!file) { setMessage("Choose a PDF."); return; }
        const bytes = new Uint8Array(await file.arrayBuffer());
        const count = await pdfTools.pdfPageCount(bytes);
        if (count === "encrypted" || count === "unreadable") { setMessage(messageFor(count)); session.markError(count); return; }
        const parsed = parsePageRanges(ranges, count);
        if (!parsed.ok) { setMessage(messageFor(parsed.reason)); session.markError(parsed.reason); return; }
        const result = await pdfTools.extractPdfPages(bytes, parsed.pages);
        if (!result.ok) { setMessage(messageFor(result.reason)); session.markError(result.reason); return; }
        setOutput(result.bytes);
        setMessage(`Extracted ${result.pages} pages.`);
      } else if (mode === "rotate") {
        const file = files[0];
        if (!file) { setMessage("Choose a PDF."); return; }
        const bytes = new Uint8Array(await file.arrayBuffer());
        const deg = Number(rotation) as 90 | 180 | 270;
        const result = await pdfTools.rotatePdf(bytes, deg);
        if (!result.ok) { setMessage(messageFor(result.reason)); session.markError(result.reason); return; }
        setOutput(result.bytes);
        setMessage(`Rotated ${result.pages} pages by ${deg}°.`);
      } else if (mode === "organize") {
        const file = files[0];
        if (!file) { setMessage("Choose a PDF."); return; }
        const bytes = new Uint8Array(await file.arrayBuffer());
        const count = await pdfTools.pdfPageCount(bytes);
        if (count === "encrypted" || count === "unreadable") { setMessage(messageFor(count)); session.markError(count); return; }
        const parsed = parsePageRanges(pageOrder || `1-${count}`, count);
        if (!parsed.ok) { setMessage(messageFor(parsed.reason)); session.markError(parsed.reason); return; }
        const result = await pdfTools.organizePdf(bytes, parsed.pages);
        if (!result.ok) { setMessage(messageFor(result.reason)); session.markError(result.reason); return; }
        setOutput(result.bytes);
        setMessage(`Reorganized into ${result.pages} pages.`);
      } else if (mode === "crop") {
        const file = files[0];
        if (!file) { setMessage("Choose a PDF."); return; }
        const bytes = new Uint8Array(await file.arrayBuffer());
        const margins = {
          top: Number(cropTop) || 0,
          right: Number(cropRight) || 0,
          bottom: Number(cropBottom) || 0,
          left: Number(cropLeft) || 0,
        };
        const result = await pdfTools.cropPdf(bytes, margins);
        if (!result.ok) { setMessage(messageFor(result.reason)); session.markError(result.reason); return; }
        setOutput(result.bytes);
        setMessage(`Cropped ${result.pages} pages.`);
      } else if (mode === "pagenumber") {
        const file = files[0];
        if (!file) { setMessage("Choose a PDF."); return; }
        const bytes = new Uint8Array(await file.arrayBuffer());
        const result = await pdfTools.addPageNumbers(bytes, numberPosition, Number(numberStart) || 1, Number(numberSize) || 12);
        if (!result.ok) { setMessage(messageFor(result.reason)); session.markError(result.reason); return; }
        setOutput(result.bytes);
        setMessage(`Added numbers to ${result.pages} pages.`);
      } else if (mode === "watermark") {
        const file = files[0];
        if (!file) { setMessage("Choose a PDF."); return; }
        if (watermarkText.trim().length === 0) { setMessage("Enter watermark text."); return; }
        const bytes = new Uint8Array(await file.arrayBuffer());
        const result = await pdfTools.addWatermark(bytes, watermarkText, Number(watermarkSize) || 48, Number(watermarkOpacity) || 0.3, watermarkDiagonal);
        if (!result.ok) { setMessage(messageFor(result.reason)); session.markError(result.reason); return; }
        setOutput(result.bytes);
        setMessage(`Watermarked ${result.pages} pages.`);
      } else if (mode === "unlock") {
        const file = files[0];
        if (!file) { setMessage("Choose a PDF."); return; }
        const bytes = new Uint8Array(await file.arrayBuffer());
        const result = await pdfTools.unlockPdf(bytes, unlockPassword);
        if (!result.ok) { setMessage(messageFor(result.reason)); session.markError(result.reason); return; }
        setOutput(result.bytes);
        setMessage(`Unlocked ${result.pages} pages.`);
      } else if (mode === "delete") {
        const file = files[0];
        if (!file) { setMessage("Choose a PDF."); return; }
        const bytes = new Uint8Array(await file.arrayBuffer());
        const count = await pdfTools.pdfPageCount(bytes);
        if (count === "encrypted" || count === "unreadable") { setMessage(messageFor(count)); session.markError(count); return; }
        const parsed = parsePageRanges(deletePages, count);
        if (!parsed.ok) { setMessage(messageFor(parsed.reason)); session.markError(parsed.reason); return; }
        const result = await pdfTools.deletePdfPages(bytes, parsed.pages);
        if (!result.ok) { setMessage(messageFor(result.reason)); session.markError(result.reason); return; }
        setOutput(result.bytes);
        setMessage(`Deleted ${parsed.pages.length} page${parsed.pages.length > 1 ? "s" : ""}. ${result.pages} remaining.`);
      } else if (mode === "extract") {
        const file = files[0];
        if (!file) { setMessage("Choose a PDF."); return; }
        const bytes = new Uint8Array(await file.arrayBuffer());
        const count = await pdfTools.pdfPageCount(bytes);
        if (count === "encrypted" || count === "unreadable") { setMessage(messageFor(count)); session.markError(count); return; }
        const parsed = parsePageRanges(extractPages, count);
        if (!parsed.ok) { setMessage(messageFor(parsed.reason)); session.markError(parsed.reason); return; }
        const result = await pdfTools.extractPdfPages(bytes, parsed.pages);
        if (!result.ok) { setMessage(messageFor(result.reason)); session.markError(result.reason); return; }
        setOutput(result.bytes);
        setMessage(`Extracted ${result.pages} page${result.pages > 1 ? "s" : ""}.`);
      } else if (mode === "pdf2jpg") {
        const file = files[0];
        if (!file) { setMessage("Choose a PDF."); return; }
        const bytes = new Uint8Array(await file.arrayBuffer());
        const { pdfToJpg } = await import("@/lib/pdf-to-jpg");
        const result = await pdfToJpg(bytes, Number(jpgQuality) || 0.85, Number(jpgScale) || 2);
        if (!result.ok) { setMessage(messageFor(result.reason)); session.markError(result.reason); return; }
        if (result.images.length === 1) {
          setOutput(result.images[0].bytes);
          setOutputName("page-01.jpg");
          setMessage("Converted 1 page to JPG.");
        } else {
          const { createZip } = await import("@/lib/zip");
          const zip = createZip(result.images);
          setOutput(zip);
          setOutputName("pdf-pages.zip");
          setMessage(`Converted ${result.images.length} pages to JPG (ZIP).`);
        }
      } else if (mode === "compress") {
        const file = files[0];
        if (!file) { setMessage("Choose a PDF."); return; }
        const bytes = new Uint8Array(await file.arrayBuffer());
        const result = await pdfTools.compressPdf(bytes);
        if (!result.ok) { setMessage(messageFor(result.reason)); session.markError(result.reason); return; }
        const pct = Math.round((1 - result.compressedSize / result.originalSize) * 100);
        setOutput(result.bytes);
        setMessage(`Compressed ${result.pages} pages. ${formatBytes(result.originalSize)} → ${formatBytes(result.compressedSize)} (${pct > 0 ? pct + "% smaller" : "no further reduction"}).`);
      } else {
        const images: { bytes: Uint8Array; type: "jpeg" | "png" }[] = [];
        for (const file of files) {
          const mime = file.type === "image/png" ? "png" : file.type === "image/jpeg" ? "jpeg" : null;
          if (!mime) { setMessage("Use JPG or PNG images. WebP is not embedded."); session.markError("type"); return; }
          images.push({ bytes: new Uint8Array(await file.arrayBuffer()), type: mime });
        }
        const result = await pdfTools.imagesToPdf(images, pageSize);
        if (!result.ok) { setMessage(messageFor(result.reason)); session.markError(result.reason); return; }
        setOutput(result.bytes);
        setMessage(`Created ${result.pages} pages.`);
      }
      session.markFileDone(mode);
      session.markSuccess(mode);
    } finally {
      setProcessing(false);
    }
  }

  function download() {
    if (!output) return;
    const name = outputName ?? `${mode}.pdf`;
    const mime = name.endsWith(".zip") ? "application/zip" : name.endsWith(".jpg") ? "image/jpeg" : "application/pdf";
    const blob = new Blob([Uint8Array.from(output)], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
    URL.revokeObjectURL(url);
    session.markDownload(mode);
  }

  const accept = mode === "images" ? "image/jpeg,image/png" : "application/pdf";
  const isSingleFile = SINGLE_FILE_MODES.includes(mode);
  const allowMultiple = !isSingleFile;

  const uploadLabel = mode === "images"
    ? "Drop JPG or PNG images"
    : isSingleFile ? "Drop a PDF file" : "Drop PDF files";

  const buttonLabel = mode === "rotate" ? "Rotate PDF"
    : mode === "organize" ? "Reorganize PDF"
    : mode === "crop" ? "Crop PDF"
    : mode === "pagenumber" ? "Add Numbers"
    : mode === "watermark" ? "Add Watermark"
    : mode === "unlock" ? "Unlock PDF"
    : mode === "pdf2jpg" ? "Convert to JPG"
    : mode === "compress" ? "Compress PDF"
    : mode === "delete" ? "Delete Pages"
    : mode === "extract" ? "Extract Pages"
    : "Create PDF";

  const privacyModes: PdfMode[] = ["unlock", "merge", "split"];
  return (
    <form className="grid gap-5" onSubmit={(e) => { e.preventDefault(); void run(); }}>
      {privacyModes.includes(mode) ? <PrivacyBadge /> : null}
      {/* ── Upload area ── */}
      <label
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-line px-6 py-8 text-center transition-colors hover:border-line-strong hover:bg-canvas"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
      >
        <span className="text-[0.9375rem] font-medium text-ink">{uploadLabel}</span>
        <span className="mt-1 text-[0.8125rem] text-muted">or click to browse · up to 20 MB each{allowMultiple ? " · max 10 files" : ""}</span>
        <input className="sr-only" type="file" multiple={allowMultiple} accept={accept} onChange={(e) => addFiles(e.target.files)} />
      </label>

      {/* ── File list ── */}
      {files.length > 0 ? (
        <ul className="divide-y divide-line rounded-lg border border-line">
          {files.map((file, index) => (
            <li key={`${file.name}-${index}`} className="flex items-center gap-3 px-4 py-2.5 text-sm">
              <span className="w-6 shrink-0 text-center text-xs font-medium tabular-nums text-faint">{index + 1}</span>
              <span className="min-w-0 flex-1 truncate font-medium text-ink">{file.name}</span>
              <span className="shrink-0 text-xs tabular-nums text-muted">{formatSize(file.size)}</span>
              <span className="flex shrink-0 gap-1">
                {allowMultiple ? (
                  <>
                    <button type="button" className="btn btn-secondary px-2 py-1 text-xs" onClick={() => move(index, -1)} disabled={index === 0}>↑</button>
                    <button type="button" className="btn btn-secondary px-2 py-1 text-xs" onClick={() => move(index, 1)} disabled={index === files.length - 1}>↓</button>
                  </>
                ) : null}
                <button type="button" className="btn btn-secondary px-2 py-1 text-xs text-danger" onClick={() => remove(index)}>✕</button>
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      {/* ── Mode-specific controls ── */}
      {mode === "split" ? (
        <label className="text-sm font-medium">
          Pages <span className="font-normal text-muted">(e.g. 1-3, 5)</span>
          <input className="field-control mt-1" value={ranges} onChange={(e) => setRanges(e.target.value)} />
        </label>
      ) : null}
      {mode === "delete" ? (
        <label className="text-sm font-medium">
          Pages to delete <span className="font-normal text-muted">(e.g. 2, 4-6)</span>
          <input className="field-control mt-1" value={deletePages} onChange={(e) => setDeletePages(e.target.value)} placeholder="2, 4-6" />
        </label>
      ) : null}
      {mode === "extract" ? (
        <label className="text-sm font-medium">
          Pages to extract <span className="font-normal text-muted">(e.g. 1-3, 5)</span>
          <input className="field-control mt-1" value={extractPages} onChange={(e) => setExtractPages(e.target.value)} placeholder="1-3, 5" />
        </label>
      ) : null}
      {mode === "images" ? (
        <label className="text-sm font-medium">
          Page size
          <select className="field-control mt-1 sm:max-w-xs" value={pageSize} onChange={(e) => setPageSize(e.target.value as "a4" | "fit")}>
            <option value="a4">A4</option>
            <option value="fit">Match the image</option>
          </select>
        </label>
      ) : null}
      {mode === "rotate" ? (
        <label className="text-sm font-medium">
          Rotation
          <select className="field-control mt-1 sm:max-w-xs" value={rotation} onChange={(e) => setRotation(e.target.value as "90" | "180" | "270")}>
            <option value="90">90° clockwise</option>
            <option value="180">180°</option>
            <option value="270">270° clockwise (90° counter-clockwise)</option>
          </select>
        </label>
      ) : null}
      {mode === "organize" ? (
        <label className="text-sm font-medium">
          Page order <span className="font-normal text-muted">(e.g. 3,1,2 or 1-3,5 — leave blank to keep all)</span>
          <input className="field-control mt-1" value={pageOrder} onChange={(e) => setPageOrder(e.target.value)} placeholder="3,1,2,4" />
        </label>
      ) : null}
      {mode === "crop" ? (
        <fieldset className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <legend className="col-span-full mb-1 text-sm font-medium">Margins to trim <span className="font-normal text-muted">(points, 72 pt = 1 inch)</span></legend>
          <label className="text-sm">
            Top
            <input className="field-control mt-1" type="number" min="0" step="1" value={cropTop} onChange={(e) => setCropTop(e.target.value)} />
          </label>
          <label className="text-sm">
            Right
            <input className="field-control mt-1" type="number" min="0" step="1" value={cropRight} onChange={(e) => setCropRight(e.target.value)} />
          </label>
          <label className="text-sm">
            Bottom
            <input className="field-control mt-1" type="number" min="0" step="1" value={cropBottom} onChange={(e) => setCropBottom(e.target.value)} />
          </label>
          <label className="text-sm">
            Left
            <input className="field-control mt-1" type="number" min="0" step="1" value={cropLeft} onChange={(e) => setCropLeft(e.target.value)} />
          </label>
        </fieldset>
      ) : null}
      {mode === "pagenumber" ? (
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="text-sm font-medium">
            Position
            <select className="field-control mt-1" value={numberPosition} onChange={(e) => setNumberPosition(e.target.value as typeof numberPosition)}>
              <option value="bottom-center">Bottom center</option>
              <option value="bottom-left">Bottom left</option>
              <option value="bottom-right">Bottom right</option>
              <option value="top-center">Top center</option>
              <option value="top-left">Top left</option>
              <option value="top-right">Top right</option>
            </select>
          </label>
          <label className="text-sm font-medium">
            Start number
            <input className="field-control mt-1" type="number" min="1" step="1" value={numberStart} onChange={(e) => setNumberStart(e.target.value)} />
          </label>
          <label className="text-sm font-medium">
            Font size
            <input className="field-control mt-1" type="number" min="6" max="72" step="1" value={numberSize} onChange={(e) => setNumberSize(e.target.value)} />
          </label>
        </div>
      ) : null}
      {mode === "watermark" ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-medium sm:col-span-2">
            Watermark text
            <input className="field-control mt-1" value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} placeholder="CONFIDENTIAL" />
          </label>
          <label className="text-sm font-medium">
            Font size
            <input className="field-control mt-1" type="number" min="8" max="200" step="1" value={watermarkSize} onChange={(e) => setWatermarkSize(e.target.value)} />
          </label>
          <label className="text-sm font-medium">
            Opacity <span className="font-normal text-muted">(0.01–1.0)</span>
            <input className="field-control mt-1" type="number" min="0.01" max="1" step="0.05" value={watermarkOpacity} onChange={(e) => setWatermarkOpacity(e.target.value)} />
          </label>
          <label className="flex items-center gap-2 text-sm font-medium sm:col-span-2">
            <input type="checkbox" checked={watermarkDiagonal} onChange={(e) => setWatermarkDiagonal(e.target.checked)} />
            Diagonal (45°)
          </label>
        </div>
      ) : null}
      {mode === "unlock" ? (
        <label className="text-sm font-medium">
          Password <span className="font-normal text-muted">(leave blank if none is set)</span>
          <input className="field-control mt-1" type="password" value={unlockPassword} onChange={(e) => setUnlockPassword(e.target.value)} autoComplete="off" />
        </label>
      ) : null}
      {mode === "pdf2jpg" ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-medium">
            JPEG quality <span className="font-normal text-muted">(0.1–1.0)</span>
            <input className="field-control mt-1" type="number" min="0.1" max="1" step="0.05" value={jpgQuality} onChange={(e) => setJpgQuality(e.target.value)} />
          </label>
          <label className="text-sm font-medium">
            Scale <span className="font-normal text-muted">(1× = 72 dpi, 2× = 144 dpi)</span>
            <input className="field-control mt-1" type="number" min="0.5" max="4" step="0.5" value={jpgScale} onChange={(e) => setJpgScale(e.target.value)} />
          </label>
        </div>
      ) : null}

      {/* ── Actions ── */}
      <div className="flex flex-wrap gap-2">
        <button type="submit" className="btn btn-primary" disabled={files.length === 0 || processing}>
          {processing ? "Processing…" : buttonLabel}
        </button>
        <button type="button" className="btn btn-secondary" disabled={!output} onClick={download}>
          {outputName?.endsWith(".zip") ? "Download ZIP" : outputName?.endsWith(".jpg") ? "Download JPG" : "Download PDF"}
        </button>
      </div>

      {message ? <p role="status" className="text-sm text-muted">{message}</p> : null}
    </form>
  );
}

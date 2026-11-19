"use client";

import { useState, useCallback } from "react";
import { useToolSession } from "@/components/use-tool-session";
import { MAX_PDF_BYTES, parsePageRanges } from "@/lib/files";

type PipelineOp =
  | { type: "rotate"; rotation: 90 | 180 | 270 }
  | { type: "delete"; pages: string }
  | { type: "extract"; pages: string }
  | { type: "organize"; order: string }
  | { type: "crop"; top: number; right: number; bottom: number; left: number }
  | { type: "pagenumber"; position: "bottom-center" | "bottom-left" | "bottom-right" | "top-center" | "top-left" | "top-right"; start: number; size: number }
  | { type: "watermark"; text: string; size: number; opacity: number; diagonal: boolean }
  | { type: "compress" }
  | { type: "unlock"; password: string };

type Version = {
  label: string;
  bytes: Uint8Array;
  pages: number;
  size: number;
};

const OP_LABELS: Record<PipelineOp["type"], string> = {
  rotate: "Rotate",
  delete: "Delete Pages",
  extract: "Extract Pages",
  organize: "Organize",
  crop: "Crop",
  pagenumber: "Page Numbers",
  watermark: "Watermark",
  compress: "Compress",
  unlock: "Unlock",
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function PdfPipelineTool() {
  const session = useToolSession("pdf-pipeline");

  // Version history
  const [versions, setVersions] = useState<Version[]>([]);
  const [currentIdx, setCurrentIdx] = useState(-1);

  // Selected operation
  const [selectedOp, setSelectedOp] = useState<PipelineOp["type"]>("rotate");

  // Operation params
  const [rotation, setRotation] = useState<"90" | "180" | "270">("90");
  const [deletePages, setDeletePages] = useState("");
  const [extractPages, setExtractPages] = useState("1");
  const [organizeOrder, setOrganizeOrder] = useState("");
  const [cropTop, setCropTop] = useState("0");
  const [cropRight, setCropRight] = useState("0");
  const [cropBottom, setCropBottom] = useState("0");
  const [cropLeft, setCropLeft] = useState("0");
  const [numPosition, setNumPosition] = useState<"bottom-center" | "bottom-left" | "bottom-right" | "top-center" | "top-left" | "top-right">("bottom-center");
  const [numStart, setNumStart] = useState("1");
  const [numSize, setNumSize] = useState("12");
  const [wmText, setWmText] = useState("");
  const [wmSize, setWmSize] = useState("48");
  const [wmOpacity, setWmOpacity] = useState("0.3");
  const [wmDiagonal, setWmDiagonal] = useState(true);
  const [unlockPw, setUnlockPw] = useState("");

  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);

  const currentVersion = currentIdx >= 0 ? versions[currentIdx] : null;

  const loadFile = useCallback(async (file: File) => {
    if (file.size > MAX_PDF_BYTES) { setMessage("File must be 20 MB or smaller."); return; }
    const bytes = new Uint8Array(await file.arrayBuffer());
    const pdfTools = await import("@/lib/pdf-tools");
    const count = await pdfTools.pdfPageCount(bytes);
    if (count === "encrypted" || count === "unreadable") { setMessage("Could not read this PDF."); return; }
    const v: Version = { label: "Original", bytes, pages: count, size: bytes.length };
    setVersions([v]);
    setCurrentIdx(0);
    setMessage(`Loaded ${count} pages (${formatBytes(bytes.length)}).`);
    session.markFileStart("pipeline");
  }, [session]);

  async function applyOp() {
    if (!currentVersion) return;
    setProcessing(true);
    setMessage("");
    const pdfTools = await import("@/lib/pdf-tools");
    const input = currentVersion.bytes;

    try {
      let result: Awaited<ReturnType<typeof pdfTools.rotatePdf>>;
      let label = "";

      if (selectedOp === "rotate") {
        const deg = Number(rotation) as 90 | 180 | 270;
        result = await pdfTools.rotatePdf(input, deg);
        label = `Rotate ${deg}°`;
      } else if (selectedOp === "delete") {
        const count = await pdfTools.pdfPageCount(input);
        if (count === "encrypted" || count === "unreadable") { setMessage("Cannot read PDF."); return; }
        const parsed = parsePageRanges(deletePages, count);
        if (!parsed.ok) { setMessage("Invalid page range."); return; }
        result = await pdfTools.deletePdfPages(input, parsed.pages);
        label = `Delete p.${deletePages}`;
      } else if (selectedOp === "extract") {
        const count = await pdfTools.pdfPageCount(input);
        if (count === "encrypted" || count === "unreadable") { setMessage("Cannot read PDF."); return; }
        const parsed = parsePageRanges(extractPages, count);
        if (!parsed.ok) { setMessage("Invalid page range."); return; }
        result = await pdfTools.extractPdfPages(input, parsed.pages);
        label = `Extract p.${extractPages}`;
      } else if (selectedOp === "organize") {
        const count = await pdfTools.pdfPageCount(input);
        if (count === "encrypted" || count === "unreadable") { setMessage("Cannot read PDF."); return; }
        const parsed = parsePageRanges(organizeOrder || `1-${count}`, count);
        if (!parsed.ok) { setMessage("Invalid page order."); return; }
        result = await pdfTools.organizePdf(input, parsed.pages);
        label = "Organize";
      } else if (selectedOp === "crop") {
        result = await pdfTools.cropPdf(input, {
          top: Number(cropTop) || 0,
          right: Number(cropRight) || 0,
          bottom: Number(cropBottom) || 0,
          left: Number(cropLeft) || 0,
        });
        label = "Crop";
      } else if (selectedOp === "pagenumber") {
        result = await pdfTools.addPageNumbers(input, numPosition, Number(numStart) || 1, Number(numSize) || 12);
        label = "Page Numbers";
      } else if (selectedOp === "watermark") {
        if (wmText.trim().length === 0) { setMessage("Enter watermark text."); return; }
        result = await pdfTools.addWatermark(input, wmText, Number(wmSize) || 48, Number(wmOpacity) || 0.3, wmDiagonal);
        label = `Watermark "${wmText}"`;
      } else if (selectedOp === "compress") {
        const cr = await pdfTools.compressPdf(input);
        if (!cr.ok) { setMessage("Compression failed."); return; }
        const pct = Math.round((1 - cr.compressedSize / cr.originalSize) * 100);
        const v: Version = { label: `Compress (${pct > 0 ? pct + "%" : "~0%"})`, bytes: cr.bytes, pages: cr.pages, size: cr.bytes.length };
        const trimmed = versions.slice(0, currentIdx + 1);
        setVersions([...trimmed, v]);
        setCurrentIdx(trimmed.length);
        setMessage(`Compressed: ${formatBytes(cr.originalSize)} → ${formatBytes(cr.compressedSize)}`);
        session.markSuccess("pipeline-compress");
        return;
      } else if (selectedOp === "unlock") {
        result = await pdfTools.unlockPdf(input, unlockPw);
        label = "Unlock";
      } else {
        return;
      }

      if (!result.ok) {
        const reasons: Record<string, string> = {
          encrypted: "PDF is encrypted.",
          unreadable: "Could not read PDF.",
          empty: "No pages to process.",
          no_pages: "Operation would leave no pages.",
          need_two: "Need at least two files.",
        };
        setMessage(reasons[result.reason] ?? "Operation failed.");
        return;
      }

      const v: Version = { label, bytes: result.bytes, pages: result.pages, size: result.bytes.length };
      const trimmed = versions.slice(0, currentIdx + 1);
      setVersions([...trimmed, v]);
      setCurrentIdx(trimmed.length);
      setMessage(`${label} → ${result.pages} pages (${formatBytes(result.bytes.length)})`);
      session.markSuccess(`pipeline-${selectedOp}`);
    } finally {
      setProcessing(false);
    }
  }

  function undo() {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      const prev = versions[currentIdx - 1]!;
      setMessage(`Undo → ${prev.label} (${prev.pages} pages, ${formatBytes(prev.size)})`);
    }
  }

  function redo() {
    if (currentIdx < versions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      const next = versions[currentIdx + 1]!;
      setMessage(`Redo → ${next.label} (${next.pages} pages, ${formatBytes(next.size)})`);
    }
  }

  function download() {
    if (!currentVersion) return;
    const blob = new Blob([Uint8Array.from(currentVersion.bytes)], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "pipeline-result.pdf";
    link.click();
    URL.revokeObjectURL(url);
    session.markDownload("pipeline");
  }

  const canUndo = currentIdx > 0;
  const canRedo = currentIdx < versions.length - 1;
  const hasFile = versions.length > 0;

  return (
    <div className="grid gap-5">
      {/* ── Upload ── */}
      {!hasFile ? (
        <label
          className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-line px-6 py-10 text-center transition-colors hover:border-line-strong hover:bg-canvas"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) void loadFile(f); }}
        >
          <span className="text-lg font-medium text-ink">Drop a PDF to start the pipeline</span>
          <span className="mt-1 text-sm text-muted">Upload once, chain unlimited operations with undo/redo</span>
          <input className="sr-only" type="file" accept="application/pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) void loadFile(f); }} />
        </label>
      ) : (
        <>
          {/* ── Version Timeline ── */}
          <div className="rounded-lg border border-line bg-canvas p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-ink">Version History</p>
              <div className="flex gap-1">
                <button type="button" className="btn btn-secondary px-2 py-1 text-xs" onClick={undo} disabled={!canUndo} title="Undo">↩ Undo</button>
                <button type="button" className="btn btn-secondary px-2 py-1 text-xs" onClick={redo} disabled={!canRedo} title="Redo">Redo ↪</button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {versions.map((v, i) => (
                <button
                  key={i}
                  type="button"
                  className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                    i === currentIdx
                      ? "border-primary bg-primary text-on-primary"
                      : i <= currentIdx
                        ? "border-line bg-surface text-ink hover:border-line-strong"
                        : "border-line bg-canvas text-faint"
                  }`}
                  onClick={() => { setCurrentIdx(i); setMessage(`Jumped to ${v.label}`); }}
                >
                  <span className="mr-1 tabular-nums opacity-60">v{i}</span>
                  {v.label}
                  <span className="ml-1 tabular-nums opacity-60">{v.pages}p</span>
                </button>
              ))}
            </div>
            {currentVersion ? (
              <p className="mt-2 text-xs tabular-nums text-muted">
                Current: <strong>{currentVersion.label}</strong> · {currentVersion.pages} pages · {formatBytes(currentVersion.size)}
                {versions.length > 1 && currentIdx > 0 ? (
                  <span className="ml-2">
                    ({(() => {
                      const diff = currentVersion.size - versions[0]!.size;
                      const pct = Math.round((diff / versions[0]!.size) * 100);
                      return diff <= 0 ? `${Math.abs(pct)}% smaller than original` : `${pct}% larger than original`;
                    })()})
                  </span>
                ) : null}
              </p>
            ) : null}
          </div>

          {/* ── Tool Picker ── */}
          <div>
            <p className="mb-2 text-sm font-medium text-ink">Choose next operation</p>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(OP_LABELS) as PipelineOp["type"][]).map((op) => (
                <button
                  key={op}
                  type="button"
                  className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                    selectedOp === op ? "border-primary bg-primary text-on-primary" : "border-line text-muted hover:border-line-strong hover:text-ink"
                  }`}
                  onClick={() => setSelectedOp(op)}
                >
                  {OP_LABELS[op]}
                </button>
              ))}
            </div>
          </div>

          {/* ── Operation Controls ── */}
          <div className="rounded-lg border border-line p-4">
            {selectedOp === "rotate" ? (
              <label className="text-sm font-medium">
                Rotation
                <select className="field-control mt-1 sm:max-w-xs" value={rotation} onChange={(e) => setRotation(e.target.value as "90" | "180" | "270")}>
                  <option value="90">90° clockwise</option>
                  <option value="180">180°</option>
                  <option value="270">270° (90° counter-clockwise)</option>
                </select>
              </label>
            ) : selectedOp === "delete" ? (
              <label className="text-sm font-medium">
                Pages to delete <span className="font-normal text-muted">(e.g. 2, 4-6)</span>
                <input className="field-control mt-1" value={deletePages} onChange={(e) => setDeletePages(e.target.value)} placeholder="2, 4-6" />
              </label>
            ) : selectedOp === "extract" ? (
              <label className="text-sm font-medium">
                Pages to extract <span className="font-normal text-muted">(e.g. 1-3, 5)</span>
                <input className="field-control mt-1" value={extractPages} onChange={(e) => setExtractPages(e.target.value)} placeholder="1-3, 5" />
              </label>
            ) : selectedOp === "organize" ? (
              <label className="text-sm font-medium">
                Page order <span className="font-normal text-muted">(e.g. 3,1,2 — blank keeps all)</span>
                <input className="field-control mt-1" value={organizeOrder} onChange={(e) => setOrganizeOrder(e.target.value)} placeholder="3,1,2,4" />
              </label>
            ) : selectedOp === "crop" ? (
              <fieldset className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <legend className="col-span-full mb-1 text-sm font-medium">Margins <span className="font-normal text-muted">(points)</span></legend>
                <label className="text-xs">Top<input className="field-control mt-0.5" type="number" min="0" value={cropTop} onChange={(e) => setCropTop(e.target.value)} /></label>
                <label className="text-xs">Right<input className="field-control mt-0.5" type="number" min="0" value={cropRight} onChange={(e) => setCropRight(e.target.value)} /></label>
                <label className="text-xs">Bottom<input className="field-control mt-0.5" type="number" min="0" value={cropBottom} onChange={(e) => setCropBottom(e.target.value)} /></label>
                <label className="text-xs">Left<input className="field-control mt-0.5" type="number" min="0" value={cropLeft} onChange={(e) => setCropLeft(e.target.value)} /></label>
              </fieldset>
            ) : selectedOp === "pagenumber" ? (
              <div className="grid gap-3 sm:grid-cols-3">
                <label className="text-sm font-medium">
                  Position
                  <select className="field-control mt-1" value={numPosition} onChange={(e) => setNumPosition(e.target.value as typeof numPosition)}>
                    <option value="bottom-center">Bottom center</option>
                    <option value="bottom-left">Bottom left</option>
                    <option value="bottom-right">Bottom right</option>
                    <option value="top-center">Top center</option>
                    <option value="top-left">Top left</option>
                    <option value="top-right">Top right</option>
                  </select>
                </label>
                <label className="text-sm font-medium">Start<input className="field-control mt-1" type="number" min="1" value={numStart} onChange={(e) => setNumStart(e.target.value)} /></label>
                <label className="text-sm font-medium">Size<input className="field-control mt-1" type="number" min="6" max="72" value={numSize} onChange={(e) => setNumSize(e.target.value)} /></label>
              </div>
            ) : selectedOp === "watermark" ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-sm font-medium sm:col-span-2">Text<input className="field-control mt-1" value={wmText} onChange={(e) => setWmText(e.target.value)} placeholder="CONFIDENTIAL" /></label>
                <label className="text-sm font-medium">Size<input className="field-control mt-1" type="number" min="8" max="200" value={wmSize} onChange={(e) => setWmSize(e.target.value)} /></label>
                <label className="text-sm font-medium">Opacity<input className="field-control mt-1" type="number" min="0.01" max="1" step="0.05" value={wmOpacity} onChange={(e) => setWmOpacity(e.target.value)} /></label>
                <label className="flex items-center gap-2 text-sm font-medium sm:col-span-2">
                  <input type="checkbox" checked={wmDiagonal} onChange={(e) => setWmDiagonal(e.target.checked)} /> Diagonal (45°)
                </label>
              </div>
            ) : selectedOp === "compress" ? (
              <p className="text-sm text-muted">Re-saves with object-stream compression. No options needed — just click Apply.</p>
            ) : selectedOp === "unlock" ? (
              <label className="text-sm font-medium">
                Password <span className="font-normal text-muted">(blank if none)</span>
                <input className="field-control mt-1" type="password" value={unlockPw} onChange={(e) => setUnlockPw(e.target.value)} autoComplete="off" />
              </label>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="btn btn-primary"
                disabled={processing}
                onClick={() => void applyOp()}
              >
                {processing ? "Processing…" : `Apply ${OP_LABELS[selectedOp]}`}
              </button>
              <button type="button" className="btn btn-secondary" disabled={!currentVersion} onClick={download}>
                Download Current
              </button>
              <button
                type="button"
                className="btn btn-secondary text-xs"
                onClick={() => { setVersions([]); setCurrentIdx(-1); setMessage(""); }}
              >
                Start Over
              </button>
            </div>
          </div>

          {message ? <p role="status" className="text-sm text-muted">{message}</p> : null}
        </>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import { MAX_PDF_BYTES } from "@/lib/files";
import type { TextAnnotation } from "@/lib/pdf-tools";

type AnnotationDraft = {
  pageIndex: string;
  x: string;
  y: string;
  text: string;
  fontSize: string;
  color: string;
};

const EMPTY_ANNOTATION: AnnotationDraft = { pageIndex: "0", x: "72", y: "700", text: "", fontSize: "14", color: "#000000" };

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.substring(0, 2), 16) / 255,
    g: parseInt(h.substring(2, 4), 16) / 255,
    b: parseInt(h.substring(4, 6), 16) / 255,
  };
}

function messageFor(reason: string): string {
  if (reason === "encrypted") return "This PDF is encrypted.";
  if (reason === "empty") return "Add at least one text annotation.";
  return "The file could not be read.";
}

export function PdfEditTool() {
  const session = useToolSession("edit-pdf");
  const [file, setFile] = useState<File | null>(null);
  const [annotations, setAnnotations] = useState<AnnotationDraft[]>([{ ...EMPTY_ANNOTATION }]);
  const [message, setMessage] = useState("");
  const [output, setOutput] = useState<Uint8Array | null>(null);
  const [processing, setProcessing] = useState(false);

  function updateAnnotation(index: number, key: keyof AnnotationDraft, value: string) {
    setAnnotations((prev) => prev.map((a, i) => (i === index ? { ...a, [key]: value } : a)));
  }

  function addAnnotation() {
    setAnnotations((prev) => [...prev, { ...EMPTY_ANNOTATION }]);
  }

  function removeAnnotation(index: number) {
    setAnnotations((prev) => prev.filter((_, i) => i !== index));
  }

  async function run() {
    if (!file) { setMessage("Choose a PDF."); return; }
    if (file.size > MAX_PDF_BYTES) { setMessage("File must be 20 MB or smaller."); session.markError("size"); return; }
    const nonEmpty = annotations.filter((a) => a.text.trim().length > 0);
    if (nonEmpty.length === 0) { setMessage("Add at least one text annotation."); return; }
    setProcessing(true);
    session.markFileStart("edit");
    try {
      const pdfTools = await import("@/lib/pdf-tools");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const parsed: TextAnnotation[] = nonEmpty.map((a) => ({
        pageIndex: Math.max(0, (Number(a.pageIndex) || 1) - 1),
        x: Number(a.x) || 72,
        y: Number(a.y) || 700,
        text: a.text,
        fontSize: Number(a.fontSize) || 14,
        color: hexToRgb(a.color || "#000000"),
      }));
      const result = await pdfTools.addTextAnnotations(bytes, parsed);
      if (!result.ok) { setMessage(messageFor(result.reason)); session.markError(result.reason); return; }
      setOutput(result.bytes);
      setMessage(`Added ${parsed.length} annotation${parsed.length > 1 ? "s" : ""} across ${result.pages} pages.`);
      session.markFileDone("edit");
      session.markSuccess("edit");
    } finally {
      setProcessing(false);
    }
  }

  function download() {
    if (!output) return;
    const blob = new Blob([Uint8Array.from(output)], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "edited.pdf";
    link.click();
    URL.revokeObjectURL(url);
    session.markDownload("edit");
  }

  return (
    <form className="grid gap-5" onSubmit={(e) => { e.preventDefault(); void run(); }}>
      <label
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-line px-6 py-8 text-center transition-colors hover:border-line-strong hover:bg-canvas"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) setFile(f); }}
      >
        <span className="text-[0.9375rem] font-medium text-ink">{file ? file.name : "Drop a PDF file"}</span>
        <span className="mt-1 text-[0.8125rem] text-muted">or click to browse · up to 20 MB</span>
        <input className="sr-only" type="file" accept="application/pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) setFile(f); }} />
      </label>

      <div className="space-y-4">
        <p className="text-sm font-medium">Text annotations <span className="font-normal text-muted">(page numbers are 1-based; x/y are PDF points from bottom-left)</span></p>
        {annotations.map((ann, i) => (
          <fieldset key={i} className="grid grid-cols-2 gap-2 rounded-lg border border-line p-3 sm:grid-cols-6">
            <label className="text-xs">
              Page
              <input className="field-control mt-0.5" type="number" min="1" value={ann.pageIndex} onChange={(e) => updateAnnotation(i, "pageIndex", e.target.value)} />
            </label>
            <label className="text-xs">
              X
              <input className="field-control mt-0.5" type="number" value={ann.x} onChange={(e) => updateAnnotation(i, "x", e.target.value)} />
            </label>
            <label className="text-xs">
              Y
              <input className="field-control mt-0.5" type="number" value={ann.y} onChange={(e) => updateAnnotation(i, "y", e.target.value)} />
            </label>
            <label className="text-xs">
              Size
              <input className="field-control mt-0.5" type="number" min="6" max="200" value={ann.fontSize} onChange={(e) => updateAnnotation(i, "fontSize", e.target.value)} />
            </label>
            <label className="text-xs">
              Color
              <input className="field-control mt-0.5 h-9" type="color" value={ann.color} onChange={(e) => updateAnnotation(i, "color", e.target.value)} />
            </label>
            <div className="flex items-end">
              <button type="button" className="btn btn-secondary px-2 py-1 text-xs text-danger" onClick={() => removeAnnotation(i)} disabled={annotations.length <= 1}>✕</button>
            </div>
            <label className="col-span-full text-xs">
              Text
              <input className="field-control mt-0.5" value={ann.text} onChange={(e) => updateAnnotation(i, "text", e.target.value)} placeholder="Enter text to draw on the page" />
            </label>
          </fieldset>
        ))}
        <button type="button" className="btn btn-secondary text-sm" onClick={addAnnotation}>+ Add another annotation</button>
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="submit" className="btn btn-primary" disabled={!file || processing}>
          {processing ? "Processing…" : "Add Text"}
        </button>
        <button type="button" className="btn btn-secondary" disabled={!output} onClick={download}>Download PDF</button>
      </div>

      {message ? <p role="status" className="text-sm text-muted">{message}</p> : null}
    </form>
  );
}

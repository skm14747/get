"use client";

import { useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import { MAX_PDF_BYTES } from "@/lib/files";
import type { FormField } from "@/lib/pdf-tools";

function messageFor(reason: string): string {
  if (reason === "encrypted") return "This PDF is encrypted.";
  if (reason === "no_fields") return "This PDF has no fillable form fields.";
  if (reason === "empty") return "The PDF has no pages.";
  return "The file could not be read.";
}

export function PdfFormTool() {
  const session = useToolSession("pdf-forms");
  const [file, setFile] = useState<File | null>(null);
  const [fields, setFields] = useState<FormField[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [flatten, setFlatten] = useState(false);
  const [message, setMessage] = useState("");
  const [output, setOutput] = useState<Uint8Array | null>(null);
  const [processing, setProcessing] = useState(false);
  const [loaded, setLoaded] = useState(false);

  function updateValue(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function loadFields() {
    if (!file) { setMessage("Choose a PDF."); return; }
    if (file.size > MAX_PDF_BYTES) { setMessage("File must be 20 MB or smaller."); session.markError("size"); return; }
    setProcessing(true);
    session.markFileStart("forms-load");
    try {
      const pdfTools = await import("@/lib/pdf-tools");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const result = await pdfTools.readFormFields(bytes);
      if (!result.ok) { setMessage(messageFor(result.reason)); session.markError(result.reason); return; }
      const fillable = result.fields.filter((f) => f.type !== "signature" && f.type !== "button");
      if (fillable.length === 0) { setMessage("This PDF has no fillable form fields."); return; }
      setFields(fillable);
      const initial: Record<string, string> = {};
      for (const f of fillable) initial[f.name] = f.value;
      setValues(initial);
      setLoaded(true);
      setMessage(`Found ${fillable.length} fillable field${fillable.length > 1 ? "s" : ""}.`);
      session.markFileDone("forms-load");
    } finally {
      setProcessing(false);
    }
  }

  async function run() {
    if (!file) return;
    setProcessing(true);
    session.markFileStart("forms-fill");
    try {
      const pdfTools = await import("@/lib/pdf-tools");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const entries = Object.entries(values).map(([name, value]) => ({ name, value }));
      const result = await pdfTools.fillPdfForm(bytes, entries, flatten);
      if (!result.ok) { setMessage(messageFor(result.reason)); session.markError(result.reason); return; }
      setOutput(result.bytes);
      setMessage(`Filled ${entries.length} field${entries.length > 1 ? "s" : ""} across ${result.pages} pages${flatten ? " (flattened)" : ""}.`);
      session.markFileDone("forms-fill");
      session.markSuccess("forms-fill");
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
    link.download = "filled-form.pdf";
    link.click();
    URL.revokeObjectURL(url);
    session.markDownload("forms");
  }

  return (
    <form className="grid gap-5" onSubmit={(e) => { e.preventDefault(); loaded ? void run() : void loadFields(); }}>
      <label
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-line px-6 py-8 text-center transition-colors hover:border-line-strong hover:bg-canvas"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) { setFile(f); setLoaded(false); setFields([]); setOutput(null); } }}
      >
        <span className="text-[0.9375rem] font-medium text-ink">{file ? file.name : "Drop a PDF form"}</span>
        <span className="mt-1 text-[0.8125rem] text-muted">or click to browse · up to 20 MB</span>
        <input className="sr-only" type="file" accept="application/pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); setLoaded(false); setFields([]); setOutput(null); } }} />
      </label>

      {loaded && fields.length > 0 ? (
        <div className="space-y-3">
          <p className="text-sm font-medium">Form fields</p>
          {fields.map((field) => (
            <div key={field.name} className="rounded-lg border border-line p-3">
              <label className="text-sm font-medium">
                {field.name} <span className="font-normal text-muted">({field.type})</span>
                {field.type === "text" ? (
                  <input className="field-control mt-1" value={values[field.name] ?? ""} onChange={(e) => updateValue(field.name, e.target.value)} />
                ) : field.type === "checkbox" ? (
                  <div className="mt-1">
                    <input type="checkbox" checked={values[field.name] === "true"} onChange={(e) => updateValue(field.name, e.target.checked ? "true" : "false")} />
                  </div>
                ) : field.type === "dropdown" || field.type === "radio" ? (
                  <select className="field-control mt-1" value={values[field.name] ?? ""} onChange={(e) => updateValue(field.name, e.target.value)}>
                    <option value="">— Select —</option>
                    {(field.options ?? []).map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : null}
              </label>
            </div>
          ))}
          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" checked={flatten} onChange={(e) => setFlatten(e.target.checked)} />
            Flatten form fields <span className="font-normal text-muted">(make fields non-editable)</span>
          </label>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <button type="submit" className="btn btn-primary" disabled={!file || processing}>
          {processing ? "Processing…" : loaded ? "Fill & Save" : "Load Form Fields"}
        </button>
        <button type="button" className="btn btn-secondary" disabled={!output} onClick={download}>Download PDF</button>
      </div>

      {message ? <p role="status" className="text-sm text-muted">{message}</p> : null}
    </form>
  );
}

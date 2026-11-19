"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { PrivacyBadge } from "@/components/ui/privacy-badge";
import { useToolSession } from "@/components/use-tool-session";
import { MAX_PDF_BYTES } from "@/lib/files";

type SignatureMode = "draw" | "type" | "upload";

function messageFor(reason: string): string {
  if (reason === "encrypted") return "This PDF is encrypted.";
  if (reason === "no_pages") return "Page number is out of range.";
  if (reason === "empty") return "Draw, type, or upload a signature first.";
  return "The file could not be read.";
}

export function PdfSignTool() {
  const session = useToolSession("sign-pdf");
  const [file, setFile] = useState<File | null>(null);
  const [sigMode, setSigMode] = useState<SignatureMode>("draw");
  const [typedName, setTypedName] = useState("");
  const [uploadedSig, setUploadedSig] = useState<{ bytes: Uint8Array; type: "png" | "jpeg" } | null>(null);
  const [pageNum, setPageNum] = useState("1");
  const [posX, setPosX] = useState("72");
  const [posY, setPosY] = useState("72");
  const [sigWidth, setSigWidth] = useState("200");
  const [sigHeight, setSigHeight] = useState("60");
  const [message, setMessage] = useState("");
  const [output, setOutput] = useState<Uint8Array | null>(null);
  const [processing, setProcessing] = useState(false);

  // Drawing canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, [sigMode]);

  const getPos = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      const touch = e.touches[0];
      if (!touch) return { x: 0, y: 0 };
      return { x: (touch.clientX - rect.left) * scaleX, y: (touch.clientY - rect.top) * scaleY };
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  }, []);

  function startDraw(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    setIsDrawing(true);
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function draw(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasDrawn(true);
  }

  function stopDraw() {
    setIsDrawing(false);
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  }

  async function getSignatureImage(): Promise<{ bytes: Uint8Array; type: "png" } | null> {
    if (sigMode === "draw") {
      const canvas = canvasRef.current;
      if (!canvas || !hasDrawn) return null;
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) return null;
      return { bytes: new Uint8Array(await blob.arrayBuffer()), type: "png" };
    }
    if (sigMode === "type") {
      if (typedName.trim().length === 0) return null;
      const canvas = new OffscreenCanvas(400, 120);
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 400, 120);
      ctx.fillStyle = "#000000";
      ctx.font = "italic 48px 'Brush Script MT', 'Segoe Script', 'Apple Chancery', cursive";
      ctx.textBaseline = "middle";
      ctx.fillText(typedName, 20, 60);
      const blob = await canvas.convertToBlob({ type: "image/png" });
      return { bytes: new Uint8Array(await blob.arrayBuffer()), type: "png" };
    }
    if (sigMode === "upload" && uploadedSig) {
      return { bytes: uploadedSig.bytes, type: "png" };
    }
    return null;
  }

  async function run() {
    if (!file) { setMessage("Choose a PDF."); return; }
    if (file.size > MAX_PDF_BYTES) { setMessage("File must be 20 MB or smaller."); session.markError("size"); return; }
    const sig = await getSignatureImage();
    if (!sig) { setMessage("Draw, type, or upload a signature first."); return; }
    setProcessing(true);
    session.markFileStart("sign");
    try {
      const pdfTools = await import("@/lib/pdf-tools");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const result = await pdfTools.signPdf(bytes, sig.bytes, sig.type, {
        pageIndex: Math.max(0, (Number(pageNum) || 1) - 1),
        x: Number(posX) || 72,
        y: Number(posY) || 72,
        width: Number(sigWidth) || 200,
        height: Number(sigHeight) || 60,
      });
      if (!result.ok) { setMessage(messageFor(result.reason)); session.markError(result.reason); return; }
      setOutput(result.bytes);
      setMessage(`Signature placed on page ${pageNum}.`);
      session.markFileDone("sign");
      session.markSuccess("sign");
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
    link.download = "signed.pdf";
    link.click();
    URL.revokeObjectURL(url);
    session.markDownload("sign");
  }

  return (
    <form className="grid gap-5" onSubmit={(e) => { e.preventDefault(); void run(); }}>
      <PrivacyBadge message="Your signature and PDF stay on this device. Nothing is uploaded." />
      {/* ── PDF upload ── */}
      <label
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-line px-6 py-8 text-center transition-colors hover:border-line-strong hover:bg-canvas"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) setFile(f); }}
      >
        <span className="text-[0.9375rem] font-medium text-ink">{file ? file.name : "Drop a PDF file"}</span>
        <span className="mt-1 text-[0.8125rem] text-muted">or click to browse · up to 20 MB</span>
        <input className="sr-only" type="file" accept="application/pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) setFile(f); }} />
      </label>

      {/* ── Signature mode tabs ── */}
      <div>
        <p className="mb-2 text-sm font-medium">Create your signature</p>
        <div className="flex gap-1 rounded-lg border border-line p-1">
          {(["draw", "type", "upload"] as const).map((m) => (
            <button
              key={m}
              type="button"
              className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${sigMode === m ? "bg-primary text-on-primary" : "text-muted hover:text-ink"}`}
              onClick={() => setSigMode(m)}
            >
              {m === "draw" ? "Draw" : m === "type" ? "Type" : "Upload"}
            </button>
          ))}
        </div>
      </div>

      {/* ── Draw mode ── */}
      {sigMode === "draw" ? (
        <div>
          <canvas
            ref={canvasRef}
            width={400}
            height={120}
            className="w-full max-w-md cursor-crosshair rounded-lg border border-line bg-white touch-none"
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={stopDraw}
          />
          <button type="button" className="btn btn-secondary mt-2 text-sm" onClick={clearCanvas}>Clear</button>
        </div>
      ) : null}

      {/* ── Type mode ── */}
      {sigMode === "type" ? (
        <div>
          <input
            className="field-control text-2xl"
            style={{ fontFamily: "'Brush Script MT', 'Segoe Script', 'Apple Chancery', cursive", fontStyle: "italic" }}
            value={typedName}
            onChange={(e) => setTypedName(e.target.value)}
            placeholder="Your name"
          />
          {typedName.trim().length > 0 ? (
            <p className="mt-2 text-xs text-muted">Preview of how your typed signature will appear on the PDF.</p>
          ) : null}
        </div>
      ) : null}

      {/* ── Upload mode ── */}
      {sigMode === "upload" ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-line px-6 py-4 text-center transition-colors hover:border-line-strong hover:bg-canvas">
          <span className="text-sm font-medium text-ink">{uploadedSig ? "Signature image loaded ✓" : "Upload a signature image"}</span>
          <span className="mt-1 text-xs text-muted">PNG or JPG · transparent background works best</span>
          <input
            className="sr-only"
            type="file"
            accept="image/png,image/jpeg"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              const bytes = new Uint8Array(await f.arrayBuffer());
              const type = f.type === "image/jpeg" ? "jpeg" as const : "png" as const;
              setUploadedSig({ bytes, type });
            }}
          />
        </label>
      ) : null}

      {/* ── Placement controls ── */}
      <div className="grid gap-3 sm:grid-cols-5">
        <label className="text-sm font-medium">
          Page
          <input className="field-control mt-1" type="number" min="1" value={pageNum} onChange={(e) => setPageNum(e.target.value)} />
        </label>
        <label className="text-sm font-medium">
          X <span className="font-normal text-muted">(pt)</span>
          <input className="field-control mt-1" type="number" value={posX} onChange={(e) => setPosX(e.target.value)} />
        </label>
        <label className="text-sm font-medium">
          Y <span className="font-normal text-muted">(pt)</span>
          <input className="field-control mt-1" type="number" value={posY} onChange={(e) => setPosY(e.target.value)} />
        </label>
        <label className="text-sm font-medium">
          Width
          <input className="field-control mt-1" type="number" min="10" value={sigWidth} onChange={(e) => setSigWidth(e.target.value)} />
        </label>
        <label className="text-sm font-medium">
          Height
          <input className="field-control mt-1" type="number" min="10" value={sigHeight} onChange={(e) => setSigHeight(e.target.value)} />
        </label>
      </div>

      {/* ── Actions ── */}
      <div className="flex flex-wrap gap-2">
        <button type="submit" className="btn btn-primary" disabled={!file || processing}>
          {processing ? "Processing…" : "Sign PDF"}
        </button>
        <button type="button" className="btn btn-secondary" disabled={!output} onClick={download}>Download PDF</button>
      </div>

      {message ? <p role="status" className="text-sm text-muted">{message}</p> : null}
    </form>
  );
}

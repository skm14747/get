"use client";

import { useEffect, useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import { acceptedImageType, MAX_IMAGE_BYTES, reductionPercent } from "@/lib/files";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

export function ImageTool({ mode }: { mode: "compress" | "resize" }) {
  const session = useToolSession(mode === "compress" ? "image-compressor" : "image-resizer");
  const [preview, setPreview] = useState("");
  const [before, setBefore] = useState(0);
  const [after, setAfter] = useState(0);
  const [message, setMessage] = useState("");
  const [quality, setQuality] = useState("0.8");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lock, setLock] = useState(true);
  const [ratio, setRatio] = useState(1);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  async function onFile(file: File | undefined) {
    if (!file) return;
    const type = acceptedImageType(file.type);
    if (!type) { setMessage("Use a JPG, PNG, or WebP file."); session.markError("type"); return; }
    if (file.size > MAX_IMAGE_BYTES) { setMessage("The file is over 15 MB."); session.markError("size"); return; }
    setFileName(file.name);
    session.markFileStart(mode);
    const bitmap = await createImageBitmap(file);
    setRatio(bitmap.width / bitmap.height);
    const targetWidth = mode === "resize" && Number(width) > 0 ? Number(width) : bitmap.width;
    const targetHeight = mode === "resize" && Number(height) > 0 ? Number(height) : bitmap.height;
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(targetWidth));
    canvas.height = Math.max(1, Math.round(targetHeight));
    const context = canvas.getContext("2d");
    if (!context) { setMessage("This browser could not draw the image."); return; }
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const outputType = type === "png" ? "image/png" : type === "webp" ? "image/webp" : "image/jpeg";
    const next = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, outputType, Number(quality)));
    bitmap.close();
    if (!next) { setMessage("The browser could not encode this image."); session.markError("encode"); return; }
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(next));
    setBlob(next);
    setBefore(file.size);
    setAfter(next.size);
    setMessage(type === "png" ? "PNG output is lossless. The quality slider does not shrink a PNG." : "Re-encoded. Fine detail may change at lower quality.");
    session.markFileDone(mode);
    session.markSuccess(mode);
  }

  const reduced = reductionPercent(before, after);

  return (
    <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
      {/* ── Upload dropzone ── */}
      <label
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-line px-6 py-10 text-center transition-colors hover:border-line-strong hover:bg-canvas"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); void onFile(e.dataTransfer.files[0]); }}
      >
        <span className="text-[0.9375rem] font-medium text-ink">{mode === "compress" ? "Drop a JPG, PNG, or WebP" : "Drop an image to resize"}</span>
        <span className="mt-1 text-[0.8125rem] text-muted">Up to 15 MB · stays in this browser · PNG export is lossless</span>
        <input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => void onFile(e.target.files?.[0])} />
      </label>

      {/* ── Controls ── */}
      {mode === "compress" ? (
        <label className="text-sm font-medium">
          Quality <span className="font-normal text-muted">(0.1–1, JPEG and WebP only)</span>
          <input className="field-control mt-1 sm:max-w-xs" value={quality} onChange={(e) => setQuality(e.target.value)} inputMode="decimal" />
        </label>
      ) : null}
      {mode === "resize" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium">Width<input className="field-control mt-1" value={width} inputMode="numeric" onChange={(e) => { setWidth(e.target.value); if (lock && ratio && Number(e.target.value) > 0) setHeight(String(Math.round(Number(e.target.value) / ratio))); }} /></label>
          <label className="text-sm font-medium">Height<input className="field-control mt-1" value={height} inputMode="numeric" onChange={(e) => { setHeight(e.target.value); if (lock && ratio && Number(e.target.value) > 0) setWidth(String(Math.round(Number(e.target.value) * ratio))); }} /></label>
          <label className="flex items-center gap-2 text-sm sm:col-span-2"><input type="checkbox" checked={lock} onChange={(e) => setLock(e.target.checked)} />Keep aspect ratio</label>
        </div>
      ) : null}

      {/* ── Preview and result ── */}
      {preview ? (
        <div className="rounded-lg border border-line bg-canvas p-4">
          {/* The source is a blob URL created in this browser. next/image does not apply. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Processed preview" className="mx-auto max-h-72 rounded" />
          {before > 0 ? (
            <dl className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <div><dt className="text-xs text-faint">Original</dt><dd className="font-medium tabular-nums">{formatSize(before)}</dd></div>
              <div><dt className="text-xs text-faint">Result</dt><dd className="font-medium tabular-nums">{formatSize(after)}</dd></div>
              {reduced !== null ? <div><dt className="text-xs text-faint">Savings</dt><dd className={`font-medium tabular-nums ${reduced > 0 ? "text-green-600 dark:text-green-400" : ""}`}>{reduced > 0 ? `↓ ${reduced.toFixed(1)}% smaller` : `${reduced.toFixed(1)}%`}</dd></div> : null}
            </dl>
          ) : null}
        </div>
      ) : null}

      {message ? <p className="text-sm text-muted">{message}</p> : null}
      {fileName && !preview ? <p className="text-sm text-muted">Processing {fileName}…</p> : null}

      <button type="button" className="btn btn-primary" disabled={!blob} onClick={() => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = mode === "compress" ? "compressed-image" : "resized-image";
        link.click();
        URL.revokeObjectURL(url);
        session.markDownload(mode);
      }}>Download</button>
    </form>
  );
}

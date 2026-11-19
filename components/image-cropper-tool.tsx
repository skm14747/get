"use client";

import { useEffect, useRef, useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import {
  clampCropArea,
  CROP_PRESETS,
  getInitialCropArea,
  type AspectRatio,
  type CropArea,
} from "@/lib/image-crop";

export function ImageCropperTool() {
  const session = useToolSession("image-cropper");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imgDims, setImgDims] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [crop, setCrop] = useState<CropArea>({ x: 0, y: 0, width: 0, height: 0 });
  const [aspect, setAspect] = useState<AspectRatio>("free");
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  function handleFileSelect(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (JPG, PNG, or WebP).");
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setError("File exceeds 15 MB limit. Please select a smaller image.");
      return;
    }

    setError(null);
    setImageFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setImageSrc(src);

      const img = new Image();
      img.onload = () => {
        imgRef.current = img;
        setImgDims({ width: img.naturalWidth, height: img.naturalHeight });
        const init = getInitialCropArea(img.naturalWidth, img.naturalHeight, aspect);
        setCrop(init);
        session.markInput();
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  }

  function handleAspectChange(newAspect: AspectRatio) {
    setAspect(newAspect);
    if (imgDims.width > 0) {
      const newArea = getInitialCropArea(imgDims.width, imgDims.height, newAspect);
      setCrop(newArea);
      session.markInput();
    }
  }

  function handleCropChange(field: keyof CropArea, val: number) {
    const updated = { ...crop, [field]: val };
    const clamped = clampCropArea(updated, imgDims.width, imgDims.height);
    setCrop(clamped);
    session.markInput();
  }

  // Draw preview with dark overlay mask
  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || imgDims.width === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Scale canvas to fit max width 640px while maintaining aspect
    const displayWidth = Math.min(640, imgDims.width);
    const scale = displayWidth / imgDims.width;
    const displayHeight = imgDims.height * scale;

    canvas.width = displayWidth;
    canvas.height = displayHeight;

    // Draw full image
    ctx.drawImage(img, 0, 0, displayWidth, displayHeight);

    // Darkened overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    // Clear the active crop box (make it transparent)
    const cx = crop.x * scale;
    const cy = crop.y * scale;
    const cw = crop.width * scale;
    const ch = crop.height * scale;

    ctx.clearRect(cx, cy, cw, ch);
    ctx.drawImage(img, crop.x, crop.y, crop.width, crop.height, cx, cy, cw, ch);

    // Draw white border with dash
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(cx, cy, cw, ch);

    // Draw grid thirds
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx + cw / 3, cy);
    ctx.lineTo(cx + cw / 3, cy + ch);
    ctx.moveTo(cx + (2 * cw) / 3, cy);
    ctx.lineTo(cx + (2 * cw) / 3, cy + ch);
    ctx.moveTo(cx, cy + ch / 3);
    ctx.lineTo(cx + cw, cy + ch / 3);
    ctx.moveTo(cx, cy + (2 * ch) / 3);
    ctx.lineTo(cx + cw, cy + (2 * ch) / 3);
    ctx.stroke();
  }, [imgDims, crop]);

  function handleDownloadCropped() {
    const img = imgRef.current;
    if (!img || crop.width <= 0 || crop.height <= 0) return;

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = crop.width;
    exportCanvas.height = crop.height;
    const ctx = exportCanvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
      img,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );

    const mime = imageFile?.type || "image/png";
    exportCanvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const ext = mime === "image/jpeg" ? "jpg" : mime === "image/webp" ? "webp" : "png";
        a.download = `cropped-${Date.now()}.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    }, mime);
  }

  function handleClear() {
    setImageFile(null);
    setImageSrc(null);
    setImgDims({ width: 0, height: 0 });
    setCrop({ x: 0, y: 0, width: 0, height: 0 });
    setError(null);
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* ── File Selection / Dropzone ── */}
      {!imageSrc ? (
        <div className="rounded-2xl border-2 border-dashed border-line p-10 text-center hover:border-action transition-colors bg-surface">
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
            }}
            className="hidden"
            id="crop-file-input"
          />
          <label htmlFor="crop-file-input" className="cursor-pointer block space-y-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-action/10 text-action text-xl">
              ✂️
            </span>
            <p className="text-sm font-semibold text-ink">
              Choose an image or drag &amp; drop here
            </p>
            <p className="text-xs text-muted">
              Supports JPG, PNG, and WebP up to 15 MB. Processed 100% locally in your browser.
            </p>
          </label>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface p-4">
            {/* Aspect Presets */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold text-muted mr-1">Aspect Ratio:</span>
              {CROP_PRESETS.map((p) => (
                <button
                  key={p.aspect}
                  type="button"
                  onClick={() => handleAspectChange(p.aspect)}
                  className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                    aspect === p.aspect
                      ? "bg-action text-paper font-bold"
                      : "bg-canvas text-muted hover:text-ink border border-line"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDownloadCropped}
                className="btn btn-primary text-xs"
              >
                Download Cropped Image
              </button>
              <button type="button" onClick={handleClear} className="btn btn-secondary text-xs">
                New Image
              </button>
            </div>
          </div>

          {/* Canvas Display */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-line bg-slate-900 p-6 overflow-hidden">
            <canvas ref={canvasRef} className="max-w-full rounded-lg shadow" />
            <p className="mt-3 text-xs text-slate-400">
              Original: {imgDims.width} × {imgDims.height} px | Cropped: {crop.width} × {crop.height} px
            </p>
          </div>

          {/* Coordinate Adjustments */}
          <div className="grid gap-4 sm:grid-cols-4 rounded-xl border border-line bg-surface p-4 text-xs">
            <div className="space-y-1">
              <label className="text-muted font-medium">X Offset (px):</label>
              <input
                type="number"
                value={crop.x}
                min={0}
                max={imgDims.width - crop.width}
                onChange={(e) => handleCropChange("x", Number(e.target.value))}
                className="field-control font-mono text-xs w-full"
              />
            </div>
            <div className="space-y-1">
              <label className="text-muted font-medium">Y Offset (px):</label>
              <input
                type="number"
                value={crop.y}
                min={0}
                max={imgDims.height - crop.height}
                onChange={(e) => handleCropChange("y", Number(e.target.value))}
                className="field-control font-mono text-xs w-full"
              />
            </div>
            <div className="space-y-1">
              <label className="text-muted font-medium">Crop Width (px):</label>
              <input
                type="number"
                value={crop.width}
                min={10}
                max={imgDims.width - crop.x}
                onChange={(e) => handleCropChange("width", Number(e.target.value))}
                className="field-control font-mono text-xs w-full"
              />
            </div>
            <div className="space-y-1">
              <label className="text-muted font-medium">Crop Height (px):</label>
              <input
                type="number"
                value={crop.height}
                min={10}
                max={imgDims.height - crop.y}
                onChange={(e) => handleCropChange("height", Number(e.target.value))}
                className="field-control font-mono text-xs w-full"
              />
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-danger/20 bg-danger/5 p-4 text-xs text-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

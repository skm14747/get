"use client";

import { useRef, useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import { formatAudioTime } from "@/lib/audio";
import {
  encodeFramesToGif,
  FPS_PRESETS,
  type GifFrame,
  RESOLUTION_PRESETS,
  validateVideoFile,
} from "@/lib/video-gif";

export function VideoGifTool() {
  const session = useToolSession("video-to-gif");
  const [file, setFile] = useState<File | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [targetWidth, setTargetWidth] = useState(320);
  const [fps, setFps] = useState(8);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  function handleFileSelect(selectedFile: File) {
    const valid = validateVideoFile(selectedFile);
    if (!valid.ok) {
      setError(valid.reason);
      return;
    }

    setError(null);
    setFile(selectedFile);
    setGifUrl(null);

    const url = URL.createObjectURL(selectedFile);
    setVideoSrc(url);
    session.markInput();
  }

  function handleLoadedMetadata() {
    const v = videoRef.current;
    if (!v) return;

    const dur = v.duration;
    setDuration(dur);
    setStartTime(0);
    // Default to first 5 seconds or full duration if shorter
    setEndTime(Math.min(5, dur));
  }

  async function handleConvert() {
    const v = videoRef.current;
    if (!v || duration <= 0) return;

    const clipDuration = endTime - startTime;
    if (clipDuration <= 0) {
      setError("End time must be greater than start time.");
      return;
    }
    if (clipDuration > 15) {
      setError("Please select a clip of 15 seconds or less for browser memory stability.");
      return;
    }

    setConverting(true);
    setProgress(0);
    setError(null);
    setGifUrl(null);

    try {
      const scale = targetWidth / v.videoWidth;
      const targetHeight = Math.round(v.videoHeight * scale);

      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) throw new Error("Could not initialize 2D canvas context.");

      const totalFrames = Math.max(1, Math.round(clipDuration * fps));
      const frameIntervalSec = 1 / fps;
      const delayMs = Math.round(1000 / fps);
      const frames: GifFrame[] = [];

      for (let f = 0; f < totalFrames; f++) {
        const timeToSeek = startTime + f * frameIntervalSec;
        v.currentTime = timeToSeek;

        // Await seeked event
        await new Promise<void>((resolve) => {
          const onSeeked = () => {
            v.removeEventListener("seeked", onSeeked);
            resolve();
          };
          v.addEventListener("seeked", onSeeked);
        });

        ctx.drawImage(v, 0, 0, targetWidth, targetHeight);
        const imgData = ctx.getImageData(0, 0, targetWidth, targetHeight);

        frames.push({
          data: imgData.data,
          width: targetWidth,
          height: targetHeight,
          delayMs,
        });

        setProgress(Math.round(((f + 1) / totalFrames) * 90));
      }

      // Encode frames into GIF
      const gifBlob = encodeFramesToGif(frames);
      const url = URL.createObjectURL(gifBlob);
      setGifUrl(url);
      setProgress(100);
      session.markInput();
    } catch {
      setError("Failed to convert video to GIF. The video may use an unsupported codec.");
    } finally {
      setConverting(false);
    }
  }

  function handleDownload() {
    if (!gifUrl) return;
    const a = document.createElement("a");
    a.href = gifUrl;
    const originalName = file?.name.replace(/\.[^/.]+$/, "") || "animation";
    a.download = `${originalName}.gif`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function handleReset() {
    if (videoSrc) URL.revokeObjectURL(videoSrc);
    if (gifUrl) URL.revokeObjectURL(gifUrl);
    setFile(null);
    setVideoSrc(null);
    setGifUrl(null);
    setDuration(0);
    setStartTime(0);
    setEndTime(0);
    setError(null);
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {!videoSrc ? (
        <div className="rounded-2xl border-2 border-dashed border-line p-10 text-center hover:border-action transition-colors bg-surface">
          <input
            type="file"
            accept="video/mp4,video/webm,video/ogg,video/quicktime,.mp4,.webm,.mov"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFileSelect(f);
            }}
            className="hidden"
            id="video-file-input"
          />
          <label htmlFor="video-file-input" className="cursor-pointer block space-y-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-action/10 text-action text-xl">
              🎬
            </span>
            <p className="text-sm font-semibold text-ink">
              Choose a video file or drag &amp; drop here
            </p>
            <p className="text-xs text-muted">
              Supports MP4, WebM, and MOV up to 50 MB. Encoded 100% locally in your browser.
            </p>
          </label>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-surface p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Video Preview &amp; Timing
                </span>
                <p className="text-sm font-bold text-ink truncate max-w-sm">{file?.name}</p>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="btn btn-secondary text-xs"
              >
                New Video
              </button>
            </div>

            {/* Video Player */}
            <div className="rounded-xl border border-line bg-black flex items-center justify-center overflow-hidden max-h-72">
              <video
                ref={videoRef}
                src={videoSrc}
                onLoadedMetadata={handleLoadedMetadata}
                controls
                className="max-h-72 max-w-full"
              />
            </div>

            {/* Range Scrubber */}
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted font-medium">Start Time:</span>
                  <span className="font-mono text-ink font-bold">{formatAudioTime(startTime)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={Math.max(0, endTime - 0.5)}
                  step={0.1}
                  value={startTime}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setStartTime(val);
                    if (videoRef.current) videoRef.current.currentTime = val;
                  }}
                  className="w-full accent-action"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted font-medium">End Time:</span>
                  <span className="font-mono text-ink font-bold">{formatAudioTime(endTime)}</span>
                </div>
                <input
                  type="range"
                  min={Math.min(duration, startTime + 0.5)}
                  max={Math.min(duration, startTime + 15)}
                  step={0.1}
                  value={endTime}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setEndTime(val);
                    if (videoRef.current) videoRef.current.currentTime = val;
                  }}
                  className="w-full accent-action"
                />
              </div>
            </div>

            {/* Settings Bar */}
            <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-line items-center">
              <div className="flex items-center gap-3 text-xs">
                <span className="text-muted font-medium">Resolution:</span>
                <div className="flex gap-1.5">
                  {RESOLUTION_PRESETS.map((res) => (
                    <button
                      key={res.width}
                      type="button"
                      onClick={() => setTargetWidth(res.width)}
                      className={`rounded px-2.5 py-1 text-xs font-medium border ${
                        targetWidth === res.width
                          ? "bg-action text-paper font-bold"
                          : "bg-canvas text-muted hover:text-ink border-line"
                      }`}
                    >
                      {res.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs sm:justify-end">
                <span className="text-muted font-medium">Frame Rate:</span>
                <div className="flex gap-1.5">
                  {FPS_PRESETS.map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setFps(rate)}
                      className={`rounded px-2.5 py-1 text-xs font-medium border ${
                        fps === rate
                          ? "bg-action text-paper font-bold"
                          : "bg-canvas text-muted hover:text-ink border-line"
                      }`}
                    >
                      {rate} FPS
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Duration Notice & Convert Action */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-line">
              <div className="text-xs text-muted">
                Selected Clip: <strong className="font-mono text-action">{formatAudioTime(endTime - startTime)}</strong> (max 15s)
              </div>

              <button
                type="button"
                onClick={handleConvert}
                disabled={converting || endTime - startTime <= 0}
                className="btn btn-primary text-xs"
              >
                {converting ? `Extracting Frames (${progress}%)...` : "Convert to GIF"}
              </button>
            </div>
          </div>

          {/* GIF Result Preview */}
          {gifUrl && (
            <div className="rounded-2xl border border-line bg-surface p-6 space-y-4" aria-live="polite">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Generated Animated GIF
                </span>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="btn btn-primary text-xs"
                >
                  Download GIF
                </button>
              </div>

              <div className="flex items-center justify-center p-4 bg-canvas rounded-xl border border-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={gifUrl} alt="Converted GIF animation" className="rounded-lg shadow max-h-72" />
              </div>
            </div>
          )}
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

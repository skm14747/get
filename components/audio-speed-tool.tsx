"use client";

import { useRef, useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import {
  encodeAudioBufferToWav,
  formatAudioTime,
  validateAudioFile,
} from "@/lib/audio";
import {
  calculateAdjustedDuration,
  SPEED_PRESETS,
  validateSpeed,
} from "@/lib/audio-speed";

export function AudioSpeedTool() {
  const session = useToolSession("audio-speed-changer");
  const [file, setFile] = useState<File | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [speed, setSpeed] = useState(1.25);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  function getAudioContext(): AudioContext {
    if (!audioContextRef.current || audioContextRef.current.state === "closed") {
      audioContextRef.current = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioContextRef.current;
  }

  async function handleFileSelect(selectedFile: File) {
    const valid = validateAudioFile(selectedFile);
    if (!valid.ok) {
      setError(valid.reason);
      return;
    }

    setError(null);
    setLoading(true);
    setFile(selectedFile);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const ctx = getAudioContext();
      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      const decoded = await ctx.decodeAudioData(arrayBuffer);
      setAudioBuffer(decoded);
      setDuration(decoded.duration);
      session.markInput();
    } catch {
      setError("Failed to decode audio. Please check that the file is not corrupted.");
    } finally {
      setLoading(false);
    }
  }

  function stopPlayback() {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
        sourceNodeRef.current.disconnect();
      } catch {
        // already stopped
      }
      sourceNodeRef.current = null;
    }
    setIsPlaying(false);
  }

  function handlePlayPreview() {
    if (!audioBuffer) return;

    if (isPlaying) {
      stopPlayback();
      return;
    }

    try {
      const ctx = getAudioContext();
      stopPlayback();

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.playbackRate.value = speed;
      source.connect(ctx.destination);

      source.start(0);
      sourceNodeRef.current = source;
      setIsPlaying(true);

      source.onended = () => {
        setIsPlaying(false);
        sourceNodeRef.current = null;
      };
    } catch {
      stopPlayback();
    }
  }

  function handleSpeedChange(newSpeed: number) {
    const validated = validateSpeed(newSpeed);
    setSpeed(validated);
    if (isPlaying && sourceNodeRef.current) {
      sourceNodeRef.current.playbackRate.value = validated;
    }
    session.markInput();
  }

  async function handleDownload() {
    if (!audioBuffer) return;
    setRendering(true);
    setError(null);

    try {
      const targetDuration = duration / speed;
      const numSamples = Math.ceil(targetDuration * audioBuffer.sampleRate);

      // Offline audio rendering for speed modification
      const offlineCtx = new (window.OfflineAudioContext ||
        (window as unknown as { webkitOfflineAudioContext: typeof OfflineAudioContext }).webkitOfflineAudioContext)(
        audioBuffer.numberOfChannels,
        numSamples,
        audioBuffer.sampleRate
      );

      const source = offlineCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.playbackRate.value = speed;
      source.connect(offlineCtx.destination);
      source.start(0);

      const renderedBuffer = await offlineCtx.startRendering();
      const wavBlob = encodeAudioBufferToWav(renderedBuffer);

      const url = URL.createObjectURL(wavBlob);
      const a = document.createElement("a");
      a.href = url;
      const originalName = file?.name.replace(/\.[^/.]+$/, "") || "audio";
      a.download = `${originalName}-${speed}x.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      setError("Failed to render adjusted audio. The clip may be too long for memory.");
    } finally {
      setRendering(false);
    }
  }

  function handleReset() {
    stopPlayback();
    setFile(null);
    setAudioBuffer(null);
    setDuration(0);
    setError(null);
  }

  const adjustedDuration = calculateAdjustedDuration(duration, speed);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {!audioBuffer ? (
        <div className="rounded-2xl border-2 border-dashed border-line p-10 text-center hover:border-action transition-colors bg-surface">
          <input
            type="file"
            accept="audio/*,.mp3,.wav,.ogg,.aac,.m4a"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFileSelect(f);
            }}
            className="hidden"
            id="audio-speed-input"
          />
          <label htmlFor="audio-speed-input" className="cursor-pointer block space-y-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-action/10 text-action text-xl">
              ⚡
            </span>
            <p className="text-sm font-semibold text-ink">
              {loading ? "Decoding audio in browser..." : "Choose an audio file or drag & drop here"}
            </p>
            <p className="text-xs text-muted">
              Supports MP3, WAV, OGG, AAC, and M4A up to 50 MB. Processed 100% locally in your browser.
            </p>
          </label>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-surface p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Audio Speed Adjustment
                </span>
                <p className="text-sm font-bold text-ink truncate max-w-sm">{file?.name}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePlayPreview}
                  className="btn btn-secondary text-xs flex items-center gap-1.5"
                >
                  {isPlaying ? "⏸ Pause Preview" : "▶ Play Preview"}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-secondary text-xs"
                >
                  New File
                </button>
              </div>
            </div>

            {/* Speed Presets */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-muted">Speed Presets:</span>
              <div className="flex flex-wrap gap-1.5">
                {SPEED_PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleSpeedChange(p)}
                    className={`rounded px-3 py-1.5 text-xs font-mono font-medium transition-colors ${
                      speed === p
                        ? "bg-action text-paper font-bold shadow-sm"
                        : "bg-canvas text-muted hover:text-ink border border-line"
                    }`}
                  >
                    {p}x
                  </button>
                ))}
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-2 pt-2 border-t border-line">
              <div className="flex justify-between text-xs">
                <span className="text-muted font-medium">Fine-Tune Playback Speed:</span>
                <span className="font-mono text-action font-bold text-base">{speed}x</span>
              </div>
              <input
                type="range"
                min={0.25}
                max={3.0}
                step={0.05}
                value={speed}
                onChange={(e) => handleSpeedChange(Number(e.target.value))}
                className="w-full accent-action"
              />
              <div className="flex justify-between text-[11px] text-faint font-mono">
                <span>0.25x (Slower)</span>
                <span>1.0x (Normal)</span>
                <span>3.0x (Faster)</span>
              </div>
            </div>

            {/* Duration Comparison Cards */}
            <div className="grid gap-3 sm:grid-cols-2 pt-2">
              <div className="rounded-xl border border-line bg-canvas p-4 text-center">
                <span className="text-xs font-medium text-muted">Original Duration</span>
                <p className="mt-1 font-mono text-lg font-bold text-ink">{formatAudioTime(duration)}</p>
              </div>
              <div className="rounded-xl border border-line bg-canvas p-4 text-center">
                <span className="text-xs font-medium text-muted">Adjusted Duration ({speed}x)</span>
                <p className="mt-1 font-mono text-lg font-bold text-action">{formatAudioTime(adjustedDuration)}</p>
              </div>
            </div>

            {/* Download Button */}
            <div className="flex justify-end pt-3 border-t border-line">
              <button
                type="button"
                onClick={handleDownload}
                disabled={rendering}
                className="btn btn-primary text-xs"
              >
                {rendering ? "Rendering Audio..." : `Download at ${speed}x Speed (.wav)`}
              </button>
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

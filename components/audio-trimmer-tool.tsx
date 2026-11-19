"use client";

import { useEffect, useRef, useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import {
  encodeAudioBufferToWav,
  extractWaveformPeaks,
  formatAudioTime,
  validateAudioFile,
} from "@/lib/audio";

export function AudioTrimmerTool() {
  const session = useToolSession("audio-trimmer");
  const [file, setFile] = useState<File | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [peaks, setPeaks] = useState<number[]>([]);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
      setStartTime(0);
      setEndTime(decoded.duration);

      const channel = decoded.getChannelData(0);
      const extractedPeaks = extractWaveformPeaks(channel, 120);
      setPeaks(extractedPeaks);
      session.markInput();
    } catch {
      setError("Failed to decode audio. The file may be corrupt or encoded with an unsupported codec.");
    } finally {
      setLoading(false);
    }
  }

  // Draw waveform
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || peaks.length === 0 || duration === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const barWidth = width / peaks.length;
    const startFrac = startTime / duration;
    const endFrac = endTime / duration;

    peaks.forEach((peak, i) => {
      const x = i * barWidth;
      const barHeight = peak * (height - 8);
      const y = (height - barHeight) / 2;
      const frac = i / peaks.length;

      // Color active trimmed region in action color, unselected in muted faint color
      const isSelected = frac >= startFrac && frac <= endFrac;
      ctx.fillStyle = isSelected ? "#3b82f6" : "#cbd5e1";

      ctx.fillRect(x, y, Math.max(1, barWidth - 1.5), barHeight);
    });
  }, [peaks, startTime, endTime, duration]);

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
      source.connect(ctx.destination);

      const playDuration = Math.max(0.1, endTime - startTime);
      source.start(0, startTime, playDuration);
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

  function handleDownload() {
    if (!audioBuffer) return;
    try {
      const wavBlob = encodeAudioBufferToWav(audioBuffer, startTime, endTime);
      const url = URL.createObjectURL(wavBlob);
      const a = document.createElement("a");
      a.href = url;
      const originalName = file?.name.replace(/\.[^/.]+$/, "") || "trimmed";
      a.download = `${originalName}-trimmed.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      setError("Failed to export trimmed audio.");
    }
  }

  function handleReset() {
    stopPlayback();
    setFile(null);
    setAudioBuffer(null);
    setPeaks([]);
    setStartTime(0);
    setEndTime(0);
    setDuration(0);
    setError(null);
  }

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
            id="audio-file-input"
          />
          <label htmlFor="audio-file-input" className="cursor-pointer block space-y-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-action/10 text-action text-xl">
              🎵
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
          {/* Waveform Container */}
          <div className="rounded-2xl border border-line bg-surface p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Interactive Waveform
                </span>
                <p className="text-sm font-bold text-ink truncate max-w-sm">{file?.name}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePlayPreview}
                  className="btn btn-secondary text-xs flex items-center gap-1.5"
                >
                  {isPlaying ? "⏸ Pause Preview" : "▶ Play Selection"}
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

            {/* Canvas */}
            <div className="rounded-xl border border-line bg-canvas p-4 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={720}
                height={120}
                className="w-full h-28 max-w-full rounded"
              />
            </div>

            {/* Time Sliders */}
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted font-medium">Start Marker:</span>
                  <span className="font-mono text-ink font-bold">{formatAudioTime(startTime)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={Math.max(0, endTime - 0.1)}
                  step={0.1}
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(Number(e.target.value));
                    stopPlayback();
                    session.markInput();
                  }}
                  className="w-full accent-action"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted font-medium">End Marker:</span>
                  <span className="font-mono text-ink font-bold">{formatAudioTime(endTime)}</span>
                </div>
                <input
                  type="range"
                  min={Math.min(duration, startTime + 0.1)}
                  max={duration}
                  step={0.1}
                  value={endTime}
                  onChange={(e) => {
                    setEndTime(Number(e.target.value));
                    stopPlayback();
                    session.markInput();
                  }}
                  className="w-full accent-action"
                />
              </div>
            </div>

            {/* Summary & Download Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-line">
              <div className="flex items-center gap-4 text-xs text-muted">
                <span>Total: <strong className="font-mono text-ink">{formatAudioTime(duration)}</strong></span>
                <span>Trimmed Length: <strong className="font-mono text-action">{formatAudioTime(endTime - startTime)}</strong></span>
              </div>

              <button
                type="button"
                onClick={handleDownload}
                className="btn btn-primary text-xs"
              >
                Download Trimmed Audio (.wav)
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

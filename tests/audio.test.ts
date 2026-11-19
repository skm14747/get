import { describe, expect, it } from "vitest";
import {
  extractWaveformPeaks,
  formatAudioTime,
  validateAudioFile,
} from "@/lib/audio";

describe("Audio Processing Utilities", () => {
  it("formats seconds into mm:ss.ms properly", () => {
    expect(formatAudioTime(0)).toBe("00:00.0");
    expect(formatAudioTime(5.4)).toBe("00:05.4");
    expect(formatAudioTime(65.2)).toBe("01:05.2");
    expect(formatAudioTime(3600)).toBe("60:00.0");
    expect(formatAudioTime(-1)).toBe("00:00.0");
  });

  it("extracts normalized waveform peaks", () => {
    const samples = new Float32Array([0, 0.5, -0.8, 0.2, 0.9, -0.1]);
    const peaks = extractWaveformPeaks(samples, 3);
    expect(peaks).toHaveLength(3);
    for (const p of peaks) {
      expect(p).toBeGreaterThanOrEqual(0.05);
      expect(p).toBeLessThanOrEqual(1.0);
    }
  });

  it("handles empty or zero-sample waveform data safely", () => {
    expect(extractWaveformPeaks(new Float32Array([]), 10)).toEqual([]);
    expect(extractWaveformPeaks(new Float32Array([0.5]), 0)).toEqual([]);
  });

  it("validates audio file types and size bounds", () => {
    const validMp3 = new File(["dummy audio"], "podcast.mp3", { type: "audio/mpeg" });
    expect(validateAudioFile(validMp3)).toEqual({ ok: true });

    const validWav = new File(["dummy audio"], "recording.wav", { type: "audio/wav" });
    expect(validateAudioFile(validWav)).toEqual({ ok: true });

    const invalidPdf = new File(["dummy pdf"], "document.pdf", { type: "application/pdf" });
    const res = validateAudioFile(invalidPdf);
    expect(res.ok).toBe(false);

    // Over size limit test (51 MB)
    const largeFile = new File([new ArrayBuffer(1024)], "huge.mp3", { type: "audio/mp3" });
    const resSize = validateAudioFile(largeFile, 500); // 500 bytes limit
    expect(resSize.ok).toBe(false);
  });
});

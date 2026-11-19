export type AudioValidationResult =
  | { ok: true }
  | { ok: false; reason: string };

export function formatAudioTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00.0";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const tenths = Math.floor((seconds % 1) * 10);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${tenths}`;
}

export function extractWaveformPeaks(channelData: Float32Array, numBuckets: number = 100): number[] {
  if (!channelData || channelData.length === 0 || numBuckets <= 0) return [];

  const blockSize = Math.floor(channelData.length / numBuckets);
  const peaks: number[] = [];

  for (let i = 0; i < numBuckets; i++) {
    const start = i * blockSize;
    const end = Math.min(channelData.length, start + blockSize);
    let max = 0;

    for (let j = start; j < end; j++) {
      const abs = Math.abs(channelData[j]!);
      if (abs > max) {
        max = abs;
      }
    }
    // Clamp to 0.05 min so quiet bars remain slightly visible
    peaks.push(Math.max(0.05, Math.min(1.0, Math.round(max * 100) / 100)));
  }

  return peaks;
}

export function validateAudioFile(file: File, maxSizeBytes: number = 50 * 1024 * 1024): AudioValidationResult {
  if (!file) {
    return { ok: false, reason: "Please select an audio file." };
  }

  const validTypes = [
    "audio/mpeg",
    "audio/mp3",
    "audio/wav",
    "audio/x-wav",
    "audio/ogg",
    "audio/aac",
    "audio/mp4",
    "audio/x-m4a",
    "audio/webm",
  ];

  const hasValidExt = /\.(mp3|wav|ogg|aac|m4a|webm|flac)$/i.test(file.name);
  const hasValidMime = validTypes.includes(file.type) || file.type.startsWith("audio/");

  if (!hasValidExt && !hasValidMime) {
    return {
      ok: false,
      reason: "Unsupported audio format. Please upload an MP3, WAV, OGG, AAC, or M4A file.",
    };
  }

  if (file.size > maxSizeBytes) {
    return {
      ok: false,
      reason: `Audio file exceeds ${Math.round(maxSizeBytes / (1024 * 1024))} MB limit. Please select a smaller clip.`,
    };
  }

  return { ok: true };
}

// Pure 16-bit PCM Stereo/Mono RIFF WAV Encoder
export function encodeAudioBufferToWav(
  audioBuffer: AudioBuffer,
  startSec: number = 0,
  endSec: number = audioBuffer.duration
): Blob {
  const sampleRate = audioBuffer.sampleRate;
  const numChannels = audioBuffer.numberOfChannels;

  const startSample = Math.max(0, Math.floor(startSec * sampleRate));
  const endSample = Math.min(audioBuffer.length, Math.floor(endSec * sampleRate));
  const numSamples = Math.max(0, endSample - startSample);

  const bytesPerSample = 2; // 16-bit PCM
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataByteLength = numSamples * blockAlign;

  const buffer = new ArrayBuffer(44 + dataByteLength);
  const view = new DataView(buffer);

  function writeString(offset: number, string: string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  // RIFF Chunk Descriptor
  writeString(0, "RIFF");
  view.setUint32(4, 36 + dataByteLength, true); // ChunkSize
  writeString(8, "WAVE");

  // "fmt " Sub-chunk
  writeString(12, "fmt ");
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 for PCM)
  view.setUint16(22, numChannels, true); // NumChannels
  view.setUint32(24, sampleRate, true); // SampleRate
  view.setUint32(28, byteRate, true); // ByteRate
  view.setUint16(32, blockAlign, true); // BlockAlign
  view.setUint16(34, 16, true); // BitsPerSample (16-bit)

  // "data" Sub-chunk
  writeString(36, "data");
  view.setUint32(40, dataByteLength, true);

  // Interleave audio channel samples
  let offset = 44;
  const channels: Float32Array[] = [];
  for (let c = 0; c < numChannels; c++) {
    channels.push(audioBuffer.getChannelData(c));
  }

  for (let i = 0; i < numSamples; i++) {
    for (let c = 0; c < numChannels; c++) {
      const sample = channels[c]![startSample + i] ?? 0;
      // Clamp between -1.0 and 1.0, convert to 16-bit signed integer
      const clamped = Math.max(-1, Math.min(1, sample));
      const int16 = clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff;
      view.setInt16(offset, int16, true);
      offset += 2;
    }
  }

  return new Blob([buffer], { type: "audio/wav" });
}

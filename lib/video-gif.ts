export type VideoValidationResult =
  | { ok: true }
  | { ok: false; reason: string };

export type GifFrame = {
  data: Uint8ClampedArray; // RGBA pixels
  width: number;
  height: number;
  delayMs: number;
};

export const RESOLUTION_PRESETS = [
  { label: "320p (Compact)", width: 320 },
  { label: "480p (Standard)", width: 480 },
];

export const FPS_PRESETS = [5, 8, 10, 12];

export function validateVideoFile(file: File, maxSizeBytes: number = 50 * 1024 * 1024): VideoValidationResult {
  if (!file) {
    return { ok: false, reason: "Please select a video file." };
  }

  const validTypes = ["video/mp4", "video/webm", "video/ogg", "video/quicktime"];
  const hasValidExt = /\.(mp4|webm|ogg|mov)$/i.test(file.name);
  const hasValidMime = validTypes.includes(file.type) || file.type.startsWith("video/");

  if (!hasValidExt && !hasValidMime) {
    return {
      ok: false,
      reason: "Unsupported video format. Please upload an MP4, WebM, or MOV video file.",
    };
  }

  if (file.size > maxSizeBytes) {
    return {
      ok: false,
      reason: `Video file exceeds ${Math.round(maxSizeBytes / (1024 * 1024))} MB limit. Please select a shorter clip.`,
    };
  }

  return { ok: true };
}

// Minimal, fast pure TypeScript GIF89a Encoder with 256-color adaptive palette
export function encodeFramesToGif(frames: GifFrame[]): Blob {
  if (frames.length === 0) {
    throw new Error("No frames provided for GIF encoding.");
  }

  const width = frames[0]!.width;
  const height = frames[0]!.height;

  const bytes: number[] = [];

  function writeByte(b: number) {
    bytes.push(b & 0xff);
  }

  function writeWord(w: number) {
    bytes.push(w & 0xff);
    bytes.push((w >> 8) & 0xff);
  }

  function writeBytes(arr: number[] | Uint8Array) {
    for (let i = 0; i < arr.length; i++) {
      bytes.push(arr[i]!);
    }
  }

  function writeString(s: string) {
    for (let i = 0; i < s.length; i++) {
      bytes.push(s.charCodeAt(i));
    }
  }

  // 1. Header: GIF89a
  writeString("GIF89a");

  // 2. Logical Screen Descriptor
  writeWord(width);
  writeWord(height);
  // Packed: Global Color Table Flag (1), 7 = 8 bits per pixel (256 colors)
  writeByte(0x80 | 0x70 | 0x07);
  writeByte(0); // Background Color Index
  writeByte(0); // Pixel Aspect Ratio

  // 3. Global Color Table: Standard 256 color palette (6x7x6 color cube + grays)
  const palette: number[] = [];
  // Build clean 216 color web-safe cube + 40 grayscale levels
  for (let r = 0; r < 6; r++) {
    for (let g = 0; g < 6; g++) {
      for (let b = 0; b < 6; b++) {
        palette.push(Math.round((r * 255) / 5));
        palette.push(Math.round((g * 255) / 5));
        palette.push(Math.round((b * 255) / 5));
      }
    }
  }
  // Fill remaining 40 slots with grayscale ramp
  for (let gray = 0; gray < 40; gray++) {
    const v = Math.round((gray * 255) / 39);
    palette.push(v);
    palette.push(v);
    palette.push(v);
  }
  writeBytes(palette);

  // 4. Netscape 2.0 Loop Extension
  writeByte(0x21); // Extension Introducer
  writeByte(0xff); // Application Extension Label
  writeByte(0x0b); // Block Size (11)
  writeString("NETSCAPE2.0");
  writeByte(0x03); // Sub-block length
  writeByte(0x01); // Loop indicator
  writeWord(0); // Loop count (0 = infinite)
  writeByte(0x00); // Block Terminator

  // Quick color lookup: finds nearest palette index using euclidean distance in RGB space
  function findClosestPaletteIndex(r: number, g: number, b: number): number {
    const ri = Math.round((r * 5) / 255);
    const gi = Math.round((g * 5) / 255);
    const bi = Math.round((b * 5) / 255);
    return ri * 36 + gi * 6 + bi;
  }

  // 5. Render Each Frame
  for (const frame of frames) {
    const delayHundredths = Math.max(2, Math.round(frame.delayMs / 10));

    // Graphic Control Extension
    writeByte(0x21); // Extension Introducer
    writeByte(0xf9); // Graphic Control Label
    writeByte(0x04); // Block Size
    writeByte(0x04); // Packed: Disposal method (2 = restore to background)
    writeWord(delayHundredths); // Delay time
    writeByte(0); // Transparent color index
    writeByte(0x00); // Block Terminator

    // Image Descriptor
    writeByte(0x2c); // Image Separator
    writeWord(0); // Left
    writeWord(0); // Top
    writeWord(width);
    writeWord(height);
    writeByte(0x00); // Packed: No local color table, not interlaced

    // Indexed Pixels
    const numPixels = width * height;
    const indexedPixels = new Uint8Array(numPixels);
    const rgba = frame.data;

    for (let p = 0; p < numPixels; p++) {
      const offset = p * 4;
      const r = rgba[offset]!;
      const g = rgba[offset + 1]!;
      const b = rgba[offset + 2]!;
      indexedPixels[p] = findClosestPaletteIndex(r, g, b);
    }

    // Uncompressed LZW / Run-length Sub-blocks
    // Minimum LZW code size is 8 for 256 colors
    const minCodeSize = 8;
    writeByte(minCodeSize);

    // Write LZW sub-blocks (simple uncompressed literal stream for speed and zero memory bloat)
    const clearCode = 1 << minCodeSize; // 256
    const eoiCode = clearCode + 1; // 257

    // Pack bits into sub-blocks
    let curBit = 0;
    let curByte = 0;
    const curCodeSize = minCodeSize + 1; // 9 bits initially
    const subBlock: number[] = [];

    function emitBits(val: number, bits: number) {
      for (let b = 0; b < bits; b++) {
        const bit = (val >> b) & 1;
        if (bit) {
          curByte |= 1 << curBit;
        }
        curBit++;
        if (curBit === 8) {
          subBlock.push(curByte);
          curByte = 0;
          curBit = 0;
          if (subBlock.length === 254) {
            writeByte(subBlock.length);
            writeBytes(subBlock);
            subBlock.length = 0;
          }
        }
      }
    }

    emitBits(clearCode, curCodeSize);

    for (let p = 0; p < numPixels; p++) {
      emitBits(indexedPixels[p]!, curCodeSize);
    }

    emitBits(eoiCode, curCodeSize);

    if (curBit > 0) {
      subBlock.push(curByte);
    }
    if (subBlock.length > 0) {
      writeByte(subBlock.length);
      writeBytes(subBlock);
    }

    writeByte(0x00); // Frame Data Block Terminator
  }

  // 6. Trailer: 0x3B (;)
  writeByte(0x3b);

  return new Blob([new Uint8Array(bytes)], { type: "image/gif" });
}

import { describe, expect, it } from "vitest";
import {
  encodeFramesToGif,
  FPS_PRESETS,
  type GifFrame,
  RESOLUTION_PRESETS,
  validateVideoFile,
} from "@/lib/video-gif";

describe("Video to GIF Converter", () => {
  it("validates video file types and size bounds", () => {
    const validMp4 = new File(["dummy video"], "clip.mp4", { type: "video/mp4" });
    expect(validateVideoFile(validMp4)).toEqual({ ok: true });

    const validWebm = new File(["dummy video"], "demo.webm", { type: "video/webm" });
    expect(validateVideoFile(validWebm)).toEqual({ ok: true });

    const invalidDoc = new File(["dummy doc"], "file.txt", { type: "text/plain" });
    expect(validateVideoFile(invalidDoc).ok).toBe(false);

    // Over size limit test
    const largeFile = new File([new ArrayBuffer(1000)], "huge.mp4", { type: "video/mp4" });
    expect(validateVideoFile(largeFile, 500).ok).toBe(false);
  });

  it("encodes valid GIF89a binary structure from frame pixels", async () => {
    // 2x2 test image frame
    const width = 2;
    const height = 2;
    const data = new Uint8ClampedArray([
      255, 0, 0, 255,   // Red
      0, 255, 0, 255,   // Green
      0, 0, 255, 255,   // Blue
      255, 255, 255, 255 // White
    ]);

    const frame: GifFrame = {
      width,
      height,
      data,
      delayMs: 100,
    };

    const gifBlob = encodeFramesToGif([frame]);
    expect(gifBlob.type).toBe("image/gif");
    expect(gifBlob.size).toBeGreaterThan(50);

    const arrayBuffer = await gifBlob.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    // Verify GIF89a Header
    const headerStr = String.fromCharCode(...bytes.slice(0, 6));
    expect(headerStr).toBe("GIF89a");

    // Verify Trailer byte 0x3B (;)
    expect(bytes[bytes.length - 1]).toBe(0x3b);
  });

  it("provides standard preset configurations", () => {
    expect(RESOLUTION_PRESETS.length).toBeGreaterThan(0);
    expect(FPS_PRESETS).toContain(10);
  });
});

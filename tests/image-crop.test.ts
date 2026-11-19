import { describe, expect, it } from "vitest";
import { clampCropArea, getInitialCropArea } from "@/lib/image-crop";

describe("Image Cropper", () => {
  it("calculates centered freeform crop area", () => {
    const area = getInitialCropArea(1000, 800, "free");
    expect(area.width).toBe(800);
    expect(area.height).toBe(640);
    expect(area.x).toBe(100);
    expect(area.y).toBe(80);
  });

  it("calculates centered 1:1 square crop area", () => {
    const area = getInitialCropArea(1200, 800, "1:1");
    expect(area.width).toBe(area.height);
    expect(area.width).toBeLessThanOrEqual(800);
    expect(area.x).toBeGreaterThan(0);
  });

  it("calculates centered 16:9 widescreen crop area", () => {
    const area = getInitialCropArea(1920, 1080, "16:9");
    const ratio = area.width / area.height;
    expect(Math.abs(ratio - 16 / 9)).toBeLessThan(0.01);
  });

  it("clamps crop coordinates within image bounds", () => {
    // Attempting to position outside bounds
    const clamped = clampCropArea({ x: -50, y: 1500, width: 2000, height: 2000 }, 800, 600);
    expect(clamped.x).toBeGreaterThanOrEqual(0);
    expect(clamped.y).toBeGreaterThanOrEqual(0);
    expect(clamped.x + clamped.width).toBeLessThanOrEqual(800);
    expect(clamped.y + clamped.height).toBeLessThanOrEqual(600);
  });

  it("handles zero dimensions safely", () => {
    const area = getInitialCropArea(0, 0, "free");
    expect(area).toEqual({ x: 0, y: 0, width: 0, height: 0 });
  });
});

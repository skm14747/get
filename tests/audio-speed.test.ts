import { describe, expect, it } from "vitest";
import {
  calculateAdjustedDuration,
  SPEED_PRESETS,
  validateSpeed,
} from "@/lib/audio-speed";

describe("Audio Speed Changer", () => {
  it("calculates adjusted duration accurately", () => {
    expect(calculateAdjustedDuration(100, 2.0)).toBe(50.0);
    expect(calculateAdjustedDuration(100, 0.5)).toBe(200.0);
    expect(calculateAdjustedDuration(120, 1.5)).toBe(80.0);
    expect(calculateAdjustedDuration(0, 1.5)).toBe(0);
  });

  it("clamps speed within supported ranges (0.25x to 4.0x)", () => {
    expect(validateSpeed(0.1)).toBe(0.25);
    expect(validateSpeed(5.0)).toBe(4.0);
    expect(validateSpeed(1.25)).toBe(1.25);
  });

  it("contains common standard speed presets", () => {
    expect(SPEED_PRESETS).toContain(0.5);
    expect(SPEED_PRESETS).toContain(1.0);
    expect(SPEED_PRESETS).toContain(1.5);
    expect(SPEED_PRESETS).toContain(2.0);
  });
});

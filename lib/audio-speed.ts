export const SPEED_PRESETS = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];

export function calculateAdjustedDuration(originalDurationSec: number, speed: number): number {
  if (originalDurationSec <= 0 || speed <= 0) return 0;
  const adjusted = originalDurationSec / speed;
  return Math.round(adjusted * 10) / 10;
}

export function validateSpeed(speed: number): number {
  if (isNaN(speed) || speed < 0.25) return 0.25;
  if (speed > 4.0) return 4.0;
  return Math.round(speed * 100) / 100;
}

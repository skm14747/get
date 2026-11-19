export type RgbColor = { r: number; g: number; b: number };

export type WcagRating = {
  aaNormal: boolean;
  aaLarge: boolean;
  aaaNormal: boolean;
  aaaLarge: boolean;
  uiComponents: boolean;
};

export type ContrastSuccess = {
  ok: true;
  ratio: number;
  formattedRatio: string;
  fgHex: string;
  bgHex: string;
  fgLuminance: number;
  bgLuminance: number;
  wcag: WcagRating;
};

export type ContrastFailure = {
  ok: false;
  reason: string;
};

export type ContrastResult = ContrastSuccess | ContrastFailure;

export function parseHexToRgb(hex: string): RgbColor | null {
  const clean = hex.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(clean)) {
    return null;
  }
  if (clean.length === 3) {
    const r = parseInt(clean[0]! + clean[0]!, 16);
    const g = parseInt(clean[1]! + clean[1]!, 16);
    const b = parseInt(clean[2]! + clean[2]!, 16);
    return { r, g, b };
  }
  if (clean.length === 6) {
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    return { r, g, b };
  }
  return null;
}

export function rgbToHex(rgb: RgbColor): string {
  const toHex = (n: number) => {
    const clamped = Math.max(0, Math.min(255, Math.round(n)));
    return clamped.toString(16).padStart(2, "0");
  };
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

export function calculateRelativeLuminance(rgb: RgbColor): number {
  const sRgb = [rgb.r / 255, rgb.g / 255, rgb.b / 255].map((val) => {
    return val <= 0.04045 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sRgb[0]! + 0.7152 * sRgb[1]! + 0.0722 * sRgb[2]!;
}

export function calculateContrastRatio(fgHex: string, bgHex: string): ContrastResult {
  const fgRgb = parseHexToRgb(fgHex);
  if (!fgRgb) {
    return { ok: false, reason: "Invalid foreground hex color. Please use #RGB or #RRGGBB format." };
  }

  const bgRgb = parseHexToRgb(bgHex);
  if (!bgRgb) {
    return { ok: false, reason: "Invalid background hex color. Please use #RGB or #RRGGBB format." };
  }

  const l1 = calculateRelativeLuminance(fgRgb);
  const l2 = calculateRelativeLuminance(bgRgb);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  const ratio = (lighter + 0.05) / (darker + 0.05);
  const roundedRatio = Math.round(ratio * 100) / 100;

  return {
    ok: true,
    ratio: roundedRatio,
    formattedRatio: `${roundedRatio.toFixed(2)}:1`,
    fgHex: rgbToHex(fgRgb),
    bgHex: rgbToHex(bgRgb),
    fgLuminance: Math.round(l1 * 1000) / 1000,
    bgLuminance: Math.round(l2 * 1000) / 1000,
    wcag: {
      aaNormal: roundedRatio >= 4.5,
      aaLarge: roundedRatio >= 3.0,
      aaaNormal: roundedRatio >= 7.0,
      aaaLarge: roundedRatio >= 4.5,
      uiComponents: roundedRatio >= 3.0,
    },
  };
}

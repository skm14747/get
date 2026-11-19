export type RgbColor = { r: number; g: number; b: number };
export type HslColor = { h: number; s: number; l: number };

export type ColorResult =
  | {
      ok: true;
      hex: string;
      rgb: RgbColor;
      hsl: HslColor;
      cssRgb: string;
      cssHsl: string;
    }
  | { ok: false; reason: "invalid_color" };

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

export function hexToRgb(hex: string): RgbColor | null {
  const cleanHex = hex.trim().replace(/^#/, "");
  if (!/^(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(cleanHex)) return null;

  let fullHex = cleanHex;
  if (cleanHex.length === 3) {
    fullHex = cleanHex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const num = parseInt(fullHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function rgbToHex(rgb: RgbColor): string {
  const r = clamp(Math.round(rgb.r), 0, 255).toString(16).padStart(2, "0");
  const g = clamp(Math.round(rgb.g), 0, 255).toString(16).padStart(2, "0");
  const b = clamp(Math.round(rgb.b), 0, 255).toString(16).padStart(2, "0");
  return `#${r}${g}${b}`.toLowerCase();
}

export function rgbToHsl(rgb: RgbColor): HslColor {
  const r = clamp(rgb.r, 0, 255) / 255;
  const g = clamp(rgb.g, 0, 255) / 255;
  const b = clamp(rgb.b, 0, 255) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / delta + 2) / 6;
        break;
      case b:
        h = ((r - g) / delta + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hslToRgb(hsl: HslColor): RgbColor {
  const h = ((hsl.h % 360) + 360) % 360 / 360;
  const s = clamp(hsl.s, 0, 100) / 100;
  const l = clamp(hsl.l, 0, 100) / 100;

  if (s === 0) {
    const val = Math.round(l * 255);
    return { r: val, g: val, b: val };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return {
    r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  };
}

export function convertColor(input: {
  hex?: string;
  rgb?: RgbColor;
  hsl?: HslColor;
}): ColorResult {
  let rgb: RgbColor | null = null;

  if (input.hex !== undefined) {
    rgb = hexToRgb(input.hex);
  } else if (input.rgb !== undefined) {
    if (
      Number.isFinite(input.rgb.r) &&
      Number.isFinite(input.rgb.g) &&
      Number.isFinite(input.rgb.b)
    ) {
      rgb = {
        r: clamp(input.rgb.r, 0, 255),
        g: clamp(input.rgb.g, 0, 255),
        b: clamp(input.rgb.b, 0, 255),
      };
    }
  } else if (input.hsl !== undefined) {
    if (
      Number.isFinite(input.hsl.h) &&
      Number.isFinite(input.hsl.s) &&
      Number.isFinite(input.hsl.l)
    ) {
      rgb = hslToRgb(input.hsl);
    }
  }

  if (!rgb) return { ok: false, reason: "invalid_color" };

  const hex = rgbToHex(rgb);
  const hsl = rgbToHsl(rgb);
  const cssRgb = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const cssHsl = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  return { ok: true, hex, rgb, hsl, cssRgb, cssHsl };
}

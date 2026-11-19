export type HarmonyMode =
  | "analogous"
  | "monochromatic"
  | "triadic"
  | "complementary"
  | "split-complementary";

export type PaletteSwatch = {
  id: string;
  hex: string;
  rgb: string;
  hsl: string;
  isLight: boolean;
  locked?: boolean;
};

export type HslColor = { h: number; s: number; l: number };
export type RgbColor = { r: number; g: number; b: number };

export function parseHexToRgb(hex: string): RgbColor | null {
  const clean = hex.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(clean)) return null;

  if (clean.length === 3) {
    return {
      r: parseInt(clean[0]! + clean[0]!, 16),
      g: parseInt(clean[1]! + clean[1]!, 16),
      b: parseInt(clean[2]! + clean[2]!, 16),
    };
  }
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

export function rgbToHsl(rgb: RgbColor): HslColor {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hslToRgb(hsl: HslColor): RgbColor {
  const h = ((hsl.h % 360) + 360) % 360 / 360;
  const s = Math.max(0, Math.min(100, hsl.s)) / 100;
  const l = Math.max(0, Math.min(100, hsl.l)) / 100;

  if (s === 0) {
    const val = Math.round(l * 255);
    return { r: val, g: val, b: val };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    let tNorm = t;
    if (tNorm < 0) tNorm += 1;
    if (tNorm > 1) tNorm -= 1;
    if (tNorm < 1 / 6) return p + (q - p) * 6 * tNorm;
    if (tNorm < 1 / 2) return q;
    if (tNorm < 2 / 3) return p + (q - p) * (2 / 3 - tNorm) * 6;
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

export function rgbToHex(rgb: RgbColor): string {
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

export function hslToHex(hsl: HslColor): string {
  return rgbToHex(hslToRgb(hsl));
}

export function swatchFromHsl(hsl: HslColor, id: string): PaletteSwatch {
  const rgb = hslToRgb(hsl);
  const hex = rgbToHex(rgb);
  const isLight = hsl.l > 60 || (hsl.l > 45 && hsl.s < 40);

  return {
    id,
    hex,
    rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    isLight,
  };
}

export function generatePalette(
  seedHex: string,
  mode: HarmonyMode = "analogous"
): PaletteSwatch[] {
  const rgb = parseHexToRgb(seedHex) || { r: 59, g: 130, b: 246 };
  const baseHsl = rgbToHsl(rgb);
  const { h, s, l } = baseHsl;

  let hslList: HslColor[] = [];

  switch (mode) {
    case "analogous":
      hslList = [
        { h: (h - 40 + 360) % 360, s, l },
        { h: (h - 20 + 360) % 360, s, l },
        baseHsl,
        { h: (h + 20) % 360, s, l },
        { h: (h + 40) % 360, s, l },
      ];
      break;

    case "monochromatic":
      hslList = [
        { h, s, l: Math.max(15, l - 30) },
        { h, s, l: Math.max(25, l - 15) },
        baseHsl,
        { h, s, l: Math.min(85, l + 15) },
        { h, s, l: Math.min(95, l + 30) },
      ];
      break;

    case "triadic":
      hslList = [
        baseHsl,
        { h: (h + 120) % 360, s, l },
        { h: (h + 240) % 360, s, l },
        { h: (h + 120) % 360, s: Math.max(20, s - 20), l: Math.min(85, l + 15) },
        { h: (h + 240) % 360, s: Math.max(20, s - 20), l: Math.max(20, l - 20) },
      ];
      break;

    case "complementary":
      hslList = [
        baseHsl,
        { h, s: Math.max(20, s - 20), l: Math.min(85, l + 20) },
        { h: (h + 180) % 360, s, l },
        { h: (h + 180) % 360, s: Math.max(20, s - 20), l: Math.min(85, l + 20) },
        { h: (h + 180) % 360, s, l: Math.max(20, l - 25) },
      ];
      break;

    case "split-complementary":
      hslList = [
        baseHsl,
        { h: (h + 150) % 360, s, l },
        { h: (h + 210) % 360, s, l },
        { h: (h + 150) % 360, s: Math.max(20, s - 20), l: Math.min(85, l + 20) },
        { h: (h + 210) % 360, s: Math.max(20, s - 20), l: Math.max(20, l - 20) },
      ];
      break;
  }

  return hslList.map((c, i) => swatchFromHsl(c, String(i + 1)));
}

export function exportCssVariables(swatches: PaletteSwatch[]): string {
  return `:root {\n${swatches.map((s, idx) => `  --color-${idx + 1}: ${s.hex};`).join("\n")}\n}`;
}

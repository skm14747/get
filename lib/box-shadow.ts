export type ShadowLayer = {
  id: string;
  x: number; // -100 to 100 px
  y: number; // -100 to 100 px
  blur: number; // 0 to 100 px
  spread: number; // -50 to 50 px
  color: string; // hex
  opacity: number; // 0 to 1
  inset: boolean;
};

export type BoxShadowConfig = {
  layers: ShadowLayer[];
};

export const BOX_SHADOW_PRESETS: { name: string; layers: ShadowLayer[] }[] = [
  {
    name: "Subtle Elevation",
    layers: [
      { id: "1", x: 0, y: 1, blur: 3, spread: 0, color: "#000000", opacity: 0.1, inset: false },
      { id: "2", x: 0, y: 1, blur: 2, spread: -1, color: "#000000", opacity: 0.1, inset: false },
    ],
  },
  {
    name: "Smooth Medium",
    layers: [
      { id: "1", x: 0, y: 4, blur: 6, spread: -1, color: "#000000", opacity: 0.1, inset: false },
      { id: "2", x: 0, y: 2, blur: 4, spread: -2, color: "#000000", opacity: 0.1, inset: false },
    ],
  },
  {
    name: "Floating Card",
    layers: [
      { id: "1", x: 0, y: 10, blur: 15, spread: -3, color: "#000000", opacity: 0.1, inset: false },
      { id: "2", x: 0, y: 4, blur: 6, spread: -4, color: "#000000", opacity: 0.1, inset: false },
    ],
  },
  {
    name: "High Pop",
    layers: [
      { id: "1", x: 0, y: 20, blur: 25, spread: -5, color: "#000000", opacity: 0.15, inset: false },
      { id: "2", x: 0, y: 8, blur: 10, spread: -6, color: "#000000", opacity: 0.1, inset: false },
    ],
  },
  {
    name: "Inset Well",
    layers: [
      { id: "1", x: 0, y: 2, blur: 4, spread: 0, color: "#000000", opacity: 0.15, inset: true },
    ],
  },
];

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.trim().replace(/^#/, "");
  let r = 0, g = 0, b = 0;

  if (clean.length === 3) {
    r = parseInt(clean[0]! + clean[0]!, 16);
    g = parseInt(clean[1]! + clean[1]!, 16);
    b = parseInt(clean[2]! + clean[2]!, 16);
  } else if (clean.length === 6) {
    r = parseInt(clean.slice(0, 2), 16);
    g = parseInt(clean.slice(2, 4), 16);
    b = parseInt(clean.slice(4, 6), 16);
  }

  const clampedAlpha = Math.max(0, Math.min(1, Math.round(alpha * 100) / 100));
  return `rgba(${r}, ${g}, ${b}, ${clampedAlpha})`;
}

export function compileSingleShadow(layer: ShadowLayer): string {
  const insetStr = layer.inset ? "inset " : "";
  const colorStr = hexToRgba(layer.color, layer.opacity);
  return `${insetStr}${layer.x}px ${layer.y}px ${layer.blur}px ${layer.spread}px ${colorStr}`;
}

export function compileBoxShadow(layers: ShadowLayer[]): string {
  if (layers.length === 0) return "none";
  return layers.map(compileSingleShadow).join(", ");
}

export function compileFullBoxShadowCss(layers: ShadowLayer[]): string {
  const val = compileBoxShadow(layers);
  return `box-shadow: ${val};\n-webkit-box-shadow: ${val};`;
}

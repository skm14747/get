export type BorderRadiusMode = "simple" | "advanced";

export type SimpleBorderRadius = {
  topLeft: number; // 0 to 150 px
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
};

export type AdvancedBorderRadius = {
  tlH: number; // 0 to 100 %
  trH: number;
  brH: number;
  blH: number;
  tlV: number;
  trV: number;
  brV: number;
  blV: number;
};

export type BorderRadiusConfig = {
  mode: BorderRadiusMode;
  simple: SimpleBorderRadius;
  advanced: AdvancedBorderRadius;
};

export const BORDER_RADIUS_PRESETS: { name: string; config: BorderRadiusConfig }[] = [
  {
    name: "Organic Blob",
    config: {
      mode: "advanced",
      simple: { topLeft: 30, topRight: 30, bottomRight: 30, bottomLeft: 30 },
      advanced: { tlH: 60, trH: 40, brH: 30, blH: 70, tlV: 60, trV: 30, brV: 70, blV: 40 },
    },
  },
  {
    name: "Liquid Pebble",
    config: {
      mode: "advanced",
      simple: { topLeft: 40, topRight: 40, bottomRight: 40, bottomLeft: 40 },
      advanced: { tlH: 30, trH: 70, brH: 70, blH: 30, tlV: 30, trV: 30, brV: 70, blV: 70 },
    },
  },
  {
    name: "Soft Teardrop",
    config: {
      mode: "advanced",
      simple: { topLeft: 50, topRight: 50, bottomRight: 0, bottomLeft: 50 },
      advanced: { tlH: 50, trH: 50, brH: 0, blH: 50, tlV: 50, trV: 50, brV: 0, blV: 50 },
    },
  },
  {
    name: "Card Smooth",
    config: {
      mode: "simple",
      simple: { topLeft: 16, topRight: 16, bottomRight: 16, bottomLeft: 16 },
      advanced: { tlH: 10, trH: 10, brH: 10, blH: 10, tlV: 10, trV: 10, brV: 10, blV: 10 },
    },
  },
  {
    name: "Rounded Pill",
    config: {
      mode: "simple",
      simple: { topLeft: 9999, topRight: 9999, bottomRight: 9999, bottomLeft: 9999 },
      advanced: { tlH: 50, trH: 50, brH: 50, blH: 50, tlV: 50, trV: 50, brV: 50, blV: 50 },
    },
  },
];

export function compileBorderRadius(config: BorderRadiusConfig): string {
  if (config.mode === "simple") {
    const { topLeft, topRight, bottomRight, bottomLeft } = config.simple;
    if (topLeft === topRight && topRight === bottomRight && bottomRight === bottomLeft) {
      return `${topLeft}px`;
    }
    return `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;
  }

  const { tlH, trH, brH, blH, tlV, trV, brV, blV } = config.advanced;
  const hSide = `${tlH}% ${trH}% ${brH}% ${blH}%`;
  const vSide = `${tlV}% ${trV}% ${brV}% ${blV}%`;
  return `${hSide} / ${vSide}`;
}

export function compileFullBorderRadiusCss(config: BorderRadiusConfig): string {
  const val = compileBorderRadius(config);
  return `border-radius: ${val};\n-webkit-border-radius: ${val};`;
}

export type GradientType = "linear" | "radial";
export type RadialShape = "circle" | "ellipse";

export type ColorStop = {
  id: string;
  color: string;
  position: number; // 0 to 100
};

export type GradientConfig = {
  type: GradientType;
  angle: number; // 0 to 360
  radialShape?: RadialShape;
  stops: ColorStop[];
};

export const GRADIENT_PRESETS: { name: string; config: GradientConfig }[] = [
  {
    name: "Sunset Ember",
    config: {
      type: "linear",
      angle: 135,
      stops: [
        { id: "1", color: "#f97316", position: 0 },
        { id: "2", color: "#ec4899", position: 100 },
      ],
    },
  },
  {
    name: "Oceanic Blue",
    config: {
      type: "linear",
      angle: 90,
      stops: [
        { id: "1", color: "#06b6d4", position: 0 },
        { id: "2", color: "#3b82f6", position: 100 },
      ],
    },
  },
  {
    name: "Emerald Forest",
    config: {
      type: "linear",
      angle: 120,
      stops: [
        { id: "1", color: "#10b981", position: 0 },
        { id: "2", color: "#047857", position: 100 },
      ],
    },
  },
  {
    name: "Neon Cyber",
    config: {
      type: "linear",
      angle: 45,
      stops: [
        { id: "1", color: "#8b5cf6", position: 0 },
        { id: "2", color: "#ec4899", position: 50 },
        { id: "3", color: "#f43f5e", position: 100 },
      ],
    },
  },
  {
    name: "Radial Glow",
    config: {
      type: "radial",
      angle: 0,
      radialShape: "circle",
      stops: [
        { id: "1", color: "#38bdf8", position: 0 },
        { id: "2", color: "#0f172a", position: 100 },
      ],
    },
  },
];

export function compileCssGradient(config: GradientConfig): string {
  const sortedStops = [...config.stops].sort((a, b) => a.position - b.position);
  const stopsStr = sortedStops
    .map((s) => `${s.color} ${Math.max(0, Math.min(100, Math.round(s.position)))}%`)
    .join(", ");

  if (config.type === "radial") {
    const shape = config.radialShape || "circle";
    return `radial-gradient(${shape}, ${stopsStr})`;
  }

  const normalizedAngle = ((Math.round(config.angle) % 360) + 360) % 360;
  return `linear-gradient(${normalizedAngle}deg, ${stopsStr})`;
}

export function compileFullCssRule(config: GradientConfig): string {
  const grad = compileCssGradient(config);
  return `background: ${config.stops[0]?.color || "#ffffff"};\nbackground: ${grad};`;
}

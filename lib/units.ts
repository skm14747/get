export type UnitKind = "length" | "mass" | "temperature" | "area" | "volume" | "speed";

const LENGTH_METRES: Record<string, number> = {
  m: 1,
  km: 1000,
  cm: 0.01,
  mm: 0.001,
  mi: 1609.344,
  yd: 0.9144,
  ft: 0.3048,
  in: 0.0254,
};

const MASS_KG: Record<string, number> = {
  kg: 1,
  g: 0.001,
  mg: 0.000001,
  lb: 0.45359237,
  oz: 0.028349523125,
};

const AREA_M2: Record<string, number> = {
  "m²": 1,
  "km²": 1_000_000,
  "ft²": 0.09290304,
  acre: 4046.8564224,
};

const VOLUME_L: Record<string, number> = {
  L: 1,
  mL: 0.001,
  "m³": 1000,
  "US gal": 3.785411784,
  "US fl oz": 0.0295735295625,
};

const SPEED_MS: Record<string, number> = {
  "m/s": 1,
  "km/h": 1000 / 3600,
  mph: 0.44704,
  kn: 1852 / 3600,
};

export const UNIT_GROUPS: Record<UnitKind, string[]> = {
  length: Object.keys(LENGTH_METRES),
  mass: Object.keys(MASS_KG),
  temperature: ["°C", "°F", "K"],
  area: Object.keys(AREA_M2),
  volume: Object.keys(VOLUME_L),
  speed: Object.keys(SPEED_MS),
};

export function convertUnit(kind: UnitKind, value: number, from: string, to: string): number | null {
  if (!Number.isFinite(value)) return null;
  if (kind === "temperature") return convertTemperature(value, from, to);
  const table = kind === "length" ? LENGTH_METRES : kind === "mass" ? MASS_KG : kind === "area" ? AREA_M2 : kind === "volume" ? VOLUME_L : SPEED_MS;
  const fromFactor = table[from];
  const toFactor = table[to];
  if (fromFactor === undefined || toFactor === undefined || toFactor === 0) return null;
  return (value * fromFactor) / toFactor;
}

function convertTemperature(value: number, from: string, to: string): number | null {
  let celsius: number;
  if (from === "°C") celsius = value;
  else if (from === "°F") celsius = ((value - 32) * 5) / 9;
  else if (from === "K") celsius = value - 273.15;
  else return null;
  if (to === "°C") return celsius;
  if (to === "°F") return (celsius * 9) / 5 + 32;
  if (to === "K") return celsius + 273.15;
  return null;
}

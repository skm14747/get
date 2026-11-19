import { describe, expect, it } from "vitest";
import { convertUnit, UNIT_GROUPS } from "@/lib/units";

describe("Unit converter — independent oracle", () => {
  // Length
  it("1 km = 1000 m", () => expect(convertUnit("length", 1, "km", "m")).toBe(1000));
  it("1 mi = 1609.344 m", () => expect(convertUnit("length", 1, "mi", "m")).toBeCloseTo(1609.344, 6));
  it("1 in = 0.0254 m", () => expect(convertUnit("length", 1, "in", "m")).toBeCloseTo(0.0254, 10));
  it("1 ft = 12 in", () => expect(convertUnit("length", 1, "ft", "in")).toBeCloseTo(12, 6));
  it("1 m = 100 cm", () => expect(convertUnit("length", 1, "m", "cm")).toBe(100));
  it("1 yd = 0.9144 m", () => expect(convertUnit("length", 1, "yd", "m")).toBeCloseTo(0.9144, 10));

  // Mass
  it("1 kg = 1000 g", () => expect(convertUnit("mass", 1, "kg", "g")).toBe(1000));
  it("1 lb = 0.45359237 kg", () => expect(convertUnit("mass", 1, "lb", "kg")).toBeCloseTo(0.45359237, 10));
  it("1 oz = 28.349523125 g", () => expect(convertUnit("mass", 1, "oz", "g")).toBeCloseTo(28.349523125, 6));

  // Temperature (affine, not multiplicative)
  it("0°C = 32°F", () => expect(convertUnit("temperature", 0, "°C", "°F")).toBe(32));
  it("100°C = 212°F", () => expect(convertUnit("temperature", 100, "°C", "°F")).toBe(212));
  it("32°F = 0°C", () => expect(convertUnit("temperature", 32, "°F", "°C")).toBeCloseTo(0, 10));
  it("212°F = 100°C", () => expect(convertUnit("temperature", 212, "°F", "°C")).toBeCloseTo(100, 10));
  it("0°C = 273.15 K", () => expect(convertUnit("temperature", 0, "°C", "K")).toBeCloseTo(273.15, 10));
  it("273.15 K = 0°C", () => expect(convertUnit("temperature", 273.15, "K", "°C")).toBeCloseTo(0, 10));
  it("-40°C = -40°F", () => expect(convertUnit("temperature", -40, "°C", "°F")).toBeCloseTo(-40, 10));
  it("0 K = -273.15°C", () => expect(convertUnit("temperature", 0, "K", "°C")).toBeCloseTo(-273.15, 10));

  // Area
  it("1 km² = 1000000 m²", () => expect(convertUnit("area", 1, "km²", "m²")).toBe(1_000_000));
  it("1 acre = 4046.8564224 m²", () => expect(convertUnit("area", 1, "acre", "m²")).toBeCloseTo(4046.8564224, 4));
  it("1 ft² = 0.09290304 m²", () => expect(convertUnit("area", 1, "ft²", "m²")).toBeCloseTo(0.09290304, 10));

  // Volume
  it("1 L = 1000 mL", () => expect(convertUnit("volume", 1, "L", "mL")).toBe(1000));
  it("1 m³ = 1000 L", () => expect(convertUnit("volume", 1, "m³", "L")).toBe(1000));
  it("1 US gal = 3.785411784 L", () => expect(convertUnit("volume", 1, "US gal", "L")).toBeCloseTo(3.785411784, 6));

  // Speed
  it("1 km/h = 1000/3600 m/s", () => expect(convertUnit("speed", 1, "km/h", "m/s")).toBeCloseTo(1000 / 3600, 10));
  it("1 mph = 0.44704 m/s", () => expect(convertUnit("speed", 1, "mph", "m/s")).toBeCloseTo(0.44704, 10));
  it("1 kn = 1852/3600 m/s", () => expect(convertUnit("speed", 1, "kn", "m/s")).toBeCloseTo(1852 / 3600, 10));

  // Identity: same unit -> same value
  it("same-unit conversion returns the input", () => {
    for (const kind of Object.keys(UNIT_GROUPS) as (keyof typeof UNIT_GROUPS)[]) {
      const first = UNIT_GROUPS[kind][0];
      if (first) expect(convertUnit(kind, 42, first, first)).toBeCloseTo(42, 10);
    }
  });

  // Zero
  it("zero converts to zero for length", () => expect(convertUnit("length", 0, "km", "m")).toBe(0));
  it("zero Celsius to Fahrenheit is 32", () => expect(convertUnit("temperature", 0, "°C", "°F")).toBe(32));

  // Negative temperature
  it("negative Celsius", () => expect(convertUnit("temperature", -10, "°C", "°F")).toBeCloseTo(14, 10));

  // Invalid unit
  it("unknown unit returns null", () => expect(convertUnit("length", 1, "furlong", "m")).toBeNull());

  // Non-finite
  it("NaN returns null", () => expect(convertUnit("length", NaN, "m", "km")).toBeNull());
  it("Infinity returns null", () => expect(convertUnit("length", Infinity, "m", "km")).toBeNull());

  // Round-trip tolerance
  it("km -> mi -> km round-trip", () => {
    const miles = convertUnit("length", 10, "km", "mi");
    expect(miles).not.toBeNull();
    const back = convertUnit("length", miles!, "mi", "km");
    expect(back).toBeCloseTo(10, 8);
  });

  it("°C -> °F -> °C round-trip", () => {
    const f = convertUnit("temperature", 37, "°C", "°F");
    expect(f).not.toBeNull();
    const back = convertUnit("temperature", f!, "°F", "°C");
    expect(back).toBeCloseTo(37, 8);
  });
});

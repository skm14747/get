import { describe, expect, it } from "vitest";
import {
  BORDER_RADIUS_PRESETS,
  compileBorderRadius,
  compileFullBorderRadiusCss,
  type BorderRadiusConfig,
} from "@/lib/border-radius";

describe("CSS Border Radius Generator", () => {
  it("compiles uniform 4-corner radius to single value", () => {
    const config: BorderRadiusConfig = {
      mode: "simple",
      simple: { topLeft: 12, topRight: 12, bottomRight: 12, bottomLeft: 12 },
      advanced: { tlH: 0, trH: 0, brH: 0, blH: 0, tlV: 0, trV: 0, brV: 0, blV: 0 },
    };
    expect(compileBorderRadius(config)).toBe("12px");
  });

  it("compiles asymmetric 4-corner radius", () => {
    const config: BorderRadiusConfig = {
      mode: "simple",
      simple: { topLeft: 10, topRight: 20, bottomRight: 30, bottomLeft: 40 },
      advanced: { tlH: 0, trH: 0, brH: 0, blH: 0, tlV: 0, trV: 0, brV: 0, blV: 0 },
    };
    expect(compileBorderRadius(config)).toBe("10px 20px 30px 40px");
  });

  it("compiles advanced 8-value elliptical border radius", () => {
    const config: BorderRadiusConfig = {
      mode: "advanced",
      simple: { topLeft: 0, topRight: 0, bottomRight: 0, bottomLeft: 0 },
      advanced: { tlH: 60, trH: 40, brH: 30, blH: 70, tlV: 60, trV: 30, brV: 70, blV: 40 },
    };
    const css = compileBorderRadius(config);
    expect(css).toBe("60% 40% 30% 70% / 60% 30% 70% 40%");
  });

  it("compiles full CSS with webkit prefix", () => {
    const config: BorderRadiusConfig = {
      mode: "simple",
      simple: { topLeft: 8, topRight: 8, bottomRight: 8, bottomLeft: 8 },
      advanced: { tlH: 0, trH: 0, brH: 0, blH: 0, tlV: 0, trV: 0, brV: 0, blV: 0 },
    };
    const full = compileFullBorderRadiusCss(config);
    expect(full).toContain("border-radius: 8px;");
    expect(full).toContain("-webkit-border-radius: 8px;");
  });

  it("ensures all presets compile valid border radius", () => {
    for (const preset of BORDER_RADIUS_PRESETS) {
      const val = compileBorderRadius(preset.config);
      expect(val.length).toBeGreaterThan(2);
      expect(val.includes("px") || val.includes("%")).toBe(true);
    }
  });
});

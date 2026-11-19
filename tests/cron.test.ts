import { describe, expect, it } from "vitest";
import { CRON_PRESETS, explainCron, getNextRunDates } from "@/lib/cron";

describe("Cron Expression Generator & Explainer", () => {
  it("explains standard every-minute cron", () => {
    const res = explainCron("* * * * *");
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.description).toBe("Runs every single minute.");
  });

  it("explains step intervals", () => {
    const res = explainCron("*/15 * * * *");
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.description).toBe("Runs every 15 minutes.");
  });

  it("explains daily midnight runs", () => {
    const res = explainCron("0 0 * * *");
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.description).toBe("Runs every day at midnight (00:00).");
  });

  it("explains weekday scheduled tasks", () => {
    const res = explainCron("0 9 * * 1-5");
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.description).toContain("at 09:00");
    expect(res.description).toContain("weekdays");
  });

  it("calculates next 5 execution dates chronologically", () => {
    const fromDate = new Date("2026-11-19T08:00:00Z");
    const dates = getNextRunDates("0 9 * * *", 5, fromDate);
    expect(dates).toHaveLength(5);
    for (const d of dates) {
      expect(d).toContain("09:00");
    }
  });

  it("rejects expressions with incorrect field counts", () => {
    const res1 = explainCron("* * *");
    expect(res1.ok).toBe(false);

    const res2 = explainCron("* * * * * *");
    expect(res2.ok).toBe(false);
  });

  it("ensures all presets parse successfully", () => {
    for (const preset of CRON_PRESETS) {
      const res = explainCron(preset.expression);
      expect(res.ok).toBe(true);
      if (res.ok) {
        expect(res.description.length).toBeGreaterThan(10);
        expect(res.nextDates.length).toBeGreaterThan(0);
      }
    }
  });
});

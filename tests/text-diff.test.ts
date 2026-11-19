import { describe, expect, it } from "vitest";
import { computeDiff } from "@/lib/text-diff";

describe("computeDiff", () => {
  it("identifies identical text blocks", () => {
    const result = computeDiff("line 1\nline 2", "line 1\nline 2");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.isIdentical).toBe(true);
    expect(result.additionsCount).toBe(0);
    expect(result.deletionsCount).toBe(0);
  });

  it("detects line additions and deletions", () => {
    const original = "apple\nbanana\ncherry";
    const modified = "apple\norange\ncherry";
    const result = computeDiff(original, modified, "lines");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.isIdentical).toBe(false);
    expect(result.deletionsCount).toBeGreaterThanOrEqual(1);
    expect(result.additionsCount).toBeGreaterThanOrEqual(1);

    const hasOrange = result.changes.some((c) => c.type === "added" && c.value.includes("orange"));
    const hasBanana = result.changes.some((c) => c.type === "removed" && c.value.includes("banana"));
    expect(hasOrange).toBe(true);
    expect(hasBanana).toBe(true);
  });

  it("supports word diff mode", () => {
    const original = "The quick brown fox";
    const modified = "The fast brown fox";
    const result = computeDiff(original, modified, "words");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.isIdentical).toBe(false);
    const hasFast = result.changes.some((c) => c.type === "added" && c.value.includes("fast"));
    const hasQuick = result.changes.some((c) => c.type === "removed" && c.value.includes("quick"));
    expect(hasFast).toBe(true);
    expect(hasQuick).toBe(true);
  });

  it("handles empty inputs properly", () => {
    expect(computeDiff("", "").ok).toBe(false);
    const addAll = computeDiff("", "new text");
    expect(addAll.ok).toBe(true);
    if (!addAll.ok) return;
    expect(addAll.additionsCount).toBe(1);
  });
});

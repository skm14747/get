import { describe, expect, it } from "vitest";
import { cleanTextLines } from "@/lib/text-cleaner";

describe("cleanTextLines", () => {
  it("removes duplicate lines preserving first occurrence", () => {
    const input = "apple\nbanana\napple\norange\nbanana";
    const result = cleanTextLines(input, { removeDuplicates: true });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.text).toBe("apple\nbanana\norange");
    expect(result.duplicatesRemoved).toBe(2);
    expect(result.cleanedLineCount).toBe(3);
  });

  it("respects case sensitivity toggle", () => {
    const input = "Apple\napple\nAPPLE";
    const caseSensitive = cleanTextLines(input, { caseSensitive: true });
    expect(caseSensitive.ok).toBe(true);
    if (!caseSensitive.ok) return;
    expect(caseSensitive.text).toBe("Apple\napple\nAPPLE");

    const caseInsensitive = cleanTextLines(input, { caseSensitive: false });
    expect(caseInsensitive.ok).toBe(true);
    if (!caseInsensitive.ok) return;
    expect(caseInsensitive.text).toBe("Apple");
    expect(caseInsensitive.duplicatesRemoved).toBe(2);
  });

  it("trims surrounding whitespace and strips empty lines", () => {
    const input = "  line 1  \n\n\tline 2\t\n   \nline 3";
    const result = cleanTextLines(input, { trimLines: true, removeBlankLines: true });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.text).toBe("line 1\nline 2\nline 3");
  });

  it("sorts lines alphabetically ascending and descending", () => {
    const input = "zebra\napple\nmonkey";
    const asc = cleanTextLines(input, { sortOrder: "asc" });
    expect(asc.ok).toBe(true);
    if (!asc.ok) return;
    expect(asc.text).toBe("apple\nmonkey\nzebra");

    const desc = cleanTextLines(input, { sortOrder: "desc" });
    expect(desc.ok).toBe(true);
    if (!desc.ok) return;
    expect(desc.text).toBe("zebra\nmonkey\napple");
  });

  it("returns empty result on blank input", () => {
    expect(cleanTextLines("").ok).toBe(false);
  });
});

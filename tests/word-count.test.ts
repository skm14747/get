import { describe, expect, it } from "vitest";
import { countSentences, countText, readingTimeLabel } from "@/lib/word-count";

describe("countText", () => {
  it("returns zeros for an empty string", () => {
    const counts = countText("");
    expect(counts.words).toBe(0);
    expect(counts.characters).toBe(0);
    expect(counts.sentences).toBe(0);
    expect(counts.paragraphs).toBe(0);
    expect(counts.lines).toBe(0);
    expect(readingTimeLabel(0)).toBe("0 minutes");
  });

  it("counts the documented doctor example", () => {
    const text = "Dr. Smith paid 3.14. Then she left.";
    const counts = countText(text);
    expect(counts.words).toBe(7);
    expect(counts.sentences).toBe(2);
    expect(counts.paragraphs).toBe(1);
    expect(counts.lines).toBe(1);
  });

  it("separates paragraphs on a blank line and lines on a newline", () => {
    const counts = countText("one\ntwo\n\nthree");
    expect(counts.lines).toBe(4);
    expect(counts.paragraphs).toBe(2);
    expect(counts.words).toBe(3);
  });

  it("counts a trailing newline as an extra line", () => {
    expect(countText("a\n").lines).toBe(2);
  });

  it("counts code points and graphemes separately", () => {
    const emoji = "👍";
    const counts = countText(emoji);
    expect(counts.characters).toBe(1);
    expect(counts.graphemes).toBe(1);
    expect(emoji.length).toBe(2);
    const family = "👨‍👩‍👧‍👦";
    const familyCounts = countText(family);
    expect(familyCounts.graphemes).toBe(1);
    expect(familyCounts.characters).toBeGreaterThan(1);
  });

  it("excludes whitespace from the no-space character count", () => {
    const counts = countText("a b");
    expect(counts.characters).toBe(3);
    expect(counts.charactersNoSpaces).toBe(2);
  });

  it("labels reading time from a 200 word pace", () => {
    expect(readingTimeLabel(1)).toBe("Less than 1 minute");
    expect(readingTimeLabel(200)).toBe("About 1 minute");
    expect(readingTimeLabel(201)).toBe("About 2 minutes");
  });

  it("does not split decimals into sentences", () => {
    expect(countSentences("Pi is 3.14 today.")).toBe(1);
  });
});

import { describe, expect, it } from "vitest";
import {
  countGraphemes,
  countLines,
  countParagraphs,
  countSentences,
  countText,
  readingTimeLabel,
} from "@/lib/word-count";

describe("Word counter — independent oracle", () => {
  it("counts words in a simple sentence", () => {
    const result = countText("The quick brown fox jumps over the lazy dog");
    expect(result.words).toBe(9);
    expect(result.characters).toBe(43);
    expect(result.charactersNoSpaces).toBe(35);
  });

  it("empty string = all zeros except wordsPerMinute", () => {
    const result = countText("");
    expect(result.words).toBe(0);
    expect(result.characters).toBe(0);
    expect(result.sentences).toBe(0);
    expect(result.paragraphs).toBe(0);
    expect(result.lines).toBe(0);
  });

  it("whitespace only = 0 words", () => {
    const result = countText("   \n  \t  ");
    expect(result.words).toBe(0);
  });

  it("single word", () => {
    expect(countText("hello").words).toBe(1);
  });

  it("multiple spaces between words still count correctly", () => {
    expect(countText("hello    world").words).toBe(2);
  });

  it("counts lines correctly", () => {
    expect(countLines("line1\nline2\nline3")).toBe(3);
    expect(countLines("single")).toBe(1);
    expect(countLines("")).toBe(0);
  });

  it("counts paragraphs (separated by blank lines)", () => {
    expect(countParagraphs("Para 1\n\nPara 2")).toBe(2);
    expect(countParagraphs("Para 1\n\n\nPara 2")).toBe(2);
    expect(countParagraphs("Single paragraph")).toBe(1);
    expect(countParagraphs("")).toBe(0);
  });

  it("counts sentences correctly", () => {
    expect(countSentences("Hello. World.")).toBe(2);
    expect(countSentences("Hello! World?")).toBe(2);
    expect(countSentences("")).toBe(0);
  });

  it("does not count abbreviations as sentence endings", () => {
    expect(countSentences("Dr. Smith went home.")).toBe(1);
    expect(countSentences("Mr. and Mrs. Jones arrived.")).toBe(1);
    expect(countSentences("See e.g. this example.")).toBe(1);
  });

  it("does not count decimal points as sentence endings", () => {
    expect(countSentences("The price is 12.50 dollars.")).toBe(1);
  });

  it("counts graphemes for emoji", () => {
    // Flag emoji is 2 code points but 1 grapheme
    expect(countGraphemes("🙂")).toBe(1);
    expect(countGraphemes("Hello 🙂")).toBe(7);
  });

  it("reading time labels", () => {
    expect(readingTimeLabel(0)).toBe("0 minutes");
    expect(readingTimeLabel(100)).toBe("Less than 1 minute");
    expect(readingTimeLabel(200)).toBe("About 1 minute");
    expect(readingTimeLabel(400)).toBe("About 2 minutes");
    expect(readingTimeLabel(1000)).toBe("About 5 minutes");
  });

  it("countText returns correct reading minutes", () => {
    const result = countText("word ".repeat(400).trim());
    expect(result.words).toBe(400);
    expect(result.readingMinutes).toBeCloseTo(2, 1);
  });

  // Multilingual
  it("counts CJK characters as words (whitespace-split)", () => {
    const result = countText("日本語テスト");
    expect(result.words).toBe(1); // no spaces, treated as one "word"
    expect(result.characters).toBe(6);
  });

  it("counts Arabic text", () => {
    const result = countText("مرحبا بالعالم");
    expect(result.words).toBe(2);
  });

  it("counts Hindi text", () => {
    const result = countText("नमस्ते दुनिया");
    expect(result.words).toBe(2);
  });
});

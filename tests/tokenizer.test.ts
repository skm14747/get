import { beforeAll, describe, expect, it } from "vitest";
import {
  countWords,
  estimateTokenCount,
  findExpensiveWords,
  findFrequentTokens,
  loadEncoder,
  MODEL_OPTIONS,
  tokenizeOpenAI,
} from "@/lib/tokenizer";

beforeAll(async () => {
  await loadEncoder("o200k_base");
  await loadEncoder("cl100k_base");
});

describe("tokenizeOpenAI", () => {
  it("tokenizes simple text with o200k_base", () => {
    const result = tokenizeOpenAI("Hello world", "o200k_base");
    expect(result.count).toBe(2);
    expect(result.tokenIds).toEqual([13225, 2375]);
    expect(result.tokens).toEqual(["Hello", " world"]);
  });

  it("tokenizes simple text with cl100k_base", () => {
    const result = tokenizeOpenAI("Hello world", "cl100k_base");
    expect(result.count).toBe(2);
    expect(result.tokens.join("")).toBe("Hello world");
  });

  it("returns empty arrays for empty text", () => {
    const result = tokenizeOpenAI("", "o200k_base");
    expect(result.count).toBe(0);
    expect(result.tokenIds).toEqual([]);
    expect(result.tokens).toEqual([]);
  });

  it("handles multi-token words", () => {
    const result = tokenizeOpenAI("cryptocurrency", "o200k_base");
    expect(result.count).toBeGreaterThanOrEqual(1);
    expect(result.tokens.join("")).toBe("cryptocurrency");
  });

  it("handles special characters", () => {
    const result = tokenizeOpenAI("!@#$%", "o200k_base");
    expect(result.count).toBeGreaterThan(0);
    expect(result.tokens.join("")).toBe("!@#$%");
  });

  it("handles Unicode text", () => {
    const result = tokenizeOpenAI("こんにちは世界", "o200k_base");
    expect(result.count).toBeGreaterThan(0);
    expect(result.tokens.join("")).toBe("こんにちは世界");
  });

  it("caches encoder across calls", () => {
    const r1 = tokenizeOpenAI("test", "o200k_base");
    const r2 = tokenizeOpenAI("another test", "o200k_base");
    expect(r1.count).toBeGreaterThan(0);
    expect(r2.count).toBeGreaterThan(0);
  });
});

describe("estimateTokenCount", () => {
  it("estimates tokens for Claude (3.5 chars/token)", () => {
    // 14 chars / 3.5 = 4
    expect(estimateTokenCount("Hello, world!!", 3.5)).toBe(4);
  });

  it("estimates tokens for Gemini (4 chars/token)", () => {
    // 12 chars / 4 = 3
    expect(estimateTokenCount("Hello world!", 4)).toBe(3);
  });

  it("estimates tokens for Grok (3.7 chars/token)", () => {
    // 11 chars / 3.7 ≈ 2.97 → ceil → 3
    expect(estimateTokenCount("Hello world", 3.7)).toBe(3);
  });

  it("returns 0 for empty text", () => {
    expect(estimateTokenCount("", 3.5)).toBe(0);
  });

  it("rounds up partial tokens", () => {
    // 1 char / 3.5 = 0.2857 → ceil → 1
    expect(estimateTokenCount("a", 3.5)).toBe(1);
  });
});

describe("countWords", () => {
  it("counts words separated by spaces", () => {
    expect(countWords("hello world foo")).toBe(3);
  });

  it("handles multiple whitespace types", () => {
    expect(countWords("hello\tworld\nfoo")).toBe(3);
  });

  it("returns 0 for empty string", () => {
    expect(countWords("")).toBe(0);
  });

  it("returns 0 for whitespace-only string", () => {
    expect(countWords("   \t\n  ")).toBe(0);
  });

  it("handles single word", () => {
    expect(countWords("hello")).toBe(1);
  });
});

describe("findExpensiveWords", () => {
  it("finds words that split into multiple tokens", () => {
    const result = findExpensiveWords(
      "the cryptocurrency blockchain is here",
      "o200k_base",
    );
    for (const entry of result) {
      expect(entry.tokenCount).toBeGreaterThan(1);
      expect(entry.tokens.join("")).toBe(entry.word);
    }
  });

  it("returns empty array for simple text", () => {
    const result = findExpensiveWords("the cat sat", "o200k_base");
    expect(result).toEqual([]);
  });

  it("respects limit", () => {
    const result = findExpensiveWords(
      "pneumonoultramicroscopicsilicovolcanoconiosis hippopotomonstrosesquippedaliophobia antidisestablishmentarianism floccinaucinihilipilification supercalifragilisticexpialidocious incomprehensibilities",
      "o200k_base",
      3,
    );
    expect(result.length).toBeLessThanOrEqual(3);
  });

  it("deduplicates words", () => {
    const result = findExpensiveWords(
      "cryptocurrency cryptocurrency cryptocurrency",
      "o200k_base",
    );
    const words = result.map((r) => r.word);
    expect(new Set(words).size).toBe(words.length);
  });
});

describe("findFrequentTokens", () => {
  it("finds the most common tokens", () => {
    const result = tokenizeOpenAI("the the the cat dog", "o200k_base");
    const frequent = findFrequentTokens(
      result.tokenIds,
      (id) => {
        const idx = result.tokenIds.indexOf(id);
        return result.tokens[idx] ?? String(id);
      },
    );
    expect(frequent.length).toBeGreaterThan(0);
    expect(frequent[0].frequency).toBeGreaterThanOrEqual(2);
  });

  it("respects limit", () => {
    const result = tokenizeOpenAI("a b c d e f g h i j", "o200k_base");
    const frequent = findFrequentTokens(
      result.tokenIds,
      (id) => {
        const idx = result.tokenIds.indexOf(id);
        return result.tokens[idx] ?? String(id);
      },
      3,
    );
    expect(frequent.length).toBeLessThanOrEqual(3);
  });

  it("returns empty for empty input", () => {
    expect(findFrequentTokens([], () => "", 5)).toEqual([]);
  });
});

describe("MODEL_OPTIONS", () => {
  it("has unique values", () => {
    const values = MODEL_OPTIONS.map((m) => m.value);
    expect(new Set(values).size).toBe(values.length);
  });

  it("has at least 2 OpenAI encodings", () => {
    const openai = MODEL_OPTIONS.filter((m) => m.provider === "openai");
    expect(openai.length).toBeGreaterThanOrEqual(2);
    const encodings = new Set(openai.map((m) => m.encoding));
    expect(encodings.has("o200k_base")).toBe(true);
    expect(encodings.has("cl100k_base")).toBe(true);
  });

  it("has all four providers", () => {
    const providers = new Set(MODEL_OPTIONS.map((m) => m.provider));
    expect(providers).toEqual(new Set(["openai", "anthropic", "google", "xai"]));
  });

  it("marks OpenAI models as encodable and decodable", () => {
    const openai = MODEL_OPTIONS.filter((m) => m.provider === "openai");
    for (const m of openai) {
      expect(m.encodable).toBe(true);
      expect(m.decodable).toBe(true);
    }
  });

  it("marks non-OpenAI models as not encodable", () => {
    const nonOpenAI = MODEL_OPTIONS.filter((m) => m.provider !== "openai");
    for (const m of nonOpenAI) {
      expect(m.encodable).toBe(false);
    }
  });

  it("non-OpenAI models have charsPerToken ratio", () => {
    const nonOpenAI = MODEL_OPTIONS.filter((m) => m.provider !== "openai");
    for (const m of nonOpenAI) {
      expect(m.charsPerToken).toBeGreaterThan(0);
    }
  });
});

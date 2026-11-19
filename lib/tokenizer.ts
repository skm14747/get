import type { Tiktoken, TiktokenEncoding } from "js-tiktoken";

export type TokenizerProvider = "openai" | "anthropic" | "google" | "xai";

export type OpenAIEncodingName = "o200k_base" | "cl100k_base";

export type ModelOption = {
  label: string;
  value: string;
  provider: TokenizerProvider;
  encoding?: OpenAIEncodingName;
  /** Whether the model supports exact client-side tokenization. */
  encodable: boolean;
  /** Whether individual tokens can be decoded back to text. */
  decodable: boolean;
  /**
   * Approximate characters-per-token ratio used for estimation when
   * no public tokenizer exists. Based on published benchmarks for English.
   */
  charsPerToken?: number;
};

export const MODEL_OPTIONS: ModelOption[] = [
  {
    label: "GPT-4o / GPT-4o-mini (o200k_base)",
    value: "gpt-4o",
    provider: "openai",
    encoding: "o200k_base",
    encodable: true,
    decodable: true,
  },
  {
    label: "GPT-4 / GPT-3.5-turbo (cl100k_base)",
    value: "gpt-4",
    provider: "openai",
    encoding: "cl100k_base",
    encodable: true,
    decodable: true,
  },
  {
    label: "Anthropic Claude (estimate)",
    value: "claude",
    provider: "anthropic",
    encodable: false,
    decodable: false,
    charsPerToken: 3.5,
  },
  {
    label: "Google Gemini (estimate)",
    value: "gemini",
    provider: "google",
    encodable: false,
    decodable: false,
    charsPerToken: 4,
  },
  {
    label: "xAI Grok (estimate)",
    value: "grok",
    provider: "xai",
    encodable: false,
    decodable: false,
    charsPerToken: 3.7,
  },
];

export type TokenizeResult = {
  count: number;
  tokenIds: number[];
  tokens: string[];
};

const encoderCache = new Map<OpenAIEncodingName, Tiktoken>();

async function getOrCreateEncoder(encoding: OpenAIEncodingName): Promise<Tiktoken> {
  let enc = encoderCache.get(encoding);
  if (!enc) {
    const { getEncoding } = await import("js-tiktoken");
    enc = getEncoding(encoding as TiktokenEncoding);
    encoderCache.set(encoding, enc);
  }
  return enc;
}

/**
 * Synchronous encoder access. Returns null if the encoder hasn't been loaded yet.
 * Call `loadEncoder` first to ensure it's available.
 */
function getEncoderSync(encoding: OpenAIEncodingName): Tiktoken | null {
  return encoderCache.get(encoding) ?? null;
}

/** Pre-load an encoder so synchronous access is available. */
export async function loadEncoder(encoding: OpenAIEncodingName): Promise<void> {
  await getOrCreateEncoder(encoding);
}

/** Encode text using a client-side OpenAI tokenizer. Requires encoder to be loaded. */
export function tokenizeOpenAI(text: string, encoding: OpenAIEncodingName): TokenizeResult {
  const enc = getEncoderSync(encoding);
  if (!enc) {
    return { count: 0, tokenIds: [], tokens: [] };
  }
  const ids = enc.encode(text);
  const tokens: string[] = [];
  for (const id of ids) {
    tokens.push(enc.decode([id]));
  }
  return { count: ids.length, tokenIds: Array.from(ids), tokens };
}

/** Async tokenize — loads the encoder if needed, then tokenizes. */
export async function tokenizeOpenAIAsync(text: string, encoding: OpenAIEncodingName): Promise<TokenizeResult> {
  const enc = await getOrCreateEncoder(encoding);
  const ids = enc.encode(text);
  const tokens: string[] = [];
  for (const id of ids) {
    tokens.push(enc.decode([id]));
  }
  return { count: ids.length, tokenIds: Array.from(ids), tokens };
}

/**
 * Estimate token count for models without a public tokenizer.
 * Uses an average characters-per-token ratio. This is a rough estimate,
 * not an exact count — the guide says so.
 */
export function estimateTokenCount(text: string, charsPerToken: number): number {
  if (!text) return 0;
  return Math.ceil(text.length / charsPerToken);
}

/** Count words by splitting on whitespace. */
export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/** Token visualization colors — cycles through 5 distinct pastel tones. */
export const TOKEN_COLORS = [
  "var(--token-1)",
  "var(--token-2)",
  "var(--token-3)",
  "var(--token-4)",
  "var(--token-5)",
] as const;

export type ExpensiveWord = {
  word: string;
  tokenCount: number;
  tokens: string[];
};

/** Find the words that consume the most tokens. Requires encoder to be loaded. */
export function findExpensiveWords(
  text: string,
  encoding: OpenAIEncodingName,
  limit = 5,
): ExpensiveWord[] {
  const enc = getEncoderSync(encoding);
  if (!enc) return [];
  const words = text.split(/\s+/).filter(Boolean);
  const seen = new Set<string>();
  const results: ExpensiveWord[] = [];

  for (const word of words) {
    if (seen.has(word)) continue;
    seen.add(word);
    const ids = enc.encode(word);
    if (ids.length <= 1) continue;
    const tokens = Array.from(ids).map((id) => enc.decode([id]));
    results.push({ word, tokenCount: ids.length, tokens });
  }

  results.sort((a, b) => b.tokenCount - a.tokenCount);
  return results.slice(0, limit);
}

export type FrequentToken = {
  tokenId: number;
  text: string;
  frequency: number;
};

/** Find the most frequently occurring tokens. */
export function findFrequentTokens(
  tokenIds: number[],
  decodeToken: (id: number) => string,
  limit = 5,
): FrequentToken[] {
  const freq = new Map<number, number>();
  for (const id of tokenIds) {
    freq.set(id, (freq.get(id) ?? 0) + 1);
  }

  const entries = Array.from(freq.entries())
    .map(([tokenId, frequency]) => ({
      tokenId,
      text: decodeToken(tokenId),
      frequency,
    }))
    .sort((a, b) => b.frequency - a.frequency);

  return entries.slice(0, limit);
}

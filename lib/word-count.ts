export const WORDS_PER_MINUTE = 200;

export const SENTENCE_ABBREVIATIONS = [
  "Mr",
  "Mrs",
  "Ms",
  "Dr",
  "Prof",
  "Sr",
  "Jr",
  "St",
  "vs",
  "etc",
  "e.g",
  "i.e",
  "a.m",
  "p.m",
] as const;

export type WordCount = {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  graphemes: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  wordsPerMinute: number;
  readingMinutes: number;
};

function codePoints(text: string): string[] {
  return Array.from(text);
}

export function countGraphemes(text: string): number {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text)).length;
  }
  return codePoints(text).length;
}

export function countSentences(text: string): number {
  const trimmed = text.trim();
  if (trimmed === "") return 0;

  let protectedText = trimmed.replace(/(\d)\.(\d)/g, "$1§$2");
  const abbreviation = new RegExp(
    `\\b(?:${SENTENCE_ABBREVIATIONS.map((item) => item.replace(".", "\\.")).join("|")})\\.`,
    "gi",
  );
  protectedText = protectedText.replace(abbreviation, (match) => match.replaceAll(".", "§"));
  protectedText = protectedText.replace(/\b([A-Za-z])\./g, "$1§");

  return protectedText
    .split(/[.!?]+/)
    .map((part) => part.trim())
    .filter((part) => /[\p{L}\p{N}]/u.test(part)).length;
}

export function countParagraphs(text: string): number {
  const trimmed = text.trim();
  if (trimmed === "") return 0;
  return trimmed.split(/\n\s*\n/).filter((part) => part.trim() !== "").length;
}

export function countLines(text: string): number {
  if (text.length === 0) return 0;
  return text.split("\n").length;
}

export function readingTimeLabel(words: number, wordsPerMinute = WORDS_PER_MINUTE): string {
  if (words <= 0) return "0 minutes";
  const minutes = words / wordsPerMinute;
  if (minutes < 1) return "Less than 1 minute";
  const rounded = Math.ceil(minutes);
  return rounded === 1 ? "About 1 minute" : `About ${rounded} minutes`;
}

/**
 * Count words in text. When a locale is provided and `Intl.Segmenter` is
 * available, uses linguistic word segmentation (required for CJK languages
 * that do not separate words with whitespace). Falls back to whitespace
 * splitting when the API is unavailable or no locale is given.
 */
export function countWords(text: string, locale?: string): number {
  const trimmed = text.trim();
  if (trimmed === "") return 0;

  if (locale && typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter(locale, { granularity: "word" });
    return Array.from(segmenter.segment(trimmed)).filter((seg) => seg.isWordLike).length;
  }

  return trimmed.split(/\s+/u).length;
}

export function countText(text: string, wordsPerMinute = WORDS_PER_MINUTE, locale?: string): WordCount {
  const trimmed = text.trim();
  const words = countWords(trimmed, locale);
  const points = codePoints(text);
  const charactersNoSpaces = points.filter((character) => !/^\s$/u.test(character)).length;

  return {
    words,
    characters: points.length,
    charactersNoSpaces,
    graphemes: countGraphemes(text),
    sentences: countSentences(text),
    paragraphs: countParagraphs(text),
    lines: countLines(text),
    wordsPerMinute,
    readingMinutes: words / wordsPerMinute,
  };
}

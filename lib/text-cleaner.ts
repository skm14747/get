export type TextCleanerOptions = {
  removeDuplicates?: boolean;
  caseSensitive?: boolean;
  trimLines?: boolean;
  removeBlankLines?: boolean;
  sortOrder?: "none" | "asc" | "desc";
};

export type TextCleanerResult =
  | {
      ok: true;
      text: string;
      originalLineCount: number;
      cleanedLineCount: number;
      duplicatesRemoved: number;
    }
  | { ok: false; reason: "empty" };

export function cleanTextLines(
  input: string,
  options: TextCleanerOptions = {}
): TextCleanerResult {
  if (input === "") return { ok: false, reason: "empty" };

  const removeDuplicates = options.removeDuplicates ?? true;
  const caseSensitive = options.caseSensitive ?? true;
  const trimLines = options.trimLines ?? true;
  const removeBlankLines = options.removeBlankLines ?? true;
  const sortOrder = options.sortOrder ?? "none";

  const rawLines = input.split(/\r?\n/);
  const originalLineCount = rawLines.length;

  let lines = rawLines;

  if (trimLines) {
    lines = lines.map((line) => line.trim());
  }

  if (removeBlankLines) {
    lines = lines.filter((line) => line !== "");
  }

  let duplicatesRemoved = 0;

  if (removeDuplicates) {
    const seen = new Set<string>();
    const uniqueLines: string[] = [];

    for (const line of lines) {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        uniqueLines.push(line);
      } else {
        duplicatesRemoved++;
      }
    }
    lines = uniqueLines;
  }

  if (sortOrder === "asc") {
    lines.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
  } else if (sortOrder === "desc") {
    lines.sort((a, b) => b.localeCompare(a, undefined, { sensitivity: "base" }));
  }

  return {
    ok: true,
    text: lines.join("\n"),
    originalLineCount,
    cleanedLineCount: lines.length,
    duplicatesRemoved,
  };
}

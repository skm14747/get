export const MAX_JSON_CHARS = 1_000_000;

export type JsonFormatResult =
  | { ok: true; value: string }
  | { ok: false; reason: "empty" | "too_large" | "invalid"; message: string };

export function formatJson(input: string, space: number | null): JsonFormatResult {
  if (input.trim() === "") return { ok: false, reason: "empty", message: "Enter JSON to format." };
  if (input.length > MAX_JSON_CHARS) {
    return { ok: false, reason: "too_large", message: "This JSON is over 1,000,000 characters. Shorten it and try again." };
  }
  try {
    const parsed: unknown = JSON.parse(input);
    const value = space === null ? JSON.stringify(parsed) : JSON.stringify(parsed, null, space);
    return { ok: true, value };
  } catch (error) {
    const message = error instanceof SyntaxError ? error.message : "The JSON could not be parsed.";
    return { ok: false, reason: "invalid", message };
  }
}

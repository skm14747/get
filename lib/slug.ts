export type SlugOptions = {
  delimiter?: "-" | "_";
  lowercase?: boolean;
  stripAccents?: boolean;
};

export type SlugResult =
  | { ok: true; slug: string; original: string }
  | { ok: false; reason: "empty" };

export function generateSlug(text: string, options: SlugOptions = {}): SlugResult {
  const delimiter = options.delimiter ?? "-";
  const lowercase = options.lowercase ?? true;
  const stripAccents = options.stripAccents ?? true;

  if (text.trim() === "") {
    return { ok: false, reason: "empty" };
  }

  let processed = text.trim();

  if (stripAccents) {
    // Unicode Normalization Form KD separates base letters from diacritical marks
    processed = processed.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  }

  if (lowercase) {
    processed = processed.toLowerCase();
  }

  // Replace symbols, whitespace, and punctuation with the delimiter while keeping unicode letters/numbers
  processed = processed.replace(/[^\p{L}\p{N}]+/gu, delimiter);

  // Collapse consecutive delimiters
  const escapedDelimiter = delimiter === "-" ? "\\-" : "_";
  const collapseRegex = new RegExp(`${escapedDelimiter}+`, "g");
  processed = processed.replace(collapseRegex, delimiter);

  // Strip leading and trailing delimiters
  const trimRegex = new RegExp(`^${escapedDelimiter}+|${escapedDelimiter}+$`, "g");
  processed = processed.replace(trimRegex, "");

  if (processed === "") {
    return { ok: false, reason: "empty" };
  }

  return { ok: true, slug: processed, original: text };
}

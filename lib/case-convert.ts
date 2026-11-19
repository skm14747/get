export const CASE_LOCALE = "en-US";

export type CaseName =
  | "upper"
  | "lower"
  | "title"
  | "sentence"
  | "camel"
  | "pascal"
  | "snake"
  | "kebab";

export const CASE_OPTIONS: { id: CaseName; label: string; description: string }[] = [
  { id: "upper", label: "UPPERCASE", description: "Every letter in uppercase." },
  { id: "lower", label: "lowercase", description: "Every letter in lowercase." },
  { id: "title", label: "Title Case", description: "The first letter of each word in uppercase." },
  { id: "sentence", label: "Sentence case", description: "The first letter of each sentence in uppercase." },
  { id: "camel", label: "camelCase", description: "Words joined, with the first word in lowercase." },
  { id: "pascal", label: "PascalCase", description: "Words joined, with every word capitalized." },
  { id: "snake", label: "snake_case", description: "Lowercase words joined with underscores." },
  { id: "kebab", label: "kebab-case", description: "Lowercase words joined with hyphens." },
];

function capitalizeWord(word: string): string {
  const characters = Array.from(word);
  if (characters.length === 0) return "";
  const [first, ...rest] = characters;
  return `${first.toLocaleUpperCase(CASE_LOCALE)}${rest.join("").toLocaleLowerCase(CASE_LOCALE)}`;
}

export function splitIdentifierWords(input: string): string[] {
  const spaced = input
    .replace(/([^\s])[-_]+([^\s])/g, "$1 $2")
    .replace(/([\p{Ll}\p{N}])(\p{Lu})/gu, "$1 $2");
  return spaced.split(/[^\p{L}\p{N}]+/u).filter((word) => word.length > 0);
}

export function toUpperCase(input: string): string {
  return input.toLocaleUpperCase(CASE_LOCALE);
}

export function toLowerCase(input: string): string {
  return input.toLocaleLowerCase(CASE_LOCALE);
}

export function toTitleCase(input: string): string {
  let capitalizeNext = true;
  let output = "";
  for (const character of input) {
    if (/\p{L}/u.test(character)) {
      output += capitalizeNext
        ? character.toLocaleUpperCase(CASE_LOCALE)
        : character.toLocaleLowerCase(CASE_LOCALE);
      capitalizeNext = false;
    } else {
      output += character;
      const apostrophe = character === "'" || character === "’";
      if (!apostrophe && !/\p{N}/u.test(character)) capitalizeNext = true;
    }
  }
  return output;
}

export function toSentenceCase(input: string): string {
  const lower = input.toLocaleLowerCase(CASE_LOCALE);
  let capitalizeNext = true;
  let output = "";
  for (const character of lower) {
    if (capitalizeNext && /\p{L}/u.test(character)) {
      output += character.toLocaleUpperCase(CASE_LOCALE);
      capitalizeNext = false;
    } else {
      output += character;
    }
    if (character === "." || character === "!" || character === "?") capitalizeNext = true;
  }
  return output;
}

export function toCamelCase(input: string): string {
  return splitIdentifierWords(input)
    .map((word, index) => {
      const lower = word.toLocaleLowerCase(CASE_LOCALE);
      return index === 0 ? lower : capitalizeWord(lower);
    })
    .join("");
}

export function toPascalCase(input: string): string {
  return splitIdentifierWords(input)
    .map((word) => capitalizeWord(word.toLocaleLowerCase(CASE_LOCALE)))
    .join("");
}

export function toSnakeCase(input: string): string {
  return splitIdentifierWords(input)
    .map((word) => word.toLocaleLowerCase(CASE_LOCALE))
    .join("_");
}

export function toKebabCase(input: string): string {
  return splitIdentifierWords(input)
    .map((word) => word.toLocaleLowerCase(CASE_LOCALE))
    .join("-");
}

export function convertCase(input: string, name: CaseName): string {
  switch (name) {
    case "upper":
      return toUpperCase(input);
    case "lower":
      return toLowerCase(input);
    case "title":
      return toTitleCase(input);
    case "sentence":
      return toSentenceCase(input);
    case "camel":
      return toCamelCase(input);
    case "pascal":
      return toPascalCase(input);
    case "snake":
      return toSnakeCase(input);
    case "kebab":
      return toKebabCase(input);
  }
}

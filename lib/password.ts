const LOWER = "abcdefghijkmnopqrstuvwxyz";
const UPPER = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const DIGITS = "23456789";
const SYMBOLS = "!@#$%^&*_-+=?";

export const PASSWORD_MIN = 8;
export const PASSWORD_MAX = 128;

export type PasswordOptions = {
  length: number;
  lower: boolean;
  upper: boolean;
  digits: boolean;
  symbols: boolean;
};

export type PasswordResult =
  | { ok: true; password: string; sets: string[] }
  | { ok: false; reason: "no_set" | "too_short_for_sets" | "length" };

export function passwordSets(options: PasswordOptions): { id: string; alphabet: string }[] {
  const sets: { id: string; alphabet: string }[] = [];
  if (options.lower) sets.push({ id: "lower", alphabet: LOWER });
  if (options.upper) sets.push({ id: "upper", alphabet: UPPER });
  if (options.digits) sets.push({ id: "digits", alphabet: DIGITS });
  if (options.symbols) sets.push({ id: "symbols", alphabet: SYMBOLS });
  return sets;
}

function indexBelow(limit: number, nextByte: () => number): number {
  const span = Math.floor(256 / limit) * limit;
  let byte = nextByte();
  while (byte >= span) byte = nextByte();
  return byte % limit;
}

function pick(alphabet: string, nextByte: () => number): string {
  const index = indexBelow(alphabet.length, nextByte);
  return alphabet[index] ?? alphabet[0] ?? "a";
}

export function generatePassword(options: PasswordOptions, nextByte: () => number): PasswordResult {
  if (!Number.isInteger(options.length) || options.length < PASSWORD_MIN || options.length > PASSWORD_MAX) {
    return { ok: false, reason: "length" };
  }
  const sets = passwordSets(options);
  if (sets.length === 0) return { ok: false, reason: "no_set" };
  if (options.length < sets.length) return { ok: false, reason: "too_short_for_sets" };
  const combined = sets.map((set) => set.alphabet).join("");
  const chars = sets.map((set) => pick(set.alphabet, nextByte));
  while (chars.length < options.length) chars.push(pick(combined, nextByte));
  for (let index = chars.length - 1; index > 0; index -= 1) {
    const swap = indexBelow(index + 1, nextByte);
    const current = chars[index];
    chars[index] = chars[swap] ?? current;
    chars[swap] = current;
  }
  return { ok: true, password: chars.join(""), sets: sets.map((set) => set.id) };
}

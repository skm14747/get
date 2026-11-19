import { describe, expect, it } from "vitest";
import { generatePassword, PASSWORD_MAX, PASSWORD_MIN, passwordSets } from "@/lib/password";

function deterministicBytes(source: number[]): () => number {
  let i = 0;
  return () => source[i++] ?? 0;
}

describe("Password generator", () => {
  it("generates a password of the requested length", () => {
    const result = generatePassword(
      { length: 16, lower: true, upper: true, digits: true, symbols: true },
      deterministicBytes(Array.from({ length: 100 }, (_, i) => i)),
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.password).toHaveLength(16);
  });

  it("includes at least one character from each selected set", () => {
    for (let trial = 0; trial < 5; trial++) {
      const bytes = Array.from({ length: 200 }, (_, i) => (i * 37 + trial * 13) % 256);
      const result = generatePassword(
        { length: 16, lower: true, upper: true, digits: true, symbols: true },
        deterministicBytes(bytes),
      );
      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.password).toMatch(/[a-z]/);
      expect(result.password).toMatch(/[A-Z]/);
      expect(result.password).toMatch(/[2-9]/);
      expect(result.password).toMatch(/[!@#$%^&*_\-+=?]/);
    }
  });

  it("excludes ambiguous characters (l, I, O, 0, 1)", () => {
    const bytes = Array.from({ length: 500 }, (_, i) => i % 256);
    const result = generatePassword(
      { length: PASSWORD_MAX, lower: true, upper: true, digits: true, symbols: false },
      deterministicBytes(bytes),
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.password).not.toMatch(/[lIO01]/);
  });

  it("rejects length below minimum", () => {
    expect(generatePassword({ length: PASSWORD_MIN - 1, lower: true, upper: false, digits: false, symbols: false }, () => 0))
      .toMatchObject({ ok: false, reason: "length" });
  });

  it("rejects length above maximum", () => {
    expect(generatePassword({ length: PASSWORD_MAX + 1, lower: true, upper: false, digits: false, symbols: false }, () => 0))
      .toMatchObject({ ok: false, reason: "length" });
  });

  it("rejects fractional length", () => {
    expect(generatePassword({ length: 10.5, lower: true, upper: false, digits: false, symbols: false }, () => 0))
      .toMatchObject({ ok: false, reason: "length" });
  });

  it("rejects no character sets", () => {
    expect(generatePassword({ length: 12, lower: false, upper: false, digits: false, symbols: false }, () => 0))
      .toMatchObject({ ok: false, reason: "no_set" });
  });

  it("accepts minimum length", () => {
    const result = generatePassword(
      { length: PASSWORD_MIN, lower: true, upper: true, digits: true, symbols: false },
      deterministicBytes(Array.from({ length: 100 }, (_, i) => i)),
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.password).toHaveLength(PASSWORD_MIN);
  });

  it("accepts maximum length", () => {
    const result = generatePassword(
      { length: PASSWORD_MAX, lower: true, upper: false, digits: false, symbols: false },
      deterministicBytes(Array.from({ length: 1000 }, (_, i) => i % 256)),
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.password).toHaveLength(PASSWORD_MAX);
  });

  it("single set only (lower)", () => {
    const result = generatePassword(
      { length: 12, lower: true, upper: false, digits: false, symbols: false },
      deterministicBytes(Array.from({ length: 100 }, (_, i) => i)),
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.password).toMatch(/^[a-z]+$/);
    expect(result.sets).toEqual(["lower"]);
  });
});

describe("passwordSets", () => {
  it("returns selected sets only", () => {
    expect(passwordSets({ length: 12, lower: true, upper: false, digits: true, symbols: false }))
      .toEqual([
        { id: "lower", alphabet: expect.any(String) },
        { id: "digits", alphabet: expect.any(String) },
      ]);
  });

  it("returns empty array when nothing selected", () => {
    expect(passwordSets({ length: 12, lower: false, upper: false, digits: false, symbols: false })).toEqual([]);
  });
});

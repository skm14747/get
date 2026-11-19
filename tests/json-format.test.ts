import { describe, expect, it } from "vitest";
import { formatJson, MAX_JSON_CHARS } from "@/lib/json-format";

describe("JSON formatter — independent oracle", () => {
  it("formats with 2-space indent", () => {
    expect(formatJson('{"a":1,"b":2}', 2)).toMatchObject({
      ok: true,
      value: '{\n  "a": 1,\n  "b": 2\n}',
    });
  });

  it("minifies (null space)", () => {
    expect(formatJson('{\n  "a": 1,\n  "b": 2\n}', null)).toMatchObject({
      ok: true,
      value: '{"a":1,"b":2}',
    });
  });

  it("formats with 4-space indent", () => {
    const result = formatJson('{"x":[1,2,3]}', 4);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value).toContain("    ");
  });

  it("preserves arrays", () => {
    expect(formatJson("[1,2,3]", 2)).toMatchObject({
      ok: true,
      value: "[\n  1,\n  2,\n  3\n]",
    });
  });

  it("preserves nested objects", () => {
    const result = formatJson('{"a":{"b":1}}', 2);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value).toContain('"b": 1');
  });

  it("handles null, true, false literals", () => {
    expect(formatJson("null", 2)).toMatchObject({ ok: true, value: "null" });
    expect(formatJson("true", 2)).toMatchObject({ ok: true, value: "true" });
    expect(formatJson("false", 2)).toMatchObject({ ok: true, value: "false" });
  });

  it("handles string value", () => {
    expect(formatJson('"hello"', 2)).toMatchObject({ ok: true, value: '"hello"' });
  });

  it("handles number value", () => {
    expect(formatJson("42", 2)).toMatchObject({ ok: true, value: "42" });
  });

  it("rejects empty input", () => {
    expect(formatJson("", 2)).toMatchObject({ ok: false, reason: "empty" });
    expect(formatJson("   ", 2)).toMatchObject({ ok: false, reason: "empty" });
  });

  it("rejects invalid JSON", () => {
    expect(formatJson("{invalid", 2)).toMatchObject({ ok: false, reason: "invalid" });
    expect(formatJson("{'a': 1}", 2)).toMatchObject({ ok: false, reason: "invalid" });
    expect(formatJson("{a: 1}", 2)).toMatchObject({ ok: false, reason: "invalid" });
  });

  it("rejects oversized input", () => {
    expect(formatJson("x".repeat(MAX_JSON_CHARS + 1), 2)).toMatchObject({ ok: false, reason: "too_large" });
  });

  it("handles special characters in strings", () => {
    const input = JSON.stringify({ msg: 'He said "hello" & left' });
    const result = formatJson(input, 2);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(JSON.parse(result.value)).toEqual({ msg: 'He said "hello" & left' });
  });

  it("handles unicode in strings", () => {
    const input = JSON.stringify({ emoji: "🎉", cjk: "日本語" });
    const result = formatJson(input, 2);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const parsed = JSON.parse(result.value);
    expect(parsed.emoji).toBe("🎉");
    expect(parsed.cjk).toBe("日本語");
  });

  // Metamorphic: format then minify round-trips
  it("format then minify produces canonical form", () => {
    const original = '{"a":1,"b":[2,3],"c":{"d":true}}';
    const formatted = formatJson(original, 2);
    expect(formatted.ok).toBe(true);
    if (!formatted.ok) return;
    const minified = formatJson(formatted.value, null);
    expect(minified).toMatchObject({ ok: true, value: original });
  });
});

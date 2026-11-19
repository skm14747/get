import { describe, expect, it } from "vitest";
import { decodeUtf8, encodeUtf8 } from "@/lib/base64";

describe("Base64 encoder/decoder — independent oracle", () => {
  it("encodes 'hello' to 'aGVsbG8='", () => {
    expect(encodeUtf8("hello")).toMatchObject({ ok: true, value: "aGVsbG8=" });
  });

  it("decodes 'aGVsbG8=' to 'hello'", () => {
    expect(decodeUtf8("aGVsbG8=")).toMatchObject({ ok: true, value: "hello" });
  });

  it("round-trips ASCII", () => {
    const text = "The quick brown fox jumps over the lazy dog";
    const encoded = encodeUtf8(text);
    expect(encoded.ok).toBe(true);
    if (!encoded.ok) return;
    expect(decodeUtf8(encoded.value)).toMatchObject({ ok: true, value: text });
  });

  it("round-trips UTF-8 multi-byte: café", () => {
    const encoded = encodeUtf8("café");
    expect(encoded.ok).toBe(true);
    if (!encoded.ok) return;
    expect(decodeUtf8(encoded.value)).toMatchObject({ ok: true, value: "café" });
  });

  it("round-trips CJK: こんにちは", () => {
    const encoded = encodeUtf8("こんにちは");
    expect(encoded.ok).toBe(true);
    if (!encoded.ok) return;
    expect(decodeUtf8(encoded.value)).toMatchObject({ ok: true, value: "こんにちは" });
  });

  it("round-trips emoji: 🙂🎉", () => {
    const encoded = encodeUtf8("🙂🎉");
    expect(encoded.ok).toBe(true);
    if (!encoded.ok) return;
    expect(decodeUtf8(encoded.value)).toMatchObject({ ok: true, value: "🙂🎉" });
  });

  it("round-trips Arabic: مرحبا", () => {
    const encoded = encodeUtf8("مرحبا");
    expect(encoded.ok).toBe(true);
    if (!encoded.ok) return;
    expect(decodeUtf8(encoded.value)).toMatchObject({ ok: true, value: "مرحبا" });
  });

  it("round-trips Hindi: नमस्ते", () => {
    const encoded = encodeUtf8("नमस्ते");
    expect(encoded.ok).toBe(true);
    if (!encoded.ok) return;
    expect(decodeUtf8(encoded.value)).toMatchObject({ ok: true, value: "नमस्ते" });
  });

  it("encode empty string returns error", () => {
    expect(encodeUtf8("")).toMatchObject({ ok: false, reason: "empty" });
  });

  it("decode empty string returns error", () => {
    expect(decodeUtf8("")).toMatchObject({ ok: false, reason: "empty" });
    expect(decodeUtf8("   ")).toMatchObject({ ok: false, reason: "empty" });
  });

  it("decode invalid base64 characters", () => {
    expect(decodeUtf8("@@@@")).toMatchObject({ ok: false, reason: "invalid" });
  });

  it("decode incorrect padding", () => {
    expect(decodeUtf8("YQ")).toMatchObject({ ok: false, reason: "invalid" });
  });

  it("encodes a single character 'A'", () => {
    expect(encodeUtf8("A")).toMatchObject({ ok: true, value: "QQ==" });
  });

  it("encodes newlines and whitespace", () => {
    const encoded = encodeUtf8("line1\nline2\ttab");
    expect(encoded.ok).toBe(true);
    if (!encoded.ok) return;
    expect(decodeUtf8(encoded.value)).toMatchObject({ ok: true, value: "line1\nline2\ttab" });
  });

  it("decode trims surrounding whitespace", () => {
    expect(decodeUtf8("  aGVsbG8=  ")).toMatchObject({ ok: true, value: "hello" });
  });
});

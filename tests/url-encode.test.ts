import { describe, expect, it } from "vitest";
import {
  decodeFullUrl,
  decodeUrlComponent,
  encodeFullUrl,
  encodeUrlComponent,
  formatQueryParams,
  parseQueryParams,
} from "@/lib/url-encode";

describe("URL Encoder & Decoder", () => {
  it("encodes URL components properly", () => {
    expect(encodeUrlComponent("Hello World")).toBe("Hello%20World");
    expect(encodeUrlComponent("Hello World", true)).toBe("Hello+World");
    expect(encodeUrlComponent("user=john&admin=true")).toBe("user%3Djohn%26admin%3Dtrue");
    expect(encodeUrlComponent("foo/bar?baz#hash")).toBe("foo%2Fbar%3Fbaz%23hash");
  });

  it("decodes URL components properly", () => {
    const res1 = decodeUrlComponent("Hello%20World");
    expect(res1).toEqual({ ok: true, result: "Hello World" });

    const res2 = decodeUrlComponent("Hello+World");
    expect(res2).toEqual({ ok: true, result: "Hello World" });

    const res3 = decodeUrlComponent("user%3Djohn%26admin%3Dtrue");
    expect(res3).toEqual({ ok: true, result: "user=john&admin=true" });
  });

  it("handles multi-byte UTF-8 and emojis in component encoding", () => {
    const text = "Café résumé 🚀 日本語";
    const encoded = encodeUrlComponent(text);
    const decoded = decodeUrlComponent(encoded);
    expect(decoded).toEqual({ ok: true, result: text });
  });

  it("encodes full URLs without breaking URL syntax", () => {
    const url = "https://example.com/search?query=hello world&category=books#top";
    const encoded = encodeFullUrl(url);
    expect(encoded).toBe("https://example.com/search?query=hello%20world&category=books#top");

    const decoded = decodeFullUrl(encoded);
    expect(decoded).toEqual({ ok: true, result: url });
  });

  it("handles malformed URI sequences safely", () => {
    const res = decodeUrlComponent("%E0%A4");
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.reason).toContain("Malformed URI sequence");
    }
  });

  it("parses query parameters from full URLs and query strings", () => {
    const url = "https://example.com/api?user=alex&role=admin&tag=dev%20tools&flag";
    const params = parseQueryParams(url);
    expect(params).toEqual([
      { key: "user", value: "alex" },
      { key: "role", value: "admin" },
      { key: "tag", value: "dev tools" },
      { key: "flag", value: "" },
    ]);
  });

  it("formats query param pairs back to encoded query strings", () => {
    const pairs = [
      { key: "name", value: "Jane Doe" },
      { key: "category", value: "books & magazines" },
    ];
    const formatted = formatQueryParams(pairs);
    expect(formatted).toBe("name=Jane%20Doe&category=books%20%26%20magazines");
  });
});

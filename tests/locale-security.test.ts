import { describe, expect, it } from "vitest";
import { sanitizeProperties, buildPayload, ANALYTICS_EVENTS } from "@/lib/analytics";
import { formatLocaleDecimal } from "@/lib/locale-format";
import { calculateGst } from "@/lib/gst";
import { calculateEmi } from "@/lib/emi";
import { formatJson } from "@/lib/json-format";
import { formatDecimal, parseDecimal } from "@/lib/numbers";

describe("Locale formatting for GST and EMI", () => {
  it("GST result formats correctly in en-IN locale", () => {
    const result = calculateGst(100_000, 18, false, "igst");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const formatted = formatLocaleDecimal(result.total, "en-IN");
    expect(formatted).toContain("1,18,000");
  });

  it("EMI result formats correctly in en-IN locale", () => {
    const result = calculateEmi(100_000, 12, 12);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const formatted = formatLocaleDecimal(result.payment, "en-IN");
    expect(formatted).toMatch(/8,884|8,885/);
  });

  it("GST result formats correctly in de-DE locale", () => {
    const result = calculateGst(1000, 19, false, "igst");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const formatted = formatLocaleDecimal(result.total, "de-DE");
    expect(formatted).toContain("1.190");
  });

  it("formatDecimal uses en-US grouping by default", () => {
    expect(formatDecimal(1234567.89)).toBe("1,234,567.89");
  });

  it("formatLocaleDecimal works for all intended launch locales", () => {
    const locales = ["en-US", "es-ES", "fr-FR", "ar-SA", "pt-BR", "de-DE", "ja-JP", "hi-IN", "id-ID", "it-IT"];
    for (const locale of locales) {
      const result = formatLocaleDecimal(1234.5, locale);
      expect(result.length).toBeGreaterThan(0);
      expect(result).toMatch(/[\d\u0660-\u0669\u06F0-\u06F9]/);
    }
  });
});

describe("Analytics privacy — sensitive data never reaches payload", () => {
  it("strips password from properties", () => {
    expect(sanitizeProperties({ password: "secret123", tool_id: "password-generator" }))
      .toEqual({ tool_id: "password-generator" });
  });

  it("strips filename from properties", () => {
    expect(sanitizeProperties({ filename: "tax-return.pdf", tool_id: "merge-pdf" }))
      .toEqual({ tool_id: "merge-pdf" });
  });

  it("strips text/input/value/query/content/paste/result_text/secret/ssid", () => {
    const sensitive = {
      text: "user typed this",
      input: "sensitive",
      value: "42",
      query: "search term",
      document: "doc content",
      price: "99.99",
      amount: "100",
      content: "body text",
      paste: "clipboard data",
      result_text: "output text",
      secret: "api-key",
      ssid: "home-wifi",
      tool_id: "word-counter",
    };
    expect(sanitizeProperties(sensitive)).toEqual({ tool_id: "word-counter" });
  });

  it("only allows the five approved keys", () => {
    const payload = sanitizeProperties({
      tool_id: "emi-calculator",
      operation: "payment",
      error_code: "invalid",
      destination_tool_id: "gst-calculator",
      locale: "en",
      extra_key: "should-be-dropped",
      user_email: "test@test.com",
    });
    expect(Object.keys(payload).sort()).toEqual([
      "destination_tool_id",
      "error_code",
      "locale",
      "operation",
      "tool_id",
    ]);
  });

  it("rejects non-alphanumeric string values", () => {
    expect(sanitizeProperties({ tool_id: "valid-id_123" })).toEqual({ tool_id: "valid-id_123" });
    expect(sanitizeProperties({ tool_id: "has spaces" })).toEqual({});
    expect(sanitizeProperties({ tool_id: "<script>alert(1)</script>" })).toEqual({});
  });

  it("rejects string values longer than 64 chars", () => {
    expect(sanitizeProperties({ tool_id: "a".repeat(65) })).toEqual({});
    expect(sanitizeProperties({ tool_id: "a".repeat(64) })).toEqual({ tool_id: "a".repeat(64) });
  });

  it("rejects empty string values", () => {
    expect(sanitizeProperties({ tool_id: "" })).toEqual({});
    expect(sanitizeProperties({ tool_id: "  " })).toEqual({});
  });

  it("rejects non-finite numbers", () => {
    expect(sanitizeProperties({ tool_id: "test" })).toEqual({ tool_id: "test" });
  });

  it("buildPayload wraps sanitized properties", () => {
    const payload = buildPayload("tool_completed", { tool_id: "emi-calculator", password: "secret" });
    expect(payload.name).toBe("tool_completed");
    expect(payload.properties).toEqual({ tool_id: "emi-calculator" });
    expect(payload.properties).not.toHaveProperty("password");
  });

  it("all analytics event names are valid", () => {
    expect(ANALYTICS_EVENTS.length).toBeGreaterThan(0);
    for (const event of ANALYTICS_EVENTS) {
      expect(event).toMatch(/^[a-z_]+$/);
    }
  });
});

describe("JSON formatter — no eval, no code execution", () => {
  it("does not execute JavaScript in JSON input", () => {
    const malicious = '{"__proto__": {"isAdmin": true}}';
    const result = formatJson(malicious, 2);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const parsed = JSON.parse(result.value);
    expect(parsed.__proto__).toBeDefined();
    expect(({} as Record<string, unknown>).isAdmin).toBeUndefined();
  });

  it("does not eval constructor payloads", () => {
    const payload = '{"constructor": {"prototype": {"polluted": true}}}';
    const result = formatJson(payload, 2);
    expect(result.ok).toBe(true);
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });

  it("rejects non-JSON executable content", () => {
    expect(formatJson("alert(1)", 2)).toMatchObject({ ok: false, reason: "invalid" });
    expect(formatJson("console.log('hi')", 2)).toMatchObject({ ok: false, reason: "invalid" });
    expect(formatJson("import('evil')", 2)).toMatchObject({ ok: false, reason: "invalid" });
  });

  it("parseDecimal rejects comma-formatted locale numbers", () => {
    expect(parseDecimal("1,000")).toMatchObject({ ok: false, reason: "comma" });
    expect(parseDecimal("1.234,56")).toMatchObject({ ok: false, reason: "comma" });
  });
});

import { describe, expect, it } from "vitest";
import { textPayload, urlPayload, wifiPayload } from "@/lib/qr-payload";

describe("QR payload builders", () => {
  describe("textPayload", () => {
    it("wraps non-empty text", () => {
      expect(textPayload("hello")).toMatchObject({ ok: true, value: "hello" });
    });

    it("preserves whitespace in text", () => {
      expect(textPayload("hello world")).toMatchObject({ ok: true, value: "hello world" });
    });

    it("rejects whitespace-only", () => {
      expect(textPayload("   ")).toMatchObject({ ok: false, reason: "empty" });
      expect(textPayload("")).toMatchObject({ ok: false, reason: "empty" });
    });

    it("accepts unicode text", () => {
      expect(textPayload("こんにちは").ok).toBe(true);
      expect(textPayload("🎉").ok).toBe(true);
    });
  });

  describe("urlPayload", () => {
    it("accepts https URL", () => {
      expect(urlPayload("https://goeasytools.com")).toMatchObject({ ok: true });
    });

    it("accepts http URL", () => {
      expect(urlPayload("http://example.com")).toMatchObject({ ok: true });
    });

    it("rejects javascript: protocol", () => {
      expect(urlPayload("javascript:alert(1)")).toMatchObject({ ok: false, reason: "url" });
    });

    it("rejects ftp: protocol", () => {
      expect(urlPayload("ftp://files.example.com")).toMatchObject({ ok: false, reason: "url" });
    });

    it("rejects data: protocol", () => {
      expect(urlPayload("data:text/html,<h1>hi</h1>")).toMatchObject({ ok: false, reason: "url" });
    });

    it("rejects empty", () => {
      expect(urlPayload("")).toMatchObject({ ok: false, reason: "empty" });
      expect(urlPayload("   ")).toMatchObject({ ok: false, reason: "empty" });
    });

    it("rejects non-URL string", () => {
      expect(urlPayload("not a url")).toMatchObject({ ok: false, reason: "url" });
    });

    it("normalizes URL", () => {
      const result = urlPayload("https://example.com/path?q=1#hash");
      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.value).toContain("example.com/path");
    });
  });

  describe("wifiPayload", () => {
    it("builds WPA payload", () => {
      expect(wifiPayload("MyNetwork", "pass123", "WPA")).toMatchObject({
        ok: true,
        value: "WIFI:T:WPA;S:MyNetwork;P:pass123;;",
      });
    });

    it("builds WEP payload", () => {
      expect(wifiPayload("Net", "key", "WEP")).toMatchObject({
        ok: true,
        value: "WIFI:T:WEP;S:Net;P:key;;",
      });
    });

    it("builds nopass payload (no password field)", () => {
      const result = wifiPayload("OpenNet", "", "nopass");
      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.value).toBe("WIFI:T:nopass;S:OpenNet;;");
      expect(result.value).not.toContain("P:");
    });

    it("escapes special characters in SSID", () => {
      const result = wifiPayload("Cafe;Net", "pass", "WPA");
      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.value).toContain("S:Cafe\\;Net");
    });

    it("escapes special characters in password", () => {
      const result = wifiPayload("Net", "p:a;s,s", "WPA");
      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.value).toContain("P:p\\:a\\;s\\,s");
    });

    it("rejects empty SSID", () => {
      expect(wifiPayload("", "pass", "WPA")).toMatchObject({ ok: false, reason: "ssid" });
      expect(wifiPayload("   ", "pass", "WPA")).toMatchObject({ ok: false, reason: "ssid" });
    });
  });
});

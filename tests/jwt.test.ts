import { describe, expect, it } from "vitest";
import { decodeJwt, formatTimestamp, formatTimeRelative } from "@/lib/jwt";

describe("JWT Decoder", () => {
  // Header: {"alg":"HS256","typ":"JWT"} -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  // Payload: {"sub":"1234567890","name":"John Doe","iat":1516239022} -> eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
  // Signature: SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
  const sampleToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  it("decodes a valid JWT successfully", () => {
    const res = decodeJwt(sampleToken);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.algorithm).toBe("HS256");
    expect(res.header.alg).toBe("HS256");
    expect(res.header.typ).toBe("JWT");
    expect(res.payload.sub).toBe("1234567890");
    expect(res.payload.name).toBe("John Doe");
    expect(res.payload.iat).toBe(1516239022);
    expect(res.signature).toBe("SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
    expect(res.isExpired).toBeNull();
  });

  it("evaluates expired token correctly", () => {
    // exp: 1700000000 (Nov 2023)
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMSIsImV4cCI6MTcwMDAwMDAwMH0.signature";
    const res = decodeJwt(token, 1750000000);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.isExpired).toBe(true);
    const expClaim = res.claims.find((c) => c.key === "exp");
    expect(expClaim?.status).toBe("expired");
  });

  it("evaluates active (non-expired) token correctly", () => {
    // exp: 1800000000 (Future)
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMSIsImV4cCI6MTgwMDAwMDAwMH0.signature";
    const res = decodeJwt(token, 1700000000);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.isExpired).toBe(false);
    const expClaim = res.claims.find((c) => c.key === "exp");
    expect(expClaim?.status).toBe("valid");
  });

  it("decodes UTF-8 multi-byte characters in payload", () => {
    // Payload: {"name":"René François","city":"São Paulo 🇧🇷"}
    // Base64URL encoded: eyJuYW1lIjoiUmVuw6kgRnJhbsOnb2lzIiwiY2l0eSI6IlPDo28gUGF1bG8g8J+HtfCfh7cifQ
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiUmVuw6kgRnJhbsOnb2lzIiwiY2l0eSI6IlPDo28gUGF1bG8g8J+HtfCfh7cifQ.sig";
    const res = decodeJwt(token);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.payload.name).toBe("René François");
    expect(res.payload.city).toBe("São Paulo 🇵🇷");
  });

  it("rejects empty token", () => {
    const res = decodeJwt("   ");
    expect(res.ok).toBe(false);
    if (res.ok) return;
    expect(res.reason).toContain("Please enter a JWT token");
  });

  it("rejects token with missing parts", () => {
    const res = decodeJwt("part1.part2");
    expect(res.ok).toBe(false);
    if (res.ok) return;
    expect(res.reason).toContain("A valid JWT must have 3 segments");
  });

  it("rejects invalid base64 segment", () => {
    const res = decodeJwt("???!!!.payload.signature");
    expect(res.ok).toBe(false);
    if (res.ok) return;
    expect(res.reason).toContain("Invalid Base64URL encoding");
  });

  it("formats relative timestamps properly", () => {
    expect(formatTimeRelative(1000, 1000)).toBe("just now");
    expect(formatTimeRelative(1000, 1060)).toBe("1 minute ago");
    expect(formatTimeRelative(1000, 1120)).toBe("2 minutes ago");
    expect(formatTimeRelative(1000, 4600)).toBe("1 hour ago");
    expect(formatTimeRelative(1000, 87400)).toBe("1 day ago");
    expect(formatTimeRelative(2000, 1000)).toBe("in 16 minutes");
  });

  it("formats UTC timestamp strings properly", () => {
    const formatted = formatTimestamp(1516239022);
    expect(formatted).toBe("2018-01-18 01:30:22 UTC");
  });
});

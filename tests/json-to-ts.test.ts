import { describe, expect, it } from "vitest";
import { jsonToTypeScript } from "@/lib/json-to-ts";

describe("JSON to TypeScript Converter", () => {
  it("converts simple flat JSON object to interface", () => {
    const json = JSON.stringify({ id: 1, name: "Alice", active: true });
    const res = jsonToTypeScript(json, { rootName: "User" });
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.code).toContain("export interface User {");
    expect(res.code).toContain("id: number;");
    expect(res.code).toContain("name: string;");
    expect(res.code).toContain("active: boolean;");
  });

  it("converts nested objects with sub-interfaces", () => {
    const json = JSON.stringify({
      user: {
        firstName: "Bob",
        address: { city: "London", zip: "SW1A" },
      },
    });
    const res = jsonToTypeScript(json, { rootName: "Profile" });
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.code).toContain("export interface Profile {");
    expect(res.code).toContain("user: User;");
    expect(res.code).toContain("export interface User {");
    expect(res.code).toContain("address: Address;");
    expect(res.code).toContain("export interface Address {");
    expect(res.code).toContain("city: string;");
  });

  it("handles primitive and object arrays", () => {
    const json = JSON.stringify({
      tags: ["news", "tech"],
      scores: [98, 100],
      items: [{ id: 1, title: "Post 1" }],
    });
    const res = jsonToTypeScript(json);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.code).toContain("tags: string[];");
    expect(res.code).toContain("scores: number[];");
    expect(res.code).toContain("items: ItemsItem[];");
    expect(res.code).toContain("export interface ItemsItem {");
  });

  it("handles union types in heterogeneous arrays", () => {
    const json = JSON.stringify({
      mixed: ["hello", 42, true],
    });
    const res = jsonToTypeScript(json);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.code).toContain("mixed: (string | number | boolean)[];");
  });

  it("escapes non-identifier keys in quotes", () => {
    const json = JSON.stringify({
      "user-agent": "Mozilla",
      "first name": "John",
    });
    const res = jsonToTypeScript(json);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.code).toContain('"user-agent": string;');
    expect(res.code).toContain('"first name": string;');
  });

  it("supports type aliases instead of interfaces", () => {
    const json = JSON.stringify({ count: 10 });
    const res = jsonToTypeScript(json, { rootName: "Stats", useInterface: false });
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.code).toContain("export type Stats = {");
  });

  it("rejects invalid JSON with syntax error message", () => {
    const res = jsonToTypeScript("{ invalid json }");
    expect(res.ok).toBe(false);
    if (res.ok) return;

    expect(res.reason).toContain("JSON Syntax Error");
  });

  it("handles empty input", () => {
    const res = jsonToTypeScript("   ");
    expect(res.ok).toBe(false);
  });
});

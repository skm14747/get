import { describe, expect, it } from "vitest";
import { jsonToPython } from "@/lib/json-to-python";

describe("JSON to Python Model Converter", () => {
  it("converts simple JSON to Pydantic models by default", () => {
    const json = JSON.stringify({ id: 1, name: "Alice", active: true });
    const res = jsonToPython(json, { rootName: "User" });
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.code).toContain("from pydantic import BaseModel");
    expect(res.code).toContain("class User(BaseModel):");
    expect(res.code).toContain("id_: int"); // 'id' is a keyword/built-in, so id_
    expect(res.code).toContain("name: str");
    expect(res.code).toContain("active: bool");
  });

  it("handles camelCase keys with snake_case and Pydantic Field alias", () => {
    const json = JSON.stringify({ firstName: "John", userEmail: "john@example.com" });
    const res = jsonToPython(json, { rootName: "UserProfile" });
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.code).toContain('first_name: str = Field(alias="firstName")');
    expect(res.code).toContain('user_email: str = Field(alias="userEmail")');
  });

  it("generates Python dataclasses when selected", () => {
    const json = JSON.stringify({ count: 42, score: 99.5 });
    const res = jsonToPython(json, { rootName: "Metrics", target: "dataclass" });
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.code).toContain("from dataclasses import dataclass");
    expect(res.code).toContain("@dataclass\nclass Metrics:");
    expect(res.code).toContain("count: int");
    expect(res.code).toContain("score: float");
  });

  it("generates TypedDict models when selected", () => {
    const json = JSON.stringify({ title: "Draft", completed: false });
    const res = jsonToPython(json, { rootName: "TodoDict", target: "typeddict" });
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.code).toContain("class TodoDict(TypedDict):");
    expect(res.code).toContain('"title": str');
    expect(res.code).toContain('"completed": bool');
  });

  it("handles nested objects with separate classes", () => {
    const json = JSON.stringify({
      orderId: "ORD123",
      customer: {
        name: "Jane",
      },
    });
    const res = jsonToPython(json, { rootName: "Order" });
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.code).toContain("class Customer(BaseModel):");
    expect(res.code).toContain("name: str");
    expect(res.code).toContain("customer: Customer");
  });

  it("handles arrays and lists", () => {
    const json = JSON.stringify({
      tags: ["news", "tech"],
      values: [1, 2, 3],
    });
    const res = jsonToPython(json);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.code).toContain("from typing import List");
    expect(res.code).toContain("tags: List[str]");
    expect(res.code).toContain("values: List[int]");
  });

  it("handles null values with Optional[Any]", () => {
    const json = JSON.stringify({ extra: null });
    const res = jsonToPython(json);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.code).toContain("from typing import Optional, Any");
    expect(res.code).toContain("extra: Optional[Any]");
  });

  it("rejects invalid JSON with syntax error message", () => {
    const res = jsonToPython("{ unquotedKey: 1 }");
    expect(res.ok).toBe(false);
    if (res.ok) return;

    expect(res.reason).toContain("JSON Syntax Error");
  });
});

import { describe, expect, it } from "vitest";
import { analyticsEndpoint, buildPayload, sanitizeProperties } from "@/lib/analytics";

describe("analytics payloads", () => {
  it("keeps only short operation identifiers", () => {
    expect(
      sanitizeProperties({
        tool_id: "word-counter",
        operation: "count",
        text: "secret draft",
        price: 42,
        query: "word counter",
        input: "hello",
      }),
    ).toEqual({
      tool_id: "word-counter",
      operation: "count",
    });
  });

  it("drops long strings and unexpected keys", () => {
    expect(
      sanitizeProperties({
        tool_id: "x".repeat(80),
        note: "hello",
        error_code: "divide_by_zero",
      }),
    ).toEqual({ error_code: "divide_by_zero" });
  });

  it("builds a payload without user content", () => {
    const payload = buildPayload("tool_completed", {
      tool_id: "discount-calculator",
      operation: "percent",
      result_text: "40.00",
    });
    expect(JSON.stringify(payload)).not.toContain("40.00");
    expect(payload.properties).toEqual({
      tool_id: "discount-calculator",
      operation: "percent",
    });
  });

  it("rejects an endpoint that is not https or localhost", () => {
    const previous = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;
    process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT = "http://example.com/collect";
    expect(analyticsEndpoint()).toBeNull();
    process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT = "https://example.com/collect?q=1";
    expect(analyticsEndpoint()).toBeNull();
    process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT = previous;
  });
});

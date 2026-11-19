import { describe, expect, it } from "vitest";
import { convertCase } from "@/lib/case-convert";

describe("convertCase", () => {
  it("converts hello world into the eight documented forms", () => {
    expect(convertCase("hello world", "upper")).toBe("HELLO WORLD");
    expect(convertCase("hello world", "lower")).toBe("hello world");
    expect(convertCase("hello world", "title")).toBe("Hello World");
    expect(convertCase("hello world", "sentence")).toBe("Hello world");
    expect(convertCase("hello world", "camel")).toBe("helloWorld");
    expect(convertCase("hello world", "pascal")).toBe("HelloWorld");
    expect(convertCase("hello world", "snake")).toBe("hello_world");
    expect(convertCase("hello world", "kebab")).toBe("hello-world");
  });

  it("keeps an apostrophe inside a title-case word", () => {
    expect(convertCase("don't stop", "title")).toBe("Don't Stop");
  });

  it("does not preserve acronyms", () => {
    expect(convertCase("HTML parser", "camel")).toBe("htmlParser");
    expect(convertCase("iPhone", "title")).toBe("Iphone");
  });

  it("capitalizes after each period in sentence case", () => {
    expect(convertCase("e.g. hello", "sentence")).toBe("E.G. Hello");
  });

  it("leaves Arabic, Hindi, and Japanese text unchanged when it has no case", () => {
    for (const sample of ["مرحبا", "नमस्ते", "こんにちは"]) {
      expect(convertCase(sample, "upper")).toBe(sample);
      expect(convertCase(sample, "lower")).toBe(sample);
    }
  });

  it("splits camel case before making snake case", () => {
    expect(convertCase("helloWorld", "snake")).toBe("hello_world");
  });
});

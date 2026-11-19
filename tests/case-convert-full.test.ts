import { describe, expect, it } from "vitest";
import {
  convertCase,
  splitIdentifierWords,
  toCamelCase,
  toKebabCase,
  toLowerCase,
  toPascalCase,
  toSentenceCase,
  toSnakeCase,
  toTitleCase,
  toUpperCase,
} from "@/lib/case-convert";

describe("Case converter — independent oracle", () => {
  const sample = "hello world";

  it("UPPERCASE", () => expect(toUpperCase(sample)).toBe("HELLO WORLD"));
  it("lowercase", () => expect(toLowerCase("HELLO WORLD")).toBe("hello world"));
  it("Title Case", () => expect(toTitleCase(sample)).toBe("Hello World"));
  it("Sentence case", () => expect(toSentenceCase(sample)).toBe("Hello world"));
  it("camelCase", () => expect(toCamelCase(sample)).toBe("helloWorld"));
  it("PascalCase", () => expect(toPascalCase(sample)).toBe("HelloWorld"));
  it("snake_case", () => expect(toSnakeCase(sample)).toBe("hello_world"));
  it("kebab-case", () => expect(toKebabCase(sample)).toBe("hello-world"));

  it("handles already-cased identifiers", () => {
    expect(toCamelCase("myVariableName")).toBe("myVariableName");
    expect(toSnakeCase("myVariableName")).toBe("my_variable_name");
    expect(toKebabCase("MyPascalCase")).toBe("my-pascal-case");
    expect(toPascalCase("some-kebab-case")).toBe("SomeKebabCase");
    expect(toCamelCase("snake_case_var")).toBe("snakeCaseVar");
  });

  it("handles empty string", () => {
    expect(toUpperCase("")).toBe("");
    expect(toLowerCase("")).toBe("");
    expect(toCamelCase("")).toBe("");
  });

  it("handles single word", () => {
    expect(toTitleCase("hello")).toBe("Hello");
    expect(toSentenceCase("hello")).toBe("Hello");
  });

  it("sentence case capitalizes after sentence-ending punctuation", () => {
    expect(toSentenceCase("hello world. goodbye world")).toBe("Hello world. Goodbye world");
    expect(toSentenceCase("A! B? C.")).toBe("A! B? C.");
  });

  it("title case handles apostrophes", () => {
    expect(toTitleCase("it's a test")).toBe("It's A Test");
  });

  it("handles numbers in identifiers", () => {
    expect(toSnakeCase("version2Release")).toBe("version2_release");
    expect(toCamelCase("version_2_release")).toBe("version2Release");
  });

  it("handles multiple spaces and punctuation", () => {
    expect(toTitleCase("  hello   world  ")).toBe("  Hello   World  ");
  });

  it("convertCase dispatches correctly", () => {
    expect(convertCase("hello world", "upper")).toBe("HELLO WORLD");
    expect(convertCase("hello world", "lower")).toBe("hello world");
    expect(convertCase("hello world", "title")).toBe("Hello World");
    expect(convertCase("hello world", "sentence")).toBe("Hello world");
    expect(convertCase("hello world", "camel")).toBe("helloWorld");
    expect(convertCase("hello world", "pascal")).toBe("HelloWorld");
    expect(convertCase("hello world", "snake")).toBe("hello_world");
    expect(convertCase("hello world", "kebab")).toBe("hello-world");
  });

  // Unicode
  it("handles accented characters", () => {
    expect(toUpperCase("café")).toBe("CAFÉ");
    expect(toLowerCase("CAFÉ")).toBe("café");
  });
});

describe("splitIdentifierWords", () => {
  it("splits camelCase", () => expect(splitIdentifierWords("camelCase")).toEqual(["camel", "Case"]));
  it("splits PascalCase", () => expect(splitIdentifierWords("PascalCase")).toEqual(["Pascal", "Case"]));
  it("splits snake_case", () => expect(splitIdentifierWords("snake_case")).toEqual(["snake", "case"]));
  it("splits kebab-case", () => expect(splitIdentifierWords("kebab-case")).toEqual(["kebab", "case"]));
  it("splits spaces", () => expect(splitIdentifierWords("hello world")).toEqual(["hello", "world"]));
  it("handles empty string", () => expect(splitIdentifierWords("")).toEqual([]));
});

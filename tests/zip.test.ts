import { describe, it, expect } from "vitest";
import { createZip } from "@/lib/zip";

describe("createZip", () => {
  it("creates a valid ZIP with correct magic bytes", () => {
    const zip = createZip([
      { name: "hello.txt", bytes: new TextEncoder().encode("Hello, world!") },
    ]);
    expect(zip[0]).toBe(0x50); // P
    expect(zip[1]).toBe(0x4b); // K
    expect(zip[2]).toBe(0x03);
    expect(zip[3]).toBe(0x04);
  });

  it("includes multiple files", () => {
    const zip = createZip([
      { name: "a.txt", bytes: new TextEncoder().encode("AAA") },
      { name: "b.txt", bytes: new TextEncoder().encode("BBB") },
    ]);
    // ZIP should contain both filenames
    const text = new TextDecoder("ascii", { fatal: false }).decode(zip);
    expect(text).toContain("a.txt");
    expect(text).toContain("b.txt");
  });

  it("handles empty files", () => {
    const zip = createZip([
      { name: "empty.txt", bytes: new Uint8Array(0) },
    ]);
    expect(zip.length).toBeGreaterThan(0);
    expect(zip[0]).toBe(0x50);
  });

  it("produces consistent output for same input", () => {
    const files = [{ name: "test.txt", bytes: new TextEncoder().encode("data") }];
    const a = createZip(files);
    const b = createZip(files);
    expect(a).toEqual(b);
  });
});

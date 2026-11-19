import { describe, expect, it } from "vitest";
import { generateSlug } from "@/lib/slug";

describe("generateSlug", () => {
  it("converts simple English text to lowercase hyphenated slug", () => {
    const result = generateSlug("Hello World 2026");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.slug).toBe("hello-world-2026");
  });

  it("transliterates French and Spanish diacritics and accents cleanly", () => {
    const french = generateSlug("Café au Lait & Crème Brûlée");
    expect(french.ok).toBe(true);
    if (!french.ok) return;
    expect(french.slug).toBe("cafe-au-lait-creme-brulee");

    const spanish = generateSlug("El Niño & Año Nuevo!");
    expect(spanish.ok).toBe(true);
    if (!spanish.ok) return;
    expect(spanish.slug).toBe("el-nino-ano-nuevo");
  });

  it("collapses consecutive punctuation and whitespace", () => {
    const result = generateSlug("Top 10   React/Next.js   Tips --- 2026!!!");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.slug).toBe("top-10-react-next-js-tips-2026");
  });

  it("supports underscore delimiter", () => {
    const result = generateSlug("Database Column Name", { delimiter: "_" });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.slug).toBe("database_column_name");
  });

  it("preserves non-Latin script characters without producing empty slugs", () => {
    const arabic = generateSlug("مرحبا بالعالم 2026");
    expect(arabic.ok).toBe(true);
    if (!arabic.ok) return;
    expect(arabic.slug).toBe("مرحبا-بالعالم-2026");
  });

  it("rejects empty and whitespace-only text", () => {
    expect(generateSlug("").ok).toBe(false);
    expect(generateSlug("   ").ok).toBe(false);
    expect(generateSlug("!@#$%^&*()").ok).toBe(false);
  });
});

import { describe, expect, it } from "vitest";
import { hreflangIsReciprocal, hreflangLinks, publishedIndexablePaths, resolvePrefixedRequest } from "@/lib/hreflang";
import { formatLocaleDecimal } from "@/lib/locale-format";
import { localeLinksForPage, pageIdFromPathname } from "@/lib/locale-links";
import {
  INTENDED_LAUNCH_LOCALES,
  canPublish,
  documentLanguage,
  getLocale,
  launchLocales,
  missingTranslationKeys,
  publicationBlockers,
  publishedLocales,
} from "@/lib/locales";
import { countText } from "@/lib/word-count";
import { messages } from "@/locales/en";

describe("launch locales", () => {
  it("lists the ten requested languages and publishes all of them", () => {
    expect(launchLocales.map((locale) => locale.code)).toEqual([...INTENDED_LAUNCH_LOCALES]);
    expect(publishedLocales().map((locale) => locale.code)).toEqual([...INTENDED_LAUNCH_LOCALES]);
    expect(canPublish("en")).toBe(true);
  });

  it("rejects a catalog that is missing a required string", () => {
    expect(missingTranslationKeys(messages)).toEqual([]);
    expect(missingTranslationKeys({ home: "Inicio" })).toContain("skipToContent");
    expect(missingTranslationKeys({ ...messages, contact: "  " })).toContain("contact");
  });

  it("includes published locale paths in the sitemap and the resolver", () => {
    const paths = publishedIndexablePaths();
    expect(paths).toContain("/word-counter");
    expect(paths.some((path) => path.startsWith("/es/"))).toBe(true);
    expect(paths.some((path) => path.startsWith("/ar/"))).toBe(true);
    expect(resolvePrefixedRequest("es", null)).not.toBeNull();
    expect(resolvePrefixedRequest("es", "calculadora-de-porcentajes")).not.toBeNull();
    expect(resolvePrefixedRequest("en", null)).toBeNull();
  });

  it("emits reciprocal hreflang for all published locales", () => {
    const links = hreflangLinks("word-counter");
    const langs = links.map((link) => link.hrefLang).sort();
    expect(langs).toContain("en");
    expect(langs).toContain("es");
    expect(langs).toContain("x-default");
    expect(links.find((link) => link.hrefLang === "es")?.href).toBe(
      "https://www.goeasytools.com/es/contador-de-palabras",
    );
    expect(links.find((link) => link.hrefLang === "x-default")?.href).toBe(
      "https://www.goeasytools.com/word-counter",
    );
    expect(hreflangIsReciprocal("word-counter")).toBe(true);
  });

  it("sets Arabic as RTL and English as LTR", () => {
    expect(documentLanguage("ar")).toEqual({ lang: "ar", dir: "rtl" });
    expect(documentLanguage("en")).toEqual({ lang: "en", dir: "ltr" });
    expect(documentLanguage("ja")?.dir).toBe("ltr");
  });

  it("formats decimals for launch locales without changing the English parser", () => {
    expect(formatLocaleDecimal(1234.5, "en-US")).toBe("1,234.5");
    expect(formatLocaleDecimal(1234.5, "de-DE")).toBe("1.234,5");
    expect(formatLocaleDecimal(1234.5, "pt-BR")).toBe("1.234,5");
    expect(formatLocaleDecimal(1234.5, "ja-JP")).toBe("1,234.5");
    const french = formatLocaleDecimal(1234.5, "fr-FR");
    expect(french.replace(/\s/g, " ")).toBe("1 234,5");
  });

  it("resolves page ID from any locale pathname", () => {
    expect(pageIdFromPathname("/")).toBe("home");
    expect(pageIdFromPathname("/percentage-calculator")).toBe("percentage-calculator");
    expect(pageIdFromPathname("/es")).toBe("home");
    expect(pageIdFromPathname("/es/calculadora-de-porcentajes")).toBe("percentage-calculator");
    expect(pageIdFromPathname("/fr/compteur-de-mots")).toBe("word-counter");
    expect(pageIdFromPathname("/de/prozentrechner")).toBe("percentage-calculator");
    expect(pageIdFromPathname("/ar")).toBe("home");
    expect(pageIdFromPathname("/privacy")).toBe("privacy");
    expect(pageIdFromPathname("/xx/nonsense")).toBeNull();
  });

  it("generates locale links for the current page pointing to the same tool", () => {
    const links = localeLinksForPage("/percentage-calculator");
    expect(links.length).toBe(10);
    const en = links.find((l) => l.code === "en");
    const es = links.find((l) => l.code === "es");
    const de = links.find((l) => l.code === "de");
    expect(en?.href).toBe("/percentage-calculator");
    expect(en?.active).toBe(true);
    expect(es?.href).toBe("/es/calculadora-de-porcentajes");
    expect(es?.active).toBe(false);
    expect(de?.href).toBe("/de/prozentrechner");

    const esLinks = localeLinksForPage("/es/calculadora-de-porcentajes");
    const esEn = esLinks.find((l) => l.code === "en");
    const esEs = esLinks.find((l) => l.code === "es");
    expect(esEn?.href).toBe("/percentage-calculator");
    expect(esEn?.active).toBe(false);
    expect(esEs?.href).toBe("/es/calculadora-de-porcentajes");
    expect(esEs?.active).toBe(true);
  });

  it("counts spaced Unicode text and does not segment unspaced Japanese", () => {
    expect(countText("مرحبا بالعالم").words).toBe(2);
    expect(countText("नमस्ते दुनिया").words).toBe(2);
    expect(countText("こんにちは世界").words).toBe(1);
    expect(countText("こんにちは世界").characters).toBe(7);
  });
});

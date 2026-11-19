import { describe, expect, it } from "vitest";
import { groupForTool } from "@/lib/browse";
import { faqsFor } from "@/lib/faqs";
import { breadcrumbJsonLd, toolJsonLd } from "@/lib/schema";
import { toolMetadata } from "@/lib/seo";
import { canonicalUrl } from "@/lib/site";
import { tools } from "@/lib/tools";

describe("canonical URLs", () => {
  it("drops queries, hashes, and trailing slashes", () => {
    expect(canonicalUrl("/word-counter?text=secret#counts")).toBe("https://goeasytools.com/word-counter");
    expect(canonicalUrl("/privacy/")).toBe("https://goeasytools.com/privacy");
    expect(canonicalUrl("/")).toBe("https://goeasytools.com/");
  });

  it("publishes one path per tool", () => {
    const paths = tools.map((tool) => tool.path);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths.every((path) => !path.endsWith("/") && !path.includes("?"))).toBe(true);
  });
});

describe("SEO metadata standards", () => {
  it("ensures every tool has an optimized title between 20 and 65 characters", () => {
    for (const tool of tools) {
      expect(tool.title.length, `Tool ${tool.id} title length`).toBeGreaterThanOrEqual(20);
      expect(tool.title.length, `Tool ${tool.id} title length`).toBeLessThanOrEqual(65);
    }
  });

  it("ensures every tool has an informative meta description between 120 and 165 characters", () => {
    for (const tool of tools) {
      expect(tool.metaDescription.length, `Tool ${tool.id} metaDescription length`).toBeGreaterThanOrEqual(120);
      expect(tool.metaDescription.length, `Tool ${tool.id} metaDescription length`).toBeLessThanOrEqual(165);
    }
  });

  it("generates complete OpenGraph and Twitter card metadata for each tool", () => {
    for (const tool of tools) {
      const meta = toolMetadata(tool);
      expect(meta.description).toBe(tool.metaDescription);
      expect(meta.alternates?.canonical).toBe(canonicalUrl(tool.path));
      expect(meta.openGraph).toMatchObject({
        url: canonicalUrl(tool.path),
        type: "website",
      });
      expect(meta.twitter).toMatchObject({
        card: "summary_large_image",
      });
    }
  });

  it("ensures every tool has questions and answers for FAQ structured data", () => {
    for (const tool of tools) {
      const faqs = faqsFor(tool.id);
      expect(faqs.length, `Tool ${tool.id} faqs`).toBeGreaterThanOrEqual(2);
      for (const item of faqs) {
        expect(item.question.trim().length).toBeGreaterThan(5);
        expect(item.answer.trim().length).toBeGreaterThan(10);
      }
    }
  });

  it("ensures internal roadmap evidence disclaimers are never rendered in public guide or app components", async () => {
    const fs = await import("fs/promises");
    const path = await import("path");

    async function checkDir(dir: string) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          await checkDir(fullPath);
        } else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) {
          const content = await fs.readFile(fullPath, "utf-8");
          expect(content).not.toContain("tool.evidence");
          expect(content).not.toContain("Not yet validated");
        }
      }
    }

    await checkDir(path.resolve(__dirname, "../components"));
    await checkDir(path.resolve(__dirname, "../app"));
  });

  it("generates valid WebApplication schema for every tool with specific categories", () => {
    for (const tool of tools) {
      const json = toolJsonLd(tool);
      expect(json["@type"]).toBe("WebApplication");
      expect(json.name).toBe(tool.name);
      expect(json.description).toBe(tool.metaDescription);
      expect(json.url).toBe(canonicalUrl(tool.path));
      expect(json.operatingSystem).toBe("All");
      expect(json.isAccessibleForFree).toBe(true);
      expect(json.offers).toEqual({ "@type": "Offer", price: "0", priceCurrency: "USD" });

      if (tool.id === "emi-calculator" || tool.id === "gst-calculator") {
        expect(json.applicationCategory).toBe("FinanceApplication");
      } else if (tool.category === "developer") {
        expect(json.applicationCategory).toBe("DeveloperApplication");
      } else if (tool.category === "image" || tool.category === "media") {
        expect(json.applicationCategory).toBe("MultimediaApplication");
      } else if (tool.category === "calculator") {
        expect(json.applicationCategory).toBe("EducationalApplication");
      } else {
        expect(json.applicationCategory).toBe("UtilitiesApplication");
      }
    }
  });

  it("generates correct BreadcrumbList schema matching group hierarchy", () => {
    for (const tool of tools) {
      const group = groupForTool(tool.id);
      const json = breadcrumbJsonLd(tool, group);
      expect(json["@type"]).toBe("BreadcrumbList");
      expect(json.itemListElement[0]).toEqual({
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: canonicalUrl("/"),
      });

      if (group) {
        expect(json.itemListElement).toHaveLength(3);
        expect(json.itemListElement[1]).toEqual({
          "@type": "ListItem",
          position: 2,
          name: group.name,
          item: canonicalUrl(group.path),
        });
        expect(json.itemListElement[2]).toEqual({
          "@type": "ListItem",
          position: 3,
          name: tool.name,
          item: canonicalUrl(tool.path),
        });
      } else {
        expect(json.itemListElement).toHaveLength(2);
        expect(json.itemListElement[1]).toEqual({
          "@type": "ListItem",
          position: 2,
          name: tool.name,
          item: canonicalUrl(tool.path),
        });
      }
    }
  });

  it("publishes complete and accurate llms.txt and llms-full.txt machine-readable manifests", async () => {
    const fs = await import("fs/promises");
    const path = await import("path");

    const llmsPath = path.resolve(__dirname, "../public/llms.txt");
    const llmsFullPath = path.resolve(__dirname, "../public/llms-full.txt");

    const llmsContent = await fs.readFile(llmsPath, "utf-8");
    const llmsFullContent = await fs.readFile(llmsFullPath, "utf-8");

    expect(llmsContent.length).toBeGreaterThan(500);
    expect(llmsFullContent.length).toBeGreaterThan(1500);

    expect(llmsContent).not.toContain("tool.evidence");
    expect(llmsContent).not.toContain("Not yet validated");
    expect(llmsFullContent).not.toContain("tool.evidence");
    expect(llmsFullContent).not.toContain("Not yet validated");

    for (const tool of tools) {
      const toolUrl = canonicalUrl(tool.path);
      expect(llmsContent).toContain(toolUrl);
      expect(llmsFullContent).toContain(toolUrl);
    }
  });
});

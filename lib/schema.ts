import type { BrowseGroup } from "@/lib/browse";
import { canonicalUrl } from "@/lib/site";
import type { ToolCategory, ToolDefinition } from "@/lib/tools";

export function applicationCategoryFor(category: ToolCategory, id: string): string {
  if (id === "emi-calculator" || id === "gst-calculator") {
    return "FinanceApplication";
  }
  if (category === "developer") {
    return "DeveloperApplication";
  }
  if (category === "image" || category === "media") {
    return "MultimediaApplication";
  }
  if (category === "calculator") {
    return "EducationalApplication";
  }
  return "UtilitiesApplication";
}

export function toolJsonLd(tool: ToolDefinition) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: tool.metaDescription,
    url: canonicalUrl(tool.path),
    applicationCategory: applicationCategoryFor(tool.category, tool.id),
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function breadcrumbJsonLd(tool: ToolDefinition, group?: BrowseGroup) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl("/") },
      ...(group ? [{ "@type": "ListItem", position: 2, name: group.name, item: canonicalUrl(group.path) }] : []),
      { "@type": "ListItem", position: group ? 3 : 2, name: tool.name, item: canonicalUrl(tool.path) },
    ],
  };
}

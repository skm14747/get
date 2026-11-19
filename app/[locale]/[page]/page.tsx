import { appendFileSync } from "fs";
import { notFound } from "next/navigation";
import { ToolPage } from "@/components/tool-page";
import { resolvePrefixedRequest } from "@/lib/hreflang";
import { getLocale } from "@/lib/locales";
import { toolMetadata } from "@/lib/seo";
import { getToolEntry } from "@/lib/tool-registry";
import { tools, type ToolId } from "@/lib/tools";
import { getToolTranslation, getUiMessages } from "@/lib/translations";

function toolIdFromSlug(localeCode: string, slug: string): ToolId | null {
  const locale = getLocale(localeCode);
  if (!locale) return null;
  const entry = (Object.entries(locale.toolSlugs) as [string, string][]).find(([, s]) => s === slug);
  if (!entry) return null;
  const id = entry[0];
  if (!tools.find((t) => t.id === id)) return null;
  return id as ToolId;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; page: string }> }) {
  const { locale, page: rawPage } = await params;
  const page = decodeURIComponent(rawPage);
  if (!resolvePrefixedRequest(locale, page)) return {};
  const toolId = toolIdFromSlug(locale, page);
  if (!toolId) return {};
  const tool = tools.find((t) => t.id === toolId);
  if (!tool) return {};
  const t = getToolTranslation(locale, tool.id, tool);
  return toolMetadata({ ...tool, name: t.name, shortDescription: t.shortDescription, title: `${t.name} · GoEasyTools`, metaDescription: t.shortDescription });
}

export default async function PrefixedPage({
  params,
}: {
  params: Promise<{ locale: string; page: string }>;
}) {
  const { locale, page: rawPage } = await params;
  const page = decodeURIComponent(rawPage);
  if (!resolvePrefixedRequest(locale, page)) notFound();

  const toolId = toolIdFromSlug(locale, page);
  if (!toolId) notFound();

  const tool = tools.find((t) => t.id === toolId);
  if (!tool) notFound();

  const entry = getToolEntry(toolId);
  if (!entry) notFound();

  const t = getToolTranslation(locale, tool.id, tool);
  const ui = getUiMessages(locale);
  const localizedTool = { ...tool, name: t.name, shortDescription: t.shortDescription };
  // #region agent log
  try { appendFileSync('/Users/sandeepmishra/Desktop/prsnl/goeasytools/.cursor/debug-24a009.log', JSON.stringify({sessionId:'24a009',location:'[locale]/[page]/page.tsx',message:'render-locale-tool',data:{locale,toolId:tool.id,originalName:tool.name,translatedName:t.name,homeLabel:ui.home},timestamp:Date.now(),hypothesisId:'translation-fix'})+'\n'); } catch {}
  // #endregion

  return (
    <ToolPage tool={localizedTool} homePath={`/${locale}`} homeLabel={ui.home}>
      {entry.render()}
      {entry.guide(tool)}
    </ToolPage>
  );
}

"use client";

import { useCallback } from "react";
import { RecentTools } from "@/components/recent-tools";
import { ToolSearch } from "@/components/tool-search";
import { getLocale } from "@/lib/locales";
import { localePath } from "@/lib/hreflang";
import type { IndexableId } from "@/lib/hreflang";

export function LocaleHomeClient({ localeCode }: { localeCode: string }) {
  const hrefForTool = useCallback(
    (toolId: string): string | null => {
      const locale = getLocale(localeCode);
      if (!locale) return null;
      return localePath(locale, toolId as IndexableId);
    },
    [localeCode],
  );

  return (
    <>
      <div id="search" className="mt-6 max-w-lg">
        <ToolSearch id="home-search" hrefForTool={hrefForTool} />
      </div>
    </>
  );
}

export function LocaleRecentTools({ localeCode }: { localeCode: string }) {
  const hrefForTool = useCallback(
    (toolId: string): string | null => {
      const locale = getLocale(localeCode);
      if (!locale) return null;
      return localePath(locale, toolId as IndexableId);
    },
    [localeCode],
  );

  return <RecentTools hrefForTool={hrefForTool} />;
}

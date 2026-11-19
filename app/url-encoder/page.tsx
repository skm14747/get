import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { UrlGuide } from "@/components/url-guide";
import { UrlTool } from "@/components/url-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("url-encoder");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <UrlTool />
      <UrlGuide />
    </ToolPage>
  );
}

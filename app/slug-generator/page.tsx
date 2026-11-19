import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { SlugGuide } from "@/components/slug-guide";
import { SlugTool } from "@/components/slug-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("slug-generator");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <SlugTool />
      <SlugGuide />
    </ToolPage>
  );
}

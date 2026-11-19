import type { Metadata } from "next";
import { ContrastGuide } from "@/components/contrast-guide";
import { ContrastTool } from "@/components/contrast-tool";
import { ToolPage } from "@/components/tool-page";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("contrast-checker");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <ContrastTool />
      <ContrastGuide />
    </ToolPage>
  );
}

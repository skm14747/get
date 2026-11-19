import type { Metadata } from "next";
import { JsonToTsGuide } from "@/components/json-to-ts-guide";
import { JsonToTsTool } from "@/components/json-to-ts-tool";
import { ToolPage } from "@/components/tool-page";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("json-to-typescript");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <JsonToTsTool />
      <JsonToTsGuide />
    </ToolPage>
  );
}

import type { Metadata } from "next";
import { SqlGuide } from "@/components/sql-guide";
import { SqlTool } from "@/components/sql-tool";
import { ToolPage } from "@/components/tool-page";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("sql-formatter");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <SqlTool />
      <SqlGuide />
    </ToolPage>
  );
}

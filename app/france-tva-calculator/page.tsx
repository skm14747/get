import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { FranceTvaGuide } from "@/components/france-tva-guide";
import { FranceTvaTool } from "@/components/france-tva-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("france-tva-calculator");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <FranceTvaTool />
      <FranceTvaGuide />
    </ToolPage>
  );
}

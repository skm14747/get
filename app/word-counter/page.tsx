import type { Metadata } from "next";
import { WordCounterGuide } from "@/components/word-counter-guide";
import { WordCounterTool } from "@/components/word-counter-tool";
import { ToolPage } from "@/components/tool-page";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("word-counter");
export const metadata: Metadata = toolMetadata(tool);

export default function WordCounterPage() {
  return (
    <ToolPage tool={tool}>
      <WordCounterTool />
      <WordCounterGuide />
    </ToolPage>
  );
}

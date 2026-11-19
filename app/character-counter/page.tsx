import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { CharacterCounterGuide } from "@/components/character-counter-guide";
import { CharacterTool } from "@/components/character-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("character-counter");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <CharacterTool />
      <CharacterCounterGuide />
    </ToolPage>
  );
}

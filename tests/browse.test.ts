import { describe, expect, it } from "vitest";
import { browseGroups, groupForTool, searchTools, toolsInGroup } from "@/lib/browse";
import { intentBridgeFor } from "@/lib/intent-bridges";
import { tools } from "@/lib/tools";

describe("browse groups", () => {
  it("places every tool in one category", () => {
    const ids = browseGroups.flatMap((group) => group.toolIds);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.sort()).toEqual(tools.map((tool) => tool.id).sort());
    expect(toolsInGroup(browseGroups[0]!).length).toBeGreaterThan(0);
  });

  it("ensures every category pillar has a substantive educational overview and use cases", () => {
    for (const group of browseGroups) {
      expect(group.overview.length, `Group ${group.id} overview`).toBeGreaterThan(120);
      expect(group.keyUseCases.length, `Group ${group.id} use cases`).toBeGreaterThanOrEqual(3);
      for (const useCase of group.keyUseCases) {
        expect(useCase.trim().length).toBeGreaterThan(20);
      }
    }
  });

  it("searches names and returns nothing for a blank query", () => {
    expect(searchTools("   ")).toEqual([]);
    expect(searchTools("json").map((tool) => tool.id)).toContain("json-formatter");
    expect(groupForTool("gst-calculator")?.name).toBe("Finance");
    expect(searchTools("no-such-tool")).toEqual([]);
  });

  it("provides valid task-chaining intent bridges for all registered tools", () => {
    for (const tool of tools) {
      const bridge = intentBridgeFor(tool.id);
      expect(bridge, `Bridge for ${tool.id}`).toBeDefined();
      expect(bridge?.targetTool.id).not.toBe(tool.id);
      expect(bridge?.headline.length).toBeGreaterThan(10);
      expect(bridge?.description.length).toBeGreaterThan(20);
      expect(bridge?.callToAction.length).toBeGreaterThan(5);
    }
  });
});

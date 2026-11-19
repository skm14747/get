/** @vitest-environment jsdom */

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { JsonTool } from "@/components/json-tool";

describe("JsonTool", () => {
  it("exposes a labeled JSON field and an indentation control", () => {
    render(<JsonTool />);
    expect(screen.getByRole("textbox", { name: "JSON" })).toBeTruthy();
    expect(screen.getByRole("combobox", { name: "Indentation" })).toBeTruthy();
  });
});

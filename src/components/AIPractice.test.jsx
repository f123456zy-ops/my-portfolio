// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { AI_DELIVERABLES, AI_METRICS } from "../content/portfolio";
import { AIPractice } from "./AIPractice";

afterEach(cleanup);

describe("AIPractice", () => {
  it("offers five keyboard-selectable deliverable tabs", () => {
    render(<AIPractice deliverables={AI_DELIVERABLES} metrics={AI_METRICS} />);

    const tabs = screen.getAllByRole("tab");
    expect(screen.getByRole("tablist", { name: "AI 可交付成果" })).toBeInTheDocument();
    expect(tabs).toHaveLength(5);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("img", { name: AI_DELIVERABLES[0].alt })).toHaveAttribute(
      "src",
      AI_DELIVERABLES[0].image,
    );

    fireEvent.keyDown(tabs[0], { key: "ArrowRight" });
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("img", { name: AI_DELIVERABLES[1].alt })).toBeInTheDocument();

    fireEvent.keyDown(tabs[1], { key: "End" });
    expect(tabs[4]).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(tabs[4], { key: "Home" });
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
  });

  it("renders the verified workflow stages and efficiency metrics", () => {
    render(<AIPractice deliverables={AI_DELIVERABLES} metrics={AI_METRICS} />);

    for (const stage of ["策略", "生成", "编辑", "交付"]) {
      expect(screen.getByText(stage, { selector: ".ai-workflow__stage-name" })).toBeInTheDocument();
    }
    for (const value of ["50%", "1 → 8", "+300%"]) {
      expect(screen.getByText(value)).toBeInTheDocument();
    }
  });
});

// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import {
  AI_DELIVERABLES,
  AI_METRICS,
  AI_WORKFLOW_STAGES,
} from "../content/portfolio";
import { AIContentSystem } from "./AIContentSystem";

afterEach(cleanup);

describe("AIContentSystem", () => {
  it("explains a complete five-stage AI content production process", () => {
    render(
      <AIContentSystem
        stages={AI_WORKFLOW_STAGES}
        metrics={AI_METRICS}
        deliverables={AI_DELIVERABLES}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "AI 进入流程，内容真正落地" }),
    ).toBeInTheDocument();

    const workflow = screen.getByRole("list", { name: "AI 内容生产流程" });
    const stageHeadings = within(workflow).getAllByRole("heading", { level: 3 });
    expect(stageHeadings).toHaveLength(5);
    expect(stageHeadings.map((heading) => heading.textContent)).toEqual(
      AI_WORKFLOW_STAGES.map((stage) => stage.title),
    );

    for (const value of ["50%", "1 → 8", "+300%"] ) {
      expect(screen.getByText(value)).toBeInTheDocument();
    }
  });

  it("supports roving keyboard navigation across five real deliverables", () => {
    render(
      <AIContentSystem
        stages={AI_WORKFLOW_STAGES}
        metrics={AI_METRICS}
        deliverables={AI_DELIVERABLES}
      />,
    );

    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(5);
    expect(tabs.map((tab) => tab.tabIndex)).toEqual([0, -1, -1, -1, -1]);

    fireEvent.keyDown(tabs[0], { key: "ArrowRight" });
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    expect(tabs[1]).toHaveFocus();

    fireEvent.keyDown(tabs[1], { key: "ArrowLeft" });
    expect(tabs[0]).toHaveFocus();

    fireEvent.keyDown(tabs[0], { key: "End" });
    expect(tabs[4]).toHaveFocus();
    expect(screen.getByRole("tabpanel")).toHaveTextContent(AI_DELIVERABLES[4].outcome);

    fireEvent.keyDown(tabs[4], { key: "Home" });
    expect(tabs[0]).toHaveFocus();
    expect(screen.getByRole("tabpanel")).toHaveTextContent(AI_DELIVERABLES[0].description);
    expect(screen.getByRole("img", { name: AI_DELIVERABLES[0].alt })).toHaveAttribute(
      "src",
      AI_DELIVERABLES[0].image,
    );
  });
});

// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FEATURED_CASES, VISUAL_ARCHIVE } from "../content/portfolio";
import { FeaturedCases } from "./FeaturedCases";

beforeEach(() => {
  vi.spyOn(window.HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("FeaturedCases", () => {
  it("renders three hiring-focused cases and a closed six-item visual archive", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <FeaturedCases cases={FEATURED_CASES} archive={VISUAL_ARCHIVE} />,
    );

    expect(container.querySelectorAll("[data-featured-case]")).toHaveLength(3);

    const archive = screen.getByText("视觉基础档案").closest("details");
    expect(archive).not.toHaveAttribute("open");
    await user.click(within(archive).getByText("视觉基础档案"));
    expect(archive).toHaveAttribute("open");
    expect(within(archive).getAllByRole("article")).toHaveLength(6);
    expect(within(archive).getByText("《独行者》")).toBeInTheDocument();
    expect(within(archive).getByText("一叶子包装概念")).toBeInTheDocument();
  });

  it("opens a complete named case study and restores trigger focus on Escape", async () => {
    const user = userEvent.setup();
    render(<FeaturedCases cases={FEATURED_CASES} archive={VISUAL_ARCHIVE} />);

    const trigger = screen.getByRole("button", {
      name: `查看案例：${FEATURED_CASES[0].title}`,
    });
    await user.click(trigger);

    const dialog = screen.getByRole("dialog", { name: FEATURED_CASES[0].title });
    for (const heading of [
      "项目背景与目标",
      "我的职责",
      "内容与制作流程",
      "代表画面与交付物",
      "结果与经验总结",
    ]) {
      expect(within(dialog).getByRole("heading", { name: heading })).toBeInTheDocument();
    }
    expect(dialog.querySelector("video")).toHaveAttribute("preload", "metadata");

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("keeps case evidence and layout stable when a preview image fails", () => {
    const { container } = render(
      <FeaturedCases cases={FEATURED_CASES} archive={VISUAL_ARCHIVE} />,
    );
    const firstCase = container.querySelector("[data-featured-case]");
    const media = firstCase.querySelector(".featured-cases__media");
    fireEvent.error(within(media).getByRole("img", { name: FEATURED_CASES[0].alt }));

    expect(media).toHaveAttribute("data-media-failed", "true");
    expect(within(firstCase).getByRole("heading", { name: FEATURED_CASES[0].title })).toBeVisible();
    expect(within(firstCase).getByText(FEATURED_CASES[0].role)).toBeVisible();
    expect(within(firstCase).getByText(FEATURED_CASES[0].outcome)).toBeVisible();
    expect(
      within(firstCase).getByRole("button", { name: `查看案例：${FEATURED_CASES[0].title}` }),
    ).toBeVisible();
  });
});

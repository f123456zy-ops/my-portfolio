// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ARCHIVE_PROJECTS, PROJECTS } from "../content/portfolio";
import { Archive } from "./Archive";
import { Projects } from "./Projects";

beforeEach(() => {
  vi.spyOn(window.HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Projects", () => {
  it("opens a project dialog and returns focus when closed", async () => {
    const user = userEvent.setup();
    render(<Projects items={PROJECTS} />);

    const trigger = screen.getByRole("button", { name: /查看项目.*AI 视频/ });
    await user.click(trigger);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("uses metadata video loading and keeps project information visible", async () => {
    const user = userEvent.setup();
    render(<Projects items={PROJECTS} />);

    expect(screen.getByText(PROJECTS[0].role)).toBeVisible();
    expect(screen.getByText(PROJECTS[0].outcome)).toBeVisible();
    await user.click(screen.getByRole("button", { name: /查看项目.*AI 视频/ }));

    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText(PROJECTS[0].title)).toBeInTheDocument();
    expect(dialog.querySelector("video")).toHaveAttribute("preload", "metadata");
  });
});

describe("Archive", () => {
  it("presents six early projects as design foundations", () => {
    render(<Archive items={ARCHIVE_PROJECTS} />);

    expect(screen.getByRole("heading", { name: "早期作品 / 设计基础" })).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(6);
    expect(screen.getByText("《独行者》")).toBeInTheDocument();
    expect(screen.getByText("《空之境》")).toBeInTheDocument();
    expect(screen.queryByText("学生作品集")).not.toBeInTheDocument();
  });
});

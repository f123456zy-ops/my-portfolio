// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { App } from "../App";

afterEach(cleanup);

describe("application shell", () => {
  it("renders job navigation and corrected hero identity", () => {
    render(<App />);

    expect(screen.getByRole("heading", { level: 1, name: "王泽毅" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "AI 实践" })).toHaveAttribute(
      "href",
      "#ai-practice",
    );
    expect(screen.getByRole("link", { name: "查看作品" })).toHaveAttribute(
      "href",
      "#projects",
    );
    expect(screen.queryByText("商业合作")).not.toBeInTheDocument();
  });

  it("exposes an accessible mobile navigation toggle", () => {
    render(<App />);

    const toggle = screen.getByRole("button", { name: "打开导航" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAccessibleName("关闭导航");
  });

  it("keeps non-navigation sections visible when reveal motion is enabled", () => {
    render(<App />);

    const capabilities = screen.getByRole("heading", { name: "我的能力" }).closest("section");
    expect(capabilities).toHaveAttribute("data-revealed");
  });
});

// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { App } from "../App";
import { Header } from "./Header";

afterEach(cleanup);

describe("application shell", () => {
  it("renders the approved five-chapter hiring journey", () => {
    const { container } = render(<App />);
    const navigation = screen.getByRole("navigation", { name: "主导航" });

    expect(within(navigation).getAllByRole("link").map((link) => link.textContent)).toEqual([
      "AI 能力",
      "代表项目",
      "经历",
      "关于",
    ]);
    expect(within(navigation).getByRole("link", { name: "AI 能力" })).toHaveAttribute(
      "href",
      "#ai",
    );
    expect(within(navigation).getByRole("link", { name: "代表项目" })).toHaveAttribute(
      "href",
      "#work",
    );
    expect([...container.querySelectorAll("main > section")].map((section) => section.id)).toEqual([
      "home",
      "ai",
      "work",
      "career",
      "about",
    ]);

    const hero = container.querySelector("#home");
    expect(within(hero).getByRole("heading", { level: 1, name: "王泽毅" })).toBeInTheDocument();
    expect(within(hero).getByText("新媒体内容运营（AI 内容方向）")).toBeVisible();
    expect(container).not.toHaveTextContent(/CHAPTER|VISUAL STORY|WANG ZEYI \/ PORTFOLIO/);
    expect(container).not.toHaveTextContent(/导演|工作室|商务合作|客户咨询|合作伙伴/);

    expect(screen.getAllByRole("link", { name: /下载简历/ })).toHaveLength(3);
  });

  it("exposes an accessible mobile navigation toggle", () => {
    render(<App />);

    const toggle = screen.getByRole("button", { name: "打开导航" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAccessibleName("关闭导航");
  });

  it("lets the header move from cinematic dark to editorial light", () => {
    const { rerender } = render(<Header sections={["home", "ai"]} activeSection="home" />);

    expect(screen.getByRole("banner")).toHaveAttribute("data-theme", "dark");
    rerender(<Header sections={["home", "ai"]} activeSection="ai" />);
    expect(screen.getByRole("banner")).toHaveAttribute("data-theme", "light");
  });
});

// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SITE_PROFILE } from "../content/portfolio";
import { Hero } from "./Hero";

afterEach(cleanup);

describe("cinematic hero", () => {
  it("uses the supplied cinematic film with responsive sources and a poster fallback", () => {
    const { container } = render(<Hero profile={SITE_PROFILE} />);
    const video = container.querySelector("video");
    const sources = [...container.querySelectorAll("video source")];

    expect(video).toHaveAttribute("poster", "/assets/hero-cinematic-poster.jpg");
    expect(sources).toHaveLength(2);
    expect(sources[0]).toHaveAttribute("src", "/videos/hero-cinematic-mobile.mp4");
    expect(sources[0]).toHaveAttribute("media", "(max-width: 767px)");
    expect(sources[1]).toHaveAttribute("src", "/videos/hero-cinematic-desktop.mp4");
  });

  it("presents the portfolio as a restrained film chapter without hiding job actions", () => {
    render(<Hero profile={SITE_PROFILE} />);

    expect(screen.getByText("CHAPTER 01 / 04")).toBeInTheDocument();
    expect(screen.getByText("VISUAL STORY / 2026")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "查看作品" })).toHaveAttribute(
      "href",
      "#projects",
    );
    expect(screen.getByRole("link", { name: "下载简历" })).toHaveAttribute(
      "href",
      "/resume-wang-zeyi.pdf",
    );
  });
});

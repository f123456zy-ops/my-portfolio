// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SITE_PROFILE } from "../content/portfolio";
import { Hero } from "./Hero";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("job-first video hero", () => {
  it("uses resilient muted autoplay with responsive sources and a poster fallback", () => {
    const { container } = render(<Hero profile={SITE_PROFILE} />);
    const video = container.querySelector("video");
    const sources = [...container.querySelectorAll("video source")];

    expect(video.muted).toBe(true);
    expect(video).toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("loop");
    expect(video).toHaveAttribute("playsinline");
    expect(video).toHaveAttribute("poster", "/assets/hero-cinematic-poster.jpg");
    expect(sources).toHaveLength(2);
    expect(sources[0]).toHaveAttribute("src", "/videos/hero-cinematic-mobile.mp4");
    expect(sources[0]).toHaveAttribute("media", "(max-width: 767px)");
    expect(sources[1]).toHaveAttribute("src", "/videos/hero-cinematic-desktop.mp4");
  });

  it("prioritizes the target role and direct hiring actions", () => {
    render(<Hero profile={SITE_PROFILE} />);

    expect(screen.getByText("新媒体内容运营（AI 内容方向）")).toBeVisible();
    expect(screen.getByText("内容策划 · AI 内容生产 · 拍摄 · 剪辑 · 视觉设计")).toBeVisible();
    expect(screen.getByRole("link", { name: "查看代表项目" })).toHaveAttribute(
      "href",
      "#work",
    );
    expect(screen.getByRole("link", { name: "下载简历" })).toHaveAttribute(
      "href",
      "/resume-wang-zeyi.pdf",
    );
  });

  it("recovers from a transient autoplay rejection when the video becomes playable", async () => {
    const { container } = render(<Hero profile={SITE_PROFILE} />);
    const video = container.querySelector("video");
    let paused = true;
    let attempts = 0;

    Object.defineProperty(video, "paused", {
      configurable: true,
      get: () => paused,
    });
    Object.defineProperty(video, "play", {
      configurable: true,
      value: () => {
        attempts += 1;
        if (attempts === 1) {
          return Promise.reject(new DOMException("Playback was interrupted", "AbortError"));
        }
        paused = false;
        return Promise.resolve();
      },
    });

    fireEvent.loadedData(video);
    await waitFor(() => expect(video).toHaveAttribute("data-video-ready", "true"));
    fireEvent.canPlay(video);

    await waitFor(() => expect(video.paused).toBe(false));
    expect(container.querySelector(".hero__poster")).not.toHaveAttribute("data-visible");
  });

  it("resumes playback when the document returns to the foreground", async () => {
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
    const play = vi
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockResolvedValue(undefined);
    const { container } = render(<Hero profile={SITE_PROFILE} />);
    const video = container.querySelector("video");

    fireEvent.loadedData(video);
    await waitFor(() => expect(play).toHaveBeenCalled());
    play.mockClear();
    fireEvent(document, new Event("visibilitychange"));
    await waitFor(() => expect(play).toHaveBeenCalledTimes(1));
  });

  it("keeps all hero content visible on a true media failure", () => {
    const { container } = render(<Hero profile={SITE_PROFILE} />);
    const video = container.querySelector("video");
    fireEvent.error(video);

    expect(video).toHaveAttribute("data-video-failed", "true");
    expect(container.querySelector(".hero__poster")).toHaveAttribute("data-visible", "true");
    expect(screen.getByRole("heading", { name: "王泽毅" })).toBeVisible();
    expect(screen.getByRole("link", { name: "查看代表项目" })).toBeVisible();
  });
});

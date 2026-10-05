// @vitest-environment jsdom

import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useReducedMotion } from "./useReducedMotion";
import { useSectionObserver } from "./useSectionObserver";
import { calculateScrollProgress, useScrollProgress } from "./useScrollProgress";

const originalIntersectionObserver = window.IntersectionObserver;
const originalMatchMedia = window.matchMedia;

afterEach(() => {
  window.IntersectionObserver = originalIntersectionObserver;
  window.matchMedia = originalMatchMedia;
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("motion safety", () => {
  it("detects the user's reduced-motion preference", () => {
    window.matchMedia = vi.fn(() => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it("returns static scroll progress when reduced motion is active", () => {
    window.matchMedia = vi.fn(() => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    const element = { getBoundingClientRect: () => ({ top: 0, height: 500 }) };
    const { result } = renderHook(() => useScrollProgress({ current: element }));
    expect(result.current).toBe(0);
  });

  it("falls back to visible content when IntersectionObserver is unavailable", () => {
    delete window.IntersectionObserver;
    const { result } = renderHook(() => useSectionObserver(["home", "ai-practice"]));
    expect(result.current.visibleIds.has("home")).toBe(true);
    expect(result.current.visibleIds.has("ai-practice")).toBe(true);
    expect(result.current.activeId).toBe("home");
  });

  it("reveals a tall section as soon as any part enters the viewport", () => {
    document.body.innerHTML = '<section id="projects"></section>';
    let observer;
    window.IntersectionObserver = class {
      constructor(callback, options) {
        this.callback = callback;
        this.options = options;
        observer = this;
      }

      observe() {}
      disconnect() {}
    };

    const { result } = renderHook(() => useSectionObserver(["projects"]));
    const minimumThreshold = Math.min(
      ...(Array.isArray(observer.options.threshold)
        ? observer.options.threshold
        : [observer.options.threshold ?? 0]),
    );

    if (0.05 >= minimumThreshold) {
      act(() => {
        observer.callback([
          {
            isIntersecting: true,
            intersectionRatio: 0.05,
            target: document.getElementById("projects"),
          },
        ]);
      });
    }

    expect(result.current.visibleIds.has("projects")).toBe(true);
  });

  it("clamps geometry-based scroll progress", () => {
    expect(calculateScrollProgress({ top: 900, height: 400 }, 800)).toBe(0);
    expect(calculateScrollProgress({ top: 100, height: 400 }, 800)).toBeCloseTo(0.5833, 3);
    expect(calculateScrollProgress({ top: -400, height: 400 }, 800)).toBe(1);
  });
});

// @vitest-environment jsdom

import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useReducedMotion } from "./useReducedMotion";
import { useSectionObserver } from "./useSectionObserver";
import { calculateScrollProgress, useScrollProgress } from "./useScrollProgress";

const originalIntersectionObserver = window.IntersectionObserver;
const originalMatchMedia = window.matchMedia;

afterEach(() => {
  window.IntersectionObserver = originalIntersectionObserver;
  window.matchMedia = originalMatchMedia;
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

  it("clamps geometry-based scroll progress", () => {
    expect(calculateScrollProgress({ top: 900, height: 400 }, 800)).toBe(0);
    expect(calculateScrollProgress({ top: 100, height: 400 }, 800)).toBeCloseTo(0.5833, 3);
    expect(calculateScrollProgress({ top: -400, height: 400 }, 800)).toBe(1);
  });
});

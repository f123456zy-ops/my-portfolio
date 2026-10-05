// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { IntroCurtain } from "./IntroCurtain";

const originalMatchMedia = window.matchMedia;

function setReducedMotion(matches) {
  window.matchMedia = vi.fn(() => ({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

beforeEach(() => {
  window.sessionStorage.clear();
  setReducedMotion(false);
});

afterEach(() => {
  cleanup();
  window.matchMedia = originalMatchMedia;
  vi.restoreAllMocks();
});

describe("IntroCurtain", () => {
  it("shows the short profession credit on the first session visit", () => {
    const { container } = render(<IntroCurtain />);

    expect(container.querySelector(".intro-curtain")).toBeInTheDocument();
    expect(screen.getByText("WZY")).toBeInTheDocument();
    expect(screen.getByText("NEW MEDIA OPERATIONS / AI CONTENT")).toBeInTheDocument();
  });

  it("skips the curtain after it has been seen in the current session", () => {
    window.sessionStorage.setItem("wzy-intro-seen", "true");
    const { container } = render(<IntroCurtain />);
    expect(container).toBeEmptyDOMElement();
  });

  it("skips the curtain when reduced motion is requested", () => {
    setReducedMotion(true);
    const { container } = render(<IntroCurtain />);
    expect(container).toBeEmptyDOMElement();
  });

  it("keeps the site renderable when session storage is blocked", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new DOMException("Storage is blocked", "SecurityError");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Storage is blocked", "SecurityError");
    });

    expect(() => render(<IntroCurtain />)).not.toThrow();
    expect(screen.getByText("WZY")).toBeInTheDocument();
  });
});

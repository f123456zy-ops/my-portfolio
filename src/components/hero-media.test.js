import { describe, expect, it } from "vitest";
import { resolveHeroMediaState } from "./Hero";

describe("resolveHeroMediaState", () => {
  it("keeps the poster visible until video data is ready", () => {
    expect(resolveHeroMediaState({ loaded: false, failed: false, reducedMotion: false })).toEqual({
      videoReady: false,
      showPoster: true,
      shouldPlay: true,
    });
  });

  it("reveals video after loading", () => {
    expect(resolveHeroMediaState({ loaded: true, failed: false, reducedMotion: false })).toEqual({
      videoReady: true,
      showPoster: false,
      shouldPlay: true,
    });
  });

  it("falls back to the poster on playback failure or reduced motion", () => {
    expect(resolveHeroMediaState({ loaded: true, failed: true, reducedMotion: false })).toEqual({
      videoReady: false,
      showPoster: true,
      shouldPlay: false,
    });
    expect(resolveHeroMediaState({ loaded: true, failed: false, reducedMotion: true })).toEqual({
      videoReady: false,
      showPoster: true,
      shouldPlay: false,
    });
  });
});

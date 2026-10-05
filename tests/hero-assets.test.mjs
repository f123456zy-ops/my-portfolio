import assert from "node:assert/strict";
import { existsSync, statSync } from "node:fs";
import test from "node:test";

const ASSETS = [
  { path: "public/videos/hero-cinematic-desktop.mp4", maxBytes: 18_000_000 },
  { path: "public/videos/hero-cinematic-mobile.mp4", maxBytes: 8_000_000 },
  { path: "public/assets/hero-cinematic-poster.jpg", maxBytes: 500_000 },
];

test("cinematic hero assets are present and web-sized", () => {
  for (const asset of ASSETS) {
    assert.equal(existsSync(asset.path), true, `${asset.path} must exist`);
    const size = statSync(asset.path).size;
    assert.ok(size > 0, `${asset.path} must not be empty`);
    assert.ok(size <= asset.maxBytes, `${asset.path} exceeds its web budget`);
  }
});

import test from "node:test";
import assert from "node:assert/strict";
import { extractDataImages } from "../scripts/extract-legacy-assets.mjs";

test("extractDataImages decodes ordered image data URIs", () => {
  const html = '<img src="data:image/jpeg;base64,aGVsbG8=">';
  const images = extractDataImages(html);

  assert.equal(images.length, 1);
  assert.equal(images[0].mime, "image/jpeg");
  assert.equal(images[0].bytes.toString("utf8"), "hello");
});

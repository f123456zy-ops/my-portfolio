import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";
import viteConfig from "../vite.config.mjs";

test("Vercel serves the client directory produced by Vite", () => {
  const configUrl = new URL("../vercel.json", import.meta.url);

  assert.equal(
    existsSync(fileURLToPath(configUrl)),
    true,
    "vercel.json must pin the production output directory",
  );

  const vercelConfig = JSON.parse(readFileSync(configUrl, "utf8"));
  assert.equal(vercelConfig.buildCommand, "npm run build");
  assert.equal(vercelConfig.outputDirectory, viteConfig.build.outDir);
});

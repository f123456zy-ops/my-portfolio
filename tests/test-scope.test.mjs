import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

test("Vitest ignores tests inside nested worktrees", () => {
  const fixtureRoot = join(
    process.cwd(),
    ".worktrees",
    "__vitest-scope-fixture",
  );
  const fixtureTest = join(fixtureRoot, "src", "escaped.test.js");

  mkdirSync(join(fixtureRoot, "src"), { recursive: true });
  writeFileSync(
    fixtureTest,
    'import { it } from "vitest"; it("must stay outside the suite", () => {});\n',
  );

  try {
    const listedTests = execFileSync(
      process.execPath,
      [
        join(process.cwd(), "node_modules", "vitest", "vitest.mjs"),
        "list",
        "src",
      ],
      { encoding: "utf8" },
    );

    assert.doesNotMatch(listedTests, /__vitest-scope-fixture/);
  } finally {
    rmSync(fixtureRoot, { force: true, recursive: true });
  }
});

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const styles = readFileSync(new URL("./styles.css", import.meta.url), "utf8");

describe("hero name typography", () => {
  it("keeps the opening name restrained across desktop and mobile breakpoints", () => {
    expect(styles).toContain("font-size: clamp(5rem, 9vw, 8.5rem);");
    expect(styles).toContain("font-size: clamp(3.5rem, 17vw, 5rem);");
    expect(styles).toContain("font-size: 3.35rem;");
    expect(styles.match(/\.hero h1 \{[\s\S]*?line-height: 1\.05;/g)).toHaveLength(2);
  });
});

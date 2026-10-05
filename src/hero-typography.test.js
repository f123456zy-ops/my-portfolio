import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const styles = readFileSync(new URL("./styles.css", import.meta.url), "utf8");

describe("hero name typography", () => {
  it("keeps the opening name restrained across desktop and mobile breakpoints", () => {
    expect(styles).toContain("font-size: clamp(6.25rem, 11.5vw, 10.5rem);");
    expect(styles).toContain("font-size: clamp(4rem, 20vw, 6rem);");
    expect(styles).toContain("font-size: 3.75rem;");
  });
});

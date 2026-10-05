import { describe, expect, it } from "vitest";
import { getWorkflowStage } from "./workflow";

describe("getWorkflowStage", () => {
  it.each([
    [-1, 0],
    [0, 0],
    [0.24, 0],
    [0.25, 1],
    [0.74, 2],
    [1, 3],
    [2, 3],
  ])("maps %s to stage %s", (progress, expected) => {
    expect(getWorkflowStage(progress, 4)).toBe(expected);
  });

  it("returns the first stage when count is invalid", () => {
    expect(getWorkflowStage(0.5, 0)).toBe(0);
  });
});

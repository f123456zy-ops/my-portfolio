import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ASSET_MAP } from "./asset-map";
import {
  AI_DELIVERABLES,
  ARCHIVE_PROJECTS,
  PAGE_SECTIONS,
  PROJECTS,
  SITE_PROFILE,
  validatePortfolioContent,
} from "./portfolio";
import { flattenText } from "../lib/content-guards";

describe("job-site content", () => {
  it("uses the corrected identity and job-only positioning", () => {
    expect(SITE_PROFILE.name).toBe("王泽毅");
    expect(JSON.stringify(SITE_PROFILE)).not.toMatch(/冯泽毅|商业合作|FZY/);
  });

  it("places AI practice immediately after the hero", () => {
    expect(PAGE_SECTIONS.slice(0, 3)).toEqual(["home", "ai-practice", "projects"]);
  });

  it("covers all five practical AI outputs", () => {
    expect(AI_DELIVERABLES.map((item) => item.title)).toEqual([
      "公众号内容",
      "AI 视频",
      "产品详情页",
      "品牌海报",
      "自动化工作流",
    ]);
  });

  it("passes cross-content validation", () => {
    expect(
      validatePortfolioContent({
        SITE_PROFILE,
        AI_DELIVERABLES,
        PROJECTS,
        ARCHIVE_PROJECTS,
      }),
    ).toEqual([]);
  });

  it("maps every semantic asset to a real public file", () => {
    for (const path of Object.values(ASSET_MAP)) {
      expect(path).toMatch(/^\//);
      expect(existsSync(resolve("public", path.slice(1))), path).toBe(true);
    }
  });

  it("reports forbidden copy, missing assets, duplicate ids, and external links", () => {
    const errors = validatePortfolioContent({
      items: [
        { id: "same", title: "冯泽毅", image: "", href: "https://example.com" },
        { id: "same", title: "项目二" },
      ],
    });

    expect(errors).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/旧姓名/),
        expect.stringMatching(/缺少资源/),
        expect.stringMatching(/重复 ID/),
        expect.stringMatching(/不支持的外部链接/),
      ]),
    );
  });

  it("flattens nested visible copy for validation", () => {
    expect(flattenText({ title: "AI", nested: ["视频", { label: "交付" }] })).toBe(
      "AI 视频 交付",
    );
  });
});

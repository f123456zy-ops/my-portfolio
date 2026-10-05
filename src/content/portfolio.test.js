import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ASSET_MAP } from "./asset-map";
import * as portfolio from "./portfolio";
import { flattenText } from "../lib/content-guards";

const {
  SITE_PROFILE,
  PAGE_SECTIONS,
  AI_WORKFLOW_STAGES,
  AI_METRICS,
  AI_DELIVERABLES,
  FEATURED_CASES,
  VISUAL_ARCHIVE,
  CAREER,
  ROLE_SKILLS,
  CONTACT,
  validatePortfolioContent,
} = portfolio;

describe("HR-first portfolio content", () => {
  it("uses the approved five-section hiring journey", () => {
    expect(PAGE_SECTIONS).toEqual(["home", "ai", "work", "career", "about"]);
  });

  it("states the exact role and supporting capability line", () => {
    expect(SITE_PROFILE.name).toBe("王泽毅");
    expect(SITE_PROFILE.title).toBe("新媒体内容运营（AI 内容方向）");
    expect(SITE_PROFILE.capabilityLine).toBe(
      "内容策划 · AI 内容生产 · 拍摄 · 剪辑 · 视觉设计",
    );
  });

  it("defines the five-stage AI production workflow", () => {
    expect(AI_WORKFLOW_STAGES.map((stage) => stage.title)).toEqual([
      "选题与策略",
      "AI 生成",
      "拍摄与编辑",
      "多平台适配",
      "发布与复盘",
    ]);
  });

  it("features exactly the three approved hiring cases", () => {
    expect(FEATURED_CASES.map((item) => item.title)).toEqual([
      "BIOCARE AI 品牌视频",
      "护肤品牌内容矩阵",
      "品牌空间与活动影像",
    ]);

    for (const item of FEATURED_CASES) {
      expect(item).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          discipline: expect.any(String),
          title: expect.any(String),
          period: expect.any(String),
          role: expect.any(String),
          context: expect.any(String),
          responsibilities: expect.any(Array),
          process: expect.any(Array),
          outcome: expect.any(String),
          image: expect.stringMatching(/^\//),
          alt: expect.any(String),
        }),
      );
    }
  });

  it("contains no studio, director, client, or partner positioning", () => {
    expect(flattenText(portfolio)).not.toMatch(/导演|工作室|商务合作|客户咨询|合作伙伴/);
  });

  it("passes the complete content guard", () => {
    expect(
      validatePortfolioContent({
        SITE_PROFILE,
        PAGE_SECTIONS,
        AI_WORKFLOW_STAGES,
        AI_METRICS,
        AI_DELIVERABLES,
        FEATURED_CASES,
        VISUAL_ARCHIVE,
        CAREER,
        ROLE_SKILLS,
        CONTACT,
      }),
    ).toEqual([]);
  });

  it("maps every semantic asset to a real public file", () => {
    for (const path of Object.values(ASSET_MAP)) {
      expect(path).toMatch(/^\//);
      expect(existsSync(resolve("public", path.slice(1))), path).toBe(true);
    }
  });

  it("reports structural and positioning errors", () => {
    const errors = validatePortfolioContent({
      PAGE_SECTIONS: ["home", "ai"],
      FEATURED_CASES: [
        {
          id: "same",
          title: "导演工作室",
          image: "",
          responsibilities: [],
          process: [],
        },
        { id: "same", title: "项目二" },
      ],
      CONTACT: { email: "", phone: "" },
    });

    expect(errors).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/定位禁用词/),
        expect.stringMatching(/缺少章节/),
        expect.stringMatching(/案例字段不完整/),
        expect.stringMatching(/联系方式为空/),
        expect.stringMatching(/缺少资源/),
        expect.stringMatching(/重复 ID/),
      ]),
    );
  });

  it("flattens nested visible copy for validation", () => {
    expect(flattenText({ title: "AI", nested: ["视频", { label: "交付" }] })).toBe(
      "AI 视频 交付",
    );
  });
});

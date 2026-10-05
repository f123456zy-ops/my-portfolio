// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CAREER, CONTACT, ROLE_SKILLS, SITE_PROFILE } from "../content/portfolio";
import { CareerProfile } from "./CareerProfile";
import { ProfileContact } from "./ProfileContact";

afterEach(cleanup);

describe("CareerProfile", () => {
  it("presents career evidence in descending order with education last", () => {
    render(<CareerProfile items={CAREER} skills={ROLE_SKILLS} />);

    const timeline = screen.getByRole("list", { name: "工作与教育经历" });
    const entries = within(timeline).getAllByRole("listitem");
    expect(entries).toHaveLength(4);
    expect(entries.map((entry) => within(entry).getByRole("heading").textContent)).toEqual(
      CAREER.map((item) => item.company),
    );
    expect(entries.at(-1)).toHaveTextContent("湖州师范学院");
  });

  it("prioritizes AI and new-media operations across five skill groups", () => {
    const { container } = render(<CareerProfile items={CAREER} skills={ROLE_SKILLS} />);
    const skills = [...container.querySelectorAll("[data-role-skill]")];
    expect(skills).toHaveLength(5);
    expect(skills.map((skill) => within(skill).getByRole("heading").textContent)).toEqual([
      "AI 内容生产与工作流",
      "新媒体内容策划与运营",
      "摄影与摄像",
      "视频剪辑与后期",
      "视觉设计与品牌表达",
    ]);
  });
});

describe("ProfileContact", () => {
  it("renders personal job intent and direct contact methods", () => {
    const { container } = render(<ProfileContact profile={SITE_PROFILE} contact={CONTACT} />);

    expect(screen.getByText("正在寻找新媒体内容运营、AI 内容生产及相关视觉内容岗位。"))
      .toBeVisible();
    expect(screen.getByRole("img", { name: "王泽毅个人肖像" })).toHaveAttribute(
      "src",
      SITE_PROFILE.portrait,
    );
    expect(screen.getByRole("link", { name: `发送邮件至 ${CONTACT.email}` })).toHaveAttribute(
      "href",
      CONTACT.emailHref,
    );
    expect(screen.getByRole("link", { name: `拨打电话 ${CONTACT.phone}` })).toHaveAttribute(
      "href",
      CONTACT.phoneHref,
    );
    expect(screen.getByRole("img", { name: "王泽毅微信二维码" })).toHaveAttribute(
      "src",
      CONTACT.qrPath,
    );
    expect(screen.getByRole("link", { name: "下载简历 PDF" })).toHaveAttribute(
      "href",
      CONTACT.resumePath,
    );
    expect(container).not.toHaveTextContent(/导演|工作室|商务合作|客户咨询|合作伙伴/);
  });
});

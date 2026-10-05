// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { App } from "../App";

afterEach(cleanup);

describe("job-focused profile sections", () => {
  it("shows only job-seeking contact actions and AI-first capabilities", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "关于王泽毅" })).toBeInTheDocument();
    const resumeLinks = screen.getAllByRole("link", { name: /下载简历/ });
    expect(resumeLinks).toHaveLength(3);
    for (const link of resumeLinks) {
      expect(link).toHaveAttribute("href", "/resume-wang-zeyi.pdf");
    }
    expect(screen.queryByText(/导演|工作室|商务合作|客户咨询|合作伙伴/)).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "AI 内容生产与工作流" })).toBeInTheDocument();
  });

  it("renders verified experience and direct contact methods", () => {
    render(<App />);

    expect(screen.getByText("浙江贝优生物科技有限公司")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /发送邮件/ })).toHaveAttribute(
      "href",
      "mailto:2364344055@qq.com",
    );
    expect(screen.getByRole("link", { name: /拨打电话/ })).toHaveAttribute(
      "href",
      "tel:17816786664",
    );
    expect(screen.getByRole("img", { name: "王泽毅微信二维码" })).toBeInTheDocument();
  });
});

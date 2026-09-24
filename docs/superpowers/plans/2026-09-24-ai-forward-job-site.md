# AI 优先求职网站 Implementation Plan

> **Execution:** 在当前任务内使用 `superpowers:executing-plans` 逐项实现，不拆分为子代理任务。步骤使用 checkbox（`- [ ]`）跟踪。

**Goal:** 将现有单文件作品站重构为面向招聘方的完整响应式个人网站，让“视觉创作 + AI 内容生产”成为清晰、可信且可交互的求职竞争力。

**Architecture:** 使用 Product Design `prototype` 模板提供的 Vite + React 静态运行时，在现有仓库根目录完成重构。内容集中在单一数据模块中，各页面区块使用独立组件；动效由 CSS、IntersectionObserver 和 requestAnimationFrame 驱动，视频与图片从 `public/` 静态资源加载，最终仍输出可由现有 Vercel 项目托管的静态站点。

**Tech Stack:** React 19、Vite 6、CSS、Vitest、Testing Library、Phosphor Icons、Node.js 内置测试、Poppler/Python（简历 PDF 生成与验证）

**Spec:** `docs/superpowers/specs/2026-09-24-ai-forward-personal-website-design.md`

## Global Constraints

- 网站姓名统一为“王泽毅”，不得残留“冯泽毅”或 `FZY`。
- 网站只服务求职；不得出现“商业合作”、客户询盘或同行合作 CTA。
- 页面顺序必须为：首屏、AI 实践、精选项目、早期作品、关于与能力、经历、求职联系、页脚。
- AI 实践必须位于首屏之后，展示公众号、视频、详情页、海报、工作流五类可交付成果。
- 所有数据、单位、经历和项目只使用现有网站、旧作品集或用户确认的信息，不虚构客户或业绩。
- 主视觉使用建筑感暖白、墨黑和深钴蓝；不使用金色、玻璃拟态或通用 AI 霓虹风格。
- 页面最小支持宽度为 320px，移动端不得依赖悬停交互。
- 所有连续动效必须遵循 `prefers-reduced-motion`。
- 不使用手写 SVG、CSS 图标、emoji 或占位图；UI 图标使用 Phosphor Icons，图片使用真实现有素材。
- 首屏外的视频和大图必须懒加载，视频必须有海报与播放失败降级。
- 设计 QA 未达到 `final result: passed` 不得交付。

## Review Focus

- 招聘方使用键盘导航时，所有导航、项目入口、AI 成果切换和联系方式都应可聚焦、可触发且焦点可见；Task 3、4、5、7 覆盖。
- 浏览器启用减少动态效果时，幕布、视差、连续缩放和粘性流程动画必须退化为静态布局；Task 7 覆盖。
- 视频自动播放被浏览器阻止或资源加载失败时，必须显示海报并保留可理解的内容；Task 3、5、7 覆盖。
- 320px 手机屏幕上导航、AI 成果、项目和求职 CTA 不得横向溢出；Task 7、8 覆盖。
- 内容数据不得出现旧姓名或商业合作文案，且 AI 实践必须处于页面第二段；Task 2、6 覆盖。

---

### Task 1: 初始化运行时并提取现有真实素材

**Files:**
- Create: `scripts/extract-legacy-assets.mjs`
- Create: `tests/legacy-assets.test.mjs`
- Create: `public/assets/legacy/manifest.json`
- Create: `public/assets/legacy/image-001.jpg` 至 `image-053.jpg`
- Move: `hero_desktop.mp4` → `public/videos/hero-desktop.mp4`
- Move: `hero_mobile.mp4` → `public/videos/hero-mobile.mp4`
- Move: `hero_poster.jpg` → `public/assets/hero-poster.jpg`
- Move: `videos/*.mp4` → `public/videos/projects/*.mp4`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `vite.config.mjs`
- Modify: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/styles.css`
- Preserve: `.openai/hosting.json`
- Preserve: `worker/index.js`
- Preserve: `scripts/prepare-sites-build.mjs`
- Preserve: `tests/sites-worker.test.mjs`

**Interfaces:**
- Produces: Vite React app shell; `extractDataImages(html: string): Array<{mime: string, bytes: Buffer}>`; numbered real-image asset library; all existing videos under `public/videos/`.

- [ ] **Step 1: Bootstrap the Product Design prototype into a scratch directory**

Run:

```bash
node /Users/lnn/.codex/plugins/cache/openai-curated-remote/product-design/0.1.55/scripts/bootstrap-prototype.mjs \
  --dest "$PWD/work/prototype-seed"
```

Expected: `work/prototype-seed/package.json`, `src/`, `worker/`, `.openai/`, and Vite configuration exist.

- [ ] **Step 2: Write the failing legacy-asset extraction test**

```js
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
```

- [ ] **Step 3: Run the test and confirm it fails**

Run: `node --test tests/legacy-assets.test.mjs`

Expected: FAIL because `scripts/extract-legacy-assets.mjs` does not exist.

- [ ] **Step 4: Implement extraction with deterministic filenames and a manifest**

```js
export function extractDataImages(html) {
  return [...html.matchAll(/data:(image\/[a-z0-9.+-]+);base64,([a-z0-9+/=]+)/gi)]
    .map((match, index) => ({
      index: index + 1,
      mime: match[1].toLowerCase(),
      bytes: Buffer.from(match[2], "base64"),
    }));
}
```

The executable path reads the current legacy `index.html`, writes `image-001.jpg`… in source order, and writes a manifest containing filename, MIME type, byte size, and SHA-256 hash.

- [ ] **Step 5: Run extraction before replacing the legacy HTML**

Run: `node scripts/extract-legacy-assets.mjs index.html public/assets/legacy`

Expected: exactly 53 JPEG files and a manifest with 53 entries.

- [ ] **Step 6: Copy the starter runtime into the repository and install dependencies**

Copy the starter's `package.json`, lockfile, Vite config, `src/`, `worker/`, `.openai/`, Sites build script, and Sites test into the repository root. Add test scripts and dependencies:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build && node scripts/prepare-sites-build.mjs",
    "test": "vitest run",
    "test:sites": "node --test tests/sites-worker.test.mjs"
  }
}
```

Run:

```bash
npm install --prefer-offline --no-audit --no-fund
npm install @phosphor-icons/react
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 7: Move existing video and poster assets under `public/`**

Use Git-aware moves so history remains readable. Preserve every existing MP4; normalize only directory and hero filenames.

- [ ] **Step 8: Run baseline verification**

Run:

```bash
node --test tests/legacy-assets.test.mjs
npm run test:sites
npm run build
```

Expected: extraction test PASS, Sites worker test PASS, and `dist/client/index.html` exists.

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json vite.config.mjs index.html src public scripts worker tests .openai
git commit -m "build: initialize modular portfolio site"
```

### Task 2: 建立求职内容模型并锁定文案约束

**Files:**
- Create: `src/content/portfolio.js`
- Create: `src/content/asset-map.js`
- Create: `src/content/portfolio.test.js`
- Create: `src/lib/content-guards.js`

**Interfaces:**
- Produces: `SITE_PROFILE`, `AI_DELIVERABLES`, `PROJECTS`, `ARCHIVE_PROJECTS`, `CAPABILITIES`, `EXPERIENCE`, `CONTACT`; `flattenText(value): string`; `validatePortfolioContent(content): string[]`.
- Consumes: real assets in `public/assets/legacy/` and `public/videos/`.

- [ ] **Step 1: Write failing content-guard tests**

```js
import { describe, expect, it } from "vitest";
import {
  AI_DELIVERABLES,
  PAGE_SECTIONS,
  SITE_PROFILE,
  validatePortfolioContent,
} from "./portfolio";

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
      "公众号内容", "AI 视频", "产品详情页", "品牌海报", "自动化工作流",
    ]);
  });

  it("passes cross-content validation", () => {
    expect(validatePortfolioContent({ SITE_PROFILE, AI_DELIVERABLES })).toEqual([]);
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test -- src/content/portfolio.test.js`

Expected: FAIL because the content module does not exist.

- [ ] **Step 3: Implement data and guards**

Define all visible copy in `portfolio.js`, including:

```js
export const SITE_PROFILE = {
  name: "王泽毅",
  initials: "WZY",
  roles: ["摄影师", "剪辑师", "视觉设计师"],
  positioning: "视觉创作 × AI 内容生产",
  statement: "以影像创作为基础，用 AI 构建可落地的内容系统。",
};

export const PAGE_SECTIONS = [
  "home", "ai-practice", "projects", "archive", "about", "experience", "contact",
];
```

`validatePortfolioContent` recursively scans for `冯泽毅`, `FZY`, `商业合作`, empty project titles, missing asset paths, duplicate IDs, and unsupported external URLs.

- [ ] **Step 4: Map real assets after visual contact-sheet review**

Create semantic keys such as `portrait`, `brandFilm`, `aiVideo`, `productDetail`, `posterSeries`, `workflow`, `wanderer`, and `emptyRealm`. Each key must resolve to an existing file; no placeholders.

- [ ] **Step 5: Run tests**

Run: `npm test -- src/content/portfolio.test.js`

Expected: PASS with five AI deliverables, job-only copy, and no missing asset mappings.

- [ ] **Step 6: Commit**

```bash
git add src/content src/lib/content-guards.js
git commit -m "feat: define job-focused portfolio content"
```

### Task 3: 构建全局页面骨架、导航与首屏

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/styles.css`
- Create: `src/components/Header.jsx`
- Create: `src/components/Hero.jsx`
- Create: `src/components/Section.jsx`
- Create: `src/components/Footer.jsx`
- Create: `src/components/app-shell.test.jsx`

**Interfaces:**
- Produces: `<Header sections />`, `<Hero profile />`, `<Section id eyebrow title />`, `<Footer />`.
- Consumes: `SITE_PROFILE`, `PAGE_SECTIONS` from Task 2; `/videos/hero-desktop.mp4`, `/videos/hero-mobile.mp4`, `/assets/hero-poster.jpg` from Task 1.

- [ ] **Step 1: Write failing semantic-shell tests**

```jsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "../App";

describe("application shell", () => {
  it("renders job navigation and corrected hero identity", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: "王泽毅" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "AI 实践" })).toHaveAttribute("href", "#ai-practice");
    expect(screen.getByRole("link", { name: "查看作品" })).toHaveAttribute("href", "#projects");
    expect(screen.queryByText("商业合作")).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test -- src/components/app-shell.test.jsx`

Expected: FAIL because Header and Hero are not implemented.

- [ ] **Step 3: Implement semantic structure and visual tokens**

Create CSS tokens:

```css
:root {
  --ink: #0b0d10;
  --paper: #f3f0e9;
  --paper-strong: #fffdf8;
  --cobalt: #1557ff;
  --muted: #73777f;
  --line: color-mix(in srgb, var(--ink) 16%, transparent);
  --content: min(1320px, calc(100vw - 64px));
  --section-space: clamp(88px, 10vw, 168px);
}
```

Header includes desktop and mobile navigation, current-section marker, menu button with `aria-expanded`, and resume link. Hero uses `<picture>`-equivalent video sources, a poster fallback, two CTAs, and a scroll cue.

- [ ] **Step 4: Add loading and playback fallbacks**

The hero begins with poster visible. On `loadeddata`, add `data-video-ready`; on `error` or rejected `play()`, retain the poster and remove video from tab order. Test these states with a small exported `resolveHeroMediaState({ loaded, failed, reducedMotion })` helper.

- [ ] **Step 5: Run tests and build**

Run:

```bash
npm test -- src/components/app-shell.test.jsx
npm run build
```

Expected: tests PASS; build has no JSX or asset errors.

- [ ] **Step 6: Commit**

```bash
git add src/App.jsx src/styles.css src/components
git commit -m "feat: build site shell and cinematic hero"
```

### Task 4: 实现 AI 实践主模块与流程交互

**Files:**
- Create: `src/components/AIPractice.jsx`
- Create: `src/components/AIPractice.test.jsx`
- Create: `src/lib/workflow.js`
- Create: `src/lib/workflow.test.js`
- Modify: `src/App.jsx`
- Modify: `src/styles.css`

**Interfaces:**
- Produces: `<AIPractice deliverables metrics />`; `getWorkflowStage(progress: number, count: number): number`; keyboard-selectable result tabs.
- Consumes: `AI_DELIVERABLES` and verified metrics from Task 2.

- [ ] **Step 1: Write failing workflow-boundary tests**

```js
import { describe, expect, it } from "vitest";
import { getWorkflowStage } from "./workflow";

describe("getWorkflowStage", () => {
  it.each([
    [-1, 0], [0, 0], [0.24, 0], [0.25, 1], [0.74, 2], [1, 3], [2, 3],
  ])("maps %s to stage %s", (progress, expected) => {
    expect(getWorkflowStage(progress, 4)).toBe(expected);
  });
});
```

- [ ] **Step 2: Write the failing accessibility test**

Render `AIPractice`; assert a tablist with five tabs, first selected by default, arrow keys change selection, and each selected tab reveals an existing image with meaningful alt text.

- [ ] **Step 3: Run tests and confirm failures**

Run: `npm test -- src/lib/workflow.test.js src/components/AIPractice.test.jsx`

Expected: FAIL because workflow helper and component do not exist.

- [ ] **Step 4: Implement the sticky AI workflow and tangible output selector**

Use a four-stage progress rail labelled “策略 / 生成 / 编辑 / 交付”. The selected deliverable controls a single preview canvas to keep the design minimal. Display the verified metrics `50%`, `1 → 8`, and `+300%` with their exact explanatory labels.

- [ ] **Step 5: Implement keyboard and reduced-motion behavior**

ArrowLeft/ArrowRight cycle tabs; Home/End jump to boundaries; click selects. With reduced motion, switching uses no transform or opacity delay.

- [ ] **Step 6: Run tests and commit**

```bash
npm test -- src/lib/workflow.test.js src/components/AIPractice.test.jsx
git add src/components/AIPractice* src/lib/workflow* src/App.jsx src/styles.css
git commit -m "feat: showcase practical AI delivery workflow"
```

### Task 5: 实现精选项目、视频查看器与早期作品档案

**Files:**
- Create: `src/components/Projects.jsx`
- Create: `src/components/Archive.jsx`
- Create: `src/components/MediaDialog.jsx`
- Create: `src/components/projects.test.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles.css`

**Interfaces:**
- Produces: `<Projects items />`, `<Archive items />`, `<MediaDialog item onClose />`.
- Consumes: `PROJECTS`, `ARCHIVE_PROJECTS`, asset map, and project videos from Tasks 1–2.

- [ ] **Step 1: Write failing project-dialog tests**

```jsx
it("opens a project dialog and returns focus when closed", async () => {
  const user = userEvent.setup();
  render(<Projects items={PROJECTS} />);
  const trigger = screen.getByRole("button", { name: /查看项目.*AI 视频/ });
  await user.click(trigger);
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  await user.keyboard("{Escape}");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
});
```

Add `@testing-library/user-event` as a dev dependency.

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test -- src/components/projects.test.jsx`

Expected: FAIL because Projects and MediaDialog do not exist.

- [ ] **Step 3: Implement selected-project rows**

Each project renders semantic image/video poster, discipline, title, role, outcome, and one “查看项目” button. Desktop alternates image/text alignment; mobile becomes a single column. Hover changes crop and title offset only; all information remains visible without hover.

- [ ] **Step 4: Implement an accessible media dialog**

Use native `<dialog>` when supported; otherwise render an ARIA dialog. Trap focus, close on Escape and backdrop click, pause video on close, restore trigger focus, and use `preload="metadata"` with posters.

- [ ] **Step 5: Implement the early-work archive**

Use 4–6 real projects selected from the old PDF and extracted assets: 《独行者》, 《空之境》, 一亩三分 VI, 美食 App UI, one poster set, and one packaging/C4D project. Label this section “早期作品 / 设计基础”，not “学生作品集”.

- [ ] **Step 6: Run tests and commit**

```bash
npm test -- src/components/projects.test.jsx
git add package.json package-lock.json src/components/Projects.jsx src/components/Archive.jsx src/components/MediaDialog.jsx src/components/projects.test.jsx src/App.jsx src/styles.css
git commit -m "feat: add project stories and early-work archive"
```

### Task 6: 完成关于、能力、经历、简历与求职联系

**Files:**
- Create: `src/components/About.jsx`
- Create: `src/components/Capabilities.jsx`
- Create: `src/components/Experience.jsx`
- Create: `src/components/JobContact.jsx`
- Create: `src/components/job-content.test.jsx`
- Create: `scripts/build-resume.py`
- Create: `public/resume-wang-zeyi.pdf`
- Modify: `src/App.jsx`
- Modify: `src/styles.css`

**Interfaces:**
- Produces: `<About />`, `<Capabilities />`, `<Experience />`, `<JobContact />`; downloadable `/resume-wang-zeyi.pdf`.
- Consumes: `SITE_PROFILE`, `CAPABILITIES`, `EXPERIENCE`, and `CONTACT` from Task 2.

- [ ] **Step 1: Write failing job-only content tests**

```jsx
render(<App />);
expect(screen.getByRole("heading", { name: "期待新的工作机会" })).toBeInTheDocument();
expect(screen.getByRole("link", { name: "下载简历" })).toHaveAttribute(
  "href", "/resume-wang-zeyi.pdf",
);
expect(screen.queryByText(/商业合作|合作咨询|客户/)).not.toBeInTheDocument();
expect(screen.getByText("AI 内容生产与工作流搭建")).toBeInTheDocument();
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test -- src/components/job-content.test.jsx`

Expected: FAIL because the sections are not implemented.

- [ ] **Step 3: Implement the four job-focused sections**

Keep About concise. Capabilities order begins with AI content/workflows, followed by photography, editing, visual design, and content strategy. Experience uses the verified timeline and outcomes from the existing site. JobContact shows only resume, email, phone, and WeChat actions.

- [ ] **Step 4: Generate the resume PDF from the same content source**

Use `scripts/build-resume.py` with ReportLab, Noto Sans CJK-compatible fonts, and content imported from a generated JSON snapshot. Produce a one-page A4 résumé with identity, target roles, AI capabilities, recent experience, education, and contact information.

Run:

```bash
python3 scripts/build-resume.py
pdfinfo public/resume-wang-zeyi.pdf | rg 'Pages:\s+1'
pdftoppm -png -f 1 -singlefile public/resume-wang-zeyi.pdf work/resume-preview
```

Expected: a non-empty one-page PDF and a legible PNG with no clipping.

- [ ] **Step 5: Run tests and commit**

```bash
npm test -- src/components/job-content.test.jsx
git add src/components src/App.jsx src/styles.css scripts/build-resume.py public/resume-wang-zeyi.pdf
git commit -m "feat: complete job profile and resume contact flow"
```

### Task 7: 实现全站动效、响应式与可访问性降级

**Files:**
- Create: `src/hooks/useReducedMotion.js`
- Create: `src/hooks/useSectionObserver.js`
- Create: `src/hooks/useScrollProgress.js`
- Create: `src/hooks/motion.test.js`
- Create: `src/components/IntroCurtain.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles.css`

**Interfaces:**
- Produces: `useReducedMotion()`, `useSectionObserver(ids)`, `useScrollProgress(ref)`, `<IntroCurtain />`.
- Consumes: section IDs and component refs from Tasks 3–6.

- [ ] **Step 1: Write failing motion-safety tests**

```js
it("returns a static progress value when reduced motion is active", () => {
  window.matchMedia = vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
  const { result } = renderHook(() => useReducedMotion());
  expect(result.current).toBe(true);
});

it("falls back to visible content when IntersectionObserver is unavailable", () => {
  delete window.IntersectionObserver;
  const { result } = renderHook(() => useSectionObserver(["home"]));
  expect(result.current.visibleIds.has("home")).toBe(true);
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test -- src/hooks/motion.test.js`

Expected: FAIL because the hooks do not exist.

- [ ] **Step 3: Implement motion primitives**

Use requestAnimationFrame-throttled scroll calculations and CSS custom properties. Intro curtain runs once per page load; hero media uses maximum 4% scale; section reveals translate no more than 32px; AI workflow uses progress stages; project hover effects stay under 300ms.

- [ ] **Step 4: Implement reduced-motion and no-JS-safe CSS**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
  [data-parallax] { transform: none !important; }
}
```

Visible content is the default; JavaScript only adds enhanced reveal classes after initialization.

- [ ] **Step 5: Add responsive breakpoints and overflow tests**

Define layouts for `>= 1200px`, `768–1199px`, and `320–767px`. At mobile widths, use a linear document flow, mobile hero video, full-width buttons, scrollable project media without horizontal page overflow, and no custom cursor.

- [ ] **Step 6: Run tests, build, and commit**

```bash
npm test -- src/hooks/motion.test.js
npm run build
git add src/hooks src/components/IntroCurtain.jsx src/App.jsx src/styles.css
git commit -m "feat: add accessible motion and responsive behavior"
```

### Task 8: 浏览器验证、设计 QA 与交付准备

**Files:**
- Create: `design-qa.md`
- Create: `work/qa/reference-option-3.png`
- Create: `work/qa/implementation-desktop.png`
- Create: `work/qa/implementation-mobile.png`
- Modify: any source files needed to resolve P0/P1/P2 findings

**Interfaces:**
- Produces: verified local preview; `design-qa.md` with `final result: passed`.
- Consumes: source visual `/Users/lnn/.codex/generated_images/01a0d2ac-1f58-7462-9d86-56daaaa63e04/exec-e188a926-9a01-4fef-b58f-5d9a2c4bd50e.png` and complete app from Tasks 1–7.

- [ ] **Step 1: Run the complete automated suite**

Run:

```bash
npm test
npm run build
npm run test:sites
git diff --check
```

Expected: all tests PASS, static build succeeds, Sites worker test succeeds, no whitespace errors.

- [ ] **Step 2: Start the local preview**

Run: `npm run dev -- --host 0.0.0.0 --port 4173 --strictPort`

Expected: Vite stays running on port 4173.

- [ ] **Step 3: Verify desktop interactions in the Codex in-app browser**

Open `http://127.0.0.1:4173/` at 1440×1024. Test navigation, mobile menu via viewport change, AI tabs with mouse and keyboard, project dialog open/close, video playback/fallback, resume download, email/phone/WeChat links, and console errors.

- [ ] **Step 4: Capture normalized evidence**

Capture full-page desktop and 390×844 mobile screenshots. Copy the selected reference into `work/qa/reference-option-3.png`. Create focused crops for hero, AI Practice, projects, and contact when full-page text is too small for comparison.

- [ ] **Step 5: Run blocking design QA**

Compare reference and implementation together. Write `design-qa.md` with source/implementation paths, viewport, dimensions, density, state, full-view and focused evidence, findings, iteration history, interaction tests, console result, and `final result`.

- [ ] **Step 6: Fix every P0/P1/P2 and repeat capture/QA**

For each iteration, record the earlier finding, source change, revised screenshot, and result. Stop only when no actionable P0/P1/P2 remains and the report says exactly:

```text
final result: passed
```

- [ ] **Step 7: Final verification commit**

```bash
git add design-qa.md src public package.json package-lock.json
git commit -m "test: pass responsive design QA"
git status --short --branch
```

Expected: clean working tree on the feature branch, all required commits present, local preview still running.

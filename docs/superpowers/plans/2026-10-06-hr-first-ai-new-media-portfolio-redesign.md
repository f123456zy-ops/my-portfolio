# HR-First AI New Media Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild 王泽毅's existing single-page site into a five-chapter, HR-first personal résumé that leads with new-media operations and AI content production while preserving real photography, editing, and visual-design evidence.

**Architecture:** Keep the existing React/Vite static application and Vercel deployment. Add a normalized portfolio content model, build four focused page surfaces plus the hero, then switch `App` to the new five-section shell before replacing the visual system and performing browser-level QA.

**Tech Stack:** React 19.2, Vite 6.4, Vitest 5, Testing Library, Phosphor Icons, CSS, static assets, GitHub, Vercel.

**Spec:** `docs/superpowers/specs/2026-10-06-hr-first-ai-new-media-portfolio-redesign.md`

## Global Constraints

- The primary title is exactly `新媒体内容运营（AI 内容方向）`.
- The supporting capability line is exactly `内容策划 · AI 内容生产 · 拍摄 · 剪辑 · 视觉设计`.
- The five section ids are `home`, `ai`, `work`, `career`, and `about`, in that order.
- Use only the supplied real project assets, portrait, résumé, QR code, and cinematic video; do not generate substitute work.
- Do not describe 王泽毅 as a director, studio, agency, commercial service, or collaboration partner.
- Keep React/Vite/static deployment; add no backend, CMS, router, database, or large animation dependency.
- Keep the original 135MB video out of the repository; retain the existing compressed desktop, mobile, and poster assets.
- Body text must be at least 16px, regular labels at least 14px, and secondary metadata at least 12px.
- Support 320px and wider viewports with no horizontal overflow.
- Respect `prefers-reduced-motion`; all core information and actions remain available without video or animation.
- Preserve verifiable metrics only: `50%`, `1 → 8`, and `+300%`.

## Review Focus

- A transient initial `video.play()` rejection must retry at `canplay`, `pageshow`, or foreground restoration without permanently switching to the poster.
- A true media load failure must preserve the project text, actions, and stable media footprint while showing a poster or neutral fallback.
- Long Chinese labels at 320px and 200% text enlargement must wrap without overlap, clipping, or horizontal scrolling.
- Keyboard users must operate AI tabs, open/close case studies, stay trapped inside the open dialog, and return focus to the original trigger.
- Repeat visits in one browser session and reduced-motion mode must skip the 0.9-second intro without delaying the résumé content.

---

### Task 1: Normalize the HR-first content model

**Files:**
- Modify: `src/content/portfolio.js`
- Modify: `src/lib/content-guards.js`
- Test: `src/content/portfolio.test.js`

**Interfaces:**
- Consumes: existing `ASSET_MAP` paths from `src/content/asset-map.js`.
- Produces: `SITE_PROFILE`, `PAGE_SECTIONS`, `AI_WORKFLOW_STAGES`, `AI_METRICS`, `AI_DELIVERABLES`, `FEATURED_CASES`, `VISUAL_ARCHIVE`, `CAREER`, `ROLE_SKILLS`, and `CONTACT`.
- `FEATURED_CASES` items expose `id`, `discipline`, `title`, `period`, `role`, `context`, `responsibilities`, `process`, `outcome`, `image`, optional `video`, and `alt`.

- [ ] **Step 1: Write the failing content-contract tests**

Add literal assertions that `PAGE_SECTIONS` equals `['home', 'ai', 'work', 'career', 'about']`, the exact title and capability line exist, the workflow has five named stages, `FEATURED_CASES` contains exactly the three approved cases, and no exported user-visible string matches `/导演|工作室|商务合作|客户咨询|合作伙伴/`.

- [ ] **Step 2: Run the content tests and verify RED**

Run: `npm test -- --run src/content/portfolio.test.js`

Expected: FAIL because the new exports and five-section contract do not exist.

- [ ] **Step 3: Add the normalized exports and validation**

Update `validatePortfolioContent(content)` to reject missing section ids, incomplete case-study fields, empty contact methods, and forbidden positioning phrases. Preserve old exports only until Task 5 switches the shell.

- [ ] **Step 4: Run the content tests and verify GREEN**

Run: `npm test -- --run src/content/portfolio.test.js`

Expected: PASS.

- [ ] **Step 5: Commit the content model**

```bash
git add src/content/portfolio.js src/content/portfolio.test.js src/lib/content-guards.js
git commit -m "feat: define HR-first portfolio content"
```

### Task 2: Build the AI content-production chapter

**Files:**
- Create: `src/components/AIContentSystem.jsx`
- Create: `src/components/AIContentSystem.test.jsx`
- Reuse: `src/lib/workflow.js`

**Interfaces:**
- Consumes: `stages`, `metrics`, and `deliverables` arrays from Task 1.
- Produces: `AIContentSystem({ stages, metrics, deliverables })`, rendering `<section id="ai">` with a five-step process, three verified metrics, and five keyboard-selectable deliverables.

- [ ] **Step 1: Write failing behavior tests**

Test that the section heading explains AI content production, five workflow stages render in order, all three literal metrics render, and the five deliverables implement a roving `tabIndex` with ArrowLeft, ArrowRight, Home, and End navigation.

- [ ] **Step 2: Run the component test and verify RED**

Run: `npm test -- --run src/components/AIContentSystem.test.jsx`

Expected: FAIL because `AIContentSystem` does not exist.

- [ ] **Step 3: Implement `AIContentSystem({ stages, metrics, deliverables })`**

Use real semantic tabs and a single tabpanel. The selected panel shows the real image, category, description, and outcome; tools remain secondary metadata. Do not add decorative arrow icons.

- [ ] **Step 4: Run the component test and verify GREEN**

Run: `npm test -- --run src/components/AIContentSystem.test.jsx`

Expected: PASS.

- [ ] **Step 5: Commit the AI chapter**

```bash
git add src/components/AIContentSystem.jsx src/components/AIContentSystem.test.jsx
git commit -m "feat: add AI content production chapter"
```

### Task 3: Build the featured-case and visual-archive chapter

**Files:**
- Create: `src/components/FeaturedCases.jsx`
- Create: `src/components/CaseStudyDialog.jsx`
- Create: `src/components/FeaturedCases.test.jsx`

**Interfaces:**
- Consumes: `cases` and `archive` from Task 1.
- Produces: `FeaturedCases({ cases, archive })` with `<section id="work">` and `CaseStudyDialog({ item, onClose })`.
- `CaseStudyDialog` renders background, role, responsibilities, process, media, outcome, and calls `onClose()` for Escape, close button, or backdrop.

- [ ] **Step 1: Write failing case-study tests**

Assert that exactly three primary cases render, clicking the first trigger opens a named dialog with all five case sections, Escape closes it and restores focus, the dialog video uses `preload="metadata"`, and the visual archive is a closed `<details>` element containing six real projects after expansion.

- [ ] **Step 2: Add the media-error regression test**

Fire an image `error` event and assert that the case title, role, result, trigger, and stable media wrapper remain visible with a `data-media-failed` state.

- [ ] **Step 3: Run the component test and verify RED**

Run: `npm test -- --run src/components/FeaturedCases.test.jsx`

Expected: FAIL because both components are missing.

- [ ] **Step 4: Implement the chapter and full-screen dialog**

Reuse the existing native-dialog/fallback pattern, focus trap, Escape handling, playback cleanup, and trigger-focus restoration. Use a `<details>`/`<summary>` disclosure for `视觉基础档案`.

- [ ] **Step 5: Run the component test and verify GREEN**

Run: `npm test -- --run src/components/FeaturedCases.test.jsx`

Expected: PASS.

- [ ] **Step 6: Commit the work chapter**

```bash
git add src/components/FeaturedCases.jsx src/components/CaseStudyDialog.jsx src/components/FeaturedCases.test.jsx
git commit -m "feat: add HR-focused project cases"
```

### Task 4: Build career evidence and personal contact chapters

**Files:**
- Create: `src/components/CareerProfile.jsx`
- Create: `src/components/ProfileContact.jsx`
- Create: `src/components/CareerProfile.test.jsx`

**Interfaces:**
- Consumes: `items`, `skills`, `profile`, and `contact` from Task 1.
- Produces: `CareerProfile({ items, skills })` with `<section id="career">` and `ProfileContact({ profile, contact })` with `<section id="about">`.

- [ ] **Step 1: Write failing career and contact tests**

Assert descending career order, education last, exactly five skill groups, AI and new-media operations before photography/editing, the exact job-seeking statement, portrait alt text, `mailto:`, `tel:`, QR image, and résumé download link. Assert the rendered chapters contain none of the forbidden positioning phrases.

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- --run src/components/CareerProfile.test.jsx`

Expected: FAIL because the combined chapters do not exist.

- [ ] **Step 3: Implement both chapters**

Render career as a semantic ordered list, skills as descriptive articles with compact tool lists, and contact methods as real links. Do not add proficiency bars, client forms, or commercial CTAs.

- [ ] **Step 4: Run the test and verify GREEN**

Run: `npm test -- --run src/components/CareerProfile.test.jsx`

Expected: PASS.

- [ ] **Step 5: Commit the career and contact chapters**

```bash
git add src/components/CareerProfile.jsx src/components/ProfileContact.jsx src/components/CareerProfile.test.jsx
git commit -m "feat: combine career evidence and job contact"
```

### Task 5: Switch the application shell, hero, and intro to the five-chapter résumé

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/Header.jsx`
- Modify: `src/components/Hero.jsx`
- Modify: `src/components/IntroCurtain.jsx`
- Modify: `src/components/Footer.jsx`
- Modify: `src/components/app-shell.test.jsx`
- Modify: `src/components/Hero.test.jsx`
- Create: `src/components/IntroCurtain.test.jsx`
- Modify: `src/components/job-content.test.jsx`
- Delete: `src/components/AIPractice.jsx`
- Delete: `src/components/AIPractice.test.jsx`
- Delete: `src/components/Projects.jsx`
- Delete: `src/components/MediaDialog.jsx`
- Delete: `src/components/Archive.jsx`
- Delete: `src/components/About.jsx`
- Delete: `src/components/Capabilities.jsx`
- Delete: `src/components/Experience.jsx`
- Delete: `src/components/JobContact.jsx`
- Delete: `src/components/projects.test.jsx`

**Interfaces:**
- Consumes: all Task 1 exports and Tasks 2–4 components.
- Produces: the final app order `Hero → AIContentSystem → FeaturedCases → CareerProfile → ProfileContact` and five-item navigation.
- `IntroCurtain` uses session key `wzy-intro-seen`; `Hero` preserves resilient muted autoplay and poster fallback.

- [ ] **Step 1: Rewrite shell tests for the approved five-chapter contract**

Assert exact navigation labels `AI 能力`, `代表项目`, `经历`, `关于`, the final section order, the exact primary role, no director-style labels, and only the header plus hero/contact résumé links intended by the final markup.

- [ ] **Step 2: Write failing intro-session tests**

Test first visit, repeat visit with `sessionStorage['wzy-intro-seen'] === 'true'`, and reduced-motion mode. The latter two must render no curtain; first visit must render `WZY` and `NEW MEDIA OPERATIONS / AI CONTENT`.

- [ ] **Step 3: Extend the hero playback regression tests**

Keep the transient-rejection retry test and add foreground restoration plus true media-error fallback. Assert hero video is muted, inline, looping, auto-playing, and uses the desktop/mobile sources and poster already in `public/`.

- [ ] **Step 4: Run shell, intro, and hero tests and verify RED**

Run: `npm test -- --run src/components/app-shell.test.jsx src/components/IntroCurtain.test.jsx src/components/Hero.test.jsx src/components/job-content.test.jsx`

Expected: FAIL against the seven-link shell and director-style hero labels.

- [ ] **Step 5: Implement the five-chapter shell and job-first copy**

Update `App`, `Header`, `Hero`, `IntroCurtain`, and `Footer`; keep active-section observation and menu accessibility. Remove chapter numbering and decorative button arrows. Keep video retry logic and add in-view pause/resume without treating an intentional pause as failure.

- [ ] **Step 6: Delete obsolete components after the new shell renders**

Remove only the files listed above and the obsolete `PROJECTS`, `ARCHIVE_PROJECTS`, `CAPABILITIES`, and `EXPERIENCE` compatibility exports after all consumers use the Task 1 names. Use `rg` to confirm no remaining imports reference the old components or exports.

- [ ] **Step 7: Run the complete test suite and verify GREEN**

Run: `npm test`

Expected: all test files pass with no warnings.

- [ ] **Step 8: Commit the final application structure**

```bash
git add src/App.jsx src/components src/content/portfolio.js
git commit -m "feat: restructure portfolio for HR review"
```

### Task 6: Apply the international editorial visual and motion system

**Files:**
- Modify: `src/styles.css`
- Modify: `index.html`
- Test: `design-qa.md`
- Evidence: `work/qa/hr-redesign-desktop.png`
- Evidence: `work/qa/hr-redesign-mobile.png`

**Interfaces:**
- Consumes: semantic classes and section ids produced by Tasks 2–5.
- Produces: the black/ivory/cobalt theme, 12-column desktop layout, single-column mobile layout, adaptive header, image-led case composition, and reduced-motion overrides.

- [ ] **Step 1: Start the existing preview and capture the failing visual baseline**

At 1440px and 390px, record the pre-style state in `design-qa.md`; expected failures are broken spacing/class coverage and the absence of the approved editorial hierarchy.

- [ ] **Step 2: Rebuild shared tokens and global typography**

Define exact color tokens for ink, ivory, white, cobalt, and neutral grays; set the display/body stacks, 12-column page grid, minimum type sizes, focus ring, selection color, and header themes.

- [ ] **Step 3: Style the hero and intro**

Keep full-bleed media and readable veil, limit intro to 0.9 seconds, prioritize the Chinese job title, and ensure every CTA remains visible on poster fallback.

- [ ] **Step 4: Style the four body chapters**

Use asymmetric editorial layouts rather than repeated cards: process rail plus active media for AI, alternating large-format cases, compact archive grid, split career/skills evidence, and portrait/contact finish.

- [ ] **Step 5: Add restrained motion and all reduced-motion overrides**

Use opacity, short translation, clipping, image scale, and section-aware header transition only. Remove continuous decorative movement and all director chapter motifs.

- [ ] **Step 6: Implement responsive states**

At 390px and 320px, use one column, touch-safe controls, no hover dependency, wrapped Chinese labels, compact header/menu, portrait video source, and zero horizontal overflow.

- [ ] **Step 7: Perform browser visual checks**

Verify desktop 1440px, mobile 390px, narrow 320px, and 200% text enlargement. Record `clientWidth === scrollWidth`, readable overlays, active tabs, archive disclosure, dialog, menu, video playback, and zero console warnings/errors.

- [ ] **Step 8: Update design QA evidence and commit**

Save the desktop/mobile screenshots and comparison evidence under `work/qa/`; update `design-qa.md` with findings and exact viewports.

```bash
git add src/styles.css index.html design-qa.md
git commit -m "feat: apply editorial new-media art direction"
```

### Task 7: Verify, integrate, deploy, and inspect production

**Files:**
- Modify if needed: `tests/hero-assets.test.mjs`
- Modify: `design-qa.md`

**Interfaces:**
- Consumes: the completed five-chapter branch.
- Produces: a tested `main` commit deployed by Vercel and verified at `https://www.8529663.xyz/`.

- [ ] **Step 1: Run fresh local verification**

Run: `npm test`

Expected: all tests pass, including autoplay retry, session intro, AI tabs, case dialog, content guards, and contact actions.

Run: `npm run build`

Expected: Vite production build exits 0 and prepares `dist/server/index.js` plus `dist/.openai/hosting.json`.

Run: `npm run test:sites`

Expected: asset, Sites worker, and Vercel tests pass.

Run: `git diff --check`

Expected: no whitespace errors.

- [ ] **Step 2: Complete final design QA**

Re-check the approved spec line by line. Resolve every P0, P1, and P2 issue; finish `design-qa.md` with `final result: passed` only after fresh desktop/mobile screenshots and console checks.

- [ ] **Step 3: Review and finish the development branch**

Use `superpowers:verification-before-completion`, then `superpowers:finishing-a-development-branch`. Fast-forward into `main` only when the main worktree is clean and the full suite passes there too.

- [ ] **Step 4: Push and wait for Vercel**

Push `main`, poll the pushed commit status until Vercel reports success, and stop on failure instead of claiming deployment.

- [ ] **Step 5: Verify the live domain**

Check HTTP 200 and correct content types for the homepage, résumé, poster, desktop video, and mobile video. In the in-app browser, verify the live five-section navigation, muted autoplay, foreground resume, mobile menu, AI tabs, case dialog, archive disclosure, résumé download, contact methods, and empty console.

- [ ] **Step 6: Deliver the live site**

Leave `https://www.8529663.xyz/#home` open as the deliverable and report the deployed commit plus exact test/build counts.

# Design QA — 王泽毅个人求职网站

## Comparison target and evidence

- Source visual truth: `/Users/lnn/.codex/generated_images/01a0d2ac-1f58-7462-9d86-56daaaa63e04/exec-e188a926-9a01-4fef-b58f-5d9a2c4bd50e.png`
- Saved source copy: `work/qa/reference-option-3.png`
- Desktop implementation: `work/qa/implementation-desktop.png`
- Mobile implementation: `work/qa/implementation-mobile.png`
- Full comparison board: `work/qa/comparison-full.png`
- Focused hero comparison: `work/qa/comparison-hero.png`
- Focused implementation evidence: `work/qa/focus-ai.png`, `work/qa/focus-projects.png`, `work/qa/focus-contact.png`
- Implementation URL: `http://127.0.0.1:4173/`

## Viewports, dimensions, and normalization

- Source board: 823 × 1912 px, conceptual long-page composition, 1× density.
- Desktop: 1440 × 1024 CSS viewport; captured browser content is 1425 × 1013 px because the in-app browser reserves native scrollbar space; 1× density.
- Mobile: 390 × 844 CSS viewport; document client width is 375 px with native scrollbar space; no horizontal overflow. The in-app browser compositor returned a half-scale content region in a 375 × 844 raw capture, so the visible 188 × 422 region was normalized to 376 × 844 with Lanczos scaling. No content was redrawn or generated during normalization.
- Additional narrow-width check: 320 × 800 viewport, 305 px client width, 305 px scroll width after the fix; horizontal overflow = 0.
- State: default light/dark alternating theme, hero at top, no dialog open; focused captures cover AI Practice, Projects, and Contact.

The source is a conceptual art-direction board rather than a same-viewport production screenshot. The comparison therefore judges hierarchy, visual language, section rhythm, typography, color, imagery, and interaction intent instead of claiming pixel-level identity.

## Full-view comparison evidence

`work/qa/comparison-full.png` places the complete source board on the left and the browser-rendered hero, AI Practice, Projects, and Contact states on the right in one comparison image. The implementation preserves the source direction: dark cinematic hero, warm ivory editorial sections, cobalt action color, large Chinese display type, strong alternating light/dark rhythm, restrained borders, and direct job-seeking calls to action.

The implementation intentionally uses real portfolio footage in the hero instead of the generated photographer portrait shown in the concept. This follows the approved specification requiring a real video or work image as the visual subject and improves evidence of actual delivery capability.

## Required fidelity surfaces

- Fonts and typography: Chinese display headings use the specified serif stack with restrained sans-serif UI and body copy. Weight, line height, hierarchy, and wrapping remain readable at desktop, 390 px, and 320 px. No truncation was found. Cross-platform self-hosting of the display face remains a P3 refinement.
- Spacing and layout rhythm: the 1320 px desktop grid, large editorial section spacing, project alternation, and mobile linear flow preserve the reference's premium pacing. Header, cards, QR block, and CTA groups remain aligned and usable.
- Colors and visual tokens: ink black, warm ivory, white, muted gray, and cobalt blue map consistently across hero, AI metrics, selected work, capabilities, and contact. Contrast is strong in the tested default and reduced-motion states.
- Image quality and asset fidelity: all visible work uses real extracted portfolio imagery or existing video/poster assets. No placeholder, emoji, CSS illustration, handcrafted SVG, or generated stand-in is used. Browser checks found no broken loaded images; below-fold lazy images load when visited.
- Copy and content: the site consistently names 王泽毅, leads with “视觉创作 × AI 内容生产,” places AI Practice directly after the hero, and uses job-seeking language only. No commercial-client or collaborator CTA remains.
- Icons: Phosphor icons share a consistent stroke family, align with text baselines, and remain legible at mobile sizes.
- States and interactions: active navigation, mobile menu, AI tabs, modal open/close, video playback, resume download, email/phone links, QR code, focus styles, and reduced-motion fallback were checked.
- Accessibility: semantic headings, tabs, dialog, labels, alt text, visible keyboard focus, 44 px mobile menu target, keyboard tab navigation, Escape close, and `prefers-reduced-motion` fallback are present.

## Findings

No actionable P0, P1, or P2 findings remain.

## Comparison history

### Iteration 1

- [P1] Projects could render as an empty dark section after direct anchor navigation.
  - Evidence: at `#projects`, browser state showed `top: 0`, `data-revealed: false`, and content opacity `0` for the 2828 px-tall section.
  - Cause: the lowest IntersectionObserver threshold was `0.12`, which a very tall section could not reach inside the reduced observation band.
  - Fix: added a `0` threshold and a regression test proving a 5% intersection reveals a tall section.
  - Post-fix evidence: `work/qa/focus-projects.png`; browser state showed `data-revealed: true`, opacity `1`, active navigation “项目”.

- [P2] A 320 px viewport had 15 px horizontal overflow.
  - Evidence: client width `305`, scroll width `320`, with a visible horizontal scrollbar.
  - Cause: `html` and `body` used a 320 px minimum width while the desktop-style browser reserved 15 px for its scrollbar.
  - Fix: changed both minimum widths to `0`; responsive content still uses the explicit 320–767 px design range.
  - Post-fix evidence: 320 px browser measurement returned client width `305`, scroll width `305`, overflow `0`; 390 px returned client width `375`, scroll width `375`, overflow `0`.

- [P2] Browser title still read “Prototype”.
  - Fix: set `lang="zh-CN"`, a job-positioning description, theme color, and title `王泽毅｜视觉创作 × AI 内容生产`.
  - Post-fix evidence: the in-app browser reports the corrected title.

### Iteration 2

- Repeated desktop, 390 px, and 320 px checks found no remaining P0/P1/P2 issue.
- Post-fix comparison: `work/qa/comparison-full.png` and `work/qa/comparison-hero.png`.

## Primary interactions tested

- Desktop anchor navigation and active-section highlighting.
- Mobile menu open, close, and navigation to AI Practice and Projects.
- AI deliverable tabs by mouse and `ArrowRight`; selected tab and roving `tabIndex` update correctly.
- Project dialog opens from the first work item and closes with Escape.
- Project video entered playing state with `paused: false`, `readyState: 4`, no media error.
- Resume URL returns HTTP 200 with `application/pdf`; PDF is one A4 page.
- Contact links resolve to `mailto:2364344055@qq.com` and `tel:17816786664`; QR image loaded at natural width 300 px.
- Console warnings/errors after the final interaction pass: none.

## Open questions

- None blocking handoff.

## Implementation checklist

- [x] Corrected long-section reveal behavior.
- [x] Removed narrow-screen page overflow.
- [x] Corrected document metadata and title.
- [x] Verified desktop, 390 px, and 320 px layouts.
- [x] Verified core mouse and keyboard interactions.
- [x] Verified resume, contact methods, video playback, and console.

## Follow-up polish

- [P3] Self-host the chosen Chinese display typeface if identical typography across macOS and Windows becomes a hard brand requirement.

final result: passed

# Design QA — 王泽毅电影感个人求职网站

## Comparison target and evidence

- Primary cinematic source visual: `/Users/lnn/.codex/generated_images/01a0d2ac-1f58-7462-9d86-56daaaa63e04/exec-c89e7a01-c1a1-4724-bfce-c0ac09c78092.png`
- Editorial system source visual: `/Users/lnn/.codex/generated_images/01a0d2ac-1f58-7462-9d86-56daaaa63e04/exec-f56beec6-f251-4c34-ac42-81ffb1bb6588.png`
- Desktop implementation: `work/qa/implementation-cinematic-desktop.png`
- Mobile implementation: `work/qa/implementation-cinematic-mobile.png`
- Full cinematic comparison: `work/qa/comparison-cinematic-full.png`
- Full editorial comparison: `work/qa/comparison-editorial-full.png`
- Implementation URL: `http://127.0.0.1:4173/`

## Viewports, dimensions, and normalization

- Cinematic source: 1487 × 1058 px.
- Editorial source: 1487 × 1058 px.
- Desktop implementation: 1269 × 856 px browser capture.
- Mobile implementation: 375 × 812 px rendered browser capture from a 390 × 844 CSS viewport. The page measured 375 px client width and 375 px scroll width, so horizontal overflow was 0.
- Full comparison boards normalize both source and implementation frames to 1265 × 844 px with proportional scaling before horizontal composition. No visual content was redrawn or generated during normalization.
- State: hero at top after the intro curtain; desktop comparison shows the full cinematic hero, while mobile evidence verifies the responsive portrait crop and compact navigation.

The approved direction combines two references rather than copying a single page: the hero adopts the full-bleed cinematic title sequence, while the header and following sections use the editorial reference's whitespace, grid, typography, and cobalt accent. Fidelity is therefore judged against the approved visual system, hierarchy, motion language, and responsive intent.

## Full-view comparison evidence

`work/qa/comparison-cinematic-full.png` compares the primary cinematic source with the browser-rendered hero. Both use full-bleed moving imagery, a dark filmic veil, oversized lower-left display type, restrained chapter metadata, and a high-contrast cobalt action.

`work/qa/comparison-editorial-full.png` compares the editorial source with the same implementation state. Its influence is deliberately expressed through the adaptive light header and the warm-ivory content system below the hero rather than through a white frame around the film image.

The desktop hero is the focused comparison surface because it contains the highest-risk elements: live footage, layered title typography, navigation contrast, chapter metadata, and CTA placement. The mobile implementation capture is the responsive focused evidence because the portrait crop, typography wrapping, navigation menu, and no-overflow behavior cannot be judged from the desktop reference alone.

## Required fidelity surfaces

- Fonts and typography: the hero uses oversized condensed sans-serif display type with a mask reveal; content sections retain the large editorial serif hierarchy. Body/UI text uses a neutral sans-serif stack. The tested desktop and mobile states show no clipping or unintended truncation.
- Spacing and layout rhythm: the hero follows a strict left/right cinematic grid, while the body preserves generous editorial whitespace. Chapter labels, footer metadata, title, and CTAs remain aligned at both breakpoints.
- Colors and visual tokens: ink black, warm ivory, white, muted gray, and cobalt blue are applied consistently. The header transitions from translucent dark over video to a light editorial surface after leaving the hero.
- Image and video quality: the supplied HEVC master was converted into web-safe H.264 variants: 1920 × 1080 desktop and 720 × 1280 mobile, both silent, fast-start, and below the repository's asset-size guard. A 1920 × 1080 poster provides the first-frame and reduced-motion fallback. No placeholder media is used.
- Copy and content: the site consistently names 王泽毅, prioritizes AI 内容生产, and remains explicitly job-seeking. The hero adds `CHAPTER 01 / 04`, `VISUAL STORY / 2026`, and a direct resume CTA without introducing commercial-client or partner language.
- Motion: the intro uses sliding film panels; the hero combines title masking, subtle scroll scale/shift, and controlled metadata reveals; section entrances use opacity, blur, clip-path, and translation. Motion is restrained to hierarchy and transition moments rather than applied continuously to every element.
- Interactions: hero video autoplay, mobile menu, section-aware header theme, anchor navigation, hover motion, resume CTA, and reduced-motion fallback are preserved.
- Accessibility: semantic headings, labeled navigation controls, visible focus styles, keyboard-operable links/menu, high-contrast overlays, and `prefers-reduced-motion` fallbacks remain present.

## Findings

No actionable P0, P1, or P2 visual mismatch remains.

## Comparison history

### Iteration 1

- The first complete comparison pass found no actionable P0/P1/P2 mismatch, so no corrective visual loop was required.
- The source board's intentional differences were verified as hybrid-direction choices: full-bleed film hero from the cinematic source and editorial grid/header behavior from the second source.
- Responsive inspection confirmed that the dedicated portrait source is selected on mobile and that the title, CTA, metadata, and menu stay within the viewport.

## Primary interactions tested

- Intro curtain renders `WZY` and `VISUAL STORY / 2026`, then clears the hero.
- Desktop and mobile hero video reached `readyState: 4` and played with `paused: false`.
- The desktop and mobile `<source>` variants were each selected at the intended breakpoint during testing.
- Header theme changed from `dark` on the hero to `light` in the AI Practice section.
- Mobile menu opened with `aria-expanded=true` and exposed readable navigation items.
- Desktop, 390 px mobile, and no-horizontal-overflow states were inspected.
- Browser console warnings/errors after the final local interaction pass: none.

## Open questions

- None blocking deployment.

## Implementation checklist

- [x] Replaced the cover background with the supplied video.
- [x] Added web-optimized desktop, mobile, and poster assets.
- [x] Implemented the approved cinematic/editorial hybrid direction.
- [x] Added higher-end intro, hero, section, and hover motion.
- [x] Preserved job-seeking positioning and AI-first information hierarchy.
- [x] Verified responsive layout, mobile navigation, video playback, adaptive header, and console.

## Follow-up polish

- [P3] The source footage contains occasional embedded film typography such as `ESSENCE`. The dark veil keeps the portfolio title legible, but a future custom showreel without baked-in text would provide absolute typographic control.

final result: passed

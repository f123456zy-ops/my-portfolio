# Design QA — 王泽毅求职型个人网站整体改版

## Approved direction

The implemented direction is `国际编辑设计 × AI 新媒体个人简历`. It uses the work-first hierarchy and restrained image rhythm associated with [Hiro Murai](https://hiromurai.com/), the asymmetric editorial composition of [Sagmeister](https://sagmeister.com/work/), and the archive logic of [Wim Wenders](https://www.wim-wenders.com/photo/) without copying their identity, project structure, or assets.

The visual system is deliberately job-first: the hero names the target role, AI content production follows immediately, projects explain responsibility and results, and the final chapter presents direct hiring contact information. No director, studio, client-acquisition, or partner language remains.

## Evidence

- Desktop viewport target: 1440 × 900 CSS px.
- Desktop captured page area: `work/qa/hr-redesign-desktop.png` — 1425 × 891 px after scrollbar and browser viewport chrome.
- Mobile viewport target: 390 × 844 CSS px.
- Mobile captured page area: `work/qa/hr-redesign-mobile.png` — 375 × 812 px after scrollbar and browser viewport chrome.
- Narrow responsive check: 320 × 720 CSS px.
- True 200% text enlargement: 320 × 720 CSS px with a 32 px root font.
- Local implementation URL: `http://127.0.0.1:4173/`.

## Baseline and corrective loop

### Baseline

After the five-chapter React shell replaced the previous sections, the legacy stylesheet only covered the former component names. The desktop baseline showed a styled video hero followed by a long blank ivory page because the new AI, case, career, and contact classes had no visual system and were held by incompatible reveal rules.

### Corrections applied

- Replaced the legacy stylesheet with an ink, ivory, cobalt, and neutral-gray token system.
- Built a 12-column desktop grid and a true single-column mobile flow.
- Reframed the hero around name, exact target role, capability line, city, value statement, project entry, and résumé entry.
- Removed chapter numbering, film-credit labels, decorative arrows, and repeated card styling.
- Built a five-stage AI rail, evidence metrics, real deliverable tabs, asymmetric project cases, collapsible visual archive, split career/skills evidence, and cobalt portrait/contact finish.
- Limited motion to the 0.87-second session intro, short mask/opacity/translation reveals, image scale on intent, and section-aware navigation transitions.
- Added complete reduced-motion overrides and preserved all content on poster/video failure.
- Tightened the narrow hero so both project and résumé actions remain in the 320 px first viewport.
- Kept a compact résumé action persistently visible in the mobile header.
- Added shrinkable project/contact containers, long-label wrapping, and a lighter blue text token for accessible contrast on dark surfaces.
- Guarded session storage access so privacy-blocked storage cannot interrupt the application render.

## Visual review

- Typography: high-contrast Songti-style display typography leads Chinese names and headings; neutral sans-serif text carries all operational information. Main copy is at least 16 px, standard labels are 14 px, and only secondary metadata uses 12 px.
- Composition: the desktop body uses 12 columns, deliberate asymmetry, large image surfaces, strong negative space, and project-specific proportions. Mobile removes offsets and hover dependency.
- Color and contrast: black media chapters, ivory reading chapters, cobalt state/action surfaces, white text, and neutral metadata are consistent across all five chapters.
- Media: only the supplied hero video, existing project assets, portrait, and QR code are used. All images retain explicit stable media areas and useful alt text.
- Hiring clarity: the exact role `新媒体内容运营（AI 内容方向）` and capability line are readable on the hero; the résumé is available in the header, hero, and final contact chapter.

## Interaction and responsive checks

- 1440 px: `clientWidth === scrollWidth` at 1425 px; no horizontal overflow.
- 390 px: `clientWidth === scrollWidth` at 375 px; hero height is exactly 844 px; the résumé action ends at 557.5 px and remains in the first viewport.
- 320 px: `clientWidth === scrollWidth` at 305 px; hero height is 720.43 px; the résumé action begins at 574.43 px and remains operable in the first viewport.
- True 200% text enlargement at 320 px: with a 32 px root font, `clientWidth === scrollWidth` at 305 px; case media/copy and contact content remain within the 292 px page column, while the persistent résumé action remains visible.
- Mobile menu: toggles to `aria-expanded="true"` and displays the four approved navigation labels.
- AI tabs: selecting `02 视频` updates both selected state and the single tabpanel to `AI 视频`.
- Case layer: opens as a named modal, renders all five required evidence sections, and uses `preload="metadata"` for video.
- Visual archive: expands to six real early projects.
- Hero media: desktop and mobile reached `readyState: 4` with `paused: false`; moving to a body chapter intentionally paused the offscreen video.
- Local console: a new browser tab loaded after the production build reported zero warnings and zero errors.

## Findings

- P0: none.
- P1: none.
- P2: none after correcting enlarged-text clipping, dark-surface text contrast, and the persistent mobile résumé action found during independent review.
- P3: the supplied hero footage includes its own embedded English typography. The overlay remains legible across tested frames; a future clean master would provide more control but is not required for this release.

## Final status

Local and production visual checks passed. The deployed domain returned the expected homepage, résumé, poster, and desktop/mobile video content types; muted autoplay and all primary interactions were rechecked in the live browser with no console warnings or errors.

final result: passed

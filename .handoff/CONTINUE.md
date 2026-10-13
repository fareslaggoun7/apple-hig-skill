# Continue the Apple HIG public gallery and README update

The user requested continuation in a cloud session with **GPT-6.1 Sol, Extra High**. Preserve that choice; do not pretend the model was set if the surface cannot verify it.

## User requirements

- Public repository: https://github.com/fareslaggoun7/apple-hig-skill
- Add pictures of interfaces actually designed using the skill: buttons, windows, dialogs, screens, and other components.
- Add runnable animation examples and animated previews.
- Every indexed topic should have a concrete example; distinguish a real browser prototype from simulated hardware/payment/SDK behavior.
- Improve README substantially. The user clarified that the **beginning** should resemble the presentation quality of https://github.com/affaan-m/ECC: a designed hero/banner, compact badges, and prominent install/action links. The attached screenshots showed a branded dashboard-like hero with columns and metrics, followed by badges and install navigation. Create original project visuals and truthful metrics; do not copy ECC's artwork or invent sponsors, rankings, download counts, apps, or translations.
- Preserve Claude.ai ZIP installation, Claude Code, and Codex support. Earlier authorization includes publishing this work to the public repository; finish and verify it.

## Stable published state

- `main` currently has commit `bcbdcdd84441727c079b9b9c11bcb72e165446d6` (tree `39a194700353ec10c0b10ce051036dd4d5ad5db5`). Check the current remote before writing.
- Release v1.0.0 is published with `apple-hig.zip` and `SHA256SUMS`.
- Source snapshot: 173 HIG pages across six families, original short source-linked cards, read-only live fetch and drift tools.
- Existing guide, original diagrams/screenshots, prompt library, worked reviews, a small web editor demo, portable installer, MIT license/NOTICE.
- Nine Python tests passed. All six CI jobs (Windows/macOS/Linux × Python 3.10/3.12) passed on the stable commit.
- An earlier CI failure was fixed: ZIP content comparison must not require platform-dependent file order. `tools/package.py` now sorts on POSIX path strings and checks equivalent entries independent of archive order.
- The requested interpretation error below 0.01% is **unproven and not guaranteed**. Preserve honest coverage notes.

## Current checkpoint (unfinished, deliberately separate from main)

- `tools/build_gallery_catalog.py` explicitly maps all 173 topics to runnable example routes. Collection pages become topic browsers; leaves have concrete scenarios. It generates `examples/gallery/catalog.json` and currently has 121 named example kinds. These are routes/specifications, not 121 finished implementations.
- `examples/gallery/index.html` and `gallery.css` provide a responsive original interface library layout, source links, search/category controls, an interactive stage, and reduced-motion controls. The HTML references `gallery.mjs`, which **does not exist yet**.
- `examples/gallery/motion.mjs` provides ten motion experiment names, original HTML frame markup, a requestAnimationFrame playback scaffold, a pure spring step function, and frame rendering. **Known defect to fix:** the named `spring-retarget` preview currently uses smoothstep phase interpolation rather than the spring; implement genuine continuous position/velocity retargeting before claiming spring behavior. The pure `springStep` can support the live drag/snap specimen.
- Gallery is not yet runnable; no new screenshots, GIFs, banner, Pages deployment, README rewrite, or v1.1.0 release have been completed. Do not report this checkpoint as finished.

## Planned implementation

1. Read `skills/apple-hig/SKILL.md`, relevant cards, and current official HIG sections. Motion examples should be purposeful, interruptible, brief, and have a meaningful reduced-motion alternative. Example CSS/timing values are original choices, not Apple specifications.
2. Implement `gallery.mjs` and explicit reusable specimen renderers for all catalog kinds. Reuse renderers where appropriate while keeping topic scenarios meaningful. No generic placeholder fallback. Include functioning buttons, toggles, sliders, forms, menus, tables, tabs/sidebar/split navigation, windows/panels, actual accessible dialogs/sheets/popovers, loading/error/empty states, screens, drawing/drag, and clearly labeled integration simulations.
3. Ensure keyboard/focus and cancellation behavior, no horizontal overflow, optional audio, and cleanup of timers/animations when switching examples. No external dependencies are necessary for the browser examples.
4. Complete ten motion experiments (spring retarget, sheet, anchored popover, press feedback, toggle, progress, tab, disclosure, reorder, reduced alternative). Capture actual UI screenshots and GIF previews from the runnable examples. Do not substitute generic marketing artwork for real examples. Parameterized static frame routes can reuse the exact live renderer for recording.
5. Produce an original polished README opening inspired by ECC's structure: a dark, precise blue/cyan hero, project mark, truthful 173-topic / six-family / ten-motion counts, three visual columns, and clearly supported clients. Add real CI/license/release badges and prominent Install / Gallery / Examples links. Do not fake popularity or sponsor badges.
6. Add an exhaustive topic-to-example index, useful screenshots and animation previews, complete local run instructions, and source links. Keep deeper instructions in docs; README should remain easy to scan.
7. Optionally publish the static gallery via GitHub Pages if the available tools and authorization allow it; verify the actual public URL before linking it as live. Otherwise provide a verified local runnable gallery and honest instructions rather than a dead live link.
8. Add meaningful Node/Python tests for catalog coverage, renderer registration, spring stability/continuity, reduced-motion behavior, links/assets, and distribution freshness. Extend CI to run necessary checks. Run browser interaction and visual QA.
9. Add a skill reference that routes users to the runnable examples; update SKILL.md only as needed, rebuild the portable ZIP, preserve existing installation semantics. Publish completed work and a new release after CI passes. Keep v1.0.0 intact.

## Operational notes

- GitHub connector can create blobs/trees/commits, update refs, and edit files. It cannot create repositories or releases in this tool set; the repository already exists. Release v1.0.0 was created through the signed-in browser.
- Cloud has no access to the original local Windows workspace. Everything required for continuation is in this checkpoint branch and the public repository; clone it.
- Do not depend on old local paths, scratch scripts, account credentials, or the user staying online.
- Update the user concisely during work and persist until the requested README, visuals, examples, and public publication are complete.

<p align="center"><img src="docs/assets/gallery-hero.png" alt="Apple HIG Skill: an original dark banner with real control, workspace, and motion specimens; 173 topics, 54 workshop studies, 24 motion examples" width="1200"></p>

<p align="center">
  <a href="https://github.com/fareslaggoun7/apple-hig-skill/actions/workflows/validate.yml"><img src="https://github.com/fareslaggoun7/apple-hig-skill/actions/workflows/validate.yml/badge.svg" alt="Portable skill and gallery CI"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-142d4e" alt="MIT license"></a>
  <a href="https://github.com/fareslaggoun7/apple-hig-skill/releases/latest"><img src="https://img.shields.io/github/v/release/fareslaggoun7/apple-hig-skill?color=236c82" alt="Latest published release"></a>
  <img src="https://img.shields.io/badge/helper-Python_3.10%2B-386a8c" alt="Python 3.10 or newer for the helper">
</p>

<p align="center">
  <a href="docs/INSTALLATION.md"><strong>Install the skill</strong></a> ·
  <a href="https://github.com/fareslaggoun7/apple-hig-skill/releases/latest"><strong>Download ZIPs</strong></a> ·
  <a href="examples/gallery/README.md"><strong>Run the gallery</strong></a> ·
  <a href="examples/gallery/TOPICS.md"><strong>All 173 examples</strong></a> ·
  <a href="examples/gallery/MOTION.md"><strong>Motion lab</strong></a> ·
  <a href="examples/gallery/WORKSHOPS.md"><strong>Platform workshops</strong></a>
</p>

# Apple HIG Skill

**Bring Apple's Human Interface Guidelines into Claude and Codex—and try the decisions in a real browser.**

A portable Agent Skill for designing, implementing, and reviewing interfaces with traceable Apple sources. It combines **173 indexed topics**, concise platform-aware guidance, live official-source lookup, and an original interactive gallery. The gallery has a concrete task and a rendered picture for every topic, plus **54 studies across ten ordered platform/design workshops** and 24 motion examples with animated previews.

The design workflow now starts with the person's task, compares appropriate structures, records consequential decisions with their sources, and tests the relevant states and accessibility behavior. It includes platform-aware planning and an evidence checker that flags incomplete source records and missing check evidence. [Design playbook](skills/apple-hig/references/design-playbook.md) · [Quality evidence](docs/QUALITY.md)

## Install once. Use in your client.

| Client | Install | First prompt |
| --- | --- | --- |
| Claude.ai / Claude Desktop chat | Download **apple-hig.zip** from [the latest release](https://github.com/fareslaggoun7/apple-hig-skill/releases/latest). Upload it in **Customize → Skills → + → Create skill → Upload a skill**, then enable it. | `Use the apple-hig skill to review this iPad interface.` |
| Claude Code | Clone this repository, then `python tools/install.py --target claude-code` | `/apple-hig Review this interface for macOS.` |
| Codex | Clone this repository, then `python tools/install.py --target codex` | `$apple-hig Review this interface for iOS.` |

```sh
git clone https://github.com/fareslaggoun7/apple-hig-skill.git
cd apple-hig-skill
python tools/install.py --target codex
```

Choose `claude-code` for Claude Code. On macOS/Linux, use `python3` if needed. The skill and helper use Python's standard library; no API key is required. Markdown guidance can be read without Python. [Installation details](docs/INSTALLATION.md) cover client prerequisites, custom paths, and safe updates. Claude's [documented skill upload flow](https://support.claude.com/en/articles/12512180-use-skills-in-claude) may be affected by account or organization controls.

## Interfaces you can actually try

The gallery includes working controls, screens, windows, real modal dialogs and sheets, navigation, forms, loading recovery, drawing, and drag interactions. It identifies simulated hardware, payments, accounts, and SDK integrations directly in the example. Those models do not invoke Apple services or make transactions.

<table>
  <tr>
    <td width="50%"><img src="docs/assets/specimen-buttons.png" alt="Actual browser specimen: primary, secondary, destructive, and disabled buttons"><br><strong>Controls with explicit actions</strong></td>
    <td width="50%"><img src="docs/assets/specimen-windows.png" alt="Actual browser specimen: a document window with selection, save, minimize, restore, and inspector controls"><br><strong>Windows that preserve context</strong></td>
  </tr>
  <tr>
    <td><img src="docs/assets/specimen-sheets.png" alt="Actual modal sheet: edit a note title, cancel, or save"><br><strong>Focused tasks with a clear exit</strong></td>
    <td><img src="docs/assets/specimen-designing-for-ios.png" alt="Actual phone-shaped browser adaptation: a readable story selection screen"><br><strong>Concrete screen examples</strong></td>
  </tr>
</table>

Run from the repository root:

```sh
python -m http.server 8000 --directory examples/gallery --bind 127.0.0.1
```

Enter `http://127.0.0.1:8000` in your browser. Search or choose a family; each route has a task, its Apple source, dated guidance, and scope. Use `?topic=buttons`, `?topic=sheets`, or `?topic=motion` to start directly. No build step, remote fonts, framework, or runtime packages are needed. The separate **apple-hig-gallery.zip** can also run after extraction.

[Gallery guide](examples/gallery/README.md) · [Exhaustive topic-to-example index and pictures](examples/gallery/TOPICS.md) · [Original small editor demo](examples/web-adaptation/README.md)

## Ten topics, worked through in order

Start with **iOS → iPadOS → macOS → watchOS → iPhone Duo → Design principles → Games → tvOS → visionOS → Getting started**. The [54-study workshop guide](examples/gallery/WORKSHOPS.md) pairs working tasks and actual pictures with a [portable implementation workflow](skills/apple-hig/references/workshops/README.md) for each topic.

Edit and retain drafts, recover focus, undo changes, adapt connected workspaces, run a watch timer, play a small game, navigate a directional TV grid, and compare spatial contexts. Each study includes its exact Apple source, an explicit task, text/layout controls, reset, and a direct link. All eight current design principles have their own study. Browser illustrations keep native API, hardware and accessibility claims explicit.

<table><tr>
<td width="50%"><img src="examples/gallery/workshop-previews/designing-for-ipados--workspace.webp" alt="Actual iPadOS browser workspace with collection navigation and an editable document"><br><strong>Connected work without lost drafts</strong></td>
<td width="50%"><img src="examples/gallery/workshop-previews/designing-for-tvos--focus.webp" alt="Actual TV content grid with original illustrated stories and directional focus"><br><strong>Focus with a clear way back</strong></td>
</tr></table>

## Motion that explains a change

Explore **24 examples** with replay, pause/resume, reset, a keyboard-accessible scrubber, playback speed, and optional looping. Retarget the spring without losing position or velocity. Changing Reduce Motion preserves your selected example and timeline; completed transitions hold their result.

Click a still preview to open its recording. The recordings play twice and stop; the documentation does not autoplay them.

<table>
  <tr>
    <td width="50%"><a href="docs/assets/motion-spring-retarget.gif"><img src="examples/gallery/motion-previews/spring-retarget.webp" alt="Still frame of the retargetable spring; open the recording"><br><strong>Continuous spring retargeting →</strong></a></td>
    <td width="50%"><a href="docs/assets/motion-shared-element.gif"><img src="examples/gallery/motion-previews/shared-element.webp" alt="Still frame of a landscape retained through a layout change; open the recording"><br><strong>Shared content and context →</strong></a></td>
  </tr>
  <tr>
    <td><a href="docs/assets/motion-undo-removal.gif"><img src="examples/gallery/motion-previews/undo-removal.webp" alt="Still frame showing a removed item and its undo opportunity; open the recording"><br><strong>Removal with undo →</strong></a></td>
    <td><a href="docs/assets/motion-reduced-motion.gif"><img src="examples/gallery/motion-previews/reduced-motion.webp" alt="Still frame of a stationary update; open the recording"><br><strong>A stationary reduced alternative →</strong></a></td>
  </tr>
</table>

[All 24 motion examples and previews](examples/gallery/MOTION.md) cover navigation, presentations, selection, loading, feedback, content changes, and recovery. Each has an explicit purpose, a reduced alternative, and an Apple source section. The [portable motion workflow](skills/apple-hig/references/motion-design.md) applies these decisions to your own interface. Timings, easing, dimensions, and spring constants are original teaching choices. Native animation fidelity and comfort require target-platform testing.

## From a source to a decision

```text
Use the apple-hig skill to review this iPad document editor.
Check navigation, keyboard use, resizable windows, and text expansion.
For each finding, cite the applicable Apple section and explain the user impact.
```

Or explore the sources directly:

```sh
python skills/apple-hig/scripts/hig.py search "navigation" --platform ipados
python skills/apple-hig/scripts/hig.py show sidebars
python skills/apple-hig/scripts/hig.py fetch sidebars --outline
python skills/apple-hig/scripts/hig.py fetch sidebars --section Best-practices
```

The six reference families cover getting started, foundations, patterns, components, inputs, and technologies. Each indexed page includes source URLs, section anchors, platform metadata, and fingerprints. Offline cards remain usable when live access to `developer.apple.com` is unavailable. `refresh` reports drift without silently rewriting guidance.

[Prompt library](examples/prompts.md) · [Worked reviews](examples/review-walkthrough.md) · [Usage](docs/USAGE.md) · [Architecture](docs/ARCHITECTURE.md)

## A design process you can inspect

For substantial work, the assistant defines task success, reads applicable current sections, compares plausible structures, implements relevant states/exits, and inspects/tests/corrects the result. Apple recommendations, original product choices, SDK contracts, and unresolved claims stay explicit in the decision record.

```sh
python skills/apple-hig/scripts/hig.py plan --platform ipados --goal "Edit and recover a document" --topic undo-and-redo --output work/design/record.json
python skills/apple-hig/scripts/hig.py check work/design/record.json
```

The generated plan is unfinished. Fill its context, decisions, exact source evidence, and actual test results before checking it. The checker validates evidence integrity and review completeness; it cannot certify guideline interpretation or native behavior. [Thirty challenge prompts and independent-evaluation protocol](evaluations/README.md) make the remaining accuracy work reproducible.

## Coverage and evidence

The **14 October 2026** source snapshot covers all **173/173** pages discovered in the recorded English HIG topic tree. The gallery covers all 173 routes, including 54 studies in ten ordered workshops; related topics share appropriate controls while retaining their own task and source. Topic presence does not establish exhaustive interpretation of every sentence, accurate native geometry, or SDK conformance.

**A semantic error rate below 0.01% is unproven and is not guaranteed.** [Coverage](docs/COVERAGE.md) documents source ambiguities and unverified media semantics. Browser validation covers all routes at desktop and phone widths and representative keyboard, cancellation, validation, search, loading, and motion interactions. It does not establish full accessibility conformance, model response quality, Apple-device behavior, or a live installation in your Claude account.

A fresh official crawl on 14 October 2026 reached all 173 pages and detected updates on CarPlay, Live Activities, and Widgets; source readback refreshed their cards and the source records. No page failed or introduced unfamiliar nodes. That is source inventory/review evidence. The requested [18-cohort study](evaluations/matrix-report.json) has zero qualifying independent task evaluations; source hashes and regression tests do not establish the requested numerical accuracy. No workflow can establish a universally best design for every future user and model. [Executed checks and remaining blockers](docs/TESTING.md) distinguish software verification from empirical proof.

## Contribute

```sh
python -m unittest discover -s tests -v
node --test tests/gallery.test.mjs
python tools/build_gallery_catalog.py --check
python skills/apple-hig/scripts/hig.py audit
python tools/package.py --check
python tools/package_gallery.py --check
```

[Contributing](CONTRIBUTING.md) explains source updates and distribution regeneration. [Gallery verification](examples/gallery/README.md#verification-and-regeneration) covers exhaustive browser checks, screenshots, and GIF generation. [Changelog](CHANGELOG.md) records releases.

## License and attribution

Original code, writing, and illustrations are [MIT licensed](LICENSE). Apple owns its documentation and trademarks; this project does not redistribute Apple articles or official artwork. This is an independent community project, with no affiliation with or endorsement by Apple, Anthropic, or OpenAI. See [NOTICE](NOTICE).

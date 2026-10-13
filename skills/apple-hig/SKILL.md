---
name: apple-hig
description: Design, implement, or review interfaces using Apple's Human Interface Guidelines, with platform-specific guidance, a complete indexed HIG topic snapshot, and live source verification. Use for Apple-platform UI or explicitly requested HIG-based web adaptation.
license: MIT
metadata:
  snapshot-date: "2026-10-13"
  source: "https://developer.apple.com/design/human-interface-guidelines"
---

# Apple Human Interface Guidelines

Use Apple's official HIG to make concrete design decisions for the user's target platform. The bundled guidance covers all 173 English pages in the recorded root topic tree; it is concise original interpretation, with sources for deeper verification. It does not certify implementation correctness or a numerical error rate. Read [scope and evidence limits](references/evidence-and-quality.md) when accuracy, completeness, source conflicts, or updates matter.

## Establish the design context

Use the conversation and project to identify the platform, minimum OS, device/window contexts, input methods, accessibility needs, and requested outcome. Ask only for missing choices that materially change the work. For cross-platform work, keep platform decisions distinct. For web work, label translations as adaptations and use web units, semantics, input behavior, and accessibility standards; Apple-native measurements and API behavior do not transfer automatically.

## Find and verify the applicable guidance

Resolve paths relative to this skill directory, even when the assistant starts elsewhere. Python 3.10+ is enough; no packages or API keys are required. On macOS/Linux use `python3` if needed. Claude chat can read the cards with code execution enabled; use available browsing or the dated snapshot if its sandbox blocks Apple network access.

```text
python scripts/hig.py search "navigation" --platform ipados
python scripts/hig.py show sidebars
python scripts/hig.py fetch sidebars --outline
python scripts/hig.py fetch sidebars --section Best-practices
```

The search is lexical; use related terms or the category files if results are incomplete. Platform filters reflect page-level metadata, not applicability of every paragraph. `show` returns the offline decision card. `fetch` reads current Apple DocC, reports source drift, and preserves table cells, section ancestry, and tab labels. It defaults to an outline; select an exact returned anchor for details. Introductory content uses `Overview`. A section result may be truncated; narrow the section or raise the word limit before interpreting omitted content.

Read the target platform page, relevant foundation cards, and the component/pattern/technology cards that govern the actual task. Load only applicable references:

| Need | Reference |
| --- | --- |
| Platform conventions, games, design principles | [Getting started](references/getting-started.md) |
| Accessibility, visual foundations, writing, privacy, spatial design | [Foundations](references/foundations.md) |
| Task flows and behavioral patterns | [Patterns](references/patterns.md) |
| Navigation, controls, presentation, content, status, system surfaces | [Components](references/components.md) |
| Touch, keyboard, pointer, gaze, remotes, hardware controls | [Inputs](references/inputs.md) |
| System integrations and specialized experiences | [Technologies](references/technologies.md) |

Use [the catalog](references/catalog.json) for exact source URLs, platform metadata, topic relationships, anchors, and fingerprints. The root overview is in [Getting started](references/getting-started.md#human-interface-guidelines).

Verify current official sections before relying on exact sizes, spacing, typography, contrast, platform availability, system behavior, or version-sensitive appearance such as Liquid Glass. Verify SDK/API claims in official developer documentation separately. The HIG is design guidance, not a complete API or App Store policy contract. If retrieval fails, use the snapshot with its date and state which important claims remain unverified.

## Apply the evidence

Translate relevant guidance into the requested design or implementation. Prefer appropriate native components when they fit the task, and retain the user's product goals and existing design system. Use HIG recommendations with their original force: a suggestion is not a universal requirement. Preserve platform and context qualifiers. A supported-platform tag alone does not establish control availability.

Tie consequential decisions to the applicable topic and section. Distinguish what Apple explicitly recommends, what the current implementation demonstrably does, and what you propose. When prose, tables, or pages disagree, show the conflict, follow the most specific applicable evidence when justified, and leave unresolved details explicit. Do not silently combine conflicting numeric values.

For visual judgments, inspect the relevant official examples and the actual interface. Text extraction does not establish image/video fidelity. Do not infer unseen colors, geometry, animations, or proprietary internals from the topic summaries.

## Review the result

Check the paths and states affected by the change: entry, primary task, navigation/back, cancellation, interruption, loading/empty/error, and recovery as applicable. Check relevant platform contexts, input/focus behavior, accessibility settings, text expansion/localization, and light/dark appearances. Choose checks proportionate to the work; do not impose irrelevant patterns on every screen.

For a review, connect each finding to visible or code evidence, its user impact, a source section, and a concrete correction. For implementation, complete the authorized work and test the changed behavior. Report which contexts were actually checked and which need device/runtime validation. Do not represent a static screenshot as proof of accessible behavior or native interaction fidelity.

## Maintain the snapshot

```text
python scripts/hig.py audit
python scripts/hig.py refresh --report work/hig-drift.json
```

`audit` validates local structure and evidence links. `refresh` follows the current official HIG graph and reports changed/new/unreached pages without overwriting authored guidance. Review changed sources, update the affected cards and catalog together, and rerun the audit. A failed fetch or unfamiliar schema leaves coverage incomplete. A matching fingerprint proves source-byte or selected-payload agreement, not correctness of the interpretation.

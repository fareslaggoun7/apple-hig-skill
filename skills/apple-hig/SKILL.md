---
name: apple-hig
description: Design, implement, or review interfaces using Apple's Human Interface Guidelines, with platform-aware design planning, exact-section evidence, state/accessibility review, and honest accuracy evaluation. Use for Apple-platform UI or explicitly requested HIG-based web adaptation.
license: MIT
metadata:
  snapshot-date: "2026-10-14"
  source: "https://developer.apple.com/design/human-interface-guidelines"
---

# Apple Human Interface Guidelines

Use Apple's official HIG to make concrete design decisions for the user's target platform. The bundled guidance covers all 173 English pages in the recorded root topic tree; it is concise original interpretation, with sources for deeper verification. It does not certify implementation correctness or a numerical error rate. Read [scope and evidence limits](references/evidence-and-quality.md) when accuracy, completeness, source conflicts, or updates matter.

## Default design quality loop

For a new screen, substantial change, or thorough review, read [the design playbook](references/design-playbook.md) and follow its context → sources → structure → states → inspect/test/correct loop. For a small fix, apply the relevant steps compactly. Own this work yourself; do not make the user fill out a checklist.

Define success by the person's task, access needs, and constraints. Choose appropriate native structure before styling. For substantial new structure, compare two plausible approaches and explain the chosen tradeoff. Build the relevant states, exits, and recovery. Inspect the actual result and correct findings before presenting it as finished. Preserve the product's identity; decoration needs a task-based reason.

Maintain a concise decision record: Apple guidance with its exact section/force/scope; original product choices with rationale; SDK claims with separate API evidence; unresolved claims with their effect. Verify numbers, units, exceptions, table/tab labels, and version-sensitive claims. Do not turn a recommendation into a rule or a platform default into a universal minimum. Never claim every user will obtain a universally best design or a proven numerical error rate from this workflow.

## Establish the design context

Use the conversation and project to identify the platform, minimum OS, device/window contexts, input methods, accessibility needs, and requested outcome. Ask only for missing choices that materially change the work. For cross-platform work, keep platform decisions distinct. For web work, label translations as adaptations and use web units, semantics, input behavior, and accessibility standards; Apple-native measurements and API behavior do not transfer automatically.

## Find and verify the applicable guidance

Resolve paths relative to this skill directory, even when the assistant starts elsewhere. Python 3.10+ is enough; no packages or API keys are required. On macOS/Linux use `python3` if needed. Claude chat can read the cards with code execution enabled; use available browsing or the dated snapshot if its sandbox blocks Apple network access.

```text
python scripts/hig.py search "navigation" --platform ipados
python scripts/hig.py show sidebars
python scripts/hig.py fetch sidebars --outline
python scripts/hig.py fetch sidebars --section Best-practices
python scripts/hig.py plan --platform ipados --goal "Edit a document" --topic undo-and-redo --output work/design/record.json
python scripts/hig.py check work/design/record.json
```

The search is lexical; use related terms or the category files if results are incomplete. Platform filters reflect page-level metadata, not applicability of every paragraph. `show` returns the offline decision card. `fetch` reads current Apple DocC, reports source drift, and preserves table cells, section ancestry, and tab labels. It defaults to an outline; select an exact returned anchor for details. Introductory content uses `Overview`. A section result may be truncated; narrow the section or raise the word limit before interpreting omitted content.

Read the target platform page, relevant foundation cards, and the component/pattern/technology cards that govern the actual task. Load only applicable references:

For concrete controls, screens, and motion, see [the runnable examples guide](references/runnable-examples.md). It routes to all 173 companion gallery tasks and distinguishes browser interactions from simulated hardware and SDK behavior.

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

For substantial or accuracy-sensitive work, use `plan` and `check` to retain a portable evidence record. A generated plan is unfinished; a passing check establishes an intact, complete review record, not source entailment or Apple certification. Relevant accessibility, state, source, and runtime checks must be recorded honestly. Correct blocking/material findings and recheck the changed artifact. See the playbook for the schema and snapshot policy.

## Measure accuracy honestly

Read [the evaluation protocol](references/evaluation-protocol.md) when asked for a numerical accuracy claim. Evaluate actual complete task outputs from a pinned skill/model/client/OS population, with representative independent sampling and qualified independent source review. Count a task with any material error, ambiguity, or missing result as a failure. Do not inflate the sample with repeated prompts, duplicate outputs, source clauses, unit tests, or self-graded generated examples. Report task usability and aesthetic judgments separately from source interpretation error.

`scripts/assurance.py` checks submitted evaluation artifacts and computes an exact one-sided binomial upper bound. Its `estimate` mode is hypothetical; only an independently audited evaluation can justify a scoped empirical claim. Zero observed errors require at least 29,956 genuinely independent representative task results for a 95% upper bound below 0.01%. Pooling platforms/models does not prove that bound for each of them. The current package has no such independent dataset; keep that limitation explicit.

For the all-three-client/all-six-platform scope, use `assurance.py matrix` and the protocol's simultaneous-confidence rules. Require all 18 cohorts to qualify; a pooled passing rate cannot clear a weak or untested cohort. A simultaneous 95% zero-error study using the documented Bonferroni method needs at least 58,859 independent trials per cohort. Model/OS scope, genuine registration, independent review, and relevant runtime evidence remain prerequisites.

## Maintain the snapshot

```text
python scripts/hig.py audit
python scripts/hig.py refresh --report work/hig-drift.json
```

`audit` validates local structure and evidence links. `refresh` follows the current official HIG graph and reports changed/new/unreached pages without overwriting authored guidance. Review changed sources, update the affected cards and catalog together, and rerun the audit. A failed fetch or unfamiliar schema leaves coverage incomplete. A matching fingerprint proves source-byte or selected-payload agreement, not correctness of the interpretation.

# Design for the person's task, then verify the decisions

Use this playbook for new screens, substantial changes, or a thorough review. For a small correction, apply the relevant steps and keep the record compact. The assistant owns the research, implementation, and verification; the user should not have to fill a checklist to get a useful design.

## 1. Define success before choosing a visual style

Identify the primary task, intended users, target platform, deployment OS, available space, inputs, accessibility needs, content, and constraints. Infer known context from the project. Ask only for a missing decision that changes the design. A screenshot establishes visible appearance; code and a running interface establish different behavior. Record assumptions without pretending they were user requirements.

Describe success in observable terms: a person can find the next action, complete the task, understand its result, recover from mistakes, and continue under relevant accessibility settings. “Beautiful,” “Apple-like,” and “best” alone are insufficient acceptance criteria.

## 2. Read applicable sources and preserve their meaning

Start with the platform page, then relevant [design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles), [accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility), [layout](https://developer.apple.com/design/human-interface-guidelines/layout), [typography](https://developer.apple.com/design/human-interface-guidelines/typography), [color](https://developer.apple.com/design/human-interface-guidelines/color), [motion](https://developer.apple.com/design/human-interface-guidelines/motion), [privacy](https://developer.apple.com/design/human-interface-guidelines/privacy), and [writing](https://developer.apple.com/design/human-interface-guidelines/writing). Read the component, pattern, and integration sections that govern the task. Collection pages help discover guidance; a collection link alone rarely supports a detailed component claim.

For every consequential Apple-based decision, retain the exact section, target platform, recommendation force, and relevant exception. Read surrounding prose, table row/column labels, tabs, notes, and platform/version context. A page-level platform tag or an exact citation does not establish that the cited passage supports the decision.

Use current complete section evidence for numbers, units, availability, system behavior, or changing visual treatments. Keep target size separate from visual size, points separate from pixels, and a default separate from a minimum. Never infer a universal target dimension from one platform or merge conflicting source values. The [games display section](https://developer.apple.com/design/human-interface-guidelines/designing-for-games#Look-stunning-on-every-display) is a known conflict requiring explicit contextual judgment.

Classify each decision:

| Kind | Required reasoning |
| --- | --- |
| Apple guidance | Brief paraphrase, exact section, original force, applicable scope/qualifiers |
| Product design choice | User goal, constraint, rationale, tradeoff; identify original dimensions/timing as your choices |
| SDK/API contract | Separate current official API documentation and availability/runtime evidence |
| Unresolved | What is missing/conflicted and how it affects the implementation |

If live retrieval fails, use dated cards for a clearly qualified draft. Avoid exact or version-sensitive assertions without current evidence. Do not stop useful implementation merely because a secondary claim is unverified; choose a conservative established pattern and describe the remaining uncertainty.

## 3. Choose the structure before decorating it

Use appropriate native components and system behavior when they fit the task. Preserve the product's identity through content, hierarchy, imagery, and purposeful emphasis. Custom chrome, arbitrary gradients, glass, or animation need a task-based reason. Standard controls still require correct labels, roles, state, and placement.

For a new or substantially redesigned screen, compare two plausible structures briefly—for example a focused detail flow and a persistent inspector. Choose according to task frequency, discoverability, interruption cost, content scale, accessibility, and available space. A small bug fix does not need alternative concepts. Explain the selected structure with those constraints, rather than claiming aesthetic superiority.

| Platform | Context to verify in current guidance |
| --- | --- |
| iOS | Touch, available space/safe regions, navigation history, presentation/dismissal, text expansion |
| iPadOS | Resizable/multiple windows, sidebars/split content, keyboard and pointer, continuity across sizes |
| macOS | Window/document model, menu commands, toolbars, keyboard/focus, pointer, discoverable alternatives |
| tvOS | Distance legibility, remote navigation, focus feedback, selection and back behavior |
| visionOS | Gaze/hand input, spatial layout, surroundings, immersion entry/exit, motion and comfort |
| watchOS | Brief tasks, compact content, Crown input, glances, complications and system surfaces |
| Web adaptation | HTML semantics, browser focus/history, CSS units, responsive layout, relevant web accessibility criteria |

These are review prompts, not claims that every screen must include each feature. Keep cross-platform decisions separate. Never copy native geometry or SDK behavior directly into a web adaptation.

## 4. Build the relevant states and exits

For the primary task, list and implement applicable entry, default, selected, pressed, disabled, loading, empty, success, error, and recovery states. Preserve context through navigation, sheet/dialog presentation, cancellation, interruption, undo, and resizing. Avoid repeated confirmation for routine reversible actions. Read [buttons](https://developer.apple.com/design/human-interface-guidelines/buttons#Role), [alerts](https://developer.apple.com/design/human-interface-guidelines/alerts#Buttons), and the relevant presentation page in their own contexts before choosing destructive roles/defaults.

Write clear action labels and useful errors. Make status perceivable through more than color alone. Preserve readable hierarchy and content under large text, localization, dark/light appearance, and relevant contrast settings. Give custom interactions discoverable alternatives when appropriate; do not assume a gesture, hover, or animation is sufficient explanation.

Motion should communicate a state or relationship, accept interruption, and preserve continuity. Provide a meaningful reduced alternative. Static pictures cannot prove animation quality, reduced-motion behavior, focus, keyboard operation, VoiceOver, native fidelity, or spatial comfort.

## 5. Inspect, test, correct, and report

Inspect the actual result at the relevant sizes and appearances. Test the primary task and meaningful failure/recovery paths. Use actual assistive technology and native/runtime checks when available; record unavailable checks honestly. A rendered screenshot, browser accessibility tree, and device VoiceOver session are different evidence.

For each finding, connect the observed UI/code behavior, user impact, exact source section, concrete correction, and retest. Prioritize failed task completion, access, data loss, and unrecoverable states before cosmetic polish. Iterate on the corrected artifact. If requirements conflict, state the tradeoff and inspect the most specific evidence; do not invent an Apple rule to resolve a product choice.

Finish with the implemented outcome, consequential decisions and sources, checks actually executed, and material remaining uncertainty. Do not call a design universally “best,” Apple-certified, or numerically proven from screenshots, source hashes, or a passing contract check. The result should make the person's task clear and usable within the tested constraints.

## Optional evidence record for substantial work

From the installed skill directory:

```sh
python scripts/hig.py plan --platform ipados --minimum-os "your deployment target" --goal "Edit and recover a document" --topic undo-and-redo --output work/design/record.json
python scripts/hig.py fetch sidebars --section Best-practices > work/design/sidebars.json
python scripts/hig.py check work/design/record.json --output work/design/check.json
```

`plan` creates an **unfinished** record. Select only applicable sources, edit their exact sections/URLs, fill context, decisions and real check evidence, and bind each live evidence file to its SHA-256. Paths are relative to the record directory. Use a script or available file tools to calculate the hash; never invent it. Regenerate the skill fingerprint after a skill update by creating a new plan and deliberately reviewing the old record against it.

Each decision has `id`, `kind`, `statement`, `rationale`, `user_impact`, `scope`, `implementation_evidence`, and `review` (`reviewed`, `pending`, or `conflict`). Apple guidance also needs `source_ids`, `force` (`requires`, `recommends`, `permits`, or `describes`), and `qualifiers_reviewed: true`. Set `exact_value: true` for sensitive values; numeric statements are detected conservatively even when the field is omitted. A review declaration is an attestation, not independent verification.

Each source has `id`, `topic`, `section`, exact `url`, `verification` (`live` or `snapshot`), and the fields generated by `plan`. For live evidence, fill `evidence_file` and `evidence_sha256` with the complete `fetch --section` result. Unknown schema, empty/truncated sections, mismatched identities/hashes, source drift, and evidence outside the original seven-day review window block the record. That window is a project review policy, not an Apple requirement. SDK contracts deliberately need a separate API review; this HIG-only checker cannot clear them.

Each check has `id`, `status` (`pass`, `fail`, `not-run`, or `not-applicable`), `evidence`, and `reason`. A pass needs a specific observation or test result; inapplicability needs a reason. Core primary-task, accessibility/input, source-semantic, and platform/runtime reviews cannot be omitted. An unavailable runtime is `not-run`, not `not-applicable`. Unresolved `blocking` or `material` issues prevent readiness. The checker also flags explicit English Apple-rule attributions misclassified as original choices; that heuristic is not a general semantic classifier.

`check` exits 2 for incomplete/blocked records and 0 for an intact, complete record ready for human review. `--allow-snapshot` permits dated general guidance for that review; it still blocks unsupported exact values. The checker validates metadata, integrity, and declared completeness. It cannot establish that prose is true, that declared tests actually happened, or that a reviewer interpreted a source correctly. Use [independent evaluation](evaluation-protocol.md) for empirical accuracy claims.

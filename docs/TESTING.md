# Executed checks and the remaining accuracy study

The requested evaluation scope is three supported clients × six Apple platforms, **18 cohorts**. The user confirmed that no independently reviewed outputs or qualified reviewers are currently available. [Study draft](../evaluations/study-matrix.json) · [Current assessment](../evaluations/matrix-report.json)

## Executable repository checks

The verification report records the actual Python/Node tests, complete desktop/phone browser sweep, distribution freshness, portable installation/extracted-ZIP smoke checks, and official source inventory/drift checks. [Machine-readable execution report](test-results.json) records executed outcomes; unavailable checks are listed separately.

The suite exercises source/citation scope, parser fidelity, integrity, freshness, qualifiers, recorded checks, confidence-bound mathematics, preregistration, independent-review declarations, and the 18-cohort orchestration. Cohort tests reject missing/duplicate pairs, wrong model/platform registries, altered artifacts, insufficient simultaneous confidence, and attempts to hide a weak cohort in pooled counts. Synthetic unit-test fixtures are not semantic gold or independently reviewed real outputs.

The source check on 14 October detected changes on CarPlay, Live Activities, and Widgets. Current source readback updated those cards and refreshed all 173 source records. Browser illustrations and simulation behavior do not establish native Apple-device/SDK or assistive-technology conformance.

## Motion verification

The motion lab has 24 explicit examples with source sections, purpose, outcomes, companion routes, and reduced alternatives. Its controlled-clock browser checks cover real playback advancement, pause/resume, held endpoints, reset, selection after pausing, keyboard scrubbing, speed changes, optional loops, live spring interruption, resize bounds, system/local preference changes, hidden-page pausing, and frame/listener cleanup after navigation.

All examples are also checked at 320px, 390px, and 1280px in both light and dark appearances. Reduced-frame samples reject continuously interpolated transforms, opacity, and geometry. The recording check verifies changing GIF frames, two-play limits, and agreement between the retained endpoint and the actual renderer. The documentation uses still previews by default, with 24 recordings and 48 normal/reduced posters.

These are software and visual checks of browser illustrations. They do not establish native device performance, frame pacing on every system, VoiceOver conformance, comfort, or semantic error rates. The two relevant official Motion sections were retrieved on 15 October and matched the recorded fingerprints; the entire dated source inventory was not recrawled for the prior motion update. The previous release's full-inventory check remains recorded in [the v1.3.0 report](test-results-v1.3.0.json).

## Ordered workshop verification

All ten requested topics have 54 implemented studies and captured pictures. The browser suite runs topic-specific behaviors in order, then each study at 320px, 390px and 1280px in both appearances with 150% web text. It checks draft/selection preservation, validation, undo, dialog return focus, scoped shortcuts, pointer/named alternatives, timer cleanup, directional navigation, separate profiles and unreviewed JSON export. Generated guides/catalogs and exact picture sets are checked against the real registry. Full regression retains all 173 routes and 24 motion examples.

The new portable workflows describe current source recommendations, original product choices, native checks still needed, and what the browser tasks actually establish. [Targeted complete official sections](workshop-source-review.json) for all ten topics matched the recorded fingerprints on 15 October; Getting started has an empty prose overview and remains a source collection. [The v1.4.0 report](test-results-v1.4.0.json) preserves the prior motion verification. These checks do not replace independent task-output review or native device testing.

## Unavailable empirical and native tests

| Required evidence | Current status |
| --- | --- |
| Actual client/model/settings and OS configuration for all 18 cohorts | Not pinned; no live client/model evaluation runner configured |
| Representative sampling and independently registered study/cohort protocols | Not registered; the matrix is a draft |
| Real complete task outputs | 0 qualifying outputs; authored prompts and unit fixtures do not count |
| Qualified independent source/runtime reviewers | None available |
| Relevant Apple-device, native SDK, assistive-technology, and spatial-comfort evidence | Not executed; no corresponding native app/device study is available |

These dependencies prevent an empirical error-rate proof. They are not failing software tests and are not reported as passes. Scope selection does not supply the missing outputs, reviewers, or runtime evidence. There is no purchase, external recruitment, or paid model execution in this verification.

## Statistical requirement

One marginal 95% zero-error bound below 0.01% needs 29,956 genuinely independent representative task results. For a simultaneous 95% statement across **all 18** cohorts, the conservative Bonferroni method allocates `0.05 / 18` error probability to each bound: **58,859 zero-error results per cohort, 1,059,462 total**. Nonzero errors require more data; correlated task samples need suitable analysis. The [protocol](../skills/apple-hig/references/evaluation-protocol.md) explains the assumptions and external audit requirement.

Run the current assessment:

```sh
python skills/apple-hig/scripts/assurance.py matrix --study evaluations/study-matrix.json --output evaluations/matrix-report.json
```

Exit 2 and `statistical_target_met: false` are expected with the current evidence. A future supported report would be conditional on genuine registration, sampling, and review, and would apply only to its pinned populations. It would not guarantee universally best designs or performance for untested future clients/models/OS versions.

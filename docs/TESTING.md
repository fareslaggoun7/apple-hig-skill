# Executed checks and the remaining accuracy study

The requested evaluation scope is three supported clients × six Apple platforms, **18 cohorts**. The user confirmed that no independently reviewed outputs or qualified reviewers are currently available. [Study draft](../evaluations/study-matrix.json) · [Current assessment](../evaluations/matrix-report.json)

## Executable repository checks

The verification report records the actual Python/Node tests, complete desktop/phone browser sweep, distribution freshness, portable installation/extracted-ZIP smoke checks, and official source inventory/drift checks. [Machine-readable execution report](test-results.json) records executed outcomes; unavailable checks are listed separately.

The suite exercises source/citation scope, parser fidelity, integrity, freshness, qualifiers, recorded checks, confidence-bound mathematics, preregistration, independent-review declarations, and the 18-cohort orchestration. Cohort tests reject missing/duplicate pairs, wrong model/platform registries, altered artifacts, insufficient simultaneous confidence, and attempts to hide a weak cohort in pooled counts. Synthetic unit-test fixtures are not semantic gold or independently reviewed real outputs.

The source check on 14 October detected changes on CarPlay, Live Activities, and Widgets. Current source readback updated those cards and refreshed all 173 source records. Browser illustrations and simulation behavior do not establish native Apple-device/SDK or assistive-technology conformance.

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

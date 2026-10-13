# Design quality and accuracy evaluation

The enhanced workflow is in the [design playbook](../skills/apple-hig/references/design-playbook.md). The [evaluation protocol](../skills/apple-hig/references/evaluation-protocol.md) defines the evidence needed for a scoped accuracy claim. [Current evidence](current-report.json) records **zero qualifying independent empirical trials**; the less-than-0.01% semantic-error target is not established.

[Thirty challenge cases](design-cases.json) exercise platform, qualifier, units, behavior, accessibility, source-conflict, and unsupported-proof failures. They are authored regression prompts, not independent gold answers or a representative probability sample. No real model outputs or independent review results are invented or bundled.

To use the cases, run the skill in the actual intended client/model/OS context, save complete outputs and relevant implemented artifacts, and have qualified reviewers read the applicable current Apple sections and inspect the result. Record material errors using the protocol rubric. Report task completion, usability, and visual quality alongside source accuracy. Retain failures. These results can improve the skill but do not automatically support a population-wide error bound.

For a statistical study, copy [the protocol template](protocol.template.json) into a separate artifact directory. Define and independently register the population, sampling, selected trials, model/settings, skill fingerprint, and review process before generating outputs. Populate the selected-trial registry and actual observations using the documented schema. Use a representative independent sample rather than this authored challenge suite.

```sh
python skills/apple-hig/scripts/assurance.py estimate --trials 29956 --errors 0
python skills/apple-hig/scripts/assurance.py evaluate --protocol evaluations/protocol.template.json --records evaluations/observations.jsonl --output evaluations/current-report.json
```

The first command is hypothetical. The second intentionally exits **2** because the repository has no registered empirical evaluation. A malformed input exits 1. Counts come from registered trials and actual hashed outputs/reviews; missing/ambiguous results count as failures, and duplicated inputs/outputs or self-review cannot establish independent sample size. The exact binomial upper bound is conditional on independently audited sampling and review premises. It does not certify every design, user, model, platform, or future Apple update.

Offline tests cover the scorer and design-evidence checker, including tampered sources, wrong anchors/platforms, truncation, missing check evidence, stale sources, conflicts, nonzero-error bounds, missing outputs, disagreement, duplicate results, self-review, and revision mismatch. Passing those tests proves their tested behavior; it does not convert them into semantic evaluations of real assistant outputs.

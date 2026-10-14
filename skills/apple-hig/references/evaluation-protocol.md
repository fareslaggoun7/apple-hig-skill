# Evaluate outputs before claiming an error rate

The target is **less than 0.01% material semantic error per complete task result** in a defined population. It is not a promise that every interface is aesthetically best or that every assistant follows instructions. Define task usability and visual quality as additional outcomes; keep them separate from semantic source accuracy.

## What counts as an error

Count the entire task result as a failure if any consequential recommendation or implementation:

- lacks applicable source support, uses the wrong platform, or drops a meaningful qualifier;
- invents a number/unit/availability claim, strengthens a recommendation into a requirement, or hides a source conflict;
- omits a state needed to complete/recover the primary task, makes that task inaccessible, or fails the user's stated goal;
- claims visual, native, SDK, or assistive-technology validation without the corresponding evidence.

Review the full answer and relevant implementation/artifacts, not a selection of easy claims. Count missing results and unresolved ambiguity as failures. Record all reviewer disagreements and use the conservative failure judgment until separately adjudicated. An appropriate qualified abstention can be correct when sources are genuinely unavailable, but an answer that fails the required task cannot pass merely by avoiding claims.

## Register the evaluation before generating results

Specify the skill file fingerprint/revision, client, actual exposed model and settings, OS/platform versions, language, task population, inclusion criteria, sampling method, confidence and threshold. Do not claim model settings that the client does not expose; document that limitation and restrict the conclusion accordingly.

Select and record trial IDs, task input hashes, platform/client/model/OS context, and sampling evidence before observing outputs. Retain an independently timestamped registration artifact and the selected-trial registry. A local timestamp/hash alone does not establish genuine preregistration. Explain how tasks represent the population and how repeated templates, common sources, users, runs, and platform families affect correlation. Simple Bernoulli bounds require an independence justification; clustered or adaptive samples need a suitable analysis outside this helper.

The repository's authored challenge cases are useful regression prompts. They are not a probability sample, not independent gold answers, and not evidence that thousands of real model outputs succeeded. Do not reuse them as the statistical sample or multiply their number by paraphrasing/repetition. No independent empirical evaluation is bundled in this release.

## Independently review the actual outputs

Use at least two qualified reviewers independent of the skill author and execution runner. Reviewers need relevant platform/design and source interpretation competence. Retain each review artifact with source sections, qualifiers, implementation observations, error categories, rationale, and ambiguity. Blind reviews where practical; disclose affiliations and incentives. Reviewers must read current applicable official sources and inspect the relevant runtime/media evidence. The scorer checks declared identities and artifact integrity; an external audit must establish that the people, reviews, registration, and sampling are genuine.

Keep reviewer IDs distinct; an author checking their own work is not independent review. Another model's opinion alone is not authoritative Apple evidence. Require platform specialists for spatial comfort, native behavior, and assistive technology where those claims are evaluated.

## Calculate and interpret the result

From the installed skill directory:

```sh
python scripts/assurance.py estimate --trials 29956 --errors 0
python scripts/assurance.py evaluate --protocol work/evaluation/protocol.json --records work/evaluation/results.jsonl --output work/evaluation/report.json
```

`estimate` is a hypothetical calculation. With zero errors, the one-sided exact upper bound is `1 - (1 - confidence) ** (1 / trials)`. At 95% confidence, 29,956 genuinely independent representative zero-error results put that bound just below 0.01%. Nonzero errors require more evidence; `evaluate` uses the exact Clopper–Pearson bound. A 95% bound is statistical evidence under assumptions, not an absolute guarantee. The target value `0.0001` is a fraction, equivalent to `0.01%`.

`evaluate` derives counts from the preregistered trial registry and actual records, not a supplied trial-count assertion. It rejects missing/mismatched hashes, duplicated inputs/outputs, unregistered results, unknown skill revisions, missing actual context, unqualified/nonindependent review declarations, and absent review evidence. Missing selected outputs count as errors. Ambiguous or disputed judgments count as errors. Exit 2 means the target is not established; exit 1 means malformed/unreadable input. A conditional supported result still requires an external audit of the premises.

Do not pool clients, models, platforms, or OS versions and imply a separate <0.01% bound for each. Publish stratum counts and subgroup bounds when justified. A claim about all six platforms requires an appropriately scoped evaluation of all six; a claim about every future user, model, or Apple update cannot follow from a finite benchmark. Re-evaluate after skill/model/source changes and retain failed runs; do not select the first passing repeated benchmark.

## All three clients and six platforms

The requested scope contains 18 client/platform cohorts: Claude chat, Claude Code, and Codex, each on iOS, iPadOS, macOS, tvOS, visionOS, and watchOS. Pin the actual exposed model/settings, client context, OS, and task population for each. Adding models or OS versions expands the study; an 18-cohort result cannot cover every future version.

For a **simultaneous 95%** confidence claim that all 18 error rates are below 0.01%, this project uses conservative Bonferroni control: each one-sided confidence bound uses confidence `1 - 0.05 / 18`, approximately 99.7222%. Under the independent-within-cohort Bernoulli assumptions, zero errors need at least **58,859 trials per cohort, 1,059,462 total**. Bonferroni does not require independence between cohorts. Nonzero errors require more evidence. Eighteen separate marginal 95% bounds, or one pooled bound, do not establish the requested joint 95% statement.

```sh
python scripts/assurance.py matrix --study work/evaluation/study-matrix.json --output work/evaluation/matrix-report.json
```

The matrix command requires each client/platform pair exactly once. Each cohort specifies `client`, `platform`, `model`, `model_settings`, `minimum_os`, `protocol_file`, `protocol_sha256`, `records_file`, and `records_sha256`. It reads actual hashed protocols and records, validates registered trial context, and invokes the single-cohort evaluator. It does not accept passing-summary counters as empirical evidence. Missing or unsupported cohorts prevent the all-cohort claim even if pooled counts are large.

The overall study has `schema_version: 1`, `id`, `family_confidence`, `target_error_fraction`, `skill_sha256`, `registered_at_utc`, `registration_evidence_file`, `registration_evidence_sha256`, and `cohorts`. Register the overall study before its cohort protocols, and the cohort protocols before trials. Paths are relative to the study directory; each protocol's internal artifacts are relative to its own directory. The [repository matrix template](https://github.com/fareslaggoun7/apple-hig-skill/blob/main/evaluations/study-matrix.json) has unresolved model/OS fields, no registration or outputs, and no available independent reviewers. It is a draft, not an executed study. Exit 2 reports the unestablished target; valid conditional support still needs independent audit of the premises.

## Portable input contract

All artifact paths are relative to the protocol directory and must remain within it. Hash exact file bytes with SHA-256. Records are one JSON object per line. Keep prompts, outputs, registration, and reviews available for independent audit; protect private user data when preparing a public dataset.

Protocol fields:

```json
{
  "schema_version": 1,
  "id": "your-preregistered-study",
  "metric": "task-result-with-any-material-error",
  "confidence": 0.95,
  "target_error_fraction": 0.0001,
  "skill_sha256": "exact-installed-skill-fingerprint",
  "registered_at_utc": "actual-independently-attested-UTC-time",
  "sampling": {
    "method": "independent-representative-task-sampling",
    "population_definition": "precise client/model/platform/OS/task population",
    "independence_justification": "sampling and correlation evidence"
  },
  "authors_and_runners": ["author-id", "runner-id"],
  "reviewers": [
    {"id": "reviewer-a", "qualified": true, "independent_of_author_and_runner": true},
    {"id": "reviewer-b", "qualified": true, "independent_of_author_and_runner": true}
  ],
  "selected_trials_file": "selected-trials.jsonl",
  "selected_trials_sha256": "hash",
  "registration_evidence_file": "registration.txt",
  "registration_evidence_sha256": "hash"
}
```

Each selected-trial row has `trial_id`, `prompt_sha256`, `platform`, `client`, `model`, `model_settings` (object), and `minimum_os`. Each result repeats those fields and adds `skill_sha256`, `run_at_utc`, `prompt_file`, `response_file`, `response_sha256`, and `reviews`. Each review has `reviewer_id`, `full_output_and_sources_reviewed: true`, `ambiguous: false` (or true), `error_categories`, `evidence_file`, and `evidence_sha256`.

Use these exact material-error category IDs: `unsupported-source`, `wrong-platform`, `lost-qualifier`, `invented-number`, `wrong-recommendation-force`, `unresolved-source-conflict`, `missing-critical-state`, `inaccessible-primary-task`, `unverified-visual-or-sdk-claim`, and `user-goal-failure`. An empty category list means no material error was found in that review; it is not evidence that no error exists.

Report the observed task error rate, exact upper bound, confidence, study scope, exclusions/missing results, disagreements, reviewer independence evidence, and source/runtime limits. Publish failures and uncertainty along with successes. Never present unit-test counts, source hashes, generated challenge cases, or a passing design contract as this empirical result.

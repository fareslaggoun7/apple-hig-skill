# Usage

Give the assistant the interface, target platform, and outcome you need. Screenshots support visual review; source code or a running app supports behavior checks. The skill does not replace evidence of how your app behaves.

## Useful requests

- **Design:** describe the primary task, devices, window contexts, and inputs.
- **Implementation:** provide the project and say which behavior to build or change.
- **Review:** provide screens or code and identify the important user paths.
- **Adaptation:** explicitly ask for HIG-based web work; web semantics and units remain distinct from native conventions.

Use natural language in Claude chat, `/apple-hig` in Claude Code, or `$apple-hig` in Codex. The bundled instructions and source cards are the same.

## The helper

Run these paths from the repository root. For an installed skill, replace `skills/apple-hig` with its installation path.

| Command | Result | Network |
| --- | --- | --- |
| `search "query" --platform ipados` | Ranked topic matches | No |
| `show sidebars` | The topic card and any child topics | No |
| `fetch sidebars --outline` | Current section anchors and source-drift metadata | Yes |
| `fetch sidebars --section Best-practices` | Selected current official content | Yes |
| `audit` | Local catalog and source-link consistency | No |
| `refresh --report work/drift.json` | Newly discovered, changed, failed, or unreached topics | Yes |
| `plan --platform ipados --goal "Edit a document" --output work/design/record.json` | Unfinished design/evidence record with applicable source topics and review checks | No |
| `check work/design/record.json` | Source integrity, scope, completeness, and declared check results; no semantic certification | Local recorded evidence |

Prefix each command with `python skills/apple-hig/scripts/hig.py`. Supported platform filters are `ios`, `ipados`, `macos`, `tvos`, `visionos`, and `watchos`. Filters use page-level metadata; specific guidance may have narrower scope. Search uses words and topic ancestry, not embeddings.

`fetch` accepts an indexed slug or an official HIG URL. Current unindexed pages can be inspected, but they have no snapshot comparison. Use returned anchors exactly. `Overview` selects introductory blocks. Tables retain cells and units; tab labels and note context remain visible. If `truncated` is true, narrow the section or increase `--max-words` before concluding that a condition is absent.

The helper returns source content for reasoning. Public answers and published artifacts should use brief paraphrases and direct links, rather than reproducing whole Apple articles.

## A useful review format

```text
Context: platform, OS scope, inputs, inspected artifacts
Finding: what is visible or observable
Impact: how it affects the person's task
Source: official HIG page and section
Correction: a concrete proposed change
Validation: what was checked and what remains unverified
```

Do not convert a recommendation into an absolute rule. When source paragraphs conflict, disclose the ambiguity. SDK contracts require separate official API documentation; HIG platform tags do not prove API availability.

## Design quality and accuracy

For new screens or substantial changes, use the [design playbook](../skills/apple-hig/references/design-playbook.md): define the primary task, compare suitable structures, record consequential decisions and sources, implement relevant states/exits, and inspect/test/correct. Keep the user's product identity and constraints. For a small fix, apply the relevant steps compactly.

`plan` creates an unfinished JSON record. Select applicable sections and sources, fill actual context and decisions, attach hashed complete live section results, and record real checks and remaining findings. `check` exits 2 until the record is complete and intact, then reports readiness for human review. General dated guidance can be used with `--allow-snapshot`; exact numeric/version claims still need current evidence. See the playbook for fields, freshness policy, source drift, and separate API review.

For a numerical claim, use the [evaluation protocol](../skills/apple-hig/references/evaluation-protocol.md) and [repository evaluation guide](../evaluations/README.md). `python skills/apple-hig/scripts/assurance.py estimate --trials 29956 --errors 0` is a hypothetical calculation. `evaluate` derives counts from registered actual task outputs and independent review artifacts. Neither calculator output, self-review, source hashes, nor authored challenge prompts prove an empirical error rate.

For the all-three-client/all-six-platform study, run `python skills/apple-hig/scripts/assurance.py matrix --study evaluations/study-matrix.json`. It assesses all 18 cohorts separately with simultaneous confidence control and exits 2 while the target is unestablished. Actual models, OS versions, registration, and independently reviewed outputs must be supplied; the included draft has none.

## Examples and limits

[Prompt library](../examples/prompts.md) · [Worked review](../examples/review-walkthrough.md) · [Interactive web adaptation](../examples/web-adaptation/README.md) · [All 173 gallery tasks](../examples/gallery/TOPICS.md) · [Ten motion experiments](../examples/gallery/MOTION.md)

The project does not promise that any assistant will reach the same answer on every run. [Coverage](COVERAGE.md) explains which checks were performed and why the requested numerical error threshold has not been established.

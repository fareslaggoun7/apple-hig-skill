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

## Examples and limits

[Prompt library](../examples/prompts.md) · [Worked review](../examples/review-walkthrough.md) · [Interactive web adaptation](../examples/web-adaptation/README.md)

The project does not promise that any assistant will reach the same answer on every run. [Coverage](COVERAGE.md) explains which checks were performed and why the requested numerical error threshold has not been established.

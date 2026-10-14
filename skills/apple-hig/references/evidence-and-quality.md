# Evidence, scope, and accuracy

Snapshot date: **14 October 2026**. Source authority: [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines). This is an independently authored skill; it is not an Apple publication or certification.

## What was inspected

The public site loads its documentation through a JavaScript application. The corresponding public DocC endpoint is `https://developer.apple.com/tutorials/data/design/human-interface-guidelines.json`. The analysis followed HIG topic edges and HIG article references to a fixed point, restricting the origin to `developer.apple.com` and the documentation namespace to `/design/human-interface-guidelines`.

All 173 discovered pages are also reachable through the root's topic tree. Each has an authored guidance card, an official URL, exact section anchors, platform metadata when supplied, and SHA-256 fingerprints. No source request failed. Category counts include collection pages:

| Category | Pages |
| --- | ---: |
| Getting started, including the HIG root | 11 |
| Foundations | 19 |
| Patterns | 26 |
| Components | 73 |
| Inputs | 14 |
| Technologies | 30 |
| Total | 173 |

This is **100% coverage of the discovered page inventory**, not a claim that every source clause is reproduced. The cards give consequential decisions; live section retrieval supplies the full applicable context. Apple retains rights in its documentation. The package contains brief original summaries and source metadata, rather than copied articles or media.

## Verification and remaining limits

The current parser inventory covers all 173 source documents: 1,743 headings, 293 tables, 50 tab navigators, and 1,533 image/video nodes were accounted for. Tests cover heading ancestry, table cells and units, inline identifiers, tab context, unfamiliar-node reporting, and the official HTTPS boundary. Image/video node counts demonstrate inventory only; those media examples were not visually validated. The skill therefore instructs users of the skill to inspect applicable examples before making visual-fidelity claims.

A second full live crawl found no new, changed, failed, or unreached pages relative to the snapshot. Matching hashes establish agreement with the retrieved source; they do not establish that a design interpretation is correct. The selected-payload fingerprint includes prose, tables, topic edges, title/custom metadata, and topic-reference titles; it does not cover every external resource or SDK dependency.

On 14 October, a later crawl detected updates on CarPlay, Live Activities, and Widgets. Current source readback updated their cards for HomeView scope and household visibility, limited-width Dynamic Island layouts, and container-relative corner geometry. Source metadata was refreshed for all 173 pages. This was agent source review, not independent empirical task-output grading; exact units and API availability still require current applicable evidence.

An independent source review examined 12 component cards and found six material issues across five cards. Corrections preserve the Mac-specific scope of indeterminate progress bars, sheet exit alternatives, Live Activity privacy and ending behavior, Mac toolbar command access, and destructive button-role guidance. This sample is not a random benchmark or a complete independent semantic audit.

The source boundary excludes other Apple documentation, linked SDK contracts, App Store policy, WWDC transcripts, translated versions, unlinked pages, and future changes. External documentation remains authoritative for API availability and behavior. Page-level platform tags can be broad; specific paragraphs and availability notes take precedence. The snapshot's date is the research date, not a claim that each page was last revised that day.

Local source fingerprints are documentation evidence identifiers. No native binary was decompiled and no REA-engine Evidence IDs were generated. The reverse-engineering skill's observed/inferred/unknown distinctions were applied to public documentation structure and content.

## Known source ambiguity

The [games display guidance](https://developer.apple.com/design/human-interface-guidelines/designing-for-games#Look-stunning-on-every-display) gives inconsistent iOS target-size advice between prose and the adjacent default/minimum table. The relevant card records the conflict. Inspect the current `Look-stunning-on-every-display` section and platform context before choosing a value; do not silently turn one value into a universal minimum. The [buttons](https://developer.apple.com/design/human-interface-guidelines/buttons#Role) and [alerts](https://developer.apple.com/design/human-interface-guidelines/alerts#Buttons) pages also need to be read in their own action/confirmation contexts when considering destructive defaults.

## The requested error threshold

**An interpretation error rate below 0.01% has not been established and cannot be guaranteed by this package.** A usable benchmark first needs a defined population of claims or design decisions, an authoritative scoring rubric, platform/version scope, independent evaluation, and a rule for counting ambiguity and missing coverage.

For illustration, even with zero observed errors, an independent Bernoulli sample would need at least 29,956 representative trials to put a one-sided 95% upper confidence bound below 0.01%. HIG decisions are often correlated and context-sensitive, so those assumptions would themselves require justification. The available structural checks and 12-card review do not meet that benchmark.

To update, run `scripts/hig.py refresh --report <output-path>`, inspect changed and added official pages, revise their cards, and update catalog metadata/fingerprints together. Failed requests or unrecognized structure require follow-up; neither proves a page was removed. Run the local audit after revisions.

## Stronger workflow and empirical evaluation

The [design playbook](design-playbook.md) adds task success criteria, platform context, structural alternatives, consequential decision records, and an inspect/test/correct loop. `hig.py plan` creates an unfinished record; `hig.py check` checks exact URLs/anchors, source scope, artifact hashes, freshness/completeness, declared review evidence, and unresolved findings. These are integrity/completeness checks, not semantic certification.

The [evaluation protocol](evaluation-protocol.md) defines complete-task material error, independent representative sampling, two qualified independent reviews, preregistration, missing/ambiguous-result handling, and revision/model/client/OS scope. `assurance.py` derives empirical counts from submitted artifacts and calculates exact one-sided confidence bounds. Its calculator mode is explicitly hypothetical. No qualifying independent empirical dataset is included. The numerical target therefore remains unproven.

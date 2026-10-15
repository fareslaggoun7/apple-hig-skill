# Coverage and validation

Snapshot: **14 October 2026**. [Machine-readable source audit](source-audit.json) · [Detailed evidence notes](../skills/apple-hig/references/evidence-and-quality.md)

| Recorded topic family | Indexed pages, including collections |
| --- | ---: |
| Getting started and HIG root | 11 |
| Foundations | 19 |
| Patterns | 26 |
| Components | 73 |
| Inputs | 14 |
| Technologies | 30 |
| **Total** | **173** |

Every discovered English page in the recorded root topic tree has a guidance card and source metadata. A second crawl found no new, changed, failed, or unreached pages at the time of the research. This is an inventory result, not a claim that every source sentence or image has been independently interpreted.

The current corpus parser inventory accounts for 1,743 headings, 293 tables, 50 tab navigators, and 1,533 media nodes. Media were counted, not visually audited. The original targeted independent review of 12 component cards found six material issues that were corrected. Linked SDK documentation, App Store policy, WWDC transcripts, translations, unlinked pages, and future changes are outside the snapshot.

Repository tests validate the complete topic tree, portable paths, helper behavior, section/table parsing, installer preservation, ZIP layout, and documentation links. They run offline and do not depend on accounts. A manual live fetch verifies the online route. Claude account installation, native device behavior, and model response quality are not certified by these checks.

## Gallery validation

The companion gallery maps all 173 indexed topics to concrete tasks including 54 studies across ten ordered workshops. Every topic has a picture captured from the actual browser renderer. Twenty-four motion experiments have recorded animated previews. Device, payment, account, and SDK integrations are simulations; browser controls and local state changes are real.

Validation includes Python tests across packaging, gallery, and design/evaluation tooling, five Node tests, both distribution archives, and 346 browser route checks at 1280px and 390px. Focused browser checks cover saving/cancellation and focus recovery, validation, search recovery, tabs, reordering, loading cancellation and retry, popover dismissal, motion interruption/reduced alternatives, cleanup, fictional consent, reviewed suggestions, document rename, semantic outlines, and contextual help. Motion checks use controlled time to avoid depending on CI worker scheduling. [Current executed checks](TESTING.md) include the 18-cohort assessment tests.

During the cloud continuation, live Apple retrieval was denied by the environment network policy. The gallery uses the dated source-card interpretations and provides official source links; it does not claim a fresh source crawl. Route counts, pictures, and passing checks do not measure semantic accuracy, assistive-technology conformance, native geometry, SDK correctness, or spatial comfort.

## Design quality enhancement

A later successful live crawl on 13 October 2026 reached all 173 topics without source drift, failures, or unhandled nodes. The [latest machine-readable source audit](source-audit.json) records that check. Targeted source readback also corrected the games sizing ambiguity's section pointer to `Look-stunning-on-every-display`; the card already preserved the conflicting prose/table values.

On 14 October a further check found updates to CarPlay, Live Activities, and Widgets. Source readback refreshed those cards for HomeView scope/household visibility, limited-width Dynamic Island presentations, and container-relative corners; all 173 source records were refreshed. This update is source review, not an independent empirical output benchmark. Native geometry, SDK availability, and exact specifications still need current applicable evidence.

The [design playbook](../skills/apple-hig/references/design-playbook.md) now defines task success, platform context, structural tradeoffs, exact-section decisions, and an inspect/test/correct loop. The evidence checker rejects mismatched anchors/platforms/hashes, incomplete or stale source sections, missing declared checks, unsupported snapshot numeric claims, and unresolved material findings. Passing it validates the recorded contract, not the truth of every statement or declared observation.

[Thirty authored challenge prompts](../evaluations/design-cases.json) and adversarial regression tests exercise these protections and the exact confidence-bound scorer. They are not independent gold labels or sampled real model outputs. The [published empirical baseline](../evaluations/current-report.json) records **0 qualifying independent trials** and `statistical_target_met: false`. [Quality evidence](QUALITY.md) distinguishes each result.

## Accuracy target

An error rate **below 0.01% is unproven and not guaranteed**. A valid claim would require a defined population of decisions, a scoring rubric, platform/version scope, and representative independent evaluation. Page counts and source hashes do not measure semantic error. See the evidence reference for the confidence-bound example and known source ambiguity.

The [independent evaluation protocol](../skills/apple-hig/references/evaluation-protocol.md) uses complete task results: any material semantic error, unresolved ambiguity, or missing selected result counts as a failure. It requires a registered population/revision/model/client/OS scope, representative independent sampling, and qualified independent reviews. Even a passing statistical bound would be conditional and scoped; it would not guarantee best designs for everyone.

The requested all-three-client/all-six-platform matrix has 18 cohorts. [Its report](../evaluations/matrix-report.json) contains zero qualifying trials and no supported cohorts. A simultaneous 95% confidence statement using conservative Bonferroni bounds would require at least 58,859 independent zero-error results per cohort. The required outputs and independent reviewers are not available.

## Updating

```sh
python skills/apple-hig/scripts/hig.py refresh --report work/drift.json
```

Review changed and new official sections before revising summaries. Update source metadata and cards together; preserve unresolved conflicts. Then run the audit and tests, rebuild the ZIP, and describe the update in the changelog. A fetch failure or an unreached page alone is not proof that Apple removed it.

On 15 October 2026, complete relevant sections for the ten requested workshop topics matched their recorded source fingerprints. Design principles now has individual tasks for all eight named principles. Getting started is a collection with an empty prose overview; its planning method is explicitly original. This targeted readback did not recrawl the whole inventory or visually verify Apple media.

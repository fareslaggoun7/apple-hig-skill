# Coverage and validation

Snapshot: **13 October 2026**. [Machine-readable source audit](source-audit.json) · [Detailed evidence notes](../skills/apple-hig/references/evidence-and-quality.md)

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

The original corpus parser checks accounted for 1,742 headings, 294 tables, 50 tab navigators, and 1,533 media nodes. Media were counted, not visually audited. A targeted independent review of 12 component cards found six material issues that were corrected. Linked SDK documentation, App Store policy, WWDC transcripts, translations, unlinked pages, and future changes are outside the snapshot.

Repository tests validate the complete topic tree, portable paths, helper behavior, section/table parsing, installer preservation, ZIP layout, and documentation links. They run offline and do not depend on accounts. A manual live fetch verifies the online route. Claude account installation, native device behavior, and model response quality are not certified by these checks.

## Accuracy target

An error rate **below 0.01% is unproven and not guaranteed**. A valid claim would require a defined population of decisions, a scoring rubric, platform/version scope, and representative independent evaluation. Page counts and source hashes do not measure semantic error. See the evidence reference for the confidence-bound example and known source ambiguity.

## Updating

```sh
python skills/apple-hig/scripts/hig.py refresh --report work/drift.json
```

Review changed and new official sections before revising summaries. Update source metadata and cards together; preserve unresolved conflicts. Then run the audit and tests, rebuild the ZIP, and describe the update in the changelog. A fetch failure or an unreached page alone is not proof that Apple removed it.

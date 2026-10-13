# Design quality and the requested accuracy target

The skill now guides a complete design loop: define task success, read current applicable sources, choose a suitable structure, implement relevant states and exits, then inspect/test/correct. [The playbook](../skills/apple-hig/references/design-playbook.md) keeps source recommendations, original product choices, SDK evidence, and unresolved claims explicit. The assistant owns this work; ordinary users do not need to complete an evaluation form.

## Evidence currently available

| Evidence | Result | What it supports |
| --- | --- | --- |
| Fresh official HIG graph crawl | 173 pages; no drift, failed pages, or unknown nodes | Current selected source payloads agree with the recorded snapshot |
| Source readback | Targeted prose/table checks; games ambiguity pointer corrected | The checked passages and corrected source reference |
| Automated checks | 47 Python tests and five Node tests, including wrong-scope/citation, tampering, truncation, stale evidence, missing checks, duplicates, disagreement, self-review, and statistical boundary cases | Tested package/gallery/checker/scorer behavior |
| Authored design challenge prompts | 30 cases across six platforms | Reproducible manual regression tasks; no independent gold or probability sample |
| Independent empirical task evaluations | **0** | **The less-than-0.01% error target is not established** |

[Machine-readable source audit](source-audit.json) · [Current empirical baseline](../evaluations/current-report.json) · [Challenge/evaluation guide](../evaluations/README.md)

The checker can confirm intact evidence files, exact metadata, and declared completeness. It cannot establish whether declared observations happened or a source actually entails a recommendation. A source fingerprint is not a semantic accuracy score. Browser pictures and tests do not establish device behavior, SDK correctness, assistive-technology conformance, spatial comfort, or globally best aesthetics.

## Evidence needed for a scoped <0.01% claim

The [protocol](../skills/apple-hig/references/evaluation-protocol.md) defines material error per complete task result, preregistration, actual skill/model/client/OS scope, representative independent sampling, and qualified independent reviews. Missing selected results, material mistakes, and unresolved ambiguity count as failures. Duplicate prompts/results, generated fixtures, or author self-review cannot inflate independent sample size. An external audit must establish that registration, sampling, reviewer independence, and source/runtime review are genuine.

At 95% confidence, **29,956 genuinely independent representative zero-error task results** would put a one-sided exact binomial upper bound just below 0.01%. This is a conditional statistical statement, not an absolute guarantee. Nonzero errors require more evidence. Correlated tasks need an appropriate analysis. Pooling six platforms does not establish that bound for each platform; future models, versions, sources, and user populations are outside a pinned study.

The best useful result is a design that fits the person's task and constraints, follows applicable guidance, and passes the relevant observed checks. There is no single best design for every user and context. This release improves the process and makes evidence gaps inspectable; it does not invent the independent study needed to prove the numerical target.

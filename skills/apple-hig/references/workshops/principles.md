# Design principles: make a reasoned choice, then test it

The current [Design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles) page names **Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, and Delight**. All eight complete sections were reviewed on 15 October 2026 and matched the recorded fingerprints. The overview explicitly says there is no single right way to apply them: they help weigh competing priorities. Do not turn them into a universal style recipe or guaranteed quality score.

| Principle | Design question | Concrete review evidence |
| --- | --- | --- |
| [Purpose](https://developer.apple.com/design/human-interface-guidelines/design-principles#Purpose) | What meaningful outcome matters to the people using this? | An observable primary task, prioritized features, and a reason this solution helps. |
| [Agency](https://developer.apple.com/design/human-interface-guidelines/design-principles#Agency) | Can a person explore, escape, and recover? | Skip/cancel routes where appropriate, actual undo content, and preserved work. |
| [Responsibility](https://developer.apple.com/design/human-interface-guidelines/design-principles#Responsibility) | Are purpose and data use transparent and proportionate? | Contextual rationale, necessary data only, privacy protections, and misuse/failure review appropriate to the real feature. |
| [Familiarity](https://developer.apple.com/design/human-interface-guidelines/design-principles#Familiarity) | Does this draw on known patterns and use them consistently? | Comparable actions behave alike, native conventions are respected, and changes have clear feedback. |
| [Flexibility](https://developer.apple.com/design/human-interface-guidelines/design-principles#Flexibility) | Whose context and input needs are being missed? | Inclusive task research, accessibility from the start, preserved context during adaptation, and intentional platform-specific work. |
| [Simplicity](https://developer.apple.com/design/human-interface-guidelines/design-principles#Simplicity) | Does each element earn its place? | Clear hierarchy, concise labels, and useful secondary capability that remains findable. Simplicity is not minimalism. |
| [Craft](https://developer.apple.com/design/human-interface-guidelines/design-principles#Craft) | Which details fail in real use? | Prototypes, precise language, animation/audio where appropriate, real-world review, iteration, and continued maintenance. |
| [Delight](https://developer.apple.com/design/human-interface-guidelines/design-principles#Delight) | Which emotion serves this task and audience? | A considerate whole experience, suitable feedback and freedom to act; decoration does not obstruct the task. |

## Apply the principles to a real product

Write a brief naming the audience, goal, platform/OS, context, and constraints. Prototype the main task plus escape, error and recovery. For each material decision, cite the relevant current Apple section and explain the product-specific tradeoff. Distinguish a source recommendation from your original choice. Test the resulting behavior with intended users, relevant input and accessibility configurations, then record what still needs review. A neatly formatted checklist is not independent evidence that a design is good.

## Eight runnable studies

The workshop gives each principle a working task: direct note capture with validation; archive/undo; transparent manual or bundled place entry; consistent save feedback; named reorder alternatives; optional category disclosure; a real rename dialog with validation and cancellation; and a reversible completion moment. The place example obtains no device data, and every browser action stays local in memory.

Test actual content after undo/cancel, input alternatives, focus, text/layout changes, both appearances, and repeat actions. Native widgets, assistive technology, platform conventions, privacy architecture, user research, performance and emotional quality require their own review. The studies explain reasoning and behavior; they do not certify the best possible design or establish a semantic error rate.

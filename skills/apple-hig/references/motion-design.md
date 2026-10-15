# Motion that explains a task

Use motion to explain a change, relationship, or result. Start with the person's task and the final state, then decide whether movement helps. A direct update is often sufficient for frequent controls. A longer or more elaborate animation is not evidence of a better design.

## Source and scope

The official [Motion → Best practices](https://developer.apple.com/design/human-interface-guidelines/motion#Best-practices) section asks for purposeful, optional motion and warns that excessive animation can distract or cause discomfort. [Providing feedback](https://developer.apple.com/design/human-interface-guidelines/motion#Providing-feedback) recommends realistic relationships, brevity and precision, generally avoiding additional motion for frequent interactions, and allowing cancellation as much as possible. Read those sections in their complete current context before treating a recommendation as a requirement.

These sections were retrieved on 15 October 2026 and matched the recorded source fingerprints. This reference adds an implementation workflow and original browser illustrations. It does not establish native framework behavior, a particular duration, accessibility conformance, or spatial comfort. Verify native APIs and availability separately in official developer documentation and the target runtime.

## Plan the state change

For each transition, record:

| Decision | What to establish |
| --- | --- |
| Trigger and purpose | The person's action or meaningful event, and the information movement adds |
| Before and after | Concrete content, selection, progress, or navigation states; the final result must remain understandable |
| Continuity | Which item, anchor, direction, or container explains the relationship |
| Interruption | What happens on a second action, reversal, cancel, reset, navigation, resize, or hidden page |
| Reduced alternative | The same usable outcome through direct replacement, stationary feedback, or another suitable alternative |
| Evidence | Applicable Apple section and scope; label durations, easing, colors, and physics as product choices |
| Verification | Actual interaction, keyboard/focus, preference-change, performance, and target-runtime checks |

Keep essential information available without observing the intermediate frames. Text, labels, selection borders, and measurable values can communicate results alongside motion. Do not require audio, haptics, color, or movement alone to understand completion or an error.

## Implement continuity and cancellation

- Maintain explicit idle, playing, paused, and completed states. Derive the visible controls from that state. Starting another transition must leave one active owner of its animation work.
- Retarget from the current visual state. For a physical spring, changing the destination should preserve both position and velocity. For another animation model, preserve the appropriate current state; do not assume every effect needs spring physics.
- Pause without consuming hidden time, and resume from the paused position. A playback-speed change should affect subsequent time. Cancel pending frames and listeners when leaving the view.
- Keep a useful completed state. A presentation should remain presented; a saved label should remain readable; a progress value should agree with its track. Returning to the start needs an explicit replay, reverse, or appropriate task event.
- Anchor contextual presentation to its source. Use a consistent relationship for entry and return. Avoid applying an arbitrary slide direction to every presentation.
- Recompute responsive geometry when the container changes. Do not let a settled item remain outside a narrower viewport.
- Prefer restrained transforms or opacity when they fit. Measure actual layout/paint and frame behavior before making performance claims; using a transform alone does not guarantee smoothness.

The gallery spring uses original acceleration `260 × (target − position) − 32 × velocity`, with bounded numerical substeps. Those constants are educational choices, not Apple's spring parameters or a recommended universal preset. They are not instructions to reimplement native controls with JavaScript physics.

## Make reduced motion a complete design

Choose an alternative for each effect: replace navigation content directly; reveal a sheet at its final location; update progress or totals without counting through intermediate values; retain focus labels and borders without scaling; communicate a spring destination using stationary text. Do not merely shorten a large zoom or rotation.

Respect the applicable platform preference and changes during the session. In the browser lab, the system preference enforces reduction; an additional local control can enable it when the system does not. Changing the preference preserves the selected example, timeline, pause state, and keyboard focus. It must not silently restart the task.

Do not animate an error by shaking the field. Explain the correction beside it and preserve the person's input. Do not replace essential progress or loading information with a spinner alone. Do not continuously announce every frame or intermediate number through a live region; announce meaningful user actions and outcomes instead.

## Learn from the runnable examples

The [24-example motion lab](https://github.com/fareslaggoun7/apple-hig-skill/blob/main/examples/gallery/MOTION.md) covers:

- Continuity: spring retargeting, a stationary alternative, a shared element, and focus emphasis.
- Navigation: sheet, anchored popover, related tabs, navigation into detail and back, and selection highlighting.
- Content: disclosure, reorder, image replacement, filtering, insertion, and removal with undo.
- Feedback: press, toggle, measurable progress, loading-to-content, refresh illustration, persistent save confirmation, inline validation, and a labeled numeric change.

Use replay, pause/resume, reset, keyboard scrubbing, speed, and optional looping to inspect the transitions. The preview stage is an illustration; its player controls are real HTML controls. Follow its companion-topic link for full controls such as dialog cancellation, keyboard tabs, or reorder buttons. Refresh, save, and loading illustrations do not contact services or perform native integrations.

The documentation starts with still pictures. Open a recording deliberately; recorded GIFs play a bounded number of times and retain a final frame. A GIF cannot follow an operating-system preference, prove frame pacing, or establish accessible behavior.

## Inspect and correct

Test the initial, intermediate, interrupted, reversed where applicable, and completed states. Check pause/resume, immediate replay, reset, fast repeated actions, navigation cleanup, viewport changes, keyboard operation, and a preference change while paused and while playing. Compare normal and reduced outcomes, including labels and numeric values.

Inspect light and dark appearances and compact layouts. Verify focus remains usable and does not enter hidden illustration controls. A browser screenshot or passing structural test does not prove VoiceOver behavior, native animation fidelity, spatial comfort, or semantic accuracy. Record what actually ran and retain native-device or assistive-technology checks as unverified until executed.

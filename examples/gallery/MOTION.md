# Ten motion experiments

Open the gallery's `?topic=motion` route. Choose an experiment, replay, pause, or switch to a reduced alternative. All previews below were captured from the same browser renderer used by the live gallery.

These experiments apply the snapshot's [motion guidance](https://developer.apple.com/design/human-interface-guidelines/motion#Best-practices): communicate change, preserve context, allow interruption, and keep essential information available without movement. Durations, easing, spring constants, colors, and dimensions are original example choices, not Apple specifications. The previews are browser illustrations and do not establish native animation or accessibility fidelity.

| Experiment | What to try | Recorded preview |
| --- | --- | --- |
| Spring & retarget | Click Left/Right while the card is moving. Position and velocity continue. | ![Actual spring preview](../../docs/assets/motion-spring-retarget.gif) |
| Sheet presentation | A short focused task appears over a stable document context. | ![Actual sheet preview](../../docs/assets/motion-sheet-presentation.gif) |
| Anchored popover | Contextual information originates beside its control. | ![Actual popover preview](../../docs/assets/motion-popover-origin.gif) |
| Press feedback | Immediate feedback keeps the action label understandable. | ![Actual press feedback](../../docs/assets/motion-button-feedback.gif) |
| Toggle state | The control's position and text convey its state together. | ![Actual toggle preview](../../docs/assets/motion-toggle-state.gif) |
| Progress update | A measurable value and a track convey the same progress. | ![Actual progress preview](../../docs/assets/motion-progress-update.gif) |
| Tab transition | The navigation frame remains stable across related views. | ![Actual tab preview](../../docs/assets/motion-tab-transition.gif) |
| Expand & collapse | Optional details appear in the same local context. | ![Actual disclosure preview](../../docs/assets/motion-expand-collapse.gif) |
| List reordering | Stable items move to their new positions. | ![Actual reorder preview](../../docs/assets/motion-reorder-list.gif) |
| Reduced alternative | A stationary card changes text directly instead of moving. | ![Actual reduced alternative](../../docs/assets/motion-reduced-motion.gif) |

The animated previews illustrate transitions. The surrounding lab controls supply replay, pause, and interruption; use the individual sheet, popover, toggle, tabs, progress, disclosure, and reorder topic routes for their complete interactive controls.

## How the spring works

The original example uses acceleration `260 × (target − position) − 32 × velocity` and numerical substeps of at most 1/240 second. Retargeting changes only the target; it preserves position and velocity. Large delayed frames are bounded to avoid unstable integration. This is an educational physical model, not a claim about Apple's spring implementation.

Recorded frames simulate the same spring deterministically. The live retarget and drag specimens advance their existing state each animation frame. Reduced motion substitutes a direct state change; CSS animations and transitions are also disabled.

The frame route `?topic=motion&motion=spring-retarget&record=1&frame=0.7` renders a fixed preview state for recording. Frame values are seconds. No animation loops or audio start automatically.

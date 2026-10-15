# Designing for visionOS: useful space with comfort and control

Begin with the person’s task, environment, supported input/accessibility needs, session length and deployment OS. The [overview](https://developer.apple.com/design/human-interface-guidelines/designing-for-visionos) distinguishes windows, volumes, objects, Shared Space, Full Space, passthrough, Spatial Audio, eyes/hands, ergonomics and accessibility. Review its device-use constraints and the linked user guide when planning the actual experience.

The complete overview and [Best practices](https://developer.apple.com/design/human-interface-guidelines/designing-for-visionos#Best-practices) were reviewed on 15 October 2026 and matched the inventory. Apple recommends the minimum suitable immersion, windows for UI-centric work, comfort and relaxed indirect interaction, stable references for motion, and appropriate shared activities. A limitless canvas is not a reason to scatter controls or require head/body movement.

## Decide before adding depth

1. Define which part of the task benefits from space. Use [windows](https://developer.apple.com/design/human-interface-guidelines/windows) for familiar contained work. Distinguish a window, volume, 3D object and immersive scene; verify the chosen native APIs and deployment requirements.
2. Choose immersion for each key moment. Read [immersive experiences](https://developer.apple.com/design/human-interface-guidelines/immersive-experiences). Preserve work when entering/leaving and keep transitions understandable. Do not assume every task needs Full Space or a surrounding world. Passthrough and Digital Crown behavior belong to the actual system; a web background change does not implement them.
3. Design input intentionally. Read [eyes](https://developer.apple.com/design/human-interface-guidelines/eyes), [gestures](https://developer.apple.com/design/human-interface-guidelines/gestures), and applicable accessibility guidance. Support relaxed indirect gestures and avoid prolonged distant direct manipulation. Do not label pointer hover as gaze tracking, a click as verified hand input, or web keyboard access as headset accessibility conformance.
4. Prioritize comfort in the real device. Keep content in a usable field of view, avoid jarring or rapid motion, provide a stationary reference, and avoid encouraging excessive movement in immersive contexts. Test sitting/standing contexts as applicable, actual dynamic scaling, text, reach, focus, motion preferences and assistive technology. Browser geometry cannot establish comfortable physical distances or field of view.
5. For shared tasks, read [SharePlay](https://developer.apple.com/design/human-interface-guidelines/shareplay) and actual SDK guidance. Clarify participation, ownership, leaving, synchronization, permissions and failures. Validate spatial Personas and placement in the native shared experience rather than drawing avatar circles and claiming integration.

## Five runnable studies

The workshop includes a windowed editable note with a nonmodal details panel; explicit entry/exit for a 2D focused-context illustration; named object selection plus range/step orientation; a stationary task with an optional reference outline; and a bundled invitation/accept/leave model preserving the draft. No message is sent and no device capability is requested.

Check draft preservation, exit/return focus, named alternatives, keyboard operation, enlargement and both appearances. The stage, object angles, shadows and sizes are original illustration choices, not native spatial measurements. Native comfort, tracking, eyes/hands, passthrough, Spatial Audio, sharing and accessibility require device/runtime review.

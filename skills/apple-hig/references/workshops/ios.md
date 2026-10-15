# Designing for iOS: content, context, and recovery

Use this workflow for an iPhone task. Establish the deployment OS, device/orientation contexts, primary task, expected session length, accessibility needs, and existing app identity before choosing a structure. The [iOS overview](https://developer.apple.com/design/human-interface-guidelines/designing-for-ios) describes handheld use, several input methods, brief and longer sessions, and frequent app switching. Do not assume every task is a short glance or that every person uses the same grip or input.

## What Apple recommends

The current [Best practices](https://developer.apple.com/design/human-interface-guidelines/designing-for-ios#Best-practices) section recommends concentrating on primary content/tasks while keeping secondary actions discoverable with little interaction; adapting to orientation, Dark Mode, and Dynamic Type; accommodating handheld reach and expected swipe navigation/list actions; and using platform capabilities with permission when they improve the task and reduce manual entry. These are contextual recommendations, not a universal layout prescription. The overview and complete best-practices section were retrieved on 15 October 2026 and matched the recorded source fingerprints.

Choose a concrete structure before styling. For example, a reading app can use a collection → article path with a stable return, while a frequent capture task may benefit from direct access to a draft. Tabs are suitable for distinct peer destinations when the product has them; they are not required for every iOS screen. Sheets can contain a focused task with clear save/cancel behavior. Read the applicable [navigation](https://developer.apple.com/design/human-interface-guidelines/navigation-and-search), [tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars), [sheets](https://developer.apple.com/design/human-interface-guidelines/sheets), and [search](https://developer.apple.com/design/human-interface-guidelines/searching) guidance for the chosen pattern.

## Implement the actual task

- Retain the selected item and relevant search/filter/scroll context when returning from detail. Keep an understandable visible return action. Native interactive-back and list gestures need implementation and device testing; a browser Back button does not establish them.
- Keep the main task accessible and discoverable. Place frequent controls according to the real task and supported contexts, rather than asserting that every control must be at the bottom. Preserve clear labels and usable input/focus behavior.
- Preserve the original draft on cancellation. Validate the proposed change without destroying existing content; save only an explicit accepted value. Provide a useful correction and restore focus to the originating control or its appropriate replacement.
- Preserve task and selected-destination state through supported appearance, orientation, text-size, and app-interruption changes. In native work, use the applicable platform mechanisms; browser text scaling and responsive CSS are only adaptation studies.
- Implement useful loading, empty, no-result, failure, cancellation, and recovery states where relevant. Avoid treating a failed request as an empty collection or reporting completion after the person cancelled.
- Request sensitive access in the context that needs it and explain the benefit. Do not imply that a local example exercised Apple Pay, biometrics, location, permissions, or another system integration.

## Six runnable studies

The [iOS workshop](https://github.com/fareslaggoun7/apple-hig-skill/blob/main/examples/gallery/WORKSHOPS.md) contains six real HTML tasks:

| Study | Observable outcome |
| --- | --- |
| Library & return | Open an article, save it, return to the same collection, and recover the originating focus |
| Search & no results | Search titles, expose a no-result state, clear it, and keep the search when returning from detail |
| Edit & cancel | Reject an empty title; cancel or Escape keeps the original; Save updates it and returns focus |
| Navigation & saved state | Save an article in Library and find it in Saved; use keyboard tab navigation |
| Adaptable reading | Change web text size, study width, and appearance without replacing the content or task |
| Loading & recovery | Load bundled sample content, cancel, simulate a failure, and retry without stale completion |

These are original web adaptations, with CSS units and browser semantics. They are not native iPhone screens, Dynamic Type tests, safe-area measurements, or SDK demonstrations. Individual studies retain their own local state while selected and revisited; Reset clears the selected study. Refresh or changing gallery topic starts a new workshop.

## Verify before presenting the result

Exercise the primary path, back/cancel, keyboard and input behavior, state changes, loading interruption, no-result recovery, text expansion, relevant orientations/window sizes, light/dark appearances, and reduced motion. Check that preference changes preserve the current study, entered content, and usable focus. For native delivery, separately test supported iPhones, Dynamic Type and assistive technologies, interactive gestures, safe areas, keyboard occlusion, app switching/restoration, and real SDK integrations. Record unavailable native checks as not run. A screenshot or passing browser test does not establish native fidelity, accessibility conformance, or a semantic error bound.

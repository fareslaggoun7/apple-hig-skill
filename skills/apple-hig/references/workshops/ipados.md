# Designing for iPadOS: one workspace, fluid inputs

Start with the task, supported window sizes, viewing positions, deployment OS, accessibility needs, and input combinations. The [overview](https://developer.apple.com/design/human-interface-guidelines/designing-for-ipados) describes a large display, handheld and supported positions, brief and extended sessions, simultaneous apps, and combinations of touch, physical keyboard, pointer, Pencil, and voice. Screen size alone is not a sufficient design brief.

## Current recommendations and their scope

Apple’s [Best practices](https://developer.apple.com/design/human-interface-guidelines/designing-for-ipados#Best-practices) recommends elevating meaningful content on the large display, minimizing unnecessary modality and full-screen transitions, considering viewing distance/input when choosing density, supporting fluid input combinations, and adapting across orientation, multitasking, appearance, text size, and running in macOS. The complete overview and best-practices section were retrieved on 15 October 2026 and matched the recorded fingerprints.

Compare a connected workspace with a sequence of focused screens. Choose persistent collections, document content, and optional inspectors when frequent cross-reference justifies them; use focused presentation when the task requires it. “Minimize” does not prohibit every sheet or dialog. Read [sidebars](https://developer.apple.com/design/human-interface-guidelines/sidebars), [multitasking](https://developer.apple.com/design/human-interface-guidelines/multitasking), [keyboards](https://developer.apple.com/design/human-interface-guidelines/keyboards), [Pencil](https://developer.apple.com/design/human-interface-guidelines/apple-pencil-and-scribble), and [drag and drop](https://developer.apple.com/design/human-interface-guidelines/drag-and-drop) for the relevant pattern and input details. Verify native API availability separately.

## Build and preserve the workspace

- Let collections and documents coexist when available space supports them. Adapt to the actual window rather than assuming a particular iPad model or orientation. Preserve the selected document and each draft when columns reflow or are hidden.
- Keep useful supporting information nonmodal when people need to consult it while editing. Name its open/close action and keep the document operable. Do not add an inspector merely to fill space.
- Provide visible named commands and appropriate keyboard equivalents. Scope custom shortcuts to the active editing task; avoid hijacking browser, system, or text-entry behavior elsewhere.
- Support pointer and touch interactions without requiring hover for an essential command. For drawing, test the applicable native Pencil capabilities; a pointer canvas cannot establish pressure, hover, palm rejection, or handwriting behavior.
- Preserve data across input switches, resizing, appearance/text changes, multitasking, app activation, and applicable document/window lifetimes. Test the actual native runtime; a responsive browser layout does not prove these transitions.
- Offer an alternative to dragging where appropriate. Validate transferred data and preserve the source. An example copying bundled text inside one browser view is not evidence of native inter-app transfer.

## Five runnable studies

The [iPadOS workshop](https://github.com/fareslaggoun7/apple-hig-skill/blob/main/examples/gallery/WORKSHOPS.md) includes persistent document drafts, responsive reflow, a live nonmodal inspector, a scoped save shortcut with a named-button equivalent, and an actual pointer canvas with named alternatives and a local clip-to-note action. Each study retains its own local state until reset, refresh, or topic change.

Inspect compact and wider containers, larger web text, light/dark appearance, keyboard focus, selection/draft preservation, pointer drawing, named alternatives, and shortcut scope. Native window management, multitasking, Pencil, VoiceOver, external displays, macOS behavior, and real inter-app dragging remain separate required checks when applicable. The browser’s sizes, layout thresholds, and canvas geometry are original teaching choices, not Apple measurements or native guarantees.

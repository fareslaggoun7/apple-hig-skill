# Designing for macOS: documents, commands, and personal workspaces

Begin with the actual work: quick tasks, sustained editing, multiple documents, other active apps, window sizes, displays, input methods, and deployment OS. The [overview](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos) describes large displays, stationary use, mixed physical inputs, and transitions between active and inactive apps. Do not simply enlarge a phone screen.

## Source-guided decisions

The complete overview and [Best practices](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos#Best-practices) were retrieved on 15 October 2026 and matched the inventory fingerprints. Apple recommends comfortable information density with fewer nested levels and less modality; resizable, movable, hideable windows and full-screen support; menu-bar commands; precision input; keyboard shortcuts; and personalization of tools and views. These recommendations describe native Mac behavior, not capabilities established by an HTML window illustration.

1. Define document identity, edited and saved state, selection, and window ownership. Preserve drafts when changing documents and resizing. For native file workflows, separately verify save, rename, duplicate, close, reopening, failure, and file coordination with the chosen SDK.
2. Put app commands in the appropriate native menu structure and expose relevant toolbar/context actions. Choose standard shortcuts where applicable. Read [the menu bar](https://developer.apple.com/design/human-interface-guidelines/the-menu-bar), [keyboards](https://developer.apple.com/design/human-interface-guidelines/keyboards), and [toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars). A web disclosure containing buttons illustrates discoverability, not native menu semantics.
3. Make editing recoverable. Test undo against actual prior content, disabled command states, keyboard-only completion, and return focus. Avoid swallowing system or text-editing shortcuts outside the relevant task.
4. Let people configure useful views and tools without losing their work. Keep hidden toolbar commands available through an appropriate command route. Personalization should serve the task rather than add decorative options.
5. Validate focused and resized layouts, precise adjustments, and named alternatives. Read [windows](https://developer.apple.com/design/human-interface-guidelines/windows) and [pointing devices](https://developer.apple.com/design/human-interface-guidelines/pointing-devices) before specifying native details. Test actual macOS window lifecycles, multiple displays, accessibility, menu behavior, activation, and full screen.

## Five runnable studies

The macOS workshop demonstrates independently preserved document drafts, a command disclosure with create/revise/undo, optional toolbar commands, a reversible focused layout, and precise marker positioning through both range and step controls. Ctrl+S/Command+S is scoped to the workspace with a visible save equivalent. Local saves are examples held in memory; refreshing or changing topics clears them.

Check compact/wide layouts, larger web text, both appearances, undo content, command availability, and keyboard completion. Web sizes and marker units are original choices. None proves native window management, menu-bar integration, persistent files, precision hardware, or assistive-technology conformance.

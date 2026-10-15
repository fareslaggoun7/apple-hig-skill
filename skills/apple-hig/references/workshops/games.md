# Designing for games: playable first, intentional on every platform

Start with the core loop, audience, target platform/OS, typical session, input methods, presentation, and accessibility needs. Read that platform’s workflow before adapting controls. The complete [games overview](https://developer.apple.com/design/human-interface-guidelines/designing-for-games) and all five guidance sections were retrieved on 15 October 2026 and matched the inventory.

## Build a useful first session

- [Jump into gameplay](https://developer.apple.com/design/human-interface-guidelines/designing-for-games#Jump-into-gameplay): provide playable content with the initial installation, sensible device/input/accessibility defaults, and teaching through play. Defer data requests to the context that requires them. Do not block play with unnecessary setup or ratings prompts.
- [Look stunning on every display](https://developer.apple.com/design/human-interface-guidelines/designing-for-games#Look-stunning-on-every-display): keep text legible, controls usable, graphics appropriate to resolution/scaling, safe areas respected, and menus adaptable to aspect ratios. Full-screen and spatial Full Space have platform-specific implications. Check real runtime layouts and input targets; do not convert a browser pixel size into native points.
- [Enable intuitive interactions](https://developer.apple.com/design/human-interface-guidelines/designing-for-games#Enable-intuitive-interactions): support expected platform inputs and alternatives to physical controllers. Read the complete platform-specific controls guidance. In web adaptations, scope game keys to the focused play area so text entry and surrounding navigation remain usable.
- [Welcome everyone](https://developer.apple.com/design/human-interface-guidelines/designing-for-games#Welcome-everyone): make important content perceivable without color or sound alone, support useful personalizations, represent varied identities, and review characters/stories for stereotypes. Accessibility needs user and device testing, not merely a settings panel.
- [Adopt Apple technologies](https://developer.apple.com/design/human-interface-guidelines/designing-for-games#Adopt-Apple-technologies): evaluate Game Center, GameSave, haptics, audio and relevant technologies where they serve the game. Check actual deployment availability, entitlements, permissions, connectivity, failure, and state recovery. A local checkpoint demonstrates no cross-device service.

## Preserve the source’s measurement conflict

The current display section’s prose says iOS buttons “must be at least 44x44 pt,” while its adjacent table lists **44x44 pt default** and **28x28 pt minimum** for iOS/iPadOS. Those are different statements. Preserve their provenance and scope; do not silently present 28 as a universal recommended touch target or claim the conflict is resolved. Consult the current Buttons/accessibility guidance and the actual task/runtime before choosing dimensions. The table also distinguishes default and minimum text sizes by platform. Never apply one platform’s row to all devices.

## Five runnable studies

An original four-column trail game starts immediately, teaches a named goal through play, preserves position when its aspect model changes, offers scoped Arrow/WASD mappings and named move buttons, uses text labels for player/goal, offers outline/caption choices, and supports pause plus in-memory checkpoint recovery. Completion, boundaries, disabled controls and play-again states work. There is no tracking, account, permission request, audio or background download.

Test completion through each available input route, paused/boundary behavior, actual restored progress, configuration changes, text enlargement, appearances and surrounding shortcut scope. Separately test performance, controller connection/remapping, native touch targets, safe areas, interruptions, accessibility technology, save conflicts and the real service/device integrations you implement. This browser game does not prove platform compliance or semantic accuracy.

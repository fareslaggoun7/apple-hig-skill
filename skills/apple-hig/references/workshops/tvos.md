# Designing for tvOS: focus and clarity across the room

Define the room, TV/display, typical viewing distance, shared viewers, primary content, session length and available inputs. The [overview](https://developer.apple.com/design/human-interface-guidelines/designing-for-tvos) describes a large stationary display used from many feet away, remote/controller/voice/other-device inputs, immersive sessions and possible picture-in-picture. A desktop monitor preview cannot validate living-room legibility.

The complete overview and [Best practices](https://developer.apple.com/design/human-interface-guidelines/designing-for-tvos#Best-practices) were reviewed on 15 October 2026 and matched the inventory. Apple prioritizes familiar Siri Remote interaction, the tvOS focus system, cinematic yet legible presentation, and easy infrequent sign-in with multiuser support.

## Design and verify the task

1. Use the native focus system and supported focus behavior for the actual app. Read [focus and selection](https://developer.apple.com/design/human-interface-guidelines/focus-and-selection) and [remote](https://developer.apple.com/design/human-interface-guidelines/remotes). Define initial focus, directional movement, selectable/disabled states, detail entry, Back and restored focus. Keep movement predictable when rows, content or profiles change.
2. Prioritize artwork and clear hierarchy while keeping labels, descriptions and actions legible at the actual viewing distance. Test real content, long/localized titles, light/dark scenes, larger accessibility text and the supported displays. Subtle animation must preserve orientation and respect applicable preferences.
3. Treat the screen as potentially shared. Keep each viewer’s saved state separate and respond appropriately when the system’s current viewer changes. Read [managing accounts](https://developer.apple.com/design/human-interface-guidelines/managing-accounts); verify system profile and shared sign-in integration with the target SDK.
4. Make sign-in concise, recoverable and infrequent where possible. Distinguish a code-entry teaching flow from real authentication. Actual implementations need code expiry, retry, cancellation, network failure, credential handling and account switching appropriate to their service.
5. For media, read [playing video](https://developer.apple.com/design/human-interface-guidelines/playing-video) and applicable service guidance. Verify actual playback controls, captions/audio, interruptions, state restoration, PiP availability and content rights. A smaller HTML story card is not video or native PiP.

## Five runnable studies

The workshop contains a directional story grid with one tab stop and detail/Back focus restoration; a larger-label comparison; independent Alex/Sam lists; a clearly bundled sample-code flow with error recovery; and a manually advanced illustrated story retaining chapter/play state when resized. Arrow movement follows the rendered grid columns, including the compact one-column layout. Named controls and ordinary Tab navigation remain available.

Test both layout widths and appearances, text enlargement, edge navigation, keyboard completion, restored focus, separate viewer state and actual recovery from invalid sample input. Native focus-engine behavior, Siri Remote gestures, living-room readability, VoiceOver, shared sign-in and media/PiP need separate device/runtime checks. All artwork, dimensions and content are original web examples.

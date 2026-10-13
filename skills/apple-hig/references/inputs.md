# Inputs

English HIG snapshot: 2026-10-13. Read applicable cards; verify exact measurements and changing behavior in the linked official sections. Cards condense guidance and are not exhaustive transcriptions.

<!-- topic:action-button -->
<a id="action-button"></a>
## Action button
Source: [Action button](https://developer.apple.com/design/human-interface-guidelines/action-button).
Platforms in page metadata: ios, watchos.

Expose frequently useful, essential functions through App Shortcuts for the Action button; a shortcut that merely opens the app is unnecessary. Use present-tense, verb-first labels with title-style capitalization and no more than three words. Prefer system configuration guidance. On iOS, let actions work through lightweight experiences where possible. On Apple Watch Ultra, a secondary press should logically support the chosen activity rather than unexpectedly end it.

Scope / uncertainty: Action button support depends on device; unavailable on iPadOS, macOS, tvOS, and visionOS.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/action-button), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/action-button#Best-practices), [iOS](https://developer.apple.com/design/human-interface-guidelines/action-button#iOS), [watchOS](https://developer.apple.com/design/human-interface-guidelines/action-button#watchOS).

<!-- topic:apple-pencil-and-scribble -->
<a id="apple-pencil-and-scribble"></a>
## Apple Pencil and Scribble
Source: [Apple Pencil and Scribble](https://developer.apple.com/design/human-interface-guidelines/apple-pencil-and-scribble).
Platforms in page metadata: ipados.

Let marking begin immediately when Apple Pencil touches the display, and make controls usable without forcing a switch to a finger. Use hover to preview outcomes rather than trigger actions. Make squeeze actions quick, nondestructive, and reversible, placing revealed UI close to the Pencil tip. With Scribble, keep the writing field stationary, suppress distracting suggestions and autoscrolling, and provide adequate writing space.

Scope / uncertainty: iPadOS; individual Pencil capabilities vary by model.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/apple-pencil-and-scribble#Best-practices), [Hover](https://developer.apple.com/design/human-interface-guidelines/apple-pencil-and-scribble#Hover), [Squeeze](https://developer.apple.com/design/human-interface-guidelines/apple-pencil-and-scribble#Squeeze), [Scribble](https://developer.apple.com/design/human-interface-guidelines/apple-pencil-and-scribble#Scribble).

<!-- topic:camera-control -->
<a id="camera-control"></a>
## Camera Control
Source: [Camera Control](https://developer.apple.com/design/human-interface-guidelines/camera-control).
Platforms in page metadata: ios.

Choose Camera Control sliders for continuous values and pickers for discrete options. Represent functions with supported SF Symbols, keep names short, and attach meaningful units to slider values. Define prominent values for commonly chosen settings. Keep app UI outside the overlay area in both orientations and avoid duplicating overlay controls. Enable or disable controls for the current camera mode; the documented overlay does not permit adding or removing controls at runtime.

Scope / uncertainty: The page identifies iPhone 16 and iPhone 16 Pro models; verify compatibility for the target device.

Evidence sections: [Anatomy](https://developer.apple.com/design/human-interface-guidelines/camera-control#Anatomy), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/camera-control#Best-practices).

<!-- topic:digital-crown -->
<a id="digital-crown"></a>
## Digital Crown
Source: [Digital Crown](https://developer.apple.com/design/human-interface-guidelines/digital-crown).
Platforms in page metadata: visionos, watchos.

On Apple Watch, organize vertical navigation around Crown rotation and back it with touch interactions. When navigation is unnecessary, consider rotation for inspecting data or adjusting controls. Keep visual changes responsive to rotation speed and retain default haptic detents when they suit the content. Crown presses belong to watchOS system actions. On Apple Vision Pro, the Crown controls system functions such as immersion, volume, recentering, and returning Home.

Scope / uncertainty: App-controlled Crown interaction is described for Apple Watch, not Apple Vision Pro.

Evidence sections: [Apple-Watch](https://developer.apple.com/design/human-interface-guidelines/digital-crown#Apple-Watch), [Apple-Vision-Pro](https://developer.apple.com/design/human-interface-guidelines/digital-crown#Apple-Vision-Pro).

<!-- topic:eyes -->
<a id="eyes"></a>
## Eyes
Source: [Eyes](https://developer.apple.com/design/human-interface-guidelines/eyes).
Platforms in page metadata: visionos.

Prefer standard hover feedback and spacious, rounded targets that are easy to look at without visual distractions. For sustained reading or interaction, aim to place content at least one meter away. Give custom compound controls an encompassing highlight shape. Custom hover effects are predefined states applied outside the app process; they cannot reveal when someone looks or perform gaze-triggered app actions. Keep a stable primary view and test effects on the device.

Scope / uncertainty: visionOS; eye hover is separate from connected-device focus navigation.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/eyes#Best-practices), [Making-items-easy-to-see](https://developer.apple.com/design/human-interface-guidelines/eyes#Making-items-easy-to-see), [Encouraging-interaction](https://developer.apple.com/design/human-interface-guidelines/eyes#Encouraging-interaction), [Custom-hover-effects](https://developer.apple.com/design/human-interface-guidelines/eyes#Custom-hover-effects).

<!-- topic:focus-and-selection -->
<a id="focus-and-selection"></a>
## Focus and selection
Source: [Focus and selection](https://developer.apple.com/design/human-interface-guidelines/focus-and-selection).
Platforms in page metadata: ipados, macos, tvos, visionos.

Prefer system focus effects and avoid moving focus without interaction, apart from the documented case of a disappearing item during directional navigation. Use rings for fields and highlights for lists where appropriate. On iPadOS, Tab moves between focus groups and arrow keys within them. On tvOS, ensure directional access to elements and allow focused scaling without collisions. In visionOS, distinguish connected-input focus from the separate eye-driven hover effect.

Scope / uncertainty: The page excludes iOS and watchOS.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/focus-and-selection#Best-practices), [iPadOS](https://developer.apple.com/design/human-interface-guidelines/focus-and-selection#iPadOS), [tvOS](https://developer.apple.com/design/human-interface-guidelines/focus-and-selection#tvOS), [visionOS](https://developer.apple.com/design/human-interface-guidelines/focus-and-selection#visionOS).

<!-- topic:game-controls -->
<a id="game-controls"></a>
## Game controls
Source: [Game controls](https://developer.apple.com/design/human-interface-guidelines/game-controls).
Platforms in page metadata: ios, ipados, macos, tvos, visionos.

Support the platform's familiar input as a fallback where possible, even when controllers are supported. On iPhone and iPad, favor direct object interaction where it works and place virtual controls within comfortable reach and safe areas. Frequently used touch controls need at least 44×44 pt; less important controls at least 28×28 pt. Match prompts to the actual connected controller, provide press feedback, and let keyboard players customize comfortable bindings.

Scope / uncertainty: watchOS lacks physical-controller support; tvOS and visionOS can require a controller with appropriate disclosure and connection handling.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/game-controls), [Touch-controls](https://developer.apple.com/design/human-interface-guidelines/game-controls#Touch-controls), [Physical-controllers](https://developer.apple.com/design/human-interface-guidelines/game-controls#Physical-controllers), [Keyboards](https://developer.apple.com/design/human-interface-guidelines/game-controls#Keyboards).

<!-- topic:gestures -->
<a id="gestures"></a>
## Gestures
Source: [Gestures](https://developer.apple.com/design/human-interface-guidelines/gestures).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Preserve familiar gesture meanings, respond immediately, and explain unavailable interactions through clear UI state. Provide alternatives to important gesture actions. Add custom gestures only for necessary specialized tasks; make them discoverable, simple, and distinct, retaining standard navigation. In visionOS, prefer indirect gestures for common UI and direct gestures for brief nearby manipulation. Custom hand gestures require a Full Space and permission, and must avoid conflicts with system overlay gestures.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/gestures#Best-practices), [Custom-gestures](https://developer.apple.com/design/human-interface-guidelines/gestures#Custom-gestures), [visionOS](https://developer.apple.com/design/human-interface-guidelines/gestures#visionOS), [Designing-custom-gestures-in-visionOS](https://developer.apple.com/design/human-interface-guidelines/gestures#Designing-custom-gestures-in-visionOS).

<!-- topic:gyro-and-accelerometer -->
<a id="gyro-and-accelerometer"></a>
## Gyroscope and accelerometer
Source: [Gyroscope and accelerometer](https://developer.apple.com/design/human-interface-guidelines/gyro-and-accelerometer).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Collect motion information only when it provides a tangible benefit, such as meaningful activity feedback or gameplay. Supply purpose copy explaining why access is needed for the system permission request. Outside active gameplay, avoid using gyroscope or accelerometer movement to manipulate the interface directly: reproducing motion precisely can be difficult, physically demanding, and costly in battery usage.

Scope / uncertainty: The overview describes iOS, iPadOS, and watchOS motion data and Siri Remote gyroscope data for tvOS.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/gyro-and-accelerometer), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/gyro-and-accelerometer#Best-practices).

<!-- topic:inputs -->
<a id="inputs"></a>
## Inputs
Source: [Inputs](https://developer.apple.com/design/human-interface-guidelines/inputs).
Platforms in page metadata: not specified.

Select the input-specific guidance for supported devices, covering hardware controls, Pencil, eyes, focus, controllers, gestures, motion, keyboards, nearby interactions, pointers, and remotes.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/inputs).

<!-- topic:keyboards -->
<a id="keyboards"></a>
## Keyboards
Source: [Keyboards](https://developer.apple.com/design/human-interface-guidelines/keyboards).
Platforms in page metadata: ios, ipados, macos, tvos, visionos.

Support and test Full Keyboard Access where available, respecting the distinction between standard iPadOS focus navigation and accessibility access to controls. Preserve familiar shortcuts; define custom shortcuts mainly for frequent app-specific actions. Prefer Command as the main modifier, using related modifiers consistently and checking localized keyboards. Let the system localize and mirror shortcuts. In visionOS, give discoverable shortcuts descriptive titles that make sense without submenu context.

Scope / uncertainty: Physical keyboards are not supported on Apple Watch; Full Keyboard Access availability varies by platform.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/keyboards#Best-practices), [Standard-keyboard-shortcuts](https://developer.apple.com/design/human-interface-guidelines/keyboards#Standard-keyboard-shortcuts), [Custom-keyboard-shortcuts](https://developer.apple.com/design/human-interface-guidelines/keyboards#Custom-keyboard-shortcuts), [visionOS](https://developer.apple.com/design/human-interface-guidelines/keyboards#visionOS).

<!-- topic:nearby-interactions -->
<a id="nearby-interactions"></a>
## Nearby interactions
Source: [Nearby interactions](https://developer.apple.com/design/human-interface-guidelines/nearby-interactions).
Platforms in page metadata: ios, ipados, watchos.

Use proximity, direction, and context to make a physical-world task feel natural, with continuous visual, audio, or haptic feedback suited to the activity. Provide another way to complete the task. Guide people toward portrait holding where appropriate, and explain that intervening objects or a peer outside the sensor's directional view can reduce information. Require permission and account for hardware support instead of assuming the interaction is always available.

Scope / uncertainty: Ultra Wideband hardware is required; Apple Watch provides distance and participating watchOS apps must remain foregrounded.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/nearby-interactions), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/nearby-interactions#Best-practices), [Device-usage](https://developer.apple.com/design/human-interface-guidelines/nearby-interactions#Device-usage), [watchOS](https://developer.apple.com/design/human-interface-guidelines/nearby-interactions#watchOS).

<!-- topic:pointing-devices -->
<a id="pointing-devices"></a>
## Pointing devices
Source: [Pointing devices](https://developer.apple.com/design/human-interface-guidelines/pointing-devices).
Platforms in page metadata: ios, ipados, macos, visionos.

Preserve familiar pointer and trackpad behavior and let people switch input modes without relearning tasks. On iPadOS, use highlight for small transparent elements, lift for small opaque elements, and hover for large elements. Keep custom effects useful and simple, with comfortable hit regions and contiguous regions for adjacent bar buttons. Distinguish pointer precision from touch only where it improves the task; avoid decorative effects and instructional text attached to the pointer.

Scope / uncertainty: Platform-specific pointer behavior differs; the page excludes tvOS and watchOS.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/pointing-devices#Best-practices), [iPadOS](https://developer.apple.com/design/human-interface-guidelines/pointing-devices#iPadOS), [Standard-pointers-and-effects](https://developer.apple.com/design/human-interface-guidelines/pointing-devices#Standard-pointers-and-effects), [Customizing-pointers](https://developer.apple.com/design/human-interface-guidelines/pointing-devices#Customizing-pointers).

<!-- topic:remotes -->
<a id="remotes"></a>
## Remotes
Source: [Remotes](https://developer.apple.com/design/human-interface-guidelines/remotes).
Platforms in page metadata: tvos.

Preserve standard remote gestures and move focus in the direction people gesture. Treat a press as intentional activation and consider accidental taps, especially during live playback. Normally, Back opens the parent in the app hierarchy rather than replaying visit history. During gameplay, use Back for the pause menu and resume behavior. Make Play/Pause control media as expected, and map compatible guide-browsing buttons according to whether people browse a guide or watch content.

Scope / uncertainty: tvOS; consult remote-specific capabilities and the documented gameplay exceptions.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/remotes#Best-practices), [Compatible-remotes](https://developer.apple.com/design/human-interface-guidelines/remotes#Compatible-remotes).

# Patterns

English HIG snapshot: 2026-10-13. Read applicable cards; verify exact measurements and changing behavior in the linked official sections. Cards condense guidance and are not exhaustive transcriptions.

<!-- topic:charting-data -->
<a id="charting-data"></a>
## Charting data
Source: [Charting data](https://developer.apple.com/design/human-interface-guidelines/charting-data).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Choose a chart when it reveals something meaningful about data, such as a trend or comparison. For simply providing values, a searchable or sortable table may serve better. Favor familiar chart forms and a clear message. Keep the initial view manageable, and let people reveal additional data or functionality when they want it rather than packing everything into one graphic.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/charting-data), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/charting-data#Best-practices), [Designing-effective-charts](https://developer.apple.com/design/human-interface-guidelines/charting-data#Designing-effective-charts).

<!-- topic:collaboration-and-sharing -->
<a id="collaboration-and-sharing"></a>
## Collaboration and sharing
Source: [Collaboration and sharing](https://developer.apple.com/design/human-interface-guidelines/collaboration-and-sharing).
Platforms in page metadata: ios, ipados, macos, visionos, watchos.

Put sharing within easy reach and use system sharing interfaces where suitable. Describe access and editing permissions briefly, offering a small, clearly grouped set of choices. Distinguish sending a copy from collaborative access according to your infrastructure. Custom collaboration needs universal-link support for the described Messages integration. In visionOS, account for shared-window streaming pausing when an app enters a Full Space.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/collaboration-and-sharing), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/collaboration-and-sharing#Best-practices), [visionOS](https://developer.apple.com/design/human-interface-guidelines/collaboration-and-sharing#visionOS).

<!-- topic:drag-and-drop -->
<a id="drag-and-drop"></a>
## Drag and drop
Source: [Drag and drop](https://developer.apple.com/design/human-interface-guidelines/drag-and-drop).
Platforms in page metadata: ios, ipados, macos, visionos.

Support dragging wherever it is useful, with continuous feedback about the operation and destination. Generally, dropping inside the same container moves content, while dropping into another container copies it; inter-app drops copy. Scroll a destination when needed to reach hidden content, stopping when the drag leaves it. Respect platform interactions, including gathering additional items into an iPadOS drag and spatial dragging in visionOS.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/drag-and-drop), [Providing-feedback](https://developer.apple.com/design/human-interface-guidelines/drag-and-drop#Providing-feedback), [Accepting-drops](https://developer.apple.com/design/human-interface-guidelines/drag-and-drop#Accepting-drops), [iOS-iPadOS](https://developer.apple.com/design/human-interface-guidelines/drag-and-drop#iOS-iPadOS).

<!-- topic:entering-data -->
<a id="entering-data"></a>
## Entering data
Source: [Entering data](https://developer.apple.com/design/human-interface-guidelines/entering-data).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Reduce typing by obtaining appropriate system information with permission, supplying sensible defaults, and offering selections when practical. Clearly identify requested information and support available input methods. Use protected entry for sensitive text, but never fill in a password automatically; instead support entry or appropriate authentication. On Mac, an expansion tooltip can reveal a field's clipped contents without forcing people to edit them.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/entering-data), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/entering-data#Best-practices), [macOS](https://developer.apple.com/design/human-interface-guidelines/entering-data#macOS).

<!-- topic:feedback -->
<a id="feedback"></a>
## Feedback
Source: [Feedback](https://developer.apple.com/design/human-interface-guidelines/feedback).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Match the intrusiveness of feedback to its consequence: status can remain nearby and passive, while a potential loss of work warrants attention. Combine understandable visual, textual, audio, or tactile signals so information remains accessible in different circumstances. Keep status associated with what it describes. On watchOS, avoid an indeterminate spinner that demands continued attention; indicate that completion will be announced.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/feedback), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/feedback#Best-practices), [watchOS](https://developer.apple.com/design/human-interface-guidelines/feedback#watchOS).

<!-- topic:file-management -->
<a id="file-management"></a>
## File management
Source: [File management](https://developer.apple.com/design/human-interface-guidelines/file-management).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Use familiar document creation and opening commands and respect the platform's file organization. Preserve edits automatically during work and when files close or the app backgrounds. Prefer the standard Mac file browser unless a substantial reason justifies customization. Use Quick Look to preview supported file types, including attachments your app cannot itself open, so people can inspect them without leaving their context.

Evidence sections: [Creating-and-opening-files](https://developer.apple.com/design/human-interface-guidelines/file-management#Creating-and-opening-files), [Saving-work](https://developer.apple.com/design/human-interface-guidelines/file-management#Saving-work), [Quick-Look-previews](https://developer.apple.com/design/human-interface-guidelines/file-management#Quick-Look-previews), [Custom-file-management](https://developer.apple.com/design/human-interface-guidelines/file-management#Custom-file-management).

<!-- topic:going-full-screen -->
<a id="going-full-screen"></a>
## Going full screen
Source: [Going full screen](https://developer.apple.com/design/human-interface-guidelines/going-full-screen).
Platforms in page metadata: ios, ipados, macos.

Offer full-screen presentation when it helps concentration or media immersion on iPhone, iPad, or Mac. Preserve essential controls and make temporarily hidden controls easy to restore. Adapt layout subtly without resizing the window programmatically. Keep Dock access except where a game's needs justify otherwise, preserve the person's place across switching, and let them decide when to leave. Use the system's Mac full-screen support.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/going-full-screen#Best-practices), [macOS](https://developer.apple.com/design/human-interface-guidelines/going-full-screen#macOS), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/going-full-screen#Platform-considerations).

<!-- topic:launching -->
<a id="launching"></a>
## Launching
Source: [Launching](https://developer.apple.com/design/human-interface-guidelines/launching).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Get people to usable content promptly and restore detailed prior state on return. Where a launch screen is required, make it closely resemble the initial interface and match current appearance and orientation; avoid fixed text and decorative branding there. Keep any splash presentation separate from launching. For immersive visionOS apps, consider beginning in Shared Space so people can choose the transition after receiving context.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/launching#Best-practices), [Launch-screens](https://developer.apple.com/design/human-interface-guidelines/launching#Launch-screens), [visionOS](https://developer.apple.com/design/human-interface-guidelines/launching#visionOS).

<!-- topic:live-viewing-apps -->
<a id="live-viewing-apps"></a>
## Live-viewing apps
Source: [Live-viewing apps](https://developer.apple.com/design/human-interface-guidelines/live-viewing-apps).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Make live programming prominent and immediately playable, with as little interaction as practical. Clearly distinguish live and on-demand material and consider showing how far an in-progress program has advanced. Keep playback primary while presenting supported alternatives, such as restart or recording, in a consistent order. If offering channel browsing during playback, keep its overlay readable and visibly identify the channel already playing.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/live-viewing-apps), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/live-viewing-apps#Best-practices).

<!-- topic:loading -->
<a id="loading"></a>
## Loading
Source: [Loading](https://developer.apple.com/design/human-interface-guidelines/loading).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Display useful content or placeholders quickly and load remaining material in the background where possible. Let people continue other activities, and make unavoidable waiting informative without repeating filler. Use determinate progress when duration is known and indeterminate progress otherwise. On Apple Watch, aim for immediate content; a short loading indication is preferable to an empty display when a brief wait cannot be avoided.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/loading#Best-practices), [Showing-progress](https://developer.apple.com/design/human-interface-guidelines/loading#Showing-progress), [watchOS](https://developer.apple.com/design/human-interface-guidelines/loading#watchOS).

<!-- topic:managing-accounts -->
<a id="managing-accounts"></a>
## Managing accounts
Source: [Managing accounts](https://developer.apple.com/design/human-interface-guidelines/managing-accounts).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Require an account only when core functionality needs one, explain its benefit, and defer authentication until people have experienced value. Consider Sign in with Apple; otherwise prefer passkeys on the documented platforms. Identify only authentication methods actually available in the context. If your app lets people create an account, it must also support deletion of the account rather than merely disabling it.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/managing-accounts), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/managing-accounts#Best-practices), [Deleting-accounts](https://developer.apple.com/design/human-interface-guidelines/managing-accounts#Deleting-accounts).

<!-- topic:managing-notifications -->
<a id="managing-notifications"></a>
## Managing notifications
Source: [Managing notifications](https://developer.apple.com/design/human-interface-guidelines/managing-notifications).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Obtain permission and respect delivery scheduling and Focus choices. Classify communication and other notifications appropriately, representing urgency accurately instead of escalating routine updates. Reserve Time Sensitive alerts for something happening now or within an hour. Marketing messages require explicit agreement to receive promotional content; do not treat general notification authorization as sufficient consent for that purpose.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/managing-notifications), [Integrating-with-Focus](https://developer.apple.com/design/human-interface-guidelines/managing-notifications#Integrating-with-Focus), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/managing-notifications#Best-practices), [Sending-marketing-notifications](https://developer.apple.com/design/human-interface-guidelines/managing-notifications#Sending-marketing-notifications).

<!-- topic:modality -->
<a id="modality"></a>
## Modality
Source: [Modality](https://developer.apple.com/design/human-interface-guidelines/modality).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Interrupt with a modal only when focus or a consequential choice benefits the person. Keep the task identifiable, brief, and easy to exit, avoiding complicated nested navigation. Provide a clear dismissal action and protect unsaved work before closing. Dismiss one modal before introducing another where possible; never show multiple alerts simultaneously. Consider a fuller presentation when sustained work legitimately needs extra space and concentration.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/modality#Best-practices).

<!-- topic:multitasking -->
<a id="multitasking"></a>
## Multitasking
Source: [Multitasking](https://developer.apple.com/design/human-interface-guidelines/multitasking).
Platforms in page metadata: ios, ipados, macos, tvos, visionos.

Prepare to preserve and restore context whenever people change apps. Pause activities that need active attention so people can resume without missing content. Handle brief audio interruptions differently from a new primary listening activity, restoring playback appropriately. Design for each platform's multitasking model, including concurrent windows on iPad and Mac and the distinction between Shared Space and Full Space in visionOS.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/multitasking#Best-practices), [iPadOS](https://developer.apple.com/design/human-interface-guidelines/multitasking#iPadOS), [macOS](https://developer.apple.com/design/human-interface-guidelines/multitasking#macOS), [visionOS](https://developer.apple.com/design/human-interface-guidelines/multitasking#visionOS).

<!-- topic:offering-help -->
<a id="offering-help"></a>
## Offering help
Source: [Offering help](https://developer.apple.com/design/human-interface-guidelines/offering-help).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Relate help to the person's current task and actual device or input method, keeping terminology consistent and dismissal easy. Explain app-specific actions rather than reteaching familiar system controls. Use short, actionable tips for simple discoveries; a feature taking more than three actions is probably too complex for one tip. Choose inline or popover placement according to surrounding content and the need to identify a control.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/offering-help#Best-practices), [Creating-tips](https://developer.apple.com/design/human-interface-guidelines/offering-help#Creating-tips).

<!-- topic:onboarding -->
<a id="onboarding"></a>
## Onboarding
Source: [Onboarding](https://developer.apple.com/design/human-interface-guidelines/onboarding).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

When onboarding is needed, keep it brief and engaging after launch completes. Prefer safe hands-on learning or instructions beside the feature people are using. Make a separate tutorial optional when appropriate, remember when people skip it, and leave it discoverable later. Focus on the app's experience, use practical defaults, and postpone nonessential configuration instead of blocking initial interaction.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/onboarding), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/onboarding#Best-practices), [Additional-requests](https://developer.apple.com/design/human-interface-guidelines/onboarding#Additional-requests).

<!-- topic:patterns -->
<a id="patterns"></a>
## Patterns
Source: [Patterns](https://developer.apple.com/design/human-interface-guidelines/patterns).
Platforms in page metadata: not specified.

Use this collection to locate guidance for recurring actions, tasks, and experiences, then apply the relevant pattern alongside its platform-specific considerations.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/patterns).

<!-- topic:playing-audio -->
<a id="playing-audio"></a>
## Playing audio
Source: [Playing audio](https://developer.apple.com/design/human-interface-guidelines/playing-audio).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Choose audio behavior that matches people's expectations for silence, background playback, and coexistence with other sound. Respect system volume, adjusting only the mix within your experience. Support output routing when possible and prefer the standard volume controls. Reroute smoothly when headphones connect and pause promptly when they disconnect. Treat explicitly requested playback differently from incidental effects when the device is silenced.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/playing-audio), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/playing-audio#Best-practices).

<!-- topic:playing-haptics -->
<a id="playing-haptics"></a>
## Playing haptics
Source: [Playing haptics](https://developer.apple.com/design/human-interface-guidelines/playing-haptics).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Use familiar haptic patterns for their intended meaning and maintain a predictable relationship between an action and its tactile result. Complement other feedback, matching timing and intensity to the visual or audio event. Avoid excessive repetition and test the experience with people. Select patterns and custom effects according to the supported device or connected accessory rather than assuming every platform offers identical tactile capabilities.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/playing-haptics), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/playing-haptics#Best-practices), [Custom-haptics](https://developer.apple.com/design/human-interface-guidelines/playing-haptics#Custom-haptics).

<!-- topic:playing-video -->
<a id="playing-video"></a>
## Playing video
Source: [Playing video](https://developer.apple.com/design/human-interface-guidelines/playing-video).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Prefer the built-in video player and familiar playback behavior. Keep video at its native aspect ratio and avoid embedded bars that interfere with scaling or Picture in Picture. When integrating with the TV app, transition cleanly into playback and help people remain oriented when it ends. Avoid unnecessary loading screens; if loading exceeds two seconds, consider the documented plain loading treatment.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/playing-video#Best-practices), [Integrating-with-the-TV-app](https://developer.apple.com/design/human-interface-guidelines/playing-video#Integrating-with-the-TV-app), [Exiting-playback](https://developer.apple.com/design/human-interface-guidelines/playing-video#Exiting-playback), [Loading-content](https://developer.apple.com/design/human-interface-guidelines/playing-video#Loading-content).

<!-- topic:printing -->
<a id="printing"></a>
## Printing
Source: [Printing](https://developer.apple.com/design/human-interface-guidelines/printing).
Platforms in page metadata: ios, ipados, macos, visionos.

Place printing where people expect to find it and use the standard print interface for relevant printer-supported options. When printing is impossible, disable the Mac menu command and remove the iOS or iPadOS action; hide or disable custom buttons as appropriate. On Mac, add an app-specific options category only when needed and make dependent or advanced options understandable.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/printing#Best-practices), [macOS](https://developer.apple.com/design/human-interface-guidelines/printing#macOS).

<!-- topic:ratings-and-reviews -->
<a id="ratings-and-reviews"></a>
## Ratings and reviews
Source: [Ratings and reviews](https://developer.apple.com/design/human-interface-guidelines/ratings-and-reviews).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Request a rating after meaningful engagement and at a natural stopping point, avoiding first launch, onboarding, and active tasks. Leave substantial time between requests rather than repeatedly interrupting people. On iOS, iPadOS, and macOS, prefer the standard review prompt; the documented limit is three displays per app during a 365-day period. Weigh a summary-rating reset against the loss of accumulated ratings visible to prospective users.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/ratings-and-reviews#Best-practices).

<!-- topic:searching -->
<a id="searching"></a>
## Searching
Source: [Searching](https://developer.apple.com/design/human-interface-guidelines/searching).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Make important search easy to find, ideally through one clear entry point covering the app's content. If a local search is useful, visibly communicate its scope. Suggestions and prior queries can reduce typing, but consider privacy and let people erase displayed history. For supported system search, index appropriate content with descriptive metadata so it can be found outside the app.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/searching#Best-practices), [Systemwide-search](https://developer.apple.com/design/human-interface-guidelines/searching#Systemwide-search).

<!-- topic:settings -->
<a id="settings"></a>
## Settings
Source: [Settings](https://developer.apple.com/design/human-interface-guidelines/settings).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Choose useful defaults and offer only settings that people need, respecting their system preferences. Put frequent task-specific choices beside the task and infrequently changed general options in the app's settings area. Follow expected platform access patterns and keyboard shortcuts where relevant; watchOS apps instead expose a small set of essential choices within the app.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/settings#Best-practices), [General-settings](https://developer.apple.com/design/human-interface-guidelines/settings#General-settings), [Task-specific-options](https://developer.apple.com/design/human-interface-guidelines/settings#Task-specific-options), [watchOS](https://developer.apple.com/design/human-interface-guidelines/settings#watchOS).

<!-- topic:undo-and-redo -->
<a id="undo-and-redo"></a>
## Undo and redo
Source: [Undo and redo](https://developer.apple.com/design/human-interface-guidelines/undo-and-redo).
Platforms in page metadata: ios, ipados, macos, visionos.

Help people foresee what undo or redo will change and visibly reveal its effect, even when the affected content has moved offscreen. Support repeated reversal without arbitrary restrictions and consider grouping related adjustments. Preserve standard gestures and keyboard behavior. On Mac, place the commands in Edit and support Command–Z and Shift–Command–Z; add dedicated toolbar controls only when useful.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/undo-and-redo#Best-practices), [iOS-iPadOS](https://developer.apple.com/design/human-interface-guidelines/undo-and-redo#iOS-iPadOS), [macOS](https://developer.apple.com/design/human-interface-guidelines/undo-and-redo#macOS).

<!-- topic:workouts -->
<a id="workouts"></a>
## Workouts
Source: [Workouts](https://developer.apple.com/design/human-interface-guidelines/workouts).
Platforms in page metadata: ios, ipados, watchos.

During an Apple Watch workout session, prioritize the live metrics and controls relevant to the current activity. Make an active session visually recognizable and provide easy pause, resume, and stop actions with clear start and finish feedback. Keep unrelated navigation out of the workout flow. When sensors cannot supply certain measurements, explain what information remains available and how the experience continues.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/workouts#Best-practices).

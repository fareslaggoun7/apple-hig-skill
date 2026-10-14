# Technologies

English HIG snapshot: 2026-10-14. Read applicable cards; verify exact measurements and changing behavior in the linked official sections. Cards condense guidance and are not exhaustive transcriptions.

<!-- topic:airplay -->
<a id="airplay"></a>
## AirPlay
Source: [AirPlay](https://developer.apple.com/design/human-interface-guidelines/airplay).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Prefer the built-in player and supply the available resolution range so playback can suit the destination. Support streaming, mirroring, and remote playback commands. Keep explicitly streamed media playing when the source app backgrounds or the device locks, while avoiding automatic mirroring that could expose unrelated content. Do not take over another app's playback merely to show incidental or automatically playing video.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/airplay#Best-practices).

<!-- topic:always-on -->
<a id="always-on"></a>
## Always On
Source: [Always On](https://developer.apple.com/design/human-interface-guidelines/always-on).
Platforms in page metadata: ios, watchos.

For supported iPhone and Apple Watch displays, make the resting interface useful at a glance while concealing sensitive information. Preserve the spatial arrangement, dim secondary details, and keep essential information readable. Prefer subdued, infrequent changes, and let ongoing animation settle smoothly. When interaction becomes unavailable, visually disable its control rather than abruptly removing it.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/always-on), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/always-on#Best-practices).

<!-- topic:app-clips -->
<a id="app-clips"></a>
## App Clips
Source: [App Clips](https://developer.apple.com/design/human-interface-guidelines/app-clips).
Platforms in page metadata: ios, ipados.

On iOS and iPadOS, let the App Clip finish its focused task or demonstration without requiring the full app. Keep navigation linear, launch into the relevant context, include necessary assets, and remove unnecessary code and steps. Use native experiences with practical value rather than advertising. Make App Clip Codes discoverable with clear instructions and verify printed scanning quality. If using temporary notifications, respect the documented window of up to 8 hours after launch.

Evidence sections: [Designing-your-App-Clip](https://developer.apple.com/design/human-interface-guidelines/app-clips#Designing-your-App-Clip), [Limiting-notifications](https://developer.apple.com/design/human-interface-guidelines/app-clips#Limiting-notifications), [Using-clear-messaging](https://developer.apple.com/design/human-interface-guidelines/app-clips#Using-clear-messaging), [Verifying-your-printers-calibration](https://developer.apple.com/design/human-interface-guidelines/app-clips#Verifying-your-printers-calibration).

<!-- topic:apple-in-app-purchase -->
<a id="apple-in-app-purchase"></a>
## Apple In-App Purchase
Source: [Apple In-App Purchase](https://developer.apple.com/design/human-interface-guidelines/apple-in-app-purchase).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Use in-app purchases for digital content and services, choosing the purchase type that matches whether access is consumed, permanent, or subscription based. Explain subscription value and terms clearly during signup. Offer convenient purchase assistance and the system refund flow when appropriate. For subscriptions, provide a place to change or cancel the plan inside the app.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/apple-in-app-purchase), [Auto-renewable-subscriptions](https://developer.apple.com/design/human-interface-guidelines/apple-in-app-purchase#Auto-renewable-subscriptions), [Providing-help](https://developer.apple.com/design/human-interface-guidelines/apple-in-app-purchase#Providing-help), [Helping-people-manage-their-subscriptions](https://developer.apple.com/design/human-interface-guidelines/apple-in-app-purchase#Helping-people-manage-their-subscriptions).

<!-- topic:apple-pay -->
<a id="apple-pay"></a>
## Apple Pay
Source: [Apple Pay](https://developer.apple.com/design/human-interface-guidelines/apple-pay).
Platforms in page metadata: ios, ipados, macos, visionos, watchos.

Use Apple Pay for eligible physical purchases, services, and donations. Offer it where supported; if you query whether an active Wallet card exists, make it the primary payment choice wherever those APIs are used. Keep checkout integrated and create payment buttons with Apple's APIs. Give actionable error guidance, and cancel an in-progress payment when cancellation or timeout interrupts the flow.

Evidence sections: [Offering-Apple-Pay](https://developer.apple.com/design/human-interface-guidelines/apple-pay#Offering-Apple-Pay), [Streamlining-checkout](https://developer.apple.com/design/human-interface-guidelines/apple-pay#Streamlining-checkout), [Using-Apple-Pay-buttons](https://developer.apple.com/design/human-interface-guidelines/apple-pay#Using-Apple-Pay-buttons), [Payment-processing-problems](https://developer.apple.com/design/human-interface-guidelines/apple-pay#Payment-processing-problems).

<!-- topic:augmented-reality -->
<a id="augmented-reality"></a>
## Augmented reality
Source: [Augmented reality](https://developer.apple.com/design/human-interface-guidelines/augmented-reality).
Platforms in page metadata: ios, ipados, visionos.

For iOS and iPadOS AR, offer capabilities only on compatible devices and give the scene most of the display. Make realistic objects fit detected surfaces, scale, and lighting, with scene updates 60 times per second. Consider built-in coaching for initialization and recovery after interruptions. Offer an easy restart when placement fails. Consult the separate visionOS section before applying handheld guidance to spatial experiences.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/augmented-reality), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/augmented-reality#Best-practices), [Providing-coaching](https://developer.apple.com/design/human-interface-guidelines/augmented-reality#Providing-coaching), [Suggesting-problem-resolutions](https://developer.apple.com/design/human-interface-guidelines/augmented-reality#Suggesting-problem-resolutions).

<!-- topic:carplay -->
<a id="carplay"></a>
## CarPlay
Source: [CarPlay](https://developer.apple.com/design/human-interface-guidelines/carplay).
Platforms in page metadata: ios.

Design for drivers completing brief tasks with little interaction. Use the system templates suited to your app category, letting CarPlay handle display adaptation and vehicle input. Require any iPhone setup before driving; the in-car experience must work with a locked or inaccessible iPhone. Avoid demanding phone input or blocking CarPlay while a phone-side issue waits to be resolved. The page also describes audio and video apps on Apple HomeView; inspect the linked platform and API guidance before making availability claims.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/carplay), [iPhone-interactions](https://developer.apple.com/design/human-interface-guidelines/carplay#iPhone-interactions).

<!-- topic:carekit -->
<a id="carekit"></a>
## CareKit
Source: [CareKit](https://developer.apple.com/design/human-interface-guidelines/carekit).
Platforms in page metadata: ios, ipados.

Build care-plan experiences around appropriate task, chart, and contact views, using progress information that helps people follow their plan and reach their care team. Protect sensitive records and provide an understandable privacy policy. Request access to health, motion, or photo information in the relevant context and with permission. Consider ResearchKit's consent and survey capabilities when they fit the care experience.

Evidence sections: [CareKit-views](https://developer.apple.com/design/human-interface-guidelines/carekit#CareKit-views), [Data-and-privacy](https://developer.apple.com/design/human-interface-guidelines/carekit#Data-and-privacy), [HealthKit-integration](https://developer.apple.com/design/human-interface-guidelines/carekit#HealthKit-integration), [ResearchKit-integration](https://developer.apple.com/design/human-interface-guidelines/carekit#ResearchKit-integration).

<!-- topic:game-center -->
<a id="game-center"></a>
## Game Center
Source: [Game Center](https://developer.apple.com/design/human-interface-guidelines/game-center).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Establish the player's Game Center status at launch and integrate its social and progress features coherently. Show the access point on menu or settings screens rather than during gameplay, leaving room for its expanded state. Consider pausing while the overlay or dashboard is open. Align achievements with Game Center's defined states, and give different achievements distinctive, rewarding artwork.

Evidence sections: [Accessing-Game-Center](https://developer.apple.com/design/human-interface-guidelines/game-center#Accessing-Game-Center), [Integrating-the-access-point](https://developer.apple.com/design/human-interface-guidelines/game-center#Integrating-the-access-point), [Integrating-achievements-into-your-game](https://developer.apple.com/design/human-interface-guidelines/game-center#Integrating-achievements-into-your-game), [Creating-achievement-images](https://developer.apple.com/design/human-interface-guidelines/game-center#Creating-achievement-images).

<!-- topic:generative-ai -->
<a id="generative-ai"></a>
## Generative AI
Source: [Generative AI](https://developer.apple.com/design/human-interface-guidelines/generative-ai).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Add generation where it provides a clear benefit, disclose its use and limitations, and keep people able to edit, reject, retry, or reverse results. Consider a usable alternative when AI is complementary or unavailable. Assess diverse users and inputs for harmful assumptions. Choose processing that fits the feature while protecting privacy; minimize server-bound information and explain off-device handling. Retest model changes for unexpected behavior.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/generative-ai#Best-practices), [Transparency](https://developer.apple.com/design/human-interface-guidelines/generative-ai#Transparency), [Privacy](https://developer.apple.com/design/human-interface-guidelines/generative-ai#Privacy), [Continuous-improvement](https://developer.apple.com/design/human-interface-guidelines/generative-ai#Continuous-improvement).

<!-- topic:healthkit -->
<a id="healthkit"></a>
## HealthKit
Source: [HealthKit](https://developer.apple.com/design/human-interface-guidelines/healthkit).
Platforms in page metadata: ios, ipados, watchos.

Request health information only for relevant health or fitness functionality, at the moment it is needed. Explain the benefit in the standard permission interface, protect the information, and publish a clear privacy policy. Remember that permission can change. If showing Activity rings or Apple Health branding, follow the dedicated presentation and naming guidance rather than repurposing recognizable elements.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/healthkit), [Privacy-protection](https://developer.apple.com/design/human-interface-guidelines/healthkit#Privacy-protection), [Activity-rings](https://developer.apple.com/design/human-interface-guidelines/healthkit#Activity-rings), [Apple-Health-icon](https://developer.apple.com/design/human-interface-guidelines/healthkit#Apple-Health-icon).

<!-- topic:homekit -->
<a id="homekit"></a>
## HomeKit
Source: [HomeKit](https://developer.apple.com/design/human-interface-guidelines/homekit).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Follow HomeKit's household hierarchy and familiar terminology so app controls, automations, and voice requests stay understandable. Use the standard accessory setup experience, then highlight your accessory's distinctive capabilities. Suggest practical names suited to Siri instead of company or model names. Treat rooms as meaningful groupings and zones as optional collections of rooms that make broader control convenient.

Evidence sections: [Terminology-and-layout](https://developer.apple.com/design/human-interface-guidelines/homekit#Terminology-and-layout), [Setup](https://developer.apple.com/design/human-interface-guidelines/homekit#Setup), [Help-people-choose-useful-names](https://developer.apple.com/design/human-interface-guidelines/homekit#Help-people-choose-useful-names), [Zones](https://developer.apple.com/design/human-interface-guidelines/homekit#Zones).

<!-- topic:id-verifier -->
<a id="id-verifier"></a>
## ID Verifier
Source: [ID Verifier](https://developer.apple.com/design/human-interface-guidelines/id-verifier).
Platforms in page metadata: ios.

For in-person mobile-ID checks on supported iPhones, ask for the smallest amount of information that completes the verification. An age-threshold check should not request a birth date merely to establish eligibility. Use a display-only request for visual confirmation when app access to identity data is unnecessary. A data-transfer request is reserved for a legal verification need requiring processing or retention and needs the additional entitlement.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/id-verifier), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/id-verifier#Best-practices).

<!-- topic:live-photos -->
<a id="live-photos"></a>
## Live Photos
Source: [Live Photos](https://developer.apple.com/design/human-interface-guidelines/live-photos).
Platforms in page metadata: ios, ipados, macos, tvos, visionos.

Preserve a Live Photo's combined sound and moving imagery rather than presenting its pieces separately. Apply edits across its frames or offer conversion to a still. Let people preview all content before sharing and choose a still version. Indicate download progress and playability. Distinguish Live Photos through restrained movement or the standard badge, and show a still in environments without support.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/live-photos#Best-practices).

<!-- topic:mac-catalyst -->
<a id="mac-catalyst"></a>
## Mac Catalyst
Source: [Mac Catalyst](https://developer.apple.com/design/human-interface-guidelines/mac-catalyst).
Platforms in page metadata: ipados, macos.

Assess whether the iPad experience depends on capabilities unavailable on Mac before adapting it with Catalyst. Build on support for keyboard navigation, dragging, resizing, and multiple windows. Choose the appropriate interface idiom, then adapt navigation, layout, icons, and menus for Mac expectations. Provide a complete menu bar and comfortable pointer and keyboard behavior instead of assuming the original touch layout is sufficient.

Evidence sections: [Before-you-start](https://developer.apple.com/design/human-interface-guidelines/mac-catalyst#Before-you-start), [Choose-an-idiom](https://developer.apple.com/design/human-interface-guidelines/mac-catalyst#Choose-an-idiom), [Integrate-the-Mac-experience](https://developer.apple.com/design/human-interface-guidelines/mac-catalyst#Integrate-the-Mac-experience), [Menus](https://developer.apple.com/design/human-interface-guidelines/mac-catalyst#Menus).

<!-- topic:machine-learning -->
<a id="machine-learning"></a>
## Machine learning
Source: [Machine learning](https://developer.apple.com/design/human-interface-guidelines/machine-learning).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Define the feature's role before designing its interface: whether it is essential, what sensitive data it needs, and how visible or proactive it should be. Plan for mistakes and explain meaningful limits so expectations remain realistic. Consider offering alternative results and corrections to preserve control. Where useful, explain the rationale for a result rather than exposing technical model details.

Evidence sections: [The-role-of-machine-learning-in-your-app](https://developer.apple.com/design/human-interface-guidelines/machine-learning#The-role-of-machine-learning-in-your-app), [Mistakes](https://developer.apple.com/design/human-interface-guidelines/machine-learning#Mistakes), [Limitations](https://developer.apple.com/design/human-interface-guidelines/machine-learning#Limitations), [Attribution](https://developer.apple.com/design/human-interface-guidelines/machine-learning#Attribution).

<!-- topic:maps -->
<a id="maps"></a>
## Maps
Source: [Maps](https://developer.apple.com/design/human-interface-guidelines/maps).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Normally support familiar map exploration and make selected places clear. Choose standard emphasis for ordinary maps or muted emphasis when custom information should stand out. Offer relevant search and category filtering, and consider place cards for richer location details. Apple Watch maps differ: they are noninteractive snapshots that open Maps when tapped and can contain up to five annotations.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/maps#Best-practices), [Place-cards](https://developer.apple.com/design/human-interface-guidelines/maps#Place-cards), [watchOS](https://developer.apple.com/design/human-interface-guidelines/maps#watchOS).

<!-- topic:nfc -->
<a id="nfc"></a>
## NFC
Source: [NFC](https://developer.apple.com/design/human-interface-guidelines/nfc).
Platforms in page metadata: ios, ipados.

For supported tag-reading experiences, explain the object to scan using short, friendly instructions and the system scanning sheet. Describe bringing the device near the object, avoiding wording that requires physical contact or knowledge of NFC terminology. Update instructions for subsequent scans. Account for background reading being unavailable during competing uses such as camera or Wallet activity, Airplane Mode, or the locked state after restart.

Evidence sections: [In-app-tag-reading](https://developer.apple.com/design/human-interface-guidelines/nfc#In-app-tag-reading), [Background-tag-reading](https://developer.apple.com/design/human-interface-guidelines/nfc#Background-tag-reading).

<!-- topic:photo-editing -->
<a id="photo-editing"></a>
## Photo editing
Source: [Photo editing](https://developer.apple.com/design/human-interface-guidelines/photo-editing).
Platforms in page metadata: ios, ipados, macos.

Within a Photos editing extension, preserve a clear preview of the person's changes and use the host's existing top toolbar. Ask before discarding edits when cancellation would lose work, while skipping that confirmation when nothing changed. Use the app's own icon for the extension. Respect the Photos workflow, which saves edited results while retaining the originals.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/photo-editing), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/photo-editing#Best-practices).

<!-- topic:researchkit -->
<a id="researchkit"></a>
## ResearchKit
Source: [ResearchKit](https://developer.apple.com/design/human-interface-guidelines/researchkit).
Platforms in page metadata: ios, ipados.

Order research onboarding as introduction, eligibility, informed consent, then required data permissions. Explain only necessary eligibility criteria early and make consent understandable, with digestible sections and access to the complete form before agreement. Describe why essential device information is requested. Give returning participants a direct route back to the study and accessible ways to manage personal details and see progress.

Evidence sections: [Creating-the-onboarding-experience](https://developer.apple.com/design/human-interface-guidelines/researchkit#Creating-the-onboarding-experience), [3-Get-informed-consent](https://developer.apple.com/design/human-interface-guidelines/researchkit#3-Get-informed-consent), [4-Request-permission-to-access-data](https://developer.apple.com/design/human-interface-guidelines/researchkit#4-Request-permission-to-access-data), [Managing-personal-information-and-providing-encouragement](https://developer.apple.com/design/human-interface-guidelines/researchkit#Managing-personal-information-and-providing-encouragement).

<!-- topic:shareplay -->
<a id="shareplay"></a>
## SharePlay
Source: [SharePlay](https://developer.apple.com/design/human-interface-guidelines/shareplay).
Platforms in page metadata: ios, ipados, macos, tvos, visionos.

Design SharePlay around simultaneous participation, with recognizable entry and a direct route into shared content. Adapt to different devices and participant roles, minimizing prerequisites and unrelated setup. If continued asynchronous work matters, offer another way to save or share afterward. On visionOS, preserve a coherent shared spatial context and choose an appropriate seating template rather than assuming every participant uses a spatial Persona.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/shareplay#Best-practices), [Designing-shared-activities](https://developer.apple.com/design/human-interface-guidelines/shareplay#Designing-shared-activities), [Spatial-templates](https://developer.apple.com/design/human-interface-guidelines/shareplay#Spatial-templates), [Custom-templates](https://developer.apple.com/design/human-interface-guidelines/shareplay#Custom-templates).

<!-- topic:shazamkit -->
<a id="shazamkit"></a>
## ShazamKit
Source: [ShazamKit](https://developer.apple.com/design/human-interface-guidelines/shazamkit).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Use audio recognition to support a concrete experience, such as synchronized content or accessible media enhancements. If recognition needs microphone input, explain the purpose and request permission first. End recording once the necessary sample is captured instead of leaving the microphone active. Obtain a separate opt-in before saving recognized songs from your app to the person's iCloud library.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/shazamkit), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/shazamkit#Best-practices).

<!-- topic:sign-in-with-apple -->
<a id="sign-in-with-apple"></a>
## Sign in with Apple
Source: [Sign in with Apple](https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Explain the benefit of authentication and defer it until useful. Consider linking an existing account so people retain their information. Request little additional personal data, explaining any necessity. Prefer system-created buttons for a consistent presentation; if customization is necessary, follow the dedicated artwork, contrast, sizing, and platform rules rather than treating the Apple logo as unrestricted decoration.

Evidence sections: [Offering-Sign-in-with-Apple](https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple#Offering-Sign-in-with-Apple), [Collecting-data](https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple#Collecting-data), [Using-the-system-provided-buttons](https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple#Using-the-system-provided-buttons), [Creating-a-custom-Sign-in-with-Apple-button](https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple#Creating-a-custom-Sign-in-with-Apple-button).

<!-- topic:siri -->
<a id="siri"></a>
## Siri
Source: [Siri](https://developer.apple.com/design/human-interface-guidelines/siri).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Prioritize useful app actions and relevant content for Siri, exposing them through the documented intents and entities approach. Use names people already recognize and supply meaningful context for onscreen or searchable content where appropriate. Prefer built-in responses unless they cannot express the task, and keep advertisements out of delivered content. Use app schemas or shortcuts according to the supported integration path.

Scope / uncertainty: Verify device, OS, language, and regional availability in current implementation documentation before promising a Siri capability.

Evidence sections: [Getting-your-app-to-work-with-Siri](https://developer.apple.com/design/human-interface-guidelines/siri#Getting-your-app-to-work-with-Siri), [Sharing-contextual-information](https://developer.apple.com/design/human-interface-guidelines/siri#Sharing-contextual-information), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/siri#Best-practices), [Customizing-your-apps-experience-with-Siri](https://developer.apple.com/design/human-interface-guidelines/siri#Customizing-your-apps-experience-with-Siri).

<!-- topic:tap-to-pay-on-iphone -->
<a id="tap-to-pay-on-iphone"></a>
## Tap to Pay on iPhone
Source: [Tap to Pay on iPhone](https://developer.apple.com/design/human-interface-guidelines/tap-to-pay-on-iphone).
Platforms in page metadata: ios.

Prepare merchants before a customer checkout: arrange the supported payment-provider integration and entitlement, and collect required terms acceptance from an administrator before device configuration. Follow provider-specific setup requirements. Distinguish successful card reading from the eventual transaction outcome; after a successful tap, your app still needs to report processing results. When reading fails, help the merchant offer another payment method.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/tap-to-pay-on-iphone), [Enabling-Tap-to-Pay-on-iPhone](https://developer.apple.com/design/human-interface-guidelines/tap-to-pay-on-iphone#Enabling-Tap-to-Pay-on-iPhone), [Displaying-results](https://developer.apple.com/design/human-interface-guidelines/tap-to-pay-on-iphone#Displaying-results).

<!-- topic:technologies -->
<a id="technologies"></a>
## Technologies
Source: [Technologies](https://developer.apple.com/design/human-interface-guidelines/technologies).
Platforms in page metadata: not specified.

Use this collection to identify Apple capabilities, features, and services relevant to the experience, then consult each technology's integration and platform guidance.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/technologies).

<!-- topic:voiceover -->
<a id="voiceover"></a>
## VoiceOver
Source: [VoiceOver](https://developer.apple.com/design/human-interface-guidelines/voiceover).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Describe important controls, images, and infographics with meaningful alternative information, excluding decorative imagery. Preserve interactive chart access as well as its description. Expose titles, headings, grouping, reading order, and content changes so navigation conveys the relationships seen visually. In visionOS, account for custom hand gestures being unavailable by default while VoiceOver is active, with Direct Gesture mode changing that behavior.

Evidence sections: [Descriptions](https://developer.apple.com/design/human-interface-guidelines/voiceover#Descriptions), [Navigation](https://developer.apple.com/design/human-interface-guidelines/voiceover#Navigation), [visionOS](https://developer.apple.com/design/human-interface-guidelines/voiceover#visionOS).

<!-- topic:wallet -->
<a id="wallet"></a>
## Wallet
Source: [Wallet](https://developer.apple.com/design/human-interface-guidelines/wallet).
Platforms in page metadata: ios, ipados, macos, visionos, watchos.

Offer to add passes when they become useful, bundle related passes, and avoid repeating a suggestion after refusal. Provide an add button or direct Wallet link where appropriate. Choose the pass style that fits the item and create a clean Wallet-native presentation. Supply semantic tags for the pass types that require them and retain pass fields for compatibility with older system versions.

Evidence sections: [Passes](https://developer.apple.com/design/human-interface-guidelines/wallet#Passes), [Designing-passes](https://developer.apple.com/design/human-interface-guidelines/wallet#Designing-passes), [Pass-styles](https://developer.apple.com/design/human-interface-guidelines/wallet#Pass-styles), [Pass-anatomy](https://developer.apple.com/design/human-interface-guidelines/wallet#Pass-anatomy).

<!-- topic:icloud -->
<a id="icloud"></a>
## iCloud
Source: [iCloud](https://developer.apple.com/design/human-interface-guidelines/icloud).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Make synchronization feel automatic, keeping content and relevant cross-device state current without asking people to manage every document. Balance freshness against bandwidth and storage, and show unobtrusive download or offline status when useful. Store user-created information rather than regenerable resources. Because deleting a synced document also removes its other copies, explain that consequence and obtain confirmation before deletion.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/icloud), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/icloud#Best-practices).

<!-- topic:imessage-apps-and-stickers -->
<a id="imessage-apps-and-stickers"></a>
## iMessage apps and stickers
Source: [iMessage apps and stickers](https://developer.apple.com/design/human-interface-guidelines/imessage-apps-and-stickers).
Platforms in page metadata: ios, ipados.

Keep an iMessage app centered on an immediately understandable activity that fits the ongoing conversation. Expose common actions in the compact view, generally moving text editing to the expanded view. Make stickers readable across backgrounds, rotations, and scaling, and supply localized descriptions for VoiceOver. Choose a consistent sticker size throughout a pack and prepare icons using the system's masking rules.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/imessage-apps-and-stickers#Best-practices), [Icon-sizes](https://developer.apple.com/design/human-interface-guidelines/imessage-apps-and-stickers#Icon-sizes), [Sticker-sizes](https://developer.apple.com/design/human-interface-guidelines/imessage-apps-and-stickers#Sticker-sizes).

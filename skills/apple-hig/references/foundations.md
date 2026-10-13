# Foundations

English HIG snapshot: 2026-10-13. Read applicable cards; verify exact measurements and changing behavior in the linked official sections. Cards condense guidance and are not exhaustive transcriptions.

<!-- topic:accessibility -->
<a id="accessibility"></a>
## Accessibility
Source: [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Audit accessibility throughout design and support more than one sensory or physical route to important information and actions. Ideally allow text enlargement of at least 200 percent, or 140 percent on watchOS. Pair audio with captions or other suitable alternatives; provide alternatives to gestures and verify assistive-technology operation. Prefer explicit dismissal over timed disappearance, respect Reduce Motion, and preserve a simple, predictable interface.

Evidence sections: [Vision](https://developer.apple.com/design/human-interface-guidelines/accessibility#Vision), [Hearing](https://developer.apple.com/design/human-interface-guidelines/accessibility#Hearing), [Mobility](https://developer.apple.com/design/human-interface-guidelines/accessibility#Mobility), [Cognitive](https://developer.apple.com/design/human-interface-guidelines/accessibility#Cognitive).

<!-- topic:app-icons -->
<a id="app-icons"></a>
## App icons
Source: [App icons](https://developer.apple.com/design/human-interface-guidelines/app-icons).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Build a simple, recognizable identity that stays consistent across supported platforms and appearance variants. Prefer layered artwork with clean foreground edges and a full-bleed, opaque background; leave masking and dynamic lighting effects to the system. Supply unmasked square layers except for rectangular tvOS artwork. Keep essential content centered and test effects and cropping with platform tools. Use text only when essential to the brand or experience.

Evidence sections: [Layer-design](https://developer.apple.com/design/human-interface-guidelines/app-icons#Layer-design), [Icon-shape](https://developer.apple.com/design/human-interface-guidelines/app-icons#Icon-shape), [Design](https://developer.apple.com/design/human-interface-guidelines/app-icons#Design), [Appearances](https://developer.apple.com/design/human-interface-guidelines/app-icons#Appearances).

<!-- topic:branding -->
<a id="branding"></a>
## Branding
Source: [Branding](https://developer.apple.com/design/human-interface-guidelines/branding).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Express identity through useful content and thoughtful customization of familiar components. Preserve expected sizing, placement, navigation, and behavior so the interface remains approachable. Keep branding unobtrusive and avoid repeatedly spending content space on a logo. A launch screen is too brief to communicate branding effectively; an appropriate welcome or onboarding experience can serve that purpose. Follow the referenced Apple trademark guidance when choosing names and imagery.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/branding#Best-practices).

<!-- topic:color -->
<a id="color"></a>
## Color
Source: [Color](https://developer.apple.com/design/human-interface-guidelines/color).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Assign color meanings consistently and provide another cue for information conveyed by color. Prefer adaptive system colors; custom colors need light, dark, and increased-contrast variants, including when Liquid Glass must adapt over a single-appearance app. Apply color sparingly to glass, reserving strong emphasis for meaningful status or primary actions. Include image color profiles and test real devices, lighting, appearance changes, and surrounding content rather than judging a static swatch alone.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/color#Best-practices), [Inclusive-color](https://developer.apple.com/design/human-interface-guidelines/color#Inclusive-color), [Liquid-Glass-color](https://developer.apple.com/design/human-interface-guidelines/color#Liquid-Glass-color), [Color-management](https://developer.apple.com/design/human-interface-guidelines/color#Color-management).

<!-- topic:dark-mode -->
<a id="dark-mode"></a>
## Dark Mode
Source: [Dark Mode](https://developer.apple.com/design/human-interface-guidelines/dark-mode).
Platforms in page metadata: ios, ipados, macos, tvos.

Follow the system appearance preference and generally avoid an independent app appearance switch. Use adaptive semantic colors and system text views; Dark Mode colors are not a simple inversion. Test contrast with Increase Contrast and Reduce Transparency, separately and together, and check full-color imagery in both appearances. Reuse assets that work in both modes, supplying variants where needed. Permanently dark presentation is a rare, context-dependent option for immersive media.

Scope / uncertainty: Dark Mode is supported on iOS, iPadOS, macOS, and tvOS; the page excludes visionOS and watchOS.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/dark-mode#Best-practices), [Dark-Mode-colors](https://developer.apple.com/design/human-interface-guidelines/dark-mode#Dark-Mode-colors), [Icons-and-images](https://developer.apple.com/design/human-interface-guidelines/dark-mode#Icons-and-images), [Text](https://developer.apple.com/design/human-interface-guidelines/dark-mode#Text).

<!-- topic:foundations -->
<a id="foundations"></a>
## Foundations
Source: [Foundations](https://developer.apple.com/design/human-interface-guidelines/foundations).
Platforms in page metadata: not specified.

Route foundational design work to the linked guidance for accessibility, visual identity, layout, materials, motion, privacy, localization, typography, and writing.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/foundations).

<!-- topic:icons -->
<a id="icons"></a>
## Icons
Source: [Icons](https://developer.apple.com/design/human-interface-guidelines/icons).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Use recognizable, simplified metaphors and keep icon detail, perspective, optical weight, and apparent size consistent. Match adjacent text weight in general, adjusting padding for optical alignment where necessary. Prefer vector assets or suitable SF Symbols, and provide accessibility descriptions for custom icons. Localize essential text and reading-direction imagery. Standard components normally supply their own selected appearance, so add separate selected artwork only when necessary.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/icons), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/icons#Best-practices).

<!-- topic:images -->
<a id="images"></a>
## Images
Source: [Images](https://developer.apple.com/design/human-interface-guidelines/images).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Provide bitmap assets at the scale factors needed by supported platforms, choose image formats for the content, embed color profiles, and inspect results on real devices. In tvOS layered artwork, preserve essential foreground content within a safe zone and keep the background opaque. In visionOS, prefer vectors for scalable 2D artwork; higher-resolution raster images trade sharpness for file size and runtime cost. Test scaling, clipping, and viewing distance.

Evidence sections: [Resolution](https://developer.apple.com/design/human-interface-guidelines/images#Resolution), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/images#Best-practices), [Layered-images](https://developer.apple.com/design/human-interface-guidelines/images#Layered-images), [visionOS](https://developer.apple.com/design/human-interface-guidelines/images#visionOS).

<!-- topic:immersive-experiences -->
<a id="immersive-experiences"></a>
## Immersive experiences
Source: [Immersive experiences](https://developer.apple.com/design/human-interface-guidelines/immersive-experiences).
Platforms in page metadata: visionos.

Reserve increased immersion for meaningful tasks and let people explicitly choose when to enter or leave it. Prefer starting in Shared Space or mixed immersion to preserve control. Match immersion style to expected movement; progressive and full styles have an approximately 1.5-meter boundary. Keep transitions gentle, avoid demanding movement, and retain awareness of surroundings. If hand tracking fails while virtual hands are shown, reveal the person's real hands instead of freezing the substitutes.

Scope / uncertainty: visionOS only; sensor access and replacement of visible hands require the relevant permissions.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/immersive-experiences#Best-practices), [Promoting-comfort](https://developer.apple.com/design/human-interface-guidelines/immersive-experiences#Promoting-comfort), [Transitioning-between-immersive-styles](https://developer.apple.com/design/human-interface-guidelines/immersive-experiences#Transitioning-between-immersive-styles), [Displaying-virtual-hands](https://developer.apple.com/design/human-interface-guidelines/immersive-experiences#Displaying-virtual-hands).

<!-- topic:inclusion -->
<a id="inclusion"></a>
## Inclusion
Source: [Inclusion](https://developer.apple.com/design/human-interface-guidelines/inclusion).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Investigate diverse goals and perspectives, revisiting assumptions throughout design. Review how words, images, and tone may communicate unintended meanings. Use plain, respectful language that remains understandable across cultures; avoid unexplained jargon, colloquialisms, and unnecessary gender references. Prepare for languages, regional formats, and cultural color meanings. Where people represent their identity, prefer customization; if gender information is necessary, consider inclusive choices rather than a forced binary.

Evidence sections: [Inclusive-by-design](https://developer.apple.com/design/human-interface-guidelines/inclusion#Inclusive-by-design), [Welcoming-language](https://developer.apple.com/design/human-interface-guidelines/inclusion#Welcoming-language), [Gender-identity](https://developer.apple.com/design/human-interface-guidelines/inclusion#Gender-identity), [Languages](https://developer.apple.com/design/human-interface-guidelines/inclusion#Languages).

<!-- topic:layout -->
<a id="layout"></a>
## Layout
Source: [Layout](https://developer.apple.com/design/human-interface-guidelines/layout).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Express hierarchy with reading order, alignment, grouping, and progressive disclosure. Adapt to real available space, text size, locale, and system features using margins, layout guides, and safe areas. In iOS and iPadOS, base layout decisions on size classes rather than device identity or orientation. Preserve functionality and recognizable structure as size changes, exposing more controls when room permits. Separate navigation and controls visually from the underlying content.

Evidence sections: [Visual-hierarchy](https://developer.apple.com/design/human-interface-guidelines/layout#Visual-hierarchy), [Adaptability](https://developer.apple.com/design/human-interface-guidelines/layout#Adaptability), [Size-classes](https://developer.apple.com/design/human-interface-guidelines/layout#Size-classes), [Guides-and-safe-areas](https://developer.apple.com/design/human-interface-guidelines/layout#Guides-and-safe-areas).

<!-- topic:materials -->
<a id="materials"></a>
## Materials
Source: [Materials](https://developer.apple.com/design/human-interface-guidelines/materials).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Use Liquid Glass sparingly for the functional layer of controls and navigation, and standard materials to structure content beneath it. Prefer regular glass when text or complex backgrounds demand legibility; reserve clear glass for visually rich media backgrounds. Consider a 35-percent dark dimming layer over bright content, unless standard playback controls already provide one. Select standard materials semantically and use appropriate vibrant foreground colors rather than relying on a material's apparent color.

Scope / uncertainty: visionOS windows use their own system glass material; consult platform sections before transferring Liquid Glass treatments.

Evidence sections: [Liquid-Glass](https://developer.apple.com/design/human-interface-guidelines/materials#Liquid-Glass), [Standard-materials](https://developer.apple.com/design/human-interface-guidelines/materials#Standard-materials).

<!-- topic:motion -->
<a id="motion"></a>
## Motion
Source: [Motion](https://developer.apple.com/design/human-interface-guidelines/motion).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Use motion to explain changes or provide feedback, keeping it brief, precise, and consistent with gestures. Make important information available without motion and let people cancel animations instead of waiting. Avoid adding repetitive spectacle to frequent UI actions. In visionOS, minimize peripheral movement and world rotation, provide stationary references, and consider fades when relocation conveys no useful meaning. Test large moving objects for comfort and respect accessibility preferences.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/motion), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/motion#Best-practices), [Providing-feedback](https://developer.apple.com/design/human-interface-guidelines/motion#Providing-feedback), [visionOS](https://developer.apple.com/design/human-interface-guidelines/motion#visionOS).

<!-- topic:privacy -->
<a id="privacy"></a>
## Privacy
Source: [Privacy](https://developer.apple.com/design/human-interface-guidelines/privacy).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Request only necessary data when the relevant feature makes the need clear, using a specific, understandable purpose sentence. Process locally where possible and respect people's privacy choices. If a pre-alert explanation is essential, follow the documented single-button pattern without misleading the person: its action opens the system alert. Prefer system authentication and keychain storage over custom schemes or plaintext secrets, and avoid requesting access at launch unless the app requires it to function.

Scope / uncertainty: visionOS gaze and ARKit boundaries are detailed in its platform section; implementation requires the linked developer documentation.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/privacy#Best-practices), [Requesting-permission](https://developer.apple.com/design/human-interface-guidelines/privacy#Requesting-permission), [Pre-alert-screens-windows-or-views](https://developer.apple.com/design/human-interface-guidelines/privacy#Pre-alert-screens-windows-or-views), [Protecting-data](https://developer.apple.com/design/human-interface-guidelines/privacy#Protecting-data).

<!-- topic:right-to-left -->
<a id="right-to-left"></a>
## Right to left
Source: [Right to left](https://developer.apple.com/design/human-interface-guidelines/right-to-left).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Use standard layouts that mirror for right-to-left contexts, then check meaning rather than flipping everything. Align longer paragraphs by their own language while keeping list alignment consistent. Reverse progress and ordered navigation, preserving actual physical directions and the digit order within a number. Retain logos, universal signs, and generally the orientation of real-world object icons. Localize text-bearing icons and review components of complex icons individually to preserve meaning and visual balance.

Evidence sections: [Text-alignment](https://developer.apple.com/design/human-interface-guidelines/right-to-left#Text-alignment), [Numbers-and-characters](https://developer.apple.com/design/human-interface-guidelines/right-to-left#Numbers-and-characters), [Controls](https://developer.apple.com/design/human-interface-guidelines/right-to-left#Controls), [Interface-icons](https://developer.apple.com/design/human-interface-guidelines/right-to-left#Interface-icons).

<!-- topic:sf-symbols -->
<a id="sf-symbols"></a>
## SF Symbols
Source: [SF Symbols](https://developer.apple.com/design/human-interface-guidelines/sf-symbols).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Choose rendering mode, weight, scale, and variants to fit meaning, adjacent typography, and legibility in every context. Use variable color to communicate a changing value, while hierarchical rendering communicates depth. Apply animation only when it clarifies action or status. Base custom symbols on templates, preserve optical consistency, annotate layers for supported effects, and supply accessibility descriptions. Check system-version availability and symbol-specific usage restrictions before adopting or customizing artwork.

Scope / uncertainty: SF Symbols cannot be used for app icons, logos, or trademarked uses; some Apple product symbols cannot be customized.

Evidence sections: [Rendering-modes](https://developer.apple.com/design/human-interface-guidelines/sf-symbols#Rendering-modes), [Variable-color](https://developer.apple.com/design/human-interface-guidelines/sf-symbols#Variable-color), [Animations](https://developer.apple.com/design/human-interface-guidelines/sf-symbols#Animations), [Custom-symbols](https://developer.apple.com/design/human-interface-guidelines/sf-symbols#Custom-symbols).

<!-- topic:spatial-layout -->
<a id="spatial-layout"></a>
## Spatial layout
Source: [Spatial layout](https://developer.apple.com/design/human-interface-guidelines/spatial-layout).
Platforms in page metadata: visionos.

Place important content comfortably in view and anchor it in space rather than rigidly to the wearer's head. Use depth to clarify hierarchy, avoiding unnecessary depth on text and frequent refocusing. Preserve dynamic scale for usable interactive content; reserve fixed scale mainly for objects needing realistic physical size. Prioritize indirect interaction, provide enough target spacing for eye selection, and avoid requiring physical movement unless it is essential to the experience.

Scope / uncertainty: visionOS; the system does not expose an individual's field-of-view dimensions.

Evidence sections: [Field-of-view](https://developer.apple.com/design/human-interface-guidelines/spatial-layout#Field-of-view), [Depth](https://developer.apple.com/design/human-interface-guidelines/spatial-layout#Depth), [Scale](https://developer.apple.com/design/human-interface-guidelines/spatial-layout#Scale), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/spatial-layout#Best-practices).

<!-- topic:typography -->
<a id="typography"></a>
## Typography
Source: [Typography](https://developer.apple.com/design/human-interface-guidelines/typography).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Use readable platform-appropriate sizes and weights, testing actual viewing conditions rather than relying on a mockup. Prefer built-in text styles for hierarchy and supported text-size adaptation. Custom fonts need equivalent accessibility behavior. At larger text sizes, preserve information priority, grow meaningful icons, reduce truncation, and consider stacking inline content or reducing columns. Keep hierarchy consistent as size changes, and avoid light weights where they impair legibility.

Scope / uncertainty: The page states macOS does not support Dynamic Type; consult each platform's font and sizing tables.

Evidence sections: [Ensuring-legibility](https://developer.apple.com/design/human-interface-guidelines/typography#Ensuring-legibility), [Using-system-fonts](https://developer.apple.com/design/human-interface-guidelines/typography#Using-system-fonts), [Using-custom-fonts](https://developer.apple.com/design/human-interface-guidelines/typography#Using-custom-fonts), [Supporting-Dynamic-Type](https://developer.apple.com/design/human-interface-guidelines/typography#Supporting-Dynamic-Type).

<!-- topic:writing -->
<a id="writing"></a>
## Writing
Source: [Writing](https://developer.apple.com/design/human-interface-guidelines/writing).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Establish a consistent vocabulary and voice, adapting tone to the seriousness and context of the task. Use clear, inclusive wording, action-oriented labels, and capitalization patterns suited to each component. Order information by importance and make multistep progress understandable. Empty states should suggest a useful next action. Put helpful, blame-free error guidance near the problem, and describe gestures accurately for the device instead of using one interaction term everywhere.

Evidence sections: [Getting-started](https://developer.apple.com/design/human-interface-guidelines/writing#Getting-started), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/writing#Best-practices).
